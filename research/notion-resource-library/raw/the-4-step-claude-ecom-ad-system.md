---
title: "The 4-Step Claude Ecom Ad System"
page_id: 38092e2e92e980dc90e6c7ee85260737
layer: production
source: https://freebie-for-you.notion.site/38092e2e92e980dc90e6c7ee85260737
---
# The 4-Step Claude Ecom Ad System: Find Winners → Brief Creatives → Test Fast → Scale Behind Winners
---
## 🎯 What You're Getting
The exact 4-step Claude workflow that compresses the ecom ad strategy cycle into a single chat. Find products already working in your category. Spin up 5-10 AI UGC briefs per concept. Test angles fast across Meta + TikTok. Scale ads behind the winners. No 5-tool tab-switching. No multi-platform context loss. No 2-week strategy cycles. Just 1 Claude Skill that runs the full loop.
The master Claude Skill system prompt (paste-ready into a Claude Project). The competitor research prompt that surfaces winning products from Meta Ads Library. The angle generation prompt that produces 5-10 AI UGC concept variations per product. The kill-or-scale matrix prompt for hour-24 decisions. 6 vertical templates calibrated for skincare, supplements, beauty devices, fitness apparel, food/bev, and premium tech.
You stop bouncing between Higgsfield, MakeUGC, Maxfusion, your spreadsheet, and Meta Ads Manager. You install the Skill once. You brief the product. Claude runs steps 1-4 with approval gates between. You hand the winning briefs to your creative tools downstream. Ship.
By the end of this guide, you'll have:
→ The master Claude Skill system prompt (full 4-step orchestration)<br>→ The competitor research prompt for surfacing working ecom products<br>→ The angle generation prompt for producing 5-10 AI UGC concepts per product<br>→ The kill-or-scale matrix prompt for hour-24 winner detection<br>→ The tool routing decision tree (where briefs go after Claude)<br>→ 6 vertical-specific Claude Project configurations<br>→ The compounding memory loop (winners update next week's research weights)<br>→ The daily/weekly production cadence
If you're already running the 51-second UGC playbook, the Lovart Storyboard Skill, or the Higgsfield MCP + Claude orchestrator, this is the **strategy layer** that sits upstream of all of them. The strategy runs in Claude. The execution runs in your existing creative tools.
---
## ⚙️ The Hidden Mechanism — Why a 4-Step Claude Loop Beats Tool-Stack Complexity
Every standard ecom ad workflow has the same broken loop:
1. Operator opens Meta Ads Library in 1 tab, scrolls 50 competitor ads, takes notes in Notion
2. Opens ChatGPT in another tab, pastes notes, asks for angle ideas
3. Opens MakeUGC or Higgsfield in another tab, generates briefs from those angles
4. Opens spreadsheet to track variations + budgets
5. Opens Meta Ads Manager to deploy
6. Each handoff loses brief context
5 tools. 2-3 days from research to deploy. Brief context degrades at every handoff.
The Claude 4-step Skill fix is structural: every step runs in 1 chat, with project memory holding context across the loop. Step 4's data updates the project memory, which weights Step 1 of the next loop.
→ Step 1 (Research) — Claude pulls competitor patterns + identifies products already working<br>→ Step 2 (Brief) — Claude generates 5-10 AI UGC concept briefs per product<br>→ Step 3 (Test) — Operator routes briefs to creative tools, deploys to Meta + TikTok<br>→ Step 4 (Scale) — Claude runs the kill-or-scale matrix at hour 24, updates memory with winners
Each step's output is the next step's input. Project memory compounds — week 4 outputs are smarter than week 1 because Claude has accumulated winning patterns.
The fix is not better tools. The fix is **collapsing the 4-step strategy loop into a single Claude chat with persistent memory** — the thing that lets ecom strategy run in 15 minutes vs 2 weeks.
---
## ⚙️ The Stack
<table header-row="true">
<tr>
<td>Layer</td>
<td>Tool</td>
<td>Job</td>
</tr>
<tr>
<td>Strategy + orchestration</td>
<td>Claude (with Skill installed)</td>
<td>Runs Steps 1-4 in a single chat</td>
</tr>
<tr>
<td>Persistent memory</td>
<td>Claude Project</td>
<td>Stores brand kit, ICP, competitor list, prior winners</td>
</tr>
<tr>
<td>Optional competitor research extension</td>
<td>Meta Ads MCP server</td>
<td>Auto-pulls competitor ads (vs manual paste)</td>
</tr>
<tr>
<td>Creative execution (downstream)</td>
<td>MakeUGC / Maxfusion / Higgsfield / Seedance</td>
<td>Receives briefs from Claude, generates the ads</td>
</tr>
<tr>
<td>Deploy</td>
<td>Meta Ads Manager + TikTok Ads</td>
<td>Tracks performance, feeds data back to Claude for matrix</td>
</tr>
</table>
Claude is the only tool you actively prompt. Creative tools execute briefs that Claude wrote.
---
## ⚙️ The Workflow Math
Traditional 5-tool ecom strategy cycle: 10-15 hours per week split across research, ideation, briefing, deployment coordination, and matrix analysis. $5K-$10K/month in agency or in-house strategist costs.
This system: Claude subscription + Claude Project setup once. 15-30 minutes per loop. Run 2-3x/week.
The leverage shift: you stop bouncing between tools and start running 1 Claude conversation per week. The bottleneck moves from coordination capacity to creative direction (which the 6 vertical templates fix).
---
## ⚙️ Step 1 — Install the Claude Skill
Create a Claude Project named "[Brand] Ecom Ad System." Paste the master Skill (Section 6) into Project Instructions.
Load Project Knowledge:
→ Brand kit + ICP profile<br>→ Hero claim + positioning<br>→ Top 5-10 competitor list with their Meta Ads Library URLs<br>→ Prior winning ad scripts (if available — 3-5 examples)<br>→ Brand voice samples (3-5 paragraphs of real published copy)<br>→ Available creative tools list (MakeUGC, Maxfusion, Higgsfield, etc.)
Save. The Skill activates on every chat inside the Project.
---
## ⚙️ Step 2 — Find a Product That's Already Working
Start a fresh chat. Drop the prompt:
```plain text
Run Step 1 — Research.

Find products in [VERTICAL] category running
ads 30+ days in Meta Ads Library. Surface 5
"already working" products with their winning
hook patterns + visual formats.
```
Claude pulls (or asks you to paste) competitor ad observations. Returns:
→ 5 working products in the category (brand + product + ad run length proxy)<br>→ Top 5 hook patterns appearing across the winners<br>→ Top 3 visual formats (UGC handheld / cinematic / broadcast / motion graphics)<br>→ 2-3 unexpected patterns the category typically misses
Approve. Pick 1 product concept to brief in Step 2.
If Meta Ads MCP is connected, Claude pulls automatically. Without it, paste 20-50 competitor ad observations manually.
---
## ⚙️ Step 3 — Spin Up AI UGC Creatives in 1 Chat
Drop the prompt:
```plain text
Run Step 2 — Brief.

Generate 5-10 AI UGC concept briefs for
[PRODUCT FROM STEP 1].

Each brief includes:
- Hook (first 3 seconds)
- Angle (which winning pattern it leverages)
- Visual format (UGC handheld / cinematic / etc.)
- Script structure (hook → problem → demo →
  result → CTA)
- Tool routing recommendation
```
Claude generates 5-10 briefs ranked by predicted lift (1-10 scale tied to competitor signal evidence).
Approve. Route briefs to your creative tools. For UGC handheld → MakeUGC or Arcads. For cinematic → Maxfusion or Higgsfield. For motion graphics → Lovart or Seedance direct.
Each brief comes with the paste-ready prompt for the recommended tool.
---
## ⚙️ Step 4 — Test Angles Fast
Deploy the briefs to Meta + TikTok at $30-50/day each. 6-10 briefs = $180-500/day initial test budget.
Run for 24 hours. Pull performance data (manual export from Ads Manager, or auto via Meta Ads MCP if connected).
Drop the matrix prompt (Section 10) into Claude. Claude returns KILL / HOLD / SCALE decisions per brief with reasoning.
Scale winners. Kill losers. Replace killed briefs with variations of survivors.
---
## ⚙️ Step 5 — Run Ads Behind the Winners (Compounding)
Once winners are confirmed (hour 48-72 sustained performance), Claude updates project memory with:
→ The winning product concepts<br>→ The winning hook patterns<br>→ The winning visual formats<br>→ The winning audience signals
Next week's Step 1 (Research) weights toward those winners — Claude looks for similar products + similar patterns. The system compounds.
By week 4, Claude's research output is calibrated to your specific brand's audience signal. Output beats any generic SaaS ad agent.
---
## ⚙️ The Master Claude Skill System Prompt
Paste this into your Claude Project instructions.
```javascript
You are the 4-Step Ecom Ad System for [BRAND
NAME].

Your job: run a 4-step strategy loop in a single
chat:
1. Research — find products + patterns already
   working
2. Brief — generate 5-10 AI UGC concept briefs
3. Test — recommend deploy plan + budget
   allocation
4. Scale — run kill-or-scale matrix at hour 24,
   update memory with winners

Project context (loaded once):
- Brand kit: [BRAND IDENTITY]
- ICP: [PSYCHOGRAPHICS + DEMOGRAPHICS]
- Hero claim + positioning: [BRAND POSITIONING]
- Top 5-10 competitors: [COMPETITOR LIST +
  META ADS LIBRARY URLS]
- Prior winning scripts: [3-5 EXAMPLES]
- Brand voice samples: [VOICE SAMPLES]
- Available creative tools: [LIST — MakeUGC,
  Maxfusion, Higgsfield, etc.]

Step 1 — Research:

Trigger phrase: "Run Step 1 — Research" or
"Find working products."

Task:
- Pull competitor ad observations (via Meta Ads
  MCP if connected, or operator paste)
- Filter to ads running 30+ days (spend proxy)
- Identify top 5 "working" products in the
  category
- Extract top 5 hook patterns
- Extract top 3 visual formats
- Flag 2-3 unexpected patterns

Output format:
- 5 working products with brand + product +
  run length
- Top 5 hook patterns ranked
- Top 3 visual formats ranked
- 2-3 unexpected patterns
- Recommendation for which product concept to
  brief next

Pause for operator approval before Step 2.

Step 2 — Brief:

Trigger: "Run Step 2 — Brief [PRODUCT]" or
"Generate briefs for [PRODUCT]."

Task:
- Generate 5-10 AI UGC concept briefs for the
  chosen product
- Each brief leverages 1 of the top hook
  patterns from Step 1
- Each brief includes: concept, hook, angle,
  visual direction, script structure, tool
  routing recommendation
- Rank briefs by predicted lift (1-10) tied to
  competitor signal evidence

Output format per brief:

BRIEF [N]
Concept: [1 sentence]
Hook (first 3s): [visual + dialogue]
Angle: [winning pattern from Step 1]
Visual direction: [UGC / cinematic / static /
motion graphics / broadcast]
Script structure: [hook → problem → demo →
result → CTA]
Tool routing: [MakeUGC / Maxfusion / Higgsfield
/ Seedance / Lovart]
Predicted lift: [1-10] with reasoning
Test budget: $[X]/day baseline

After all briefs, output test plan summary:
- Total test budget
- Top 2 briefs to weight toward
- Recommended deploy timeline

Pause for operator approval before Step 3.

Step 3 — Test (advisory):

Trigger: "Run Step 3 — Deploy plan."

Task:
- Confirm deploy plan with budget allocation
- Suggest deploy sequence (which briefs go to
  Meta vs TikTok)
- Set hour-24 matrix expectations

This is advisory — operator does actual
deployment in Meta Ads Manager + TikTok Ads
Manager.

Step 4 — Scale:

Trigger: "Run Step 4 — Matrix" + paste hour-24
data.

Task:
- Run kill-or-scale matrix on each deployed
  brief
- Identify winners + losers
- Recommend next-batch briefs weighted toward
  winners
- Update project memory with confirmed winning
  patterns

Output format:
- KILL / HOLD / SCALE decision per brief
- Pattern recognition: which hook patterns +
  visual formats + audience angles are winning
- Memory update: winning patterns added to
  next week's Step 1 research weights
- Next batch recommendation: 4-6 new briefs
  weighted toward winners

Loop closes. Next week's research starts from
updated memory.

Approval gates between every step. No silent
cascading.

Constraints:
- Never invent product claims not in project
  memory
- Maintain brand voice from voice samples
- Predicted lift must tie to specific
  competitor evidence
- Output briefs in operator-grade detail
  (paste-ready for creative tools)
```
---
## ⚙️ The Competitor Research Prompt
Standalone version of Step 1 — paste-ready for any Claude chat.
```javascript
Run competitor research for [BRAND] in [VERTICAL].

Input: 20-50 competitor ad observations (paste
below OR pulled via Meta Ads MCP).

[PASTE ADS OR LET MCP PULL]

Task:
1. Filter to ads running 30+ days (spend proxy)
2. Identify 5 "working" products in the category
3. Cluster hooks by structure (question,
   statement, contrast, observation)
4. Identify top 5 hook patterns by frequency
5. Identify top 3 visual formats
6. Identify 2-3 unexpected patterns

Output format:
- 5 working products: [brand, product, run
  length, hook gist]
- Top 5 hook patterns ranked by frequency
- Top 3 visual formats ranked
- 2-3 unexpected patterns the category misses
- Strategic recommendation for which combinations
  to test next

Under 800 words.
```
---
## ⚙️ The Angle Generation Prompt
Standalone version of Step 2 — produces 5-10 AI UGC concepts per product.
```javascript
Generate 5-10 AI UGC concept briefs for
[PRODUCT NAME].

Inputs from project memory:
- Top hook patterns from Research output
- ICP psychographics + brand voice samples
- Product specs + hero claim

For each brief output:

BRIEF [N]
Concept: [1 sentence]
Hook (first 3 seconds):
- Visual: [first frame description]
- Dialogue: [opening line — 8-12 words, with
  filler words]
Angle: [which winning pattern from Research]
Visual direction: [UGC handheld / cinematic /
static / motion graphics / broadcast realism /
talking head]
Script structure:
- Hook (0-3s)
- Problem / angle (3-7s)
- Demo / proof (7-12s)
- Result (12-15s)
- CTA (final)
Tool routing recommendation:
- UGC handheld → MakeUGC or Arcads
- Cinematic → Maxfusion or Higgsfield
  Production Board
- Static → 6-angle composite or premium poster
  system
- Motion graphics → Lovart or direct Seedance
Predicted lift: [1-10] tied to which competitor
signal this brief mirrors
Test budget: $30/day baseline ($50/day for
top-ranked briefs)

After all briefs, output deploy plan:
- Total test budget
- Top 2 briefs to weight toward
- Recommended Meta vs TikTok split per brief
```
---
## ⚙️ The Kill-or-Scale Matrix Prompt
Standalone version of Step 4 — paste-ready at hour 24.
```javascript
Run the kill-or-scale matrix on the deployed
brief batch.

Data (paste from Meta Ads Manager or pulled via
Meta Ads MCP):
[PASTE: brief name, predicted lift, spend, hook
rate, hold rate, CTR, CPA, ROAS]

Thresholds:
- Hook rate kill <30%, scale >40%
- Hold rate (15s) kill <11%, scale >18%
- CTR kill <1.0%, scale >1.6%
- CPA kill >1.4x target, scale below target

For each brief return:
1. Decision: KILL / HOLD / SCALE
2. Reason (cite specific threshold breach)
3. If SCALE: which pattern is winning (hook +
   visual format + angle), recommended next
   budget
4. If KILL: which surviving brief to clone for
   replacement (same angle, different hook OR
   different visual format)

Pattern recognition across the batch:
- Winning hook patterns
- Winning visual formats
- Winning audience angles

Memory update for next week's Research step:
- Confirmed winning patterns
- Patterns to deprioritize
- Audience signals to weight higher

Generate 4-6 replacement briefs for killed ads.
Each replacement preserves the winning angle,
varies hook or visual format.

No hedging. Decisive calls.
```
---
## ⚙️ 6 Vertical Templates
Each is a vertical-specific Claude Project configuration.
### Vertical 1 — Skincare / Beauty
```javascript
Project name: [BRAND] Skincare Ecom Ad System
Top competitors: [list 5 skincare competitors]
Category pain points: dryness, sensitivity,
aging, breakouts, ingredient confusion
Winning hook patterns to prioritize:
ingredient education, 30-day result, sensitive
skin testimonial, before/after
Visual format defaults: bathroom UGC, soft
window light, fingertip application
Tool routing defaults: MakeUGC primary,
6-angle composite for product pages
```
### Vertical 2 — Supplements / Wellness
```javascript
Project name: [BRAND] Supplement Ecom Ad System
Top competitors: [list 5 supplement competitors]
Category pain points: energy crash, poor sleep,
slow recovery, brain fog
Winning hook patterns: 30-day result, ingredient
mechanism, founder note, peer comparison
Visual format defaults: kitchen morning UGC,
warm wood + cream palette
Tool routing defaults: MakeUGC + Higgsfield
Supercomputer for campaigns
```
### Vertical 3 — Beauty Devices (e.g. IPL hair removal, LED masks)
```javascript
Project name: [BRAND] Beauty Device Ecom Ad System
Top competitors: [list 5 beauty device competitors]
Category pain points: razor irritation, salon
costs, expensive treatments, slow results
Winning hook patterns: at-home convenience,
$ savings vs salon, professional results,
30-day transformation
Visual format defaults: bathroom + bedroom UGC,
demo-heavy, before/after transformation
Tool routing defaults: MakeUGC for talking
head + 51-second UGC playbook for long-form
demo ads
```
### Vertical 4 — Fitness Apparel / Athletic
```javascript
Project name: [BRAND] Fitness Apparel Ecom Ad System
Top competitors: [list 5 athletic competitors]
Category pain points: poor fit, low durability,
sweat performance, style limitations
Winning hook patterns: performance metric,
specific use case (run / lift / yoga), athlete
endorsement
Visual format defaults: home gym + outdoor
athletic UGC, kinetic angles
Tool routing defaults: MakeUGC + premium
poster system for paid social
```
### Vertical 5 — Food / Beverage
```javascript
Project name: [BRAND] Food/Bev Ecom Ad System
Top competitors: [list 5 food/bev competitors]
Category pain points: taste fatigue, health
concerns, daily ritual gaps
Winning hook patterns: taste reaction,
ingredient origin, craft story, daily ritual
Visual format defaults: kitchen counter UGC,
golden hour amber, mid-sip framing
Tool routing defaults: MakeUGC + Lovart
storyboard cinematic for brand pieces
```
### Vertical 6 — Premium Tech / SaaS Hardware
```javascript
Project name: [BRAND] Premium Tech Ecom Ad System
Top competitors: [list 5 tech competitors]
Category pain points: setup friction, premium
price doubt, brand recognition gaps
Winning hook patterns: operator pain, time
saved, comparison vs alternatives, founder
story
Visual format defaults: home office founder POV
+ premium product hero shots
Tool routing defaults: MakeUGC for founder POV
+ premium poster system for product page hero
```
---
## ⚙️ The Tool Routing Decision Tree
After Step 2 outputs briefs, route each brief to the right creative tool:
<table header-row="true">
<tr>
<td>Brief Type</td>
<td>Tool</td>
<td>Why</td>
</tr>
<tr>
<td>Handheld UGC with talking head</td>
<td>MakeUGC or Arcads</td>
<td>Native iPhone aesthetic, hyper-real character</td>
</tr>
<tr>
<td>Cinematic product hero</td>
<td>Lovart Storyboard Skill + Seedance</td>
<td>Fast cinematic from product photo</td>
</tr>
<tr>
<td>15-frame premium cinematic</td>
<td>Higgsfield Pitch Deck system</td>
<td>Premium 6-section UI scaffolding</td>
</tr>
<tr>
<td>Long-form UGC (30-60s)</td>
<td>51-second UGC playbook</td>
<td>Element-locked multi-shot UGC</td>
</tr>
<tr>
<td>Product page hero static</td>
<td>6-angle composite + premium poster system</td>
<td>Static asset production</td>
</tr>
<tr>
<td>Motion graphics / kinetic typography</td>
<td>Higgsfield motion-design-flow</td>
<td>Text-heavy ads</td>
</tr>
<tr>
<td>Broadcast realism (TV-feel)</td>
<td>Broadcast realism prompt system</td>
<td>Cold-audience scroll-stop</td>
</tr>
</table>
Claude includes the routing recommendation in every brief output. Operator can override per brand preference.
---
## ⚙️ Side-By-Side: Tool-Stack Complexity vs Claude 4-Step Loop
<table header-row="true">
<tr>
<td>Element</td>
<td>5-Tool Multi-Tab Strategy</td>
<td>Claude 4-Step Loop</td>
</tr>
<tr>
<td>Tools opened per cycle</td>
<td>5 (Meta Ads Library + Notion + ChatGPT + creative tool + Ads Manager)</td>
<td>1 (Claude)</td>
</tr>
<tr>
<td>Time per cycle</td>
<td>10-15 hours/week</td>
<td>15-30 min/cycle, 2-3 cycles/week</td>
</tr>
<tr>
<td>Brief context loss between handoffs</td>
<td>Constant</td>
<td>None (project memory)</td>
</tr>
<tr>
<td>Compounding intelligence</td>
<td>Memory degrades weekly</td>
<td>Project memory compounds across weeks</td>
</tr>
<tr>
<td>Cost (operator time + agency)</td>
<td>$5K-$10K/month</td>
<td>Claude subscription only</td>
</tr>
<tr>
<td>Best for</td>
<td>Custom one-off campaigns</td>
<td>Daily/weekly ecom ad production</td>
</tr>
</table>
The mechanism: Claude's project memory holds the strategy context. Multi-tab workflows lose context at every handoff. Net result is research output that gets dumber over time vs Claude output that gets smarter.
---
## ⚙️ The Daily / Weekly Production Cadence
This is the routine that runs the 4-step loop 2-3x per week.
<table header-row="true">
<tr>
<td>Day</td>
<td>Time</td>
<td>Step</td>
<td>Output</td>
</tr>
<tr>
<td>Monday</td>
<td>9:00-9:15</td>
<td>Step 1 — Research</td>
<td>5 working products + top patterns</td>
</tr>
<tr>
<td>Monday</td>
<td>9:15-9:30</td>
<td>Step 2 — Brief</td>
<td>6-10 briefs for the chosen product</td>
</tr>
<tr>
<td>Monday</td>
<td>9:30-10:30</td>
<td>Route briefs to creative tools, generate ads</td>
<td>6-10 finished ads</td>
</tr>
<tr>
<td>Monday</td>
<td>10:30-11:00</td>
<td>Step 3 — Deploy plan + actual deployment</td>
<td>Live tests on Meta + TikTok</td>
</tr>
<tr>
<td>Tuesday</td>
<td>9:00-9:15</td>
<td>Step 4 — Matrix at hour 24</td>
<td>Winners scaled, losers killed</td>
</tr>
<tr>
<td>Wednesday</td>
<td>9:00-10:00</td>
<td>Run Steps 1-4 on a new product concept</td>
<td>Second loop running</td>
</tr>
<tr>
<td>Thursday</td>
<td>9:00-9:15</td>
<td>Matrix on Wednesday batch</td>
<td>Top winners scaled</td>
</tr>
<tr>
<td>Friday</td>
<td>9:00-10:00</td>
<td>Run Steps 1-4 on Friday concept</td>
<td>Third loop running</td>
</tr>
<tr>
<td>Monday (next week)</td>
<td>Memory updated with this week's winners</td>
<td>Loop compounds</td>
<td></td>
</tr>
</table>
Output: 2-3 full loops per week. 12-30 briefs tested per week. 4-8 confirmed winners scaling into next 30 days.
---
## ⚙️ What NOT to Do
→ Don't skip the approval gates. Bad research cascades into bad briefs cascades into wasted ad spend.
→ Don't run multiple brands in 1 Claude Project. Each brand needs its own project with its own competitor list + ICP + memory.
→ Don't ignore the predicted lift scores. They're tied to competitor signal evidence. A 9/10 brief is statistically more likely to win than a 6/10.
→ Don't deploy all 10 briefs from Step 2. The deploy plan recommends 6 max. Keep the rest for week 2 variations if winners emerge.
→ Don't run Step 1 without 20-50 competitor observations. Below 20, pattern extraction is unreliable.
→ Don't expect Claude to do the actual creative generation. Claude generates the brief. Creative tools execute. Always route briefs to the recommended tool.
→ Don't update project memory mid-loop. Lock memory before the week's research run. Update on Friday with confirmed winners.
→ Don't ignore the tool routing recommendation. Sending a cinematic brief to MakeUGC produces weak output. Match brief type to tool strength.
→ Don't replace your existing creative tools with this system. The 4-step loop is the strategy layer. MakeUGC, Maxfusion, Higgsfield are the execution layer. You need both.
→ Don't expect immediate compounding. Week 1 output is generic. Week 4 output is calibrated. Trust the loop for 30 days before judging.
→ Don't skip the brand voice samples in project memory. Without them, every brief reads off-brand.
---
## ⚙️ Troubleshooting
<table header-row="true">
<tr>
<td>Problem</td>
<td>Fix</td>
</tr>
<tr>
<td>Step 1 research feels shallow</td>
<td>Increase competitor observation count to 30-50. Or connect Meta Ads MCP for auto-pulling.</td>
</tr>
<tr>
<td>Briefs reads off-brand</td>
<td>Project memory missing voice samples. Add 3-5 paragraphs of actual published brand copy.</td>
</tr>
<tr>
<td>Predicted lift scores feel arbitrary</td>
<td>Reinforce in the prompt: "Each predicted lift must tie to specific competitor signal evidence — which winning pattern this brief mirrors."</td>
</tr>
<tr>
<td>Tool routing recommends wrong tool</td>
<td>Override in the Brief prompt: "Always route X type to Y tool" for your specific brand.</td>
</tr>
<tr>
<td>Patterns repeat week over week</td>
<td>Competitor list isn't evolving. Add 2 new competitors per month to project memory.</td>
</tr>
<tr>
<td>Matrix updates project memory but next research is still generic</td>
<td>Verify Claude project allows memory updates from chat outputs. Use Claude Desktop with project memory enabled.</td>
</tr>
<tr>
<td>Cost of generation gets high</td>
<td>Most cost is in downstream creative tool generation, not Claude. Focus on briefing better (higher predicted lift) so fewer regenerations.</td>
</tr>
<tr>
<td>Step 3 deploy plan doesn't fit budget</td>
<td>Reduce brief count from 10 to 6 with higher per-brief budget. Or run 10 briefs at $20/day each instead of 6 at $50/day.</td>
</tr>
<tr>
<td>Step 4 matrix doesn't identify winners clearly</td>
<td>Run matrix at hour 48 instead of hour 24 for more data stability.</td>
</tr>
<tr>
<td>Multiple brands need separate workflows</td>
<td>Create separate Claude Projects per brand. Don't mix.</td>
</tr>
<tr>
<td>Operator skips approval gates</td>
<td>Claude continues without verification = downstream waste. Force discipline — never skip the approval.</td>
</tr>
</table>
---
## 🎯 Closer
**Install the Claude Skill into a Project. Upload brand kit + ICP + competitor list + voice samples to Project Knowledge. Run Step 1 — Research with competitor ad observations. Approve. Run Step 2 — Brief on the chosen product. Approve. Route briefs to your creative tools. Deploy 6 briefs at $30-50/day each. Run Step 4 — Matrix at hour 24. Scale winners. Kill losers. Update memory. By end of week 1 you'll have 12-15 briefs tested. By end of month 1 you'll have a compounding Claude system that beats any agency strategist on your specific brand's audience signal.**
The 5-tool multi-tab strategy was the bottleneck.
The Claude 4-step loop is what fixes it.
---
**The Claude Skill system prompt + competitor research prompt + angle generation prompt + matrix prompt + tool routing decision tree + 6 vertical templates is the full system. Bookmark this guide. Run it weekly.**
---
