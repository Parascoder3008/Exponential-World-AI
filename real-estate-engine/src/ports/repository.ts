/**
 * The persistence port.
 *
 * The domain and pipeline depend on this interface, never on a database
 * driver. Two payoffs, both real:
 *
 *   1. The entire pipeline is testable in milliseconds against an in-memory
 *      implementation, including concurrency and idempotency behaviour.
 *   2. The Postgres recommendation is a recommendation, not a lock-in. If a
 *      client mandates their own stack, one adapter changes and nothing else.
 *
 * Every method that writes takes an explicit `now` where timing matters, so
 * tests are deterministic and never sleep.
 */

import type { Agent, AgentLoad } from "../domain/assignment.js";
import type { ExistingLead } from "../domain/dedupe.js";
import type { LeadState } from "../domain/states.js";
import type { InventoryBand, LeadSource, Qualification, Tier } from "../domain/types.js";

export interface LeadRecord {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  source: LeadSource;
  sourceCampaign?: string;
  fullName?: string;
  phoneRaw?: string;
  phoneE164: string | null;
  email?: string;
  city?: string;
  qualification: Qualification;
  state: LeadState;
  score: number | null;
  scoreBreakdown: unknown;
  tier: Tier | null;
  disqualifyReason: string | null;
  assignedAgentId: string | null;
  assignedAt: Date | null;
  firstResponseAt: Date | null;
  nextActionAt: Date | null;
  cadenceStep: number;
  cadenceAnchorAt: Date | null;
  lastMessageAt: Date | null;
  humanHandoff: boolean;
  escalationsFired: number;
  consentSource: string;
  consentAt: Date;
  doNotContact: boolean;
  dedupeOf: string | null;
  isTest: boolean;
  unmappedFields: Record<string, string>;
}

export interface ActivityRecord {
  leadId: string;
  at: Date;
  actor: string;
  type: string;
  channel?: string;
  outcome?: string;
  payload?: Record<string, unknown>;
}

export interface RawEvent {
  source: string;
  sourceEventId: string | null;
  payload: unknown;
  receivedAt: Date;
}

export interface Repository {
  /**
   * Persist the raw inbound payload BEFORE parsing, and return false if this
   * (source, sourceEventId) has already been stored.
   *
   * The idempotency check lives here, at the storage boundary, because that
   * is the only place it can be atomic. Checking in application code and then
   * writing is a race, and every one of these platforms retries deliveries.
   */
  recordRawEvent(event: RawEvent): Promise<{ stored: boolean; rawEventId: string }>;

  markRawEventProcessed(rawEventId: string, leadId: string | null, error?: string): Promise<void>;

  findLeadsByPhone(phoneE164: string): Promise<ExistingLead[]>;
  getLead(id: string): Promise<LeadRecord | null>;
  createLead(lead: Omit<LeadRecord, "id" | "createdAt" | "updatedAt">): Promise<LeadRecord>;
  updateLead(id: string, patch: Partial<LeadRecord>): Promise<LeadRecord>;

  appendActivity(activity: ActivityRecord): Promise<void>;

  listAgents(): Promise<Agent[]>;
  agentLoads(): Promise<AgentLoad[]>;

  /** The price band of live inventory, for budget-fit scoring. */
  inventoryBand(): Promise<InventoryBand | undefined>;

  /** Leads whose next_action_at has come due. Drives the cadence sweep. */
  dueLeads(before: Date, limit: number): Promise<LeadRecord[]>;

  /** Assigned leads with no first response yet. Drives the SLA sweep. */
  awaitingFirstResponse(): Promise<LeadRecord[]>;

  /**
   * Non-terminal leads with no scheduled next action — the stall detector.
   * Anything returned here is a lead nobody will ever touch again.
   */
  stalledLeads(): Promise<LeadRecord[]>;
}
