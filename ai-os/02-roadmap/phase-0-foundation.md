# Phase 0 — Foundation (30 days)

**Goal:** the system has a memory, a router, a scoreboard, and four people who know their lane. Cash comes from running the Lead Engine by hand.

**Not the goal:** building agents. Two get built. Everything else in this phase is writing things down and handing things over.

---

## What lands

| # | Deliverable | Owner | Done when |
|---|---|---|---|
| 1 | **Brand Brain** written and loaded | Paras | Any agent can be pointed at it and produce on-voice output without extra prompting |
| 2 | **Chief of Staff** wired to Brand Brain + real pipeline state | Paras | Monday morning it produces a plan that matches reality |
| 3 | **Scorecard v1** — one weekly view | Operator | Monday's numbers arrive without anyone opening four dashboards |
| 4 | **Four lanes documented and handed over** | Paras | Each person can describe their input, output and SLA without looking it up |
| 5 | **Tracking installed** — UTMs, GHL sources, pixel | VA | The question "what produced the last five leads" has an answer |
| 6 | **Lead Engine running manually**, 30 min/day | Paras | 50 attempts logged, five numbers reviewed |

---

## Week by week

### Week 1 — Memory

Write Brand Brain. This is mostly extraction, not invention: identity, credentials and positioning are in `paras-lead-engine`; voice and 3E are in `paras-script-writer`; offers and the value-stack ratio are in `paras-webinar-builder`; ICP and proof are in `references/icp.md`.

The parts that genuinely do not exist yet and must be decided:
- **Current prices** for every rung. The `paras-webinar-builder` figures are flagged stale. Set them.
- **The never-say list.** Guarantees, claims without evidence, old prices, anything that would need a lawyer.
- **Open loops.** Every promise made on camera not yet delivered.

Ship `.claude/skills/exp-brand-brain/`. Test: run the Script agent against it and check the output sounds like him without being told to.

### Week 2 — Router and scoreboard

Wire Chief of Staff (`paras-daily-task`) to Brand Brain and to real pipeline state — what is filmed, edited, scheduled — rather than an assumed cycle position. Add routing by person, not just by task category.

Build Scorecard v1. Thin on purpose: YouTube (views, CTR, AVD, subs), Meta (spend, CPL, CPA), GHL (leads, source, calls booked), Skool (joins, active), revenue. One tab, one line per week, filled Monday morning. See [`../05-metrics/scorecard.md`](../05-metrics/scorecard.md).

VA installs tracking in parallel. Nothing else in the phase matters if this is wrong.

### Week 3 — Handover

The four lanes go live. Each person gets: their lane doc from [`../01-architecture/human-layer.md`](../01-architecture/human-layer.md), their input source, their output destination, their SLA, and the escalation rule.

Run one full week on the rhythm with Paras deliberately not filling gaps. Note every time he has to step in — each one is either a missing decision in Brand Brain or an unclear lane, and both are fixable in an hour.

Ship `.claude/skills/exp-editor-brief/`. Test it against a real script and a real edit, then ask the editor the only question that matters: *could you have worked from this without asking me anything?*

### Week 4 — Cash and correction

Lead Engine at 30 focused minutes a day on the existing Mon–Fri cadence: source and verify Monday, diagnose Tuesday, Paras reviews and sends Wednesday, LinkedIn and audits Thursday, follow-ups Friday.

Target for the month: 50 attempts, which is the smallest number that says anything. Then review the five numbers — reply rate by signal, reply rate by vertical, audit acceptance, audit-to-call, bounce rate — and nothing else.

Close the phase with a correction pass: what did Paras get pulled into that he shouldn't have, and what is now written down so it doesn't recur.

---

## Constraints

- **No new agents beyond the two.** Brand Brain and Editor Brief. The urge to build more is the thing this phase is designed to resist.
- **Publishing does not pause.** Tue/Fri at 9am through all four weeks. A week with build progress and no publish is a failed week.
- **Every outbound email is reviewed by Paras before sending.** No exceptions, per the existing Lead Engine standing constraint.
- **Cap outbound at ~30/day** on a warm domain, fewer on a new one.

---

## Exit criteria

Phase 1 starts when all five are true:

1. Brand Brain exists and agents produce on-voice output from it
2. Monday's scorecard arrives without manual assembly across four dashboards
3. Each of the four people ran their lane for a full week unaided
4. 50 outbound attempts logged with the five numbers reviewed
5. Editor Brief has produced a brief the editor worked from without questions

If #3 or #5 fails, extend the phase. Starting Phase 1 with unclear lanes means building nine agents on top of a team that doesn't know who approves what.
