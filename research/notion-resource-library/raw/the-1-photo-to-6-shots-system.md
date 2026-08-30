---
title: "The 1-Photo-to-6-Shots System"
page_id: 39492e2e92e980588d08f9ddd466441b
layer: production
source: https://freebie-for-you.notion.site/39492e2e92e980588d08f9ddd466441b
---
# The 1-Photo-to-6-Shots System: How to Turn 1 Product Photo Into a Full 30-Second DTC Ad in Under 2 Minutes for Under $1 Using Claude + Seedance 2.0
---
## 🎯 What You're Getting
The Claude + Seedance 2.0 pipeline that decomposes 1 product photo into 6 scene beats, renders all 6 with locked product + character identity, and stitches them into a 30-second ad ready for Meta + TikTok deployment. Under 2 minutes of generation time. Under $1 total production cost per finished ad.
The master Claude prompt skill that ingests 1 product photo and outputs 6 Seedance-ready scene prompts (hero close-up / lifestyle in-hand / application / reaction / environmental wide / CTA hero). The identity lock protocol that keeps product + character consistent across every one of the 6 shots. The negative prompt library that strips AI artifacts before they render (weird fingers, blurred edges, plastic-lit environments, uncanny-valley eyes). The CapCut assembly workflow that stitches the 6 beats into 1 finished 30-second ad with sound, pacing, and captions.
You stop booking $8-15K studio days for a single ad concept. You stop scheduling models + product stylists + set designers. You stop waiting 2 weeks between concept approval and ad-ready footage. You paste 1 product photo, run 1 Claude skill call, queue 6 Seedance generations, assemble in CapCut, deploy. Same day.
By the end of this guide, you'll have:
→ The master Claude prompt skill (1 photo → 6 scene prompts, ready to paste into Claude Code / Projects)<br>→ The 6 canonical shot types with framing + intent per shot<br>→ The identity lock protocol (0.95 product / 0.93 character strength calibration)<br>→ The negative prompt library (11 anti-AI-artifact anchors)<br>→ 6 vertical templates (skincare, supplements, fitness, fashion, food/bev, tech)<br>→ The CapCut assembly workflow (import → cut → grade → caption → export in 8 minutes)<br>→ The kill-or-scale matrix for 1-photo ads<br>→ The scaling protocol (from 1 ad/day to 10+ ads/day)
If you're already running full production shoots for DTC creative, this system is the **80/20 replacement** — 80% of the ad quality at 2% of the cost, ready to test before you commit real budget to a full shoot.
---
## ⚙️ The Hidden Mechanism — Why 6 Shots Beats 1 Long Scene
Every standard AI-generated DTC ad has the same failure mode:
1. Operator writes 1 long scene prompt
2. Seedance renders 1 continuous 30-second scene
3. Continuity breaks somewhere in the middle
4. Motion feels flat because there's no cut rhythm
5. Ad reads as "1 long AI clip" instead of an edited ad
6. Hook rate collapses because there's no visual variety in the first 3 seconds
The fix is structural: decompose the 30-second ad into 6 shorter scene beats. Each beat is 4-6 seconds. Each beat has one job. Each beat renders with its own optimized prompt + lock parameters.
The 6-shot structure mirrors what real DTC ads look like:
→ Hook shot (0-3s): scroll-stop<br>→ Lifestyle shot (3-8s): "how this fits your life"<br>→ Application shot (8-15s): the mechanic<br>→ Reaction shot (15-22s): the emotional payoff<br>→ Environmental shot (22-27s): aspirational anchor<br>→ CTA hero shot (27-30s): the sale
When you cut between these 6 beats, the ad feels like an edited ad instead of 1 continuous AI render. Hook rate, hold rate, and CTR all lift because the format matches viewer expectations.
The fix is not "1 better long prompt." The fix is **6 optimized short prompts decomposed by shot function** — the thing that makes AI-generated ads read as edited creative instead of raw AI clips.
---
## ⚙️ The Stack
<table header-row="true">
<tr>
<td>Layer</td>
<td>Tool</td>
<td>Job</td>
</tr>
<tr>
<td>Shot decomposition</td>
<td>Claude Fable 5 with 1-Photo Skill</td>
<td>Turns 1 product photo into 6 scene prompts</td>
</tr>
<tr>
<td>Video generation</td>
<td>Seedance 2.0 Pro (via Higgsfield or Replicate direct)</td>
<td>Renders each of the 6 beats with locked product + character</td>
</tr>
<tr>
<td>Assembly</td>
<td>CapCut</td>
<td>Cuts, grades, captions, exports the 6 beats into 1 ad</td>
</tr>
<tr>
<td>Deploy</td>
<td>Meta + TikTok + Instagram + native scheduling</td>
<td>Multi-platform distribution</td>
</tr>
<tr>
<td>Tracking</td>
<td>Native ad platform analytics</td>
<td>Per-ad + per-shot performance</td>
</tr>
</table>
Total stack cost per finished ad: under $1 (6 × \\~$0.15 Seedance generations + Claude subscription).
---
## ⚙️ The Workflow Math
Traditional DTC shoot: 3-5 days from concept to ad-ready footage + $8-15K per shoot day. Operator manages director, stylist, model booking, product prep, editor.
1-Photo-to-6-Shots System: 2 minutes generation + 8 minutes CapCut assembly + \\~$1 total cost per finished 30-second ad.
The leverage shift: operator capacity moves from production management to concept testing. You spend more time exploring which product angles + reaction beats convert, less time managing a single shoot's execution.
For a brand testing 20 ad concepts per month, this is a $160K-$300K annual production cost reduction + 15x faster iteration cycle. For a brand testing 5 concepts per month, this is the difference between "gated by budget" and "test whatever you want, when you want."
---
## ⚙️ The 6 Canonical Shot Types
Every 1-photo ad decomposes into these 6 beats. Framing + intent + duration per shot.
### Shot 1 — Hook Product Close-Up (0-3 seconds)
**Framing**: Extreme close-up of the product, held or placed centered in frame.<br>**Camera**: Slight push-in or slow rotate.<br>**Character**: Optional — hands only, no full character yet.<br>**Intent**: Scroll-stop. Force the viewer's eye to lock onto the product before they scroll.<br>**Duration**: 3 seconds.
### Shot 2 — Lifestyle In-Hand (3-8 seconds)
**Framing**: Medium shot of character holding product in real-life setting.<br>**Camera**: Slow lateral move OR handheld realism.<br>**Character**: Full torso + face visible, natural expression.<br>**Intent**: Signal "this fits your life" — normalize the product into the viewer's imagined world.<br>**Duration**: 5 seconds.
### Shot 3 — Application / Mechanic Shot (8-15 seconds)
**Framing**: Close-up on product being used (application, pour, click, wear).<br>**Camera**: Locked or slight follow motion.<br>**Character**: Hand + partial face visible, focused expression.<br>**Intent**: Reveal the mechanic. Show how the product delivers on the benefit.<br>**Duration**: 7 seconds.
### Shot 4 — Reaction Close-Up (15-22 seconds)
**Framing**: Character face close-up post-application.<br>**Camera**: Slight zoom or handheld.<br>**Character**: Emotional reaction (satisfaction, relief, surprise, delight).<br>**Intent**: Emotional payoff. The moment the viewer projects themselves into the transformation.<br>**Duration**: 7 seconds.
### Shot 5 — Environmental Wide (22-27 seconds)
**Framing**: Wide shot of character in aspirational environment with product visible.<br>**Camera**: Slow pull-back or drone-style aerial.<br>**Character**: Full body in setting.<br>**Intent**: Anchor the aspirational lifestyle. "This is who I become with this product."<br>**Duration**: 5 seconds.
### Shot 6 — CTA Product Hero (27-30 seconds)
**Framing**: Product hero shot centered, brand context visible.<br>**Camera**: Locked hero shot with slow zoom or turntable rotation.<br>**Character**: None — product owns the frame.<br>**Intent**: Close the sale. Give the viewer a clean product image to remember + associate with the CTA.<br>**Duration**: 3 seconds.
Total: 30 seconds across 6 beats.
---
## ⚙️ Step 1 — The Master Claude Prompt Skill
Build this as a Claude Fable 5 skill inside your Claude Code / Claude Projects workspace.
### Custom Skill Instructions
```javascript
Name: 1-Photo-to-6-Shots Skill

Description: Takes 1 product photo + brand
context and outputs 6 Seedance-ready scene
prompts for the 6 canonical DTC ad shot types.

System Prompt:
You are a scene decomposition engine for DTC
video ads. Given 1 product photo + brand
context, output 6 Seedance-ready scene prompts
covering the canonical 6-shot ad structure.

Input format from operator:
- Product photo URL: [PUBLIC URL]
- Product name + 1-line description: [NAME +
  MECHANISM]
- Brand: [BRAND]
- Target character: [DEMOGRAPHIC +
  PSYCHOGRAPHIC — e.g. "woman 28-35, bathroom
  morning, natural skin"]
- Setting: [LOCATION — e.g. "modern kitchen
  morning light, marble counter"]
- Brand aesthetic: [3 ADJECTIVES]
- Primary benefit to communicate: [1-LINE
  BENEFIT]

Output format (strict, 6 shots):

SHOT 1 — HOOK CLOSE-UP (0-3s):
Prompt: [FULL SEEDANCE PROMPT with product
close-up, framing, camera language]
Negative prompt: [ANTI-ARTIFACT ANCHORS — see
Step 3 library]
Reference images: [product photo URL]
Lock strength: product 0.95
Aspect ratio: 9:16

SHOT 2 — LIFESTYLE IN-HAND (3-8s):
Prompt: [FULL SEEDANCE PROMPT — character
holding product in setting]
Negative prompt: [ANTI-ARTIFACT ANCHORS]
Reference images: [product photo URL, character
reference if available]
Lock strength: product 0.95, character 0.93
Aspect ratio: 9:16

SHOT 3 — APPLICATION MECHANIC (8-15s):
Prompt: [FULL SEEDANCE PROMPT — product being
used, hand + face]
Negative prompt: [ANTI-ARTIFACT ANCHORS]
Reference images: [product, character]
Lock strength: product 0.95, character 0.93
Aspect ratio: 9:16

SHOT 4 — REACTION CLOSE-UP (15-22s):
Prompt: [FULL SEEDANCE PROMPT — character face
reaction post-application]
Negative prompt: [ANTI-ARTIFACT ANCHORS]
Reference images: [character reference]
Lock strength: character 0.95
Aspect ratio: 9:16

SHOT 5 — ENVIRONMENTAL WIDE (22-27s):
Prompt: [FULL SEEDANCE PROMPT — wide
aspirational shot with character + product]
Negative prompt: [ANTI-ARTIFACT ANCHORS]
Reference images: [product, character, setting
if available]
Lock strength: product 0.92, character 0.90
Aspect ratio: 9:16

SHOT 6 — CTA PRODUCT HERO (27-30s):
Prompt: [FULL SEEDANCE PROMPT — clean product
hero, brand context]
Negative prompt: [ANTI-ARTIFACT ANCHORS]
Reference images: [product photo URL]
Lock strength: product 0.97
Aspect ratio: 9:16

Continuity rules to enforce:
→ Same product identity across all 6 shots
→ Same character identity across shots 2, 3, 4, 5
→ Same lighting arc (warmer at reaction shot for
  emotional peak)
→ Same setting details across shots 2, 3, 4, 5
→ Prompt language consistent (same tonal
  register)

Voice rules:
- Numerals only (3 not three)
- No em dashes
- Direct scene spec only
- No commentary
```
### Running the Skill
Operator pastes the product photo URL + brief. Fable 5 outputs the 6 scene prompts in 30-60 seconds. Copy each prompt into Seedance 2.0 queue. Batch generate.
---
## ⚙️ Step 2 — The Identity Lock Protocol
Product drift + character drift kill more 1-photo ads than any other failure. The fix is proper lock strength calibration per shot.
### Product Lock Strengths (by shot)
<table header-row="true">
<tr>
<td>Shot</td>
<td>Product Lock</td>
<td>Rationale</td>
</tr>
<tr>
<td>Hook Close-Up</td>
<td>0.95</td>
<td>Product IS the shot — max lock</td>
</tr>
<tr>
<td>Lifestyle In-Hand</td>
<td>0.95</td>
<td>Product held visible — high lock</td>
</tr>
<tr>
<td>Application</td>
<td>0.95</td>
<td>Product mid-use — high lock</td>
</tr>
<tr>
<td>Reaction</td>
<td>N/A</td>
<td>Product may not be in frame</td>
</tr>
<tr>
<td>Environmental</td>
<td>0.92</td>
<td>Product further from camera — medium lock</td>
</tr>
<tr>
<td>CTA Hero</td>
<td>0.97</td>
<td>Product owns the frame — max lock</td>
</tr>
</table>
### Character Lock Strengths (by shot)
<table header-row="true">
<tr>
<td>Shot</td>
<td>Character Lock</td>
<td>Rationale</td>
</tr>
<tr>
<td>Hook Close-Up</td>
<td>N/A</td>
<td>Character may not appear</td>
</tr>
<tr>
<td>Lifestyle In-Hand</td>
<td>0.93</td>
<td>Full character visible — high lock</td>
</tr>
<tr>
<td>Application</td>
<td>0.93</td>
<td>Character face visible — high lock</td>
</tr>
<tr>
<td>Reaction</td>
<td>0.95</td>
<td>Face is the shot — max lock</td>
</tr>
<tr>
<td>Environmental</td>
<td>0.90</td>
<td>Character further away — medium lock</td>
</tr>
<tr>
<td>CTA Hero</td>
<td>N/A</td>
<td>Product owns the frame</td>
</tr>
</table>
### The Face-Lock Trick
Character sheets with multiple faces (close-up + full body) cause drift. Cut out just the head from the full body shot in any image editor. Save as `CHARACTER_FACE_ONLY.jpg`. Reference the face-only asset in Shot 4 (Reaction) at 0.95 lock strength. This kills the mid-scene face-drift problem.
---
## ⚙️ Step 3 — The Negative Prompt Library
Strip these AI artifacts before they render. Every shot uses the same negative prompt block.
### The 11 Anti-Artifact Anchors
```javascript
Negative prompt (paste into every Seedance call):

"extra fingers, malformed hands, blurred edges,
plastic lighting, uncanny valley eyes,
inconsistent shadows, warped background
geometry, floating objects, wrong perspective,
smooth-brush skin texture, over-saturated colors"
```
### What Each Anchor Kills
<table header-row="true">
<tr>
<td>Anchor</td>
<td>What It Prevents</td>
</tr>
<tr>
<td>extra fingers, malformed hands</td>
<td>6-finger hands, twisted wrists</td>
</tr>
<tr>
<td>blurred edges</td>
<td>Soft product outlines</td>
</tr>
<tr>
<td>plastic lighting</td>
<td>Flat rendered environment look</td>
</tr>
<tr>
<td>uncanny valley eyes</td>
<td>Dead/vacant eye stare</td>
</tr>
<tr>
<td>inconsistent shadows</td>
<td>Multi-directional light artifacts</td>
</tr>
<tr>
<td>warped background geometry</td>
<td>Bent walls, twisted furniture</td>
</tr>
<tr>
<td>floating objects</td>
<td>Product levitating instead of held</td>
</tr>
<tr>
<td>wrong perspective</td>
<td>Table edges bending, room angles off</td>
</tr>
<tr>
<td>smooth-brush skin</td>
<td>Airbrushed AI skin look</td>
</tr>
<tr>
<td>over-saturated colors</td>
<td>Hyper-saturated AI palette</td>
</tr>
</table>
### When to Add Custom Anchors
For specific verticals, add:
→ Skincare: `"acne texture drift, freckle drift"` (locks skin appearance across shots)<br>→ Fitness: `"wrong muscle geometry, distorted athletic gear"`<br>→ Fashion: `"fabric texture drift, incorrect garment structure"`<br>→ Food/Bev: `"unrealistic food texture, warped liquid physics"`
Custom anchors reduce the vertical-specific artifact rate by 60-80%.
---
## ⚙️ Step 4 — The CapCut Assembly Workflow
Take the 6 Seedance outputs, assemble into 1 finished 30-second ad.
### 8-Minute Assembly Protocol
**Minutes 0-1**: Import<br>→ Drag all 6 Seedance MP4s into CapCut timeline in shot order<br>→ Place on video track V1
**Minutes 1-2**: Trim<br>→ Trim Shot 1 to exactly 3 seconds (kill any Seedance intro/outro frames)<br>→ Trim Shot 2 to 5 seconds<br>→ Trim Shot 3 to 7 seconds<br>→ Trim Shot 4 to 7 seconds<br>→ Trim Shot 5 to 5 seconds<br>→ Trim Shot 6 to 3 seconds
**Minutes 2-3**: Cut Style<br>→ Hard cuts between all shots (NO transitions)<br>→ Verify total runtime is 30 seconds
**Minutes 3-4**: Color Grade<br>→ Apply consistent grade across all shots using CapCut's Auto → Vivid or Neutral<br>→ For warm brands: shift toward amber<br>→ For cool brands: shift toward teal<br>→ Match Shot 4 (Reaction) to slightly warmer for emotional peak
**Minutes 4-5**: Audio<br>→ Add background music from CapCut library (or your licensed track)<br>→ Duck volume during reaction shot (Shot 4) for emphasis<br>→ Add subtle SFX per shot: pour sound on Shot 3, satisfied breath on Shot 4
**Minutes 5-6**: Captions<br>→ Add captions using CapCut auto-caption<br>→ Bold sans-serif (TikTok Sans or Inter Bold), white with black stroke<br>→ Bottom-third placement<br>→ Time captions to match dialogue if any
**Minutes 6-7**: CTA Overlay<br>→ Add brand logo + CTA text on Shot 6 (CTA Hero)<br>→ URL / promo code / handle<br>→ Fade in at 27s, hold to 30s
**Minutes 7-8**: Export<br>→ Export: 1080x1920 vertical, 30fps, original quality<br>→ Save as `[PRODUCT]_[SHOT-CONCEPT]_v1.mp4`<br>→ Ready for deploy
Total assembly time: 8 minutes once template is saved. Save your CapCut project as a template for future 6-shot ads.
---
## ⚙️ 6 Ready-to-Run Vertical Templates
Each is a complete brief ready to run through the 1-Photo-to-6-Shots Skill.
### Vertical 1 — Skincare
```javascript
Product: skincare serum bottle photo
Character: woman 25-35, natural morning skin,
  bathroom setting
Setting: bathroom marble counter, natural window
  light
Aesthetic: warm, aspirational, editorial
Primary benefit: [SPECIFIC CLAIM — e.g.
  "reduces redness in 7 days"]

Shot arc:
1. Serum bottle close-up on marble counter
2. Character holds serum with morning skin ritual
3. Application on cheek/chin close-up
4. Post-application reaction, satisfied smile
5. Wide of character in bathroom, morning routine
6. Serum hero + brand + "AVAILABLE IN BIO" CTA

Cost per finished ad: ~$0.90
```
### Vertical 2 — Supplements
```javascript
Product: supplement bottle photo
Character: 30-50, kitchen morning, peer-credible
Setting: modern kitchen, morning window light
Aesthetic: warm, calm, mechanism-forward
Primary benefit: [SPECIFIC — e.g. "focus without
  the crash"]

Shot arc:
1. Bottle close-up on kitchen counter
2. Character holds bottle with morning coffee
3. Capsule pour into palm + water down
4. Post-swallow calm satisfied expression
5. Wide of character starting focused work
6. Bottle hero + brand + "FREE TRIAL" CTA

Cost per finished ad: ~$0.90
```
### Vertical 3 — Fitness
```javascript
Product: fitness product photo (pre-workout,
  gear, wearable)
Character: 22-40 athletic, home gym or outdoor
Setting: home gym gritty lighting or outdoor
  track
Aesthetic: high-contrast, dynamic, defiant
Primary benefit: [SPECIFIC — e.g. "stronger
  final set"]

Shot arc:
1. Product close-up on gym floor / bench
2. Character grabs product mid-workout
3. Product use in action (scoop, wear,
  application)
4. Post-use intensity look, pumped expression
5. Wide of character completing final set
6. Product hero + brand + "USE CODE" CTA

Cost per finished ad: ~$0.90
```
### Vertical 4 — Fashion
```javascript
Product: garment photo (on hanger or flat)
Character: 22-38 style-aware, natural light
Setting: bedroom with mirror or studio
  backdrop
Aesthetic: bright, confident, editorial
Primary benefit: [SPECIFIC — e.g. "the fit
  everyone tags"]

Shot arc:
1. Garment close-up (fabric texture / logo
  detail)
2. Character pulls garment off hanger
3. Try-on close-up (fabric adjusting on body)
4. Mirror-check confident expression
5. Wide of character in garment stepping out
6. Garment hero + brand + "SHOP NOW" CTA

Cost per finished ad: ~$0.90
```
### Vertical 5 — Food / Beverage
```javascript
Product: food or beverage packaging photo
Character: 25-40 foodie, kitchen morning or
  café
Setting: modern kitchen or café, warm light
Aesthetic: warm, delighted, casual
Primary benefit: [SPECIFIC — e.g. "clean
  energy without the jitters"]

Shot arc:
1. Product package close-up on counter
2. Character grabs product to prep
3. Pour / prep / open close-up (product active
  use)
4. First sip / bite satisfied reaction
5. Wide of character enjoying product in
  setting
6. Product hero + brand + "TASTE IT" CTA

Cost per finished ad: ~$0.90
```
### Vertical 6 — Tech / SaaS
```javascript
Product: device product photo or UI screenshot
Character: 28-45 operator/founder, home office
Setting: home office, warm desk light
Aesthetic: peer-to-peer, decisive, quiet
  confidence
Primary benefit: [SPECIFIC — e.g. "saves 4
  hours per week"]

Shot arc:
1. Device / product close-up on desk
2. Character sits down with product / opens app
3. Product in use (typing, clicking, wearing)
4. Post-use relieved smile
5. Wide of character finishing early, closing
  laptop
6. Product hero + brand + "TRY FREE" CTA

Cost per finished ad: ~$0.90
```
---
## ⚙️ Side-By-Side: Traditional DTC Shoot vs 1-Photo System
<table header-row="true">
<tr>
<td>Element</td>
<td>Traditional Shoot</td>
<td>1-Photo-to-6-Shots System</td>
</tr>
<tr>
<td>Cost per finished 30-sec ad</td>
<td>$8,000-$15,000</td>
<td>\\~$0.90-$1.20</td>
</tr>
<tr>
<td>Time to ad-ready</td>
<td>3-5 days</td>
<td>10 minutes</td>
</tr>
<tr>
<td>Iteration cost</td>
<td>Full re-shoot needed</td>
<td>Re-run 1 Claude call + regenerate</td>
</tr>
<tr>
<td>Concept testing volume</td>
<td>1-3 per month</td>
<td>20+ per month</td>
</tr>
<tr>
<td>Character consistency</td>
<td>Human on set</td>
<td>AI locked at 0.93 strength</td>
</tr>
<tr>
<td>Product consistency</td>
<td>Product on set</td>
<td>AI locked at 0.95 strength</td>
</tr>
<tr>
<td>Setting flexibility</td>
<td>Limited to booked location</td>
<td>Any Seedance-generatable setting</td>
</tr>
<tr>
<td>Best for</td>
<td>Hero brand campaigns, premium launches</td>
<td>Test velocity, concept exploration, weekly ad refresh</td>
</tr>
</table>
The mechanism: production overhead collapses into prompt structure + assembly workflow. Trade-off is that AI-generated ads still trail top-tier human production on subtle emotional performance — but they beat mid-tier human production at 1/1000th the cost, which is where 90% of DTC test creative sits.
---
## ⚙️ The Kill-or-Scale Matrix for 1-Photo Ads
Deploy 4-6 ads per batch to Meta + TikTok at $30-$50/day each. Run the matrix at hour 24.
<table header-row="true">
<tr>
<td>Metric</td>
<td>Kill Below</td>
<td>Hold Range</td>
<td>Scale Above</td>
</tr>
<tr>
<td>Hook rate (3-sec view)</td>
<td><32%</td>
<td>32-42%</td>
<td>>42%</td>
</tr>
<tr>
<td>Hold rate (15-sec watch)</td>
<td><13%</td>
<td>13-19%</td>
<td>>19%</td>
</tr>
<tr>
<td>CTR</td>
<td><1.0%</td>
<td>1.0-1.6%</td>
<td>>1.6%</td>
</tr>
<tr>
<td>CPA vs target</td>
<td>>1.4x</td>
<td>1.0-1.4x</td>
<td><1.0x</td>
</tr>
</table>
### The Matrix Prompt
```javascript
Run the kill-or-scale matrix on the 1-photo
batch deployed in the last 24 hours.

Data:
[PASTE: ad name, product shot used, vertical
template, spend, hook rate, hold rate, CTR, CPA]

For each ad return:
1. Decision: KILL / HOLD / SCALE
2. Reason (cite threshold breach)
3. If SCALE: which shot is driving hook rate
   (Shot 1 hook close-up variant?)
4. If KILL: which shot to iterate on (Shot 4
   reaction feels flat? Shot 5 environment
   generic?)

Per-shot performance signal: hook rate ties to
Shot 1, hold rate ties to Shots 2-3, CTR ties
to Shot 6.

No hedging. Decisive calls.
```
---
## ⚙️ The Integration Playbook
The 1-Photo-to-6-Shots System is the **test velocity layer** of your DTC creative stack.
### Where this slots into the broader stack:
<table header-row="true">
<tr>
<td>Layer</td>
<td>Tool</td>
<td>Job</td>
</tr>
<tr>
<td>Reaction UGC (top-funnel)</td>
<td>Claude + Arcads</td>
<td>Scroll-stop front-cam ads</td>
</tr>
<tr>
<td>**1-photo test velocity**</td>
<td>**Claude + Seedance 2.0**</td>
<td>**20+ test concepts per month at \\~$1 each**</td>
</tr>
<tr>
<td>Full narrative product ads</td>
<td>Fable 5 + Higgsfield</td>
<td>Locked-continuity 30-second story ads</td>
</tr>
<tr>
<td>Cinematic brand pillar</td>
<td>One-Take Cinematic System</td>
<td>Hollywood-grade brand opens</td>
</tr>
<tr>
<td>Long-form UGC</td>
<td>AI UGC Factory</td>
<td>High-quality talking-head</td>
</tr>
<tr>
<td>Multi-platform distribution</td>
<td>4-Platform UGC Distribution</td>
<td>Cross-platform reach</td>
</tr>
</table>
The 1-Photo system is what you use to TEST concepts before committing to full production. Run 20 low-cost variations. Identify the 2-3 that scale. Then produce the winners in the full stack (Fable 5 + Higgsfield or cinematic one-take) at higher quality.
### Recommended weekly cadence:
→ Monday: Pick 5-7 product photos + brand briefs, run through 1-Photo-to-6-Shots Skill = 5-7 six-shot sequences<br>→ Monday: Queue 30-42 Seedance generations (5-7 ads × 6 shots each)<br>→ Monday afternoon: CapCut assembly on all 5-7 ads<br>→ Monday evening: Deploy 5-7 test ads to Meta + TikTok<br>→ Wednesday: Hour-24 matrix, kill losers, scale winners<br>→ Wednesday: Run next 5-7 concepts<br>→ Friday: Weekly matrix + move top 2-3 concepts into full production stack
Weekly output: 10-15 test concept ads shipped at total cost of \\~$15. Same output that traditional production could not produce for less than $80K-$150K.
---
## ⚙️ What NOT to Do
→ Don't skip the shot decomposition. 1 long AI clip fails 60-70% of the time. 6 short decomposed shots fail under 15% of the time.
→ Don't use identical prompts across all 6 shots. Each shot has its own framing + intent. Copy-paste is the fastest way to a flat ad.
→ Don't skip the negative prompt library. AI artifacts kill hook rate. Every shot needs the 11 anti-artifact anchors.
→ Don't skip the face-only asset for Shot 4. Multi-face character sheets cause reaction drift.
→ Don't use transitions between shots in CapCut. Hard cuts read as edited ads. Transitions read as amateur.
→ Don't test more than 3 concepts before analyzing hour-24 matrix. Deploying 10 concepts before reading data means you can't isolate what's driving performance.
→ Don't rely on this system for hero brand pillar creative. It's for test velocity, not brand-defining moments. Use the One-Take Cinematic System for those.
→ Don't skip the CapCut template save. First 5 assemblies take 8 minutes each. After that, saving a template drops it to 3-4 minutes.
→ Don't use over-produced captions. TikTok Sans / Inter Bold with black stroke reads native. Fancy fonts read as agency ad.
→ Don't ignore Shot 4 as "just a reaction." Shot 4 is where the emotional projection happens. It's the single highest-value shot in the 6-shot sequence. Iterate on it more than any other.
→ Don't run 1-photo ads without also running full-production ads in parallel. The test velocity system needs the full-production system as its scale destination. Both together = full DTC ad program.
---
## ⚙️ Troubleshooting
<table header-row="true">
<tr>
<td>Problem</td>
<td>Fix</td>
</tr>
<tr>
<td>Product looks different in Shot 2 vs Shot 1</td>
<td>Product lock strength too low. Bump to 0.95.</td>
</tr>
<tr>
<td>Character face drifts between Shots 3 and 4</td>
<td>Face-only asset not used for Shot 4. Cut head from full body, reference in Shot 4 at 0.95.</td>
</tr>
<tr>
<td>Ad feels flat / continuous instead of edited</td>
<td>Using cross-fades or dissolves. Switch to hard cuts.</td>
</tr>
<tr>
<td>Hook rate stays below 32%</td>
<td>Shot 1 too generic. Test 3-4 alternate hook framings (extreme close-up vs slow rotate vs push-in).</td>
</tr>
<tr>
<td>Hold rate collapses at 8-10 seconds</td>
<td>Shot 3 mechanic unclear. Regenerate with more specific application language.</td>
</tr>
<tr>
<td>CTR below 1.0%</td>
<td>Shot 6 CTA missing or off-brand. Add clear brand + URL overlay.</td>
</tr>
<tr>
<td>Captions feel over-produced</td>
<td>Change font to TikTok Sans or Inter Bold, white with black stroke.</td>
</tr>
<tr>
<td>Ad looks obviously AI in first frame</td>
<td>Skipped negative prompts. Re-render with the 11 anti-artifact anchors.</td>
</tr>
<tr>
<td>Motion feels stuttery</td>
<td>Speed cues in prompt too aggressive. Simplify to "smooth" or "natural" motion language.</td>
</tr>
<tr>
<td>Reaction shot lands flat emotionally</td>
<td>Character reference too generic. Use a more emotive reference image.</td>
</tr>
<tr>
<td>Costs exceeding $1 per ad</td>
<td>Using Kling or Runway instead of Seedance. Standardize on Seedance 2.0 Pro for volume production.</td>
</tr>
<tr>
<td>Weekly output below 10 ads</td>
<td>Shot decomposition not yet templated. Save Claude skill outputs + CapCut templates for repeat use.</td>
</tr>
</table>
---
## ⚙️ The Weekly Production Cadence
This is the routine that sustains 10-15 test ads per week.
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
<td>Run 1-Photo-to-6-Shots Skill on 5-7 product briefs</td>
<td>5-7 six-shot prompt sequences</td>
</tr>
<tr>
<td>Monday</td>
<td>9:30-11:00</td>
<td>Queue 30-42 Seedance generations</td>
<td>Renders queued</td>
</tr>
<tr>
<td>Monday</td>
<td>11:00-13:00</td>
<td>Pick up outputs, run CapCut assembly on all</td>
<td>5-7 finished 30-second ads</td>
</tr>
<tr>
<td>Monday</td>
<td>13:00-13:30</td>
<td>Distribute across Meta + TikTok</td>
<td>Live</td>
</tr>
<tr>
<td>Tuesday</td>
<td>onwards</td>
<td>Data accumulates</td>
<td>Performance signals</td>
</tr>
<tr>
<td>Wednesday</td>
<td>9:00-9:30</td>
<td>Hour-24 matrix on Monday batch</td>
<td>Winners identified</td>
</tr>
<tr>
<td>Wednesday</td>
<td>10:00-13:00</td>
<td>Run next 5-7 briefs end-to-end</td>
<td>Next batch live</td>
</tr>
<tr>
<td>Thursday</td>
<td>onwards</td>
<td>Data accumulates</td>
<td>Signals</td>
</tr>
<tr>
<td>Friday</td>
<td>9:00-9:30</td>
<td>Weekly matrix + move winners to full production</td>
<td>Strategy locked</td>
</tr>
</table>
Weekly output: 10-15 test-velocity ads at total cost of \\~$15.
---
## 🎯 Closer
**Build the 1-Photo-to-6-Shots skill in Claude Fable 5 Projects using the custom instructions above. Pick a hero product. Upload the product photo to a public URL (Cloudflare R2, S3, or Imgur for testing). Paste the brief into the skill. Get back 6 Seedance-ready scene prompts. Queue all 6 renders in Seedance 2.0 Pro. Pick up outputs in under 2 minutes. Assemble in CapCut using the 8-minute template. Add captions + CTA overlay. Deploy 4-6 concepts to Meta + TikTok at $30-$50/day each. Run the hour-24 matrix. By end of week 1 you'll have 10-15 test ads shipped for under $15 total. By end of month 1 you'll know which 2-3 concepts to escalate into full-production Fable 5 or Cinematic system runs. By end of quarter 1 you'll be testing more DTC ad concepts per month than most brands test in a full year.**
The production-overhead bottleneck was the constraint.
Decomposing 1 photo into 6 shot beats via Claude + Seedance is what fixes it.
---
**The Claude skill + 6-shot structure + identity lock protocol + negative prompt library + 6 vertical templates + CapCut assembly + matrix is the full system. Bookmark this guide. Run it weekly.**
---
