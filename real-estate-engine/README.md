# real-estate-engine

The complete domain and pipeline layer for the real estate broker lead
automation system described in
[`../plans/real-estate-broker-automation.md`](../plans/real-estate-broker-automation.md).

**Zero runtime dependencies. 247 tests. Suite runs in ~2 seconds with no
infrastructure.**

```bash
npm install
npm run typecheck     # tsc --noEmit
npm test              # 247 unit + integration tests
npm run test:schema   # applies both migrations to a scratch Postgres, then
                      # asserts every constraint and view actually behaves
npm run test:all      # all three
```

> `test:schema` needs a reachable Postgres (honours `PGHOST`/`PGPORT`/`PGUSER`).
> It creates and drops `reng_schema_test`. It has been run: both migrations
> apply cleanly to Postgres 16 and all schema assertions pass.

**Docs:** [Architecture](docs/ARCHITECTURE.md) ·
[Integration setup](docs/INTEGRATIONS.md) · [Runbook](docs/RUNBOOK.md)

---

## What this is

Everything from "a lead arrives from anywhere" to "a customer refers their
cousin", as pure rules with an injected clock and a persistence port.

| | Module | Owns |
|---|---|---|
| **Domain** | `states.ts` | 21-state machine, declared transitions, stall detector |
| | `phone.ts` | E.164 identity — nine manglings of one number → one key |
| | `dedupe.ts` | same-lead vs new-cycle, DNC suppression |
| | `scoring.ts` | transparent rubric + fact-only disqualification |
| | `cadence.ts` | follow-up ladders, contact window, 24h cap |
| | `assignment.ts` | round-robin by territory, shift, capacity, backlog |
| | `sla.ts` | 5/15/30-minute escalation, worst-first scorecard |
| | `conversation.ts` | 7-field WhatsApp button flow, opt-out, handoff |
| | `booking.ts` | slots, reminder ladder, reschedule, no-show recovery |
| | `retention.ts` | post-visit sequences, trigger-based revival, referrals |
| | `metrics.ts` | funnel, owner's five numbers, per-source economics |
| **Ingest** | `fieldmap.ts` | form-field interpretation + Indian budget parsing |
| | `meta.ts` `google.ts` `linkedin.ts` | ad platforms |
| | `portals.ts` | 99acres / MagicBricks / Housing email parsing |
| | `direct.ts` | website form, missed call / IVR, walk-in, referral |
| **Ports** | `repository.ts` `memory.ts` | persistence boundary + test double |
| **Pipeline** | `ingest.ts` | the orchestrator — ordering is load-bearing |
| | `workers.ts` | three sweeps: cadence, SLA, stall |
| | `handlers.ts` | framework-agnostic HTTP handlers |

## Why the domain core came before a dashboard

The plan recommends `new-client-system` (Next.js + Trigger.dev) as the shell.
It still is — but it was the wrong *first* commit:

1. It needs a named client (name, domain, auth restriction). No pilot broker
   is chosen yet.
2. It is MongoDB-backed. This design leans on relational integrity — dedupe
   uniqueness, transactional state transitions, a view that finds stalled
   leads. Mongo can *express* that; it cannot *enforce* it, and an
   unenforceable invariant is a lead that dies six months from now.
3. **UI is cheap to rewrite. The state machine is not.**

If the stack changes, every file in `src/` survives; only `db/migrations/` is
thrown away.

## The invariants, and the tests that enforce them

1. **A non-terminal lead always has a scheduled next action.** Only
   `customer`, `disqualified` and `dnc` are terminal — `nurture_long`,
   `revival`, `no_response` and `not_interested` are explicitly *not*, because
   a lead that did not buy is slow, not dead.
2. **Every non-terminal state can reach `dnc`.** Opt-out works from anywhere,
   with no confirmation step. Asserted across all 21 states.
3. **Scoring orders the queue; it never empties it.** Only `disqualify()`
   removes a lead, on facts alone — never on a soft signal like a long
   timeline.
4. **Nothing is dropped.** `raw_events` before parsing; unrecognised questions
   to `unmapped_fields`; unparseable portal mail quarantined; a lead with an
   unusable phone still stored.
5. **Ingest is idempotent** on `(source, source_event_id)`, enforced by a
   partial unique index — at the storage boundary, the only place it can be
   atomic.
6. **No message outside 09:00–20:00 IST**, one per 24h max, instant pause on
   any human reply.

## Bugs this suite caught

Every one of these was **silent** — no error, no exception, just a lead worth
less than it should have been. Each is locked with a regression test naming the
exact input.

| Bug | Cost |
|---|---|
| `"When are you planning to buy?"` matched no timeline synonym | lead lost its heaviest scoring factor |
| `"6+ months"` — regex ended in `\b` right after a `+`, where a boundary can never match | long-horizon buyers scored as `unclear` |
| `"6 months+"` intercepted by the broader `3_6` branch above it | wrong bucket |
| `/\bbaat kar\b/` never matched `"baat karni hai"` | Hinglish request for a human ignored |
| `"owncstay"` — a typo, so a dead alternative that could never fire | end-use buyers unclassified |
| `"invest"` and `"live"` carried trailing `\b` | `"investing"`, `"living"` unmatched |
| Portal parser collapsed whitespace *before* matching whitespace columns | every MagicBricks table lead unparseable |
| Split-line label detector used a shape heuristic — a person's name looks exactly like a label | every Housing lead lost its value fields |
| Slot picker offered a visit 20 minutes out | no-shows the system itself caused |
| Cadence sweep fired the whole backlog after an outage | burst → WhatsApp number blocked |
| Migration 0002 re-added five columns 0001 already had | migration would fail on apply |
| `IST_OFFSET_MS` defined three times | drift waiting to happen |

**Four of the first six are the same defect class** — a trailing `\b` after a
stem. After the third, every regex in the codebase was audited in one pass
rather than waiting for a fourth. Whole words now keep `\b` on both sides;
stems take a leading `\b` only.

The lesson generalises: **every new campaign is a fresh chance for a question
wording to silently miss**, which is why reviewing `unmapped_fields` is a
standing monthly job in the [runbook](docs/RUNBOOK.md), not a debug field.

## Design decisions worth knowing before you change something

- **Budget fit is the heaviest factor (25 pts)**, so an in-budget buyer six
  months out scores *warm*, not cold. Someone who can afford your inventory but
  is slow is worth more than someone urgent who cannot. Asserted in a test so
  nobody "fixes" it by accident.
- **Missing data scores above an explicit "no."** Absence of information is not
  a negative signal, and treating it as one buries every brand-new lead.
- **Visit reminders use 07:00–21:00**, wider than the 09:00–20:00 marketing
  window, and clamp *backward* — a 03:00 reminder moves to 20:00 the previous
  evening, because forward could land after the visit.
- **The referral ask lands at possession + 30 days**, not at booking. At
  booking the buyer is anxious about money; thirty days after moving in they
  are showing the place to relatives.
- **Revival is trigger-based, not calendar-based.** A reason to call converts;
  "just following up" trains people to ignore you and burns the number's
  quality rating.
- **Source performance ranks by cost per *booking*, not per lead.** A channel
  with cheap leads that never visit is the most expensive one you have.
- **The SLA scorecard ranks worst-first.** Best-first reads as a celebration
  and the bottom never gets read.
- **Portal email is the default path, not a fallback.** Portal APIs are gated
  behind subscription tiers you cannot confirm until after the contract is
  signed. Email works on day one for any client.

## What is left

1. **Messaging adapters** — WhatsApp template send/receive against a BSP or the
   Cloud API. The engine decides *what* to send; these do *how*.
2. **Trigger.dev task wrappers** around the three sweeps (thin — the logic is
   done and tested).
3. **A Postgres `Repository`** implementing `src/ports/repository.ts`. The
   in-memory one enforces the same constraints, so this is mechanical.
4. **The dashboard shell**, once a pilot broker is named.
5. **Voice agent (Phase 3)** — rescue layer for non-responders, after-hours and
   bulk revival. Test on the client's own recorded calls before quoting.

Still genuinely blocked on a client: **nothing.** The portal *API* path depends
on their subscription, but the email path — which is the default anyway — does
not.
