---
title: "The Higgsfield MCP + Claude Agentic Campaign System: Ship Ad Creatives, Social, Video, and Transitions in 1 Chat"
page_id: 37892e2e92e980938527d0d8991b73b8
layer: skills
source: https://freebie-for-you.notion.site/37892e2e92e980938527d0d8991b73b8
---
# The Higgsfield MCP + Claude Agentic Campaign System: Ship Ad Creatives, Social, Video, and Transitions in 1 Chat
---
## 🎯 What You're Getting
The exact setup that connects Higgsfield to Claude via MCP (Model Context Protocol) and turns your Claude chat into a full campaign production studio. Brief Claude once. Claude routes the work to Higgsfield. Higgsfield generates the ad creatives, social posts, video assets, and transitions. Everything happens inside 1 chat window. No tab switching. No exporting between tools. No re-uploading reference images.
The full Higgsfield MCP installation walkthrough. The Claude project setup with orchestration scaffolding. The 4 master orchestration prompts (one per asset type: ad creatives, social content, video assets, transitions). The campaign brief format. 6 vertical adaptations. The brand asset lock mechanism that keeps character + product + palette consistent across every output.
You stop bouncing between 5 tools to ship 1 campaign. You stop exporting from Higgsfield, importing into Canva, exporting again, importing into CapCut. You stop re-briefing every tool from scratch. You open Claude, brief the campaign, watch Higgsfield execute, ship.
By the end of this guide, you'll have:
→ The Higgsfield MCP installation guide (15 minutes, no coding)<br>→ The Claude project setup with the orchestration system prompt<br>→ 4 master orchestration prompts (ad creatives / social content / video assets / transitions)<br>→ The campaign brief format that triggers the full agentic loop<br>→ 6 vertical-specific Claude project configurations<br>→ The brand asset lock mechanism (character + product + palette consistency)<br>→ The kill-or-scale matrix for agentic campaign batches<br>→ The daily production cadence shipping full campaigns inside 1 chat
If you're already running Higgsfield Supercomputer for autonomous campaigns or the Claude Ad Creative Agent for brief generation, this is the **execution layer** that connects Claude's orchestration to Higgsfield's generation. Claude plans, briefs, routes. Higgsfield executes. Everything ships from 1 chat.
---
## ⚙️ The Hidden Mechanism — Why Claude + Higgsfield MCP Beats Tab-Switching
Every standard DTC creative workflow has the same broken loop:
1. Operator opens Higgsfield in a tab, generates the hero ad
2. Exports the hero, opens Canva, builds the static social variants
3. Exports the static variants, opens CapCut, edits the video assets
4. Imports the video, layers in transitions, exports the final
5. Opens a copywriting tool, writes the ad copy
6. Compiles everything into a deploy folder
Each handoff loses 5-15 minutes. Each tool needs re-briefing. Brand consistency drifts between tools because each one renders character + palette differently.
Total time per campaign: 2-4 hours of tab-switching, exporting, re-importing, re-briefing.
The Claude + Higgsfield MCP fix is structural: Higgsfield's MCP server exposes its full generation API directly inside your Claude conversation. Claude calls Higgsfield tools the same way it calls any other tool — generate_image, generate_video, reframe, upscale_video. No exporting. No re-importing. No re-briefing.
→ Claude reads your campaign brief<br>→ Claude routes the work — what's a hero, what's social, what's video, what needs transitions<br>→ Claude calls generate_image for static assets<br>→ Claude calls generate_video for video assets<br>→ Claude calls reframe to adapt video to multiple aspect ratios<br>→ Claude calls upscale_video for premium-quality outputs<br>→ Brand assets (character, product, palette) stay locked across every call
The fix is not better tools. The fix is **giving Claude direct API access to Higgsfield via MCP** — the thing that lets 1 chat orchestrate the full campaign without humans in the export/import loop.
---
## ⚙️ The Stack
<table header-row="true">
<tr>
<td>Layer</td>
<td>Tool</td>
<td>Job</td>
</tr>
<tr>
<td>Orchestration</td>
<td>Claude (Opus 4.7 recommended)</td>
<td>Reads brief, routes work, calls Higgsfield tools</td>
</tr>
<tr>
<td>Generation API</td>
<td>Higgsfield MCP server</td>
<td>Exposes generate_image, generate_video, reframe, upscale, etc. to Claude</td>
</tr>
<tr>
<td>Persistent context</td>
<td>Claude Project</td>
<td>Stores brand kit, ICP, character references, prior winners</td>
</tr>
<tr>
<td>Asset organization</td>
<td>Claude project folder</td>
<td>Drops all generated assets in 1 organized location</td>
</tr>
<tr>
<td>Polish (optional)</td>
<td>CapCut for final tweaks</td>
<td>Optional — most output ships straight from Higgsfield</td>
</tr>
<tr>
<td>Deploy</td>
<td>Meta + YouTube + TikTok + Instagram</td>
<td>Platform-native campaign assets</td>
</tr>
</table>
Claude + Higgsfield MCP is the 2-tool core. Everything else is optional polish.
---
## ⚙️ The Workflow Math
Traditional 5-tool campaign workflow: 2-4 hours per campaign, $0-$50/month in tool subscriptions for each tool, but the bottleneck is operator time spent tab-switching and re-briefing.
This system: Claude subscription + Higgsfield subscription. 8-15 minutes per full campaign. 1 chat, all outputs auto-organized in Higgsfield's project structure.
The leverage shift: you stop coordinating tools and start briefing campaigns. The bottleneck moves from tool handoffs to creative direction (which the 4 orchestration prompts + 6 vertical templates fix).
---
## ⚙️ Step 1 — Install the Higgsfield MCP Server
Higgsfield publishes an official MCP server. Install once per machine.
### Install Claude Desktop (if you don't have it):
```bash
# Download Claude Desktop from claude.ai/download
# Install per OS instructions
```
### Add Higgsfield MCP to Claude config:
Edit (or create) the Claude Desktop MCP config file:
```bash
# macOS
~/Library/Application Support/Claude/claude_desktop_config.json

# Windows
%APPDATA%\\\\Claude\\\\claude_desktop_config.json
```
Paste this config block:
```json
{
  "mcpServers": {
    "higgsfield": {
      "command": "npx",
      "args": ["-y", "@higgsfield/mcp-server"],
      "env": {
        "HIGGSFIELD_API_KEY": "[YOUR HIGGSFIELD API KEY]"
      }
    }
  }
}
```
Get your Higgsfield API key from the Higgsfield account settings. Paste it into the env block.
Save the file and restart Claude Desktop.
### Verify the connection:
In a new Claude chat, type:
```plain text
/mcp
```
You should see `higgsfield` listed as connected with the full tool list (generate_image, generate_video, reframe, upscale_video, virality_predictor, show_characters, show_reference_elements, etc.).
If the connection fails, verify your API key and restart Claude Desktop.
---
## ⚙️ Step 2 — Set Up the Claude Project (Orchestration Scaffolding)
Create a new Claude Project named "[Brand] Campaign Orchestrator." Paste the orchestration system prompt (Section 10) into the Project instructions.
Load brand context into the Project knowledge:
→ Brand kit PDF<br>→ Character reference images (uploaded to Higgsfield Working Memory)<br>→ Product images (uploaded to Higgsfield)<br>→ ICP profile + brand voice samples<br>→ Hero claim + tagline<br>→ Color palette + typography rules<br>→ Prior winning campaign briefs
The Project memory persists across every campaign chat. The brand context loads once and applies to every future brief.
---
## ⚙️ Step 3 — Brief the Campaign in 1 Chat
Start a fresh chat inside the Project. Drop the campaign brief in this format (60-90 seconds to write):
```plain text
CAMPAIGN: [CAMPAIGN NAME — e.g. "Spring
Launch — Hero Serum"]

ASSETS NEEDED:
- 1 hero ad creative (16:9 + 9:16 + 1:1)
- 3 social posts (1:1 static)
- 1 video asset (15s, 9:16)
- 2 transitions (for stitching the video to the
  hero ad in CTV cut)

CHARACTER: [pull from character refs in
project memory]

PRODUCT: [pull from product refs in project
memory]

CAMPAIGN ANGLE: [hook angle — ingredient
education, 30-day result, founder note, etc.]

DEPLOY TARGETS: Meta, YouTube, TikTok
```
Claude reads the brief, identifies the 4 asset types needed, and starts routing to the appropriate Higgsfield tools.
---
## ⚙️ Step 4 — Claude Routes + Higgsfield Executes
Claude calls Higgsfield MCP tools sequentially:
1. `show_characters` to pull the locked character reference
2. `show_reference_elements` to pull product + brand assets
3. `generate_image` for the hero ad creative (3 aspect ratios)
4. `generate_image` for the 3 social posts
5. `generate_video` for the 15-second video asset
6. `reframe` to adapt the video to additional aspect ratios
7. `upscale_video` for premium quality output
8. Claude organizes outputs in the Higgsfield project folder
You watch the chat as Claude calls each tool. Each generation shows up inline. Claude flags any inconsistencies it sees (character drift, palette mismatch, product distortion) and offers regenerates.
Total runtime: 8-15 minutes for a full campaign.
---
## ⚙️ Step 5 — Review and Ship
When Claude finishes, all assets are in your Higgsfield project folder organized by asset type. The chat shows the full campaign output.
5-point QC check:
<table header-row="true">
<tr>
<td>Check</td>
<td>What To Verify</td>
</tr>
<tr>
<td>Character consistency</td>
<td>Same character across hero ad + social posts + video</td>
</tr>
<tr>
<td>Product consistency</td>
<td>Identical product appearance across all assets</td>
</tr>
<tr>
<td>Palette consistency</td>
<td>Brand colors hold across every output</td>
</tr>
<tr>
<td>Aspect ratios</td>
<td>All required aspect ratios delivered (16:9, 9:16, 1:1)</td>
</tr>
<tr>
<td>Asset count</td>
<td>All briefed assets present (1 hero + 3 social + 1 video + 2 transitions)</td>
</tr>
</table>
If anything failed, ask Claude to regenerate that specific asset. No need to start over.
Ship to your deploy surfaces.
---
## ⚙️ The Master Orchestration System Prompt
Paste this into the Claude Project instructions.
```javascript
You are the Campaign Orchestrator for [BRAND
NAME].

You have access to the Higgsfield MCP server.
You can call:
- generate_image (for static assets)
- generate_video (for video assets)
- reframe (to adapt aspect ratios)
- upscale_video (for premium quality)
- virality_predictor (to score creative)
- show_characters (to pull locked character
  references)
- show_reference_elements (to pull product +
  brand assets)
- show_marketing_studio (to access campaign
  context)
- show_generations (to review prior outputs)
- presets_show (to use brand-locked presets)
- show_medias (to access media library)

Project context (loaded once):
- Brand kit: [BRAND KIT IN PROJECT KNOWLEDGE]
- Character references: [CHARACTER IDs FROM
  HIGGSFIELD]
- Product references: [PRODUCT IDs FROM
  HIGGSFIELD]
- Brand voice samples
- ICP profile
- Color palette + typography rules
- Hero claim + tagline
- Prior winning campaign briefs

Campaign brief input format (operator
provides):
- CAMPAIGN: [name]
- ASSETS NEEDED: [list with aspect ratios]
- CHARACTER: [reference]
- PRODUCT: [reference]
- CAMPAIGN ANGLE: [hook angle]
- DEPLOY TARGETS: [Meta / YouTube / TikTok /
  CTV]

Your workflow:

1. Read the brief. Identify the 4 asset types
   needed:
   - Static ad creatives (single image)
   - Social posts (single image, square or
     vertical)
   - Video assets (15-second video)
   - Transitions (short stitching clips between
     assets)

2. Pull locked character + product references
   via show_characters + show_reference_elements.

3. For each asset type, call the appropriate
   Higgsfield tool with brand-locked parameters:

   - Hero ad creatives: generate_image with the
     character + product reference, brand
     palette locked, hook angle in the visual
   - Social posts: generate_image x N with
     varied composition per post but same
     character + palette
   - Video assets: generate_video with character
     + product locked, 15s duration, 9:16
     vertical
   - Transitions: generate_video with short
     motion clips (2-3s) matching the brand
     palette

4. After each generation, run an inline QC check:
   - Character identity matches reference (use
     show_characters to verify)
   - Product identity matches reference
   - Palette aligned with brand colors
   - Asset matches the requested aspect ratio

5. If any asset fails QC, offer a regenerate
   with reinforced parameters. Don't restart
   the campaign.

6. After all assets are generated, call reframe
   to deliver any required additional aspect
   ratios.

7. Optionally call upscale_video to upgrade
   video assets to 4K HDR.

8. Optionally call virality_predictor on the
   hero ad to score the creative before deploy.

9. Organize all outputs in the Higgsfield
   project folder. Confirm to operator that all
   assets are ready.

Constraints:
- Never invent product claims not in project
  memory
- Maintain brand voice from voice samples
- Lock character identity at strength 0.9+ on
  every call
- Lock product identity at strength 0.9+
- Stay within the campaign brief — don't
  generate extra assets the operator didn't
  request

Output style:
- Show your reasoning briefly before each
  Higgsfield call ("Generating the hero ad
  with character ref locked")
- Show the tool calls inline
- Show the outputs inline
- Flag any QC issues immediately
- End with a deploy-ready summary
```
---
## ⚙️ The 4 Asset Type Orchestration Prompts
These are the 4 sub-prompts Claude uses internally when routing to Higgsfield. Save as named slash commands or paste inline as needed.
### Ad Creatives Orchestration
```javascript
For the hero ad creative:

Call generate_image with:
- Character reference: [LOCKED CHARACTER]
- Product reference: [LOCKED PRODUCT]
- Composition: hero shot, product visible at
  chest level, off-axis framing (subject 1/3
  right or left)
- Lighting: per brand palette +
  visual_aesthetic
- Hook angle visual: [VISUAL FOR HOOK ANGLE]
- Resolution: 4K

Generate 3 aspect ratios:
- 16:9 horizontal (YouTube, Meta feed)
- 9:16 vertical (Reels, TikTok, Stories)
- 1:1 square (Meta feed alternative)

After generation, run QC:
- Character matches reference (use
  show_characters)
- Product matches reference
- Palette matches brand
- All 3 aspect ratios delivered
```
### Social Content Orchestration
```javascript
For the social posts:

Call generate_image x [N] times with:
- Character reference: [LOCKED CHARACTER]
- Product reference: [LOCKED PRODUCT]
- Composition variations:
  - Post 1: Product hero with character in
    background
  - Post 2: Character holding product in
    lifestyle context
  - Post 3: Product macro detail shot
- Lighting: brand palette consistent
- Resolution: 4K
- Aspect ratio: 1:1 square (Meta feed) + 9:16
  (Stories)

After generation, run QC across the set:
- All [N] posts feel like the same campaign
- Character + product identity locked across all
- Palette holds across all
```
### Video Assets Orchestration
```javascript
For the video asset:

Call generate_video with:
- Character reference: [LOCKED CHARACTER]
- Product reference: [LOCKED PRODUCT]
- Duration: 15 seconds
- Aspect ratio: 9:16 vertical
- Camera direction: [HANDHELD UGC / CINEMATIC /
  FPV / etc. — per brief]
- Audio: per brand sound profile
- Resolution: 4K

After generation:
- Run QC for identity + motion + lighting
  consistency
- Call reframe to adapt to 16:9 + 1:1 if
  needed
- Optionally call upscale_video for premium
  quality
```
### Transitions Orchestration
```javascript
For the transitions:

Call generate_video x 2 with:
- Duration: 2-3 seconds each
- Composition: motion graphics or product
  morph
- Color: brand palette
- Purpose: stitch between hero ad → video
  asset OR video → social CTA
- Aspect ratio: match the asset they're
  stitching between

After generation:
- Verify transitions match the brand palette
- Verify motion energy matches the campaign
  tone
- Drop into Higgsfield project folder labeled
  "transitions"
```
---
## ⚙️ The Master Campaign Brief Format
Use this format every time you start a new campaign. Claude reads it and routes the work.
```javascript
CAMPAIGN: [campaign name + variant]

ASSETS NEEDED:
- [N] hero ad creatives ([aspect ratios])
- [N] social posts ([aspect ratios])
- [N] video assets ([duration + aspect ratios])
- [N] transitions ([duration + purpose])

CHARACTER: [reference ID from Higgsfield OR
description if generating new]

PRODUCT: [reference ID from Higgsfield OR
description]

CAMPAIGN ANGLE: [hook angle — ingredient
education, 30-day result, founder note,
GRWM, peer comparison, etc.]

CAMPAIGN TONE: [warm, urgent, premium, casual,
authoritative, etc.]

DEPLOY TARGETS: [Meta / YouTube / TikTok /
Instagram / CTV / All]

SPECIAL DIRECTION: [optional — any specific
visual or creative requirements not covered
above]
```
Claude returns a structured plan first ("I'll generate X hero ads, Y social posts, Z video assets, and N transitions, in that order, using the locked character + product references"). Approve. Claude executes.
---
## ⚙️ 6 Vertical Templates
Each is a vertical-specific Claude Project configuration with bracket-fills for the orchestration prompt.
### Vertical 1 — Skincare / Beauty
```javascript
Project name: [BRAND] Skincare Campaign Orchestrator
Character archetype: woman 28-40, natural glow,
soft natural makeup, bathroom setting
Product placement default: chin/cheek level,
fingertip application pose
Visual aesthetic: clean editorial, soft window
light, marble + cream palette
Hook angle priorities: ingredient education,
30-day result, sensitive skin testimonial
Transition style: liquid morph, droplet ripple
```
### Vertical 2 — Supplements / Wellness
```javascript
Project name: [BRAND] Supplement Campaign
Orchestrator
Character archetype: man or woman 30-50, peer-
credible, kitchen morning setting
Product placement default: chest level with
coffee or water visible
Visual aesthetic: warm wood + cream palette,
morning sunlight, clinical clean
Hook angle priorities: mechanism, 30-day
energy/sleep, ingredient origin, founder note
Transition style: morning routine cuts,
ingredient close-ups
```
### Vertical 3 — Fitness / Athletic
```javascript
Project name: [BRAND] Fitness Campaign
Orchestrator
Character archetype: athletic 22-40, workout
sheen, home gym or outdoor athletic setting
Product placement default: chest level mid-
workout or post-workout
Visual aesthetic: high-contrast, natural
daylight, athletic intensity
Hook angle priorities: performance metric,
recovery, athlete endorsement, peer challenge
Transition style: explosive motion, sweat
splash, dynamic angles
```
### Vertical 4 — Fashion
```javascript
Project name: [BRAND] Fashion Campaign
Orchestrator
Character archetype: style-aware 25-45,
bedroom GRWM or urban editorial setting
Product placement default: worn or styled, hip
level for accessory
Visual aesthetic: golden hour soft, brand
signature palette, editorial composition
Hook angle priorities: outfit recipe,
occasion fit, capsule wardrobe, drop
exclusivity
Transition style: fabric sway, outfit reveal
cuts, mirror frame transitions
```
### Vertical 5 — Food / Beverage
```javascript
Project name: [BRAND] Food/Bev Campaign
Orchestrator
Character archetype: foodie warm 25-45,
kitchen counter or social setting
Product placement default: chin level mid-sip
or mid-pour
Visual aesthetic: golden hour amber + cream,
warm kitchen ambience
Hook angle priorities: taste reaction,
ingredient origin, craft story, daily ritual
Transition style: pour splash, steam rise,
ingredient close-up
```
### Vertical 6 — SaaS / Tech
```javascript
Project name: [BRAND] SaaS Campaign
Orchestrator
Character archetype: operator/founder 28-50,
home office or peer-to-peer setting
Product placement default: laptop or phone in
hand showing UI screen, chest level
Visual aesthetic: clean tech editorial,
neutral daylight, modern minimal
Hook angle priorities: operator pain, metric
improvement, time saved, workflow integration
Transition style: UI motion graphics, screen
zoom-ins, kinetic typography
```
---
## ⚙️ The Brand Asset Lock Mechanism
The reason Claude + Higgsfield MCP keeps brand consistent across every output: Higgsfield Working Memory locks character + product + palette references at the API level. Every generate_image and generate_video call inherits the locks.
To set up the locks:
1. Upload character reference image to Higgsfield Working Memory once
2. Upload product reference image to Higgsfield Working Memory once
3. Define brand palette in Higgsfield presets once
4. In Claude project memory, store the Higgsfield IDs for character + product + presets
Every Claude orchestration call references these IDs. Higgsfield enforces the locks server-side.
Result: 50+ assets across a multi-campaign month all share the same character, product, palette. Drift becomes near-impossible.
---
## ⚙️ Side-By-Side: Tab-Switching vs Single Chat
<table header-row="true">
<tr>
<td>Element</td>
<td>5-Tool Tab-Switching</td>
<td>Claude + Higgsfield MCP</td>
</tr>
<tr>
<td>Tools opened per campaign</td>
<td>5+</td>
<td>1 (Claude)</td>
</tr>
<tr>
<td>Re-briefing per tool</td>
<td>Each tool needs separate brief</td>
<td>1 brief, Claude routes</td>
</tr>
<tr>
<td>Export/import between tools</td>
<td>Constant</td>
<td>None</td>
</tr>
<tr>
<td>Brand consistency across tools</td>
<td>Variable</td>
<td>Locked via Higgsfield Working Memory</td>
</tr>
<tr>
<td>Time per campaign</td>
<td>2-4 hours</td>
<td>8-15 minutes</td>
</tr>
<tr>
<td>Asset organization</td>
<td>Manual file management</td>
<td>Auto-organized in Higgsfield project folder</td>
</tr>
<tr>
<td>Iteration speed</td>
<td>Re-brief the failing tool</td>
<td>Ask Claude to regenerate specific asset</td>
</tr>
<tr>
<td>Cost (operator time)</td>
<td>High</td>
<td>Low</td>
</tr>
</table>
The mechanism: the MCP integration gives Claude direct API access to Higgsfield. No human in the export/import loop. Brand assets locked server-side.
---
## ⚙️ The Kill-or-Scale Matrix (Hour 24)
Deploy the campaign assets to their channels. Run the matrix at hour 24 inside Claude (Claude can query Higgsfield's virality_predictor + your ad platform data).
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
<tr>
<td>Virality_predictor score</td>
<td><30</td>
<td>30-60</td>
<td>60+</td>
</tr>
</table>
### The Matrix Prompt:
```javascript
Run the kill-or-scale matrix on the campaign
assets deployed in the last 24 hours.

Call virality_predictor on each asset to score
creative quality. Pull ad performance data from
[META MCP / manual paste].

For each asset return:
1. Decision: KILL / HOLD / SCALE
2. Reason (cite threshold breach + virality
   score)
3. If SCALE: which asset type is winning (hero
   / social / video / transition), which
   character archetype, which hook angle
4. If KILL: which Higgsfield generation
   parameters to adjust for the replacement

Pattern recognition: weight the next campaign
toward the winning patterns. Auto-update
project memory with confirmed winners.

No hedging. Decisive calls.
```
---
## ⚙️ The Integration Playbook
The Higgsfield MCP + Claude system is the **end-to-end campaign execution layer**. Use it for the full campaign in 1 chat.
### Recommended weekly rotation:
→ 50% Claude + Higgsfield MCP full campaigns (this system — primary execution)<br>→ 25% Standalone Higgsfield generations (when you need just 1 asset, not a full campaign)<br>→ 15% Maxfusion storyboard one-shot (cinematic ritual ads)<br>→ 10% Specialty formats (FPV tracking shots, pitch deck cinematics)
Why this split: the MCP integration shines for full-campaign output. For single-asset needs, the Higgsfield UI alone is faster. For specialty formats requiring storyboards or visual path overlays, use the dedicated systems.
### Weekly cadence:
<table header-row="true">
<tr>
<td>Day</td>
<td>Action</td>
</tr>
<tr>
<td>Monday 9am</td>
<td>Brief 2 campaigns in Claude (2 different products or angles)</td>
</tr>
<tr>
<td>Monday 9:15am</td>
<td>Claude routes both campaigns through Higgsfield MCP</td>
</tr>
<tr>
<td>Monday 9:45am</td>
<td>Review outputs, run 5-point QC, regenerate any failures</td>
</tr>
<tr>
<td>Monday 10am</td>
<td>Deploy all assets to Meta + YouTube + TikTok</td>
</tr>
<tr>
<td>Tuesday 9am</td>
<td>Hour-24 matrix on Monday batch</td>
</tr>
<tr>
<td>Tuesday 10am</td>
<td>Scale winners, kill losers, brief 2 replacement campaigns</td>
</tr>
<tr>
<td>Wednesday 9am</td>
<td>New batch — different verticals</td>
</tr>
<tr>
<td>Friday 9am</td>
<td>Weekly campaign recap + project memory update</td>
</tr>
</table>
Output: 4-6 full campaigns shipped per week. Each campaign = hero + 3 social + 1 video + 2 transitions = 7 assets. 28-42 assets per week.
---
## ⚙️ What NOT to Do
→ Don't run campaigns without setting up Higgsfield Working Memory. Without locked character + product refs, every generation drifts.
→ Don't paste your Higgsfield API key into chat logs or public prompts. Store it only in the Claude Desktop config with restricted permissions.
→ Don't skip the QC step. Claude flags inconsistencies inline — review them before shipping.
→ Don't try to brief Claude to do things outside the MCP toolset. Claude can only call tools Higgsfield exposes via MCP. Stick to generate_image, generate_video, reframe, upscale_video, virality_predictor, and the show_* tools.
→ Don't run multiple brands in 1 Claude Project. Each brand needs its own project with its own locked references.
→ Don't update brand references mid-campaign. Lock them before briefing. Update between campaigns.
→ Don't expect every output to pass QC on the first try. 80-90% hit rate is normal. Budget 1-2 regenerates per campaign.
→ Don't use this for storyboard cinematics. The MCP integration is for direct generation. Storyboards need the dedicated storyboard one-shot system.
→ Don't deploy without aspect ratio verification. The reframe tool delivers extras — verify all required ratios are present.
→ Don't ignore the virality_predictor score. It's a real signal from Higgsfield's training data. Use it to triage which assets to scale.
→ Don't expect Higgsfield MCP to write copy. It generates visuals. Pair with Claude's writing for ad copy + captions in the same chat.
---
## ⚙️ Troubleshooting
<table header-row="true">
<tr>
<td>Problem</td>
<td>Fix</td>
</tr>
<tr>
<td>MCP connection fails on startup</td>
<td>Verify API key in claude_desktop_config.json. Restart Claude Desktop. Check Higgsfield account status.</td>
</tr>
<tr>
<td>Tools don't appear in /mcp list</td>
<td>Config file syntax error. Validate JSON. Restart Claude Desktop.</td>
</tr>
<tr>
<td>Character drifts across generations</td>
<td>Higgsfield character lock weak. Re-upload character ref at higher resolution. Lock identity strength to 0.9+ in every call.</td>
</tr>
<tr>
<td>Product loses identity</td>
<td>Product reference fidelity too low. Re-upload product image. Specify exact label position + grip orientation in the prompt.</td>
</tr>
<tr>
<td>Palette drifts between outputs</td>
<td>Brand presets not configured in Higgsfield. Set up presets_show with locked palette before running campaigns.</td>
</tr>
<tr>
<td>Video generation times out</td>
<td>Reduce parallel generations. Run video assets sequentially after static assets complete.</td>
</tr>
<tr>
<td>Costs add up faster than expected</td>
<td>Higgsfield generations cost credits. Budget 7-10 assets per campaign max. Use virality_predictor before upscale_video to skip upscaling weak assets.</td>
</tr>
<tr>
<td>Claude calls wrong Higgsfield tool</td>
<td>System prompt unclear. Reinforce: "For static = generate_image, for video = generate_video, for aspect adaptation = reframe, for quality upgrade = upscale_video."</td>
</tr>
<tr>
<td>Output assets don't appear in project folder</td>
<td>Higgsfield project structure not set up. Initialize a project in Higgsfield UI first, then reference it in Claude calls.</td>
</tr>
<tr>
<td>Brand voice misses in captions</td>
<td>Project memory missing voice samples. Add 3-5 paragraphs of published brand copy.</td>
</tr>
<tr>
<td>Operator wants more control over individual generations</td>
<td>Move to standalone Higgsfield UI for that specific asset. Use Claude + MCP for full-campaign runs.</td>
</tr>
</table>
---
## ⚙️ The Daily Production Cadence
This is the routine that ships 1-2 full campaigns per morning.
<table header-row="true">
<tr>
<td>Time</td>
<td>Task</td>
<td>Output</td>
</tr>
<tr>
<td>9:00-9:05</td>
<td>Open Claude project, paste campaign brief</td>
<td>Brief ready</td>
</tr>
<tr>
<td>9:05-9:15</td>
<td>Claude routes work to Higgsfield, generates static assets</td>
<td>Hero + social posts</td>
</tr>
<tr>
<td>9:15-9:25</td>
<td>Claude generates video assets + transitions</td>
<td>Video + transitions</td>
</tr>
<tr>
<td>9:25-9:30</td>
<td>Claude runs virality_predictor on hero ad</td>
<td>Score returned</td>
</tr>
<tr>
<td>9:30-9:35</td>
<td>5-point QC check, regenerate any failures</td>
<td>Approved assets</td>
</tr>
<tr>
<td>9:35-9:45</td>
<td>Reframe + upscale calls for additional formats</td>
<td>All aspect ratios</td>
</tr>
<tr>
<td>9:45-9:50</td>
<td>Verify all outputs in Higgsfield project folder</td>
<td>Campaign ready</td>
</tr>
<tr>
<td>9:50-10:00</td>
<td>Deploy to channels</td>
<td>Live</td>
</tr>
<tr>
<td>Next morning 9am</td>
<td>Hour-24 matrix inside Claude</td>
<td>Top winners scaled</td>
</tr>
</table>
Repeat for 1-2 campaigns per morning. 5-10 full campaigns per week.
---
## 🎯 Closer
**Install the Higgsfield MCP server. Add it to your Claude Desktop config. Drop in your API key. Restart Claude. Create a Project named "[Brand] Campaign Orchestrator." Paste the master orchestration system prompt. Upload character + product references to Higgsfield Working Memory. Brief your first campaign. Watch Claude route the work to Higgsfield. In 8-15 minutes you'll have a full campaign — hero ad + social posts + video + transitions — in your Higgsfield project folder. Deploy. By end of week 1 you'll have shipped 5-10 full campaigns from 1 chat. By end of month 1 you'll have replaced the 5-tool tab-switching cycle with a single Claude conversation.**
The tab-switching cycle was the bottleneck.
Higgsfield MCP + Claude is what fixes it.
---
**The Higgsfield MCP installation + Claude project orchestration scaffolding + 4 asset orchestration prompts + 6 vertical templates + brand asset lock mechanism is the full system. Bookmark this guide. Run it daily.**
---
