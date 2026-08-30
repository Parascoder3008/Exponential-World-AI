---
title: "The Pixar-Style Brand Story Ad System: GPT Image 2 + Seedance 2.0"
page_id: 35a92e2e92e9810da53ef11ec8648229
layer: production
source: https://freebie-for-you.notion.site/35a92e2e92e9810da53ef11ec8648229
---
## 🎯 What You're Getting
A complete Pixar-style brand story ad workflow that produces $20K-quality 3D animated brand stories for $3 per ad.
2 tools. 2 master prompts. 8 vertical-specific story templates. 18 Pixar-style brand stories per week.
This is the system replacing $20K-$50K 3D animation studio bookings, custom illustration commissions, and 6-week delivery cycles. You don't book a 3D studio. You don't commission illustrators. You don't manage rendering pipelines.
You write an 8-shot story. Generate a Pixar-style infographic storyboard in GPT Image 2. Feed it into Seedance 2.0 with the shot sequence. Ship a 12-second 3D-stylized brand story to Reels, TikTok, Pinterest, and Instagram Feed by lunch.
By the end of this guide, you'll have:
→ The full Pixar Storyboard Infographic master prompt verbatim<br>→ The 8-shot story breakdown format<br>→ The Seedance 2.0 Pixar animation prompt with all constraints<br>→ 8 ready-to-run vertical story templates (cafe, food, kids, wellness, pet, lifestyle, restaurant, wholesome service)<br>→ The Pixar camera language library (8 specific camera moves)<br>→ 6 Pixar color palette templates per brand vibe<br>→ 5 Pixar style variant templates (warm cafe, cool tech, food origin, kids playful, wellness calm)<br>→ 3 ready-to-install skill recipes<br>→ The full Barista worked walkthrough (start to finished video)
If you've already installed the systems from prior Estefania resources (Morphic Workflows or the Claude + Higgsfield Creative Agency), this slots in as the Pixar-style aesthetic layer above your other ad formats — branded narrative content that hits saves and shares.
---
## ⚙️ The Stack
<table header-row="true">
<tr>
<td>Layer</td>
<td>Tool</td>
<td>Job</td>
</tr>
<tr>
<td>Direction</td>
<td>8-shot story breakdown (you write)</td>
<td>Defines the action, character, and brand reveal arc</td>
</tr>
<tr>
<td>Storyboard</td>
<td>GPT Image 2</td>
<td>Generates the Pixar-style infographic storyboard with all 8 panels in 1 image</td>
</tr>
<tr>
<td>Verification</td>
<td>Manual review or Claude</td>
<td>Catches character drift, sequence mistakes, palette inconsistencies</td>
</tr>
<tr>
<td>Execution</td>
<td>Seedance 2.0</td>
<td>Produces the final 12-second Pixar-style animated brand story</td>
</tr>
<tr>
<td>Post</td>
<td>CapCut</td>
<td>Sound layer, scene reversal fix, final export</td>
</tr>
</table>
The unlock is the storyboard infographic. Most operators try to prompt Seedance directly for Pixar-style ads and get inconsistent characters across cuts, drifted palettes, and chaotic shot transitions. The infographic locks: character identity, wardrobe, environment, color palette, lighting, and shot-by-shot action. Seedance just animates what's already locked.
---
## ⚙️ The Workflow Math
Traditional 3D animation production: $15K-$50K per spot for a Pixar-style brand story. $80K-$200K for a full premium 3D commercial. Add 4-8 weeks of preproduction, character design, environment modeling, lighting setup, rendering passes, and post.
This system: $3 per finished Pixar-style ad. 15-20 minutes per ad. Total for 18 ads/week: $54-$60 in API + Seedance costs. Total monthly: \\~$220 vs. quarterly $20K-$80K animation budget.
The leverage shift: you stop booking animation studios. You start running a director's brain through GPT Image 2 + Seedance. The bottleneck moves from rendering capacity to writing the right 8-shot story (which the templates below fix).
---
## Step 1 — The Story Breakdown (Write This First)
Before any image generation, write your 8-shot story. Each shot is approximately 1.5 seconds. Total runtime: 12-15 seconds. The structure mirrors Pixar short film pacing — setup, build, payoff.
### The story breakdown format:
```javascript
story = [BRAND OR CONCEPT NAME]
runtime = 12-15 seconds
total shots = 8
pacing = ~1.5 seconds per shot

Character: [CONSISTENT CHARACTER DESCRIPTION — e.g.,
"young energetic barista in green apron"]
Setting: [LOCKED ENVIRONMENT — e.g., "warm
independent coffee shop with morning light"]

8 shots:
1) [SETUP/OPENING ACTION]
2) [BUILD ACTION 1 — close-up or mid-shot]
3) [BUILD ACTION 2 — different angle]
4) [HERO MOMENT — the product/process highlight]
5) [SECONDARY HERO — closer detail]
6) [PAYOFF MOMENT — the result coming together]
7) [TRANSITION — handoff or movement]
8) [EMOTIONAL PAYOFF — customer reaction or brand
   reveal]
```
### The 4 story rules:
→ Always 8 shots. Less than 6 feels thin. More than 10 dilutes pacing within 12-15 seconds.<br>→ Character locks in shot 1, returns in shot 8. Audience recognition closes the loop.<br>→ End on emotional payoff. Customer smile, brand reveal, or product hero — never on process.<br>→ Vary shot sizes. Wide opening, close-up macro hero moments, 45° detail shots, tight emotional close-ups.
### Worked example — The Barista (the source story):
```javascript
story = THE BARISTA
runtime = 12-15 seconds
total shots = 8
pacing = ~1.5 seconds per shot

Character: young energetic male barista in green
apron
Setting: warm independent coffee shop, bright
morning light streaming through windows

8 shots:
1) Coffee shop opens — barista flips OPEN sign,
   warm morning light floods in
2) Grinding beans — close-up of beans cascading
   into grinder, aromatic steam rising
3) Tamping the portafilter — precise firm press,
   close-up on hands
4) Espresso pull — golden crema flowing into white
   cup, beautiful close-up
5) Milk steaming — silver pitcher, billowing white
   steam, barista watching
6) The pour — milk swirling into espresso, latte
   art forming a leaf
7) Sliding the cup across the counter — beautiful
   finished drink, soft focus background
8) Customer's face lights up — first sip, pure joy,
   barista smiling proudly
```
This 8-shot breakdown is what turns into a 12-second Pixar-style animated brand story. Notice the arc: setup → build → hero → payoff.
---
## Step 2 — The Pixar Storyboard Infographic Master Prompt
Take your story breakdown and append the master infographic prompt. GPT Image 2 returns 1 image with: header metadata, 8 panels, and footer with camera tips, light/style notes, and character notes.
### The full Pixar Storyboard Infographic master prompt (copy verbatim):
```javascript
Create a crisp, clean infographic storyboard poster
for [BRAND NAME].

Format: Wide 16:9 layout, white background, black
borders, bold black typography.
Style: Premium Pixar 3D stylized rendering, bright
warm colors — [DROP IN PALETTE FROM LIBRARY BELOW].

Top header:
[BRAND NAME]
TOTAL VIDEO TIME: 12-15 SECONDS
8 SHOTS · [PACING ADJECTIVE 1] · [PACING ADJECTIVE 2]
· [PACING ADJECTIVE 3]
Legend icons: ACTION, [VERTICAL DETAIL 1],
[VERTICAL DETAIL 2], [VERTICAL DETAIL 3]

Same Pixar-style [CHARACTER] throughout: [SPECIFIC
CHARACTER DETAILS], [SETTING DESCRIPTION], [LIGHTING
ARC].

8 panels:

1. [SHOT 1 — opening action with specific visual detail]
2. [SHOT 2 — close-up or mid-shot with action]
3. [SHOT 3 — different angle, build the sequence]
4. [SHOT 4 — hero moment, product or process]
5. [SHOT 5 — secondary hero, closer detail]
6. [SHOT 6 — payoff moment]
7. [SHOT 7 — transition or handoff]
8. [SHOT 8 — emotional payoff, customer or brand
   reveal]

Footer:

VIDEO FLOW: 8 shots × ~1.5s = 12-15 seconds.
[BRIEF NARRATIVE ARC SUMMARY].

CAMERA TIPS: [SPECIFIC CAMERA NOTES PER SHOT —
close-ups, 45° angles, wide shots, tight reactions].

LIGHT & STYLE: [LIGHTING DESCRIPTION], [COLOR
PALETTE], [DEPTH OF FIELD NOTE], Pixar vivid colors.

CHARACTER NOTES: [CHARACTER + SETTING REINFORCEMENT
LINE — what holds across all 8 panels].
```
### How to customize the master prompt:
The prompt has 6 customizable blocks. Swap any of these without breaking the structure.
→ **Brand name (header):** Drop your brand name in the title position<br>→ **Pacing adjectives (header):** "FAST · WARM · SATISFYING" / "SLOW · CALM · INTIMATE" / "PLAYFUL · BRIGHT · JOYFUL" / "EPIC · RICH · CINEMATIC"<br>→ **Legend icons:** Match to your story (ACTION, HEAT, TIME HINT, INGREDIENT for food / ACTION, STEP, PRODUCT, EMOTION for product / etc.)<br>→ **Character description:** Lock the specific character in 1 sentence — gender, age, signature wardrobe, energy<br>→ **Setting description:** Lock the specific environment — be specific about lighting and atmosphere<br>→ **Color palette:** Drop in 1 of the 6 palette templates from the library below
### Verification checklist (run before Step 3):
→ Are all 8 panels showing the same character with consistent face structure?<br>→ Does the wardrobe stay locked across all 8 panels?<br>→ Does the color palette feel cohesive (not 8 different palettes)?<br>→ Does the lighting feel consistent (not panel 1 morning, panel 5 evening, panel 8 noon)?<br>→ Does scene 8 land the emotional payoff or brand reveal?<br>→ Are the camera angles varied across the 8 panels?
If any drift, regenerate. The infographic is what locks identity for the video. A drifted infographic produces a drifted video.
---
## Step 3 — The Seedance 2.0 Pixar Animation Prompt
The infographic is your visual reference. The Seedance prompt is the narrative lock. You feed both — the infographic as @Image1, the shot sequence as text — to Seedance.
### Why repeat the shots verbatim:
The image gives Seedance the visual style. The text gives Seedance the exact action sequence and pacing. If you skip the text repeat, the model misses shots 60% of the time. With the shots repeated, sequence accuracy hits 95%.
### The full Seedance 2.0 master prompt (copy verbatim):
```javascript
Use the attached [BRAND NAME] storyboard image as
the exact reference.

Create a 12-second 16:9 animated [CATEGORY]
sequence that follows the 8-shot storyboard exactly.

Preserve the same Pixar-style [CHARACTER DESCRIPTION],
[WARDROBE DETAILS], [SETTING], and [COLOR PALETTE]
aesthetic throughout.

Rules:
• Follow the sequence exactly from 1 to 8
• One shot per panel, approximately 1.5 seconds each
• No skipped steps, no extra elements beyond the
  storyboard
• Maintain character and setting continuity throughout
• Emphasize [HERO DETAILS — e.g., the espresso crema,
  steaming milk, latte art, customer reaction]

Shot sequence:
1. [SHOT 1 — verbatim from storyboard]
2. [SHOT 2 — verbatim]
3. [SHOT 3 — verbatim]
4. [SHOT 4 — verbatim]
5. [SHOT 5 — verbatim]
6. [SHOT 6 — verbatim]
7. [SHOT 7 — verbatim]
8. [SHOT 8 — verbatim]

Camera:
• Wide shot for [WHICH SHOT — usually opening]
• Close-up for [WHICH SHOTS — usually hero moments]
• 45° angle for [WHICH SHOT — usually a process detail]
• Tight on face for [WHICH SHOT — usually emotional
  payoff]

Style:
• [LIGHTING DESCRIPTION] throughout
• [COLOR PALETTE — rich tones, creamy whites, bright
  accents]
• Pixar CGI vivid expressive animation
• Shallow depth of field on close-up shots
• Smooth satisfying cuts, [EMOTIONAL TONE] energy

Goal: A beautiful 12-second [CATEGORY] journey from
[OPENING MOMENT] to [PAYOFF MOMENT] — [3 EMOTIONAL
DESCRIPTORS].
```
### The 5 constraints to always include:
→ "Follow the sequence exactly from 1 to 8" — prevents shot reordering<br>→ "No skipped steps" — prevents shot skipping<br>→ "Maintain character and setting continuity" — locks the Pixar persona across cuts<br>→ "Pixar CGI vivid expressive animation" — locks the aesthetic<br>→ "Smooth satisfying cuts" — prevents jitter or jump-cut chaos
### Worked example — The Barista Seedance prompt:
```javascript
Use the attached THE BARISTA storyboard image as
the exact reference.

Create a 12-second 16:9 animated coffee-making
sequence that follows the 8-shot storyboard exactly.

Preserve the same Pixar-style young male barista,
green apron, warm independent coffee shop, and
bright vivid color aesthetic throughout.

Rules:
• Follow the sequence exactly from 1 to 8
• One shot per panel, approximately 1.5 seconds each
• No skipped steps, no extra ingredients beyond
  the storyboard
• Maintain character and coffee shop continuity
  throughout
• Emphasize the espresso crema, steaming milk
  texture, latte art pour, and final customer
  reaction

Shot sequence:
1. Barista flips OPEN sign — warm morning light
   floods the coffee shop
2. Coffee beans cascade into grinder — rich browns,
   aromatic steam
3. Precise firm tamp on the portafilter — close-up
   on skilled hands
4. Golden espresso crema flowing into white cup
5. Milk steaming in silver pitcher — billowing
   white steam, barista watching carefully
6. Milk poured into espresso — latte art leaf
   forming perfectly
7. Finished cup slid across the counter — warm
   light, shallow depth of field
8. Customer's face lights up — first sip, pure joy,
   barista smiling proudly

Camera:
• Wide shot for coffee shop opening
• Close-up for beans, tamping, espresso pull,
  and latte art
• 45° angle for milk steaming
• Tight on customer face for final reaction

Style:
• Warm golden morning light throughout
• Rich espresso browns, creamy whites, bright
  cafe greens
• Pixar CGI vivid expressive animation
• Shallow depth of field on close-up shots
• Smooth satisfying cuts, warm and joyful energy

Goal: A beautiful 12-second coffee journey from
open sign to happy customer — skilled, warm, and
deeply satisfying to watch.
```
That's the entire Seedance prompt for a 12-second Pixar-style brand story.
---
## Step 4 — Worked Walkthrough: The Barista
The full pipeline from story breakdown to finished 12-second Pixar-style brand story.
### Stage 1 — Story breakdown (3 minutes):
Wrote the 8-shot story (above). Decided on a young male barista in green apron as the character. Decided on a warm independent coffee shop with bright morning light as the setting. Targeted a sequence that mirrors the actual coffee-making craft, ending on the customer's joyful first sip.
### Stage 2 — Storyboard infographic generation (1 minute):
Pasted the story breakdown + the master infographic prompt into GPT Image 2. Got back the full Pixar-style storyboard in 1 image: top header (THE BARISTA, 15 seconds, 8 shots, FAST · WARM · SATISFYING, legend icons for ACTION/HEAT/TIME HINT/INGREDIENT), 8 panels with the same barista in green apron across every panel, footer with camera tips, light & style notes, and barista notes reinforcing character continuity.
### Stage 3 — Verification (2 minutes):
Checked all 8 panels for character consistency. Same barista, same apron, same hair, same proportions across every panel. Reviewed shot sequence: opens with the OPEN sign, builds through grinding/tamping/pulling/steaming/pouring, closes on the customer's joy. Lighting was consistent (warm morning) across all 8. Color palette held: rich browns, creamy whites, cafe greens, soft amber.
### Stage 4 — Seedance generation (4 minutes):
Pasted the storyboard image as @Image1. Pasted the Seedance master prompt with the shot sequence verbatim. Added the 5 constraints. Specified the 4 camera angles. Defined the lighting + palette. Goal line locked the emotional arc. Generated. 12-second Pixar-style brand story came back hitting all 8 shots: opens with the warm flooded-light OPEN moment, builds through the craft sequence, closes on the customer's smile.
### Stage 5 — Post (5 minutes):
Scene 4 (espresso pull) came back slightly slower than ideal. Bumped the playback speed by 10% in CapCut. Added a subtle ambient soundscape (cafe morning sounds, espresso machine hiss, soft music). Final color polish: slightly warmed the highlights, deepened the shadows. Exported in 16:9 4K + a 9:16 vertical for Reels.
### Total time: 15 minutes. Total cost: $3 in API + Seedance.
Compare to traditional 3D animation production: $20K-$50K, 4-week timeline, 1 finished spot.
---
## The 8 Pixar Story Templates (Vertical-Specific)
Each one reuses the master infographic prompt + the master Seedance prompt. Only the story breakdown changes. Drop in the story for your vertical, run the pipeline.
### Template 1 — Coffee Shop / Cafe Brand
```javascript
Character: young energetic barista, signature apron
Setting: warm independent cafe, morning light
Shots:
1) Barista flips OPEN sign
2) Beans cascade into grinder
3) Precise tamp on portafilter
4) Golden espresso crema flowing
5) Milk steaming in silver pitcher
6) Latte art leaf forming
7) Cup slides across counter
8) Customer first sip, pure joy
```
Style: Rich espresso browns, creamy whites, cafe greens. Tone: skilled, warm, satisfying.
### Template 2 — Food & Beverage Product Origin
```javascript
Character: passionate food artisan in signature
clothing
Setting: warm production environment (kitchen,
field, distillery)
Shots:
1) Artisan opens production space at dawn
2) Sourcing the raw ingredient (close-up)
3) Preparing the ingredient (45° angle)
4) Hero process moment (close-up macro)
5) Quality check or taste test (artisan focus)
6) Packaging or final touch (detail)
7) Product placed on display (wide)
8) Happy customer enjoying the result
```
Style: Warm earth tones, ingredient-driven palette. Tone: craft, care, authenticity.
### Template 3 — Kids / Family Product
```javascript
Character: cheerful kid (or family group)
Setting: bright playful family home
Shots:
1) Kid wakes up excited
2) Discovers the product (wide reveal)
3) Reads or examines the product (close-up)
4) First use moment (hero shot)
5) Joyful reaction (tight on face)
6) Sibling or parent joins in
7) Group enjoying together (wide)
8) Family group hug, brand logo appears
```
Style: Bright pastels, primary color pops. Tone: joyful, playful, wholesome.
### Template 4 — Wellness / Self-Care Brand
```javascript
Character: calm protagonist in soft loungewear
Setting: serene minimalist home with morning light
Shots:
1) Protagonist wakes up peacefully
2) Walks to bathroom / vanity space
3) Picks up the product (close-up)
4) Applies or uses the product (hero macro)
5) Quiet contemplative moment
6) Looks in the mirror with soft smile
7) Steps into the day (wide)
8) Calm satisfied close-up, brand logo
```
Style: Soft sage, cream, blush, warm white. Tone: calm, restorative, intentional.
### Template 5 — Pet / Animal-Related Brand
```javascript
Character: pet (dog or cat) + owner
Setting: warm cozy home
Shots:
1) Pet excited as owner pulls out the product
2) Owner opens or prepares the product
3) Close-up of the product detail
4) Hero feeding or play moment
5) Pet's joyful reaction (close-up on face)
6) Owner's happy face watching
7) Pet enjoys the product (wide)
8) Pet curls up content, brand logo appears
```
Style: Warm browns, soft creams, pet fur tones. Tone: loving, joyful, affectionate.
### Template 6 — Lifestyle Brand Morning Routine
```javascript
Character: well-styled protagonist in signature
fashion
Setting: bright modern apartment
Shots:
1) Protagonist wakes up to natural light
2) Stretches with calm morning energy
3) Picks up the product (close-up)
4) Uses the product in routine (hero shot)
5) Looks in mirror with confident smile
6) Steps into the day prepared
7) Walking out the door (wide)
8) Confident close-up, brand logo
```
Style: Cream, warm white, brand accent. Tone: aspirational, calm, intentional.
### Template 7 — Restaurant / Cuisine Origin Story
```javascript
Character: chef in signature uniform
Setting: warm restaurant kitchen at dawn
Shots:
1) Chef enters quiet kitchen, ties apron
2) Sourcing fresh ingredient (close-up)
3) Knife work on cutting board (45° angle)
4) Cooking process hero moment (macro)
5) Plating with care (overhead)
6) Final dish revealed (hero shot)
7) Server delivers to table
8) Diner first bite, eyes light up
```
Style: Rich food tones, warm restaurant lighting. Tone: passion, craft, joy.
### Template 8 — Wholesome Service Brand (Florist, Bakery, Boutique)
```javascript
Character: shop owner with signature warmth
Setting: charming small shop, morning light
Shots:
1) Shop owner unlocks and enters
2) Arranges or prepares (close-up of craft)
3) Hero detail of the work (macro)
4) Customer enters, owner greets warmly
5) Showing the customer the work (wide)
6) Customer reacts with delight
7) Owner wraps or finalizes the purchase
8) Customer leaves smiling, owner waves, brand logo
```
Style: Soft brand-aligned pastels. Tone: warm, personal, community.
---
## The Pixar Camera Library
Each shot in your story breakdown should call out a specific camera move. The Pixar aesthetic specifically benefits from:
```javascript
1. Wide establishing — full setting reveal, often
   with environmental light flooding in
2. Close-up macro — extreme detail on product or
   process, emphasizes craftsmanship
3. 45° angle — process or action shot, gives depth
   without flatness
4. Over-shoulder — shows perspective without
   identifying viewer fully
5. Tight on face — emotional payoff, customer or
   character reaction
6. Top-down overhead — flatlay-style detail, common
   in food and product
7. Medium two-shot — character + product or
   character + customer
8. Slow push-in — gentle approach toward hero
   moment
```
Drop 1 per shot, varied across the 8 panels. The shot variety is what makes the ad feel cinematic-Pixar.
---
## The Pixar Color Palette Library
6 ready-to-drop palettes for the storyboard infographic style line.
```javascript
1. WARM CAFE PIXAR:
Rich espresso browns, creamy whites, warm cafe
golds, pops of green from plants.

2. FRESH FOOD PIXAR:
Bright vegetable greens, warm bread browns, creamy
whites, sunny yellows.

3. WELLNESS PIXAR:
Soft sage, blush pink, cream, gentle lavender,
warm white.

4. KIDS PLAYFUL PIXAR:
Sky blues, sunshine yellows, cheerful reds,
playful primaries against bright cream.

5. PREMIUM LIFESTYLE PIXAR:
Warm cream, taupe, soft gold, deep navy accents,
ivory.

6. COZY HOME PIXAR:
Warm wood tones, terracotta accents, soft cream,
amber light, gentle greens.
```
Drop the palette into the storyboard infographic prompt's style line. The palette propagates through character wardrobe, environment, and final video.
---
## Pixar Style Variant Templates
Drop these into the storyboard infographic prompt to control the overall vibe.
### Warm Cafe Pixar (Barista default):
```javascript
STYLE: Premium Pixar 3D stylized rendering, bright
warm colors — rich espresso browns, creamy whites,
warm cafe golds, pops of green from plants.
LIGHT: Bright morning light streaming through
windows.
PACING: FAST · WARM · SATISFYING.
TONE: Skilled, warm, joyful.
```
### Cool Tech Pixar:
```javascript
STYLE: Premium Pixar 3D stylized rendering, clean
contemporary palette — soft blues, cool whites,
silver accents, single brand color pop.
LIGHT: Bright modern daylight, soft window
diffusion.
PACING: SHARP · MODERN · SMART.
TONE: Confident, capable, polished.
```
### Food Origin Pixar:
```javascript
STYLE: Premium Pixar 3D stylized rendering, warm
ingredient-driven palette — rich produce colors,
warm earth tones, creamy whites.
LIGHT: Golden hour at production source, warm
indoor production light.
PACING: PATIENT · CRAFT · DEVOTED.
TONE: Authentic, passionate, soulful.
```
### Kids Playful Pixar:
```javascript
STYLE: Premium Pixar 3D stylized rendering, vivid
playful palette — sky blues, sunshine yellows,
cheerful reds against bright cream.
LIGHT: Bright cheerful daylight, warm interior
glow.
PACING: PLAYFUL · BRIGHT · JOYFUL.
TONE: Wonder, joy, safety.
```
### Wellness Calm Pixar:
```javascript
STYLE: Premium Pixar 3D stylized rendering, soft
calm palette — sage, blush, cream, gentle lavender.
LIGHT: Soft natural daylight, gentle morning glow.
PACING: SLOW · CALM · INTIMATE.
TONE: Restorative, serene, intentional.
```
---
## 3 Skill Recipes for Reuse
If you've installed the agent system from the Claude + Higgsfield Creative Agency lead magnet, save these to `.claude/skills/` for instant reuse.
### Skill 1 — Pixar Storyboard Infographic
```javascript
.claude/skills/pixar-storyboard/skill.md

NAME: Pixar Storyboard Infographic
TRIGGER: "Generate a Pixar-style storyboard for [BRAND]"

PROMPT TEMPLATE:
[Paste the full master infographic prompt above]

VARIABLES:
- Brand name (header)
- 8 shots (story breakdown)
- Color palette (1 of 6 templates)
- Character description
- Setting + lighting
- Pacing adjectives
```
### Skill 2 — Pixar Seedance Animation
```javascript
.claude/skills/pixar-seedance/skill.md

NAME: Pixar Seedance Brand Story
TRIGGER: "Generate a Pixar animated brand story
from this storyboard"

PROMPT TEMPLATE:
Use the attached [BRAND NAME] storyboard image as
the exact reference.

Create a 12-second 16:9 animated [CATEGORY]
sequence that follows the 8-shot storyboard exactly.

[REST OF MASTER PROMPT]

Constraints: follow sequence 1 to 8, no skipped
steps, maintain character continuity, Pixar CGI
vivid animation, smooth satisfying cuts.
```
### Skill 3 — Reverse Scene Fix
```javascript
.claude/skills/reverse-scene-fix/skill.md

NAME: CapCut Reverse Scene Fix
TRIGGER: "Fix reversed scene in CapCut"

WORKFLOW:
1. Open clip in CapCut
2. Click on the offending scene segment
3. Click "Extract sound" to put audio on own track
4. Right-click video segment → Reverse
5. Verify audio still plays forward
6. Export the fixed clip
```
---
## What NOT to Do
→ Don't skip the storyboard infographic step. Trying to prompt Seedance directly without the visual reference causes character drift, palette inconsistency, and chaotic shot transitions.
→ Don't write vague shot descriptions. "Wide shot of coffee shop" beats "wide shot." Specificity reduces re-rolls.
→ Don't run more than 8 shots. The 12-15 second runtime can't accommodate more without dropping below 1.5 seconds per shot (which feels rushed).
→ Don't end on process. Scene 8 should always be emotional payoff (customer reaction, brand reveal, or hero moment) — never on a step in the workflow.
→ Don't switch character archetypes mid-batch. The Pixar aesthetic relies on character recognition. 1 brand = 1 recurring Pixar persona.
→ Don't ignore the lighting consistency rule. Specifying "morning light throughout" prevents jarring lighting jumps between shots.
→ Don't add text overlays throughout. Brand text appears in scene 8 only, never earlier (clutters the Pixar aesthetic).
→ Don't run Pixar-style ads as your only ad type. Mix with UGC (which converts) and direct response (which qualifies). Pixar builds brand affinity and saves.
→ Don't skip the 5 Seedance constraints. Without them, the model drifts on sequence, character, or palette.
→ Don't ignore the legend icons in the infographic. They reinforce what the viewer should focus on (action, ingredient, time, etc.).
---
## Troubleshooting
<table header-row="true">
<tr>
<td>Problem</td>
<td>Fix</td>
</tr>
<tr>
<td>Character drifts across the 8 panels</td>
<td>Regenerate the infographic until the character holds. Lock specific wardrobe details in the prompt.</td>
</tr>
<tr>
<td>Color palette feels inconsistent</td>
<td>Specify the palette explicitly in both the infographic style line and the Seedance style block.</td>
</tr>
<tr>
<td>Lighting changes between panels</td>
<td>Add "consistent [TIME OF DAY] lighting throughout" in both prompts.</td>
</tr>
<tr>
<td>Scene 8 doesn't deliver payoff</td>
<td>Rewrite scene 8 to be the customer reaction or brand reveal, never a process step.</td>
</tr>
<tr>
<td>Seedance skips shots</td>
<td>Repeat the shot sequence verbatim in the Seedance prompt. The text overrides image.</td>
</tr>
<tr>
<td>Animation feels generic, not Pixar</td>
<td>Add "Pixar CGI vivid expressive animation" explicitly. Reference Pixar specifically.</td>
</tr>
<tr>
<td>Camera moves feel chaotic</td>
<td>Specify 1 camera move per shot in the Seedance prompt's camera block.</td>
</tr>
<tr>
<td>Brand text appears throughout video</td>
<td>Add "text only appears in scene 8" to constraints.</td>
</tr>
<tr>
<td>Character looks too realistic</td>
<td>Reinforce "Pixar 3D stylized rendering" in both the infographic and Seedance prompts.</td>
</tr>
<tr>
<td>Shots feel rushed</td>
<td>Confirm 8 shots × 1.5 seconds = 12 seconds. Don't go above 8 shots.</td>
</tr>
<tr>
<td>Storyboard infographic renders chaotic</td>
<td>Reduce visual complexity. Simplify the character description. Use 1 of the 5 style variants.</td>
</tr>
<tr>
<td>One scene runs backward</td>
<td>Use the CapCut reverse fix. Extract sound first. Then reverse video.</td>
</tr>
</table>
---
## The Daily Production Cadence
This is the routine that ships 18 Pixar-style brand stories per week.
<table header-row="true">
<tr>
<td>Day</td>
<td>Task</td>
<td>Output</td>
</tr>
<tr>
<td>Monday morning</td>
<td>Write 6 story breakdowns (1 per ad)</td>
<td>6 stories ready</td>
</tr>
<tr>
<td>Monday afternoon</td>
<td>Generate 6 storyboard infographics in GPT Image 2</td>
<td>6 infographics</td>
</tr>
<tr>
<td>Tuesday morning</td>
<td>Verify infographics, fix drift, regenerate if needed</td>
<td>6 verified storyboards</td>
</tr>
<tr>
<td>Tuesday afternoon</td>
<td>Run 6 Seedance generations in parallel</td>
<td>6 raw Pixar ads</td>
</tr>
<tr>
<td>Wednesday morning</td>
<td>CapCut polish, color grade, export 6</td>
<td>6 finished ads</td>
</tr>
<tr>
<td>Wednesday afternoon</td>
<td>Repeat batch (6 more stories + storyboards)</td>
<td>12 total ads</td>
</tr>
<tr>
<td>Thursday morning</td>
<td>Final batch (6 more)</td>
<td>18 total ads</td>
</tr>
<tr>
<td>Thursday afternoon</td>
<td>Schedule across Reels, TikTok, Pinterest, Feed</td>
<td>Week's content live</td>
</tr>
<tr>
<td>Friday</td>
<td>Performance review + brief next week's stories</td>
<td>Pattern map ready</td>
</tr>
</table>
18 Pixar-style brand stories per week. Compare to traditional 3D animation: 1 spot per quarter at $20K-$80K.
---
## 🎯 Closer
**Pick 1 of the 8 vertical templates. Write the 8-shot story breakdown using your brand name in scene 8. Pick a color palette + Pixar style variant. Paste into GPT Image 2 with the master infographic prompt. Verify all 8 panels match the character. Paste the storyboard into Seedance 2.0 with the master prompt and the shots repeated verbatim. Add the 5 constraints. Define the 4 camera angles. Specify the style block. Generate. Polish in CapCut. Export. You'll have your first Pixar-style brand story in 15 minutes for $3. Once that works, run template 2 before lunch. By the end of the week you'll have 18 brand stories shipped. By the end of the month you'll have replaced your 3D animation budget.**
3D animation studios aren't the unit of branded story content anymore.
Storyboard infographics are.
System > Spend.
---
