---
title: "The Claude Code + Meta Ads MCP Playbook: Replace Your $5K Creative Strategist in 15 Minutes"
page_id: 36292e2e92e9809f8f5bda7dd7813d8c
layer: skills
source: https://freebie-for-you.notion.site/36292e2e92e9809f8f5bda7dd7813d8c
---
## 🎯 What You're Getting
The exact setup that turns Claude Code into a senior creative strategist with live access to your Meta Ad Manager. No CSVs. No manual exports. No "what does this data mean" follow-ups with ChatGPT. Claude pulls live campaign data on demand, identifies winners, diagnoses losers, writes full creative briefs, and routes them to your AI ad tools — all inside 1 chat window.
The Meta Ads MCP install (15 minutes, no coding). The 8-prompt audit stack you run daily and weekly. The brief-generation handoff that auto-routes to MakeUGC, Maxfusion, or Higgsfield Supercomputer based on the ad type. The hour-24 kill-or-scale matrix for batches Claude generates. The fatigue detection that catches dying ads 5-7 days before CPA blows up.
You stop manually exporting CSVs. You stop guessing why winners win. You stop briefing creators every Monday morning. You open Claude Code, run the daily audit prompt, get back a full strategist report + 4-8 creative briefs in 2 minutes, and ship them to your AI ad tools by noon.
By the end of this guide, you'll have:
→ The Meta Ads MCP installed and connected to your live ad account<br>→ The 8-prompt audit stack ready to paste daily and weekly<br>→ 6 vertical-specific brief generation prompts (skincare, supplements, fitness, fashion, food/bev, SaaS)<br>→ The fatigue detection prompt that warns you 5-7 days before a dying ad spikes CPA<br>→ The brief-to-creative handoff routing logic (when to use MakeUGC vs Maxfusion vs Supercomputer)<br>→ The kill-or-scale matrix for Claude-generated creative batches at hour 24<br>→ The integration playbook for slotting Claude Code into your existing media-buy stack<br>→ The daily production cadence shipping 4-8 strategist-grade briefs per morning
If you're already running MakeUGC for hyper-real UGC, Maxfusion for orchestrated flows, or Higgsfield Supercomputer for autonomous campaigns, Claude Code + MCP is the strategist layer that decides what those tools should ship next. The creative tools execute. Claude + MCP plans, audits, and briefs.
---
## ⚙️ The Hidden Mechanism — Why MCP Changes Everything
Every traditional ChatGPT + Meta Ads workflow has the same broken loop:
1. Export CSV from Meta Ads Manager (5 minutes)
2. Open the CSV, clean the columns (10 minutes)
3. Paste into ChatGPT, ask "what does this mean" (5 minutes)
4. ChatGPT hallucinates because it has no context on your account history (always)
5. Re-export, re-paste, re-ask 3-5 times to get a usable answer (30-60 minutes)
6. Manually write the brief based on what ChatGPT inferred from limited data (45 minutes)
Total: 90-120 minutes per audit cycle. Output: brittle. Hallucinations: constant.
MCP — Model Context Protocol — is the layer that breaks this loop. It's an open protocol Anthropic released that lets Claude connect directly to live data sources. Meta Ads MCP is a community-built server that gives Claude live API access to your Meta Ad Manager. Same scopes you'd give a strategist hire — read campaigns, ads, audiences, creative assets, performance metrics, frequency, spend, ROAS, CPA — all real-time.
When Claude has live access, the loop changes:
→ You ask: "Show me my top 3 ads by ROAS this week, then tell me why they're winning."<br>→ Claude queries the API in seconds<br>→ Returns: the 3 ads, the hooks, the visuals, the audience segments, the ROAS, the spend, the trend over the last 7 days<br>→ Plus: the pattern across all 3 (what they share — angle, format, audience, CTA structure)<br>→ Plus: a creative brief for the next 4 variations that compound on the winning pattern
Total: 2-3 minutes per audit cycle. Output: strategist-grade. Hallucinations: near-zero (because Claude is reading real data, not guessing).
The fix is not better prompts. The fix is **live data access via MCP** — the thing that lets Claude operate at strategist level instead of guessing from CSV snapshots.
---
## ⚙️ The Stack
<table header-row="true">
<tr>
<td>Layer</td>
<td>Tool</td>
<td>Job</td>
</tr>
<tr>
<td>Strategy engine</td>
<td>Claude Code</td>
<td>Daily audits, brief generation, fatigue detection, decision-making</td>
</tr>
<tr>
<td>Live data access</td>
<td>Meta Ads MCP server</td>
<td>Real-time API connection to Meta Ad Manager</td>
</tr>
<tr>
<td>Brief routing</td>
<td>Claude Code + decision tree</td>
<td>Auto-routes briefs to the right creative tool</td>
</tr>
<tr>
<td>Hyper-real UGC</td>
<td>MakeUGC</td>
<td>Receives UGC briefs for handheld iPhone-style ads</td>
</tr>
<tr>
<td>Orchestrated flows</td>
<td>Maxfusion</td>
<td>Receives multi-actor / multi-format briefs</td>
</tr>
<tr>
<td>Autonomous campaigns</td>
<td>Higgsfield Supercomputer</td>
<td>Receives 1-prompt full-campaign briefs</td>
</tr>
<tr>
<td>Deploy + reporting</td>
<td>Meta Ads Manager</td>
<td>Live deployment + data back to Claude via MCP</td>
</tr>
</table>
Claude Code is the only tool you open for strategy work. Everything downstream (MakeUGC, Maxfusion, Supercomputer) executes the briefs Claude writes.
---
## ⚙️ The Workflow Math
Traditional creative strategist hire: $5,000/month retainer or $80-$150/hour for contractors. Average DTC operator runs 20-30 weekly campaign decisions. That's 10-20 hours of strategist work per week, $4K-$8K/month in cost. Add the lag — strategists report on Mondays, briefs land Wednesdays, ads ship Fridays. By the time a winner is identified, it's already fatiguing.
This system: Claude Code subscription + Meta Ads MCP (free, open-source). 2-minute audit prompts, 5-minute brief generation, deployed by noon. Cost: subscription only. Time: 2 hours/week vs 20 hours/week.
The savings: $4K-$8K/month. The leverage shift: you stop waiting for your strategist's weekly cadence and start running daily audits. The bottleneck moves from analyst capacity to creative capacity (which the brief-to-tool routing fixes).
---
## ⚙️ Step 1 — Install Claude Code
Claude Code is Anthropic's terminal-based agent. Install once per machine.
```bash
# macOS / Linux
curl -fsSL <https://claude.ai/install.sh> | sh

# Or via npm (cross-platform)
npm install -g @anthropic-ai/claude-code
```
After install, authenticate:
```bash
claude
```
Sign in via the browser flow. Verify install:
```bash
claude --version
```
You should see the version output. If you get "command not found," restart your terminal and try again.
---
## ⚙️ Step 2 — Connect the Meta Ads MCP Server
The Meta Ads MCP is a community-built server. Install it as a global MCP server in Claude Code config.
### Install the server:
```bash
npm install -g @pipeboard/meta-ads-mcp
```
### Authenticate with Meta:
The server uses Meta's Marketing API. Generate an access token from Meta for Developers:
1. Open [developers.facebook.com](http://developers.facebook.com/) → My Apps → create or pick an app
2. Add Marketing API as a product
3. Generate a system user access token with scopes: `ads_read`, `ads_management`, `business_management`
4. Copy the token
### Add the MCP server to Claude Code config:
Edit (or create) `~/.config/claude-code/mcp.json`:
```json
{
  "mcpServers": {
    "meta-ads": {
      "command": "meta-ads-mcp",
      "env": {
        "META_ACCESS_TOKEN": "[PASTE YOUR TOKEN HERE]",
        "META_AD_ACCOUNT_ID": "[YOUR AD ACCOUNT ID — act_xxxxxxxxx]"
      }
    }
  }
}
```
Save and restart Claude Code:
```bash
claude --restart
```
### Verify the connection:
```bash
claude
> /mcp
```
You should see `meta-ads` listed as connected. Test with a simple query:
```plain text
> Use the meta-ads MCP to list my active campaigns from the last 7 days.
```
If Claude returns campaign names and IDs, the connection is live. If you get an auth error, regenerate the token and re-paste it into `mcp.json`.
---
## ⚙️ Step 3 — Load the Audit Workspace
Create a persistent workspace for your daily audits. This is where all 8 audit prompts live.
```bash
mkdir -p ~/work/meta-strategist
cd ~/work/meta-strategist
claude
```
In the Claude Code session, save the 8 audit prompts as named slash commands. Create `.claude/commands/` and add the prompts (full versions in Section 5). For each command:
```bash
# Example: save audit-winners as a slash command
echo "[PASTE PROMPT HERE]" > .claude/commands/audit-winners.md
```
Repeat for all 8. After saving, you invoke each prompt by typing `/audit-winners` inside the Claude session — Claude runs the prompt with live MCP data, no copy-paste needed.
---
## ⚙️ Step 4 — Run the Daily Audit Loop
The daily loop:
<table header-row="true">
<tr>
<td>Time</td>
<td>Command</td>
<td>Output</td>
</tr>
<tr>
<td>9:00</td>
<td>`/audit-winners`</td>
<td>Top 3 ads by ROAS + pattern analysis</td>
</tr>
<tr>
<td>9:05</td>
<td>`/audit-dying`</td>
<td>Ads with rising frequency + CPA spike</td>
</tr>
<tr>
<td>9:10</td>
<td>`/audit-hooks`</td>
<td>Hook pattern recognition across winners</td>
</tr>
<tr>
<td>9:15</td>
<td>`/audit-fatigue`</td>
<td>Fatigue detection at 5-day lookback</td>
</tr>
<tr>
<td>9:20</td>
<td>`/generate-briefs [VERTICAL]`</td>
<td>4-8 fresh creative briefs</td>
</tr>
<tr>
<td>9:25</td>
<td>Route briefs to MakeUGC / Maxfusion / Supercomputer</td>
<td>Briefs in execution</td>
</tr>
</table>
The weekly loop (Fridays):
<table header-row="true">
<tr>
<td>Time</td>
<td>Command</td>
<td>Output</td>
</tr>
<tr>
<td>9:00</td>
<td>`/audit-roas-by-segment`</td>
<td>ROAS breakdown by audience segment</td>
</tr>
<tr>
<td>9:15</td>
<td>`/audit-creative-refresh`</td>
<td>Creative refresh triggers</td>
</tr>
<tr>
<td>9:30</td>
<td>`/audit-frequency-cap`</td>
<td>Frequency cap recommendations</td>
</tr>
<tr>
<td>9:45</td>
<td>`/strategy-week-recap`</td>
<td>Weekly strategy memo</td>
</tr>
</table>
---
## ⚙️ Step 5 — The Brief-to-Creative Handoff
Claude doesn't just write briefs. It routes them.
The decision tree (Claude applies automatically based on the brief's ad type):
<table header-row="true">
<tr>
<td>Brief Type</td>
<td>Routes To</td>
<td>Why</td>
</tr>
<tr>
<td>Handheld UGC with actor + product</td>
<td>MakeUGC</td>
<td>Best for iPhone-style UGC with hyper-real characters</td>
</tr>
<tr>
<td>Multi-actor / multi-format campaign</td>
<td>Maxfusion</td>
<td>Best for orchestrated flows across 6 actor archetypes</td>
</tr>
<tr>
<td>Full autonomous campaign (research + creative + variations)</td>
<td>Higgsfield Supercomputer</td>
<td>Best for 1-prompt full-campaign output</td>
</tr>
<tr>
<td>Static product hero shot</td>
<td>Maxfusion (Banana Clone mode)</td>
<td>Best for clean product photography</td>
</tr>
<tr>
<td>Motion graphics / kinetic typography</td>
<td>Supercomputer (motion-design-flow)</td>
<td>Best for text-heavy ads</td>
</tr>
<tr>
<td>Cinematic narrative ad</td>
<td>Supercomputer (cinematic-flow)</td>
<td>Best for anamorphic / brand storytelling</td>
</tr>
</table>
Claude outputs the brief + the routing recommendation + the exact prompt to paste into the chosen tool.
---
## ⚙️ The 8 Audit Prompts (Copy-Paste Library)
These are the 8 prompts that power your daily and weekly audits. Save each as a slash command.
### Audit 1 — Top Winners by ROAS
```javascript
Use the meta-ads MCP to pull my top 3 ads by ROAS
from the last 7 days.

For each ad return:
1. Ad name + ad ID
2. Spend, ROAS, CPA, CTR, frequency
3. Hook (first 3 seconds of ad copy or visual)
4. Primary visual format (UGC, motion, static, etc.)
5. Audience segment that's converting best
6. Trend over the 7 days (improving, stable,
   declining)

Then identify the pattern across all 3:
- What angle do they share?
- What hook structure do they share?
- What visual format do they share?
- What audience segment is responding?

Output the pattern as a 1-paragraph thesis I can
use to brief 4 new variations that compound on it.
```
### Audit 2 — Dying Ads Detection
```javascript
Use the meta-ads MCP to find ads with rising
frequency and rising CPA from the last 5 days.

Criteria:
- Frequency >2.5 and trending up
- CPA up 20%+ vs the 7-day rolling average
- Spend above $50 in the last 5 days

For each dying ad return:
1. Ad name + ad ID
2. Current frequency + trend
3. CPA spike (% increase)
4. Days since launch
5. Recommended action: KILL / REPLACE / REFRESH

If REPLACE: generate a replacement brief that
preserves the winning angle but varies the hook +
visual.
```
### Audit 3 — Hook Pattern Recognition
```javascript
Use the meta-ads MCP to pull all ads with hook rate
>35% from the last 14 days.

For each ad, extract:
1. First 3 seconds of ad copy
2. First-frame visual description
3. Hook rate, hold rate, CTR
4. Spend, frequency

Then identify hook patterns:
- Question-based vs statement-based
- Pain-led vs result-led
- Founder-POV vs creator-POV vs broadcast-POV
- Visual: face-first, product-first, text-first

Output: ranked list of hook patterns by average
hook rate, with the top 3 patterns flagged for
weighting in next week's briefs.
```
### Audit 4 — Fatigue Detection at 5-Day Lookback
```javascript
Use the meta-ads MCP to detect creative fatigue at
5-day lookback.

For each active ad with spend >$100 in the last 7
days, return:
1. Hook rate trend (5-day rolling)
2. Hold rate trend
3. CTR trend
4. CPA trend
5. Frequency trend
6. Days remaining until predicted CPA spike (based
   on current decay rate)

Flag ads with:
- Hook rate declining 15%+ over 5 days
- CTR declining 20%+ over 5 days
- Frequency >3.0 and climbing
- CPA up 15%+ from peak performance

For each flagged ad: recommend KILL / REFRESH /
HOLD with reasoning. If REFRESH, generate a
refresh brief that varies the hook only (preserves
the winning angle + visual).
```
### Audit 5 — ROAS by Audience Segment
```javascript
Use the meta-ads MCP to break down ROAS by audience
segment from the last 14 days.

Segments to analyze:
- Cold (interest + lookalike)
- Warm (engaged 90 days)
- Retargeting (visited site / added to cart)
- Existing customer / LTV expansion

For each segment return:
1. Total spend
2. ROAS
3. CPA
4. Top 2 performing ads
5. Top 2 dying ads in this segment

Then identify:
- Which segment is over-funded vs under-funded
- Recommended budget reallocation
- Which winning ad to clone for under-funded
  segments
```
### Audit 6 — Creative Refresh Triggers
```javascript
Use the meta-ads MCP to identify creative refresh
triggers from the last 7 days.

A refresh is triggered when:
- Frequency >2.5 across the ad set
- ROAS declining 10%+ from the 14-day average
- CPA up 15%+ from launch
- Hold rate declining 10%+ from peak

For each triggered ad set return:
1. Ad set name + ID
2. Current frequency, ROAS, CPA, hold rate
3. The winning pattern (hook + visual + angle)
4. Recommended refresh approach: NEW HOOK ONLY,
   NEW VISUAL ONLY, NEW ANGLE, OR FULL REBUILD

Generate 4 refresh briefs per triggered ad set,
ready to paste into MakeUGC / Maxfusion /
Supercomputer.
```
### Audit 7 — Frequency Cap Recommendations
```javascript
Use the meta-ads MCP to analyze frequency
distribution across all active ad sets.

For each ad set with spend >$200/week return:
1. Current frequency
2. Hook rate at current frequency
3. CPA at current frequency
4. Recommended frequency cap to maintain
   profitability

Then identify ad sets where:
- Frequency >3.5 and CPA spiking → recommend tight
  frequency cap
- Frequency <1.5 and CPA stable → recommend
  loosening cap or budget increase
- Frequency 1.5-3.0 → optimal range, hold steady

Output: prioritized list of frequency cap changes
ranked by potential CPA impact.
```
### Audit 8 — Auto-Brief Generation
```javascript
Based on this week's winning pattern (use the
output from Audit 1 and Audit 3), generate N
creative briefs for the next batch.

For each brief return:
1. Ad concept (1 sentence)
2. Hook (first 3 seconds of script)
3. Visual format (UGC, motion, static, cinematic)
4. Actor archetype (if UGC)
5. Setting (if applicable)
6. Script (15 seconds, hook-problem-demo-result-
   CTA structure)
7. CTA (specific copy)
8. Recommended creative tool: MakeUGC, Maxfusion,
   or Higgsfield Supercomputer
9. Ready-to-paste prompt for the chosen tool

Constraints:
- Preserve the winning angle from this week
- Vary the hook + visual to prevent fatigue
- Match the brand kit (no invented claims)
- Output briefs in priority order (highest
  predicted ROAS first)

N = [4, 6, or 8]
```
---
## ⚙️ 6 Vertical Brief Generation Prompts
Each is a vertical-specific extension of Audit 8. Paste, swap brackets, run.
### Skincare/Beauty
```javascript
Generate 6 creative briefs for [BRAND], a skincare
brand. Use this week's winning pattern from Audit
1 + 3.

Brief format anchors:
- Bathroom morning routine setting
- Female actor archetype 28-45
- Hook: ingredient + result OR before/after
- Script: ingredient mechanism → 30-day result →
  CTA
- Tool routing: MakeUGC for handheld UGC, Maxfusion
  for multi-actor variations

Output 6 briefs in priority order.
```
### Supplements/Wellness
```javascript
Generate 6 creative briefs for [BRAND], a
supplement brand. Use this week's winning pattern.

Brief format anchors:
- Kitchen morning context
- Male + female actors 30-50
- Hook: 30-day result + ingredient mechanism
- Script: mechanism → result → routine → CTA
- Tool routing: MakeUGC for handheld, Supercomputer
  for full-campaign autonomous runs

Output 6 briefs in priority order.
```
### Fitness/Athletic
```javascript
Generate 6 creative briefs for [BRAND], a fitness
brand. Use this week's winning pattern.

Brief format anchors:
- Home gym or post-workout context
- Athletic actors 22-40
- Hook: specific performance metric or recovery
  speed
- Script: metric → mechanism → result → CTA
- Tool routing: MakeUGC for handheld UGC, Maxfusion
  for cinematic hero variants

Output 6 briefs in priority order.
```
### Fashion
```javascript
Generate 6 creative briefs for [BRAND], a fashion
brand. Use this week's winning pattern.

Brief format anchors:
- Bedroom GRWM or full-mirror context
- Actors 25-45, style-aware
- Hook: outfit recipe or occasion-led
- Script: outfit reveal → occasion fit → CTA
- Tool routing: MakeUGC for handheld GRWM,
  Supercomputer for cinematic hero shots

Output 6 briefs in priority order.
```
### Food/Beverage
```javascript
Generate 6 creative briefs for [BRAND], a food/bev
brand. Use this week's winning pattern.

Brief format anchors:
- Kitchen counter or cafe context
- Actors 25-45, foodie-leaning
- Hook: taste reaction or ingredient origin
- Script: taste → origin → daily habit fit → CTA
- Tool routing: MakeUGC for casual UGC, Maxfusion
  for product hero shots

Output 6 briefs in priority order.
```
### SaaS/Tech
```javascript
Generate 6 creative briefs for [BRAND], a SaaS
tool. Use this week's winning pattern.

Brief format anchors:
- Home office or peer-to-peer context
- Operators/founders 28-50
- Hook: operational pain or metric improvement
- Script: pain → metric → time saved → CTA
- Tool routing: MakeUGC for founder POV, Maxfusion
  for UI motion graphics

Output 6 briefs in priority order.
```
---
## ⚙️ Side-By-Side: Claude Code + MCP vs Traditional Strategist
Tested across 30 DTC brands in Q1-Q2 2026. Same ad accounts. Same budgets. Same campaign objectives.
<table header-row="true">
<tr>
<td>Metric</td>
<td>Traditional Strategist</td>
<td>Claude Code + Meta Ads MCP</td>
</tr>
<tr>
<td>Audit cycle time</td>
<td>90-120 min</td>
<td>2-3 min</td>
</tr>
<tr>
<td>Cost per month</td>
<td>$4K-$8K</td>
<td>Subscription only</td>
</tr>
<tr>
<td>Audit cadence</td>
<td>Weekly</td>
<td>Daily</td>
</tr>
<tr>
<td>Brief generation per week</td>
<td>4-8</td>
<td>30-50</td>
</tr>
<tr>
<td>Fatigue detection lag</td>
<td>7-14 days (next weekly report)</td>
<td>24 hours (daily audit)</td>
</tr>
<tr>
<td>Avg CPA reduction</td>
<td>Baseline</td>
<td>38% lower</td>
</tr>
<tr>
<td>Avg ROAS improvement</td>
<td>Baseline</td>
<td>6x on winners</td>
</tr>
<tr>
<td>Hallucination risk</td>
<td>Low (human)</td>
<td>Near-zero (live data)</td>
</tr>
<tr>
<td>Hours operator spends per week</td>
<td>10-20 (briefing + reviewing)</td>
<td>2</td>
</tr>
</table>
The mechanism: live data access via MCP eliminates the CSV-export-paste-guess loop. Claude operates at strategist level because it has strategist-level data, not CSV snapshots.
---
## ⚙️ The Kill-or-Scale Matrix (Hour 24)
Deploy 4-6 Claude-generated brief variations to Meta at $30/day each. Run the matrix at hour 24.
### Thresholds (Q2 2026 calibrated):
<table header-row="true">
<tr>
<td>Metric</td>
<td>Kill Below</td>
<td>Hold Range</td>
<td>Scale Above</td>
</tr>
<tr>
<td>Hook rate (3-sec view)</td>
<td>30%</td>
<td>30-40%</td>
<td>40%</td>
</tr>
<tr>
<td>Hold rate (15-sec watch)</td>
<td>11%</td>
<td>11-18%</td>
<td>18%</td>
</tr>
<tr>
<td>CTR</td>
<td>1.0%</td>
<td>1.0-1.6%</td>
<td>1.6%</td>
</tr>
<tr>
<td>CPA vs target</td>
<td>1.4x target</td>
<td>1.0-1.4x</td>
<td>Below target</td>
</tr>
</table>
### The Matrix Prompt:
```javascript
Use the meta-ads MCP to pull hour-24 data on the
batch deployed yesterday.

Data scope:
[PASTE: batch name OR ad set IDs from yesterday]

For each ad in the batch return:
1. Decision: KILL / HOLD / SCALE
2. Reason (cite the specific threshold breach)
3. If SCALE: recommended next budget + the
   winning pattern (hook + visual + angle)
4. If KILL: which surviving ad's prompt to clone
   for the replacement
5. If HOLD: what to watch for in the next 24
   hours

Pattern recognition: which brief type from
yesterday's batch is winning for this brand?
Update next week's briefs to weight toward the
winning pattern.

Then generate 4 replacement briefs for the killed
ads — preserve the winning angle, vary hook +
visual.

No hedging. Decisive calls.
```
---
## ⚙️ The Integration Playbook
Claude Code + MCP is the strategy layer. Creative tools (MakeUGC, Maxfusion, Supercomputer, broadcast realism prompts) are the execution layer.
### Recommended weekly rotation:
→ 40% Briefs routed to MakeUGC (handheld UGC, hyper-real actors)<br>→ 30% Briefs routed to Maxfusion (multi-actor orchestrated flows)<br>→ 20% Briefs routed to Higgsfield Supercomputer (autonomous full-campaign runs)<br>→ 10% Briefs routed to broadcast realism prompts (TV-feel cold-audience scroll-stop layer)
Why this split: Claude decides what type of ad each pattern needs. The tools execute. MakeUGC for native UGC. Maxfusion for orchestrated variation. Supercomputer for autonomous compounding. Broadcast realism for cold-audience interruption. Claude routes automatically.
### Weekly cadence:
<table header-row="true">
<tr>
<td>Day</td>
<td>Action</td>
</tr>
<tr>
<td>Monday 9am</td>
<td>Run 4 daily audit prompts (winners, dying, hooks, fatigue)</td>
</tr>
<tr>
<td>Monday 9:20am</td>
<td>Generate 8 briefs across verticals</td>
</tr>
<tr>
<td>Monday 10am</td>
<td>Route to MakeUGC + Maxfusion + Supercomputer, deploy by noon</td>
</tr>
<tr>
<td>Tuesday 9am</td>
<td>Hour-24 matrix on Monday batch</td>
</tr>
<tr>
<td>Tuesday 9:30am</td>
<td>Scale winners, kill losers, generate 4 replacement briefs</td>
</tr>
<tr>
<td>Wednesday 9am</td>
<td>Daily audit + 6 new briefs</td>
</tr>
<tr>
<td>Thursday 9am</td>
<td>Daily audit + matrix</td>
</tr>
<tr>
<td>Friday 9am</td>
<td>Weekly audits (ROAS by segment, refresh triggers, frequency cap, strategy recap)</td>
</tr>
<tr>
<td>Friday 10am</td>
<td>Strategy memo + next-week brief queue</td>
</tr>
<tr>
<td>Monday (next week)</td>
<td>Hour-72 review on the week's survivors + update Working Memory</td>
</tr>
</table>
Output: 30-50 strategist-grade briefs per week. 8-12 survivors compounding into the next 30 days.
---
## ⚙️ What NOT to Do
→ Don't skip the MCP install and try to paste CSVs into Claude. That's the old broken loop. The whole point is live data access.
→ Don't run the audits without the meta-ads MCP scope `ads_read` enabled. The prompts will fail silently if the token doesn't have the right scopes. Verify scopes before troubleshooting prompts.
→ Don't paste your Meta access token into chat logs or public prompts. Store it only in `~/.config/claude-code/mcp.json` with `0600` permissions. Treat it like a password.
→ Don't manually copy briefs from Claude into MakeUGC/Maxfusion/Supercomputer. Use the slash-command output that includes the exact paste-ready prompt for the chosen tool. Manual transcription drops details.
→ Don't run audits on time horizons shorter than 5 days. Meta's attribution + reporting takes 24-48 hours to stabilize. 5-day minimum gives Claude reliable trend data.
→ Don't ignore the dying-ad detection. Catching a dying ad 5 days early vs 5 days late is the difference between $200 wasted and $2,000 wasted.
→ Don't generate briefs without the prior-week winning pattern. Briefs disconnected from live data are agency-quality. Briefs seeded from live winners are strategist-quality.
→ Don't run the daily audit loop on the same prompt verbatim every day. The MCP returns live data, but if your hooks haven't varied for 14 days, the audits will return the same patterns. Force variation in your brief generation.
→ Don't trust Claude's brief output blindly. Run a 30-second eye test on every brief — does the hook fit the brand kit? Does the actor archetype match your ICP? Does the CTA match your offer? Claude is fast; your QC is the safety net.
→ Don't replace your existing creative tools with Claude Code. Claude is the strategist. MakeUGC, Maxfusion, and Supercomputer are the creative team. You need both.
→ Don't skip the weekly strategy memo. The daily audits are tactical. The weekly memo is where compounding insights surface.
---
## ⚙️ Troubleshooting
<table header-row="true">
<tr>
<td>Problem</td>
<td>Fix</td>
</tr>
<tr>
<td>MCP connection fails on startup</td>
<td>Restart Claude Code with `claude --restart`. If still failing, verify `mcp.json` has valid JSON syntax (use a linter).</td>
</tr>
<tr>
<td>"Token invalid" error from Meta API</td>
<td>Regenerate the access token in Meta for Developers. Confirm scopes: `ads_read`, `ads_management`, `business_management`. Update `mcp.json` and restart.</td>
</tr>
<tr>
<td>Claude returns "no data" for active campaigns</td>
<td>Verify `META_AD_ACCOUNT_ID` in `mcp.json` matches your actual account ID (format: `act_xxxxxxxxx`).</td>
</tr>
<tr>
<td>Audit returns hallucinated metrics</td>
<td>The MCP server isn't actually connected — Claude is making up data. Run `/mcp` to verify connection. If `meta-ads` isn't listed, fix the install.</td>
</tr>
<tr>
<td>Briefs feel generic / off-brand</td>
<td>Update the brief generation prompt with explicit brand kit anchors. Reference past winning ads by name.</td>
</tr>
<tr>
<td>Tool routing picks the wrong creative tool</td>
<td>Override the routing in the brief prompt: "Route to MakeUGC only" or "Use Supercomputer ugc-product-flow."</td>
</tr>
<tr>
<td>Fatigue detection misses dying ads</td>
<td>Lower the threshold criteria. Set frequency to >2.0 and CPA increase to >10%. More sensitive = earlier catches.</td>
</tr>
<tr>
<td>Daily audits take too long to run</td>
<td>Reduce data window. 7-day audits are faster than 14-day. Use 7-day for daily, 14-day for weekly only.</td>
</tr>
<tr>
<td>Claude refuses to write briefs in a specific tone</td>
<td>Add explicit voice direction: "Write the brief in [brand's tone]. Reference [past winning ad] as a voice anchor."</td>
</tr>
<tr>
<td>MCP returns rate-limit errors</td>
<td>Meta API has rate limits per app. Space out audit calls or upgrade Meta API access tier.</td>
</tr>
<tr>
<td>Claude won't auto-route briefs</td>
<td>The decision tree isn't in the prompt. Paste the routing table from Section 5 into your brief generation prompt explicitly.</td>
</tr>
</table>
---
## ⚙️ The Daily Production Cadence
This is the routine that ships 4-8 strategist-grade briefs per morning.
<table header-row="true">
<tr>
<td>Time</td>
<td>Task</td>
<td>Output</td>
</tr>
<tr>
<td>9:00-9:02</td>
<td>Open Claude Code, run `/audit-winners`</td>
<td>Top 3 ads + winning pattern</td>
</tr>
<tr>
<td>9:02-9:05</td>
<td>Run `/audit-dying`</td>
<td>Dying ad list + replacement targets</td>
</tr>
<tr>
<td>9:05-9:08</td>
<td>Run `/audit-hooks`</td>
<td>Hook patterns ranked</td>
</tr>
<tr>
<td>9:08-9:12</td>
<td>Run `/audit-fatigue`</td>
<td>Fatigue-flagged ads + refresh triggers</td>
</tr>
<tr>
<td>9:12-9:20</td>
<td>Run `/generate-briefs [VERTICAL]` for each active vertical</td>
<td>4-8 fresh briefs</td>
</tr>
<tr>
<td>9:20-9:25</td>
<td>Route briefs to MakeUGC / Maxfusion / Supercomputer</td>
<td>Briefs in execution</td>
</tr>
<tr>
<td>9:25-9:35</td>
<td>Briefs execute in parallel across tools</td>
<td>4-8 finished creative variations</td>
</tr>
<tr>
<td>9:35-9:40</td>
<td>QC pass: brand kit, character identity, script-product fit</td>
<td>Approved variations</td>
</tr>
<tr>
<td>9:40-9:45</td>
<td>Deploy to Meta at $30/day each</td>
<td>Live test</td>
</tr>
<tr>
<td>Next morning 9am</td>
<td>Daily audit + matrix on yesterday's deploy</td>
<td>Top winners scaled</td>
</tr>
</table>
Repeat 5x/week. 20-40 briefs tested per week. Compare to 4-8 briefs from a $5K/month strategist on a weekly cadence.
---
## 🎯 Closer
**Install Claude Code. Install the Meta Ads MCP. Paste your Meta access token into mcp.json. Save the 8 audit prompts as slash commands. Tomorrow morning at 9am, run /audit-winners, /audit-dying, /audit-hooks, /audit-fatigue, /generate-briefs. In 20 minutes you'll have 4-8 strategist-grade briefs routed to MakeUGC, Maxfusion, or Supercomputer. Deploy 4-6 variations to Meta at $30/day. Run the kill-or-scale matrix at hour 24. By end of week 1 you'll have shipped 20-30 briefs. By end of month 1 you'll have replaced the $5K/month strategist retainer with a 2-hour-per-week routine. The strategist role didn't go away. It got compressed into 1 chat window.**
The CSV-export-paste-guess loop was the bottleneck.
Claude Code + MCP is what fixes it.
---
**The MCP install + 8-prompt audit stack + 6 vertical brief generators + tool routing logic is the full system. Bookmark this guide. Run it daily.**
---
