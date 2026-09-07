/**
 * The follow-up cadence engine.
 *
 * Encoded rules, not agent memory. `nextActionAt` on the lead is the only
 * thing the scheduler reads; this module is what computes it.
 *
 * Three guards exist here to stop the system becoming spam — and more
 * importantly, to stop the client's WhatsApp number getting quality-throttled
 * or banned. A banned number takes the broker's whole channel down, which is
 * a far worse outcome than a slow follow-up.
 *
 *   1. Contact window only (09:00–20:00 IST).
 *   2. At most one automated message per 24h.
 *   3. Any inbound reply pauses all automation instantly.
 */

import { IST_OFFSET_MS, istShift } from "./time.js";
import type { Tier } from "./types.js";

export { IST_OFFSET_MS };
export const CONTACT_WINDOW = { startHour: 9, endHour: 20 } as const;
export const MIN_HOURS_BETWEEN_MESSAGES = 24;

export type CadenceChannel = "whatsapp" | "call";

export interface CadenceStep {
  /** Hours after the cadence anchor (usually qualification or assignment). */
  offsetHours: number;
  channel: CadenceChannel;
  label: string;
  /** Last step of the ladder — after this the lead moves to nurture_long. */
  final?: boolean;
}

/**
 * HOT: fast and human-heavy. A hot lead that waits a day is a lost lead.
 * WARM: same shape, stretched over three weeks, fewer calls.
 * COLD: value drip. Never "sir, are you interested?" — a reason to reply.
 */
export const CADENCES: Record<Exclude<Tier, "disqualified">, readonly CadenceStep[]> = {
  hot: [
    { offsetHours: 0, channel: "whatsapp", label: "project details + brochure + location pin" },
    { offsetHours: 0.1, channel: "call", label: "agent call attempt 1" },
    { offsetHours: 2, channel: "whatsapp", label: "tried calling — pick a time (3 buttons)" },
    { offsetHours: 24, channel: "call", label: "agent call attempt 2 (different time of day)" },
    { offsetHours: 48, channel: "whatsapp", label: "price sheet / availability update" },
    { offsetHours: 96, channel: "call", label: "agent call attempt 3" },
    { offsetHours: 168, channel: "whatsapp", label: "keep you posted, or close this?", final: true },
  ],
  warm: [
    { offsetHours: 0, channel: "whatsapp", label: "project details + brochure" },
    { offsetHours: 4, channel: "call", label: "agent call attempt 1" },
    { offsetHours: 72, channel: "whatsapp", label: "matching options in preferred area" },
    { offsetHours: 168, channel: "call", label: "agent call attempt 2" },
    { offsetHours: 288, channel: "whatsapp", label: "site visit offer for the weekend" },
    { offsetHours: 504, channel: "whatsapp", label: "keep you posted, or close this?", final: true },
  ],
  cold: [
    { offsetHours: 0, channel: "whatsapp", label: "acknowledgement + what we cover" },
    { offsetHours: 240, channel: "whatsapp", label: "new launches in preferred locality" },
    { offsetHours: 576, channel: "whatsapp", label: "price trend / loan rate update" },
    { offsetHours: 912, channel: "whatsapp", label: "completed project walkthrough video", final: true },
  ],
};

/** True if the instant falls inside the IST contact window. */
export function isInContactWindow(at: Date): boolean {
  const h = istShift(at).getUTCHours();
  return h >= CONTACT_WINDOW.startHour && h < CONTACT_WINDOW.endHour;
}

/**
 * Push an instant forward to the next legal contact time.
 * Never moves an instant backwards — a late message is fine, an early one
 * at 6am is how you get blocked.
 */
export function clampToContactWindow(at: Date): Date {
  const shifted = istShift(at);
  const h = shifted.getUTCHours();

  if (h >= CONTACT_WINDOW.startHour && h < CONTACT_WINDOW.endHour) return at;

  if (h < CONTACT_WINDOW.startHour) {
    shifted.setUTCHours(CONTACT_WINDOW.startHour, 0, 0, 0);
  } else {
    shifted.setUTCDate(shifted.getUTCDate() + 1);
    shifted.setUTCHours(CONTACT_WINDOW.startHour, 0, 0, 0);
  }
  return new Date(shifted.getTime() - IST_OFFSET_MS);
}

export interface CadenceState {
  tier: Exclude<Tier, "disqualified">;
  /** When the cadence started — usually qualification or assignment time. */
  anchorAt: Date;
  /** How many steps have already fired. */
  stepIndex: number;
  /** Last automated WhatsApp we sent, for the 24h cap. Null if none. */
  lastMessageAt: Date | null;
  /** Set the moment the lead replies. Automation must not talk over a human. */
  humanHandoff: boolean;
  doNotContact: boolean;
}

export type CadenceOutcome =
  | { action: "send"; step: CadenceStep; dueAt: Date; stepIndex: number }
  | { action: "pause"; reason: "human_handoff" | "do_not_contact" }
  | { action: "exhausted"; nextState: "nurture_long" };

/**
 * Compute the next cadence action for a lead.
 *
 * Returns the step AND the instant it is due. The caller writes `dueAt` to
 * `leads.next_action_at`; a scheduled task sweeps for due leads every few
 * minutes. No long-lived timers, no in-memory state.
 */
export function nextCadenceAction(s: CadenceState): CadenceOutcome {
  if (s.doNotContact) return { action: "pause", reason: "do_not_contact" };
  if (s.humanHandoff) return { action: "pause", reason: "human_handoff" };

  const steps = CADENCES[s.tier];
  const step = steps[s.stepIndex];
  if (!step) return { action: "exhausted", nextState: "nurture_long" };

  let dueAt = new Date(s.anchorAt.getTime() + step.offsetHours * 60 * 60 * 1000);

  // The 24h cap applies to automated messages, not to an agent's call task —
  // a human deciding to dial again today is not spam.
  if (step.channel === "whatsapp" && s.lastMessageAt) {
    const earliest = new Date(
      s.lastMessageAt.getTime() + MIN_HOURS_BETWEEN_MESSAGES * 60 * 60 * 1000,
    );
    if (earliest > dueAt) dueAt = earliest;
  }

  return { action: "send", step, dueAt: clampToContactWindow(dueAt), stepIndex: s.stepIndex };
}
