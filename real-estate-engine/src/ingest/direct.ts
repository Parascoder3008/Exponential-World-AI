/**
 * Direct sources: website forms, telephony (missed call / IVR), and manual
 * entry for walk-ins and the broker's own network.
 *
 * The manual one matters more than it looks. If offline leads live outside the
 * system, every number on the dashboard is a lie, and the owner will
 * eventually notice that the dashboard total does not match what their team
 * says they worked — at which point they stop trusting all of it. A 30-second
 * entry path for walk-ins is what keeps the funnel honest.
 */

import { phoneKey } from "../domain/phone.js";
import { mapFormFields } from "./fieldmap.js";
import type { NormalisedLead, RawIngestField } from "./types.js";

// ---------------------------------------------------------------------------
// Website form
// ---------------------------------------------------------------------------

export interface WebsiteSubmission {
  /** Idempotency key. Generate client-side per submission, not per session. */
  submissionId: string;
  fields: Record<string, string | string[]>;
  utm?: UtmParams;
  pageUrl?: string;
  submittedAt?: Date;
  /** Honeypot field value. Non-empty means a bot filled it. */
  honeypot?: string;
}

export interface UtmParams {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  gclid?: string;
  fbclid?: string;
}

/**
 * Build a campaign label from UTM parameters.
 *
 * Attribution is only as good as this string, and it is captured once at
 * submission — a lead that arrives without it can never be attributed later,
 * however good the reporting is.
 */
export function campaignLabel(utm: UtmParams | undefined, pageUrl?: string): string | undefined {
  if (!utm) return pageUrl ? `web:${pageUrl}` : undefined;
  const parts = [utm.source, utm.medium, utm.campaign].filter(Boolean);
  if (parts.length > 0) return `web:${parts.join("/")}`;
  if (utm.gclid) return "web:google/cpc";
  if (utm.fbclid) return "web:meta/cpc";
  return pageUrl ? `web:${pageUrl}` : undefined;
}

export type WebsiteResult =
  | { ok: true; lead: NormalisedLead }
  | { ok: false; reason: "bot_submission" | "no_identity"; detail: string };

export function parseWebsiteForm(sub: WebsiteSubmission): WebsiteResult {
  // A filled honeypot is a bot. Reject silently and never create a lead —
  // spam in the pipeline destroys the agent's trust in the queue faster than
  // almost anything else.
  if (sub.honeypot && sub.honeypot.trim() !== "") {
    return { ok: false, reason: "bot_submission", detail: "honeypot filled" };
  }

  const fields: RawIngestField[] = Object.entries(sub.fields).map(([name, value]) => ({
    name,
    values: Array.isArray(value) ? value : [value],
  }));

  const mapped = mapFormFields(fields);
  const phoneE164 = phoneKey(mapped.phoneRaw);
  if (!phoneE164 && !mapped.email) {
    return { ok: false, reason: "no_identity", detail: "no usable phone or email" };
  }

  const campaign = campaignLabel(sub.utm, sub.pageUrl);

  return {
    ok: true,
    lead: {
      source: "website",
      sourceEventId: sub.submissionId,
      ...(campaign ? { sourceCampaign: campaign } : {}),
      ...(mapped.fullName ? { fullName: mapped.fullName } : {}),
      ...(mapped.phoneRaw ? { phoneRaw: mapped.phoneRaw } : {}),
      phoneE164,
      ...(mapped.email ? { email: mapped.email } : {}),
      ...(mapped.city ? { city: mapped.city } : {}),
      qualification: mapped.qualification,
      consentSource: "website_form",
      consentAt: sub.submittedAt ?? new Date(),
      isTest: false,
      unmappedFields: mapped.unmappedFields,
    },
  };
}

// ---------------------------------------------------------------------------
// Telephony: missed call and IVR
// ---------------------------------------------------------------------------

export interface CallEvent {
  callSid: string;
  /** The buyer's number. */
  from: string;
  /** The broker's tracking number — identifies the campaign. */
  to: string;
  direction: "inbound";
  status: "missed" | "completed" | "no-answer" | "busy" | "failed";
  startedAt: Date;
  durationSeconds?: number;
  recordingUrl?: string;
  /** Keypress from an IVR menu, when one is used. */
  ivrSelection?: string;
}

/**
 * A missed call is a lead, not an error.
 *
 * Underrated in India: a missed-call number on a hoarding, a newspaper ad or a
 * site board is a genuinely high-intent, zero-friction enquiry. The number
 * dialled identifies the campaign, so tracking numbers give you attribution
 * for offline media that is otherwise impossible to measure.
 */
export function parseCallEvent(
  event: CallEvent,
  numberToCampaign: Record<string, string> = {},
): NormalisedLead | null {
  if (event.direction !== "inbound") return null;

  const phoneE164 = phoneKey(event.from);
  if (!phoneE164) return null;

  const campaign = numberToCampaign[event.to] ?? `ivr:${event.to}`;
  const unmapped: Record<string, string> = {};
  if (event.ivrSelection) unmapped["ivr_selection"] = event.ivrSelection;
  if (event.recordingUrl) unmapped["recording_url"] = event.recordingUrl;
  if (event.durationSeconds !== undefined) {
    unmapped["call_duration_seconds"] = String(event.durationSeconds);
  }

  return {
    source: "missed_call",
    sourceEventId: event.callSid,
    sourceCampaign: campaign,
    phoneRaw: event.from,
    phoneE164,
    qualification: {},
    // A call is implied consent to be called back on the same number, and
    // nothing more. It is NOT consent for marketing broadcasts — the first
    // outbound message must therefore be a callback, not a promotion.
    consentSource: "inbound_call",
    consentAt: event.startedAt,
    isTest: false,
    unmappedFields: unmapped,
  };
}

// ---------------------------------------------------------------------------
// Manual entry: walk-ins, referrals, the broker's own network
// ---------------------------------------------------------------------------

export interface ManualEntry {
  entryId: string;
  enteredByAgentId: string;
  fullName?: string;
  phone: string;
  email?: string;
  city?: string;
  notes?: string;
  /** Set when this walk-in came from an existing customer's referral code. */
  referralCode?: string;
  fields?: Record<string, string>;
  enteredAt?: Date;
}

export type ManualResult =
  | { ok: true; lead: NormalisedLead }
  | { ok: false; reason: "invalid_phone"; detail: string };

export function parseManualEntry(entry: ManualEntry): ManualResult {
  const phoneE164 = phoneKey(entry.phone);
  if (!phoneE164) {
    return { ok: false, reason: "invalid_phone", detail: entry.phone };
  }

  const fields: RawIngestField[] = Object.entries(entry.fields ?? {}).map(([name, value]) => ({
    name,
    values: [value],
  }));
  const mapped = mapFormFields(fields);

  const unmapped = { ...mapped.unmappedFields };
  if (entry.notes) unmapped["agent_notes"] = entry.notes;
  unmapped["entered_by"] = entry.enteredByAgentId;

  return {
    ok: true,
    lead: {
      // A referral is its own source and must never be lumped in with
      // walk-ins: referred leads convert far better, and burying them in a
      // generic bucket hides the cheapest channel the broker has.
      source: entry.referralCode ? "referral" : "walkin",
      sourceEventId: entry.entryId,
      ...(entry.referralCode ? { sourceCampaign: `referral:${entry.referralCode}` } : {}),
      ...(entry.fullName ? { fullName: entry.fullName } : mapped.fullName ? { fullName: mapped.fullName } : {}),
      phoneRaw: entry.phone,
      phoneE164,
      ...(entry.email ? { email: entry.email } : {}),
      ...(entry.city ? { city: entry.city } : {}),
      qualification: mapped.qualification,
      consentSource: entry.referralCode ? "referral_introduction" : "walk_in",
      consentAt: entry.enteredAt ?? new Date(),
      isTest: false,
      unmappedFields: unmapped,
    },
  };
}
