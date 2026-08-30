---
title: "The Claude + Higgsfield Creative Agency System"
page_id: 35992e2e92e9810e887ad6b5b1150b3a
layer: strategy
source: https://freebie-for-you.notion.site/35992e2e92e9810e887ad6b5b1150b3a
---
## 🎯 What You're Getting
A complete agent system that turns Claude + Higgsfield into a creative agency that runs without you.
1 prompt → full brand (research, products, photos, ads, UGC). 200 ads/week generated on autopilot. 6X ROAS in 30 days.
You don't write hooks. You don't sit at the prompt console. You don't manage the production pipeline.
You set up the agent, drop in expertise, build skills, schedule routines — and then the system runs while you sleep.
By the end of this guide, you'll have:
→ The Higgsfield CLI + Claude Code setup walkthrough<br>→ The deep research prompt that builds your subject matter expertise file<br>→ The 1-prompt brand generation prompts (6 verticals)<br>→ 5 ready-to-install skill recipes (.claude/skills)<br>→ 5 routine templates (Sunday + Monday + Thursday autopilot)<br>→ The Generation Tracker setup (Google Sheets via GWS CLI)<br>→ The kill-or-scale matrix prompt<br>→ The reference-lock workflow that fixes AI slot-machine drift<br>→ The weekly cadence that scales from 50 to 200 ads/week
This replaces the entire $5K-$15K/month creative agency retainer most DTC brands run.
---
## ⚙️ The Stack
<table header-row="true">
<tr>
<td>Layer</td>
<td>Tool</td>
<td>Job</td>
</tr>
<tr>
<td>Model layer</td>
<td>Higgsfield (Nano Banana 2, GPT Image 2, Marketing Studio, Veo, Kling, Seedance)</td>
<td>Generates the actual images and videos</td>
</tr>
<tr>
<td>Agent layer</td>
<td>Claude Code CLI + Higgsfield CLI</td>
<td>Orchestrates ideation, prompting, generation, tracking</td>
</tr>
<tr>
<td>Expertise layer</td>
<td>Markdown research docs in your project</td>
<td>Brings real operator knowledge to the agent</td>
</tr>
<tr>
<td>Recipe layer</td>
<td>Skills in .claude/skills/</td>
<td>Locks the prompts that produced your best outputs</td>
</tr>
<tr>
<td>Schedule layer</td>
<td>Claude routines</td>
<td>Fires the agent on a schedule (Sunday + Monday autopilot)</td>
</tr>
<tr>
<td>Tracker layer</td>
<td>Google Sheet + GWS CLI</td>
<td>Single source of truth for every generation</td>
</tr>
</table>
The agent is a wrapper. The expertise is the engine. The skills are the recipes. The routines are the scheduler.
---
## ⚙️ The Workflow Math
A creative agency at $5K-$15K/month delivers 30-50 ads per month. That's \\~$200/ad in retainer cost. You wait 2-3 weeks per round. You manage briefs, revisions, and creator coordination.
This system delivers 200 ads/week at $0.50-$2.00 per ad in API + Higgsfield costs. That's \\~$50/week in production cost. Total monthly: \\~$200 vs. $5K-$15K retainer.
The leverage shift: you stop buying agency hours. You start running an agent stack. The bottleneck moves from creator availability to deciding which winners to scale (which the kill-or-scale matrix below fixes).
---
## Step 1 — Connect Higgsfield to Claude via CLI
The CLI is the operator path. MCP loads every tool into context (burns tokens). The CLI is leaner and built for serious agent work.
### Install Claude Code (if you don't have it):
```bash
npm install -g @anthropic-ai/claude-code
```
### Install Higgsfield CLI:
```bash
claude mcp add higgsfield-cli \\\\
  --transport http \\\\
  --url <https://api.higgsfield.ai/cli>
```
Authenticate via the browser prompt. Verify with `claude mcp list`.
### Install the Higgsfield agent skills:
```bash
claude skills install higgsfield/marketing-studio
claude skills install higgsfield/ad-reference
claude skills install higgsfield/hooks
```
These give Claude direct knowledge of how to call each Higgsfield mode.
### Verify the agent works:
```bash
claude "Test the Higgsfield CLI: generate 1 product
photo of a matte black wireless earbud on a clean
beige background. Save it to ./test-output/."
```
If Claude returns a path to the generated image, you're live.
### Why CLI > MCP for serious work:
→ MCP loads every tool description into context every turn (burns tokens)<br>→ CLI is a lean executable Claude calls only when needed<br>→ Skills layer on top of CLI for repeatable recipes<br>→ Routines schedule CLI calls on cron
For a 1-off generation, MCP is fine. For a system that runs 200 ads/week, CLI is the only path that scales.
---
## Step 2 — Build the Subject Matter Expertise Library
The agent is only as good as the knowledge you put in it. Don't expect Claude to know your space. Bring the expertise to it.
### The deep research prompt:
```javascript
You are a senior research analyst. Build me a
600-line markdown reference doc on the best
strategies for organic and paid advertising in
[CURRENT YEAR + MONTH].

Focus areas:
- What captures attention on TikTok, Meta, Instagram
  Reels, X, and YouTube Shorts in [CURRENT YEAR]
- What converts (hook patterns, format choices,
  pacing, CTA structures)
- How attention mechanics differ per platform
- The 10 highest-performing ad formats by category
  (DTC consumer, SaaS, fashion, food/bev, fitness)
- The 20 hook formulas that compound
- Common failure modes and how to spot them
- Platform-specific algorithm signals to optimize for

Format the output as advertising-masterclass.md with:
- Cheat sheet at the top (1-page quick reference)
- Platform-by-platform breakdown
- Attention frameworks
- Hook patterns
- CTA structures
- Format pairings by funnel stage

Last updated: [CURRENT MONTH AND YEAR]
```
Save the output as `advertising-masterclass.md` in your Claude Code project root.
### 5 expertise documents to drop into your project:
```javascript
/your-project/
  /knowledge/
    advertising-masterclass.md       ← from prompt above
    copywriting-frameworks.md        ← run a separate research prompt
    brand-building-playbook.md       ← deep research on positioning
    hook-patterns-2026.md           ← 50 proven hooks across verticals
    creative-iteration-protocol.md   ← kill-or-scale + variation logic
```
For each, run a deep research prompt asking for a 400-600 line markdown doc. Save outputs in /knowledge/.
### Reference docs in every prompt:
When you ask the agent for ideation, tag the relevant doc with @:
```javascript
Generate 30 hook variations for [BRAND].
Reference @knowledge/hook-patterns-2026.md
+ @knowledge/advertising-masterclass.md.
ICP: [DESCRIPTOR].
Brand voice: [VOICE TEMPLATE].
```
The agent reads them on every run. Output quality compounds with the expertise depth.
### Other expertise sources to package as markdown:
→ Twitter threads from operators who run real ad spend<br>→ YouTube transcripts from copywriters and growth marketers<br>→ Perplexity deep research outputs on niche topics<br>→ Internal SOPs and brand voice docs you already trust<br>→ Customer research notes (reviews, support tickets, persona docs)
Drop them all into /knowledge/. Reference them in prompts. The agent gets sharper every time you add 1.
---
## Step 3 — Build Your Brand Project (1-Prompt Brand Kit)
This is the demo prompt that turns 1 instruction into a full brand. The structure works because it gives Claude all the context it needs to generate research + identity + product + assets in 1 pass.
### The 1-prompt brand generation master template:
```javascript
Build me a [PRODUCT CATEGORY] brand from scratch.

Step 1 — Research:
Reference @knowledge/advertising-masterclass.md and
@knowledge/brand-building-playbook.md.
Identify the top 3 unmet needs in [CATEGORY] for
[ICP DESCRIPTOR]. Pick the strongest one as our
positioning anchor.

Step 2 — Brand identity:
Generate brand name, positioning statement, target
buyer profile, brand voice, visual identity
(palette, typography, mood).

Step 3 — Product catalog:
Build a 3-product catalog. For each: name, price,
positioning, key benefit, hero use case.

Step 4 — Asset generation:
For each product, generate via Higgsfield CLI:
- 1 product photo (Nano Banana 2, premium minimalist
  studio aesthetic)
- 1 Instagram ad static (GPT Image 2, square 1:1,
  with on-screen text overlay)
- 1 UGC video (Marketing Studio, hyper-motion mode,
  15 seconds, with AI persona)

Step 5 — Output:
Save all assets to ./output/[BRAND-NAME]/. Log every
generation to the Generation Tracker.

Constraints:
- Lock the brand voice across every output
- Use the same AI persona across all 3 UGC videos
- Reference the locked brand identity in every prompt
- Strip generic adjectives from copy
```
### 6 vertical-specific 1-prompt brand prompts:
**Skincare brand:**
```javascript
Build me a skincare brand from scratch using the
master 1-prompt structure.

Category: skincare (vitamin C serum + moisturizer
+ eye cream).
ICP: women 28-45, skincare-curious, premium-curious,
$40-$80 price point.
Brand voice: premium minimalist.
Visual identity: cream + taupe + gold accents,
soft natural light, marble accents.
AI persona: editorial millennial woman or mature
lifestyle woman.
Reference: @knowledge/advertising-masterclass.md
+ @knowledge/brand-building-playbook.md.
```
**Supplements brand:**
```javascript
Build me a supplements brand from scratch.

Category: daily greens powder + collagen + sleep
formula.
ICP: health-curious 30-50, willing to spend
$40-$120/mo on stack.
Brand voice: calm educational.
Visual identity: earth tones, warm afternoon light,
natural textures.
AI persona: boho lifestyle female or editorial
mature woman.
Reference: @knowledge/advertising-masterclass.md
+ @knowledge/brand-building-playbook.md.
```
**Fitness brand:**
```javascript
Build me an athletic apparel brand from scratch.

Category: training shorts + sports bras + tech tees.
ICP: 22-40, gym-going, willing to spend $60-$200
per piece.
Brand voice: edgy contrarian.
Visual identity: monochrome with 1 bold accent
color, hard directional light, urban gym aesthetic.
AI persona: athletic male operator.
Reference: @knowledge/advertising-masterclass.md
+ @knowledge/brand-building-playbook.md.
```
**Fashion brand:**
```javascript
Build me a fashion brand from scratch.

Category: tailored linen blazer + wide-leg trousers
+ silk button-up.
ICP: 25-45, premium-curious, follows GRWM, willing
to spend $80-$300 per piece.
Brand voice: premium minimalist.
Visual identity: cream + ivory + camel, golden hour
light, marble accents, GRWM-style framing.
AI persona: polished millennial woman.
Reference: @knowledge/advertising-masterclass.md
+ @knowledge/brand-building-playbook.md.
```
**Food/Beverage brand:**
```javascript
Build me a food/beverage brand from scratch.

Category: matcha-based energy drink (12-pack)
+ functional shots + ready-to-drink coffee.
ICP: 25-45, foodie or wellness-leaning, discover
via TikTok.
Brand voice: casual operator.
Visual identity: pastel green + cream + black,
bright fresh aesthetic, kitchen-counter native.
AI persona: casual Gen-Z female or boho lifestyle.
Reference: @knowledge/advertising-masterclass.md
+ @knowledge/brand-building-playbook.md.
```
**SaaS brand:**
```javascript
Build me a SaaS brand from scratch.

Category: AI sales assistant + AI hook generator
+ AI ad reporter (3 features sold as 1 platform).
ICP: operators or founders 28-50, $5K-$50K/mo
business spend.
Brand voice: founder-led.
Visual identity: monochrome with 1 brand accent,
clean minimal interface, founder POV imagery.
AI persona: founder-energy male.
Reference: @knowledge/advertising-masterclass.md
+ @knowledge/brand-building-playbook.md.
```
---
## Step 4 — Build Skills (Reusable Recipes)
A skill is a saved prompt recipe that lives in `.claude/skills/`. When you ask for that type of output, the agent runs the saved recipe.
This is the difference between a 1-off generation and a system. Recipes make pancakes that come out the same every time.
### How to build a skill:
1. Find your single best generation in any batch
2. Copy the exact prompt that produced it
3. Tell Claude: "Turn this into a skill in `.claude/skills/[NAME]/`"
4. Claude creates the skill folder + [skill.md](http://skill.md/) file
5. Future requests of that type run the recipe
### 5 ready-to-install skill recipes:
**Skill 1 — Hyper-Motion Ad:**
```javascript
.claude/skills/hyper-motion-ad/skill.md

NAME: Hyper-motion ad
TRIGGER: "Generate a hyper-motion ad for [PRODUCT]"

PROMPT TEMPLATE:
Use Higgsfield Marketing Studio in hyper-motion mode.
Input: [PRODUCT IMAGE]
Avatar: [LOCKED AI PERSONA]
Format: 15-second vertical 9:16
Style: hyper-motion (fast cuts, zooms, tight detail
shots, motion that holds attention for the full clip)
Audio: brand sound or trending track
Pacing: 4-5 cuts per 15 seconds, last hold 3 seconds
on hero product

Constraints: maintain locked brand identity, sharp
detail on product label, no AI smoothing on persona
face, natural hand movement.
```
**Skill 2 — Product Photo (Premium Minimalist):**
```javascript
.claude/skills/product-photo-premium/skill.md

NAME: Premium minimalist product photo
TRIGGER: "Generate a premium product photo of [PRODUCT]"

PROMPT TEMPLATE:
Use Higgsfield with Nano Banana 2.
Input: [PRODUCT REFERENCE IMAGE]
Setting: clean studio, soft beige or marble surface
Lighting: golden hour soft natural light from window
Composition: product centered, hero crop, slight
shadow detail
Style: premium minimalist, editorial, magazine-grade
Constraints: product must match reference exactly,
no label drift, sharp focus on materials
```
**Skill 3 — UGC Video (Casual Talking Head):**
```javascript
.claude/skills/ugc-talking-head/skill.md

NAME: Casual UGC talking head
TRIGGER: "Generate a UGC talking head ad for [PRODUCT]"

PROMPT TEMPLATE:
Use Higgsfield Marketing Studio.
Avatar: [LOCKED AI PERSONA] (face, voice, wardrobe)
Setting: bedroom or kitchen, natural light
Format: 30-second vertical 9:16
Script: pasted from Claude ideation
Pacing: handheld selfie angle, conversational
Audio: persona voice clone

Constraints: maintain face consistency across cuts,
natural hand movement holding product, screen text
must remain legible if shown.
```
**Skill 4 — Instagram Ad Static:**
```javascript
.claude/skills/instagram-ad-static/skill.md

NAME: Instagram ad static
TRIGGER: "Generate an Instagram static ad for [PRODUCT]"

PROMPT TEMPLATE:
Use Higgsfield with GPT Image 2.
Input: [PRODUCT REFERENCE IMAGE]
Format: 1:1 square, 1080×1080
Composition: product on left or right third, headline
text on opposite third, bottom CTA button
Headline: [PASTE FROM IDEATION]
Style: brand voice [LOCKED VOICE], on-brand palette
Typography: clean sans-serif, hierarchy clear

Constraints: product matches reference, text remains
legible at thumbnail size, brand colors locked.
```
**Skill 5 — Brand Identity Kit:**
```javascript
.claude/skills/brand-identity-kit/skill.md

NAME: Brand identity kit
TRIGGER: "Generate the brand identity kit for [BRAND]"

PROMPT TEMPLATE:
Reference @knowledge/brand-building-playbook.md.

Generate:
1. Brand name (3 options, pick the strongest)
2. Positioning statement (1 sentence)
3. Target buyer profile (3 paragraphs: demographic,
   psychographic, buying triggers)
4. Brand voice (5 voice rules, 5 banned phrases)
5. Visual identity (palette, typography, mood
   reference, logo direction)
6. Hero product names (3 options each)

Output as brand-identity.md in the project root.
```
---
## Step 5 — Set Up the Generation Tracker
This is where the agent stops being a toy and becomes a system. Without a tracker, you lose track of what you generated 3 days ago.
### The Generation Tracker setup prompt:
```javascript
Set up my Generation Tracker in Google Sheets using
the GWS CLI.

Pull every generation from my Higgsfield account
(last 90 days). Log each one with:
- Date
- Product
- Style (hyper-motion, UGC, static, etc.)
- Type (image / video)
- Model used (Nano Banana 2, Seedance, etc.)
- Prompt (full text)
- Status (pending / complete / killed / scaled)
- Result URL
- Performance notes (filled in after testing)

Add a second tab called Creative Slate where Claude
can write new generation ideas with a Status column
(blank means not generated yet).

Every Monday morning, the agent reads the Creative
Slate tab and generates the top 30 priority rows.
```
### The single source of truth principle:
→ Every generation logs to the tracker<br>→ Every win/kill decision logs to the tracker<br>→ Every variation idea logs to the Creative Slate<br>→ The agent reads from the tracker on every run
You stop losing track. You start seeing patterns. You can layer ad spend data later.
### The Creative Slate ideation prompt:
```javascript
Read my Generation Tracker (last 30 days) and my
@knowledge/advertising-masterclass.md.

Identify:
1. The 3 patterns that performed best (by status =
   scaled or notes = winning)
2. The 3 patterns that failed (status = killed)
3. The 5 angle gaps I'm not testing yet

Then write 50 new generation ideas to the Creative
Slate tab. For each:
- Product
- Style
- Type
- Hook line (under 12 words)
- Angle category
- Funnel stage
- Status: blank
```
50 fresh ideas every week. The agent stays ahead of creative fatigue.
---
## Step 6 — Build Routines (Scheduled Prompts)
Routines are scheduled prompts that fire on a cron. Once your agent system works, you put the loop on autopilot.
### Sunday night routine (analyze + ideate):
```javascript
Schedule: Every Sunday 10pm

1. Read the Generation Tracker (last 7 days)
2. Pull performance data from Meta and TikTok ad
   accounts
3. Mark each generation as scaled, killed, or holding
4. Identify the top 3 winning patterns and bottom 3
   losing patterns
5. Run the Creative Slate ideation prompt
6. Write 50 new generation ideas to the Creative Slate
   tab
7. Email me a 1-paragraph summary of the week
```
### Monday morning routine (generate):
```javascript
Schedule: Every Monday 6am

1. Read the Creative Slate tab
2. Pick 30 rows with status = blank
3. For each row, generate the prompt and send to
   Higgsfield CLI
4. Mark each row as complete when the result lands
5. Save asset URLs to the Generation Tracker
6. Email me a list of 30 new assets ready to review
   by 9am
```
### Thursday refresh routine:
```javascript
Schedule: Every Thursday 6am

1. Read the Generation Tracker (last 3 days)
2. Identify any new winners (high CTR or save rate)
3. Generate 10 variations of each winner using the
   matching skill
4. Add to the tracker with status = pending
5. Email me the variations to review
```
### Friday roundup routine:
```javascript
Schedule: Every Friday 4pm

1. Compile this week's tracker activity
2. Calculate: ads generated, ads tested, ads killed,
   ads scaled
3. Identify the 1 winning pattern of the week
4. Write next Monday's priority list
5. Email me the weekly roundup
```
### Quarterly refresh routine:
```javascript
Schedule: First Monday of every quarter

1. Re-run the deep research prompt for
   advertising-masterclass.md
2. Update the file with the latest 2026 trends
3. Re-train any drift in the brand voice
4. Audit the skills in .claude/skills/ for
   relevance
5. Archive old skills, sharpen current skills
```
---
## Step 7 — The Reference-Lock Workflow (Fixing Slot-Machine Drift)
The first batch of any generation will drift. The bottle won't match. The text will be off. The persona will look different.
This is the AI slot machine. The fix is reference-locking.
### The reference-lock prompt:
```javascript
Reference image: [PASTE EXACT PRODUCT IMAGE URL]

Lock these elements verbatim across every variation:
- Product appearance (must match @ProductImage)
- Brand voice (must match @brand-identity.md)
- AI persona (must match @persona-profile.md)
- Logo placement (must match brand spec)

If any output drifts from the reference, regenerate
that single output. Do not let drift compound.

Generate the 5 variations now.
```
### When to regenerate vs. accept:
→ Product looks slightly different → regenerate<br>→ Persona face shifts → regenerate<br>→ Brand colors off by 1 shade → accept (close enough)<br>→ Headline copy different → accept (variation is the point)
The reference is sacred. The headline is variable. Lock the first; vary the second.
---
## The Kill-or-Scale Matrix
After deploying 20 ads from the agent's weekly batch in Meta at $30/day each, run the matrix at hour 24.
### Thresholds:
<table header-row="true">
<tr>
<td>Metric</td>
<td>Kill Below</td>
<td>Hold Range</td>
<td>Scale Above</td>
</tr>
<tr>
<td>Hook rate (3-sec view)</td>
<td>25%</td>
<td>25-35%</td>
<td>35%</td>
</tr>
<tr>
<td>Hold rate (15-sec watch)</td>
<td>8%</td>
<td>8-15%</td>
<td>15%</td>
</tr>
<tr>
<td>CTR</td>
<td>0.8%</td>
<td>0.8-1.5%</td>
<td>1.5%</td>
</tr>
<tr>
<td>CPA vs target</td>
<td>1.5x target</td>
<td>1.0-1.5x</td>
<td>Below target</td>
</tr>
</table>
### The matrix application prompt:
```javascript
Read the Generation Tracker. Filter to ads tested
in the last 24 hours.

For each ad return:
1. Decision: KILL / HOLD / SCALE
2. Reason (cite the specific threshold breach)
3. If SCALE: recommended next budget + which skill
   to clone variations from
4. If KILL: which surviving ad's pattern to use as
   the replacement
5. Update the Generation Tracker status column

Then write the next 10 variations of the SCALE ads
to the Creative Slate.

No hedging. Decisive calls.
```
---
## What NOT to Do
→ Don't run MCP for production agent work. CLI is leaner and built for scale.
→ Don't skip the expertise step. Generic outputs come from generic prompts. Drop in research, SOPs, and frameworks before you generate anything.
→ Don't rely on slot-machine prompts. Reference-lock the product, the persona, and the brand voice in every prompt.
→ Don't keep one-off prompts loose. Save the best ones as skills. Recipes compound.
→ Don't generate without the Generation Tracker. Without a single source of truth, you lose patterns.
→ Don't run routines without verification for the first 2 weeks. Watch the agent generate. Catch drift early. Then trust the system.
→ Don't paste your agency retainer into ad spend. Cut the retainer. Reinvest into testing volume.
→ Don't ignore the Sunday/Monday cadence. The system compounds with consistent runs. Skipping a week kills momentum.
→ Don't expect the agent to magic itself into a senior copywriter. The expertise file is the engine. Update it quarterly.
→ Don't wire the system to auto-post until you've manually verified 4 weeks of output quality.
---
## Troubleshooting
<table header-row="true">
<tr>
<td>Problem</td>
<td>Fix</td>
</tr>
<tr>
<td>Outputs feel generic</td>
<td>Expertise files missing or outdated. Re-run the deep research prompt.</td>
</tr>
<tr>
<td>Product drifts across variations</td>
<td>Reference image not pinned. Use the reference-lock prompt verbatim.</td>
</tr>
<tr>
<td>Persona face shifts mid-batch</td>
<td>Lock @persona-profile.md in every prompt. Re-run drifted outputs.</td>
</tr>
<tr>
<td>Routines don't fire on schedule</td>
<td>Check Claude routines tab. Verify cron and timezone.</td>
</tr>
<tr>
<td>Generation Tracker rows not updating</td>
<td>GWS CLI auth expired. Re-authenticate Google Workspace.</td>
</tr>
<tr>
<td>Skills produce inconsistent results</td>
<td>Skill file too vague. Add specific constraints (lighting, framing, pacing).</td>
</tr>
<tr>
<td>Hyper-motion mode produces flat output</td>
<td>Marketing Studio mode not specified. Set mode = hyper-motion explicitly.</td>
</tr>
<tr>
<td>Brand voice drifts across batch</td>
<td>[brand-identity.md](http://brand-identity.md/) not referenced. Tag with @ in every prompt.</td>
</tr>
<tr>
<td>Agent regenerates same idea repeatedly</td>
<td>Creative Slate not deduping. Add: "Filter against last 30 days of tracker before ideating."</td>
</tr>
<tr>
<td>Performance data not flowing</td>
<td>Meta/TikTok MCP not connected to the agent. Add the platform connectors.</td>
</tr>
</table>
---
## The Weekly Cadence
<table header-row="true">
<tr>
<td>Day</td>
<td>Routine</td>
<td>Output</td>
</tr>
<tr>
<td>Sunday 10pm</td>
<td>Analyze + ideate routine</td>
<td>50 new generation ideas in Creative Slate</td>
</tr>
<tr>
<td>Monday 6am</td>
<td>Generate routine</td>
<td>30 fresh assets ready by 9am</td>
</tr>
<tr>
<td>Monday 9am</td>
<td>Manual review + deploy 20 to Meta</td>
<td>20 ads live</td>
</tr>
<tr>
<td>Tuesday</td>
<td>Matrix runs at hour 24</td>
<td>Kill 11, hold 9</td>
</tr>
<tr>
<td>Wednesday</td>
<td>Auto-replace killed ads</td>
<td>11 fresh ads deployed</td>
</tr>
<tr>
<td>Thursday 6am</td>
<td>Refresh routine</td>
<td>10 variations of winners generated</td>
</tr>
<tr>
<td>Thursday</td>
<td>Second matrix read</td>
<td>Top 2 winners scaled to $200/day</td>
</tr>
<tr>
<td>Friday 4pm</td>
<td>Roundup routine</td>
<td>Weekly summary email</td>
</tr>
</table>
By week 4: 200 ads tested per week, 5-10 winners, $5K-$15K/month savings vs agency retainer.
By month 3: the system runs with 30-60 minutes of operator input per week. Routines do the rest.
---
## 🎯 Closer
**Install Claude Code. Add the Higgsfield CLI. Run the deep research prompt and save **[**advertising-masterclass.md**](http://advertising-masterclass.md/)**. Run the 1-prompt brand generation for your top brand. Save the best 3 generations as skills in .claude/skills/. Set up the Generation Tracker in Google Sheets. Schedule the Sunday + Monday routines. By next Tuesday you'll have 30 ads ready. By the end of the month you'll have replaced your $5K-$15K creative agency retainer with a system that compounds.**
The agency retainer was the bottleneck.
The agent + the expertise + the skills + the routines is the system that fixes it.
System > Spend.
---
