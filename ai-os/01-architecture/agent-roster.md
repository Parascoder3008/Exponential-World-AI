# The Agent Roster

Every agent in the system, mapped across four layers. **This is a map, not a build list.**

Status column:
- **exists** — a working `paras-*` or `Claude Skills/` skill already does this
- **wire** — exists, but needs connecting to Brand Brain and the orchestrator
- **build** — genuinely new work
- **later** — mapped, deliberately not scheduled yet

---

## The honest cut

34 agents at four people is how nothing ships. **Nine get built in the first 90 days**, and six of those already exist.

| # | Agent | Status | Why it's in the first nine |
|---|---|---|---|
| 1 | Brand Brain | **build** | Everything else reads from it. Nothing works without it. |
| 2 | Chief of Staff | wire | The daily loop. Already exists as `paras-daily-task`. |
| 3 | Research | wire | Loop entry point. `paras-research`. |
| 4 | Script | wire | `paras-script-writer`. |
| 5 | Packaging | wire | `paras-titles-thumbnails`. CTR is the highest-leverage variable. |
| 6 | Editor Brief | **build** | The editor is the hard ceiling on volume. This is the only lever. |
| 7 | Repurpose | wire | One asset → six platforms. `paras-repurpose`. |
| 8 | Publish | wire | `paras-publishing-package`. Closes the loop. |
| 9 | Scorekeeper | **build** (thin) | Without it there is no feedback and no learning. |

Those nine are one closed loop: **idea → published → measured**. Nothing else starts until that loop runs a full week hands-off.

---

## Layer 0 — Kernel

The OS itself. These are not content or commerce agents; they are what makes the other agents a system rather than a folder of prompts.

| # | Agent | Job | Status | Trigger |
|---|---|---|---|---|
| K1 | **Brand Brain** | Single source of truth: voice, offers, pricing, proof, ICP, do-not-say list. Every agent reads it before producing anything. | **build** | Read by all; edited weekly |
| K2 | **Chief of Staff** | Today's plan. Routes work to agents and humans, knows the 90-day cycle position, escalates what's stuck. | wire — `paras-daily-task` | Daily, 7am |
| K3 | **Scorekeeper** | One weekly number set across YouTube, Meta, GHL, Skool. Names the single thing to fix. | **build** (thin) | Weekly, Monday |
| K4 | **Brand Guard** | Final gate before anything publishes or sends. Voice, claims, compliance, promises made on camera. | wire — `paras-compliance-audit` | Before every publish/send |
| K5 | **Agent Factory** | Turns repeated manual work into a new agent. Watches for "we've done this three times by hand". | wire — `create-skill`, `self-healing` | On pattern detection |
| K6 | **Memory Keeper** | Logs what worked — winning hooks, replying subject lines, converting offers — and feeds it back into the relevant agent. | later | Weekly |

**The Brand Brain is the highest-leverage thing in this document.** Thirty agents each holding their own slightly-different idea of the voice, the price, and the proof is how output drifts silently. One file they all read is how it doesn't.

---

## Layer 1 — Content OS

| # | Agent | Job | Status | Human QA |
|---|---|---|---|---|
| C1 | **Research** | Saturation analysis, content gap, three ranked angles, competition-vs-opportunity score. | wire — `paras-research` | Paras |
| C2 | **Angle Bank** | Standing inventory of angles by vertical and emotional trigger. Feeds both organic and paid. | build | Paras |
| C3 | **Script** | Full script in Hinglish voice, retention-engineered, with the 3E balance. | wire — `paras-script-writer` | Paras |
| C4 | **Packaging** | Titles and thumbnail briefs. Mobile-truncation checked, trigger-varied. | wire — `paras-titles-thumbnails` | Paras |
| C5 | **Avatar / Render** | Faceless video, b-roll, voice, translation. HeyGen + Higgsfield MCPs. | build | Editor |
| C6 | **Editor Brief** | Turns script + raw footage into a shot-by-shot brief the editor works from unaided. | **build** | Editor |
| C7 | **Shorts** | Picks the 3–5 highest-retention cuts from a long-form and specs them. | wire — `paras-shorts-selector` | Editor |
| C8 | **Repurpose** | One video → LinkedIn, IG carousel, X thread, FB, WhatsApp, GMB. Native voice per platform. | wire — `paras-repurpose` | Operator |
| C9 | **Publish** | Description, chapters, tags, pinned comment, Skool post, Community Tab, GHL email. The 48-hour protocol. | wire — `paras-publishing-package` | Operator |
| C10 | **Community** | First-2-hours comment replies, DM triage, Skool engagement queue. | build | Operator |
| C11 | **Performance** | CTR / AVD audit, title and thumbnail swap recommendations, systemic pattern flags. | wire — `paras-ctr-audit` | Paras |
| C12 | **Ad Creative** | Angle bank → ad hooks → script variants → static and video creative briefs. | build | Ads manager |
| C13 | **Ad Ops** | Campaign structure, budgets, kill rules, scaling rules. Meta Ads MCP. | build | Ads manager |

**The chain:** C1 → C2 → C3 → C4 → (C5 or film) → C6 → *editor* → C7 → C8 → C9 → C10 → C11 → back to C1.

C12 and C13 branch off C2 — the same angle inventory serves organic and paid, which is why Angle Bank is its own agent rather than a step inside Research.

---

## Layer 2 — Commerce OS

| # | Agent | Job | Status | Human QA |
|---|---|---|---|---|
| M1 | **Offer Architect** | Offer design, value stack, guarantee, price ladder positioning. | build | Paras |
| M2 | **Funnel / Landing** | Landing pages, opt-ins, checkout, tracking. | wire — `build-premium-website` | VA |
| M3 | **Lead Engine** | Source → verify → diagnose (4C) → score → audit → outreach → track. | **exists, complete** — `paras-lead-engine` | Paras (every send) |
| M4 | **Webinar** | Deck, script, poll sequence, offer stack, registration copy, ad scripts. | exists — `paras-webinar-builder` | Paras |
| M5 | **Nurture** | GHL email sequences, WhatsApp broadcasts, re-engagement. | build | Operator |
| M6 | **Sales Assistant** | Call prep brief, objection handling, proposal draft, follow-up. | build | Paras |
| M7 | **Onboarding / Delivery** | Client kickoff, SOPs, install checklist, DFY project scaffold. | wire — `new-client-system` | Paras |
| M8 | **Case Study Capture** | Pulls results out of delivery and turns them into proof assets. Feeds Content OS. | build | Paras |
| M9 | **Support** | Ticket triage, response drafting, help content. | wire — `customer-support` | Operator |

**M8 is the one people skip and shouldn't.** It is the join between back end and front end — the thing that makes the loop a loop rather than two separate machines. Delivery that produces no proof asset is delivery done at half value.

---

## Layer 3 — Money OS

Scoped as **education plus Paras's own capital.** No advisory-for-fee, no managing others' money. See `../00-strategy/risks-and-constraints.md` §5.

| # | Agent | Job | Status |
|---|---|---|---|
| $1 | **Unit Economics** | P&L per channel, CAC, LTV, payback, runway. Which channel actually pays. | build (Phase 1 primitive) |
| $2 | **Allocation** | Rules — % to ops, ads, reinvestment, reserve, personal. Rules, not advice. | later |
| $3 | **Screener** | Fundamental and technical research. The proven 5-tool stack. | later |
| $4 | **Backtest** | Strategy testing, Pine Script generation, result capture. | later |
| $5 | **Execution** | Paper first. Live only on own capital, hard-gated. | later |
| $6 | **Money Compliance** | Checks every Money OS output against the education-only boundary. | later, but **before $3–$5 ship** |

$1 is the one that matters early and it is not really a trading agent — it is the business's own P&L. Build a primitive version in Phase 1 (a spreadsheet the Scorekeeper writes into is enough) because "which channel actually pays" is a question that gets more expensive to answer the longer you wait.

$6 gates $3–$5. It does not get built after them.

---

## Layer 4 — Product (Phase 4 only)

| # | Agent | Job | Status |
|---|---|---|---|
| P1 | **Install Agent** | Clones the OS into a client's stack — their voice, offers, channels. | later |
| P2 | **Tenant Brain** | Per-client Brand Brain. The multi-tenant version of K1. | later |
| P3 | **Usage / Billing** | Seats, usage, invoicing. | later |
| P4 | **Client Success** | Health scores, adoption nudges, churn signals. | later |

None of these start until ten clients are live on the Phase 2 installed OS. They are here so the architecture does not have to be redesigned when that day comes — P2 in particular is why K1 is designed as a *file* the agents read, rather than instructions baked into each agent.

---

## Counting up

| Layer | Agents | Exists / wire | Build | Later |
|---|---|---|---|---|
| Kernel | 6 | 3 | 2 | 1 |
| Content OS | 13 | 7 | 6 | 0 |
| Commerce OS | 9 | 5 | 4 | 0 |
| Money OS | 6 | 0 | 1 | 5 |
| Product | 4 | 0 | 0 | 4 |
| **Total** | **38** | **15** | **13** | **10** |

Fifteen already exist in some form. That is the real headline of this document: **most of this system is already built and not yet connected.** The work of Phase 1 is wiring and a memory layer, not invention.

---

## Agent spec format

Every agent gets a spec in `../04-agents/` using one format — job, trigger, inputs, outputs, human QA, hard limits. See [`_template.md`](../04-agents/_template.md).

The **hard limits** field is the one that earns its place. An agent that has never been told what it must not do will eventually do it — quote a price that changed, promise a result, publish without review. Write the limits before writing the capability.
