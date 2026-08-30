---
title: "Claude For DTC Creative"
page_id: 3be92e2e92e98068ae1ddb05cc08a921
layer: production
source: https://freebie-for-you.notion.site/3be92e2e92e98068ae1ddb05cc08a921
---
# The 10-Level Maturity Model From One Saved Prompt to a Complete DTC Creative Function That Runs Without You Managing Every Task Manually
---
## 🎯 What You're Getting
The 10-level maturity model for using Claude across DTC creative production. From one saved prompt on Day 1 to a complete DTC creative engine that runs weekly without you managing every task manually. Level-by-level implementation plan with setup instructions, paste-ready templates, and clear criteria for when to move up.
Not another collection of generic prompts you forget about after five minutes. A practical roadmap for using Claude across concept ideation, competitor research, hook writing, brand voice locking, storyboarding, character + asset curation, video render orchestration, CapCut assembly, ad deployment + testing, and performance + fatigue reporting.
You start at Level 1 (20 minutes to build one saved prompt) and progress to Level 10 (2-4 weeks to build the complete DTC creative function). Every level includes a clear explanation of what to build, step-by-step setup, copy-and-paste prompts, templates, and a criteria for moving up.
The goal is not to make Claude produce more ads. The goal is to make DTC creative production require less manual work.
The 10 levels:
<table header-row="true">
<tr>
<td>Level</td>
<td>Name</td>
<td>What It Does</td>
<td>Build Time</td>
</tr>
<tr>
<td>1</td>
<td>The Saved Prompt</td>
<td>One creative task, done well, every time</td>
<td>20 min</td>
</tr>
<tr>
<td>2</td>
<td>The Chain</td>
<td>Several prompts in a row, one workflow</td>
<td>1 hour</td>
</tr>
<tr>
<td>3</td>
<td>The Brain</td>
<td>Claude knows your brand voice, ICP and product</td>
<td>2 hours</td>
</tr>
<tr>
<td>4</td>
<td>The Skill</td>
<td>A creative job packaged so it runs identically forever</td>
<td>2 hours</td>
</tr>
<tr>
<td>5</td>
<td>The Deliverable Machine</td>
<td>Finished briefs + storyboards, not drafts</td>
<td>3 hours</td>
</tr>
<tr>
<td>6</td>
<td>The Connection</td>
<td>Claude touches your Meta Ads, Higgsfield, Notion</td>
<td>1 hour</td>
</tr>
<tr>
<td>7</td>
<td>The Agent</td>
<td>You give a concept, it produces the whole ad</td>
<td>Half a day</td>
</tr>
<tr>
<td>8</td>
<td>The Team</td>
<td>Specialist agents handing creative work to each other</td>
<td>1-2 days</td>
</tr>
<tr>
<td>9</td>
<td>Always On</td>
<td>Runs without you pressing anything</td>
<td>1 day</td>
</tr>
<tr>
<td>10</td>
<td>The Function</td>
<td>The entire DTC creative engine, humans on exceptions only</td>
<td>2-4 weeks</td>
</tr>
</table>
Original framework inspired by Thomas Read's Claude For Client Acquisition structure.
---
## ⚙️ Level 1 — The Saved Prompt
**Build time**: 20 min<br>**What it does**: One creative task, done well, every time
### What to build
A single, high-value saved prompt that solves one specific DTC creative task consistently. The starting point of the entire maturity model.
### Setup instructions
1. Pick one high-frequency DTC creative task (e.g., "write 20 ad concepts for hero product")
2. Draft the prompt with clear inputs + expected output format
3. Save to Claude Projects or your notes app for one-tap access
4. Use it every time the task comes up
### Sample prompt — Concept Generator
```javascript
For [PRODUCT NAME], generate 20 distinct ad
concepts. Each concept: 1-line premise, hook
line (under 12 words), format recommendation
(UGC / reaction / cinematic / BTS vlog /
carousel), funnel position (TOF / MOF / BOF),
primary angle. Prioritize novelty over polish.

Rank all 20 by ICP fit + differentiation.
Highlight top 5.
```
### Real DTC workflow
Monday morning: paste product name into prompt. Get back 20 concepts in 60 seconds. Review + approve top 5. Ship those to production.
### When to move to Level 2
You're using the saved prompt regularly AND finding yourself running it in sequence with 1-2 other prompts (e.g., concept-generator → hook-lab). Time to chain them.
---
## ⚙️ Level 2 — The Chain
**Build time**: 1 hour<br>**What it does**: Several prompts in a row, one workflow
### What to build
A sequence of 2-3 prompts that pass output from one to the next, completing a multi-step workflow.
### Setup instructions
1. Identify a workflow that requires 2-3 sequential prompts
2. Design the input/output format of each prompt so outputs flow into next inputs
3. Save the chain as a documented workflow in Claude Projects or Notion
4. Practice running the chain end-to-end
### Sample chain — Concept-to-Storyboard
**Prompt 1**: Concept Generator (from Level 1)<br>**Prompt 2**: Hook Lab (takes concept output, writes 10 hook variants)<br>**Prompt 3**: Storyboard Sketcher (takes chosen hook + concept, produces 6-shot storyboard)
### Real DTC workflow
Monday morning: run Concept Generator on hero product → approve top 5 concepts → run Hook Lab on each → pick winning hook per concept → run Storyboard Sketcher on winners. All done in 45 minutes end-to-end.
### When to move to Level 3
You're running the same chains for multiple brands OR you find yourself re-explaining brand context every time. Time to give Claude a permanent brain.
---
## ⚙️ Level 3 — The Brain
**Build time**: 2 hours<br>**What it does**: Claude knows your brand voice, ICP and product
### What to build
The 6 foundation playbooks that Claude auto-loads at every session start. Never re-explain your brand.
### Setup instructions
1. Create `~/.claude/brand-context/[BRAND]/` folder
2. Fill 6 markdown files:
	- `voice_core.md` — brand voice patterns + banned constructions
	- `icp_core.md` — target customer demographic + psychographic
	- `product_core.md` — product spec + differentiation
	- `aesthetic_core.md` — visual language + palette
	- `format_core.md` — which formats + hooks win for this brand
	- `matrix_core.md` — kill/scale KPI thresholds
3. Add SessionStart hook to `~/.claude/settings.local.json`:
```json
{
  "hooks": {
    "SessionStart": [
      {
        "command": "load-brand-context",
        "args": ["--brand", "$CURRENT_BRAND"]
      }
    ]
  }
}
```
1. Test in a fresh session — Claude should respond using your brand context without you mentioning it
### Real DTC workflow
You start a new Claude session Monday morning. You type "generate 20 concepts for our hero moisturizer." Claude generates concepts in your brand voice, matching your ICP, respecting product positioning, applying your matrix thresholds. You never re-explained anything.
### When to move to Level 4
You've been running the same chains for 2+ weeks AND you want to package them so anyone on your team can run them identically. Time to build skills.
---
## ⚙️ Level 4 — The Skill
**Build time**: 2 hours<br>**What it does**: A creative job packaged so it runs identically forever
### What to build
Named Claude Code skills that any team member can invoke without knowing the underlying prompt structure. Package the chain from Level 2 with the brain from Level 3.
### Setup instructions
1. Take your chain from Level 2
2. Package as a Claude skill in `~/.claude/skills/[skill-name]/`
3. Write skill instructions that reference the brand playbooks
4. Save + invoke by name (e.g., `/concept-generator`)
### Sample skill — /concept-generator (Level 4 version)
```javascript
Name: concept-generator
Description: Generates 20 ad concepts across 7
format archetypes for the current brand.

Model: Claude Opus 5

System Prompt:
You are a DTC ad concept generator for [BRAND]
(auto-loaded from brand-context via SessionStart
hook).

Input from operator:
- Product: [SKU]
- Campaign goal: [awareness / conversion /
  retention]
- Reference winning ad (optional): [PASTE]

Output 20 concepts using the format archetype
distribution from format_core.md, respecting
voice_core.md tone and product_core.md
positioning.

Rank by ICP fit + differentiation. Highlight
top 5.
```
### Real DTC workflow
Anyone on your team types `/concept-generator` in Claude Code. Skill auto-loads brand context. They input product + goal. Get back 20 ranked concepts. Same quality every time regardless of operator.
### When to move to Level 5
Your skills output good drafts, but they still need manual assembly into finished deliverables. Time to make Claude produce finished files.
---
## ⚙️ Level 5 — The Deliverable Machine
**Build time**: 3 hours<br>**What it does**: Finished briefs + storyboards, not drafts
### What to build
Skills that output complete, production-ready deliverables — not drafts requiring further edits. Full Seedance prompts. Full CapCut assembly instructions. Full campaign briefs.
### Setup instructions
1. Upgrade your skills from Level 4 to output finished-file structures
2. Add QC + formatting requirements to skill instructions
3. Ensure every output is copy-paste ready for downstream tools
### Sample skill — /seedance-prompt-engineer (Level 5 version)
```javascript
Name: seedance-prompt-engineer

Output must be a COMPLETE, PRODUCTION-READY
Seedance 2.5 prompt including:

- Full scene description
- Camera direction (lens + motion)
- Lighting (direction + quality)
- Physics (materials + weight + momentum)
- Character lock references (@character_[name]
  at 0.97 strength)
- Product lock references (@product_[SKU] at
  0.95 strength)
- Style anchors
- Negative prompt block (anti-artifact anchors)
- Duration
- Aspect ratio

Format: paste-ready block. No commentary. No
placeholders. Operator copies directly into
Seedance.
```
### Real DTC workflow
Operator invokes `/seedance-prompt-engineer` with a scene brief. Gets back a full production-ready Seedance prompt. Pastes into Seedance directly. Zero manual editing between Claude output and Seedance render.
### When to move to Level 6
Your skills produce great finished deliverables, but you're still manually pulling data (Meta Ads exports, competitor screenshots, Notion notes). Time to connect Claude to your real tools.
---
## ⚙️ Level 6 — The Connection
**Build time**: 1 hour<br>**What it does**: Claude touches your Meta Ads, Higgsfield, Notion
### What to build
MCP (Model Context Protocol) integrations that let Claude directly read from and write to your real tools. No more manual copy-paste of data.
### Setup instructions
1. Install MCP servers for your key tools:
	- Meta Ads MCP (for performance data)
	- Higgsfield MCP (for render orchestration)
	- Notion MCP (for brand playbooks + creative library)
	- Google Sheets MCP (for reporting)
2. Configure in `~/.claude/mcp-config.json`
3. Test each connection: "Show me last 7 days of Meta Ads performance"
### Sample MCP config
```json
{
  "mcpServers": {
    "meta-ads": {
      "command": "meta-ads-mcp",
      "env": {
        "META_ADS_TOKEN": "your_token_here"
      }
    },
    "higgsfield": {
      "command": "higgsfield-mcp",
      "env": {
        "HIGGSFIELD_API_KEY": "your_key_here"
      }
    },
    "notion": {
      "command": "notion-mcp",
      "env": {
        "NOTION_TOKEN": "your_token_here"
      }
    }
  }
}
```
### Real DTC workflow
You type: "Pull last 7 days of Meta Ads data, run the kill-or-scale matrix, and log the decisions to our Notion creative dashboard." Claude reads Meta directly, runs matrix, writes to Notion. Zero manual data movement.
### When to move to Level 7
Your team is doing multi-step workflows manually chained together. Time to build an agent that does the whole workflow autonomously with just a goal input.
---
## ⚙️ Level 7 — The Agent
**Build time**: Half a day<br>**What it does**: You give a concept, it produces the whole ad
### What to build
An agent that takes a single high-level input (e.g., "concept for hero moisturizer targeting Gen Z") and autonomously executes the full pipeline: research → concept → storyboard → render → assemble → deploy — until finished.
### Setup instructions
1. Design the agent's autonomy scope (what decisions it makes vs escalates)
2. Chain skills from Level 4-5 into agent workflow
3. Add tool-use for MCP connections from Level 6
4. Configure decision-making guardrails
5. Test on 1 product end-to-end
### Sample agent — Production Director Agent
```javascript
Agent name: production-director

Input: 1 sentence concept + product name

Autonomous workflow:
1. Load brand playbooks (auto via SessionStart)
2. Run /trend-radar to check current trending
   formats
3. Run /concept-generator to expand concept
   into 5 variants
4. Auto-select top-scoring variant based on
   ICP fit + differentiation
5. Run /hook-lab to generate 10 hooks + pick
   top 2
6. Run /storyboard-sketcher on chosen hook
7. Run /seedance-prompt-engineer per scene
8. Queue Seedance renders via Higgsfield MCP
9. Wait for render completion
10. Run /capcut-assembly-director
11. Output: complete deploy-ready ad + written
    justification of decisions

Escalation: any decision requiring subjective
brand judgment (final approval before deploy).
```
### Real DTC workflow
Founder sends operator a slack message: "concept for hero moisturizer, testing new audience." Operator inputs to agent. Agent runs 30-minute autonomous workflow. Finished ad + decision log returns to operator. Operator reviews + approves. Deploys.
### When to move to Level 8
One agent works, but you need multiple specialist agents (creative + production + analyst) coordinating on different jobs. Time to build a team.
---
## ⚙️ Level 8 — The Team
**Build time**: 1-2 days<br>**What it does**: Specialist agents handing creative work to each other
### What to build
Multi-agent orchestration where 3-9 specialist agents hand work between each other. One agent identifies the concept, hands to production agent, hands to analyst agent, feeds back to concept agent for next round.
### Setup instructions
1. Design your specialist roster (e.g., Concept Generator + Production Director + Performance Analyst)
2. Define hand-off triggers (when does concept agent output move to production?)
3. Build orchestrator agent that coordinates the team
4. Test full multi-agent workflow
### Sample team structure
```javascript
Orchestrator: /dtc-creative-director

Specialist agents:
1. /concept-generator (creative strategist role)
2. /production-director (art director + producer
   role)
3. /performance-analyst (media buyer analytics
   role)

Workflow:
Monday morning:
- Orchestrator receives week's product priorities
- Orchestrator invokes concept-generator per
  product
- Approved concepts pass to production-director
- Production-director creates full production
  briefs + queues renders
- After ad deploys, performance-analyst waits
  24h then runs matrix
- Winning variants feed back to concept-
  generator for next round
- Losing patterns feed back as anti-patterns

Everything logs to Notion creative dashboard.
```
### Real DTC workflow
Founder-operator kicks off Monday sprint by telling orchestrator "run the weekly loop." Team of 3 agents executes concept → production → analysis → variant generation over the week autonomously. Founder-operator only reviews outputs + approves major decisions.
### When to move to Level 9
Your agent team works but you're still manually triggering it every day. Time to make it always-on.
---
## ⚙️ Level 9 — Always On
**Build time**: 1 day<br>**What it does**: Runs without you pressing anything
### What to build
Cron jobs + webhook triggers that fire the multi-agent team automatically on schedule or on event. No manual invocation.
### Setup instructions
1. Use n8n / Zapier / [Make.com](http://make.com/) to trigger Claude workflows on schedule
2. Set up event-based triggers (new ad deploy → matrix agent runs at hour 24 automatically)
3. Set up Slack notifications for outputs
4. Configure escalation paths for exceptions
### Sample automation setup
```javascript
Trigger 1: Monday 9:00 AM
Action: Run Creative Director orchestrator with
this week's product priorities → notify Slack
with concept list

Trigger 2: New ad batch deployed to Meta Ads
Manager
Action: Wait 24h → run Performance Analyst
matrix → post kill/scale recommendations to
Slack

Trigger 3: Any ad ROAS drops below threshold
Action: Alert operator + auto-generate fatigue
diagnosis

Trigger 4: Friday 3:00 PM
Action: Compile weekly executive report + email
to founder

Trigger 5: New product added to Notion product
DB
Action: Auto-run concept-generator + hook-lab
for onboarding
```
### Real DTC workflow
Operator's role becomes: review Slack notifications, approve or escalate. The team of agents runs the loop 24/7. Every Monday morning, the operator wakes to a full week's concept list. Every Friday afternoon, the executive report lands in the founder's inbox.
### When to move to Level 10
You have specialist agents running always-on but they're operating in isolated workflows. Time to connect everything into one complete DTC creative function.
---
## ⚙️ Level 10 — The Function
**Build time**: 2-4 weeks<br>**What it does**: The entire DTC creative engine, humans on exceptions only
### What to build
The complete DTC creative function running as one integrated system. All specialist agents + all automations + all MCP connections + all brand playbooks + all skills unified under one operational spine.
Humans handle:<br>→ Strategic brand direction (quarterly)<br>→ Approval of major campaign shifts<br>→ Exceptions the system flags for escalation
Everything else runs autonomously.
### Setup instructions
1. Audit every component built at Levels 1-9
2. Consolidate skills + agents into unified team structure
3. Wire all MCP connections into central orchestrator
4. Build exception handling + escalation paths
5. Create founder-facing dashboard showing all system output
6. Set up weekly + monthly + quarterly review cadences
7. Onboard team on system operation
8. Run parallel with existing agency for 2-4 weeks
9. Cut over to full autonomy
### Full DTC Creative Function architecture
```plain text
┌─────────────────────────────────────────┐
│ FOUNDER LAYER                           │
│ Quarterly brand direction               │
│ Major campaign approvals                │
│ Exception decisions                     │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│ ORCHESTRATOR LAYER                      │
│ /dtc-creative-director                  │
│ - Weekly + monthly + quarterly cadences │
│ - Escalation routing                    │
│ - Cross-agent coordination              │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│ SPECIALIST AGENT LAYER                  │
│ 9-50 specialist agents (see 42-skill or │
│ 50-skill resources)                     │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│ MCP CONNECTION LAYER                    │
│ Meta Ads / Higgsfield / Notion /        │
│ Google Sheets / Slack / Airtable        │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│ BRAND PLAYBOOK LAYER                    │
│ voice / ICP / product / aesthetic /     │
│ format / matrix                         │
└─────────────────────────────────────────┘
```
### Real DTC workflow
The founder's day:
- 9:00 AM: Check Slack for overnight system output
- 9:15 AM: Approve or flag any escalations
- 9:30 AM: Review week's shipped ads on dashboard
- 9:45 AM: Focus on brand strategy work
- Rest of day: Never touch the creative production loop
Weekly executive report auto-generates every Friday. Monthly brand performance review auto-runs first Monday of each month. Quarterly brand direction happens as a 2-hour founder session per quarter.
The founder + 1 in-house operator run the entire DTC creative function at agency-tier output for the cost of Claude subscription + render layer.
---
## ⚙️ The 30-Day Implementation Plan
Progression from Level 1 to Level 5 in 30 days.
### Days 1-5 — Foundation
- Day 1: Build first saved prompt (Level 1)
- Days 2-4: Chain 2-3 prompts into workflow (Level 2)
- Day 5: Test workflow on 2 real product briefs
### Days 6-10 — Brain Setup
- Days 6-7: Fill 6 brand playbooks (Level 3)
- Day 8: Configure SessionStart hook
- Days 9-10: Test brain across multiple sessions
### Days 11-15 — Skills Package
- Days 11-13: Package top 5 workflows as Claude skills (Level 4)
- Days 14-15: Test skills with different operators
### Days 16-20 — Deliverable Quality
- Days 16-18: Upgrade skills to output finished deliverables (Level 5)
- Days 19-20: Validate outputs are production-ready
### Days 21-25 — Connections
- Days 21-22: Install MCP integrations (Level 6)
- Days 23-25: Test connections end-to-end
### Days 26-30 — First Agent
- Days 26-28: Build first autonomous agent (Level 7)
- Days 29-30: Run agent on real production loop, refine
By Day 30: You're operating at Level 7. Levels 8-10 come over the next 60-90 days.
---
## ⚙️ Where You Are Today (Diagnostic)
Score yourself against these 10 questions. Each YES = you're at that level.
1. Do you have at least 1 saved prompt you use regularly? → Level 1
2. Do you chain 2-3 prompts together for a workflow? → Level 2
3. Does Claude auto-load your brand context every session? → Level 3
4. Do you have named skills anyone on your team can invoke? → Level 4
5. Do your skills output production-ready deliverables (not drafts)? → Level 5
6. Does Claude directly access your Meta Ads / Higgsfield / Notion? → Level 6
7. Do you have an agent that runs a full workflow from a single input? → Level 7
8. Do multiple specialist agents hand work between each other? → Level 8
9. Do your workflows run on schedule without manual triggers? → Level 9
10. Does your entire DTC creative function run with humans on exceptions only? → Level 10
Your score = your current level. Focus your next 30 days on advancing 2-3 levels.
---
## ⚙️ What NOT to Do
→ Don't skip Level 3 (The Brain). Every level after depends on brand playbooks loaded via SessionStart.
→ Don't try to jump from Level 1 to Level 8. Each level builds on the previous.
→ Don't build agents (Level 7) without production-ready deliverables (Level 5). Agents outputting drafts = wasted autonomy.
→ Don't automate workflows (Level 9) that aren't stable yet. Automating a broken process = broken process at scale.
→ Don't hire an agency for work Claude is doing at Level 5+. Cancel them and use the savings for ad spend.
→ Don't measure Level 10 by "does it eliminate the need for humans." Measure by "does it eliminate 90%+ of manual creative production work."
→ Don't share your brand playbooks publicly. Competitive intelligence.
→ Don't skip the diagnostic. Know where you are before building the next level.
→ Don't onboard operators without training them on Levels 1-4 first. They need foundation before agent autonomy.
→ Don't rush past Level 6 (Connections). MCP integrations are what unlock Levels 7-10.
---
## ⚙️ The Level-Up Criteria
Clear signals for when to move to the next level.
<table header-row="true">
<tr>
<td>Move from Level → To Level</td>
<td>Signal</td>
</tr>
<tr>
<td>1 → 2</td>
<td>You're running the same prompt with 1-2 others in sequence</td>
</tr>
<tr>
<td>2 → 3</td>
<td>You're re-explaining brand context every session</td>
</tr>
<tr>
<td>3 → 4</td>
<td>You want team members to run same workflows independently</td>
</tr>
<tr>
<td>4 → 5</td>
<td>Your skill outputs still need manual editing</td>
</tr>
<tr>
<td>5 → 6</td>
<td>You're manually copy-pasting data between tools</td>
</tr>
<tr>
<td>6 → 7</td>
<td>You're running the same multi-step workflow daily</td>
</tr>
<tr>
<td>7 → 8</td>
<td>One agent isn't enough for parallel workflows</td>
</tr>
<tr>
<td>8 → 9</td>
<td>You're still manually triggering the team every day</td>
</tr>
<tr>
<td>9 → 10</td>
<td>Isolated workflows work but aren't coordinated as one function</td>
</tr>
</table>
---
## ⚙️ Every Level Includes
→ A clear explanation of what to build<br>→ Step-by-step setup instructions<br>→ Copy-and-paste prompts (this document)<br>→ Project and skill templates (in prior resources)<br>→ Agent briefs and guardrails (in prior resources)<br>→ Real DTC creative workflows (this document)<br>→ Clear criteria for when to move up (this document)<br>→ A 30-day implementation plan (this document)
Complementary resources for deeper skill libraries:<br>→ 42 Claude Creative Skills (job-based)<br>→ Claude DTC Creative System (8-category framework)<br>→ DTC Ad Engine (29 skills + MCP + CLI)<br>→ AI Creative Department (50 agents across 5 teams)
---
## 🎯 Closer
**Score yourself on the diagnostic. Start at your current level. Build the next level over the next 30 days. Repeat quarterly. By end of Quarter 1 you'll be at Level 5-6 (finished deliverables + real tool connections). By end of Quarter 2 you'll be at Level 7-8 (autonomous agents + multi-agent team). By end of Quarter 3 you'll be at Level 9 (always-on workflows). By end of Year 1 you'll be at Level 10 (complete DTC creative function running with humans on exceptions only). Every level makes DTC creative production require less manual work. The goal is not to make Claude produce more ads. The goal is to make DTC creative production require less manual work.**
The manual creative production bottleneck was the constraint.
10 levels of Claude maturity from saved prompt to complete function is what fixes it.
Original framework inspired by Thomas Read's Claude For Client Acquisition structure.
---
**The 10-level maturity model + level-by-level setup instructions + sample prompts + real DTC workflows + level-up criteria + 30-day implementation plan is the full playbook. Bookmark this guide. Score yourself today.**
---
