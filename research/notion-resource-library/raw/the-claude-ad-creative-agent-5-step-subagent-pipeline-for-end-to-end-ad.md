---
title: "The Claude Ad Creative Agent: 5-Step Subagent Pipeline for End-to-End Ad Creation"
page_id: 37392e2e92e98008b0c3cc307eedf8e4
layer: skills
source: https://freebie-for-you.notion.site/37392e2e92e98008b0c3cc307eedf8e4
---
# The Claude Ad Creative Agent: 5-Step Subagent Pipeline for End-to-End Ad Creation
---
## 🎯 What You're Getting
The exact Claude agent system that runs the full ad creation pipeline from product URL to deploy-ready creative. No SaaS subscriptions. No proprietary "AI ad agent" lock-in. Just Claude — set up as a 5-step subagent loop that scrapes competitor ads, extracts winning patterns, writes direct-response copy, breaks scripts into 15-shot storyboards, and generates creative direction for every scene.
The full Claude Ad Creative Agent system prompt. The 5 individual subagent prompts (Research → Pattern Extraction → Copy → Storyboard → Creative Direction). The threaded scene-edit grammar that lets you guide Claude like a creative brief. 6 vertical adaptations. The integration playbook for handing finished briefs to MakeUGC, Maxfusion, Higgsfield Supercomputer, or Seedance.
You stop paying for SaaS ad agents. You stop wondering if you'd get better output building it yourself. You open Claude, paste the agent system prompt into a Project, drop a product URL, and watch the 5-step pipeline output a finished creative brief in 10-15 minutes.
By the end of this guide, you'll have:
→ The master Claude Ad Creative Agent system prompt (paste-ready into a Claude Project)<br>→ The 5 subagent prompts (Research / Pattern Extraction / Copy / Storyboard / Creative Direction)<br>→ The threaded scene-edit grammar for guiding Claude like a creative brief<br>→ 6 vertical-specific Claude Project configurations<br>→ The 15-shot storyboard output template<br>→ The brief-to-creative-tool handoff routing (MakeUGC / Maxfusion / Higgsfield / Seedance)<br>→ The daily production cadence for shipping creative briefs at scale<br>→ The compounding brand memory mechanic that makes output #50 better than output #1
If you're already running Arcads UGC, Maxfusion flows, Higgsfield Supercomputer, or Cinematic Production Boards downstream, the Claude Ad Creative Agent is the strategy + brief layer that feeds them all. The creative tools execute the briefs. Claude plans, researches, and orchestrates upstream.
---
## ⚙️ The Hidden Mechanism — Why a 5-Step Subagent Loop Beats Single-Prompt Generation
Every standard "AI for ad creation" workflow has the same broken loop:
1. Operator writes a single mega-prompt that tries to do research, copywriting, and creative direction in one go
2. Claude (or any LLM) parses the mega-prompt and prioritizes 2-3 instructions
3. Research depth gets sacrificed for copy quality
4. Copy gets generic because research wasn't deep enough
5. Storyboard structure gets ignored because the model ran out of attention
6. Output looks "AI-generic" because the model never went deep on any single sub-task
The 5-step subagent loop fixes this by separating the sub-tasks into independent Claude conversations. Each subagent has 1 job and runs in a fresh context. Outputs cascade:
→ **Subagent 1 (Research)** — scrapes the product page and competitor ad libraries, outputs structured competitor intel<br>→ **Subagent 2 (Pattern Extraction)** — receives competitor intel, extracts the patterns that show up in winners<br>→ **Subagent 3 (Copy)** — receives patterns, writes direct-response script variations<br>→ **Subagent 4 (Storyboard)** — receives the chosen script, breaks it into 15 shots with timing<br>→ **Subagent 5 (Creative Direction)** — receives the storyboard, adds camera/lens/lighting/mood per shot
Each subagent does its job in isolation. None of them get overloaded. Output quality climbs because attention isn't being split across 5 sub-tasks in one chat.
The fix is not better prompts. The fix is **chaining single-purpose subagents** — the thing that lets every step go deep without contaminating the others.
---
## ⚙️ The 5-Step Pipeline Explained
<table header-row="true">
<tr>
<td>Step</td>
<td>Subagent</td>
<td>Input</td>
<td>Output</td>
</tr>
<tr>
<td>1</td>
<td>Research</td>
<td>Product URL + brand kit</td>
<td>Competitor ad intel from Meta Ads Library + YouTube + product pages</td>
</tr>
<tr>
<td>2</td>
<td>Pattern Extraction</td>
<td>Research output</td>
<td>Top 5 winning hooks, top 5 angles, top 3 visual formats per vertical</td>
</tr>
<tr>
<td>3</td>
<td>Copy</td>
<td>Pattern Extraction output + brand voice</td>
<td>4-6 direct-response script variations with hook + body + CTA</td>
</tr>
<tr>
<td>4</td>
<td>Storyboard</td>
<td>Selected script</td>
<td>15-shot storyboard with scene-by-scene action, timing, dialogue</td>
</tr>
<tr>
<td>5</td>
<td>Creative Direction</td>
<td>Storyboard</td>
<td>Camera/lens, lighting, mood, music, and SFX direction per shot</td>
</tr>
</table>
End-to-end runtime: 10-15 minutes inside Claude. The final output is a complete creative brief that any downstream tool (MakeUGC, Maxfusion, Higgsfield, Seedance) can execute on without further interpretation.
---
## ⚙️ The Stack
<table header-row="true">
<tr>
<td>Layer</td>
<td>Tool</td>
<td>Job</td>
</tr>
<tr>
<td>Strategy + brief</td>
<td>Claude (Opus 4.7 recommended)</td>
<td>Runs the 5-step subagent loop</td>
</tr>
<tr>
<td>Persistent memory</td>
<td>Claude Project</td>
<td>Stores brand kit, ICP, brand voice, prior winners across runs</td>
</tr>
<tr>
<td>Subagent context</td>
<td>Separate Claude conversations</td>
<td>Each subagent runs in its own context, outputs cascade</td>
</tr>
<tr>
<td>Optional research extension</td>
<td>Claude with web access or Meta Ads MCP</td>
<td>Pulls live competitor ad data</td>
</tr>
<tr>
<td>Creative execution</td>
<td>MakeUGC / Maxfusion / Higgsfield / Seedance</td>
<td>Receives the finished brief, generates the final ad</td>
</tr>
<tr>
<td>Deploy</td>
<td>Meta + YouTube + TikTok + Instagram</td>
<td>Platform-native creative</td>
</tr>
</table>
Claude is the only orchestration tool. The downstream creative tools are execution-only.
---
## ⚙️ The Workflow Math
Traditional creative pipeline: 5 separate humans (strategist → writer → designer → editor → media buyer). Each handoff loses 6-24 hours. Each role re-interprets the brief. 2-week cycle per campaign. $5K-$10K/month minimum in retainers and team overhead.
SaaS AI ad agent (Creatify, MakeUGC Agent, Arcads Agent, etc.): $39-$99/month per tool. Closes the brief gap but locks you into one platform's UI, prompt format, and output style. No customization of the agent loop itself.
This system: Claude subscription. Build the 5-step loop once. Customize each subagent for your brand voice + creative philosophy. End-to-end brief in 10-15 minutes. Hand off to whichever creative tool fits the brief.
The leverage shift: you stop coordinating teams and start running subagent loops. You stop paying SaaS tax for orchestration. The bottleneck moves from brief generation to creative execution (which the integration playbook below routes).
---
## ⚙️ Step 1 — Set Up Claude with Persistent Brand Memory
Create a Claude Project (Claude Pro feature). Name it "[Brand] Ad Creative Agent." Paste the master system prompt (Section 11) into the Project instructions.
Then load the brand memory once into the Project knowledge:
→ Brand kit PDF<br>→ Hero claim + positioning statement<br>→ ICP profile (psychographics + demographics)<br>→ Brand voice samples (3-5 paragraphs your brand actually published)<br>→ Prior winning ad scripts (3-5 of the best you've shipped)<br>→ Product specs + key features list<br>→ Competitor list (top 5)<br>→ Brand tone constraints (what you'd never say)
Every subagent run inside this Project pulls from this memory automatically. The 5-step loop compounds because the memory layer compounds.
---
## ⚙️ Step 2 — Run the 5-Step Subagent Loop
Start a fresh chat inside the Project. Trigger the loop with the master agent prompt + your product URL + your ad goal.
The agent runs Subagent 1 first, outputs research, then prompts you with: "Approve to proceed to Pattern Extraction?" You review the research, approve, and the loop continues to Subagent 2, 3, 4, 5 — each gated by your approval.
Approval gates exist because each subagent's output becomes the next subagent's input. If you let weak research cascade into weak copy, the final brief carries the weakness all the way through. Approve at each step. Refine if needed.
Total runtime: 10-15 minutes with 5 approval gates.
---
## ⚙️ Step 3 — Use the Threaded Scene-Edit Grammar
After Subagent 4 (Storyboard) outputs the 15-shot storyboard, you can edit any scene by replying in plain English using the threaded scene-edit grammar:
<table header-row="true">
<tr>
<td>Edit Command</td>
<td>What It Does</td>
</tr>
<tr>
<td>"Stronger hook on shot 1"</td>
<td>Subagent regenerates only shot 1 with a punchier hook</td>
</tr>
<tr>
<td>"Make shot 6 more casual"</td>
<td>Subagent rewrites shot 6 dialogue/action with casual tone</td>
</tr>
<tr>
<td>"Change shot 3 to extreme close-up"</td>
<td>Subagent updates the camera spec for shot 3 only</td>
</tr>
<tr>
<td>"Swap the actor in shot 5"</td>
<td>Subagent updates the character archetype for shot 5</td>
</tr>
<tr>
<td>"Brighter setting on shots 7-9"</td>
<td>Subagent updates lighting for the specified range</td>
</tr>
<tr>
<td>"More variations of shot 4"</td>
<td>Subagent generates 3 alternate versions of shot 4</td>
</tr>
<tr>
<td>"Tighter timing — 13 shots instead of 15"</td>
<td>Subagent compresses the arc</td>
</tr>
<tr>
<td>"Punchier CTA on shot 15"</td>
<td>Subagent rewrites the final shot</td>
</tr>
</table>
Claude regenerates only the targeted scene. The rest of the storyboard stays locked. No full re-runs.
---
## ⚙️ Step 4 — Output the 15-Shot Storyboard
The final storyboard output from Subagent 4 + 5 looks like this (per shot):
```javascript
SHOT 03 — PRODUCT REVEAL CLOSEUP

Camera: 100mm macro lens
Shot size: Extreme close-up
Movement: Slow tilt down
Action: Hand holds the [PRODUCT] so the label
is clearly visible. Soft thumb pressure on the
cap.
Dialogue / Voiceover: "[OPTIONAL VO LINE]"
Lighting: Soft natural window light from camera
right
Mood: Intimate, sensory
SFX: Subtle paper rustle / cap click
Music beat: Bass groove enters
Duration: 1 second
```
All 15 shots formatted this way. Total runtime: 15 seconds. Every shot has complete production direction. Any downstream tool can render it without interpretation.
---
## ⚙️ Step 5 — Hand Off to Creative Tools
The finished brief routes to the right creative tool based on the ad type. Claude auto-routes if you ask it to.
<table header-row="true">
<tr>
<td>Brief Type</td>
<td>Creative Tool</td>
<td>Why</td>
</tr>
<tr>
<td>Hyper-real UGC (handheld iPhone aesthetic)</td>
<td>MakeUGC or Arcads</td>
<td>Best for native UGC look + lipsync</td>
</tr>
<tr>
<td>Orchestrated multi-actor flow</td>
<td>Maxfusion</td>
<td>Best for multi-actor archetypes via flow library</td>
</tr>
<tr>
<td>Autonomous full-campaign run</td>
<td>Higgsfield Supercomputer</td>
<td>Best for 1-prompt full-campaign output</td>
</tr>
<tr>
<td>15-frame production board cinematic</td>
<td>Direct GPT Image 2 + Seedance 2.0</td>
<td>Best for premium cinematic ads</td>
</tr>
<tr>
<td>Motion graphics / kinetic typography</td>
<td>Higgsfield motion-design-flow</td>
<td>Best for text-heavy ads</td>
</tr>
</table>
Claude outputs the brief + the routing recommendation + the exact prompt to paste into the chosen tool.
---
## ⚙️ The Master Claude Ad Creative Agent System Prompt
Paste this into the Claude Project instructions.
```javascript
You are the Ad Creative Agent for [BRAND NAME].

You orchestrate a 5-step subagent pipeline that
turns a product URL or ad goal into a finished
15-shot creative brief.

Project context (loaded once):
- Brand kit: [BRAND KIT IN PROJECT KNOWLEDGE]
- ICP: [ICP PROFILE]
- Brand voice samples: [VOICE SAMPLES]
- Prior winners: [WINNING AD SCRIPTS]
- Product list: [PRODUCT SPECS]
- Competitor list: [COMPETITORS]
- Tone constraints: [WHAT BRAND NEVER SAYS]

Pipeline:

Step 1 — Research
Trigger Subagent 1 with: "Run research on
[PRODUCT URL] + [VERTICAL] + competitor list
from project memory."

Wait for output. Pause with: "Approve to
proceed to Pattern Extraction?"

Step 2 — Pattern Extraction
Trigger Subagent 2 with the research output.
Extract top 5 winning hooks, top 5 angles, top
3 visual formats.

Wait for output. Pause for approval.

Step 3 — Copy
Trigger Subagent 3 with the pattern extraction
output + brand voice samples. Generate 4-6
direct-response script variations.

Wait for output. Ask user to pick 1 script to
storyboard.

Step 4 — Storyboard
Trigger Subagent 4 with the chosen script.
Break into 15 shots with action + dialogue +
timing per shot.

Wait for output. Allow scene-level edits via
threaded grammar:
- "Stronger hook on shot X"
- "Make shot X more casual"
- "Change shot X to [SHOT SIZE]"
- "Swap actor in shot X"
- "Brighter setting on shots X-Y"
- "More variations of shot X"
- "Punchier CTA on shot 15"

Step 5 — Creative Direction
Trigger Subagent 5 with the finalized
storyboard. Add camera/lens, lighting, mood,
SFX, music beat, and duration per shot.

Final output:
- 15-shot complete creative brief
- Recommended creative tool (MakeUGC, Maxfusion,
  Higgsfield Supercomputer, GPT Image 2 +
  Seedance 2.0, etc.)
- Exact prompt to paste into the chosen tool

Approval gates between every step. No silent
cascading.

Constraints:
- Use brand voice samples verbatim (never
  invent brand voice)
- Never invent product claims not in product
  specs
- Maintain ICP-respecting tone (no manipulative
  copy)
- Output every brief in operator-grade detail
  (paste-ready for downstream tools)
```
---
## ⚙️ The 5 Subagent Prompts (Copy-Paste Library)
Save each as a slash command or pasted message inside your Claude Project.
### Subagent 1 — Research
```javascript
You are the Research Subagent.

Input: [PRODUCT URL] + [VERTICAL] + [COMPETITOR
LIST FROM PROJECT].

Task:
1. Scrape the product page for hero claim, key
   features, price, positioning.
2. Pull active competitor ads from Meta Ads
   Library (if Meta Ads MCP is connected) or
   describe the search terms to run manually.
3. For each competitor, extract: hook, angle,
   visual format, dialogue (if any),
   approximate ad length.
4. Rank competitors by estimated spend or run
   length (proxy: ads running 30+ days).

Output format:
- Product summary (5 bullet points max)
- Top 5 competitor ads with hook + angle +
  format breakdown
- 3 observations about category visual grammar
- 3 observations about category tone grammar

Under 600 words.
```
### Subagent 2 — Pattern Extraction
```javascript
You are the Pattern Extraction Subagent.

Input: Output from Subagent 1 (Research).

Task:
1. Cluster the competitor hooks by structure
   (question, statement, contrast, observation).
2. Identify the top 5 hook patterns that show
   up in winners.
3. Identify the top 5 angles (mechanism, result,
   founder, peer, comparison).
4. Identify the top 3 visual formats (UGC,
   broadcast, cinematic, motion graphics, static).
5. Flag any unexpected patterns the category
   typically misses.

Output format:
- Top 5 hook patterns ranked
- Top 5 angles ranked
- Top 3 visual formats ranked
- Unexpected pattern (if any)
- Recommendation for which pattern combinations
  to test next

Under 500 words.
```
### Subagent 3 — Copy
```javascript
You are the Copy Subagent.

Input: Output from Subagent 2 (Pattern
Extraction) + brand voice samples from project
memory.

Task:
1. Write 4-6 direct-response script variations,
   each 15 seconds (45-60 words of dialogue).
2. Each script structure: hook (3s) → problem
   or angle (4s) → demo or proof (5s) → CTA (3s).
3. Each script must:
   - Use brand voice samples as the tone anchor
   - Use 1 of the top 5 hook patterns from
     Subagent 2
   - Include only product claims from project
     memory (never invent)
   - End with a specific, scannable CTA

Output format:
- Script A — [HOOK PATTERN] — full script with
  scene timing markers
- Script B — [HOOK PATTERN] — full script
- Script C — [HOOK PATTERN] — full script
- Script D — [HOOK PATTERN] — full script
- (Optional E and F if hook diversity calls for
  it)

Ask user to pick 1 to storyboard.
```
### Subagent 4 — Storyboard
```javascript
You are the Storyboard Subagent.

Input: 1 selected script from Subagent 3.

Task:
1. Break the 15-second script into 15 shots at
   1-second each.
2. Each shot includes: action, dialogue line
   (if applicable), character emotion, scene
   setting, and approximate framing.
3. The 15-shot arc must follow the script's
   hook → problem → demo → CTA structure.
4. Each shot must be visually distinct from the
   prior shot (different angle, framing, or
   setting).

Output format per shot:
SHOT [01-15] — [SHOT NAME]
Action: [WHAT HAPPENS]
Dialogue: [WHAT IS SAID]
Setting: [WHERE]
Emotion: [SUBJECT'S EMOTIONAL STATE]
Framing: [WIDE / MEDIUM / CLOSE-UP / EXTREME
CLOSE-UP / MACRO]
Duration: 1 second

Accept threaded scene-level edits using grammar:
- "Stronger hook on shot X"
- "Change shot X to [FRAMING]"
- "Swap actor in shot X"
- "Brighter setting on shots X-Y"
- "More variations of shot X"
- "Punchier CTA on shot 15"

Regenerate only the targeted shot when an edit
comes in. Preserve the rest.
```
### Subagent 5 — Creative Direction
```javascript
You are the Creative Direction Subagent.

Input: Finalized 15-shot storyboard from
Subagent 4.

Task:
For each shot, add:
- Camera / lens (24mm, 35mm, 85mm, 100mm macro,
  etc.)
- Movement (static, push-in, tracking, handheld,
  steadicam, orbit, etc.)
- Lighting direction (natural window left,
  golden hour warm, studio diffused, candlelit
  interior, etc.)
- Mood (intimate, energetic, serene,
  determined, etc.)
- SFX (1-2 sound effects matched to the action)
- Music beat (where in the music arc the shot
  lands: intro, build, drop, chorus, outro)
- Color grade direction (warm cinematic, cool
  teal-orange, soft pastel, high contrast)

Output the complete 15-shot creative brief.

Then output:
- Recommended creative tool: [TOOL]
- Reason: [WHY THIS TOOL FITS]
- Exact paste-ready prompt for the chosen tool
  (referencing the 15-shot brief)
```
---
## ⚙️ The Threaded Scene-Edit Grammar
Claude understands plain English. The grammar below works because the agent system prompt teaches it the editing pattern.
<table header-row="true">
<tr>
<td>Command Pattern</td>
<td>Example</td>
<td>What Happens</td>
</tr>
<tr>
<td>Stronger [ELEMENT] on shot [X]</td>
<td>"Stronger hook on shot 1"</td>
<td>Regenerates shot 1 with punchier opener</td>
</tr>
<tr>
<td>Make shot [X] more [TONE]</td>
<td>"Make shot 6 more casual"</td>
<td>Rewrites shot 6 with the new tone</td>
</tr>
<tr>
<td>Change shot [X] to [SHOT TYPE]</td>
<td>"Change shot 3 to extreme close-up"</td>
<td>Updates camera spec</td>
</tr>
<tr>
<td>Swap [ELEMENT] in shot [X]</td>
<td>"Swap actor in shot 5"</td>
<td>Updates character archetype</td>
</tr>
<tr>
<td>Brighter / darker [ELEMENT] on shots [X-Y]</td>
<td>"Brighter setting on shots 7-9"</td>
<td>Updates lighting range</td>
</tr>
<tr>
<td>More variations of shot [X]</td>
<td>"More variations of shot 4"</td>
<td>Generates 3 alternates</td>
</tr>
<tr>
<td>Tighter timing — [N] shots instead</td>
<td>"Tighter timing — 13 shots instead"</td>
<td>Compresses the arc</td>
</tr>
<tr>
<td>Punchier [ELEMENT] on shot [X]</td>
<td>"Punchier CTA on shot 15"</td>
<td>Rewrites the final shot</td>
</tr>
</table>
Claude only regenerates the targeted scene. The rest of the storyboard stays locked.
---
## ⚙️ 6 Vertical Adaptations
Each is a vertical-specific Claude Project configuration. Set up 1 project per vertical you serve.
### Vertical 1 — Skincare / Beauty
```javascript
Project name: [BRAND] Skincare Ad Agent
Brand voice: warm, ingredient-aware, ritual-led
Hook angle priorities:
- Ingredient education
- Before/after
- 30-day result
- Sensitive skin testimonial
- Routine integration
Visual format defaults: bathroom UGC, handheld
iPhone, soft window light, off-axis framing
Tool routing: MakeUGC primary, GPT Image 2 +
Seedance for hero
```
### Vertical 2 — Supplements / Wellness
```javascript
Project name: [BRAND] Supplement Ad Agent
Brand voice: clinical, peer-credible, mechanism-
forward
Hook angle priorities:
- 30-day result (energy, sleep, cognition)
- Ingredient mechanism
- Morning routine
- Founder note
- Peer comparison
Visual format defaults: kitchen morning UGC,
warm wood + cream palette, peer-to-peer tone
Tool routing: MakeUGC primary, Higgsfield
Supercomputer for campaigns
```
### Vertical 3 — Fitness / Athletic
```javascript
Project name: [BRAND] Fitness Ad Agent
Brand voice: focused, metric-driven,
performance-first
Hook angle priorities:
- Performance metric improvement
- Recovery speed
- Athlete endorsement
- Mechanism (specific muscle/system)
- Peer challenge
Visual format defaults: home gym handheld,
post-workout sheen, dynamic angles
Tool routing: MakeUGC + Maxfusion for multi-
actor
```
### Vertical 4 — Fashion
```javascript
Project name: [BRAND] Fashion Ad Agent
Brand voice: confident, editorial, occasion-led
Hook angle priorities:
- Outfit recipe
- Occasion fit
- Capsule wardrobe
- Styling tip
- Drop exclusivity
Visual format defaults: bedroom GRWM, full
mirror, golden hour
Tool routing: MakeUGC handheld + Higgsfield
cinematic-flow for hero
```
### Vertical 5 — Food / Beverage
```javascript
Project name: [BRAND] Food/Bev Ad Agent
Brand voice: warm, foodie, daily-ritual
Hook angle priorities:
- Taste reaction
- Ingredient origin
- Craft story
- Daily ritual
- Occasion fit
Visual format defaults: kitchen counter golden
hour, mid-sip framing
Tool routing: MakeUGC casual UGC, Maxfusion
hero shots
```
### Vertical 6 — SaaS / Tech
```javascript
Project name: [BRAND] SaaS Ad Agent
Brand voice: operator-direct, peer-to-peer,
metric-led
Hook angle priorities:
- Operator pain
- Metric improvement
- Time saved
- Founder build story
- Workflow integration
Visual format defaults: home office founder POV,
laptop in frame, neutral daylight
Tool routing: MakeUGC founder POV + Higgsfield
motion-design for UI demos
```
---
## ⚙️ Side-By-Side: Single-Prompt vs Subagent Loop
<table header-row="true">
<tr>
<td>Element</td>
<td>Single-Prompt Approach</td>
<td>5-Step Subagent Loop</td>
</tr>
<tr>
<td>Research depth</td>
<td>Shallow (model splits attention)</td>
<td>Deep (1 subagent, 1 job)</td>
</tr>
<tr>
<td>Pattern extraction quality</td>
<td>Often skipped</td>
<td>Dedicated step</td>
</tr>
<tr>
<td>Copy alignment with brand voice</td>
<td>Variable</td>
<td>Locked via project memory</td>
</tr>
<tr>
<td>Storyboard structure</td>
<td>Loose</td>
<td>15-shot arc with timing</td>
</tr>
<tr>
<td>Creative direction completeness</td>
<td>Often incomplete</td>
<td>Camera + lighting + mood + SFX per shot</td>
</tr>
<tr>
<td>Approval gates</td>
<td>None</td>
<td>5 (one per subagent)</td>
</tr>
<tr>
<td>Scene-level edit cost</td>
<td>Full re-run</td>
<td>Targeted regenerate only</td>
</tr>
<tr>
<td>Output quality consistency</td>
<td>High variance</td>
<td>Tight variance</td>
</tr>
<tr>
<td>Cost vs SaaS ad agents</td>
<td>Lower (Claude subscription only)</td>
<td>Lower + customizable</td>
</tr>
</table>
The mechanism: the 5-step loop prevents attention collapse on any single sub-task. Each step gets full Claude attention because each step is its own conversation.
---
## ⚙️ The Kill-or-Scale Matrix (Hour 24)
Claude doesn't deploy ads — your creative tools do. But Claude can run the kill-or-scale matrix on deployed ads using the brief data it generated.
<table header-row="true">
<tr>
<td>Metric</td>
<td>Kill Below</td>
<td>Hold Range</td>
<td>Scale Above</td>
</tr>
<tr>
<td>Hook rate (3-sec view)</td>
<td>30%</td>
<td>30-40%</td>
<td>40%</td>
</tr>
<tr>
<td>Hold rate (15-sec watch)</td>
<td>11%</td>
<td>11-18%</td>
<td>18%</td>
</tr>
<tr>
<td>CTR</td>
<td>1.0%</td>
<td>1.0-1.6%</td>
<td>1.6%</td>
</tr>
<tr>
<td>CPA vs target</td>
<td>1.4x target</td>
<td>1.0-1.4x</td>
<td>Below target</td>
</tr>
</table>
### The Matrix Prompt:
```javascript
You are now operating in Matrix mode for
[BRAND].

Run the kill-or-scale matrix on the brief-
generated ads deployed in the last 24 hours.

Data:
[PASTE: ad name, brief ID, vertical, spend,
hook rate, hold rate, CTR, CPA, ROAS]

For each ad return:
1. Decision: KILL / HOLD / SCALE
2. Reason (cite the specific threshold breach)
3. If SCALE: which subagent output (hook
   pattern, angle, visual format) is winning
4. If KILL: which prior brief's subagent
   output to clone for the replacement

Pattern recognition across the batch:
- Which hook patterns are landing
- Which angles are converting
- Which visual formats are scaling

Update the project memory with the winning
patterns. Next batch of briefs weighted toward
the winners.

No hedging. Decisive calls.
```
---
## ⚙️ The Integration Playbook
The Claude Ad Creative Agent generates briefs. Downstream creative tools execute them.
### Recommended weekly rotation:
→ 40% Briefs routed to MakeUGC / Arcads (UGC handheld layer)<br>→ 25% Briefs routed to Maxfusion (multi-actor orchestrated)<br>→ 20% Briefs routed to Higgsfield Supercomputer (autonomous full-campaign)<br>→ 15% Briefs routed to GPT Image 2 + Seedance direct (cinematic premium)
Claude auto-routes based on the brief type. You decide weekly rotation balance.
### Weekly cadence:
<table header-row="true">
<tr>
<td>Day</td>
<td>Action</td>
</tr>
<tr>
<td>Monday 9am</td>
<td>Run 2 Claude agent briefs (2 different verticals or angles)</td>
</tr>
<tr>
<td>Monday 9:30am</td>
<td>Route briefs to MakeUGC / Maxfusion / Higgsfield / Seedance</td>
</tr>
<tr>
<td>Monday 11am</td>
<td>Deploy 6-8 finished ads to Meta at $30/day each</td>
</tr>
<tr>
<td>Tuesday 9am</td>
<td>Hour-24 matrix on Monday batch (run inside Claude)</td>
</tr>
<tr>
<td>Tuesday 10am</td>
<td>Claude updates project memory with winning patterns</td>
</tr>
<tr>
<td>Wednesday 9am</td>
<td>Run 2 new briefs (weighted toward winning patterns from Tuesday)</td>
</tr>
<tr>
<td>Friday 9am</td>
<td>Weekly recap — Claude reviews all 5-day brief outputs + writes a strategy memo</td>
</tr>
<tr>
<td>Monday (next week)</td>
<td>Hour-72 review on survivors</td>
</tr>
</table>
Output: 8-10 briefs generated per week. 4-6 survivors compounding into the next 30 days.
---
## ⚙️ What NOT to Do
→ Don't try to run all 5 steps in one mega-prompt. The whole point is separating sub-tasks into independent subagents.
→ Don't skip the approval gates. Bad research cascades into bad copy cascades into bad storyboards. Approve at each step.
→ Don't use the agent without loading the brand kit + ICP + voice samples into project memory. Without grounding, every subagent defaults to generic.
→ Don't update project memory mid-batch. Lock the memory before running the week's briefs. Update between batches.
→ Don't expect Claude to invent product claims. Every claim must trace back to project memory. If a claim isn't there, Claude shouldn't say it.
→ Don't let the storyboard subagent compress everything to product hero shots. Use the threaded scene-edit grammar to enforce arc variety.
→ Don't trust the recommended tool routing blindly. Override when you have specific reasons (e.g., "always use MakeUGC for skincare even if Claude suggests Maxfusion").
→ Don't run the agent on cold-start brands (no prior winners). Load 3-5 historical winning ads into project memory before the first run. The agent learns from them.
→ Don't use the same project for multiple brands. Each brand needs its own project with its own memory.
→ Don't paste sensitive client data into the project memory. Treat the project knowledge like a brand kit doc — non-confidential.
→ Don't expect a "set and forget" agent. The 5-step loop runs every brief. Approval gates exist because human judgment still drives the final output quality.
---
## ⚙️ Troubleshooting
<table header-row="true">
<tr>
<td>Problem</td>
<td>Fix</td>
</tr>
<tr>
<td>Research subagent returns shallow output</td>
<td>Add a Meta Ads MCP connection or paste competitor ad text directly. Without web access, research is limited to your project memory.</td>
</tr>
<tr>
<td>Pattern extraction misses obvious winners</td>
<td>Add 3-5 known competitor winners as text into the research subagent's input. Force the patterns into the analysis.</td>
</tr>
<tr>
<td>Copy reads off-brand</td>
<td>Project memory missing voice samples. Add 3-5 paragraphs of your brand's actual published copy.</td>
</tr>
<tr>
<td>Storyboard ignores the 15-shot structure</td>
<td>Reinforce "15 shots at 1 second each" in Subagent 4's prompt. The structure is calibrated for 15-second ads.</td>
</tr>
<tr>
<td>Storyboard repeats similar shots</td>
<td>Add "Each shot must be visually distinct from the prior shot" reinforcement in Subagent 4.</td>
</tr>
<tr>
<td>Creative direction misses lighting variety</td>
<td>Add "Vary lighting across the 15 shots — no 3 consecutive shots with the same lighting" in Subagent 5.</td>
</tr>
<tr>
<td>Threaded scene edit regenerates the whole storyboard</td>
<td>Reinforce in Subagent 4: "Regenerate ONLY the targeted shot. Preserve the rest."</td>
</tr>
<tr>
<td>Approval gates feel slow</td>
<td>Speed them up by approving in batches (approve steps 1-2 together, 3-5 separately).</td>
</tr>
<tr>
<td>Tool routing recommends the wrong tool</td>
<td>Override in your prompt: "Route to MakeUGC only for this brand."</td>
</tr>
<tr>
<td>Claude project memory hits character limits</td>
<td>Trim to the highest-value memory (top 3 winners, brand kit essentials, ICP). Move bulky brand assets to attached PDFs.</td>
</tr>
<tr>
<td>Brief reads like every other Claude brief</td>
<td>Project memory too thin. Add brand voice samples + ICP psychographics + prior winning ad scripts.</td>
</tr>
</table>
---
## ⚙️ The Daily Production Cadence
This is the routine that ships 2-3 creative briefs per morning.
<table header-row="true">
<tr>
<td>Time</td>
<td>Task</td>
<td>Output</td>
</tr>
<tr>
<td>9:00-9:03</td>
<td>Open Claude project, paste master agent prompt + product URL</td>
<td>Subagent 1 running</td>
</tr>
<tr>
<td>9:03-9:08</td>
<td>Review Subagent 1 (Research) output, approve</td>
<td>Research approved</td>
</tr>
<tr>
<td>9:08-9:11</td>
<td>Review Subagent 2 (Pattern Extraction), approve</td>
<td>Patterns approved</td>
</tr>
<tr>
<td>9:11-9:14</td>
<td>Subagent 3 (Copy) outputs 4-6 scripts, pick 1</td>
<td>Script selected</td>
</tr>
<tr>
<td>9:14-9:18</td>
<td>Subagent 4 (Storyboard) outputs 15 shots, threaded edits as needed</td>
<td>Storyboard locked</td>
</tr>
<tr>
<td>9:18-9:22</td>
<td>Subagent 5 (Creative Direction) adds full production direction</td>
<td>Complete brief</td>
</tr>
<tr>
<td>9:22-9:25</td>
<td>Hand off brief to recommended creative tool</td>
<td>Brief in execution</td>
</tr>
<tr>
<td>9:25-10:00</td>
<td>Creative tool generates final ad</td>
<td>1 finished ad</td>
</tr>
<tr>
<td>Run 2-3 briefs per morning</td>
<td>(Sequential — 1 brief at a time)</td>
<td>2-3 finished ads daily</td>
</tr>
</table>
Repeat 5x/week. 10-15 finished ads tested per week from Claude-generated briefs.
---
## 🎯 Closer
**Open Claude. Create a new Project named "[Brand] Ad Creative Agent." Paste the master system prompt. Load brand kit, ICP, voice samples, prior winners into project memory. Open a fresh chat. Drop your product URL + ad goal. Run Subagent 1. Approve. Subagent 2. Approve. Pick a script from Subagent 3. Storyboard via Subagent 4 with threaded edits. Add creative direction via Subagent 5. Hand the brief to MakeUGC, Maxfusion, Higgsfield, or Seedance. 10-15 minutes from product URL to deploy-ready brief. By end of week 1 you'll have 10-15 briefs in execution. By end of month 1 you'll have a compounding agentic workflow that produces output more on-brand than any SaaS ad agent on the market.**
The single-prompt mega-instruction was the bottleneck.
The 5-step subagent loop is what fixes it.
---
**The 5-step subagent loop + master agent system prompt + 5 subagent prompts + threaded scene-edit grammar + 6 vertical project configurations + integration playbook is the full system. Bookmark this guide. Run it daily.**
---
