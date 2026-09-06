import { describe, expect, it } from "vitest";
import {
  CADENCES,
  MIN_HOURS_BETWEEN_MESSAGES,
  clampToContactWindow,
  isInContactWindow,
  nextCadenceAction,
  type CadenceState,
} from "../src/domain/cadence.js";

/** Build a UTC instant from an IST wall-clock time. IST = UTC+5:30. */
const ist = (day: number, hour: number, min = 0) =>
  new Date(Date.UTC(2026, 5, day, hour - 5, min - 30));

const base: CadenceState = {
  tier: "hot",
  anchorAt: ist(1, 10),
  stepIndex: 0,
  lastMessageAt: null,
  humanHandoff: false,
  doNotContact: false,
};

describe("contact window", () => {
  it("accepts 09:00 IST and rejects 08:59 and 20:00", () => {
    expect(isInContactWindow(ist(1, 9, 0))).toBe(true);
    expect(isInContactWindow(ist(1, 19, 59))).toBe(true);
    expect(isInContactWindow(ist(1, 8, 59))).toBe(false);
    expect(isInContactWindow(ist(1, 20, 0))).toBe(false);
  });

  it("pushes an early-morning send forward to 09:00 the same day", () => {
    expect(clampToContactWindow(ist(1, 6, 30)).toISOString()).toBe(ist(1, 9).toISOString());
  });

  it("pushes a late-night send to 09:00 the next day", () => {
    expect(clampToContactWindow(ist(1, 23, 15)).toISOString()).toBe(ist(2, 9).toISOString());
  });

  it("never moves a legal send time backwards", () => {
    const at = ist(1, 14, 20);
    expect(clampToContactWindow(at).toISOString()).toBe(at.toISOString());
  });
});

describe("nextCadenceAction", () => {
  it("fires the first hot step immediately", () => {
    const r = nextCadenceAction(base);
    expect(r.action).toBe("send");
    if (r.action !== "send") return;
    expect(r.step.channel).toBe("whatsapp");
    expect(r.dueAt.toISOString()).toBe(ist(1, 10).toISOString());
  });

  it("pauses the moment a human takes over", () => {
    expect(nextCadenceAction({ ...base, humanHandoff: true })).toEqual({
      action: "pause",
      reason: "human_handoff",
    });
  });

  it("pauses for do-not-contact ahead of everything else", () => {
    expect(nextCadenceAction({ ...base, doNotContact: true, humanHandoff: true })).toEqual({
      action: "pause",
      reason: "do_not_contact",
    });
  });

  it("enforces the 24h gap between automated messages", () => {
    // Step 2 of the hot ladder is a WhatsApp at anchor+2h, but we messaged
    // 1h ago — so it must slip to 23h from now, not fire on schedule.
    const r = nextCadenceAction({
      ...base,
      stepIndex: 2,
      lastMessageAt: ist(1, 11),
    });
    expect(r.action).toBe("send");
    if (r.action !== "send") return;
    const gapHours = (r.dueAt.getTime() - ist(1, 11).getTime()) / 3_600_000;
    expect(gapHours).toBeGreaterThanOrEqual(MIN_HOURS_BETWEEN_MESSAGES);
  });

  it("does not apply the message cap to an agent call task", () => {
    const r = nextCadenceAction({ ...base, stepIndex: 1, lastMessageAt: ist(1, 10) });
    expect(r.action).toBe("send");
    if (r.action !== "send") return;
    expect(r.step.channel).toBe("call");
    // anchor + 0.1h = 10:06 IST, unaffected by the message we just sent.
    expect(r.dueAt.toISOString()).toBe(ist(1, 10, 6).toISOString());
  });

  it("moves a lead to long nurture once the ladder is exhausted, never to a dead end", () => {
    const r = nextCadenceAction({ ...base, stepIndex: CADENCES.hot.length });
    expect(r).toEqual({ action: "exhausted", nextState: "nurture_long" });
  });

  it("keeps every scheduled send inside the contact window", () => {
    for (const tier of ["hot", "warm", "cold"] as const) {
      for (let i = 0; i < CADENCES[tier].length; i++) {
        // Anchor at 19:30 IST so naive offsets would land at night.
        const r = nextCadenceAction({ ...base, tier, stepIndex: i, anchorAt: ist(1, 19, 30) });
        expect(r.action).toBe("send");
        if (r.action !== "send") continue;
        expect(isInContactWindow(r.dueAt), `${tier} step ${i} -> ${r.dueAt.toISOString()}`).toBe(true);
      }
    }
  });

  it("defines every ladder as strictly increasing and ending in a final step", () => {
    for (const tier of ["hot", "warm", "cold"] as const) {
      const steps = CADENCES[tier];
      for (let i = 1; i < steps.length; i++) {
        expect(steps[i]!.offsetHours, `${tier} step ${i}`).toBeGreaterThan(steps[i - 1]!.offsetHours);
      }
      expect(steps[steps.length - 1]!.final, tier).toBe(true);
    }
  });
});
