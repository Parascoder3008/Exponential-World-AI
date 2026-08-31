# The Human Layer

Four hires and Paras. The design principle: **humans are agents with a queue.** One lane, one input source, one output destination, one SLA, one thing they're accountable for.

That framing is not about treating people mechanically — it is about removing the ambiguity that makes small teams slow. Nobody should have to ask "is this mine?"

---

## The lanes

| Person | Lane | Fed by | Feeds | SLA |
|---|---|---|---|---|
| **Video editor** | Edit + render | Editor Brief (C6), Shorts (C7) | Publish (C9) | Long-form 48h from brief; shorts 24h |
| **Meta ads manager** | Paid distribution | Ad Creative (C12) | Scorekeeper (K3) | Daily check; weekly report |
| **VA (web)** | Pages, forms, tracking | Funnel (M2) | Commerce OS | Landing page 72h from brief |
| **Social media manager** → **OS Operator** | Runs the daily queue, QAs every agent output, escalates | Chief of Staff (K2) | Paras | Daily queue cleared by 6pm |
| **Paras** | Camera, offers, sales calls, judgment | Scorekeeper (K3) | Everything | Level-3 decisions same day |

---

## The rename that matters

The fourth hire was described as "a social media manager who can look through whether everything is going correct." That is the right instinct and the wrong title.

They are the **OS Operator** — the person who runs the orchestrator. Posting is a small part of it. The actual job:

- Run the Chief of Staff queue every morning and clear it by end of day
- **QA every agent output before it moves on** — this is the single most important line in this document
- Route the outputs: brief to the editor, creative to the ads manager, page spec to the VA
- Escalate level-3 items to Paras with enough context to decide in one pass
- Log what broke so the Agent Factory can fix it

This role is what lets the system run on days Paras is not in it. Title it accordingly, pay it accordingly, and hire for judgment rather than for platform knowledge — the platforms are the easy part.

**The failure mode if this is treated as a posting job:** agent output goes live unreviewed, quality drifts for six weeks, and nobody can point to when it started.

---

## Video editor

**Lane:** everything between a script and a finished file.

**Input:** the Editor Brief (C6) — shot-by-shot, with b-roll callouts, cut points, text overlays, music direction, and the hook treatment specified rather than left to taste.

Editor Brief is in the first nine agents for one reason: **the editor is the hard ceiling on video volume.** Two long-form plus shorts per week is at capacity. A brief that removes guesswork and back-and-forth is the only lever that raises that ceiling without a second hire.

**Output:** finished long-form to the Publish agent; shorts to the same.

**What they should never be doing:** deciding the hook, choosing the title, or interpreting what the script meant. Every one of those is a brief that wasn't specific enough.

---

## Meta ads manager

**Lane:** paid distribution, both audiences — the creator funnel (workshop, bootcamp) and the client funnel (audit, install).

**Input:** Ad Creative (C12) — hooks and script variants generated from the same Angle Bank that feeds organic, so paid and organic learn from each other instead of running as separate experiments.

**Tooling:** the Meta Ads MCP gives direct access to campaign structure, insights, creative upload, and audiences. The intent is that the ads manager works *with* the agent — the agent produces variants and reads performance, the human makes the judgment calls on budget and scaling.

**Output:** spend, results, and creative-level performance into the Scorekeeper.

**Hard limits:** budget ceilings and kill rules written down in advance, not decided in the moment. A kill rule that exists only in someone's head is not a kill rule.

---

## VA (web)

**Lane:** the Code pillar's visible half — landing pages, opt-in forms, checkout, tracking, and the small automations that hold a funnel together.

**Input:** Funnel agent (M2) specs, built on the existing `build-premium-website` skill.

**Output:** live pages with tracking that actually fires. That last clause is the job. A beautiful page with no UTM and no pixel is worse than an ugly one with both, because it produces confident conclusions from missing data.

**Standing checklist for every page shipped:** UTMs on every inbound link · pixel or GA firing and verified · form posting to GHL with source recorded · mobile checked on a real phone · thank-you page or event marking conversion.

---

## Paras

**Lane:** what only he can do.

- **On camera.** Nothing replaces this in year one; avatar agents reduce volume pressure, they don't replace the face.
- **Offers and pricing.** Level-3 by definition.
- **Sales calls.** Especially first calls and anything enterprise.
- **Final judgment.** Claims, promises, positioning, client relationships.

Everything else is delegated to an agent with a human QA. When something lands on him that isn't on this list, the correct response is not to do it faster — it is to write the missing decision into Brand Brain so it never arrives again.

---

## The weekly rhythm as a team

Mapped to the existing publishing cadence so nothing new has to be invented.

| Day | Paras | Operator | Editor | Ads | VA |
|---|---|---|---|---|---|
| **Mon** | Review scorecard, week plan, outbound review | Run CTR audit, clear queue, LinkedIn post | Finish Tue video | Weekly report, budget check | Page work |
| **Tue** | Publish, first-2h comments, sales calls | 48h protocol, repurpose | Start Fri video | Creative refresh | Tracking QA |
| **Wed** | **Live workshop**, outbound sends | Shorts publish, IG carousel | Shorts cuts | Optimise | Page work |
| **Thu** | **Film next batch**, sales calls | WhatsApp broadcast, briefs out | Fri video | Test new angles | Forms / checkout |
| **Fri** | Publish, first-2h comments | 48h protocol, Community Tab | Next-week shorts | Weekend scaling | — |
| **Sat** | Deep work, research, playbooks | Twitter thread | — | — | — |
| **Sun** | Plan next week | Shorts publish, IG carousel | — | — | — |

Thursday is the load-bearing day. Filming feeds everything downstream, and a missed Thursday shows up as a missed publish nine days later — long enough that the cause is easy to misdiagnose.

---

## Hiring order, when revenue allows

1. **Second editor, or a dedicated shorts editor.** Delivery capacity converts pipeline to cash; video volume is the top of the whole funnel.
2. **A second operator**, or promote the first and hire under them.
3. **A delivery lead** for installed-OS clients, once there are more than three.
4. **Sales**, last. Paras closing is a feature until roughly Phase 3 — the buyer is buying him.

The instinct at this stage is usually to hire a salesperson to bring in more work. At four people the binding constraint is almost always the ability to *deliver* the work already available.
