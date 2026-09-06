/**
 * LinkedIn Lead Gen Forms.
 *
 * READ THIS BEFORE SELLING IT. LinkedIn is a poor fit for residential real
 * estate: it is a B2B audience at B2B cost-per-lead, and people do not shop
 * for 2BHKs there. It earns its place only for luxury (₹5Cr+), commercial and
 * office space, or NRI investor campaigns. For a mainstream residential
 * broker, the same budget spent on Meta will produce more site visits.
 *
 * Delivery model: PULL. This is the important operational difference from
 * Meta and Google. Instead of a webhook you poll the Marketing API's lead
 * form responses on a schedule, which fails DIFFERENTLY:
 *
 *   - A webhook that breaks throws errors you can alert on.
 *   - A poller that breaks goes quiet, and quiet looks exactly like
 *     "no leads today". Weeks can pass before anyone notices.
 *
 * So the poller must record its own heartbeat and alert on the ABSENCE of a
 * successful poll, not on failures. `pollHealth()` below is that check, and
 * it is the most important function in this file.
 *
 * Auth: OAuth 2.0 access token with the lead-form scopes, subject to approved
 * API access on the ad account. Token refresh is the other common silent
 * failure — an expired token also just looks like "no leads".
 *
 * NOTE ON THE ENVELOPE: LinkedIn's response nesting has changed across API
 * versions and access tiers. `flattenLinkedInAnswers` is deliberately
 * tolerant of several shapes and is the ONE function to fix once a real
 * payload is in hand. Everything downstream of it is shape-independent and
 * fully tested.
 */

import { phoneKey } from "../domain/phone.js";
import { mapFormFields } from "./fieldmap.js";
import type { NormalisedLead, RawIngestField } from "./types.js";

export interface LinkedInLeadResponse {
  id?: string;
  form?: string;
  campaign?: string;
  submittedAt?: number;
  testLead?: boolean;
  formResponse?: { answers?: unknown[] };
  answers?: unknown[];
}

/**
 * Coax LinkedIn's answer array into flat name/value pairs.
 *
 * Tolerates the shapes seen in practice:
 *   { questionId, answerDetails: { textQuestionAnswer: { answer } } }
 *   { question, answer }
 *   { name, values: [...] }
 */
export function flattenLinkedInAnswers(raw: unknown[] | undefined): RawIngestField[] {
  const out: RawIngestField[] = [];
  for (const item of raw ?? []) {
    if (!item || typeof item !== "object") continue;
    const a = item as Record<string, unknown>;

    const name =
      pick(a, "questionId") ??
      pick(a, "question") ??
      pick(a, "name") ??
      pick(a, "questionText");
    if (!name) continue;

    let values: string[] = [];
    if (Array.isArray(a["values"])) {
      values = (a["values"] as unknown[]).map(String);
    } else if (typeof a["answer"] === "string") {
      values = [a["answer"]];
    } else if (a["answerDetails"] && typeof a["answerDetails"] === "object") {
      const d = a["answerDetails"] as Record<string, unknown>;
      const text = d["textQuestionAnswer"];
      if (text && typeof text === "object") {
        const ans = (text as Record<string, unknown>)["answer"];
        if (typeof ans === "string") values = [ans];
      }
    }

    if (values.length > 0) out.push({ name, values });
  }
  return out;
}

export function mapLinkedInLead(response: LinkedInLeadResponse): NormalisedLead {
  const answers = flattenLinkedInAnswers(response.formResponse?.answers ?? response.answers);
  const mapped = mapFormFields(answers);

  return {
    source: "linkedin_ads",
    sourceEventId: String(response.id ?? ""),
    ...(response.campaign ? { sourceCampaign: response.campaign } : {}),
    ...(mapped.fullName ? { fullName: mapped.fullName } : {}),
    ...(mapped.phoneRaw ? { phoneRaw: mapped.phoneRaw } : {}),
    phoneE164: phoneKey(mapped.phoneRaw),
    ...(mapped.email ? { email: mapped.email } : {}),
    ...(mapped.city ? { city: mapped.city } : {}),
    qualification: mapped.qualification,
    consentSource: "linkedin_lead_gen_form",
    consentAt: response.submittedAt ? new Date(response.submittedAt) : new Date(),
    isTest: response.testLead === true,
    unmappedFields: mapped.unmappedFields,
  };
}

// ---------------------------------------------------------------------------
// Poller health — the part that stops a pull adapter failing silently.
// ---------------------------------------------------------------------------

export const POLL_INTERVAL_MINUTES = 15;
/** Alert after this long with no SUCCESSFUL poll, regardless of lead volume. */
export const POLL_STALE_AFTER_MINUTES = 90;

export type PollHealth =
  | { status: "ok" }
  | { status: "never_run" }
  | { status: "stale"; minutesSinceSuccess: number };

/**
 * Alert on the absence of a successful poll, not on the absence of leads.
 * "No leads today" is indistinguishable from "the token expired last Tuesday"
 * unless something is watching the poll itself.
 */
export function pollHealth(lastSuccessfulPollAt: Date | null, now: Date = new Date()): PollHealth {
  if (!lastSuccessfulPollAt) return { status: "never_run" };
  const minutes = (now.getTime() - lastSuccessfulPollAt.getTime()) / 60_000;
  if (minutes > POLL_STALE_AFTER_MINUTES) {
    return { status: "stale", minutesSinceSuccess: Math.floor(minutes) };
  }
  return { status: "ok" };
}

function pick(o: Record<string, unknown>, key: string): string | undefined {
  const v = o[key];
  return typeof v === "string" || typeof v === "number" ? String(v) : undefined;
}
