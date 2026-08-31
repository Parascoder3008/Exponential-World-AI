# The Stack

Three runtimes, adopted in order. The rule governing all of it: **automate a workflow only after running it manually long enough to know it's right.**

```
  PHASE 0–1              PHASE 2                    PHASE 4
  ─────────────          ─────────────              ─────────────
  Claude Code       →    + n8n / Trigger.dev   →    + Next.js dashboard
  skills                 scheduled & always-on      client-facing product

  human invokes          runs unattended            client logs in
  zero infra cost        small infra cost           real infra cost
  changes in seconds     changes in minutes         changes need a deploy
```

Each stage keeps everything before it. Skills do not get replaced by n8n; the parts that need to run at 3am move, and the rest stay where iteration is fastest.

---

## Runtime 1 — Claude Code skills (Phase 0–1)

**What it is:** every agent is a `SKILL.md` under `.claude/skills/`, invoked as `/agent-name` by Paras or the OS Operator.

**Why it goes first:**
- Zero infrastructure and zero cost
- An agent changes in seconds — edit a markdown file
- The team already works this way; eleven `paras-*` skills exist
- Skills are the thing that becomes the Phase 4 agent packs, so building here is building inventory

**What lives here:** all nine first-phase agents, and every agent whose trigger is "a human decided to do this now" — Research, Script, Packaging, Editor Brief, Repurpose, Webinar, Sales Assistant.

**Repo layout:**

```
.claude/skills/
  exp-brand-brain/SKILL.md      the memory layer
  exp-editor-brief/SKILL.md     script + footage → editor brief
  ...
ai-os/04-agents/                the spec for each (design intent)
```

Specs and skills are deliberately separate: `04-agents/` says what an agent is *for* and who QAs it, `.claude/skills/` is the executable. When they disagree, the spec is the intent and the skill is the bug.

**The MCPs already available**, which is why several agents are cheaper to build than they look:

| MCP | Serves |
|---|---|
| Meta Ads | Ad Ops (C13), Ad Creative performance |
| HeyGen, Higgsfield | Avatar / Render (C5) |
| Supermetrics | Scorekeeper (K3) |
| Notion, Google Drive/Sheets | Brand Brain storage, pipeline tracking |
| Gmail, Calendar | Nurture (M5), Sales Assistant (M6) |
| Apify | Lead Engine sourcing (M3) |
| Composio | Everything else with an API |
| GitHub | The repo itself |

---

## Runtime 2 — n8n or Trigger.dev (Phase 2)

**What moves:** anything that must run without a human present.

| Workload | Why it moves |
|---|---|
| Lead Engine sourcing runs | Daily, unattended, long-running |
| Nurture sequences | Time-based, must fire on schedule |
| Scorecard data pulls | Weekly, multi-source, tedious |
| Comment / DM monitoring | Continuous |
| Publish scheduling | Fires at 9am whether anyone is awake or not |

**Which one:** both skills exist in `Claude Skills/` (`n8n`, `trigger-dev`).

- **n8n** for connector-heavy glue where the VA or Operator should be able to see and edit the flow visually. Most Commerce OS plumbing is this.
- **Trigger.dev** for anything that is really code — long-running jobs, retries, fan-out, typed workflows. The `new-client-system` scaffold already pairs it with Next.js, so choosing it here is choosing the Phase 4 path early.

**Recommendation:** start with n8n for the connector work because the team can maintain it, and use Trigger.dev where a job is genuinely code-shaped. Do not port everything to one for tidiness.

**What does not move:** anything requiring judgment or voice. Script writing stays a skill. Moving creative work to a scheduler produces content nobody read before it published.

---

## Runtime 3 — Next.js dashboard (Phase 4)

**What it is:** the client-facing product. `Claude Skills/new-client-system/` already scaffolds exactly this — Next.js 16 frontend plus Trigger.dev backend worker, with auth, a dashboard, an automations list, and Composio connection handling.

**When:** after ten clients are live on the Phase 2 installed OS. Not before.

**Why not before:** a product with no distribution and no proven agents is a support burden attached to zero revenue. Every month spent on a dashboard is a month not spent on the channel that would give the dashboard customers.

**What it needs from the architecture, which is why Brand Brain is a file:** P2 (Tenant Brain) is a per-client Brand Brain. Because K1 is a *document agents read* rather than instructions baked into each agent, multi-tenancy is a matter of pointing at a different document — a path change, not a rewrite.

---

## Data and where things live

| Data | Home | Notes |
|---|---|---|
| Brand Brain | Repo + Notion mirror | Repo is canonical, Notion is for the team to read |
| Agent specs | Repo, `ai-os/04-agents/` | Versioned with the skills |
| Pipeline / CRM | Google Sheets → GHL | Sheets while cold; GHL once they reply |
| Content calendar | Notion | Where the team already works |
| Metrics | Sheets, via Supermetrics | One tab per week |
| Client delivery | GHL | Already the delivery spine |
| Code | This repo | |

Deliberately boring. The pipeline note is from the existing `paras-lead-engine` guidance and worth repeating: **do not fill GHL with cold rows.** Push a lead there once they have replied. A CRM full of people who have never heard of you is a CRM nobody opens.

---

## Cost posture

Phase 0–1 should run on tools already paid for. The only new spend worth committing to before revenue: whatever the Scorekeeper needs to pull data reliably.

Phase 2 adds n8n hosting (self-host or cloud, both cheap) and Trigger.dev usage. Phase 4 adds real infrastructure, and by then it is funded by installs.

The `cost-reducer` skill in `Claude Skills/` is worth running against the stack at the end of each phase rather than after the bill arrives.

---

## Migration rule

When moving an agent from skill to n8n or Trigger.dev:

1. It has run as a skill for **at least 30 days**
2. Its output has been QA'd enough times that the failure modes are known
3. Its spec in `04-agents/` is current
4. The moved version is watched for a full cycle before the skill is retired
5. **The skill is kept** — it is Phase 4 product inventory even after the automated version takes over

Step 5 is the one that gets forgotten. The skills are not scaffolding to be discarded; they are the thing that eventually gets sold.
