import { describe, expect, it } from "vitest";
import {
  MAX_CONSECUTIVE_FAILURES,
  MAX_QUESTIONS_PER_SESSION,
  QUESTIONS,
  applyAnswer,
  isAnswered,
  isOptOut,
  needsHuman,
  nextStep,
  type ConversationState,
} from "../src/domain/conversation.js";

const state = (over: Partial<ConversationState> = {}): ConversationState => ({
  qualification: {},
  asked: [],
  consecutiveFailures: 0,
  humanHandoff: false,
  ...over,
});

const localities = [{ id: "wakad", en: "Wakad", hi: "Wakad" }];

describe("question flow", () => {
  it("asks budget first and site visit last", () => {
    expect(QUESTIONS[0]!.id).toBe("budget");
    expect(QUESTIONS[QUESTIONS.length - 1]!.id).toBe("site_visit");
  });

  it("never re-asks something the ad form already captured", () => {
    const s = state({ qualification: { budgetMax: 5_000_000, configuration: "2bhk" } });
    const step = nextStep(s, localities);
    expect(step.action).toBe("ask");
    if (step.action !== "ask") return;
    expect(step.question.id).toBe("locality");
  });

  it("skips the locality question when the broker has configured no areas", () => {
    // A list message with zero options is a dead end in WhatsApp.
    const step = nextStep(state(), []);
    expect(step.action).toBe("ask");
    if (step.action !== "ask") return;
    expect(step.question.id).toBe("budget");

    const afterBudget = nextStep(state({ asked: ["budget"], qualification: { budgetMax: 1 } }), []);
    if (afterBudget.action !== "ask") throw new Error("expected ask");
    expect(afterBudget.question.id).not.toBe("locality");
  });

  it("hands to a human rather than interrogating past the session limit", () => {
    const s = state({ asked: new Array(MAX_QUESTIONS_PER_SESSION).fill("budget") });
    expect(nextStep(s, localities)).toEqual({ action: "handoff", reason: "session_limit" });
  });

  it("stops guessing after consecutive unreadable replies", () => {
    const s = state({ consecutiveFailures: MAX_CONSECUTIVE_FAILURES });
    expect(nextStep(s, localities)).toEqual({ action: "handoff", reason: "too_many_failures" });
  });

  it("goes silent the instant a human takes over", () => {
    expect(nextStep(state({ humanHandoff: true }), localities)).toEqual({
      action: "handoff",
      reason: "human_took_over",
    });
  });

  it("reports completion once every field is answered", () => {
    const s = state({
      qualification: {
        budgetMax: 5_000_000,
        configuration: "2bhk",
        preferredAreas: ["Wakad"],
        purpose: "end_use",
        timeline: "immediate",
        funding: "self",
        siteVisitReady: true,
      },
    });
    expect(nextStep(s, localities)).toEqual({ action: "handoff", reason: "complete" });
  });

  it("does not count 'unclear' as an answer for purpose or funding", () => {
    // Those are placeholders meaning "we asked and learned nothing", so the
    // bot should still be able to try once more in a later session.
    expect(isAnswered("purpose", { purpose: "unclear" })).toBe(false);
    expect(isAnswered("funding", { funding: "unclear" })).toBe(false);
    // Timeline is different: "unclear" IS a chosen option ("just exploring").
    expect(isAnswered("timeline", { timeline: "unclear" })).toBe(true);
  });
});

describe("applyAnswer", () => {
  it("maps button ids to exact rupee ranges with no re-parsing", () => {
    expect(applyAnswer({}, "budget", "50l_1cr").qualification).toMatchObject({
      budgetMin: 5_000_000,
      budgetMax: 10_000_000,
    });
    expect(applyAnswer({}, "budget", "under_50l").qualification).toEqual({ budgetMax: 5_000_000 });
    expect(applyAnswer({}, "budget", "2cr_plus").qualification).toEqual({ budgetMin: 20_000_000 });
  });

  it("falls back to the same free-text parser the ad-form ingest uses", () => {
    // One implementation: "50L" must mean the same thing from Meta or WhatsApp.
    const r = applyAnswer({}, "budget", "75 lakh");
    expect(r.accepted).toBe(true);
    expect(r.qualification.budgetMax).toBe(7_500_000);
  });

  it("resolves 'both' on purpose to end use, the safer pitch", () => {
    const r = applyAnswer({}, "purpose", "both");
    expect(r.qualification.purpose).toBe("end_use");
    expect(r.interpreted).toContain("both");
  });

  it("rejects an unreadable reply without corrupting what we already know", () => {
    const before = { budgetMax: 5_000_000 };
    const r = applyAnswer(before, "configuration", "something nice near a park");
    expect(r.accepted).toBe(false);
    expect(r.qualification).toEqual(before);
  });

  it("never mutates the qualification it was given", () => {
    const original = { budgetMax: 5_000_000 };
    applyAnswer(original, "timeline", "immediate");
    expect(original).toEqual({ budgetMax: 5_000_000 });
  });

  it("splits a multi-area reply", () => {
    const r = applyAnswer({}, "locality", "Wakad, Baner / Balewadi");
    expect(r.qualification.preferredAreas).toEqual(["Wakad", "Baner", "Balewadi"]);
  });

  it("treats an empty reply as unaccepted", () => {
    expect(applyAnswer({}, "budget", "   ").accepted).toBe(false);
  });
});

describe("interrupts", () => {
  it("detects opt-out in English and Hinglish", () => {
    for (const s of ["STOP", "unsubscribe", "remove me", "band karo", "mat bhejo please"]) {
      expect(isOptOut(s), s).toBe(true);
    }
    expect(isOptOut("stopped by the site yesterday")).toBe(false);
  });

  it("detects a request for a human", () => {
    for (const s of ["call me", "I want to talk to an agent", "baat karni hai", "what is the RERA number"]) {
      expect(needsHuman(s), s).toBe(true);
    }
    expect(needsHuman("2 BHK")).toBe(false);
  });
});

describe("interrupt regression: stems vs whole words", () => {
  it("matches Hinglish stems that carry inflected endings", () => {
    // Regression: /\bbaat kar\b/ never matched "baat karni hai" — "r" and "n"
    // are both word characters, so no boundary exists between them. Stems get
    // a leading \b only. Same defect class as "6+ months" in fieldmap.ts.
    for (const s of ["baat karni hai", "phone karo please", "milna chahta hoon"]) {
      expect(needsHuman(s), s).toBe(true);
    }
    for (const s of ["band karo", "band kar do", "mat bhejna", "nahi chahiye"]) {
      expect(isOptOut(s), s).toBe(true);
    }
  });

  it("still does not fire on innocent text containing a stem-like substring", () => {
    expect(isOptOut("2 BHK in Kharadi")).toBe(false);
    expect(needsHuman("3 BHK budget 90 lakh")).toBe(false);
  });
});
