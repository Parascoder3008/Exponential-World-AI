import { describe, expect, it } from "vitest";
import {
  MAX_NO_SHOWS,
  MAX_RESCHEDULES,
  canReschedule,
  clampToReminderWindow,
  nextAvailableSlots,
  noShowPlan,
  outcomeToNextState,
  reminderSchedule,
} from "../src/domain/booking.js";

const ist = (day: number, hour: number, min = 0) =>
  new Date(Date.UTC(2026, 5, day, hour - 5, min - 30));

describe("reminder schedule", () => {
  it("builds the full ladder for a visit far enough away", () => {
    const r = reminderSchedule(ist(5, 11), ist(1, 10));
    expect(r.map((x) => x.kind)).toEqual(["t_minus_24h", "t_minus_3h", "t_minus_30m"]);
    expect(r[0]!.at.toISOString()).toBe(ist(4, 11).toISOString());
    expect(r[2]!.at.toISOString()).toBe(ist(5, 10, 30).toISOString());
  });

  it("drops reminders already in the past rather than firing them late", () => {
    // "Your visit is tomorrow" sent after the visit destroys trust in every
    // other message the system sends.
    const r = reminderSchedule(ist(1, 11), ist(1, 10));
    expect(r.map((x) => x.kind)).toEqual(["t_minus_30m"]);
  });

  it("returns nothing for a visit that has already started", () => {
    expect(reminderSchedule(ist(1, 9), ist(1, 10))).toEqual([]);
  });

  it("uses a WIDER window than marketing, and pulls BACKWARD not forward", () => {
    // A 03:00 reminder must move to 20:00 the previous evening. Moving it
    // forward to 07:00 could land it after the visit itself.
    expect(clampToReminderWindow(ist(5, 3)).toISOString()).toBe(ist(4, 20).toISOString());
    // 07:30 is legal for a utility reminder even though marketing starts at 09:00.
    expect(clampToReminderWindow(ist(5, 7, 30)).toISOString()).toBe(ist(5, 7, 30).toISOString());
    expect(clampToReminderWindow(ist(5, 22)).toISOString()).toBe(ist(5, 20).toISOString());
  });

  it("keeps a 7am reminder for a 10am visit, which marketing rules would have delayed", () => {
    const r = reminderSchedule(ist(5, 10), ist(4, 12));
    const t3 = r.find((x) => x.kind === "t_minus_3h");
    expect(t3?.at.toISOString()).toBe(ist(5, 7).toISOString());
  });
});

describe("rescheduling", () => {
  it("allows a reschedule with reasonable notice", () => {
    expect(canReschedule({ slotStart: ist(2, 11), status: "booked" }, 0, ist(1, 10))).toEqual({
      allowed: true,
    });
  });

  it("refuses inside the cutoff, past the limit, or on a closed visit", () => {
    expect(canReschedule({ slotStart: ist(1, 10, 30), status: "booked" }, 0, ist(1, 10))).toEqual({
      allowed: false,
      reason: "too_late",
    });
    expect(
      canReschedule({ slotStart: ist(3, 11), status: "booked" }, MAX_RESCHEDULES, ist(1, 10)),
    ).toEqual({ allowed: false, reason: "limit_reached" });
    expect(canReschedule({ slotStart: ist(3, 11), status: "done" }, 0, ist(1, 10))).toEqual({
      allowed: false,
      reason: "visit_closed",
    });
  });
});

describe("slot offers", () => {
  const siteHours = { startHour: 10, endHour: 18 };
  const siteDays = [0, 1, 2, 3, 4, 5, 6];

  it("offers whole-hour slots inside site hours only", () => {
    const slots = nextAvailableSlots({
      from: ist(1, 9, 40),
      count: 3,
      durationMinutes: 60,
      busy: [],
      siteHours,
      siteDays,
    });
    // 09:40 + 2h default lead = 11:40, rounded up to 12:00.
    expect(slots.map((s) => s.toISOString())).toEqual([
      ist(1, 12).toISOString(),
      ist(1, 13).toISOString(),
      ist(1, 14).toISOString(),
    ]);
  });

  it("never offers a slot inside the minimum lead time", () => {
    // Regression: "next whole hour" once offered a 10:00 visit at 09:40 —
    // twenty minutes for a buyer to leave work and cross a city. They accept
    // and then do not turn up, and the system logs a no-show it caused.
    const slots = nextAvailableSlots({
      from: ist(1, 11, 5),
      count: 1,
      durationMinutes: 60,
      busy: [],
      siteHours,
      siteDays,
    });
    expect(slots[0]!.toISOString()).toBe(ist(1, 14).toISOString());
    const gapMinutes = (slots[0]!.getTime() - ist(1, 11, 5).getTime()) / 60_000;
    expect(gapMinutes).toBeGreaterThanOrEqual(120);
  });

  it("honours a shorter lead time when the site has an agent on call", () => {
    const slots = nextAvailableSlots({
      from: ist(1, 10, 5),
      count: 1,
      durationMinutes: 60,
      busy: [],
      siteHours,
      siteDays,
      minLeadMinutes: 30,
    });
    expect(slots[0]!.toISOString()).toBe(ist(1, 11).toISOString());
  });

  it("does not push an already-exact hour forward unnecessarily", () => {
    const slots = nextAvailableSlots({
      from: ist(1, 10),
      count: 1,
      durationMinutes: 60,
      busy: [],
      siteHours,
      siteDays,
      minLeadMinutes: 60,
    });
    expect(slots[0]!.toISOString()).toBe(ist(1, 11).toISOString());
  });

  it("skips slots that overlap an existing commitment", () => {
    const slots = nextAvailableSlots({
      from: ist(1, 9),
      count: 2,
      durationMinutes: 60,
      busy: [{ start: ist(1, 10), end: ist(1, 12) }],
      siteHours,
      siteDays,
      minLeadMinutes: 0,
    });
    expect(slots.map((s) => s.toISOString())).toEqual([
      ist(1, 12).toISOString(),
      ist(1, 13).toISOString(),
    ]);
  });

  it("rolls over to the next open day", () => {
    // Site open Mondays only; asking on Monday evening yields next Monday.
    const slots = nextAvailableSlots({
      from: ist(1, 19),
      count: 1,
      durationMinutes: 60,
      busy: [],
      siteHours,
      siteDays: [1],
      minLeadMinutes: 0,
    });
    expect(slots[0]!.toISOString()).toBe(ist(8, 10).toISOString());
  });

  it("terminates instead of hanging when the site is never open", () => {
    const slots = nextAvailableSlots({
      from: ist(1, 9),
      count: 3,
      durationMinutes: 60,
      busy: [],
      siteHours,
      siteDays: [],
    });
    expect(slots).toEqual([]);
  });
});

describe("no-show recovery", () => {
  it("follows up the same day, inside contact hours, without blaming the buyer", () => {
    // now (11:30) is later than the slot (11:00), so the clock runs from now.
    const plan = noShowPlan(ist(1, 11), 0, ist(1, 11, 30));
    expect(plan.followUpAt.toISOString()).toBe(ist(1, 14, 30).toISOString());
    expect(plan.message).toMatch(/sorry we missed you/);
    expect(plan.escalate).toBe(false);
  });

  it("escalates to a personal call on the second no-show", () => {
    const plan = noShowPlan(ist(1, 11), MAX_NO_SHOWS - 1, ist(1, 12));
    expect(plan.escalate).toBe(true);
    expect(plan.message).toMatch(/personally/);
  });

  it("pushes a late-evening follow-up into the next contact window", () => {
    const plan = noShowPlan(ist(1, 19), 0, ist(1, 19));
    expect(plan.followUpAt.toISOString()).toBe(ist(2, 9).toISOString());
  });
});

describe("visit outcomes", () => {
  it("routes objections back to nurture, never to a dead end", () => {
    expect(outcomeToNextState("budget_objection")).toBe("nurture_long");
    expect(outcomeToNextState("location_objection")).toBe("nurture_long");
    expect(outcomeToNextState("comparing_options")).toBe("nurture_long");
  });

  it("routes real interest forward and a clear no to not_interested", () => {
    expect(outcomeToNextState("ready_to_book")).toBe("negotiation");
    expect(outcomeToNextState("interested")).toBe("negotiation");
    expect(outcomeToNextState("wants_alternatives")).toBe("visit_booked");
    expect(outcomeToNextState("not_interested")).toBe("not_interested");
  });
});
