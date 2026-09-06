# real-estate-engine

Domain core for the real estate broker lead automation system described in
[`../plans/real-estate-broker-automation.md`](../plans/real-estate-broker-automation.md).

**Zero runtime dependencies. No database, no HTTP, no API keys.** The entire
suite runs in under a second.

```bash
npm install
npm test          # 83 tests
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

## Ad-platform ingest (`src/ingest/`)

Three adapters, one output type. Everything downstream of `NormalisedLead` is a
single code path — adding a fourth platform must never touch it.

| Platform | Delivery | Auth | Notes |
|---|---|---|---|
| **Meta Lead Ads** | Push, **two hops** — the webhook carries only a `leadgen_id`, you fetch the answers separately | HMAC-SHA256 over the **raw** body (`X-Hub-Signature-256`) | Persist the notification and hand off. Fetching inline risks timing out Meta's delivery, which triggers retries and eventually unsubscribes your app. |
| **Google Ads lead forms** | Push, **one hop** — answers arrive in the same request | Shared `google_key` in the body, compared in constant time | Simplest and least breakable of the three. No HMAC, so the key is the only thing guarding the endpoint. Standard fields carry a typed `column_id`, which beats question text that may be in Hindi. |
| **LinkedIn Lead Gen Forms** | **Pull** — poll the Marketing API | OAuth token, subject to approved API access | Different failure mode entirely, see below. |

### On LinkedIn, before you sell it

LinkedIn is a poor fit for mainstream residential real estate: a B2B audience
at B2B cost-per-lead. It earns its place for luxury (₹5Cr+), commercial/office,
or NRI investor campaigns. For a typical broker the same budget on Meta buys
more site visits.

Operationally, the pull model matters more than the CPL:

- **A webhook that breaks throws errors you can alert on.**
- **A poller that breaks goes quiet — and quiet looks exactly like "no leads today".**

So `pollHealth()` alerts on *the absence of a successful poll*, not on failures
and not on lead volume. An expired OAuth token also just looks like a quiet
week; without this check nobody notices for a month.

`flattenLinkedInAnswers` is deliberately tolerant of several answer nestings
and is the **one function to fix** once a real payload is in hand. Everything
downstream of it is shape-independent and fully tested.

### `fieldmap.ts` is where the real work is

Form field names are chosen by whoever built the campaign — `budget_range`,
`what_is_your_budget?`, `Aapka budget kya hai`. Matching is on a normalised,
punctuation-stripped name against synonym lists, exact-first then containment.

It also parses Indian budget strings into rupees: `50L`, `₹50 Lakh`,
`50-75 lakhs` (trailing unit applies to both ends), `1.2 Cr`, `Under 50 lakh`,
`2 Cr+`, `50,00,000`. Bare numbers are the ambiguous case — under 1000 with no
unit reads as lakh, because a dropdown option reading "50" in a property form
means fifty lakh. The raw string is always preserved on the lead.

**Nothing is ever dropped.** A question that does not match goes to
`unmappedFields`; so does a question that *does* match but whose answer cannot
be interpreted ("budget: will discuss on call") — the agent should still see
what the buyer wrote. Review that map monthly; it is how you find the synonyms
worth adding.

### Two bugs this suite caught, both the same shape

Both were silent — no error, no exception, just a lead arriving worth less than
it was:

1. `"When are you planning to buy?"` matched no timeline synonym and fell
   through to `unmappedFields`, costing the lead its **heaviest scoring
   factor**.
2. `"6+ months"` returned `null` from a regex ending in `\b` right after a
   `+` — a word boundary can never match there. Then `"6 months+"` was
   intercepted by the broader `3_6` branch sitting above it.

The fix for #2 was to restructure the cascade most-specific-first rather than
patch patterns one at a time. Both are locked with regression tests naming the
exact wording. Expect more of these: **every new campaign is a new chance for a
question wording to silently miss**, which is the argument for reviewing
`unmappedFields` as a standing monthly job.

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

1. HTTP handlers wiring these adapters to `raw_events` — persist raw **before**
   parsing, idempotent on `(source, sourceEventId)`, and the LinkedIn poller
   with its heartbeat.
2. Portal adapters (99acres / MagicBricks / Housing) — **blocked on a named
   pilot client**, since the path depends on whether their subscription exposes
   a lead API or only notification emails.
3. Assignment + SLA escalation worker (5m re-notify → 15m reassign → 30m manager).
4. Trigger.dev tasks wrapping the cadence engine.
5. The dashboard shell, once a pilot client is named.
