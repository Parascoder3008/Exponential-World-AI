/**
 * Agent assignment.
 *
 * Round-robin sounds trivial and is not. A naive rotation hands a hot lead to
 * an agent who is asleep, off-territory, or already sitting on forty untouched
 * enquiries — and the lead dies while looking perfectly well-assigned on a
 * dashboard. Every filter below exists because skipping it produces a lead
 * that is assigned and unworked, which is worse than unassigned: unassigned
 * leads show up in a queue, unworked ones don't.
 */

import { IST_OFFSET_MS, istClock } from "./time.js";
import type { LeadState } from "./states.js";
import type { Tier } from "./types.js";

export interface Agent {
  id: string;
  name: string;
  active: boolean;
  /** Max NEW leads per day. Beyond this, quality collapses. */
  capacityPerDay: number;
  /** Localities this agent covers. Empty = covers everything. */
  territories: string[];
  workingHours: WorkingHours;
}

export interface WorkingHours {
  /** IST wall-clock, 24h. */
  startHour: number;
  endHour: number;
  /** 0 = Sunday … 6 = Saturday. Real estate agents usually work Sundays. */
  days: number[];
}

export interface AgentLoad {
  agentId: string;
  /** Leads assigned to this agent today. */
  assignedToday: number;
  /** Open leads in any working state — the backlog that predicts neglect. */
  openLeads: number;
  /** For fair rotation. Null if never assigned. */
  lastAssignedAt: Date | null;
}

export interface AssignmentCandidate {
  preferredAreas?: string[];
  city?: string;
  tier?: Tier;
}

export type AssignmentResult =
  | { assigned: true; agentId: string; reason: string }
  | { assigned: false; reason: NoAgentReason; retryAt?: Date };

export type NoAgentReason =
  | "no_active_agents"
  | "all_off_hours"
  | "all_at_capacity"
  | "no_territory_match";

export function isWorking(agent: Agent, at: Date): boolean {
  const { hour, day } = istClock(at);
  if (!agent.workingHours.days.includes(day)) return false;
  return hour >= agent.workingHours.startHour && hour < agent.workingHours.endHour;
}

export function coversTerritory(agent: Agent, lead: AssignmentCandidate): boolean {
  // An agent with no declared territory is a generalist and covers everything.
  if (agent.territories.length === 0) return true;
  const wanted = [...(lead.preferredAreas ?? []), ...(lead.city ? [lead.city] : [])].map((s) =>
    s.trim().toLowerCase(),
  );
  if (wanted.length === 0) return true; // nothing to match against yet
  const covered = agent.territories.map((t) => t.trim().toLowerCase());
  return wanted.some((w) => covered.some((c) => c === w || w.includes(c) || c.includes(w)));
}

/**
 * Pick an agent.
 *
 * Order of elimination matters for the diagnostic: we report WHY nobody was
 * eligible, because "no_territory_match" and "all_at_capacity" demand
 * completely different responses from the operator — hire vs rebalance.
 */
export function selectAgent(
  lead: AssignmentCandidate,
  agents: Agent[],
  loads: AgentLoad[],
  now: Date = new Date(),
): AssignmentResult {
  const loadOf = new Map(loads.map((l) => [l.agentId, l]));

  const active = agents.filter((a) => a.active);
  if (active.length === 0) return { assigned: false, reason: "no_active_agents" };

  const inTerritory = active.filter((a) => coversTerritory(a, lead));
  if (inTerritory.length === 0) return { assigned: false, reason: "no_territory_match" };

  const working = inTerritory.filter((a) => isWorking(a, now));
  if (working.length === 0) {
    return { assigned: false, reason: "all_off_hours", retryAt: nextShiftStart(inTerritory, now) };
  }

  const withCapacity = working.filter((a) => {
    const load = loadOf.get(a.id);
    return (load?.assignedToday ?? 0) < a.capacityPerDay;
  });
  if (withCapacity.length === 0) {
    return { assigned: false, reason: "all_at_capacity", retryAt: nextMidnightIST(now) };
  }

  // Fair rotation, then break ties on who is least buried. Backlog is the
  // better tiebreaker than raw count: an agent with 40 open leads will not
  // work the 41st, whatever the rotation says.
  const sorted = [...withCapacity].sort((a, b) => {
    const la = loadOf.get(a.id);
    const lb = loadOf.get(b.id);
    const ta = la?.lastAssignedAt?.getTime() ?? 0;
    const tb = lb?.lastAssignedAt?.getTime() ?? 0;
    if (ta !== tb) return ta - tb;
    const oa = la?.openLeads ?? 0;
    const ob = lb?.openLeads ?? 0;
    if (oa !== ob) return oa - ob;
    return a.id.localeCompare(b.id); // deterministic final tiebreak
  });

  const chosen = sorted[0]!;
  return {
    assigned: true,
    agentId: chosen.id,
    reason: `round_robin: longest since last assignment, ${loadOf.get(chosen.id)?.openLeads ?? 0} open`,
  };
}

/** Earliest moment any of these agents is next on shift. */
export function nextShiftStart(agents: Agent[], now: Date): Date | undefined {
  let best: Date | undefined;
  for (const agent of agents) {
    for (let addDays = 0; addDays <= 7; addDays++) {
      const probe = new Date(now.getTime() + addDays * 24 * 60 * 60 * 1000);
      const shifted = new Date(probe.getTime() + IST_OFFSET_MS);
      if (!agent.workingHours.days.includes(shifted.getUTCDay())) continue;
      shifted.setUTCHours(agent.workingHours.startHour, 0, 0, 0);
      const candidate = new Date(shifted.getTime() - IST_OFFSET_MS);
      if (candidate <= now) continue;
      if (!best || candidate < best) best = candidate;
      break;
    }
  }
  return best;
}

function nextMidnightIST(now: Date): Date {
  const shifted = new Date(now.getTime() + IST_OFFSET_MS);
  shifted.setUTCDate(shifted.getUTCDate() + 1);
  shifted.setUTCHours(0, 0, 0, 0);
  return new Date(shifted.getTime() - IST_OFFSET_MS);
}

/** States in which a lead counts against an agent's open backlog. */
export const OPEN_STATES: ReadonlySet<LeadState> = new Set<LeadState>([
  "assigned",
  "connected",
  "visit_booked",
  "visit_done",
  "visit_no_show",
  "rebook_attempt",
  "negotiation",
]);
