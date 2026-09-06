import { describe, expect, it } from "vitest";
import {
  InvalidTransitionError,
  LEAD_STATES,
  allowedTransitions,
  canTransition,
  isStalled,
  isTerminal,
  transition,
  type LeadState,
} from "../src/domain/states.js";

describe("lead state machine", () => {
  it("walks the happy path from enquiry to customer", () => {
    const path: LeadState[] = [
      "new",
      "contact_attempted",
      "engaged",
      "qualified",
      "assigned",
      "connected",
      "visit_booked",
      "visit_done",
      "negotiation",
      "booked",
      "customer",
    ];
    for (let i = 0; i < path.length - 1; i++) {
      expect(canTransition(path[i]!, path[i + 1]!), `${path[i]} -> ${path[i + 1]}`).toBe(true);
    }
  });

  it("rejects illegal jumps loudly", () => {
    expect(() => transition("new", "booked", { actor: "system" })).toThrow(InvalidTransitionError);
    expect(canTransition("new", "visit_done")).toBe(false);
  });

  it("emits an auditable activity row on every transition", () => {
    const at = new Date("2026-03-01T10:00:00Z");
    const r = transition("assigned", "connected", { at, actor: "agent-7", reason: "picked up" });
    expect(r.state).toBe("connected");
    expect(r.activity).toEqual({
      type: "state_change",
      from: "assigned",
      to: "connected",
      at,
      actor: "agent-7",
      reason: "picked up",
    });
  });

  it("lets every non-terminal state reach dnc, because opt-out must always work", () => {
    for (const s of LEAD_STATES) {
      if (isTerminal(s)) continue;
      expect(canTransition(s, "dnc"), `${s} -> dnc`).toBe(true);
    }
  });

  it("treats only customer, disqualified and dnc as terminal", () => {
    const terminal = LEAD_STATES.filter(isTerminal);
    expect(new Set(terminal)).toEqual(new Set(["customer", "disqualified", "dnc"]));
    for (const s of terminal) expect(allowedTransitions(s)).toEqual([]);
  });

  it("keeps 'dead' leads alive — nurture, revival and no_response are not terminal", () => {
    for (const s of ["nurture_long", "revival", "no_response", "not_interested"] as const) {
      expect(isTerminal(s), s).toBe(false);
      expect(allowedTransitions(s).length, s).toBeGreaterThan(0);
    }
  });

  it("flags an open lead with no scheduled next action as stalled", () => {
    expect(isStalled({ state: "assigned", nextActionAt: null })).toBe(true);
    expect(isStalled({ state: "assigned", nextActionAt: new Date() })).toBe(false);
    // A closed lead legitimately has nothing scheduled.
    expect(isStalled({ state: "customer", nextActionAt: null })).toBe(false);
  });

  it("has no unreachable state and no dangling target", () => {
    const reachable = new Set<LeadState>(["new"]);
    let grew = true;
    while (grew) {
      grew = false;
      for (const s of [...reachable]) {
        for (const t of allowedTransitions(s)) {
          if (!reachable.has(t)) {
            reachable.add(t);
            grew = true;
          }
        }
      }
    }
    expect([...LEAD_STATES].filter((s) => !reachable.has(s))).toEqual([]);
    for (const s of LEAD_STATES) {
      for (const t of allowedTransitions(s)) {
        expect(LEAD_STATES, `${s} -> ${t}`).toContain(t);
      }
    }
  });
});
