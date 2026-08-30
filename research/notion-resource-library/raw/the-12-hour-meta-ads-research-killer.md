---
title: "The 12-Hour Meta Ads Research Killer"
page_id: 3c692e2e92e98026918ede45061d858c
layer: research
source: https://freebie-for-you.notion.site/3c692e2e92e98026918ede45061d858c
---
# The Complete 3-Step Claude 5 Workflow That Turns 12 Hours Of Weekly Competitor Research Into 15 Minutes And Ships 6 Fully-Briefed Creative Concepts Per Chat With Test Plans Tied Directly To Live Competitor Signal
---
## 🎯 What You're Getting
The complete 3-step Claude 5 workflow that compresses 12 hours of weekly Meta Ads research into 15 minutes. Ships 6 fully-briefed creative concepts per chat, with test plans tied to live competitor signal.
Every step ships as a full setup guide:
→ What it does<br>→ Prerequisites<br>→ Paste-ready Claude 5 system prompt<br>→ Output template<br>→ Sample walkthrough with real inputs and outputs<br>→ Failure modes and fixes<br>→ Handoff to next step
The 3 steps:
1. **Pull competitor patterns from Meta Ads Library** (5 min per session)
2. **Map angles by audience psychology + build hook bank** (5 min per session)
3. **Generate brief stack + test plan** (5 min per session)
Total: 15 minutes to ship what used to take a research contractor 12 hours.
---
## ⚙️ The Problem With Manual Meta Ads Research
Every DTC operator running paid social has the same weekly problem: you know you should be doing competitor research, and you know the signal is sitting in Meta Ad Library for free, but the manual work looks like this:
- Open Meta Ad Library. Search competitor. Scroll through 40-60 ads.
- Screenshot the ones running longest (proxy for winners).
- Manually transcribe hook lines into a spreadsheet.
- Categorize by format, angle, and CTA type.
- Cross-reference against your own ads to spot gaps.
- Translate gaps into concept briefs.
- Assign hooks, visual direction, and test budgets per brief.
If you do this weekly across 5-10 competitors, that's 8-12 hours of research a good VA does badly and Claude does in 15 minutes.
The bottleneck is not the model. The bottleneck is that most operators haven't structured the workflow into 3 discrete prompts that hand output between each other.
This playbook is the structured 3-prompt workflow.
---
## ⚙️ Prerequisites (15-Minute Setup)
1. **Claude Pro or Claude 5 API access**
2. **Optional MCP servers**:
	- Meta Ad Library scrape (Apify actor OR self-hosted Puppeteer script)
	- Meta Ads MCP (for your own account cross-reference)
3. **Files ready**:
	- `competitors.md` — list of 5-10 tracked competitors with Meta Ad Library URLs
	- `icp_core.md` — target ICP with demographic + psychographic detail
	- `product_core.md` — hero SKU spec + differentiation
	- `voice_core.md` — brand voice patterns + banned constructions
	- `matrix_core.md` — matrix thresholds (used for budget allocation in Step 3)
The workflow works without MCP integrations if you can paste ad screenshots or transcripts into the chat manually. MCPs make it 5x faster.
---
## ⚙️ Step 1 — Pull Competitor Patterns From Meta Ads Library
Claude scrapes Meta Ads Library (or ingests pasted screenshots) for ads running 30+ days. Extracts hook patterns, visual formats, and audience-targeting signals. Outputs a structured competitor pattern report.
### What "running 30+ days" tells you
An ad running 30+ days is a proxy for a winner. Losers get killed inside 7-14 days on any competent account. Ads running past 30 days are ads someone is choosing to spend on continuously, which means they're producing acceptable ROAS at the account level.
Filtering competitor research to 30+ day ads is the single highest-signal filter you can apply. Cuts noise 80%+.
### Time to run
5 minutes per session
### Inputs
- List of 5-10 tracked competitors
- Meta Ad Library URLs per competitor
- Access to either Meta Ad Library scrape MCP OR ability to paste ad transcripts/screenshots into chat
### Paste-ready Claude 5 prompt
```javascript
You are the Competitor Pattern
Extraction skill for [BRAND].
Model: Claude Opus 5.
Reference: competitors.md,
product_core.md, icp_core.md (auto-
loaded).
Tools: Meta Ad Library scrape MCP (or
paste-in mode).

Input from operator:
- 5-10 competitor names
- Their Meta Ad Library URLs
- Optional: paste of specific ads to
  include

Task:
1. For each competitor, pull all ads
   currently running with active
   duration >= 30 days
2. For each 30+ day ad, extract:
   - Ad ID + first-seen date + days
     active
   - Format (UGC / cinematic /
     reaction / talking head / demo /
     carousel / static)
   - Hook line (first 3 seconds of
     video OR first line of static)
   - Hook mechanism (contrarian /
     curiosity / number / named enemy
     / physical demo / confession /
     reframe / stakes / reversal /
     ridiculous)
   - Primary visual anchor (product
     hero / character reaction /
     before-after / demo action /
     text overlay / social proof)
   - CTA type (shop now / learn more
     / sign up / limited time)
   - Estimated audience-targeting
     signal (age range visible from
     visual cues, gender skew,
     lifestyle markers)
   - Offer visible (discount / free
     shipping / bundle / free gift /
     none)
3. Aggregate patterns across all
   competitors:
   - Format distribution (which
     formats appear most in 30+ day
     ads)
   - Hook mechanism distribution
   - Visual anchor distribution
   - Offer pattern distribution
   - Audience signal patterns
4. Cross-reference against
   [BRAND]'s own live ads (if Meta
   Ads MCP wired). Flag gaps:
   - Formats they run that we don't
   - Hook mechanisms they run that we
     don't
   - Visual anchors they hit that we
     don't
   - Audience signals we're missing
5. Output structured competitor
   pattern report

Guardrails:
- Never include ads under 30 days
  active (low signal)
- Always cite specific ad IDs for
  each extracted pattern
- Never copy competitor ad copy
  verbatim in gap analysis
- Filter out ads clearly outside
  [BRAND] category
```
### Output template
The prompt returns a structured report:
```plain text
COMPETITOR PATTERN REPORT — [DATE]
Competitors analyzed: [5-10]
30+ day ads found: [X]

FORMAT DISTRIBUTION
- UGC: [%]
- Cinematic: [%]
- Reaction: [%]
- Demo: [%]
- Talking head: [%]
- Carousel: [%]
- Static: [%]

HOOK MECHANISM DISTRIBUTION
- Contrarian: [X ads] (competitors: [list])
- Curiosity: [X ads] (competitors: [list])
- Number: [X ads]
- Named enemy: [X ads]
- Physical demo: [X ads]
- Confession: [X ads]
- Reframe: [X ads]
- Stakes: [X ads]
- Reversal: [X ads]
- Ridiculous: [X ads]

VISUAL ANCHOR DISTRIBUTION
- Product hero: [X]
- Character reaction: [X]
- Before-after: [X]
- Demo action: [X]
- Text overlay: [X]
- Social proof: [X]

OFFER PATTERN DISTRIBUTION
- Discount: [X ads] (avg [X]% off)
- Free shipping: [X ads]
- Bundle: [X ads]
- Free gift: [X ads]
- No visible offer: [X ads]

AUDIENCE SIGNAL PATTERNS
- Age range skew: [X]
- Gender skew: [X]
- Lifestyle markers observed: [X]

GAP ANALYSIS vs [BRAND]
FORMAT GAPS:
- [Format] — [Competitors running it] —
  [Ad ID references]

HOOK MECHANISM GAPS:
- [Mechanism] — [Competitors running it] —
  [Sample ad IDs]

VISUAL ANCHOR GAPS:
- [Anchor] — [Competitors running it]

OFFER GAPS:
- [Offer type] — [Competitors running it]

TOP 10 HIGH-SIGNAL COMPETITOR ADS
(30+ day duration + high visual
production quality + pattern repeat)
| # | Competitor | Ad ID | Days Active |
Format | Hook Mechanism | Notable |
```
### Sample walkthrough
Operator inputs 8 skincare competitors (The Ordinary, Bubble, Kosas, Merit, Glossier, Youth To The People, Tower 28, Peach & Lily).
Step 1 output (real):
- 47 ads found running 30+ days across 8 competitors
- Format distribution: UGC 51% / Cinematic 17% / Reaction 15% / Talking head 11% / Demo 6%
- Hook mechanism distribution: Physical demo 34% / Confession 21% / Contrarian 15% / Number 13% / Curiosity 11%
- Visual anchor distribution: Character reaction 38% / Before-after 26% / Product hero 19% / Demo action 17%
- Offer patterns: 68% of 30+ day ads have no visible offer (product-led not price-led)
- Gap analysis vs your brand: You're running 0% physical demo hooks (competitor top mechanism at 34%). You're running 0% before-after visual anchors (competitor #2 at 26%).
Now you know exactly where to build.
### Failure modes + fixes
- Meta Ad Library scrape blocked → fallback: paste 3-5 ads per competitor manually
- Competitor ads inconsistent (mix of test spend + winners) → tighten filter to 45+ days
- Categories drift (competitor also selling adjacent products) → filter output by product category match
---
## ⚙️ Step 2 — Map Angles By Audience Psychology + Build Hook Bank
Claude clusters winning hooks by ICP pain point. Cross-references audience psychographics with the highest-frequency hook patterns. Outputs 5 ranked angles + a 20-hook bank organized by angle.
### Time to run
5 minutes per session
### Inputs
- Step 1 competitor pattern report (paste in or auto-handoff)
- icp_core.md (ICP demographic + psychographic detail)
- voice_core.md (brand voice patterns)
### Paste-ready Claude 5 prompt
```javascript
You are the Angle Mapping + Hook
Bank skill for [BRAND].
Model: Claude Opus 5.
Reference: icp_core.md, voice_core.md,
product_core.md (auto-loaded).
Tools: none (works from Step 1 output).

Input from operator:
- Competitor Pattern Report from Step 1
- ICP language corpus (if available)

Task:
1. Cluster all high-signal competitor
   hooks by ICP pain point:
   - Pain 1: [primary ICP tension
     from icp_core.md]
   - Pain 2: [secondary tension]
   - Pain 3: [tertiary tension]
   - Pain 4: [ambition / aspiration]
   - Pain 5: [objection or hesitation]
2. Score each pain cluster:
   - Competitor signal strength
     (how many 30+ day ads hit this
     pain?)
   - ICP resonance (how strongly
     does this pain sit in ICP
     psychographic?)
   - Novelty for [BRAND] (are we
     already running ads for this
     pain?)
   - Product truth score (does
     product_core.md let us make this
     claim credibly?)
3. Rank 5 angles by combined score
4. For each of 5 ranked angles,
   generate a 20-hook bank organized
   by mechanism:
   - 2 contrarian hooks per angle
   - 2 curiosity hooks per angle
   - 2 number-led hooks per angle
   - 2 named-enemy hooks per angle
   - 2 physical demo hooks per angle
   - 2 confession hooks per angle
   - 2 reframe hooks per angle
   - 2 stakes hooks per angle
   - 2 reversal hooks per angle
   - 2 ridiculous hooks per angle
5. Every hook must:
   - Sit under 12 words
   - Match voice_core.md tone
   - Reference product truthfully
   - Front-load the pattern break in
     first 4 words

Output: ranked angles + 100 hooks
total (20 per angle x 5 angles) or
100-hook bank organized by angle +
mechanism.

Guardrails:
- No em dashes
- No "Most..." openers
- No stacked short fragments
- Never invent product capabilities
  to make a hook work
- Never repeat hooks across angles
```
### Output template
```plain text
ANGLE MAPPING + HOOK BANK — [DATE]

RANKED ANGLES

ANGLE 1: [Name]
Pain addressed: [ICP tension]
Competitor signal: [X ads across Y
competitors]
ICP resonance: [score]/10
Novelty for [BRAND]: [score]/10
Product truth: [score]/10
Combined: [score]/40

Hook bank (20 hooks):
Contrarian:
1. [Hook under 12 words]
2. [Hook]
Curiosity:
3. [Hook]
4. [Hook]
[... continues for all 10 mechanisms]

ANGLE 2: [Name]
[Same structure]

ANGLE 3: [Name]
[Same structure]

ANGLE 4: [Name]
[Same structure]

ANGLE 5: [Name]
[Same structure]

TOTAL: 100 hooks across 5 angles
ranked by combined score
```
### Sample walkthrough
From Step 1's skincare example, Step 2 clusters the 47 competitor ads into 5 ranked angles:
Angle 1 (score 34/40): "The Retinol Fear" — competitors hitting the "retinol will ruin your skin" objection with physical demo hooks. Signal: 12 ads across 5 competitors.
Angle 2 (score 31/40): "The Overpriced Serum Confession" — competitors hitting the "$220 serum is a scam" reframe. Signal: 9 ads across 4 competitors.
Angle 3 (score 28/40): "The Dermatologist Reveal" — competitors hitting the "your derm doesn't want you to know" contrarian. Signal: 8 ads across 3 competitors.
Angle 4 (score 24/40): "The 4AM Kitchen Test" — competitors hitting the physical-demo home-test angle. Signal: 7 ads across 3 competitors.
Angle 5 (score 21/40): "The Ingredient List Roast" — competitors hitting the ingredient-transparency reframe. Signal: 6 ads across 4 competitors.
For each angle, Claude generates 20 hooks. Total: 100 hooks ready to feed into Step 3.
### Failure modes + fixes
- Angles feel same-y → force diversification: reject ranked angles that share pain cluster with any higher-ranked angle
- Hooks feel generic → force specificity: reject any hook lacking a specific number, named entity, or physical object
- Angles score below 20/40 → competitor signal insufficient, expand Step 1 competitor list
---
## ⚙️ Step 3 — Generate The Brief Stack + Test Plan
Claude turns each angle into a full creative brief: hook, copy, visual direction, CTA. Ranks all variations by predicted lift based on competitor signal. Outputs the test plan with budget allocation across briefs.
### Time to run
5 minutes per session
### Inputs
- Step 2 angle map + hook bank
- matrix_core.md (for budget allocation logic)
- Weekly test budget total
### Paste-ready Claude 5 prompt
```javascript
You are the Brief Stack + Test Plan
Generator for [BRAND].
Model: Claude Opus 5.
Reference: voice_core.md, icp_core.md,
product_core.md, aesthetic_core.md,
matrix_core.md (auto-loaded).
Tools: none (works from Step 2 output).

Input from operator:
- Angle map + hook bank from Step 2
- Weekly test budget total
- Number of briefs to produce (default
  6)

Task:
1. From the 5 ranked angles + 100
   hooks, select 6 concepts to brief:
   - 2 concepts from Angle 1 (top-
     ranked, allocate more test
     spend)
   - 1 concept from Angles 2-5 each
   - Each concept uses a different
     hook mechanism (diversify test)
2. For each of 6 concepts, produce a
   full creative brief:

BRIEF TEMPLATE:
- Concept name (2-4 words)
- Angle mapped
- Hook (from hook bank, under 12
  words)
- Hook mechanism
- Format (per format_core.md bias,
  match competitor pattern signal
  from Step 1)
- Funnel position (TOF / MOF / BOF)
- 6-shot storyboard outline (hook /
  setup / escalation / turn / payoff
  / CTA)
- Copy: primary caption (125 char),
  link description (30 char), CTA
  text (under 4 words)
- Visual direction: aesthetic
  reference from aesthetic_core.md,
  lighting, color palette, character
  actions, product visibility
- Character assignment (from
  @character_[NAME] library)
- Product assignment (from
  @product_[SKU] library)
- Estimated production complexity
  (LOW / MED / HIGH)
- Estimated production time
- Estimated production cost

3. Rank all 6 briefs by predicted lift:
   - Competitor signal strength (from
     Step 1)
   - Angle score (from Step 2)
   - Hook mechanism match to Step 1's
     over-indexed mechanisms
   - Novelty vs our own live ads
4. Build test plan:
   - Allocate weekly test budget
     across 6 briefs
   - Higher predicted lift = higher
     initial budget
   - Every brief gets minimum test
     spend from matrix_core.md
   - Reserve 15% of budget for
     winning-variant iteration mid-
     week
5. Output test plan with budget
   allocation table

Guardrails:
- Every brief must be structurally
  distinct from every other brief
- Every hook must come from Step 2's
  hook bank (no new hooks invented)
- Every brief must map to a specific
  angle from Step 2
- Never allocate < matrix_core.md
  minimum test spend to any brief
```
### Output template — The Creative Brief
```plain text
BRIEF #1
Concept: [Name]
Angle: [From Step 2]
Hook: [Under 12 words]
Mechanism: [Contrarian / Curiosity /
etc]
Format: [UGC / cinematic / etc]
Funnel: [TOF / MOF / BOF]

6-SHOT STORYBOARD OUTLINE
Shot 1 (0-3s) Hook: [Visual]
Shot 2 (3-6s) Setup: [Visual]
Shot 3 (6-12s) Escalation: [Visual]
Shot 4 (12-18s) Turn: [Visual]
Shot 5 (18-24s) Payoff: [Visual]
Shot 6 (24-30s) CTA: [Visual + CTA
text]

COPY
Primary caption (125 char): [Text]
Link description (30 char): [Text]
CTA text (4 words): [Text]

VISUAL DIRECTION
Aesthetic reference: [From
aesthetic_core.md]
Lighting: [Direction + quality]
Palette: [Dominant + accent colors]
Character: [@character_[NAME]]
Product: [@product_[SKU]]
Character actions: [Beat by beat]
Product visibility: [In frame / hero /
background]

PRODUCTION SPEC
Complexity: [LOW / MED / HIGH]
Estimated time: [Hours]
Estimated cost: [$]

PREDICTED LIFT
Competitor signal: [Strong / Medium /
Weak]
Angle score: [X/40]
Novelty score: [X/10]
Combined predicted lift: [1-10]

[Repeat for briefs 2-6]

TEST PLAN

Weekly test budget: $[X]
Reserved for iteration: 15% = $[Y]
Deployable budget: $[Z]

BUDGET ALLOCATION
| Brief | Predicted Lift | Test Budget |
% of Total |
| 1 | 9/10 | $[X] | 25% |
| 2 | 8/10 | $[X] | 20% |
| 3 | 7/10 | $[X] | 15% |
| 4 | 7/10 | $[X] | 15% |
| 5 | 6/10 | $[X] | 12.5% |
| 6 | 6/10 | $[X] | 12.5% |

Deploy Order (staggered to isolate
signal):
Day 1: Briefs 1, 2 launch
Day 2: Briefs 3, 4 launch
Day 3: Briefs 5, 6 launch

Kill/Scale Matrix trigger: 48h post-
launch per brief per matrix_core.md
thresholds.
```
### Sample walkthrough
From Step 2's 5 skincare angles + 100 hooks, Step 3 selects:
- Brief 1: "Retinol Rebuttal" (Angle 1, physical demo hook) — score 9/10
- Brief 2: "The 220 Confession" (Angle 2, confession hook) — score 8/10
- Brief 3: "The Derm's Playbook" (Angle 3, contrarian hook) — score 7/10
- Brief 4: "The 4AM Test" (Angle 4, demo hook) — score 7/10
- Brief 5: "Ingredient Roast" (Angle 5, reframe hook) — score 6/10
- Brief 6: "Retinol Rebuttal V2" (Angle 1, curiosity hook) — score 6/10
Weekly test budget $2,000. Allocated:
- Brief 1: $500 (25%)
- Brief 2: $400 (20%)
- Brief 3: $300 (15%)
- Brief 4: $300 (15%)
- Brief 5: $250 (12.5%)
- Brief 6: $250 (12.5%)
Reserved $300 (15%) for winning-variant iteration mid-week.
Deploy over 3 days to isolate signal per brief.
### Failure modes + fixes
- 6 briefs feel too similar → force mechanism diversification (no 2 briefs share hook mechanism)
- Predicted lift scores too clustered → tighten scoring criteria: separate competitor signal, angle score, novelty as independent axes
- Budget allocation feels too flat → widen top-brief allocation (top brief should get 25%+ of budget)
---
## ⚙️ The Full 15-Minute Workflow (End-to-End)
Monday 9:00 AM. Operator opens Claude 5 chat.
**Minute 0-5**: Paste Step 1 prompt. Attach competitor list. Claude scrapes/ingests Meta Ad Library. Returns competitor pattern report with format + hook + visual + offer + audience distributions + gap analysis vs your brand.
**Minute 5-10**: Paste Step 2 prompt in same chat. Auto-references Step 1 output. Returns 5 ranked angles + 100-hook bank organized by mechanism.
**Minute 10-15**: Paste Step 3 prompt in same chat. Auto-references Step 1 and Step 2 outputs. Returns 6 fully-briefed concepts with storyboards, copy, visual direction + test plan with budget allocation.
Operator reviews 6 briefs. Approves 5-6. Routes to production pipeline.
Total: 15 minutes to what used to require 12 hours of manual research + strategy work.
---
## ⚙️ The Weekly Cadence (Full Sprint Using This Workflow)
**Sunday 6:00 PM**: Pull competitor list. Verify Meta Ad Library URLs still valid.
**Monday 9:00 AM**: Run 3-step workflow. 15 minutes. 6 briefs ready.
**Monday 9:15-10:00 AM**: Operator review + approval. Route 5-6 briefs to production.
**Monday 10:00 AM to Wednesday 6:00 PM**: Production pipeline runs briefs through storyboarding + character/product locks + render + assembly.
**Thursday 4:00 PM**: 5-6 finished ads uploaded to Meta as drafts.
**Friday 9:00 AM**: Launch approved drafts per test plan schedule.
**Following Monday**: Matrix runs 48h post-launch per brief. Winners scale, losers kill. Winning-variant iterator picks up scaled winners.
**Every Monday**: Re-run 3-step workflow with fresh competitor data. Loop compounds.
---
## ⚙️ 30-Day Scaling Plan
**Week 1**: Run workflow for the first time. Ship 3-4 briefs (start conservative). Track prediction accuracy — did the top-ranked briefs actually outperform?
**Week 2**: Ship 5 briefs. Refine prompts based on Week 1 output quality. Add any new hook mechanisms discovered in competitor scans.
**Week 3**: Ship 6 briefs. Expand competitor list to 10 tracked competitors (started with 5-8). Now have 4 weeks of prediction accuracy data to calibrate scoring.
**Week 4**: Ship 6-8 briefs. Layer in ICP language mining from your reviews/DMs as a 4th input to Step 2. This lifts angle scoring accuracy 20-30%.
**By Day 30**: Workflow producing 20-25 briefs per month with predicted-vs-actual accuracy above 75%.
---
## ⚙️ What NOT To Do
→ Don't run the workflow without 30+ day filter on competitor ads. Losers pollute the pattern report.
→ Don't skip Step 2 and jump from competitor patterns straight to briefs. The angle mapping is where the compounding intelligence lives.
→ Don't ship all 6 briefs on Day 1. Stagger deploy across 3 days to isolate signal per brief.
→ Don't run this weekly on the same 5 competitors. Rotate the competitor list monthly to catch emerging players.
→ Don't rely on Step 3's predicted lift scores without validation. Track actual performance vs prediction for 4 weeks before trusting the scoring.
→ Don't paste the entire competitor scrape into a fresh chat every time. Use the same chat session across all 3 steps so Claude maintains context.
→ Don't skip the ICP language corpus input. Adding real customer language lifts angle scoring accuracy by 20-30%.
→ Don't allocate all budget evenly across 6 briefs. Weight toward top-predicted lift briefs.
→ Don't invent competitor ads Claude can't verify. If Meta Ad Library returns nothing for a competitor, they're not currently running ads. Note and move on.
→ Don't share this workflow with your competitors. It compounds against you if they run it faster.
---
## ⚙️ The Full Workflow Inventory
<table header-row="true">
<tr>
<td>Step</td>
<td>Name</td>
<td>Time</td>
<td>Output</td>
</tr>
<tr>
<td>1</td>
<td>Competitor Pattern Extraction</td>
<td>5 min</td>
<td>Structured pattern report + gap analysis</td>
</tr>
<tr>
<td>2</td>
<td>Angle Mapping + Hook Bank</td>
<td>5 min</td>
<td>5 ranked angles + 100 hooks</td>
</tr>
<tr>
<td>3</td>
<td>Brief Stack + Test Plan</td>
<td>5 min</td>
<td>6 full briefs + budget-allocated test plan</td>
</tr>
</table>
**Total time per session**: 15 minutes<br>**Output per session**: 6 fully-briefed concepts + test plan<br>**Frequency**: Weekly (Monday sprint)<br>**Time saved vs manual**: 12 hours → 15 minutes = 11.75 hours saved per week<br>**Monthly time saved**: \\~47 hours
---
## 🎯 Closer
**Wire prerequisites in 15 minutes. Run Step 1 with your competitor list. Feed output into Step 2. Feed Step 2 output into Step 3. In 15 minutes you have 6 fully-briefed concepts with test plans tied to live competitor signal. Do this every Monday. By end of Month 1 you're shipping 20-25 competitor-signal-informed briefs per month instead of 4-6 guesses. The workflow ships as 3 paste-ready prompts. You don't need to hire a research contractor. You need to run 3 prompts in sequence every Monday morning.**
Manual Meta Ads research is 12 hours a week most operators can't afford.
3 sequenced Claude 5 prompts compress it to 15 minutes.
Every brief ties directly to a 30+ day competitor winner.
---
**Prerequisites + 3 paste-ready prompts + output templates + weekly cadence + 30-day scaling plan is the full workflow. Bookmark this guide. Run Step 1 this Monday.**
---
