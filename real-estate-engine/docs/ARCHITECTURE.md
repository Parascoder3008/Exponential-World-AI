# Architecture

## The one decision everything else follows from

**One leads table, one state machine, one dashboard.** Lead capture,
qualification, follow-up, booking and retention are not five systems. They are
five *states* of a single lead record. Built as five tools, every seam becomes
a place where a lead silently dies, and you spend more time reconciling five
sources of truth than selling.

Every worker reads a lead, acts, and writes back a state plus an activity row.
**No worker calls another worker.** That is what makes the system debuggable,
and what lets a voice agent be added later without rewriting anything.

```
   Meta Lead Ads ──┐  push, 2 hops (webhook → fetch)
   Google Ads   ───┤  push, 1 hop
   LinkedIn     ───┤  PULL (poll + heartbeat)
   99acres      ───┤  email
   MagicBricks  ───┼──▶ raw_events ──▶ normalise ──▶ dedupe ──▶ LEADS ◀── one truth
   Housing      ───┤    (before          (E.164)    (90 days)     │
   Website form ───┤     parsing)                                 │
   Missed call  ───┤                                              │
   Walk-in      ───┘                                              │
                                                                  ▼
              ┌──────────────┬──────────────┬─────────────┬──────────────┐
              ▼              ▼              ▼             ▼              ▼
          qualify        assign         cadence       booking        retention
        (WhatsApp)   (+ SLA clock)      sweep       (+reminders)   (triggered)
              └──────────────┴──────────────┴─────────────┴──────────────┘
                                       ▼
                              owner · manager · agent
```

## Layers

| Layer | Path | Depends on |
|---|---|---|
| **Domain** | `src/domain/` | nothing. Pure functions, injected clocks, no I/O |
| **Ingest** | `src/ingest/` | domain only |
| **Ports** | `src/ports/` | domain types only — the persistence interface |
| **Pipeline** | `src/pipeline/` | everything above, via the port |

Dependencies point one way. The domain never imports a database driver, an HTTP
framework, or a messaging SDK. Two payoffs, both cashed in daily:

1. The whole suite runs in ~2 seconds with no infrastructure.
2. Postgres is a *recommendation*, not a lock-in. A client who mandates their
   own stack costs you one adapter, not a rewrite.

## The invariants

These are enforced in code and asserted in tests. Breaking one is how a lead
dies quietly.

1. **A non-terminal lead always has `next_action_at`.** Only `customer`,
   `disqualified` and `dnc` are terminal. `nurture_long`, `revival`,
   `no_response` and `not_interested` are explicitly *not* — a lead that did
   not buy is slow, not dead. `runStallDetector` finds violations and repairs
   what it can; the `open_leads_without_next_action` view is the same check in
   SQL.

2. **Every non-terminal state can reach `dnc`.** Opt-out works from anywhere,
   always, with no confirmation step. Asserted across all 21 states.

3. **Scoring orders the queue; it never empties it.** Only `disqualify()`
   removes a lead, and it fires on facts — wrong city, unusable number, a
   broker, a job seeker, a test submission. Never on a soft signal like a long
   timeline. Every disqualification is human-reversible.

4. **Nothing is dropped at ingest.** `raw_events` is written *before* parsing.
   Unrecognised form questions land in `unmapped_fields`. Unparseable portal
   emails are quarantined. A lead whose phone will not normalise is still
   stored.

5. **Ingest is idempotent on `(source, source_event_id)`,** enforced by a
   partial unique index — at the storage boundary, because that is the only
   place it can be atomic.

6. **No automated message lands outside 09:00–20:00 IST,** at most one per 24h,
   and any inbound reply pauses everything instantly. Visit reminders use a
   wider 07:00–21:00 window because they are utility messages about a
   commitment the buyer made.

## Why sweeps, not timers

All three background workers ask "what is due right now?" rather than holding a
timer per lead. A timer does not survive a deploy, a restart or a queue drain.
A sweep survives all three and self-heals after an outage. Every worker is
idempotent and safe to run twice.

| Worker | Cadence | Job |
|---|---|---|
| `runCadenceSweep` | every 5 min | send what is due; skip what is too stale |
| `runSlaSweep` | every 1 min | escalate unanswered leads |
| `runStallDetector` | nightly | find leads the system itself forgot |

**Catch-up matters more than it sounds.** After an outage the cadence sweep
finds leads several steps behind. Firing all of them is a burst of WhatsApp
messages in quick succession — the fastest way to get a number reported and
quality-throttled. Steps more than `STALE_STEP_HOURS` (12h) overdue are
skipped and logged, and the sweep walks past them in one pass rather than
needing one sweep per stale step.

## Push vs pull, and why it changes the design

| | Meta | Google | LinkedIn | Portals |
|---|---|---|---|---|
| Delivery | push, 2 hops | push, 1 hop | **pull** | email |
| Auth | HMAC over raw body | shared key | OAuth | mailbox |
| Fails as | 4xx you can alert on | 4xx | **silence** | silence |

A webhook that breaks throws errors. **A poller that breaks goes quiet, and
quiet is indistinguishable from "no leads today."** An expired OAuth token
looks identical. That is why `pollHealth()` and the `integration_health` table
alert on *the absence of a recent success*, not on failures and not on volume.
Without it, a dead LinkedIn or mailbox integration goes unnoticed for a month.

## Where the LLM belongs

Almost nowhere, and that is the point.

- **Not** asking the seven qualification questions — buttons give structured
  data with zero parsing risk and higher completion.
- **Not** scoring — the rubric is a transparent weighted sum the broker can
  audit. A score nobody can explain gets overridden until the system is
  decorative.
- **Yes** for off-script replies, a paragraph containing four answers at once,
  Hinglish comprehension, and answering "what's the price?".

Voice is a **Phase 3 rescue layer**, not a Phase 1 gate: the 60-70% who never
reply on WhatsApp, after-hours leads, and bulk revival of dead lists. Making
it the qualification gate means the pilot fails on the hardest component while
the 80% that works never gets seen.
