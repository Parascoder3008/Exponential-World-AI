import { describe, expect, it } from "vitest";
import { SLA_LADDERS, buildScorecard, checkSla, median } from "../src/domain/sla.js";

const at = (min: number) => new Date(Date.UTC(2026, 5, 1, 10, min));
const assignedAt = at(0);

describe("checkSla", () => {
  it("stops the clock permanently once the agent responds", () => {
    const r = checkSla(
      { tier: "hot", assignedAt, firstResponseAt: at(3), escalationsFired: 0 },
      at(600),
    );
    expect(r).toEqual({ status: "met", minutesToRespond: 3 });
  });

  it("reports the next rung while still inside the SLA", () => {
    const r = checkSla({ tier: "hot", assignedAt, firstResponseAt: null, escalationsFired: 0 }, at(2));
    expect(r.status).toBe("within_sla");
    if (r.status !== "within_sla") return;
    expect(r.nextAction).toBe("renotify");
    expect(r.nextRungAt.toISOString()).toBe(at(5).toISOString());
  });

  it("walks the hot ladder: renotify at 5, reassign at 15, manager at 30", () => {
    const rung = (fired: number, minute: number) => {
      const r = checkSla(
        { tier: "hot", assignedAt, firstResponseAt: null, escalationsFired: fired },
        at(minute),
      );
      return r.status === "breached" ? r.rung.action : r.status;
    };
    expect(rung(0, 6)).toBe("renotify");
    expect(rung(1, 16)).toBe("reassign");
    expect(rung(2, 31)).toBe("escalate_to_manager");
    expect(rung(3, 60)).toBe("exhausted");
  });

  it("gives warm leads working hours rather than minutes", () => {
    // Holding an agent to 5 minutes on every lead trains acknowledge-without-
    // working, which corrupts the metric.
    expect(SLA_LADDERS.warm[0]!.afterMinutes).toBe(120);
    const r = checkSla({ tier: "warm", assignedAt, firstResponseAt: null, escalationsFired: 0 }, at(30));
    expect(r.status).toBe("within_sla");
  });

  it("never fires the same rung twice", () => {
    const r = checkSla({ tier: "hot", assignedAt, firstResponseAt: null, escalationsFired: 1 }, at(6));
    // Rung 0 already fired; at 6 minutes rung 1 (15m) is not yet due.
    expect(r.status).toBe("within_sla");
  });
});

describe("median", () => {
  it("averages the two middle values on an even-length set", () => {
    expect(median([1, 2, 3, 4])).toBe(2.5);
    expect(median([3, 1, 2])).toBe(2);
    expect(median([])).toBeNull();
  });
});

describe("buildScorecard", () => {
  it("ranks worst-first so the conversation that matters is at the top", () => {
    const rows = buildScorecard([
      { agentId: "a1", agentName: "Fast", leadsAssigned: 10, respondedWithinSla: 10, breaches: 0, responseMinutes: [2, 3] },
      { agentId: "a2", agentName: "Slow", leadsAssigned: 10, respondedWithinSla: 4, breaches: 6, responseMinutes: [40, 80] },
    ]);
    expect(rows[0]!.agentName).toBe("Slow");
    expect(rows[0]!.slaCompliancePct).toBe(40);
    expect(rows[1]!.medianResponseMinutes).toBe(2.5);
  });

  it("does not punish an agent who was given no leads", () => {
    const rows = buildScorecard([
      { agentId: "a1", agentName: "New", leadsAssigned: 0, respondedWithinSla: 0, breaches: 0, responseMinutes: [] },
    ]);
    expect(rows[0]!.slaCompliancePct).toBe(100);
    expect(rows[0]!.medianResponseMinutes).toBeNull();
  });
});
