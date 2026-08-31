# Foundation Checklist

> **This was v1's Phase 0 — a standalone 30-day foundation month. It is no longer a phase.**
>
> At 3–6 months of runway, a month spent on infrastructure before selling anything is a fifth of the runway. The foundation work now runs as **Track C inside [Sprint 0](sprint-0-cash.md)** — in the margins, roughly six hours a week, alongside the cash tracks.
>
> This file holds the detail of *what* foundation means. Sprint 0 holds the *when*.

---

## The six items

| # | Item | Owner | Time | Done when |
|---|---|---|---|---|
| 1 | **Brand Brain**, with real prices | Paras | 3 hrs | Any agent produces on-voice output from it, unprompted |
| 2 | **Tracking** — UTMs, GHL sources, pixel | VA | 3 hrs | "What produced the last five leads" has an answer |
| 3 | **Scorecard v1** | Operator | 2 hrs | Monday's numbers arrive without opening four dashboards |
| 4 | **Four lanes** documented and handed over | Paras | 2 hrs | Each person states their input/output/SLA back, unaided |
| 5 | **Chief of Staff** wired to real pipeline state | Paras | 2 hrs | Monday's plan matches reality |
| 6 | **Editor Brief** shipped | Paras + Editor | 3 hrs | Editor works a video without asking a question |

---

## 1 · Brand Brain

Mostly extraction, not invention. Identity, credentials and positioning are in `paras-lead-engine`; voice and the 3E method in `paras-script-writer`; the offer architecture in `paras-webinar-builder`; ICP and proof in `references/icp.md`.

**What must actually be decided:**

- **Every price.** v2 replaced the `[confirm]` markers with benchmark-backed bands in [`../00-strategy/offer-ladder.md`](../00-strategy/offer-ladder.md). Pick the number inside the band. This is week 1 of Sprint 0 and everything else waits on it.
- **The never-say list.** Guarantees, unevidenced claims, stale prices.
- **Open loops.** Every promise made on camera not yet delivered.

Ships as `Claude Skills/exp-brand-brain/`. Test: run the Script agent against it and check the output sounds like him without being told to.

## 2 · Tracking

The one item where being wrong invalidates everything else. Sprint 0 teaches nothing without it.

Checklist for every page and link: UTMs on every inbound link · pixel or GA firing and *verified* · form posting to GHL with source recorded · mobile checked on a real phone · thank-you page or event marking conversion.

## 3 · Scorecard v1

Thin on purpose, and **revenue on top** during Sprint 0. One tab, one row per week, filled Monday morning. Detail in [`../05-metrics/scorecard.md`](../05-metrics/scorecard.md).

Start manual. A week of assembling it by hand teaches which numbers actually get used, and automating the wrong five is worse than assembling the right five.

## 4 · Four lanes

From [`../01-architecture/human-layer.md`](../01-architecture/human-layer.md). Each person gets their lane doc, input source, output destination, SLA, and the escalation rule.

Then run a week with Paras deliberately not filling gaps, and **log every time he has to step in.** Each one is either a missing decision in Brand Brain or an unclear lane — both fixable in an hour.

## 5 · Chief of Staff

Wire `paras-daily-task` to Brand Brain and to real pipeline state — what's filmed, edited, scheduled — rather than an assumed cycle position. Add routing to people by name, not just task categories.

## 6 · Editor Brief

Ships as `Claude Skills/exp-editor-brief/`. Test against a real script and a real edit, then ask the editor the only question that counts: *could you have worked from this without asking me anything?*

In the first nine because the editor is the hard ceiling on video volume, and this is the only lever that raises it without a second hire.

---

## What is deliberately *not* here

No new agents beyond Brand Brain and Editor Brief. No orchestration infrastructure. No landing page rebuild. No product work.

The foundation exists to make Phase 1 possible, not to be impressive. Six hours a week, four weeks, done.
