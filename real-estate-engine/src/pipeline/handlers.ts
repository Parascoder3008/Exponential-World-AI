/**
 * Framework-agnostic HTTP handlers.
 *
 * These take a plain request shape and return a plain response shape, so they
 * drop into Next.js route handlers, Express, Fastify or a Lambda in about
 * three lines each — see the examples at the bottom of this file.
 *
 * Keeping the framework out of here is not architectural purism. It means the
 * webhook logic is unit-testable without booting a server, and it means the
 * dashboard shell can be chosen (or changed) later without touching a single
 * verification path.
 */

import { mapGoogleLead, verifyGoogleKey, type GoogleLeadPayload } from "../ingest/google.js";
import { parseMetaWebhook, verifyMetaSignature, verifyMetaSubscription } from "../ingest/meta.js";
import { parsePortalEmail, type InboundEmail } from "../ingest/portals.js";
import { parseCallEvent, parseWebsiteForm, type CallEvent, type WebsiteSubmission } from "../ingest/direct.js";
import type { MetaLeadDetail } from "../ingest/meta.js";
import { mapMetaLead } from "../ingest/meta.js";
import type { Repository } from "../ports/repository.js";
import { ingestLead, type IngestConfig, type IngestOutcome } from "./ingest.js";

export interface HttpRequest {
  method: string;
  query: Record<string, string | undefined>;
  headers: Record<string, string | undefined>;
  /** The RAW body. Meta's signature is over these exact bytes. */
  rawBody: string;
}

export interface HttpResponse {
  status: number;
  body: string;
}

const ok = (body = "ok"): HttpResponse => ({ status: 200, body });
const bad = (status: number, body: string): HttpResponse => ({ status, body });

/**
 * Meta's webhook, both verbs.
 *
 * GET  — the subscription handshake.
 * POST — lead notifications.
 *
 * The POST path deliberately does NOT fetch lead details inline. It verifies,
 * stores, and returns 200 fast. Meta retries any delivery it considers failed
 * and will eventually unsubscribe an app that is consistently slow, so the
 * fetch belongs in a background job reading `raw_events`.
 */
export async function handleMetaWebhook(
  req: HttpRequest,
  deps: {
    appSecret: string;
    verifyToken: string;
    /** Enqueue the fetch-and-ingest job. Must not block the response. */
    enqueueFetch: (leadgenId: string, meta: Record<string, unknown>) => Promise<void>;
    repo: Repository;
  },
): Promise<HttpResponse> {
  if (req.method === "GET") {
    const challenge = verifyMetaSubscription(
      {
        ...(req.query["hub.mode"] !== undefined ? { mode: req.query["hub.mode"] } : {}),
        ...(req.query["hub.verify_token"] !== undefined ? { token: req.query["hub.verify_token"] } : {}),
        ...(req.query["hub.challenge"] !== undefined ? { challenge: req.query["hub.challenge"] } : {}),
      },
      deps.verifyToken,
    );
    return challenge ? ok(challenge) : bad(403, "verification failed");
  }

  if (req.method !== "POST") return bad(405, "method not allowed");

  const signature = req.headers["x-hub-signature-256"] ?? req.headers["X-Hub-Signature-256"];
  if (!verifyMetaSignature(req.rawBody, signature, deps.appSecret)) {
    return bad(401, "bad signature");
  }

  let body: unknown;
  try {
    body = JSON.parse(req.rawBody);
  } catch {
    // Malformed JSON with a VALID signature is a Meta-side anomaly worth
    // keeping. Store it and return 200 so Meta stops retrying a body that
    // will never parse.
    await deps.repo.recordRawEvent({
      source: "meta_lead_ad",
      sourceEventId: null,
      payload: { unparseable: req.rawBody.slice(0, 4000) },
      receivedAt: new Date(),
    });
    return ok("stored unparseable body");
  }

  const refs = parseMetaWebhook(body);
  for (const ref of refs) {
    await deps.enqueueFetch(ref.leadgenId, {
      formId: ref.formId ?? null,
      pageId: ref.pageId ?? null,
      adId: ref.adId ?? null,
    });
  }

  // Always 200 once the signature is good, even for zero refs — non-leadgen
  // changes arrive on the same subscription and are normal traffic.
  return ok(`accepted ${refs.length}`);
}

/** Second hop: the background job that fetched the answers calls this. */
export async function ingestMetaLeadDetail(
  repo: Repository,
  detail: MetaLeadDetail,
  config: IngestConfig,
  opts?: { isTest?: boolean },
): Promise<IngestOutcome> {
  const lead = mapMetaLead(detail, opts ?? {});
  return ingestLead(repo, lead, detail, config);
}

/**
 * Google Ads lead forms — verified and ingested in one hop.
 *
 * Returns 200 for a test submission after storing it, because Google's form
 * preview tool treats a non-200 as a broken integration and will refuse to
 * let the advertiser publish the form.
 */
export async function handleGoogleWebhook(
  req: HttpRequest,
  deps: { googleKey: string; repo: Repository; config: IngestConfig },
): Promise<HttpResponse> {
  if (req.method !== "POST") return bad(405, "method not allowed");

  let payload: GoogleLeadPayload;
  try {
    payload = JSON.parse(req.rawBody) as GoogleLeadPayload;
  } catch {
    return bad(400, "invalid json");
  }

  if (!verifyGoogleKey(payload.google_key, deps.googleKey)) {
    return bad(401, "bad google_key");
  }

  const lead = mapGoogleLead(payload);
  if (!lead.sourceEventId) return bad(400, "missing lead_id");

  const outcome = await ingestLead(deps.repo, lead, payload, deps.config);
  return ok(outcome.result);
}

/** Website form. Same shape, no shared secret — rate-limit this at the edge. */
export async function handleWebsiteForm(
  submission: WebsiteSubmission,
  deps: { repo: Repository; config: IngestConfig },
): Promise<HttpResponse> {
  const parsed = parseWebsiteForm(submission);
  if (!parsed.ok) {
    // A bot submission gets a 200: telling a scraper it was detected just
    // teaches it to fill the honeypot correctly next time.
    return parsed.reason === "bot_submission" ? ok("ok") : bad(422, parsed.detail);
  }
  const outcome = await ingestLead(deps.repo, parsed.lead, submission, deps.config);
  return ok(outcome.result);
}

/** Telephony webhook: missed calls and IVR selections. */
export async function handleCallEvent(
  event: CallEvent,
  deps: { repo: Repository; config: IngestConfig; numberToCampaign?: Record<string, string> },
): Promise<HttpResponse> {
  const lead = parseCallEvent(event, deps.numberToCampaign ?? {});
  if (!lead) return ok("ignored");
  const outcome = await ingestLead(deps.repo, lead, event, deps.config);
  return ok(outcome.result);
}

/**
 * Portal notification email.
 *
 * An email we cannot parse is QUARANTINED, never dropped. Portals redesign
 * their templates without warning, and the quarantine queue is how you find
 * out in a day rather than a month.
 */
export async function handlePortalEmail(
  email: InboundEmail,
  deps: { repo: Repository; config: IngestConfig },
): Promise<{ status: "ingested" | "quarantined"; detail: string }> {
  const parsed = parsePortalEmail(email);
  if (!parsed.ok) {
    await deps.repo.recordRawEvent({
      source: "portal_email_quarantine",
      sourceEventId: email.messageId,
      payload: { reason: parsed.reason, from: email.from, subject: email.subject, text: email.text },
      receivedAt: email.receivedAt,
    });
    return { status: "quarantined", detail: parsed.detail };
  }
  const outcome = await ingestLead(deps.repo, parsed.lead, email, deps.config);
  return { status: "ingested", detail: outcome.result };
}

/*
 * ---------------------------------------------------------------------------
 * Wiring examples
 * ---------------------------------------------------------------------------
 *
 * Next.js App Router — app/api/webhooks/meta/route.ts:
 *
 *   export async function POST(req: Request) {
 *     const rawBody = await req.text();            // MUST be text, not json
 *     const res = await handleMetaWebhook(
 *       { method: "POST", query: {}, headers: Object.fromEntries(req.headers), rawBody },
 *       deps,
 *     );
 *     return new Response(res.body, { status: res.status });
 *   }
 *
 * Express — remember express.raw(), not express.json(), or the HMAC will fail
 * because the parsed-and-reserialised body is not byte-identical:
 *
 *   app.post("/webhooks/meta", express.raw({ type: "*\/*" }), async (req, res) => {
 *     const out = await handleMetaWebhook(
 *       { method: "POST", query: req.query, headers: req.headers, rawBody: req.body.toString("utf8") },
 *       deps,
 *     );
 *     res.status(out.status).send(out.body);
 *   });
 */
