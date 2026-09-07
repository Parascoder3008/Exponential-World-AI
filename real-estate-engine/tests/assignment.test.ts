import { describe, expect, it } from "vitest";
import {
  coversTerritory,
  isWorking,
  nextShiftStart,
  selectAgent,
  type Agent,
  type AgentLoad,
} from "../src/domain/assignment.js";

const ist = (day: number, hour: number, min = 0) =>
  new Date(Date.UTC(2026, 5, day, hour - 5, min - 30));

const agent = (over: Partial<Agent> = {}): Agent => ({
  id: "a1",
  name: "Agent One",
  active: true,
  capacityPerDay: 15,
  territories: [],
  workingHours: { startHour: 9, endHour: 19, days: [0, 1, 2, 3, 4, 5, 6] },
  ...over,
});

const load = (over: Partial<AgentLoad> = {}): AgentLoad => ({
  agentId: "a1",
  assignedToday: 0,
  openLeads: 0,
  lastAssignedAt: null,
  ...over,
});

describe("working hours", () => {
  it("respects IST shift boundaries and days off", () => {
    const a = agent({ workingHours: { startHour: 9, endHour: 19, days: [1, 2, 3, 4, 5] } });
    // 2026-06-01 is a Monday.
    expect(isWorking(a, ist(1, 10))).toBe(true);
    expect(isWorking(a, ist(1, 8, 59))).toBe(false);
    expect(isWorking(a, ist(1, 19))).toBe(false);
    // 2026-06-07 is a Sunday, not in the working days.
    expect(isWorking(a, ist(7, 10))).toBe(false);
  });

  it("finds the next shift start across a day boundary", () => {
    const a = agent({ workingHours: { startHour: 9, endHour: 19, days: [1, 2, 3, 4, 5] } });
    const next = nextShiftStart([a], ist(1, 22));
    expect(next?.toISOString()).toBe(ist(2, 9).toISOString());
  });
});

describe("territory", () => {
  it("treats an agent with no territory as a generalist", () => {
    expect(coversTerritory(agent(), { preferredAreas: ["Wakad"] })).toBe(true);
  });

  it("matches on area or city, case- and substring-insensitively", () => {
    const a = agent({ territories: ["Wakad", "Hinjewadi"] });
    expect(coversTerritory(a, { preferredAreas: ["wakad"] })).toBe(true);
    expect(coversTerritory(a, { preferredAreas: ["Hinjewadi Phase 2"] })).toBe(true);
    expect(coversTerritory(a, { preferredAreas: ["Kharadi"] })).toBe(false);
  });

  it("does not exclude a lead that has not stated an area yet", () => {
    // Excluding here would strand every brand-new lead before qualification.
    expect(coversTerritory(agent({ territories: ["Wakad"] }), {})).toBe(true);
  });
});

describe("selectAgent", () => {
  it("rotates to whoever has waited longest since their last assignment", () => {
    const agents = [agent({ id: "a1" }), agent({ id: "a2" }), agent({ id: "a3" })];
    const loads = [
      load({ agentId: "a1", lastAssignedAt: ist(1, 12) }),
      load({ agentId: "a2", lastAssignedAt: ist(1, 10) }),
      load({ agentId: "a3", lastAssignedAt: ist(1, 14) }),
    ];
    const r = selectAgent({}, agents, loads, ist(1, 15));
    expect(r).toMatchObject({ assigned: true, agentId: "a2" });
  });

  it("breaks a rotation tie on who is least buried, not alphabetically", () => {
    const agents = [agent({ id: "a1" }), agent({ id: "a2" })];
    const loads = [
      load({ agentId: "a1", lastAssignedAt: null, openLeads: 40 }),
      load({ agentId: "a2", lastAssignedAt: null, openLeads: 3 }),
    ];
    // An agent sitting on 40 open leads will not work the 41st.
    expect(selectAgent({}, agents, loads, ist(1, 15))).toMatchObject({ agentId: "a2" });
  });

  it("never assigns to an agent who is off shift, and says when to retry", () => {
    const agents = [agent({ workingHours: { startHour: 9, endHour: 19, days: [1, 2, 3, 4, 5] } })];
    const r = selectAgent({}, agents, [load()], ist(1, 23));
    expect(r.assigned).toBe(false);
    if (r.assigned) return;
    expect(r.reason).toBe("all_off_hours");
    expect(r.retryAt?.toISOString()).toBe(ist(2, 9).toISOString());
  });

  it("never assigns past daily capacity, and retries after midnight", () => {
    const agents = [agent({ capacityPerDay: 5 })];
    const r = selectAgent({}, agents, [load({ assignedToday: 5 })], ist(1, 12));
    expect(r.assigned).toBe(false);
    if (r.assigned) return;
    expect(r.reason).toBe("all_at_capacity");
    expect(r.retryAt).toBeDefined();
  });

  it("distinguishes the four failure reasons, because each needs a different fix", () => {
    const now = ist(1, 12);
    const reasonOf = (agents: Agent[], loads: AgentLoad[] = [load()]) => {
      const r = selectAgent({ preferredAreas: ["Kharadi"] }, agents, loads, now);
      return r.assigned ? "assigned" : r.reason;
    };
    expect(reasonOf([])).toBe("no_active_agents");
    expect(reasonOf([agent({ active: false })])).toBe("no_active_agents");
    expect(reasonOf([agent({ territories: ["Wakad"] })])).toBe("no_territory_match");
    expect(reasonOf([agent({ workingHours: { startHour: 9, endHour: 10, days: [1] } })])).toBe(
      "all_off_hours",
    );
    expect(reasonOf([agent({ capacityPerDay: 1 })], [load({ assignedToday: 1 })])).toBe(
      "all_at_capacity",
    );
  });

  it("is deterministic when every signal ties", () => {
    const agents = [agent({ id: "b" }), agent({ id: "a" })];
    const loads = [load({ agentId: "a" }), load({ agentId: "b" })];
    const first = selectAgent({}, agents, loads, ist(1, 12));
    const second = selectAgent({}, agents, loads, ist(1, 12));
    expect(first).toEqual(second);
    expect(first).toMatchObject({ agentId: "a" });
  });
});
