# The Orchestrator

How thirty-odd agents and four humans behave as one system instead of a folder of prompts.

---

## The shape

```
                            ┌─────────────────┐
                            │   BRAND BRAIN   │  voice · offers · pricing
                            │   (K1, memory)  │  proof · ICP · never-say
                            └────────┬────────┘
                                     │ every agent reads this first
                                     ▼
   ┌──────────────┐         ┌─────────────────┐         ┌──────────────┐
   │  SCOREKEEPER │────────▶│ CHIEF OF STAFF  │────────▶│  OS OPERATOR │
   │  (K3) what   │ last    │ (K2) today's    │ queue   │  (human) runs
   │  happened    │ week    │ plan + routing  │         │  the queue   │
   └──────────────┘         └────────┬────────┘         └──────┬───────┘
          ▲                          │                         │
          │                          ▼                         ▼
          │              ┌───────────────────────┐    ┌────────────────┐
          │              │  CONTENT · COMMERCE   │    │ editor · ads   │
          │              │  · MONEY agents       │    │ manager · VA   │
          │              └───────────┬───────────┘    └────────┬───────┘
          │                          │                         │
          │                          ▼                         │
          │              ┌───────────────────────┐             │
          │              │  BRAND GUARD (K4)     │◀────────────┘
          │              │  gate before anything │
          │              │  publishes or sends   │
          │              └───────────┬───────────┘
          │                          ▼
          └──────────────────  published / sent  ──────────────┘
                                  (measured)
```

Four things make this a system:

1. **One memory.** Brand Brain, read by everyone.
2. **One router.** Chief of Staff decides what happens today and who does it.
3. **One gate.** Brand Guard, before anything leaves the building.
4. **One scoreboard.** Scorekeeper, closing the loop back into next week's plan.

Remove any one and it degrades into a prompt library.

---

## K1 · Brand Brain — the memory layer

The single source of truth. Every agent reads it before producing anything.

**What it holds:**

| Section | Contents | Changes |
|---|---|---|
| Identity | Who Paras is, credentials, the positioning line | Rarely |
| Voice | Hinglish register, sentence rhythm, analogies, what he'd never say | Slowly |
| Proof | Client work, results, which proof transfers to which vertical | Monthly |
| Offers | Every rung, current price, what's included, what's promised | Weekly |
| ICP | Who we serve, who we decline, the four qualifiers | Monthly |
| Frameworks | 4C, 3E, the ladder — canonical definitions | Rarely |
| Never-say | Guarantees, stale prices, claims we can't evidence | As discovered |
| Open loops | Promises made on camera not yet delivered | Weekly |

**Why it is agent #1:** thirty agents each holding a slightly different idea of the price is how a wrong number reaches a prospect. One file is how there is one place to fix it.

**Why it is a file and not instructions inside each agent:** because Phase 4 needs a *per-client* version of exactly this (P2, Tenant Brain). Designing it as a readable document now means multi-tenancy later is a path change, not a rewrite.

The "open loops" section is small and disproportionately valuable — every "I'll cover this in the next video" said on camera is a debt. `paras-compliance-audit` already scans transcripts for these; Brand Brain is where they live until paid.

---

## K2 · Chief of Staff — the router

Answers one question every morning: **what happens today, and who does it?**

Inputs: today's date and position in the 90-day cycle · the day-of-week rhythm · pipeline state (what's filmed, edited, scheduled) · last week's scorecard · anything stuck.

Output: 6–10 time-boxed tasks across video, monetisation, community and algorithm, with a maximum of two "must-do" items — because a list where everything is critical is a list where nothing is.

This already exists as `paras-daily-task`, including the non-negotiable weekly rhythm:

| Day | Primary |
|---|---|
| Mon | CTR audit + weekly planning |
| Tue | **9 AM publish** + 48-hour protocol |
| Wed | Shorts + live workshop |
| Thu | Film / script next batch |
| Fri | **9 AM publish** + 48-hour protocol |
| Sat | Deep work — playbook iteration, research |
| Sun | Shorts + next week planning |

**The wiring job in Phase 0** is connecting it to Brand Brain and to the Scorekeeper so the plan reflects actual state rather than the assumed cycle position, and so it routes to *people* by name, not just to task categories.

---

## K4 · Brand Guard — the gate

Nothing publishes or sends without passing it. Not a review step someone might skip — a gate in the path.

Checks: voice consistency · claims that can't be evidenced · pricing against Brand Brain current values · promises made on camera · platform compliance · disclaimers where required (Indian market campaigns, broker partners) · the never-say list.

Already exists as `paras-compliance-audit`. Its job in the orchestrator is to be *unavoidable*, which is a process decision more than a technical one: the Publish agent takes Brand Guard output as a required input, not as an optional preflight.

---

## K3 · Scorekeeper — the loop closer

One weekly number set, one named thing to fix. Runs Monday, feeds Chief of Staff.

The loop only compounds if last week's result changes this week's plan. Without Scorekeeper the system runs open-loop and produces consistent output at a consistent quality forever, which feels like working and isn't.

Details in [`../05-metrics/scorecard.md`](../05-metrics/scorecard.md).

---

## How work moves

Every unit of work carries the same six fields, whether an agent or a human does it:

| Field | Meaning |
|---|---|
| **Job** | The one thing this produces |
| **Trigger** | Schedule, event, or upstream completion |
| **Inputs** | What it needs, and from which agent |
| **Output** | Artifact, and where it lands |
| **QA** | Which human approves before it moves on |
| **Hard limits** | What it must never do |

Humans and agents use the same card because the OS Operator should not need to know or care which one produced a given item. Their job is: *is this good, and does it move on?*

---

## Escalation

Three levels, and the point is that most things resolve without reaching Paras.

| Level | Who | Examples |
|---|---|---|
| **1 — Agent retries** | The agent | Missing input, format error, a fetch that failed |
| **2 — Operator decides** | OS Operator | Which of three thumbnails, whether a comment needs a reply, a scheduling clash |
| **3 — Paras decides** | Paras | Anything touching price, a promise, a claim, a client relationship, or the positioning |

Level 3 is deliberately narrow. If more than two or three things a day reach it, the Brand Brain is underspecified — the fix is to write the missing decision down once, not to route more decisions upward forever.

**Standing rule:** *Paras only does what only Paras can do.* Camera, offers, sales calls, final judgment. Everything else is agent-first, human-QA'd.

---

## What the orchestrator is not, yet

In Phase 0 and 1 this is **a set of skills a human invokes in order, with Chief of Staff telling them the order.** No scheduler, no queue service, no dashboard.

That is deliberate. The orchestration logic needs to be right before it is automated, and the fastest way to learn it is to run it manually for 90 days. Phase 2 moves the scheduled and always-on parts to n8n or Trigger.dev; Phase 4 gives it a UI. See [`stack.md`](stack.md) for what moves when.

Automating a workflow you have not yet run by hand produces an automated version of a workflow that was wrong.
