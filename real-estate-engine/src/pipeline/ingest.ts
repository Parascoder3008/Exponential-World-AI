/**
 * The ingest pipeline — where every adapter's output becomes a working lead.
 *
 * This is the ONE place the ordering of operations is decided, and the order
 * is load-bearing:
 *
 *   1. raw_events FIRST, before parsing. A parser that breaks at 2am must cost
 *      you a replay, not a day's leads.
 *   2. Idempotency at the storage boundary. Every platform retries.
 *   3. Normalise the phone before anything else — it is the identity key.
 *   4. Dedupe before creating. Two agents calling one buyer is the most
 *      visible way this system can embarrass a broker.
 *   5. Disqualify on FACTS only.
 *   6. Score — which orders the queue and never empties it.
 *   7. Assign, which starts the SLA clock.
 *   8. Schedule the first cadence action, so the lead can never sit with no
 *      next action.
 *
 * Every step writes an activity row. The audit trail is not decoration: it is
 * what settles arguments about who was told what and when.
 */

import { selectAgent } from "../domain/assignment.js";
import { nextCadenceAction } from "../domain/cadence.js";
import { decideDedupe } from "../domain/dedupe.js";
import { disqualify, scoreLead, type DisqualifyReason } from "../domain/scoring.js";
import { transition, type LeadState } from "../domain/states.js";
import type { Qualification } from "../domain/types.js";
import type { NormalisedLead } from "../ingest/types.js";
import type { LeadRecord, Repository } from "../ports/repository.js";

export interface IngestConfig {
  /** Cities the broker actually operates in. Empty = do not filter on city. */
  serviceCities: string[];
  /** Overall clock, injected for deterministic tests. */
  now?: () => Date;
}

export type IngestOutcome =
  | { result: "created"; lead: LeadRecord }
  | { result: "attached"; lead: LeadRecord; reason: string }
  | { result: "duplicate_event"; sourceEventId: string }
  | { result: "suppressed"; leadId: string; reason: "do_not_contact" }
  | { result: "disqualified"; lead: LeadRecord; reason: DisqualifyReason }
  | { result: "quarantined"; reason: string };

/**
 * Run one inbound lead all the way through.
 *
 * Returns an outcome rather than throwing for expected conditions (duplicate,
 * suppressed, disqualified) — those are normal traffic. It throws only for
 * genuine faults, which should surface loudly in the job run.
 */
export async function ingestLead(
  repo: Repository,
  incoming: NormalisedLead,
  rawPayload: unknown,
  config: IngestConfig,
): Promise<IngestOutcome> {
  const now = config.now?.() ?? new Date();

  // 1 + 2. Raw first, idempotent at the storage boundary.
  const { stored, rawEventId } = await repo.recordRawEvent({
    source: incoming.source,
    sourceEventId: incoming.sourceEventId || null,
    payload: rawPayload,
    receivedAt: now,
  });
  if (!stored) {
    return { result: "duplicate_event", sourceEventId: incoming.sourceEventId };
  }

  // 3 + 4. Identity, then dedupe.
  const existing = incoming.phoneE164 ? await repo.findLeadsByPhone(incoming.phoneE164) : [];
  const dedupe = decideDedupe(incoming.phoneE164, existing, now);

  if (dedupe.action === "suppress") {
    await repo.appendActivity({
      leadId: dedupe.leadId,
      at: now,
      actor: "system",
      type: "enquiry_suppressed",
      outcome: "do_not_contact",
      payload: { source: incoming.source, sourceEventId: incoming.sourceEventId },
    });
    await repo.markRawEventProcessed(rawEventId, dedupe.leadId);
    return { result: "suppressed", leadId: dedupe.leadId, reason: "do_not_contact" };
  }

  if (dedupe.action === "attach_to_existing") {
    const lead = await repo.getLead(dedupe.leadId);
    if (!lead) throw new Error(`dedupe pointed at missing lead ${dedupe.leadId}`);

    // A re-enquiry is a real intent signal. Merge any NEW facts it carries —
    // without overwriting anything an agent or the buyer already confirmed,
    // since a stale ad form must never clobber a live conversation.
    const merged = mergeQualification(lead.qualification, incoming.qualification);
    const updated = await repo.updateLead(lead.id, {
      qualification: merged,
      updatedAt: now,
      // Re-enquiry outranks whatever the cadence had queued.
      nextActionAt: now,
    });

    await repo.appendActivity({
      leadId: lead.id,
      at: now,
      actor: "system",
      type: "re_enquiry",
      outcome: dedupe.reason,
      payload: { source: incoming.source, sourceEventId: incoming.sourceEventId },
    });
    await repo.markRawEventProcessed(rawEventId, lead.id);
    return { result: "attached", lead: updated, reason: dedupe.reason };
  }

  // 5. Disqualification — facts only, and always reversible by a human.
  const dqReason = disqualify({
    phoneValid: incoming.phoneE164 !== null,
    ...(incoming.city ? { city: incoming.city } : {}),
    serviceCities: config.serviceCities,
    isTest: incoming.isTest,
  });

  // 6. Score.
  const band = await repo.inventoryBand();
  const scored = scoreLead(incoming.qualification, band);

  const base: Omit<LeadRecord, "id" | "createdAt" | "updatedAt"> = {
    source: incoming.source,
    ...(incoming.sourceCampaign ? { sourceCampaign: incoming.sourceCampaign } : {}),
    ...(incoming.fullName ? { fullName: incoming.fullName } : {}),
    ...(incoming.phoneRaw ? { phoneRaw: incoming.phoneRaw } : {}),
    phoneE164: incoming.phoneE164,
    ...(incoming.email ? { email: incoming.email } : {}),
    ...(incoming.city ? { city: incoming.city } : {}),
    qualification: incoming.qualification,
    state: "new",
    score: scored.score,
    scoreBreakdown: scored.breakdown,
    tier: dqReason ? "disqualified" : scored.tier,
    disqualifyReason: dqReason,
    assignedAgentId: null,
    assignedAt: null,
    firstResponseAt: null,
    nextActionAt: null,
    cadenceStep: 0,
    cadenceAnchorAt: null,
    lastMessageAt: null,
    humanHandoff: false,
    escalationsFired: 0,
    consentSource: incoming.consentSource,
    consentAt: incoming.consentAt,
    doNotContact: false,
    dedupeOf: dedupe.linkedTo,
    isTest: incoming.isTest,
    unmappedFields: incoming.unmappedFields,
  };

  const lead = await repo.createLead(base);
  await repo.appendActivity({
    leadId: lead.id,
    at: now,
    actor: "system",
    type: "lead_created",
    payload: {
      source: incoming.source,
      score: scored.score,
      tier: scored.tier,
      breakdown: scored.breakdown,
      unmapped: incoming.unmappedFields,
    },
  });

  if (dqReason) {
    const t = transition("new", "disqualified", { at: now, actor: "system", reason: dqReason });
    const finalLead = await repo.updateLead(lead.id, { state: t.state, updatedAt: now });
    await repo.appendActivity({ leadId: lead.id, ...toActivity(t.activity) });
    await repo.markRawEventProcessed(rawEventId, lead.id);
    return { result: "disqualified", lead: finalLead, reason: dqReason };
  }

  // 7 + 8. Assign, then guarantee a scheduled next action.
  const assigned = await assignAndSchedule(repo, lead, now);
  await repo.markRawEventProcessed(rawEventId, lead.id);
  return { result: "created", lead: assigned };
}

/**
 * Assign an agent and schedule the first cadence step.
 *
 * The lead ALWAYS leaves this function with a nextActionAt, even when no agent
 * could be found. An unassigned lead with no clock is exactly the silent death
 * this system exists to prevent — so when assignment fails we still schedule
 * the automated first touch, and retry assignment on the next sweep.
 */
export async function assignAndSchedule(
  repo: Repository,
  lead: LeadRecord,
  now: Date,
): Promise<LeadRecord> {
  const tier = lead.tier && lead.tier !== "disqualified" ? lead.tier : "cold";

  const cadence = nextCadenceAction({
    tier,
    anchorAt: now,
    stepIndex: 0,
    lastMessageAt: null,
    humanHandoff: false,
    doNotContact: lead.doNotContact,
  });
  const firstActionAt = cadence.action === "send" ? cadence.dueAt : now;

  const agents = await repo.listAgents();
  const loads = await repo.agentLoads();
  const choice = selectAgent(
    {
      ...(lead.qualification.preferredAreas ? { preferredAreas: lead.qualification.preferredAreas } : {}),
      ...(lead.city ? { city: lead.city } : {}),
      tier,
    },
    agents,
    loads,
    now,
  );

  let state: LeadState = lead.state;
  const patch: Partial<LeadRecord> = {
    cadenceAnchorAt: now,
    nextActionAt: firstActionAt,
    updatedAt: now,
  };

  // Every lead gets its automated first touch logged, assigned or not.
  const t1 = transition(state, "contact_attempted", {
    at: now,
    actor: "system",
    reason: "automated first touch scheduled",
  });
  state = t1.state;
  await repo.appendActivity({ leadId: lead.id, ...toActivity(t1.activity) });

  if (choice.assigned) {
    const t2 = transition(state, "assigned", {
      at: now,
      actor: "system",
      reason: choice.reason,
    });
    state = t2.state;
    patch.assignedAgentId = choice.agentId;
    patch.assignedAt = now;
    await repo.appendActivity({ leadId: lead.id, ...toActivity(t2.activity) });
  } else {
    await repo.appendActivity({
      leadId: lead.id,
      at: now,
      actor: "system",
      type: "assignment_deferred",
      outcome: choice.reason,
      payload: { retryAt: choice.retryAt?.toISOString() ?? null },
    });
    // Retry assignment no later than the first cadence touch, so an
    // unassignable lead is never left waiting on nothing.
    if (choice.retryAt && choice.retryAt < firstActionAt) patch.nextActionAt = choice.retryAt;
  }

  patch.state = state;
  return repo.updateLead(lead.id, patch);
}

/**
 * Merge freshly-captured answers into what we already know.
 *
 * New data fills GAPS only. It never overwrites an existing answer, because
 * the existing one may have come from a human conversation and the new one
 * from a re-submitted ad form. Trust the older, richer source.
 */
export function mergeQualification(existing: Qualification, incoming: Qualification): Qualification {
  const out: Qualification = { ...existing };
  for (const [key, value] of Object.entries(incoming)) {
    if (value === undefined) continue;
    if (Array.isArray(value) && value.length === 0) continue;
    const current = (out as Record<string, unknown>)[key];
    const currentEmpty =
      current === undefined || (Array.isArray(current) && current.length === 0);
    if (currentEmpty) (out as Record<string, unknown>)[key] = value;
  }
  return out;
}

function toActivity(a: {
  type: string;
  from: string;
  to: string;
  at: Date;
  actor: string;
  reason?: string;
}): Omit<import("../ports/repository.js").ActivityRecord, "leadId"> {
  return {
    at: a.at,
    actor: a.actor,
    type: a.type,
    ...(a.reason ? { outcome: a.reason } : {}),
    payload: { from: a.from, to: a.to },
  };
}
