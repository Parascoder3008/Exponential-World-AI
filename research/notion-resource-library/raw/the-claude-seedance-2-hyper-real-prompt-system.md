---
title: "The Claude + Seedance 2 Hyper-Real Prompt System"
page_id: 37492e2e92e9800f86d3fe97ed7b7f46
layer: production
source: https://freebie-for-you.notion.site/37492e2e92e9800f86d3fe97ed7b7f46
---
# The Claude + Seedance 2 Hyper-Real Prompt System: 9 Realism Anchors That Make AI Footage Indistinguishable from Real Cinematography
---
## 🎯 What You're Getting
The exact Claude prompt scaffolding that turns Seedance 2 into a hyper-realism machine. No storyboard images. No multi-tool pipeline. No SaaS subscription. Just Claude — set up as your Seedance prompt engineer. Brief Claude in 60 seconds. Claude generates the full Seedance prompt with all 9 realism anchors baked in (skin pores, micro-expression timing, handheld physics, lighting direction, motion physics, lipsync, asymmetries, aesthetic details, narrative pacing). Paste into Seedance. Output reads as real cinematography.
The master Claude prompt scaffolding (paste-ready). The 9 realism anchors with what-each-locks reference. 6 vertical-specific Claude prompt templates. The 60-second brief format that gets Claude generating production-ready Seedance prompts on the first try.
You stop writing Seedance prompts in Google-search style. You stop generating "nice-looking AI footage" that flatlines on hook rate. You stop iterating 8-12 generations to get something usable. You open Claude, drop your brief, get back a hyper-real Seedance prompt in 60 seconds, paste, run, ship.
By the end of this guide, you'll have:
→ The master Claude prompt scaffolding for Seedance hyper-realism<br>→ The 9 realism anchors with detailed direction language for each<br>→ 6 vertical-specific Claude prompt templates (skincare, supplements, fitness, fashion, food/bev, SaaS)<br>→ The 60-second brief format that triggers Claude's prompt generation<br>→ The Seedance constraint library (what to tell the model NOT to do)<br>→ The 9-point QC check before deploy<br>→ The integration playbook for slotting this into your existing creative stack<br>→ The daily production cadence shipping 4-6 hyper-real Seedance ads per morning
If you're already running Maxfusion storyboards, Higgsfield Supercomputer, or Arcads UGC, this is the **prompt-engineering layer** that makes any Seedance generation hit hyper-realism without storyboards or full agent pipelines. Faster than the 5-step subagent loop. Lighter than the storyboard one-shot. The fastest way to ship a single hyper-real Seedance clip.
---
## ⚙️ The Hidden Mechanism — Why Claude as Prompt Layer Beats Direct Seedance Prompting
Every standard Seedance workflow has the same broken loop:
1. Operator writes a Seedance prompt in plain English
2. The prompt covers maybe 2-3 of the 9 realism anchors
3. Seedance fills the gaps with its training-average defaults: smooth skin, neutral lighting, tripod-locked motion
4. Output reads "AI" within the first 0.3 seconds because the AI-perfection defaults all fire at once
5. Operator iterates the prompt, adds more direction, re-runs
6. By generation 8-12, the prompt is a wall of text Seedance still can't parse cleanly
The model isn't bad at any single realism anchor. It's bad at **noticing it should include an anchor** when you don't explicitly request it.
The Claude-as-prompt-engineer fix is structural: Claude knows the 9 realism anchors by heart. You give Claude a 60-second brief in plain language. Claude turns the brief into a Seedance prompt with all 9 anchors layered in automatically — skin pores reinforced 3x, handheld camera physics specified, micro-expressions sequenced, lipsync direction included, etc.
Claude is a better prompt engineer than you because Claude can hold all 9 anchors in attention at once. You can hold 2-3 at most.
The fix is not better Seedance prompts. The fix is **letting Claude write the Seedance prompts for you** — the thing that gets every anchor included on the first try.
---
## ⚙️ The 9 Realism Anchors
Every Seedance generation that gets flagged as "AI" misses at least 3 of these. Hit all 9 and the viewer's brain registers "real person on camera."
<table header-row="true">
<tr>
<td>#</td>
<td>Anchor</td>
<td>What Claude Reinforces in the Prompt</td>
</tr>
<tr>
<td>1</td>
<td>Skin pores + micro-imperfections</td>
<td>"Visible pores, natural skin texture, tiny stray hairs at hairline, no AI smoothing" — repeated 3x</td>
</tr>
<tr>
<td>2</td>
<td>Handheld iPhone camera physics</td>
<td>"Slight handheld wobble, autofocus breathing, 1-2 pixel vertical sway, imperfect framing"</td>
</tr>
<tr>
<td>3</td>
<td>Natural micro-expression timing</td>
<td>"Genuine blinks at 2s + 6s + 11s, subtle head tilt every 3-4s, micro-smile mid-sentence"</td>
</tr>
<tr>
<td>4</td>
<td>Realistic lighting direction</td>
<td>"Soft natural window light from camera right, real shadows that move with subject, gentle eye reflections"</td>
</tr>
<tr>
<td>5</td>
<td>Physics-accurate motion + product interaction</td>
<td>"Natural finger grip on product, real weight in hand, slight wrist tension, fabric folds, hair sway"</td>
</tr>
<tr>
<td>6</td>
<td>Frame-perfect lipsync + natural voice</td>
<td>"Realistic mouth shapes per phoneme, filler words ('um', 'like', 'honestly'), mid-sentence trails, breath intake"</td>
</tr>
<tr>
<td>7</td>
<td>Subtle human asymmetries</td>
<td>"Natural smile (not frozen), micro-expression shifts, genuine eye contact (not dead-eye stare)"</td>
</tr>
<tr>
<td>8</td>
<td>Authentic UGC aesthetic</td>
<td>"Subtle digital noise, shallow DOF, warm color grade, iPhone screenshot quality"</td>
</tr>
<tr>
<td>9</td>
<td>Strong narrative pacing</td>
<td>"Hook (0-3s) → problem (3-7s) → demo (7-12s) → result/CTA (12-15s), real emotional energy"</td>
</tr>
</table>
Claude's job: include explicit direction for all 9 anchors in every Seedance prompt it writes. Your job: brief Claude in 60 seconds.
---
## ⚙️ The Stack
<table header-row="true">
<tr>
<td>Layer</td>
<td>Tool</td>
<td>Job</td>
</tr>
<tr>
<td>Prompt engineering</td>
<td>Claude (Opus 4.7 recommended)</td>
<td>Takes your 60-second brief, writes the full Seedance prompt with all 9 anchors</td>
</tr>
<tr>
<td>Video generation</td>
<td>Seedance 2</td>
<td>Executes the Claude-engineered prompt, generates the 15-second hyper-real clip</td>
</tr>
<tr>
<td>Polish</td>
<td>CapCut / Filmora</td>
<td>Color grade, music, light grain, aspect ratio exports</td>
</tr>
<tr>
<td>Brand assets</td>
<td>Product image + character reference</td>
<td>Locked references fed to Seedance</td>
</tr>
<tr>
<td>Deploy</td>
<td>Meta + YouTube + TikTok</td>
<td>Platform-native 15-second hyper-real ad</td>
</tr>
</table>
Claude + Seedance is the 2-tool core. Everything else is polish + deploy.
---
## ⚙️ The Workflow Math
Traditional Seedance workflow without Claude scaffolding: 60-120 minutes per shippable clip (multiple iterations, prompt rewrites, generation cycles). 6-12 generations per ad.
This system: 60-second brief into Claude. 30-second Claude prompt generation. 1 Seedance generation (4-6 minutes). 5-minute CapCut polish. Total: 15-20 minutes per ad.
The leverage shift: you stop being a Seedance prompt engineer and start being a Seedance director. The bottleneck moves from prompt iteration to creative direction (which the 6 vertical templates fix).
---
## ⚙️ Step 1 — Set Up Claude as Your Seedance Prompt Engineer
Open Claude. Create a new Project (Claude Pro feature) named "[Brand] Seedance Prompt Engineer." Paste the master Claude scaffolding (Section 7) into the Project instructions.
Load brand context into Project knowledge:<br>→ Brand voice samples<br>→ ICP profile<br>→ Product image references<br>→ Prior winning ad scripts<br>→ Brand tone constraints
Every prompt Claude writes from here pulls from this memory. Output stays on-brand.
---
## ⚙️ Step 2 — Provide the 60-Second Brief
Start a fresh chat in the Project. Drop a brief in this format (60 seconds to write):
```plain text
PRODUCT: [PRODUCT NAME]
VERTICAL: [skincare / supplements / fitness /
fashion / food-bev / SaaS]
HOOK ANGLE: [ingredient education / 30-day
result / founder story / peer comparison / etc.]
ACTOR ARCHETYPE: [age range, gender, vibe —
e.g. woman 28-35, casual chic, warm vibe]
SETTING: [bathroom morning / kitchen counter /
home gym / bedroom / etc.]
SCRIPT (15 seconds, casual tone with filler
words): "[FULL SCRIPT]"
SPECIAL DIRECTION (optional): [anything else
the model should know]
```
That's it. Claude has everything it needs to write the full Seedance prompt.
---
## ⚙️ Step 3 — Claude Generates the Seedance Prompt
Claude runs the master scaffolding (Section 7) on your brief. Output: 1 paste-ready Seedance prompt with all 9 realism anchors layered in.
Read the prompt before pasting. Tweak anything that feels off. Don't burn Seedance credits on prompts you haven't reviewed.
Generation time: 30-60 seconds for Claude to write.
---
## ⚙️ Step 4 — Run in Seedance 2
Open Seedance 2 (inside any platform that supports it — Higgsfield, Maxfusion, Arcads, MakeUGC, direct API).
Upload character + product reference images. Paste the Claude-engineered prompt. Set output: 9:16 vertical, 15 seconds, 4K. Hit generate.
Generation time: 4-6 minutes for the 15-second clip.
---
## ⚙️ Step 5 — Polish in CapCut
Export from Seedance. Drop into CapCut for the 5-minute polish.
<table header-row="true">
<tr>
<td>Polish Step</td>
<td>What To Do</td>
</tr>
<tr>
<td>Subtle handheld shake</td>
<td>Add 1-2% horizontal + vertical shake throughout</td>
</tr>
<tr>
<td>Film grain overlay</td>
<td>Light grain at 5-10% opacity</td>
</tr>
<tr>
<td>Warm iPhone color grade</td>
<td>Slight orange/yellow lift in highlights, cool shadows</td>
</tr>
<tr>
<td>Trending audio (optional)</td>
<td>Layer trending sound at -18dB under dialogue</td>
</tr>
<tr>
<td>Text overlays (optional)</td>
<td>Captions in platform-native font + style</td>
</tr>
<tr>
<td>Export</td>
<td>9:16 vertical for Reels/TikTok, 1:1 square for Meta feed</td>
</tr>
</table>
Total polish: 3-5 minutes. Output: 2-3 platform-ready cuts.
---
## ⚙️ The Master Claude Prompt Scaffolding
Paste this into your Claude Project instructions.
```javascript
You are the Seedance 2 Prompt Engineer for
[BRAND NAME].

Your job: take a 60-second brief from the
operator and write a paste-ready Seedance 2
prompt with all 9 realism anchors explicitly
included.

The 9 realism anchors (NON-NEGOTIABLE — every
prompt you write must include explicit direction
for all 9):

1. Skin pores + micro-imperfections
   - Reinforce "visible pores, natural skin
     texture, tiny stray hairs, no AI smoothing"
   - Repeat the anchor language 3x throughout
     the prompt

2. Handheld iPhone camera physics
   - "Slight handheld wobble, autofocus
     breathing, 1-2 pixel vertical sway,
     imperfect framing, not tripod-locked"

3. Natural micro-expression timing
   - "Genuine blinks at 2s + 6s + 11s, subtle
     head tilt every 3-4 seconds, micro-smile
     mid-sentence, brief glance away at 8s"

4. Realistic lighting direction
   - "Soft natural [WINDOW/DAYLIGHT/GOLDEN HOUR]
     light from [CAMERA LEFT/RIGHT], real
     shadows that move with subject, gentle eye
     reflections, no flat studio lighting"

5. Physics-accurate motion + product interaction
   - "Natural finger grip on product, real
     weight in hand, slight wrist tension,
     fabric folds, hair sway, breathing visible
     in shoulders"

6. Frame-perfect lipsync + natural voice
   - "Realistic mouth shapes per phoneme, filler
     words ('um', 'like', 'honestly', 'okay so'),
     mid-sentence trails, breath intake before
     key lines, natural pauses"

7. Subtle human asymmetries
   - "Natural smile (not frozen), micro-
     expression shifts every 2-3s, genuine eye
     contact (not dead-eye stare), slight head
     asymmetry"

8. Authentic UGC aesthetic
   - "Subtle digital noise, shallow depth of
     field with background slightly blurred,
     warm color grade, iPhone screenshot quality"

9. Strong narrative pacing
   - Map the script to a 15-second arc:
     - 0-3s: hook
     - 3-7s: problem or angle
     - 7-12s: demo or proof
     - 12-15s: result or CTA
   - "Real emotional energy throughout, no
     robotic delivery"

Brief input format (operator provides):
- PRODUCT: [name]
- VERTICAL: [vertical]
- HOOK ANGLE: [angle]
- ACTOR ARCHETYPE: [description]
- SETTING: [location]
- SCRIPT: [15-second dialogue]
- SPECIAL DIRECTION: [optional]

Your output format (paste-ready Seedance 2
prompt):

@[character ref] + @[product ref]

[0-3s]
[Scene setup with character + product
positioning. Include anchor 1 (skin), anchor 2
(camera physics), anchor 4 (lighting), anchor 7
(asymmetries).]

Dialogue: "[HOOK LINE FROM SCRIPT]"

[3-7s]
[Quick natural cut. Include action with product
that demonstrates anchor 5 (physics).
Reinforce anchor 1 (skin) and anchor 2 (camera
physics).]

Dialogue: "[PROBLEM LINE FROM SCRIPT]"

[7-12s]
[Demo or proof beat. Include anchor 3 (micro-
expressions), anchor 5 (motion), anchor 7
(asymmetries).]

Dialogue: "[DEMO LINE FROM SCRIPT]"

[12-15s]
[Result/CTA. Include final hero moment.
Reinforce all anchors. End with brand-aligned
energy.]

Dialogue: "[CTA LINE FROM SCRIPT]"

Constraints:
- Maintain exact appearance from @character
  reference, no drift, no deformation
- Maintain exact product appearance from
  @product reference
- Avoid jitter, avoid bent limbs
- Face stable, natural smooth movement
- Stable picture throughout
- Output: 4K, 9:16 vertical, 15 seconds

No camera gear visible. No drone visible. No
text overlays during the video.

ANTI-AI-DEFAULT PROTOCOL:
Every time you write a prompt, reinforce the
following 3x:
- "Visible skin pores, natural texture, no AI
  smoothing"
- "Handheld iPhone camera physics, slight
  wobble, autofocus breathing"
- "Realistic mouth shapes with filler words
  and natural pauses"

Final realism check before delivering output:
- Are all 9 anchors explicitly present in the
  prompt? Confirm yes/no for each.
- If any anchor is missing or weak, rewrite the
  prompt with that anchor reinforced.
- Flag any AI-perfection defaults you noticed.

Output the final Seedance prompt + the realism
check confirmation.
```
---
## ⚙️ 6 Vertical-Specific Claude Prompt Templates
Each template is a vertical-specific bracket-fill for the brief input. Drop into your Claude Project chat.
### Vertical 1 — Skincare / Beauty
```javascript
PRODUCT: [SKINCARE PRODUCT]
VERTICAL: skincare
HOOK ANGLE: ingredient education + 30-day result
ACTOR ARCHETYPE: woman 28-40, natural glow,
warm chestnut hair, soft natural makeup
SETTING: bathroom morning, marble counter, soft
window light from camera right
SCRIPT: "Okay so my skin's been so dry lately...
this [PRODUCT] with [INGREDIENT] literally
changed everything in 30 days. Now my skin feels
calm, plump, no dryness. If you have sensitive
skin, you need this."
SPECIAL DIRECTION: emphasize visible pores on
cheeks, natural morning skin texture, no heavy
makeup, fingertip application motion
```
### Vertical 2 — Supplements / Wellness
```javascript
PRODUCT: [SUPPLEMENT PRODUCT]
VERTICAL: supplements
HOOK ANGLE: 30-day energy result + ingredient
mechanism
ACTOR ARCHETYPE: man 35-45, peer-credible,
neatly trimmed beard, casual professional,
warm vibe
SETTING: kitchen morning, light wood counter,
warm morning sunlight from window left
SCRIPT: "Honestly the energy crash thing was
killing me. Started taking [PRODUCT] 30 days
ago — [INGREDIENT] works on [MECHANISM]. Now my
mornings actually start strong. Game-changer."
SPECIAL DIRECTION: hold product at chest level
with coffee or water visible in scene, calm
confident delivery, peer-to-peer tone
```
### Vertical 3 — Fitness / Athletic
```javascript
PRODUCT: [FITNESS PRODUCT]
VERTICAL: fitness
HOOK ANGLE: performance metric + recovery speed
ACTOR ARCHETYPE: woman 25-35, athletic build,
high ponytail with flyaways, light tan skin,
workout sheen
SETTING: home gym post-workout, dumbbells in
soft background, daylight from large window
SCRIPT: "My recovery was trash. Then I started
using [PRODUCT] post-training. Dropped my
soreness by half. Hit a new PR last week. The
difference is real."
SPECIAL DIRECTION: visible sweat sheen on
forehead and neck, natural workout flush,
focused intense delivery, product held at chest
mid-grip
```
### Vertical 4 — Fashion
```javascript
PRODUCT: [FASHION PIECE]
VERTICAL: fashion
HOOK ANGLE: outfit recipe + occasion fit
ACTOR ARCHETYPE: woman 25-35, style-aware,
honey-blonde with natural waves, sun-kissed
glow, soft natural makeup
SETTING: bedroom golden hour, full-length mirror,
warm afternoon light from window right
SCRIPT: "Okay this [GARMENT] is everything. I
got it for [OCCASION] and now I wear it like
twice a week. Pairs with literally anything.
The fit is unreal."
SPECIAL DIRECTION: outfit reveal moment at 7s,
mirror check pose, fabric drape visible,
confident styling
```
### Vertical 5 — Food / Beverage
```javascript
PRODUCT: [FOOD/BEV PRODUCT]
VERTICAL: food-bev
HOOK ANGLE: taste reaction + daily ritual
ACTOR ARCHETYPE: woman 28-38, foodie warm,
long dark wavy hair, casual cropped sweater,
golden hour glow
SETTING: kitchen counter golden hour, fruit
bowl in soft background, warm light from window
left
SCRIPT: "I'm obsessed with [PRODUCT]. The
[INGREDIENT/FLAVOR] thing is just... it's good.
I'm having one literally every morning now.
Best part of the day."
SPECIAL DIRECTION: mid-sip pose at 7s with
taste reaction expression, natural delight,
hold product at chin level
```
### Vertical 6 — SaaS / Tech
```javascript
PRODUCT: [SAAS PRODUCT]
VERTICAL: saas
HOOK ANGLE: operator pain + time saved
ACTOR ARCHETYPE: man 32-42, founder-archetype,
neat short hair, light olive skin, fitted navy
tee, home office vibe
SETTING: home office, laptop open with UI
visible, neutral daylight from window
SCRIPT: "[OPERATIONAL TASK] used to eat my
entire morning. Started using [PRODUCT]
last month. Now it takes me 10 minutes.
Honestly, every founder needs this."
SPECIAL DIRECTION: hold phone or laptop with
UI screen visible at chest level, direct
confident eye contact, peer-to-peer tone
```
---
## ⚙️ Side-By-Side: Direct Seedance vs Claude-Engineered Prompts
<table header-row="true">
<tr>
<td>Element</td>
<td>Direct Seedance Prompt</td>
<td>Claude-Engineered Prompt</td>
</tr>
<tr>
<td>Realism anchors included</td>
<td>2-3 typically</td>
<td>9 (all explicitly)</td>
</tr>
<tr>
<td>Skin texture direction</td>
<td>Implicit</td>
<td>Reinforced 3x</td>
</tr>
<tr>
<td>Camera physics direction</td>
<td>Often missing</td>
<td>Always included with specific specs</td>
</tr>
<tr>
<td>Lipsync direction</td>
<td>Generic</td>
<td>Phoneme-level with filler words</td>
</tr>
<tr>
<td>Micro-expression timing</td>
<td>Not specified</td>
<td>Sequenced (2s, 6s, 11s blinks, etc.)</td>
</tr>
<tr>
<td>Generations per shippable clip</td>
<td>6-12</td>
<td>1-2</td>
</tr>
<tr>
<td>Time per ad</td>
<td>60-120 min</td>
<td>15-20 min</td>
</tr>
<tr>
<td>Hit rate on first try</td>
<td>20-30%</td>
<td>80-90%</td>
</tr>
</table>
The mechanism: Claude reinforces every anchor with explicit direction. Seedance can't skip an anchor it's been told to include. Output stays consistent across runs.
---
## ⚙️ The Kill-or-Scale Matrix (Hour 24)
Deploy 4-6 Claude-engineered Seedance variations to Meta at $30/day each. Run the matrix at hour 24.
<table header-row="true">
<tr>
<td>Metric</td>
<td>Kill Below</td>
<td>Hold Range</td>
<td>Scale Above</td>
</tr>
<tr>
<td>Hook rate (3-sec view)</td>
<td>32%</td>
<td>32-42%</td>
<td>42%</td>
</tr>
<tr>
<td>Hold rate (15-sec watch)</td>
<td>12%</td>
<td>12-20%</td>
<td>20%</td>
</tr>
<tr>
<td>CTR</td>
<td>1.0%</td>
<td>1.0-1.7%</td>
<td>1.7%</td>
</tr>
<tr>
<td>CPA vs target</td>
<td>1.4x target</td>
<td>1.0-1.4x</td>
<td>Below target</td>
</tr>
</table>
### The Matrix Prompt (paste back into Claude):
```javascript
Run the kill-or-scale matrix on the Seedance
hyper-real batch from the last 24 hours.

Data:
[PASTE: ad name, vertical, hook angle, spend,
hook rate, hold rate, CTR, CPA, ROAS]

For each ad return:
1. Decision: KILL / HOLD / SCALE
2. Reason (cite the specific threshold breach)
3. If SCALE: which vertical template + which
   hook angle is winning
4. If KILL: which surviving prompt to clone
   for the replacement (preserve the winning
   anchor combination, vary the script)

Pattern recognition: which realism anchor
combinations are landing? Which actor archetype
is performing? Update next batch with the
winning patterns.

No hedging. Decisive calls.
```
---
## ⚙️ The Integration Playbook
The Claude + Seedance hyper-real system is the **fastest creative format** in your stack. Use it for volume + speed. Use heavier formats (storyboards, full pipelines) for premium pieces.
### Recommended weekly rotation:
→ 40% Claude + Seedance hyper-real (this system — fastest, daily volume)<br>→ 25% Maxfusion storyboard one-shot (cinematic ritual ads)<br>→ 20% Higgsfield Supercomputer autonomous campaigns (full-funnel)<br>→ 10% 15-Panel Pitch Deck cinematics (premium brand pieces)<br>→ 5% Static product hero shots
Why this split: Claude + Seedance hyper-real is the lightest workflow — 1 brief, 1 prompt, 1 generation. Use it for daily ad volume. Heavier formats earn their place when the ad needs more than the 9 anchors.
### Weekly cadence:
<table header-row="true">
<tr>
<td>Day</td>
<td>Action</td>
</tr>
<tr>
<td>Monday 9am</td>
<td>Drop 4 briefs into Claude, get 4 Seedance prompts</td>
</tr>
<tr>
<td>Monday 9:30am</td>
<td>Run 4 Seedance generations in parallel</td>
</tr>
<tr>
<td>Monday 10am</td>
<td>CapCut polish, export 2-3 aspect ratios per ad</td>
</tr>
<tr>
<td>Monday 10:30am</td>
<td>Deploy 4 ads to Meta at $30/day each</td>
</tr>
<tr>
<td>Tuesday 9am</td>
<td>Hour-24 matrix on Monday batch</td>
</tr>
<tr>
<td>Tuesday 10am</td>
<td>Scale winners, kill losers, drop 4 new briefs</td>
</tr>
<tr>
<td>Wednesday 9am</td>
<td>New batch — different verticals</td>
</tr>
<tr>
<td>Friday 9am</td>
<td>Weekly recap + winning anchor combinations</td>
</tr>
</table>
Output: 16-24 Seedance hyper-real ads tested per week.
---
## ⚙️ What NOT to Do
→ Don't skip the Claude scaffolding. Writing Seedance prompts manually means missing 5-7 anchors per prompt.
→ Don't reuse the same brief verbatim across days. Vary the hook angle, actor archetype, setting. Claude will still write a fresh prompt each time.
→ Don't paste Claude's output without reading it. Quick review catches anything off-brand before burning Seedance credits.
→ Don't generate without character + product reference images. Identity locks need real reference data.
→ Don't run Seedance without a character reference image. The anchors describe behavior — the reference locks identity.
→ Don't expect 100% realism on the first generation. The 80-90% hit rate means 1-2 of every 10 generations needs a regenerate. Budget for it.
→ Don't ignore the final realism check Claude runs. If Claude flags a weak anchor, regenerate the prompt with that anchor reinforced.
→ Don't use this system for storyboard cinematics. Use Maxfusion storyboard one-shot or 15-panel pitch deck for those.
→ Don't load multiple brands into 1 Claude Project. Each brand needs its own project with its own memory.
→ Don't update the Project memory mid-batch. Lock the brand context before the week's prompts.
→ Don't deploy without the 9-point QC check on the Seedance output. Watch the clip back, confirm each anchor rendered correctly.
---
## ⚙️ Troubleshooting
<table header-row="true">
<tr>
<td>Problem</td>
<td>Fix</td>
</tr>
<tr>
<td>Output still looks "AI smooth"</td>
<td>Anchor 1 wasn't reinforced enough. Add "visible skin pores, natural texture, no AI smoothing" 5x in the prompt instead of 3x.</td>
</tr>
<tr>
<td>Camera motion looks tripod-locked</td>
<td>Anchor 2 weak. Reinforce "handheld iPhone wobble, autofocus breathing, 1-2 pixel sway" 2x.</td>
</tr>
<tr>
<td>Lipsync feels robotic</td>
<td>Anchor 6 weak. Reinforce "filler words, mid-sentence trails, breath intake, natural pauses" in the audio direction block.</td>
</tr>
<tr>
<td>Character identity drifts</td>
<td>Character reference fidelity too low. Re-upload at higher resolution. Lock identity strength to 0.9+.</td>
</tr>
<tr>
<td>Product gets distorted mid-clip</td>
<td>Product reference fidelity too low. Re-upload at higher resolution. Lock product identity 0.9+.</td>
</tr>
<tr>
<td>Eye contact looks dead-stare</td>
<td>Anchor 7 weak. Reinforce "genuine eye contact, micro-expression shifts every 2-3s, slight head asymmetry."</td>
</tr>
<tr>
<td>Skin looks plastic / glassy</td>
<td>Combine anchor 1 + anchor 8 reinforcement. Add "subtle digital noise overlay, iPhone screenshot quality."</td>
</tr>
<tr>
<td>Claude writes generic prompts</td>
<td>Project memory too thin. Add 3-5 paragraphs of brand voice samples + 3-5 prior winning scripts.</td>
</tr>
<tr>
<td>Output too long (>15s)</td>
<td>Reduce script word count. 45-60 words is the cap for 15s at natural pace.</td>
</tr>
<tr>
<td>Output too short (<15s)</td>
<td>Add 1-2 filler beats to script (laugh, "you know", "honestly").</td>
</tr>
<tr>
<td>Claude misses an anchor</td>
<td>Claude scaffolding might've been stripped. Re-paste the full scaffolding into the Project instructions.</td>
</tr>
</table>
---
## ⚙️ The Daily Production Cadence
This is the routine that ships 4-6 hyper-real Seedance ads per morning.
<table header-row="true">
<tr>
<td>Time</td>
<td>Task</td>
<td>Output</td>
</tr>
<tr>
<td>9:00-9:04</td>
<td>Write 4 briefs in 60 seconds each</td>
<td>4 briefs ready</td>
</tr>
<tr>
<td>9:04-9:10</td>
<td>Drop briefs into Claude, get 4 Seedance prompts</td>
<td>4 Seedance prompts</td>
</tr>
<tr>
<td>9:10-9:35</td>
<td>Run 4 Seedance generations in parallel</td>
<td>4 hyper-real clips</td>
</tr>
<tr>
<td>9:35-9:45</td>
<td>9-point QC check on each clip</td>
<td>4 approved clips</td>
</tr>
<tr>
<td>9:45-9:55</td>
<td>CapCut polish, export 2-3 aspect ratios</td>
<td>8-12 platform cuts</td>
</tr>
<tr>
<td>9:55-10:00</td>
<td>Deploy to Meta at $30/day each</td>
<td>Live test</td>
</tr>
<tr>
<td>Next morning 9am</td>
<td>Matrix at hour 24</td>
<td>Top winners scaled</td>
</tr>
</table>
Repeat 3-5x/week. 12-24 Claude-engineered Seedance ads tested per week.
---
## 🎯 Closer
**Open Claude. Create a Project named "[Brand] Seedance Prompt Engineer." Paste the master scaffolding into Project instructions. Load brand voice + ICP + product image into Project knowledge. Drop a 60-second brief into a fresh chat. Get back the Seedance prompt in 30-60 seconds. Paste into Seedance 2. Run. Polish in CapCut. Deploy. By end of week 1 you'll have 12-24 hyper-real Seedance ads in your library. By end of month 1 you'll have replaced the multi-iteration Seedance workflow with a 15-minute Claude-engineered routine.**
The plain-English Seedance prompt was the bottleneck.
Claude as your Seedance prompt engineer is what fixes it.
---
**The master Claude scaffolding + 9 realism anchors + 6 vertical templates + brief input format + Seedance constraint library is the full system. Bookmark this guide. Run it daily.**
---
