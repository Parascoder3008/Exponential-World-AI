---
title: "The FPV Drone Tracking Shot System: Draw the Camera Path, Let Seedance Fly It"
page_id: 37592e2e92e9804481c6d2a8028c1108
layer: production
source: https://freebie-for-you.notion.site/37592e2e92e9804481c6d2a8028c1108
---
# The FPV Drone Tracking Shot System: Draw the Camera Path, Let Seedance Fly It
---
## 🎯 What You're Getting
The exact technique that turns Seedance 2 into a virtual FPV drone operator. No drone. No pilot. No location permits. No insurance. Just a starting frame + a drawn red arrow showing where the camera should fly. Seedance reads the visual path as the camera motion plan, executes a cinematic ultra-high-speed one-shot tracking shot, and the negative-prompt constraints strip the arrow markers from the final video.
The full master Seedance FPV prompt. The arrow path grammar (what shapes work, what to avoid). The negative-prompt language that cleans guide markers from output. 6 vertical adaptations with starting frame + arrow direction guidance. The 5-second QC check before deploy.
You stop trying to describe complex camera motion in paragraphs of text. You stop watching Seedance freelance on motion paths. You stop accepting tripod-locked aerials when you wanted a swooping FPV reveal. You draw the path. Seedance flies it.
By the end of this guide, you'll have:
→ The master Seedance FPV prompt (paste-ready with negative-marker cleanup baked in)<br>→ The arrow path grammar — what curve types work, what shapes confuse the model<br>→ The "Follow Arrow" label setup that anchors the model's path interpretation<br>→ 6 vertical adaptations (sports activation, brand reveal, product launch, venue intro, real estate, retail flagship)<br>→ The starting frame requirements (resolution, composition, lighting matching)<br>→ The 5-point QC check that catches guide-marker bleed before deploy<br>→ The integration playbook for slotting FPV tracking shots into your creative rotation<br>→ The daily production cadence for shipping 3-4 FPV tracking shots per morning
If you're already running storyboard one-shots, hyper-real UGC, or pitch deck cinematics, the FPV tracking shot is the **motion cinema layer** — the spec format you reach for when the ad concept needs swooping kinetic camerawork. Stadium reveals, venue tours, product orbital reveals, brand activation aerials, real estate fly-throughs.
---
## ⚙️ The Hidden Mechanism — Why Visual Path Overlay Beats Text Camera Direction
Every standard Seedance camera-motion workflow has the same broken loop:
1. Operator writes a long text description of the camera path ("fly over the ring, enter through the window, traverse the interior, exit through the rear")
2. Seedance parses the description, picks 2-3 motion beats to honor
3. The remaining motion gets simplified, skipped, or rendered as cuts instead of continuous flight
4. Output reads as a series of disconnected aerial clips, not a one-shot
5. Operator iterates the prompt with more direction, re-runs
6. By generation 6-10, the prompt is a wall of camera direction Seedance still can't sequence correctly
The model isn't bad at any single camera move. It's bad at **sequencing 5-7 distinct moves** from a text description that doesn't visually show the order.
The visual path overlay fix is structural: instead of describing the camera path in text, you DRAW it on the starting frame. A red arrow shows the start point, middle waypoints, and end point. The model reads the arrow as a literal motion path and follows it in order.
→ The model can't skip waypoints because the arrow shows them sequentially<br>→ The model can't simplify the path because the curve shape locks the trajectory<br>→ The model can't render disconnected cuts because the arrow signals "one continuous flight"<br>→ The negative-prompt constraints tell the model to render the FINAL video without the arrow visible
The fix is not better text camera direction. The fix is **encoding the camera path as a visual annotation on the starting frame** — the thing that lets Seedance execute multi-waypoint one-shot tracking shots without freelancing.
---
## ⚙️ The Stack
<table header-row="true">
<tr>
<td>Layer</td>
<td>Tool</td>
<td>Job</td>
</tr>
<tr>
<td>Starting frame generation</td>
<td>GPT Image 2 / Midjourney / Flux</td>
<td>Generate the static image showing the scene + venue + activity</td>
</tr>
<tr>
<td>Path overlay drawing</td>
<td>Figma / Photoshop / CapCut / iPad pencil</td>
<td>Draw the red arrow path + "Follow Arrow" label on the starting frame</td>
</tr>
<tr>
<td>Video generation</td>
<td>Seedance 2</td>
<td>Reads the visual path, executes the FPV tracking shot</td>
</tr>
<tr>
<td>Marker cleanup</td>
<td>Seedance negative-prompt constraints</td>
<td>Strips the arrow and label from the final video</td>
</tr>
<tr>
<td>Polish</td>
<td>CapCut / Filmora</td>
<td>Color grade, ambient audio, music, aspect ratio exports</td>
</tr>
<tr>
<td>Deploy</td>
<td>Meta + YouTube + TikTok</td>
<td>Platform-native FPV tracking shot</td>
</tr>
</table>
The starting frame + the drawn arrow are the 2 critical inputs. Seedance handles the rest.
---
## ⚙️ The Workflow Math
Traditional FPV drone shoot: $5K-$50K per cinematic FPV tracking shot. Add 1-4 weeks of location scouting, permit acquisition, pilot booking, weather windows, multiple shoot days. Real FPV cinematography is one of the most expensive shot types because few pilots can fly tight one-shots without crashing.
This system: starting frame (5 minutes to generate) + arrow drawn in any image editor (90 seconds) + Seedance generation (4-6 minutes) + CapCut polish (3 minutes). Total: 15 minutes per FPV shot.
The leverage shift: you stop booking drone teams and start drawing arrows. The bottleneck moves from production capacity to creative direction — which arrow path makes the best one-shot reveal.
---
## ⚙️ Step 1 — Pick or Generate the Starting Frame
The starting frame is the static image that shows what the scene looks like at the moment the camera begins moving. It should include:
→ The venue or environment (stadium, building exterior, product hero space)<br>→ Any subjects in the scene (crowd, athletes, performers, hosts)<br>→ The lighting/time of day that the final video will match<br>→ The aspect ratio you'll deploy in (16:9 for YouTube/CTV, 9:16 for Reels)
Generate the starting frame in GPT Image 2, Midjourney, or Flux. Or use a real photograph of the venue if you have one (real estate, retail, brand activations).
Frame composition rule: the starting frame must show enough of the scene that the arrow path will make sense. If the arrow is going to enter through a window, the window must be visible in the frame.
---
## ⚙️ Step 2 — Draw the Red Arrow Path
Open the starting frame in any image editor that supports drawing. Recommended tools:
→ Figma — fast for digital drawing<br>→ Photoshop — full pen-tool control<br>→ CapCut (mobile or desktop) — quick path drawing<br>→ iPad with Apple Pencil — most natural for curve paths
Draw a RED arrow that traces the exact camera motion you want. Path rules:
<table header-row="true">
<tr>
<td>Rule</td>
<td>Why</td>
</tr>
<tr>
<td>Use RED specifically</td>
<td>Seedance recognizes red as the directional color in path-overlay prompts</td>
</tr>
<tr>
<td>Start at the beginning waypoint, end at the final waypoint</td>
<td>The arrow direction tells the model which end is start</td>
</tr>
<tr>
<td>Include arrowhead at the END only</td>
<td>Single arrowhead avoids confusion about direction</td>
</tr>
<tr>
<td>Use smooth curves, not sharp angles</td>
<td>Sharp angles produce jerky motion</td>
</tr>
<tr>
<td>Trace through all waypoints in sequence</td>
<td>Don't skip or shortcut — the path order is the motion order</td>
</tr>
<tr>
<td>Make the line 4-8 pixels thick</td>
<td>Too thin gets ignored, too thick obscures scene detail</td>
</tr>
<tr>
<td>Add small numbered waypoints at major direction changes</td>
<td>Optional — helps the model lock the sequence</td>
</tr>
</table>
The path can be:<br>→ Simple straight push-in or pull-out<br>→ Smooth orbit around a subject<br>→ Multi-waypoint reveal through architecture (over rooftop → into window → through interior → out the other side)<br>→ Looping spiral (around then up)
---
## ⚙️ Step 3 — Add the "Follow Arrow" Label
In the top-right corner of the starting frame, add a text label: **FOLLOW ARROW** in yellow or white, bold sans-serif font, 20-30pt size.
This label is the explicit instruction to the model: "the red arrow on this image is the camera path you must follow." Without the label, Seedance may treat the arrow as scene content.
The label is a critical part of the technique. Skip it and you'll see "follow the arrow" instructions interpreted inconsistently.
---
## ⚙️ Step 4 — Paste into Seedance with the Master FPV Prompt
Upload the annotated starting frame as the reference image in Seedance 2. Paste the master Seedance FPV prompt (Section 7). Run.
Generation time: 4-6 minutes for a 5-10 second FPV tracking shot.
The negative-prompt language in the master prompt tells Seedance to strip the red arrow + "Follow Arrow" label from the final video. The model uses the arrow as a path guide but doesn't render it as a visible element.
---
## ⚙️ Step 5 — Run the 5-Point QC Check
Watch the output back. Verify:
<table header-row="true">
<tr>
<td>Check</td>
<td>What To Verify</td>
</tr>
<tr>
<td>Path order</td>
<td>Camera follows the arrow start → end without skipping waypoints</td>
</tr>
<tr>
<td>Marker cleanup</td>
<td>Red arrow + "Follow Arrow" label fully stripped from the video</td>
</tr>
<tr>
<td>Motion smoothness</td>
<td>One continuous flight, no abrupt cuts mid-shot</td>
</tr>
<tr>
<td>Subject hold</td>
<td>Anything in the frame (crowd, athletes, product) stays consistent during flight</td>
</tr>
<tr>
<td>Final pose</td>
<td>Camera ends at the arrow's endpoint, not somewhere else</td>
</tr>
</table>
If the marker cleanup failed (arrow visible in 1-2 frames), regenerate with the negative-prompt reinforced. Don't try to mask the arrow in CapCut — regenerate.
---
## ⚙️ Step 6 — Polish in CapCut
Export from Seedance. Drop into CapCut for the 3-minute polish.
<table header-row="true">
<tr>
<td>Polish Step</td>
<td>What To Do</td>
</tr>
<tr>
<td>Color grade</td>
<td>Apply a cinematic LUT matching the scene mood (warm cinematic, cool teal-orange, neon nightlife)</td>
</tr>
<tr>
<td>Ambient audio</td>
<td>Layer crowd ambience, wind rush, or environment-matching sound at -16dB</td>
</tr>
<tr>
<td>Music</td>
<td>Layer a music track matching the energy (electronic build for sports, orchestral swell for venue reveals)</td>
</tr>
<tr>
<td>Speed ramp (optional)</td>
<td>Subtle 1.1-1.3x speed on the fastest section of the path for kinetic energy</td>
</tr>
<tr>
<td>Subtle vignette</td>
<td>3-5% edge darkening to enhance the cinematic feel</td>
</tr>
<tr>
<td>Export aspect ratios</td>
<td>16:9 horizontal, 9:16 vertical, 1:1 square — same shot, 3 platform-native cuts</td>
</tr>
</table>
Total polish: 3-5 minutes. Output: 3 deploy-ready FPV tracking shots.
---
## ⚙️ The Master Seedance FPV Prompt
Paste this into Seedance 2 with the annotated starting frame attached.
```javascript
Remove the red lines, arrows, and all guide
markers from the final video. Remove the "Follow
Arrow" text label from the final video. The red
path is only used to guide camera movement and
must not appear in the rendered output.

Shoot a first-person perspective (FPV) drone
aerial shot using a cinematic, ultra-high-speed,
one-shot technique. The camera should fly
closely along the red path in the image.
Maintain the path order exactly. Do not skip
any sections, do not simplify the path, do not
cut between waypoints. One continuous
trajectory from start arrow to end arrow.

Scene context:
[DESCRIBE THE SCENE IN 1-2 SENTENCES — e.g.
"Amid cheering crowds and intense MMA fighters,
the drone flies over the ring, enters through a
[BUILDING] window, rapidly traverses the
luxurious interior, and exits through a rear
window."]

Camera characteristics:
- First-person perspective (FPV) drone
- Ultra-high-speed one-shot
- Close to subjects on flyby moments
- Smooth at high speed (motion blur acceptable,
  jitter not)
- Wide field of view (16mm equivalent feel)
- Cinematic, realistic, high production value

Subject behavior:
- All people in the frame stay in their
  positions
- No teleporting or duplicating subjects
- Lighting matches the starting frame across
  the entire flight

Negative prompts (CRITICAL):
- No red lines visible in final video
- No red arrows visible in final video
- No "Follow Arrow" text visible
- No yellow text visible
- No guide markers, no annotation overlays
- No watermarks, no timestamps
- No camera shake or drone rig visible

Output:
- 5-10 second one-shot tracking shot
- 4K resolution
- 16:9 horizontal or 9:16 vertical per
  deployment platform
- 24fps base, 60fps slow-motion sections
  acceptable for cinematic effect

A thrilling, realistic, and highly cinematic
scene.
```
---
## ⚙️ The Arrow Path Grammar
Not every path renders well. The arrow grammar below covers what works and what to avoid.
### What works:
→ **Straight push-in** (camera flies forward toward subject) — simplest, highest reliability<br>→ **Pull-out reveal** (camera flies backward away from subject) — reverse direction works<br>→ **Smooth horizontal orbit** (camera circles a subject) — works at speed<br>→ **Diagonal swoop** (camera enters from upper-left, exits lower-right) — high cinematic feel<br>→ **Multi-waypoint architectural reveal** (over building → into window → through hallway → out the other side) — works if waypoints are clearly drawn<br>→ **Spiral ascent** (camera spirals upward around a subject) — works for hero reveals<br>→ **S-curve traverse** (camera weaves through obstacles) — works at moderate speed
### What doesn't work:
→ Sharp 90-degree angles in the path (camera renders abrupt cuts)<br>→ Crossing arrows (model can't determine which direction to fly)<br>→ Paths that exit the frame edges (model improvises and often breaks)<br>→ Too many waypoints (>7) in a single shot (model simplifies)<br>→ Paths that pass through opaque objects with no visible entry/exit (window must be drawn or implied)<br>→ Sub-second waypoint changes (model can't honor at high speed)
### Pro tips:
→ Pre-visualize the path mentally before drawing — what does the camera actually see at each waypoint?<br>→ Number major waypoints if you have 4+ in the path (1, 2, 3, 4 small annotations near the arrow)<br>→ Add brief text annotations near key transitions ("ENTER WINDOW HERE", "EXIT THROUGH ARCH") in small yellow text — Seedance interprets these as instructions
---
## ⚙️ 6 Vertical Adaptations
Each adaptation includes the starting frame setup + arrow direction template.
### Vertical 1 — Sports / Event Activation (UFC, concert, brand activation)
```javascript
Starting frame: Aerial view of venue at night
with stadium lighting, crowd visible, brand
logos around perimeter
Arrow path: Start at distant overhead → swoop
down toward main stage → enter through stage
arch → traverse the performance area → exit
through opposite arch back to overhead
Scene context: "Drone flies over the cheering
crowd at [EVENT], enters the main stage area
at high speed, traverses the performance space,
and exits through the opposite arch."
Best ad type: Event hype reels, brand activation
recaps, pre-event teasers
```
### Vertical 2 — Brand Reveal (Logo + Tagline at end of path)
```javascript
Starting frame: Wide environment shot (rooftop,
ocean, desert, urban skyline) with brand logo
visible somewhere in the distance
Arrow path: Start at extreme wide → swoop
through the environment → end at close-up on
brand logo
Scene context: "Drone flies through [ENVIRONMENT]
at high speed, rapidly approaching the [BRAND]
logo, ending in a tight hero shot."
Best ad type: Brand video intros, manifesto
opens, campaign hero reels
```
### Vertical 3 — Product Launch (Orbital Reveal)
```javascript
Starting frame: Studio environment with the
product visible in the center
Arrow path: Start at extreme wide of the studio
→ spiral inward around the product → end at
tight close-up of the product detail
Scene context: "Drone enters the [STUDIO/SET],
spirals inward at high speed, closing on the
[PRODUCT] in a tight hero reveal."
Best ad type: Product launch announcements,
hero reveals, brand campaign opens
```
### Vertical 4 — Venue Intro (Real Estate, Hospitality, Retail Flagship)
```javascript
Starting frame: Aerial view of building
exterior at golden hour
Arrow path: Start at high aerial → swoop down
to main entrance → enter through doors →
traverse interior lobby → exit through rear
window/door to reveal back garden/terrace
Scene context: "Drone flies over [VENUE],
enters through the front entrance, rapidly
traverses the [INTERIOR SPACE], and exits
through the rear opening to reveal the
[BACK SPACE]."
Best ad type: Real estate listings, hotel
campaigns, retail flagship launches
```
### Vertical 5 — Real Estate (Multi-Floor Fly-Through)
```javascript
Starting frame: Cross-section view of property
or full exterior with all floors visible
Arrow path: Start outside upper floor → enter
through window → through living space → down
staircase → through kitchen → out the back
door to garden/pool
Scene context: "Drone enters the [PROPERTY]
through the upper-floor window, traverses
through the [SPECIFIC ROOMS], descends to the
ground floor, and exits to the [OUTDOOR FEATURE]."
Best ad type: Luxury real estate, vacation
rentals, architecture portfolios
```
### Vertical 6 — Retail Flagship (Storefront → Interior → Specific Display)
```javascript
Starting frame: Storefront exterior with brand
signage visible
Arrow path: Start on the sidewalk → through the
entrance doors → past the main display → curl
around the central feature → end at hero
product display
Scene context: "Drone enters [BRAND] flagship
through the storefront, weaves past the main
display, curls around the central feature, and
lands on the hero product display."
Best ad type: Flagship store launches, in-store
event promotions, retail brand films
```
---
## ⚙️ Side-By-Side: Text Camera Direction vs Visual Path Overlay
<table header-row="true">
<tr>
<td>Element</td>
<td>Text Camera Direction</td>
<td>Visual Path Overlay (This System)</td>
</tr>
<tr>
<td>Camera path specification</td>
<td>Paragraphs of text</td>
<td>Single drawn red arrow</td>
</tr>
<tr>
<td>Waypoint sequencing</td>
<td>Often skipped or reordered</td>
<td>Locked to arrow direction</td>
</tr>
<tr>
<td>Path complexity supported</td>
<td>2-3 simple beats</td>
<td>5-7 complex waypoints</td>
</tr>
<tr>
<td>Marker cleanup</td>
<td>N/A</td>
<td>Negative-prompt strips arrow from final</td>
</tr>
<tr>
<td>Iteration speed</td>
<td>Rewrite the prompt</td>
<td>Redraw the arrow</td>
</tr>
<tr>
<td>1-shot success rate</td>
<td>20-40%</td>
<td>80-90%</td>
</tr>
<tr>
<td>Time per FPV shot</td>
<td>30-60 min (multiple regenerates)</td>
<td>15-20 min</td>
</tr>
<tr>
<td>Use case fit</td>
<td>Simple aerials, slow reveals</td>
<td>Complex FPV tracking, multi-waypoint flights</td>
</tr>
</table>
The mechanism: the arrow encodes the path visually in a way no text description can match. Seedance reads the arrow as a contract.
---
## ⚙️ The Kill-or-Scale Matrix (Hour 24)
Deploy 2-3 FPV tracking shot variations as ad creative or organic content. Run the matrix at hour 24.
<table header-row="true">
<tr>
<td>Metric</td>
<td>Kill Below</td>
<td>Hold Range</td>
<td>Scale Above</td>
</tr>
<tr>
<td>Hook rate (3-sec view)</td>
<td>38%</td>
<td>38-48%</td>
<td>48%</td>
</tr>
<tr>
<td>Hold rate (10-sec watch)</td>
<td>22%</td>
<td>22-32%</td>
<td>32%</td>
</tr>
<tr>
<td>Save rate (organic)</td>
<td>1.5%</td>
<td>1.5-3%</td>
<td>3%</td>
</tr>
<tr>
<td>Shares (organic)</td>
<td>0.5%</td>
<td>0.5-1.5%</td>
<td>1.5%</td>
</tr>
<tr>
<td>CTR (ads)</td>
<td>1.2%</td>
<td>1.2-2%</td>
<td>2%</td>
</tr>
</table>
FPV tracking shots over-index on hook rate (the swooping camera grabs attention) and save rate (cinematic visuals get bookmarked).
### The Matrix Prompt:
```javascript
Run the kill-or-scale matrix on the FPV
tracking shot batch deployed in the last 24
hours.

Data:
[PASTE: ad name, vertical, spend (if paid),
hook rate, hold rate, save rate, shares, CTR,
CPA, ROAS]

For each shot return:
1. Decision: KILL / HOLD / SCALE
2. Reason (cite the specific threshold breach)
3. If SCALE: which arrow path type is winning
   (straight push-in, multi-waypoint, spiral,
   architectural reveal, etc.)
4. If KILL: which surviving path to clone for
   the next iteration

Pattern recognition: which path types are
landing? Weight the next batch toward the
winning path grammar.

No hedging. Decisive calls.
```
---
## ⚙️ The Integration Playbook
FPV tracking shots are the **motion cinema layer** of your creative rotation. Not the volume format. The format you reach for when the ad concept needs swooping kinetic camerawork.
### Recommended use cases:
→ Event hype videos (UFC, concerts, brand activations)<br>→ Brand video intros + manifesto opens<br>→ Product launch hero reveals<br>→ Real estate listings + venue tours<br>→ Retail flagship store launches<br>→ Sports campaign opens<br>→ Festival/conference recaps<br>→ Architecture/design portfolios
### Recommended creative mix:
→ 35% Hyper-real UGC (handheld vertical UGC)<br>→ 25% Broadcast realism (cold-audience scroll-stop)<br>→ 20% Storyboard one-shot cinematics (volume product ads)<br>→ 10% FPV tracking shots (this system — kinetic motion cinema)<br>→ 10% 15-Panel Pitch Deck cinematics (premium brand pieces)
Why this split: FPV tracking shots are high-impact but not high-frequency. Use them as the "wow" layer — 1-2 per week across the rotation, supporting larger campaigns.
### Weekly cadence:
<table header-row="true">
<tr>
<td>Day</td>
<td>Action</td>
</tr>
<tr>
<td>Monday 9am</td>
<td>Pick 2 FPV concepts from the 6 verticals for the week</td>
</tr>
<tr>
<td>Monday 9:15am</td>
<td>Generate or source 2 starting frames</td>
</tr>
<tr>
<td>Monday 9:30am</td>
<td>Draw arrow paths + add "Follow Arrow" labels</td>
</tr>
<tr>
<td>Monday 10am</td>
<td>Generate 2 FPV shots in Seedance</td>
</tr>
<tr>
<td>Monday 10:30am</td>
<td>5-point QC check, polish in CapCut</td>
</tr>
<tr>
<td>Monday 11am</td>
<td>Deploy to YouTube + organic social</td>
</tr>
<tr>
<td>Wednesday 9am</td>
<td>Hour-24 matrix on Monday batch</td>
</tr>
<tr>
<td>Wednesday 10am</td>
<td>Scale winners, kill losers, generate 1 replacement</td>
</tr>
<tr>
<td>Friday 9am</td>
<td>Generate 1 hero FPV for the week's biggest campaign</td>
</tr>
</table>
Output: 2-3 FPV tracking shots tested per week.
---
## ⚙️ What NOT to Do
→ Don't skip the "Follow Arrow" label. Without it, Seedance may interpret the arrow as scene content.
→ Don't use any color other than red for the arrow path. Seedance is calibrated for red path direction.
→ Don't draw sharp 90-degree angles in the arrow path. The model renders abrupt cuts at sharp angles.
→ Don't skip the negative-prompt cleanup. The arrow + label MUST be stripped from the final video.
→ Don't try to mask a visible arrow in CapCut post-production. Regenerate with the negative-prompt reinforced. Masking visible arrows produces obvious editing seams.
→ Don't use crossed arrows or branching paths. The model can't determine which direction to fly.
→ Don't draw paths that exit the frame edges. The model improvises off-frame and the shot breaks.
→ Don't put more than 7 waypoints in a single arrow. The model simplifies past 7.
→ Don't try this technique for slow contemplative shots. FPV is for kinetic energy. Use static or slow-push compositions for contemplative cinema.
→ Don't deploy without the 5-point QC check. Marker bleed is the most common failure mode.
→ Don't expect the first generation to nail everything. 1-shot success rate is 80-90%, meaning 1-2 of every 10 generations needs a regenerate.
---
## ⚙️ Troubleshooting
<table header-row="true">
<tr>
<td>Problem</td>
<td>Fix</td>
</tr>
<tr>
<td>Red arrow visible in final video frames</td>
<td>Negative-prompt cleanup failed. Reinforce: "No red lines visible. No red arrows. No yellow text. Strip all guide markers." Regenerate.</td>
</tr>
<tr>
<td>Camera skips waypoints</td>
<td>Path too complex for single shot. Reduce waypoint count to 4-5 max. Or split into 2 separate shots and edit together.</td>
</tr>
<tr>
<td>Camera renders abrupt cuts mid-shot</td>
<td>Sharp angles in the path. Redraw with smooth curves only.</td>
</tr>
<tr>
<td>Model ignores the arrow entirely</td>
<td>"Follow Arrow" label missing or too small. Add bold yellow label in top-right at 24pt+ size.</td>
</tr>
<tr>
<td>Subject appearance changes during flight</td>
<td>Subject reference too inconsistent. Add explicit "Subject behavior: maintain appearance across the flight" to the prompt.</td>
</tr>
<tr>
<td>Output too short</td>
<td>Increase target duration in Seedance settings to 8-10s. Multi-waypoint paths need duration.</td>
</tr>
<tr>
<td>Output too long</td>
<td>Reduce path complexity. Simpler paths render shorter.</td>
</tr>
<tr>
<td>Camera motion looks tripod-locked</td>
<td>Add "FPV drone aerial, ultra-high-speed, kinetic" reinforcement in the prompt.</td>
</tr>
<tr>
<td>Arrow path renders but motion looks fake/CGI</td>
<td>Reinforce "realistic, cinematic, motion blur acceptable, highly cinematic" in the camera characteristics block.</td>
</tr>
<tr>
<td>Marker cleanup leaves a yellow tint in 1-2 frames</td>
<td>Common with bright yellow labels. Use white "FOLLOW ARROW" label instead — easier for the model to strip.</td>
</tr>
<tr>
<td>Costs add up faster than expected</td>
<td>FPV shots are heavier than standard generations. Budget 4-6 FPV shots per week, not per day.</td>
</tr>
</table>
---
## ⚙️ The Daily Production Cadence
This is the routine that ships 2-3 FPV tracking shots per morning when needed.
<table header-row="true">
<tr>
<td>Time</td>
<td>Task</td>
<td>Output</td>
</tr>
<tr>
<td>9:00-9:05</td>
<td>Pick 2 FPV concepts from the weekly queue</td>
<td>Concepts locked</td>
</tr>
<tr>
<td>9:05-9:15</td>
<td>Generate or source 2 starting frames</td>
<td>2 starting frames</td>
</tr>
<tr>
<td>9:15-9:25</td>
<td>Draw arrow paths + add "Follow Arrow" labels</td>
<td>2 annotated frames</td>
</tr>
<tr>
<td>9:25-9:40</td>
<td>Drop into Seedance 2 with master FPV prompt, generate 2 shots</td>
<td>2 FPV tracking shots</td>
</tr>
<tr>
<td>9:40-9:50</td>
<td>5-point QC check on each</td>
<td>2 approved shots</td>
</tr>
<tr>
<td>9:50-10:00</td>
<td>CapCut polish — color grade, ambient audio, music, 3 aspect ratios</td>
<td>6 platform-ready cuts</td>
</tr>
<tr>
<td>10:00-10:05</td>
<td>Deploy</td>
<td>Live</td>
</tr>
<tr>
<td>Next morning 9am</td>
<td>Hour-24 matrix</td>
<td>Top winners scaled</td>
</tr>
</table>
FPV shots run 2-3x/week (not daily) since they're the motion cinema layer, not the volume layer.
---
## 🎯 Closer
**Pick a vertical from the 6 templates. Generate or source the starting frame. Open the frame in any image editor and draw a red arrow tracing the camera path you want. Add a "FOLLOW ARROW" label in the top-right corner. Upload to Seedance 2 with the master FPV prompt. Wait 4-6 minutes for the tracking shot. Run the 5-point QC check. Polish in CapCut. Deploy. By end of week 1 you'll have 2-3 FPV tracking shots in your library. By end of month 1 you'll have replaced the $5K-$50K drone shoot cycle with a 15-minute prompt routine.**
The text-based camera description was the bottleneck.
The drawn arrow path is what fixes it.
---
**The master Seedance FPV prompt + arrow path grammar + 6 vertical adaptations + 5-point QC check is the full system. Bookmark this guide. Run it when the concept calls for swooping motion.**
---
