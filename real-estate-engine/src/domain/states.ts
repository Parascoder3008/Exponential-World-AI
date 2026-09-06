/**
 * The lead state machine.
 *
 * This is the spine of the whole system. Every worker (ingest, qualification,
 * assignment, cadence, booking, retention) reads a lead, acts, and writes a
 * state transition plus an activity row. Workers never call each other.
 *
 * Two invariants are enforced here and nowhere else:
 *   1. Only declared transitions are legal.
 *   2. A lead in a non-terminal state must always have a scheduled next action.
 *      A lead with no next action and no terminal state is a lead that has
 *      silently died, which is the exact failure this system exists to prevent.
 */

export const LEAD_STATES = [
  "new",
  "contact_attempted",
  "engaged",
  "qualified",
  "assigned",
  "connected",
  "unreachable",
  "voice_agent_queue",
  "visit_booked",
  "visit_done",
  "visit_no_show",
  "rebook_attempt",
  "negotiation",
  "booked",
  "customer",
  "nurture_long",
  "revival",
  "no_response",
  "not_interested",
  "disqualified",
  "dnc",
] as const;

export type LeadState = (typeof LEAD_STATES)[number];

/**
 * Terminal states never need a scheduled next action.
 *
 * Note what is NOT here: `nurture_long`, `revival`, `no_response` and
 * `not_interested` are all non-terminal on purpose. A lead that did not buy
 * is not a dead lead, it is a slow lead, and it must stay on a clock.
 */
export const TERMINAL_STATES: ReadonlySet<LeadState> = new Set([
  "customer",
  "disqualified",
  "dnc",
]);

/** Allowed forward transitions. Anything not listed is rejected. */
const TRANSITIONS: Record<LeadState, readonly LeadState[]> = {
  new: ["contact_attempted", "assigned", "disqualified", "dnc"],
  contact_attempted: ["engaged", "no_response", "unreachable", "assigned", "disqualified", "dnc"],
  engaged: ["qualified", "no_response", "disqualified", "dnc"],
  qualified: ["assigned", "nurture_long", "disqualified", "dnc"],
  assigned: ["connected", "unreachable", "visit_booked", "nurture_long", "disqualified", "dnc"],
  connected: ["visit_booked", "not_interested", "nurture_long", "negotiation", "disqualified", "dnc"],
  unreachable: ["voice_agent_queue", "connected", "nurture_long", "dnc"],
  voice_agent_queue: ["engaged", "connected", "no_response", "nurture_long", "dnc"],
  visit_booked: ["visit_done", "visit_no_show", "not_interested", "dnc"],
  visit_done: ["negotiation", "not_interested", "visit_booked", "nurture_long", "dnc"],
  visit_no_show: ["rebook_attempt", "nurture_long", "dnc"],
  rebook_attempt: ["visit_booked", "nurture_long", "no_response", "dnc"],
  negotiation: ["booked", "not_interested", "nurture_long", "dnc"],
  booked: ["customer", "negotiation", "dnc"],
  customer: [],
  nurture_long: ["revival", "engaged", "assigned", "dnc"],
  revival: ["engaged", "assigned", "nurture_long", "dnc"],
  no_response: ["voice_agent_queue", "nurture_long", "engaged", "dnc"],
  not_interested: ["nurture_long", "dnc"],
  disqualified: [],
  dnc: [],
};

export function isTerminal(state: LeadState): boolean {
  return TERMINAL_STATES.has(state);
}

export function allowedTransitions(from: LeadState): readonly LeadState[] {
  return TRANSITIONS[from];
}

export function canTransition(from: LeadState, to: LeadState): boolean {
  return TRANSITIONS[from].includes(to);
}

export class InvalidTransitionError extends Error {
  constructor(
    readonly from: LeadState,
    readonly to: LeadState,
  ) {
    super(
      `Illegal lead transition ${from} -> ${to}. Allowed from ${from}: ` +
        (TRANSITIONS[from].join(", ") || "(none, terminal state)"),
    );
    this.name = "InvalidTransitionError";
  }
}

export interface TransitionResult {
  state: LeadState;
  /** Append-only audit row the caller must persist alongside the new state. */
  activity: {
    type: "state_change";
    from: LeadState;
    to: LeadState;
    at: Date;
    actor: string;
    reason?: string;
  };
}

/**
 * Apply a transition. Throws rather than returning a falsy value on purpose:
 * an illegal transition is a bug in a worker, not a runtime condition to
 * branch on, and it should surface loudly in the job run.
 */
export function transition(
  from: LeadState,
  to: LeadState,
  opts: { at?: Date; actor: string; reason?: string },
): TransitionResult {
  if (!canTransition(from, to)) throw new InvalidTransitionError(from, to);
  return {
    state: to,
    activity: {
      type: "state_change",
      from,
      to,
      at: opts.at ?? new Date(),
      actor: opts.actor,
      ...(opts.reason ? { reason: opts.reason } : {}),
    },
  };
}

/**
 * The stall detector. Run this nightly across every open lead; any violation
 * is a lead nobody is going to touch again. Alert on it loudly.
 */
export function isStalled(lead: { state: LeadState; nextActionAt: Date | null }): boolean {
  return !isTerminal(lead.state) && lead.nextActionAt === null;
}
