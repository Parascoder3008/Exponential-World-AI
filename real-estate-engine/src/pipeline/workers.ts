/**
 * The three sweeps that keep the system alive.
 *
 * All three are SWEEPS, not timers. A timer does not survive a deploy, a
 * container restart, or a queue drain; a sweep that asks "what is due right
 * now?" survives all of them and self-heals after an outage. Everything in
 * this file is therefore idempotent and safe to run twice.
 */

import { nextCadenceAction, type CadenceStep } from "../domain/cadence.js";
import { checkSla, type EscalationAction } from "../domain/sla.js";
import { selectAgent } from "../domain/assignment.js";
import { transition } from "../domain/states.js";
import type { LeadRecord, Repository } from "../ports/repository.js";

// ---------------------------------------------------------------------------
// 1. Cadence sweep — "what should we send right now?"
// ---------------------------------------------------------------------------

export interface CadenceAction {
  leadId: string;
  step: CadenceStep;
  stepIndex: number;
}

export interface CadenceSweepResult {
  actions: CadenceAction[];
  paused: { leadId: string; reason: string }[];
  exhausted: string[];
  /** Steps skipped as too stale to be worth sending. See STALE_STEP_HOURS. */
  skipped: { leadId: string; stepIndex: number; overdueHours: number }[];
}

/**
 * A step more overdue than this is SKIPPED, not sent late.
 *
 * Without this, an outage is followed by a burst: the sweep comes back up,
 * finds a lead four steps behind, and fires all four in quick succession.
 * That is the single fastest way to get a WhatsApp number reported and
 * quality-throttled — and a "we tried calling you" task delivered three days
 * after the fact is noise to the buyer and to the agent both.
 *
 * Twelve hours: long enough to survive an overnight outage and still send
 * the morning's messages, short enough that nothing arrives stale.
 */
export const STALE_STEP_HOURS = 12;

/** Guard against an unbounded catch-up loop on a badly misconfigured lead. */
const MAX_CATCHUP_STEPS = 12;

/**
 * Find due leads and decide what each needs.
 *
 * Returns the actions rather than sending them: the domain decides WHAT, the
 * caller's messaging adapter decides HOW. That split is what lets the same
 * engine drive WhatsApp today and something else later without touching a rule.
 */
export async function runCadenceSweep(
  repo: Repository,
  now: Date = new Date(),
  limit = 200,
): Promise<CadenceSweepResult> {
  const due = await repo.dueLeads(now, limit);
  const result: CadenceSweepResult = { actions: [], paused: [], exhausted: [], skipped: [] };

  for (const lead of due) {
    const tier = lead.tier && lead.tier !== "disqualified" ? lead.tier : "cold";
    const anchorAt = lead.cadenceAnchorAt ?? lead.createdAt;

    // Catch-up: walk past any steps that are too stale to send, in ONE pass,
    // so a lead that fell behind during an outage neither bursts nor needs a
    // dozen sweeps to recover.
    let stepIndex = lead.cadenceStep;
    let lastMessageAt = lead.lastMessageAt;
    let outcome = nextCadenceAction({
      tier,
      anchorAt,
      stepIndex,
      lastMessageAt,
      humanHandoff: lead.humanHandoff,
      doNotContact: lead.doNotContact,
    });

    for (let guard = 0; guard < MAX_CATCHUP_STEPS; guard++) {
      if (outcome.action !== "send") break;
      const overdueHours = (now.getTime() - outcome.dueAt.getTime()) / 3_600_000;
      if (overdueHours <= STALE_STEP_HOURS) break;

      result.skipped.push({ leadId: lead.id, stepIndex, overdueHours: Math.round(overdueHours) });
      await repo.appendActivity({
        leadId: lead.id,
        at: now,
        actor: "system",
        type: "cadence_step_skipped",
        channel: outcome.step.channel,
        outcome: `stale by ${Math.round(overdueHours)}h: ${outcome.step.label}`,
        payload: { stepIndex },
      });

      stepIndex += 1;
      outcome = nextCadenceAction({
        tier,
        anchorAt,
        stepIndex,
        lastMessageAt,
        humanHandoff: lead.humanHandoff,
        doNotContact: lead.doNotContact,
      });
    }

    if (outcome.action === "pause") {
      // Clear the clock: a paused lead is a human's problem now, and leaving
      // it due would make it reappear on every single sweep.
      await repo.updateLead(lead.id, { nextActionAt: null, updatedAt: now });
      result.paused.push({ leadId: lead.id, reason: outcome.reason });
      continue;
    }

    if (outcome.action === "exhausted") {
      const t = transition(lead.state, "nurture_long", {
        at: now,
        actor: "system",
        reason: "cadence ladder exhausted",
      });
      await repo.updateLead(lead.id, {
        state: t.state,
        cadenceStep: 0,
        cadenceAnchorAt: now,
        // Long nurture, but still on a clock. Never a dead end.
        nextActionAt: new Date(now.getTime() + 14 * 24 * 3_600_000),
        updatedAt: now,
      });
      await repo.appendActivity({
        leadId: lead.id,
        at: now,
        actor: "system",
        type: "state_change",
        outcome: "cadence ladder exhausted",
        payload: { from: t.activity.from, to: t.activity.to },
      });
      result.exhausted.push(lead.id);
      continue;
    }

    // A step that is still in the future after catch-up is simply not due yet.
    if (outcome.dueAt > now) {
      await repo.updateLead(lead.id, {
        cadenceStep: stepIndex,
        nextActionAt: outcome.dueAt,
        updatedAt: now,
      });
      continue;
    }

    // Advance the step and schedule the following one in the same write, so a
    // crash between send and update can never leave the lead without a clock.
    const nextIndex = stepIndex + 1;
    if (outcome.step.channel === "whatsapp") lastMessageAt = now;
    const following = nextCadenceAction({
      tier,
      anchorAt,
      stepIndex: nextIndex,
      lastMessageAt,
      humanHandoff: false,
      doNotContact: lead.doNotContact,
    });

    await repo.updateLead(lead.id, {
      cadenceStep: nextIndex,
      ...(outcome.step.channel === "whatsapp" ? { lastMessageAt: now } : {}),
      // An exhausted ladder still gets a clock — the next sweep converts it
      // to nurture_long rather than dropping it.
      nextActionAt: following.action === "send" ? following.dueAt : now,
      updatedAt: now,
    });

    await repo.appendActivity({
      leadId: lead.id,
      at: now,
      actor: "system",
      type: outcome.step.channel === "whatsapp" ? "whatsapp_out" : "call_task",
      channel: outcome.step.channel,
      outcome: outcome.step.label,
      payload: { stepIndex, tier },
    });

    result.actions.push({ leadId: lead.id, step: outcome.step, stepIndex });
  }

  return result;
}

// ---------------------------------------------------------------------------
// 2. SLA sweep — "who has not been called back?"
// ---------------------------------------------------------------------------

export interface SlaEscalation {
  leadId: string;
  action: EscalationAction;
  fromAgentId: string | null;
  toAgentId?: string;
  overdueMinutes: number;
}

export async function runSlaSweep(
  repo: Repository,
  now: Date = new Date(),
): Promise<SlaEscalation[]> {
  const waiting = await repo.awaitingFirstResponse();
  const escalations: SlaEscalation[] = [];

  for (const lead of waiting) {
    if (!lead.assignedAt) continue;
    const tier = lead.tier && lead.tier !== "disqualified" ? lead.tier : "cold";

    const check = checkSla(
      {
        tier,
        assignedAt: lead.assignedAt,
        firstResponseAt: lead.firstResponseAt,
        escalationsFired: lead.escalationsFired,
      },
      now,
    );
    if (check.status !== "breached") continue;

    const escalation: SlaEscalation = {
      leadId: lead.id,
      action: check.rung.action,
      fromAgentId: lead.assignedAgentId,
      overdueMinutes: check.overdueMinutes,
    };

    if (check.rung.action === "reassign") {
      const agents = (await repo.listAgents()).filter((a) => a.id !== lead.assignedAgentId);
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
      if (choice.assigned) {
        escalation.toAgentId = choice.agentId;
        await repo.updateLead(lead.id, {
          assignedAgentId: choice.agentId,
          // The clock RESTARTS for the new owner. Judging them on time the
          // previous agent burned would make the metric meaningless.
          assignedAt: now,
          escalationsFired: 0,
          updatedAt: now,
        });
        await repo.appendActivity({
          leadId: lead.id,
          at: now,
          actor: "system",
          type: "sla_reassigned",
          outcome: `overdue ${check.overdueMinutes}m`,
          payload: { from: lead.assignedAgentId, to: choice.agentId },
        });
        escalations.push(escalation);
        continue;
      }
      // Nobody to hand it to — fall through and escalate to a human instead
      // of silently doing nothing.
      escalation.action = "escalate_to_manager";
    }

    await repo.updateLead(lead.id, {
      escalationsFired: lead.escalationsFired + 1,
      updatedAt: now,
    });
    await repo.appendActivity({
      leadId: lead.id,
      at: now,
      actor: "system",
      type: escalation.action === "renotify" ? "sla_renotify" : "sla_escalated",
      outcome: `overdue ${check.overdueMinutes}m`,
      payload: { agentId: lead.assignedAgentId, rung: check.rung.label },
    });
    escalations.push(escalation);
  }

  return escalations;
}

// ---------------------------------------------------------------------------
// 3. Stall detector — "which leads has the system itself forgotten?"
// ---------------------------------------------------------------------------

export interface StallReport {
  count: number;
  leads: { id: string; state: string; ageDays: number }[];
  /** True when this needs waking somebody up rather than filing a ticket. */
  alert: boolean;
}

/**
 * The most important scheduled job in the system, and the least glamorous.
 *
 * Every other worker can fail loudly. This one catches the failures that do
 * not: a lead sitting in an open state with no scheduled action, which no
 * query in the product will ever surface and no agent will ever see again.
 *
 * It repairs what it can (an unassigned lead gets re-queued) and alerts on
 * what it cannot.
 */
export async function runStallDetector(
  repo: Repository,
  now: Date = new Date(),
  opts: { repair?: boolean } = { repair: true },
): Promise<StallReport> {
  const stalled = await repo.stalledLeads();

  const report: StallReport = {
    count: stalled.length,
    leads: stalled.map((l: LeadRecord) => ({
      id: l.id,
      state: l.state,
      ageDays: Math.floor((now.getTime() - l.createdAt.getTime()) / 86_400_000),
    })),
    alert: stalled.length > 0,
  };

  if (opts.repair) {
    for (const lead of stalled) {
      // A lead paused for human handoff or opt-out is stalled on purpose.
      if (lead.humanHandoff || lead.doNotContact) continue;
      await repo.updateLead(lead.id, { nextActionAt: now, updatedAt: now });
      await repo.appendActivity({
        leadId: lead.id,
        at: now,
        actor: "system",
        type: "stall_repaired",
        outcome: `re-queued from ${lead.state}`,
      });
    }
  }

  return report;
}
