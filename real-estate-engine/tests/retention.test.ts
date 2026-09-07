import { describe, expect, it } from "vitest";
import {
  MILESTONES,
  POST_VISIT_SEQUENCES,
  REVIVAL_COOLDOWN_DAYS,
  matchRevivalCandidates,
  postVisitSchedule,
  referralCode,
  type RevivalCandidate,
} from "../src/domain/retention.js";
import { isInContactWindow } from "../src/domain/cadence.js";

const now = new Date("2026-06-01T06:00:00Z");
const daysAgo = (n: number) => new Date(now.getTime() - n * 86_400_000);

const candidate = (over: Partial<RevivalCandidate> = {}): RevivalCandidate => ({
  leadId: "l1",
  qualification: { preferredAreas: ["Wakad"], budgetMin: 7_000_000, budgetMax: 9_000_000 },
  lastContactedAt: daysAgo(120),
  doNotContact: false,
  ...over,
});

describe("post-visit sequences", () => {
  it("gives every outcome its own sequence, driven by the recorded objection", () => {
    // Without a recorded objection all of these collapse into the same
    // useless "thanks for visiting" message. That is why the feedback form
    // is mandatory.
    const budget = POST_VISIT_SEQUENCES.budget_objection.map((s) => s.substance).join(" ");
    const location = POST_VISIT_SEQUENCES.location_objection.map((s) => s.substance).join(" ");
    expect(budget).toMatch(/EMI|budget/i);
    expect(location).toMatch(/localit|connectivity/i);
    expect(budget).not.toBe(location);
  });

  it("schedules every step inside the contact window", () => {
    const sched = postVisitSchedule("budget_objection", new Date("2026-06-01T14:00:00Z"));
    expect(sched.length).toBeGreaterThan(0);
    for (const s of sched) expect(isInContactWindow(s.at), s.step.label).toBe(true);
  });

  it("gives a clear 'no' a single graceful close with a one-tap stop", () => {
    expect(POST_VISIT_SEQUENCES.not_interested).toHaveLength(1);
    expect(POST_VISIT_SEQUENCES.not_interested[0]!.substance).toMatch(/stop/i);
  });
});

describe("trigger-based revival", () => {
  it("matches a launch only to people who asked about that area", () => {
    const matched = matchRevivalCandidates(
      { trigger: "new_launch_in_area", areas: ["Wakad"] },
      [candidate({ leadId: "yes" }), candidate({ leadId: "no", qualification: { preferredAreas: ["Kharadi"] } })],
      now,
    );
    expect(matched.map((c) => c.leadId)).toEqual(["yes"]);
  });

  it("sends a rate cut to loan buyers regardless of location", () => {
    const matched = matchRevivalCandidates(
      { trigger: "loan_rate_cut", areas: [] },
      [
        candidate({ leadId: "loan", qualification: { funding: "loan_needed" } }),
        candidate({ leadId: "cash", qualification: { funding: "self" } }),
      ],
      now,
    );
    expect(matched.map((c) => c.leadId)).toEqual(["loan"]);
  });

  it("respects the cooldown so nobody is re-approached too soon", () => {
    const recent = candidate({ lastContactedAt: daysAgo(REVIVAL_COOLDOWN_DAYS - 1) });
    expect(matchRevivalCandidates({ trigger: "new_launch_in_area", areas: ["Wakad"] }, [recent], now)).toEqual([]);
  });

  it("never contacts an opted-out lead, however good the trigger", () => {
    const optedOut = candidate({ doNotContact: true });
    expect(matchRevivalCandidates({ trigger: "price_drop", areas: ["Wakad"] }, [optedOut], now)).toEqual([]);
  });

  it("matches a price event with a 20% stretch on either side", () => {
    // Someone at ₹95L will look at ₹1.05Cr; excluding them wastes the trigger.
    const stretchy = candidate({ qualification: { preferredAreas: ["Wakad"], budgetMax: 9_500_000 } });
    const matched = matchRevivalCandidates(
      { trigger: "inventory_matching_budget", areas: ["Wakad"], priceMin: 10_000_000, priceMax: 11_000_000 },
      [stretchy],
      now,
    );
    expect(matched).toHaveLength(1);

    const farOff = candidate({ qualification: { preferredAreas: ["Wakad"], budgetMax: 3_000_000 } });
    expect(
      matchRevivalCandidates(
        { trigger: "inventory_matching_budget", areas: ["Wakad"], priceMin: 10_000_000, priceMax: 11_000_000 },
        [farOff],
        now,
      ),
    ).toEqual([]);
  });

  it("does not blast an area event to leads who never named an area", () => {
    const noArea = candidate({ qualification: {} });
    expect(matchRevivalCandidates({ trigger: "price_drop", areas: ["Wakad"] }, [noArea], now)).toEqual([]);
  });
});

describe("milestones", () => {
  it("asks for the referral after possession, not at booking", () => {
    // At booking the buyer is anxious about money. Thirty days after moving
    // in they are showing the place to relatives. That is the moment.
    const asks = MILESTONES.filter((m) => m.askForReferral).map((m) => m.milestone);
    expect(asks).toEqual(["possession_plus_30d", "possession_anniversary"]);
    expect(MILESTONES.find((m) => m.milestone === "booking_confirmed")!.askForReferral).toBe(false);
  });
});

describe("referral codes", () => {
  it("is stable for the same customer, so a shared code never orphans", () => {
    expect(referralCode("lead-000123", "Rahul")).toBe(referralCode("lead-000123", "Rahul"));
  });

  it("differs between customers", () => {
    expect(referralCode("lead-000123", "Rahul")).not.toBe(referralCode("lead-000124", "Rahul"));
  });

  it("avoids characters people misread when relaying a code by phone", () => {
    for (const id of ["lead-1", "lead-2", "lead-999999", "abc"]) {
      const code = referralCode(id, "Test");
      expect(code, code).toMatch(/^[A-Z]{3,4}-[A-Z2-9]{4}$/);
      expect(code.split("-")[1]).not.toMatch(/[01OI]/);
    }
  });

  it("copes with a name that has no usable letters", () => {
    expect(referralCode("lead-1", "123")).toMatch(/^REFX?-|^[A-Z]{3,4}-/);
  });
});
