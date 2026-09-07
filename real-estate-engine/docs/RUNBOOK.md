# Runbook

What to watch, what it means, and what to do about it.

---

## Daily

### 1. Stalled leads — **the most important check in the system**
```sql
SELECT * FROM open_leads_without_next_action;
```
Or `runStallDetector(repo)`.

**Should always be empty.** Anything here is an open lead with no scheduled
action: it will never appear in an agent's queue and nobody will ever touch it
again. Every other worker fails loudly; this is the check that catches the
failures that do not.

The detector repairs what it can (re-queues the lead) and leaves alone the two
cases that are stalled *on purpose*: `human_handoff` and `do_not_contact`.
If the count is non-zero **after** a repair pass, a worker is writing a state
transition without setting `next_action_at` — find it in `lead_activity`.

### 2. Silent integrations
```sql
SELECT * FROM stale_integrations;
```
**A pull integration that dies goes quiet, and quiet looks exactly like "no
leads today."** LinkedIn polling, the portal mailbox, and any expired OAuth
token all fail this way. This view alerts on the absence of a recent success.

| Integration | Usual cause |
|---|---|
| `linkedin_poll` | expired refresh token; revoked Marketing API access |
| `portal_mailbox` | mailbox password change; IMAP quota; forwarding rule removed |

### 3. Portal email quarantine
```sql
SELECT * FROM raw_events WHERE source = 'portal_email_quarantine'
  AND received_at > now() - interval '1 day';
```
Portals redesign templates without warning. A sudden run of quarantined mail
from one portal means a redesign: read one, add the new label to `LABELS` in
`src/ingest/portals.ts` (a one-line change), replay the quarantined rows.

**A trickle is normal** — auto-replies and unrelated mail land here too.

### 4. WhatsApp quality rating
Check in the Meta Business Manager. A drop to *Medium* is a warning; *Low*
means throttling is imminent.

Causes, in order of likelihood: cadence too aggressive, marketing templates
where utility would do, messaging people who did not opt in, opt-out not being
honoured fast enough. **A banned number takes the client's entire channel
down** — treat a Medium rating as a same-day problem.

---

## Weekly

### SLA scorecard
`buildScorecard()` → post to the team group every Monday.

Ranked **worst-first on purpose**: a leaderboard sorted best-first reads as a
celebration and the bottom is never reached.

| Reading | Meaning |
|---|---|
| Compliance < 80% for one agent | coaching conversation |
| Compliance < 80% across the team | the SLA is unrealistic, or lead volume exceeds capacity |
| High reassignment rate | territories or shifts are misconfigured |
| Median response climbing week on week | capacity problem before it becomes a revenue problem |

### Unmapped fields review
```sql
SELECT key, count(*) FROM leads, jsonb_each_text(unmapped_fields)
GROUP BY key ORDER BY count DESC LIMIT 20;
```
Every new campaign is a fresh chance for a question wording to silently miss.
A frequent key here is a synonym worth adding to `SYNONYMS` in
`src/ingest/fieldmap.ts`.

**This has already caught two production-class bugs** (see README). Treat it
as a standing job, not a debug field.

### Inventory freshness
```sql
SELECT name, updated_at FROM projects
WHERE active AND updated_at < now() - interval '30 days';
```
Budget-fit is **25 of the 100 available scoring points**. Stale price bands
mean the scoring is quietly wrong for every lead.

---

## Incidents

### "We stopped getting leads"
Work outward:
1. `SELECT source, count(*) FROM raw_events WHERE received_at > now() - interval '6 hours' GROUP BY source;`
   — **Rows present?** Ingest is fine; the problem is downstream.
   **No rows?** The platform is not delivering.
2. `SELECT * FROM stale_integrations;` — catches the pull sources.
3. Meta: check the app's webhook subscription status. Meta **unsubscribes apps
   that consistently return errors or time out**, and it does so silently.
4. `SELECT * FROM raw_events WHERE processed_at IS NULL ORDER BY received_at;`
   — payloads arriving but not processing means the parse step is throwing.

### "A buyer got two calls from two agents"
The most visible way this system embarrasses a broker.
```sql
SELECT phone_e164, count(*) FROM leads
GROUP BY phone_e164 HAVING count(*) > 1;
```
Expected causes: legitimately outside the 90-day dedupe window (check
`dedupe_of` — it should be set), or a phone that failed normalisation
(`phone_e164 IS NULL`) and so could not participate in dedupe at all.

If neither: two rows with the same normalised phone inside the window is a
**dedupe bug**. Get the `raw_events` for both and reproduce.

### "The bot said something wrong"
```sql
SELECT * FROM lead_activity WHERE lead_id = $1 ORDER BY at;
```
Every message, state change and score is here with its inputs. `lead_created`
carries the full score breakdown — you can show the broker the arithmetic.

### After an outage
Nothing to do. Sweeps ask "what is due now?" and self-heal.

**Do not manually re-fire the backlog.** The cadence sweep deliberately
*skips* steps more than 12h overdue (`STALE_STEP_HOURS`) rather than sending
them late — firing a lead's whole queued ladder at once is the fastest way to
get the number blocked. Check `cadence_step_skipped` activity rows to see what
was passed over.

---

## Tuning, and when

Everything below is config, not code. All of it starts as an **informed guess**
and should be re-fitted against real outcomes after ~90 days.

| Knob | File | Re-fit against |
|---|---|---|
| `TIMELINE_POINTS`, `TIER_THRESHOLDS` | `domain/scoring.ts` | actual visit→booking rates by tier |
| `CADENCES` | `domain/cadence.ts` | reply rate per step; drop the steps nobody answers |
| `SLA_LADDERS` | `domain/sla.ts` | what the team can actually sustain |
| `DEDUPE_WINDOW_DAYS` | `domain/dedupe.ts` | observed re-enquiry intervals |
| `DEFAULT_MIN_LEAD_MINUTES` | `domain/booking.ts` | no-show rate by notice given |
| `STALE_STEP_HOURS` | `pipeline/workers.ts` | rarely — 12h survives an overnight outage |

**One behaviour to know before you tune:** budget fit is the heaviest single
factor (25 pts), so an in-budget buyer six months out scores *warm*, not cold.
That is intentional — someone who can afford your inventory but is slow is
worth more than someone urgent who cannot. It is asserted in a test so nobody
"fixes" it by accident.
