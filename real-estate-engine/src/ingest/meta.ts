/**
 * Meta Lead Ads (Facebook + Instagram lead forms).
 *
 * Delivery model: PUSH. Meta POSTs a thin notification containing only a
 * `leadgen_id`; you then fetch the answers with a page access token. Two
 * network hops, so the webhook handler must persist the raw notification to
 * `raw_events` and hand off — never fetch inline and risk timing out Meta's
 * delivery, which triggers retries and eventually unsubscribes your app.
 *
 * Auth: HMAC-SHA256 over the raw body, keyed with the app secret, delivered
 * as `X-Hub-Signature-256: sha256=<hex>`. Verify against the RAW bytes —
 * re-serialising parsed JSON changes the bytes and the signature will fail.
 */

import { createHmac, timingSafeEqual } from "node:crypto";
import { phoneKey } from "../domain/phone.js";
import { mapFormFields } from "./fieldmap.js";
import type { NormalisedLead, RawIngestField } from "./types.js";

/** GET verification handshake when you first subscribe the webhook. */
export function verifyMetaSubscription(
  params: { mode?: string; token?: string; challenge?: string },
  expectedToken: string,
): string | null {
  if (params.mode === "subscribe" && params.token === expectedToken && params.challenge) {
    return params.challenge;
  }
  return null;
}

export function verifyMetaSignature(
  rawBody: string | Buffer,
  signatureHeader: string | undefined,
  appSecret: string,
): boolean {
  if (!signatureHeader?.startsWith("sha256=")) return false;
  const provided = Buffer.from(signatureHeader.slice("sha256=".length), "hex");
  const expected = createHmac("sha256", appSecret).update(rawBody).digest();
  // timingSafeEqual throws on length mismatch, which is itself a leak of
  // information; check length first and always compare in constant time.
  if (provided.length !== expected.length) return false;
  return timingSafeEqual(provided, expected);
}

export interface MetaLeadRef {
  leadgenId: string;
  formId?: string;
  pageId?: string;
  adId?: string;
  createdTime?: Date;
}

/**
 * Pull the lead references out of a webhook body.
 *
 * One delivery can carry several entries and several changes, and non-leadgen
 * changes (page edits, feed posts) arrive on the same subscription. Anything
 * that is not a `leadgen` change is ignored silently — that is normal traffic,
 * not an error.
 */
export function parseMetaWebhook(body: unknown): MetaLeadRef[] {
  const refs: MetaLeadRef[] = [];
  const b = body as { entry?: { changes?: { field?: string; value?: Record<string, unknown> }[] }[] };
  for (const entry of b?.entry ?? []) {
    for (const change of entry.changes ?? []) {
      if (change.field !== "leadgen") continue;
      const v = change.value ?? {};
      const leadgenId = str(v["leadgen_id"]);
      if (!leadgenId) continue;
      refs.push({
        leadgenId,
        ...(str(v["form_id"]) ? { formId: str(v["form_id"])! } : {}),
        ...(str(v["page_id"]) ? { pageId: str(v["page_id"])! } : {}),
        ...(str(v["adgroup_id"]) ? { adId: str(v["adgroup_id"])! } : {}),
        ...(v["created_time"] ? { createdTime: new Date(Number(v["created_time"]) * 1000) } : {}),
      });
    }
  }
  return refs;
}

/** Shape returned by GET /{leadgen_id}?fields=field_data,created_time,... */
export interface MetaLeadDetail {
  id: string;
  created_time?: string;
  field_data?: { name: string; values?: string[] }[];
  ad_id?: string;
  campaign_name?: string;
  form_id?: string;
  is_organic?: boolean;
}

export function mapMetaLead(detail: MetaLeadDetail, opts?: { isTest?: boolean }): NormalisedLead {
  const fields: RawIngestField[] = (detail.field_data ?? []).map((f) => ({
    name: f.name,
    values: f.values ?? [],
  }));
  const mapped = mapFormFields(fields);
  const at = detail.created_time ? new Date(detail.created_time) : new Date();

  return {
    source: detail.is_organic ? "instagram_dm" : "meta_lead_ad",
    sourceEventId: detail.id,
    ...(detail.campaign_name ?? detail.ad_id
      ? { sourceCampaign: detail.campaign_name ?? detail.ad_id! }
      : {}),
    ...(mapped.fullName ? { fullName: mapped.fullName } : {}),
    ...(mapped.phoneRaw ? { phoneRaw: mapped.phoneRaw } : {}),
    phoneE164: phoneKey(mapped.phoneRaw),
    ...(mapped.email ? { email: mapped.email } : {}),
    ...(mapped.city ? { city: mapped.city } : {}),
    qualification: mapped.qualification,
    consentSource: "meta_lead_ad_form",
    consentAt: at,
    isTest: opts?.isTest ?? false,
    unmappedFields: mapped.unmappedFields,
  };
}

function str(v: unknown): string | undefined {
  return typeof v === "string" || typeof v === "number" ? String(v) : undefined;
}
