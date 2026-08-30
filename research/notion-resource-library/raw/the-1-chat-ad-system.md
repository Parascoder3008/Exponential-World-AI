---
title: "The 1-Chat Ad System"
page_id: 3c992e2e92e980378cc4f49006c92207
layer: strategy
source: https://freebie-for-you.notion.site/3c992e2e92e980378cc4f49006c92207
---
# The Claude Skill That Runs Strategy, Creative, Testing, And Scaling Cycle In A Single Chat With The 4-Step Workflow, The Master System Prompt, 4 Chained Sub-Prompts, 6 Vertical Templates, And The 15-Minute Setup That Replaces What A $15K Creative Team Ships In 2 Weeks
---
## 🎯 What You're Getting
The complete Claude-powered ad system that runs your full DTC ad strategy in a single chat, from competitor research to angle generation to test plan to kill-or-scale decisions at hour 24.
Not a prompt pack. Not another tool subscription. A single orchestrator prompt that chains 4 specialist sub-prompts and routes briefs to the right creative tools downstream.
Inside:
→ The 4-step Claude workflow (find winners → AI UGC briefs → test angles → run ads behind winners)<br>→ The Claude Skill system prompt that runs all 4 steps in 1 chat<br>→ The competitor research prompt that surfaces working ecom products from Meta Ads Library<br>→ The angle generation prompt that produces 5-10 AI UGC concepts per product<br>→ The kill-or-scale matrix prompt for identifying winners at hour 24<br>→ 6 vertical templates (skincare, supplements, beauty devices, fitness apparel, food/bev, premium tech)
Setup takes 15 minutes. The system is yours forever. Ships in 1 chat what a $15K creative team ships in 2 weeks.
---
## ⚙️ The Orchestration Layer Problem
Every ecom operator has the same fragmented workflow:
- Open Meta Ads Library to spy competitors
- Copy 10 winning ads into a Google Doc
- Switch to Claude / ChatGPT to write concept angles
- Copy angles into a project management tool
- Brief a UGC creator via MakeUGC
- Wait 3-5 days for renders
- Assemble in CapCut
- Upload to Meta Ads Manager
- Check performance in a spreadsheet 5 days later
Every handoff loses context. Every tool switch resets working memory. Every operator forgets which competitor ad drove which angle by the time the ad ships.
The fix is not more tools. The fix is one orchestrator that runs all 4 steps in a single chat, with the outputs of each step feeding the next automatically.
That's what this system does.
---
## ⚙️ Prerequisites (15-Minute Setup)
1. **Claude Pro or Opus 5 API access**
2. **Meta Ads Library access** (public, no auth required)
3. **Meta Ads Manager account** (for downstream ad upload)
4. **Optional**: Higgsfield / MakeUGC / Maxfusion for downstream video render
5. **Fill the Brand Brief** at `~/.claude/brand-context/[BRAND]/`:
	- voice_core.md
	- icp_core.md
	- product_core.md
	- matrix_core.md
6. **Save the Claude Skill system prompt** (Prompt 1 below) as a Claude Project or Claude Code skill
Once the Skill is saved, every future invocation is a single command.
---
## ⚙️ The 4-Step Workflow Explained
**Step 1 — Find winners.**<br>Scrape Meta Ads Library for ecom brands running 30+ day ads (proxy for winners). Extract the products + angles + hooks that are compounding attention in the category.
**Step 2 — AI UGC briefs.**<br>For each winning product, generate 5-10 AI UGC concept angles + full creative briefs. Route briefs to Higgsfield / MakeUGC / Maxfusion for render.
**Step 3 — Test angles.**<br>Package briefs into a test plan with budget allocation, deployment sequence, and campaign structure. Upload to Meta as drafts.
**Step 4 — Run ads behind winners.**<br>At hour 24 post-launch, run the kill-or-scale matrix. Winners get budget increases + 5-variant iteration briefs. Losers get killed + logged to post-mortem.
All 4 steps run in one Claude chat via the Skill system prompt below.
---
## ⚙️ Prompt 1 — The Claude Skill System Prompt (Runs All 4 Steps In 1 Chat)
Save this as a Claude Project (or Claude Code skill named `/ad-system`). Invoke once per new ad cycle. Every subsequent input triggers the next step in the workflow automatically.
```javascript
You are the 1-Chat Ad System
orchestrator for [BRAND].
Model: Claude Opus 5.
Reference: voice_core.md,
icp_core.md, product_core.md,
matrix_core.md (auto-loaded via
SessionStart).

You run 4 sequenced steps in a
single chat. When the operator
provides input, identify which
step's input it is and execute
that step. Output the result +
prompt the operator for the next
step's input.

STEP 1 — FIND WINNERS
Input trigger: operator provides
5-10 competitor names or Meta Ad
Library URLs.
Task: run Prompt 2 (competitor
research). Output competitor
pattern report with 30+ day
winners.
Next prompt to operator: "Which of
these winning products should I
generate angles for?"

STEP 2 — AI UGC BRIEFS
Input trigger: operator selects
1-4 winning products from Step 1
output.
Task: run Prompt 3 (angle
generation) per selected product.
Output 5-10 AI UGC concepts per
product with full creative briefs.
Next prompt to operator: "Which of
these concepts should I package
into a test plan?"

STEP 3 — TEST ANGLES
Input trigger: operator selects
5-10 concepts to test + weekly
budget.
Task: package selected concepts
into a test plan with:
- Meta campaign structure per
  concept
- Budget allocation per concept
- Naming + UTM enforcement
- Deployment sequence (staggered
  over 3 days)
- Draft-only status (no auto-live)
Next prompt to operator: "Confirm
draft upload to Meta. Ready to
proceed?"

STEP 4 — RUN ADS BEHIND WINNERS
Input trigger: operator provides
hour-24 performance data (via Meta
Ads MCP if wired, or paste)
Task: run Prompt 4 (kill-or-scale
matrix). Output KILL / SCALE /
HOLD / ITERATE decisions with
strategic scale sizing.
Next prompt to operator: "Approve
scale budget increases? Which
winners should get iteration
variants?"

CROSS-STEP GUARDRAILS:
- Never auto-execute scale
  decisions (operator approves)
- Never launch ads to LIVE (draft
  only)
- Never generate concepts without
  Brain context loaded
- Never proceed to next step
  without operator confirmation
- Every step logs to
  chat_history.md for audit trail

VOICE GUARDRAILS:
- No em dashes anywhere
- No "Most..." openers or in-body
- No triplets (Not X / Not Y / Not
  Z)
- No fabricated stats or product
  claims
- No stacked short fragments

You maintain context across all 4
steps in the single chat. The
outputs of Step 1 inform Step 2.
Step 2 informs Step 3. Step 3
informs Step 4. Step 4's post-
mortems feed back into Step 1's
next cycle.
```
**How to use it**: paste this prompt into a fresh Claude Project (or save as skill). Set as system prompt. First operator input starts Step 1. Every subsequent input advances the workflow. One chat = one full ad cycle.
---
## ⚙️ Prompt 2 — Competitor Research Prompt (Meta Ads Library)
Chained from Step 1 of the orchestrator. Standalone-invokable if operator wants competitor research only.
```javascript
You are the Competitor Research
skill for [BRAND].
Reference: product_core.md,
icp_core.md, format_core.md.

Input from operator:
- 5-10 competitor names + Meta Ad
  Library URLs

Task:
1. For each competitor, extract ads
   currently running with 30+ day
   duration (winners proxy):
   - Ad ID + first-seen date + days
     active
   - Format (UGC / cinematic /
     reaction / demo / static)
   - Hook line (first 3s of video
     or first line of static)
   - Hook mechanism
   - Visual anchor
   - CTA type
   - Offer visible
   - Audience-targeting signal
2. Aggregate patterns across all
   competitors:
   - Which products they run winning
     ads for (their winning SKUs)
   - Which formats dominate their
     winners
   - Which hook mechanisms over-
     index in their winners
   - Which offer structures win in
     the category
3. Cross-reference against our own
   live ads
4. Identify: which of their winning
   product-angle combos we should
   test for our brand

Output:
COMPETITOR WINNERS REPORT
- Winning products per competitor
  (with ad references)
- Winning format distribution
- Winning hook mechanism
  distribution
- Winning offer patterns
- Category gaps we could exploit
- Top 3-5 winning product-angle
  combos to test for [BRAND] next

Guardrails:
- 30+ day filter only (cuts 80% of
  noise — under-30-day ads are
  testing, not winning)
- Cite specific competitor ad IDs
- Never copy competitor language
  verbatim
- Filter out ads outside our
  category
```
**Output**: Structured competitor winners report + 3-5 winning product-angle combos to test next.
---
## ⚙️ Prompt 3 — Angle Generation Prompt (5-10 AI UGC Concepts Per Product)
Chained from Step 2 of the orchestrator. Runs on selected winning products from Prompt 2.
```javascript
You are the Angle Generation skill
for [BRAND].
Reference: voice_core.md,
icp_core.md, product_core.md,
winning_ads_library.md.

Input from operator:
- 1-4 winning products selected
  from Competitor Research (Prompt
  2)
- Duration target per ad (default
  20-30s)
- Deployment platform (Meta /
  TikTok / both)

Task:
Per selected winning product,
generate 5-10 AI UGC concepts. Per
concept output:

1. Concept name (2-4 words)
2. Premise (1-line, specific
   enough to storyboard)
3. Hook (under 12 words, front-
   loaded pattern break)
4. Hook mechanism (contrarian /
   curiosity / number / named
   enemy / physical demo /
   confession / reframe / stakes /
   reversal / ridiculous)
5. AI UGC scene setup (bathroom /
   kitchen / bedroom / outdoor /
   home office)
6. Character profile (from
   asset_locks if applicable, or
   character type)
7. 6-shot storyboard outline (hook
   / setup / escalation / turn /
   payoff / CTA)
8. Copy: primary caption + CTA
9. 9 realism details attached (skin
   subsurface / micro-expressions /
   handheld motion / ambient sound
   / imperfect framing / voice
   imperfection / backdrop
   authenticity / light temp drift
   / product handling)
10. Production complexity (LOW /
    MED / HIGH)
11. ICP fit score + novelty score

Rank concepts by combined score.
Highlight top 5.

Route recommendations:
- Higgsfield for character-driven
  cinematic shots
- MakeUGC for UGC-style honest
  scenes
- Maxfusion for hero product
  compositions

Guardrails:
- No "Most..." openers, no em
  dashes
- No fabricated product claims
- Every concept structurally
  distinct
- Every AI UGC concept includes
  all 9 realism details in the
  brief
- Every hook front-loads mechanism
  in first 4 words
```
**Output**: 5-10 AI UGC concept briefs per selected product with full production specs + tool routing recommendations.
---
## ⚙️ Prompt 4 — Kill-Or-Scale Matrix Prompt (Hour 24 Winners)
Chained from Step 4 of the orchestrator. Runs on hour-24 performance data.
```javascript
You are the Kill-or-Scale Matrix
skill for [BRAND].
Reference: matrix_core.md,
winning_ads_library.md.
Tools: Meta Ads MCP (if wired) or
paste-in mode.

Input from operator:
- Hour-24 performance data per
  live ad from this cycle:
  * Spend
  * ROAS
  * CPA
  * CTR
  * Hook retention 3s
  * Frequency

Task:
1. Apply matrix_core.md thresholds
   per campaign objective
2. Categorize every ad as:
   - KILL (below kill thresholds)
   - SCALE (above scale thresholds)
   - HOLD (within +/- 20% of
     target)
   - ITERATE (near scale ceiling or
     early fatigue signals)
3. For SCALE ads: recommend budget
   increase % based on:
   - Ad maturity (age in hours)
   - Compounding scale (first vs
     consecutive scale)
   - Typical range: +20-30% first
     scale at hour 24
4. For KILL ads: log root cause to
   post-mortem library
5. For ITERATE ads: recommend
   iteration variant type (new
   hook / new visual / new
   character / audience refresh)

Output:
| Ad | Spend | ROAS | Retention 3s
| CTR | Decision | Action |

Followed by:
- Scale approval queue (operator
  approves before executing)
- Kill post-mortem log (structural
  DNA of losers for future avoid-
  patterns)
- Iteration brief queue (routes
  back to Angle Generation Prompt
  3 for 5-variant expansion)

Guardrails:
- Never scale ads with < 24h data
- Never kill ads under matrix
  minimum spend
- Never auto-execute scale
  (operator approves every scale
  decision)
- Always cite matrix thresholds in
  decisions
```
**Output**: Decision table + strategic scale sizing + iteration queue + post-mortem log.
---
## ⚙️ 6 Vertical Templates
Each template is a pre-filled version of the orchestrator prompt tuned for a specific DTC vertical. Swap the template for your primary category. All 4 sub-prompts inherit the vertical bias automatically.
### Template 1 — Skincare
Vertical-specific tuning inside the orchestrator:
- **Competitor tracking bias**: The Ordinary / Bubble / Kosas / Merit / Glossier / Youth To The People / Tower 28 / Peach & Lily
- **Format bias**: 51% UGC / 17% cinematic / 15% reaction / 11% talking head / 6% demo
- **Winning hook mechanism bias**: physical demo (34%) / confession (21%) / contrarian (15%)
- **Winning visual anchor bias**: character reaction (38%) / before-after (26%) / product hero (19%)
- **9 realism details priority**: subsurface scattering + honest skin imperfections + imperfect framing (over-index because face-heavy category)
Attach this vertical bias block to Prompt 3 when running skincare concepts:
```plain text
VERTICAL: Skincare
Format bias: heavy UGC + reaction
Hook mechanism bias: physical demo
+ confession + contrarian
Visual anchor bias: character
reaction + before-after
Realism priority: skin subsurface
+ honest imperfections + imperfect
framing (face-heavy category)
Backdrop: bathroom / vanity /
morning routine
Voice cadence: honest / self-aware
/ ICP-mirroring
```
### Template 2 — Supplements
- **Competitor tracking bias**: Athletic Greens / Ritual / Bloom / Care/of / Seed / Momentous / MUD/WTR
- **Format bias**: 42% UGC / 22% cinematic / 18% talking head / 12% demo / 6% reaction
- **Winning hook mechanism bias**: number-led (28%) / confession (24%) / contrarian (18%)
- **Winning visual anchor bias**: ritual scene (32%) / capsule macro (24%) / lifestyle wide (22%)
- **9 realism details priority**: light temp drift (morning window light) + backdrop authenticity (cluttered kitchen counter) + voice imperfection (natural morning voice)
Attach:
```plain text
VERTICAL: Supplements
Format bias: UGC + cinematic +
talking head mix
Hook mechanism bias: number-led +
confession + contrarian
Visual anchor bias: ritual scene +
capsule macro
Realism priority: morning light +
kitchen clutter + honest voice
Backdrop: kitchen / bedside / gym
prep / morning routine
Voice cadence: authoritative but
approachable
```
### Template 3 — Beauty Devices
- **Competitor tracking bias**: SolaWave / Foreo / Nuface / TheraFace / Solawave / LYMA / TheraGun face
- **Format bias**: 38% demo / 30% before-after / 18% cinematic / 14% UGC
- **Winning hook mechanism bias**: physical demo (44%) / stakes (18%) / reversal (14%)
- **Winning visual anchor bias**: device-in-use (48%) / before-after split (28%) / product-hero (14%)
- **9 realism details priority**: character consistency (device shows results ON same person) + product handling authenticity (grip + button interaction)
Attach:
```plain text
VERTICAL: Beauty Devices
Format bias: heavy demo + before-
after
Hook mechanism bias: physical demo
+ stakes + reversal
Visual anchor bias: device-in-use
+ before-after split
Realism priority: character
consistency across before/after +
authentic device grip
Backdrop: vanity / bathroom /
mirror close-up
Voice cadence: skeptical-turned-
believer arc
```
### Template 4 — Fitness Apparel
- **Competitor tracking bias**: Alo / Lululemon / Vuori / Gymshark / Bandit / Beyond Yoga
- **Format bias**: 44% UGC / 24% cinematic / 20% lifestyle / 12% demo
- **Winning hook mechanism bias**: aspirational identity (32%) / physical demo (24%) / confession (20%)
- **Winning visual anchor bias**: body-in-motion (38%) / fabric detail macro (28%) / lifestyle wide (18%)
- **9 realism details priority**: fabric drape + natural sweat sheen + honest athletic body imperfections
Attach:
```plain text
VERTICAL: Fitness Apparel
Format bias: UGC + cinematic +
lifestyle
Hook mechanism bias: aspirational
identity + physical demo +
confession
Visual anchor bias: body-in-motion
+ fabric detail macro
Realism priority: fabric drape +
natural sweat + honest body
Backdrop: home gym / studio /
outdoor run / mirror
Voice cadence: confident but not
performative
```
### Template 5 — Food + Beverage
- **Competitor tracking bias**: Liquid Death / Poppi / Olipop / Athletic Brewing / RXBAR / Magic Spoon
- **Format bias**: 38% cinematic / 28% UGC / 18% demo / 12% reaction / 4% static
- **Winning hook mechanism bias**: ridiculous (26%) / curiosity (22%) / physical demo (20%) / reversal (18%)
- **Winning visual anchor bias**: pour shot / splash (34%) / product hero (26%) / ingredient reveal (22%)
- **9 realism details priority**: physics anchors (liquid viscosity + bubble formation) + product handling (grip on can/bottle)
Attach:
```plain text
VERTICAL: Food + Beverage
Format bias: cinematic + UGC +
demo mix
Hook mechanism bias: ridiculous +
curiosity + physical demo
Visual anchor bias: pour/splash +
product hero
Realism priority: liquid physics +
authentic grip
Backdrop: kitchen / outdoor /
lifestyle moment
Voice cadence: playful + bold +
category-challenging
```
### Template 6 — Premium Tech
- **Competitor tracking bias**: Loop earplugs / Framework laptop / Nothing Phone / Rabbit / Meta Ray-Ban / Boring Company products
- **Format bias**: 44% cinematic / 24% demo / 20% UGC / 12% static
- **Winning hook mechanism bias**: contrarian (28%) / curiosity (24%) / reversal (20%)
- **Winning visual anchor bias**: product-in-use lifestyle (38%) / macro detail (28%) / cinematic hero (22%)
- **9 realism details priority**: product handling (natural interaction + button feel) + backdrop authenticity (real home office not stock)
Attach:
```plain text
VERTICAL: Premium Tech
Format bias: heavy cinematic + demo
Hook mechanism bias: contrarian +
curiosity + reversal
Visual anchor bias: product-in-use
lifestyle + macro detail
Realism priority: natural product
interaction + authentic home
office
Backdrop: home office / commute /
travel / lifestyle moment
Voice cadence: understated
confident / anti-hype
```
---
## ⚙️ The 15-Minute End-To-End Workflow
**Minute 0-1**: Open Claude Project with 1-Chat Ad System prompt loaded. Paste your competitor list (5-10 brands + Meta Ad Library URLs).
**Minute 1-4**: Claude runs Step 1 (Competitor Research). Returns winners report with 3-5 winning product-angle combos.
**Minute 4-5**: You select 1-4 winning products to generate angles for. Paste selection.
**Minute 5-9**: Claude runs Step 2 (Angle Generation). Returns 5-10 AI UGC concepts per selected product with full briefs + tool routing.
**Minute 9-10**: You select 5-10 concepts to test + confirm weekly budget. Paste selection.
**Minute 10-12**: Claude runs Step 3 (Test Angles). Returns Meta campaign structure + budget allocation + naming/UTM + deployment sequence. Draft upload spec ready.
**Minute 12-13**: You upload drafts to Meta Ads Manager (manual paste or Meta Ads MCP if wired). Launch.
**Minute 13-15**: 24 hours later (not part of the 15 min): paste hour-24 performance into chat. Claude runs Step 4 (Kill-or-Scale Matrix). Returns decisions + scale approval queue + iteration briefs.
Total elapsed active operator time: **15 minutes across 2 days** (15 min prompt work + hour-24 review).
Compare to traditional workflow:
- Manual competitor research: 3-5 hours
- Concept generation with agency: 2-3 days
- UGC creator briefing: 1 day
- Wait for renders: 3-5 days
- Manual assembly + Meta upload: 4-6 hours
- Kill/scale decisions: manual guessing 5-7 days later
- **Total: 10-14 days + $15K per creative team cycle**
15 minutes vs 14 days. 1 chat vs 5 tools. $0 vs $15K.
---
## ⚙️ Common Failure Modes + Fixes
**Claude loses context mid-chat**<br>→ Every 4 steps hits token limits. When context feels stale, start fresh chat + paste the final output of last step as new starting input.
**Step 1 returns competitor products outside our category**<br>→ Add explicit category filter to Prompt 2: "Filter for [CATEGORY] products only. Exclude any competitor SKUs outside [CATEGORY]."
**Step 2 concepts feel generic**<br>→ Reinforce ICP language corpus: paste top 30 phrases from voice-of-customer mining directly into the chat before Step 2 fires.
**Step 3 campaign structure violates matrix rules**<br>→ Confirm matrix_core.md thresholds are populated. Prompt looks up thresholds per campaign objective — missing thresholds default to loose settings.
**Step 4 kill decisions too aggressive at hour 24**<br>→ Hour 24 is early. Adjust matrix thresholds to allow 48h before kill decisions on ads under $1K spend.
**Vertical template biases too rigid**<br>→ Vertical bias is a starting point, not a straitjacket. Explicitly tell Claude "Bias is a starting point. Recommend concepts outside the bias if signal supports it."
**Concepts miss AI UGC realism details**<br>→ Confirm the 9 realism details block is attached to Prompt 3. Skip = flat AI UGC that fails 3-second retention.
---
## ⚙️ What NOT To Do
→ Don't skip the Brain prerequisites. Every prompt references brand context via SessionStart.
→ Don't skip the 30+ day competitor ad filter. Under-30-day ads are testing, not winning. Filter for signal.
→ Don't auto-execute scale decisions from Step 4. Operator approves every scale increase.
→ Don't launch ads to LIVE from Step 3. Always land in DRAFT for operator review.
→ Don't skip the 9 realism details in AI UGC briefs. Flat AI UGC dies in the first 3 seconds.
→ Don't try to run all 4 steps at once in the first invocation. Let each step's output inform the next.
→ Don't run this weekly on the same 5 competitors. Rotate the competitor list monthly to catch emerging players.
→ Don't ignore the post-mortem log from Step 4. Every kill teaches Step 1 what patterns to avoid next cycle.
→ Don't skip vertical templates. They compress category-specific tuning that would otherwise take 3-5 iterations to dial in.
→ Don't share the Skill system prompt publicly. Contains brand context + API structure competitors could copy.
---
## 🎯 Closer
**Save Prompt 1 as a Claude Project. Paste your competitor list. Run Step 1. Select winners. Run Step 2. Select concepts. Run Step 3. Upload drafts. Launch. 24 hours later, paste performance into the same chat. Run Step 4. Approve scales. Iterate winners. In 15 minutes of active operator time across 2 days, you ship what a $15K creative team ships in 2 weeks. The system is yours forever. Every step reinforces the next. Every kill informs the next cycle. Every winner iterates. You install once. You run every week.**
The orchestration layer was the missing piece.
4 chained prompts in 1 chat replace 5 tools + 2 weeks of manual handoffs.
Every step's output feeds the next automatically.
---
**Prerequisites + 4-step workflow + master orchestrator prompt + 3 sub-prompts + 6 vertical templates + 15-minute end-to-end walkthrough is the complete system. Bookmark this guide. Save Prompt 1 today.**
---
