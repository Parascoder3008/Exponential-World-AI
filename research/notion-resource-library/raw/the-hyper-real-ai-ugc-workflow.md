---
title: "The Hyper-Real AI UGC Workflow"
page_id: 3c292e2e92e98051a560cf94987ba77c
layer: ugc
source: https://freebie-for-you.notion.site/3c292e2e92e98051a560cf94987ba77c
---
# The 9 Realism Details That Separate AI UGC From 100% Real Person On Camera, The Complete GPT Image 2.5 → Seedance 2.5 → CapCut Chain That Ships An Ad In 30 Minutes, The Bible GPT That Auto-Writes Every Prompt, 6 Category-Specific Reference Image Prompts, And The 24-Hour Kill-Or-Scale Matrix
## 🎯 What You're Getting
The complete workflow for AI UGC that survives the viewer's ad-detector.
Every DTC operator running paid social has watched a promising AI UGC ad die because viewers ID'd it as AI in the first 2 seconds. This guide fixes the 9 details that cause the ID.
Inside:
→ The 9 realism elements that make AI UGC indistinguishable from a real person on camera<br>→ The complete GPT Image 2.5 → Seedance 2.5 workflow inside MakeUGC (30 min start to finish)<br>→ The AI UGC Bible GPT system prompt that auto-writes your image + video prompts in 30 seconds<br>→ 6 ready-to-paste reference image prompts (skincare, supplements, fitness, fashion, food/beverage, SaaS)<br>→ The 2-minute CapCut polish that seals the iPhone-footage feel<br>→ The 24-hour kill-or-scale matrix for testing AI UGC on Meta + TikTok
Setup takes 10 minutes. The system is yours forever.
---
## ⚙️ Why Realism Details Matter More Than Model Choice
Every operator asks the wrong question first: "which model produces the most realistic AI human?"
The answer doesn't matter. Every current-gen model (Seedance 2.5, Veo 3, Kling 2.5, Runway 4) can produce a photorealistic human. The reason your AI UGC still reads as AI has nothing to do with the model.
It has everything to do with 9 realism details operators skip because they aren't documented in any model's prompt guide.
Viewers ID AI in the first 2 seconds not because the face looks wrong, but because:
- The framing is too perfect
- The lighting is too consistent
- The handheld motion is too stable
- The audio has zero room tone
- The subject stares dead-on with zero micro-expressions
- The product is displayed like a QVC clip
- The backdrop is staged instead of lived-in
- The skin looks plastic instead of translucent
- The voice sounds clean instead of imperfect
Fix those 9 details and the same model produces UGC indistinguishable from a real person on an iPhone.
This guide gives you the fixes.
---
## ⚙️ Prerequisites (10-Minute Setup)
1. **GPT Image 2.5 access** (via ChatGPT Plus / API)
2. **Seedance 2.5 access** (via Higgsfield, Replicate, or direct)
3. **MakeUGC account** (or equivalent AI UGC platform)
4. **CapCut** (free desktop or mobile version works)
5. **Meta Ads Manager + TikTok Ads Manager** access
6. **Files ready**:
	- `voice_core.md` — brand voice
	- `icp_core.md` — target ICP demographic + psychographic
	- `product_core.md` — hero SKU spec
	- `matrix_core.md` — kill/scale thresholds (populated for AI UGC specifically)
Wire the AI UGC Bible GPT (Section 3 below) once. From then on it writes every image + video prompt for you.
---
## ⚙️ The 9 Realism Details
Every detail below adds 3-5 seconds of viewer retention. Stack all 9 and your AI UGC reads as real.
### Detail 1 — Skin Subsurface Scattering
**The tell**: Plastic-looking skin with no translucency. Skin should let light pass through it slightly at ears, nostrils, and cheeks. AI defaults render skin as an opaque surface.
**The fix**: In every image prompt, add:
```plain text
skin with subsurface scattering, warm
translucency visible at ear rim +
nostril + cheek edge, natural pore
texture at 30cm view distance, soft
peach fuzz on jawline, minor skin
imperfections (2-3 visible pores,
faint under-eye shadow), avoid
plastic or airbrushed skin surface
```
This alone eliminates 60% of the "AI face" tell.
### Detail 2 — Micro-Expressions Between Beats
**The tell**: The AI subject stares dead-on into camera for the full clip. Real humans blink 15-20 times per minute, glance away every 3-5 seconds, half-smile between sentences, adjust their mouth mid-thought.
**The fix**: In every Seedance prompt for the character shot, add:
```plain text
subject blinks naturally 3-4 times
across the 8-second shot, glances
slightly off-camera at second 3, half-
smile appears at second 5, subtle
mouth adjustment between sentences,
eyes not locked to camera the entire
duration
```
Micro-expressions make the AI subject read as thinking, not performing.
### Detail 3 — Handheld Micro-Motion
**The tell**: The camera is either dead-still (tripod tell) or too shaky (over-corrected). Real handheld UGC has a specific micro-drift: subtle 1-2 pixel breathing motion + occasional larger re-frames every 2-3 seconds.
**The fix**: In every Seedance prompt, add:
```plain text
camera: handheld iPhone, subtle
breathing motion (1-2 pixel drift),
minor natural sway consistent with
subject holding phone at arm's
length, occasional slight reframe
every 2-3 seconds, avoid tripod
static and avoid over-shake
```
If Seedance can't do handheld naturally, generate on tripod then add motion in CapCut with a subtle position + rotation keyframe cycle.
### Detail 4 — Ambient Sound Layer
**The tell**: Silent background under the voice. Real iPhone footage has room tone: refrigerator hum, distant traffic, HVAC, birds, whatever ambient sound the location has.
**The fix**: In CapCut, add an ambient sound layer at -18dB to -22dB under the voiceover:
- Kitchen scene: refrigerator hum + soft appliance sound
- Bathroom scene: subtle tile echo + faucet drip
- Bedroom scene: distant traffic through window + fan
- Living room scene: HVAC + distant TV
- Outdoor scene: birds + wind + traffic
Epidemic Sound library has "room tone" tagged tracks. Download 10-15 to have on hand.
The absence of ambient sound is a hard AI tell most viewers catch subconsciously.
### Detail 5 — Imperfect Framing
**The tell**: Subject perfectly centered, product perfectly in frame, headroom mathematically correct.
**The fix**: Real UGC has framing imperfections:
- Head slightly cut off at top
- Subject 20-30% off-center (leaning left or right in frame)
- Product held at slightly awkward angle
- Occasional finger visible at edge of frame (holding the phone)
In every Seedance prompt, add:
```plain text
framing: subject slightly off-center
(15-20% left of frame), head
occasionally cut at very top of
frame, natural imperfect composition
suggesting handheld iPhone at arm's
length, product held at slightly
awkward natural angle
```
Perfect framing is the #2 AI tell after skin. Imperfect framing signals "amateur," which reads as "real."
### Detail 6 — Voice Imperfection
**The tell**: Voice sounds studio-clean with perfect pronunciation, zero breath noise, zero lip smacks, zero sibilance.
**The fix**: If using ElevenLabs or equivalent for VO:
- Enable "Style: Casual"
- Enable "Speaker Boost: Off" (adds mouth noise + breath)
- Insert intentional pauses + "um" / "so" / "like" every 3-4 sentences
- Add slight vocal fry on 1-2 words per line
- Include audible breath before longer sentences
If using human VO or lipsync: add ambient breath layer at -25dB and lip smack sounds at random 8-12 second intervals.
Clean voice reads as studio. Imperfect voice reads as iPhone.
### Detail 7 — Backdrop Authenticity
**The tell**: Clean, staged, minimalist backdrop. Real people don't clean their kitchen counter before filming a 15-second UGC.
**The fix**: Every image prompt should include:
```plain text
background: lived-in kitchen counter
with slight clutter (coffee mug from
this morning, dish rag draped over
faucet, 2-3 household items visible),
laundry basket partially in frame,
natural authentic environment, avoid
staged or minimalist backdrop
```
Vary by scene:
- Kitchen: coffee cup + laundry + dish rag
- Bathroom: hair dryer on counter + toothbrush + slightly messy
- Bedroom: unmade bed corner + laundry basket + phone charger
- Living room: throw blanket + remote + coffee table clutter
Clutter is the visual proof of "lived-in" that AI-generated backdrops always miss.
### Detail 8 — Light Temperature Drift
**The tell**: Perfect white balance held across every frame. Real iPhone footage shifts color temperature as the camera adjusts to changing light sources.
**The fix**: In every image prompt, specify light source realistically:
```plain text
lighting: warm morning window light
(4200K) from left side, secondary
cool fluorescent kitchen light (5600K)
from ceiling creating slight color
temperature mix on subject's face,
natural light source variation as
iPhone would capture, avoid perfect
color balance
```
In CapCut, add a subtle color grade with warm-to-cool shift across the clip. Applies especially if the scene extends more than 8 seconds.
### Detail 9 — Product Handling Authenticity
**The tell**: Product is displayed like a QVC clip. Perfect grip, product oriented directly to camera, no hand motion.
**The fix**: In every Seedance prompt, add:
```plain text
product handling: subject grips
product naturally (not display grip),
occasionally adjusts grip mid-shot,
product tilted at slightly random
angle (not directly at camera), one
brief moment where product is
partially out of frame as subject
gestures, avoid QVC-style perfect
product display
```
Awkward grip adjustments + occasional out-of-frame moments signal "real person handling their product," not "actor demonstrating for the camera."
---
## ⚙️ The GPT Image 2.5 → Seedance 2.5 Workflow Inside MakeUGC (30 Minutes)
The full production chain from concept to shipped UGC ad.
### Minute 0-5: Concept + Bible GPT
Open your AI UGC Bible GPT (Section 3 below). Input:
- Product SKU
- Hero pain point
- Category
- ICP (from icp_core.md)
Bible GPT auto-writes:
- 3 concept angles
- Full image prompt (GPT Image 2.5) for reference frame
- Full Seedance 2.5 prompt for video motion
- Voiceover script (30 seconds)
- CapCut edit direction
### Minute 5-10: GPT Image 2.5 Reference Frame Generation
Paste the image prompt from Bible GPT into GPT Image 2.5. Generate 4 reference frames.
Every image prompt should include all 9 realism details. If reference frame looks staged or plastic, re-prompt with tighter realism anchors before advancing to Seedance.
Pick the reference frame closest to your target aesthetic. This becomes the character + product lock for Seedance.
### Minute 10-20: Seedance 2.5 Video Generation
Upload reference frame to MakeUGC (or Higgsfield if using Seedance direct).
Paste Seedance 2.5 prompt from Bible GPT. Ensure prompt includes:
- Handheld micro-motion (Detail 3)
- Micro-expressions (Detail 2)
- Imperfect framing (Detail 5)
- Product handling authenticity (Detail 9)
- Character lock @0.97 to reference frame
- Product lock @0.95
Generate 2-3 seconds per shot. Total ad target: 15-30 seconds = 5-10 shots.
Queue all shots as a batch. Render time typically 8-12 minutes per batch.
### Minute 20-25: Voiceover + Assembly Setup
While Seedance renders, generate the voiceover:
- ElevenLabs with realism settings from Detail 6
- Or record on iPhone if you want a real voice
Import all completed Seedance shots into CapCut. Lay out on timeline in storyboard order.
### Minute 25-30: CapCut Polish (Section 5)
Apply the 2-minute polish (Section 5 below). Add ambient sound layer, subtle grain, exposure jiggle, color grade drift.
Export at 9:16, 1080p, 30fps.
Total elapsed: 30 minutes from concept input to deploy-ready UGC ad.
---
## ⚙️ The AI UGC Bible GPT (Auto-Writes Every Prompt)
The meta-prompt that eliminates the "what do I even paste into GPT Image and Seedance" bottleneck.
### Setup
1. Create a new GPT (or Claude Project)
2. Paste the system prompt below
3. Save as "AI UGC Bible"
4. Invoke whenever starting a new UGC concept
### Paste-ready Bible GPT system prompt
```javascript
You are the AI UGC Bible for [BRAND].
Model: Claude Opus 5 or GPT-5
equivalent.

Reference (paste at top of chat once):
- voice_core.md
- icp_core.md
- product_core.md
- matrix_core.md
- The 9 Realism Details

Input from operator:
- Product SKU
- Hero pain point
- Concept angle (optional; if not
  supplied, generate 3 angles first)
- Duration (default 20-30 seconds)
- Deployment platform (Meta / TikTok /
  both)

Task per invocation:
Generate a complete UGC production
package containing:

1. Concept summary (3 sentences)

2. Full GPT Image 2.5 reference frame
   prompt including ALL 9 realism
   details:
   - Subject description (age / hair /
     skin / build matching @character
     lock)
   - Wardrobe (canonical outfit from
     @character_[NAME])
   - Environment (backdrop with
     lived-in clutter per Detail 7)
   - Lighting (natural + secondary
     source per Detail 8)
   - Skin realism (subsurface
     scattering per Detail 1)
   - Framing (imperfect per Detail 5)
   - Product visibility (natural grip
     per Detail 9)
   - Camera (iPhone angle + arm's
     length distance)
   - Aspect ratio (9:16)

3. Full Seedance 2.5 video prompt per
   shot (up to 8 shots):
   - Scene description
   - Character lock @character_[NAME]
     at 0.97
   - Product lock @product_[SKU] at
     0.95
   - Camera direction (handheld micro-
     motion per Detail 3)
   - Character actions (micro-
     expressions per Detail 2)
   - Product handling (authentic grip
     per Detail 9)
   - Physics anchors
   - Duration per shot
   - Aspect ratio 9:16
   - Negative prompt (anti-artifact
     block)

4. Voiceover script (matching
   voice_core.md tone + Detail 6
   imperfections):
   - Per-shot VO copy
   - Read direction (tone / pace /
     emphasis)
   - Breath marks + pauses
   - Intentional imperfections (um /
     so / like)

5. CapCut assembly direction:
   - Timeline order (shot-by-shot)
   - Transitions (per beat)
   - Ambient sound recommendation
     (Detail 4)
   - 2-minute polish checklist
     (Section 5)
   - Export spec

6. Deployment brief:
   - Meta campaign structure
   - Naming convention
   - Initial test budget per
     matrix_core.md
   - Kill/Scale matrix trigger at
     hour 24

Total output: everything an operator
needs to ship the UGC ad in 30
minutes without any manual prompt
writing.

Guardrails:
- Every image prompt MUST include all
  9 realism details
- Every Seedance prompt MUST include
  character + product locks
- Every VO script MUST include Detail
  6 imperfections
- No em dashes
- No "Most..." openers
- No fabricated product claims
```
### Sample Bible GPT invocation
Operator types:
```plain text
Product: Vitamin C serum, hero SKU
Pain point: dark spots that won't fade
Duration: 22 seconds
Platform: Meta + TikTok
```
Bible GPT returns:
- 3 concept angles
- Full paste-ready GPT Image 2.5 prompt (\\~400 words with all 9 details)
- 6 Seedance 2.5 shot prompts (\\~150 words each with locks + realism)
- Full VO script (22 seconds, with imperfections)
- CapCut assembly brief (timeline + transitions + ambient sound recommendation)
- Deployment brief (Meta + TikTok campaign structure + test budgets + matrix trigger)
Total: 15-30 seconds for Bible GPT to output everything. Zero manual prompt engineering.
---
## ⚙️ 6 Ready-To-Paste Reference Image Prompts
One per major DTC vertical. Every prompt includes all 9 realism details. Swap product name + character reference and paste directly into GPT Image 2.5.
### Prompt 1 — Skincare
```plain text
Woman, mid-30s, natural skin tone,
minimal makeup, unstyled brunette hair,
wearing oversized white cotton t-shirt,
holding [PRODUCT SKU] Vitamin C serum
bottle in right hand at slightly
awkward natural angle. Setting: her
bathroom counter, cluttered with
toothbrush + hair dryer + open makeup
bag + coffee mug. Warm morning window
light from left at 4200K, secondary
cool bathroom fluorescent overhead at
5600K creating slight color
temperature mix on face. Skin:
subsurface scattering, warm
translucency at ear + nostril + cheek
edge, natural pore texture visible at
30cm, soft peach fuzz on jawline, 2-3
visible pores, faint under-eye shadow.
Framing: subject 20% off-center left,
head slightly cut at top of frame,
handheld iPhone at arm's length. Aspect
ratio 9:16. Avoid: plastic skin,
airbrushed complexion, staged
minimalist backdrop, perfect centered
composition, QVC-style product display.
```
### Prompt 2 — Supplements
```plain text
Man, late-20s, athletic build, 3-day
stubble, wearing gray athletic tee,
holding [PRODUCT SKU] supplement
bottle at natural angle. Setting:
kitchen counter with visible clutter
(protein shaker, cutting board,
scattered mail, coffee cup half-empty),
laundry basket partially in frame.
Lighting: warm overhead pendant light
at 3800K, natural window light spill
from right at 5200K creating mixed
color temp. Skin: subsurface
scattering on cheeks + nose bridge,
natural pore texture, faint stubble
shadow, subtle skin imperfections
(2 small blemishes, oily T-zone).
Framing: subject 15% off-center
right, head cut at forehead top,
handheld iPhone POV. Aspect ratio
9:16. Avoid: gym-influencer polish,
staged clean kitchen, perfect front-
facing product display.
```
### Prompt 3 — Fitness
```plain text
Woman, early-30s, athletic build,
minimal makeup, hair in loose ponytail,
wearing black sports bra + gray
leggings, holding [PRODUCT SKU]
recovery product at arm's length.
Setting: home gym corner with visible
imperfect equipment (yoga mat rolled
messily, water bottle on floor, towel
draped over dumbbell rack), natural
gym clutter. Lighting: bright natural
window light from behind-left at
5400K, secondary warm floor lamp at
3200K creating temperature drift.
Skin: subsurface scattering on
temples + jaw, natural sweat sheen on
forehead, visible pores, slight
redness on cheeks post-workout.
Framing: subject 20% off-center,
head partially cut top of frame,
handheld iPhone at arm's length.
Aspect ratio 9:16. Avoid: fitness-
influencer studio polish, staged
equipment, perfect athletic body
lighting.
```
### Prompt 4 — Fashion / Apparel
```plain text
Woman, mid-20s, natural skin tone,
casual makeup, hair in messy bun,
wearing [PRODUCT SKU] apparel item,
holding phone at arm's length to
show fit. Setting: her bedroom with
unmade bed corner visible, laundry
basket in frame, mirror reflection
showing rest of room clutter,
scattered clothes on floor.
Lighting: soft afternoon window
light at 4600K from side, secondary
warm bedroom lamp at 3000K creating
mixed temp. Skin: subsurface
scattering, natural pore texture,
subtle imperfections, honest
lighting on skin. Framing: subject
slightly off-center, mirror showing
partial reflection at awkward angle,
handheld iPhone POV. Aspect ratio
9:16. Avoid: influencer flat-lay
polish, staged bedroom, perfect
outfit-of-the-day framing.
```
### Prompt 5 — Food / Beverage
```plain text
Man, mid-30s, casual, wearing
weekend flannel, holding [PRODUCT
SKU] beverage bottle at natural
grip. Setting: cluttered kitchen
counter with visible weekend
breakfast prep (open jam jar, bread
crumbs, empty coffee mug, dish rag
draped over faucet), Sunday newspaper
partially visible. Lighting: warm
morning window light at 4400K from
left, secondary overhead kitchen
light at 3500K creating temp drift.
Skin: subsurface scattering, natural
morning stubble, visible pores,
honest complexion. Framing: subject
15% off-center, head cut at top,
handheld iPhone POV, product held
at slightly random angle (not
directly at camera). Aspect ratio
9:16. Avoid: food-influencer
styling, staged breakfast table,
perfect product-forward composition.
```
### Prompt 6 — SaaS / Digital Product
```plain text
Woman, early-30s, professional casual,
wearing oversized cardigan, sitting at
home office desk showing laptop
screen displaying [PRODUCT SKU]
dashboard interface. Setting: home
office with visible workday clutter
(coffee mug, sticky notes on monitor,
open notebook with handwriting,
tangled charging cables, plant
partially wilted). Lighting: soft
afternoon window light at 5000K from
left, monitor glow adding cool 6500K
to face, warm desk lamp at 3200K
creating triple-source mix. Skin:
subsurface scattering, natural
pores, slight under-eye tiredness,
honest complexion. Framing: subject
off-center right, monitor bezel
partially in frame, handheld iPhone
angled from side showing subject +
screen. Aspect ratio 9:16. Avoid:
tech-founder studio polish, staged
clean desk, perfect product
screenshot composition.
```
Every prompt uses the same 9-detail structural template. Duplicate for your other verticals by swapping subject descriptions + backdrop + lighting to match category context.
---
## ⚙️ The 2-Minute CapCut Polish (Seals The iPhone Feel)
The final polish that eliminates the last of the AI tell. Apply after assembly, before export.
### The 6 polish steps (2 minutes total)
**Step 1 — Grain overlay (15 seconds)**<br>Add "iPhone grain" LUT or grain overlay at 8-12% opacity. Simulates the compression + noise pattern of iPhone footage.
**Step 2 — Ambient sound layer (20 seconds)**<br>Drop a room-tone ambient track under the VO at -20dB. Match scene context (kitchen / bathroom / bedroom / outdoor).
**Step 3 — Micro exposure jiggle (20 seconds)**<br>Add subtle exposure keyframes across the timeline. Slight brightness ramps (± 2-3%) every 3-4 seconds. Simulates iPhone auto-exposure adjusting.
**Step 4 — Color temperature drift (15 seconds)**<br>Apply a slight color grade shifting from warmer at start to cooler mid-clip. Simulates iPhone WB adjusting to changing light.
**Step 5 — Handheld motion overlay (20 seconds)**<br>If Seedance rendered too stable, add a "handheld shake" preset at 15-25% intensity. Layered subtle position + rotation jitter.
**Step 6 — Audio compression + duck (10 seconds)**<br>Apply light audio compression + duck ambient sound under VO by -6dB during dialogue. Matches iPhone auto-audio behavior.
**Export**: 9:16, 1080p, 30fps, H.264, 6-8 Mbps bitrate (matches iPhone default recording bitrate).
Save the polish preset in CapCut. Apply to every future AI UGC in 30 seconds instead of 2 minutes.
---
## ⚙️ The 24-Hour Kill-Or-Scale Matrix For AI UGC
Standard kill/scale thresholds don't apply to AI UGC. AI UGC has different retention curves than human UGC (different failure modes = different signal thresholds).
### AI UGC-specific matrix thresholds at hour 24
**KILL if any of these fire at hour 24**:
- Hook retention 3s < 25% (viewers ID'd AI in first 2 seconds)
- CTR < 0.8% (creative not resonating regardless of AI tell)
- CPA > 2x target after minimum spend threshold hit
**SCALE if all these hit at hour 24**:
- Hook retention 3s > 40% (survived AI-detector)
- Retention 15s > 30% (concept holds interest)
- ROAS > 1.5x target
- Frequency < 1.5
**HOLD if performance within 20% of target**:
- Keep running for 48 more hours before next decision
**ITERATE if creative concept strong but format weak**:
- Retention 15s > 30% but retention 3s < 25% = concept works, hook needs refresh
- Route to Winning-Variant Iterator: same hook mechanism, different visual anchor
### Why AI UGC needs different thresholds
The failure mode for AI UGC is almost always in the first 3 seconds. If viewers make it past second 3, they're staying for the concept. This is different from human UGC where retention decays more evenly across the video.
Track hook retention 3s specifically. If AI UGC has retention 3s below 25% but retention 15s above 30%, the concept is winning but your realism details are failing. Reinforce Detail 1 (skin) and Detail 5 (framing) — those two are the highest-impact 3-second-tells.
### Daily matrix runner adaptation
Modify your existing Kill-or-Scale Matrix skill to include AI UGC classification:
```javascript
If ad.tag == "AI_UGC":
  Use AI UGC thresholds (above)
Else:
  Use standard matrix_core.md
  thresholds
```
Log AI UGC decisions separately in matrix_log.md for tracking prediction accuracy on AI UGC specifically.
---
## ⚙️ The Weekly AI UGC Cadence
**Monday 9:00 AM**: Bible GPT generates 6 AI UGC concepts + full production packages (30 min).
**Monday 10:00 AM to Tuesday 6:00 PM**: Batch-run all 6 through GPT Image 2.5 + Seedance 2.5 + CapCut polish. Total production time: 3-4 hours (all 6).
**Tuesday 6:00 PM to Wednesday 12:00 PM**: Upload to Meta + TikTok as drafts. UTM + naming enforcement.
**Wednesday 12:00 PM**: Launch approved drafts.
**Thursday 12:00 PM (hour 24 post-launch)**: AI UGC Matrix Runner fires. Kill/scale/hold/iterate decisions per ad.
**Friday**: Winners scale. Iterators route to variant generator for Monday's next batch.
Total operator time per week on AI UGC: 5-6 hours across production + review + matrix approval.<br>Ad output per week: 6 AI UGC ads (equivalent output of 6 human UGC creators at $500 each = $3,000/week saved).
---
## ⚙️ What NOT To Do
→ Don't skip the 9 realism details. Every one you skip costs 3-5 seconds of retention.
→ Don't use standard kill/scale thresholds on AI UGC. Use the AI UGC-specific thresholds (above).
→ Don't write image + Seedance prompts manually every time. Use the Bible GPT once and it writes every prompt for you.
→ Don't skip the CapCut polish. The unpolished export is 30% less realistic than the polished version.
→ Don't add all 9 details as one long paragraph in the prompt. Structure as discrete anchors so the model weighs each independently.
→ Don't use the same character reference across every ad. Rotate 3-5 locked characters weekly for audience freshness.
→ Don't run AI UGC without ambient sound. Silent audio is the fastest ID viewers can make.
→ Don't over-index on the face. Backdrop authenticity (Detail 7) and framing (Detail 5) are equally important tells.
→ Don't ship AI UGC that mimics a specific real UGC creator's face. Ethical and legal risk.
→ Don't hide that it's AI in the caption. When asked directly in comments, be honest. Denying it destroys brand trust faster than the AI tell would.
---
## 🎯 Closer
**Wire the Bible GPT once (10 min). Run the workflow every Monday: 6 AI UGC ads in 30 minutes per ad. Apply all 9 realism details every time. Polish in CapCut every time. Kill/scale with the AI UGC-specific matrix every time. In 4 weeks you're shipping 24 AI UGC ads per month at the equivalent output of a UGC production team, with hook retention 3s above 40% and viewers unable to distinguish your AI UGC from real person on iPhone. You don't hire the UGC creator. You ship the workflow.**
AI UGC is 9 realism details away from indistinguishable.
3 tools chained (GPT Image 2.5 → Seedance 2.5 → CapCut) with all 9 details applied ships the ad in 30 minutes.
Bible GPT writes the prompts so you don't have to.
---
**The 9 details + Bible GPT + 6 reference image prompts + CapCut polish + AI UGC matrix is the complete workflow. Bookmark this guide. Wire the Bible GPT today.**
---
**Bonus**: Everyone who claims this guide is invited to a free 1:1 AI Creative Strategy session (optional). If you want to workshop your specific brand's AI UGC calibration, book below.
---
