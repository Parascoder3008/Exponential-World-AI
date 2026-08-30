---
title: "The DTC Creative Engine"
page_id: 3bb92e2e92e980e8bdaff37cd511e91c
layer: production
source: https://freebie-for-you.notion.site/3bb92e2e92e980e8bdaff37cd511e91c
---
# The Complete Claude + n8n Workflow That Turns One Brand Brief Into 20 Deploy-Ready Ads Per Week Across 4 Automated Stages With 30 Nodes Chaining Concept To Meta Upload Without An Agency Or A Manual Production Handoff
---
## 🎯 What You're Getting
The complete Claude + n8n workflow that manufactures 20 DTC ads per week from one brand brief. Not a prompt pack. Not a skill list. A production-ready automation architecture with 30 wired nodes across 4 stages, every Claude prompt written, every API integration mapped, every approval loop specified.
The engine runs through 4 stages:
1. **Strategy & Input** — 7 nodes that turn brand brief into a full concepts database
2. **Ideation & Scripting** — 7 nodes that turn concepts into approved storyboards
3. **Production & Pipeline** — 8 nodes that turn storyboards into finished ad files
4. **Optimisation & Distribution** — 8 nodes that turn finished ads into scaled winners
Every node has its tool, purpose, input, output, Claude prompt (if applicable), and handoff to the next node. Every stage has a defined trigger + approval loop. The whole thing runs on autopilot from Monday 9:00 AM to Friday 5:00 PM.
Instead of paying an agency $30K a month, you build a system that ships 20 ads per week.
Original workflow inspired by Dmitro Fedenko's Content Creation Engine.
---
## ⚙️ Stack Overview
The Engine runs on 6 tools:
<table header-row="true">
<tr>
<td>Tool</td>
<td>Role</td>
<td>Cost</td>
</tr>
<tr>
<td>Claude (via API or MCP)</td>
<td>Ideation + scripting + prompt engineering + QA</td>
<td>$20-100/mo</td>
</tr>
<tr>
<td>n8n</td>
<td>Workflow orchestration + node chaining</td>
<td>$20/mo (self-hosted free)</td>
</tr>
<tr>
<td>Perplexity API</td>
<td>Market + competitor research</td>
<td>$20/mo</td>
</tr>
<tr>
<td>Higgsfield API</td>
<td>Seedance batch rendering</td>
<td>$100-300/mo</td>
</tr>
<tr>
<td>CapCut API</td>
<td>Assembly + export</td>
<td>$10-30/mo</td>
</tr>
<tr>
<td>Meta Ads API</td>
<td>Upload + campaign creation</td>
<td>Free (with ad account)</td>
</tr>
</table>
Optional add-ons: Google Sheets (databases), Epidemic Sound (music), Slack (approvals), Make/Zapier (cross-tool triggers).
Total monthly cost: **$200-500** vs $15-40K for an agency doing the same volume.
---
## ⚙️ Stage 1 — Strategy & Input
Takes your product, ICP, offer, and brand voice, then researches what your market is already scrolling past, engaging with, and buying from. Outputs a fully populated concepts database.
### Node 1 — Manual Trigger (Start)
**Type**: n8n Manual Trigger<br>**Purpose**: Kick off the weekly sprint. Fires Monday 9:00 AM via scheduled cron or manual button.<br>**Input**: None<br>**Output**: Trigger signal to Node 2
### Node 2 — Brand Brief Intake (Google Sheets Read)
**Type**: Google Sheets Read<br>**Purpose**: Pull the current week's brand brief from a Google Sheet the operator maintains.<br>**Input**: Google Sheet ID + tab name<br>**Output**: JSON blob with product SKU, ICP, offer, brand voice notes, priority hero products, campaign objective
Sheet columns:
```plain text
| Week | Hero SKU | ICP | Offer | Voice Notes
| Campaign Objective | Weekly Ad Quota |
```
### Node 3 — ICP & Market Research (Perplexity Search)
**Type**: Perplexity API Search<br>**Purpose**: Research what your ICP is currently watching, sharing, and buying in your category.<br>**Input**: ICP demographic + category from Node 2<br>**Output**: Structured research brief (trends + top-performing content + shifts in buying behavior)
Query template:
```javascript
What are [ICP] currently engaging with on
TikTok / Instagram Reels / YouTube Shorts
regarding [CATEGORY] in the last 14 days?
Focus on: top 10 viral formats, top 5 hook
patterns, emerging pain points, price
sensitivity signals. Cite sources.
```
### Node 4 — Competitor Ad Analysis (Claude via OpenAI-compatible endpoint)
**Type**: OpenAI Message (using Claude model)<br>**Purpose**: Analyze competitor ads and identify structural DNA + gaps.<br>**Input**: Research brief from Node 3 + list of competitors from brand brief<br>**Output**: Competitor breakdown (top-performing formats + hook patterns + creative gaps)
Claude prompt:
```javascript
You are analyzing competitor DTC ads for
[BRAND].

Input: research brief from Perplexity + list
of competitors [COMPETITORS].

Task:
1. Identify top 5 competitor ads by
   engagement signal
2. Break each into 5 structural beats (hook /
   setup / turn / payoff / CTA)
3. Identify psychological mechanism per beat
4. Flag creative gaps [BRAND] can exploit

Output: structured markdown with breakdowns +
gap list.
```
### Node 5 — Creative Pillars Generator (Claude)
**Type**: OpenAI Message (Claude)<br>**Purpose**: Generate 5-8 creative pillars that will define this week's ad output.<br>**Input**: Brand brief + research + competitor breakdown<br>**Output**: 5-8 pillar briefs (each 1 paragraph)
Claude prompt:
```javascript
You are the Creative Pillars Generator for
[BRAND].

Input: brand brief + market research +
competitor breakdown.

Task: generate 5-8 creative pillars for this
week's ad output. Each pillar must:
- Address a specific ICP pain point or desire
- Exploit a gap competitors are missing
- Be distinct from each other
- Match [BRAND] voice from voice_core.md
- Include: pillar name, 1-paragraph brief,
  ICP fit score, novelty score

Output: table with 5-8 rows.
```
### Node 6 — Concept Ideas Generator (Claude)
**Type**: OpenAI Message (Claude)<br>**Purpose**: Generate 20 concept ideas per pillar. If 5 pillars, that produces 100 concept ideas.<br>**Input**: 5-8 pillars from Node 5<br>**Output**: 100 concept ideas (5-8 pillars x 20 concepts each)
Claude prompt:
```javascript
You are the Concept Ideas Generator for
[BRAND].

Input: 5-8 creative pillars from Node 5.

Task: for each pillar, generate 20 distinct
ad concepts. Each concept:
- 1-line premise
- Hook (under 12 words)
- Format (UGC / cinematic / reaction / demo)
- Funnel position (TOF / MOF / BOF)
- Primary angle
- ICP fit + novelty scores

Rank all concepts by combined score. Highlight
top 20 across all pillars for this week's
production.

Output: table with all concepts + top 20
flagged.
```
### Node 7 — Concepts Database (Google Sheets Append)
**Type**: Google Sheets Append<br>**Purpose**: Log all generated concepts to a persistent database.<br>**Input**: Concept table from Node 6<br>**Output**: Rows appended to concepts database
Sheet columns:
```plain text
| Concept ID | Week | Pillar | Premise | Hook
| Format | Funnel | Score | Selected |
Storyboard ID | Status |
```
**Handoff**: Stage 1 complete. Top 20 concepts flow into Stage 2.
---
## ⚙️ Stage 2 — Ideation & Scripting
Claude generates concept ideas, pattern-break hooks, storyboards, and CTAs based on your matrix. Every storyboard passes through an approval loop before it moves into production.
### Node 1 — Select Concepts Priority (Google Sheets Read)
**Type**: Google Sheets Read<br>**Purpose**: Pull the top 20 concepts flagged from Stage 1.<br>**Input**: Concepts database + filter (this week + selected=TRUE)<br>**Output**: 20 concept rows
### Node 2 — Hook Generator (Claude)
**Type**: OpenAI Message (Claude)<br>**Purpose**: Generate 10 hook variants per concept using 10 distinct pattern-break mechanisms.<br>**Input**: 20 concepts from Node 1<br>**Output**: 200 hook variants (20 concepts x 10 hooks each)
Claude prompt:
```javascript
You are the Hook Generator for [BRAND].

Input: 20 concepts.

Task: for each concept, generate 10 hooks
(under 12 words each) using these 10
mechanisms: contrarian / curiosity / number /
named enemy / physical demo / confession /
category reframe / stakes / reversal /
ridiculous.

Score each hook (1-10) on: pattern-break
strength / specificity / ICP resonance /
voice fit. Keep top 3 per concept.

Output: table with 60 hooks (20 concepts x 3
top hooks).
```
### Node 3 — Storyboard Writer (Claude)
**Type**: OpenAI Message (Claude)<br>**Purpose**: Turn each top hook into a full 6-shot storyboard.<br>**Input**: 60 hooks from Node 2<br>**Output**: 60 storyboards
Claude prompt:
```javascript
You are the Storyboard Writer for [BRAND].

Input: 60 concept + hook pairs.

Task: produce a 6-shot storyboard per pair.
Structure: hook (0-3s) / setup (3-6s) /
escalation (6-12s) / turn (12-18s) / payoff
(18-24s) / CTA (24-30s).

Each shot: visual + camera + audio + overlay
+ duration.

Output: 60 storyboards in structured format.
```
### Node 4 — CTA & Offer Generator (Claude)
**Type**: OpenAI Message (Claude)<br>**Purpose**: Write CTA + offer language for each storyboard's final shot.<br>**Input**: 60 storyboards + campaign objective<br>**Output**: 60 CTA blocks
Claude prompt:
```javascript
You are the CTA & Offer Generator for [BRAND].

Input: 60 storyboards + campaign objective
(Sales / Traffic / Engagement) + current
offer.

Task: write the CTA + offer language for the
final shot (24-30s) of each storyboard.
Include:
- On-screen CTA (under 4 words)
- Voiceover CTA (under 8 words)
- Offer positioning (urgency / value / risk
  reversal)

Output: 60 CTA blocks matched to storyboards.
```
### Node 5 — Storyboard Refiner Polish (Claude)
**Type**: OpenAI Message (Claude)<br>**Purpose**: QA the storyboards for pacing + brand voice + slop check.<br>**Input**: 60 storyboards + CTAs<br>**Output**: 60 polished storyboards with QA scores
Claude prompt:
```javascript
You are the Storyboard Refiner for [BRAND].

Input: 60 storyboards with CTAs.

Task:
1. Score pacing on 4 dimensions (hook
   stickiness / retention curve / turn
   impact / payoff satisfaction), 1-10 each
2. Run slop check: kill any storyboard with
   "leverage" / "unlock" / "game-changer" /
   "dive into" / em dashes
3. Rewrite any beat scoring under 7
4. Flag storyboards with total score above 32
   as READY, below as REVISE

Output: 60 polished storyboards + status
flag.
```
### Node 6 — Approved? (IF Branch)
**Type**: n8n IF Node<br>**Purpose**: Route READY storyboards forward; loop REVISE storyboards back through Nodes 2-5 for 1 more pass.<br>**Input**: 60 polished storyboards<br>**Output**: Yes branch → Node 7 / No branch → Loop back to Node 2
Approval logic: total pacing score ≥ 32 AND slop check passed = approved.
### Node 7 — Approved Storyboards Database (Google Sheets Append)
**Type**: Google Sheets Append<br>**Purpose**: Log approved storyboards for downstream production.<br>**Input**: Approved storyboards from Node 6<br>**Output**: Rows appended to approved storyboards database
Sheet columns:
```plain text
| Storyboard ID | Concept ID | Hook |
Pacing Score | Slop Check | Status |
Production Started | Production Complete |
```
**Handoff**: Stage 2 complete. Approved storyboards (typically 20-30 per week) flow into Stage 3.
---
## ⚙️ Stage 3 — Production & Pipeline
The system creates the visual direction, shot list, Seedance prompts, character locks, product locks, CapCut assembly brief, and final export instructions.
### Node 1 — Visual Direction & Scene Plan (Claude)
**Type**: OpenAI Message (Claude)<br>**Purpose**: Turn each approved storyboard into a full visual direction brief (aesthetic + lighting + palette + mood per shot).<br>**Input**: Approved storyboards from Stage 2<br>**Output**: 20-30 visual direction briefs
Claude prompt:
```javascript
You are the Visual Direction Planner for
[BRAND].

Input: approved storyboards.

Task: for each storyboard, produce a shot-by-
shot visual direction brief covering:
- Aesthetic per shot (from aesthetic_core.md)
- Lighting direction + quality
- Color palette
- Mood + emotion
- Physical props required

Output: structured briefs, one per storyboard.
```
### Node 2 — Shot List Generator (Claude)
**Type**: OpenAI Message (Claude)<br>**Purpose**: Generate a technical shot list per storyboard (camera + lens + movement + duration per shot).<br>**Input**: Visual direction briefs<br>**Output**: 20-30 shot lists
Claude prompt:
```javascript
You are the Shot List Generator for [BRAND].

Input: visual direction briefs.

Task: for each brief, produce a technical shot
list. Per shot:
- Camera (lens / focal length / f-stop)
- Movement (static / pan / dolly / crane)
- Composition (rule of thirds / centered /
  wide)
- Duration (seconds)

Output: shot lists in table format per
storyboard.
```
### Node 3 — Character & Product Lock Builder (Claude)
**Type**: OpenAI Message (Claude)<br>**Purpose**: Attach character + product locks to every shot that requires them.<br>**Input**: Shot lists + asset locks library<br>**Output**: Shot lists with locks embedded
Claude prompt:
```javascript
You are the Character & Product Lock Builder
for [BRAND].

Input: shot lists + asset locks library
(@character_[NAME] + @product_[SKU] refs
with lock strengths).

Task: for every shot requiring a character or
product, attach the correct lock reference at
the recommended strength (Seedance: 0.97
characters / 0.95 products / Nano Banana:
0.95 / 0.90).

Output: shot lists with locks embedded
inline.
```
### Node 4 — Seedance Prompt Engineer (Claude)
**Type**: OpenAI Message (Claude)<br>**Purpose**: Turn every shot into a paste-ready Seedance 2.5 prompt.<br>**Input**: Shot lists with locks<br>**Output**: 120-180 Seedance prompts (20-30 storyboards x 6 shots each)
Claude prompt:
```javascript
You are the Seedance Prompt Engineer for
[BRAND].

Input: shot list + character lock + product
lock per shot.

Task: build a complete Seedance 2.5 prompt
per shot including:
- Full scene description
- Camera direction (lens + motion)
- Lighting (direction + quality)
- Physics (materials + weight + momentum)
- Character lock (@character_[NAME] at 0.97)
- Product lock (@product_[SKU] at 0.95)
- Style anchors
- Negative prompt (anti-artifact anchors)
- Duration
- Aspect ratio 9:16

Output: paste-ready prompt blocks, one per
shot.
```
### Node 5 — Higgsfield Batch Renderer (Higgsfield API)
**Type**: HTTP Request to Higgsfield API<br>**Purpose**: Queue all Seedance prompts as batches, monitor progress, download outputs.<br>**Input**: 120-180 Seedance prompts<br>**Output**: 120-180 rendered video clips (typically 45-90 minutes render time)
n8n config:
```javascript
POST <https://api.higgsfield.ai/v1/batch>
Headers:
  Authorization: Bearer $HIGGSFIELD_API_KEY
Body:
  batch_name: "[BRAND]_Week[X]_[Date]"
  prompts: [array of Seedance prompts]
  model: "seedance-2.5"
  aspect_ratio: "9:16"
  callback_url: [n8n webhook for completion]
```
Include retry logic: if any prompt fails, route to Render-Failure Diagnostic (a Claude node that rewrites + requeues).
### Node 6 — CapCut Assembly Director (Claude)
**Type**: OpenAI Message (Claude)<br>**Purpose**: Generate CapCut assembly brief per finished ad.<br>**Input**: Rendered clips + original storyboards<br>**Output**: 20-30 assembly briefs
Claude prompt:
```javascript
You are the CapCut Assembly Director for
[BRAND].

Input: rendered clips + original storyboard.

Task: produce a complete CapCut assembly
brief:
- Timeline (shot-by-shot with in/out points)
- Transitions (cut / whip / dip)
- Music sync points
- SFX layers
- Text overlay timing
- Color grade preset (from aesthetic_core.md)
- Final export spec (9:16 / 1:1 / 16:9)

Output: assembly brief per finished ad.
```
### Node 7 — Music & SFX Selector (Epidemic Sound API)
**Type**: HTTP Request to Epidemic Sound<br>**Purpose**: Auto-select music track + SFX matching the assembly brief's mood + BPM.<br>**Input**: Assembly brief mood tags<br>**Output**: Track + SFX file URLs per ad
Query template:
```javascript
GET /tracks?mood=[MOOD_TAG]&bpm=[BPM_RANGE]&
duration_min=15&duration_max=60
```
### Node 8 — Final Polish & Effects (CapCut API)
**Type**: HTTP Request to CapCut API<br>**Purpose**: Execute the assembly brief programmatically, apply color grade, export final files.<br>**Input**: Assembly brief + music/SFX + rendered clips<br>**Output**: 20-30 finished deploy-ready video files
**Handoff**: Stage 3 complete. Finished ads flow into Stage 4.
---
## ⚙️ Stage 4 — Optimisation & Distribution
Generates 5 A/B variations, checks the ads against a quality framework, exports for every ad platform, and tracks the results.
### Node 1 — Performance Prediction (Claude)
**Type**: OpenAI Message (Claude)<br>**Purpose**: Predict which of the 20-30 finished ads are most likely to win before deploying.<br>**Input**: Finished ads + historical winning ads library<br>**Output**: Ranked prediction list (top 10 / middle 10 / bottom 10)
Claude prompt:
```javascript
You are the Performance Predictor for [BRAND].

Input: 20-30 finished ads + winning ads
library from last 90 days.

Task: score each ad on 5 dimensions
predictive of performance (1-10):
- Hook stickiness (structural match to
  winning library)
- Retention curve prediction
- ICP fit
- Novelty vs current winners
- Voice fit

Total score = sum / 50. Rank all ads.

Output: ranked list with predictions +
reasoning.
```
### Node 2 — A/B Variations Generator (Claude)
**Type**: OpenAI Message (Claude)<br>**Purpose**: For top 10 predicted winners, generate 5 A/B variations each following the 5-variant iteration framework.<br>**Input**: Top 10 predicted winners<br>**Output**: 50 variation briefs
Claude prompt:
```javascript
You are the A/B Variations Generator for
[BRAND].

Input: 10 top-predicted ads.

Task: for each ad, produce 5 A/B variations
using the 5-variant framework:
1. Same hook + new visual style
2. New hook (same mechanism) + same
   storyboard
3. Same everything + new character
4. Same everything + new music + new overlays
5. Reversed structure (payoff first)

Output: 50 variation briefs, each ready to
route back through Stage 3.
```
### Node 3 — Generate Variations Edits (Higgsfield + CapCut APIs)
**Type**: HTTP Request chain<br>**Purpose**: Execute the 50 variation briefs by routing back through the Seedance renderer + CapCut assembly.<br>**Input**: 50 variation briefs<br>**Output**: 50 finished variation files
This node re-uses Stage 3 nodes 4-8 as a sub-workflow.
### Node 4 — Quality Check Checklist (Claude)
**Type**: OpenAI Message (Claude)<br>**Purpose**: Run every finished ad + variation through a quality checklist before publish approval.<br>**Input**: All finished ads + variations<br>**Output**: Pass / Fail per ad with specific fail reasons
Claude prompt:
```javascript
You are the Quality Check Checklist for
[BRAND].

Input: finished ad file description +
storyboard.

Task: verify against 10-item checklist:
1. Character consistency across all shots
2. Product consistency across all shots
3. Hook lands in first 3s
4. On-screen text readable at 9:16 mobile
5. Voiceover audible + on-brand voice
6. CTA visible in final shot
7. Music sync tight
8. No visual artifacts or drift
9. Duration matches spec
10. Aspect ratio correct

Pass = all 10 green. Fail = any red + specific
reason.

Output: checklist results per ad.
```
### Node 5 — Approved for Publish? (IF Branch)
**Type**: n8n IF Node<br>**Purpose**: Route PASS ads to publish; loop FAIL ads back through the fix pipeline.<br>**Input**: Quality check results<br>**Output**: Yes branch → Node 6 / No branch → back to Stage 3 for fix
### Node 6 — Export & Format (CapCut Export)
**Type**: HTTP Request to CapCut API<br>**Purpose**: Export approved ads at 9:16 (Meta feeds / Reels / TikTok / Shorts) + 1:1 (Meta feeds) + 16:9 (YouTube).<br>**Input**: Approved ad files<br>**Output**: 3 aspect-ratio variants per ad
### Node 7 — Publish to Meta Ads (Meta Ads API)
**Type**: HTTP Request to Meta Marketing API<br>**Purpose**: Upload finished ads to Meta Ads Manager with correct campaign structure, naming convention, and UTM parameters.<br>**Input**: Exported ad files + campaign spec from brand brief<br>**Output**: Live ads in Meta (draft status by default; operator flips to live after final review)
Meta API config:
```javascript
POST /act_[AD_ACCOUNT_ID]/adcreatives
Body:
  name: "[BRAND]_[Objective]_[Audience]_
    [Concept]_[Date]_[Variant]"
  video_id: [uploaded video ID]
  call_to_action: [CTA type + link]
  tracking_specs: [UTMs]
```
### Node 8 — Performance Tracker (Google Sheets Append)
**Type**: Google Sheets Append<br>**Purpose**: Log every deployed ad with pre-launch prediction score + Meta ad ID + launch date. Poll performance every 24h via Meta MCP + append actuals for comparison.<br>**Input**: Deployed ad metadata + daily Meta API polls<br>**Output**: Rows appended to performance tracker
Sheet columns:
```plain text
| Ad ID | Concept ID | Storyboard ID | Launch
Date | Pred Score | Actual ROAS 24h | Actual
ROAS 48h | Actual ROAS 7d | Kill/Scale
Decision | Notes |
```
The Performance Tracker feeds back into Stage 1's Concept Ideas Generator so next week's ideation is biased toward mechanisms that actually won.
**Handoff**: Stage 4 complete. Loop closes back to Stage 1 for next week's sprint.
---
## ⚙️ The Full Weekly Workflow
Monday 9:00 AM: Manual trigger fires. Stage 1 runs (30 minutes). 100 concept ideas generated + top 20 flagged.
Monday 9:30 AM to Tuesday 12:00 PM: Stage 2 runs. 200 hooks → 60 storyboards → 60 CTAs → polish → approve. Typical output: 20-30 approved storyboards.
Tuesday 12:00 PM to Wednesday 6:00 PM: Stage 3 runs. Visual direction → shot lists → locks → Seedance prompts → Higgsfield batches → CapCut assembly. Typical output: 20-30 finished ads.
Wednesday 6:00 PM to Thursday 6:00 PM: Stage 4 runs. Performance prediction → 50 variations → quality check → export → publish. Typical output: 20-30 primary ads + 50 variations queued in Meta draft.
Thursday 6:00 PM: Operator reviews Meta drafts (30-60 min). Approves for launch.
Friday: Ads run live. Performance Tracker polls actuals.
Friday 3:00 PM: Weekly Executive Report auto-generated (pulls from Performance Tracker + prediction accuracy + kill/scale decisions).
Total operator time per week: **2-4 hours** for review + approval. The rest is autonomous.
---
## ⚙️ Setup Guide
### Prerequisites (60 min)
1. n8n instance (self-hosted or cloud)
2. Claude API access (via API or Claude Code MCP)
3. Perplexity API key
4. Higgsfield API access
5. CapCut API access (or CapCut Desktop for manual assembly variant)
6. Meta Ads API access + ad account
7. Google Sheets (Concepts / Approved Storyboards / Performance Tracker databases)
8. Epidemic Sound subscription (optional)
### Environment variables
```bash
CLAUDE_API_KEY=sk-...
PERPLEXITY_API_KEY=pplx-...
HIGGSFIELD_API_KEY=hf_...
CAPCUT_API_KEY=cc_...
META_ACCESS_TOKEN=EAA...
META_AD_ACCOUNT_ID=act_...
GOOGLE_SHEETS_ID_CONCEPTS=...
GOOGLE_SHEETS_ID_STORYBOARDS=...
GOOGLE_SHEETS_ID_PERFORMANCE=...
EPIDEMIC_SOUND_API_KEY=... (optional)
```
### Build order (recommended)
1. **Days 1-2**: Build Stage 1 (Nodes 1-7). Test with 1 real brand brief. Confirm 100 concepts + top 20 flagged.
2. **Days 3-4**: Build Stage 2 (Nodes 1-7). Test with the 20 concepts from Stage 1. Confirm 20-30 approved storyboards.
3. **Days 5-7**: Build Stage 3 (Nodes 1-8). Test with 3 storyboards end-to-end. Confirm finished MP4 files.
4. **Days 8-10**: Build Stage 4 (Nodes 1-8). Test with 3 finished ads. Confirm they land in Meta as drafts.
5. **Days 11-14**: Wire the full weekly sprint. Add cron trigger. Run the first full week live.
By Day 14: full Engine live.
---
## ⚙️ Sample Week — What The Engine Ships
Monday 9:00 AM trigger fires for hero SKU "Retinol Serum."
By Friday 5:00 PM:
- 100 concepts generated
- 20 concepts selected
- 60 hooks written + scored
- 30 storyboards approved
- 180 Seedance prompts rendered
- 30 finished ads assembled
- 50 A/B variations produced
- 24 ads passed quality check
- 24 ads uploaded to Meta as drafts
- Operator approved 22 for launch
- 22 ads live by Friday 5:00 PM
- Weekly Executive Report emailed to founder at 3:00 PM
Total operator time: **3 hours 40 minutes** (Monday brief review 20 min + Wednesday approval review 40 min + Thursday launch review 60 min + Friday report review 20 min + 60 min buffer for exceptions).
Total ad output: **22 live ads per week** running at agency-tier quality.
Traditional equivalent: 6-person creative team (strategist + writer + art director + editor + producer + media buyer) + 60 hours + $8-12K in labor per week.
Engine cost per week: **$50-125** in API + tool costs + 3.5 hours of operator time.
Delta per week: **$8-12K saved** while shipping the same or more ads.<br>Delta per year: **$400K-600K saved** on creative team costs alone.
---
## ⚙️ What NOT to Do
→ Don't run all 4 stages simultaneously on Day 1. Build stage-by-stage and test each in isolation before wiring them.
→ Don't skip the Google Sheets databases. Without persistent state, the Engine cannot learn from performance data.
→ Don't set Meta ads to auto-launch. Always land in draft, always require operator approval before flipping live.
→ Don't hard-code brand context inside n8n nodes. Reference the Brain (voice_core.md / icp_core.md / matrix_core.md) so brand updates propagate everywhere.
→ Don't skip Node 3 in Stage 3 (Character & Product Lock Builder). Every downstream render depends on locked references. Skip this = character drift = brand drift = wasted spend.
→ Don't skip Node 4 in Stage 4 (Quality Check Checklist). Deploying unchecked AI ads = expensive lesson in brand damage.
→ Don't build the Engine before you have 6-8 winning ads in your history. The Engine needs a winning ads library to bias predictions. Without it, Node 1 in Stage 4 is guessing.
→ Don't cheap out on Higgsfield tier. The Engine ships 120-180 renders per week. Free / low tiers will throttle you.
→ Don't share n8n workflow exports publicly. Your API keys + brand context + Sheet IDs are inside.
→ Don't hire an agency for work the Engine is doing by Week 4. Cancel the retainer, redirect to ad spend + tool upgrades.
---
## ⚙️ The Feedback Loop That Makes Next Week Better
The Engine is not a one-shot pipeline. It compounds.
Every Friday, the Performance Tracker (Stage 4 Node 8) writes actuals back to the Concepts database and Storyboards database. Every Monday, Stage 1's Concept Ideas Generator (Node 6) reads the last 4 weeks of performance data before generating new concepts.
The Engine learns:
- Which hook mechanisms win for YOUR ICP
- Which visual styles retain viewers past 3s
- Which characters + products produce the highest ROAS
- Which competitor formats to imitate + which to ignore
By Week 4: prediction accuracy at Stage 4 Node 1 rises 20-30%.<br>By Week 12: 80% of top-predicted ads are actual top performers.<br>By Week 24: the Engine is producing ads that outperform what a human strategist would have shipped.
The compounding advantage is why the Engine beats an agency long-term. Agencies restart from zero every time you switch account managers. The Engine's memory only grows.
---
## ⚙️ The Complete Node Inventory
<table header-row="true">
<tr>
<td>Stage</td>
<td>Node #</td>
<td>Name</td>
<td>Tool</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>Manual Trigger</td>
<td>n8n</td>
</tr>
<tr>
<td>1</td>
<td>2</td>
<td>Brand Brief Intake</td>
<td>Google Sheets</td>
</tr>
<tr>
<td>1</td>
<td>3</td>
<td>ICP & Market Research</td>
<td>Perplexity</td>
</tr>
<tr>
<td>1</td>
<td>4</td>
<td>Competitor Ad Analysis</td>
<td>Claude</td>
</tr>
<tr>
<td>1</td>
<td>5</td>
<td>Creative Pillars Generator</td>
<td>Claude</td>
</tr>
<tr>
<td>1</td>
<td>6</td>
<td>Concept Ideas Generator</td>
<td>Claude</td>
</tr>
<tr>
<td>1</td>
<td>7</td>
<td>Concepts Database</td>
<td>Google Sheets</td>
</tr>
<tr>
<td>2</td>
<td>1</td>
<td>Select Concepts Priority</td>
<td>Google Sheets</td>
</tr>
<tr>
<td>2</td>
<td>2</td>
<td>Hook Generator</td>
<td>Claude</td>
</tr>
<tr>
<td>2</td>
<td>3</td>
<td>Storyboard Writer</td>
<td>Claude</td>
</tr>
<tr>
<td>2</td>
<td>4</td>
<td>CTA & Offer Generator</td>
<td>Claude</td>
</tr>
<tr>
<td>2</td>
<td>5</td>
<td>Storyboard Refiner Polish</td>
<td>Claude</td>
</tr>
<tr>
<td>2</td>
<td>6</td>
<td>Approved? IF Branch</td>
<td>n8n</td>
</tr>
<tr>
<td>2</td>
<td>7</td>
<td>Approved Storyboards Database</td>
<td>Google Sheets</td>
</tr>
<tr>
<td>3</td>
<td>1</td>
<td>Visual Direction & Scene Plan</td>
<td>Claude</td>
</tr>
<tr>
<td>3</td>
<td>2</td>
<td>Shot List Generator</td>
<td>Claude</td>
</tr>
<tr>
<td>3</td>
<td>3</td>
<td>Character & Product Lock Builder</td>
<td>Claude</td>
</tr>
<tr>
<td>3</td>
<td>4</td>
<td>Seedance Prompt Engineer</td>
<td>Claude</td>
</tr>
<tr>
<td>3</td>
<td>5</td>
<td>Higgsfield Batch Renderer</td>
<td>Higgsfield API</td>
</tr>
<tr>
<td>3</td>
<td>6</td>
<td>CapCut Assembly Director</td>
<td>Claude</td>
</tr>
<tr>
<td>3</td>
<td>7</td>
<td>Music & SFX Selector</td>
<td>Epidemic Sound</td>
</tr>
<tr>
<td>3</td>
<td>8</td>
<td>Final Polish & Effects</td>
<td>CapCut API</td>
</tr>
<tr>
<td>4</td>
<td>1</td>
<td>Performance Prediction</td>
<td>Claude</td>
</tr>
<tr>
<td>4</td>
<td>2</td>
<td>A/B Variations Generator</td>
<td>Claude</td>
</tr>
<tr>
<td>4</td>
<td>3</td>
<td>Generate Variations Edits</td>
<td>Higgsfield + CapCut</td>
</tr>
<tr>
<td>4</td>
<td>4</td>
<td>Quality Check Checklist</td>
<td>Claude</td>
</tr>
<tr>
<td>4</td>
<td>5</td>
<td>Approved for Publish? IF Branch</td>
<td>n8n</td>
</tr>
<tr>
<td>4</td>
<td>6</td>
<td>Export & Format</td>
<td>CapCut API</td>
</tr>
<tr>
<td>4</td>
<td>7</td>
<td>Publish to Meta Ads</td>
<td>Meta Ads API</td>
</tr>
<tr>
<td>4</td>
<td>8</td>
<td>Performance Tracker</td>
<td>Google Sheets</td>
</tr>
</table>
**Total: 30 nodes, 4 stages, 1 weekly sprint, 20-25 live ads per week.**
---
## 🎯 Closer
**Build Stage 1 in 2 days. Stage 2 in 2 days. Stage 3 in 3 days. Stage 4 in 3 days. Wire the weekly sprint in 4 days. Total build time: 14 days. By Week 3 you are shipping 20-25 ads per week on autopilot for $50-125 in tool costs instead of $8-12K in agency retainers. Every node in this guide has a copy-ready spec. Every Claude node has a paste-ready prompt. Every API integration has an example payload. Every stage has an approval loop. The Engine learns from performance data and compounds week over week. You do not hire the creative team. You wire the Engine. Then you review approvals and watch the Performance Tracker fill in.**
The manual ad production bottleneck was the constraint.
30 wired nodes across 4 automated stages is what dissolves it.
Instead of paying for every impression, you build a system that manufactures attention every week.
Original workflow inspired by Dmitro Fedenko's Content Creation Engine.
---
**30 nodes + 4 stages + every Claude prompt + every API integration + full weekly workflow + 14-day setup guide is the full Engine. Bookmark this guide. Build Stage 1 today.**
---
