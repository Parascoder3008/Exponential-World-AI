/**
 * Dedupe decision.
 *
 * The same buyer enquires three times in a week across two portals and one
 * Instagram ad. That is one lead with three activity rows, not three leads.
 *
 * But the same number six months later is genuinely a new purchase cycle —
 * they bought elsewhere and are back, or their situation changed. Treating
 * that as a stale duplicate buries a live lead in an old closed record.
 *
 * So: one window, two outcomes, plus a hard stop for do-not-contact.
 */

import type { LeadState } from "./states.js";

/** Days within which a repeat enquiry is the same lead. */
export const DEDUPE_WINDOW_DAYS = 90;

export interface ExistingLead {
  id: string;
  phoneE164: string;
  createdAt: Date;
  lastActivityAt: Date;
  state: LeadState;
  doNotContact: boolean;
}

export type DedupeDecision =
  | { action: "create_new"; linkedTo: null }
  /** Same buyer, live record. Append activity, do not create a row. */
  | { action: "attach_to_existing"; leadId: string; reason: "within_window" }
  /** New purchase cycle. New row, but keep the history linked. */
  | { action: "create_new"; linkedTo: string }
  /** They asked us to stop. Log the enquiry, send nothing. */
  | { action: "suppress"; leadId: string; reason: "do_not_contact" };

export function decideDedupe(
  incomingPhone: string | null,
  existing: ExistingLead[],
  now: Date = new Date(),
): DedupeDecision {
  if (!incomingPhone) return { action: "create_new", linkedTo: null };

  const matches = existing
    .filter((l) => l.phoneE164 === incomingPhone)
    .sort((a, b) => b.lastActivityAt.getTime() - a.lastActivityAt.getTime());

  const mostRecent = matches[0];
  if (!mostRecent) return { action: "create_new", linkedTo: null };

  // DNC wins over everything, including a fresh enquiry. If they re-enquire
  // themselves the agent can clear the flag by hand — that is a human decision.
  if (mostRecent.doNotContact || mostRecent.state === "dnc") {
    return { action: "suppress", leadId: mostRecent.id, reason: "do_not_contact" };
  }

  const ageDays =
    (now.getTime() - mostRecent.lastActivityAt.getTime()) / (1000 * 60 * 60 * 24);

  if (ageDays <= DEDUPE_WINDOW_DAYS) {
    return { action: "attach_to_existing", leadId: mostRecent.id, reason: "within_window" };
  }

  return { action: "create_new", linkedTo: mostRecent.id };
}
