---
title: "The Multi-Style Animated Ad System"
page_id: 3a692e2e92e980c09dc0e852d32989c2
layer: production
source: https://freebie-for-you.notion.site/3a692e2e92e980c09dc0e852d32989c2
---
# The Multi-Style Animated Ad System: How to Reverse-Engineer Any Animated Ad Aesthetic From 1 Reference Image and Ship Stop-Motion / Vox / Origami / Paper-Collage Ads in 15 Minutes Using Claude + [Pletor.ai](http://pletor.ai/) + Nanobanana 2 + Seedance 2.0
---
## 🎯 What You're Getting
The Claude skill that reverse-engineers any animated ad style from a single reference image. Paste a Grüns testimonial ad, an AG1 stop-motion, a Chamberlain Coffee vox illustration, a Liquid Death origami cutout — Claude breaks the visual language into an editable spec, generates on-brand stills with Nanobanana 2, and animates them into stop-motion with Seedance 2.0. All inside Claude via the [Pletor.ai](http://pletor.ai/) connector. No model juggling.
Original workflow by Raph Guilhem (@raph_guilhem). Adapted for DTC brand production.
The 3-stage workflow: Style Reverse-Engineering (paste reference, get editable spec) → Nanobanana 2 Still Generation (specs become approved stills) → Seedance 2.0 Stop-Motion Animation (approved stills become finished ads). The approval gates that prevent expensive video re-renders. The [Pletor.ai](http://pletor.ai/) MCP setup that makes everything run inside Claude.
You stop trying to reverse-engineer the trending animated ad aesthetics manually. You stop hiring specialized animators for stop-motion, vox illustration, or origami styles. You stop guessing which model to use for which style. You paste a reference image. Claude does the rest. Your only job is taste.
By the end of this guide, you'll have:
→ The Claude skill + [Pletor.ai](http://pletor.ai/) connector setup<br>→ The style reverse-engineering prompt (turns any reference into editable spec)<br>→ The Nanobanana 2 still generation prompt library<br>→ The Seedance 2.0 stop-motion animation protocol<br>→ 6 DTC vertical adaptations (testimonial / explainer / ingredient / positioning / wisdom / community)<br>→ The approval-gates workflow (metaphor → still → video)<br>→ The multi-style prompt library (Stop Motion / Vox / Origami / Paper-Collage / Testimonial / Editorial)<br>→ The distribution playbook
If you're already running the Paper-Collage Explainer System, this Multi-Style System is the **style-agnostic upgrade** — the paper-collage system is locked to ONE aesthetic. This one replicates ANY aesthetic from any reference image.
---
## ⚙️ Credit
**Original workflow + Claude skill design**: Raph Guilhem (@raph_guilhem)
**Tool stack**: Claude Code + [Pletor.ai](http://pletor.ai/) MCP connector + Nanobanana 2 (image gen) + Seedance 2.0 (video render)
**Get **[**Pletor.ai**](http://pletor.ai/): [pletor.ai](http://pletor.ai/)
---
## ⚙️ The Hidden Mechanism — Why Reference Replication Beats Style Description
Every standard AI animated ad workflow has the same failure mode:
1. Operator sees a trending ad style (Grüns testimonial, AG1 stop-motion, etc.)
2. Operator writes a text prompt trying to describe the style
3. AI model produces a generic approximation
4. Result doesn't match the reference
5. Operator iterates for hours guessing at style keywords
Text description is fundamentally lossy. "Warm minimalist testimonial ad with soft shadows" describes 100 different visual outputs. The AI model has to guess which one.
The fix is structural: reference images are lossless. When you paste a visual reference, the model has EXACT visual DNA to replicate: composition, palette, texture, camera framing, animation style, typography, lighting, spacing, texture.
Reference-driven style replication:<br>→ Composition matches (subject placement, negative space)<br>→ Palette matches (exact colors, not "warm neutrals")<br>→ Texture matches (fabric grain, paper fiber, cardboard cut)<br>→ Camera framing matches (angle, distance, crop)<br>→ Typography matches (serif choice, size, letter spacing)<br>→ Animation style matches (snap-in timing, drift, cut-out physics)
Claude's job is to translate the reference into an editable spec so YOU can adjust for your product without losing the visual DNA.
The fix is not "better style descriptions." The fix is **reference-driven style replication with editable specs** — the thing that lets any operator produce ads in any trending aesthetic without hiring the aesthetic's specialist.
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
<td>Claude Code with Multi-Style Skill</td>
<td>Runs reverse-engineering + generation + animation</td>
</tr>
<tr>
<td>MCP connector</td>
<td>[Pletor.ai](http://pletor.ai/)</td>
<td>Connects Claude to Nanobanana 2 + Seedance 2.0 in one interface</td>
</tr>
<tr>
<td>Image generation</td>
<td>Nanobanana 2 (via [Pletor.ai](http://pletor.ai/))</td>
<td>Generates on-brand stills matching the reference style</td>
</tr>
<tr>
<td>Video render</td>
<td>Seedance 2.0 (via [Pletor.ai](http://pletor.ai/))</td>
<td>Animates approved stills into stop-motion</td>
</tr>
<tr>
<td>Deploy</td>
<td>TikTok + Instagram Reels + Meta + X</td>
<td>Multi-platform animated ad distribution</td>
</tr>
</table>
Total stack cost per finished 8-15 second animated ad: $2-$5.
---
## ⚙️ The Workflow Math
Traditional stop-motion / vox / origami animation: $5,000-$25,000 per finished 15-second ad + 2-4 weeks per ad + specialized animator.
Multi-Style Animated Ad System: 15 minutes end-to-end + $2-$5 per finished ad + 1 operator.
The leverage shift: operator capacity moves from animation direction to reference curation. You spend more time picking the right trending reference to replicate, less time managing specialized animators.
For a brand shipping 5-10 animated ads per week, this is a 99% cost reduction. For a brand shipping daily animated content, this is the difference between "impossible without a $20K/mo animator retainer" and "1 operator ships them before lunch."
---
## ⚙️ Setup Instructions (Deploy in 20 Minutes)
### Step 1 — Install Claude Code
Get Claude Code from [claude.ai/code](http://claude.ai/code). Install locally.
### Step 2 — Sign Up for [Pletor.ai](http://pletor.ai/)
Go to [pletor.ai](http://pletor.ai/). Create account. Get your API key.
### Step 3 — Configure [Pletor.ai](http://pletor.ai/) MCP in Claude Code
Add to `~/.claude/mcp-config.json`:
```json
{
  "mcpServers": {
    "pletor": {
      "command": "pletor-mcp",
      "args": [],
      "env": {
        "PLETOR_API_KEY": "your_key_here"
      }
    }
  }
}
```
### Step 4 — Save the Multi-Style Skill
Save the skill instructions (from Step 5 below) to `~/.claude/skills/multi-style-animated-ad.md`.
### Step 5 — Test With One Reference
Open Claude Code. Invoke the skill:
```bash
/multi-style-ad "reference image URL" "product description"
```
Follow the gates. Ship your first ad.
Total setup time: 20 minutes.
---
## ⚙️ Stage 1 — The Style Reverse-Engineering Prompt
Build this as a Claude Code skill. When invoked, Claude analyzes any reference image and outputs a full editable spec.
### The Skill Instructions
```javascript
Name: Style Reverse-Engineering Skill

Description: Analyzes any reference animated ad
image + outputs an editable style spec that
can be applied to any product.

System Prompt:
You are an animated ad style analyst. Given a
reference image, break down the visual language
into an editable spec.

Input:
- Reference image URL: [PASTE URL]
- Product context: [YOUR PRODUCT DESCRIPTION]

Output the editable style spec:

1. AESTHETIC CATEGORY
- Stop Motion / Vox / Origami / Paper-Collage
  / Testimonial / Editorial / Illustrated /
  Other

2. COMPOSITION
- Subject placement (left / right / center)
- Negative space ratio
- Text placement relative to subject
- Aspect ratio + crop

3. COLOR PALETTE
- Primary background (exact hex if visible)
- Secondary accent (exact hex)
- Text color
- Any tertiary colors

4. TEXTURE + MATERIAL
- Paper fiber / cardboard cut / plasticine /
  clay / digital vector / photographic
- Edge quality (soft / crisp / torn / machine-
  cut)
- Surface finish (matte / glossy / textured)

5. LIGHTING
- Direction (top-left / side / overhead / soft
  ambient)
- Quality (hard / soft / diffused)
- Shadow character (crisp / soft / no shadow)

6. TYPOGRAPHY
- Font category (serif / sans-serif / display
  / script)
- Weight (light / regular / bold / extra bold)
- Size relative to composition
- Letter spacing character

7. CAMERA FRAMING
- Distance (extreme close / close / medium /
  wide)
- Angle (eye-level / low / high)
- Motion (locked / subtle drift / active)

8. ANIMATION STYLE (if inferable)
- Stop-motion snap / continuous flow / smooth
  drift / no animation

9. ADAPTATION FOR [YOUR PRODUCT]
Suggest how to translate this style to the
product while preserving visual DNA.

Voice rules: numerals only, no em dashes,
direct spec.
```
### Running the Skill
Operator pastes reference image URL + product context. Claude outputs the full editable spec in 30-60 seconds. This spec becomes the foundation for the still generation stage.
---
## ⚙️ Stage 2 — The Nanobanana 2 Still Generation System
Take the style spec from Stage 1 and generate 3-5 on-brand stills.
### The Still Generation Prompt Template
```javascript
Generate 3-5 stills for [PRODUCT] in this exact
style:

[PASTE STYLE SPEC FROM STAGE 1]

For each still, adapt the product placement +
copy to fit the composition while preserving:
- Exact color palette
- Exact texture and material
- Exact lighting direction and quality
- Exact typography choice
- Exact camera framing

Still 1: [Product hero moment]
Still 2: [Testimonial or feature callout]
Still 3: [Category positioning]
Still 4: [Secondary hero angle]
Still 5: [CTA or brand closer]

Output: 5 still images at 4K resolution,
matching reference style DNA.
```
### The Approval Gate
Before advancing to video, review all 5 stills:
→ Does composition match the reference?<br>→ Does color palette hold?<br>→ Does texture read as intended (paper / clay / vector / photographic)?<br>→ Does typography match?<br>→ Does the product look natural in the composition?
Approve the ones that work. Discard the rest. Only approved stills advance to Stage 3.
Cost per still: \\~$0.05-$0.15.<br>Time per still: 30-60 seconds.
---
## ⚙️ Stage 3 — The Seedance 2.0 Stop-Motion Animation Protocol
Take approved stills and animate into stop-motion.
### The Animation Prompt Template
```javascript
Animate this approved still into an 8-15
second stop-motion ad.

Reference still: [ATTACH APPROVED STILL]

Animation style: [STOP-MOTION / VOX / ORIGAMI /
PAPER-COLLAGE — from Stage 1 spec]

Motion protocol:
- Frame opens empty (no subject visible)
- Elements snap in one by one with stop-motion
  timing (staggered, not continuous)
- Locked camera (no drift, no zoom, no
  cinematic sweep)
- Final scene holds at end matching the
  approved still exactly

Element assembly order:
- 0.0-1.5s: [First element snaps in]
- 1.5-3.0s: [Second element snaps in]
- 3.0-4.5s: [Third element snaps in]
- 4.5-6.0s: [Fourth element snaps in]
- 6.0-8.0s: Final scene holds

Duration: 8-15 seconds
Aspect ratio: 9:16 vertical (or match reference)
Resolution: 4K

Anti-anchors:
- No fake lettering that wasn't in the still
- No smooth continuous motion between pieces
- No camera drift or zoom
- No fade transitions (only snap-ins)

Output: Silent video ready for TTS + music
overlay.
```
### Running the Render
1. Open Claude Code, invoke the Multi-Style Skill
2. Approve the still selection
3. Skill sends to Seedance 2.0 via [Pletor.ai](http://pletor.ai/)
4. Render completes in 3-8 minutes
5. Add TTS + music in CapCut
Cost per render: $1-$3.<br>Time per render: 3-8 minutes.
---
## ⚙️ The 3-Gate Approval Protocol
Every ad passes 3 gates. Each gate costs progressively more, so cheap gates catch problems before expensive ones.
### Gate 1 — Style Spec Approval
**Cost**: $0 (text only)<br>**Check**: Does the extracted spec match the reference visually? Are all categories filled with specific detail?
### Gate 2 — Still Approval
**Cost**: $0.25-$0.75 for 5 stills<br>**Check**: Do stills replicate the reference DNA? Does composition, color, texture, typography all hold?
### Gate 3 — Video Approval
**Cost**: $1-$3 per video render<br>**Check**: Does the animation match the intended stop-motion / vox / origami style? Does the end frame match the approved still exactly?
The gates are what turn AI animation from expensive experiment into predictable production.
---
## ⚙️ 6 DTC Vertical Adaptations
Each is a complete workflow example ready to run.
### Adaptation 1 — Testimonial Ad (Grüns-Style Warm Wall)
```javascript
Reference: Grüns testimonial ad with 5-star
rating, warm cream background, black serif
typography, product photo bottom-right, natural
shadow

Style DNA:
- Warm cream background (#F5EBD9)
- Black serif typography (Freight or similar)
- Product photo naturally placed
- Soft natural window light shadows
- 5-star rating in warm amber
- Editorial minimal composition

Adapted for skincare / supplements / DTC
testimonial content.

Best for: testimonial ads, 5-star review
content, social proof
```
### Adaptation 2 — Stop-Motion Product Explainer (AG1-Style)
```javascript
Reference: AG1 stop-motion product breakdown
with green background, product front-and-center,
ingredient icons snapping in around it

Style DNA:
- Signature green background
- Product photo center
- Ingredient icons in flat illustration
- Stop-motion snap-in timing
- Locked camera

Adapted for supplement / wellness / ingredient-
forward brands.

Best for: ingredient breakdowns, formulation
reveals, benefit callouts
```
### Adaptation 3 — Vox Editorial Cutout (Chamberlain-Style)
```javascript
Reference: Chamberlain Coffee vox illustration
with playful cutout illustrations, warm pastel
palette, hand-drawn feel

Style DNA:
- Warm pastel background
- Hand-drawn illustration texture
- Cutout composition
- Playful playful spacing
- Editorial cutout aesthetic

Adapted for food / beverage / craft brands.

Best for: brand story, craft-forward positioning,
playful education
```
### Adaptation 4 — Origami Metaphor (Liquid Death-Style)
```javascript
Reference: Liquid Death origami-style animated
metaphor content

Style DNA:
- Bold dark background
- Origami paper folding aesthetic
- Sharp geometric shapes
- Contrast lighting
- Dramatic composition

Adapted for challenger brands, category-
disruption content.

Best for: category positioning, challenger
positioning, edgy DTC
```
### Adaptation 5 — Editorial Illustrated (Athletic Greens-Style)
```javascript
Reference: Editorial illustrated ad with flat
vector illustration + product photo blend

Style DNA:
- Clean editorial layout
- Vector illustration accents
- Product photo integration
- Wellness-forward palette
- Modern editorial typography

Adapted for wellness / supplement / lifestyle
brands.

Best for: educational content, wellness
positioning, evergreen brand ads
```
### Adaptation 6 — Community Story Illustrated
```javascript
Reference: Community-story ad with illustrated
customer character + product interaction

Style DNA:
- Illustrated customer character
- Warm friendly palette
- Product natural in scene
- Community-warm mood
- Testimonial or quote overlay

Adapted for community-driven brands,
subscription boxes, referral-driven brands.

Best for: community story ads, referral
campaigns, loyalty content
```
---
## ⚙️ The Multi-Style Prompt Library
Common animated ad styles + their key visual DNA anchors.
### Stop-Motion Style Anchors
```javascript
- Stop-motion snap-in timing
- Physical texture (paper / clay / plasticine)
- Crisp machine-cut edges
- Locked camera
- Playful spacing
- No cinematic drift
```
### Vox Editorial Style Anchors
```javascript
- Hand-drawn illustration texture
- Warm editorial palette
- Cutout composition
- Playful negative space
- Editorial serif typography
- Textured background
```
### Origami Style Anchors
```javascript
- Origami paper fold aesthetic
- Sharp geometric shapes
- Dramatic contrast lighting
- Bold dark or bold color background
- Angular composition
- Symbolic metaphor emphasis
```
### Paper-Collage Style Anchors
```javascript
- Halftone photographic cut-outs
- Cream keylines
- Uncoated paper fiber
- Flat colored background
- Machine-cut edges
- Stop-motion timing
```
### Testimonial Style Anchors
```javascript
- Warm cream or neutral background
- Black serif typography
- 5-star rating visible
- Product photo bottom or side
- Soft natural shadow
- Editorial minimal composition
```
### Editorial Illustrated Style Anchors
```javascript
- Flat vector illustration
- Clean editorial layout
- Wellness-forward palette
- Modern serif or sans-serif typography
- Product + illustration blend
- Educational tone
```
---
## ⚙️ Side-By-Side: Traditional Animation vs Multi-Style System
<table header-row="true">
<tr>
<td>Element</td>
<td>Traditional Animation Production</td>
<td>Multi-Style System</td>
</tr>
<tr>
<td>Cost per finished 15-second ad</td>
<td>$5,000-$25,000</td>
<td>$2-$5</td>
</tr>
<tr>
<td>Time per ad</td>
<td>2-4 weeks</td>
<td>15 minutes</td>
</tr>
<tr>
<td>Team required</td>
<td>Specialized animator (stop-motion / vox / origami)</td>
<td>1 operator</td>
</tr>
<tr>
<td>Style flexibility</td>
<td>Locked to hired animator's specialty</td>
<td>Any style from any reference</td>
</tr>
<tr>
<td>Iteration cost</td>
<td>Full re-animation</td>
<td>Re-render (dollars)</td>
</tr>
<tr>
<td>Best for</td>
<td>Museum-quality brand pieces</td>
<td>Every DTC animated content need</td>
</tr>
<tr>
<td>Quality ceiling</td>
<td>Physical craft realism</td>
<td>Approaching physical craft realism</td>
</tr>
</table>
The mechanism: specialized animation labor collapses into reference-driven style replication. Trade-off: subtle physical craft still edges truly hero campaigns. For 95% of DTC animated content, the trade-off wins.
---
## ⚙️ The Distribution Playbook
Multi-style animated ads perform on social feed.
### Where to Deploy
→ **TikTok organic + Spark Ads** (9:16 native)<br>→ **Instagram Reels** (9:16 native)<br>→ **X / Twitter video posts** (native format — animated ads perform well here)<br>→ **YouTube Shorts** (9:16 native)<br>→ **Meta feed video** (1:1 or 4:5)<br>→ **LinkedIn native video** (B2B / SaaS)
### Cadence
→ 5-10 animated ads per week for scaling social brands<br>→ 3-5 per week for standard cadence<br>→ Daily for volume content brands
Rotate across the 6 style categories to prevent viewer fatigue on your feed.
### KPIs
→ **Hook rate (3-sec view)** — target >40%<br>→ **Hold rate (full-clip watch)** — target >55%<br>→ **Saves + shares** — target 2-4%<br>→ **Reach lift** — track weekly
---
## ⚙️ The Integration Playbook
The Multi-Style Animated Ad System is the **reference-driven animated ad layer** of your DTC creative stack.
### Where this slots into the broader stack:
<table header-row="true">
<tr>
<td>Layer</td>
<td>Tool</td>
<td>Job</td>
</tr>
<tr>
<td>Reaction UGC</td>
<td>Claude + Arcads</td>
<td>Scroll-stop reactions</td>
</tr>
<tr>
<td>Test velocity</td>
<td>1-Photo-to-6-Shots</td>
<td>Cheap concept testing</td>
</tr>
<tr>
<td>BTS Vlog</td>
<td>BTS Vlog System</td>
<td>Organic-signal reach</td>
</tr>
<tr>
<td>Slice-of-life</td>
<td>Slice-of-Life System</td>
<td>15-sec intimate character beats</td>
</tr>
<tr>
<td>Host-led tour</td>
<td>Host-Led Tour System</td>
<td>15-sec aspirational tour</td>
</tr>
<tr>
<td>Full product ads</td>
<td>Fable 5 + Higgsfield</td>
<td>Locked 30-sec ads</td>
</tr>
<tr>
<td>Brand narrative films</td>
<td>Fable 5 Director</td>
<td>1-min hero films</td>
</tr>
<tr>
<td>Cinematic Super Bowl</td>
<td>Cinematic Commercial System</td>
<td>Dramatic single-product hero</td>
</tr>
<tr>
<td>ASMR unboxing</td>
<td>ASMR Storyboard System</td>
<td>30-sec POV hands unboxing</td>
</tr>
<tr>
<td>Cozy family commercial</td>
<td>Cozy Lifestyle Storyboard</td>
<td>30-sec cozy family-brand</td>
</tr>
<tr>
<td>Luxury POV commercial</td>
<td>Premium Commercial Storyboard</td>
<td>20-sec POV hand luxury</td>
</tr>
<tr>
<td>Premium hero content</td>
<td>Nano Banana Hero</td>
<td>Editorial magazine stills</td>
</tr>
<tr>
<td>Lipsync performance</td>
<td>Lipsync Performance System</td>
<td>Syllable-accurate talking-head</td>
</tr>
<tr>
<td>Paper-collage explainer</td>
<td>VOX-COLLAGE-BROLL + MaxFusion</td>
<td>Paper-collage locked aesthetic</td>
</tr>
<tr>
<td>**Multi-style animated ads**</td>
<td>**Multi-Style System + **[**Pletor.ai**](http://pletor.ai/)</td>
<td>**ANY animated style from ANY reference**</td>
</tr>
<tr>
<td>Post-production VFX</td>
<td>AI VFX System</td>
<td>Frame-by-frame transformation</td>
</tr>
<tr>
<td>Daily social VFX</td>
<td>Seedance Omni</td>
<td>720p multi-reference transforms</td>
</tr>
</table>
Unique position: this is the **style-agnostic** animated ad system. Paper-collage system is locked to one aesthetic. This one adapts to any trending style by pasting a reference. As new visual aesthetics trend on TikTok / X, this system stays current without new tool adoption.
### Recommended cadence:
→ Week 1: Ship 5-10 animated ads across 2-3 style categories<br>→ Week 2: Test which styles perform best on your audience<br>→ Week 3-4: Scale winning styles<br>→ Ongoing: 5-10 animated ads per week across rotating styles
Weekly output: 10-25 animated ads at total cost of $20-$50.
---
## ⚙️ What NOT to Do
→ Don't skip the reference image. Text-only prompts produce generic outputs.
→ Don't skip the style spec approval gate. Free gate. Catches misalignment before rendering costs.
→ Don't skip the still approval gate. Cents cost. Catches problems before expensive video render.
→ Don't animate before still approval. That's how you spend $20 on a video that doesn't match.
→ Don't use fake lettering. If lettering appears in the still, regenerate. Don't patch in video.
→ Don't use continuous motion. Snap-in stop-motion is the visual grammar of authentic-craft AI ads.
→ Don't add cinematic drift. Locked camera only.
→ Don't repeat the same style category too many times in a batch. Rotate across 6 styles.
→ Don't ignore the [Pletor.ai](http://pletor.ai/) MCP setup. Manual model juggling defeats the purpose.
→ Don't measure on CTR alone. Animated ads win on hook rate + hold rate + saves.
→ Don't skip credit to Raph Guilhem. Original workflow design is his.
→ Don't force styles that don't fit your brand. Pick references that match your brand aesthetic + audience.
---
## ⚙️ Troubleshooting
<table header-row="true">
<tr>
<td>Problem</td>
<td>Fix</td>
</tr>
<tr>
<td>Style spec too generic</td>
<td>Reference image not detailed enough. Use higher-resolution reference.</td>
</tr>
<tr>
<td>Stills don't match reference</td>
<td>Style spec skipped or incomplete. Force Claude to fill all 9 spec categories.</td>
</tr>
<tr>
<td>Video motion feels wrong</td>
<td>Wrong animation style anchors used. Match to reference's actual animation style.</td>
</tr>
<tr>
<td>Frame doesn't open empty</td>
<td>Prompt language too soft. Reinforce "frame opens empty, subject not visible in frame 1."</td>
</tr>
<tr>
<td>Continuous motion instead of snap</td>
<td>Prompt insufficient. Reinforce "stop-motion snap-in timing, staggered, not continuous."</td>
</tr>
<tr>
<td>Camera drifts</td>
<td>Locked camera language missing. Add "locked camera, no drift, no zoom, no cinematic sweep."</td>
</tr>
<tr>
<td>Typography wrong</td>
<td>Style spec typography section too vague. Specify serif category + weight + spacing.</td>
</tr>
<tr>
<td>Colors don't match</td>
<td>Hex codes not extracted. Force Claude to identify exact hex colors from reference.</td>
</tr>
<tr>
<td>Cost above $6 per ad</td>
<td>Rendering at 8K or over-iterating. 4K is sufficient for social feed.</td>
</tr>
<tr>
<td>[Pletor.ai](http://pletor.ai/) connection fails</td>
<td>MCP config wrong. Verify API key + config file syntax.</td>
</tr>
<tr>
<td>Nanobanana 2 outputs off-style</td>
<td>Approved stills gate skipped. Force operator review before video.</td>
</tr>
<tr>
<td>Seedance 2.0 continuous motion</td>
<td>Animation protocol vague. Reinforce exact snap-in timing beats.</td>
</tr>
</table>
---
## ⚙️ The Weekly Production Cadence
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
<td>Collect 5-10 reference images (trending animated ads)</td>
<td>References locked</td>
</tr>
<tr>
<td>Monday</td>
<td>9:30-10:30</td>
<td>Run style reverse-engineering on each</td>
<td>Style specs ready</td>
</tr>
<tr>
<td>Monday</td>
<td>10:30-12:30</td>
<td>Generate stills (Nanobanana 2), approve winners</td>
<td>Approved stills</td>
</tr>
<tr>
<td>Monday</td>
<td>12:30-14:00</td>
<td>Animate approved stills (Seedance 2.0)</td>
<td>Silent videos</td>
</tr>
<tr>
<td>Monday</td>
<td>14:00-15:00</td>
<td>Add TTS + music + brand overlay in CapCut</td>
<td>Deploy-ready ads</td>
</tr>
<tr>
<td>Monday</td>
<td>15:00</td>
<td>Deploy to TikTok + Reels + X + Shorts</td>
<td>Live</td>
</tr>
<tr>
<td>Wednesday</td>
<td>Hour-48 matrix</td>
<td>Analyze reach + saves</td>
<td>Winners identified</td>
</tr>
<tr>
<td>Friday</td>
<td>Next week planning</td>
<td>Iterate winning style categories</td>
<td>Strategy locked</td>
</tr>
</table>
Weekly output: 5-10 animated ads at total cost of $20-$50.
---
## 🎯 Closer
**Sign up for **[**Pletor.ai**](http://pletor.ai/)**. Configure the MCP in Claude Code. Save the Multi-Style Reverse-Engineering skill. Pick a trending animated ad reference (Grüns / AG1 / Chamberlain / Liquid Death / whatever fits your brand). Paste it into Claude with your product context. Get the style spec. Generate 5 stills with Nanobanana 2. Approve the ones that work. Animate approved stills with Seedance 2.0. Add TTS + music in CapCut. Deploy to TikTok + Reels + X + Shorts. Measure on hook rate + hold rate + saves. By end of week 1 you'll have shipped 5-10 animated ads for under $50 total. By end of month 1 you'll have adapted every trending animated style for your brand. By end of quarter 1 you'll be producing content across 6+ visual aesthetics that competitors physically cannot replicate without hiring the same specialized talent for each style.**
The style-specialist-hiring bottleneck was the constraint.
Reference-driven style replication + Claude + [Pletor.ai](http://pletor.ai/) + Nanobanana 2 + Seedance 2.0 is what fixes it.
Original workflow: Raph Guilhem (@raph_guilhem). Get started: [pletor.ai](http://pletor.ai/).
---
**The Multi-Style Reverse-Engineering skill + **[**Pletor.ai**](http://pletor.ai/)** MCP setup + Nanobanana 2 still generation + Seedance 2.0 animation protocol + 3-gate approval + 6 DTC vertical adaptations + multi-style prompt library is the full system. Bookmark this guide. Ship your first multi-style animated ad today.**
---
