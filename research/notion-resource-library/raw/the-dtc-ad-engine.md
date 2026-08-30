---
title: "The DTC Ad Engine"
page_id: 39a92e2e92e9806981abd8bcb0cbcc7d
layer: strategy
source: https://freebie-for-you.notion.site/39a92e2e92e9806981abd8bcb0cbcc7d
---
# The DTC Ad Engine: 29 Claude Code Skills + 2 Conductors + 12-Tool MCP Layer + 15-Command CLI That Runs Your Entire DTC Meta Ads Workflow From Concept to Scale
---
## 🎯 What You're Getting
The full DTC ad engine deployed inside Claude Code. 29 Claude skills (10 CONCEPT + 10 PRODUCTION + 9 ANALYSIS) + 2 conductors that run the entire creative-to-scale workflow. 12-tool MCP layer that connects to Meta Ads Manager, Higgsfield, GPT Image 2, Seedance 2.0, and your brand asset library. 15-command CLI for one-line execution. SessionStart hook that loads your brand brief into every session automatically.
Every skill drafts. You approve. Nothing renders or spends on its own. The render layer uses your own Higgsfield account and is capped at 25 renders per day so you never blow through credits by accident.
You stop paying $10K/mo agency retainers to do what these 29 skills do in an afternoon. You stop context-switching between Claude, Higgsfield, Meta Ads Manager, CapCut, and Figma as separate tools. You stop re-explaining your brand voice + ICP + product to every fresh AI session. You install the engine once, configure it for your brand, and every skill drafts in your voice, for your ICP, with your product.
By the end of this guide, you'll have:
→ The full 31-file engine (29 skills + 2 conductors) with paste-ready instruction blocks<br>→ The 12-tool MCP layer configuration for Claude Code<br>→ The 15-command CLI wrapper for one-line execution<br>→ The SessionStart hook that loads your brand brief automatically<br>→ The 6 source playbooks that fed the engine (voice, ICP, product, aesthetic, format, matrix)<br>→ The onboarding path from install to first ad shipped in an afternoon<br>→ The weekly operating rhythm that keeps the engine humming
Free and open sourced. Deploy in an afternoon. Runs on your own accounts (Higgsfield, Meta Ads, Claude).
---
## ⚙️ Architecture Overview
The engine has 6 layers.
### Layer 1 — Source Playbooks (6)
The 6 foundation documents every skill references:
1. **voice_core.md** — brand voice patterns (sentence rhythm, vocabulary, banned constructions)
2. **icp_core.md** — ICP demographic + psychographic + day-in-life narrative
3. **product_core.md** — product spec + mechanism + differentiation vs category
4. **aesthetic_core.md** — visual language (palette, textures, mood, camera, character archetype)
5. **format_core.md** — which formats + hooks + beats work for this brand
6. **matrix_core.md** — kill/scale thresholds calibrated for this brand's KPIs
Every skill loads relevant playbooks at session start.
### Layer 2 — The 2 Conductors
- `/dtc-onboard` — builds all 6 playbooks from your brief
- `/dtc-strategist` — analyzes account state, names your bottleneck, sequences skill execution
### Layer 3 — 29 Skills (10 CONCEPT + 10 PRODUCTION + 9 ANALYSIS)
Individual atomic skills. Each has one job. Each drafts, you approve.
### Layer 4 — 12-Tool MCP Layer
MCP servers that connect Claude Code to external tools (Meta Ads, Higgsfield, GPT Image 2, brand asset store).
### Layer 5 — 15-Command CLI
Wrapper commands for one-line execution. `dtc create` / `dtc audit` / `dtc render` / etc.
### Layer 6 — SessionStart Hook
Automatically loads brand brief + relevant playbooks at the start of every Claude Code session so you never re-explain your brand.
---
## ⚙️ Setup Guide (Deploy in an Afternoon)
### Prerequisites
→ Claude Code installed (get from [claude.ai/code](http://claude.ai/code))<br>→ Higgsfield account with API access (Cinema Studio, Soul Cinema, Seedance 2.0 Pro plan)<br>→ Meta Ads Manager access to your ad account<br>→ GPT Image 2 access (via Higgsfield or Replicate)<br>→ Optional: Replicate account for cheaper API-direct rendering
### Install Steps
**Step 1 — Clone the engine repo**
```bash
git clone <https://github.com/[REPO_PATH]/dtc-ad-engine>
cd dtc-ad-engine
```
**Step 2 — Move skills into Claude Code skills directory**
```bash
cp -r skills/* ~/.claude/skills/
```
**Step 3 — Move conductors into Claude Code commands directory**
```bash
cp -r conductors/* ~/.claude/commands/
```
**Step 4 — Configure MCP layer**
```bash
cp mcp-config.json ~/.claude/mcp-config.json
# Then add your API keys to ~/.claude/settings.local.json
```
**Step 5 — Install CLI wrapper**
```bash
npm install -g dtc-cli
# OR
python -m pip install dtc-cli
```
**Step 6 — Run onboarding**
```bash
dtc onboard
# Or invoke inside Claude Code: /dtc-onboard
```
Total install time: 20-30 minutes.
### First Session
After install, open Claude Code in your project directory. Run `/dtc-onboard`. The conductor walks through 12 questions to build your 6 source playbooks. All subsequent sessions auto-load these.
Time to first ad shipped: 2-4 hours from install to a live Meta ad.
---
## 👥 The 2 Conductors
### /dtc-onboard
**Purpose**: Build all 6 source playbooks from a single brand brief.
**Trigger**: Once per brand at install. Re-run only when brand fundamentally repositions.
**Skill Instructions**:
```javascript
You are a DTC brand onboarding conductor.
Walk the operator through a 12-question brief
to build the 6 source playbooks:

1. Brand name + 1-line product description
2. Product price point + margins
3. Primary ICP (demographic + psychographic +
   day-in-life)
4. Top 3 buyer objections
5. Top 3 buyer desires
6. Brand voice samples (paste 3-5 examples
   of on-brand copy)
7. Brand aesthetic (3 adjectives + 3
   reference brands)
8. Current top-performing ad (paste +
   metrics)
9. Current failing ads (paste + why they
   fail)
10. Target CPA + Target ROAS
11. Monthly ad spend + testing budget %
12. Team structure (solo / small team /
    agency)

After collection, generate + save:
→ voice_core.md
→ icp_core.md
→ product_core.md
→ aesthetic_core.md
→ format_core.md
→ matrix_core.md

Save all to ~/.claude/brand-context/[BRAND]/
Confirm with operator before proceeding.
```
### /dtc-strategist
**Purpose**: Analyze current account state, name the ONE bottleneck, sequence which skills to run next.
**Trigger**: Every Monday morning + before any major campaign decision.
**Skill Instructions**:
```javascript
You are a DTC ads strategist. Given current
account performance data + last week's
outputs, identify the ONE bottleneck holding
back ROAS.

Input:
- Last 30 days Meta Ads Manager data
- Last week's skill outputs
- Current 6 playbooks state
- Target vs actual: CPA, ROAS, spend

Analyze:
1. Is the bottleneck creative-side (hook,
   format, script)?
2. Is it audience-side (targeting, overlap,
   fatigue)?
3. Is it landing-page side (conversion
   collapse)?
4. Is it scaling-side (winners not scaling,
   fatigue at scale)?
5. Is it foundation-side (playbooks drifted
   from reality)?

Output:
- One-sentence bottleneck diagnosis
- Recommended skill sequence for next 5 days
  (which skills to run, in what order)
- Success criteria per skill
- Weekly review checkpoint

No hedging. Decisive calls.
```
---
## 👥 CONCEPT — 10 Skills That Build the Winning Angle
### Skill 1 — /concept-generator
**Purpose**: Drafts 20 ad concepts per brief across 7 proven format archetypes.<br>**Output**: 20 concepts with premise + hook + format + funnel position + angle.<br>**Trigger**: Monday ideation.
### Skill 2 — /hook-lab
**Purpose**: Writes 10 scored hooks for one product idea, keeps the best two.<br>**Output**: 10 hooks with rationale + predicted hook rate + top 2 recommendations.<br>**Trigger**: When testing a scaling concept.
### Skill 3 — /angle-mapper
**Purpose**: Maps every buyer angle your product can sell on, ranks by intent match.<br>**Output**: 8-10 angles ranked by ICP fit + funnel position + differentiation.<br>**Trigger**: Before every major campaign.
### Skill 4 — /script-doctor
**Purpose**: Rewrites weak scripts into tight, punchy versions.<br>**Output**: Tightened script at 60-70% of original word count with diagnosis of weak beats.<br>**Trigger**: When a script feels flat.
### Skill 5 — /reaction-beat-writer
**Purpose**: Writes 3-act reaction UGC scripts using the 7 reaction beat archetypes.<br>**Output**: Full Act 1 hook + Act 2 problem expansion + Act 3 product demo + resolution.<br>**Trigger**: When producing reaction-format ads.
### Skill 6 — /storyboard-sketcher
**Purpose**: Produces a 6-shot storyboard from any script.<br>**Output**: 6 shots with framing + camera language + subject action + duration.<br>**Trigger**: Before Seedance production.
### Skill 7 — /cta-variant-writer
**Purpose**: Writes 10 CTA variations optimized for different funnel positions.<br>**Output**: 3 cold-audience + 3 warm + 3 hot + 1 wildcard, each under 6 words.<br>**Trigger**: Every ad.
### Skill 8 — /series-arc-planner
**Purpose**: Plans a 4-week sequential ad series with narrative continuity.<br>**Output**: Week-by-week ad concepts with connecting narrative thread.<br>**Trigger**: Educational or warm-up campaigns.
### Skill 9 — /comparative-composer
**Purpose**: Writes side-by-side comparison ads without naming competitors.<br>**Output**: 5 comparative concepts with hook + comparison structure + proof + resolution.<br>**Trigger**: When positioning against a market leader.
### Skill 10 — /pov-generator
**Purpose**: Produces distinct POVs to test per concept.<br>**Output**: 8 POV angles (founder, customer, expert, skeptic, friend, analyst, practitioner, outsider) with opening lines + framing shifts.<br>**Trigger**: When testing angle variations at scale.
---
## 👥 PRODUCTION — 10 Skills That Render the Ads
### Skill 11 — /seedance-prompt-engineer
**Purpose**: Turns any concept into a Seedance-ready prompt with lock parameters.<br>**Output**: Full scene prompt + camera language + character/product/location locks + style anchors + negative prompt + lock strength values.<br>**Trigger**: Before every Seedance render.
### Skill 12 — /character-sheet-director
**Purpose**: Drafts GPT Image 2 prompts for grey-background character sheets (face close-up + full body).<br>**Output**: GPT Image 2 prompt + 3 backup archetype variations + upload instructions for Cinema Studio.<br>**Trigger**: When onboarding a new character archetype.
### Skill 13 — /product-sheet-producer
**Purpose**: Generates multi-angle product references for continuity across every scene.<br>**Output**: GPT Image 2 prompt for front + 3/4 + top-down views with lighting consistency directives.<br>**Trigger**: For every new product before Seedance production.
### Skill 14 — /location-architect
**Purpose**: Writes prompts for aspirational location sheets at 3/4 angle.<br>**Output**: GPT Image 2 prompt with 3/4 angle enforcement + bright-clean-high-budget aesthetic + 2 backup variations.<br>**Trigger**: When needing consistent settings across shots.
### Skill 15 — /negative-prompt-composer
**Purpose**: Assembles the anti-artifact negative prompt block for Seedance calls.<br>**Output**: 11-anchor standard negative prompt + vertical-specific add-ons.<br>**Trigger**: Every Seedance call.
### Skill 16 — /bts-vlog-mega-prompt
**Purpose**: Fills the 16-section BTS vlog mega-prompt template for algorithm-bypass reach ads.<br>**Output**: Full 16-section mega-prompt with 8-cut breakdown.<br>**Trigger**: When producing BTS vlog format content.
### Skill 17 — /cinematic-beat-mapper
**Purpose**: Maps the 5-beat one-take cinematic structure for brand pillar shots.<br>**Output**: 5 beats with camera + subject + speed ramp + audio cue per beat.<br>**Trigger**: Before cinematic brand pillar renders.
### Skill 18 — /combo-test-designer
**Purpose**: Designs the 2×2 hero + location isolation test before full production.<br>**Output**: 4 test prompts + winner-identification framework.<br>**Trigger**: Before committing to full-length production.
### Skill 19 — /audio-scaffolding-picker
**Purpose**: Picks the right audio ambience layer per setting.<br>**Output**: 4-6 layered sounds + volume ordering + zero-music enforcement per shot.<br>**Trigger**: Before renders needing native audio.
### Skill 20 — /capcut-assembly-director
**Purpose**: Writes the CapCut assembly instructions per ad.<br>**Output**: Shot trim durations + hard-cut markers + color grade + captions + CTA overlay timing.<br>**Trigger**: After Seedance renders complete.
---
## 👥 ANALYSIS — 9 Skills That Turn Spend Into Scalers
### Skill 21 — /hour-24-matrix
**Purpose**: Runs the kill or scale matrix on any ad batch in one call.<br>**Output**: Per-ad KILL/HOLD/SCALE decision + reason + next action.<br>**Trigger**: 24 hours after every ad batch launches.
### Skill 22 — /budget-leak-auditor
**Purpose**: Catches spend bleeding into losing creatives and audiences the platform's default view hides.<br>**Output**: 15-item priority list of BUDGET LEAKS + SILENT LEAKS + HIDDEN WINNERS with dollar impact.<br>**Trigger**: Every Monday.
### Skill 23 — /fatigue-detector
**Purpose**: Flags creative + audience fatigue 48 hours earlier than Meta Ads Manager surfaces it.<br>**Output**: Ranked fatigue signals with severity + recommended action (REFRESH / ROTATE / KILL / SCALE-CAP).<br>**Trigger**: Every Friday + daily on high-spend ads.
### Skill 24 — /hook-rate-diagnostician
**Purpose**: Explains WHY hook rate collapsed.<br>**Output**: Isolated cause (opening frame / hook line / format-audience mismatch / thumbnail) + 3 specific fixes.<br>**Trigger**: When hook rate is under 30%.
### Skill 25 — /hold-rate-auditor
**Purpose**: Explains where viewers dropped off.<br>**Output**: Drop-off second + cause (pacing / product intro / dialogue timing / visual monotony) + fix.<br>**Trigger**: When hold rate collapses at second 8-15.
### Skill 26 — /format-audience-matcher
**Purpose**: Identifies which format wins which audience.<br>**Output**: Format-audience winner matrix + format-audience mismatches to kill.<br>**Trigger**: Weekly.
### Skill 27 — /winning-variant-cloner
**Purpose**: Writes the next 5 variants of a scaling ad before it fatigues.<br>**Output**: 5 variant briefs — 3 hook variations + 2 format variations.<br>**Trigger**: Immediately when an ad hits scale (>2x ROAS at $500+/day).
### Skill 28 — /weekly-kill-list-compiler
**Purpose**: Compiles the weekly kill list + recurring failure patterns to feed back to concept generation.<br>**Output**: This week's kills + patterns + anti-patterns for next week's concepts.<br>**Trigger**: Every Friday.
### Skill 29 — /cross-platform-compare
**Purpose**: Compares the same ad across Meta vs TikTok vs YouTube performance.<br>**Output**: Platform-native winners + one-size-fits-all losers + recommended platform-specific variants.<br>**Trigger**: Weekly for scaling ads.
---
## ⚙️ The 12-Tool MCP Layer
MCP servers that connect Claude Code to external tools. Configure in `~/.claude/mcp-config.json`.
### Tool 1 — meta-ads-mcp
**Purpose**: Read Meta Ads Manager data (campaigns, ad sets, ads, spend, ROAS, hook rate).<br>**Auth**: Meta Business API token.
### Tool 2 — higgsfield-mcp
**Purpose**: Trigger Seedance 2.0 renders, upload assets to Cinema Studio, retrieve Element references.<br>**Auth**: Higgsfield API key.
### Tool 3 — gpt-image-2-mcp
**Purpose**: Generate character sheets, product sheets, location sheets, prop assets.<br>**Auth**: OpenAI or Replicate key.
### Tool 4 — replicate-mcp
**Purpose**: Alternative render path to Higgsfield (Seedance, Kling, Runway, Pika direct).<br>**Auth**: Replicate API token.
### Tool 5 — brand-assets-mcp
**Purpose**: Read/write your brand asset store (voice samples, product images, character refs).<br>**Auth**: Local filesystem or Cloudflare R2.
### Tool 6 — notion-mcp
**Purpose**: Read brand playbooks + concept library + creative calendar from Notion.<br>**Auth**: Notion integration token.
### Tool 7 — google-drive-mcp
**Purpose**: Read/write ad creative library + final render outputs.<br>**Auth**: Google OAuth.
### Tool 8 — slack-mcp
**Purpose**: Post daily audit summaries + scaling alerts to team Slack channel.<br>**Auth**: Slack bot token.
### Tool 9 — filesystem-mcp
**Purpose**: Read/write local ad files, brand playbooks, render outputs.<br>**Auth**: None (local).
### Tool 10 — sheets-mcp
**Purpose**: Read/write Meta Ads exports + create performance dashboards.<br>**Auth**: Google Sheets API token.
### Tool 11 — playwright-mcp
**Purpose**: Optional — screenshot landing pages for LP conversion audit.<br>**Auth**: None (local Playwright).
### Tool 12 — analytics-mcp
**Purpose**: Read GA4 / Shopify data for full-funnel attribution.<br>**Auth**: GA4 + Shopify API tokens.
---
## ⚙️ The 15-Command CLI
Wrapper commands for one-line execution. Install via `npm install -g dtc-cli`.
<table header-row="true">
<tr>
<td>Command</td>
<td>What It Does</td>
</tr>
<tr>
<td>`dtc onboard`</td>
<td>Runs /dtc-onboard conductor</td>
</tr>
<tr>
<td>`dtc strategist`</td>
<td>Runs /dtc-strategist conductor</td>
</tr>
<tr>
<td>`dtc create <concept>`</td>
<td>Runs /concept-generator + /hook-lab + /script-doctor for a concept</td>
</tr>
<tr>
<td>`dtc render <ad-id>`</td>
<td>Runs full production chain (character-sheet-director → seedance-prompt-engineer → capcut-assembly-director)</td>
</tr>
<tr>
<td>`dtc audit`</td>
<td>Runs /budget-leak-auditor on last 30 days</td>
</tr>
<tr>
<td>`dtc matrix`</td>
<td>Runs /hour-24-matrix on latest batch</td>
</tr>
<tr>
<td>`dtc fatigue`</td>
<td>Runs /fatigue-detector on active ads</td>
</tr>
<tr>
<td>`dtc test <concept>`</td>
<td>Runs /combo-test-designer for 2×2 isolation</td>
</tr>
<tr>
<td>`dtc kill-list`</td>
<td>Runs /weekly-kill-list-compiler</td>
</tr>
<tr>
<td>`dtc scale <ad-id>`</td>
<td>Runs /winning-variant-cloner for a scaling ad</td>
</tr>
<tr>
<td>`dtc bts <product>`</td>
<td>Runs /bts-vlog-mega-prompt for BTS vlog production</td>
</tr>
<tr>
<td>`dtc cinematic <concept>`</td>
<td>Runs /cinematic-beat-mapper for brand pillar shot</td>
</tr>
<tr>
<td>`dtc compare <ad-id>`</td>
<td>Runs /cross-platform-compare across Meta/TikTok/YouTube</td>
</tr>
<tr>
<td>`dtc calendar`</td>
<td>Views + updates weekly creative calendar</td>
</tr>
<tr>
<td>`dtc help`</td>
<td>Lists all commands + examples</td>
</tr>
</table>
Every command runs the equivalent Claude Code skill/command in the background, formatted for CLI output.
---
## ⚙️ The SessionStart Hook
Configured in `~/.claude/settings.local.json`.
### The Hook
```javascript
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
### What It Does
At the start of every Claude Code session, the hook automatically:
1. Reads `~/.claude/brand-context/[BRAND]/` folder
2. Loads voice_core.md + icp_core.md + product_core.md + aesthetic_core.md + format_core.md + matrix_core.md into session context
3. Every skill you invoke drafts in your brand voice, for your ICP, with your product, without re-explaining
### Switching Brands
If you manage multiple brands:
```bash
export CURRENT_BRAND=[brand-name]
```
Now all sessions load that brand's playbooks.
---
## ⚙️ Safety + Governance
### The 3 Guardrails
1. **Draft only, never send/spend**: Every skill drafts. Nothing renders on Higgsfield or spends on Meta Ads without your explicit approval action.
2. **Render cap**: 25 Seedance renders per day. You will never blow through Higgsfield credits by accident.
3. **Anti-spam architecture**: This engine doesn't scrape audiences, doesn't run bots, doesn't promise guaranteed ROAS. Anyone promising that is selling you a coin flip.
### What Requires Your Manual Approval
→ Every Seedance render<br>→ Every Meta Ads campaign creation<br>→ Every budget change on an existing campaign<br>→ Every asset upload to Cinema Studio<br>→ Every published landing page A/B test
The engine gives you decisions + drafts. You execute.
---
## ⚙️ The Weekly Operating Rhythm
This is what running the DTC Ad Engine looks like day-to-day.
### Monday — Audit + Priority
- 9:00 `dtc audit` → Prompt 1 (Budget Leak Auditor) output
- 9:30 Execute top 5 kills in Meta Ads Manager
- 10:00 `dtc strategist` → identify week's bottleneck + skill sequence
- 10:30 `dtc create` for top 2 concepts of the week
- 12:00 `dtc test` for 2×2 isolation on top concept
- 14:00 Review Seedance renders from `dtc render`
### Tuesday — Production + Launch
- 9:00 `dtc render` for confirmed concepts (Seedance batch)
- 11:00 CapCut assembly per /capcut-assembly-director output
- 13:00 Launch new ads to Meta Ads Manager
- 15:00 Set fatigue alarms via `dtc fatigue`
### Wednesday — Matrix + Refresh
- 9:00 `dtc matrix` → hour-24 kill/scale decisions
- 10:00 Execute matrix decisions
- 11:00 `dtc scale` for any new scalers (variants queued)
- 14:00 `dtc bts` for next week's BTS vlog concepts
### Thursday — Mid-Week Check
- 9:00 `dtc fatigue` on all active ads
- 10:00 Refresh/rotate/kill per fatigue detector
- 11:00 `dtc create` for hook variants of scaling ads
### Friday — Review + Prep
- 9:00 `dtc kill-list` → this week's failures + patterns
- 10:00 `dtc compare` on top 3 scalers (cross-platform)
- 11:00 Weekly performance summary to Slack (via slack-mcp)
- 13:00 Next week's concept queue prep
Weekly output: 8-15 new ads shipped, 3-5 winners scaled, 5-10 losers killed, full account audited.
---
## ⚙️ Monthly Cadence
**Week 1**: Audit + kill legacy losers + fresh creative refresh<br>**Week 2**: Test velocity peak (highest new-creative launches)<br>**Week 3**: Winner validation + audience expansion<br>**Week 4**: Scale confirmed winners + prep next month's briefs + refresh playbooks
Following this cadence: ROAS variance under 15% month-over-month, testing cycle under 4 days, creative fatigue caught within 48 hours, wasted spend under 8% of total account budget.
---
## ⚙️ What Makes This Different From Standalone Skills
You could copy-paste individual Claude skills into your workspace and manually orchestrate them. Many operators do. The problem: context switching + re-explaining brand voice every session + no data integration + no cross-skill coordination = 60-80% of the engine's leverage lost.
The DTC Ad Engine's structural advantage:
→ **6 playbooks always loaded** — never re-explain brand context<br>→ **12-tool MCP layer** — direct data access to Meta Ads, Higgsfield, GPT Image 2 (no manual copy-paste)<br>→ **15-command CLI** — one-line execution instead of navigating Claude Code UI<br>→ **SessionStart hook** — brand context loaded automatically every session<br>→ **Conductors coordinate** — /dtc-strategist sequences which skills to run when<br>→ **Draft-only architecture** — safe defaults, you approve everything
Individual skills = 30% of the leverage.<br>Full engine = 100% of the leverage.
---
## ⚙️ Deployment Checklist
Print this. Check every item.
- [ ] Clone repo
- [ ] Move skills to \\~/.claude/skills/
- [ ] Move conductors to \\~/.claude/commands/
- [ ] Configure MCP layer (12 tools)
- [ ] Add API keys to settings.local.json
- [ ] Install CLI wrapper
- [ ] Run /dtc-onboard (12-question brief)
- [ ] Verify 6 playbooks generated
- [ ] Test SessionStart hook (open new session, verify brand loaded)
- [ ] Run `dtc audit` on your account
- [ ] Execute first 5 kills identified
- [ ] Run `dtc create` for first concept
- [ ] Ship first ad
- [ ] Run `dtc matrix` at hour 24
- [ ] Iterate weekly rhythm
Total deployment time: 3-4 hours from clone to first ad live.
---
## ⚙️ What NOT to Do
→ Don't skip the /dtc-onboard step. Every skill's quality depends on the playbooks. Skipping onboarding = generic output.
→ Don't manually re-invoke playbooks in every skill call. The SessionStart hook handles that. Trust the architecture.
→ Don't remove the 25-renders-per-day cap. It's the guardrail that keeps credit costs predictable.
→ Don't let any skill spend Meta Ads budget without your explicit approval. Draft-only is non-negotiable.
→ Don't run this engine on 3+ brands from the same Claude Code workspace. Use separate workspaces per brand or set CURRENT_BRAND environment variable religiously.
→ Don't skip the SessionStart hook. Without it, every session requires re-explaining your brand.
→ Don't invoke individual skills without running /dtc-strategist first on Monday. The strategist sequences skills for maximum leverage. Random skill invocation = 60% of the leverage lost.
→ Don't ignore the /budget-leak-auditor output. It's the single highest-ROI skill. Run it every Monday. Execute top 5 kills.
→ Don't scale winners without running /fatigue-detector simultaneously. Scaling a fatiguing ad accelerates burnout.
→ Don't add skills to the engine without updating the CLI. Uncoordinated additions break the sequenced execution model.
→ Don't share your playbooks publicly. Voice + ICP + product data is competitive intelligence. Keep it in local \\~/.claude/ folder or private repo.
→ Don't use the engine for direct-response conversion campaigns without also running standard-UGC skills alongside. Different ad tiers need different treatment.
---
## ⚙️ Where the Source Playbooks Came From
The 6 source playbooks are the foundation. They came from 6 domains of DTC expertise codified into structured markdown:
1. **voice_core.md**: 100+ analyzed DTC brand voice samples
2. **icp_core.md**: 30+ ICP research templates across skincare / supplements / fitness / fashion / food-bev / tech
3. **product_core.md**: 20+ product positioning frameworks
4. **aesthetic_core.md**: 15+ visual aesthetic codices
5. **format_core.md**: 12 proven ad format archetypes (UGC talking-head / reaction UGC / cinematic / BTS vlog / 1-photo-to-6-shots / carousel / etc.)
6. **matrix_core.md**: Kill/scale thresholds calibrated across dozens of DTC accounts
These are the substrate. The 29 skills are the execution layer. The conductors orchestrate. The MCP layer connects to your data. The CLI simplifies invocation. The SessionStart hook makes it all seamless.
---
## 🎯 Closer
**Clone the repo. Move skills + conductors to your Claude Code directory. Configure the 12-tool MCP layer. Install the CLI. Run /dtc-onboard for 20 minutes. Verify 6 playbooks generated. Test the SessionStart hook. Run ****`dtc audit`**** on your Meta Ads account. Execute the first 5 kills. Run ****`dtc create`**** for a concept. Run ****`dtc render`****. Ship your first ad. Run ****`dtc matrix`**** at hour 24. By end of Week 1 you'll have shipped 8-15 new ads, killed 5-10 losers, scaled 3-5 winners. By end of Month 1 you'll have replaced a $10K/mo agency retainer with a fully-automated draft-and-approve engine that runs on your own accounts. By end of Quarter 1 you'll be operating at the leverage tier every DTC founder wanted from AI but couldn't figure out how to structure.**
The agency-scale bottleneck was the constraint.
29 skills + 2 conductors + 12-tool MCP layer + 15-command CLI + SessionStart hook running on your Claude Code = a full DTC ad engine deployed in an afternoon.
The barrier to a full DTC creative engine just dropped from "hire an agency and wait" to "deploy this afternoon."
The gap between a $10K/mo agency retainer and what one operator can run just closed.
---
**The 29 skills + 2 conductors + 12-tool MCP layer + 15-command CLI + SessionStart hook is the full engine. Bookmark this guide. Deploy this afternoon.**
---
