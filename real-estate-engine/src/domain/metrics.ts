/**
 * The numbers that justify the invoice.
 *
 * Five for the owner, and no more. Every dashboard that has ever failed did so
 * by showing forty numbers, none of which anyone could act on. The manager and
 * agent views get their own, narrower slices.
 *
 * Every rate here is computed from the ACTIVITY LOG, not from current lead
 * state. A lead that reached a site visit and later went cold must still count
 * in the site-visit numerator — otherwise the funnel silently rewrites history
 * every time a lead moves on, and last month's report stops reproducing.
 */

import { median } from "./sla.js";
import type { LeadSource } from "./types.js";

export interface FunnelInput {
  leadId: string;
  source: LeadSource;
  createdAt: Date;
  /** From the activity log: the states this lead has EVER been in. */
  statesReached: Set<string>;
  firstResponseMinutes: number | null;
  respondedWithinSla: boolean | null;
  isTest: boolean;
  disqualified: boolean;
}

export interface Funnel {
  leads: number;
  contacted: number;
  qualified: number;
  assigned: number;
  connected: number;
  visitBooked: number;
  visitDone: number;
  booked: number;
  rates: {
    contactRate: number;
    leadToVisit: number;
    visitToBooking: number;
    leadToBooking: number;
    noShowRate: number;
  };
}

const pct = (num: number, den: number): number =>
  den === 0 ? 0 : Math.round((num / den) * 1000) / 10;

/**
 * Test submissions and disqualified leads are excluded from the denominator.
 *
 * Leaving them in makes every conversion rate look worse than reality and
 * gives the client a reason to distrust the whole dashboard. They are counted
 * separately in `excluded` so the number is never silently hidden.
 */
export function computeFunnel(leads: FunnelInput[]): Funnel & { excluded: number } {
  const real = leads.filter((l) => !l.isTest && !l.disqualified);
  const has = (l: FunnelInput, ...states: string[]) => states.some((s) => l.statesReached.has(s));

  const total = real.length;
  const contacted = real.filter((l) => has(l, "contact_attempted", "engaged", "assigned")).length;
  const qualified = real.filter((l) => has(l, "qualified")).length;
  const assigned = real.filter((l) => has(l, "assigned")).length;
  const connected = real.filter((l) => has(l, "connected")).length;
  const visitBooked = real.filter((l) => has(l, "visit_booked")).length;
  const visitDone = real.filter((l) => has(l, "visit_done")).length;
  const noShow = real.filter((l) => has(l, "visit_no_show")).length;
  const booked = real.filter((l) => has(l, "booked", "customer")).length;

  return {
    leads: total,
    contacted,
    qualified,
    assigned,
    connected,
    visitBooked,
    visitDone,
    booked,
    excluded: leads.length - total,
    rates: {
      contactRate: pct(contacted, total),
      leadToVisit: pct(visitDone, total),
      visitToBooking: pct(booked, visitDone),
      leadToBooking: pct(booked, total),
      // Denominator is every visit that was SUPPOSED to happen.
      noShowRate: pct(noShow, visitDone + noShow),
    },
  };
}

// ---------------------------------------------------------------------------
// The owner's five numbers
// ---------------------------------------------------------------------------

export interface OwnerDashboard {
  medianFirstResponseMinutes: number | null;
  slaCompliancePct: number;
  leadToVisitPct: number;
  visitToBookingPct: number;
  costPerBooking: number | null;
}

export function ownerDashboard(
  leads: FunnelInput[],
  spendTotal?: number,
): OwnerDashboard {
  const funnel = computeFunnel(leads);
  const real = leads.filter((l) => !l.isTest && !l.disqualified);

  const responseTimes = real
    .map((l) => l.firstResponseMinutes)
    .filter((m): m is number => m !== null);

  const slaJudged = real.filter((l) => l.respondedWithinSla !== null);
  const slaMet = slaJudged.filter((l) => l.respondedWithinSla === true).length;

  return {
    medianFirstResponseMinutes: median(responseTimes),
    slaCompliancePct: slaJudged.length === 0 ? 100 : pct(slaMet, slaJudged.length),
    leadToVisitPct: funnel.rates.leadToVisit,
    visitToBookingPct: funnel.rates.visitToBooking,
    costPerBooking:
      spendTotal === undefined || funnel.booked === 0
        ? null
        : Math.round(spendTotal / funnel.booked),
  };
}

// ---------------------------------------------------------------------------
// Attribution
// ---------------------------------------------------------------------------

export interface SourcePerformance {
  source: LeadSource;
  leads: number;
  qualified: number;
  visits: number;
  bookings: number;
  spend: number | null;
  costPerLead: number | null;
  costPerVisit: number | null;
  costPerBooking: number | null;
}

/**
 * Per-source economics, ranked by cost per booking.
 *
 * Cost per LEAD is the number every agency reports and it is close to
 * meaningless — a channel with cheap leads that never visit is the most
 * expensive channel you have. Sources with no booking yet sort last rather
 * than appearing free.
 */
export function sourcePerformance(
  leads: FunnelInput[],
  spendBySource: Partial<Record<LeadSource, number>> = {},
): SourcePerformance[] {
  const bySource = new Map<LeadSource, FunnelInput[]>();
  for (const l of leads) {
    if (l.isTest) continue;
    const arr = bySource.get(l.source) ?? [];
    arr.push(l);
    bySource.set(l.source, arr);
  }

  const rows: SourcePerformance[] = [];
  for (const [source, group] of bySource) {
    const f = computeFunnel(group);
    const spend = spendBySource[source] ?? null;
    rows.push({
      source,
      leads: f.leads,
      qualified: f.qualified,
      visits: f.visitDone,
      bookings: f.booked,
      spend,
      costPerLead: spend !== null && f.leads > 0 ? Math.round(spend / f.leads) : null,
      costPerVisit: spend !== null && f.visitDone > 0 ? Math.round(spend / f.visitDone) : null,
      costPerBooking: spend !== null && f.booked > 0 ? Math.round(spend / f.booked) : null,
    });
  }

  return rows.sort((a, b) => {
    if (a.costPerBooking === null && b.costPerBooking === null) return b.bookings - a.bookings;
    if (a.costPerBooking === null) return 1;
    if (b.costPerBooking === null) return -1;
    return a.costPerBooking - b.costPerBooking;
  });
}
