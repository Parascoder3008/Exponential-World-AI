---
title: "The Cinematic Ad Production Board System: ChatGPT Image 2 + Seedance 2.0"
page_id: 3af92e2e92e98023931fda2655f8b3aa
layer: production
source: https://freebie-for-you.notion.site/3af92e2e92e98023931fda2655f8b3aa
---
## 🎯 What You're Getting
A complete cinematic ad workflow that produces $30K-quality luxury commercials for $5 per ad.
2 tools. 2 master prompts. 8 vertical-specific story templates. 12 cinematic ads per week.
This is the system replacing $30K-$50K production shoots, location scouts, model bookings, and 4-week delivery cycles. You don't book a shoot. You don't hire a DP. You don't scout locations. You generate a director's production board in ChatGPT Image 2, feed it into Seedance 2.0 with the 8-scene prompt, and ship 12 cinematic ads a week.
By the end of this guide, you'll have:
→ The full Director's Production Board prompt (the master template that generates everything)<br>→ The 8-scene story breakdown format used in every cinematic ad<br>→ The Seedance 2.0 master prompt that recreates the storyboard verbatim<br>→ 8 ready-to-run vertical-specific story templates (luxury hotels, fashion, premium DTC, real estate, food/bev, automotive, jewelry, wellness retreats)<br>→ The camera language library (12 cinematic moves)<br>→ The lighting library (golden hour, blue hour, twilight, night, overcast, hard direct, soft window)<br>→ 6 color palette templates per brand vibe<br>→ The cinematography style customization templates (lens character, movement, post grade)<br>→ 3 ready-to-install skill recipes<br>→ The CapCut reverse-scene fix<br>→ The full LuxLife Retreats worked walkthrough (start to finished video)
If you've already installed the systems from the 50-Hook Library or 25 UGC Ads Library, this slots in as the cinematic layer above your UGC stack — premium brand spots that run alongside your direct-response UGC.
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
<td>Story breakdown (you write)</td>
<td>8 numbered scenes with camera, action, emotion</td>
</tr>
<tr>
<td>Production board</td>
<td>ChatGPT Image 2</td>
<td>Generates the full director's pre-production guide in 1 image</td>
</tr>
<tr>
<td>Verification</td>
<td>Manual review or Claude</td>
<td>Catches scene mistakes, dialog drift, character drift</td>
</tr>
<tr>
<td>Execution</td>
<td>Seedance 2.0</td>
<td>Produces the final 15-second cinematic ad</td>
</tr>
<tr>
<td>Post</td>
<td>CapCut</td>
<td>Sound separation, scene reversal, final export</td>
</tr>
</table>
The unlock is the production board image. Most operators try to prompt Seedance directly with text and get inconsistent characters across cuts, drifted lighting, and chaotic camera moves. The production board locks: model identity, environment, top-down camera plan, lighting progression, mood/keywords, audio direction, and cinematography philosophy. Seedance just animates what's already locked.
---
## ⚙️ The Workflow Math
Traditional cinematic ad production: $30K-$50K per spot for a small location shoot. $100K-$300K for a full premium brand spot. Add 4-8 weeks of preproduction, location scouts, model bookings, DP coordination, post-production cycles.
This system: $5 per finished cinematic ad. 15-20 minutes per ad. Total for 12 ads/week: $60-$80 in API + Seedance costs. Total monthly: \\~$240 vs. quarterly $50K-$200K shoot budget.
The leverage shift: you stop buying production days. You start running a director's brain through ChatGPT Image 2 + Seedance. The bottleneck moves from production capacity to brand-aligned creative direction (which the templates below fix).
---
## Step 1 — The Story Breakdown (Write This First)
Before any image generation, write your 8-scene story. This is what the production board will turn into a cinematic guide.
### The story breakdown format:
```javascript
story = [ONE-LINE PREMISE OF THE AD]

Scenes:
1) [SHOT TYPE] of [SUBJECT/ACTION]
2) [SHOT TYPE] of [SUBJECT/ACTION]
3) [SHOT TYPE] of [SUBJECT/ACTION]
4) [SHOT TYPE] of [SUBJECT/ACTION]
5) [SHOT TYPE] of [SUBJECT/ACTION]
6) [SHOT TYPE] of [SUBJECT/ACTION]
7) [SHOT TYPE] of [SUBJECT/ACTION]
8) [SHOT TYPE] of [SUBJECT/ACTION] with elegant font
   text "[BRAND NAME]"
```
### The 4 scene rules:
→ Always 8 scenes. Less than 6 feels thin. More than 10 dilutes pacing.<br>→ Mix shot sizes. Wide drone, two-shot, close-up, macro insert, hero pull-out. Don't stack 6 close-ups.<br>→ End on a brand reveal. Scene 8 should hold the brand name with elegant typography for 2-3 seconds.<br>→ Be specific. "Wide angle drone shot" beats "wide shot." Specificity reduces re-rolls.
### Worked example — LuxLife Retreats (from the screenshot):
```javascript
story = a beautiful woman in a white dress enjoying
an amazing sunset evening at a luxury mansion built
into a cliff

Scenes:
1) wide angle drone shot
2) wide angle walk at pool
3) medium wide over shoulder walk at pool
4) medium wide lean on railing
5) close-up hand in water
6) look over bay
7) close-up smile
8) wide angle smile holding champagne with elegant
   font text "LuxLife Retreats"
```
This 8-scene breakdown is what turns into a 15-second luxury commercial. Notice the pacing: aerial establishing → tracking → intimate close-ups → emotional peak → brand reveal.
---
## Step 2 — The Director's Production Board (ChatGPT Image 2)
Take your story breakdown and append the master production board prompt. ChatGPT Image 2 returns 1 image with: project metadata, character refs, environment + camera plan, 8-shot storyboard, lighting progression, mood, audio direction, and cinematography philosophy.
### How to structure the input:
Paste your story breakdown first (the 8 scenes from Step 1). Then paste the master production board prompt directly underneath as 1 continuous instruction. ChatGPT Image 2 reads both and renders the full guide.
### The full Director's Production Board master prompt (copy verbatim):
```javascript
Create a cinematic production board / visual planning
sheet that presents a complete concept for a short
film or commercial. The layout should be clean,
grid-based, and divided into clearly labeled sections.

Include:

Shared creative direction (top bar):
Overall constraints such as number of shots, unified
color palette, runtime, aspect ratio (16:9 cinematic),
and general environmental context. Add a "concept"
block describing the sensory journey of the ad.

Character + styling reference section:
A model shown from multiple angles (front, back,
side, close-ups, relaxed pose), accompanied by
wardrobe and accessory references. Emphasize
consistency of identity while allowing minor
variations for specific scenes.

Environment and set design section:
A scenic location with dramatic features (cliffside
mansion, mountain retreat, urban penthouse, etc.),
plus a top-down diagram illustrating movement
through the space. Include camera positions and
labeled shot types mapped along a route.

Storyboard section:
A sequence of numbered frames (about 8 shots) showing
progression of the scene. Each frame includes:
- Camera type / lens feel (Drone 16-24mm, Crane
  24-70mm, Steadicam 35mm, Macro 85mm, etc.)
- Shot size (wide, medium, close-up, macro)
- Movement (static, tracking, handheld, slow push-in,
  smooth crane down, etc.)
- Brief description of action and emotional progression
- Emotional beat (Awe, Freedom, Grace, Peace,
  Sensual, Indulgence, Joy, Fulfillment, etc.)

Lighting / mood / style notes:
Visual examples paired with short descriptions of
lighting conditions, atmosphere, and texture. Include
transitions across time of day (golden hour, blue
hour, twilight, night) with variations in light
quality.

Mood and keywords block:
A concise list of emotional tones and thematic
descriptors guiding the piece (luxury, freedom,
escape, elegance, indulgence, serenity, exclusivity,
timeless, feminine, cinematic, inspiring, desirable).

Audio / tone section:
Indications of ambient sound (ocean waves, breeze,
distant seabirds, soft water movement, glass clinks),
music style (cinematic orchestral with warm strings,
ambient pads, evolving into a modern lush instrumental),
and sonic atmosphere (uplifting yet intimate,
expansive at first then personal and memorable).

Cinematography notes:
General visual philosophy including:
- Lens character (premium glass with gentle contrast
  and beautiful bokeh, main range 16mm-85mm)
- Movement style (smooth, intentional, elegant; mix
  of aerial, crane, steadicam, subtle handheld)
- Visual philosophy (capture the feeling of a memory,
  natural beauty, authentic moments, luxurious details)
- Color & post (warm cinematic grade, rich golds,
  deep blues, soft skin tones, subtle bloom, polished
  highlights)

The entire board should feel cohesive, cinematic, and
professionally designed, like a director's pre-
production guide that communicates tone, pacing, and
visual storytelling at a glance.
```
### How to customize the production board:
The prompt has 7 customizable blocks. Swap any of these without breaking the structure.
→ **Environment block:** "scenic outdoor location with dramatic natural features" → "luxury cliffside mansion" / "modern urban penthouse" / "alpine ski retreat" / "minimalist Japanese ryokan" / "Saharan desert villa"
→ **Color palette block:** specify in the top bar — "warm cream, taupe, gold accents, navy" / "monochrome black + cream + 1 brand accent" / "earth tones with terracotta and mustard" / "cool monochrome with sage accents"
→ **Mood & keywords:** swap the 12 keywords for your brand mood
→ **Audio direction:** specify ambient sounds + music style + sonic atmosphere
→ **Cinematography style:** swap lens range, movement style, color grade
→ **Concept line:** rewrite for your brand's specific sensory journey
### Verification checklist (run before Step 3):
→ Are all 8 storyboard frames showing the same model with consistent face structure?<br>→ Does the wardrobe stay locked across all 5 reference angles?<br>→ Do the lighting transitions match a real time-of-day arc (e.g., golden hour → blue hour → twilight)?<br>→ Are the camera moves varied (not 6 close-ups in a row)?<br>→ Does scene 8 hold the brand name reveal with elegant typography?<br>→ Does the top-down map show the camera path through the space?
If any of those drift, regenerate the production board. The board is what locks identity for the video. A drifted board produces a drifted video.
---
## Step 3 — The Seedance 2.0 Cinematic Ad Prompt
The production board is your visual reference. The Seedance prompt is the narrative lock. You feed both — the board as @Image1, the story breakdown as text — to Seedance.
### Why repeat the story verbatim:
The image gives Seedance the visual style. The text gives Seedance the exact action sequence and dialog. If you skip the text repeat, the model misses scenes 60% of the time. With the story repeated, scene accuracy hits 95%.
### The full Seedance 2.0 master prompt (copy verbatim):
```javascript
Follow this storyboard to create an AD/Film.
Dynamic camera movement, no camera gear in the shots,
only the subject, only text in the last scene.

story = [PASTE YOUR STORY BREAKDOWN VERBATIM —
IDENTICAL TO WHAT YOU FED INTO CHATGPT IMAGE 2]

Scenes:
1) [SHOT TYPE] of [SUBJECT/ACTION]
2) [SHOT TYPE] of [SUBJECT/ACTION]
3) [SHOT TYPE] of [SUBJECT/ACTION]
4) [SHOT TYPE] of [SUBJECT/ACTION]
5) [SHOT TYPE] of [SUBJECT/ACTION]
6) [SHOT TYPE] of [SUBJECT/ACTION]
7) [SHOT TYPE] of [SUBJECT/ACTION]
8) [SHOT TYPE] of [SUBJECT/ACTION] with elegant font
   text "[BRAND NAME]"

Constraints: maintain character identity, consistent
wardrobe, locked lighting progression matching the
storyboard's time-of-day arc, sharp clarity on close-
ups, no jitter, natural movement, no extra hands or
fingers, polished cinematic color grade.
```
### The 5 constraints to always include:
→ "no camera gear in the shots" — Seedance loves to add stray drones, mics, rigs. This kills it.<br>→ "only her" or "only him" or "only the subject" — keeps the frame focused<br>→ "only text in the last scene" — prevents text from appearing throughout<br>→ "dynamic camera movement" — prevents the model from defaulting to static locked-off<br>→ "no talking" if it's a music-led ad — prevents the model from generating dialog
### Worked example — LuxLife Retreats Seedance prompt:
```javascript
Follow this storyboard to create an AD.
Dynamic camera movement, no camera gear in the shots,
only her, only text in the last scene.

story = a beautiful woman in a white dress enjoying
an amazing sunset evening at a luxury mansion built
into a cliff

Scenes:
1) wide angle drone shot
2) wide angle walk at pool
3) medium wide over shoulder walk at pool
4) medium wide lean on railing
5) close-up hand in water
6) look over bay
7) close-up smile
8) wide angle smile holding champagne with elegant
   font text "LuxLife Retreats"
```
That's the entire Seedance prompt for a 15-second luxury commercial. Pair it with the production board as the visual reference and run.
### The CapCut reverse-scene fix:
Sometimes Seedance generates 1 scene running backward (the model walks backward, pours backward, etc.). Don't regenerate the whole thing. Fix it in CapCut.
→ Open the clip in CapCut<br>→ Click on the offending scene segment<br>→ Click "Extract sound" to put audio on its own track (so you can keep the audio forward)<br>→ Right-click the video segment → Reverse<br>→ The scene now runs forward with original audio intact
5-second fix vs. 4-minute regeneration.
---
## Step 4 — Worked Walkthrough: LuxLife Retreats
This is the full pipeline from story breakdown to finished 15-second luxury commercial.
### Stage 1 — Story breakdown (3 minutes):
Wrote the 8-scene story (above). Decided on luxury cliffside mansion as the setting. Decided on a single female model in a white dress as the subject. Targeted golden-hour-to-twilight lighting arc.
### Stage 2 — Production board generation (1 minute):
Pasted the story breakdown + the master production board prompt into ChatGPT Image 2. Got back the full director's guide in 1 image: project title bar (LuxLife Retreats, Short Film/Commercial, 60-75 seconds, 8 primary shots, 16:9 cinematic, 6-color palette), character ref with 5 angles + wardrobe, environment with cliffside mansion + top-down map showing 8 camera positions, 8-frame storyboard with camera/lens/shot size/movement/action/emotional beat per frame, lighting progression (golden → blue → twilight → night), mood block (luxury, freedom, escape, elegance, indulgence, serenity, exclusivity, timeless, feminine, cinematic, inspiring, desirable), audio direction (ocean waves, cinematic orchestral with warm strings), cinematography notes (16-85mm range, smooth elegant movement, warm cinematic grade with rich golds and deep blues).
### Stage 3 — Verification (2 minutes):
Checked all 5 character reference angles. Confirmed identical model, identical white dress, identical wardrobe accessories. Reviewed storyboard for scene mistakes. The dialog placement was correct (only scene 8 has the brand text). The lighting arc made sense: golden establishing → blue hour walk → twilight intimate → night close-up. Top-down map was decoration but useful for visualizing the camera path.
### Stage 4 — Seedance generation (4 minutes):
Pasted the production board image as @Image1. Pasted the Seedance prompt verbatim with the story repeated. Added the constraints. Generated. 15-second cinematic ad came back with all 8 scenes hitting their marks: aerial drone establishing, tracking walk at pool, over-shoulder cinematography, intimate railing lean, sensual macro of hand in water, contemplative bay overlook, joyful close-up smile, brand reveal with champagne.
### Stage 5 — Post (5 minutes):
Scene 5 (hand in water) came back running backward. Opened in CapCut, extracted sound to its own track, reversed the video segment, kept audio forward. Total fix: 30 seconds. Final color polish: warmed the highlights slightly, deepened the shadows. Exported in 16:9 4K.
### Total time: 15 minutes. Total cost: $5 in API + Seedance.
Compare to traditional production: $30K-$50K, 4-week timeline, 1 finished spot.
---
## The 8 Cinematic Ad Templates (Vertical-Specific)
Each one reuses the master production board prompt + the master Seedance prompt. Only the story breakdown changes. Drop in the story for your vertical, run the pipeline.
### Template 1 — Luxury Hotel/Resort
```javascript
story = a couple checking into a private mountain
chalet at golden hour, with hot tub steam rising
into the alpine evening

Scenes:
1) wide aerial drone shot of the chalet from above
2) medium wide of couple walking up to the entrance
   with bags
3) over-shoulder of door opening into warm interior
4) medium wide of couple stepping onto the balcony
   facing mountain peaks
5) close-up macro of champagne glass clinking
6) wide of hot tub steam rising as they sink in
7) close-up of relaxed expression looking at peaks
8) wide angle of chalet at twilight with elegant
   font text "[RESORT NAME]"
```
Style: Warm wood + cream + amber accents. Cinematography: smooth crane + steadicam, warm orange grade.
### Template 2 — Fashion Brand Commercial
```javascript
story = a model wearing the new collection walking
through a neutral-toned editorial set, posing
gracefully through 8 distinct looks of the
collection

Scenes:
1) wide of model entering a soft-lit empty studio
2) medium wide of first outfit pose (base layer)
3) close-up macro of fabric texture detail
4) medium wide of second outfit pose (silhouette)
5) over-shoulder of model walking away in third look
6) close-up of accessories (jewelry, shoes detail)
7) medium of confident final pose
8) wide of model walking through frame with elegant
   font text "[BRAND NAME] AW26"
```
Style: Cream + ivory + camel. Cinematography: smooth gimbal + slow push-ins, soft editorial grade.
### Template 3 — Premium DTC Product Hero
```javascript
story = a hero product (skincare bottle, watch,
tech gadget, etc.) revealed through a journey from
darkness to dramatic light, building toward the
brand reveal

Scenes:
1) wide of empty dark space with single beam of light
2) macro of light revealing product on surface
3) close-up macro of product material texture
4) medium of hand reaching for product
5) close-up of product being held against neutral
   background
6) macro detail of brand engraving or logo
7) medium of product placed in styled context
8) wide hero shot of product centered with elegant
   font text "[BRAND NAME]"
```
Style: Monochrome black + cream + 1 brand accent. Cinematography: macro + crane down, dramatic side-lit grade.
### Template 4 — Real Estate Luxury Listing
```javascript
story = a high-end home revealed through architectural
moments, from exterior approach to interior emotional
beats, ending with the listing brand reveal

Scenes:
1) wide aerial drone of the home in landscape context
2) medium wide of front entrance opening
3) wide of living room with floor-to-ceiling windows
4) medium of kitchen island with morning light
5) close-up of architectural detail (stone, wood, metal)
6) wide of primary bedroom with sunrise view
7) medium of pool or outdoor feature at golden hour
8) wide aerial pull-out at twilight with elegant
   font text "[AGENT/BROKERAGE NAME]"
```
Style: Cream + soft grey + warm wood accents. Cinematography: aerial + smooth gimbal + steadicam, premium real estate grade.
### Template 5 — Food & Beverage Premium Ad
```javascript
story = a premium food/beverage product showcased
in a sensory cinematic journey, from production
moment to consumption to brand reveal

Scenes:
1) wide of pristine production environment (kitchen,
   field, distillery)
2) medium of preparation moment (pouring, stirring,
   plating)
3) close-up macro of texture/color/condensation
4) medium wide of person reacting to first taste
5) close-up of expression of enjoyment
6) medium of social moment (sharing, toasting)
7) close-up macro of product label or logo
8) wide hero of product centered with elegant
   font text "[BRAND NAME]"
```
Style: Warm cinematic with brand-colored accents. Cinematography: macro-heavy + slow push-ins, food-cinematic grade with rich saturation.
### Template 6 — Automotive Cinematic Spot
```javascript
story = a luxury vehicle moving through varied
landscapes at golden hour, building from solitary
beauty to driver's emotional connection

Scenes:
1) wide aerial of vehicle alone on a coastal road
2) medium tracking of vehicle through curves
3) close-up macro of dashboard or steering detail
4) medium of driver's hands on the wheel
5) over-shoulder of road ahead through windshield
6) wide of vehicle pulling up to dramatic vista
7) close-up of driver's calm satisfied expression
8) wide aerial pull-out at twilight with elegant
   font text "[BRAND NAME]"
```
Style: Steel + warm sunset + deep blue. Cinematography: aerial + tracking + interior macro, premium automotive grade.
### Template 7 — Jewelry Brand Commercial
```javascript
story = a piece of jewelry revealed through
intimate moments and dramatic light, building
toward the brand and the wearer's confidence

Scenes:
1) wide of dark elegant interior with single light
2) macro of jewelry resting on velvet
3) close-up of hands placing the piece on the wearer
4) medium of wearer looking in mirror with subtle smile
5) close-up macro of jewelry against skin
6) medium wide of wearer in elegant context
7) close-up of confident expression
8) wide of jewelry in hero shot with elegant
   font text "[BRAND NAME]"
```
Style: Black + cream + gold. Cinematography: macro + crane + slow push-ins, dramatic chiaroscuro grade.
### Template 8 — Wellness Retreat Ad
```javascript
story = a guest journey through a wellness retreat
from arrival through transformation, ending in
restored calm

Scenes:
1) wide aerial of retreat in natural setting at dawn
2) medium of guest arriving at entrance
3) close-up macro of natural texture (water, stone, plants)
4) medium of yoga or meditation moment
5) close-up of relaxed face during treatment
6) medium of social wellness moment (tea, walk)
7) close-up of restored peaceful expression
8) wide of retreat at sunset with elegant font
   text "[RETREAT NAME]"
```
Style: Sage + cream + soft earth. Cinematography: smooth steadicam + macro + natural light, wellness cinematic grade.
---
## The Camera Language Library
Each shot in your story breakdown should call out a specific camera move. Vague descriptions = generic output. Use these:
```javascript
1. Drone aerial — wide establishing, top-down or
   curving descent, 16-24mm
2. Crane down — slow descent from above, 24-70mm
3. Steadicam tracking — smooth follow alongside
   subject, 35mm
4. Steadicam behind — over-the-shoulder follow, 35mm
5. Static medium — locked-off mid shot, 50mm
6. Slow push-in — gentle dolly toward subject, 50mm
7. Slow pull-out — gentle dolly away, 50mm
8. Subtle handheld — soft shake for intimacy, 35mm
9. Macro insert — extreme close-up on detail, 85mm
10. Over-shoulder lens flare — looking past subject
    into light, 50mm
11. Tilt up — slow vertical pan revealing context,
    24-35mm
12. Whip pan — fast horizontal transition, used
    sparingly
```
Drop 1 per scene. Avoid stacking 6 close-ups. The shot variety is what makes the ad feel cinematic.
---
## The Lighting Library
Lighting carries 60% of cinematic feel. Specify the time-of-day arc explicitly.
```javascript
GOLDEN HOUR:
Warm directional light, long shadows, cinematic
glow. Best for: emotional peaks, hero shots,
romantic vibes.

BLUE HOUR:
Soft ambient light, rich blues + purples, calm
and dreamy. Best for: contemplative moments,
luxury evening scenes.

TWILIGHT:
Practical lights warming interiors against deep
blue exterior, intimate mood. Best for: indoor-
to-outdoor transitions, residential scenes.

NIGHT:
Accent lighting, reflections, candles, depth
through contrast. Best for: dramatic moments,
intimate close-ups.

OVERCAST:
Diffuse daylight, neutral color temperature, no
harsh shadows. Best for: editorial fashion,
clean product hero shots.

HARD DIRECTIONAL:
Single strong light source, sculpted shadows,
high contrast. Best for: streetwear, edgy
brands, athletic.

SOFT WINDOW:
Natural diffused light from one side, gentle
falloff. Best for: UGC, intimate testimonials,
GRWM-style content.
```
For most cinematic ads: build the arc as Golden Hour → Blue Hour → Twilight across the 8 scenes. The lighting transition itself becomes part of the story.
---
## The Color Palette Library
6 ready-to-drop palettes for the production board's top bar.
```javascript
1. LUXURY EDITORIAL:
Cream, taupe, gold, soft brown, deep navy, white.

2. PREMIUM MONOCHROME:
Black, charcoal, cream, white, single brand accent.

3. WARM CINEMATIC:
Amber, terracotta, cream, deep blue, warm white.

4. COOL EDITORIAL:
Soft grey, sage, ivory, navy, muted blue, white.

5. EARTHY VINTAGE:
Terracotta, mustard, cream, olive, deep brown.

6. HIGH-CONTRAST FASHION:
Black, white, single bold pop color (red/yellow/
electric blue).
```
Drop the 6-color palette into the production board's top bar. The palette propagates through wardrobe, environment, and post grade.
---
## The Cinematography Style Templates
Drop these into the cinematography notes block to control the polish level.
### Premium Cinematic (LuxLife Retreats default):
```javascript
LENS CHARACTER: Premium glass with gentle contrast
and beautiful bokeh. Main range 16mm-85mm.
MOVEMENT STYLE: Smooth, intentional, elegant. Mix
of aerial, crane, steadicam, subtle handheld.
VISUAL PHILOSOPHY: Capture the feeling of a memory.
Natural beauty, authentic moments, luxurious details.
COLOR & POST: Warm cinematic grade. Rich golds,
deep blues, soft skin tones. Subtle bloom, polished
highlights.
```
### Editorial Fashion:
```javascript
LENS CHARACTER: Clean glass, sharp focal planes,
controlled bokeh. Main range 35mm-85mm.
MOVEMENT STYLE: Precise, deliberate. Mix of static
locked-off and smooth gimbal.
VISUAL PHILOSOPHY: Sculptural. Clean composition.
Subject as form.
COLOR & POST: High-key with controlled shadows.
Subtle desaturation. Magazine-grade precision.
```
### Edgy Streetwear:
```javascript
LENS CHARACTER: Wider focal lengths with character.
Main range 24mm-50mm. Slight imperfection welcomed.
MOVEMENT STYLE: Handheld, kinetic, deliberate
imperfection.
VISUAL PHILOSOPHY: Raw authenticity. Subject in
context. Energy over polish.
COLOR & POST: High contrast. Rich blacks. Slight
film grain. Crushed highlights.
```
### Wellness Cinematic:
```javascript
LENS CHARACTER: Soft glass, dreamy bokeh, generous
falloff. Main range 35mm-85mm.
MOVEMENT STYLE: Slow steadicam, gentle handheld,
contemplative pacing.
VISUAL PHILOSOPHY: Stillness. Breath. Restoration.
Subject as part of the natural scene.
COLOR & POST: Soft warm grade. Sage and cream tones.
Gentle bloom. Natural skin.
```
### Premium Auto:
```javascript
LENS CHARACTER: Anamorphic-feel glass. Wide for
landscape, macro for detail. Main range 14mm-100mm.
MOVEMENT STYLE: Aerial + tracking + interior macro.
Mix of speed and stillness.
VISUAL PHILOSOPHY: Solitude meets craftsmanship.
Vehicle as character. Driver as connection.
COLOR & POST: Steel and warm sunset grade. Rich
metals. Deep blues. Polished surfaces.
```
---
## 3 Skill Recipes for Reuse
If you've installed the agent system from prior lead magnets, save these to `.claude/skills/` for instant reuse.
### Skill 1 — Cinematic Storyboard
```javascript
.claude/skills/cinematic-storyboard/skill.md

NAME: Cinematic Production Board
TRIGGER: "Generate a cinematic storyboard for [BRAND]"

PROMPT TEMPLATE:
[Paste the full master production board prompt here]

VARIABLES:
- Story breakdown (8 scenes)
- Color palette (6 colors)
- Environment description
- Cinematography style (1 of 5 templates)
- Brand name for scene 8
```
### Skill 2 — Cinematic Seedance Execution
```javascript
.claude/skills/cinematic-seedance/skill.md

NAME: Cinematic Seedance Generation
TRIGGER: "Generate a cinematic ad video from this
storyboard"

PROMPT TEMPLATE:
Follow this storyboard to create an AD/Film.
Dynamic camera movement, no camera gear in the shots,
only [SUBJECT], only text in the last scene.

[STORY BREAKDOWN VERBATIM]

Constraints: maintain character identity, consistent
wardrobe, locked lighting progression, sharp clarity,
no jitter, natural movement, polished cinematic
color grade.
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
→ Don't skip the production board step. Trying to prompt Seedance directly without the visual reference causes character drift, lighting inconsistency, and chaotic camera moves.
→ Don't write vague scene descriptions. "Wide angle drone shot" beats "wide shot." Specificity reduces re-rolls.
→ Don't stack 6 close-ups in a row. Vary shot sizes (wide, medium, close-up, macro). The variety is what makes it feel cinematic.
→ Don't forget the brand reveal in scene 8. The end-frame brand text is what converts the cinematic moment into an ad.
→ Don't add dialog by default. Cinematic ads are music-led + visual. Add the constraint "no talking" unless you specifically want voiceover.
→ Don't regenerate the whole video for 1 reversed scene. Use the CapCut fix.
→ Don't skip the lighting arc. Specifying "golden hour throughout" feels flat. Specify a time-of-day progression that mirrors emotional arc.
→ Don't ignore the production board map even if you skip it visually. The path-of-action thinking is what makes the camera moves feel intentional.
→ Don't run cinematic ads as your only ad type. Mix with UGC and direct-response. Cinematic builds brand affinity. UGC converts.
→ Don't switch model archetypes mid-campaign. Audience recognition compounds when the same model returns across multiple cinematic ads.
---
## Troubleshooting
<table header-row="true">
<tr>
<td>Problem</td>
<td>Fix</td>
</tr>
<tr>
<td>Character drifts across the 8 scenes</td>
<td>Regenerate the production board until all 5 reference angles match the model. Lock the wardrobe specifics.</td>
</tr>
<tr>
<td>Lighting flickers between scenes</td>
<td>Add time-of-day specifics in both the production board prompt and the Seedance prompt.</td>
</tr>
<tr>
<td>Scene runs backward</td>
<td>Use the CapCut reverse fix. Extract sound first, then reverse video.</td>
</tr>
<tr>
<td>Camera gear visible in frame</td>
<td>Add "no camera gear, no drone, no rigs in the shots" to constraints.</td>
</tr>
<tr>
<td>Brand text appears throughout</td>
<td>Add "only text in the last scene" to constraints.</td>
</tr>
<tr>
<td>Subject talks when you don't want dialog</td>
<td>Add "no talking" to constraints.</td>
</tr>
<tr>
<td>Wardrobe changes between scenes</td>
<td>Repeat wardrobe specifics in the production board MODEL block. Lock in scenes 1, 4, and 8.</td>
</tr>
<tr>
<td>Top-down map feels useless</td>
<td>Skip it. Use the space for additional storyboard frames or larger lighting refs.</td>
</tr>
<tr>
<td>Production board renders chaotic</td>
<td>Reduce the story to 8 scenes max. Simplify the environment description.</td>
</tr>
<tr>
<td>Seedance ignores some scenes</td>
<td>Repeat the story breakdown verbatim in the Seedance prompt. The text overrides the image.</td>
</tr>
<tr>
<td>Color grade looks flat</td>
<td>Specify the color & post block explicitly in the cinematography notes.</td>
</tr>
<tr>
<td>Model's hands look distorted</td>
<td>Add "natural hands, no extra fingers, no bent limbs" to the production board MODEL block.</td>
</tr>
</table>
---
## The Daily Production Cadence
This is the routine that ships 12 cinematic ads per week.
<table header-row="true">
<tr>
<td>Day</td>
<td>Task</td>
<td>Output</td>
</tr>
<tr>
<td>Monday morning</td>
<td>Write 4 story breakdowns (1 per ad)</td>
<td>4 stories ready</td>
</tr>
<tr>
<td>Monday afternoon</td>
<td>Generate 4 production boards in ChatGPT Image 2</td>
<td>4 director's guides</td>
</tr>
<tr>
<td>Tuesday morning</td>
<td>Verify boards, fix drift, regenerate as needed</td>
<td>4 verified boards</td>
</tr>
<tr>
<td>Tuesday afternoon</td>
<td>Run 4 Seedance generations in parallel</td>
<td>4 raw cinematic ads</td>
</tr>
<tr>
<td>Wednesday morning</td>
<td>CapCut fixes, color polish, export</td>
<td>4 finished ads</td>
</tr>
<tr>
<td>Wednesday afternoon</td>
<td>Repeat for second batch of 4</td>
<td>8 total finished ads</td>
</tr>
<tr>
<td>Thursday morning</td>
<td>Write + generate 4 more (third batch)</td>
<td>12 total ads</td>
</tr>
<tr>
<td>Thursday afternoon</td>
<td>Schedule across YouTube pre-roll, Instagram Feed, Pinterest, paid Meta</td>
<td>Week's content live</td>
</tr>
<tr>
<td>Friday</td>
<td>Review performance + brief the next week's stories</td>
<td>Pattern map ready</td>
</tr>
</table>
12 cinematic ads per week. Compare to traditional production: 1 per quarter at $30K-$50K.
---
## 🎯 Closer
**Pick 1 of the 8 vertical templates. Write the 8-scene story breakdown using your brand name in scene 8. Paste it into ChatGPT Image 2 with the production board master prompt. Verify all 5 character reference angles match the model. Verify the storyboard frames don't drift. Paste the production board into Seedance 2.0 with the Seedance master prompt and the story repeated verbatim. Add the constraints. Generate. Fix any reversed scenes in CapCut. Export. You'll have your first cinematic ad in 15 minutes for $5. Once that works, run template 2 before lunch. By the end of the week you'll have 12 cinematic ads shipped. By the end of the month you'll have replaced your quarterly production shoot.**
Production shoots aren't the unit of cinematic content anymore.
Production boards are.
System > Spend.
---
