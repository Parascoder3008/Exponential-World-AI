/**
 * Google Ads Lead Form Extensions.
 *
 * Delivery model: PUSH, and unlike Meta the answers arrive in the SAME
 * request — one hop, no token, no second fetch. That makes this the simplest
 * of the three adapters and the one least likely to break.
 *
 * Auth: a shared secret (`google_key`) you configure on the lead form and
 * Google echoes back in the body. There is no HMAC, so the key is the only
 * thing standing between your ingest endpoint and anyone who finds the URL —
 * compare it in constant time and keep the endpoint path unguessable.
 *
 * Google also sends test submissions with `is_test: true` from the form
 * preview tool. Those must never reach a salesperson.
 */

import { timingSafeEqual } from "node:crypto";
import { phoneKey } from "../domain/phone.js";
import { mapFormFields } from "./fieldmap.js";
import type { NormalisedLead, RawIngestField } from "./types.js";

export interface GoogleLeadPayload {
  lead_id?: string;
  api_version?: string;
  form_id?: number | string;
  campaign_id?: number | string;
  gcl_id?: string;
  is_test?: boolean;
  google_key?: string;
  user_column_data?: {
    column_id?: string;
    column_name?: string;
    string_value?: string;
  }[];
}

export function verifyGoogleKey(provided: string | undefined, expected: string): boolean {
  if (!provided || !expected) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/**
 * Google's standard fields arrive with a typed `column_id` (FULL_NAME,
 * EMAIL, PHONE_NUMBER, …) while custom questions arrive with only a
 * `column_name` carrying the question text. Prefer the typed id — it is
 * stable across languages, whereas the question text is whatever the
 * advertiser typed and may be in Hindi.
 */
const COLUMN_ID_TO_FIELD: Readonly<Record<string, string>> = {
  FULL_NAME: "full_name",
  FIRST_NAME: "full_name",
  LAST_NAME: "full_name",
  USER_PHONE: "phone",
  PHONE_NUMBER: "phone",
  USER_EMAIL: "email",
  EMAIL: "email",
  CITY: "city",
  REGION: "city",
  POSTAL_CODE: "city",
};

export function mapGoogleLead(payload: GoogleLeadPayload): NormalisedLead {
  const fields: RawIngestField[] = (payload.user_column_data ?? []).map((c) => {
    const typed = c.column_id ? COLUMN_ID_TO_FIELD[c.column_id] : undefined;
    return {
      // Fall back to the raw column_id so an unrecognised typed field still
      // reaches unmappedFields under a meaningful name.
      name: typed ?? c.column_name ?? c.column_id ?? "unknown",
      values: c.string_value ? [c.string_value] : [],
    };
  });

  const mapped = mapFormFields(fields);
  const campaign = payload.campaign_id ?? payload.form_id;

  return {
    source: "google_ads",
    sourceEventId: String(payload.lead_id ?? payload.gcl_id ?? ""),
    ...(campaign !== undefined ? { sourceCampaign: `google:${campaign}` } : {}),
    ...(mapped.fullName ? { fullName: mapped.fullName } : {}),
    ...(mapped.phoneRaw ? { phoneRaw: mapped.phoneRaw } : {}),
    phoneE164: phoneKey(mapped.phoneRaw),
    ...(mapped.email ? { email: mapped.email } : {}),
    ...(mapped.city ? { city: mapped.city } : {}),
    qualification: mapped.qualification,
    consentSource: "google_lead_form",
    consentAt: new Date(),
    isTest: payload.is_test === true,
    unmappedFields: mapped.unmappedFields,
  };
}
