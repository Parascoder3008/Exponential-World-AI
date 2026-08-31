# Agent Spec — Scorekeeper

**ID:** K3 · **Layer:** Kernel · **Status:** build, thin (Phase 0, week 2 → hardened Phase 1)
**Skill:** to build; Supermetrics MCP for pulls
**Human QA:** OS Operator assembles; Paras reads

---

## Job

Produce one weekly number set across every channel, and name **the single thing to fix this week**.

## Why it is not optional

The loop only compounds if last week's result changes this week's plan. Without this, the system runs open-loop — consistent output at a consistent quality forever, which feels like working and isn't.

It also answers the question most businesses this size cannot: *what produced the last five leads?*

## Trigger

Monday, 7am IST, before Chief of Staff plans the week.

## Inputs

| Input | From | Required |
|---|---|---|
| YouTube analytics | YouTube / Supermetrics | always |
| Meta Ads | Meta Ads MCP | always |
| GHL — leads, sources, calls | GHL | always |
| Skool — joins, active, paid | Skool | always |
| Revenue | Paras | always |
| Lead Engine five numbers | M3 | weekly |

## Output

One row appended to the scorecard, plus a short read: **what moved, what didn't, and the one thing to fix.**

Detail in [`../05-metrics/scorecard.md`](../05-metrics/scorecard.md).

## Hard limits

- **Never report a number it can't source.** A blank cell beats a plausible estimate.
- **Never more than one "fix this" per week.** Three priorities is zero priorities.
- **Never a vanity metric without a business metric beside it.** Views next to leads, always.
- **Never smooth a bad week.** The bad weeks are the informative ones.
- **Never replace the read with a dashboard link.** The judgment is the deliverable.

## Success criteria

- Monday's numbers arrive without opening four dashboards
- Every lead traceable to a source
- The named fix appears in that week's Chief of Staff plan
- After 13 weeks, CAC and payback are known per channel

## Failure modes

| Symptom | Likely cause | Fix |
|---|---|---|
| Leads show as "direct" | UTMs missing | VA's tracking checklist |
| Numbers don't reconcile | Different date windows | Fix the window, once, in the spec |
| Report read and ignored | No named fix | Force the one-thing field |
| Assembly takes an hour | Manual pulls | Move to Supermetrics / scheduled |

## Phase progression

| Phase | Version |
|---|---|
| 0 | Manual sheet, one tab, filled Monday morning |
| 1 | Semi-automated pulls; the named-fix field enforced |
| 2 | Scheduled via n8n; CAC and payback per channel |
| 3 | Feeds Unit Economics ($1) — full P&L per channel |

Start manual on purpose. A week of assembling it by hand teaches which numbers actually get used, and automating the wrong five numbers is worse than assembling the right five by hand.

---

## Change log

| Date | Change | Why |
|---|---|---|
| — | Created | Phase 0 week 2 |
