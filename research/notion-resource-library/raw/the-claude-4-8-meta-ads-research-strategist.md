---
title: "The Claude 4.8 Meta Ads Research Strategist"
page_id: 37992e2e92e980389fe6c755a43e451c
layer: research
source: https://freebie-for-you.notion.site/37992e2e92e980389fe6c755a43e451c
---
# The Claude 4.8 Meta Ads Research Strategist: From Competitor Pattern to Brief Stack in 15 Minutes
---
## 🎯 What You're Getting
The exact Claude 4.8 workflow that compresses 12 hours of weekly Meta Ads research into 1 chat. Pull competitor patterns from Meta Ads Library. Map angles by audience psychology. Build a 20-hook bank organized by angle. Generate a full brief stack with test plan + budget allocation. All in 15 minutes. No spreadsheets. No tabs. No manual scrolling.
The full Claude Research Strategist system prompt. The 3 workflow prompts (Pattern Extraction → Hook Bank → Brief Stack). The competitor pattern schema (what to capture from each winner). The 20-hook bank format organized by angle. 6 vertical adaptations. The test plan format with budget allocation framework.
You stop scrolling Meta Ads Library. You stop logging hooks in Notion. You stop running Monday morning strategy meetings to plan the week's tests. You drop the brand brief into Claude. Claude pulls competitor signal, maps angles, outputs ranked briefs. You hand the briefs to your creative tools.
By the end of this guide, you'll have:
→ The master Claude Research Strategist system prompt (paste-ready into a Claude Project)<br>→ The 3 workflow prompts (Pattern Extraction / Hook Bank / Brief Stack)<br>→ The competitor pattern schema for capturing every winning ad's signal<br>→ The 20-hook bank format organized by angle + ICP pain<br>→ 6 vertical-specific Claude project configurations<br>→ The test plan format with budget allocation across the brief stack<br>→ The brief-to-creative-tool routing for handoff<br>→ The daily production cadence for shipping research-backed brief stacks
If you're already running the Claude Ad Creative Agent (5-step subagent loop) or the Higgsfield MCP + Claude campaign orchestrator, this is the **upstream research layer** that feeds both. The Ad Creative Agent generates creative direction. The MCP orchestrator executes generation. The Research Strategist tells both what to actually make based on live competitor signal.
---
## ⚙️ The Hidden Mechanism — Why Claude as Research Strategist Beats Manual Meta Ads Library Scrolling
Every standard DTC research workflow has the same broken loop:
1. Operator opens Meta Ads Library on Monday morning
2. Searches competitors one by one, scrolls through their ads
3. Saves screenshots of winners to a Notion doc
4. Tries to identify patterns by eye across 20-50 ads
5. Writes down "5 angles" in a Google doc
6. Drafts briefs by Wednesday based on those angles
7. Hands briefs to creative tools by Friday
8. Tests deploy Saturday or following Monday
Total: 2-3 days from research start to brief delivery. Pattern recognition is human eye-based — patterns get missed, biased by recency, or anchored to whatever the operator looked at most recently.
The Claude Research Strategist fix is structural: Claude can hold 50-100 competitor ad observations in a single context window and pattern-match across all of them simultaneously. You don't ask Claude to "guess" — you give Claude the structured ad observations (pasted in or pulled via Meta Ads MCP) and Claude extracts the patterns deterministically.
→ Operator pastes 20-50 competitor ad observations into Claude (or Claude pulls them via MCP)<br>→ Claude extracts hook patterns, angle clusters, visual format winners, audience-targeting signals<br>→ Claude maps the patterns to your ICP psychographics<br>→ Claude generates a ranked hook bank tied to the patterns<br>→ Claude turns the hook bank into a brief stack with test plan<br>→ Operator hands briefs to creative tools
Total: 15 minutes from research input to brief stack output. Pattern recognition is deterministic across the full ad set, not biased by what the operator looked at last.
The fix is not better research effort. The fix is **giving Claude the full competitor ad set in 1 context window** — the thing that lets pattern extraction happen across the whole dataset instead of from human memory.
---
## ⚙️ The Stack
<table header-row="true">
<tr>
<td>Layer</td>
<td>Tool</td>
<td>Job</td>
</tr>
<tr>
<td>Research strategist</td>
<td>Claude 4.8 (Opus)</td>
<td>Runs Pattern Extraction → Hook Bank → Brief Stack</td>
</tr>
<tr>
<td>Competitor data source</td>
<td>Meta Ads Library (manual paste) OR Meta Ads MCP (automated)</td>
<td>Provides the raw competitor ad observations</td>
</tr>
<tr>
<td>Persistent context</td>
<td>Claude Project</td>
<td>Stores brand kit, ICP, prior winners, competitor list</td>
</tr>
<tr>
<td>Brief output</td>
<td>Claude → MD file or doc</td>
<td>Production-ready briefs for handoff</td>
</tr>
<tr>
<td>Downstream execution</td>
<td>MakeUGC / Maxfusion / Higgsfield / Seedance / Ad Creative Agent</td>
<td>Receives briefs, generates the final creative</td>
</tr>
<tr>
<td>Deploy + tracking</td>
<td>Meta Ads Manager</td>
<td>Tracks brief performance, feeds data back</td>
</tr>
</table>
Claude 4.8 is the only tool you open for research. Downstream creative tools execute the briefs.
---
## ⚙️ The Workflow Math
Traditional Meta Ads research workflow:
- Monday: 4-6 hours scrolling Meta Ads Library
- Tuesday: 2-3 hours organizing observations
- Wednesday: 4-6 hours writing briefs
- Total: 10-15 hours per week of manual research
Claude Research Strategist workflow:
- Drop brief into Claude (60 seconds)
- Claude pulls or receives competitor observations (5 minutes)
- Claude runs 3 workflow prompts (10 minutes)
- Operator reviews output (3 minutes)
- Total: 15-20 minutes per week
The leverage shift: you stop spending Monday-Wednesday on research and start spending Monday-Wednesday on creative direction + scaling winners. The bottleneck moves from research capacity to creative execution.
---
## ⚙️ Step 1 — Set Up Claude with Persistent ICP + Competitor Memory
Create a new Claude Project named "[Brand] Meta Ads Research Strategist." Paste the master system prompt (Section 7) into the Project instructions.
Load brand + competitor context into Project knowledge:
→ Brand kit + ICP psychographics<br>→ Hero claim + positioning<br>→ Top 5-10 competitor list (with URLs to their ad library pages)<br>→ Prior winning ad scripts from your own campaigns<br>→ Category-specific pain points + emotional triggers<br>→ Brand voice samples + tone constraints
The Project memory persists across every research run. Claude learns your brand context once, applies it to every future research session.
---
## ⚙️ Step 2 — Pull Competitor Patterns from Meta Ads Library
Two options for getting competitor data into Claude:
**Option A — Manual paste (works for any operator):**
1. Open Meta Ads Library in browser
2. Search each of your top 5-10 competitors
3. Filter to "Active ads" + "Run for 30+ days" (proxy for spend)
4. For each ad, capture: hook (first 3 seconds), visual format, dialogue if any, approximate ad length, run length
5. Paste 20-50 ad observations as structured text into Claude
**Option B — Meta Ads MCP (faster, automated):**
1. Install Meta Ads MCP server (covered in the Estefania Claude + Meta Ads MCP playbook)
2. Configure with your Meta Ads access token
3. Claude pulls ads programmatically from competitor accounts via API
4. No manual screenshots needed
Both options feed the same data into Claude. Option B is faster but requires Meta API access. Option A works for everyone.
---
## ⚙️ Step 3 — Run the 3 Workflow Prompts
In a fresh chat inside the Claude Project, run the 3 prompts in sequence.
<table header-row="true">
<tr>
<td>Prompt</td>
<td>Input</td>
<td>Output</td>
</tr>
<tr>
<td>1. Pattern Extraction</td>
<td>20-50 competitor ad observations</td>
<td>Hook patterns + angle clusters + visual format winners</td>
</tr>
<tr>
<td>2. Hook Bank</td>
<td>Pattern Extraction output + your ICP</td>
<td>5 ranked angles + 20-hook bank organized by angle</td>
</tr>
<tr>
<td>3. Brief Stack</td>
<td>Hook Bank output + brand voice + product specs</td>
<td>6-10 production-ready briefs with test plan + budget allocation</td>
</tr>
</table>
Each prompt builds on the previous one. Don't skip ahead. Approve each step's output before proceeding.
Total runtime: 10-15 minutes for all 3 prompts.
---
## ⚙️ Step 4 — Hand Off the Brief Stack
The Brief Stack output is a ranked list of 6-10 production-ready briefs. Each brief contains:
→ Concept (1 sentence)<br>→ Hook (first 3 seconds of dialogue + visual)<br>→ Angle (which audience pain it ties to)<br>→ Visual direction (UGC / cinematic / static / motion graphics)<br>→ Tool routing recommendation (MakeUGC / Maxfusion / Higgsfield / Seedance)<br>→ Predicted lift score (1-10 based on competitor signal alignment)<br>→ Recommended test budget ($30/day baseline, higher for top-ranked)
Hand each brief to the recommended creative tool. Deploy.
---
## ⚙️ Step 5 — Run the Compounding Loop
After 24-48 hours of test data:
1. Pull performance data from Meta Ads Manager (or via Meta Ads MCP)
2. Paste back into Claude with the matrix prompt
3. Claude identifies which briefs are winning, which to scale, which to kill
4. Claude updates project memory with confirmed winning patterns
5. Next week's research run is weighted toward confirmed winners
The loop compounds. Week 1 research is generic. Week 4 research is calibrated to your specific brand + audience signal.
---
## ⚙️ The Master Claude Research Strategist System Prompt
Paste this into the Claude Project instructions.
```javascript
You are the Meta Ads Research Strategist for
[BRAND NAME].

Your job: take competitor ad observations +
brand context and output a brief stack with
test plan + budget allocation in 1 chat.

Project context (loaded once):
- Brand kit: [BRAND KIT IN PROJECT KNOWLEDGE]
- ICP: [ICP PROFILE]
- Hero claim + positioning: [BRAND POSITIONING]
- Top competitors: [COMPETITOR LIST + URLS]
- Prior winning ad scripts: [WINNING SCRIPTS]
- Category pain points: [PAIN POINTS]
- Brand voice samples: [VOICE SAMPLES]

Workflow (run 3 prompts in sequence):

Prompt 1 — Pattern Extraction
Input: 20-50 competitor ad observations
(pasted by operator or pulled via Meta Ads MCP)

Task:
- Cluster hooks by structure (question,
  statement, contrast, observation, stat-led)
- Identify top 5 hook patterns by frequency in
  winners (ads running 30+ days)
- Identify top 5 angles (mechanism, result,
  founder, peer, comparison, transformation)
- Identify top 3 visual formats (UGC handheld,
  broadcast, cinematic, motion graphics, static)
- Identify unexpected patterns the category
  typically misses
- Flag any patterns that look like outliers
  (1-2 brands doing something nobody else does)

Output format:
- Top 5 hook patterns ranked
- Top 5 angles ranked
- Top 3 visual formats ranked
- 2-3 unexpected patterns
- Strategic recommendation for which
  combinations to test next

Pause for operator approval before Prompt 2.

Prompt 2 — Hook Bank
Input: Pattern Extraction output + ICP from
project memory

Task:
- Cross-reference winning hook patterns with
  ICP pain points
- Identify the 5 angles that best match the
  brand's positioning
- For each angle, write 4 hook variations
  (20 hooks total)
- Each hook must:
  - Match 1 of the 5 angles
  - Tie to an ICP pain point
  - Use brand voice samples as tone anchor
  - Be 6-12 words
  - Pre-qualify the buyer

Output format:

ANGLE 1: [angle name]
ICP pain: [specific pain this targets]
Hooks:
1. [hook]
2. [hook]
3. [hook]
4. [hook]

ANGLE 2: [angle name]
...

ANGLE 5: [angle name]
...

Pause for operator approval before Prompt 3.

Prompt 3 — Brief Stack
Input: Hook Bank output + brand voice +
product specs

Task:
- Pick the top 6-10 hooks across the 5 angles
  (weight toward highest-conviction angles)
- For each chosen hook, generate a full brief:
  - Concept (1 sentence)
  - Hook (full first 3 seconds — visual +
    dialogue)
  - Visual direction (UGC / cinematic / static
    / motion graphics / broadcast)
  - Tool routing recommendation (MakeUGC /
    Maxfusion / Higgsfield / Seedance)
  - Predicted lift score (1-10 based on
    competitor signal alignment)
  - Recommended test budget ($30/day baseline,
    higher for top 2)

Output format:

BRIEF 1
Concept: [1 sentence]
Hook: [visual + dialogue]
Angle: [angle from Hook Bank]
Visual direction: [format]
Tool routing: [tool]
Predicted lift: [1-10]
Test budget: [$X/day]

BRIEF 2
...

[Continue for 6-10 briefs total]

Test plan summary:
- Total test budget: [$X]
- Top 2 briefs to scale first: [list]
- Expected timeline: [week 1 launch, hour-24
  matrix, week 2 scale winners]

Constraints (apply to every workflow run):
- Never invent product claims not in project
  memory
- Maintain brand voice from voice samples
- Predicted lift scores must be tied to
  competitor signal evidence
- Approval gates between each prompt — no
  silent cascading
```
---
## ⚙️ The 3 Workflow Prompts (Copy-Paste Library)
Save each as a slash command or pasted message inside your Claude Project.
### Prompt 1 — Pattern Extraction
```javascript
Run the Pattern Extraction workflow.

Competitor ad observations (paste below):
[PASTE 20-50 STRUCTURED OBSERVATIONS —
for each ad include: brand, hook first 3
seconds, visual format, dialogue if any,
approximate length, run length]

Use the project context (ICP, brand
positioning, competitor list) to inform the
analysis.

Output:
- Top 5 hook patterns (ranked by frequency in
  30+ day runners)
- Top 5 angles (mechanism / result / founder /
  peer / comparison / transformation)
- Top 3 visual formats
- 2-3 unexpected patterns
- Strategic recommendation for which
  combinations to test next

Under 800 words.
```
### Prompt 2 — Hook Bank
```javascript
Run the Hook Bank workflow.

Input: the Pattern Extraction output from
Prompt 1.

Use the project ICP + brand voice samples to
calibrate.

Output:
- 5 angles selected from the patterns (matched
  to ICP pain points)
- For each angle: 4 hook variations (20 hooks
  total)
- Each hook: 6-12 words, ICP-pain-tied,
  brand-voice-aligned, pre-qualifies buyer

Format per angle:

ANGLE [N]: [name]
ICP pain: [pain it targets]
Hooks:
1. [hook]
2. [hook]
3. [hook]
4. [hook]
```
### Prompt 3 — Brief Stack
```javascript
Run the Brief Stack workflow.

Input: the Hook Bank from Prompt 2 + product
specs + brand voice from project memory.

Task:
- Pick the top 6-10 hooks across the 5 angles
  (weight toward highest-conviction angles)
- For each chosen hook, generate a full brief

Format per brief:

BRIEF [N]
Concept: [1 sentence]
Hook: [visual + dialogue]
Angle: [from Hook Bank]
Visual direction: [UGC / cinematic / static /
motion graphics / broadcast]
Tool routing: [MakeUGC / Maxfusion / Higgsfield
/ Seedance]
Predicted lift: [1-10] with [reasoning tied to
competitor signal]
Test budget: [$X/day, baseline $30, higher for
top 2]

After all briefs:

Test plan summary:
- Total test budget: [$X]
- Top 2 briefs to scale first
- Timeline: week 1 launch, hour-24 matrix,
  week 2 scale
```
---
## ⚙️ The Competitor Pattern Schema
When pasting competitor observations manually, use this schema for each ad:
```javascript
AD [N]
Brand: [BRAND NAME]
Hook (first 3 seconds visual + dialogue):
[DESCRIPTION]
Visual format: [UGC handheld / broadcast /
cinematic / motion graphics / static]
Dialogue (if any): [SHORT QUOTE]
Approximate length: [15s / 30s / 60s]
Run length: [DAYS RUNNING — 30+ days = winner
signal]
Audience targeting (if visible): [DEMOGRAPHIC
HINTS FROM VISUAL]
Notes: [ANY UNUSUAL OBSERVATION]
```
20-50 ads pasted in this format = the input for Prompt 1. Claude pattern-extracts across the full set.
---
## ⚙️ The Hook Bank Format
The Hook Bank from Prompt 2 outputs in this structure:
```plain text
ANGLE 1: Ingredient Education
ICP pain: doesn't understand what's actually
in their current skincare
Hooks:
1. The 1 ingredient most skincare misses.
2. Why retinol fails for sensitive skin.
3. Hyaluronic acid does 1 thing nobody talks
   about.
4. The 30-day vitamin C truth no brand admits.

ANGLE 2: 30-Day Result
ICP pain: skeptical of "miracle" claims
Hooks:
1. 30 days. 1 product. Honest result.
2. I tracked my skin for 30 days. The data
   surprised me.
3. The before-after that changed my opinion.
4. Day 30 update on the [PRODUCT] I almost
   returned.

[Continue for angles 3-5]
```
20 hooks total. Each tied to 1 of 5 angles. Each tied to a specific ICP pain.
---
## ⚙️ 6 Vertical Adaptations
Each is a vertical-specific Claude Project configuration. Set up 1 project per vertical you serve.
### Vertical 1 — Skincare / Beauty
```javascript
Project name: [BRAND] Skincare Research
Strategist
Top competitors: [5 skincare competitors]
Category pain points: dryness, breakouts,
aging, sensitivity, ingredient confusion
Top angle priorities: ingredient education,
30-day result, sensitive skin testimonial,
before/after
Visual format defaults: bathroom UGC, soft
window light, fingertip application
```
### Vertical 2 — Supplements / Wellness
```javascript
Project name: [BRAND] Supplement Research
Strategist
Top competitors: [5 supplement competitors]
Category pain points: energy crash, poor
sleep, brain fog, slow recovery
Top angle priorities: 30-day result,
ingredient mechanism, founder note, peer
comparison
Visual format defaults: kitchen morning UGC,
warm wood palette, peer-to-peer tone
```
### Vertical 3 — Fitness / Athletic
```javascript
Project name: [BRAND] Fitness Research
Strategist
Top competitors: [5 fitness competitors]
Category pain points: performance plateau,
slow recovery, motivation loss
Top angle priorities: performance metric,
recovery speed, athlete endorsement, mechanism
Visual format defaults: home gym UGC,
high-contrast, post-workout sheen
```
### Vertical 4 — Fashion
```javascript
Project name: [BRAND] Fashion Research
Strategist
Top competitors: [5 fashion competitors]
Category pain points: outfit anxiety, fit
issues, occasion fit, capsule wardrobe gaps
Top angle priorities: outfit recipe, occasion
fit, capsule wardrobe, styling tip
Visual format defaults: bedroom GRWM, golden
hour, full mirror
```
### Vertical 5 — Food / Beverage
```javascript
Project name: [BRAND] Food/Bev Research
Strategist
Top competitors: [5 food/bev competitors]
Category pain points: taste fatigue, health
concerns, daily ritual gaps
Top angle priorities: taste reaction,
ingredient origin, craft story, daily ritual
Visual format defaults: kitchen counter UGC,
golden hour amber, mid-sip framing
```
### Vertical 6 — SaaS / Tech
```javascript
Project name: [BRAND] SaaS Research Strategist
Top competitors: [5 SaaS competitors]
Category pain points: operational waste, tool
fatigue, time loss, workflow friction
Top angle priorities: operator pain, metric
improvement, time saved, founder build story
Visual format defaults: home office founder
POV, laptop in frame, neutral daylight
```
---
## ⚙️ The Test Plan Format
The Brief Stack output ends with a test plan that maps the briefs to deployment + budget:
```javascript
Test plan summary:

Total test budget: $X (for week 1)

Brief deployment schedule:
- Brief 1 (predicted lift 9/10): $50/day,
  Meta + YouTube
- Brief 2 (predicted lift 8/10): $50/day,
  Meta + TikTok
- Brief 3 (predicted lift 7/10): $30/day,
  Meta
- Brief 4 (predicted lift 7/10): $30/day,
  TikTok
- Brief 5 (predicted lift 6/10): $30/day,
  Meta
- Brief 6 (predicted lift 6/10): $30/day,
  Meta

Total daily spend: $220/day across 6 briefs.

Hour-24 matrix:
- Top 2 by hook rate + CTR get scaled to
  $100/day on Tuesday
- Bottom 2 get killed if below threshold
- Middle 2 hold for hour-48 review

Week 2 plan:
- Confirmed winners scaled to $200-500/day
- 2-3 fresh briefs from next research run
  added at $30/day baseline
- Project memory updated with winning angle +
  hook pattern
```
This format gives the operator a complete deploy plan tied to the briefs.
---
## ⚙️ Side-By-Side: Manual Research vs Claude Research Strategist
<table header-row="true">
<tr>
<td>Element</td>
<td>Manual Research</td>
<td>Claude Research Strategist</td>
</tr>
<tr>
<td>Competitor ads reviewed</td>
<td>20-30 (eye fatigue limit)</td>
<td>50-100+ (Claude context window)</td>
</tr>
<tr>
<td>Time per research cycle</td>
<td>10-15 hours/week</td>
<td>15-20 min/week</td>
</tr>
<tr>
<td>Pattern recognition</td>
<td>Human memory-based</td>
<td>Deterministic across full ad set</td>
</tr>
<tr>
<td>Bias</td>
<td>Recency + anchoring</td>
<td>None (Claude processes all ads equally)</td>
</tr>
<tr>
<td>Output structure</td>
<td>Loose notes in Notion</td>
<td>Structured brief stack with test plan</td>
</tr>
<tr>
<td>Brief generation</td>
<td>Manual writing</td>
<td>Auto-generated from pattern extraction</td>
</tr>
<tr>
<td>Compounding</td>
<td>Operator memory degrades over weeks</td>
<td>Claude project memory compounds</td>
</tr>
<tr>
<td>Best for</td>
<td>Cold-start research on new categories</td>
<td>Ongoing weekly research at scale</td>
</tr>
</table>
The mechanism: Claude can hold all the observations at once. Humans can hold 5-10 at peak. Pattern extraction across 50+ observations is where Claude pulls ahead.
---
## ⚙️ The Kill-or-Scale Matrix (Hour 24)
Deploy the brief stack to Meta + TikTok per the test plan. Run the matrix at hour 24 inside Claude.
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
Run the kill-or-scale matrix on the brief
stack deployed in the last 24 hours.

Data (paste from Meta Ads Manager or pulled
via Meta Ads MCP):
[PASTE: brief name, predicted lift score,
spend, hook rate, hold rate, CTR, CPA, ROAS]

For each brief return:
1. Decision: KILL / HOLD / SCALE
2. Reason (cite threshold breach + predicted
   lift accuracy)
3. If SCALE: which angle + hook pattern is
   winning, recommended next budget
4. If KILL: which prior brief to clone for
   replacement (same angle, different hook)

Pattern recognition across the batch:
- Which angles are landing
- Which hook patterns are converting
- Which visual formats are scaling

Update project memory with confirmed winning
patterns. Next research run weighted toward
winners.

No hedging. Decisive calls.
```
---
## ⚙️ The Integration Playbook
The Claude Research Strategist generates briefs. Downstream creative tools execute them.
### Recommended weekly rotation:
→ Monday research run (15-20 min, generates 6-10 briefs)<br>→ Tuesday-Wednesday: briefs route to creative tools<br>→ Thursday: matrix on Tuesday batch<br>→ Friday: scale winners, generate replacement briefs
The research strategist runs ONCE per week. The creative tools run DAILY.
### Where this slots into Eugenio's existing stack:
<table header-row="true">
<tr>
<td>Layer</td>
<td>Tool</td>
<td>Job</td>
</tr>
<tr>
<td>Strategy (weekly)</td>
<td>Claude Research Strategist (this system)</td>
<td>Generates brief stack</td>
</tr>
<tr>
<td>Brief generation (daily)</td>
<td>Claude Ad Creative Agent (5-step pipeline)</td>
<td>Optional — adds storyboard + creative direction to each brief</td>
</tr>
<tr>
<td>Execution (daily)</td>
<td>Higgsfield MCP + Claude / Maxfusion / MakeUGC</td>
<td>Generates the final creative</td>
</tr>
<tr>
<td>Deploy + matrix</td>
<td>Meta Ads Manager + Claude (matrix prompt)</td>
<td>Tracks performance, feeds data back</td>
</tr>
<tr>
<td>Compounding</td>
<td>Project memory updates each week</td>
<td>Research weighted toward confirmed winners</td>
</tr>
</table>
The Research Strategist is the UPSTREAM layer. Everything else executes from its output.
---
## ⚙️ What NOT to Do
→ Don't skip Prompt 1 (Pattern Extraction). Hook Bank with no pattern data is just generic copywriting.
→ Don't paste fewer than 20 competitor ads into Prompt 1. Below 20, pattern extraction is unreliable. 30-50 is the sweet spot.
→ Don't run the workflow without loading ICP + brand voice into project memory. Without grounding, every brief is generic.
→ Don't skip the approval gates between prompts. Bad pattern extraction cascades into bad hook bank cascades into bad briefs.
→ Don't expect Claude to invent product claims. Every brief must trace back to project memory. Add product specs to memory before running briefs.
→ Don't deploy all 10 briefs in week 1. The test plan recommends 6-10 max. Deploy 4-6, hold the rest as variations to test in week 2 if winners emerge.
→ Don't update project memory mid-week. Lock the memory before the Monday research run. Update on Friday with that week's winners.
→ Don't run the same workflow on the same ad set twice. Refresh competitor observations every Monday. Stale data = stale patterns.
→ Don't ignore the predicted lift scores. They're tied to competitor signal evidence. A 9/10 hook is statistically more likely to win than a 6/10. Weight your scaling decisions accordingly.
→ Don't run multiple brands in 1 Claude Project. Each brand needs its own project with its own competitor list + ICP.
→ Don't replace your existing creative tools with this system. Claude is the strategy layer. MakeUGC, Maxfusion, Higgsfield are the execution layer. You need both.
---
## ⚙️ Troubleshooting
<table header-row="true">
<tr>
<td>Problem</td>
<td>Fix</td>
</tr>
<tr>
<td>Pattern extraction misses obvious winners</td>
<td>Competitor observations too sparse. Paste more ads (target 30-50) or use the Meta Ads MCP to pull more data.</td>
</tr>
<tr>
<td>Hook Bank reads off-brand</td>
<td>Project memory missing voice samples. Add 3-5 paragraphs of brand's actual published copy.</td>
</tr>
<tr>
<td>Briefs all look similar</td>
<td>Hook Bank's 5 angles too narrow. Reinforce "5 angles must be distinct in mechanism, not just hook copy variation."</td>
</tr>
<tr>
<td>Predicted lift scores feel arbitrary</td>
<td>Reinforce: "Tie each predicted lift score to specific competitor signal evidence — which winning patterns this brief mirrors."</td>
</tr>
<tr>
<td>Brief stack output too long for 1 chat</td>
<td>Reduce brief count to 6 instead of 10. Or split into 2 chats.</td>
</tr>
<tr>
<td>Claude project memory hits limits</td>
<td>Trim to essentials (top 3 winners, brand kit, ICP, competitor list). Move bulky brand assets to attached PDFs.</td>
</tr>
<tr>
<td>Tool routing recommends wrong tool</td>
<td>Override in Brief Stack prompt: "Always route UGC briefs to MakeUGC, cinematic to Maxfusion or Seedance, etc."</td>
</tr>
<tr>
<td>Same patterns extracted week over week</td>
<td>Competitor list isn't evolving. Add 2 new competitors per month to the project memory.</td>
</tr>
<tr>
<td>Matrix doesn't update project memory</td>
<td>Confirm Claude project allows memory updates from chat outputs. Use Claude Desktop with project memory enabled.</td>
</tr>
<tr>
<td>Research feels disconnected from creative output</td>
<td>Use the Claude Ad Creative Agent (5-step pipeline) as the next stage after Brief Stack. The Research Strategist generates the strategy. The Creative Agent adds storyboard + creative direction.</td>
</tr>
</table>
---
## ⚙️ The Daily / Weekly Production Cadence
This is the routine that ships 1 research-backed brief stack per week.
<table header-row="true">
<tr>
<td>Day</td>
<td>Time</td>
<td>Task</td>
<td>Output</td>
</tr>
<tr>
<td>Monday</td>
<td>9:00-9:05</td>
<td>Open Claude project, paste competitor observations</td>
<td>Observations loaded</td>
</tr>
<tr>
<td>Monday</td>
<td>9:05-9:15</td>
<td>Run Prompt 1 (Pattern Extraction)</td>
<td>Pattern report</td>
</tr>
<tr>
<td>Monday</td>
<td>9:15-9:25</td>
<td>Run Prompt 2 (Hook Bank)</td>
<td>5 angles + 20 hooks</td>
</tr>
<tr>
<td>Monday</td>
<td>9:25-9:40</td>
<td>Run Prompt 3 (Brief Stack)</td>
<td>6-10 briefs + test plan</td>
</tr>
<tr>
<td>Monday</td>
<td>9:40-10:00</td>
<td>Route briefs to creative tools</td>
<td>Briefs in execution</td>
</tr>
<tr>
<td>Monday</td>
<td>Afternoon</td>
<td>Creative tools generate finals</td>
<td>6-10 finished ads</td>
</tr>
<tr>
<td>Tuesday</td>
<td>9am</td>
<td>Deploy to Meta + TikTok per test plan</td>
<td>Live tests</td>
</tr>
<tr>
<td>Wednesday</td>
<td>9am</td>
<td>Hour-24 matrix</td>
<td>Top winners scaled</td>
</tr>
<tr>
<td>Friday</td>
<td>9am</td>
<td>Weekly winner review + project memory update</td>
<td>Memory compounds</td>
</tr>
<tr>
<td>Following Monday</td>
<td>9am</td>
<td>Fresh research run, weighted toward winners</td>
<td>Loop compounds</td>
</tr>
</table>
Output: 1 research run per week. 6-10 briefs per run. Compounding intelligence as project memory updates.
---
## 🎯 Closer
**Open Claude. Create a Project named "[Brand] Meta Ads Research Strategist." Paste the master system prompt. Load brand kit + ICP + competitor list + brand voice samples into project memory. Start a fresh chat. Paste 20-50 competitor ad observations (or pull via Meta Ads MCP). Run Prompt 1 → Prompt 2 → Prompt 3 with approval gates between. In 15 minutes you'll have 6-10 production-ready briefs + a test plan + budget allocation. Hand briefs to your creative tools. Deploy Tuesday. Matrix Wednesday. Scale winners Friday. By end of week 4 your project memory has compounded into research output that's calibrated to your specific brand + audience signal — output no SaaS tool can match.**
The 10-hour weekly research cycle was the bottleneck.
The Claude Research Strategist is what fixes it.
---
**The 3-prompt workflow + master Claude system prompt + competitor pattern schema + hook bank format + 6 vertical configurations + test plan framework is the full system. Bookmark this guide. Run it weekly.**
---
