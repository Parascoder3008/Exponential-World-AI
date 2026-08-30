---
title: "The Claude + Higgsfield ROAS System"
page_id: 38892e2e92e98034ad05df288a8fa795
layer: reporting
source: https://freebie-for-you.notion.site/38892e2e92e98034ad05df288a8fa795
---
# The Claude + Higgsfield ROAS System: Audit Your Account, Rewrite Weak Hooks, Ship Higher-Converting Variations in 24 Hours
---
## 🎯 What You're Getting
The exact 2-tool system that diagnoses why your ads aren't converting, rewrites the weakest hooks into higher-converting angles, ships brand-locked creative variations via Higgsfield, and runs a 24-hour testing cycle with a precise kill-or-scale matrix. No more launching 20 variations and praying. No more killing winners on day 2. No more scaling losers because the "creative looked good." Just account-level diagnostic + Claude-engineered hook rewrites + Higgsfield-produced creative + a decision matrix with exact thresholds.
The master Claude account audit prompt (paste-ready into a Claude Project). The hook rewriting system that turns weak angles into high-ROAS ones. The kill-or-scale decision matrix with exact thresholds at hour 24. The Higgsfield creative production process that holds brand identity across variations. The 24-hour testing cycle. The full Claude prompt library for competitor account analysis. The end-to-end Claude project setup you can install today.
You stop briefing Claude like a copywriter. You start briefing it like a media buyer — with account data, performance metrics, audience signals, and budget constraints. Claude reads the data 10x deeper than you can read it manually. The audit finds why ads aren't converting. The rewrite addresses the specific weakness. The matrix tells you what to scale and what to kill, with thresholds you can defend.
By the end of this guide, you'll have:
→ The master Claude account audit prompt<br>→ The hook rewriting system that turns weak angles into high-ROAS ones<br>→ The kill-or-scale decision matrix with exact thresholds per metric<br>→ The Higgsfield creative production process with brand identity lock<br>→ The 24-hour testing cycle protocol<br>→ The Claude competitor account analysis prompt library<br>→ The ready-to-use end-to-end Claude project setup<br>→ 6 vertical-specific Claude Project configurations<br>→ The "brief Claude like a media buyer" framework
If you're already running the Claude Meta Ads Research Strategist (upstream research) or the AI UGC Factory (volume production), this is the **media-buyer brain layer** — the system that decides what to scale, what to kill, and what to rewrite based on account data, not gut feel.
---
## ⚙️ The Hidden Mechanism — Why Most Operators Kill Winners and Scale Losers
Every standard media buying workflow has the same broken loop:
1. Operator launches 10-20 variations on Monday
2. Checks performance Tuesday morning (24 hours in)
3. Sees 3 ads with high spend + low ROAS, panics, kills them
4. Sees 2 ads with low spend + high ROAS, scales them aggressively
5. The killed ads were actually the ones with statistical signal — they just hadn't accumulated conversions yet
6. The scaled ads were noise — small sample size produced apparent winners that revert to mean
7. Operator wastes the next 30 days chasing the wrong signals
The fix is structural: most operators read Meta Ads data with the wrong framework. They look at ROAS as a snapshot, when ROAS is actually a signal that needs minimum spend + minimum conversions to be statistically valid.
Claude can read the data the right way because Claude can hold all the metrics + thresholds + statistical considerations in attention simultaneously. Operators can hold 2-3 metrics at once. Claude holds 12-15.
→ Hook rate (3-sec view) — primary cold-audience signal<br>→ Hold rate (15-sec watch) — engagement signal<br>→ CTR — interest signal<br>→ CPA vs target — conversion signal<br>→ Frequency — fatigue signal<br>→ Spend volume — statistical significance gate<br>→ Audience overlap — efficiency signal<br>→ Creative refresh trigger — fatigue signal<br>→ Bid stability — algorithm settling signal<br>→ Time-on-page after click — quality signal<br>→ Add-to-cart rate — purchase intent signal<br>→ Cart-to-purchase rate — conversion path signal
Operator gut: "This ad looks bad, kill it."<br>Claude analysis: "This ad has high hook rate + high hold rate + low CTR + below-target frequency + 70% of minimum statistical spend. Recommendation: HOLD for 48 more hours, not KILL."
The fix is not better operator instinct. The fix is **letting Claude apply the full media-buyer framework to your account data** — the thing that prevents killing winners and scaling losers.
---
## ⚙️ The Stack
<table header-row="true">
<tr>
<td>Layer</td>
<td>Tool</td>
<td>Job</td>
</tr>
<tr>
<td>Strategy + decision-making</td>
<td>Claude (with ROAS System Skill installed)</td>
<td>Account audit, hook rewriting, kill/scale decisions</td>
</tr>
<tr>
<td>Creative production</td>
<td>Higgsfield</td>
<td>Generates brand-locked creative variations from Claude's briefs</td>
</tr>
<tr>
<td>Data source</td>
<td>Meta Ads Manager (manual export OR Meta Ads MCP)</td>
<td>Ad account performance data</td>
</tr>
<tr>
<td>Persistent context</td>
<td>Claude Project</td>
<td>Stores brand kit, ICP, prior winners, account history</td>
</tr>
<tr>
<td>Deploy + ad management</td>
<td>Meta Ads Manager</td>
<td>Live deployment + budget management</td>
</tr>
<tr>
<td>Optional automation</td>
<td>Revealbot / Madgicx</td>
<td>Auto-execute Claude's kill/scale decisions</td>
</tr>
</table>
Claude is the brain. Higgsfield is the hands. Meta Ads Manager is the surface.
---
## ⚙️ The Workflow Math
Standard media buying with manual decision-making: 5-10 hours per week reading dashboards, making judgment calls, briefing creative. Variable outcomes — 1-2 wins per month, several costly mistakes.
This system: Claude Skill installed once. 15-30 minutes per audit cycle. Decisions backed by 12-metric analysis instead of operator intuition. 24-hour testing cycles compress wins to days.
The leverage shift: you stop relying on intuition and start running a decision framework. The bottleneck moves from operator capacity to creative production (which Higgsfield handles automatically).
---
## ⚙️ Step 1 — Install the Claude ROAS System Project
Create a Claude Project named "[Brand] ROAS System." Paste the master Skill (Section 7) into Project Instructions.
Load Project Knowledge:
→ Brand kit (palette, voice, positioning)<br>→ ICP profile (psychographics + demographics)<br>→ Product specs + hero claim<br>→ Account history (last 30-90 days of campaigns, winners + losers)<br>→ Brand voice samples (3-5 paragraphs of published copy)<br>→ Target CPA + target ROAS by funnel stage<br>→ Available creative tools list (Higgsfield, MakeUGC, Maxfusion, etc.)
Save. The system activates on every chat inside the Project.
---
## ⚙️ Step 2 — Run the Account Audit
Drop the audit prompt:
```plain text
Run Account Audit for the last 14 days.

Data: [PASTE FROM META ADS MANAGER OR PULL VIA
META ADS MCP]
```
Claude reads the data through the full 12-metric framework. Returns:
→ Top 5 ads by composite performance (with reasoning per ad)<br>→ Bottom 10 ads to KILL (with reasoning per kill)<br>→ Middle group to HOLD (statistical significance not yet reached)<br>→ Pattern recognition: which hook angles + visual formats + audience segments are winning<br>→ Weakest hooks identified for rewriting (Step 3)<br>→ Account-level recommendations (budget reallocation, frequency caps, audience expansion)
Audit time: 5-10 minutes.
---
## ⚙️ Step 3 — Hook Rewriting
For each weak hook Claude identified, drop:
```plain text
Rewrite Hook for Ad [X].

Current hook: "[CURRENT HOOK]"
Weakness identified: [FROM AUDIT]
Target rewrite: stronger [PATTERN INTERRUPT /
SPECIFIC RESULT / SOCIAL PROOF / etc.]

Generate 5 hook variations addressing the
weakness.
```
Claude returns 5 hook rewrites, each:
→ Diagnoses the specific weakness in the original<br>→ Applies a corrective pattern (curiosity loop, specific number, peer comparison, etc.)<br>→ Maintains brand voice<br>→ Predicts which variation will perform best with reasoning
You pick the strongest. Brief Higgsfield to produce the creative.
---
## ⚙️ Step 4 — Higgsfield Creative Production (Brand Identity Lock)
Higgsfield generates the new creative with brand identity locked across variations.
The brand identity lock mechanic:
→ Save your brand's character archetype as a Higgsfield Element once<br>→ Save your product as a Higgsfield Element<br>→ Save your brand palette in Higgsfield presets<br>→ Every new variation @-tags these Elements
Result: 10 hook variations = 10 ads that all feel like the same brand with the same character and the same product. No drift between Test 1 and Test 10.
Generate the 5 rewritten hook variations per audited ad. Total new creative per audit cycle: 25-50 ads.
---
## ⚙️ Step 5 — 24-Hour Testing Cycle + Kill-or-Scale Matrix
Deploy the new variations at $30-$50/day each. Set the 24-hour timer.
At hour 24, drop:
```plain text
Run Kill-or-Scale Matrix on the variations
deployed in the last 24 hours.

Data: [PASTE PERFORMANCE DATA]
```
Claude applies the matrix (Section 9) and returns:
→ KILL decisions (below thresholds with statistical significance reached)<br>→ HOLD decisions (signal forming, more data needed)<br>→ SCALE decisions (above thresholds with sufficient spend)<br>→ Budget reallocation recommendations<br>→ Patterns to weight next cycle's hook rewriting
Execute the decisions in Meta Ads Manager. Repeat the cycle.
---
## ⚙️ The Master Claude Account Audit Prompt
Paste this into your Claude Project instructions as the system prompt.
```javascript
You are the Media Buying Brain for [BRAND
NAME].

Your job: audit Meta Ads account data through
the full 12-metric framework, identify weak
hooks for rewriting, and run the kill-or-scale
matrix.

Project context (loaded once):
- Brand kit: [BRAND POSITIONING]
- ICP: [PROFILE]
- Brand voice samples: [VOICE]
- Target CPA + target ROAS by funnel stage
- Account history (last 30-90 days)
- Available creative tools list

Brief input (operator provides):
- Time window: [last 7 / 14 / 30 days]
- Data: [paste ad performance data OR pull via
  Meta Ads MCP]
- Specific concern: [optional — e.g. "CPA up
  20% week-over-week, need to diagnose"]

Workflow:

Step 1 — Account Audit
Read every ad in the provided data through
the 12-metric framework:
- Hook rate (3-sec view)
- Hold rate (15-sec watch)
- CTR
- CPA vs target
- ROAS
- Frequency
- Spend volume
- Audience overlap
- Creative refresh trigger
- Bid stability
- Time-on-page after click
- Add-to-cart rate

For each ad, determine:
- Statistical significance status (has spend
  reached minimum threshold for confident
  decision?)
- Performance status (above / at / below
  threshold per metric)
- Recommendation (KILL / HOLD / SCALE / REWRITE)
- If REWRITE: which specific weakness to
  address

Output format per ad:
AD [NAME / ID]
Spend: $[X]
Hook rate: [X]%
Hold rate: [X]%
CTR: [X]%
CPA: $[X] (target: $[X])
ROAS: [X] (target: [X])
Frequency: [X]
Statistical significance: REACHED / NOT REACHED
Recommendation: KILL / HOLD / SCALE / REWRITE
Reasoning: [SPECIFIC METRIC-BASED EXPLANATION]

After all ads analyzed, output:
- Top 5 performers (rank with reasoning)
- Bottom 10 to KILL (with reasoning per kill)
- Middle group to HOLD (statistical
  significance not yet reached)
- Account-level patterns (winning hook angles,
  winning visual formats, winning audience
  segments)
- Weakest hooks identified for rewriting

Step 2 — Hook Rewriting (on demand)
When operator asks for hook rewrites, take the
weak hook + the weakness diagnosis and
generate 5 corrective variations.

Each variation:
- Addresses the specific weakness
- Applies a corrective pattern (curiosity
  loop, specific number, social proof, peer
  comparison, etc.)
- Maintains brand voice
- Includes prediction of expected performance
  improvement

Step 3 — Kill-or-Scale Matrix (on demand)
At hour 24 after deployment of new variations,
apply the matrix:

KILL thresholds:
- Hook rate <28% (with spend >$30)
- Hold rate <10% (with spend >$30)
- CTR <0.9% (with spend >$30)
- CPA >1.4x target (with spend >$50)
- Frequency >3.5 with no conversions

HOLD thresholds (signal forming, wait 24 more
hours):
- Spend $15-$30 (not yet statistically
  significant)
- All metrics in mid-range with no clear
  direction
- Frequency 2-3 with no signal

SCALE thresholds:
- Hook rate >40% (with spend >$50)
- Hold rate >18% (with spend >$50)
- CTR >1.6% (with spend >$50)
- CPA <0.8x target (with spend >$50)
- ROAS >2.5x target (with spend >$100)

Output format per ad:
AD [NAME]
Decision: KILL / HOLD / SCALE
Reasoning: [METRIC-BASED]
Action: [SPECIFIC ACTION — kill, increase
budget to $X, leave at current budget for 24
more hours]

Update project memory with confirmed winners.
```
---
## ⚙️ The Hook Rewriting System
When Claude identifies a weak hook, apply the corrective pattern matching the specific weakness.
<table header-row="true">
<tr>
<td>Weakness Diagnosis</td>
<td>Corrective Pattern</td>
</tr>
<tr>
<td>Low hook rate (3-sec drop-off)</td>
<td>Pattern interrupt in first 1.5 seconds — sudden visual, surprising claim, specific stat</td>
</tr>
<tr>
<td>Low hold rate (15-sec drop-off)</td>
<td>Curiosity loop early — "the reason this works..." then delayed payoff</td>
</tr>
<tr>
<td>Low CTR (good hook + hold but weak click)</td>
<td>Strengthen CTA + make the offer specific</td>
</tr>
<tr>
<td>High CPA + good hook (audience misalignment)</td>
<td>Rewrite hook to pre-qualify the buyer — push out the wrong audience</td>
</tr>
<tr>
<td>High frequency + declining ROAS (fatigue)</td>
<td>Total angle change — new hook category, not just word swap</td>
</tr>
<tr>
<td>Low add-to-cart after click</td>
<td>Mismatch between ad promise + landing page reality — rewrite to align expectation</td>
</tr>
</table>
Each pattern is a specific corrective move. Generic hook rewrites don't work — the weakness diagnosis determines which pattern fixes it.
### The Hook Rewriting Prompt:
```javascript
Rewrite Hook for Ad [X].

Current hook: "[CURRENT HOOK]"
Weakness diagnosis from audit: [SPECIFIC
WEAKNESS]
Corrective pattern to apply: [FROM TABLE ABOVE]

Generate 5 hook variations.

Each variation must:
- Address the specific weakness with the
  corrective pattern
- Stay in brand voice
- Be 6-12 words
- Include prediction of which metric will
  improve and by how much

Output format per variation:

VARIATION [N]
Hook: "[NEW HOOK]"
Corrective pattern applied: [PATTERN]
Expected improvement: [METRIC + estimated
direction]
Risk: [LOW / MEDIUM / HIGH]

Rank the 5 variations by expected performance
improvement.
```
---
## ⚙️ The Kill-or-Scale Decision Matrix
The matrix Claude applies at hour 24 after deployment. These are the exact thresholds.
<table header-row="true">
<tr>
<td>Metric</td>
<td>KILL</td>
<td>HOLD</td>
<td>SCALE</td>
</tr>
<tr>
<td>Hook rate (3s)</td>
<td><28% (spend >$30)</td>
<td>28-40%</td>
<td>>40% (spend >$50)</td>
</tr>
<tr>
<td>Hold rate (15s)</td>
<td><10% (spend >$30)</td>
<td>10-18%</td>
<td>>18% (spend >$50)</td>
</tr>
<tr>
<td>CTR</td>
<td><0.9% (spend >$30)</td>
<td>0.9-1.6%</td>
<td>>1.6% (spend >$50)</td>
</tr>
<tr>
<td>CPA vs target</td>
<td>>1.4x target (spend >$50)</td>
<td>0.8-1.4x target</td>
<td><0.8x target (spend >$50)</td>
</tr>
<tr>
<td>ROAS vs target</td>
<td><0.7x target (spend >$50)</td>
<td>0.7-2.5x target</td>
<td>>2.5x target (spend >$100)</td>
</tr>
<tr>
<td>Frequency</td>
<td>>3.5 with no conversions</td>
<td>1.5-3.5</td>
<td><1.5 with positive signal</td>
</tr>
</table>
### Statistical Significance Gate
NEVER kill an ad below $30 spend. NEVER scale an ad below $50 spend. Below these thresholds, the data is noise.
The most common operator mistake: killing a "high CPA" ad at $20 spend without realizing that's 1-2 conversions — statistical noise. Wait until spend reaches $50 before killing on CPA grounds.
### Decision Action Per Outcome
<table header-row="true">
<tr>
<td>Outcome</td>
<td>Action</td>
</tr>
<tr>
<td>KILL</td>
<td>Pause immediately. Free budget redirects to HOLD/SCALE ads.</td>
</tr>
<tr>
<td>HOLD</td>
<td>Leave at current budget. Re-evaluate at hour 48.</td>
</tr>
<tr>
<td>SCALE</td>
<td>Increase budget by 50-100% per cycle (gradual scaling — algorithm needs time to adjust).</td>
</tr>
</table>
Scaling rule: never increase budget by more than 100% in 24 hours. Algorithm needs time to adjust audience expansion. Aggressive scaling resets the learning phase.
---
## ⚙️ The Higgsfield Creative Production Process
Higgsfield handles the brand identity lock across all variations.
### Setup (one-time per brand)
1. Upload character reference image to Higgsfield Working Memory → save as Element
2. Upload product reference image → save as Element
3. Configure brand palette presets (HEX codes for primary + accent)
4. Configure typography presets (font family + weight rules)
5. Save settings as the brand's locked creative profile
### Per-cycle production
When Claude rewrites a hook, brief Higgsfield with:
```javascript
Generate ad creative for [BRAND].

Use these locked Elements:
- Character: @[CHARACTER_ELEMENT_ID]
- Product: @[PRODUCT_ELEMENT_ID]
- Palette: [BRAND PRESET ID]
- Typography: [BRAND PRESET ID]

New hook (from Claude rewrite):
"[NEW HOOK]"

Visual format:
[UGC HANDHELD / CINEMATIC / STATIC / MOTION
GRAPHICS — match to brief]

Output:
- 9:16 vertical (Meta + TikTok)
- 1:1 square (Meta feed alternate)
- 4K resolution
```
Higgsfield generates the creative with brand identity locked. The new variation feels like the same brand as the original ad — just with the rewritten hook.
Generation time: 4-6 minutes per ad variation.
---
## ⚙️ The 24-Hour Testing Cycle
The cycle that ships winners faster than gut-feel media buying.
<table header-row="true">
<tr>
<td>Hour</td>
<td>Action</td>
</tr>
<tr>
<td>0</td>
<td>Deploy 5-10 new variations at $30-$50/day each</td>
</tr>
<tr>
<td>6-12</td>
<td>First spend signal forming (don't act on noise)</td>
</tr>
<tr>
<td>24</td>
<td>First Kill-or-Scale Matrix run — kill clear losers, scale clear winners, hold rest</td>
</tr>
<tr>
<td>48</td>
<td>Second matrix — hold group reaches statistical significance</td>
</tr>
<tr>
<td>72</td>
<td>Third matrix — scaled winners get budget boost to $100-$300/day</td>
</tr>
<tr>
<td>7 days</td>
<td>Sustained winners enter evergreen rotation, fresh variations cycled in</td>
</tr>
</table>
The 24-hour cycle compresses what traditional media buying does in 14-30 days.
---
## ⚙️ The Claude Competitor Account Analysis Prompts
Use these to surface competitor signal that informs your own account decisions.
### Competitor Pattern Extraction
```javascript
Analyze competitor ad accounts in [VERTICAL]
for the last 30 days.

Data: [PASTE FROM META ADS LIBRARY OR PULL VIA
META ADS MCP]

Identify:
- Top 5 competitor ads (by run length proxy)
- Their winning hook patterns
- Their winning visual formats
- Their audience-targeting signals (visible
  via demographic hints in creative)
- Patterns the category typically misses

Output strategic recommendation for which
patterns to test in our own account.
```
### Hook Migration Prompt
```javascript
Take the top 5 competitor hooks from the
analysis above.

For each, adapt the structure to our brand's
product + voice. Don't copy — adapt.

Generate 5 brand-aligned versions of the
winning patterns.

Each version:
- Borrows the competitor's hook structure
- Uses our brand's voice and product specifics
- Includes prediction of expected performance
  based on competitor signal strength
```
### Account Gap Analysis
```javascript
Compare our account's current creative mix to
competitor patterns from the analysis.

Identify:
- Hook angles competitors use that we don't
- Visual formats competitors use that we don't
- Audience signals competitors capture that we
  miss

Output a 30-day creative testing plan that
fills the gaps systematically.
```
---
## ⚙️ The End-to-End Claude Project Setup
The complete project configuration for the ROAS System.
### Project Knowledge to Upload
1. Brand kit (PDF with palette, typography, voice rules)
2. ICP profile (psychographics + demographics document)
3. Product specs (full feature/benefit list)
4. Brand voice samples (5-10 paragraphs of published brand copy)
5. Account history (last 90 days of campaigns — winners + losers with metrics)
6. Target metrics (CPA + ROAS + CTR targets per funnel stage)
7. Competitor list (5-10 with their Meta Ads Library URLs)
8. Creative tool list (Higgsfield, MakeUGC, Maxfusion, Lovart — what you have access to)
9. Ad account access info (ad account IDs, not credentials)
### Project Instructions (the System Prompt)
Paste the Master Claude Account Audit Prompt (Section 7) into Project Instructions.
### Saved Slash Commands (Optional)
Save these as named prompts for fast access:
→ `/audit` — runs the account audit<br>→ `/rewrite` — runs hook rewriting on specific ads<br>→ `/matrix` — runs the kill-or-scale matrix at hour 24<br>→ `/competitor` — runs competitor pattern extraction<br>→ `/scale-plan` — generates next-week scaling plan from winners
### Workflow Cadence (Once Installed)
<table header-row="true">
<tr>
<td>Day</td>
<td>Command</td>
<td>Output</td>
</tr>
<tr>
<td>Monday 9am</td>
<td>`/audit`</td>
<td>Last week's audit + KILL/SCALE recommendations</td>
</tr>
<tr>
<td>Monday 10am</td>
<td>Execute kills + scales in Meta Ads Manager</td>
<td>Account updated</td>
</tr>
<tr>
<td>Monday 11am</td>
<td>`/rewrite` on the weakest 5 ads</td>
<td>25 hook rewrite variations</td>
</tr>
<tr>
<td>Monday 12pm</td>
<td>Brief Higgsfield for creative production</td>
<td>New ads in production</td>
</tr>
<tr>
<td>Tuesday</td>
<td>Deploy new ads</td>
<td>25 new variations live</td>
</tr>
<tr>
<td>Wednesday 9am</td>
<td>`/matrix` on Tuesday's deployments</td>
<td>Kill/scale at hour 24</td>
</tr>
<tr>
<td>Thursday</td>
<td>`/competitor` (weekly cadence)</td>
<td>Fresh competitor signal</td>
</tr>
<tr>
<td>Friday 9am</td>
<td>`/audit` for week-end review</td>
<td>Weekly recap</td>
</tr>
</table>
---
## ⚙️ 6 Vertical Templates
Each is a vertical-specific Claude Project configuration.
### Vertical 1 — Skincare / Beauty
```javascript
Project name: [BRAND] Skincare ROAS System
Target CPA: $40-$80
Target ROAS: 2.5x-4x
Top competitor list: [5 skincare competitors]
Account history focus: ingredient-led hooks vs
result-led hooks performance comparison
Visual format defaults: UGC handheld + macro
product detail
```
### Vertical 2 — Supplements / Wellness
```javascript
Project name: [BRAND] Supplement ROAS System
Target CPA: $30-$70
Target ROAS: 2.5x-4x
Top competitor list: [5 supplement competitors]
Account history focus: 30-day result hooks vs
ingredient mechanism hooks performance
Visual format defaults: UGC kitchen morning +
talking head
```
### Vertical 3 — Fitness Apparel / Athletic
```javascript
Project name: [BRAND] Fitness ROAS System
Target CPA: $40-$100
Target ROAS: 2x-3.5x
Top competitor list: [5 athletic competitors]
Account history focus: performance metric hooks
vs aesthetic/style hooks
Visual format defaults: UGC athletic +
cinematic action
```
### Vertical 4 — Fashion
```javascript
Project name: [BRAND] Fashion ROAS System
Target CPA: $50-$150
Target ROAS: 2x-3x
Top competitor list: [5 fashion competitors]
Account history focus: outfit recipe hooks vs
occasion fit hooks vs drop exclusivity hooks
Visual format defaults: GRWM UGC + editorial
cinematic
```
### Vertical 5 — Food / Beverage
```javascript
Project name: [BRAND] Food/Bev ROAS System
Target CPA: $20-$60
Target ROAS: 3x-5x (consumables typically
higher)
Top competitor list: [5 food/bev competitors]
Account history focus: taste reaction hooks vs
ingredient story hooks vs daily ritual hooks
Visual format defaults: UGC kitchen + pour
moment macro
```
### Vertical 6 — Premium Tech / SaaS Hardware
```javascript
Project name: [BRAND] Tech ROAS System
Target CPA: $80-$250
Target ROAS: 1.8x-3x (higher AOV, longer
consideration)
Top competitor list: [5 tech competitors]
Account history focus: operator pain hooks vs
feature-led hooks vs comparison hooks
Visual format defaults: founder POV + UI
motion graphics
```
---
## ⚙️ How to Brief Claude Like a Media Buyer (Not a Copywriter)
This is the framework that separates effective Claude briefing from generic AI prompting.
### Copywriter brief (what most operators do)
"Write me 5 ad hooks for my skincare brand."
Claude returns 5 generic skincare hooks. They're well-written. They don't address account-specific weaknesses.
### Media buyer brief (what this system does)
"My account is showing 32% hook rate (above threshold) but 7% hold rate (below threshold) on Ad #14. Spend has reached $52 (statistically significant). The current hook is '[CURRENT HOOK]'. Diagnose the specific weakness causing the hold rate drop, then rewrite the hook to address that weakness with the appropriate corrective pattern from our system."
Claude returns a diagnostic-driven rewrite. Specific. Account-aware. Pattern-corrective.
### The 4-Layer Media Buyer Brief Structure
Every brief Claude receives should include:
1. **The data** — current metrics for the specific ad
2. **The diagnosis** — what's wrong (hook rate, hold rate, CTR, CPA, etc.)
3. **The threshold context** — has the ad reached statistical significance?
4. **The corrective action requested** — which type of rewrite or decision
Layer all 4 in every brief. Output quality climbs proportionally.
---
## ⚙️ Side-By-Side: Standard Media Buying vs Claude + Higgsfield ROAS System
<table header-row="true">
<tr>
<td>Element</td>
<td>Standard Manual Media Buying</td>
<td>Claude + Higgsfield ROAS System</td>
</tr>
<tr>
<td>Decision framework</td>
<td>Operator intuition (2-3 metrics held in attention)</td>
<td>Claude analysis (12-15 metrics simultaneously)</td>
</tr>
<tr>
<td>Decision speed</td>
<td>14-30 days per scaling cycle</td>
<td>24-72 hours per scaling cycle</td>
</tr>
<tr>
<td>Killing winners by mistake</td>
<td>Common (statistical noise mistaken for failure)</td>
<td>Prevented (significance gate baked in)</td>
</tr>
<tr>
<td>Scaling losers by mistake</td>
<td>Common (small-sample winners revert to mean)</td>
<td>Prevented (minimum spend threshold)</td>
</tr>
<tr>
<td>Hook rewriting</td>
<td>Generic copywriting</td>
<td>Diagnosis-driven, corrective pattern matched</td>
</tr>
<tr>
<td>Creative production speed</td>
<td>7-14 days per cycle</td>
<td>Same-day Higgsfield production</td>
</tr>
<tr>
<td>Operator hours per week</td>
<td>5-10</td>
<td>1-2</td>
</tr>
</table>
The mechanism: Claude reads data through the full media buyer framework. Higgsfield executes brand-locked creative. Operator becomes the decision-approver, not the decision-maker.
---
## ⚙️ The Integration Playbook
The ROAS System is the **decision-making brain layer** of your DTC operations.
### Where this slots into your existing stack:
<table header-row="true">
<tr>
<td>Layer</td>
<td>Tool</td>
<td>Job</td>
</tr>
<tr>
<td>Upstream strategy</td>
<td>Claude Meta Ads Research Strategist</td>
<td>Generates initial briefs from competitor research</td>
</tr>
<tr>
<td>Daily creative production</td>
<td>AI UGC Factory + 4-Tool Production Line</td>
<td>Generates volume creative</td>
</tr>
<tr>
<td>Decision-making (this system)</td>
<td>Claude + Higgsfield ROAS System</td>
<td>Audits performance, makes kill/scale calls, rewrites weak hooks</td>
</tr>
<tr>
<td>Long-form conversion</td>
<td>51-second UGC playbook</td>
<td>Conversion + retention asset format</td>
</tr>
<tr>
<td>Static + paid social</td>
<td>6-angle composite + Premium Poster</td>
<td>Static creative production</td>
</tr>
<tr>
<td>Affiliate revenue</td>
<td>Affiliate Playbook</td>
<td>Second revenue stream</td>
</tr>
</table>
The ROAS System sits at the decision point. Everything else feeds it data or executes its decisions.
### Recommended weekly cadence:
→ Monday: Account audit + weak hook identification + creative production briefing<br>→ Tuesday: Deploy new variations (5-10 per audit cycle)<br>→ Wednesday: First Kill-or-Scale Matrix at hour 24<br>→ Thursday: Competitor analysis (weekly) + second matrix on Wednesday holds<br>→ Friday: Weekly recap + scaling plan for next week<br>→ Continuous: Higgsfield production runs in background
---
## ⚙️ What NOT to Do
→ Don't skip the statistical significance gate. Killing ads below $30 spend is the most common operator mistake — you're reading noise as signal.
→ Don't scale ads above 100% in 24 hours. Algorithm learning phase resets. Gradual scaling preserves the win.
→ Don't generic-rewrite hooks. Without diagnosing the weakness, rewrites are just creative variations — they don't fix the underlying problem.
→ Don't brief Claude as a copywriter. Always include the 4-layer media buyer brief structure (data + diagnosis + threshold + corrective action).
→ Don't trust gut feel over Claude's matrix output. Claude holds 12 metrics simultaneously — operator gut holds 2-3. The framework wins.
→ Don't run the audit without Project Knowledge fully loaded. Without account history + targets + competitor list, Claude generates generic recommendations.
→ Don't deploy without brand-locked Higgsfield Elements. New creative without identity lock = inconsistent brand experience across variations.
→ Don't ignore the 24-hour cycle. Waiting 7-14 days to make decisions wastes spend on losers and loses momentum on winners.
→ Don't run the ROAS System on accounts under $1K/month spend. Below that, statistical significance is rarely reached on individual ads. Need scale to use this system effectively.
→ Don't expect Claude to fix bad products. The ROAS System optimizes creative + targeting. If the product-market fit is wrong, no amount of hook rewriting saves it.
→ Don't run multiple brands in 1 Claude Project. Each brand needs its own project with its own knowledge base.
---
## ⚙️ Troubleshooting
<table header-row="true">
<tr>
<td>Problem</td>
<td>Fix</td>
</tr>
<tr>
<td>Claude's audit feels generic</td>
<td>Project Knowledge missing key data. Add account history + target metrics + brand voice samples.</td>
</tr>
<tr>
<td>Matrix decisions don't match operator instinct</td>
<td>Trust the matrix. If operator gut and matrix disagree, the matrix is right more often than not — gut often misreads statistical noise.</td>
</tr>
<tr>
<td>Hook rewrites read off-brand</td>
<td>Voice samples in Project Knowledge too thin. Add 5-10 paragraphs of actual published brand copy.</td>
</tr>
<tr>
<td>Higgsfield outputs feel inconsistent</td>
<td>Brand-locked Elements not configured. Set up character + product Elements once, every variation @-tags them.</td>
</tr>
<tr>
<td>Account spend too low for statistical significance</td>
<td>Wait for spend to reach $50 per variation before making decisions. Or lower variation count to concentrate spend.</td>
</tr>
<tr>
<td>Algorithm resets on aggressive scaling</td>
<td>Reduce scaling pace to 50-75% per cycle instead of 100%+. Algorithm needs time to adapt.</td>
</tr>
<tr>
<td>CPA spikes after scaling</td>
<td>Audience saturation. Run frequency check — if frequency >3.5, refresh creative or expand audience.</td>
</tr>
<tr>
<td>24-hour cycle feels too fast</td>
<td>If ad spend per variation is below $30, extend the first decision window to 48 hours. Below $30 = noise.</td>
</tr>
<tr>
<td>Hook rewrites don't move performance</td>
<td>Diagnosis was wrong. Re-audit the failing ad with deeper data (time-on-page, add-to-cart rate). The weakness may not be the hook — could be the landing page.</td>
</tr>
<tr>
<td>Costs add up faster than expected</td>
<td>Pause the ROAS System for a week and analyze where spend is being consumed. Usually it's variation count too high relative to budget capacity.</td>
</tr>
<tr>
<td>Multiple brand handoffs</td>
<td>Each brand needs its own Claude Project — don't try to multiplex one project across brands.</td>
</tr>
</table>
---
## ⚙️ The Daily / Weekly Production Cadence
This is the routine that runs the ROAS System at steady-state.
<table header-row="true">
<tr>
<td>Day</td>
<td>Time</td>
<td>Task</td>
<td>Output</td>
</tr>
<tr>
<td>Monday</td>
<td>9:00-9:15</td>
<td>Run `/audit` on last week's data</td>
<td>Audit report + decision recommendations</td>
</tr>
<tr>
<td>Monday</td>
<td>9:15-9:45</td>
<td>Execute KILL + SCALE decisions in Meta Ads Manager</td>
<td>Account updated</td>
</tr>
<tr>
<td>Monday</td>
<td>9:45-10:15</td>
<td>Run `/rewrite` on weakest 5 ads</td>
<td>25 hook variations</td>
</tr>
<tr>
<td>Monday</td>
<td>10:15-11:00</td>
<td>Brief Higgsfield for creative production (5-10 new ads)</td>
<td>Production queue</td>
</tr>
<tr>
<td>Tuesday</td>
<td>8:00-10:00</td>
<td>Pick up Higgsfield output, deploy 25 new variations</td>
<td>25 new ads live</td>
</tr>
<tr>
<td>Wednesday</td>
<td>9:00-9:15</td>
<td>Run `/matrix` at hour 24</td>
<td>First decisions on Tuesday deployments</td>
</tr>
<tr>
<td>Wednesday</td>
<td>9:15-9:30</td>
<td>Execute decisions</td>
<td>Account updated</td>
</tr>
<tr>
<td>Thursday</td>
<td>9:00-9:30</td>
<td>Run `/competitor` (weekly cadence)</td>
<td>Competitor signal report</td>
</tr>
<tr>
<td>Thursday</td>
<td>9:30-9:45</td>
<td>Run `/matrix` at hour 48 on hold group</td>
<td>More decisions</td>
</tr>
<tr>
<td>Friday</td>
<td>9:00-9:30</td>
<td>Run weekly audit recap</td>
<td>Week summary + next week's plan</td>
</tr>
<tr>
<td>Friday</td>
<td>9:30-10:00</td>
<td>Update Project Knowledge with confirmed winners</td>
<td>Memory updated</td>
</tr>
</table>
Weekly output: 1-2 audit cycles, 25-50 new variations tested, 5-15 confirmed winners scaling.
---
## 🎯 Closer
**Install the Claude ROAS System into a Project with full brand kit + ICP + target metrics + account history + competitor list loaded. Configure Higgsfield Elements (character + product + palette). Run /audit on last week's data. Execute KILL + SCALE decisions. Run /rewrite on the weakest 5 ads — get 25 corrective hook variations. Brief Higgsfield for production. Deploy 25 new variations Tuesday. Run /matrix at hour 24 Wednesday. Scale winners, kill losers. By end of week 1 you'll have shipped 25-50 new variations with diagnostic-driven hook rewrites + brand-locked creative. By end of month 1 you'll have replaced the operator-instinct decision-making cycle with a framework that holds 12 metrics at once + acts on statistical significance.**
The operator-intuition decision cycle was the bottleneck.
The Claude + Higgsfield ROAS System is what fixes it.
---
**The master Claude account audit prompt + hook rewriting system + kill-or-scale decision matrix + Higgsfield creative production process + 24-hour testing cycle + competitor analysis prompt library + end-to-end Claude project setup + 6 vertical templates is the full system. Bookmark this guide. Run it weekly.**
---
