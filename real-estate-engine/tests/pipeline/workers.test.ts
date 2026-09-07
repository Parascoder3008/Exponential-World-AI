import { beforeEach, describe, expect, it } from "vitest";
import { runCadenceSweep, runSlaSweep, runStallDetector } from "../../src/pipeline/workers.js";
import { InMemoryRepository } from "../../src/ports/memory.js";
import type { LeadRecord } from "../../src/ports/repository.js";
import type { Agent } from "../../src/domain/assignment.js";
import { isInContactWindow } from "../../src/domain/cadence.js";

const ist = (day: number, hour: number, min = 0) =>
  new Date(Date.UTC(2026, 5, day, hour - 5, min - 30));

const agent = (id: string): Agent => ({
  id,
  name: id,
  active: true,
  capacityPerDay: 20,
  territories: [],
  workingHours: { startHour: 9, endHour: 19, days: [0, 1, 2, 3, 4, 5, 6] },
});

const baseLead = (over: Partial<LeadRecord> = {}): Omit<LeadRecord, "id" | "createdAt" | "updatedAt"> => ({
  source: "meta_lead_ad",
  phoneE164: "+919876543210",
  qualification: {},
  state: "assigned",
  score: 70,
  scoreBreakdown: null,
  tier: "hot",
  disqualifyReason: null,
  assignedAgentId: "a1",
  assignedAt: ist(1, 10),
  firstResponseAt: null,
  nextActionAt: ist(1, 10),
  cadenceStep: 0,
  cadenceAnchorAt: ist(1, 10),
  lastMessageAt: null,
  humanHandoff: false,
  escalationsFired: 0,
  consentSource: "test",
  consentAt: ist(1, 10),
  doNotContact: false,
  dedupeOf: null,
  isTest: false,
  unmappedFields: {},
  ...over,
});

describe("cadence sweep", () => {
  let repo: InMemoryRepository;
  beforeEach(() => {
    repo = new InMemoryRepository();
    repo.agents = [agent("a1")];
  });

  it("emits the due step and schedules the next one in the same write", async () => {
    const lead = await repo.createLead(baseLead());
    const r = await runCadenceSweep(repo, ist(1, 11));

    expect(r.actions).toHaveLength(1);
    expect(r.actions[0]!.step.channel).toBe("whatsapp");

    const after = await repo.getLead(lead.id);
    expect(after!.cadenceStep).toBe(1);
    expect(after!.lastMessageAt).toEqual(ist(1, 11));
    // A crash between send and update must never leave a lead without a clock.
    expect(after!.nextActionAt).not.toBeNull();
  });

  it("does not talk over a human who has taken the conversation", async () => {
    const lead = await repo.createLead(baseLead({ humanHandoff: true }));
    const r = await runCadenceSweep(repo, ist(1, 11));

    expect(r.actions).toHaveLength(0);
    expect(r.paused[0]).toMatchObject({ reason: "human_handoff" });
    // Clock cleared, or the lead reappears on every single sweep.
    expect((await repo.getLead(lead.id))!.nextActionAt).toBeNull();
  });

  it("stops immediately for an opt-out", async () => {
    await repo.createLead(baseLead({ doNotContact: true }));
    const r = await runCadenceSweep(repo, ist(1, 11));
    expect(r.paused[0]).toMatchObject({ reason: "do_not_contact" });
  });

  it("moves an exhausted ladder into long nurture, still on a clock", async () => {
    const lead = await repo.createLead(baseLead({ cadenceStep: 99 }));
    const r = await runCadenceSweep(repo, ist(1, 11));

    expect(r.exhausted).toEqual([lead.id]);
    const after = await repo.getLead(lead.id);
    expect(after!.state).toBe("nurture_long");
    expect(after!.nextActionAt).not.toBeNull();
    expect(after!.cadenceStep).toBe(0);
  });

  it("never schedules a send outside the contact window", async () => {
    await repo.createLead(baseLead({ cadenceAnchorAt: ist(1, 19, 30), nextActionAt: ist(1, 19, 30) }));
    await runCadenceSweep(repo, ist(1, 19, 45));
    const after = repo.allLeads()[0]!;
    expect(isInContactWindow(after.nextActionAt!)).toBe(true);
  });

  it("never fires the same step twice, even when run repeatedly", async () => {
    // Idempotency here means "no step is delivered twice", NOT "a second run
    // does nothing" — a backlogged lead legitimately has more work due.
    await repo.createLead(baseLead());
    const fired: number[] = [];
    for (let i = 0; i < 6; i++) {
      const r = await runCadenceSweep(repo, ist(1, 11));
      fired.push(...r.actions.map((a) => a.stepIndex));
    }
    expect(new Set(fired).size).toBe(fired.length);
  });

  it("skips stale steps after an outage instead of firing a burst", async () => {
    // The failure this prevents: the sweep comes back up, finds a lead four
    // steps behind, and sends four WhatsApps in a row — the fastest way to
    // get a number reported and quality-throttled.
    const lead = await repo.createLead(baseLead({ cadenceAnchorAt: ist(1, 10), nextActionAt: ist(1, 10) }));
    const r = await runCadenceSweep(repo, ist(4, 11)); // three days later

    expect(r.skipped.length).toBeGreaterThan(0);
    // At most one message actually goes out for this lead.
    expect(r.actions.filter((a) => a.leadId === lead.id).length).toBeLessThanOrEqual(1);
    expect(repo.activities.filter((a) => a.type === "whatsapp_out").length).toBeLessThanOrEqual(1);
    expect(repo.activities.some((a) => a.type === "cadence_step_skipped")).toBe(true);
  });

  it("recovers in a single pass rather than needing one sweep per stale step", async () => {
    const lead = await repo.createLead(baseLead({ cadenceAnchorAt: ist(1, 10), nextActionAt: ist(1, 10) }));
    await runCadenceSweep(repo, ist(4, 11));
    const after = await repo.getLead(lead.id);
    // Walked well past step 0 in one go, and still has a clock.
    expect(after!.cadenceStep).toBeGreaterThan(1);
    expect(after!.nextActionAt).not.toBeNull();
  });

  it("does not skip a step that is merely a little late", async () => {
    await repo.createLead(baseLead());
    const r = await runCadenceSweep(repo, ist(1, 11));
    expect(r.skipped).toHaveLength(0);
    expect(r.actions).toHaveLength(1);
  });

  it("ignores leads that are not yet due", async () => {
    await repo.createLead(baseLead({ nextActionAt: ist(2, 11) }));
    expect((await runCadenceSweep(repo, ist(1, 11))).actions).toHaveLength(0);
  });
});

describe("SLA sweep", () => {
  let repo: InMemoryRepository;
  beforeEach(() => {
    repo = new InMemoryRepository();
    repo.agents = [agent("a1"), agent("a2")];
  });

  it("does nothing while the agent is inside the SLA", async () => {
    await repo.createLead(baseLead());
    expect(await runSlaSweep(repo, ist(1, 10, 3))).toEqual([]);
  });

  it("nudges at 5 minutes, then reassigns at 15", async () => {
    const lead = await repo.createLead(baseLead());

    const first = await runSlaSweep(repo, ist(1, 10, 6));
    expect(first[0]).toMatchObject({ action: "renotify", fromAgentId: "a1" });
    expect((await repo.getLead(lead.id))!.escalationsFired).toBe(1);

    const second = await runSlaSweep(repo, ist(1, 10, 16));
    expect(second[0]).toMatchObject({ action: "reassign", fromAgentId: "a1", toAgentId: "a2" });
    const after = await repo.getLead(lead.id);
    expect(after!.assignedAgentId).toBe("a2");
    // The clock RESTARTS for the new owner — judging them on time the
    // previous agent burned would make the metric meaningless.
    expect(after!.assignedAt).toEqual(ist(1, 10, 16));
    expect(after!.escalationsFired).toBe(0);
  });

  it("escalates to a human when there is nobody to reassign to", async () => {
    repo.agents = [agent("a1")];
    await repo.createLead(baseLead({ escalationsFired: 1 }));
    const r = await runSlaSweep(repo, ist(1, 10, 16));
    // Never silently do nothing.
    expect(r[0]).toMatchObject({ action: "escalate_to_manager" });
  });

  it("stops the clock the moment the agent responds", async () => {
    await repo.createLead(baseLead({ firstResponseAt: ist(1, 10, 2) }));
    expect(await runSlaSweep(repo, ist(1, 12))).toEqual([]);
  });

  it("gives warm leads hours, not minutes", async () => {
    await repo.createLead(baseLead({ tier: "warm" }));
    expect(await runSlaSweep(repo, ist(1, 10, 30))).toEqual([]);
    expect((await runSlaSweep(repo, ist(1, 13)))[0]).toMatchObject({ action: "renotify" });
  });
});

describe("stall detector", () => {
  let repo: InMemoryRepository;
  beforeEach(() => {
    repo = new InMemoryRepository();
    repo.agents = [agent("a1")];
  });

  it("finds an open lead that the system itself has forgotten", async () => {
    // No other worker catches this: the lead looks fine on a dashboard and
    // no query in the product will ever surface it again.
    await repo.createLead(baseLead({ nextActionAt: null }));
    const report = await runStallDetector(repo, ist(5, 11), { repair: false });
    expect(report.count).toBe(1);
    expect(report.alert).toBe(true);
    expect(report.leads[0]!.ageDays).toBe(4);
  });

  it("repairs what it can by re-queuing the lead", async () => {
    const lead = await repo.createLead(baseLead({ nextActionAt: null }));
    await runStallDetector(repo, ist(2, 11));
    expect((await repo.getLead(lead.id))!.nextActionAt).toEqual(ist(2, 11));
    expect(repo.activities.some((a) => a.type === "stall_repaired")).toBe(true);
  });

  it("leaves alone leads that are stalled on purpose", async () => {
    // Human handoff and opt-out have no clock BY DESIGN. Re-queuing those
    // would make the bot talk over a human, or message someone who said stop.
    const handoff = await repo.createLead(baseLead({ nextActionAt: null, humanHandoff: true }));
    const optedOut = await repo.createLead(baseLead({ nextActionAt: null, doNotContact: true }));
    await runStallDetector(repo, ist(2, 11));
    expect((await repo.getLead(handoff.id))!.nextActionAt).toBeNull();
    expect((await repo.getLead(optedOut.id))!.nextActionAt).toBeNull();
  });

  it("stays silent when nothing is stalled", async () => {
    await repo.createLead(baseLead({ nextActionAt: ist(2, 11) }));
    const report = await runStallDetector(repo, ist(1, 11));
    expect(report).toMatchObject({ count: 0, alert: false });
  });

  it("does not flag terminal leads, which legitimately have no clock", async () => {
    await repo.createLead(baseLead({ state: "customer", nextActionAt: null }));
    await repo.createLead(baseLead({ state: "disqualified", nextActionAt: null }));
    expect((await runStallDetector(repo, ist(1, 11))).count).toBe(0);
  });
});
