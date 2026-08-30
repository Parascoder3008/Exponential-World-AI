---
title: "The Ultimate DTC Marketing Engine"
page_id: 3c592e2e92e9801d8f8de5c9b621fbe2
layer: strategy
source: https://freebie-for-you.notion.site/3c592e2e92e9801d8f8de5c9b621fbe2
---
---
## 🎯 What You're Getting
The complete step-by-step guide to building an entire DTC marketing department as one connected n8n + Claude workflow.
Not a single-channel automation. Not a prompt pack. A full 7-function marketing engine where research feeds strategy feeds creative feeds campaigns feeds leads feeds CRM feeds analytics, and analytics feeds back into research to close the loop.
Inside:
1. The complete workflow architecture (29 nodes, 7 functions, 1 orchestrator, 1 feedback loop)
2. Every node and connection explained
3. The Claude prompts for each marketing function
4. Required inputs and expected outputs per node
5. Approval gates and routing logic
6. The performance feedback loop
7. Instructions for building it inside n8n
Original framework inspired by Thomas Read's "The Ultimate Marketing Engine."
---
## ⚙️ The Complete Workflow Architecture
The engine runs 7 functions connected through 1 central Marketing Orchestrator, with a performance feedback loop that closes back on the top of the funnel.
**Flow direction**: Research → Strategy → Creation → Distribution → Conversion → Lifecycle → Optimisation → back to Research.
**The 7 functions:**
1. **Research & Intelligence** (4 nodes): ICP Research + Review Miner + Competitor Ad Radar + Trend Monitor
2. **Strategy & Planning** (4 nodes): Positioning + Offer Design + Sprint Planner + Budget Allocation
3. **Content & Creative** (4 nodes): Concept Ideas + Hook Writer + Storyboard Builder + Creative Brief
4. **Campaigns & Distribution** (4 nodes): Meta Ads + TikTok Ads + Email + SMS + Organic Social
5. **Lead Gen & Conversion** (4 nodes): Landing Page Capture + Enrichment + Intent Scoring + CRO
6. **CRM & Lifecycle** (4 nodes): Welcome Flow + Onboarding + Win-Back + Upsell
7. **Analytics & Optimisation** (4 nodes): Kill/Scale Matrix + Attribution + A/B Testing + Weekly Report
**Plus:**
- **1 Marketing Orchestrator** at center — routes every output between functions, enforces approval gates, escalates exceptions
- **1 Performance Feedback Loop** at bottom — Analytics output feeds back into Research node to inform next week's ICP + trend + competitor updates
Total: 29 nodes producing a self-improving marketing department.
---
## ⚙️ Prerequisites (30-Minute Setup)
Wire the foundation before building the engine.
1. **n8n instance** (self-hosted or cloud)
2. **Claude API access** (via API key or Claude Code MCP)
3. **Meta Ads MCP** + **TikTok Ads API** + **Google Sheets MCP** + **Perplexity MCP** + **Klaviyo API** + **Shopify API** wired to n8n
4. **Environment variables**:
	```bash
export CLAUDE_API_KEY=sk-...
export META_ACCESS_TOKEN=EAA...
export TIKTOK_ACCESS_TOKEN=...
export KLAVIYO_API_KEY=pk-...
export SHOPIFY_STORE_URL=...
export SHOPIFY_ACCESS_TOKEN=...
export PERPLEXITY_API_KEY=pplx-...
export GOOGLE_SHEETS_ID_ICP=...
export GOOGLE_SHEETS_ID_CONCEPTS=...
export GOOGLE_SHEETS_ID_PERFORMANCE=...
	```
5. **Brand Brief filled** at `~/.claude/brand-context/[BRAND]/`:
	- voice_core.md
	- icp_core.md
	- product_core.md
	- matrix_core.md
	- aesthetic_core.md
	- format_core.md
Every node references the Brain. Every MCP is wired to n8n before any workflow fires.
---
## ⚙️ Function 1 — Research & Intelligence (4 Nodes)
The top of the engine. Everything downstream fails if research inputs are weak.
### Node 1.1 — ICP Research
**Role**: Continuously refine the ICP profile from real customer behavior, not marketing personas.<br>**Trigger**: Monthly on the 1st, 9:00 AM<br>**Inputs**: Shopify customer data (last 90 days orders + LTV segments) + Klaviyo engagement + review sources<br>**Outputs**: Updated `icp_core.md` with demographic + psychographic + spending behavior + objection patterns<br>**Handoff**: Feeds Positioning (2.1) + Concept Ideas (3.1) + all downstream Claude prompts via SessionStart hook
### Node 1.2 — Review Miner
**Role**: Extract real customer language from reviews, DMs, and support tickets weekly.<br>**Trigger**: Weekly Monday 7:00 AM<br>**Inputs**: Shopify reviews + [Judge.me](http://judge.me/) + Klaviyo replies + Meta comments + support tickets<br>**Outputs**: Top 30 phrases customers actually use + top 10 objections + top 10 aspirations<br>**Handoff**: Feeds Hook Writer (3.2) + Landing Page Capture (5.1) copy + Welcome Flow (6.1) sequences
**Paste-ready flagship prompt for this function**:
```javascript
You are the Review Miner node in the
Research & Intelligence function for
[BRAND].
Reference: icp_core.md, voice_core.md.
Tools: Shopify MCP, Klaviyo MCP, Meta
Ads MCP.

Task:
1. Pull last 30 days of customer
   content:
   - Shopify reviews (5-star + 1-star)
   - Klaviyo email replies
   - Meta ad comments + DMs
   - Support tickets (Front / Zendesk)
2. Extract top 30 recurring ICP-
   distinctive phrases
3. Categorize by 3 framings:
   - Problem language (how they
     describe pain)
   - Result language (how they
     describe outcome)
   - Objection language (why they
     hesitated)
4. Filter out generic phrases (keep
   ICP-distinctive only)
5. Update icp_core.md language
   corpus
6. Broadcast top 30 to Hook Writer +
   Landing Page Capture

Output: 30 phrases + 3-category
grouping + icp_core.md update +
broadcast to downstream nodes.

Guardrails:
- Never paraphrase ICP language into
  agency-speak
- Never invent phrases not in source
  data
- Always cite source per phrase for
  verification
```
### Node 1.3 — Competitor Ad Radar
**Role**: Weekly scan of 5-10 tracked competitors on Meta Ad Library + TikTok + Google.<br>**Trigger**: Sunday 10:00 AM<br>**Inputs**: [Competitors.md](http://competitors.md/) (competitor list + ad library URLs) + Perplexity MCP<br>**Outputs**: Gap analysis (formats + hooks + angles + offers they run that we don't) + 5 exploitation concepts<br>**Handoff**: Feeds Concept Ideas (3.1) + Sprint Planner (2.3)
### Node 1.4 — Trend Monitor
**Role**: Track emerging trends in category across TikTok / IG / Reddit / YouTube weekly.<br>**Trigger**: Sunday 6:00 PM<br>**Inputs**: Perplexity MCP + TikTok scrape + Reddit API + category keywords<br>**Outputs**: Top 10 trending formats + hook mechanisms + visual anchors with novelty score<br>**Handoff**: Feeds Concept Ideas (3.1) + Offer Design (2.2)
---
## ⚙️ Function 2 — Strategy & Planning (4 Nodes)
Turns research into weekly execution priorities.
### Node 2.1 — Positioning
**Role**: Refine brand positioning quarterly based on ICP shifts + competitor movement.<br>**Trigger**: Quarterly on 1st of quarter<br>**Inputs**: ICP Research (1.1) + Competitor Ad Radar (1.3) + product_core.md<br>**Outputs**: Positioning statement + differentiation angles + ICP tension prioritization<br>**Handoff**: Feeds Offer Design (2.2) + Sprint Planner (2.3) + all creative nodes
### Node 2.2 — Offer Design
**Role**: Frame current offers through urgency / value / risk reversal mechanics.<br>**Trigger**: On new offer rollout or campaign objective shift<br>**Inputs**: Positioning (2.1) + Klaviyo historical offer performance<br>**Outputs**: Primary + secondary offer positioning per campaign<br>**Handoff**: Feeds Creative Brief (3.4) + Email + SMS (4.3) copy
### Node 2.3 — Sprint Planner
**Role**: Weekly Monday sprint planning — SKU priorities + concept quotas + budget allocation.<br>**Trigger**: Monday 8:00 AM (before sprint kickoff)<br>**Inputs**: All Research nodes + Positioning (2.1) + last week's Weekly Report (7.4)<br>**Outputs**: Sprint brief (this week's hero SKUs + concept quotas + budget targets + iteration priorities)<br>**Handoff**: Feeds Concept Ideas (3.1) + Meta Ads (4.1) + TikTok Ads (4.2)
**Paste-ready flagship prompt for this function**:
```javascript
You are the Sprint Planner node in the
Strategy & Planning function for
[BRAND].
Reference: icp_core.md, product_core.md,
matrix_core.md, format_core.md,
positioning_current.md.

Input from upstream nodes:
- ICP Research updates (1.1)
- Review Miner top phrases (1.2)
- Competitor Ad Radar gaps (1.3)
- Trend Monitor top 10 (1.4)
- Positioning (2.1) current statement
- Last week's Weekly Report (7.4)

Task:
Generate this week's sprint brief
covering:
1. Hero SKUs for this week (2-4
   maximum)
2. Concept quotas per SKU (default
   20 per SKU)
3. Format bias per SKU (per
   format_core.md)
4. Budget targets per campaign
   objective (per matrix_core.md)
5. Iteration priorities (winners
   from last week to iterate)
6. New character/product onboardings
   needed
7. Emerging trend priorities (from
   Trend Monitor)
8. Competitor gap priorities (from
   Competitor Ad Radar)

Output: sprint brief structured for
handoff to Content & Creative
function.

Approval gate: brief pauses for
operator approval before downstream
Content function fires.

Guardrails:
- Never plan more than 4 hero SKUs
  per week (focus wins)
- Never allocate budget below
  matrix_core.md initial-test
  threshold
- Always include prior-week
  iteration priorities
- Escalate if last week Weekly
  Report flagged strategic misses
```
### Node 2.4 — Budget Allocation
**Role**: Allocate weekly budget across campaigns + channels + iterations.<br>**Trigger**: Monday 8:30 AM (after Sprint Planner)<br>**Inputs**: Sprint brief (2.3) + matrix_core.md thresholds + last week's spend efficiency<br>**Outputs**: Budget allocation table per campaign + reserved iteration budget<br>**Handoff**: Feeds Meta Ads (4.1) + TikTok Ads (4.2) + Email + SMS (4.3)
---
## ⚙️ Function 3 — Content & Creative (4 Nodes)
Turns strategy into shipped creative assets.
### Node 3.1 — Concept Ideas
**Role**: Generate 20 concepts per hero SKU per sprint.<br>**Trigger**: Monday 9:00 AM (after Sprint Planner approval)<br>**Inputs**: Sprint brief (2.3) + Trend Monitor (1.4) + Competitor gaps (1.3) + ICP language (1.2)<br>**Outputs**: 80-100 concepts per week (20 x 4 hero SKUs) ranked by ICP fit + novelty<br>**Handoff**: Top 20 approved concepts route to Hook Writer (3.2)
**Paste-ready flagship prompt for this function**:
```javascript
You are the Concept Ideas node in the
Content & Creative function for
[BRAND].
Reference: voice_core.md, icp_core.md,
product_core.md, format_core.md,
matrix_core.md, winning_ads_library.md.

Input from upstream:
- Sprint brief with hero SKUs (2.3)
- Trend Monitor top 10 (1.4)
- Competitor Ad Radar gaps (1.3)
- Review Miner top 30 ICP phrases
  (1.2)

Task:
Per hero SKU, generate 20 distinct
concepts. Per concept:
- Premise (specific enough to
  storyboard)
- Hook (under 12 words, front-loaded
  pattern break)
- Format per format_core.md bias
- Funnel position (TOF / MOF / BOF)
- ICP tension targeted
- Estimated production complexity
- ICP fit score (1-10)
- Novelty score (1-10)

Sum scores. Rank all 20 per SKU.
Highlight top 5 per SKU (20 total
across 4 SKUs).

Guardrails:
- No "Most..." openers
- No em dashes
- No fabricated product claims
- Every concept structurally distinct
- No duplicates vs
  winning_ads_library last 60 days
```
### Node 3.2 — Hook Writer
**Role**: 10 hooks per approved concept using 10 pattern-break mechanisms.<br>**Trigger**: After Concept Ideas approval<br>**Inputs**: Top 20 approved concepts + ICP language (1.2)<br>**Outputs**: 200 hooks (20 concepts x 10 mechanisms) scored + ranked<br>**Handoff**: Winning hook per concept routes to Storyboard Builder (3.3)
### Node 3.3 — Storyboard Builder
**Role**: 6-shot storyboard per winning hook + concept.<br>**Trigger**: After Hook Writer selects winner per concept<br>**Inputs**: Winning hook + concept + product + format<br>**Outputs**: 20 storyboards with pacing QA + READY verdict<br>**Handoff**: Approved storyboards route to Creative Brief (3.4)
### Node 3.4 — Creative Brief
**Role**: Package approved storyboard + character + product + assembly spec into complete production brief.<br>**Trigger**: After Storyboard Builder marks READY<br>**Inputs**: Approved storyboard + character/product locks + assembly spec + Offer Design (2.2)<br>**Outputs**: 20 complete production briefs ready for downstream execution<br>**Handoff**: Routes to Meta Ads (4.1) production pipeline
---
## ⚙️ Function 4 — Campaigns & Distribution (4 Nodes)
Coordinates all paid + owned + organic channels from one workflow.
### Node 4.1 — Meta Ads
**Role**: Ship 15-20 ads per week to Meta Ads Manager with correct campaign structure.<br>**Trigger**: Thursday 4:00 PM (after production pipeline delivers finished ads)<br>**Inputs**: Creative Briefs (3.4) + Budget Allocation (2.4) + finished ad files<br>**Outputs**: Draft ads uploaded to Meta Ads Manager with UTM + naming enforcement<br>**Handoff**: Operator approves drafts → live Friday 9:00 AM → feeds Kill/Scale Matrix (7.1)
**Paste-ready flagship prompt for this function**:
```javascript
You are the Meta Ads node in the
Campaigns & Distribution function for
[BRAND].
Reference: matrix_core.md,
format_core.md (naming convention).
Tools: Meta Ads MCP.

Input from upstream:
- Creative Brief (3.4) with finished
  ad files
- Budget Allocation (2.4) per
  campaign
- Naming convention: [BRAND]_
  [Objective]_[Audience]_[Concept]_
  [Date]_[Variant]

Task:
1. Confirm campaign exists in Meta
   Ads Manager. Create if not.
2. Create ad set per Creative Brief:
   - Target audience per matrix
   - Placements per matrix
   - Budget per Budget Allocation
   - Bid strategy per matrix
3. Upload with naming convention
4. Enforce UTM tagging (utm_source,
   utm_medium, utm_campaign,
   utm_content)
5. Set to DRAFT status
6. Notify operator for launch
   approval via Slack

Output: campaign IDs + ad set IDs +
ad IDs + draft preview links +
launch checklist.

Approval gate: operator must approve
draft before flipping to LIVE. Never
auto-launch.

Guardrails:
- Never launch to LIVE
- Never exceed matrix initial-test
  budget
- Never deploy without UTM + naming
  enforcement
```
### Node 4.2 — TikTok Ads
**Role**: Ship 8-10 ads per week to TikTok Ads Manager (same content as Meta with platform-specific captions).<br>**Trigger**: Thursday 4:00 PM (parallel to Meta Ads)<br>**Inputs**: Same Creative Briefs (3.4) as Meta with TikTok-specific captions from Node 4.3<br>**Outputs**: Draft ads in TikTok Ads Manager<br>**Handoff**: Feeds Kill/Scale Matrix (7.1)
### Node 4.3 — Email + SMS
**Role**: Coordinate Klaviyo campaigns tied to weekly sprint themes (product launches / offers / winner amplification).<br>**Trigger**: Weekly Monday 10:00 AM (after Sprint Planner)<br>**Inputs**: Sprint brief (2.3) + Offer Design (2.2) + ICP language (1.2)<br>**Outputs**: 2-3 Klaviyo campaigns scheduled for the week<br>**Handoff**: Performance feeds Kill/Scale Matrix (7.1) + Attribution (7.2)
### Node 4.4 — Organic Social
**Role**: Repurpose paid-winner concepts into organic posts across IG + TikTok + LinkedIn.<br>**Trigger**: When any paid ad hits scale threshold in Kill/Scale Matrix (7.1)<br>**Inputs**: Winning ad file + concept + copy from Creative Brief (3.4)<br>**Outputs**: Scheduled organic posts across accounts<br>**Handoff**: Feeds Attribution (7.2) tracking
---
## ⚙️ Function 5 — Lead Gen & Conversion (4 Nodes)
Captures leads from every channel and optimizes on-site conversion.
### Node 5.1 — Landing Page Capture
**Role**: Ensure every campaign has a matching landing page with capture form + ICP-native copy.<br>**Trigger**: On new campaign launch from Meta Ads (4.1) or TikTok Ads (4.2)<br>**Inputs**: Concept + hook + ICP language (1.2) + Offer Design (2.2)<br>**Outputs**: Landing page brief (or auto-generated page if using Unbounce/Webflow API)<br>**Handoff**: Feeds Enrichment (5.2)
### Node 5.2 — Enrichment
**Role**: Enrich captured leads with third-party data (Clearbit / RB2B / etc) for personalization.<br>**Trigger**: On lead capture<br>**Inputs**: Lead capture data (email + IP + form fields)<br>**Outputs**: Enriched lead record (company / role / firmographics if applicable)<br>**Handoff**: Feeds Intent Scoring (5.3) + Welcome Flow (6.1)
### Node 5.3 — Intent Scoring
**Role**: Score every lead 1-10 for purchase intent based on behavior (pages visited / cart abandonment / discount code use / time on site).<br>**Trigger**: On enrichment + every 24h thereafter<br>**Inputs**: Enriched lead + Shopify behavior + Klaviyo engagement<br>**Outputs**: Intent score + segment assignment<br>**Handoff**: HIGH INTENT → Welcome Flow (6.1) accelerated track. LOW INTENT → standard Welcome Flow.
### Node 5.4 — CRO
**Role**: Weekly conversion rate optimization on landing pages + PDPs + checkout.<br>**Trigger**: Weekly Wednesday 10:00 AM<br>**Inputs**: Shopify Analytics + Meta Attribution + heat-map data (Hotjar / Microsoft Clarity)<br>**Outputs**: 3-5 A/B test recommendations for landing pages / PDP / checkout<br>**Handoff**: Test recommendations route to A/B Testing (7.3) queue
---
## ⚙️ Function 6 — CRM & Lifecycle (4 Nodes)
Runs the full customer lifecycle from first purchase to VIP status.
### Node 6.1 — Welcome Flow
**Role**: Automated welcome sequence for new subscribers with ICP-native copy.<br>**Trigger**: On new subscriber capture<br>**Inputs**: Enriched lead + intent score + ICP language (1.2)<br>**Outputs**: 5-email welcome sequence over 14 days<br>**Handoff**: On first purchase, hands off to Onboarding (6.2)
### Node 6.2 — Onboarding
**Role**: Post-purchase onboarding sequence to maximize first-order satisfaction + set up second order.<br>**Trigger**: On first purchase<br>**Inputs**: Order data + SKU purchased + Shopify customer profile<br>**Outputs**: 3-email onboarding sequence over 21 days (product education + review request + upsell tee-up)<br>**Handoff**: On second-purchase failure at day 45, routes to Win-Back (6.3)
### Node 6.3 — Win-Back
**Role**: Automated re-engagement for lapsed customers (45+ days no purchase).<br>**Trigger**: Day 45 post-last-purchase<br>**Inputs**: Customer purchase history + Klaviyo engagement<br>**Outputs**: 4-touch win-back sequence over 30 days with escalating offers<br>**Handoff**: On re-purchase, routes back to Onboarding (6.2). On no-response after day 75, flags for suppression list.
### Node 6.4 — Upsell
**Role**: Behavior-based upsell + cross-sell offers based on prior purchase patterns.<br>**Trigger**: On order pattern match (customer bought SKU A → recommend SKU B)<br>**Inputs**: Order history + product affinity data + margin data<br>**Outputs**: Personalized upsell email + SMS with dynamic product recommendation<br>**Handoff**: Feeds Attribution (7.2)
---
## ⚙️ Function 7 — Analytics & Optimisation (4 Nodes)
The closing loop. Every function feeds data here, and this function feeds insights back into Research.
### Node 7.1 — Kill/Scale Matrix
**Role**: Daily matrix runner on all live ads.<br>**Trigger**: Daily 9:00 AM<br>**Inputs**: Meta Ads MCP + TikTok Ads MCP + matrix_core.md thresholds<br>**Outputs**: KILL / SCALE / HOLD / ITERATE decisions with strategic scale sizing<br>**Handoff**: SCALE approvals → Meta Ads (4.1). ITERATE → Concept Ideas (3.1) as iteration input. KILL → post-mortem library.
### Node 7.2 — Attribution
**Role**: Cross-channel attribution modeling (Meta + TikTok + Email + Organic) with contribution weighting.<br>**Trigger**: Daily 8:00 AM<br>**Inputs**: Meta / TikTok / Klaviyo / Shopify data + UTM tracking<br>**Outputs**: Attribution report showing which channels contributed to conversions + revenue split<br>**Handoff**: Feeds Weekly Report (7.4) + informs Budget Allocation (2.4) next Monday
### Node 7.3 — A/B Testing
**Role**: Manages the A/B test queue across ads + landing pages + email subject lines + checkout.<br>**Trigger**: Continuous (new tests launch as prior tests conclude)<br>**Inputs**: Test recommendations from CRO (5.4) + Kill/Scale Matrix (7.1) + Sprint Planner (2.3)<br>**Outputs**: Test results per experiment with winner selection + statistical significance<br>**Handoff**: Winners feed Concept Ideas (3.1) library + Landing Page Capture (5.1) updates
### Node 7.4 — Weekly Report
**Role**: Auto-generated Friday 3:00 PM founder-facing exec report.<br>**Trigger**: Friday 3:00 PM<br>**Inputs**: All 7 function outputs from last 7 days<br>**Outputs**: PDF report (5 pages max) emailed to founder + Slack summary<br>**Handoff**: Feeds next Monday's Sprint Planner (2.3) + Research nodes (1.1-1.4)
**Paste-ready flagship prompt for this function**:
```javascript
You are the Weekly Report node in the
Analytics & Optimisation function for
[BRAND].
Reference: all logs (matrix_log /
performance_tracker /
winning_ads_library /
attribution_log).
Tools: Meta Ads MCP, TikTok MCP,
Klaviyo API, Shopify API, email
service.

Task:
Compile founder-facing weekly report
using Pyramid Principle structure:

Section 1 — Executive summary (5
bullets):
- Ads shipped this week
- Ads scaled + total scale % applied
- Ads killed + estimated waste saved
- Winners identified for iteration
- Blended ROAS vs target across all
  channels

Section 2 — Channel performance:
- Meta Ads (spend / ROAS / winners)
- TikTok Ads (spend / ROAS / winners)
- Email + SMS (revenue / open / CTR)
- Organic (impressions / engagement
  / conversions)

Section 3 — Winners deep-dive (top 5):
- Ad name / hook / mechanism / ROAS
  / attribution note

Section 4 — Killed post-mortem
(bottom 5):
- Ad name / hook / failure category
  / spend wasted

Section 5 — CRM performance:
- Welcome flow conversion rate
- Onboarding review request rate
- Win-back re-engagement rate
- Upsell attach rate

Section 6 — Next week focus:
- Priority SKUs from Sprint Planner
- Winners to iterate
- CRO tests launching

Section 7 — Feedback loop:
- What Research + Strategy nodes
  should update based on this week's
  data

Format PDF. Email founder Friday
3pm. Slack summary parallel.

Guardrails:
- Never inflate metrics
- Never exceed 5 pages
- Always cite specific numbers
- Always include feedback-loop
  recommendations for next week
```
---
## ⚙️ The Marketing Orchestrator (Central Node)
The Marketing Orchestrator sits at the center of the engine. It routes every output between functions, enforces approval gates, and escalates exceptions.
### What the Orchestrator does
1. **Routes outputs**: Every function's output routes through the Orchestrator to its downstream destination. The Orchestrator knows which node produces what and which node consumes it.
2. **Enforces approval gates**: Certain transitions require operator approval (Sprint Planner → Concept Ideas, Creative Brief → Meta Ads draft-to-live, Kill/Scale scale decisions). The Orchestrator pauses the workflow at these gates and posts to Slack for operator sign-off.
3. **Escalates exceptions**: When a node fails or produces output flagged for review (drift alerts / anomaly detections / matrix violations), the Orchestrator escalates to the operator instead of silently passing bad data downstream.
4. **Logs every transition**: Every handoff between nodes logs to `orchestrator_log.md` for audit trail + debugging.
### Orchestrator paste-ready prompt
```javascript
You are the Marketing Orchestrator
for [BRAND].
Reference: orchestrator_log.md, all
node outputs.
Tools: Slack, all downstream node
handoffs.

Task:
For every node output received:
1. Validate output format matches
   downstream node's input spec
2. Check approval gate flag:
   - If gate present → post to Slack
     for operator approval, pause
     downstream
   - If no gate → route to downstream
     node
3. Check exception flags:
   - If exception → escalate to
     operator, halt downstream until
     resolved
   - If no exception → route
4. Log transition to
   orchestrator_log.md with timestamp
   + node source + node destination +
   payload summary

Approval gates:
- Sprint Planner (2.3) → Concept
  Ideas (3.1)
- Creative Brief (3.4) → Meta Ads
  (4.1) draft
- Meta Ads (4.1) → LIVE status
- Kill/Scale Matrix (7.1) SCALE
  decisions
- Budget Allocation (2.4)
  reallocations > 20%

Guardrails:
- Never bypass approval gates
- Never route flagged exceptions
  without escalation
- Log every transition (no silent
  handoffs)
```
---
## ⚙️ The Performance Feedback Loop
The bottom of the engine closes the loop back to the top. Analytics feeds Research so next week's work compounds on this week's insights.
### How the feedback loop works
**Every Friday 3:00 PM**: Weekly Report (7.4) generates.
**The Report writes updates to 3 upstream files**:
1. `icp_core.md` — refined ICP profile based on this week's converters vs bouncers
2. `format_core.md` — updated format bias weights based on this week's winners
3. `winning_ads_library.md` — new scaled winners added with structural DNA
**Monday 8:00 AM Sprint Planner (2.3) fires** — reads the updated files + biases next week's brief accordingly.
**Result**: The engine gets smarter every week. Weeks 1-4 are calibration. Weeks 5-12 the feedback loop compounds. By month 6, prediction accuracy on next-week winners is above 75%.
### Anti-drift protections
Feedback loop can go wrong 2 ways:
1. **Overfitting**: system biases too hard toward last month's winners and stops testing novel angles
2. **Underfitting**: system ignores clear signals and keeps testing same failed patterns
**Protection 1**: Format bias shifts capped at 20% per month. Prevents overfitting.<br>**Protection 2**: Trend Monitor (1.4) forces at least 30% novel-angle testing per sprint. Prevents underfitting.<br>**Protection 3**: Post-mortem library flags any anti-pattern appearing 3+ times. Broadcasts as filter to Concept Ideas (3.1).
---
## ⚙️ Building It Inside n8n (Step-By-Step)
### Days 1-3: Foundation
- **Day 1**: Spin up n8n instance. Install required MCP servers (Meta Ads / TikTok / Klaviyo / Shopify / Perplexity / Google Sheets). Wire environment variables.
- **Day 2**: Fill the 6 Brain playbooks. Configure SessionStart hook. Verify Claude auto-loads context.
- **Day 3**: Build the Marketing Orchestrator central node. Wire it to Slack for approval gates + exceptions.
### Days 4-7: Research + Strategy Functions
- **Day 4**: Build Function 1 nodes (ICP Research / Review Miner / Competitor Ad Radar / Trend Monitor). Test each independently.
- **Day 5**: Build Function 2 nodes (Positioning / Offer Design / Sprint Planner / Budget Allocation). Chain Function 1 outputs into Function 2 inputs.
- **Day 6**: Wire Sprint Planner approval gate through Orchestrator to Slack.
- **Day 7**: Test full Research → Strategy chain end-to-end. Ship first sprint brief.
### Days 8-14: Content + Distribution Functions
- **Day 8**: Build Function 3 nodes (Concept Ideas / Hook Writer / Storyboard Builder / Creative Brief). Chain Sprint brief into concept generation.
- **Day 9-10**: Build Function 4 nodes (Meta Ads / TikTok Ads / Email + SMS / Organic Social). Wire MCP integrations.
- **Day 11-12**: Wire production pipeline between Creative Brief and Meta Ads Launcher (via character/product locks + Seedance + CapCut).
- **Day 13**: Test full Content → Distribution chain. Ship 5 pilot ads.
- **Day 14**: Refine failure modes discovered in first pilot.
### Days 15-21: Lead Gen + CRM Functions
- **Day 15-16**: Build Function 5 nodes (Landing Page Capture / Enrichment / Intent Scoring / CRO). Wire Klaviyo + Shopify integrations.
- **Day 17-19**: Build Function 6 nodes (Welcome Flow / Onboarding / Win-Back / Upsell). Configure Klaviyo sequences.
- **Day 20-21**: Test full lead-to-lifecycle chain. Push 10 test leads through end-to-end.
### Days 22-30: Analytics + Feedback Loop
- **Day 22-24**: Build Function 7 nodes (Kill/Scale Matrix / Attribution / A/B Testing / Weekly Report). Wire cron triggers.
- **Day 25-26**: Wire the performance feedback loop from Weekly Report back to Research + Strategy nodes.
- **Day 27-28**: Configure Orchestrator escalation rules + Slack webhooks.
- **Day 29-30**: Run first full end-to-end weekly cycle. Ship 5-10 ads. Confirm feedback loop closes correctly.
**By Day 30**: full engine live at 10-15 ads per week.<br>**By Day 60**: engine stabilized at 20-25 ads per week + full lifecycle sequences running.<br>**By Day 90**: engine compounding — prediction accuracy strong enough to trust automated scale decisions on winners.
---
## ⚙️ The Full Node Inventory
<table header-row="true">
<tr>
<td>Function</td>
<td>Node</td>
<td>Trigger</td>
<td>Handoff</td>
</tr>
<tr>
<td>1</td>
<td>ICP Research</td>
<td>Monthly 1st</td>
<td>→ 2.1, 3.1, all downstream</td>
</tr>
<tr>
<td>1</td>
<td>Review Miner</td>
<td>Weekly Mon</td>
<td>→ 3.2, 5.1, 6.1</td>
</tr>
<tr>
<td>1</td>
<td>Competitor Ad Radar</td>
<td>Weekly Sun</td>
<td>→ 3.1, 2.3</td>
</tr>
<tr>
<td>1</td>
<td>Trend Monitor</td>
<td>Weekly Sun</td>
<td>→ 3.1, 2.2</td>
</tr>
<tr>
<td>2</td>
<td>Positioning</td>
<td>Quarterly</td>
<td>→ 2.2, 2.3, all creative</td>
</tr>
<tr>
<td>2</td>
<td>Offer Design</td>
<td>On rollout</td>
<td>→ 3.4, 4.3</td>
</tr>
<tr>
<td>2</td>
<td>Sprint Planner</td>
<td>Weekly Mon</td>
<td>→ 3.1, 4.1, 4.2</td>
</tr>
<tr>
<td>2</td>
<td>Budget Allocation</td>
<td>Weekly Mon</td>
<td>→ 4.1, 4.2, 4.3</td>
</tr>
<tr>
<td>3</td>
<td>Concept Ideas</td>
<td>Weekly Mon</td>
<td>→ 3.2</td>
</tr>
<tr>
<td>3</td>
<td>Hook Writer</td>
<td>Post-concept</td>
<td>→ 3.3</td>
</tr>
<tr>
<td>3</td>
<td>Storyboard Builder</td>
<td>Post-hook</td>
<td>→ 3.4</td>
</tr>
<tr>
<td>3</td>
<td>Creative Brief</td>
<td>Post-storyboard</td>
<td>→ 4.1</td>
</tr>
<tr>
<td>4</td>
<td>Meta Ads</td>
<td>Thursday 4pm</td>
<td>→ 7.1</td>
</tr>
<tr>
<td>4</td>
<td>TikTok Ads</td>
<td>Thursday 4pm</td>
<td>→ 7.1</td>
</tr>
<tr>
<td>4</td>
<td>Email + SMS</td>
<td>Weekly Mon</td>
<td>→ 7.1, 7.2</td>
</tr>
<tr>
<td>4</td>
<td>Organic Social</td>
<td>On winner scale</td>
<td>→ 7.2</td>
</tr>
<tr>
<td>5</td>
<td>Landing Page Capture</td>
<td>On campaign launch</td>
<td>→ 5.2</td>
</tr>
<tr>
<td>5</td>
<td>Enrichment</td>
<td>On lead capture</td>
<td>→ 5.3, 6.1</td>
</tr>
<tr>
<td>5</td>
<td>Intent Scoring</td>
<td>On enrichment + 24h</td>
<td>→ 6.1</td>
</tr>
<tr>
<td>5</td>
<td>CRO</td>
<td>Weekly Wed</td>
<td>→ 7.3</td>
</tr>
<tr>
<td>6</td>
<td>Welcome Flow</td>
<td>On subscribe</td>
<td>→ 6.2</td>
</tr>
<tr>
<td>6</td>
<td>Onboarding</td>
<td>On first purchase</td>
<td>→ 6.3</td>
</tr>
<tr>
<td>6</td>
<td>Win-Back</td>
<td>Day 45 lapse</td>
<td>→ 6.2 or suppress</td>
</tr>
<tr>
<td>6</td>
<td>Upsell</td>
<td>On pattern match</td>
<td>→ 7.2</td>
</tr>
<tr>
<td>7</td>
<td>Kill/Scale Matrix</td>
<td>Daily 9am</td>
<td>→ 4.1, 3.1, post-mortem</td>
</tr>
<tr>
<td>7</td>
<td>Attribution</td>
<td>Daily 8am</td>
<td>→ 7.4, 2.4</td>
</tr>
<tr>
<td>7</td>
<td>A/B Testing</td>
<td>Continuous</td>
<td>→ 3.1, 5.1</td>
</tr>
<tr>
<td>7</td>
<td>Weekly Report</td>
<td>Friday 3pm</td>
<td>→ 2.3, 1.1-1.4 (feedback)</td>
</tr>
<tr>
<td>Orchestrator</td>
<td>Marketing Orchestrator</td>
<td>Every transition</td>
<td>→ All handoffs</td>
</tr>
</table>
**Total: 29 nodes, 7 functions, 1 orchestrator, 1 feedback loop = 1 complete DTC marketing department**
---
## ⚙️ What NOT To Do
→ Don't build all 7 functions Week 1. Build in dependency order (Research → Strategy → Content → Distribution → Lead Gen → CRM → Analytics).
→ Don't skip the Orchestrator. Direct node-to-node handoffs work initially but break silently at scale. Route everything through the Orchestrator.
→ Don't skip approval gates. Auto-executing scale decisions or draft-to-live transitions destroys operator confidence in the system.
→ Don't hard-code brand context inside individual nodes. Reference the Brain via SessionStart.
→ Don't launch the engine without at least 4 weeks of historical performance data. Feedback loop needs a baseline.
→ Don't ignore the feedback loop. Skipping it means the engine stops learning after week 4.
→ Don't run the engine without weekly operator review. The engine handles execution. The operator handles judgment. Skipping review means bad data compounds.
→ Don't share the n8n workflow export publicly. Contains API keys + brand configs.
→ Don't hire a marketing agency for work the engine handles by Day 90. Cancel the retainer.
→ Don't measure engine value by "ads shipped." Measure by cost per shipped ad + operator hours saved + blended ROAS lift week over week.
---
## 🎯 Closer
**Wire prerequisites in 30 minutes. Build in dependency order over 30 days: Foundation (Days 1-3) → Research + Strategy (Days 4-7) → Content + Distribution (Days 8-14) → Lead Gen + CRM (Days 15-21) → Analytics + Feedback Loop (Days 22-30). By Day 30 the engine ships 10-15 ads per week with lifecycle sequences running. By Day 60 stabilized at 20-25 ads per week. By Day 90 compounding — prediction accuracy strong enough to trust automated scale decisions. Every node has a defined trigger + input + output + handoff. Every approval gate is enforced. The feedback loop closes so next week is smarter than this week. You don't hire the department. You wire the engine.**
DTC marketing is 7 functions × 4 nodes + 1 orchestrator + 1 feedback loop = 29 wired components.
Chained correctly, they replace a full in-house marketing department + agency retainer.
Every function informs the next. Every week is smarter than the last.
Original framework inspired by Thomas Read's "The Ultimate Marketing Engine."
---
**Prerequisites + 29-node architecture + flagship Claude prompts per function + Orchestrator spec + feedback loop + 30-day n8n build guide is the complete engine. Bookmark this guide. Build Function 1 today.**
---
