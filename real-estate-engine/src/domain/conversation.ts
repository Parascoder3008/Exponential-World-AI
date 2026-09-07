/**
 * The WhatsApp qualification conversation.
 *
 * Seven fields, asked as interactive buttons and lists rather than open
 * questions. Buttons give structured data with zero parsing risk and a far
 * higher completion rate — and they sidestep the Hinglish comprehension
 * problem entirely for the fields that matter most.
 *
 * The LLM's job is NOT to ask these questions. It is to handle what falls
 * outside them: an off-script reply, a paragraph containing four answers at
 * once, "what is the price?", "kaunsa area hai?". Reach for a model only when
 * a button cannot do the job.
 *
 * Nothing here rejects a lead. An abandoned conversation is a lead that gets
 * a human, not a lead that gets deleted.
 */

import {
  parseConfiguration,
  parseFunding,
  parseIndianBudget,
  parsePurpose,
  parseTimeline,
  parseYesNoMaybe,
} from "../ingest/fieldmap.js";
import type { Qualification } from "./types.js";

export type QuestionId =
  | "budget"
  | "configuration"
  | "locality"
  | "purpose"
  | "timeline"
  | "funding"
  | "site_visit";

export interface QuestionOption {
  /** Sent back by WhatsApp when tapped. Stable — never localise this. */
  id: string;
  en: string;
  hi: string;
}

export interface Question {
  id: QuestionId;
  /** WhatsApp allows 3 reply buttons; more options must use a list message. */
  render: "buttons" | "list";
  promptEn: string;
  promptHi: string;
  options: QuestionOption[];
  /** True when the answer is drawn from the broker's own inventory config. */
  dynamicOptions?: boolean;
}

/**
 * Question order is not arbitrary. Budget first because it is the field
 * people answer most readily and it anchors everything downstream; site
 * visit LAST because it is the ask, and asking before you have shown any
 * understanding of what they want reads as pushy and tanks completion.
 */
export const QUESTIONS: readonly Question[] = [
  {
    id: "budget",
    render: "list",
    promptEn: "To show you the right options — what's your budget range?",
    promptHi: "Aapka budget range kya hai?",
    options: [
      { id: "under_50l", en: "Under ₹50 Lakh", hi: "₹50 Lakh se kam" },
      { id: "50l_1cr", en: "₹50 Lakh – ₹1 Cr", hi: "₹50 Lakh – ₹1 Cr" },
      { id: "1cr_2cr", en: "₹1 Cr – ₹2 Cr", hi: "₹1 Cr – ₹2 Cr" },
      { id: "2cr_plus", en: "₹2 Cr and above", hi: "₹2 Cr se zyada" },
    ],
  },
  {
    id: "configuration",
    render: "list",
    promptEn: "What configuration are you looking for?",
    promptHi: "Aapko kaunsa configuration chahiye?",
    options: [
      { id: "1bhk", en: "1 BHK", hi: "1 BHK" },
      { id: "2bhk", en: "2 BHK", hi: "2 BHK" },
      { id: "3bhk", en: "3 BHK", hi: "3 BHK" },
      { id: "4bhk_plus", en: "4 BHK or larger", hi: "4 BHK ya bada" },
      { id: "villa", en: "Villa / Row house", hi: "Villa / Row house" },
      { id: "plot", en: "Plot / Land", hi: "Plot / Zameen" },
      { id: "commercial", en: "Commercial", hi: "Commercial" },
    ],
  },
  {
    id: "locality",
    render: "list",
    // Options come from the broker's project list — never hardcode localities.
    promptEn: "Which area works best for you?",
    promptHi: "Aapko kaunsa area pasand hai?",
    options: [],
    dynamicOptions: true,
  },
  {
    id: "purpose",
    render: "buttons",
    promptEn: "Is this for your own stay or as an investment?",
    promptHi: "Yeh apne rehne ke liye hai ya investment ke liye?",
    options: [
      { id: "end_use", en: "Own stay", hi: "Apne rehne ke liye" },
      { id: "investment", en: "Investment", hi: "Investment" },
      { id: "both", en: "Both", hi: "Dono" },
    ],
  },
  {
    id: "timeline",
    render: "list",
    promptEn: "When are you planning to buy?",
    promptHi: "Aap kab tak lene ka soch rahe hain?",
    options: [
      { id: "immediate", en: "Immediately", hi: "Turant" },
      { id: "1_3_months", en: "1–3 months", hi: "1–3 mahine" },
      { id: "3_6_months", en: "3–6 months", hi: "3–6 mahine" },
      { id: "6_plus_months", en: "6+ months", hi: "6 mahine se zyada" },
      { id: "unclear", en: "Just exploring", hi: "Abhi dekh raha hoon" },
    ],
  },
  {
    id: "funding",
    render: "buttons",
    promptEn: "Will you need a home loan?",
    promptHi: "Kya aapko home loan chahiye hoga?",
    options: [
      { id: "loan_needed", en: "Yes, need a loan", hi: "Haan, loan chahiye" },
      { id: "loan_approved", en: "Already approved", hi: "Pehle se approved" },
      { id: "self", en: "Self-funded", hi: "Apne funds se" },
    ],
  },
  {
    id: "site_visit",
    render: "buttons",
    promptEn: "Would you like to visit the site this weekend?",
    promptHi: "Kya aap is weekend site visit karna chahenge?",
    options: [
      { id: "yes", en: "Yes", hi: "Haan" },
      { id: "maybe", en: "Maybe later", hi: "Baad mein" },
      { id: "no", en: "Not right now", hi: "Abhi nahi" },
    ],
  },
];

/** Budget option ids map to explicit rupee ranges, never re-parsed from text. */
const BUDGET_OPTIONS: Record<string, { min?: number; max?: number }> = {
  under_50l: { max: 5_000_000 },
  "50l_1cr": { min: 5_000_000, max: 10_000_000 },
  "1cr_2cr": { min: 10_000_000, max: 20_000_000 },
  "2cr_plus": { min: 20_000_000 },
};

export interface ConversationState {
  /** Answers gathered so far, from the bot AND from the original ad form. */
  qualification: Qualification;
  /** Questions already put to the buyer, so we never repeat one. */
  asked: QuestionId[];
  /** Consecutive replies we could not interpret. */
  consecutiveFailures: number;
  /** Set once a human takes over. The bot must go silent immediately. */
  humanHandoff: boolean;
}

/** After this many unreadable replies in a row, stop guessing and get a human. */
export const MAX_CONSECUTIVE_FAILURES = 2;
/** Never ask more than this in one sitting; completion collapses beyond it. */
export const MAX_QUESTIONS_PER_SESSION = 4;

export type ConversationStep =
  | { action: "ask"; question: Question; options: QuestionOption[] }
  | { action: "handoff"; reason: "complete" | "too_many_failures" | "human_took_over" | "session_limit" };

/**
 * Decide the next thing to say.
 *
 * Skips anything already answered — including fields the ad form already
 * captured. Asking a buyer for a budget they typed thirty seconds ago on
 * Facebook is the fastest way to look like a robot.
 */
export function nextStep(
  state: ConversationState,
  localityOptions: QuestionOption[] = [],
): ConversationStep {
  if (state.humanHandoff) return { action: "handoff", reason: "human_took_over" };
  if (state.consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
    return { action: "handoff", reason: "too_many_failures" };
  }
  if (state.asked.length >= MAX_QUESTIONS_PER_SESSION) {
    return { action: "handoff", reason: "session_limit" };
  }

  for (const q of QUESTIONS) {
    if (state.asked.includes(q.id)) continue;
    if (isAnswered(q.id, state.qualification)) continue;
    // A locality question with no configured options would be a dead end.
    if (q.dynamicOptions && localityOptions.length === 0) continue;
    return { action: "ask", question: q, options: q.dynamicOptions ? localityOptions : q.options };
  }

  return { action: "handoff", reason: "complete" };
}

export function isAnswered(id: QuestionId, q: Qualification): boolean {
  switch (id) {
    case "budget":
      return q.budgetMin !== undefined || q.budgetMax !== undefined;
    case "configuration":
      return q.configuration !== undefined;
    case "locality":
      return (q.preferredAreas?.length ?? 0) > 0;
    case "purpose":
      return q.purpose !== undefined && q.purpose !== "unclear";
    case "timeline":
      return q.timeline !== undefined;
    case "funding":
      return q.funding !== undefined && q.funding !== "unclear";
    case "site_visit":
      return q.siteVisitReady !== undefined;
  }
}

export interface AnswerResult {
  qualification: Qualification;
  accepted: boolean;
  /** What we understood, for the audit log. */
  interpreted?: string;
}

/**
 * Apply a reply to one question.
 *
 * Tries the button id first (exact, no ambiguity), then falls back to free-text
 * parsing via the same parsers the ad-form ingest uses — one implementation,
 * so a budget written as "50L" means the same thing whether it arrives from a
 * Meta form or a WhatsApp message.
 */
export function applyAnswer(
  q: Qualification,
  questionId: QuestionId,
  reply: string,
): AnswerResult {
  const next: Qualification = { ...q };
  const raw = reply.trim();
  if (!raw) return { qualification: next, accepted: false };

  switch (questionId) {
    case "budget": {
      const byId = BUDGET_OPTIONS[raw];
      if (byId) {
        if (byId.min !== undefined) next.budgetMin = byId.min;
        if (byId.max !== undefined) next.budgetMax = byId.max;
        return { qualification: next, accepted: true, interpreted: raw };
      }
      const parsed = parseIndianBudget(raw);
      if (parsed) {
        if (parsed.min !== undefined) next.budgetMin = parsed.min;
        if (parsed.max !== undefined) next.budgetMax = parsed.max;
        return { qualification: next, accepted: true, interpreted: JSON.stringify(parsed) };
      }
      return { qualification: next, accepted: false };
    }

    case "configuration": {
      const c = parseConfiguration(raw);
      if (c) {
        next.configuration = c;
        return { qualification: next, accepted: true, interpreted: c };
      }
      return { qualification: next, accepted: false };
    }

    case "locality": {
      const areas = raw
        .split(/[,/|]/)
        .map((s) => s.trim())
        .filter(Boolean);
      if (areas.length === 0) return { qualification: next, accepted: false };
      next.preferredAreas = areas;
      return { qualification: next, accepted: true, interpreted: areas.join(", ") };
    }

    case "purpose": {
      // "both" is a real answer people give. End use is the safer pitch:
      // an investor pitched a home still buys; a family pitched yield walks.
      if (raw === "both") {
        next.purpose = "end_use";
        return { qualification: next, accepted: true, interpreted: "both -> end_use" };
      }
      const p = parsePurpose(raw);
      if (p) {
        next.purpose = p;
        return { qualification: next, accepted: true, interpreted: p };
      }
      return { qualification: next, accepted: false };
    }

    case "timeline": {
      const t = parseTimeline(raw);
      if (t) {
        next.timeline = t;
        return { qualification: next, accepted: true, interpreted: t };
      }
      return { qualification: next, accepted: false };
    }

    case "funding": {
      const f = parseFunding(raw);
      if (f) {
        next.funding = f;
        return { qualification: next, accepted: true, interpreted: f };
      }
      return { qualification: next, accepted: false };
    }

    case "site_visit": {
      const v = parseYesNoMaybe(raw);
      if (v !== null) {
        next.siteVisitReady = v;
        return { qualification: next, accepted: true, interpreted: String(v) };
      }
      return { qualification: next, accepted: false };
    }
  }
}

/**
 * Words that must stop everything, in English and Hinglish.
 *
 * Checked BEFORE any question handling and honoured with no confirmation
 * step. A "are you sure you want to unsubscribe?" reply to someone who asked
 * you to stop is exactly how a WhatsApp number gets reported and throttled.
 */
// Two groups on purpose. WHOLE WORDS get \b on both sides; STEMS get a
// leading \b only. A trailing \b after a stem can never match when the next
// character is also a word char ("baat kar" + "ni"), which silently disables
// the pattern — the same bug that once swallowed "6+ months" in fieldmap.ts.
const OPT_OUT_WORDS = /\b(stop|unsubscribe|remove me|do not contact|dont contact|block|opt out)\b/i;
const OPT_OUT_STEMS = /\b(band kar|mat bhej|nahi chahi|hata do)/i;

export function isOptOut(reply: string): boolean {
  return OPT_OUT_WORDS.test(reply) || OPT_OUT_STEMS.test(reply);
}

/**
 * A reply that needs a person, not a script: pricing negotiation, complaints,
 * or an explicit ask for a human.
 */
const NEEDS_HUMAN_WORDS =
  /\b(call me|talk to|speak to|agent|manager|complaint|refund|legal|rera|human)\b/i;
const NEEDS_HUMAN_STEMS = /\b(baat kar|phone kar|call kar|milna cha)/i;

export function needsHuman(reply: string): boolean {
  return NEEDS_HUMAN_WORDS.test(reply) || NEEDS_HUMAN_STEMS.test(reply);
}
