/**
 * Response-time SLA and escalation.
 *
 * This is the layer the broker actually feels, and the one their team will
 * resist. That resistance is the point: the system's most valuable output is
 * not the AI, it is a number next to each agent's name showing how fast they
 * responded. Automation cannot fix an agent who does not call back — it can
 * only make the not-calling-back visible.
 *
 * Escalation never punishes the lead for the team's failure: every rung ends
 * with somebody new owning it, and the final rung reaches a human manager.
 */

import type { Tier } from "./types.js";

export type EscalationAction = "renotify" | "reassign" | "escalate_to_manager";

export interface SlaRung {
  afterMinutes: number;
  action: EscalationAction;
  label: string;
}

/**
 * Hot leads get a five-minute clock. Warm gets working hours, not minutes —
 * holding an agent to five minutes on every lead trains them to acknowledge
 * without working, which corrupts the metric you are trying to build.
 */
export const SLA_LADDERS: Record<Exclude<Tier, "disqualified">, readonly SlaRung[]> = {
  hot: [
    { afterMinutes: 5, action: "renotify", label: "nudge the assigned agent" },
    { afterMinutes: 15, action: "reassign", label: "hand to next agent in rotation" },
    { afterMinutes: 30, action: "escalate_to_manager", label: "alert sales manager, log breach" },
  ],
  warm: [
    { afterMinutes: 120, action: "renotify", label: "nudge the assigned agent" },
    { afterMinutes: 240, action: "reassign", label: "hand to next agent in rotation" },
    { afterMinutes: 480, action: "escalate_to_manager", label: "alert sales manager, log breach" },
  ],
  cold: [
    { afterMinutes: 1440, action: "renotify", label: "nudge the assigned agent" },
    { afterMinutes: 2880, action: "escalate_to_manager", label: "alert sales manager" },
  ],
};

export interface SlaSubject {
  tier: Exclude<Tier, "disqualified">;
  assignedAt: Date;
  /** Set the moment the agent makes contact. Stops the clock permanently. */
  firstResponseAt: Date | null;
  /** Rungs already fired, so escalation never repeats itself. */
  escalationsFired: number;
}

export type SlaCheck =
  | { status: "met"; minutesToRespond: number }
  | { status: "within_sla"; nextRungAt: Date; nextAction: EscalationAction }
  | { status: "breached"; rung: SlaRung; overdueMinutes: number }
  | { status: "exhausted"; overdueMinutes: number };

/**
 * Evaluate one lead's SLA position.
 *
 * Deliberately pure and clock-injected: the escalation worker sweeps assigned
 * leads on a schedule and calls this, rather than each lead holding a timer.
 * Timers do not survive a deploy; a sweep does.
 */
export function checkSla(s: SlaSubject, now: Date = new Date()): SlaCheck {
  const ladder = SLA_LADDERS[s.tier];

  if (s.firstResponseAt) {
    return {
      status: "met",
      minutesToRespond: Math.round((s.firstResponseAt.getTime() - s.assignedAt.getTime()) / 60_000),
    };
  }

  const elapsed = (now.getTime() - s.assignedAt.getTime()) / 60_000;
  const nextRung = ladder[s.escalationsFired];

  if (!nextRung) {
    return { status: "exhausted", overdueMinutes: Math.floor(elapsed) };
  }

  if (elapsed >= nextRung.afterMinutes) {
    return {
      status: "breached",
      rung: nextRung,
      overdueMinutes: Math.floor(elapsed - nextRung.afterMinutes),
    };
  }

  return {
    status: "within_sla",
    nextRungAt: new Date(s.assignedAt.getTime() + nextRung.afterMinutes * 60_000),
    nextAction: nextRung.action,
  };
}

// ---------------------------------------------------------------------------
// The scorecard. This is what gets posted to the team group every Monday.
// ---------------------------------------------------------------------------

export interface AgentSlaRecord {
  agentId: string;
  agentName: string;
  leadsAssigned: number;
  respondedWithinSla: number;
  breaches: number;
  responseMinutes: number[];
}

export interface AgentScorecard {
  agentId: string;
  agentName: string;
  leadsAssigned: number;
  slaCompliancePct: number;
  medianResponseMinutes: number | null;
  breaches: number;
}

export function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  // Even-length: average the two middle values rather than picking one.
  return s.length % 2 === 0 ? (s[mid - 1]! + s[mid]!) / 2 : s[mid]!;
}

/**
 * Rank agents worst-first.
 *
 * Deliberate: a leaderboard sorted best-first gets read as a celebration and
 * the bottom is never reached. Worst-first puts the conversation that needs
 * having at the top of the message.
 */
export function buildScorecard(records: AgentSlaRecord[]): AgentScorecard[] {
  return records
    .map((r) => ({
      agentId: r.agentId,
      agentName: r.agentName,
      leadsAssigned: r.leadsAssigned,
      slaCompliancePct:
        r.leadsAssigned === 0 ? 100 : Math.round((r.respondedWithinSla / r.leadsAssigned) * 100),
      medianResponseMinutes: median(r.responseMinutes),
      breaches: r.breaches,
    }))
    .sort((a, b) => a.slaCompliancePct - b.slaCompliancePct || b.breaches - a.breaches);
}
