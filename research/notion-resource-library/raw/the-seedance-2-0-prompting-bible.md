---
title: "The Seedance 2.0 Prompting Bible"
page_id: 35892e2e92e980b08a32eae2d7ed916c
layer: production
source: https://freebie-for-you.notion.site/35892e2e92e980b08a32eae2d7ed916c
---
## Welcome to the Seedance 2.0 Prompting Bible
The complete prompting reference for Seedance 2.0. Every camera keyword, lighting modifier, constraint, and the exact 5-layer structure that turns $0.60 generations into scroll-stopping content.
---

## What You're Working With
Seedance 2.0 is a multimodal film set, not a text-to-video box.
In a single generation you can feed it:
- **Up to 9 reference images** — character sheets, mood boards, product photos, storyboard panels
- **Up to 3 video clips** — camera motion reference, choreography, pacing
- **Up to 3 audio tracks** — voiceover, music, sound effects
- **Plus your text prompt**
That's 12 reference files processed simultaneously. One pass. Synchronized video with dual-channel stereo audio, lip-synced speech across 8+ languages, background music, and foley.
Output: 4 to 15 seconds per generation at up to 1080p resolution.
> If you're only typing text into the prompt box, you're using about 15% of the tool.
---
## The 5-Layer Prompt Stack
**Subject → Action → Camera → Style → Constraints**
This ordering carries weight. Subject first pins the model to a center of gravity. Action second provides the kinetic anchor. Camera third locks framing. Style adds visual flavor without hijacking motion. Constraints last act as guardrails.
---
### Layer 1 — Subject
Specificity is load-bearing. Every identity marker you provide is one the model doesn't hallucinate.
<table header-row="true">
<tr>
<td>Level</td>
<td>Example</td>
</tr>
<tr>
<td>❌ Bad</td>
<td>"a woman"</td>
</tr>
<tr>
<td>⚠️ Better</td>
<td>"a young woman with brown hair"</td>
</tr>
<tr>
<td>✅ Best</td>
<td>"a woman in her late 20s, tight dark curls at ear length, small silver hoop in left ear, wearing a fitted black turtleneck, neutral expression"</td>
</tr>
</table>
**Rule:** One subject per generation is safest. Two characters work if spatially separated. Three or more is unreliable.
---
### Layer 2 — Action
Write directions, not states. Present tense. One primary movement per shot.
<table header-row="true">
<tr>
<td>Level</td>
<td>Example</td>
</tr>
<tr>
<td>❌ Bad</td>
<td>"she looks happy and is enjoying the sunset"</td>
</tr>
<tr>
<td>✅ Good</td>
<td>"she slowly turns toward the camera, breeze lifting the hem of her skirt, eyes narrowing against the light"</td>
</tr>
</table>
**Critical rule:** Always separate subject movement from camera movement.
"spinning camera around a dancing person" → the model can't tell who's supposed to spin.
"the dancer spins slowly, camera holds fixed framing" → two clear directives.
---
### Layer 3 — Camera
One primary camera movement per generation. Describe rhythm (slow, smooth, gentle) rather than technical specs.
**Static Shots:**
- `fixed` or `locked-off` — zero camera movement
- `static wide` — wide unmoving establishing shot
- `locked tripod, zero camera shake` — when ambient jitter persists
**Movements:**
- `push-in / dolly in` — toward subject (tension, emphasis)
- `pull-out / dolly out` — away from subject (reveals, context)
- `pan left/right` — horizontal rotation (scanning, following)
- `tracking shot / follow` — alongside subject (action sequences)
- `orbit / arc / 360 orbit` — circles subject (product showcases, hero moments)
- `aerial / drone shot` — high altitude (landscapes, establishing)
- `handheld` — natural shake (documentary, UGC authenticity)
- `crane up/down` — vertical movement (dramatic reveals)
- `gimbal` — smooth stabilized (polished cinematic)
- `steadicam walk` — smooth forward following through space
- `whip pan` — rapid horizontal sweep (urgency, transitions)
- `dolly zoom` — Hitchcock vertigo effect
- `rack focus` — shifts focus between foreground and background
**Speed Modifiers:**
- `imperceptible / barely` — extremely slow, almost unnoticeable
- `slow / gentle / gradual` — safest starting point (recommended default)
- `smooth / controlled` — natural rhythm
- `dynamic / swift` — high impact (use with extreme caution)
> ⚠️ The word "fast" is the most dangerous keyword in Seedance. Combining fast camera + fast subject + busy scene almost guarantees jitter. Make only ONE element fast while holding everything else steady.
**Compound movements:** Sequence them, don't stack them.
`"start: slow dolly-in, then: gentle pan right for the final 2 seconds"`
---
### Layer 4 — Style
Lighting, color grading, film references, atmosphere.
> Lighting descriptions have the single biggest impact on video quality among all prompt elements. If you only add one element to a weak prompt, make it lighting.
**Lighting Keywords:**
- `golden hour` — single highest-quality-per-word improvement
- `rim light / dramatic rim light against dark background` — cinematic edge separation
- `soft key from 45 degrees` — flattering talking-head lighting
- `overcast daylight / even overcast diffused light` — eliminates flicker
- `backlit silhouette at sunset` — dramatic mood
- `motivated lighting from practical source` — realism
- `volumetric fog` — atmospheric depth
- `chiaroscuro` — high-contrast, Godfather-style
**Color Grading:**
- `teal and orange` — classic Hollywood
- `bleach bypass` — desaturated, gritty, high-contrast
- `warm tone / amber-tinted` — nostalgic
- `crushed blacks` — deep cinematic shadows
- `pastel` — soft fashion / anime aesthetic
**Film References:**
- `cinematic film tone, 35mm` — most reliable all-purpose anchor
- `16mm film, handheld camera` — raw indie aesthetic
- `anamorphic lens flare` — widescreen cinematic
- `national geographic quality` — nature documentary
- `documentary-style handheld framing` — observational realism
> ⚠️ "Cinematic" alone produces nothing predictable. Always pair with texture, lighting, or a film reference.
> ⚠️ Words like "glow," "glimmer," and "glints" invite specular flicker. Replace with `steady intensity` or `diffuse`.
---
### Layer 5 — Constraints
The guardrails that separate AI-looking video from video that passes.
**Essential character constraints:**
- `avoid jitter`
- `avoid bent limbs` — use in EVERY character prompt
- `avoid identity drift`
- `avoid temporal flicker`
- `no distortion, no stretching`
- `maintain face consistency`
**Community quality suffix (append to every generation):**
`sharp clarity, natural colors, stable picture, no blur, no ghosting, no flickering`
---
## Keywords That Actively Degrade Output
<table header-row="true">
<tr>
<td>Keyword</td>
<td>Problem</td>
<td>Fix</td>
</tr>
<tr>
<td>`fast` (unqualified)</td>
<td>Accelerates everything simultaneously</td>
<td>Name which single element moves fast</td>
</tr>
<tr>
<td>`cinematic` (alone)</td>
<td>Nothing to work with</td>
<td>Pair with texture + lighting + film reference</td>
</tr>
<tr>
<td>`epic`</td>
<td>No visual meaning to a diffusion model</td>
<td>Describe the actual scale</td>
</tr>
<tr>
<td>`amazing / beautiful / stunning`</td>
<td>Feelings, not instructions</td>
<td>Describe what the camera sees</td>
</tr>
<tr>
<td>`lots of movement`</td>
<td>Triggers jitter everywhere</td>
<td>Name one specific movement</td>
</tr>
<tr>
<td>`glow / glimmer / glints`</td>
<td>Specular flicker</td>
<td>Use `steady intensity` or `diffuse`</td>
</tr>
</table>
**The principle:** If a word describes how the viewer should feel rather than what the camera should see, the model has to guess. And it guesses wrong.
---
## Time-Coded Multi-Shot Prompting
Direct individual shots within a single 15-second generation using timestamps.
**Format A (Range Brackets):**
```javascript
[0-4s]: wide establishing shot, static camera, misty bamboo forest at dawn
[4-9s]: medium shot, slow push-in, the fighter steps forward
[9-15s]: close-up, orbit shot, the fighter strikes, slow motion
```
**Format B (Parenthetical):**
```javascript
(0-3s) macro shot of perfume bottle, shallow depth of field
(3-7s) camera glides closer, a hand enters frame
(7-12s) slow-motion spray, mist diffuses in air
(12-15s) pull-out to hero frame, product centered
```
**The 15-Second Climax Arc:**
<table header-row="true">
<tr>
<td>Timestamp</td>
<td>Shot</td>
<td>Purpose</td>
</tr>
<tr>
<td>0-4s</td>
<td>Wide, static</td>
<td>World established</td>
</tr>
<tr>
<td>4-8s</td>
<td>Medium, slow push-in</td>
<td>Tension building</td>
</tr>
<tr>
<td>8-12s</td>
<td>Close-up, one detail in focus</td>
<td>Emotional peak</td>
</tr>
<tr>
<td>12-15s</td>
<td>Extreme close-up or reveal</td>
<td>Climax, slow motion or hold</td>
</tr>
</table>
Wide → tighter → tight → closest. The universal escalation pattern.
---
## The @ Reference System
Every uploaded file needs an explicit role tag in your prompt. An image without an @ tag gets processed ambiguously.
**The First-Last Frame Technique:**
Upload your desired first frame as `@Image1` and last frame as `@Image2`. Describe what happens between them. Seedance interpolates coherent motion connecting the two endpoints.
---
## 5 Ready-to-Run Prompts
---
### Prompt 1 — The Talking Head (UGC)

```javascript
15 seconds UGC style review video, filmed on smartphone, natural bedroom
window lighting, casual handheld selfie angle, a young woman with brown
hair pulled back, natural skin with visible texture, wearing a casual grey
t-shirt, in her cozy bedroom, she holds a product up to the camera with
genuine excitement, quick jump cut slightly closer angle, she applies it
showing the texture, jump cut she leans into the camera with a natural
smile, the lighting is soft natural daylight no ring light no filters,
direct phone mic audio room ambience natural voice
```
---
### Prompt 2 — The Product Hero

```javascript
ultra cinematic 15-second luxury product commercial, smooth continuous
sequence elegant pacing, fluid cinematic glide macro dolly plus soft
orbit plus gentle push-ins, (0-3s) macro shot of product on dark surface
shallow depth of field rim light catching edges, (3-7s) camera glides
closer warm light rakes across surface revealing texture, (7-11s) slow
motion detail moment volumetric lighting, (11-15s) pull-out to centered
hero frame product isolated premium minimalist background, sharp clarity
no jitter stable picture
```
---
### Prompt 3 — The Cinematic Scene

```javascript
cinematic film tone 35mm warm golden hour lighting, a man in his 40s
with weathered features sits at a wooden desk in a sun-drenched workshop
carefully carving walnut wood, slow push-in from medium shot to close-up
on his hands, dust motes float in the light beams from the window,
shallow depth of field background softly blurred, earthy color palette,
quiet ambient sound of wood shavings, avoid jitter avoid bent limbs,
stable picture no temporal flicker
```
---
### Prompt 4 — The Action Sequence (Time-Coded)

```javascript
high-intensity cinematic fight in a misty bamboo forest 15 seconds
photorealistic, [0-4s]: wide establishing shot static camera mist
rolling between bamboo stalks golden hour light two fighters face each
other, [4-8s]: medium tracking shot the fighter in white lunges forward
with a spinning strike fluid orbital tracking follows the motion,
[8-12s]: low-angle power shot impact moment slow motion bamboo leaves
scatter, [12-15s]: pull-out wide shot the fighter in white stands
victorious rim light separating figure from mist, film grain anamorphic
texture, avoid bent limbs maintain face consistency
```
---
### Prompt 5 — The Full Multimodal Production

```javascript
@Image1 as character reference (maintain exact facial features and outfit)
@Image2 as environment reference (match lighting and color palette)
@Video1 for camera motion reference (replicate the slow orbit movement)
@Audio1 as background music (sync scene transitions to beat positions)

15-second cinematic sequence 16:9 2K resolution, character from @Image1
walks through the environment from @Image2, camera performs slow orbit
matching @Video1's motion arc, scene transitions align with beat positions
of @Audio1, golden hour rim lighting shallow depth of field, maintain
character identity across all frames, avoid identity drift avoid jitter
avoid temporal flicker, sharp clarity stable picture
```
---
## The Iteration Rule
Generate 2-3 baseline options with your prompt. Then change **one variable** — the camera, the lighting, the speed modifier. One thing.
Score each generation for continuity and adherence. Keep the best version. Change one more variable.
> The instinct after a failed generation is to rewrite the entire prompt. Don't. Controlled iteration with one variable per pass converges faster. Same principle that makes A/B testing work better than redesigns.
**Quick fix:** If movement is too subtle, drop `dynamic motion` or `vibrant energy` at the start of the prompt. These act as global intensity modifiers.
---
## Quick Reference Card
<table header-row="true">
<tr>
<td>Layer</td>
<td>What It Does</td>
<td>Key Rule</td>
</tr>
<tr>
<td>Subject</td>
<td>Pins the model's focus</td>
<td>One subject per generation is safest</td>
</tr>
<tr>
<td>Action</td>
<td>Provides kinetic anchor</td>
<td>Write directions, not states</td>
</tr>
<tr>
<td>Camera</td>
<td>Locks framing</td>
<td>One movement per generation</td>
</tr>
<tr>
<td>Style</td>
<td>Adds visual flavor</td>
<td>Lighting has the biggest impact</td>
</tr>
<tr>
<td>Constraints</td>
<td>Closes gaps</td>
<td>Always append the quality suffix</td>
</tr>
</table>
---
**Bookmark this. Keep it open while generating. Use it as a working reference, not something you read once.**
---
