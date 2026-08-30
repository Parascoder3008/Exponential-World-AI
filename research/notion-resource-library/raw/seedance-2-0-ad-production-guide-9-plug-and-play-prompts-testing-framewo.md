---
title: "Seedance 2.0 Ad Production Guide \u2014 9 Plug-and-Play Prompts + Testing Framework"
page_id: 35192e2e92e9813abec6e91d431226d6
layer: production
source: https://freebie-for-you.notion.site/35192e2e92e9813abec6e91d431226d6
---
## The Seedance 2.0 Ad Production Guide
The complete system for producing unlimited AI video ads using Higgsfield Marketing Studio + Seedance 2.0. Every prompt. Every camera keyword. Every platform adjustment. Every testing framework.
All from a single product link.
---
## What You're Working With
Higgsfield Marketing Studio is a single workflow powered by Seedance 2.0 that goes from product to finished ad.
**The workflow:**
1. Paste a product image or product URL
2. Pick an avatar (40+ built-in or custom)
3. Select an ad style
4. Write your prompt
5. Generate
**What Seedance 2.0 handles under the hood:**
- Native audio with lip-synced speech
- Physics-aware motion (gravity, balance, fabric)
- Automatic cuts, transitions, and pacing
- Character consistency across shots
- Dual-channel stereo audio in one pass
- Up to 15 seconds per generation
- Up to 12 reference files per generation (9 images + 3 videos + 3 audio)
The model is trained by ByteDance. The people who made TikTok. It already understands what makes short-form video work.
*[📸 IMAGE PLACEHOLDER: Screenshot of Marketing Studio interface]*
---
## The Setup (Under 5 Minutes)
### Upload Your Product
**Option A:** Paste your product URL. Marketing Studio scrapes details, images, and description automatically.
**Option B:** Upload a clean product image. White or transparent background. Clean input = clean output.
> Rule: If your product image has a busy background, the AI inherits that noise. Crop it or use a cutout version.
### Select Your Avatar
Don't use the same avatar for every ad style. Real creator rosters have different people for different formats. Yours should too.
<table header-row="true">
<tr>
<td>Ad Style</td>
<td>Avatar Type</td>
<td>Energy</td>
</tr>
<tr>
<td>UGC talking head</td>
<td>Casual, relatable</td>
<td>Genuine, conversational</td>
</tr>
<tr>
<td>Unboxing</td>
<td>Enthusiastic, expressive</td>
<td>Excited, curious</td>
</tr>
<tr>
<td>Lifestyle</td>
<td>Aspirational, polished</td>
<td>Serene, effortless</td>
</tr>
<tr>
<td>Before & after</td>
<td>Trustworthy, direct</td>
<td>Confident, honest</td>
</tr>
<tr>
<td>Comparison</td>
<td>Opinionated, no-nonsense</td>
<td>Assertive, certain</td>
</tr>
<tr>
<td>Product review</td>
<td>Warm, approachable</td>
<td>Calm, helpful</td>
</tr>
<tr>
<td>Problem-solution</td>
<td>Empathetic, then confident</td>
<td>Relatable to certain</td>
</tr>
</table>
**Custom avatar prompt example:**
```javascript
Woman in her late 20s, shoulder-length wavy brown
hair, natural makeup, warm skin tone, wearing a
casual cream knit sweater. Friendly and approachable.
Looks like a real person, not a model.
```
Pin your best avatars. Reuse across campaigns.
*[📸 IMAGE PLACEHOLDER: Screenshot of avatar selection and custom creation]*
---
## The Camera Language That Makes AI Video Look Real
This is the difference between "AI slop" and "looks like a $10K shoot." Seedance treats camera direction as a first-class instruction. Using the right keywords changes everything.
### Camera Movements:
<table header-row="true">
<tr>
<td>Keyword</td>
<td>What It Does</td>
<td>Best For</td>
</tr>
<tr>
<td>`push-in / dolly in`</td>
<td>Moves toward subject</td>
<td>Tension, emphasis, emotional close-ups</td>
</tr>
<tr>
<td>`pull-out / dolly out`</td>
<td>Moves away</td>
<td>Reveals, context, endings</td>
</tr>
<tr>
<td>`pan left/right`</td>
<td>Horizontal rotation</td>
<td>Scanning, following action</td>
</tr>
<tr>
<td>`tracking shot`</td>
<td>Alongside subject</td>
<td>Action sequences</td>
</tr>
<tr>
<td>`orbit / arc`</td>
<td>Circles subject</td>
<td>Product showcases, hero moments</td>
</tr>
<tr>
<td>`handheld`</td>
<td>Natural shake</td>
<td>UGC authenticity, documentary</td>
</tr>
<tr>
<td>`gimbal`</td>
<td>Smooth stabilized</td>
<td>Polished cinematic</td>
</tr>
<tr>
<td>`crane up/down`</td>
<td>Vertical movement</td>
<td>Dramatic reveals</td>
</tr>
<tr>
<td>`rack focus`</td>
<td>Shifts focus between planes</td>
<td>Redirecting attention</td>
</tr>
<tr>
<td>`whip pan`</td>
<td>Rapid horizontal sweep</td>
<td>Urgency, transitions</td>
</tr>
<tr>
<td>`static / locked-off`</td>
<td>Zero movement</td>
<td>Subject commands the frame</td>
</tr>
</table>
**One movement per section. Never stack two movements in the same clause.**
### Speed Modifiers:
- `slow / gentle / gradual` — safest default (start here)
- `smooth / controlled` — natural rhythm
- `dynamic / swift` — use with extreme caution
> ⚠️ The word "fast" is dangerous. Making camera AND subject fast simultaneously = guaranteed jitter. Only ONE element fast. Everything else steady.
### Compound Movements:
Don't stack. Sequence.
```javascript
"start: slow dolly-in, then: gentle pan right
for the final 2 seconds"
```
Two clear phases instead of two competing instructions.
### Lighting (Biggest Impact on Quality):
<table header-row="true">
<tr>
<td>Keyword</td>
<td>Effect</td>
</tr>
<tr>
<td>`golden hour`</td>
<td>Single highest quality-per-word improvement</td>
</tr>
<tr>
<td>`soft window light from the left`</td>
<td>Natural UGC authenticity</td>
</tr>
<tr>
<td>`rim light against dark background`</td>
<td>Cinematic edge separation</td>
</tr>
<tr>
<td>`overcast daylight`</td>
<td>Even diffused, eliminates flicker</td>
</tr>
<tr>
<td>`volumetric fog`</td>
<td>Atmospheric depth</td>
</tr>
<tr>
<td>`motivated lighting from practical source`</td>
<td>Realism (visible light source)</td>
</tr>
</table>
> If you only add ONE element to a weak prompt, make it a lighting description. Official Volcengine documentation confirms lighting has the biggest impact of all prompt elements.
### Film References:
- `cinematic film tone, 35mm` — most reliable all-purpose anchor
- `16mm film, handheld` — raw indie aesthetic
- `anamorphic lens flare` — widescreen cinematic
> ⚠️ "Cinematic" alone = unpredictable output. Always pair with texture + lighting + film reference.
---
## Keywords That DEGRADE Output
<table header-row="true">
<tr>
<td>Keyword</td>
<td>Problem</td>
<td>Use Instead</td>
</tr>
<tr>
<td>`fast` (unqualified)</td>
<td>Accelerates everything</td>
<td>Name which single element moves fast</td>
</tr>
<tr>
<td>`cinematic` (alone)</td>
<td>Too vague, nothing to work with</td>
<td>Pair with texture + lighting + film reference</td>
</tr>
<tr>
<td>`epic` / `amazing` / `stunning`</td>
<td>Feelings, not visual instructions</td>
<td>Describe what the camera actually sees</td>
</tr>
<tr>
<td>`lots of movement`</td>
<td>Triggers jitter across entire frame</td>
<td>Name one specific movement</td>
</tr>
<tr>
<td>`glow` / `glimmer` / `glints`</td>
<td>Specular flicker between frames</td>
<td>Use `steady intensity` or `diffuse`</td>
</tr>
<tr>
<td>`beautiful lighting`</td>
<td>No visual meaning</td>
<td>Describe source, direction, and quality</td>
</tr>
<tr>
<td>`high quality`</td>
<td>Redundant, wastes prompt space</td>
<td>Omit entirely</td>
</tr>
</table>
**The principle:** If a word describes how the viewer should FEEL rather than what the camera should SEE, the model guesses. And it guesses wrong.
---
## The Constraint Suffix (Copy-Paste to EVERY Prompt)
```javascript
avoid jitter, avoid bent limbs, maintain face
consistency, avoid identity drift, avoid temporal
flicker, sharp clarity, natural colors, stable
picture, no blur, no ghosting, no flickering
```
Skipping this is the single most common reason for AI-looking output. Append it to every generation without exception.
---
## Platform-Specific Formatting
Decide where the ad runs BEFORE you write the prompt.
<table header-row="true">
<tr>
<td>Platform</td>
<td>Aspect Ratio</td>
<td>Length</td>
<td>Hook Window</td>
<td>Pacing</td>
</tr>
<tr>
<td>TikTok</td>
<td>9:16</td>
<td>15-30s</td>
<td>1.5 seconds</td>
<td>Fast cuts, casual</td>
</tr>
<tr>
<td>Instagram Reels</td>
<td>9:16</td>
<td>15-30s</td>
<td>2 seconds</td>
<td>Slightly polished</td>
</tr>
<tr>
<td>Instagram Feed</td>
<td>1:1 or 4:5</td>
<td>15-20s</td>
<td>3 seconds</td>
<td>Clean, composed</td>
</tr>
<tr>
<td>YouTube Pre-Roll</td>
<td>16:9</td>
<td>15s</td>
<td>5s (skip window)</td>
<td>Professional</td>
</tr>
<tr>
<td>YouTube Shorts</td>
<td>9:16</td>
<td>30-60s</td>
<td>2 seconds</td>
<td>Educational</td>
</tr>
<tr>
<td>Facebook Feed</td>
<td>1:1 or 16:9</td>
<td>15-30s</td>
<td>3 seconds</td>
<td>Problem-solution</td>
</tr>
<tr>
<td>Product Pages</td>
<td>16:9 or 1:1</td>
<td>15-30s</td>
<td>N/A (autoplay)</td>
<td>CGI or cinematic</td>
</tr>
</table>
---
## All 9 Plug-and-Play Prompts
Replace [BRACKETS] with your product. Add the constraint suffix. Generate.
---
### Prompt 1 — UGC Talking Head (TikTok/Reels)
*[📸 IMAGE PLACEHOLDER: Example output]*
```javascript
UGC style product review filmed on smartphone.
Natural bedroom window lighting, soft daylight,
no ring light, no filters.
Casual handheld selfie angle with natural shake.

[AVATAR] sits on a bed in a casual oversized t-shirt.

(0-3s) HOOK: She holds up [YOUR PRODUCT] with a
surprised expression. Speaks directly to camera:
"Okay I need to talk about this because nobody
told me about [PRODUCT NAME] and I'm kind of mad."

(3-8s) PROBLEM: Sets the product down, leans into
camera. "I've been dealing with [SPECIFIC PAIN
POINT] for months and I tried literally everything."

(8-13s) SOLUTION: Picks up [YOUR PRODUCT] again,
shows it to camera. "Then someone recommended this
and after [TIMEFRAME] my [SPECIFIC RESULT]."

(13-15s) CTA: Leans into camera with natural smile.
"Link is in my bio. You need this."

Direct phone mic audio, room ambience, natural voice.
Quick jump cuts between sections.
```
**Hook variations:**
- "Nobody told me about [PRODUCT] and I'm honestly mad"
- "I've been using [PRODUCT] for [TIME] and I need to talk about it"
- "Stop scrolling if you deal with [PAIN POINT]"
- "I keep getting asked about my [ROUTINE] so here it is"
- "[PRODUCT] changed my [ROUTINE] and I can't go back"
---
### Prompt 2 — Product Unboxing (TikTok/Reels)
*[📸 IMAGE PLACEHOLDER: Example output]*
```javascript
UGC unboxing video. Overhead camera angle looking
straight down at a clean desk. Natural daylight
from a window to the left. Warm tones.

(0-3s) HOOK: Hands pull a branded shipping box
into frame. Voiceover: "This just arrived and
I've been waiting for this all week."

(3-6s) OPEN: Hands open the packaging. ASMR
focus: tape peeling, paper crinkling. Voiceover:
"Okay the packaging alone is worth it."

(6-10s) REVEAL: Hands lift [YOUR PRODUCT] out.
Hold up for overhead camera. Slight pause.
Voiceover: "So this is [PRODUCT NAME] and it's
supposed to [KEY BENEFIT]."

(10-15s) FIRST TOUCH: Hands interact with product.
Open it, feel texture, read label. Voiceover:
"The [QUALITY DETAIL] is impressive. Full review
coming after I use it for a week."

ASMR-quality audio throughout. Overhead angle
never changes. No face on camera.
```
**Hook variations:**
- "[BRAND] just sent me something and I need to open it right now"
- "Unboxing the [PRODUCT] that sold out 3 times"
- "I ordered this at 2am and I don't regret it"
---
### Prompt 3 — Product Review / Testimonial (Instagram/Facebook)
*[📸 IMAGE PLACEHOLDER: Example output]*
```javascript
Testimonial-style video. Clean, bright background.
[AVATAR] seated on a couch. Soft natural lighting.
Single camera angle throughout. No cuts.

(0-3s) HOOK: "I've been using [PRODUCT NAME] for
[TIMEFRAME] and here's my honest take."

(3-8s) CONTEXT: "I started because I was dealing
with [PAIN POINT]. I'd tried [ALTERNATIVE 1]
and [ALTERNATIVE 2] and neither worked because
[SPECIFIC REASON]."

(8-14s) RESULT: Picks up product. "After [TIMEFRAME]
with [PRODUCT NAME], [SPECIFIC MEASURABLE RESULT].
I didn't change anything else. Just added this."

(14-18s) CLOSE: "If you're dealing with [PAIN POINT],
just try it. I wish I'd started sooner."

Conversational tone. No hard sell. Natural room audio.
```
**Hook variations:**
- "3 months with [PRODUCT NAME]. Here's what actually happened."
- "I'm not someone who recommends products but this is different"
- "Okay so I almost didn't post this but [PRODUCT] changed my [ROUTINE]"
---
### Prompt 4 — Before & After (Facebook/TikTok)
*[📸 IMAGE PLACEHOLDER: Example output]*
```javascript
Before and after demonstration.

(0-3s) BEFORE: [AVATAR] looking frustrated.
Cooler tones, flat lighting. Shows the problem.
"This was me [TIMEFRAME] ago.
[DESCRIBE VISIBLE PROBLEM]."

(3-5s) TRANSITION: Quick cut. Screen flashes white.
Text: "[X WEEKS] LATER..."

(5-10s) AFTER: Same person, same setting. Warmer
lighting. Confident. Shows the result. "This is
me now. Same [routine], I just added [PRODUCT]."

(10-13s) PROOF: Close-up of the change. Let the
visual do the talking.

(13-15s) PRODUCT: Holds up [YOUR PRODUCT].
"[SPECIFIC CHANGE]. Link in bio."

Contrast between before/after should be visible
without explanation.
```
**Hook variations:**
- "I can't believe this is the same [skin/hair/space]"
- "[TIMEFRAME] apart. One product. Same everything else."
- "I almost didn't film the before. Glad I did."
---
### Prompt 5 — Side-by-Side Comparison (YouTube/Facebook)
*[📸 IMAGE PLACEHOLDER: Example output]*
```javascript
Comparison video. Clean desk, two products side
by side. Good overhead lighting.

[AVATAR] sits behind desk, speaks to camera.

(0-3s) HOOK: "I compared [YOUR PRODUCT] to
[COMPETITOR] so you don't have to." Picks up
both, one in each hand.

(3-8s) SETUP: Shows each to camera. "[COMPETITOR]
costs [PRICE] and does [CLAIM]. [YOUR PRODUCT]
costs [PRICE] and claims [DIFFERENTIATOR]."

(8-14s) TEST: Demonstrates both. Shows the
difference. Close-up inserts during the test.

(14-18s) VERDICT: Pushes [YOUR PRODUCT] forward.
Moves competitor aside. "If you're still using
[COMPETITOR], you're wasting your money."

Confident, slightly opinionated tone.
```
**Hook variations:**
- "[PRODUCT] vs [COMPETITOR]: one clear winner"
- "Everyone recommends [COMPETITOR]. They're wrong."
- "I spent $[AMOUNT] testing [CATEGORY] products. This one won."
---
### Prompt 6 — Lifestyle Integration (Instagram/Pinterest)
*[📸 IMAGE PLACEHOLDER: Example output]*
```javascript
Lifestyle video. [YOUR PRODUCT] integrated into
a morning routine. Cinematic film tone, 35mm,
warm golden hour.

No dialogue. No voiceover. Visuals only.
Soft ambient music, natural sounds.

(0-4s) SCENE: Wide shot, sunlit kitchen. [AVATAR]
walks in wearing comfortable clothes. Slow,
relaxed movements.

(4-8s) USE: Medium shot. Reaches for [YOUR PRODUCT]
from the counter. Uses it naturally. Not
performatively.

(8-12s) DETAIL: Close-up of product being used.
Shallow depth of field. Warm light on texture.

(12-15s) MOMENT: Medium shot. She pauses. Content.
The feeling is the message. Hold 2 seconds.

Warm amber tone, soft film grain, smooth gimbal.
No CTA. Pure feeling.
```
---
### Prompt 7 — CGI Product Hero (Product Pages/Display)
*[📸 IMAGE PLACEHOLDER: Example output]*
```javascript
CGI product commercial. Ultra-clean, premium.
[YOUR PRODUCT] on polished dark surface.

(0-4s) HERO: Product on dark background. Dramatic
rim light catching edges. Shallow depth of field.
Camera: locked, static.

(4-8s) ORBIT: Slow 180-degree orbit. Light shifts
revealing angles and textures. Volumetric fog
behind.

(8-12s) MACRO: Extreme close-up on key detail.
Rack focus from background to detail. Golden light.

(12-15s) RETURN: Pull out to centered hero frame.
Single rim light from above. Hold 2 seconds.

Crushed blacks, golden highlights. No dialogue.
Subtle ambient sound. Sharp clarity, stable picture.
```
---
### Prompt 8 — Cinematic Brand Spot (YouTube Pre-Roll)
*[📸 IMAGE PLACEHOLDER: Example output]*
```javascript
Cinematic brand video. Film-grade. Anamorphic
texture, shallow depth of field.

(0-2s) INTERRUPT: Extreme close-up of something
unexpected. Single striking image. No context.

(2-5s) PROBLEM: Quick montage. 2-3 rapid cuts.
Voiceover: "You've tried everything for
[PAIN POINT]." Must hit before 5s skip window.

(5-10s) SOLUTION: Smooth transition to product.
Premium lighting. Voiceover: "[PRODUCT NAME]
[KEY BENEFIT] in [TIMEFRAME]."

(10-15s) CTA: Product centered. URL displayed.
Voiceover: "Try [PRODUCT NAME] today. [OFFER]."

Cinematic film tone, 35mm. Teal and orange.
Dramatic score.
```
---
### Prompt 9 — Problem-Solution (Facebook/Instagram)
*[📸 IMAGE PLACEHOLDER: Example output]*
```javascript
Problem-solution format. [AVATAR] speaks to camera.
Clean background, good lighting.

(0-3s) HOOK: "If you're dealing with [PAIN POINT],
stop scrolling." Direct eye contact. Hand gesture.

(3-8s) AGITATE: "I spent [MONEY/TIME] trying
[SOLUTION 1], [SOLUTION 2], [SOLUTION 3]. None
worked because [REASON]."

(8-13s) SOLVE: Holds up [YOUR PRODUCT]. "Then I
found [PRODUCT NAME]. After [TIMEFRAME],
[SPECIFIC RESULT]."

(13-15s) CTA: "Link in bio. Stop wasting money
on [ALTERNATIVES] that don't work."

Conversational. One camera angle. Minimal cuts.
```
**Hook variations:**
- "I wasted $[AMOUNT] on [CATEGORY] before I found this"
- "Everything you're using for [PAIN POINT] is wrong"
- "[PAIN POINT]? I fixed mine in [TIMEFRAME]. Here's how."
---
## The A/B Testing Framework
9 variations. 7 days. Here's the system.
### Day 1-2: Launch All 9
$10-$20 behind each. Equal budget. Run on the platforms they were built for.
### Day 3: First Kill Round
<table header-row="true">
<tr>
<td>Metric</td>
<td>Kill (below)</td>
<td>Keep (above)</td>
</tr>
<tr>
<td>Hook rate (3s views / impressions)</td>
<td>25%</td>
<td>35%</td>
</tr>
<tr>
<td>Hold rate (50%+ watched)</td>
<td>15%</td>
<td>25%</td>
</tr>
<tr>
<td>CTR</td>
<td>0.8%</td>
<td>1.5%</td>
</tr>
<tr>
<td>CPA</td>
<td>2x+ above target</td>
<td>At or below target</td>
</tr>
</table>
Kill bottom 4-5. Move budget to survivors.
### Day 4-5: Scale Survivors
Double budget on top 3-4. Watch CPA stability.
### Day 6-7: Declare Winners
After $100-$150 per surviving ad, you know which 1-2 formats work for your product.
### Then Iterate:
Take winning format. Generate 10 variations:
→ 3 different hooks
→ 2 different avatars
→ Different environments and settings
→ Platform-specific cuts (TikTok version vs. Instagram version)
> The first 9 ads find the format. The next 30 find the message. The next 100 find the scale.
---
## Hook Formulas by Ad Style
The first 1.5-3 seconds determine everything.
**UGC hooks:**
- "Nobody told me about [PRODUCT] and I'm honestly mad"
- "I've been using [PRODUCT] for [TIME] and I need to talk about it"
- "Stop scrolling if you deal with [PAIN POINT]"
- "[PRODUCT] changed my [ROUTINE] and I can't go back"
**Unboxing hooks:**
- "This just arrived and I've been waiting all week"
- "Unboxing the [PRODUCT] everyone's been talking about"
- "I ordered this at 2am and I don't regret it"
**Problem-solution hooks:**
- "If you're dealing with [PAIN POINT], stop scrolling"
- "I wasted $[AMOUNT] on [CATEGORY] before I found this"
- "Everything you're using for [PAIN POINT] is wrong"
**Comparison hooks:**
- "I compared [PRODUCT] to [COMPETITOR] so you don't have to"
- "Everyone recommends [COMPETITOR]. They're wrong."
**Cinematic hooks (visual only):**
- Extreme close-up of unexpected texture
- Slow-motion product interaction with dramatic light
- Black screen → single product reveal with rim light
---
## Which Ad Style Works Best Per Platform
<table header-row="true">
<tr>
<td>Ad Style</td>
<td>Best Platform</td>
<td>Second Best</td>
</tr>
<tr>
<td>UGC Talking Head</td>
<td>TikTok</td>
<td>Instagram Reels</td>
</tr>
<tr>
<td>Unboxing</td>
<td>TikTok</td>
<td>Instagram Reels</td>
</tr>
<tr>
<td>Product Review</td>
<td>Instagram Feed</td>
<td>Facebook</td>
</tr>
<tr>
<td>Before & After</td>
<td>Facebook</td>
<td>TikTok</td>
</tr>
<tr>
<td>Comparison</td>
<td>YouTube</td>
<td>Facebook</td>
</tr>
<tr>
<td>Lifestyle</td>
<td>Instagram Feed</td>
<td>Pinterest</td>
</tr>
<tr>
<td>CGI Product Hero</td>
<td>Product pages</td>
<td>Display ads</td>
</tr>
<tr>
<td>Cinematic Spot</td>
<td>YouTube pre-roll</td>
<td>Brand campaigns</td>
</tr>
<tr>
<td>Problem-Solution</td>
<td>Facebook</td>
<td>Instagram Feed</td>
</tr>
</table>
---
## Cost Comparison
<table header-row="true">
<tr>
<td></td>
<td>Traditional Production</td>
<td>This System</td>
</tr>
<tr>
<td>1 UGC video</td>
<td>$500-$2,000</td>
<td>Under $5</td>
</tr>
<tr>
<td>Full 9-style campaign</td>
<td>$5,000-$15,000</td>
<td>Under $50</td>
</tr>
<tr>
<td>20 test variations</td>
<td>$10,000-$40,000</td>
<td>Under $100</td>
</tr>
<tr>
<td>Turnaround</td>
<td>2-3 weeks</td>
<td>One afternoon</td>
</tr>
<tr>
<td>Revisions</td>
<td>$200-$500 each</td>
<td>Regenerate in 2 min, $0</td>
</tr>
</table>
---
## Quick Reference Card
<table header-row="true">
<tr>
<td>Step</td>
<td>Action</td>
</tr>
<tr>
<td>1</td>
<td>Paste product link or upload image</td>
</tr>
<tr>
<td>2</td>
<td>Select or create avatar matching your ICP</td>
</tr>
<tr>
<td>3</td>
<td>Choose platform → determines ratio, length, pacing</td>
</tr>
<tr>
<td>4</td>
<td>Copy the matching prompt template</td>
</tr>
<tr>
<td>5</td>
<td>Replace [BRACKETS] with your product details</td>
</tr>
<tr>
<td>6</td>
<td>Add constraint suffix at the end</td>
</tr>
<tr>
<td>7</td>
<td>Generate</td>
</tr>
<tr>
<td>8</td>
<td>Launch all 9 with $10-$20 equal budget</td>
</tr>
<tr>
<td>9</td>
<td>Kill bottom performers after $20-$30 spend</td>
</tr>
<tr>
<td>10</td>
<td>Scale winners and iterate with variations</td>
</tr>
</table>
---
**Start with Prompt 1 (UGC Talking Head) and Prompt 9 (Problem-Solution). Highest baseline conversion rate across DTC products. Generate those first, test them, build out the rest.**
