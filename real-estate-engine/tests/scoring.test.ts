import { describe, expect, it } from "vitest";
import { disqualify, scoreLead, tierFor } from "../src/domain/scoring.js";
import type { InventoryBand, Qualification } from "../src/domain/types.js";

const band: InventoryBand = { priceMin: 5_000_000, priceMax: 15_000_000 };

describe("scoreLead", () => {
  it("scores a ready buyer hot", () => {
    const q: Qualification = {
      budgetMin: 8_000_000,
      budgetMax: 12_000_000,
      timeline: "immediate",
      funding: "loan_approved",
      purpose: "end_use",
      siteVisitReady: true,
      minutesToFirstReply: 4,
    };
    const r = scoreLead(q, band);
    expect(r.tier).toBe("hot");
    expect(r.score).toBeGreaterThanOrEqual(65);
  });

  it("keeps an in-budget but slow buyer WARM, not cold", () => {
    // Documented behaviour, and deliberate: budget fit is the single heaviest
    // factor. Someone who can afford the inventory but is six months out is
    // worth more than someone urgent who cannot. A long timeline alone must
    // never demote a qualified buyer to the bottom of the queue.
    const r = scoreLead(
      {
        budgetMax: 6_000_000,
        timeline: "6_plus_months",
        funding: "unclear",
        purpose: "investment",
        siteVisitReady: false,
        minutesToFirstReply: 300,
      },
      band,
    );
    expect(r.tier).toBe("warm");
  });

  it("scores a genuinely poor-fit lead cold but NEVER disqualified", () => {
    const r = scoreLead(
      {
        budgetMax: 900_000,
        timeline: "6_plus_months",
        funding: "unclear",
        purpose: "unclear",
        siteVisitReady: false,
        minutesToFirstReply: 300,
      },
      band,
    );
    expect(r.tier).toBe("cold");
    // The whole point: a cold lead is still a lead in the pipeline. Only
    // disqualify() removes anyone, and it fires on facts, not on softness.
    expect(r.tier).not.toBe("disqualified");
  });

  it("does not punish a lead for data we have not collected yet", () => {
    const empty = scoreLead({}, band);
    const declined = scoreLead(
      { timeline: "6_plus_months", siteVisitReady: false, funding: "unclear", budgetMax: 100 },
      band,
    );
    // Silence must score better than an explicit "no" — absence of data is
    // not a negative signal, and treating it as one buries new leads.
    expect(empty.score).toBeGreaterThan(declined.score);
  });

  it("stays neutral on budget when no inventory band is configured", () => {
    const q: Qualification = { budgetMax: 1_000, timeline: "immediate" };
    const withBand = scoreLead(q, band);
    const noBand = scoreLead(q);
    expect(noBand.score).toBeGreaterThan(withBand.score);
    expect(noBand.breakdown.find((c) => c.factor === "budget_fit")?.because).toMatch(/no inventory/);
  });

  it("gives partial credit for a stretch budget", () => {
    const inRange = scoreLead({ budgetMin: 6_000_000, budgetMax: 7_000_000 }, band);
    const stretch = scoreLead({ budgetMin: 16_000_000, budgetMax: 17_000_000 }, band);
    const farOff = scoreLead({ budgetMin: 500_000, budgetMax: 900_000 }, band);
    const pts = (r: ReturnType<typeof scoreLead>) =>
      r.breakdown.find((c) => c.factor === "budget_fit")!.points;
    expect(pts(inRange)).toBe(25);
    expect(pts(stretch)).toBe(12);
    expect(pts(farOff)).toBe(0);
  });

  it("always returns an auditable breakdown that sums to the score", () => {
    const r = scoreLead({ timeline: "1_3_months", siteVisitReady: "maybe" }, band);
    expect(r.breakdown.length).toBeGreaterThan(0);
    expect(r.breakdown.reduce((s, c) => s + c.points, 0)).toBe(r.score);
    for (const c of r.breakdown) {
      expect(c.because).toBeTruthy();
      expect(c.points).toBeLessThanOrEqual(c.max);
    }
  });

  it("reports which fields the bot still needs to ask for", () => {
    const r = scoreLead({ timeline: "immediate", budgetMax: 9_000_000 }, band);
    expect(r.missing).toContain("configuration");
    expect(r.missing).toContain("siteVisitReady");
    expect(r.missing).not.toContain("timeline");
  });

  it("treats an empty preferred-areas array as missing, not answered", () => {
    expect(scoreLead({ preferredAreas: [] }).missing).toContain("preferredAreas");
    expect(scoreLead({ preferredAreas: ["Wakad"] }).missing).not.toContain("preferredAreas");
  });

  it("maps scores to tiers at the documented thresholds", () => {
    expect(tierFor(65)).toBe("hot");
    expect(tierFor(64)).toBe("warm");
    expect(tierFor(35)).toBe("warm");
    expect(tierFor(34)).toBe("cold");
  });
});

describe("disqualify", () => {
  it("fires only on facts", () => {
    expect(disqualify({ phoneValid: false })).toBe("invalid_phone");
    expect(disqualify({ phoneValid: true, selfDeclared: "broker" })).toBe("is_broker");
    expect(disqualify({ phoneValid: true, selfDeclared: "job_seeker" })).toBe("is_job_seeker");
    expect(disqualify({ phoneValid: true, isTest: true })).toBe("test_or_spam");
    expect(
      disqualify({ phoneValid: true, city: "Chennai", serviceCities: ["Pune", "Mumbai"] }),
    ).toBe("outside_service_city");
  });

  it("never disqualifies a genuine buyer, however slow", () => {
    expect(
      disqualify({
        phoneValid: true,
        city: "Pune",
        serviceCities: ["Pune"],
        selfDeclared: "buyer",
      }),
    ).toBeNull();
  });

  it("does not disqualify on city when service cities are unconfigured", () => {
    expect(disqualify({ phoneValid: true, city: "Chennai" })).toBeNull();
    expect(disqualify({ phoneValid: true, city: "Chennai", serviceCities: [] })).toBeNull();
  });

  it("matches service city case-insensitively", () => {
    expect(disqualify({ phoneValid: true, city: "pune", serviceCities: ["Pune"] })).toBeNull();
  });
});
