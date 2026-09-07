/**
 * In-memory Repository.
 *
 * Not a toy: this is what the pipeline tests run against, so it must enforce
 * the same invariants Postgres does — above all the unique constraint on
 * (source, sourceEventId). A test double that is more permissive than the real
 * store lets idempotency bugs through to production, which defeats the point
 * of having the port at all.
 */

import { OPEN_STATES, type Agent, type AgentLoad } from "../domain/assignment.js";
import type { ExistingLead } from "../domain/dedupe.js";
import { isTerminal } from "../domain/states.js";
import type { InventoryBand } from "../domain/types.js";
import type {
  ActivityRecord,
  LeadRecord,
  RawEvent,
  Repository,
} from "./repository.js";

export class InMemoryRepository implements Repository {
  private leads = new Map<string, LeadRecord>();
  private rawEvents = new Map<string, { event: RawEvent; processedAt?: Date }>();
  private seenEventKeys = new Set<string>();
  private seq = 0;

  readonly activities: ActivityRecord[] = [];
  agents: Agent[] = [];
  loads: AgentLoad[] = [];
  band: InventoryBand | undefined;

  private nextId(prefix: string): string {
    this.seq += 1;
    return `${prefix}-${String(this.seq).padStart(6, "0")}`;
  }

  async recordRawEvent(event: RawEvent): Promise<{ stored: boolean; rawEventId: string }> {
    const id = this.nextId("raw");
    if (event.sourceEventId) {
      const key = `${event.source}::${event.sourceEventId}`;
      // Mirrors the partial unique index in 0001_init.sql.
      if (this.seenEventKeys.has(key)) return { stored: false, rawEventId: id };
      this.seenEventKeys.add(key);
    }
    this.rawEvents.set(id, { event });
    return { stored: true, rawEventId: id };
  }

  async markRawEventProcessed(rawEventId: string): Promise<void> {
    const row = this.rawEvents.get(rawEventId);
    if (row) row.processedAt = new Date();
  }

  async findLeadsByPhone(phoneE164: string): Promise<ExistingLead[]> {
    return [...this.leads.values()]
      .filter((l) => l.phoneE164 === phoneE164)
      .map((l) => ({
        id: l.id,
        phoneE164: l.phoneE164!,
        createdAt: l.createdAt,
        lastActivityAt: l.updatedAt,
        state: l.state,
        doNotContact: l.doNotContact,
      }));
  }

  async getLead(id: string): Promise<LeadRecord | null> {
    return this.leads.get(id) ?? null;
  }

  async createLead(lead: Omit<LeadRecord, "id" | "createdAt" | "updatedAt">): Promise<LeadRecord> {
    const now = lead.consentAt ?? new Date();
    const record: LeadRecord = { ...lead, id: this.nextId("lead"), createdAt: now, updatedAt: now };
    this.leads.set(record.id, record);
    return record;
  }

  async updateLead(id: string, patch: Partial<LeadRecord>): Promise<LeadRecord> {
    const existing = this.leads.get(id);
    if (!existing) throw new Error(`no such lead: ${id}`);
    const updated: LeadRecord = { ...existing, ...patch, updatedAt: patch.updatedAt ?? new Date() };
    this.leads.set(id, updated);
    return updated;
  }

  async appendActivity(activity: ActivityRecord): Promise<void> {
    this.activities.push(activity);
  }

  async listAgents(): Promise<Agent[]> {
    return this.agents;
  }

  async agentLoads(): Promise<AgentLoad[]> {
    if (this.loads.length > 0) return this.loads;
    // Derive from stored leads when the test has not pinned loads explicitly.
    const byAgent = new Map<string, AgentLoad>();
    for (const agent of this.agents) {
      byAgent.set(agent.id, { agentId: agent.id, assignedToday: 0, openLeads: 0, lastAssignedAt: null });
    }
    for (const lead of this.leads.values()) {
      if (!lead.assignedAgentId) continue;
      const load = byAgent.get(lead.assignedAgentId);
      if (!load) continue;
      if (OPEN_STATES.has(lead.state)) load.openLeads += 1;
      if (lead.assignedAt && (!load.lastAssignedAt || lead.assignedAt > load.lastAssignedAt)) {
        load.lastAssignedAt = lead.assignedAt;
      }
      load.assignedToday += 1;
    }
    return [...byAgent.values()];
  }

  async inventoryBand(): Promise<InventoryBand | undefined> {
    return this.band;
  }

  async dueLeads(before: Date, limit: number): Promise<LeadRecord[]> {
    return [...this.leads.values()]
      .filter((l) => l.nextActionAt !== null && l.nextActionAt <= before && !isTerminal(l.state))
      .sort((a, b) => a.nextActionAt!.getTime() - b.nextActionAt!.getTime())
      .slice(0, limit);
  }

  async awaitingFirstResponse(): Promise<LeadRecord[]> {
    return [...this.leads.values()].filter(
      (l) => l.assignedAt !== null && l.firstResponseAt === null && !isTerminal(l.state),
    );
  }

  async stalledLeads(): Promise<LeadRecord[]> {
    return [...this.leads.values()].filter((l) => l.nextActionAt === null && !isTerminal(l.state));
  }

  /** Test helper. Not part of the port. */
  allLeads(): LeadRecord[] {
    return [...this.leads.values()];
  }
}
