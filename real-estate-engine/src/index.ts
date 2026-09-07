// Domain — pure rules, no I/O.
export * from "./domain/time.js";
export * from "./domain/types.js";
export * from "./domain/states.js";
export * from "./domain/phone.js";
export * from "./domain/dedupe.js";
export * from "./domain/scoring.js";
export { CONTACT_WINDOW, MIN_HOURS_BETWEEN_MESSAGES, CADENCES, isInContactWindow, clampToContactWindow, nextCadenceAction } from "./domain/cadence.js";
export type { CadenceChannel, CadenceStep, CadenceState, CadenceOutcome } from "./domain/cadence.js";
export * from "./domain/assignment.js";
export * from "./domain/sla.js";
export * from "./domain/conversation.js";
export * from "./domain/booking.js";
export * from "./domain/retention.js";
export * from "./domain/metrics.js";

// Ingest — one NormalisedLead out of every source.
export * from "./ingest/types.js";
export * from "./ingest/fieldmap.js";
export * from "./ingest/meta.js";
export * from "./ingest/google.js";
export * from "./ingest/linkedin.js";
export * from "./ingest/portals.js";
export * from "./ingest/direct.js";

// Ports — persistence boundary.
export * from "./ports/repository.js";
export * from "./ports/memory.js";

// Pipeline — orchestration and delivery.
export * from "./pipeline/ingest.js";
export * from "./pipeline/workers.js";
export * from "./pipeline/handlers.js";
