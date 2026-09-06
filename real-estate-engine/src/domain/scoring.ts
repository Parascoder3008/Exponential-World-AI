/**
 * Lead scoring.
 *
 * Two rules govern this file and neither is negotiable:
 *
 *   1. The score ORDERS THE QUEUE. It never removes a lead from it.
 *      Only `disqualify()` can take a lead out of the pipeline, and it fires
 *      on facts (wrong city, bad number, a broker, a job seeker) — never on
 *      a soft signal like "timeline is 6 months". In real estate, intent is
 *      manufactured by the salesperson, not detected by a bot. A model that
 *      discards slow buyers deletes revenue that never shows up in a report.
 *
 *   2. The breakdown is always returned and always stored. When the broker
 *      says "your AI is wrong", you open the row and show them the
 *      arithmetic. A score nobody can audit is a score nobody trusts, and a
 *      score nobody trusts gets overridden until the system is decorative.
 *
 * The weights below are an informed starting point, NOT truth. Re-fit them
 * after ~90 days against actual visit-to-booking outcomes.
 */

import type { InventoryBand, Qualification, Tier } from "./types.js";

export interface ScoreComponent {
  factor: string;
  points: number;
  max: number;
  because: string;
}

export interface ScoreResult {
  score: number;
  tier: Tier;
  breakdown: ScoreComponent[];
  /** Fields still missing. Drives what the bot asks next. */
  missing: (keyof Qualification)[];
}

export const TIER_THRESHOLDS = { hot: 65, warm: 35 } as const;

const TIMELINE_POINTS = {
  immediate: 30,
  "1_3_months": 22,
  "3_6_months": 12,
  "6_plus_months": 5,
  unclear: 8, // unknown scores above "far off" — absence of data is not a negative signal
} as const;

const FUNDING_POINTS = {
  loan_approved: 10,
  loan_needed: 6,
  self: 10,
  unclear: 3,
} as const;

const PURPOSE_POINTS = { end_use: 8, investment: 6, unclear: 4 } as const;

/**
 * Budget fit against the inventory the broker actually sells. Without an
 * inventory band there is nothing to fit against, so we award the neutral
 * "unclear" score rather than punishing the lead for our own missing data.
 */
function budgetFit(q: Qualification, band?: InventoryBand): ScoreComponent {
  const max = 25;
  if (!band) {
    return { factor: "budget_fit", points: 10, max, because: "no inventory band configured — neutral" };
  }
  if (q.budgetMax === undefined && q.budgetMin === undefined) {
    return { factor: "budget_fit", points: 8, max, because: "budget not captured yet" };
  }
  const lo = q.budgetMin ?? q.budgetMax!;
  const hi = q.budgetMax ?? q.budgetMin!;

  const overlaps = hi >= band.priceMin && lo <= band.priceMax;
  if (overlaps) {
    return { factor: "budget_fit", points: 25, max, because: "budget overlaps inventory range" };
  }
  const stretchLo = band.priceMin * 0.8;
  const stretchHi = band.priceMax * 1.2;
  if (hi >= stretchLo && lo <= stretchHi) {
    return { factor: "budget_fit", points: 12, max, because: "within ~20% of inventory range" };
  }
  return { factor: "budget_fit", points: 0, max, because: "budget far outside inventory range" };
}

function engagementPoints(minutes: number | undefined): ScoreComponent {
  const max = 7;
  if (minutes === undefined) {
    return { factor: "engagement", points: 2, max, because: "no reply recorded yet" };
  }
  if (minutes <= 10) return { factor: "engagement", points: 7, max, because: "replied within 10 min" };
  if (minutes <= 60) return { factor: "engagement", points: 4, max, because: "replied within 1 hour" };
  return { factor: "engagement", points: 2, max, because: "replied after an hour" };
}

function visitReadyPoints(v: Qualification["siteVisitReady"]): ScoreComponent {
  const max = 20;
  if (v === true) return { factor: "site_visit_ready", points: 20, max, because: "said yes to a visit" };
  if (v === "maybe") return { factor: "site_visit_ready", points: 10, max, because: "open to a visit" };
  if (v === false) return { factor: "site_visit_ready", points: 0, max, because: "declined a visit for now" };
  return { factor: "site_visit_ready", points: 5, max, because: "not asked yet" };
}

const REQUIRED_FIELDS: (keyof Qualification)[] = [
  "budgetMax",
  "configuration",
  "preferredAreas",
  "purpose",
  "timeline",
  "funding",
  "siteVisitReady",
];

export function scoreLead(q: Qualification, band?: InventoryBand): ScoreResult {
  const timeline = q.timeline ?? "unclear";
  const funding = q.funding ?? "unclear";
  const purpose = q.purpose ?? "unclear";

  const breakdown: ScoreComponent[] = [
    {
      factor: "timeline",
      points: TIMELINE_POINTS[timeline],
      max: 30,
      because: `timeline = ${timeline}`,
    },
    budgetFit(q, band),
    visitReadyPoints(q.siteVisitReady),
    { factor: "funding", points: FUNDING_POINTS[funding], max: 10, because: `funding = ${funding}` },
    { factor: "purpose", points: PURPOSE_POINTS[purpose], max: 8, because: `purpose = ${purpose}` },
    engagementPoints(q.minutesToFirstReply),
  ];

  const score = breakdown.reduce((sum, c) => sum + c.points, 0);

  const missing = REQUIRED_FIELDS.filter((f) => {
    const v = q[f];
    return v === undefined || (Array.isArray(v) && v.length === 0);
  });

  return { score, tier: tierFor(score), breakdown, missing };
}

export function tierFor(score: number): Exclude<Tier, "disqualified"> {
  if (score >= TIER_THRESHOLDS.hot) return "hot";
  if (score >= TIER_THRESHOLDS.warm) return "warm";
  return "cold";
}

/**
 * Hard disqualification. Facts only — never a soft intent signal.
 * Every reason here is human-reversible from the dashboard.
 */
export type DisqualifyReason =
  | "invalid_phone"
  | "outside_service_city"
  | "is_broker"
  | "is_job_seeker"
  | "test_or_spam";

export interface DisqualifyInput {
  phoneValid: boolean;
  city?: string;
  serviceCities?: string[];
  selfDeclared?: "broker" | "job_seeker" | "buyer";
  isTest?: boolean;
}

export function disqualify(input: DisqualifyInput): DisqualifyReason | null {
  if (input.isTest) return "test_or_spam";
  if (!input.phoneValid) return "invalid_phone";
  if (input.selfDeclared === "broker") return "is_broker";
  if (input.selfDeclared === "job_seeker") return "is_job_seeker";
  if (
    input.city &&
    input.serviceCities &&
    input.serviceCities.length > 0 &&
    !input.serviceCities.some((c) => c.toLowerCase() === input.city!.toLowerCase())
  ) {
    return "outside_service_city";
  }
  return null;
}
