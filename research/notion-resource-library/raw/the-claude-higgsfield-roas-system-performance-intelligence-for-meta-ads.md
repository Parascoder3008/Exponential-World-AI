---
title: "The Claude + Higgsfield ROAS System: Performance Intelligence for Meta Ads"
page_id: 37092e2e92e98066a4edd6ca0ae895a7
layer: reporting
source: https://freebie-for-you.notion.site/37092e2e92e98066a4edd6ca0ae895a7
---
## 🎯 What This Gives You
A decision-making system that turns a stagnant ad account into a 6X ROAS engine.
Not "AI that writes ads."
A system that thinks through your account. Diagnoses what's broken. Rewrites the angles that don't convert. Produces the creative variations that should get tested. Tells you which ones to scale and which to kill within 24 hours.
The stack is 3 tools chained: Claude analyzes and decides, Higgsfield produces, Meta executes.
This is the playbook I use across 40+ DTC brands at $30K/day in Meta spend.
---
## ⚙️ The 3-Tool Stack
<table header-row="true">
<tr>
<td>Step</td>
<td>Tool</td>
<td>Job</td>
</tr>
<tr>
<td>1</td>
<td>Claude</td>
<td>Audits the account, rewrites hooks, generates creative directions, runs the kill-or-scale matrix</td>
</tr>
<tr>
<td>2</td>
<td>Higgsfield</td>
<td>Produces the creative variations that hold brand identity across every output</td>
</tr>
<tr>
<td>3</td>
<td>Meta</td>
<td>Launches batches, tests faster, scales winners earlier</td>
</tr>
</table>
Each tool has 1 job. None of them works alone. The pipeline is what creates the leverage.
---
## Step 1 — The Claude Account Audit
Before you launch anything new, audit what's already running. Most operators skip this and end up scaling losers and killing winners.
### The master account audit prompt:
```javascript
You are a senior performance media buyer with 10+ years
managing $30K/day+ Meta ad spend across DTC brands.

I'm going to paste my last 30 days of ad performance.

Audit it for:

1. The 3 ads with the highest Hook Rate (3-second view rate).
   What pattern do they share?

2. The 3 ads with the worst Hook Rate.
   What's the failure pattern?

3. The 3 ads with the best Hold Rate (15-second watch rate)
   but poor CTR. Diagnose why.

4. The ads with high CTR but bad CPA. Where does the
   funnel break?

5. The 3 angles I'm under-testing.
   What new directions should I add?

Be specific. Reference my exact ads by name. No generic
"test more variations" advice.

Here's the data:
[PASTE YOUR AD MANAGER EXPORT — name, spend, impressions,
hook rate, hold rate, CTR, CPA, ROAS]
```
### What you get back:
A diagnosis with named ads. Specific patterns. Specific failure modes. Specific next angles.
This is what most operators skip. The audit is what tells you whether the next launch is informed or guesswork.
### Common audit mistakes:
→ Pasting only winners and asking "make more like these"<br>↳ The losers contain the diagnostic signal. Paste both.
→ Running the audit weekly instead of after every test cycle<br>↳ Run it every 5-7 days. Patterns shift fast on Meta.
→ Asking Claude for "ideas" instead of "patterns"<br>↳ Patterns are diagnostic. Ideas are noise.
---
## Step 2 — The High-ROAS Hook Rewriting System
Most ads fail at the hook. Not at the offer. Not at the targeting.
The first 3 seconds determine whether you ever recoup spend.
### The hook rewrite master prompt:
```javascript
You are rewriting weak ad hooks into high-ROAS angles.

I'm going to paste a hook that's underperforming.

Rewrite it 5 different ways using these proven hook
formulas:

1. SPECIFIC NUMBER + TIME claim
   "I [SPECIFIC ACTION] [SPECIFIC NUMBER] in [TIMEFRAME]"

2. CONTRARIAN POSITIONING
   "Most [TARGET] do [COMMON ACTION]. Here's what
    actually works."

3. PERSONAL RESULT REVEAL
   "Yesterday I [SPECIFIC OUTCOME WITH NUMBER]"

4. PATTERN INTERRUPT QUESTION
   "Do you understand what [SPECIFIC EVENT] just did
    to [PROBLEM]?"

5. IDENTITY-LEVEL CALLOUT
   "If you're [SPECIFIC IDENTITY] and you're still
    [BAD HABIT], read this."

For each rewrite:
- Keep the original benefit intact
- Tighten to under 12 words
- Front-load the specific number or claim
- Strip generic adjectives (amazing, incredible, best)

Original hook:
[PASTE YOUR HOOK]

Product context:
[PRODUCT NAME, ICP, PRICE POINT, KEY BENEFIT]
```
### What you get:
5 hook rewrites that share the original benefit but pull different psychological levers. Test all 5. The data picks the winner.
### The 12-word rule:
If a hook exceeds 12 words on Meta video ads, the read time pushes past the 1.5-second decision window. The hook either lands in 12 words or fails.
Use the rewrite prompt's "tighten to under 12 words" instruction every time.
---
## Step 3 — The Kill-or-Scale Decision Matrix
Most operators kill winners on day 2 because they panic. Or they keep losers running because they "feel" right.
The matrix replaces gut with math.
### The thresholds:
<table header-row="true">
<tr>
<td>Metric</td>
<td>Kill Below</td>
<td>Hold</td>
<td>Scale Above</td>
</tr>
<tr>
<td>Hook Rate (3-sec view)</td>
<td>25%</td>
<td>25-35%</td>
<td>35%</td>
</tr>
<tr>
<td>Hold Rate (15-sec)</td>
<td>8%</td>
<td>8-15%</td>
<td>15%</td>
</tr>
<tr>
<td>CTR</td>
<td>0.8%</td>
<td>0.8-1.5%</td>
<td>1.5%</td>
</tr>
<tr>
<td>CPA vs target</td>
<td>1.5x target</td>
<td>1.0-1.5x</td>
<td>Below target</td>
</tr>
<tr>
<td>ROAS</td>
<td>Below 1.5X</td>
<td>1.5-3X</td>
<td>3X+</td>
</tr>
</table>
### The 24-hour rule:
Don't extend testing windows for "hopeful" creatives.
If a variation hasn't hit kill or hold thresholds in 24 hours at minimum $30 spend, kill it. Generate 5 new variations. Test again.
Every variation costs you $30 to test. The cost of patience compounds. The cost of regenerating is fixed.
### The scale ladder:
→ Day 1: $30/day budget per variation, 20 variations live<br>→ Day 2: Kill bottom 50% by Hook Rate. Hold the rest.<br>→ Day 3: Of the remaining 10, identify top 2. Scale to $200/day each.<br>→ Day 4: If top 2 maintain Scale thresholds, double again to $400/day.<br>→ Day 5+: Continue doubling every 24 hours while metrics hold.
### Claude prompt for matrix application:
```javascript
You are running my kill-or-scale matrix.

Here's my 24-hour data per ad:

[PASTE: ad name, spend, hook rate, hold rate, CTR,
CPA, ROAS]

For each ad, return:
1. Decision: KILL / HOLD / SCALE
2. Reason (cite the specific threshold breach)
3. If SCALE: recommended next budget
4. If KILL: which variation to replace it with based
   on the patterns from the kill ad

No hedging. Decisive calls.
```
---
## Step 4 — Higgsfield Creative Production
Once Claude tells you which angles to test, Higgsfield produces them.
The advantage: brand identity locks across every variation. Same persona. Same voice. Same product treatment. Different hooks, lighting, environments, camera moves.
### The production loop:
1. Claude generates 5 hook angles
2. For each angle, write a 1-line scene description
3. Open Higgsfield Marketing Studio. Paste the URL of your product page.
4. Pick the persona that matches your ICP. Lock it.
5. Generate 1 variation per hook angle.
6. Download the references. Feed each into Seedance 2.0 for the final video.
Total time: 30-45 minutes for 5 launch-ready variations.
### Brand identity lock rules:
→ Lock the persona once per campaign. Don't switch mid-test.<br>↳ Switching personas breaks the recognition loop your audience builds.
→ Lock the voice across all variations.<br>↳ Different voices across the same campaign reads as 5 different brands.
→ Lock the product treatment.<br>↳ Same angle, same lighting, same on-screen positioning.
### What to vary across the 5 variations:
<table header-row="true">
<tr>
<td>Element</td>
<td>Lock</td>
<td>Vary</td>
</tr>
<tr>
<td>Persona</td>
<td>Yes</td>
<td>No</td>
</tr>
<tr>
<td>Voice</td>
<td>Yes</td>
<td>No</td>
</tr>
<tr>
<td>Product treatment</td>
<td>Yes</td>
<td>No</td>
</tr>
<tr>
<td>Hook line</td>
<td>No</td>
<td>Yes (5 versions from Claude)</td>
</tr>
<tr>
<td>Lighting</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>Environment</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>Camera movement</td>
<td>No</td>
<td>Yes</td>
</tr>
</table>
5 hooks × 1 persona = 5 variations that look like a single brand campaign with 5 angles.
---
## Step 5 — The 24-Hour Testing Cycle
This is what separates operators from reactors.
### The cycle:
### Hour 0 — Launch
→ 20 variations live in 1 ad set<br>→ $30/day budget per variation<br>→ CBO off. ABO. Each variation gets equal spend.
### Hour 24 — First read
→ Pull the data into Claude<br>→ Run the kill-or-scale matrix prompt<br>→ Kill bottom 50% by Hook Rate<br>→ Replace each killed ad with a new variation generated from the patterns of the surviving ads
### Hour 48 — Second read
→ Same matrix<br>→ Identify top 2 by ROAS<br>→ Scale top 2 to $200/day each<br>→ The remaining 18 stay at $30/day for further data
### Hour 72 — Third read
→ If top 2 maintain Scale thresholds, double to $400/day<br>→ If they drop to Hold, freeze the budget and watch<br>→ If they drop to Kill, scale the next 2 and replace
This is the loop. Run it every 3 days. The compounding is relentless.
### Why most operators fail at this:
→ They check metrics every 4 hours and panic-kill ads before the data has stabilized.<br>→ They scale on day 1 based on Hook Rate alone, before CPA shakes out.<br>→ They try to test 100 variations at once and dilute spend below significance.
The 24-hour rule, $30 minimum spend, 20 variations max — these constraints are what make the system work.
---
## Step 6 — Competitor Account Analysis
The fastest way to spot angles you're missing is to study what's working in your niche.
### The Meta Ads Library audit prompt:
```javascript
You are auditing competitors in the [YOUR NICHE]
category on the Meta Ads Library.

I'm going to paste 10-15 of my top competitors' ads
that have been running for 30+ days (signal of
performance).

For each batch, identify:

1. The 3 hook patterns appearing across multiple
   competitors. What's the convergent angle?

2. The 1 hook pattern that's contrarian to the
   convergence. What's the unique positioning?

3. The format mix (UGC talking head, demo, before/after,
   problem-solution). Which dominates?

4. The CTA style (soft DM, hard buy, lead magnet).
   What converts in this category?

5. The 3 specific angles I should test that I'm
   currently NOT running.

Competitor ads:
[PASTE TITLE + HOOK + DESCRIPTION FOR EACH]
```
### Where to pull competitor data:
→ Meta Ads Library → search by competitor name → filter by "Active" + "30+ days running"<br>→ TikTok Creative Center → Top Ads filtered by your category<br>→ Foreplay (paid tool) for deeper search filtering
Run this prompt every 2 weeks. The angle landscape shifts fast.
### The angle gap rule:
If 5 competitors are running the same angle and you're not, that's the angle gap.
Either you have data showing it doesn't work for you, or you're missing 30%+ of available demand.
---
## Step 7 — The Claude Project Setup
To run this system at scale, set up a dedicated Claude Project. Once configured, every audit takes 60 seconds.
### Setup steps:
1. Open Claude → Projects → Create New Project
2. Name it "[Brand Name] Performance System"
3. Paste this into Project Instructions:
```javascript
You are a senior performance media buyer with 10+ years
managing $30K/day+ Meta ad spend across DTC brands in
the [YOUR CATEGORY] space.

You operate the Claude + Higgsfield ROAS system. Your
job is to:

1. Audit ad accounts for performance patterns
2. Rewrite weak hooks into high-ROAS angles
3. Run the kill-or-scale decision matrix
4. Identify competitor angle gaps

Voice rules:
- Be decisive. No "it depends" hedging.
- Reference specific ads by name when given data.
- Cite specific thresholds when making kill/scale calls.
- Numbers in numerals always.
- No generic "test more" advice.

Brand context (always reference this):
- Brand name: [YOUR BRAND]
- Product: [YOUR PRODUCT]
- Price point: [YOUR PRICE]
- Target ICP: [YOUR ICP DESCRIPTION]
- Brand voice: [YOUR BRAND VOICE]
- Current target ROAS: [YOUR ROAS TARGET]
- Current target CPA: [YOUR CPA TARGET]
```
1. Upload these files into Project Knowledge:
→ Last 90 days of ad performance export (CSV)<br>→ Your top 10 winning ads (with scripts)<br>→ Your top 5 brand voice examples (existing organic content)<br>→ The hook formula library (the 5 formulas from Step 2 above)<br>→ Your customer research notes (reviews, support tickets, persona docs)
1. Start every prompt with "Run [audit / hook rewrite / matrix / competitor analysis]"
The project remembers everything. The output sharpens with every run.
---
## Worked Example: $50K/mo Brand from 1.8X to 4.68X ROAS
A skincare brand. $50K/mo Meta spend. ROAS stuck at 1.8X for 4 months. Stuck.
### Day 1: Account audit
Ran the audit prompt with 30-day data. Claude identified:
→ Top 3 hooks all started with personal results ("I tried X for 30 days"). Convergent winning pattern.<br>→ Bottom 3 hooks were generic benefit claims ("Glow up your skin"). Failure pattern.<br>→ 3 angles missing: ingredient-led, founder-led, before/after with timeline.
### Day 2: Hook rewrites
Took the 5 worst-performing ads. Ran each through the hook rewrite prompt. Got 25 new hooks across 5 ads.
### Day 3: Higgsfield production
Locked the persona. Generated 25 new variations through Higgsfield + Seedance.
### Day 4: Launch
20 variations live (top 20 by gut from the 25). $30/day each. Total: $600/day.
### Day 5: First matrix read
Killed 11 (Hook Rate below 25%). Replaced with patterns from the 9 survivors.
### Day 6: Second matrix read
Identified top 2. Scaled to $200/day each.
### Day 8: Top 2 holding
Doubled to $400/day each.
### Day 14: Account-level
Account ROAS hit 4.2X. By day 30 stabilized at 4.68X.
The brand didn't change spend much. They changed the system.
---
## Troubleshooting
<table header-row="true">
<tr>
<td>Problem</td>
<td>Cause</td>
<td>Fix</td>
</tr>
<tr>
<td>Claude gives generic "test more" advice</td>
<td>Audit prompt missing specifics</td>
<td>Reframe with "Reference my exact ads by name. No generic advice."</td>
</tr>
<tr>
<td>Hook rewrites all sound similar</td>
<td>Project context missing brand voice files</td>
<td>Upload 5 brand voice examples to Project Knowledge</td>
</tr>
<tr>
<td>Matrix calls feel wrong</td>
<td>Thresholds set for wrong category</td>
<td>Adjust thresholds to your category benchmarks. Skincare differs from SaaS.</td>
</tr>
<tr>
<td>Higgsfield variations drift in identity</td>
<td>Persona not locked</td>
<td>Generate persona reference image once, reference in every variation prompt</td>
</tr>
<tr>
<td>Competitor analysis surfaces angles you're already running</td>
<td>Pulling stale ads</td>
<td>Filter Meta Ads Library by "30+ days active" only</td>
</tr>
<tr>
<td>Top 2 winners drop after scaling</td>
<td>Audience saturation, not creative fatigue</td>
<td>Pause for 48 hours, relaunch. Often recovers without new creative.</td>
</tr>
<tr>
<td>Burning budget on hopeful ads</td>
<td>Skipping the 24-hour kill</td>
<td>Set a calendar reminder for hour 24. No exceptions.</td>
</tr>
<tr>
<td>Claude Project loses context</td>
<td>Knowledge files outdated</td>
<td>Refresh ad data export weekly</td>
</tr>
</table>
---
## Cost & Speed Math
<table header-row="true">
<tr>
<td>Step</td>
<td>Time</td>
<td>Cost</td>
</tr>
<tr>
<td>Account audit</td>
<td>5 min</td>
<td>$0 (Claude)</td>
</tr>
<tr>
<td>Hook rewrites (5 ads)</td>
<td>10 min</td>
<td>$0</td>
</tr>
<tr>
<td>Higgsfield production (20 variations)</td>
<td>45 min</td>
<td>$11</td>
</tr>
<tr>
<td>Meta launch</td>
<td>10 min</td>
<td>Daily ad spend</td>
</tr>
<tr>
<td>24-hour matrix read</td>
<td>5 min</td>
<td>$0</td>
</tr>
<tr>
<td>**Total per testing cycle**</td>
<td>**75 min**</td>
<td>**$11 + ad spend**</td>
</tr>
</table>
Compared to traditional agency cycle: 2-3 weeks per round, $5K-$15K/mo retainer.
The math is the math.
---
## 🎯 Closer
**Start with the account audit. Pull 30 days of Meta data. Run the audit prompt in Claude. Identify your top 3 patterns and your top 3 failure modes. Take the 5 worst hooks and run them through the rewrite prompt. Generate 25 new variations in Higgsfield. Launch 20 of them in 1 ad set with $30/day each. Run the matrix at hour 24. That's your first cycle. The compounding starts there.**
The advertisers who win in 2026 won't test more.
They'll decide better.
System > Spend.
---
