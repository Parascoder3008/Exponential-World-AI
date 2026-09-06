/**
 * The common shape every ad-platform adapter produces.
 *
 * Adapters differ wildly in envelope, auth and delivery model. They must NOT
 * differ in output — the ingest pipeline downstream of this type is one code
 * path, and adding a fourth platform must never touch it.
 */

import type { LeadSource, Qualification } from "../domain/types.js";

/** A single answer from a lead form, before any interpretation. */
export interface RawIngestField {
  /** The platform's field name/id, exactly as delivered. */
  name: string;
  /** Platforms variously send one value or many (checkboxes). */
  values: string[];
}

export interface NormalisedLead {
  source: LeadSource;
  /**
   * The platform's own id for this submission. Ingest is idempotent on
   * (source, sourceEventId) — every one of these platforms retries delivery,
   * and a duplicate lead means two agents call the same buyer.
   */
  sourceEventId: string;
  sourceCampaign?: string;

  fullName?: string;
  phoneRaw?: string;
  /** Normalised. Null when normalisation failed — store the lead anyway. */
  phoneE164: string | null;
  email?: string;
  city?: string;

  qualification: Qualification;

  consentSource: string;
  consentAt: Date;

  /** Platform test submissions must never reach a salesperson. */
  isTest: boolean;

  /**
   * Everything we could not map to a known field, kept verbatim.
   *
   * This is not defensive clutter. Form builders invent question wording
   * constantly ("Which floor do you prefer?", "Do you have a car parking
   * requirement?"), and a mapper that silently drops what it does not
   * recognise loses information nobody notices for months. Persist this to
   * the activity payload and review it monthly — it is also how you discover
   * the synonyms worth adding to the field map.
   */
  unmappedFields: Record<string, string>;
}

export type IngestResult =
  | { ok: true; lead: NormalisedLead }
  | { ok: false; reason: IngestFailure; detail: string };

export type IngestFailure =
  | "bad_signature"
  | "unrecognised_payload"
  | "missing_identity";

/** Thrown for auth failures, which are operational faults rather than data. */
export class SignatureVerificationError extends Error {
  constructor(readonly platform: string, detail: string) {
    super(`${platform} signature verification failed: ${detail}`);
    this.name = "SignatureVerificationError";
  }
}
