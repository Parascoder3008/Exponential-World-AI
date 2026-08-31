# Agent Spec — [Name]

> Copy this file for every new agent. The spec is the *intent*; the skill under `.claude/skills/` is the *executable*. When they disagree, the skill is the bug.

**ID:** [K1 / C6 / M3 / $1]
**Layer:** [Kernel / Content OS / Commerce OS / Money OS / Product]
**Status:** [exists / wire / build / later]
**Skill:** `[path, or "not built"]`
**Human QA:** [who approves before output moves on]

---

## Job

One sentence. What this produces. If it takes two sentences, it is two agents.

## Trigger

Schedule, event, or upstream completion. Be specific — "Monday 7am" not "weekly".

## Inputs

| Input | From | Required |
|---|---|---|
| Brand Brain | K1 | always |
| … | … | |

Every agent reads Brand Brain. If one doesn't, say why.

## Output

| Output | Format | Lands in |
|---|---|---|
| … | … | … |

## Hard limits

What it must never do. **Write these before writing the capability.**

An agent that has never been told what it must not do will eventually do it — quote a price that changed, promise a result, publish without review. Every limit here should trace to something that would be expensive to get wrong.

- Never …
- Never …

## Success criteria

How you know it works. Prefer something observable over something felt.

- …

## Failure modes

What goes wrong, and what it looks like from outside. Filled in from real use, not guessed at up front.

| Symptom | Likely cause | Fix |
|---|---|---|

## Notes

Anything a future reader needs — decisions taken, alternatives rejected, dependencies.

---

## Change log

| Date | Change | Why |
|---|---|---|
