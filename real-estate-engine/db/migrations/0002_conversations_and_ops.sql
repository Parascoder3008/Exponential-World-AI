-- Operational tables for qualification, retention and integration health.
-- Mirrors src/domain/conversation.ts, retention.ts and ingest/linkedin.ts.

-- ---------------------------------------------------------------------------
-- WhatsApp qualification conversations
-- ---------------------------------------------------------------------------
CREATE TABLE conversations (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id         uuid NOT NULL REFERENCES leads (id) ON DELETE CASCADE,
  started_at      timestamptz NOT NULL DEFAULT now(),
  last_message_at timestamptz,
  -- Question ids already put to this buyer, so none is ever repeated.
  asked           text[] NOT NULL DEFAULT '{}',
  consecutive_failures int NOT NULL DEFAULT 0,
  -- Set on any inbound reply the bot cannot handle, or an explicit ask for a
  -- person. The bot must go silent immediately when this is true.
  human_handoff   boolean NOT NULL DEFAULT false,
  handoff_reason  text,
  completed_at    timestamptz
);
CREATE INDEX conversations_lead ON conversations (lead_id);
-- One live conversation per lead. Two bots talking to one buyer is the
-- WhatsApp equivalent of two agents calling them.
CREATE UNIQUE INDEX conversations_one_open_per_lead
  ON conversations (lead_id) WHERE completed_at IS NULL;

-- ---------------------------------------------------------------------------
-- Reminders and reschedules
-- ---------------------------------------------------------------------------
CREATE TABLE visit_reminders (
  id         bigserial PRIMARY KEY,
  visit_id   uuid NOT NULL REFERENCES site_visits (id) ON DELETE CASCADE,
  kind       text NOT NULL,               -- t_minus_24h | t_minus_3h | t_minus_30m
  due_at     timestamptz NOT NULL,
  sent_at    timestamptz,
  UNIQUE (visit_id, kind)                 -- a reminder can never fire twice
);
CREATE INDEX visit_reminders_due ON visit_reminders (due_at) WHERE sent_at IS NULL;

ALTER TABLE site_visits ADD COLUMN reschedule_count int NOT NULL DEFAULT 0;
ALTER TABLE site_visits ADD COLUMN rescheduled_from uuid REFERENCES site_visits (id);

-- ---------------------------------------------------------------------------
-- Retention
-- ---------------------------------------------------------------------------
CREATE TABLE revival_events (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trigger     text NOT NULL,              -- new_launch_in_area | price_drop | ...
  areas       text[] NOT NULL DEFAULT '{}',
  price_min   bigint,
  price_max   bigint,
  project_id  uuid REFERENCES projects (id) ON DELETE SET NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  -- Set once the matching sweep has run, so an event fires exactly once.
  processed_at timestamptz
);

CREATE TABLE revival_touches (
  id         bigserial PRIMARY KEY,
  lead_id    uuid NOT NULL REFERENCES leads (id) ON DELETE CASCADE,
  event_id   uuid NOT NULL REFERENCES revival_events (id) ON DELETE CASCADE,
  touched_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (lead_id, event_id)              -- never twice for the same event
);
-- Enforces the cooldown at the storage layer: the matcher reads the most
-- recent touch per lead rather than trusting an in-memory cache.
CREATE INDEX revival_touches_lead ON revival_touches (lead_id, touched_at DESC);

CREATE TABLE referrals (
  code             text PRIMARY KEY,
  referrer_lead_id uuid NOT NULL REFERENCES leads (id) ON DELETE CASCADE,
  created_at       timestamptz NOT NULL DEFAULT now(),
  incentive        text,
  UNIQUE (referrer_lead_id)
);

ALTER TABLE leads ADD COLUMN referred_by_code text REFERENCES referrals (code);
CREATE INDEX leads_referred_by ON leads (referred_by_code) WHERE referred_by_code IS NOT NULL;

CREATE TABLE customer_milestones (
  id         bigserial PRIMARY KEY,
  lead_id    uuid NOT NULL REFERENCES leads (id) ON DELETE CASCADE,
  milestone  text NOT NULL,
  due_at     timestamptz,
  sent_at    timestamptz,
  UNIQUE (lead_id, milestone)
);
CREATE INDEX customer_milestones_due ON customer_milestones (due_at) WHERE sent_at IS NULL;

-- ---------------------------------------------------------------------------
-- Integration health
-- ---------------------------------------------------------------------------
--
-- This table exists for one reason: a PULL integration that dies goes QUIET,
-- and quiet is indistinguishable from "no leads today". LinkedIn polling and
-- the portal mailbox poller both fail this way, as does an expired OAuth
-- token. Alerting on failures is not enough — you must alert on the ABSENCE
-- of a recent success.
CREATE TABLE integration_health (
  integration        text PRIMARY KEY,    -- 'linkedin_poll' | 'portal_mailbox' | ...
  last_success_at    timestamptz,
  last_attempt_at    timestamptz,
  last_error         text,
  consecutive_failures int NOT NULL DEFAULT 0,
  -- Alert when now() - last_success_at exceeds this, regardless of volume.
  stale_after_minutes int NOT NULL DEFAULT 90
);

CREATE VIEW stale_integrations AS
  SELECT integration,
         last_success_at,
         EXTRACT(EPOCH FROM (now() - last_success_at)) / 60 AS minutes_since_success,
         last_error
  FROM integration_health
  WHERE last_success_at IS NULL
     OR now() - last_success_at > (stale_after_minutes || ' minutes')::interval;

-- Columns 0001 did not anticipate.
-- cadence_anchor_at, human_handoff, phone_raw and score_breakdown already
-- exist in 0001 and are deliberately NOT repeated here.
ALTER TABLE leads ADD COLUMN escalations_fired int NOT NULL DEFAULT 0;
ALTER TABLE leads ADD COLUMN is_test boolean NOT NULL DEFAULT false;
ALTER TABLE leads ADD COLUMN unmapped_fields jsonb NOT NULL DEFAULT '{}';

-- Test submissions must be invisible to every operational query, or an agent
-- eventually calls Google's form-preview robot.
CREATE INDEX leads_real_only ON leads (state) WHERE is_test = false;
