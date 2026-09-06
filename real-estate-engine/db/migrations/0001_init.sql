-- Real estate broker automation — initial schema.
--
-- One leads table is the single source of truth. Every worker reads it, acts,
-- and writes back a state plus an append-only activity row. Workers never call
-- each other. This is the decision that keeps the system debuggable.
--
-- Mirrors src/domain/types.ts and src/domain/states.ts. Change both together.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------------
-- Raw inbound payloads, written BEFORE parsing.
-- When a portal changes its email format at 2am you replay from here.
-- You do not lose the day's leads.
-- ---------------------------------------------------------------------------
CREATE TABLE raw_events (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  received_at   timestamptz NOT NULL DEFAULT now(),
  source        text NOT NULL,
  -- The source's own event id. Meta and the portals both retry webhooks,
  -- so ingest must be idempotent on this.
  source_event_id text,
  payload       jsonb NOT NULL,
  processed_at  timestamptz,
  process_error text,
  lead_id       uuid
);
CREATE UNIQUE INDEX raw_events_source_event_uniq
  ON raw_events (source, source_event_id)
  WHERE source_event_id IS NOT NULL;
CREATE INDEX raw_events_unprocessed ON raw_events (received_at) WHERE processed_at IS NULL;

-- ---------------------------------------------------------------------------
CREATE TABLE agents (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name             text NOT NULL,
  phone_e164       text NOT NULL,
  email            text,
  active           boolean NOT NULL DEFAULT true,
  capacity_per_day int NOT NULL DEFAULT 15,
  territories      text[] NOT NULL DEFAULT '{}',
  working_hours    jsonb NOT NULL DEFAULT '{"start":"09:30","end":"19:00","days":[1,2,3,4,5,6,0]}',
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- Inventory. The qualification engine cannot score budget fit without this,
-- and most brokers do not have it in clean form. Budget real time for it.
CREATE TABLE projects (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL,
  developer    text,
  locality     text NOT NULL,
  city         text NOT NULL,
  price_min    bigint NOT NULL,
  price_max    bigint NOT NULL,
  configs      text[] NOT NULL DEFAULT '{}',
  rera_id      text,
  brochure_url text,
  location_url text,
  active       boolean NOT NULL DEFAULT true,
  -- Staleness check: flag anything untouched for 30 days.
  updated_at   timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT projects_price_band CHECK (price_max >= price_min)
);

-- ---------------------------------------------------------------------------
CREATE TABLE leads (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),

  source            text NOT NULL,
  source_campaign   text,
  full_name         text,
  -- Normalised E.164. NULL only when normalisation failed; such a lead is
  -- still stored (never drop a payload) but cannot participate in dedupe.
  phone_e164        text,
  phone_raw         text,
  email             text,
  city              text,

  budget_min        bigint,
  budget_max        bigint,
  configuration     text,
  preferred_areas   text[] NOT NULL DEFAULT '{}',
  purpose           text,
  timeline          text,
  funding           text,
  site_visit_ready  text,           -- 'yes' | 'no' | 'maybe' | NULL

  state             text NOT NULL DEFAULT 'new',
  score             int,
  score_breakdown   jsonb,
  tier              text,
  disqualify_reason text,

  assigned_agent_id uuid REFERENCES agents (id) ON DELETE SET NULL,
  assigned_at       timestamptz,
  -- The SLA clock. This single column is the metric that justifies the invoice.
  first_response_at timestamptz,
  -- Drives the whole cadence engine. NULL + non-terminal state = a dead lead.
  next_action_at    timestamptz,
  cadence_step      int NOT NULL DEFAULT 0,
  cadence_anchor_at timestamptz,
  last_message_at   timestamptz,
  -- Set on any inbound reply. Automation must never talk over a live human.
  human_handoff     boolean NOT NULL DEFAULT false,

  consent_source    text,
  consent_at        timestamptz,
  do_not_contact    boolean NOT NULL DEFAULT false,
  dedupe_of         uuid REFERENCES leads (id) ON DELETE SET NULL,

  CONSTRAINT leads_budget_band CHECK (budget_max IS NULL OR budget_min IS NULL OR budget_max >= budget_min)
);

-- Dedupe lookups and the assignment queue are the two hot paths.
CREATE INDEX leads_phone ON leads (phone_e164) WHERE phone_e164 IS NOT NULL;
CREATE INDEX leads_due ON leads (next_action_at) WHERE next_action_at IS NOT NULL;
CREATE INDEX leads_agent_open ON leads (assigned_agent_id, state);
CREATE INDEX leads_state ON leads (state);

-- The stall detector, as a query rather than a nightly script you forget to run:
--   SELECT * FROM open_leads_without_next_action;
-- Anything in here is a lead nobody will ever touch again. Alert on it.
CREATE VIEW open_leads_without_next_action AS
  SELECT id, state, created_at, assigned_agent_id
  FROM leads
  WHERE next_action_at IS NULL
    AND state NOT IN ('customer', 'disqualified', 'dnc');

-- ---------------------------------------------------------------------------
-- Append-only. Never UPDATE, never DELETE. This is the audit trail that
-- settles arguments about who was told what and when.
-- ---------------------------------------------------------------------------
CREATE TABLE lead_activity (
  id       bigserial PRIMARY KEY,
  lead_id  uuid NOT NULL REFERENCES leads (id) ON DELETE CASCADE,
  at       timestamptz NOT NULL DEFAULT now(),
  actor    text NOT NULL,             -- 'system' | 'bot' | 'voice_agent' | agent uuid
  type     text NOT NULL,             -- state_change | whatsapp_out | whatsapp_in |
                                      -- call_attempt | call_connected | note | visit_logged
  channel  text,
  outcome  text,
  payload  jsonb NOT NULL DEFAULT '{}'
);
CREATE INDEX lead_activity_lead ON lead_activity (lead_id, at DESC);

-- ---------------------------------------------------------------------------
CREATE TABLE site_visits (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id      uuid NOT NULL REFERENCES leads (id) ON DELETE CASCADE,
  agent_id     uuid REFERENCES agents (id) ON DELETE SET NULL,
  project_id   uuid REFERENCES projects (id) ON DELETE SET NULL,
  slot_start   timestamptz NOT NULL,
  slot_end     timestamptz,
  status       text NOT NULL DEFAULT 'booked',  -- booked | done | no_show | cancelled
  cab_required boolean NOT NULL DEFAULT false,
  pickup_address text,
  -- Captured post-visit. This is the fuel for the whole re-engagement layer;
  -- if agents will not fill it, gate their next lead assignment on it.
  feedback     jsonb,
  outcome      text,
  next_step    text,
  created_at   timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX site_visits_lead ON site_visits (lead_id);
CREATE INDEX site_visits_slot ON site_visits (slot_start);

-- SLA breaches, written by the escalation worker. Feeds the weekly leaderboard.
CREATE TABLE sla_breaches (
  id           bigserial PRIMARY KEY,
  lead_id      uuid NOT NULL REFERENCES leads (id) ON DELETE CASCADE,
  agent_id     uuid REFERENCES agents (id) ON DELETE SET NULL,
  breached_at  timestamptz NOT NULL DEFAULT now(),
  threshold    text NOT NULL,          -- '5m' | '15m' | '30m'
  action_taken text NOT NULL           -- 'renotified' | 'reassigned' | 'escalated'
);
