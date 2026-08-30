---
title: "The 50-Hook Library + Claude MCP Setup (Higgsfield Hooks)"
page_id: 38292e2e92e980289a2ad57f16d250a2
layer: research
source: https://freebie-for-you.notion.site/38292e2e92e980289a2ad57f16d250a2
---
## 🎯 What You're Getting
50 actual ad hooks I've used across 40+ DTC brands over the past 6 months. Each one tested in real Meta spend at $30K/day. Each one mapped to funnel stage, vertical fit, conversion logic, and the ad format it pairs with.
Plus the full Claude + Higgsfield Hooks MCP setup that lets Claude generate fresh hooks in this exact style on demand. Plus 6 vertical-specific batch generation prompts. Plus the kill-or-scale matrix that filters 100 generated hooks down to the 5 worth scaling.
You don't have to write hooks from scratch. You don't have to test 200 randomly. You install the MCP, paste the system prompt, paste the 50-hook library into Project Knowledge, and Claude produces hooks that compound on the same library that 6Xed my ROAS.
By the end of this guide, you'll have:
→ The 50-hook library with real client examples across 6 verticals<br>→ The Claude + Higgsfield Hooks MCP setup walkthrough<br>→ The training system prompt for Claude<br>→ 6 vertical-specific batch generation prompts<br>→ The kill-or-scale matrix prompt<br>→ The 5 hook formula deep-dives<br>→ The brand voice customization templates<br>→ The weekly hook cadence that ships 30 tested hooks per week
---
## ⚙️ The Stack
<table header-row="true">
<tr>
<td>Layer</td>
<td>Tool</td>
<td>Job</td>
</tr>
<tr>
<td>Strategy</td>
<td>The 50-hook library (below)</td>
<td>Trains Claude on patterns that already converted</td>
</tr>
<tr>
<td>Generation</td>
<td>Higgsfield Hooks via Claude MCP</td>
<td>Produces 25+ hook variations across 4 categories on demand</td>
</tr>
<tr>
<td>Combination</td>
<td>Claude as the orchestration layer</td>
<td>Hybrids the library patterns with Higgsfield's MCP outputs</td>
</tr>
<tr>
<td>Testing</td>
<td>Batch protocol + kill-or-scale matrix</td>
<td>Identifies the 5 winners from 100 generated hooks</td>
</tr>
<tr>
<td>Production</td>
<td>Higgsfield Marketing Studio + Seedance 2.0</td>
<td>Turns winning hooks into finished UGC ads</td>
</tr>
</table>
The 50-hook library is the foundation — proven patterns that already moved Meta spend at $30K/day. The MCP setup runs the system end-to-end. The testing protocol filters volume into wins.
---
## ⚙️ The Workflow Math
Why this beats manual hook writing.
Manual hook writing is 30-60 minutes per hook by a senior copywriter. To test 20 hooks per week (the minimum volume to find a winner), you need either 1 senior copywriter at $5K-$10K/mo retainer, or 10-20 hours of operator time per week.
The MCP system runs 100 hook generations in 5 minutes for under $0.50 in API cost. That's not 10x faster. That's 600x faster at 1% of the cost.
The leverage shifts the bottleneck. You stop being limited by hook supply. You start being limited by testing capacity. That's a different problem with a different fix (the kill-or-scale matrix below).
---
## Step 1 — Connect Higgsfield Hooks via Claude MCP
The MCP integration is what makes this system different from manually copy-pasting from a hook list.
### Web setup walkthrough (5 minutes):
1. Open [Claude.ai](http://claude.ai/) → Settings → Connectors
2. Search for "Higgsfield" in the connector library
3. Click Add → Connect
4. Authenticate with your Higgsfield account
5. Approve permissions for Hooks by Marketing Studio
6. Return to Claude
7. Confirm connection: type "List my Higgsfield connectors"
### Claude Code CLI setup (alternative for batch jobs):
```bash
claude mcp add higgsfield \\\\
  --transport http \\\\
  --url <https://api.higgsfield.ai/mcp/hooks>
```
Authenticate via the browser prompt that opens. Verify with `claude mcp list` (should show higgsfield connected).
### Verify the MCP works:
```javascript
Generate 5 hook variations using Higgsfield Hooks
for a skincare brand. Use the cold open category.
Product: vitamin C serum. ICP: women 28-45.
Brand voice: premium minimalist.
```
If Claude returns 5 hooks tagged with the cold open category from Higgsfield, you're live.
---
## Step 2 — Train Claude on the 50-Hook Library
Set up a Claude Project. Paste this as the Project Instructions. Upload the 50-hook library (further down) as Project Knowledge.
### The training system prompt:
```javascript
You are a senior performance media buyer with 10+
years managing $30K/day+ Meta ad spend across 40+
DTC brands.

You have access to:
1. The Eugenio 50-Hook Library (Project Knowledge)
2. Higgsfield Hooks via MCP (25+ hook categories
   across cold opens, POV setups, pattern interrupts,
   story hooks)

Your job is to generate hooks that:
- Match a proven pattern from the 50-Hook Library
- Use Higgsfield Hooks for fresh variation expansion
- Stay under 12 words
- Front-load the specific number, claim, or identity
- Strip generic adjectives (amazing, incredible, best,
  great, awesome)

Reference the 50-Hook Library categories:
- Cold Opens (10 hooks) — TOF stop-scroll
- POV Setups (10 hooks) — MOF identity-driven
- Pattern Interrupts (10 hooks) — TOF/MOF re-engagement
- Story Hooks (10 hooks) — MOF/BOF narrative-led
- Operator Identity Hooks (10 hooks) — BOF qualifier

When the user gives you a brief, return:
1. The 5 hooks from the library that match the brief
2. 5 fresh variations generated via Higgsfield MCP
3. 5 hybrid hooks combining library patterns with
   MCP variations
4. Funnel stage recommendation for each (TOF/MOF/BOF)
5. Vertical fit notes for each
6. Best ad format pairing for each (UGC talking head,
   founder POV, comparison, lifestyle, problem-solution,
   GRWM)

Always specify brand voice when responding. Default
to "casual operator" if the user doesn't specify.

50-Hook Library: [UPLOADED AS PROJECT KNOWLEDGE]
```
### Brand voice templates (drop into the brief):
```javascript
PREMIUM MINIMALIST:
Calm, confident, fewer adjectives, longer pauses,
specific results without exclamation. Reads like a
senior operator briefing a peer.

CASUAL OPERATOR:
Direct, conversational, slight personal warmth,
specific numbers, no fluff. Reads like a founder
texting a friend.

EDGY CONTRARIAN:
Sharp claims, calls out the industry, slightly
provocative, reframes received wisdom. Reads like
a senior creative director on Twitter.

CALM EDUCATIONAL:
Slow pace, technical specifics, mechanism-focused,
explains the why before the what. Reads like a
science writer.

FOUNDER-LED:
First-person, origin-driven, vulnerable but
confident, leans into specific obstacles overcome.
Reads like the actual founder talking.
```
### ICP descriptor templates by vertical:
```javascript
SKINCARE/BEAUTY:
"Women 28-45, skincare-curious, $40-$80 price point,
shop on Instagram, save before they buy"

SUPPLEMENTS/WELLNESS:
"Health-curious 30-50, willing to spend $40-$120/mo
on stack, read labels, suspicious of generic claims"

FITNESS/ATHLETIC:
"22-40, gym-going or running, willing to spend
$60-$200 per piece, brand-loyal once converted"

FASHION:
"25-45, premium-curious, save outfit pins, willing
to spend $80-$300 per piece, follows GRWM content"

FOOD/BEVERAGE:
"25-45, foodie or wellness-leaning, willing to spend
$5-$15 per item, discover via TikTok, stockpile
favorites"

SaaS/TECH:
"Operators or founders 28-50, $5K-$50K/mo
business spend, evaluate via demos, decide via peer
recommendations"
```
---
## Step 3 — Batch Generation Prompts
### The master batch generation prompt:
```javascript
Run a batch hook generation for [BRAND NAME].

Inputs:
- Product: [PRODUCT NAME + 1-LINE DESCRIPTION]
- ICP: [USE ICP TEMPLATE ABOVE]
- Price point: [PRICE]
- Key benefit: [MAIN BENEFIT WITH SPECIFIC RESULT]
- Funnel stage: [TOF/MOF/BOF]
- Brand voice: [USE BRAND VOICE TEMPLATE ABOVE]
- Vertical: [SKINCARE/SUPPLEMENTS/FITNESS/FASHION/
  FOOD-BEV/SAAS]
- Hook count: 100

Output structure:
- 20 hooks from the 50-Hook Library that match the brief
- 20 fresh variations via Higgsfield MCP across the
  4 categories
- 20 hybrid hooks combining library patterns with
  MCP variations
- 20 vertical-specific hooks tailored to the brand
- 20 stretch hooks pushing contrarian angles

For each hook return:
- The hook (under 12 words)
- 1-line conversion logic
- Funnel stage match
- Best ad format pairing
- Cross-reference to 50-Hook Library category
```
### 6 Vertical-Specific Batch Prompts
**Skincare/Beauty batch:**
```javascript
Generate 50 hooks for a skincare brand.

Product: vitamin C serum, $58, dark glass bottle.
ICP: women 28-45, skincare-curious, save before they buy.
Brand voice: premium minimalist.
Funnel mix: 50% TOF, 30% MOF, 20% BOF.

Weight POV Setups and Story Hooks heavier (highest
save rate in skincare). Skip Operator Identity hooks.

For each: hook, conversion logic, funnel stage,
best ad format.
```
**Supplements/Wellness batch:**
```javascript
Generate 50 hooks for a supplement brand.

Product: daily greens powder, $85/mo subscription.
ICP: health-curious 30-50, suspicious of generic
claims, willing to spend $40-$120/mo on stack.
Brand voice: calm educational.
Funnel mix: 30% TOF, 40% MOF, 30% BOF.

Weight Story Hooks and Pattern Interrupts heavier
(supplements need narrative + reframe).

For each: hook, conversion logic, funnel stage,
best ad format.
```
**Fitness/Athletic batch:**
```javascript
Generate 50 hooks for an athletic apparel brand.

Product: training shorts, $80, designed for HIIT.
ICP: 22-40, gym-going, willing to spend $60-$200
per piece, brand-loyal once converted.
Brand voice: edgy contrarian.
Funnel mix: 40% TOF, 30% MOF, 30% BOF.

Weight POV Setups and Operator Identity hooks
(fitness audience responds to identity-driven hooks).

For each: hook, conversion logic, funnel stage,
best ad format.
```
**Fashion batch:**
```javascript
Generate 50 hooks for a fashion brand.

Product: tailored linen blazer, $240, summer
collection.
ICP: 25-45, premium-curious, follows GRWM content,
willing to spend $80-$300 per piece.
Brand voice: premium minimalist.
Funnel mix: 60% TOF, 30% MOF, 10% BOF.

Weight POV Setups heavily (especially "POV: GRWM"
variants). Cold Opens secondary.

For each: hook, conversion logic, funnel stage,
best ad format.
```
**Food/Beverage batch:**
```javascript
Generate 50 hooks for a food brand.

Product: matcha-based energy drink, $48 for 12-pack.
ICP: 25-45, foodie or wellness-leaning, discover via
TikTok, stockpile favorites.
Brand voice: casual operator.
Funnel mix: 50% TOF, 35% MOF, 15% BOF.

Weight Cold Opens and POV Setups (food/bev is
discovery-driven on social).

For each: hook, conversion logic, funnel stage,
best ad format.
```
**SaaS/Tech batch:**
```javascript
Generate 50 hooks for a SaaS brand.

Product: AI sales assistant, $200/mo per seat.
ICP: operators or founders 28-50, $5K-$50K/mo
business spend, decide via peer recommendations.
Brand voice: founder-led.
Funnel mix: 30% TOF, 30% MOF, 40% BOF.

Weight Operator Identity Hooks heavily (BOF for
qualified operators). Story Hooks secondary.

For each: hook, conversion logic, funnel stage,
best ad format.
```
### Hook A/B Testing Prompt:
```javascript
I'm running 5 hooks against the same body and CTA
in Meta. Help me build the test variants.

Hook 1: [PASTE HOOK 1]
Hook 2: [PASTE HOOK 2]
Hook 3: [PASTE HOOK 3]
Hook 4: [PASTE HOOK 4]
Hook 5: [PASTE HOOK 5]

For each:
1. Predict the hook rate (3-sec view rate) range
   based on the 50-Hook Library category patterns
2. Predict the audience match (which ICP descriptor
   responds best)
3. Recommend the budget allocation (start at $30/day
   each, but flag if 1 should get $50)
4. Flag any conflicts or redundancies between the 5
```
---
## The 50-Hook Library
50 hooks I've actually used for client brands across 6 verticals. Each fully written. Each with conversion logic, funnel stage, vertical fit, and ad format pairing.
### Category 1 — Cold Opens (10 hooks)
These stop the scroll in the first 1.5 seconds. Highest hook-rate performers in my library.
```javascript
1. "I tested 47 vitamin C serums in 30 days. This
    $58 bottle was the only one I kept."
   Logic: Specific test volume + decisive close.
   Funnel: TOF cold. Vertical: Skincare. Format:
   Reviewer-style UGC.

2. "I cancelled my $7/day Starbucks habit after this
    $4 matcha drink."
   Logic: Specific cost contrast + decisive cancellation
   verb.
   Funnel: TOF + MOF. Vertical: Food/Beverage.
   Format: Founder POV.

3. "Nobody told me about this $80 leggings brand
    and I'm honestly mad."
   Logic: Emotional reaction = relatable. Pattern
   tested across 8 verticals.
   Funnel: TOF cold. Vertical: Fitness. Format:
   Casual UGC talking head.

4. "Stop scrolling if you're tired of supplements
    that promise everything."
   Logic: Identity callout + category complaint =
   instant audience filter.
   Funnel: TOF qualifier. Vertical: Supplements.
   Format: Direct talking head.

5. "I tested 23 morning routines. This 4-minute one
    changed my skin in 30 days."
   Logic: Specific volume + specific time + specific
   result = stacked credibility.
   Funnel: MOF consideration. Vertical: Skincare.
   Format: Routine walkthrough.

6. "Why is no one talking about this $48 matcha pack?"
   Logic: Pattern interrupt question + specific price.
   Funnel: TOF curiosity. Vertical: Food/Beverage.
   Format: Founder POV with product close-up.

7. "If you're a 30-something tired of dressing 25,
    you need to see this."
   Logic: Specific demographic callout = instant
   qualification.
   Funnel: BOF for qualified prospects. Vertical:
   Fashion. Format: Direct address.

8. "I bought into the greens powder hype expecting
    nothing. 14 days later I'm hooked."
   Logic: Skepticism reversal + specific time anchor.
   Funnel: MOF. Vertical: Supplements. Format:
   Story-led UGC.

9. "I'm not sponsored by this brand. The shorts just
    don't ride up."
   Logic: Implicit transparency + specific functional
   benefit.
   Funnel: MOF + BOF. Vertical: Fitness. Format:
   Founder talking head.

10. "30 days using this serum. Here's what changed."
    Logic: Time-bound result frame + open loop.
    Funnel: MOF. Vertical: Skincare. Format:
    Before/after walkthrough.
```
---
### Category 2 — POV Setups (10 hooks)
POV (point of view) framing puts the viewer inside the moment. Highest save-rate performers in my library.
```javascript
11. "POV: you found the linen blazer everyone keeps
     DM-ing you about."
    Logic: Aspirational identity placement +
    implicit social proof.
    Funnel: MOF aspirational. Vertical: Fashion.
    Format: GRWM-style.

12. "POV: getting ready for the office in 3 minutes
     with this capsule wardrobe."
    Logic: Specific time + practical use-case.
    Funnel: MOF. Vertical: Fashion. Format: GRWM.

13. "POV: your skin after 30 days of this 4-step
     routine."
    Logic: Result anticipation + specific timeline.
    Funnel: MOF. Vertical: Skincare. Format:
    Before/after timeline.

14. "POV: you're a busy mom who finally fixed your
     morning energy."
    Logic: Identity targeting + specific job-to-be-
    done.
    Funnel: BOF for qualified ICP. Vertical:
    Supplements. Format: Direct talking head.

15. "POV: morning routine — coffee, greens, and
     gym shorts that actually fit."
    Logic: Lifestyle aspirational + specific
    product callouts.
    Funnel: TOF + MOF. Vertical: Multi (Fitness +
    Supplements + Food). Format: Lifestyle GRWM.

16. "POV: replacing your $300 Lululemon haul with
     this $80 brand."
    Logic: Specific competitor + specific cost
    swap.
    Funnel: MOF + BOF. Vertical: Fitness. Format:
    Comparison-style UGC.

17. "POV: discovering the matcha brand before your
     friends do."
    Logic: First-mover advantage + FOMO trigger.
    Funnel: TOF curiosity. Vertical: Food/Beverage.
    Format: Reaction-style UGC.

18. "POV: the day you stopped buying drugstore
     serum."
    Logic: Specific category-leaving moment +
    implicit upgrade narrative.
    Funnel: MOF emotional. Vertical: Skincare.
    Format: Quiet narrative.

19. "POV: your evening glow up routine using one
     bottle."
    Logic: Time-specific aspirational moment +
    simplicity framing.
    Funnel: MOF. Vertical: Skincare. Format:
    Routine POV.

20. "POV: you're the friend everyone asks for
     skincare advice."
    Logic: Status aspiration + identity reinforcement.
    Funnel: BOF identity-driven. Vertical: Skincare.
    Format: Founder POV.
```
---
### Category 3 — Pattern Interrupts (10 hooks)
Pattern interrupts break the expected ad rhythm. Best for fatigued audiences and re-engagement.
```javascript
21. "Do you understand what just happened to luxury
     skincare prices?"
    Logic: Question hook + industry-shift framing.
    Funnel: TOF. Vertical: Skincare. Format:
    Direct talking head.

22. "This $58 serum replaces your $200 La Mer
     routine."
    Logic: Specific competitor swap + cost contrast.
    Funnel: MOF + BOF. Vertical: Skincare. Format:
    Comparison-style UGC.

23. "I was wrong about $9 collagen powder. Here's
     what changed my mind."
    Logic: Belief reversal + specific price anchor.
    Funnel: MOF. Vertical: Supplements. Format:
    Story-led talking head.

24. "97% of women over 30 don't know about this
     morning supplement."
    Logic: Specific stat + insider positioning.
    Funnel: TOF curiosity. Vertical: Supplements.
    Format: Direct claim with screen rec.

25. "Drugstore foundation is officially done."
    Logic: Definitive industry-shift statement.
    Funnel: TOF. Vertical: Beauty. Format: Bold
    talking head.

26. "If you're still buying $400 jeans, stop."
    Logic: Identity callout + specific spend
    pattern + decisive verb.
    Funnel: BOF qualifier. Vertical: Fashion.
    Format: Direct address.

27. "The supplement industry doesn't want you to
     know this about greens powder."
    Logic: Conspiracy framing + insider knowledge.
    Funnel: TOF curiosity. Vertical: Supplements.
    Format: Hushed-tone talking head.

28. "I almost returned this matcha drink until day
     3 hit."
    Logic: Skepticism reversal + specific timing
    detail.
    Funnel: MOF. Vertical: Food/Beverage. Format:
    Story-led UGC.

29. "Forget everything you know about pre-workout
     drinks."
    Logic: Disruption framing + reset signal.
    Funnel: TOF re-engagement. Vertical: Fitness/
    Supplements. Format: Bold talking head.

30. "This is the workout brand elite athletes
     actually wear."
    Logic: Insider authority + dismissal of mass
    market.
    Funnel: BOF qualifier. Vertical: Fitness.
    Format: Confident talking head.
```
---
### Category 4 — Story Hooks (10 hooks)
Story hooks pull viewers into a narrative. Highest hold-rate performers in my library.
```javascript
31. "I tried Goop. Then Glossier. Then this $58
     serum from a brand you've never heard of."
    Logic: Specific brand sequence = decision-
    journey credibility.
    Funnel: MOF. Vertical: Skincare. Format:
    Reviewer talking head.

32. "30 days of greens powder. Here's what changed
     about my morning."
    Logic: Time-bound + specific result framing.
    Funnel: MOF. Vertical: Supplements. Format:
    Story walkthrough.

33. "I built my entire wardrobe around this $80
     blazer because I was tired of fast fashion."
    Logic: Founder origin + specific product
    + ideological anchor.
    Funnel: TOF + MOF. Vertical: Fashion. Format:
    Founder POV.

34. "Day 1 with this serum. Day 30 looks like the
     photo on the right."
    Logic: Time-bound transformation + visual
    promise.
    Funnel: MOF. Vertical: Skincare. Format:
    Before/after timeline.

35. "I asked 40 women over 35 what they use for
     their skin. The answers surprised me."
    Logic: Sample-size credibility + open-loop
    curiosity.
    Funnel: TOF. Vertical: Skincare. Format:
    Documentary-style talking head.

36. "This $48 matcha pack saved me $180 in coffee
     runs in 30 days."
    Logic: Specific cost math + decisive savings
    claim.
    Funnel: BOF. Vertical: Food/Beverage. Format:
    Calculator on screen.

37. "My sister asked what I changed about my morning
     routine. I told her about this $35 powder."
    Logic: Implicit social proof + low-key
    storytelling.
    Funnel: MOF. Vertical: Supplements. Format:
    Casual founder POV.

38. "Took me 3 years to find this skincare line.
     Sharing so you don't waste yours."
    Logic: Effort signal + altruistic framing.
    Funnel: TOF + MOF. Vertical: Skincare. Format:
    Founder talking head.

39. "5 years of dry skin. This serum fixed it in
     14 days."
    Logic: Time contrast (5 years vs 14 days) =
    transformation impact.
    Funnel: MOF. Vertical: Skincare. Format:
    Story-led UGC.

40. "I tracked my morning energy before and after
     these greens. The data's hard to ignore."
    Logic: Data-driven framing + understatement
    builds trust.
    Funnel: MOF + BOF. Vertical: Supplements.
    Format: Walkthrough with chart on screen.
```
---
### Category 5 — Operator Identity Hooks (10 hooks)
These call out a specific identity or operator behavior. Highest CTR among qualified ICPs. Most apply to B2B/SaaS but the framework also works for premium DTC at higher price bands.
```javascript
41. "If you're spending $20K+/mo on Meta and still
     writing hooks manually, read this."
    Logic: Spend qualifier + specific bad-habit
    callout.
    Funnel: BOF. Vertical: SaaS/Operator. Format:
    Direct address.

42. "If you're a media buyer running 50+ creatives
     a week and not using MCP, you're behind."
    Logic: Volume qualifier + identity reinforcement.
    Funnel: BOF. Vertical: SaaS/Operator. Format:
    Peer-to-peer talking head.

43. "Founders running DTC at 7-8 figures: this
     changed my CPA by 47%."
    Logic: Revenue-band callout + specific result.
    Funnel: BOF qualifier. Vertical: SaaS/DTC.
    Format: Founder POV.

44. "Every operator at $30K/day spend knows this
     problem. Nobody fixes it like this."
    Logic: Insider problem callout + differentiated
    solution framing.
    Funnel: BOF. Vertical: SaaS/Operator. Format:
    Direct talking head.

45. "DTC media buyers, this is for you."
    Logic: Pure identity callout, simple, high CTR.
    Funnel: BOF. Vertical: SaaS/Operator. Format:
    Direct address with eye contact.

46. "Built for operators who want 100 hooks before
     lunch."
    Logic: Specific volume + time signal = use-case
    targeting.
    Funnel: BOF. Vertical: SaaS/Operator. Format:
    Tool walkthrough.

47. "If you're tired of $5K/mo copywriters, try the
     MCP."
    Logic: Pain-driven identity + decisive
    alternative.
    Funnel: BOF. Vertical: SaaS/Operator. Format:
    Direct address.

48. "Operators who switched to Higgsfield Hooks
     don't go back. Here's why."
    Logic: Tribal identity + open-loop reason.
    Funnel: MOF + BOF. Vertical: SaaS/Operator.
    Format: Story-led UGC.

49. "The hook tool that performance media buyers
     actually use."
    Logic: Insider authority + dismissal of
    competitors.
    Funnel: BOF. Vertical: SaaS/Operator. Format:
    Confident talking head.

50. "If hook bottlenecks are costing you 8 hours a
     week, this is the fix."
    Logic: Specific time-cost callout + decisive
    solution framing.
    Funnel: BOF. Vertical: SaaS/Operator. Format:
    Direct address with calculator.
```
---
## Step 4 — Kill-or-Scale Matrix for Hooks
After generating 100 hooks via batch, deploy 20 in real Meta spend at $30/day each. Run this matrix at hour 24.
### Kill / Hold / Scale thresholds:
<table header-row="true">
<tr>
<td>Metric</td>
<td>Kill Below</td>
<td>Hold Range</td>
<td>Scale Above</td>
</tr>
<tr>
<td>Hook rate (3-sec view)</td>
<td>25%</td>
<td>25-35%</td>
<td>35%</td>
</tr>
<tr>
<td>Hold rate (15-sec watch)</td>
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
</table>
### The matrix application prompt:
```javascript
Run my hook kill-or-scale matrix on this 24-hour data:

[PASTE: ad name, hook line, spend, hook rate, hold
rate, CTR, CPA, ROAS]

For each hook return:
1. Decision: KILL / HOLD / SCALE
2. Reason (cite the specific threshold breach)
3. If SCALE: recommended next budget
4. If KILL: which surviving hook's pattern to clone
5. Cross-reference the hook to its category in the
   50-Hook Library (Cold Open / POV / Pattern
   Interrupt / Story / Identity)
6. Pattern recognition: what do my winners share?
   What do my losers share?

No hedging. Decisive calls.
```
### Pattern recognition prompt (run weekly):
```javascript
Analyze my last 20 hook tests. Group them by 50-Hook
Library category.

For each category, return:
- Win rate (% that hit Scale thresholds)
- Average hook rate
- Average CPA
- Top 1 hook by ROAS

Then identify:
- Which 2 categories have the highest win rate
  for my brand?
- Which 2 categories should I weight heavier in
  next week's batch?
- Which 1 category should I deprioritize?
```
### Weekly review prompt:
```javascript
Compile my last 7 days of hook performance into the
weekly brief.

Include:
- Total hooks tested
- Hook win rate
- Top 3 hooks by ROAS (with category cross-reference)
- Bottom 3 hooks by ROAS
- Category-level performance breakdown
- 3 specific actions for next week (which patterns to
  weight, which to deprioritize, which new angles to
  test)

Format as a 1-page Slack message my team can read in
under 2 minutes.
```
---
## Funnel Stage Mapping
<table header-row="true">
<tr>
<td>Funnel Stage</td>
<td>Best Categories</td>
<td>Why</td>
</tr>
<tr>
<td>TOF (Awareness)</td>
<td>Cold Opens, Pattern Interrupts</td>
<td>Stop the scroll, plant the brand without prior awareness</td>
</tr>
<tr>
<td>MOF (Consideration)</td>
<td>POV Setups, Story Hooks</td>
<td>Build affinity, allow audience to project into outcome</td>
</tr>
<tr>
<td>BOF (Conversion)</td>
<td>Story Hooks, Operator Identity</td>
<td>Convert known interest, qualify by spend or behavior</td>
</tr>
</table>
Don't run BOF Operator Identity hooks at TOF spend — the cold audience won't recognize the spend qualifier. Don't run TOF Cold Opens at BOF spend — warm audiences need higher specificity than "stop scrolling."
---
## Vertical Application Guide
<table header-row="true">
<tr>
<td>Vertical</td>
<td>Best Hook Categories</td>
<td>Worst Categories</td>
</tr>
<tr>
<td>Skincare/Beauty</td>
<td>POV Setups, Story Hooks, Cold Opens</td>
<td>Operator Identity</td>
</tr>
<tr>
<td>Supplements/Wellness</td>
<td>Story Hooks, Pattern Interrupts</td>
<td>Pure Cold Opens</td>
</tr>
<tr>
<td>Fitness/Athletic</td>
<td>POV Setups, Operator Identity-style</td>
<td>Long Story Hooks</td>
</tr>
<tr>
<td>Fashion</td>
<td>POV Setups (especially GRWM), Cold Opens</td>
<td>Operator Identity</td>
</tr>
<tr>
<td>Food/Beverage</td>
<td>POV Setups, Cold Opens</td>
<td>Long Pattern Interrupts</td>
</tr>
<tr>
<td>SaaS/Tech</td>
<td>Operator Identity, Pattern Interrupts</td>
<td>POV Setups</td>
</tr>
</table>
---
## The 5 Hook Formula Deep-Dives
### Cold Opens — the scroll-stop mechanism
A cold open works because it interrupts the brain's predictive pattern. The viewer expects an ad. They get a number, a cancellation, a confession, a callout. The mismatch buys you 1-2 seconds of attention.
The strongest cold opens lead with: a specific dollar number, a decisive verb (cancelled, replaced, killed, switched), or a confessional admission.
### POV Setups — the projection mechanism
POV works because it shortcuts identification. The viewer doesn't have to be sold on relevance — they're invited to step into the scene. "POV: you found the X" is an aspirational placement that triggers the brain's planning circuits.
Strongest POV hooks include a specific moment (morning routine, getting ready) plus a specific outcome (you fixed X, you replaced X, you discovered X).
### Pattern Interrupts — the reframe mechanism
A pattern interrupt is a category-level disruption. "Drugstore foundation is officially done" reframes how the viewer thinks about the entire workflow, not just one product. The brain rewards reframes with attention.
Strongest pattern interrupts include a specific industry callout plus a definitive verb (stop, forget, replaced, done).
### Story Hooks — the narrative mechanism
Story hooks work because the brain is wired to follow narrative arcs. "Day 1 with X. Day 30 looks like Y" is a complete arc in 12 words. The viewer wants the resolution.
Strongest story hooks include a time-bound start ("30 days", "Day 1", "5 years ago") plus a specific result ("CPA dropped by 47%", "skin cleared", "$180 saved").
### Operator Identity Hooks — the qualifier mechanism
Identity hooks work in reverse. They qualify the audience by spend, behavior, or revenue band. "If you're spending $20K+/mo on Meta..." filters everyone else out and locks in the qualified prospect.
Strongest operator hooks include a specific spend or revenue qualifier plus a specific bad-habit callout.
---
## What NOT to Do
→ Don't paste all 50 hooks into a single ad rotation. Pick 10-15 that match your funnel stage and vertical. Test those first. The library is a system, not a dump.
→ Don't use hooks word-for-word without the brand voice template applied. The hook structure matters; the exact wording needs your brand's voice.
→ Don't skip the kill-or-scale matrix. The matrix is what compounds wins. Without it, you're randomly testing.
→ Don't run TOF hooks against retargeting audiences. The audience is too warm for "stop scrolling" framing.
→ Don't generate 100 hooks in a single batch and run all 100. Generate 100, cut to 20 best by gut, run those 20 in spend, let the matrix cut to 5.
→ Don't forget to feed Claude the brand voice. Without it, hook variations sound generic. Specify the brand voice template in every batch prompt.
→ Don't run the same brand voice for every campaign. Rotate based on funnel stage. TOF can lean edgy contrarian. BOF should lean founder-led or premium minimalist.
→ Don't skip the pattern recognition prompt. The weekly category-level analysis is what tells you which 2 hook formulas to weight in next week's batches.
→ Don't write your own hooks alongside the system. The system compounds. Your handwriting alongside it dilutes the data.
→ Don't ignore the cross-platform aspect. Hooks that win on TikTok often fail on Meta because the cold audience is different. Test platform-by-platform.
---
## Troubleshooting
<table header-row="true">
<tr>
<td>Problem</td>
<td>Fix</td>
</tr>
<tr>
<td>Generated hooks feel generic</td>
<td>Brand voice missing from input. Add the brand voice template.</td>
</tr>
<tr>
<td>Hooks exceed 12 words</td>
<td>Add "Tighten every hook to under 12 words. Strip generic adjectives."</td>
</tr>
<tr>
<td>Variations are too similar</td>
<td>Specify "Generate hooks across all 5 categories with no more than 2 per category."</td>
</tr>
<tr>
<td>MCP returns errors</td>
<td>Check the connector toggle in Claude. Re-authenticate if expired.</td>
</tr>
<tr>
<td>Hook rate below 25% on every variation</td>
<td>Wrong category for the funnel stage. Cross-check the funnel stage mapping.</td>
</tr>
<tr>
<td>Save rate is low (<1%)</td>
<td>Move to POV Setups or Story Hooks. Saves correlate with narrative-led content.</td>
</tr>
<tr>
<td>CTR is high but CPA is bad</td>
<td>The hook is attracting the wrong audience. Tighten the ICP descriptor.</td>
</tr>
<tr>
<td>Same hooks dominate across batches</td>
<td>Refresh the brand voice + ICP descriptor weekly.</td>
</tr>
<tr>
<td>Higgsfield MCP feels limited on its own</td>
<td>Combine with the 50-Hook Library patterns.</td>
</tr>
<tr>
<td>Hooks don't match the visual ad</td>
<td>Pair the hook with the format pairing notes from each library entry.</td>
</tr>
<tr>
<td>Pattern recognition shows no clear winner</td>
<td>Push to 30 hooks/week minimum to surface patterns.</td>
</tr>
<tr>
<td>The library feels overwhelming on first read</td>
<td>Start with 1 category + 1 vertical. Master that combo. Then expand.</td>
</tr>
</table>
---
## The Daily Hook Cadence
<table header-row="true">
<tr>
<td>Day</td>
<td>Task</td>
<td>Output</td>
</tr>
<tr>
<td>Monday morning</td>
<td>Run batch generation prompt for the week's brand</td>
<td>100 hooks generated</td>
</tr>
<tr>
<td>Monday afternoon</td>
<td>Cull to 20 hooks by gut, deploy in Meta at $30/day each</td>
<td>20 hooks live</td>
</tr>
<tr>
<td>Tuesday morning</td>
<td>First matrix read at hour 24</td>
<td>Kill 11, hold 9</td>
</tr>
<tr>
<td>Wednesday</td>
<td>Generate replacements for killed hooks via batch</td>
<td>11 fresh hooks deployed</td>
</tr>
<tr>
<td>Thursday</td>
<td>Second matrix read</td>
<td>Identify top 2 winners, scale to $200/day</td>
</tr>
<tr>
<td>Friday</td>
<td>Pattern recognition prompt + weekly review</td>
<td>Pattern map for next week</td>
</tr>
</table>
By week 4, you have a personalized hook library tailored to your brand on top of the foundational 50.
By month 3, the system runs with 30 minutes of operator input per week. The MCP and the matrix do the rest.
---
## 🎯 Closer
**Set up the Claude MCP connection. Paste the training system prompt into a Claude Project. Upload the 50-hook library to Project Knowledge. Run the vertical-specific batch prompt that matches your top brand. Cull to 20 hooks. Deploy 5 in real spend with $30/day each. Run the kill-or-scale matrix at hour 24. By the end of the week you'll know which 2 hooks to scale. By the end of the month you'll have a hook engine that runs without you. By month 3 you'll have replaced what used to be 8 hours of weekly hook writing with 30 minutes of system management.**
The hooks aren't the moat.
The system that compounds them is.
System > Spend.
---
