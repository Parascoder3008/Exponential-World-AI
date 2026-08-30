---
title: "The AI UGC Factory System"
page_id: 38692e2e92e98078b7c1c60346e781c8
layer: ugc
source: https://freebie-for-you.notion.site/38692e2e92e98078b7c1c60346e781c8
---
# The AI UGC Factory System: 4 Stations, Clean Handoffs, 16+ Lip-Synced Videos Per Creator Per Batch
---
## 🎯 What You're Getting
The exact 4-station assembly line that turns 1 product brief into 16+ synchronized lip-synced UGC videos per AI creator per batch. Hub (MakeUGC) holds your creator roster. Scripts (Claude) generates the script swarm. Visuals (GPT Image 2) batches the character + product references. Animation (Seedance 2.0) animates with lip-sync locked across every variation. Factory output deploys directly to Meta + TikTok — no Canva polishing, no CapCut editing, no manual stitching.
The full 4-station factory architecture. The handoff protocol between each station (no context loss between stages). The synchronized lip-sync protocol that keeps all 16+ videos lip-locked. The deploy-ready output workflow that skips Canva + CapCut entirely. 6 vertical templates calibrated for skincare, supplements, fitness, fashion, food/bev, and tech.
You stop running ad hoc creative experiments. You stop manually editing each Seedance output. You stop watching lip-sync drift between 1 video and the next in the same batch. You install the 4 stations. Brief once. The factory runs the assembly line. 16+ deploy-ready videos roll off the end per creator.
By the end of this guide, you'll have:
→ The 4-station factory architecture (Hub / Scripts / Visuals / Animation) with each station's role + outputs<br>→ The handoff protocol between each station (no context loss)<br>→ The synchronized lip-sync protocol that locks lip-sync across 16+ variations per creator<br>→ The "no Canva, no CapCut" polish workflow (factory output deploys directly)<br>→ The master setup prompts for each station (paste-ready)<br>→ 6 vertical-specific factory configurations<br>→ The daily factory throughput matrix (calibrating output volume to ad spend)<br>→ The daily production cadence for sustaining 5-10 creators producing 80-160 videos per day
If you're already running the AI Swarm system (100+ variations across creators flooding the niche) or the 4-Tool Production Line (per-campaign briefing), the Factory is the **steady-state operational layer** — the production line that runs daily on its own infrastructure once configured. Swarm is for niche flooding. Factory is for consistent daily output.
---
## ⚙️ The Hidden Mechanism — Why Assembly-Line Beats One-Off Creative Generation
Every standard AI UGC workflow has the same broken loop:
1. Operator opens MakeUGC + Claude + GPT Image 2 + Seedance separately
2. Briefs each tool from scratch per video
3. Manually transfers outputs between tools
4. Polishes each video in Canva + CapCut individually
5. Deploys 1-3 videos at a time
6. Repeats for each new video
5-10 videos per session. Operator becomes the bottleneck. Each handoff loses brief context.
The factory fix is structural: each station has a defined input + output spec. Outputs flow downstream automatically. The operator briefs once at Station 1 (or 2), and 16+ finished videos roll off Station 4 per creator.
→ **Defined input/output specs** — each station knows what to expect + what to produce<br>→ **Clean handoffs** — no manual transfers, outputs feed downstream programmatically<br>→ **Batch processing** — Station 4 animates 16 variations per creator in one Seedance batch<br>→ **Synchronized lip-sync** — all 16 videos lock to the same voice + lip-sync model<br>→ **No polish step** — factory output is deploy-ready, skipping Canva + CapCut entirely
The fix is not better tools. The fix is **encoding the assembly line as a 4-station factory with defined handoffs** — the thing that lets 1 brief produce 16+ finished videos per creator without operator intervention at every step.
---
## ⚙️ The 4-Station Factory Architecture
<table header-row="true">
<tr>
<td>Station</td>
<td>Tool</td>
<td>Input</td>
<td>Output</td>
</tr>
<tr>
<td>1. Hub</td>
<td>MakeUGC</td>
<td>Creator archetype spec</td>
<td>5-10 AI creator profiles ready for routing</td>
</tr>
<tr>
<td>2. Scripts</td>
<td>Claude (Script Swarm Skill)</td>
<td>Product brief + ICP</td>
<td>16+ scripts per creator (8-12 hook variations)</td>
</tr>
<tr>
<td>3. Visuals</td>
<td>GPT Image 2 (batched via MakeUGC)</td>
<td>Scripts + creator + product reference</td>
<td>16+ visual references per creator</td>
</tr>
<tr>
<td>4. Animation</td>
<td>Seedance 2.0</td>
<td>16+ visual references + locked voice</td>
<td>16+ synchronized lip-synced UGC videos per creator</td>
</tr>
</table>
Operator interaction:
→ Configure Hub once (set up creator roster)<br>→ Brief Scripts station (60-second product brief)<br>→ Approve script swarm<br>→ Hands-off Stations 3 + 4 (batch processing runs automatically)<br>→ Spot-check final output (random 10-15% QC)<br>→ Deploy
Per creator: 16+ videos. Run 5-10 creators in parallel = 80-160 deploy-ready videos per batch.
---
## ⚙️ The Stack
<table header-row="true">
<tr>
<td>Layer</td>
<td>Tool</td>
<td>Job</td>
</tr>
<tr>
<td>Hub</td>
<td>MakeUGC</td>
<td>Maintains 5-10+ AI creator profiles, batch-orchestrates downstream stations</td>
</tr>
<tr>
<td>Scripts</td>
<td>Claude (with Script Swarm Skill in Project)</td>
<td>Generates 16+ unique scripts per creator from 1 brief</td>
</tr>
<tr>
<td>Visuals</td>
<td>GPT Image 2 (called via MakeUGC API or batch chained inside Lovart/Higgsfield)</td>
<td>Batch generates 16+ visual references per creator</td>
</tr>
<tr>
<td>Animation</td>
<td>Seedance 2.0 inside MakeUGC</td>
<td>Animates 16+ videos per creator with lip-sync locked to 1 voice clone per creator</td>
</tr>
<tr>
<td>Polish</td>
<td>NONE (factory output deploys directly)</td>
<td>Skip Canva + CapCut entirely</td>
</tr>
<tr>
<td>Deploy</td>
<td>Native scheduling (Buffer / Later / native Meta scheduler)</td>
<td>Schedule across Meta + TikTok</td>
</tr>
</table>
The factory's distinguishing feature: NO polish layer. Output is deploy-ready by design.
---
## ⚙️ The Workflow Math
Manual UGC workflow: 60-120 min per video × 5-10 videos = 5-20 hours per batch. Operator is the bottleneck.
This factory: 60-second brief + batch processing runs overnight = 80-160 videos by next morning. Operator time: 30 min for brief + spot-check + deploy approval.
The leverage shift: you stop being the operator at every station and become the briefer + reviewer. The bottleneck moves from manual coordination to creative direction (which the 6 vertical templates fix).
---
## ⚙️ Station 1 — Hub (MakeUGC Creator Roster)
The Hub holds your AI creator profiles. Each profile is a reusable asset with:
→ Locked face identity (1 character reference image, 4K)<br>→ Voice clone (saved voice profile, 5-10 second sample for lip-sync)<br>→ Wardrobe defaults (typical outfits for that creator)<br>→ Setting defaults (typical environments)<br>→ Demographic + psychographic tags (age, vibe, target audience)
Set up the roster once. 5-10 creators per brand = enough variety for the factory.
### Creator Roster Setup Specs
<table header-row="true">
<tr>
<td>Creator Slot</td>
<td>Demographic</td>
<td>Vibe</td>
<td>Voice Type</td>
</tr>
<tr>
<td>Creator 01</td>
<td>Woman 25-32</td>
<td>Casual chic, warm</td>
<td>Mid-tone, friendly</td>
</tr>
<tr>
<td>Creator 02</td>
<td>Woman 28-38</td>
<td>Refined, peer-credible</td>
<td>Warm authoritative</td>
</tr>
<tr>
<td>Creator 03</td>
<td>Man 30-42</td>
<td>Confident operator</td>
<td>Direct, peer-to-peer</td>
</tr>
<tr>
<td>Creator 04</td>
<td>Woman 22-28</td>
<td>Energetic, Gen Z</td>
<td>Bright, expressive</td>
</tr>
<tr>
<td>Creator 05</td>
<td>Man 35-50</td>
<td>Founder-archetype</td>
<td>Calm, decisive</td>
</tr>
<tr>
<td>Creator 06</td>
<td>Woman 32-45</td>
<td>Sophisticated, luxury</td>
<td>Refined, intimate</td>
</tr>
<tr>
<td>Creator 07</td>
<td>Man 22-30</td>
<td>Athletic</td>
<td>Focused, dynamic</td>
</tr>
<tr>
<td>Creator 08+</td>
<td>(Add per brand niche)</td>
<td>(Match niche)</td>
<td>(Match niche)</td>
</tr>
</table>
Save each creator in MakeUGC with the locked face + voice. The factory routes scripts to creators based on script angle + creator match.
---
## ⚙️ Station 2 — Scripts (Claude Script Swarm)
Claude generates 16+ unique scripts per creator from 1 product brief. The factory's brief format:
```plain text
PRODUCT: [name + key specs]
ICP: [target audience]
HOOK ANGLES TO COVER: [pick 4-8 from: ingredient education, 30-day result, peer comparison, founder note, before/after, daily ritual, pattern interrupt, problem/solution]
CREATORS TO ROUTE TO: [pick 5-10 from your Hub roster]
```
Claude outputs:
→ 16+ scripts per creator (cycling through the 4-8 hook angles)<br>→ Each script tied to a specific creator + hook angle<br>→ Voice tone calibrated to each creator's archetype<br>→ Length: 15 seconds per script (or 30 second per script if briefed)
Total scripts per batch: 5-10 creators × 16+ scripts = 80-160 scripts.
Generation time: 5-10 minutes for the full script swarm.
---
## ⚙️ Station 3 — Visuals (GPT Image 2 Batched)
Each script needs a visual reference (creator + product in scene). Station 3 batches these:
For each script:
1. Pull the assigned creator's locked face reference from Hub
2. Generate the scene context (setting + lighting + product placement)
3. Output a single still reference image at 4K
Batch processing (orchestrated via MakeUGC's batch generation):
→ 80-160 visual references generated in parallel<br>→ Each reference matches its assigned script + creator<br>→ Identity locked to MakeUGC creator reference
Generation time: 30-60 minutes for the full batch.
---
## ⚙️ Station 4 — Animation (Seedance 2.0 Synchronized Lip-Sync)
The final station animates each reference + script into a finished 15-second video.
The synchronized lip-sync protocol:
1. Pull each creator's saved voice clone from Hub
2. For each video, lock voice to that creator's clone (NOT a fresh voice per generation)
3. Seedance generates the video with lipsync targeting the locked voice
4. All 16+ videos per creator share the same voice + lipsync style
This is what makes the factory output feel like "1 real creator" instead of "16 random AI clips."
Batch processing time: 4-6 hours overnight for 80-160 videos.
Wake up to 80-160 finished UGC videos. Spot-check 10-15%. Deploy.
---
## ⚙️ The Handoff Protocol Between Stations
Each station's output must be a clean input for the next station. Define the handoff specs:
### Station 1 → Station 2 (Hub → Scripts)
Hub passes to Claude:
- Creator IDs + demographic + vibe tags
- Voice clone references (for lipsync planning)
- Default settings per creator
Claude uses this to assign scripts to the right creator.
### Station 2 → Station 3 (Scripts → Visuals)
Scripts pass to GPT Image 2:
- Script text (with hook + action notes)
- Assigned creator ID (for face reference)
- Setting context (from script)
- Product reference
GPT Image 2 generates the visual reference matching this brief.
### Station 3 → Station 4 (Visuals → Animation)
Visuals pass to Seedance:
- Visual reference image (locked character + product)
- Script dialogue
- Assigned voice clone ID (from Hub)
- Camera + motion direction (from script)
Seedance animates with all anchors locked.
### Station 4 → Deploy (No Polish)
Seedance output passes directly to scheduler:
- 9:16 vertical, 4K, 15s
- Native captions (auto-generated if needed)
- Synced audio
- Deploy-ready
NO Canva. NO CapCut. NO manual editing.
---
## ⚙️ The Synchronized Lip-Sync Protocol
This is the trick that makes 16+ videos per creator feel like one consistent person.
Standard workflow: each Seedance generation produces a slightly different voice. 16 videos = 16 different voices.
Factory workflow:
1. For each creator in Hub, save a single voice clone (5-10 second sample)
2. In Station 4 (Animation), every video for that creator references the SAME voice clone ID
3. Seedance synthesizes audio matching that specific voice clone
4. Lip-sync renders against the consistent voice
Result: all 16+ videos for Creator 01 sound identical. Viewer can't tell they're different generations.
When you scale to 5-10 creators × 16 videos each = 80-160 videos that read as "5-10 distinct real people each producing 16 videos."
### The Voice Clone Setup
Generate the first video for each creator with full attention:
1. Pick the best script for that creator
2. Run Seedance with full QC
3. Confirm voice quality matches the creator's archetype
4. Extract voice clone, save to MakeUGC voice library with creator ID
5. All future generations for that creator reference the saved clone
This is a one-time setup per creator. After that, the factory uses the locked voice automatically.
---
## ⚙️ The "No Canva, No CapCut" Polish Workflow
The factory's distinguishing feature: deploy-ready output without manual editing.
Standard workflow output:
→ Drop in CapCut<br>→ Trim dead air<br>→ Color grade<br>→ Add captions in Canva or CapCut<br>→ Brand typography overlay<br>→ Export 3 aspect ratios
Factory workflow output:
→ Seedance generates with native captions enabled<br>→ Seedance includes brand-aligned color profile in generation<br>→ Seedance outputs at the right aspect ratio (9:16 default)<br>→ Deploy directly
How to make this work:
1. **Native captions** — modern Seedance versions auto-generate burned-in captions. Enable in generation settings.
2. **Color grade baked in** — include brand color tone in the visual reference prompt ("warm cinematic with slight desaturation, brand palette: [HEX codes]"). Color grade renders at generation time.
3. **Aspect ratio at generation** — Seedance generates 9:16 vertical natively. Skip the resize step.
4. **No dead air to trim** — instruct Seedance "tight pacing, no silence at start or end" in the prompt.
5. **Brand typography optional** — if brand requires overlay, generate the video with overlay slot pre-allocated (top or bottom 10% of frame) and have a designer add ONCE per brand (reusable template).
Total polish time per batch: 0 minutes (with overlay template setup once).
---
## ⚙️ The Master Factory Setup
### Master Claude Script Swarm Prompt
Paste into Claude Project named "[Brand] Factory."
```javascript
You are the Factory Script Swarm Generator
for [BRAND NAME].

Your job: take a product brief and output 16+
scripts per creator from the Hub roster.

Project context (loaded once):
- Brand kit: [BRAND]
- ICP: [PROFILE]
- Brand voice: [VOICE SAMPLES]
- Hub creator roster (with demographic + vibe
  per creator): [LIST FROM MAKEUGC]
- Voice clone IDs per creator: [LIST]

Brief input (operator provides):
- PRODUCT: [name + specs]
- HOOK ANGLES (4-8): [list]
- CREATORS TO ACTIVATE (5-10 from Hub): [list]
- DURATION: 15s standard

Output structure:

For each activated creator, generate 16 scripts.

Vary across:
- Hook angles (cycle through the 4-8 angles
  provided)
- Settings (vary per creator's natural settings)
- Pace (mix of energetic + calm)
- Specific product angle (vary mechanism,
  result, ritual, comparison)

Each script:
- 15 seconds (45-60 words at natural pace)
- Hook (0-3s)
- Body (3-12s)
- CTA (12-15s)
- Include filler words ('um', 'like',
  'honestly')
- Match the creator's archetype voice

Output format per creator:

CREATOR [ID] — [DEMOGRAPHIC + VIBE]
Voice clone ID: [LOCKED]
Setting defaults: [LOCKED]

Script 01: [SCRIPT] | Hook angle: [ANGLE]
Script 02: [SCRIPT] | Hook angle: [ANGLE]
...
Script 16: [SCRIPT] | Hook angle: [ANGLE]

(Repeat for all activated creators)

Total: 5-10 creators × 16 scripts = 80-160
scripts ready for Station 3 batch generation.

Compliance:
- Use brand voice from samples
- Never invent product claims not in project
  memory
- Match the creator's archetype tone
- Vary hooks across the 16 scripts per creator
  (no duplicate hooks)
```
### Master GPT Image 2 Batch Visual Prompt
For each script in the swarm:
```javascript
Generate a UGC visual reference for [CREATOR ID]
+ [PRODUCT].

CREATOR (lock identity from Hub reference):
- [DEMOGRAPHIC]
- [LOCKED FACE REFERENCE IMAGE FROM HUB]

PRODUCT (lock from product reference):
- [PRODUCT NAME + VISUAL DETAILS]

SCENE:
- Setting: [FROM SCRIPT NOTES]
- Lighting: natural [WINDOW LEFT/RIGHT/GOLDEN
  HOUR]
- Composition: off-axis, character holding
  product at chest level, soft focus on
  background

Identity lock anchors:
- Visible skin pores, natural texture
- Tiny stray hairs at hairline
- iPhone screenshot quality
- No AI smoothing

OUTPUT: 1024×1024 PNG, deploy-ready reference
for Seedance Station 4.
```
### Master Seedance Animation Prompt
For each visual reference in the batch:
```javascript
Animate this reference into a 15-second UGC
video.

CHARACTER lock:
- Use reference image @[VISUAL REFERENCE ID]
- Voice clone: @[CREATOR VOICE CLONE ID FROM
  HUB]

PRODUCT lock:
- Maintain product appearance from reference

DIALOGUE (lock to voice clone):
"[SCRIPT BODY FROM STATION 2]"

Camera:
- Handheld iPhone aesthetic
- 1-2 pixel vertical sway
- Autofocus breathing
- Off-axis framing maintained

NATIVE CAPTIONS:
Enable burned-in captions at bottom 1/3 of
frame. Auto-sync to dialogue.

CONSTRAINTS:
- Maintain exact face identity from reference
- Maintain exact product appearance
- Maintain voice continuity from voice clone
  (no fresh voice generation)
- Tight pacing — no dead air at start or end
- Brand color tone: [BRAND COLOR PROFILE]

OUTPUT: 15s, 9:16 vertical, 4K, deploy-ready
(no polish required).
```
---
## ⚙️ 6 Vertical Templates
Each is a vertical-specific factory configuration.
### Vertical 1 — Skincare
```javascript
Factory name: [BRAND] Skincare Factory
Hub creators: women 28-40, varied skin tones,
bathroom morning context defaults
Voice clones: warm peer-credible
Default settings: bathroom counter, vanity,
soft natural light
Top hook angles: ingredient education, 30-day
result, sensitive skin testimonial,
before/after, routine integration
Output ratio: 5 creators × 16 scripts = 80
videos per batch
```
### Vertical 2 — Supplements
```javascript
Factory name: [BRAND] Supplement Factory
Hub creators: men + women 30-50, kitchen
morning context, peer-credible
Voice clones: calm, authoritative
Default settings: kitchen counter, morning
light, coffee mug visible
Top hook angles: mechanism, 30-day energy
result, ingredient origin, founder note,
peer comparison, daily ritual
Output ratio: 7 creators × 16 scripts = 112
videos per batch
```
### Vertical 3 — Fitness / Athletic
```javascript
Factory name: [BRAND] Fitness Factory
Hub creators: athletic 22-40, home gym +
outdoor contexts, varied body types
Voice clones: focused, dynamic
Default settings: home gym, post-workout,
outdoor trail
Top hook angles: performance metric, recovery
speed, athlete endorsement, mechanism,
peer challenge
Output ratio: 5 creators × 16 scripts = 80
videos per batch
```
### Vertical 4 — Fashion
```javascript
Factory name: [BRAND] Fashion Factory
Hub creators: style-aware 25-45, varied
aesthetic, bedroom GRWM contexts
Voice clones: confident, casual
Default settings: bedroom, full mirror,
golden hour
Top hook angles: outfit recipe, occasion fit,
capsule wardrobe, styling tip, drop
exclusivity
Output ratio: 6 creators × 16 scripts = 96
videos per batch
```
### Vertical 5 — Food / Beverage
```javascript
Factory name: [BRAND] Food/Bev Factory
Hub creators: foodie warm 25-45, kitchen +
cafe contexts
Voice clones: warm, delighted
Default settings: kitchen counter, café,
golden hour
Top hook angles: taste reaction, ingredient
origin, craft story, daily ritual,
recipe inspo
Output ratio: 5 creators × 16 scripts = 80
videos per batch
```
### Vertical 6 — Tech / SaaS / Devices
```javascript
Factory name: [BRAND] Tech Factory
Hub creators: operators / founders 28-48, home
office contexts
Voice clones: peer-to-peer, decisive
Default settings: home office, laptop in
frame, neutral daylight
Top hook angles: operator pain, metric
improvement, time saved, founder story,
workflow integration
Output ratio: 5 creators × 16 scripts = 80
videos per batch
```
---
## ⚙️ Side-By-Side: One-Off Generation vs Factory Assembly Line
<table header-row="true">
<tr>
<td>Element</td>
<td>One-Off Generation</td>
<td>Factory Assembly Line</td>
</tr>
<tr>
<td>Brief frequency</td>
<td>Per video (5-10/session)</td>
<td>Per batch (1 brief = 80-160 videos)</td>
</tr>
<tr>
<td>Operator hours per batch</td>
<td>5-20 hours</td>
<td>30 min</td>
</tr>
<tr>
<td>Voice consistency across batch</td>
<td>Drifts per generation</td>
<td>Locked per creator via voice clone</td>
</tr>
<tr>
<td>Polish required per video</td>
<td>5-10 min in Canva + CapCut</td>
<td>0 min (deploy-ready)</td>
</tr>
<tr>
<td>Output per session</td>
<td>5-10 videos</td>
<td>80-160 videos</td>
</tr>
<tr>
<td>Setup time</td>
<td>None (per video)</td>
<td>2-4 hours one-time per brand factory</td>
</tr>
<tr>
<td>Best for</td>
<td>Custom one-offs</td>
<td>Daily steady-state production</td>
</tr>
</table>
The mechanism: the factory front-loads setup time (configure Hub, save voice clones, set defaults) to eliminate per-video operator time. After setup, batch outputs scale linearly without operator hours.
---
## ⚙️ The Daily Factory Throughput Matrix
Calibrate factory output to your ad spend capacity.
<table header-row="true">
<tr>
<td>Daily Ad Spend</td>
<td>Recommended Factory Output</td>
</tr>
<tr>
<td>$500-$1,000/day</td>
<td>5 creators × 16 videos = 80 videos/batch, 2 batches/week</td>
</tr>
<tr>
<td>$1,000-$5,000/day</td>
<td>7 creators × 16 videos = 112 videos/batch, 3 batches/week</td>
</tr>
<tr>
<td>$5,000-$10,000/day</td>
<td>10 creators × 16 videos = 160 videos/batch, 4-5 batches/week</td>
</tr>
<tr>
<td>$10,000+/day</td>
<td>10+ creators × 20+ videos = 200+ videos/batch, daily batches</td>
</tr>
</table>
Match factory throughput to your testing budget. Over-producing wastes generation credits. Under-producing starves Meta + TikTok's algorithm.
### Sample Math: $3,000/day operator
- Output: 112 videos/batch × 3 batches/week = 336 videos/week
- Deploy distribution: 336 videos across 5-10 ad accounts at $30-$50 daily budget per video
- Algorithm finds 30-40 winners per week
- Scale top 10 winners to $200-$500/day
- Top performers become evergreen, freeing budget for next batch
---
## ⚙️ The Integration Playbook
The Factory is the **daily steady-state production layer** of your DTC operations.
### Recommended weekly cadence:
→ Monday: Run Factory batch 1 (80-160 videos)<br>→ Monday afternoon: Deploy across Meta + TikTok<br>→ Tuesday: Hour-24 matrix on Monday batch<br>→ Wednesday: Run Factory batch 2<br>→ Thursday: Matrix on Wednesday batch<br>→ Friday: Final batch of the week<br>→ Weekend: Algorithm runs, data accumulates
### Where this slots into Eugenio's existing stack:
<table header-row="true">
<tr>
<td>Layer</td>
<td>Tool</td>
<td>Job</td>
</tr>
<tr>
<td>Strategy / research</td>
<td>Claude Meta Ads Research Strategist</td>
<td>Weekly hypothesis + brief generation</td>
</tr>
<tr>
<td>Daily production</td>
<td>**AI UGC Factory (this system)**</td>
<td>**Steady-state 80-160 videos/batch**</td>
</tr>
<tr>
<td>Niche flooding</td>
<td>AI Swarm System</td>
<td>Specific saturation campaigns</td>
</tr>
<tr>
<td>Brand pillar</td>
<td>Lovart + Higgsfield Pitch Deck</td>
<td>Premium cinematic</td>
</tr>
<tr>
<td>Long-form</td>
<td>51-second UGC playbook</td>
<td>Conversion + retention</td>
</tr>
<tr>
<td>Affiliate revenue</td>
<td>Affiliate Playbook (same factory pointed at affiliate)</td>
<td>Second revenue stream</td>
</tr>
</table>
The Factory runs the daily volume. Other systems fill specialty roles.
---
## ⚙️ What NOT to Do
→ Don't skip the Hub setup. Without locked creator profiles + voice clones, every batch generates inconsistent output.
→ Don't generate a fresh voice per Seedance call. ALWAYS reference the saved voice clone for that creator. Voice continuity is the factory's signature.
→ Don't operate the factory without batch processing. Running scripts one-at-a-time through Stations 2-3-4 defeats the assembly line purpose.
→ Don't polish factory output. The system is designed to skip polish. If you're polishing, the factory isn't configured correctly.
→ Don't run more than 10 creators per brand. Audience pattern recognition needs SOME consistency. 5-10 creators is the sweet spot.
→ Don't use the same creator across multiple brands. Each brand needs its own Hub roster.
→ Don't expect the factory to deliver immediately. Setup is 2-4 hours per brand. After that, batches are 30 min of operator time.
→ Don't deploy 160 videos to 1 ad account. Distribute across 5-10 ad accounts to avoid spam detection.
→ Don't update Hub mid-batch. Lock creator profiles + voice clones for the full week of batches. Update on weekends only.
→ Don't ignore the throughput matrix. Match factory output to ad spend capacity. Over-producing wastes credits.
→ Don't expect the same factory to work for narrative cinematic ads. Different format. Use Lovart Storyboard or Higgsfield Pitch Deck for cinematic.
---
## ⚙️ Troubleshooting
<table header-row="true">
<tr>
<td>Problem</td>
<td>Fix</td>
</tr>
<tr>
<td>Voice drifts between videos of same creator</td>
<td>Voice clone not properly anchored. Verify the voice clone ID is correctly referenced in every Seedance call for that creator.</td>
</tr>
<tr>
<td>Face drifts between videos of same creator</td>
<td>Hub reference image fidelity too low. Re-upload at 4K. Lock identity strength to 0.95+ in Seedance.</td>
</tr>
<tr>
<td>Factory output requires polish (defeats the purpose)</td>
<td>Configuration issue. Verify native captions are enabled, aspect ratio is set at generation, color grade is in the prompt.</td>
</tr>
<tr>
<td>Lipsync drifts mid-video</td>
<td>Voice clone audio quality may be low. Re-record voice clone with 10+ seconds of clean audio.</td>
</tr>
<tr>
<td>Batch generation hangs</td>
<td>Reduce parallel batch size from 80-160 to 40-80. Run 2 sequential batches instead of 1 large batch.</td>
</tr>
<tr>
<td>Scripts feel generic per creator</td>
<td>Creator archetype not specific enough in Hub. Add demographic + vibe + voice tone details.</td>
</tr>
<tr>
<td>Costs spike unexpectedly</td>
<td>Track per-batch generation costs. If 1 batch exceeds expected cost by 30%+, audit which station is generating extra calls (likely Station 3 regenerations).</td>
</tr>
<tr>
<td>Same hook appears in multiple scripts per creator</td>
<td>Claude prompt not enforcing diversity. Reinforce "vary hooks across all 16 scripts per creator — no duplicate hooks."</td>
</tr>
<tr>
<td>Deploy ratio doesn't match throughput matrix</td>
<td>Operator deploying too few or too many per ad account. Use the matrix to calibrate deploy spread.</td>
</tr>
<tr>
<td>Account flagged for spam</td>
<td>Reduce daily posting per account. Spread across more accounts.</td>
</tr>
<tr>
<td>Factory output feels too uniform</td>
<td>Add more creator variety to Hub (different demographics, settings, vibes). Increase from 5 to 8-10 creators.</td>
</tr>
</table>
---
## ⚙️ The Daily / Weekly Production Cadence
This is the routine that runs the factory at steady-state.
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
<td>Brief Factory (Station 2 — Claude Script Swarm)</td>
<td>80-160 scripts</td>
</tr>
<tr>
<td>Monday</td>
<td>9:30-10:30</td>
<td>Batch generate visuals (Station 3 — GPT Image 2)</td>
<td>80-160 references</td>
</tr>
<tr>
<td>Monday</td>
<td>10:30 onwards</td>
<td>Batch animation overnight (Station 4 — Seedance)</td>
<td>80-160 videos rendering</td>
</tr>
<tr>
<td>Tuesday</td>
<td>8:00</td>
<td>Pick up batch output</td>
<td>80-160 finished videos</td>
</tr>
<tr>
<td>Tuesday</td>
<td>8:00-8:30</td>
<td>Spot-check 10-15% QC</td>
<td>Batch approved</td>
</tr>
<tr>
<td>Tuesday</td>
<td>8:30-9:30</td>
<td>Distribute across 5-10 ad accounts via scheduler</td>
<td>All scheduled</td>
</tr>
<tr>
<td>Tuesday</td>
<td>9:30 onwards</td>
<td>Algorithm runs</td>
<td>Data accumulates</td>
</tr>
<tr>
<td>Wednesday</td>
<td>9:00</td>
<td>Hour-24 matrix on Monday batch</td>
<td>Top winners identified</td>
</tr>
<tr>
<td>Wednesday</td>
<td>9:30-10:00</td>
<td>Brief Factory batch 2</td>
<td>Next batch running</td>
</tr>
<tr>
<td>Thursday onwards</td>
<td>Repeat</td>
<td>Continuous flow</td>
<td>Steady state</td>
</tr>
<tr>
<td>Friday</td>
<td>4:00 PM</td>
<td>Update Hub with confirmed winning patterns</td>
<td>Memory updated</td>
</tr>
<tr>
<td>Weekend</td>
<td>Setup time</td>
<td>Update creator roster if needed (new archetype, new voice clone)</td>
<td>Hub refreshed</td>
</tr>
</table>
Weekly output: 3-5 batches × 80-160 videos = 240-800 deploy-ready UGC videos per week. Algorithm scales 30-80 confirmed winners per week.
---
## 🎯 Closer
**Set up the Hub once: 5-10 AI creators with locked face references + voice clones in MakeUGC (2-4 hour one-time investment per brand). Install the Claude Script Swarm Skill into a Project. Brief the Factory at Station 2 (60 seconds per batch). Approve the 80-160 scripts. Let the assembly line run Stations 3-4 overnight. Spot-check 10-15% of finished output Tuesday morning. Distribute across 5-10 ad accounts. Algorithm runs. Hour-24 matrix Wednesday. By end of week 1 you'll have shipped 240-800 deploy-ready UGC videos. By end of month 1 you'll have replaced the per-video operator bottleneck with a steady-state factory that produces UGC at the volume your Meta + TikTok ad spend can absorb.**
The per-video operator workflow was the bottleneck.
The 4-station factory with synchronized lip-sync is what fixes it.
---
**The 4-station factory architecture + handoff protocol + synchronized lip-sync protocol + no-polish workflow + master station prompts + 6 vertical templates + daily throughput matrix is the full system. Bookmark this guide. Run it daily.**
---
