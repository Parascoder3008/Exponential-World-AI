# real-estate-engine

Domain core for the real estate broker lead automation system described in
[`../plans/real-estate-broker-automation.md`](../plans/real-estate-broker-automation.md).

**Zero runtime dependencies. No database, no HTTP, no API keys.** The entire
suite runs in under a second.

```bash
npm install
npm test          # 48 tests
npm run typecheck
```

## Why this is the first commit, and not a dashboard

The plan recommends the `new-client-system` template (Next.js + Trigger.dev)
for the shell. That template is still the right shell — but it is the wrong
*first* commit, for three reasons:

1. **It needs a named client.** It substitutes a client name, email domain and
   auth restriction at scaffold time. We have not picked the pilot broker yet.
2. **It is MongoDB-backed.** This design leans on relational integrity —
   `leads ↔ activity ↔ agents ↔ visits`, a unique dedupe key, transactional
   state transitions, and a view that finds stalled leads. Mongo can express
   that; it cannot *enforce* it, and an unenforceable invariant is a lead that
   silently dies six months from now.
3. **UI is cheap to rewrite. The state machine is not.** Everything expensive
   to get wrong lives in this package. Everything cheap to redo lives in the
   shell.

So the domain core is deliberately shell-agnostic. If we end up on Mongo, or
on a different frontend, or wiring this into an existing CRM, **every file in
`src/` survives untouched** — only `db/migrations/` gets thrown away.

## What's here

| File | What it owns | Why it matters |
|---|---|---|
| `src/domain/states.ts` | The lead state machine — 21 states, declared transitions, terminal set, stall detector | The spine. Workers read a lead, act, write a transition. No worker calls another worker. |
| `src/domain/phone.ts` | E.164 normalisation, India-first, NRI-safe | The identity layer. Nine manglings of one number collapse to one key. Get this wrong and two agents call the same buyer. |
| `src/domain/dedupe.ts` | Same-lead vs new-cycle decision, DNC suppression | 90-day window. Inside it, a repeat enquiry is activity. Outside it, a new purchase cycle with linked history. |
| `src/domain/scoring.ts` | Transparent weighted rubric + hard disqualification | Score **orders the queue, never empties it**. Breakdown is always returned so the broker can audit the arithmetic. |
| `src/domain/cadence.ts` | Follow-up ladders per tier, contact window, 24h cap, handoff pause | Computes `next_action_at`. No long-lived timers — a scheduler sweeps for due leads. |
| `db/migrations/0001_init.sql` | Postgres schema mirroring the above | Includes `open_leads_without_next_action`, the view that finds leads nobody will ever touch again. |

## Three invariants the tests actually enforce

1. **Every non-terminal state can reach `dnc`.** Opt-out must work from
   anywhere, always. Asserted across all 21 states.
2. **Only `customer`, `disqualified` and `dnc` are terminal.** `nurture_long`,
   `revival`, `no_response` and `not_interested` are explicitly *not* — a lead
   that did not buy is a slow lead, not a dead one, and it stays on a clock.
3. **No scheduled send lands outside 09:00–20:00 IST.** Asserted across every
   step of all three cadence ladders, anchored at 19:30 so naive offsets would
   fail. A number that gets blocked takes the broker's whole channel down.

## Tuning knobs (config, not code)

These are the values to re-fit after ~90 days against real
visit-to-booking data. They are informed starting points, **not truth**:

- `scoring.ts` → `TIMELINE_POINTS`, `FUNDING_POINTS`, `PURPOSE_POINTS`, `TIER_THRESHOLDS`
- `cadence.ts` → `CADENCES`, `CONTACT_WINDOW`, `MIN_HOURS_BETWEEN_MESSAGES`
- `dedupe.ts` → `DEDUPE_WINDOW_DAYS`

One deliberate behaviour worth knowing before you tune: **budget fit is the
heaviest single factor (25 pts)**, so an in-budget buyer who is six months out
scores *warm*, not cold. That is intentional — someone who can afford the
inventory but is slow is worth more than someone urgent who cannot. It is
asserted as a test so nobody "fixes" it by accident.

## Next commits

1. Ingest adapters — Meta Lead Ads webhook, website form, portal email parser.
   Each writes to `raw_events` **before** parsing, and is idempotent on the
   source's own event id.
2. Assignment + SLA escalation worker (5m re-notify → 15m reassign → 30m manager).
3. Trigger.dev tasks wrapping the cadence engine.
4. The dashboard shell, once a pilot client is named.
