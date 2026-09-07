import { beforeEach, describe, expect, it } from "vitest";
import { ingestLead, mergeQualification, type IngestConfig } from "../../src/pipeline/ingest.js";
import { InMemoryRepository } from "../../src/ports/memory.js";
import type { NormalisedLead } from "../../src/ingest/types.js";
import type { Agent } from "../../src/domain/assignment.js";

const ist = (day: number, hour: number, min = 0) =>
  new Date(Date.UTC(2026, 5, day, hour - 5, min - 30));

const NOW = ist(1, 11); // Monday 11:00 IST, inside everyone's shift

const config = (over: Partial<IngestConfig> = {}): IngestConfig => ({
  serviceCities: ["Pune"],
  now: () => NOW,
  ...over,
});

const agent = (over: Partial<Agent> = {}): Agent => ({
  id: "a1",
  name: "Agent One",
  active: true,
  capacityPerDay: 15,
  territories: [],
  workingHours: { startHour: 9, endHour: 19, days: [0, 1, 2, 3, 4, 5, 6] },
  ...over,
});

const incoming = (over: Partial<NormalisedLead> = {}): NormalisedLead => ({
  source: "meta_lead_ad",
  sourceEventId: "evt-1",
  fullName: "Rahul Sharma",
  phoneRaw: "+91 98765 43210",
  phoneE164: "+919876543210",
  city: "Pune",
  qualification: {
    budgetMin: 8_000_000,
    budgetMax: 12_000_000,
    timeline: "immediate",
    funding: "loan_approved",
    purpose: "end_use",
    siteVisitReady: true,
    minutesToFirstReply: 4,
  },
  consentSource: "meta_lead_ad_form",
  consentAt: NOW,
  isTest: false,
  unmappedFields: {},
  ...over,
});

describe("ingest pipeline", () => {
  let repo: InMemoryRepository;

  beforeEach(() => {
    repo = new InMemoryRepository();
    repo.agents = [agent()];
    repo.band = { priceMin: 5_000_000, priceMax: 15_000_000 };
  });

  it("takes a hot lead from payload to assigned with a scheduled next action", async () => {
    const out = await ingestLead(repo, incoming(), { raw: true }, config());
    expect(out.result).toBe("created");
    if (out.result !== "created") return;

    expect(out.lead.tier).toBe("hot");
    expect(out.lead.state).toBe("assigned");
    expect(out.lead.assignedAgentId).toBe("a1");
    expect(out.lead.assignedAt).toEqual(NOW);
    // The invariant that matters: an open lead ALWAYS has a clock.
    expect(out.lead.nextActionAt).not.toBeNull();
    expect(out.lead.scoreBreakdown).toBeTruthy();
  });

  it("writes an auditable trail of every step", async () => {
    await ingestLead(repo, incoming(), {}, config());
    const types = repo.activities.map((a) => a.type);
    expect(types).toContain("lead_created");
    expect(types.filter((t) => t === "state_change")).toHaveLength(2); // -> contact_attempted, -> assigned
  });

  it("is idempotent: a retried delivery creates exactly one lead", async () => {
    // Every one of these platforms retries. Two agents calling one buyer is
    // the most visible way this system can embarrass a broker.
    const first = await ingestLead(repo, incoming(), {}, config());
    const second = await ingestLead(repo, incoming(), {}, config());
    expect(first.result).toBe("created");
    expect(second).toEqual({ result: "duplicate_event", sourceEventId: "evt-1" });
    expect(repo.allLeads()).toHaveLength(1);
  });

  it("attaches a re-enquiry to the live lead and jumps it to the front", async () => {
    await ingestLead(repo, incoming(), {}, config());
    const out = await ingestLead(
      repo,
      incoming({ sourceEventId: "evt-2", source: "99acres", qualification: { configuration: "3bhk" } }),
      {},
      config({ now: () => ist(3, 12) }),
    );
    expect(out.result).toBe("attached");
    if (out.result !== "attached") return;
    expect(repo.allLeads()).toHaveLength(1);
    // New facts merged in...
    expect(out.lead.qualification.configuration).toBe("3bhk");
    // ...without clobbering what was already known.
    expect(out.lead.qualification.budgetMax).toBe(12_000_000);
    // A re-enquiry outranks whatever the cadence had queued.
    expect(out.lead.nextActionAt).toEqual(ist(3, 12));
    expect(repo.activities.some((a) => a.type === "re_enquiry")).toBe(true);
  });

  it("creates a fresh lead after the dedupe window but keeps the history linked", async () => {
    const first = await ingestLead(repo, incoming(), {}, config());
    if (first.result !== "created") throw new Error("setup failed");

    const out = await ingestLead(
      repo,
      incoming({ sourceEventId: "evt-later" }),
      {},
      config({ now: () => new Date(NOW.getTime() + 200 * 86_400_000) }),
    );
    expect(out.result).toBe("created");
    if (out.result !== "created") return;
    expect(out.lead.dedupeOf).toBe(first.lead.id);
    expect(repo.allLeads()).toHaveLength(2);
  });

  it("suppresses an enquiry from someone who opted out, and logs it", async () => {
    const first = await ingestLead(repo, incoming(), {}, config());
    if (first.result !== "created") throw new Error("setup failed");
    await repo.updateLead(first.lead.id, { doNotContact: true });

    const out = await ingestLead(repo, incoming({ sourceEventId: "evt-3" }), {}, config());
    expect(out).toMatchObject({ result: "suppressed", reason: "do_not_contact" });
    expect(repo.allLeads()).toHaveLength(1);
    expect(repo.activities.some((a) => a.type === "enquiry_suppressed")).toBe(true);
  });

  it("disqualifies on facts only, and still stores the lead", async () => {
    const out = await ingestLead(
      repo,
      incoming({ sourceEventId: "evt-4", city: "Chennai" }),
      {},
      config(),
    );
    expect(out).toMatchObject({ result: "disqualified", reason: "outside_service_city" });
    if (out.result !== "disqualified") return;
    expect(out.lead.state).toBe("disqualified");
    // Stored, visible, and reversible by a human.
    expect(repo.allLeads()).toHaveLength(1);
  });

  it("never disqualifies a slow buyer — only re-orders the queue", async () => {
    const out = await ingestLead(
      repo,
      incoming({
        sourceEventId: "evt-5",
        qualification: { timeline: "6_plus_months", siteVisitReady: false, budgetMax: 900_000 },
      }),
      {},
      config(),
    );
    expect(out.result).toBe("created");
    if (out.result !== "created") return;
    expect(out.lead.tier).toBe("cold");
    expect(out.lead.state).toBe("assigned");
    expect(out.lead.nextActionAt).not.toBeNull();
  });

  it("keeps a test submission out of the working pipeline", async () => {
    const out = await ingestLead(repo, incoming({ sourceEventId: "evt-6", isTest: true }), {}, config());
    expect(out).toMatchObject({ result: "disqualified", reason: "test_or_spam" });
  });

  it("stores a lead whose phone will not normalise, but disqualifies it for follow-up", async () => {
    const out = await ingestLead(
      repo,
      incoming({ sourceEventId: "evt-7", phoneE164: null, phoneRaw: "not a number" }),
      {},
      config(),
    );
    expect(out).toMatchObject({ result: "disqualified", reason: "invalid_phone" });
    expect(repo.allLeads()).toHaveLength(1);
  });

  it("still schedules a lead when no agent can be assigned", async () => {
    // The failure mode this prevents: a lead that looks fine on a dashboard
    // and that nobody will ever touch again.
    repo.agents = [];
    const out = await ingestLead(repo, incoming({ sourceEventId: "evt-8" }), {}, config());
    expect(out.result).toBe("created");
    if (out.result !== "created") return;
    expect(out.lead.assignedAgentId).toBeNull();
    expect(out.lead.state).toBe("contact_attempted");
    expect(out.lead.nextActionAt).not.toBeNull();
    expect(repo.activities.some((a) => a.type === "assignment_deferred")).toBe(true);
  });

  it("retries assignment at the next shift start when everyone is off duty", async () => {
    repo.agents = [agent({ workingHours: { startHour: 9, endHour: 19, days: [1, 2, 3, 4, 5] } })];
    const out = await ingestLead(
      repo,
      incoming({ sourceEventId: "evt-9" }),
      {},
      config({ now: () => ist(1, 22) }),
    );
    if (out.result !== "created") throw new Error("expected created");
    expect(out.lead.assignedAgentId).toBeNull();
    expect(out.lead.nextActionAt!.getTime()).toBeLessThanOrEqual(ist(2, 9).getTime());
  });

  it("does not treat two different buyers as one", async () => {
    await ingestLead(repo, incoming(), {}, config());
    await ingestLead(
      repo,
      incoming({ sourceEventId: "evt-10", phoneE164: "+919999999999", phoneRaw: "9999999999" }),
      {},
      config(),
    );
    expect(repo.allLeads()).toHaveLength(2);
  });

  it("respects the storage-level idempotency key per source, not globally", async () => {
    // The same id from two different platforms is two different leads.
    await ingestLead(repo, incoming(), {}, config());
    const out = await ingestLead(
      repo,
      incoming({ source: "google_ads", phoneE164: "+919888888888", phoneRaw: "9888888888" }),
      {},
      config(),
    );
    expect(out.result).toBe("created");
  });
});

describe("mergeQualification", () => {
  it("fills gaps without overwriting what is already known", () => {
    // The existing answer may have come from a human conversation and the
    // new one from a re-submitted ad form. Trust the older, richer source.
    const merged = mergeQualification(
      { budgetMax: 10_000_000, configuration: "3bhk" },
      { budgetMax: 5_000_000, timeline: "immediate" },
    );
    expect(merged).toEqual({
      budgetMax: 10_000_000,
      configuration: "3bhk",
      timeline: "immediate",
    });
  });

  it("treats an empty array as a gap to fill", () => {
    expect(mergeQualification({ preferredAreas: [] }, { preferredAreas: ["Wakad"] })).toEqual({
      preferredAreas: ["Wakad"],
    });
  });

  it("never mutates its inputs", () => {
    const a = { budgetMax: 1 };
    const b = { timeline: "immediate" as const };
    mergeQualification(a, b);
    expect(a).toEqual({ budgetMax: 1 });
    expect(b).toEqual({ timeline: "immediate" });
  });
});
