---
title: "The GRWM AI Workflow: GPT Image 2 + Seedance 2.0"
page_id: 36192e2e92e980f2a4b1cfa33dbef407
layer: production
source: https://freebie-for-you.notion.site/36192e2e92e980f2a4b1cfa33dbef407
---
## 🎯 What This Gives You
A complete AI workflow that produces $50K-quality fashion lookbook content for $3 per video.
2 tools. 2 master prompts. 25+ copy-paste variations. 15-second loopable GRWM videos in under 20 minutes.
This is the system replacing fashion photoshoots, lookbook production, and styling content for DTC fashion brands at 7 and 8 figures. You don't shoot in a studio. You don't book models. You don't book locations. You generate a 16-frame storyboard in GPT Image 2, feed it into Seedance 2.0 with a timeline prompt, and ship 8 lookbook videos a week.
By the end of this guide, you'll have the full prompt library, 8 ready-to-run outfit variations, 6 brand-style templates, cross-platform format specifications, a 30-day content calendar, and the troubleshooting fixes for every common drift.
---
## ⚙️ Why GRWM Works as a Format
Before the prompts, the format math.
GRWM (Get Ready With Me) is the highest-performing fashion content format on TikTok and Instagram Reels right now. The reason isn't aesthetic. It's structural.
The format triggers 3 specific viewer behaviors that platforms reward:
→ **Loop completion** — viewers watch end-to-end because they want to see the final look. The structure rewards the wait.
→ **Saves over likes** — the content gets bookmarked because it's reference material for outfit assembly, not entertainment. Saves rank higher than likes in modern algorithms.
→ **Repeat views** — viewers re-watch to study specific styling moments (the watch close-up, the belt buckle, the shoe step-in). Repeat views compound watch time.
That's why your GRWM videos can outperform polished brand spots even when the production quality is technically lower. The format is platform-native. Brand spots are platform-adjacent.
The 16-frame structure exists because that's the maximum amount of visual information a viewer can absorb in 15 seconds without losing track. Below 12 frames feels thin. Above 20 feels chaotic. 16 is the sweet spot.
---
## ⚙️ The 2-Tool Stack
<table header-row="true">
<tr>
<td>Tool</td>
<td>Job</td>
<td>Output</td>
</tr>
<tr>
<td>GPT Image 2</td>
<td>Generates a 16-frame storyboard grid showing every styling step</td>
<td>1 reference image with all 16 frames laid out</td>
</tr>
<tr>
<td>Seedance 2.0</td>
<td>Reads the storyboard and produces a smooth 15-second GRWM video</td>
<td>Loopable lookbook video with match cuts</td>
</tr>
</table>
The unlock is the storyboard image. Most operators try to prompt Seedance directly with text and get inconsistent characters across cuts. Feeding it a structured 16-frame storyboard fixes that. The storyboard locks: model identity, wardrobe progression, lighting consistency, background, and posing reference. Seedance just animates what's already locked in the image.
This is the same insight that made Olivio Sarikas's storyboard method viral for cinematic ads — except adapted for the GRWM format specifically.
---
## Step 1 — Build the 16-Frame Storyboard in GPT Image 2
The storyboard tells GPT Image 2 to lay out every styling step in 1 image. Seedance reads this image as the visual reference for every frame in the final video.
### Why 4x4 grid (not 3x3 or 5x5):
→ 3x3 = 9 frames. Too few to cover base layer + outer layer + accessories + footwear + final.<br>→ 4x4 = 16 frames. Perfect math: 4 frames per styling phase, 4 phases.<br>→ 5x5 = 25 frames. The grid renders too small and detail is lost.
The 4x4 grid math also matches Seedance's 4-second timeline blocks. 4 frames per block × 4 blocks = 16 frames over 16 seconds (rounded to 15 in the actual video for platform optimization).
### The full Storyboard FORMAT prompt (copy verbatim):
```javascript
FORMAT:
4:5 vertical storyboard collage, 1080×1350,
high-resolution
Style: luxury editorial, Pinterest-saveable, minimal

CONCEPT:
Get Ready With Me — Outfit

LAYOUT:
4×4 grid (16 frames), equal spacing, clean margins,
soft beige background

FRAMES (LEFT → RIGHT, TOP → BOTTOM):

1. White tee base
2. Trousers wear
3. Tuck adjustment
4. Mirror check

5. Shirt layering
6. Blazer on shoulders
7. Sleeve adjustment
8. Fabric movement

9. Watch close-up
10. Necklace placement
11. Belt buckle
12. Sunglasses on

13. Shoes step-in
14. Walking shot
15. Bag grab
16. Final look pose

VISUAL STYLE:
Neutral palette (beige, white, black), soft natural
light, subtle shadows, clean interior background

MODEL:
Single subject, consistent framing, calm expressions,
editorial posture

TYPOGRAPHY:
Minimal serif font, small step indicators (1–16),
optional title:
"GET READY WITH ME — OUTFIT"

COMPOSITION:
Symmetrical grid, aligned edges, consistent crop
per frame, high detail, no clutter

OUTPUT:
Clean, aesthetic, bookmark-worthy infographic
```
### 4 ready-to-copy model archetype prompts:
Drop any of these into the MODEL block of the storyboard prompt to lock model identity across the 16 frames.
**Editorial millennial woman:**
```javascript
MODEL:
Woman in her early 30s, dark brown hair pulled back
in a low ponytail with face-framing pieces, warm
olive skin, brown eyes, soft natural makeup, calm
editorial expressions, consistent center framing,
relaxed posture
```
**Casual Gen-Z woman:**
```javascript
MODEL:
Woman in her early 20s, shoulder-length wavy brown
hair with subtle highlights, light tan skin with
natural freckles, brown eyes, minimal makeup, slight
warm smile, consistent framing, casual posture
```
**Minimalist editorial man:**
```javascript
MODEL:
Man in his late 20s, short dark hair with slight wave,
light olive skin, brown eyes, clean-shaven, neutral
expression, consistent center framing, athletic but
relaxed posture
```
**Mature lifestyle woman:**
```javascript
MODEL:
Woman in her early 40s, shoulder-length straight
dark hair with subtle grey at the temples, fair skin
with visible texture, hazel eyes, no makeup or
barely-there makeup, calm centered expression,
elegant posture
```
### 5 lighting variant prompts:
Drop into the VISUAL STYLE block to control mood.
```javascript
1. Soft natural daylight from a window to the left,
   warm afternoon tones, subtle shadows on the
   model's right side

2. Golden hour amber light streaming through floor-to-
   ceiling windows, long warm highlights, soft glow

3. Overcast diffuse daylight, neutral color
   temperature, even fill, no harsh shadows

4. Hard directional light from above (studio softbox),
   defined shadows under chin and accessories

5. Warm tungsten table lamp light, evening interior,
   amber-orange tones, dimmer ambient
```
### 6 brand-style variant templates:
Each template swaps the entire VISUAL STYLE + LAYOUT background + MODEL posing in 1 block.
**Luxury editorial:**
```javascript
VISUAL STYLE:
Cream, taupe, gold accents, soft natural light,
marble accents in background, golden hour glow,
editorial composure
```
**Streetwear:**
```javascript
VISUAL STYLE:
Monochrome black + cream + 1 pop accent color,
hard directional light, defined shadows, slightly
raw aesthetic, concrete urban background, slight
film grain
```
**Athletic / activewear:**
```javascript
VISUAL STYLE:
Bright vibrant palette with 1 bold accent color,
fresh open studio or urban gym entrance, bright
natural daylight, energetic posture, athletic
framing
```
**Minimalist Scandinavian:**
```javascript
VISUAL STYLE:
White, off-white, soft grey, black palette, white
plaster wall, blonde wood floor, even diffuse Nordic
daylight, serene posture, neutral expressions
```
**Boho / vintage:**
```javascript
VISUAL STYLE:
Earth tones with terracotta and mustard accents,
vintage 70s film aesthetic, warm afternoon light,
natural fabrics, layered textures, relaxed posture
```
**Y2K / trend-forward:**
```javascript
VISUAL STYLE:
Saturated metallic accents, baby pink, lavender,
electric blue, soft gradient background, slightly
glossy aesthetic, playful posture, expressive
framing
```
### Verification checklist (run before Step 2):
→ Are all 16 frames showing the same model with consistent face structure?<br>→ Is the wardrobe progression logical (base layer → outer layer → accessories → shoes → final)?<br>→ Are the lighting and background consistent across all 16 frames?<br>→ Are the step indicators (1-16) clearly visible and readable?<br>→ Does the overall image read as a single cohesive collage, not a chaotic patchwork?
If any of those drift, regenerate. The storyboard image is what locks character identity for the video. A drifted storyboard produces a drifted video. Spend 2 extra minutes here to save 30 minutes of regeneration downstream.
---
## Step 2 — Build the Seedance 2.0 Timeline Prompt
The timeline prompt turns the static storyboard into a 15-second video with smooth pacing across the 4 styling phases.
### Why timeline blocks work:
The 4-second block structure isn't arbitrary. It maps to the average TikTok viewer's attention cycle. Every 4 seconds, the brain expects a beat change or visual reset. By giving Seedance 4 styling actions per 4-second block, you keep the viewer engaged without overwhelming them.
This is the same principle that made fast-cut MTV editing dominate music videos. The cadence matches cognitive rhythm.
### The full Seedance FORMAT prompt (copy verbatim):
```javascript
Use provided storyboard image as reference

CONCEPT:
Get Ready With Me — Outfit

TIMELINE:

0:00–0:04
- White tee base
- Trousers wear
- Tuck adjustment
- Mirror check

0:04–0:08
- Shirt layer
- Blazer on
- Sleeve adjust
- Body turn

0:08–0:12
- Watch
- Necklace
- Belt
- Sunglasses

0:12–0:15
- Shoes
- Walk
- Final look

STYLE:
Minimal, neutral tones, soft natural light, clean
background

CAMERA:
Close-up + mid shots, steady framing, shallow depth
of field

TRANSITIONS:
Match cuts, fabric motion, clean jump cuts

OUTPUT:
Loopable, smooth pacing
```
### What each block does:
→ **TIMELINE blocks** map each 4-second segment to specific styling actions. Match these to the corresponding frames in your storyboard. Block 1 = frames 1-4, Block 2 = frames 5-8, Block 3 = frames 9-12, Block 4 = frames 13-16.
→ **STYLE block** locks the visual aesthetic. Must mirror the storyboard's Visual Style block exactly. Mismatched style between storyboard and video = identity drift.
→ **CAMERA block** controls shot variety. "Close-up + mid shots" prevents the video from defaulting to flat single-distance framing. The shallow depth of field separates subject from background.
→ **TRANSITIONS block** is what makes the video loopable. Match cuts + fabric motion + clean jump cuts is the rhythm that hits viral on TikTok and Reels.
→ **OUTPUT block** signals to Seedance that the final frame should connect cleanly back to the first frame for seamless looping. Without this line, the model ends in a random frame state.
### Length variant prompts:
Default is 15 seconds. Swap the TIMELINE block for these alternatives.
**30-second extended (more accessory detail):**
```javascript
TIMELINE:

0:00–0:08 (Base layers)
- White tee base
- Trousers wear
- Tuck adjustment
- Mirror check

0:08–0:16 (Outer layers)
- Shirt layering
- Blazer on shoulders
- Sleeve adjustment
- Fabric movement (slow motion)

0:16–0:24 (Accessories — close-up macro)
- Watch close-up macro
- Necklace placement detail
- Belt buckle close-up
- Sunglasses on (slow)

0:24–0:30 (Final assembly)
- Shoes step-in
- Walking shot
- Bag grab
- Final look pose with hold
```
**45-second cinematic (with intro and outro frames):**
```javascript
TIMELINE:

0:00–0:05 (Setup — empty room reveal)
- Empty bedroom shot
- Outfit pieces on bed
- Wardrobe opens
- Hand reaches in

0:05–0:15 (Base layers)
[Same as default 15s structure]

0:15–0:30 (Outer + accessories)
[Combined extended detail]

0:30–0:40 (Final look reveal)
- Shoes step-in
- Walking shot
- Mirror final check
- Door opens

0:40–0:45 (Outro)
- Subject walking out
- Door closes behind
- Final empty room shot
- Loop back to setup
```
### Cross-platform aspect ratio variants:
**TikTok / Instagram Reels (9:16 vertical):**
```javascript
ASPECT RATIO: 9:16 vertical
RESOLUTION: 1080×1920
HOOK PLACEMENT: First 1.5 seconds — bold visual
beat (mirror check or hand reach)
```
**Instagram Feed / Facebook Feed (1:1 square):**
```javascript
ASPECT RATIO: 1:1 square
RESOLUTION: 1080×1080
HOOK PLACEMENT: First 3 seconds — center-framed
opening shot with clear subject focus
```
**YouTube Shorts (9:16 vertical, longer):**
```javascript
ASPECT RATIO: 9:16 vertical
RESOLUTION: 1080×1920
LENGTH: 30-45 seconds
HOOK PLACEMENT: First 5 seconds — narrative setup
before styling begins
```
**Pinterest Idea Pin (4:5 vertical):**
```javascript
ASPECT RATIO: 4:5 vertical
RESOLUTION: 1080×1350
HOOK PLACEMENT: Static title overlay in first 2
seconds, optimized for save behavior
```
---
## Step 3 — Generate Loopable Output
Loopable means the final frame visually connects back to the first frame, so when the video auto-replays on TikTok or Reels, the viewer doesn't notice the seam. The platforms count seamless replays as additional watch time, which compounds in the algorithm.
### The 3 transition rules:
**Match cuts:** Cut on a matching action across frames. A hand reaching for the watch transitions to a hand placing the necklace. The motion connects the cut. Match cuts feel intentional even when the locations or angles change between frames.
**Fabric motion:** When transitioning between styling layers, let fabric movement carry the cut. A sleeve adjustment fades into a blazer drape. The fabric is the visual bridge that makes the transition feel cinematic without using actual fade effects.
**Clean jump cuts:** No fades, no crossfades, no transition effects. Hard cuts between frames. The pacing is what makes the cuts feel intentional. Fades feel dated and dilute the GRWM aesthetic.
### The loopable frame structure:
→ **Frame 1 (0:00):** Subject in base layer, looking down at phone or mirror, hand reaching toward an outfit piece.<br>→ **Frame 16 (0:15):** Subject in final look, walking out of frame OR looking down at phone again with similar body posture.
If Frame 1 and Frame 16 share visual symmetry (same body posture, same gaze direction, similar framing distance), the loop reads seamlessly. The viewer's brain interprets it as 1 continuous cycle.
### Audio and music direction:
GRWM is a silent visual format by default. Audio is layered in post.
**BPM rules:**
→ 120-130 BPM for high-energy GRWM (workout, evening out, party)<br>→ 90-110 BPM for casual GRWM (workday, weekend, brunch)<br>→ 70-90 BPM for cinematic GRWM (luxury, editorial, slow lookbook)
**Sound trends to use:**
→ Trending TikTok sounds for organic reach (rotate weekly)<br>→ Branded ambient soundscapes for premium positioning<br>→ ASMR-style fabric sounds (zip, button, fabric rustle) for sensory hook content
**When to use voiceover:**
→ Founder-led GRWM (founder narrating the outfit choices)<br>→ Educational GRWM ("this jacket is built for X")<br>→ Storytelling GRWM ("getting ready for my best friend's wedding")
For most lookbook content, music-only is the move. Voiceover dilutes the visual focus.
### Caption hook variations:
The caption shows for 1-2 seconds before the algorithm decides whether to keep showing your video. These hooks are what determine watch-through.
```javascript
1. "POV: getting ready for [SPECIFIC OCCASION]"

2. "This $X outfit changed how I dress for work"

3. "GRWM in [BRAND NAME] — under $X for the
    full look"

4. "What I wear when I want to look [ADJECTIVE]"

5. "[NUMBER] pieces. 1 outfit. Saved this for my
    next [OCCASION]."

6. "Outfit recipe: [DESCRIPTOR] meets [DESCRIPTOR]"

7. "Dressing for [SEASON/WEATHER/CITY]"

8. "Why I'm obsessed with [SPECIFIC PIECE]
    this season"
```
---
## The Outfit Variation Cookbook (8 Ready-to-Run GRWMs)
Once the FORMAT prompts are dialed, swap the frame content to produce different scenarios. Each variation reuses the same Storyboard FORMAT prompt — only the FRAMES block changes.
### Variation 1 — Casual Workday
```javascript
FRAMES:
1. White tee base
2. Trousers wear
3. Tuck adjustment
4. Mirror check
5. Cardigan layer
6. Sneakers step-in
7. Hair pull-back
8. Subtle earrings
9. Light watch
10. Tote bag grab
11. Coffee mug pickup
12. Phone in pocket
13. Door reach
14. Walking out shot
15. Sidewalk step
16. Final look pose
```
### Variation 2 — Evening Out
```javascript
FRAMES:
1. Slip dress base
2. Hair styling
3. Lipstick application
4. Mascara touch
5. Heel step-in
6. Heel adjust
7. Statement earrings
8. Cocktail ring
9. Mirror check
10. Clutch grab
11. Perfume spritz
12. Coat drape
13. Hand on doorknob
14. Walking shot from behind
15. Half-turn over shoulder
16. Final pose facing camera
```
### Variation 3 — Workout
```javascript
FRAMES:
1. Sports bra base
2. Leggings pull-on
3. Waistband adjust
4. Mirror check
5. Tank top layer
6. Hoodie zip-up
7. Hair tie
8. Sneakers step-in
9. Watch on
10. Water bottle grab
11. Earbuds in
12. Phone armband
13. Bag sling
14. Door open
15. Stretch in doorway
16. Walking out final
```
### Variation 4 — Weekend Brunch
```javascript
FRAMES:
1. Linen tee base
2. Wide-leg jeans
3. Belt buckle
4. Mirror check
5. Light blazer
6. Sleeve roll
7. Pendant necklace
8. Layered bracelets
9. Loafers step-in
10. Sunglasses on
11. Tote grab
12. Phone in hand
13. Door reach
14. Walking shot
15. Sidewalk turn
16. Final pose with sunlight
```
### Variation 5 — Business Travel
```javascript
FRAMES:
1. Button-up shirt base
2. Tailored trousers
3. Tuck adjustment
4. Mirror check
5. Blazer on shoulders
6. Watch on wrist
7. Tie or scarf adjust
8. Briefcase hand grab
9. Loafers step-in
10. Phone check
11. Hotel key card
12. Coffee from room
13. Door close
14. Hallway walk
15. Elevator step-in
16. Lobby final pose
```
### Variation 6 — Wedding Guest
```javascript
FRAMES:
1. Slip undergarment
2. Midi dress step-in
3. Zip up the back
4. Mirror check
5. Blowout finish
6. Earring placement
7. Lipstick application
8. Perfume spritz
9. Heel step-in
10. Heel strap adjust
11. Clutch grab
12. Wrap or shawl drape
13. Final mirror check
14. Door open
15. Walking shot in venue
16. Final pose at entrance
```
### Variation 7 — Beach Day
```javascript
FRAMES:
1. Bikini top base
2. Bikini bottom on
3. Mirror check
4. Cover-up dress over
5. Sunglasses on
6. Sun hat placement
7. Layered necklaces
8. Anklet on
9. Sandals step-in
10. Tote with towel grab
11. Sunscreen application
12. Phone in beach bag
13. Beach bag sling
14. Door open
15. Walking on sand
16. Final pose with ocean
```
### Variation 8 — Winter Layered
```javascript
FRAMES:
1. Thermal base layer
2. Sweater over
3. Trousers tuck
4. Mirror check
5. Wool coat on shoulders
6. Scarf wrap
7. Beanie on
8. Gloves on
9. Boots step-in
10. Boot zip-up
11. Bag sling
12. Phone in pocket
13. Final mirror check
14. Door open to snow
15. Walking shot in snow
16. Final pose with breath visible
```
For each variation:
1. Swap the FRAMES block in the Storyboard FORMAT prompt
2. Match the TIMELINE blocks in the Seedance FORMAT prompt
3. Keep STYLE, CAMERA, TRANSITIONS, OUTPUT identical for brand consistency
---
## The 30-Day GRWM Content Calendar
This is the cadence that builds a recognizable fashion presence on TikTok and Reels in 1 month.
### Week 1 — Establish the model and brand voice
→ Day 1: Variation 1 (Casual Workday) — set the baseline aesthetic<br>→ Day 3: Variation 1 again with a different lighting variant<br>→ Day 5: Variation 1 again with a different brand-style variant<br>→ Day 7: Recap reel showing 3 versions of the same look
### Week 2 — Introduce occasion variety
→ Day 8: Variation 2 (Evening Out)<br>→ Day 10: Variation 4 (Weekend Brunch)<br>→ Day 12: Variation 5 (Business Travel)<br>→ Day 14: "Outfit for every occasion" carousel post
### Week 3 — Seasonal or trend-led content
→ Day 15: Current season variation (Summer = Beach, Winter = Layered, etc.)<br>→ Day 17: Trending color or silhouette of the moment<br>→ Day 19: Y2K or boho variant for trend-forward audience<br>→ Day 21: "What's trending this season" recap
### Week 4 — Audience-driven content
→ Day 22: Variation requested by comments (workout, wedding, etc.)<br>→ Day 24: Lookbook for a specific buyer persona<br>→ Day 26: Behind-the-scenes "how I plan an outfit" content<br>→ Day 28: Best-of-month compilation reel
### Day 30 — Audit
→ Identify the top 3 videos by save rate, hook rate, and watch-through<br>→ Note the patterns (model, lighting, brand variant, frame content)<br>→ Lock those patterns for next month's content
---
## A/B Testing Framework for GRWM
Don't post and pray. Test systematically.
### What to test:
→ Model archetype (which face holds attention?)<br>→ Lighting variant (which mood converts to saves?)<br>→ Brand style template (which aesthetic ranks?)<br>→ First 1.5 seconds (which hook frame stops the scroll?)<br>→ Caption hook formula (which question gets the most comments?)<br>→ Music BPM (which tempo holds watch-through?)
### Kill thresholds (cut after 48 hours):
<table header-row="true">
<tr>
<td>Metric</td>
<td>Kill Below</td>
</tr>
<tr>
<td>Hook rate (3-sec view)</td>
<td>30%</td>
</tr>
<tr>
<td>Hold rate (full watch-through)</td>
<td>25%</td>
</tr>
<tr>
<td>Save rate</td>
<td>1% of views</td>
</tr>
<tr>
<td>Engagement rate</td>
<td>3%</td>
</tr>
</table>
### Scale thresholds (boost or reproduce):
<table header-row="true">
<tr>
<td>Metric</td>
<td>Scale Above</td>
</tr>
<tr>
<td>Hook rate</td>
<td>45%</td>
</tr>
<tr>
<td>Hold rate</td>
<td>50%</td>
</tr>
<tr>
<td>Save rate</td>
<td>4% of views</td>
</tr>
<tr>
<td>Engagement rate</td>
<td>8%</td>
</tr>
</table>
The save rate is the metric that matters most for fashion content. Saves correlate to purchase intent.
---
## Cost & Speed Math
<table header-row="true">
<tr>
<td></td>
<td>Traditional Photoshoot</td>
<td>This System</td>
</tr>
<tr>
<td>1 lookbook video</td>
<td>$5K-$15K (small shoot)</td>
<td>$3</td>
</tr>
<tr>
<td>8 lookbook videos</td>
<td>$40K-$120K (full shoot day)</td>
<td>$24</td>
</tr>
<tr>
<td>Quarterly lookbook</td>
<td>$50K-$200K</td>
<td>$36-$48</td>
</tr>
<tr>
<td>Turnaround</td>
<td>2-4 weeks</td>
<td>20 minutes per video</td>
</tr>
<tr>
<td>Reshoots</td>
<td>$2K-$5K each</td>
<td>Regenerate, $3</td>
</tr>
<tr>
<td>Production team</td>
<td>6-10 people</td>
<td>0</td>
</tr>
<tr>
<td>Iteration speed</td>
<td>1 lookbook per quarter</td>
<td>8+ lookbooks per week</td>
</tr>
<tr>
<td>Seasonal refresh</td>
<td>Full reshoot</td>
<td>Swap 4 frames</td>
</tr>
</table>
For a 7-figure DTC fashion brand, this saves $50K-$200K per quarter while increasing content output 30x.
---
## What NOT to Do
→ Don't skip the storyboard step. Trying to prompt Seedance directly without the storyboard image causes character drift and inconsistent outfits across cuts. The storyboard is what locks the model.
→ Don't use 12 frames or 20 frames. Stay at 16 in a 4x4 grid. The grid math is what GPT Image 2 renders cleanly. Other counts produce uneven cropping.
→ Don't add cinematic camera moves (drone, orbit, crane). GRWM is intimate. Steady framing is the format's signature. Cinematic moves push the video into "ad" territory and lose the platform-native feel.
→ Don't switch model archetypes mid-campaign. Audience recognition compounds when the same model returns across 5+ lookbooks. Switching breaks the recognition loop.
→ Don't fade transitions or use crossfades. Match cuts and clean jump cuts are what make the video feel viral-native. Fades feel like 2018 Instagram.
→ Don't ignore the OUTPUT: Loopable line. Without it, Seedance ends the video in the wrong frame state and the loop has a visible seam.
→ Don't add dialogue or voiceover by default. GRWM is a silent visual format. Music or ambient sound only. Add voiceover only for founder-led or storytelling content.
→ Don't post all 8 weekly variations on the same day. Spread across the week to maintain feed cadence. Platform algorithms penalize burst posting.
→ Don't run the same outfit variation 3 times in 1 week. Rotate variations for variety. Audience boredom is the silent killer.
→ Don't skip the verification checklist on the storyboard. 2 minutes verifying saves 30 minutes of regeneration.
---
## Troubleshooting
<table header-row="true">
<tr>
<td>Problem</td>
<td>Fix</td>
</tr>
<tr>
<td>Model looks different across the 16 frames</td>
<td>Regenerate the storyboard image until all 16 angles show the same model. Lock the model archetype prompt verbatim across runs.</td>
</tr>
<tr>
<td>Lighting flickers between frames in the video</td>
<td>Repeat the lighting description verbatim in both Storyboard STYLE and Seedance STYLE blocks. Don't paraphrase.</td>
</tr>
<tr>
<td>Outfit pieces appear in the wrong order</td>
<td>Reorder the FRAMES block in the storyboard so it matches dressing logic (base → layers → accessories → shoes → final).</td>
</tr>
<tr>
<td>Video doesn't loop cleanly</td>
<td>Make sure Frame 1 and Frame 16 share visual symmetry (same body posture, same gaze direction). Always include "OUTPUT: Loopable"</td>
</tr>
<tr>
<td>Camera moves feel chaotic</td>
<td>Strip cinematic moves. Use "Close-up + mid shots, steady framing, shallow depth of field" exactly.</td>
</tr>
<tr>
<td>Transitions look soft or blurred</td>
<td>Replace any "fade" or "blend" language with "match cuts, clean jump cuts"</td>
</tr>
<tr>
<td>Background changes across frames</td>
<td>Lock background description in both Storyboard and Seedance prompts. Don't paraphrase.</td>
</tr>
<tr>
<td>Model's hands look distorted on close-ups</td>
<td>Add "natural hands, no extra fingers, no bent limbs" to the Storyboard MODEL block.</td>
</tr>
<tr>
<td>Final look doesn't match brand aesthetic</td>
<td>Swap the VISUAL STYLE block to one of the 6 brand variant templates above.</td>
</tr>
<tr>
<td>Storyboard renders with text artifacts</td>
<td>Move the TYPOGRAPHY block to the bottom of the prompt, or remove it entirely if not needed.</td>
</tr>
<tr>
<td>Save rate below 1% on every variation</td>
<td>The model archetype isn't matching the audience ICP. Swap to a different archetype and re-test.</td>
</tr>
<tr>
<td>Hook rate below 30% on every variation</td>
<td>The first frame isn't a strong scroll-stopper. Test starting with mirror check or hand reach instead of base layer.</td>
</tr>
</table>
---
## The Daily Production Cadence
This is the routine that ships 8 GRWM videos a week.
<table header-row="true">
<tr>
<td>Day</td>
<td>Task</td>
<td>Output</td>
</tr>
<tr>
<td>Monday morning</td>
<td>Generate 2 storyboards (variations 1 and 2)</td>
<td>2 storyboard images</td>
</tr>
<tr>
<td>Monday afternoon</td>
<td>Run Seedance on both storyboards</td>
<td>2 finished GRWM videos</td>
</tr>
<tr>
<td>Tuesday morning</td>
<td>Generate 2 storyboards (variations 3 and 4)</td>
<td>2 more storyboards</td>
</tr>
<tr>
<td>Tuesday afternoon</td>
<td>Run Seedance on both</td>
<td>4 total finished videos</td>
</tr>
<tr>
<td>Wednesday morning</td>
<td>Generate variation 5 + brand variant swap on variation 1</td>
<td>2 more storyboards</td>
</tr>
<tr>
<td>Wednesday afternoon</td>
<td>Run Seedance on both</td>
<td>6 total finished videos</td>
</tr>
<tr>
<td>Thursday</td>
<td>Reshoot any frames that drifted, generate 2 backups</td>
<td>8 total finished videos</td>
</tr>
<tr>
<td>Friday</td>
<td>Schedule across TikTok, Reels, Instagram Feed, Pinterest</td>
<td>Week's content live</td>
</tr>
</table>
8 platform-native GRWM videos per week. Replaces what used to be 1 quarterly photoshoot.
---
## 🎯 Closer
**Pick 1 of the 8 outfit variations. Paste the Storyboard FORMAT prompt into GPT Image 2 with your variation's frame content swapped in. Verify all 16 frames show the same model with consistent styling using the verification checklist. Paste the Seedance FORMAT prompt into Seedance 2.0 with the storyboard image as the reference. Run. You'll have your first GRWM video in 20 minutes for $3. Once that works, run variation 2 before lunch. By the end of the week you'll have 8 lookbook videos shipped. By the end of the month you'll have replaced your quarterly photoshoot.**
Photoshoots aren't the unit of fashion content anymore.
Workflows are.
System > Spend.
---
