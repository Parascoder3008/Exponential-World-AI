/**
 * Site visit booking, reminders and no-show recovery.
 *
 * Mostly not an AI problem, and the highest-leverage part is the least
 * glamorous: reminders and one-tap rescheduling. A buyer who can reschedule
 * with a tap reschedules. One who has to phone an agent to reschedule simply
 * does not turn up, and gets recorded as a no-show when they were really a
 * booking you dropped.
 */

import { clampToContactWindow } from "./cadence.js";
import { IST_OFFSET_MS } from "./time.js";

export type VisitStatus = "booked" | "done" | "no_show" | "cancelled";

export type VisitOutcome =
  | "interested"
  | "not_interested"
  | "wants_alternatives"
  | "budget_objection"
  | "location_objection"
  | "comparing_options"
  | "ready_to_book";

export interface SiteVisit {
  id: string;
  leadId: string;
  agentId: string;
  projectId: string;
  slotStart: Date;
  slotEnd?: Date;
  status: VisitStatus;
  cabRequired: boolean;
  pickupAddress?: string;
  outcome?: VisitOutcome;
}

// ---------------------------------------------------------------------------
// Reminders
// ---------------------------------------------------------------------------

export interface Reminder {
  at: Date;
  kind: "t_minus_24h" | "t_minus_3h" | "t_minus_30m";
  label: string;
}

/**
 * Reminders use a WIDER window than marketing follow-ups (07:00–21:00 rather
 * than 09:00–20:00).
 *
 * That is deliberate, not an oversight. A 07:30 reminder for a 10:00 visit is
 * a utility message about a commitment the buyer themselves made — it is
 * welcome, and Meta prices and treats it differently from marketing. The
 * marketing cadence stays on the tighter window.
 */
export const REMINDER_WINDOW = { startHour: 7, endHour: 21 } as const;

const OFFSETS: { minutes: number; kind: Reminder["kind"]; label: string }[] = [
  { minutes: 24 * 60, kind: "t_minus_24h", label: "confirm tomorrow's visit + what to carry" },
  { minutes: 3 * 60, kind: "t_minus_3h", label: "location pin + agent name and photo" },
  { minutes: 30, kind: "t_minus_30m", label: "agent is on the way / reschedule in one tap" },
];

/**
 * Build the reminder ladder for a visit.
 *
 * Reminders already in the past are dropped rather than fired late — sending
 * "your visit is tomorrow" an hour after it happened destroys trust in every
 * other message the system sends.
 */
export function reminderSchedule(slotStart: Date, now: Date = new Date()): Reminder[] {
  return OFFSETS.map(({ minutes, kind, label }) => ({
    at: clampToReminderWindow(new Date(slotStart.getTime() - minutes * 60_000)),
    kind,
    label,
  }))
    .filter((r) => r.at > now && r.at < slotStart)
    .sort((a, b) => a.at.getTime() - b.at.getTime());
}

/**
 * Pull a reminder INTO the allowed window.
 *
 * Unlike the marketing cadence — which only ever pushes forward — a reminder
 * scheduled for 03:00 must move BACKWARD to 21:00 the previous evening, not
 * forward to 07:00, because forward could land after the visit itself.
 */
export function clampToReminderWindow(at: Date): Date {
  const shifted = new Date(at.getTime() + IST_OFFSET_MS);
  const hour = shifted.getUTCHours();
  if (hour >= REMINDER_WINDOW.startHour && hour < REMINDER_WINDOW.endHour) return at;

  if (hour < REMINDER_WINDOW.startHour) {
    // Small hours: send the previous evening instead of after the visit.
    shifted.setUTCDate(shifted.getUTCDate() - 1);
    shifted.setUTCHours(REMINDER_WINDOW.endHour - 1, 0, 0, 0);
  } else {
    shifted.setUTCHours(REMINDER_WINDOW.endHour - 1, 0, 0, 0);
  }
  return new Date(shifted.getTime() - IST_OFFSET_MS);
}

// ---------------------------------------------------------------------------
// Rescheduling
// ---------------------------------------------------------------------------

export const MAX_RESCHEDULES = 3;
export const RESCHEDULE_CUTOFF_MINUTES = 60;

export type RescheduleDecision =
  | { allowed: true }
  | { allowed: false; reason: "too_late" | "limit_reached" | "visit_closed" };

export function canReschedule(
  visit: Pick<SiteVisit, "slotStart" | "status">,
  rescheduleCount: number,
  now: Date = new Date(),
): RescheduleDecision {
  if (visit.status !== "booked") return { allowed: false, reason: "visit_closed" };
  if (rescheduleCount >= MAX_RESCHEDULES) return { allowed: false, reason: "limit_reached" };
  const minutesAway = (visit.slotStart.getTime() - now.getTime()) / 60_000;
  if (minutesAway < RESCHEDULE_CUTOFF_MINUTES) return { allowed: false, reason: "too_late" };
  return { allowed: true };
}

// ---------------------------------------------------------------------------
// Slot availability
// ---------------------------------------------------------------------------

export interface Busy {
  start: Date;
  end: Date;
}

export interface SlotRequest {
  /** Search from here. */
  from: Date;
  /** Number of slots to offer. Three is the sweet spot in a WhatsApp message. */
  count: number;
  durationMinutes: number;
  /** Agent's existing commitments. */
  busy: Busy[];
  /** IST wall-clock hours the site is open for visits. */
  siteHours: { startHour: number; endHour: number };
  /** Days the site is open. 0 = Sunday. */
  siteDays: number[];
  /**
   * Minimum notice before the earliest offered slot.
   *
   * "Next whole hour" is not enough: at 09:40 it offers 10:00, giving a buyer
   * twenty minutes to leave work and cross a city. They accept, then do not
   * turn up, and the system records a no-show that it caused. Two hours is
   * the default; a site with an on-call agent can lower it.
   */
  minLeadMinutes?: number;
}

export const DEFAULT_MIN_LEAD_MINUTES = 120;

/**
 * Offer the next few free slots.
 *
 * Whole-hour boundaries only. A buyer offered "11:00, 12:00, 16:00" picks one;
 * a buyer offered "11:17" thinks the system is broken.
 */
export function nextAvailableSlots(req: SlotRequest): Date[] {
  const slots: Date[] = [];
  const lead = req.minLeadMinutes ?? DEFAULT_MIN_LEAD_MINUTES;

  // Earliest acceptable instant, rounded UP to the next whole hour.
  const earliest = new Date(req.from.getTime() + lead * 60_000);
  const cursor = new Date(earliest.getTime() + IST_OFFSET_MS);
  if (cursor.getUTCMinutes() !== 0 || cursor.getUTCSeconds() !== 0 || cursor.getUTCMilliseconds() !== 0) {
    cursor.setUTCMinutes(0, 0, 0);
    cursor.setUTCHours(cursor.getUTCHours() + 1);
  }

  // Bounded scan: 14 days of hourly probes is far more than enough, and a
  // bounded loop can never hang the worker on a misconfigured calendar.
  for (let probe = 0; probe < 24 * 14 && slots.length < req.count; probe++) {
    const istHour = cursor.getUTCHours();
    const istDay = cursor.getUTCDay();
    const start = new Date(cursor.getTime() - IST_OFFSET_MS);
    const end = new Date(start.getTime() + req.durationMinutes * 60_000);

    const openDay = req.siteDays.includes(istDay);
    const openHour = istHour >= req.siteHours.startHour && istHour < req.siteHours.endHour;
    const free = !req.busy.some((b) => start < b.end && end > b.start);

    if (openDay && openHour && free) slots.push(start);
    cursor.setUTCHours(cursor.getUTCHours() + 1);
  }
  return slots;
}

// ---------------------------------------------------------------------------
// After the visit
// ---------------------------------------------------------------------------

export interface NoShowPlan {
  /** When to reach out. Deliberately soon — same day, while it is still salient. */
  followUpAt: Date;
  message: string;
  /** After this many no-shows, stop offering slots and get a human involved. */
  escalate: boolean;
}

export const MAX_NO_SHOWS = 2;

/**
 * Handle a no-show without blaming the buyer.
 *
 * "Sorry we missed you" outperforms "you did not turn up", and roughly half
 * of no-shows are a scheduling conflict the buyer was too embarrassed to
 * cancel. The reply path must make rebooking effortless.
 */
export function noShowPlan(slotStart: Date, priorNoShows: number, now: Date = new Date()): NoShowPlan {
  const followUpAt = clampToContactWindow(
    new Date(Math.max(now.getTime(), slotStart.getTime()) + 3 * 60 * 60 * 1000),
  );
  const escalate = priorNoShows + 1 >= MAX_NO_SHOWS;
  return {
    followUpAt,
    message: escalate
      ? "agent calls personally to find a time that actually works"
      : "sorry we missed you — shall I hold a slot this weekend? (one-tap rebook)",
    escalate,
  };
}

/** Where a completed visit sends the lead next. */
export function outcomeToNextState(outcome: VisitOutcome): "negotiation" | "not_interested" | "visit_booked" | "nurture_long" {
  switch (outcome) {
    case "ready_to_book":
    case "interested":
      return "negotiation";
    case "wants_alternatives":
      return "visit_booked"; // book them on a different project
    case "not_interested":
      return "not_interested";
    case "budget_objection":
    case "location_objection":
    case "comparing_options":
      // Objections are not rejections. These go back into nurture with the
      // objection recorded, which is what makes the retention layer specific.
      return "nurture_long";
  }
}
