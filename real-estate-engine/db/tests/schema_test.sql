-- Schema behaviour tests. Run against a database with 0001 + 0002 applied:
--   psql -v ON_ERROR_STOP=1 -d <db> -f db/tests/schema_test.sql
--
-- Every assertion here guards an invariant the application relies on. A
-- constraint the database does not actually enforce is a comment, not a rule.

\set ON_ERROR_STOP on
-- Assertions raise on failure; their empty result rows are noise.
\o /dev/null
BEGIN;

CREATE OR REPLACE FUNCTION assert(cond boolean, msg text) RETURNS void AS $$
BEGIN
  IF NOT cond THEN RAISE EXCEPTION 'ASSERTION FAILED: %', msg; END IF;
END; $$ LANGUAGE plpgsql;

-- Returns true when the statement raised, false when it unexpectedly succeeded.
CREATE OR REPLACE FUNCTION raises(stmt text) RETURNS boolean AS $$
BEGIN
  BEGIN
    EXECUTE stmt;
    RETURN false;
  EXCEPTION WHEN others THEN
    RETURN true;
  END;
END; $$ LANGUAGE plpgsql;

-- --------------------------------------------------------------------------
-- Fixtures
-- --------------------------------------------------------------------------
INSERT INTO agents (id, name, phone_e164, territories)
VALUES ('11111111-1111-1111-1111-111111111111', 'Agent One', '+919000000001', ARRAY['Wakad']);

INSERT INTO projects (id, name, locality, city, price_min, price_max, configs)
VALUES ('22222222-2222-2222-2222-222222222222', 'Skyline', 'Wakad', 'Pune',
        5000000, 15000000, ARRAY['2bhk','3bhk']);

INSERT INTO leads (id, source, phone_e164, state, consent_source, consent_at, next_action_at)
VALUES ('33333333-3333-3333-3333-333333333333', 'meta_lead_ad', '+919876543210',
        'assigned', 'meta_lead_ad_form', now(), now() + interval '1 hour');

-- --------------------------------------------------------------------------
-- 1. Ingest idempotency. Every ad platform retries deliveries; a duplicate
--    lead means two agents call one buyer.
-- --------------------------------------------------------------------------
INSERT INTO raw_events (source, source_event_id, payload) VALUES ('meta_lead_ad', 'evt-1', '{}');
SELECT assert(
  raises($$INSERT INTO raw_events (source, source_event_id, payload)
           VALUES ('meta_lead_ad', 'evt-1', '{}')$$),
  'duplicate (source, source_event_id) must be rejected');

-- The same id from a DIFFERENT platform is a different lead and must be allowed.
INSERT INTO raw_events (source, source_event_id, payload) VALUES ('google_ads', 'evt-1', '{}');

-- A NULL event id must never collide: manual and email sources have no id.
INSERT INTO raw_events (source, source_event_id, payload) VALUES ('walkin', NULL, '{}');
INSERT INTO raw_events (source, source_event_id, payload) VALUES ('walkin', NULL, '{}');
SELECT assert((SELECT count(*) FROM raw_events WHERE source = 'walkin') = 2,
  'null source_event_id must not collide');

-- --------------------------------------------------------------------------
-- 2. The stall detector view. This is the query that finds leads the system
--    itself has forgotten — the failure no other check catches.
-- --------------------------------------------------------------------------
SELECT assert((SELECT count(*) FROM open_leads_without_next_action) = 0,
  'a lead with a scheduled action must not appear as stalled');

UPDATE leads SET next_action_at = NULL WHERE id = '33333333-3333-3333-3333-333333333333';
SELECT assert((SELECT count(*) FROM open_leads_without_next_action) = 1,
  'an open lead with no next action MUST be flagged');

-- Terminal states legitimately have no clock and must not raise a false alarm.
UPDATE leads SET state = 'customer' WHERE id = '33333333-3333-3333-3333-333333333333';
SELECT assert((SELECT count(*) FROM open_leads_without_next_action) = 0,
  'terminal leads must not be flagged as stalled');
UPDATE leads SET state = 'assigned', next_action_at = now() WHERE id = '33333333-3333-3333-3333-333333333333';

-- --------------------------------------------------------------------------
-- 3. Band checks
-- --------------------------------------------------------------------------
SELECT assert(
  raises($$INSERT INTO projects (name, locality, city, price_min, price_max)
           VALUES ('Bad', 'X', 'Pune', 9000000, 100000)$$),
  'price_max below price_min must be rejected');

SELECT assert(
  raises($$UPDATE leads SET budget_min = 9000000, budget_max = 100000
           WHERE id = '33333333-3333-3333-3333-333333333333'$$),
  'budget_max below budget_min must be rejected');

-- A one-sided budget is normal ("under 50 lakh") and must be allowed.
UPDATE leads SET budget_min = NULL, budget_max = 5000000
WHERE id = '33333333-3333-3333-3333-333333333333';

-- --------------------------------------------------------------------------
-- 4. One live conversation per lead. Two bots talking to one buyer is the
--    WhatsApp equivalent of two agents calling them.
-- --------------------------------------------------------------------------
INSERT INTO conversations (lead_id) VALUES ('33333333-3333-3333-3333-333333333333');
SELECT assert(
  raises($$INSERT INTO conversations (lead_id)
           VALUES ('33333333-3333-3333-3333-333333333333')$$),
  'a second OPEN conversation for one lead must be rejected');

-- Closing the first must free the lead for a later conversation.
UPDATE conversations SET completed_at = now() WHERE lead_id = '33333333-3333-3333-3333-333333333333';
INSERT INTO conversations (lead_id) VALUES ('33333333-3333-3333-3333-333333333333');

-- --------------------------------------------------------------------------
-- 5. A reminder must never fire twice
-- --------------------------------------------------------------------------
INSERT INTO site_visits (id, lead_id, agent_id, project_id, slot_start)
VALUES ('44444444-4444-4444-4444-444444444444', '33333333-3333-3333-3333-333333333333',
        '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222',
        now() + interval '2 days');

INSERT INTO visit_reminders (visit_id, kind, due_at)
VALUES ('44444444-4444-4444-4444-444444444444', 't_minus_24h', now() + interval '1 day');
SELECT assert(
  raises($$INSERT INTO visit_reminders (visit_id, kind, due_at)
           VALUES ('44444444-4444-4444-4444-444444444444', 't_minus_24h', now())$$),
  'the same reminder kind must not be schedulable twice for one visit');

-- --------------------------------------------------------------------------
-- 6. A revival event must touch each lead at most once
-- --------------------------------------------------------------------------
INSERT INTO revival_events (id, trigger, areas)
VALUES ('55555555-5555-5555-5555-555555555555', 'new_launch_in_area', ARRAY['Wakad']);
INSERT INTO revival_touches (lead_id, event_id)
VALUES ('33333333-3333-3333-3333-333333333333', '55555555-5555-5555-5555-555555555555');
SELECT assert(
  raises($$INSERT INTO revival_touches (lead_id, event_id)
           VALUES ('33333333-3333-3333-3333-333333333333','55555555-5555-5555-5555-555555555555')$$),
  'one lead must not be touched twice for the same revival event');

-- --------------------------------------------------------------------------
-- 7. Integration health. A pull integration that dies goes QUIET, and quiet
--    looks exactly like "no leads today". Alert on absence of success.
-- --------------------------------------------------------------------------
INSERT INTO integration_health (integration, last_success_at, stale_after_minutes)
VALUES ('linkedin_poll', now() - interval '10 minutes', 90),
       ('portal_mailbox', now() - interval '5 hours', 90),
       ('never_ran', NULL, 90);

SELECT assert(
  (SELECT count(*) FROM stale_integrations) = 2,
  'a stale poller AND one that never ran must both be flagged');
SELECT assert(
  (SELECT count(*) FROM stale_integrations WHERE integration = 'linkedin_poll') = 0,
  'a healthy poller must not be flagged');

-- --------------------------------------------------------------------------
-- 8. Cascades: deleting a lead must not leave orphaned history
-- --------------------------------------------------------------------------
INSERT INTO lead_activity (lead_id, actor, type)
VALUES ('33333333-3333-3333-3333-333333333333', 'system', 'lead_created');

DELETE FROM leads WHERE id = '33333333-3333-3333-3333-333333333333';
SELECT assert((SELECT count(*) FROM lead_activity) = 0, 'activity must cascade');
SELECT assert((SELECT count(*) FROM site_visits) = 0, 'visits must cascade');
SELECT assert((SELECT count(*) FROM visit_reminders) = 0, 'reminders must cascade with the visit');
SELECT assert((SELECT count(*) FROM conversations) = 0, 'conversations must cascade');

-- Deleting an AGENT must never delete a lead — the lead outlives the employee.
INSERT INTO leads (id, source, phone_e164, state, consent_source, consent_at,
                   assigned_agent_id, next_action_at)
VALUES ('66666666-6666-6666-6666-666666666666', 'website', '+919000000009', 'assigned',
        'website_form', now(), '11111111-1111-1111-1111-111111111111', now());
DELETE FROM agents WHERE id = '11111111-1111-1111-1111-111111111111';
SELECT assert(
  (SELECT count(*) FROM leads WHERE id = '66666666-6666-6666-6666-666666666666') = 1,
  'a lead must survive its agent leaving the company');
SELECT assert(
  (SELECT assigned_agent_id FROM leads WHERE id = '66666666-6666-6666-6666-666666666666') IS NULL,
  'the assignment must be nulled, not dangling');

\o
\echo 'ALL SCHEMA ASSERTIONS PASSED'
ROLLBACK;
