# Agent Spec — Brand Brain

**ID:** K1 · **Layer:** Kernel · **Status:** build (Phase 0, week 1)
**Skill:** `.claude/skills/exp-brand-brain/`
**Human QA:** Paras — this is the one agent he owns outright

---

## Job

Hold the single authoritative version of who Exponential World is, what it sells, at what price, with what proof — and serve it to every other agent before they produce anything.

## Trigger

Read by every agent, every run. Edited weekly (offers, open loops) and monthly (proof, ICP).

## Inputs

| Input | From | Required |
|---|---|---|
| Existing skill corpus | `paras-*`, `Claude Skills/` | initial load |
| Price decisions | Paras | always |
| Delivered results | Case Study Capture (M8) | monthly |
| Promises made on camera | Brand Guard (K4) transcript scan | weekly |

## Output

| Output | Format | Lands in |
|---|---|---|
| Canonical brand context | Markdown, sectioned | Repo, mirrored to Notion |

## What it holds

| Section | Contents | Changes |
|---|---|---|
| Identity | Who Paras is, credentials, positioning line | rarely |
| Voice | Hinglish register, rhythm, analogies, what he'd never say | slowly |
| Proof | Client work, results, which proof transfers to which vertical | monthly |
| Offers | Every rung, current price, inclusions, promises | weekly |
| ICP | Who we serve, who we decline, the four qualifiers | monthly |
| Frameworks | 4C, 3E, the ladder — canonical definitions | rarely |
| Never-say | Guarantees, stale prices, unevidenced claims | as discovered |
| Open loops | Promises made on camera, not yet delivered | weekly |

## Hard limits

- **Never invent a price.** An unset price is `[confirm]`, never a plausible number.
- **Never carry a stale figure forward.** The ₹5,000 / ₹60,000 webinar numbers are reference *ratio* only (~12:1) and are flagged stale at source.
- **Never state a client result that isn't evidenced.** Named clients, real numbers, or nothing.
- **Never soften the never-say list** to make a piece of copy work. The copy changes.
- **Never hold two versions of a fact.** If a price differs between sections, that is a bug to fix, not a nuance.

## Success criteria

- Any agent pointed at it produces on-voice output without extra prompting
- A price appears in exactly one place, and changing it there changes it everywhere
- A new team member can answer "what do we sell and for how much" from this file alone
- Level-3 escalations to Paras drop over time — each one resolved becomes an entry here

## Failure modes

| Symptom | Likely cause | Fix |
|---|---|---|
| Agent output sounds generic | Voice section too abstract | Add real examples, not adjectives |
| Wrong price reaches a prospect | Offers section stale | Weekly refresh is non-negotiable |
| Same question escalates repeatedly | Missing decision | Write the decision down once |
| Sections contradict each other | Edited in two places | One section owns each fact |

## Notes

**Why a file and not instructions inside each agent:** Phase 4 needs a per-client version of exactly this (P2, Tenant Brain). Designing it as a document agents *read* means multi-tenancy is pointing at a different document — a path change, not a rewrite. That decision is made here, in week 1, specifically to make Phase 4 cheap.

**The open-loops section** is small and disproportionately valuable. Every "I'll cover this in the next video" is a debt. `paras-compliance-audit` already scans transcripts for these.

---

## Change log

| Date | Change | Why |
|---|---|---|
| — | Created | Phase 0 week 1 |
