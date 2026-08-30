---
title: "The Claude + Meta Ads Audit Playbook"
page_id: 3a092e2e92e9806786fcd3c5931dabc3
layer: research
source: https://freebie-for-you.notion.site/3a092e2e92e9806786fcd3c5931dabc3
---
# The Claude + Meta Ads Audit Playbook: The Exact 5-Prompt System That Turns Messy DTC Accounts Into Predictable ROAS Machines in 4 Weeks
---
## 🎯 What You're Getting
The complete Claude + Meta Ads audit playbook that ends the guessing game in DTC advertising. 5 copy-paste-ready Claude prompts that run your account audit, catch budget leaks, write buyer-psychology hook lines, prioritize 30 days of messy data into a clear action list, build the testing roadmap, and flag fatigue signals before they burn another week of spend.
The 5 exact Claude prompts we run in every DTC account audit. The 4-week plan to go from leaking budget to predictable ROAS. The scaling framework we use for 7-figure eCommerce stores. The specific report structure that turns Meta Ads Manager's overwhelming data view into a decision-driven priority list.
You stop scaling creatives based on gut feel. You stop guessing which audiences to expand. You stop discovering budget leaks 2 weeks after they started. You paste your Meta Ads Manager exports into Claude, run the 5 prompts in sequence, get back a clear kill/hold/scale priority list, a fresh hook-line library, and a 4-week testing roadmap. Same day.
By the end of this guide, you'll have:
→ The 5 exact Claude prompts (copy-paste ready with fill-in-the-blanks)<br>→ The Meta Ads Manager export protocol (which reports to pull, which columns to include)<br>→ The budget-leak audit framework (finds the leaks the platform's default view hides)<br>→ The hook-line factory prompt (writes buyer-psychology-driven hooks, not template garbage)<br>→ The 30-day priority list generator (turns messy data into one clear action list in 20 minutes)<br>→ The testing roadmap builder (no more guessing what to test next)<br>→ The fatigue detector (catches creative + audience fatigue before it burns spend)<br>→ The 4-week plan to move from wasted spend to predictable ROAS<br>→ The scaling framework used by 7-figure DTC stores
If you're running Meta Ads for DTC and can't tell me which creative is the profit driver vs which is quietly burning cash, this playbook fixes that in one afternoon.
---
## ⚙️ The Hidden Mechanism — Why Claude Beats Meta Ads Manager for Auditing
Every standard DTC ads audit has the same failure mode:
1. Operator opens Meta Ads Manager
2. Faces 200+ ads across 15+ campaigns
3. Sorts by ROAS, kills the obvious losers
4. Scales the obvious winners
5. Misses 40-60% of the actual profit leaks (hidden in aggregated data)
6. Guesses at what to test next based on "vibes"
The fix is structural: Claude's context bandwidth holds the full account data in one workspace. Every campaign, every ad set, every ad, every audience, every creative — all at once. Claude sees patterns across dimensions Meta Ads Manager's default view can't surface.
Meta Ads Manager was built to SHOW data. Claude is a REASONING engine trained on strategic decision frameworks. Different tools, different jobs.
Where Meta Ads Manager tells you "Ad #47 has 1.2x ROAS" — Claude tells you "Ad #47 has 1.2x ROAS on cold audiences BUT 3.8x on retargeting, so it's not a kill, it's an audience misallocation."
The fix is not "better Meta Ads dashboards." The fix is **feeding your account data to Claude and letting Claude reason across it** — the thing that turns 200 ads into a 15-item action list.
---
## ⚙️ The Stack
<table header-row="true">
<tr>
<td>Layer</td>
<td>Tool</td>
<td>Job</td>
</tr>
<tr>
<td>Data source</td>
<td>Meta Ads Manager</td>
<td>Native performance data</td>
</tr>
<tr>
<td>Data export</td>
<td>Meta Ads Manager CSV / Excel export</td>
<td>Structured account data</td>
</tr>
<tr>
<td>Analysis</td>
<td>Claude Fable 5 with Audit Playbook Skills</td>
<td>Runs the 5 audit prompts</td>
</tr>
<tr>
<td>Optional visualization</td>
<td>Google Sheets / Excel</td>
<td>Charts + tracking (Claude can also output these)</td>
</tr>
<tr>
<td>Deploy</td>
<td>Back to Meta Ads Manager</td>
<td>Execute kill/hold/scale + creative tests</td>
</tr>
</table>
Total time from data export to action list: 90 minutes for a first audit. 20 minutes for weekly recurring audits once the workflow is templated.
---
## ⚙️ The Meta Ads Manager Export Protocol
Before you run any Claude prompt, pull the right data.
### Reports to Export (all for last 30 days)
**Report 1 — Ad-Level Performance**<br>Columns to include:<br>→ Ad name<br>→ Campaign name<br>→ Ad set name<br>→ Spend<br>→ Impressions<br>→ CTR (link click-through rate)<br>→ CPC<br>→ CPM<br>→ Purchases<br>→ Purchase value<br>→ Purchase ROAS<br>→ Frequency<br>→ Hook rate (3-second video views / impressions)<br>→ Hold rate (15-second video views / impressions)
**Report 2 — Ad Set Performance**<br>Columns to include:<br>→ Ad set name<br>→ Campaign name<br>→ Audience name / targeting<br>→ Spend<br>→ Purchases<br>→ Purchase value<br>→ ROAS<br>→ CPA<br>→ Frequency
**Report 3 — Search Terms / Placement Report** (if using Advantage+ or open placements)<br>→ Placement<br>→ Spend<br>→ Purchases<br>→ Purchase value<br>→ ROAS
**Report 4 — Audience Overlap Report**<br>→ Audiences overlapping<br>→ Overlap percentage
Export all 4 reports as CSV or XLSX. Save to a working folder.
---
## ⚙️ Prompt 1 — The Budget Leak Auditor
The first prompt catches budget bleeding into losing creatives + audiences + placements that aren't obvious from Meta's default sort views.
### The Prompt
```javascript
You are a Meta Ads auditor for DTC
eCommerce. Given this ad-level + ad set +
placement data from the last 30 days, find
every budget leak.

[PASTE Report 1 + Report 2 + Report 3 data
here as tables]

Brand context:
- Product: [PRODUCT + PRICE POINT]
- Target CPA: $[TARGET]
- Target ROAS: [TARGET]x
- Current 30-day account ROAS: [ACTUAL]x
- Total 30-day spend: $[SPEND]

For each ad/adset/placement, categorize:

BUDGET LEAK (kill immediately):
- Ad spent >$500 with ROAS below 0.8x
- Ad spent >$1,000 with CPA above 2x target
- Placement spent >$300 with 0 conversions
- Audience overlap >30% with a better-
  performing audience (redundant spend)

SILENT LEAK (kill within 3 days):
- Ad with hook rate below 25% and spend
  >$300 (fatigue signal)
- Ad set with frequency >4.5 and CTR
  declining week-over-week (audience fatigue)
- Placement with 0.5-1x ROAS eating >10% of
  budget

HIDDEN WINNER (scale immediately):
- Ad with ROAS >2x AND hook rate >40% AND
  spend <$500 (under-invested winner)
- Audience with ROAS >1.5x AND frequency <2
  (room to scale)
- Placement with ROAS >2x AND <5% of total
  spend

Output format:
| Leak type | Item name | Reason | Action |
Impact |

Prioritize by dollar impact. Show top 15
items. No hedging. Decisive calls.
```
### What You Get Back
A 15-item priority list of budget leaks + hidden winners with specific dollar impact per item. Execute the top 5 immediately. This alone typically saves 15-30% of your monthly wasted spend.
---
## ⚙️ Prompt 2 — The Hook-Line Factory (Buyer Psychology, Not Template Garbage)
The second prompt writes fresh hook lines calibrated to real buyer psychology for your product + audience.
### The Prompt
```javascript
You are a DTC ad copywriter for high-
performance Meta Ads. Write 30 fresh hook
lines for [PRODUCT].

Product context:
- Product: [1-LINE DESCRIPTION]
- Price: [PRICE POINT]
- ICP: [DEMOGRAPHIC + PSYCHOGRAPHIC in 2
  sentences]
- Top 3 buyer objections: [OBJECTION 1] /
  [OBJECTION 2] / [OBJECTION 3]
- Top 3 buyer desires: [DESIRE 1] / [DESIRE
  2] / [DESIRE 3]
- Current winning hook (if any): [PASTE
  WINNING HOOK]

Write 30 hooks across 6 psychological drivers:

Cluster 1 — Curiosity Gap (5 hooks):
Open a knowledge gap, force scroll-stop.

Cluster 2 — Loss Aversion (5 hooks):
Frame product as preventing a specific loss
the ICP already fears.

Cluster 3 — Identity Alignment (5 hooks):
Position product as signal of the identity
the ICP wants to embody.

Cluster 4 — Social Proof Pattern-Interrupt
(5 hooks):
Use social proof in an unexpected structure,
not "X customers love it."

Cluster 5 — Contrarian Frame (5 hooks):
Challenge a category assumption the ICP
holds.

Cluster 6 — Direct Benefit Contradiction (5
hooks):
Name the benefit while acknowledging the
common counter-argument.

Voice rules:
- Under 12 words per hook
- No fluff verbs (unlock, dive, leverage)
- No "Most X..." openers
- Break pattern in first 3 words
- Sound like a real human, not a brand

Output as numbered list, 6 clusters × 5
hooks = 30 total.
```
### What You Get Back
30 fresh hook lines organized by psychological driver. Pick your top 6-10 based on ICP fit, run as hook variants on your next creative test cycle.
---
## ⚙️ Prompt 3 — The 30-Day Priority List Generator
The third prompt turns 30 days of messy account data into one clear priority list of what to do this week.
### The Prompt
```javascript
You are a DTC ads operator prioritizing next
week's actions.

Data from the last 30 days:
[PASTE Report 1 + Report 2 summary + your
Prompt 1 output]

Brand context:
- Total monthly ad budget: $[BUDGET]
- Target CPA: $[TARGET]
- Target ROAS: [TARGET]x
- Current 30-day account ROAS: [ACTUAL]x

Output a prioritized action list for the next
7 days:

CATEGORY 1 — KILLS (Execute Monday):
[Items to kill from Prompt 1 output that must
happen this week]

CATEGORY 2 — SCALES (Execute Monday-Tuesday):
[Under-invested winners to increase budget
on. Specify new budget per item.]

CATEGORY 3 — NEW TESTS (Execute Wednesday-
Thursday):
[3-5 new creative or audience tests to
launch. Specify hook to use, format,
audience, budget.]

CATEGORY 4 — MONITORING (Ongoing):
[Items in "hold" range that need daily
attention. Specify metrics to watch.]

CATEGORY 5 — WEEK-2 PREP:
[Setup work to do this week to enable next
week's decisions. E.g. new creative briefs,
audience research, landing page tests.]

For each item, specify:
- Action verb
- Item name
- Metric to monitor
- Decision trigger for next action
- Estimated dollar impact

Prioritize by dollar impact. No hedging.
Decisive calls.
```
### What You Get Back
A structured priority list broken into 5 categories with specific actions, metrics, and dollar impacts. This becomes your weekly ads-team plan.
---
## ⚙️ Prompt 4 — The Testing Roadmap Builder
The fourth prompt builds a 4-week creative testing roadmap so you stop scaling based on gut feel.
### The Prompt
```javascript
You are a DTC creative testing strategist.
Build a 4-week testing roadmap.

Current state:
- Winning creative format: [FORMAT — e.g. UGC
  reaction, cinematic, BTS vlog, 1-photo-to-
  6-shots]
- Winning hook archetype: [ARCHETYPE from
  Prompt 2 clusters]
- Winning audience: [AUDIENCE]
- Ad account monthly spend: $[BUDGET]
- Portion allocated to testing: $[TESTING
  BUDGET, typically 15-25% of monthly]

Design the roadmap across 4 weeks:

WEEK 1 — HOOK VARIATION TESTING
Goal: identify best-performing hook cluster
for scaling audience
- 6 hooks tested (2 from each of 3
  psychological clusters)
- Same format, same audience
- Budget: $[X]/day per hook
- Decision criteria: hook rate + hold rate
  after hour 48
- Winners advance to Week 2

WEEK 2 — FORMAT VARIATION TESTING
Goal: identify best-performing format for
the winning hooks
- 3 formats tested (UGC / cinematic / BTS
  vlog) using Week 1 winning hooks
- Same audience
- Budget: $[X]/day per format
- Decision criteria: CTR + CPA after hour 72
- Winners advance to Week 3

WEEK 3 — AUDIENCE EXPANSION TESTING
Goal: find new audiences responsive to
winning hook + format
- Week 2 winners run against 4 new audience
  hypotheses
- Budget: $[X]/day per audience
- Decision criteria: ROAS + CPA after hour 96
- Winners advance to Week 4

WEEK 4 — SCALING TEST
Goal: validate that winners hold at 3x
current spend
- Take Week 3 winners, triple their budget
- Monitor: frequency, CTR decay, CPA
  stability
- If ROAS holds at 80%+ of test-phase ROAS,
  they're true scalers
- Decision criteria: fatigue signals + ROAS
  maintenance

Output the full roadmap with:
→ Specific budgets per week
→ Specific metrics + thresholds per decision
  point
→ Fallback plans if winners fatigue mid-week
→ Sunday review checkpoints

No hedging. Executable plan only.
```
### What You Get Back
A structured 4-week testing plan with weekly budgets, decision criteria, and fallback plans. Execute this weekly cadence and you replace guesswork with systematic testing.
---
## ⚙️ Prompt 5 — The Fatigue Detector
The fifth prompt flags creative + audience fatigue before it burns another week of spend.
### The Prompt
```javascript
You are a DTC ads fatigue detector. Analyze
current-week data vs previous-week data.

Current week data:
[PASTE current-week performance table]

Previous week data:
[PASTE prior-week performance table]

For each ad + audience, check these fatigue
signals:

CREATIVE FATIGUE:
- Frequency >4.5 AND rising
- CTR declined >15% week-over-week
- Hook rate declined >20% week-over-week
- CPA rose >20% week-over-week

AUDIENCE FATIGUE:
- Audience frequency >4.5 AND rising
- Same-audience CPA rose >20% week-over-
  week across multiple ads
- Purchase conversion rate declined >15% at
  same landing page

BURNOUT (kill immediately):
- Both creative AND audience fatigue signals
  present
- ROAS below 1.5x for 5+ consecutive days
- Frequency >6 with declining CTR

Output format:
| Ad/Audience | Fatigue signals detected |
Severity | Recommended action | Timing |

Categorize actions:
- REFRESH (test 3 new creatives to same
  audience)
- ROTATE (move winning creative to
  underused audience)
- KILL (stop the ad or audience entirely)
- SCALE-CAP (reduce budget by 30% to slow
  fatigue, maintain presence)

Show top 10 fatigue signals ranked by dollar
impact. No hedging.
```
### What You Get Back
A ranked list of ads and audiences approaching or already in fatigue with specific recommended actions. Run this weekly. Catches fatigue before it burns 3 more days of spend.
---
## ⚙️ The 4-Week Plan (From Leaking Budget to Predictable ROAS)
Run these 5 prompts in this exact sequence over 4 weeks.
### Week 1 — Audit + Kill
**Monday**:<br>→ Export Reports 1-4 from Meta Ads Manager<br>→ Run Prompt 1 (Budget Leak Auditor)<br>→ Execute top 5 kills from output<br>→ Run Prompt 3 (Priority List Generator)
**Tuesday**:<br>→ Execute all "scales" from Prompt 3 output<br>→ Run Prompt 2 (Hook Factory) for your top 3 hero products<br>→ Brief creative team on new hook variants
**Wednesday-Thursday**:<br>→ Launch 6 hook-variation tests per hero product<br>→ Kill any silent leaks flagged by Prompt 1
**Friday**:<br>→ Run Prompt 5 (Fatigue Detector) on all currently active ads<br>→ Prep Week 2 plan
**Week 1 result**: 15-30% of wasted spend cut. Fresh creative in test. Priority list clear.
### Week 2 — Format Testing + Scale Winners
**Monday**:<br>→ Analyze Week 1 hook test results at hour 48<br>→ Run Prompt 4 (Testing Roadmap) for Week 2 format tests<br>→ Kill hook variants that failed hook rate threshold
**Tuesday-Wednesday**:<br>→ Launch format tests (3 formats × winning hooks)<br>→ Scale Week 1 confirmed winners
**Thursday-Friday**:<br>→ Monitor format tests at hour 72<br>→ Refresh Prompt 5 fatigue analysis
**Week 2 result**: Winning hooks identified. Best format for those hooks identified. Winning combinations scaled.
### Week 3 — Audience Expansion
**Monday**:<br>→ Take Week 2 winners<br>→ Run Prompt 4 for Week 3 audience expansion<br>→ Design 4 new audience hypotheses
**Tuesday-Wednesday**:<br>→ Launch winners against 4 new audiences<br>→ Monitor Week 1 + Week 2 winners for fatigue
**Thursday-Friday**:<br>→ Analyze audience results at hour 96<br>→ Kill audience misfits
**Week 3 result**: 2-3 new audiences discovered. Best hook + format + audience combinations locked.
### Week 4 — Scaling Test
**Monday**:<br>→ Triple budget on Week 3's top 3 winning combinations<br>→ Set fatigue alarms (frequency >5, CTR decay >20%)
**Tuesday-Thursday**:<br>→ Monitor daily<br>→ Run Prompt 5 daily for early fatigue signals<br>→ Refresh creative if fatigue detected
**Friday**:<br>→ Analyze whether ROAS held at 80%+ of test-phase ROAS<br>→ Confirmed scalers move to permanent evergreen<br>→ Refresh audit cycle for Month 2
**Week 4 result**: 2-3 evergreen scalers confirmed. Testing loop tightened from 2-week cycles to 3-4 day cycles.
---
## ⚙️ The Scaling Framework Used by 7-Figure DTC Stores
Beyond the 4-week audit → scale loop, 7-figure DTC stores run this ongoing scaling framework.
### The 3 Ad Account Tiers
**Tier 1 — Testing (15-25% of spend)**<br>→ New creatives + new audiences + new formats<br>→ Kill fast (hour 48 for hook rate, hour 72 for CPA)<br>→ Winners graduate to Tier 2
**Tier 2 — Validation (25-35% of spend)**<br>→ Winners from Tier 1<br>→ Run at 2-3x their test spend<br>→ Watch for ROAS holding at 80%+ of test-phase<br>→ Confirmed winners graduate to Tier 3
**Tier 3 — Evergreen Scale (40-60% of spend)**<br>→ Validated scalers<br>→ Run at maximum viable spend<br>→ Refresh creative every 3-4 weeks to prevent fatigue<br>→ Rotate landing page A/B tests
### The Weekly Cadence
<table header-row="true">
<tr>
<td>Day</td>
<td>Task</td>
<td>Prompt Used</td>
</tr>
<tr>
<td>Monday</td>
<td>Weekly audit + priority list</td>
<td>Prompts 1 + 3</td>
</tr>
<tr>
<td>Tuesday</td>
<td>Launch new tests + scale winners</td>
<td>Prompt 4 output</td>
</tr>
<tr>
<td>Wednesday</td>
<td>Mid-week check + hook refresh brief</td>
<td>Prompt 2</td>
</tr>
<tr>
<td>Thursday</td>
<td>Format/audience decision points</td>
<td>Prompt 4</td>
</tr>
<tr>
<td>Friday</td>
<td>Weekly fatigue check + Week 2 plan</td>
<td>Prompt 5</td>
</tr>
<tr>
<td>Weekend</td>
<td>Monitor only, no launches</td>
<td>—</td>
</tr>
</table>
### The Monthly Cadence
Week 1: Audit + creative refresh<br>Week 2: Test velocity peak (highest new-creative launches)<br>Week 3: Winner validation + audience expansion<br>Week 4: Scale confirmed winners + prep next month's briefs
Following this cadence, 7-figure DTC stores typically maintain: ROAS variance under 15% month-over-month. Testing cycle under 4 days. Creative fatigue caught within 48 hours of onset. Wasted spend under 8% of total account budget.
---
## ⚙️ Side-By-Side: Manual Meta Ads Audit vs Claude + Meta Ads
<table header-row="true">
<tr>
<td>Element</td>
<td>Manual Audit</td>
<td>Claude + Meta Ads</td>
</tr>
<tr>
<td>Time per audit</td>
<td>8-12 hours per account</td>
<td>90 minutes for first audit, 20 minutes weekly</td>
</tr>
<tr>
<td>Leaks caught</td>
<td>Obvious ones only (usually <60%)</td>
<td>Silent leaks + placement leaks + audience overlaps (85%+)</td>
</tr>
<tr>
<td>Hook line output per session</td>
<td>3-5 (writer fatigue)</td>
<td>30 (Claude has no fatigue)</td>
</tr>
<tr>
<td>Testing roadmap clarity</td>
<td>Gut-feel driven</td>
<td>Data-driven with specific triggers</td>
</tr>
<tr>
<td>Fatigue detection lag</td>
<td>5-7 days typical</td>
<td>24-48 hours</td>
</tr>
<tr>
<td>Iteration cost per revision</td>
<td>Hours</td>
<td>Minutes</td>
</tr>
<tr>
<td>Best for</td>
<td>Small accounts under $10K/mo spend</td>
<td>Any account, especially $10K+/mo</td>
</tr>
<tr>
<td>Ceiling on account size</td>
<td>Operator bandwidth</td>
<td>Data-input bandwidth</td>
</tr>
</table>
The mechanism: strategic reasoning + prompt engineering replaces manual analysis. Trade-off: Claude requires clean data input. If your Meta Ads Manager data is messy (inconsistent naming, missing conversion tracking), fix that first.
---
## ⚙️ What NOT to Do
→ Don't skip Prompt 1. The Budget Leak Auditor catches 15-30% of wasted spend before you look at any creative test. Highest ROI prompt in the sequence.
→ Don't run Prompt 2 without Prompt 1's output. Fresh hook lines matter less if you're bleeding budget into structural leaks.
→ Don't test more than 6 hook variants per hero product per week. Cognitive overload = poor decision-making.
→ Don't scale winners without running Prompt 5 the same week. Scaling a fatiguing ad accelerates the burnout.
→ Don't ignore the audience overlap report. It's the most-ignored data source with the highest fixable-waste impact.
→ Don't run this without target CPA + target ROAS defined. Claude needs your success criteria to make decisions. Without them, you get generic output.
→ Don't overload Claude with 6 months of data. 30 days is optimal — captures current state without confusing the reasoning.
→ Don't skip the placement report if you're using Advantage+. Advantage+ placements often hide 20-30% waste in specific placements the optimizer keeps returning to.
→ Don't ignore Prompt 5's SCALE-CAP recommendations. Reducing spend by 30% on a fatiguing ad is often better than killing outright — preserves audience presence while creative refreshes.
→ Don't blindly execute every prompt's output. Claude is a reasoning partner, not a boss. Curate every recommendation against your business knowledge.
→ Don't scale evergreen winners more than 20% per week. Faster scaling triggers Meta's learning-phase resets + accelerates fatigue.
→ Don't run creative tests without a landing page match. If your ad promises a hook and the landing page ignores it, ROAS collapses regardless of creative quality.
---
## ⚙️ Troubleshooting
<table header-row="true">
<tr>
<td>Problem</td>
<td>Fix</td>
</tr>
<tr>
<td>Prompt 1 output feels generic</td>
<td>Data columns missing. Include hook rate + hold rate for video ads.</td>
</tr>
<tr>
<td>Prompt 2 hooks feel template-y</td>
<td>Buyer objections + desires section too vague. Rewrite with specific ICP language.</td>
</tr>
<tr>
<td>Prompt 3 priority list feels overwhelming</td>
<td>Run for one campaign at a time instead of full account.</td>
</tr>
<tr>
<td>Prompt 4 testing roadmap doesn't fit budget</td>
<td>Adjust testing budget percentage. Default 15% may be too high for accounts <$5K/mo.</td>
</tr>
<tr>
<td>Prompt 5 flags too many fatigue signals</td>
<td>Threshold too tight. Adjust frequency threshold to 5.0 or CTR-decline threshold to 20%.</td>
</tr>
<tr>
<td>Claude output feels off-brand</td>
<td>Voice rules section skipped or vague. Add explicit voice examples.</td>
</tr>
<tr>
<td>Weekly cadence feels unsustainable</td>
<td>Start with Prompt 1 + Prompt 5 only for first month. Add other prompts once operator is comfortable.</td>
</tr>
<tr>
<td>ROAS doesn't improve after 2 weeks</td>
<td>Audit is finding leaks but creative isn't refreshing. Prioritize Prompt 2 hook refresh.</td>
</tr>
<tr>
<td>Testing budget disappearing without winners</td>
<td>Too many variants at once. Test 3-4 at a time, not 8+.</td>
</tr>
<tr>
<td>Scaling triggers Meta re-learning phase</td>
<td>Scaling >30% per week. Cap increases at 20% per week per ad set.</td>
</tr>
<tr>
<td>Prompt 5 fatigue signals contradict Meta Ads Manager</td>
<td>Meta Ads Manager fatigue metrics are lagging indicators. Claude catches signals faster from raw data.</td>
</tr>
</table>
---
## ⚙️ The Weekly Operating Rhythm
Post-audit, the ongoing weekly rhythm looks like this.
<table header-row="true">
<tr>
<td>Day</td>
<td>Time</td>
<td>Task</td>
<td>Output</td>
</tr>
<tr>
<td>Monday</td>
<td>9:00-9:30</td>
<td>Export Meta Ads reports for last 7 days</td>
<td>Fresh data pull</td>
</tr>
<tr>
<td>Monday</td>
<td>9:30-10:00</td>
<td>Run Prompt 1 (Budget Leak Auditor)</td>
<td>Kill/scale list</td>
</tr>
<tr>
<td>Monday</td>
<td>10:00-10:30</td>
<td>Execute kills + scales in Meta Ads Manager</td>
<td>Live changes</td>
</tr>
<tr>
<td>Monday</td>
<td>10:30-11:00</td>
<td>Run Prompt 3 (Priority List)</td>
<td>Week plan locked</td>
</tr>
<tr>
<td>Tuesday-Wednesday</td>
<td>Flex</td>
<td>Launch new tests per priority list</td>
<td>New tests running</td>
</tr>
<tr>
<td>Wednesday</td>
<td>9:00-9:30</td>
<td>Run Prompt 2 (Hook Factory) for next batch of tests</td>
<td>Fresh hooks ready</td>
</tr>
<tr>
<td>Thursday</td>
<td>9:00-9:30</td>
<td>Mid-week check on hook tests + fatigue</td>
<td>Adjustments made</td>
</tr>
<tr>
<td>Friday</td>
<td>9:00-9:30</td>
<td>Run Prompt 5 (Fatigue Detector) on all active ads</td>
<td>Refresh triggers set</td>
</tr>
<tr>
<td>Friday</td>
<td>10:00-10:30</td>
<td>Weekly report + Week 2 prep</td>
<td>Strategy locked</td>
</tr>
</table>
Weekly output: full account managed, 6-10 new creative tests launched, all fatigue signals monitored, priority list executed.
---
## 🎯 Closer
**Export Reports 1-4 from Meta Ads Manager for your last 30 days. Save the CSVs. Open Claude Fable 5 (or Sonnet 4.6 if Fable 5 not available). Paste the Prompt 1 template with your data + brand context. Get back a 15-item priority list of budget leaks + hidden winners in 3 minutes. Execute the top 5 immediately. Run Prompt 2 for fresh hook lines. Run Prompt 3 for your week's action plan. Run Prompt 4 for your 4-week testing roadmap. Run Prompt 5 to catch fatigue before it burns another week of spend. Repeat weekly. By end of week 1 you'll have cut 15-30% of wasted spend. By end of month 1 you'll have 2-3 confirmed evergreen scalers in your account. By end of quarter 1 you'll have replaced gut-feel decisions with a systematic Claude-driven decision framework that compounds every week.**
The manual-audit-blind-spot bottleneck was the constraint.
Claude reasoning across your full 30-day account data + 5 prompts running weekly is what fixes it.
---
**The 5 exact Claude prompts + export protocol + 4-week plan + weekly cadence + scaling framework is the full playbook. Bookmark this guide. Run your first audit today.**
---
