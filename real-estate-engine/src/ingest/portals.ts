/**
 * Property portal ingest: 99acres, MagicBricks, Housing.com, NoBroker.
 *
 * WHY THIS IS EMAIL-BASED AND NOT API-BASED.
 *
 * Every one of these portals gates its lead API / CRM push behind a higher
 * subscription tier plus a support request, and which tier varies by account,
 * city and sales rep. So an API integration cannot be promised in a proposal —
 * you find out whether it exists after the contract is signed.
 *
 * Every one of them, on every plan, emails the lead to the account holder.
 *
 * So email parsing is the DEFAULT path, not the fallback. It works on day one
 * for any client, it is vendor-independent, and it survives a portal changing
 * its API terms. If a client turns out to have API access, that becomes a
 * faster second source feeding the same dedupe — not a rewrite.
 *
 * The parsers are label-driven rather than layout-driven: they hunt for
 * "Name:", "Phone:", "Budget:" style labels anywhere in the text, in any
 * order. Portals redesign their email templates regularly, and a parser tied
 * to line positions breaks on the first redesign — silently, at 2am, with the
 * day's leads going to /dev/null.
 */

import { phoneKey } from "../domain/phone.js";
import type { LeadSource } from "../domain/types.js";
import { mapFormFields } from "./fieldmap.js";
import type { NormalisedLead, RawIngestField } from "./types.js";

export interface InboundEmail {
  /** Message-ID header — the idempotency key. */
  messageId: string;
  from: string;
  subject: string;
  /** Plain-text body. Strip HTML before calling. */
  text: string;
  receivedAt: Date;
}

export interface PortalSignature {
  source: LeadSource;
  /** Sender domains that identify this portal. */
  fromDomains: string[];
  /** Subject fragments, as a secondary signal when forwarding rewrites From. */
  subjectHints: string[];
}

export const PORTAL_SIGNATURES: readonly PortalSignature[] = [
  {
    source: "99acres",
    fromDomains: ["99acres.com", "99acres.in"],
    subjectHints: ["99acres", "response from 99acres"],
  },
  {
    source: "magicbricks",
    fromDomains: ["magicbricks.com"],
    subjectHints: ["magicbricks", "magic bricks"],
  },
  {
    source: "housing",
    fromDomains: ["housing.com", "proptiger.com"],
    subjectHints: ["housing.com", "new enquiry from housing"],
  },
];

/**
 * Identify the portal.
 *
 * Domain first (reliable), subject second (survives forwarding, which is how
 * most brokers will actually route these to you — they forward from their own
 * inbox rather than changing the portal's notification address).
 */
export function identifyPortal(email: InboundEmail): LeadSource | null {
  const from = email.from.toLowerCase();
  for (const sig of PORTAL_SIGNATURES) {
    if (sig.fromDomains.some((d) => from.includes(d))) return sig.source;
  }
  const subject = email.subject.toLowerCase();
  const body = email.text.toLowerCase();
  for (const sig of PORTAL_SIGNATURES) {
    if (sig.subjectHints.some((h) => subject.includes(h) || body.includes(h))) return sig.source;
  }
  return null;
}

/**
 * Labels these emails use, mapped to the names `fieldmap` already understands.
 * Adding a new label is a one-line change and needs no new parsing code.
 */
const LABELS: [RegExp, string][] = [
  [/\b(?:name|customer name|client name|posted by|enquirer)\b/i, "full_name"],
  [/\b(?:phone|mobile|contact(?: number| no\.?)?|tel)\b/i, "phone"],
  [/\b(?:e-?mail(?: id| address)?)\b/i, "email"],
  [/\b(?:city|location city)\b/i, "city"],
  [/\b(?:budget|price range|budget range)\b/i, "budget"],
  [/\b(?:property type|configuration|bhk|unit type|looking for)\b/i, "configuration"],
  [/\b(?:locality|preferred locality|area|localities|preferred location)\b/i, "preferred_areas"],
  [/\b(?:purpose|buying for)\b/i, "purpose"],
  [/\b(?:possession|timeline|when|moving in)\b/i, "timeline"],
  [/\b(?:loan|home loan|finance)\b/i, "funding"],
  [/\b(?:message|comments|requirement details|query)\b/i, "message"],
  [/\b(?:project|property|listing|property name)\b/i, "project"],
];

/**
 * Pull "Label: value" pairs out of an email body.
 *
 * Handles the three layouts these emails actually use:
 *   Name: Rahul Sharma
 *   Name    Rahul Sharma          (table cell flattened to text)
 *   Name
 *   Rahul Sharma                  (label and value on separate lines)
 */
export function extractLabelledFields(text: string): RawIngestField[] {
  // Tabs become runs of spaces so the column layout survives; internal runs of
  // spaces are PRESERVED. Collapsing them first — as an earlier version did —
  // destroys the very separator the column layout depends on, and silently
  // turned "Name          Priya Nair" into one unparseable blob.
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.replace(/\t/g, "    ").replace(/[ ]+$/, "").trimStart())
    .filter((l) => l.length > 0);

  const found: RawIngestField[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;

    // (a) "Label: value" or "Label - value"
    const colon = line.match(/^([A-Za-z][A-Za-z .\/'-]{1,40}?)\s*[:\-]\s*(.+)$/);
    if (colon && canonicalLabel(colon[1]!)) {
      push(colon[1]!, colon[2]!);
      continue;
    }

    // (b) "Label<2+ spaces>value" — a table cell flattened to text.
    const columns = line.match(/^([A-Za-z][A-Za-z .\/'-]{1,40}?)\s{2,}(\S.*)$/);
    if (columns && canonicalLabel(columns[1]!)) {
      push(columns[1]!, columns[2]!);
      continue;
    }

    // (c) Label alone, value on the next line.
    //
    // The test is "is the NEXT line itself a known label?", not "does the next
    // line LOOK like a label?". A person's name and a field label are
    // indistinguishable by shape — "Amit Desai" reads exactly like a label —
    // so a shape heuristic here drops the value of every split-line field.
    const bare = line.replace(/\s*:?$/, "").trim();
    const next = lines[i + 1];
    if (canonicalLabel(bare) && !line.includes(":") && next && !isKnownLabelLine(next)) {
      push(bare, next);
      i++;
    }
  }

  function push(rawLabel: string, value: string): void {
    const canonical = canonicalLabel(rawLabel);
    if (!canonical) return;
    const clean = value.replace(/\s+/g, " ").trim();
    if (!clean || clean === "-" || /^n\/?a$/i.test(clean)) return;
    // First occurrence wins: portal emails repeat labels in the footer
    // ("Contact 99acres support:"), and the footer must never overwrite the
    // buyer's own phone number.
    if (seen.has(canonical)) return;
    seen.add(canonical);
    found.push({ name: canonical, values: [clean] });
  }

  return found;
}

/** True when a whole line is nothing but a recognised field label. */
function isKnownLabelLine(line: string): boolean {
  const bare = line.replace(/\s*:?$/, "").trim();
  // A line carrying its own value is not a bare label.
  if (/[:]/.test(line) || /\s{2,}\S/.test(line)) return true;
  return canonicalLabel(bare) !== null;
}

function canonicalLabel(raw: string): string | null {
  const label = raw.trim();
  for (const [re, canonical] of LABELS) {
    if (re.test(label)) return canonical;
  }
  return null;
}

/**
 * Last-resort recovery: find a phone number anywhere in the body.
 *
 * Runs only when label extraction produced no phone. A portal lead without a
 * phone number is worthless, so it is worth one imprecise pass — the result
 * still goes through full E.164 validation, so a stray order number cannot
 * masquerade as a mobile.
 */
export function findLooseIndianMobile(text: string): string | null {
  const matches = text.match(/(?:\+?91[\s-]?)?[6-9]\d{9}\b/g);
  if (!matches) return null;
  for (const m of matches) {
    const key = phoneKey(m);
    if (key) return m;
  }
  return null;
}

export type PortalParseResult =
  | { ok: true; lead: NormalisedLead }
  | { ok: false; reason: "not_a_portal_email" | "no_identity"; detail: string };

/**
 * Parse a portal notification email into a lead.
 *
 * Returns a structured failure rather than throwing: an unparseable email must
 * be quarantined for a human to look at, never dropped and never crash the
 * poller mid-batch.
 */
export function parsePortalEmail(email: InboundEmail): PortalParseResult {
  const source = identifyPortal(email);
  if (!source) {
    return { ok: false, reason: "not_a_portal_email", detail: `from=${email.from}` };
  }

  const fields = extractLabelledFields(email.text);
  const hasPhone = fields.some((f) => f.name === "phone");
  if (!hasPhone) {
    const loose = findLooseIndianMobile(email.text);
    if (loose) fields.push({ name: "phone", values: [loose] });
  }

  const mapped = mapFormFields(fields);
  const phoneE164 = phoneKey(mapped.phoneRaw);

  if (!phoneE164 && !mapped.email) {
    return {
      ok: false,
      reason: "no_identity",
      detail: `no usable phone or email in ${source} mail ${email.messageId}`,
    };
  }

  const project = mapped.unmappedFields["project"];

  return {
    ok: true,
    lead: {
      source,
      sourceEventId: email.messageId,
      ...(project ? { sourceCampaign: project } : {}),
      ...(mapped.fullName ? { fullName: mapped.fullName } : {}),
      ...(mapped.phoneRaw ? { phoneRaw: mapped.phoneRaw } : {}),
      phoneE164,
      ...(mapped.email ? { email: mapped.email } : {}),
      ...(mapped.city ? { city: mapped.city } : {}),
      qualification: mapped.qualification,
      consentSource: `${source}_portal_enquiry`,
      consentAt: email.receivedAt,
      isTest: false,
      unmappedFields: mapped.unmappedFields,
    },
  };
}
