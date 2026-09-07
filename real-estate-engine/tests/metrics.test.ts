import { describe, expect, it } from "vitest";
import { computeFunnel, ownerDashboard, sourcePerformance, type FunnelInput } from "../src/domain/metrics.js";
import type { LeadSource } from "../src/domain/types.js";

const lead = (over: Partial<FunnelInput> & { states: string[] }): FunnelInput => ({
  leadId: over.leadId ?? "l",
  source: over.source ?? "meta_lead_ad",
  createdAt: new Date("2026-06-01T00:00:00Z"),
  statesReached: new Set(over.states),
  firstResponseMinutes: over.firstResponseMinutes ?? null,
  respondedWithinSla: over.respondedWithinSla ?? null,
  isTest: over.isTest ?? false,
  disqualified: over.disqualified ?? false,
});

describe("computeFunnel", () => {
  it("counts a lead at every stage it EVER reached, not just where it sits now", () => {
    // A lead that visited and later went cold must still count as a visit.
    // Counting current state instead makes last month's report stop
    // reproducing every time a lead moves on.
    const f = computeFunnel([
      lead({ leadId: "a", states: ["contact_attempted", "qualified", "assigned", "connected", "visit_booked", "visit_done", "nurture_long"] }),
    ]);
    expect(f.visitDone).toBe(1);
    expect(f.rates.leadToVisit).toBe(100);
  });

  it("excludes test and disqualified leads from the denominator, and reports how many", () => {
    const f = computeFunnel([
      lead({ leadId: "real", states: ["contact_attempted", "visit_done", "booked"] }),
      lead({ leadId: "test", states: ["contact_attempted"], isTest: true }),
      lead({ leadId: "dq", states: ["contact_attempted"], disqualified: true }),
    ]);
    expect(f.leads).toBe(1);
    expect(f.excluded).toBe(2);
    expect(f.rates.leadToBooking).toBe(100);
  });

  it("computes no-show rate against every visit that was supposed to happen", () => {
    const f = computeFunnel([
      lead({ leadId: "a", states: ["visit_booked", "visit_done"] }),
      lead({ leadId: "b", states: ["visit_booked", "visit_no_show"] }),
      lead({ leadId: "c", states: ["visit_booked", "visit_no_show"] }),
    ]);
    expect(f.rates.noShowRate).toBe(66.7);
  });

  it("returns zeroes rather than NaN on an empty period", () => {
    const f = computeFunnel([]);
    expect(f.leads).toBe(0);
    expect(Object.values(f.rates).every((v) => Number.isFinite(v))).toBe(true);
  });

  it("counts a customer as booked even if 'booked' was never recorded", () => {
    const f = computeFunnel([lead({ leadId: "a", states: ["visit_done", "customer"] })]);
    expect(f.booked).toBe(1);
  });
});

describe("ownerDashboard", () => {
  it("returns exactly the five numbers the owner needs", () => {
    const d = ownerDashboard(
      [
        lead({ leadId: "a", states: ["visit_done", "booked"], firstResponseMinutes: 3, respondedWithinSla: true }),
        lead({ leadId: "b", states: ["contact_attempted"], firstResponseMinutes: 45, respondedWithinSla: false }),
      ],
      200_000,
    );
    expect(Object.keys(d).sort()).toEqual([
      "costPerBooking",
      "leadToVisitPct",
      "medianFirstResponseMinutes",
      "slaCompliancePct",
      "visitToBookingPct",
    ]);
    expect(d.medianFirstResponseMinutes).toBe(24);
    expect(d.slaCompliancePct).toBe(50);
    expect(d.costPerBooking).toBe(200_000);
  });

  it("reports null cost per booking rather than dividing by zero", () => {
    const d = ownerDashboard([lead({ leadId: "a", states: ["contact_attempted"] })], 50_000);
    expect(d.costPerBooking).toBeNull();
  });

  it("does not judge SLA on leads that were never assigned", () => {
    const d = ownerDashboard([lead({ leadId: "a", states: ["new"] })]);
    expect(d.slaCompliancePct).toBe(100);
  });
});

describe("sourcePerformance", () => {
  it("ranks by cost per BOOKING, not cost per lead", () => {
    // A channel with cheap leads that never visit is the most expensive
    // channel you have. Cost per lead is the number that hides that.
    const leads: FunnelInput[] = [
      ...Array.from({ length: 100 }, (_, i) =>
        lead({ leadId: `cheap${i}`, source: "linkedin_ads" as LeadSource, states: ["contact_attempted"] }),
      ),
      ...Array.from({ length: 10 }, (_, i) =>
        lead({ leadId: `good${i}`, source: "referral" as LeadSource, states: ["visit_done", "booked"] }),
      ),
    ];
    const rows = sourcePerformance(leads, { linkedin_ads: 100_000, referral: 20_000 });

    expect(rows[0]!.source).toBe("referral");
    expect(rows[0]!.costPerBooking).toBe(2_000);
    // LinkedIn looks cheap per lead and is infinitely expensive per booking.
    const li = rows.find((r) => r.source === "linkedin_ads")!;
    expect(li.costPerLead).toBe(1_000);
    expect(li.costPerBooking).toBeNull();
    expect(rows[rows.length - 1]!.source).toBe("linkedin_ads");
  });

  it("does not make a source with no spend data look free", () => {
    const rows = sourcePerformance([lead({ leadId: "a", source: "walkin", states: ["booked"] })]);
    expect(rows[0]!.costPerBooking).toBeNull();
    expect(rows[0]!.spend).toBeNull();
  });

  it("drops test leads from every source row", () => {
    const rows = sourcePerformance([
      lead({ leadId: "a", source: "google_ads", states: ["contact_attempted"], isTest: true }),
    ]);
    expect(rows.find((r) => r.source === "google_ads")?.leads ?? 0).toBe(0);
  });
});
