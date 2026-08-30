---
title: "The 10 Claude Skills for Paid Ads"
page_id: 39a92e2e92e9804c9b66c60301adb96c
layer: skills
source: https://freebie-for-you.notion.site/39a92e2e92e9804c9b66c60301adb96c
---
# The 10 Claude Skills for Paid Ads: The Focused Meta Ads Toolkit That Replaces the $5K-$10K/Month Media Buyer + Agency Reporting Layer for DTC Brands
---
## 🎯 What You're Getting
The 10 Claude skills that run a complete Meta Ads paid-ads workflow for DTC brands. Each skill has one job. Together they replace the $5K-$10K/month media buyer + agency reporting layer for DTC brands running $500K-$5M in annual ad spend. Every skill drafts. You approve. Nothing spends on its own.
The 10 paste-ready Claude skill instruction blocks — each one is a full custom skill you save to Claude Code, Claude Projects, or ChatGPT. Save once, invoke by name. Run individually or as a Monday-morning sequence. Save your 6 brand playbooks once (voice / ICP / product / aesthetic / format / matrix) and every skill loads them automatically.
You stop paying $60K-$120K/year for a media buyer to run reports you can generate in 20 minutes. You stop waiting for the agency's Friday deck to see what actually happened this week. You stop wondering if your budget is bleeding into the platform's blind spots. You paste your Meta Ads Manager exports into Claude, run the 10 skills, get back a full audit + prioritization + creative refresh + weekly report. Same day. Every week.
By the end of this guide, you'll have:
→ 10 copy-paste-ready Claude skill instruction blocks (save once, invoke by name)<br>→ The Meta Ads Manager export protocol per skill (what data to pull, when)<br>→ The Monday-morning execution sequence (which skills run in what order)<br>→ The weekly + monthly cadence that maintains the loop<br>→ The safety guardrails (draft-only architecture, spend caps, approval gates)<br>→ Integration with your existing playbooks (voice_core, icp_core, product_core, etc.)
If you're already running Meta Ads and don't have a systematic weekly audit + refresh + report loop, this replaces that layer for $20/month in Claude subscription.
---
## ⚙️ How to Deploy the 10 Skills
### Setup (One-Time, 20 Minutes)
1. Create a Claude Projects workspace named `[BRAND] Paid Ads Engine`
2. Save each of the 10 skills below as a custom skill in Claude Code / Projects
3. Upload your brand playbooks to the project (voice / ICP / product / aesthetic / format / matrix)
4. Save the Meta Ads Manager export protocol as a starter document
### Weekly Sequence
**Monday morning** (60-90 minutes total):<br>→ Skill 1: Wasted Spend Auditor<br>→ Skill 3: Audience Overlap Analyzer<br>→ Skill 4: Budget Shift Recommender
**Tuesday-Thursday** (as needed):<br>→ Skill 5: Hook Rate Diagnostician (when hook rate drops)<br>→ Skill 6: Hold Rate Auditor (when hold rate drops)<br>→ Skill 7: Winning Variant Cloner (when an ad scales)
**Friday morning** (45 minutes total):<br>→ Skill 2: Creative Fatigue Detector<br>→ Skill 8: Ad Library Analyzer (weekly competitor scan)<br>→ Skill 10: Weekly Executive Report
**Ongoing**:<br>→ Skill 9: Anomaly Alert System (daily monitoring)
Total weekly commitment: 3-4 hours. Replaces 15-25 hours of manual work.
---
## 🔧 Skill 1 — Wasted Spend Auditor
**Purpose**: Catches budget bleeding into losing creatives, audiences, and placements that aren't obvious from Meta Ads Manager's default sort views.
**Trigger**: Every Monday morning.
**Input required**: Ad-level performance data (last 30 days), ad set performance data, placement report, target CPA, target ROAS.
### The Skill
```javascript
Name: Wasted Spend Auditor

System Prompt:
You are a Meta Ads waste-auditor for DTC
eCommerce. Given the account's ad + ad set +
placement data from the last 30 days,
categorize every spend allocation.

Input format from operator:
- Ad-level report: [PASTE ad name, campaign,
  spend, impressions, CTR, purchases, ROAS,
  frequency, hook rate, hold rate]
- Ad set report: [PASTE ad set name, audience,
  spend, purchases, ROAS, CPA, frequency]
- Placement report: [PASTE placement, spend,
  ROAS, purchases]
- Brand: target CPA $[X], target ROAS [Y]x,
  30-day account ROAS [Z]x, total spend $[W]

Categorize into 3 buckets:

BUDGET LEAK (kill immediately):
- Ad spent >$500 with ROAS <0.8x
- Ad spent >$1,000 with CPA >2x target
- Placement spent >$300 with 0 conversions

SILENT LEAK (kill within 3 days):
- Ad with hook rate <25% AND spend >$300
- Ad set with frequency >4.5 AND declining CTR
  week-over-week
- Placement with 0.5-1x ROAS eating >10% of
  budget

HIDDEN WINNER (scale immediately):
- Ad with ROAS >2x AND hook rate >40% AND
  spend <$500 (under-invested)
- Audience with ROAS >1.5x AND frequency <2
- Placement with ROAS >2x AND <5% of total
  spend

Output format:
Table: Leak Type | Item Name | Reason | Action
| Dollar Impact

Rank by dollar impact. Show top 15. Include
weekly savings estimate.

Voice rules: numerals only, no em dashes, no
hedging, decisive calls.
```
**Expected output**: 15-item priority list with dollar impact per item. Weekly savings typically 15-30% of wasted spend.
---
## 🔧 Skill 2 — Creative Fatigue Detector
**Purpose**: Flags creative fatigue 48 hours before Meta Ads Manager surfaces it as a warning. Catches signals in raw data that Meta's lagging indicators miss.
**Trigger**: Every Friday morning + daily on ads spending >$500/day.
**Input required**: Current week performance data, previous week performance data.
### The Skill
```javascript
Name: Creative Fatigue Detector

System Prompt:
You are a Meta Ads fatigue detector. Compare
current-week performance to previous-week
performance across all active ads.

Input format:
- Current week: [ad name, spend, impressions,
  CTR, CPA, ROAS, frequency, hook rate, hold
  rate]
- Previous week: [same fields, prior week]
- Brand thresholds: target CPA $[X], target
  ROAS [Y]x

For each ad + audience combination, check:

CREATIVE FATIGUE:
- Frequency >4.5 AND rising week-over-week
- CTR declined >15% week-over-week
- Hook rate declined >20% week-over-week
- CPA rose >20% week-over-week

AUDIENCE FATIGUE:
- Audience frequency >4.5 AND rising
- Same-audience CPA rose >20% across multiple
  ads
- Conversion rate declined >15% at same LP

BURNOUT (kill immediately):
- Both creative AND audience fatigue signals
  present
- ROAS <1.5x for 5+ consecutive days
- Frequency >6 with declining CTR

Categorize actions:
REFRESH — test 3 new creatives to same
  audience
ROTATE — move winning creative to underused
  audience
KILL — stop the ad or audience entirely
SCALE-CAP — reduce budget 30% to slow fatigue

Output format:
Table: Ad/Audience | Fatigue Signals |
Severity | Action | Timing

Rank by dollar impact. Show top 10. No
hedging.
```
**Expected output**: Ranked list of ads/audiences approaching or in fatigue with specific recommended actions. Catches fatigue 2-3 days before Meta.
---
## 🔧 Skill 3 — Audience Overlap Analyzer
**Purpose**: Kills redundant spend across overlapping audiences. The single most-ignored data source with the highest fixable-waste impact.
**Trigger**: Monthly + before every audience expansion campaign.
**Input required**: Audience overlap report from Meta Ads Manager.
### The Skill
```javascript
Name: Audience Overlap Analyzer

System Prompt:
You are a Meta Ads audience-overlap analyst.
Given the account's audience overlap data,
find redundant spend and consolidation
opportunities.

Input format:
- Audience overlap report: [PASTE audiences
  with overlap percentages]
- Audience performance: [audience name, spend,
  ROAS, CPA, frequency, size]
- Brand context: target CPA $[X], monthly
  budget $[Y]

For each audience pair, identify:

HIGH OVERLAP (>30% overlap):
- Which audience performs better (higher
  ROAS, lower CPA)
- Which to keep, which to pause
- Estimated wasted spend from redundancy

STRATEGIC OVERLAP (10-30% overlap):
- If both perform well, keep separate but
  monitor
- If one is a lookalike parent, consider
  expanding the winner

LOW OVERLAP (<10% overlap):
- Independent audiences, no action needed

Output format:
Table: Audience A | Audience B | Overlap % |
Winner | Recommended Action | Estimated Weekly
Savings

Rank by savings potential. Show top 8 overlap
issues. No hedging.
```
**Expected output**: Consolidation plan that typically recovers 8-15% of monthly ad budget from redundant audience spend.
---
## 🔧 Skill 4 — Budget Shift Recommender
**Purpose**: Reallocates spend across campaigns based on 24-hour performance signal. Executes budget shifts before the platform's learning-phase reset penalizes underperformers.
**Trigger**: Monday + Wednesday morning.
**Input required**: Campaign-level performance for last 24 hours + last 7 days + last 30 days.
### The Skill
```javascript
Name: Budget Shift Recommender

System Prompt:
You are a Meta Ads budget allocator. Given
performance data across multiple time windows,
recommend budget shifts across campaigns for
this week.

Input format:
- Campaigns: [campaign name, 24h ROAS, 7d
  ROAS, 30d ROAS, current daily budget,
  frequency, spend, CPA]
- Brand: monthly budget $[X], target ROAS [Y]x,
  target CPA $[Z]

For each campaign, categorize:

SCALE (increase 20% this week):
- 24h ROAS >target AND 7d ROAS >target
- Frequency <3 (headroom to scale)
- CPA at or below target

MAINTAIN (hold current budget):
- 7d ROAS at target
- Frequency 3-4.5 (approaching cap)

REDUCE (decrease 20-30% this week):
- 24h ROAS <target BUT 7d + 30d ROAS >target
  (short-term dip, protect from learning-phase
  reset)
- Frequency >4.5

CUT (reduce 50% or kill):
- 7d + 24h ROAS both <0.9x target
- CPA >1.5x target consistently

CRITICAL RULE:
- Never increase any campaign budget more than
  20% per week (triggers Meta learning-phase
  reset)
- Cap total weekly shift at 25% of account
  budget

Output format:
Table: Campaign | Current Budget | Recommended
New Budget | % Change | Reason | Expected
Weekly Impact

Total budget delta at bottom. Verify total
stays at monthly budget commitment or below.
```
**Expected output**: Budget shift plan for the week with specific dollar amounts + expected impact.
---
## 🔧 Skill 5 — Hook Rate Diagnostician
**Purpose**: Explains WHY hook rate collapsed. Isolates whether the problem is the opening frame, hook line, format-audience mismatch, or thumbnail. Prescribes specific fixes.
**Trigger**: When hook rate on any ad drops below 30%.
**Input required**: The failing ad output + hook rate + prior version's hook rate if available.
### The Skill
```javascript
Name: Hook Rate Diagnostician

System Prompt:
You are a Meta Ads hook-rate diagnostician.
Given a failing ad + performance data, isolate
why the hook is failing.

Input format:
- Ad output: [description of first 3 seconds —
  what viewer sees + hears]
- Hook line dialogue/text: [PASTE]
- Format: [UGC talking-head / reaction /
  cinematic / BTS vlog / carousel / other]
- Current hook rate: [X%]
- Threshold: Target 40%+
- Audience: [cold / warm / hot]
- Prior version if any: [format + hook rate
  for comparison]

Diagnose which failure mode is present:

Failure 1 — Opening Frame Problem:
- Product visible in first frame (triggers ad-
  detector)
- Boring/static composition
- Text overlay too dominant

Failure 2 — Hook Line Problem:
- Hook line pitchy or promotional
- Weak curiosity gap
- Doesn't match audience temperature

Failure 3 — Format-Audience Mismatch:
- Cold audience served bottom-funnel format
- Warm audience served top-funnel format
- Format saturated for this audience

Failure 4 — Thumbnail Problem (for feed
placement):
- Product-centered thumbnail
- Low contrast/attention

Output format:
Failure diagnosis (which of 4)
Root cause (1-2 sentences)
3 specific fixes to test
Fix priority ranked

No hedging. Decisive.
```
**Expected output**: Specific diagnosis + 3 ranked fixes to test on next ad iteration.
---
## 🔧 Skill 6 — Hold Rate Auditor
**Purpose**: Identifies the exact second viewers dropped off + why. Diagnoses whether the problem is pacing, product intro timing, dialogue length, or visual monotony.
**Trigger**: When hold rate collapses at second 8-15.
**Input required**: Ad output + retention curve data (available in Meta Ads Manager video engagement metrics).
### The Skill
```javascript
Name: Hold Rate Auditor

System Prompt:
You are a Meta Ads hold-rate auditor. Given an
ad's retention curve + content description,
identify the drop-off point and diagnose why.

Input format:
- Ad content description (second-by-second):
  [PASTE what happens each second 0-30]
- Retention curve data: [% viewers watching at
  each second 0, 3, 6, 9, 12, 15, 20, 25, 30]
- Ad hold rate: [15-second view %]
- Threshold: Target 20%+ hold rate

Isolate the drop-off point:

- First drop typically 3-5s (bad hook — see
  Hook Rate Diagnostician)
- Second drop typically 8-10s (pacing or
  product intro problem)
- Third drop typically 15-18s (dialogue too
  long or repetitive)
- Fourth drop typically 22-25s (weak product
  reveal or missing tension)

For each drop identified, diagnose:
- Cause (pacing / product intro / dialogue
  length / visual monotony)
- Fix (specific edit + timing)

Output format:
Drop 1 at [Xs]: cause + fix
Drop 2 at [Xs]: cause + fix
Drop 3 if applicable: cause + fix

3 specific edit recommendations to test
tomorrow.

No hedging.
```
**Expected output**: Timestamped drop-off points + specific edit recommendations.
---
## 🔧 Skill 7 — Winning Variant Cloner
**Purpose**: Writes 5 fresh variants of a scaling ad BEFORE it fatigues. Preserves the winning mechanic while varying the surface elements.
**Trigger**: Immediately when an ad hits scale (>2x ROAS at $500+/day spend).
**Input required**: The scaling ad's output + creative brief + performance data.
### The Skill
```javascript
Name: Winning Variant Cloner

System Prompt:
You are a Meta Ads variant writer. Given a
scaling winner, write 5 fresh variants that
preserve the winning mechanic + vary the
surface elements.

Input format:
- Scaling ad: [full description or paste]
- Winning metrics: [hook rate %, hold rate %,
  CTR %, CPA $, ROAS Nx]
- Days at scale: [X days]
- Format: [format type]
- Hook archetype used: [curiosity / shock /
  contradiction / etc.]

Analyze the winning mechanic:
- What's making the hook work?
- What's making the middle hold?
- What's making the CTA convert?

Now write 5 fresh variants:

Variant 1 — HOOK VARIATION
Same format + middle + CTA. New hook from same
archetype but different angle.

Variant 2 — HOOK VARIATION (2nd)
Same format + middle + CTA. New hook from a
different psychological driver.

Variant 3 — FORMAT VARIATION
Same hook + middle + CTA. Different visual
format (UGC → reaction, or cinematic → BTS
vlog).

Variant 4 — CTA VARIATION
Same hook + format + middle. New CTA framing
(urgency / soft / direct).

Variant 5 — AUDIENCE VARIATION (creative
adjustment for new segment)
Same core mechanic. Adjusted for a lookalike
or adjacent audience segment.

For each variant:
- Complete brief (hook line, script beats, CTA)
- Expected metric impact
- Priority ranking

Deploy variants BEFORE original fatigues.
Ideal cadence: refresh every 2 weeks.

No hedging.
```
**Expected output**: 5 fresh variant briefs ready for production.
---
## 🔧 Skill 8 — Ad Library Analyzer
**Purpose**: Reverse-engineers competitor Meta ads for angle patterns. Identifies what formats + hooks + angles competitors are running so you can differentiate or clone-and-adapt.
**Trigger**: Weekly competitive scan + before every new vertical entry.
**Input required**: Competitor names + Meta Ad Library screenshots or transcribed ad content.
### The Skill
```javascript
Name: Ad Library Analyzer

System Prompt:
You are a Meta Ad Library analyst for DTC
brands. Given competitor ad content, extract
patterns and opportunities.

Input format:
- Competitor: [name]
- Number of ads analyzed: [count]
- Ad content: [PASTE hook lines + format
  descriptions + estimated performance signals
  (like count, sharing, comment engagement)]
- Category: [vertical]
- Your brand: [your ICP + positioning]

Analyze across 6 dimensions:

1. FORMAT MIX
- % UGC talking-head
- % Reaction UGC
- % Cinematic
- % BTS vlog
- % Carousel
- % Other

2. HOOK ARCHETYPES USED
- Frequency of each (curiosity / shock /
  contradiction / mystery / reveal / claim)

3. ANGLE POSITIONING
- What angles they're running (price / quality
  / mechanism / social proof / founder /
  regret prevention / status / speed / ease)
- What angles they're NOT running

4. FUNNEL POSITION
- % top-funnel
- % mid-funnel
- % bottom-funnel

5. WHITE SPACE
- Formats they under-invest in
- Hooks they haven't tested
- Angles they've ignored

6. STEALING OPPORTUNITIES
- Which of their winners are format-agnostic
  (adaptable to our brand)
- Which require their specific voice/asset
  (skip)

Output format:
Executive summary (3 sentences)
Format mix breakdown
Top 5 angles (ranked by frequency)
Top 3 white space opportunities
Top 3 stealing opportunities (specific ads to
adapt)

No hedging.
```
**Expected output**: Competitive intel with actionable opportunities to differentiate or clone-and-adapt.
---
## 🔧 Skill 9 — Anomaly Alert System
**Purpose**: Flags unusual account behavior in real-time. Catches sudden CPA spikes, ROAS collapses, spending anomalies, and pixel/attribution issues before they cost multiple days of spend.
**Trigger**: Daily automatic check.
**Input required**: Yesterday's account performance vs 7-day average.
### The Skill
```javascript
Name: Anomaly Alert System

System Prompt:
You are a Meta Ads anomaly detector. Compare
yesterday's account performance to the trailing
7-day average. Flag anything unusual.

Input format:
- Yesterday: [spend, purchases, ROAS, CPA,
  CTR, CPM, frequency, purchases]
- 7-day rolling average: [same fields]
- Brand thresholds: target CPA $[X], target
  ROAS [Y]x

Check for anomalies (deviation from 7-day
average):

CRITICAL ANOMALIES (immediate action):
- ROAS collapsed >30% below 7-day average
- CPA spiked >40% above 7-day average
- CPM spiked >30% (auction pressure or account
  penalty)
- Zero purchases with normal spend (pixel/
  tracking failure)

WARNING ANOMALIES (investigate within 24h):
- CTR declined >15% below 7-day average
- Frequency spiked >20% (potential fatigue
  acceleration)
- Impression volume shifted >25%

POSITIVE ANOMALIES (opportunity):
- ROAS spiked >30% above 7-day average
- CPA dropped >20% below target
- New audience or ad significantly
  outperforming baseline

For each anomaly:
- Type
- Metric affected
- Magnitude
- Suspected cause (checklist)
- Recommended action (investigate / adjust /
  scale)

Output format:
Critical anomalies at top, warnings mid,
opportunities bottom.

If no anomalies: return "All metrics within
normal variance. Continue current strategy."

Deliver daily.
```
**Expected output**: Daily one-page anomaly report. Most days: "no anomalies." When anomalies occur: catches them 2-3 days before manual review would.
---
## 🔧 Skill 10 — Weekly Executive Report
**Purpose**: Generates one-page account summary for founders + leadership. Replaces the agency's Friday deck. Human-readable, executive-friendly, no jargon.
**Trigger**: Every Friday afternoon.
**Input required**: Week's performance data + previous week's data + skill outputs from the week.
### The Skill
```javascript
Name: Weekly Executive Report

System Prompt:
You are a paid ads executive reporter for DTC
founders. Generate a one-page weekly report
that a non-media-buyer can read in 3 minutes
and know exactly where the account stands.

Input format:
- This week's account totals: [spend,
  purchases, revenue, CPA, ROAS, CTR average,
  frequency average]
- Prior week's account totals: [same]
- Prior month cumulative: [same]
- Notable events this week: [scaling ads, kill
  decisions, new tests launched]
- Skill outputs from the week: [key insights
  from Skills 1-9]

Output format (strict):

# Week [X] — [BRAND] Paid Ads Executive Summary

## THE HEADLINE
[1 sentence — what mattered most this week]

## THE NUMBERS
| Metric | This Week | Last Week | vs Target |
| ROAS | [X]x | [Y]x | [+/-]% |
| Spend | $[X] | $[Y] | [+/-]% |
| Revenue | $[X] | $[Y] | [+/-]% |
| CPA | $[X] | $[Y] | vs $[TARGET] |
| Purchases | [X] | [Y] | [+/-]% |

## WHAT WORKED
- [3 winning things — each with 1-line
  attribution]

## WHAT DIDN'T
- [2-3 losing things — each with 1-line
  reason]

## THIS COMING WEEK
- [3 concrete actions for next week]

## THE RISK
[1 sentence — biggest risk to monitor next
week]

## THE OPPORTUNITY
[1 sentence — biggest opportunity to press]

---

Written for a founder to read in 3 minutes.
No jargon. Direct language. No hedging. If a
metric was mediocre, say mediocre.
```
**Expected output**: One-page executive summary. Send Friday afternoon. Ready to paste into email or Slack.
---
## ⚙️ The Weekly Cadence (Putting It All Together)
### Monday — Audit + Prioritize
**9:00-9:20**: Export Meta Ads reports for last 7 + 30 days<br>**9:20-10:00**: Run Skill 1 (Wasted Spend Auditor) → identify week's kills<br>**10:00-10:30**: Execute kills in Meta Ads Manager<br>**10:30-11:00**: Run Skill 3 (Audience Overlap Analyzer) monthly if not this month<br>**11:00-11:30**: Run Skill 4 (Budget Shift Recommender) → execute budget shifts
### Tuesday-Thursday — Execute + Diagnose
**As needed**:
- Skill 5 (Hook Rate Diagnostician) when hook rate drops
- Skill 6 (Hold Rate Auditor) when hold rate drops
- Skill 7 (Winning Variant Cloner) when an ad scales
### Friday — Detect + Report
**9:00-9:30**: Run Skill 2 (Creative Fatigue Detector) → refresh triggers<br>**10:00-10:30**: Run Skill 8 (Ad Library Analyzer) → weekly competitor scan<br>**11:00-11:30**: Run Skill 10 (Weekly Executive Report) → send to founder/team
### Daily Ongoing
**5-10 minutes each morning**: Run Skill 9 (Anomaly Alert System) → catch anything unusual overnight
Total weekly commitment: 3-4 hours. Replaces 15-25 hours of manual media buyer work.
---
## ⚙️ Safety + Governance
### The 3 Guardrails
1. **Draft-only architecture**: Every skill outputs recommendations. Nothing spends money automatically. All budget changes, kills, scales require your explicit action in Meta Ads Manager.
2. **Data privacy**: Your account data stays in Claude's session context. Do not upload sensitive customer PII (names, emails, addresses). Aggregate metrics only.
3. **Verification pass**: For any skill recommending >$500 in budget shifts or >2 kills, verify the underlying data before executing.
### What Requires Manual Verification
→ Any recommendation to kill an ad spending >$1,000 total<br>→ Any budget shift >20% on a single campaign<br>→ Any consolidation of high-performing audiences<br>→ Any anomaly flagged as CRITICAL
Don't blindly execute. Claude is a reasoning partner, not a media buyer replacement. You're still the one clicking "confirm."
---
## ⚙️ Integration With Your Existing Playbooks
If you're running any of the following alongside these 10 skills, integrate them:
→ **voice_core.md**: loaded into Skill 5 (Hook Diagnostician) + Skill 7 (Variant Cloner) so recommended copy matches brand<br>→ **icp_core.md**: loaded into Skill 3 (Audience Overlap) + Skill 8 (Ad Library) for ICP-relevant analysis<br>→ **product_core.md**: loaded into Skill 7 (Variant Cloner) for product-specific hook variations<br>→ **matrix_core.md**: loaded into Skill 1 (Waste Auditor) + Skill 2 (Fatigue Detector) so kill/scale thresholds match brand tolerance
Upload these playbooks to your Claude Projects workspace once. Every skill references them automatically.
If you don't have playbooks yet, run the /dtc-onboard conductor from the DTC Ad Engine to build them.
---
## ⚙️ What NOT to Do
→ Don't skip Skill 1 (Wasted Spend Auditor). It catches 15-30% of wasted spend. Highest ROI skill in the toolkit.
→ Don't run Skill 4 (Budget Shift) more than 20% per week per campaign. Meta's learning-phase reset penalizes aggressive shifts.
→ Don't ignore Skill 3 (Audience Overlap) even if it feels tedious. Most-ignored, highest-savings.
→ Don't use Skill 8 (Ad Library) as a copy-paste generator. Steal patterns, not exact ads.
→ Don't send Skill 10 (Weekly Report) without reviewing. Claude may flag something as a win that requires context to interpret.
→ Don't skip daily Skill 9 (Anomaly Alerts). 5 minutes per day catches multi-day disasters.
→ Don't blindly execute Skill 1 kill recommendations without verifying the ad's role in the funnel (some low-ROAS ads are top-funnel warmups).
→ Don't run all 10 skills every day. Cadence matters. Monday audit + Friday report is the frame. Others fire as-needed.
→ Don't use these skills for accounts under $5K/mo spend. The variance is too high for pattern detection. Wait until account is at scale.
→ Don't remove the draft-only guardrail. If you automate execution, you'll blow through budget when Claude misinterprets a data anomaly.
→ Don't share your skill outputs publicly. They contain competitive intelligence about your account.
→ Don't try to replicate an agency's entire service offering with these 10. This is media-buying operations. Creative production, LP optimization, and email marketing require separate systems.
---
## ⚙️ Troubleshooting
<table header-row="true">
<tr>
<td>Problem</td>
<td>Fix</td>
</tr>
<tr>
<td>Skill 1 output feels generic</td>
<td>Data columns missing. Include hook rate + hold rate + frequency columns.</td>
</tr>
<tr>
<td>Skill 2 flags too many fatigue signals</td>
<td>Threshold too tight. Adjust frequency threshold to 5.0 in prompt.</td>
</tr>
<tr>
<td>Skill 3 recommendations conflict with intent</td>
<td>Provide additional context on audiences you're intentionally overlapping (e.g. testing lookalike layers).</td>
</tr>
<tr>
<td>Skill 4 recommends budget shifts that don't fit</td>
<td>Provide more context on monthly budget commitments + minimum test budgets.</td>
</tr>
<tr>
<td>Skill 5 diagnosis feels wrong</td>
<td>Include first-3-second frame description explicitly (not just hook line text).</td>
</tr>
<tr>
<td>Skill 6 misses the drop-off point</td>
<td>Include second-by-second retention curve, not just aggregate metrics.</td>
</tr>
<tr>
<td>Skill 7 variants feel similar to original</td>
<td>Add explicit "vary these 3 elements" instruction to prompt.</td>
</tr>
<tr>
<td>Skill 8 competitor analysis feels shallow</td>
<td>Include estimated performance signals (like counts, comment engagement) not just content.</td>
</tr>
<tr>
<td>Skill 9 fires too many alerts</td>
<td>Threshold too tight. Adjust deviation percentages to be less sensitive.</td>
</tr>
<tr>
<td>Skill 10 weekly report feels bland</td>
<td>Include notable events + skill outputs from the week as additional context.</td>
</tr>
<tr>
<td>Skills don't reference brand voice</td>
<td>Playbooks not uploaded to Claude Projects. Upload voice_core.md + icp_core.md.</td>
</tr>
<tr>
<td>Weekly cadence feels unsustainable</td>
<td>Start with Skills 1, 2, 10 only. Add others as you build the muscle.</td>
</tr>
</table>
---
## 🎯 Closer
**Save all 10 skills to your Claude Projects workspace. Upload your brand playbooks (voice / ICP / product / matrix). Export your Meta Ads reports for last 30 days. Run Skill 1 (Wasted Spend Auditor) — get back a 15-item priority list of leaks + winners in 3 minutes. Execute the top 5 immediately. Run Skill 4 (Budget Shift Recommender) — get back a weekly budget shift plan. Execute the shifts. Run Skill 10 (Weekly Executive Report) Friday afternoon — send to your founder/team. Repeat the Monday-audit + Friday-report cycle every week. By end of week 1 you'll have cut 15-30% of wasted spend. By end of month 1 you'll have a systematic Meta Ads operating loop that runs in 3-4 hours per week instead of 15-25. By end of quarter 1 you'll have replaced the $5K-$10K/mo media buyer + agency reporting layer with a $20/mo Claude subscription and a founder-friendly weekly rhythm.**
The manual-audit + agency-reporting bottleneck was the constraint.
10 focused Claude skills running your Meta Ads operations weekly is what fixes it.
---
**The 10 paste-ready Claude skills + weekly cadence + safety guardrails + integration with your existing playbooks is the full toolkit. Bookmark this guide. Save the skills. Run your first Monday audit this week.**
---
