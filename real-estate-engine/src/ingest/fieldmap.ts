/**
 * Form field interpretation — the part that actually decides whether a lead
 * arrives usable or arrives as an unreadable blob.
 *
 * Every platform hands you free-form question wording chosen by whoever built
 * the form. Meta gives you `what_is_your_budget?`, the next campaign gives you
 * `budget_range`, an agency gives you `Aapka budget kya hai?`. Google gives
 * typed column ids for standard fields but free text for custom questions.
 * LinkedIn gives both. All of it lands here.
 *
 * Two rules:
 *   1. Match on a normalised, punctuation-stripped form of the name, against
 *      synonym lists — never on exact string equality.
 *   2. Anything unmatched goes to `unmappedFields`, never to /dev/null.
 */

import type { Configuration, Funding, Purpose, Qualification, Timeline } from "../domain/types.js";
import type { RawIngestField } from "./types.js";

export type CanonicalField =
  | "full_name"
  | "phone"
  | "email"
  | "city"
  | "budget"
  | "configuration"
  | "preferred_areas"
  | "purpose"
  | "timeline"
  | "funding"
  | "site_visit";

/** Normalise a field name for matching: lowercase, alphanumerics only. */
export function normaliseFieldName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

/**
 * Synonyms per canonical field. Order matters: the first canonical field with
 * a matching token wins, so more specific fields are declared first.
 *
 * Hinglish entries are here because Indian lead forms genuinely use them.
 */
const SYNONYMS: [CanonicalField, string[]][] = [
  // Declared before `phone` so "whatsapp number" does not get eaten, and
  // before `budget` so "budget range" is not confused with "price range".
  ["site_visit", ["sitevisit", "visit", "sitevisitready", "wouldyouliketovisit", "schedulevisit", "visitready"]],
  ["preferred_areas", ["preferredarea", "preferredareas", "locality", "location", "preferredlocation", "area", "micromarket", "wherelookingtobuy", "ilaka"]],
  ["configuration", ["configuration", "config", "bhk", "unittype", "propertytype", "typeofproperty", "flattype", "requirement"]],
  ["budget", ["budget", "budgetrange", "yourbudget", "pricerange", "investmentamount", "budgetinlakhs", "whatisyourbudget", "budgetkyahai", "aapkabudget"]],
  ["timeline", ["timeline", "planningtobuy", "plantobuy", "purchasetimeline", "howsoon", "timeframe", "buyingtimeline", "whentobuy", "lookingtobuy", "kabtakleneha"]],
  ["funding", ["funding", "homeloan", "loan", "loanrequired", "paymentmode", "financing", "needloan"]],
  ["purpose", ["purpose", "enduseorinvestment", "reasonforbuying", "buyingfor", "investmentorenduse", "usage"]],
  ["full_name", ["fullname", "name", "yourname", "firstname", "customername", "leadname"]],
  ["phone", ["phone", "phonenumber", "mobile", "mobilenumber", "contactnumber", "whatsappnumber", "contact", "cell", "tel"]],
  ["email", ["email", "emailaddress", "workemail", "mail"]],
  ["city", ["city", "currentcity", "yourcity", "town"]],
];

export function matchField(rawName: string): CanonicalField | null {
  const n = normaliseFieldName(rawName);
  if (!n) return null;
  for (const [canonical, tokens] of SYNONYMS) {
    // Exact match first, then containment — "whatisyourbudgetrange" contains
    // "budgetrange" and must resolve, but "name" must not swallow everything.
    if (tokens.includes(n)) return canonical;
  }
  for (const [canonical, tokens] of SYNONYMS) {
    if (tokens.some((t) => t.length >= 5 && n.includes(t))) return canonical;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Budget
// ---------------------------------------------------------------------------

const LAKH = 100_000;
const CRORE = 10_000_000;

export interface BudgetRange {
  min?: number;
  max?: number;
}

/**
 * Parse Indian budget strings into rupees.
 *
 * Handles: "50L", "₹50 Lakh", "50-75 lakhs", "1.2 Cr", "Under 50 lakh",
 * "2 Cr+", "50,00,000", "5000000".
 *
 * Bare numbers are the genuinely ambiguous case. A dropdown option reading
 * "50" in a property form means fifty lakh, not fifty rupees — so anything
 * under 1000 with no unit is read as lakh. At or above 1000 it is read as
 * rupees. This is a judgement call, and it is why the raw string is always
 * preserved on the lead.
 */
export function parseIndianBudget(input: string): BudgetRange | null {
  const s = input
    .toLowerCase()
    .replace(/[₹,]/g, "")
    .replace(/\b(rs|inr|rupees)\b/g, " ")
    .trim();
  if (!s) return null;

  const openEndedLow = /\b(under|below|upto|up to|less than|max|maximum|within)\b|^</.test(s);
  const openEndedHigh = /\b(above|over|more than|plus|starting|min|minimum)\b|\+\s*$|^>/.test(s);

  const matches = [...s.matchAll(/(\d+(?:\.\d+)?)\s*(cr|crore|crores|l|lac|lacs|lakh|lakhs|k)?/g)];
  const nums = matches
    .map((m) => ({ value: Number(m[1]), unit: m[2] }))
    .filter((n) => Number.isFinite(n.value) && n.value > 0);
  if (nums.length === 0) return null;

  // "50-75 lakh": the unit trails the pair and applies to both.
  const trailingUnit = nums[nums.length - 1]!.unit;
  const scaled = nums.map((n) => scale(n.value, n.unit ?? trailingUnit));

  if (scaled.length === 1) {
    const v = scaled[0]!;
    if (openEndedLow) return { max: v };
    if (openEndedHigh) return { min: v };
    return { min: v, max: v };
  }

  const lo = Math.min(...scaled);
  const hi = Math.max(...scaled);
  return { min: lo, max: hi };
}

function scale(value: number, unit: string | undefined): number {
  switch (unit) {
    case "cr":
    case "crore":
    case "crores":
      return Math.round(value * CRORE);
    case "l":
    case "lac":
    case "lacs":
    case "lakh":
    case "lakhs":
      return Math.round(value * LAKH);
    case "k":
      return Math.round(value * 1_000);
    default:
      return value < 1_000 ? Math.round(value * LAKH) : Math.round(value);
  }
}

// ---------------------------------------------------------------------------
// Enumerated answers
// ---------------------------------------------------------------------------

export function parseConfiguration(input: string): Configuration | null {
  const s = input.toLowerCase();
  if (/\b(plot|land|nabuild|na plot)\b/.test(s)) return "plot";
  if (/\b(commercial|office|shop|retail|showroom)\b/.test(s)) return "commercial";

  const m = s.match(/(\d)\s*(?:\.\d)?\s*bhk/) ?? s.match(/^(\d)\s*$/);
  if (m) {
    const n = Number(m[1]);
    if (n === 1) return "1bhk";
    if (n === 2) return "2bhk";
    if (n === 3) return "3bhk";
    if (n >= 4) return "4bhk_plus";
  }
  if (/\bone\s*bhk\b/.test(s)) return "1bhk";
  if (/\btwo\s*bhk\b/.test(s)) return "2bhk";
  if (/\bthree\s*bhk\b/.test(s)) return "3bhk";
  if (/\b(four|penthouse|duplex)\b/.test(s)) return "4bhk_plus";
  return null;
}

export function parseTimeline(input: string): Timeline | null {
  const s = input.toLowerCase();

  // ORDER MATTERS, and it bit this function twice during development.
  // A first-match-wins cascade must test the MOST SPECIFIC pattern first,
  // otherwise a broad one intercepts it: "6 months+" contains the substring
  // "6 months", so a 3-6 check placed above the open-ended check silently
  // downgrades a long-horizon buyer into the 3-6 bucket.
  //
  // Read as: explicit open-ended first, then narrowing windows.

  // Open-ended long horizon. Note no trailing \b after "+" — "+" and the
  // space after it are both non-word chars, so \b can never match there.
  // "6 months+" puts the plus after the unit, not after the digit, so a
  // trailing-plus alternative is needed alongside "6+".
  if (
    /(6\s*\+|\+\s*6|months?\s*\+|more than 6|after 6|beyond 6|next year|\b1 year|12 months|long.?term)/.test(
      s,
    )
  )
    return "6_plus_months";

  if (/\b(immediate|immediately|urgent|asap|this month|ready to buy|within a month|1 month)\b/.test(s))
    return "immediate";

  if (/\b(1\s*-\s*3|one to three|within 3|3 months|2-3)\b/.test(s)) return "1_3_months";

  if (/\b(3\s*-\s*6|three to six|within 6|6 months|4-6)\b/.test(s)) return "3_6_months";

  // "just exploring" is deliberately NOT mapped to 6+ months. It is vague
  // phrasing, not a stated timeline, and people who write it still book
  // visits. Vague scores above an explicit long timeline, by design.
  if (/\b(just looking|exploring|browsing|not sure|no idea)\b/.test(s)) return "unclear";

  return null;
}

export function parsePurpose(input: string): Purpose | null {
  const s = input.toLowerCase();
  if (/\b(investment|invest|rental|roi|returns|resale)\b/.test(s)) return "investment";
  if (/\b(end use|enduse|self|own stay|owncstay|family|residence|live|shifting|personal)\b/.test(s))
    return "end_use";
  return null;
}

export function parseFunding(input: string): Funding | null {
  const s = input.toLowerCase();
  if (/\b(pre.?approved|sanctioned|approved|already have)\b/.test(s)) return "loan_approved";
  if (/\b(loan|finance|financing|emi|mortgage|home loan)\b/.test(s)) return "loan_needed";
  if (/\b(self|cash|own funds|outright|full payment|no loan)\b/.test(s)) return "self";
  return null;
}

export function parseYesNoMaybe(input: string): boolean | "maybe" | null {
  const s = input.toLowerCase().trim();
  if (/^(yes|y|haan|ha|sure|ok|okay|definitely|interested|this weekend|weekend)/.test(s)) return true;
  if (/^(no|n|nahi|not now|later|not interested)/.test(s)) return false;
  if (/^(maybe|may be|might|possibly|depends|shayad)/.test(s)) return "maybe";
  return null;
}

// ---------------------------------------------------------------------------
// The mapper
// ---------------------------------------------------------------------------

export interface MappedForm {
  fullName?: string;
  phoneRaw?: string;
  email?: string;
  city?: string;
  qualification: Qualification;
  unmappedFields: Record<string, string>;
}

/**
 * Turn a platform's raw answers into identity + qualification + leftovers.
 *
 * A field that matches a canonical name but whose VALUE cannot be interpreted
 * (a budget of "will discuss on call") is kept in `unmappedFields` rather than
 * dropped — the agent should still see what the buyer wrote.
 */
export function mapFormFields(fields: RawIngestField[]): MappedForm {
  const out: MappedForm = { qualification: {}, unmappedFields: {} };
  const q = out.qualification;

  for (const field of fields) {
    const value = field.values.filter(Boolean).join(", ").trim();
    if (!value) continue;

    const canonical = matchField(field.name);
    if (!canonical) {
      out.unmappedFields[field.name] = value;
      continue;
    }

    let interpreted = true;
    switch (canonical) {
      case "full_name":
        out.fullName = value;
        break;
      case "phone":
        out.phoneRaw = value;
        break;
      case "email":
        out.email = value;
        break;
      case "city":
        out.city = value;
        break;
      case "preferred_areas":
        q.preferredAreas = field.values.flatMap((v) =>
          v.split(/[,/|]/).map((s) => s.trim()).filter(Boolean),
        );
        break;
      case "budget": {
        const b = parseIndianBudget(value);
        if (b) {
          if (b.min !== undefined) q.budgetMin = b.min;
          if (b.max !== undefined) q.budgetMax = b.max;
        } else interpreted = false;
        break;
      }
      case "configuration": {
        const c = parseConfiguration(value);
        if (c) q.configuration = c;
        else interpreted = false;
        break;
      }
      case "timeline": {
        const t = parseTimeline(value);
        if (t) q.timeline = t;
        else interpreted = false;
        break;
      }
      case "purpose": {
        const p = parsePurpose(value);
        if (p) q.purpose = p;
        else interpreted = false;
        break;
      }
      case "funding": {
        const f = parseFunding(value);
        if (f) q.funding = f;
        else interpreted = false;
        break;
      }
      case "site_visit": {
        const v = parseYesNoMaybe(value);
        if (v !== null) q.siteVisitReady = v;
        else interpreted = false;
        break;
      }
    }

    // Recognised the question, could not read the answer. Keep it for the agent.
    if (!interpreted) out.unmappedFields[field.name] = value;
  }

  return out;
}
