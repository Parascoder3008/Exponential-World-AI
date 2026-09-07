/**
 * Retention, re-engagement and referral.
 *
 * The layer everyone plans and nobody builds, and the one with the best
 * margin: a referred lead costs nothing to acquire and converts better than
 * anything you can buy.
 *
 * The governing idea: a REASON to make contact converts, "just following up"
 * does not. So revival here is trigger-based, not calendar-based. A quarterly
 * sweep that messages everyone the same "any update sir?" trains people to
 * ignore you, and burns the WhatsApp number's quality rating doing it.
 */

import { clampToContactWindow } from "./cadence.js";
import type { VisitOutcome } from "./booking.js";
import type { Qualification } from "./types.js";

// ---------------------------------------------------------------------------
// Post-visit sequence — driven by the objection, not by a generic template
// ---------------------------------------------------------------------------

export interface PostVisitStep {
  offsetHours: number;
  label: string;
  /** What the message must actually contain to be worth sending. */
  substance: string;
}

/**
 * The objection recorded on the feedback form selects the sequence.
 *
 * This is the single reason the post-visit feedback form is mandatory: without
 * a recorded objection every one of these collapses into the same useless
 * "thanks for visiting" message.
 */
export const POST_VISIT_SEQUENCES: Record<VisitOutcome, readonly PostVisitStep[]> = {
  ready_to_book: [
    { offsetHours: 2, label: "booking checklist", substance: "documents, payment schedule, next step" },
    { offsetHours: 24, label: "agent call to close", substance: "agreement walkthrough" },
  ],
  interested: [
    { offsetHours: 4, label: "thank you + unit details", substance: "the specific unit they saw, floor plan, price" },
    { offsetHours: 48, label: "availability nudge", substance: "how many units left in that configuration" },
    { offsetHours: 168, label: "agent call", substance: "address whatever is unresolved" },
  ],
  budget_objection: [
    { offsetHours: 24, label: "payment plan options", substance: "EMI breakdown, subvention, smaller configuration in same project" },
    { offsetHours: 96, label: "alternatives within budget", substance: "2-3 projects that actually fit their number" },
    { offsetHours: 336, label: "price movement update", substance: "any revision or offer on the original unit" },
  ],
  location_objection: [
    { offsetHours: 24, label: "alternatives in preferred area", substance: "2-3 projects in the localities they named" },
    { offsetHours: 168, label: "connectivity / infrastructure update", substance: "metro, road, school news for the original area" },
  ],
  comparing_options: [
    { offsetHours: 24, label: "honest comparison", substance: "side-by-side vs the specific competitor they named" },
    { offsetHours: 120, label: "differentiator proof", substance: "possession record, RERA status, resale data" },
    { offsetHours: 336, label: "decision nudge", substance: "what changes if they wait" },
  ],
  wants_alternatives: [
    { offsetHours: 6, label: "curated shortlist", substance: "3 options matching the revised brief" },
    { offsetHours: 72, label: "second visit offer", substance: "one-tap slot booking" },
  ],
  not_interested: [
    { offsetHours: 48, label: "close the loop gracefully", substance: "thanks, and one-tap to stop hearing from us" },
  ],
};

export function postVisitSchedule(
  outcome: VisitOutcome,
  visitEndedAt: Date,
): { at: Date; step: PostVisitStep }[] {
  return POST_VISIT_SEQUENCES[outcome].map((step) => ({
    at: clampToContactWindow(new Date(visitEndedAt.getTime() + step.offsetHours * 3_600_000)),
    step,
  }));
}

// ---------------------------------------------------------------------------
// Trigger-based revival
// ---------------------------------------------------------------------------

export type RevivalTrigger =
  | "new_launch_in_area"
  | "price_drop"
  | "loan_rate_cut"
  | "possession_announced"
  | "inventory_matching_budget";

export interface RevivalEvent {
  trigger: RevivalTrigger;
  /** Localities the event applies to. Empty = applies everywhere. */
  areas: string[];
  /** Price band the event applies to, if any. */
  priceMin?: number;
  priceMax?: number;
  projectName?: string;
}

export interface RevivalCandidate {
  leadId: string;
  qualification: Qualification;
  lastContactedAt: Date;
  doNotContact: boolean;
}

/** Never re-approach a dormant lead more often than this. */
export const REVIVAL_COOLDOWN_DAYS = 45;

/**
 * Match dormant leads to a real-world event worth calling them about.
 *
 * A lead matches only if the event is genuinely relevant to what THEY said
 * they wanted. A "new launch in Wakad" sent to someone who asked about Kharadi
 * is spam with extra steps, and it is how a WhatsApp number gets reported.
 */
export function matchRevivalCandidates(
  event: RevivalEvent,
  candidates: RevivalCandidate[],
  now: Date = new Date(),
): RevivalCandidate[] {
  const cooldownMs = REVIVAL_COOLDOWN_DAYS * 24 * 3_600_000;

  return candidates.filter((c) => {
    if (c.doNotContact) return false;
    if (now.getTime() - c.lastContactedAt.getTime() < cooldownMs) return false;

    // A rate cut is relevant to anyone who needs a loan, wherever they are.
    if (event.trigger === "loan_rate_cut") {
      return c.qualification.funding === "loan_needed" || c.qualification.funding === "loan_approved";
    }

    if (event.areas.length > 0) {
      const wanted = (c.qualification.preferredAreas ?? []).map((a) => a.trim().toLowerCase());
      if (wanted.length === 0) return false;
      const eventAreas = event.areas.map((a) => a.trim().toLowerCase());
      if (!wanted.some((w) => eventAreas.some((e) => e === w || e.includes(w) || w.includes(e)))) {
        return false;
      }
    }

    if (event.priceMin !== undefined || event.priceMax !== undefined) {
      const lo = c.qualification.budgetMin ?? c.qualification.budgetMax;
      const hi = c.qualification.budgetMax ?? c.qualification.budgetMin;
      if (lo === undefined || hi === undefined) return false;
      const eLo = event.priceMin ?? 0;
      const eHi = event.priceMax ?? Number.MAX_SAFE_INTEGER;
      // Overlap with a 20% stretch — someone at ₹95L will look at ₹1.05Cr.
      if (hi * 1.2 < eLo || lo * 0.8 > eHi) return false;
    }

    return true;
  });
}

// ---------------------------------------------------------------------------
// Customer milestones — the relationship that produces referrals
// ---------------------------------------------------------------------------

export type Milestone =
  | "booking_confirmed"
  | "agreement_signed"
  | "registration_done"
  | "construction_update"
  | "possession_due"
  | "possession_done"
  | "possession_plus_30d"
  | "possession_anniversary";

export interface MilestoneMessage {
  milestone: Milestone;
  substance: string;
  /** Milestones that carry a referral ask. Timing matters more than wording. */
  askForReferral: boolean;
}

/**
 * Milestone updates are utility messages: cheap, welcome, and they keep the
 * relationship warm for the twelve to thirty-six months between booking and
 * possession — the window in which brokers normally go silent and forfeit the
 * referral entirely.
 *
 * The referral ask lands at possession + 30 days, not at booking. At booking
 * the buyer is anxious about money; thirty days after moving in they are
 * showing the place to relatives. That is the moment.
 */
export const MILESTONES: readonly MilestoneMessage[] = [
  { milestone: "booking_confirmed", substance: "what happens next, timeline, who to contact", askForReferral: false },
  { milestone: "agreement_signed", substance: "copy of agreement, payment schedule", askForReferral: false },
  { milestone: "registration_done", substance: "registration papers, loan disbursement steps", askForReferral: false },
  { milestone: "construction_update", substance: "photos of actual progress on their tower", askForReferral: false },
  { milestone: "possession_due", substance: "handover checklist, snag list process", askForReferral: false },
  { milestone: "possession_done", substance: "congratulations, warranty and support contacts", askForReferral: false },
  { milestone: "possession_plus_30d", substance: "settling in? + referral ask with the incentive stated", askForReferral: true },
  { milestone: "possession_anniversary", substance: "area price movement on their property + referral ask", askForReferral: true },
];

// ---------------------------------------------------------------------------
// Referral
// ---------------------------------------------------------------------------

/** Referred leads jump the queue. They convert better than anything bought. */
export const REFERRAL_SCORE_BONUS = 15;

export interface Referral {
  code: string;
  referrerLeadId: string;
  createdAt: Date;
  referredLeadIds: string[];
}

/**
 * Deterministic, human-readable referral code.
 *
 * Readable matters: people relay these over the phone and in WhatsApp voice
 * notes. Deterministic matters: regenerating for the same customer must not
 * orphan a code already shared with their family.
 */
export function referralCode(referrerLeadId: string, name?: string): string {
  const prefix = (name ?? "REF")
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 4)
    .padEnd(3, "X");
  let hash = 0;
  for (const ch of referrerLeadId) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  // Base36, uppercase, ambiguous characters removed (0/O and 1/I).
  const suffix = hash.toString(36).toUpperCase().replace(/[01OI]/g, "7").slice(-4).padStart(4, "7");
  return `${prefix}-${suffix}`;
}
