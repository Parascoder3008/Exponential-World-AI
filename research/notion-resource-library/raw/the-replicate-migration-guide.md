---
title: "The Replicate Migration Guide"
page_id: 3af92e2e92e9808eabd0ef6d130eee2b
layer: production
source: https://freebie-for-you.notion.site/3af92e2e92e9808eabd0ef6d130eee2b
---
# The Replicate Migration Guide: How to Ship the Exact Same AI Ad Outputs at 1/10th the Cost by Going Direct to the Underlying Models
---
## 🎯 What You're Getting
The Replicate + Claude workflow that produces the identical AI ad outputs you're currently paying Higgsfield $150-$300/month for. At $15-$30/month for the same generation volume. Same models. Same quality. Direct API access. Pay per generation instead of monthly credits that expire whether you use them or not.
The 6 Replicate model configs that replicate every core Higgsfield capability (Seedance 2.0 Pro for video, Kling 2.5 for cinematic motion, Runway Gen-4 for image-to-video, Pika 2.2 for stylized short-form, GPT Image 2 for product/character sheets, Flux Kontext for reference-locked generation). The Claude API wrapper skill that turns your script into direct Replicate calls, bypassing the credit-tax wrapper UI. The complete migration walkthrough from Higgsfield workflows to Replicate direct in under 30 minutes.
You stop paying wrapper markups on models that are already commodity-priced at the source. You stop watching monthly credits expire unused. You stop rate-limiting your production because you're worried about credit burn. You wire up Replicate once, run 100+ generations for the cost of your current 10, and reinvest the savings into ad spend.
By the end of this guide, you'll have:
→ The 6 Replicate model configs (exact model IDs + API parameters + cost per run)<br>→ The Claude API wrapper skill (script → Replicate call, ready to paste into Claude Code)<br>→ The complete migration walkthrough (github → Replicate → first generation)<br>→ 6 vertical-specific model config bundles (skincare, supplements, fitness, fashion, food/bev, tech)<br>→ The full credit math (Higgsfield $150-$300/mo vs Replicate $15-$30/mo at same volume)<br>→ The kill-or-scale matrix for Replicate-generated ads<br>→ The failure-mode audit (what wrappers actually add + when it's worth paying for)
If you're currently on Higgsfield running 20+ AI ads per month, this migration typically pays for itself in the first week and saves $1,800-$3,600 per year while producing identical outputs.
---
## ⚙️ The Hidden Mechanism — Why the Wrapper Tax Exists
Every AI generation wrapper platform (Higgsfield, Runway's own web UI, various "AI Studio" platforms) has the same underlying reality:
1. Open-source models get released (Seedance, Kling, Pika, Flux)
2. Model creators host inference on Replicate / Hugging Face / Fal / their own APIs
3. Wrappers wrap these APIs with a nicer UI + workflow templates
4. Wrappers charge 5-15x the underlying inference cost
5. Users pay because the wrapper is what they discovered first
The wrappers aren't stealing — they're providing UX. The problem is when you scale volume, the UX premium becomes the majority of your production cost.
The math shifts at \\~20-30 generations per month. Below that, wrapper UX is worth the price. Above that, direct API access is a 5-10x cost reduction with zero quality trade-off.
The fix is not "better wrapper." The fix is **going direct to the underlying models on Replicate** — the thing that lets your production stack cost less than a single Meta ad set.
---
## ⚙️ The Stack
<table header-row="true">
<tr>
<td>Layer</td>
<td>Tool</td>
<td>Job</td>
</tr>
<tr>
<td>Model orchestration</td>
<td>Claude Fable 5 with Replicate API skill</td>
<td>Turns script into direct Replicate API calls</td>
</tr>
<tr>
<td>Video generation</td>
<td>Seedance 2.0 Pro on Replicate</td>
<td>Long-form scene rendering</td>
</tr>
<tr>
<td>Cinematic motion</td>
<td>Kling 2.5 on Replicate</td>
<td>Cinematic camera moves + physics realism</td>
</tr>
<tr>
<td>Image-to-video</td>
<td>Runway Gen-4 on Replicate</td>
<td>Reference-locked image-to-video</td>
</tr>
<tr>
<td>Short-form stylized</td>
<td>Pika 2.2 on Replicate</td>
<td>Fast stylized short clips</td>
</tr>
<tr>
<td>Product/character sheets</td>
<td>GPT Image 2 on Replicate</td>
<td>Multi-angle asset generation</td>
</tr>
<tr>
<td>Reference-locked images</td>
<td>Flux Kontext on Replicate</td>
<td>Character + product identity holds</td>
</tr>
<tr>
<td>Deploy</td>
<td>Meta + TikTok + Instagram + native scheduling</td>
<td>Multi-platform distribution</td>
</tr>
</table>
Total monthly stack cost at 100 generations: $15-$30 on Replicate + $20/mo Claude subscription. Under $50/mo for a full AI ad production pipeline.
---
## ⚙️ The Cost Math
Higgsfield subscription tiers and equivalent Replicate pricing at 100 generations per month:
<table header-row="true">
<tr>
<td>Generation Type</td>
<td>Higgsfield Credit Cost</td>
<td>Replicate Cost</td>
<td>Savings</td>
</tr>
<tr>
<td>Seedance 2.0 Pro (5-second video)</td>
<td>\\~$3.50 per gen</td>
<td>\\~$0.35 per gen</td>
<td>90%</td>
</tr>
<tr>
<td>Kling 2.5 (5-second cinematic)</td>
<td>\\~$3.00 per gen</td>
<td>\\~$0.28 per gen</td>
<td>91%</td>
</tr>
<tr>
<td>Runway Gen-4 (5-second I2V)</td>
<td>\\~$4.00 per gen</td>
<td>\\~$0.40 per gen</td>
<td>90%</td>
</tr>
<tr>
<td>Pika 2.2 (5-second stylized)</td>
<td>\\~$2.00 per gen</td>
<td>\\~$0.15 per gen</td>
<td>92%</td>
</tr>
<tr>
<td>GPT Image 2 (image gen)</td>
<td>\\~$0.30 per gen</td>
<td>\\~$0.04 per gen</td>
<td>87%</td>
</tr>
<tr>
<td>Flux Kontext (image gen)</td>
<td>\\~$0.40 per gen</td>
<td>\\~$0.05 per gen</td>
<td>87%</td>
</tr>
</table>
Monthly totals at 100-gen volume:<br>→ Higgsfield: $150-$300 depending on model mix<br>→ Replicate: $15-$30 for identical outputs
Annual savings: $1,600-$3,200. Reinvest into 30-60 additional ad tests per month.
---
## ⚙️ Step 1 — The Replicate Account Setup
30-minute one-time setup.
### Account Creation
1. Go to [replicate.com](http://replicate.com/), sign up with github
2. Verify email
3. Add billing (credit card or Stripe)
4. Set spend limit: $50/mo initial (adjust upward as you scale)
5. Get your API token from account settings → API tokens
6. Save token as environment variable: `REPLICATE_API_TOKEN=r8_...`
### Model Access
Replicate has an open marketplace. Every model in the stack is available without additional gating:
→ Seedance 2.0 Pro: `bytedance/seedance-2-pro`<br>→ Kling 2.5: `kwaivgi/kling-v2.5`<br>→ Runway Gen-4: `runwayml/gen4-turbo`<br>→ Pika 2.2: `pika-labs/pika-2.2`<br>→ GPT Image 2: `openai/gpt-image-2`<br>→ Flux Kontext: `black-forest-labs/flux-kontext-pro`
Model IDs are the string you pass into any Replicate API call. Copy the exact strings above.
### Local Setup (Optional but Recommended)
Install Replicate CLI for testing:
```bash
brew install replicate
replicate login
```
Now you can run generations from your terminal for quick testing:
```bash
replicate run bytedance/seedance-2-pro \\
  --prompt "your prompt" \\
  --duration 5
```
Skip this if you're going pure API from Claude Code / Cursor / n8n.
---
## ⚙️ Step 2 — The Claude API Wrapper Skill
Build this as a Claude Fable 5 skill inside your Claude Code / Claude Projects workspace. It handles the entire generation chain from script to Replicate.
### Custom Skill Instructions
```javascript
Name: Replicate Direct Generation Skill

Description: Turns a script + brand assets into
direct Replicate API calls across the 6-model
stack (Seedance, Kling, Runway, Pika, GPT Image 2,
Flux Kontext). Bypasses wrapper UI cost markups.

System Prompt:
You are a Replicate API call generator for DTC
AI ads. Given a script + brand assets, output
the exact Replicate calls needed to produce the
finished ad.

Input format from operator:
- Script: [FULL SCRIPT with scene breaks]
- Product image URL(s): [URL(s)]
- Character reference URL(s): [URL(s)]
- Location reference URL(s): [URL(s)]
- Ad length: [SECONDS: e.g. 30]
- Aspect ratio: [16:9 / 9:16 / 1:1]
- Model preference per scene: [DEFAULT: Seedance
  Pro for standard, Kling for cinematic, Runway
  for I2V, Pika for stylized]

Output format (strict, per scene):

SCENE [N] ([TIME RANGE]):
Model: [MODEL ID from stack]
API call (Python):
```python
import replicate

output = replicate.run(
    "[MODEL_ID]",
    input={
        "prompt": "[SCENE PROMPT]",
        "duration": [SECONDS],
        "aspect_ratio": "[RATIO]",
        "reference_images": ["[URL1]", "[URL2]"],
        "seed": [OPTIONAL_SEED_FOR_REPRODUCIBILITY]
    }
)
print(output)
```
Cost estimate: $`[X.XX] per scene
Total ad cost:`$[Y.YY]
Continuity rules to enforce:<br>→ Same character reference URL across all scenes<br>→ Same product reference URL across all scenes<br>→ Same location reference URL across all scenes<br>→ Seed values consistent for reproducibility<br>when needed<br>→ Prompt language consistent across scenes
Voice rules:
- Numerals only (3 not three)
- Direct API spec only, no commentary
```plain text

### Running the Skill

Operator pastes the script + asset URLs, Fable 5 outputs the complete Python code for every scene call with cost estimates. Copy-paste into a Python script, run, generations are queued on Replicate. Outputs come back as video URLs.

Total operator time: 5-8 minutes to write the script + paste API calls.

---

## ⚙️ Step 3 — The 6 Replicate Model Configs

Each config is a copy-paste API parameter block for the 6 models in the stack.

### Config 1 — Seedance 2.0 Pro (Long-Form Video)

**Model ID**: `bytedance/seedance-2-pro`

**Best for**: 5-15 second product ad scenes, character-driven narratives, standard DTC ad production.

**Standard config**:

```python
{
    "prompt": "[YOUR SCENE PROMPT]",
    "duration": 5,
    "aspect_ratio": "9:16",
    "resolution": "1080p",
    "reference_images": [
        "[CHARACTER_URL]",
        "[PRODUCT_URL]"
    ],
    "camera_control": "smooth",
    "seed": null
}
```
**Cost**: \\~$0.35 per 5-second generation.
**Notes**: Best quality-per-dollar in the stack. Use as default for 80% of scenes.
### Config 2 — Kling 2.5 (Cinematic Motion)
**Model ID**: `kwaivgi/kling-v2.5`
**Best for**: One-take cinematic shots, complex camera moves, physics-heavy scenes (water, hair, cloth).
**Standard config**:
```python
{
    "prompt": "[YOUR CINEMATIC PROMPT]",
    "duration": 5,
    "aspect_ratio": "16:9",
    "quality": "pro",
    "camera_control": "cinematic_zoom",
    "reference_image": "[STARTING_FRAME_URL]",
    "seed": null
}
```
**Cost**: \\~$0.28 per 5-second generation.
**Notes**: Superior physics realism vs Seedance. Use for hero brand pillar shots.
### Config 3 — Runway Gen-4 (Image-to-Video)
**Model ID**: `runwayml/gen4-turbo`
**Best for**: Turning a specific still image into a video with locked identity. Character sheets to animated scenes.
**Standard config**:
```python
{
    "prompt": "[MOTION DIRECTION]",
    "image": "[SOURCE_IMAGE_URL]",
    "duration": 5,
    "aspect_ratio": "9:16",
    "motion_amount": 6,
    "seed": null
}
```
**Cost**: \\~$0.40 per 5-second generation.
**Notes**: Best for locking a specific reference character/product into motion. Higher cost, higher identity retention.
### Config 4 — Pika 2.2 (Stylized Short-Form)
**Model ID**: `pika-labs/pika-2.2`
**Best for**: TikTok-native stylized clips, meme-format ads, trend-aligned content.
**Standard config**:
```python
{
    "prompt": "[STYLIZED PROMPT]",
    "duration": 3,
    "aspect_ratio": "9:16",
    "style": "vibrant",
    "reference_image": "[OPTIONAL_URL]",
    "seed": null
}
```
**Cost**: \\~$0.15 per 3-second generation.
**Notes**: Cheapest option. Use for trend-testing at high volume before committing to Seedance/Kling for winners.
### Config 5 — GPT Image 2 (Product + Character Sheets)
**Model ID**: `openai/gpt-image-2`
**Best for**: Multi-angle product sheets, character sheets, brand asset generation.
**Standard config**:
```python
{
    "prompt": "[ASSET DESCRIPTION]",
    "size": "1024x1024",
    "quality": "high",
    "reference_image": "[SEED_IMAGE_URL]",
    "number_of_images": 4
}
```
**Cost**: \\~$0.04 per generation.
**Notes**: Batch asset generation. 8 images per credit-equivalent when compared to Higgsfield Soul Cinema pricing.
### Config 6 — Flux Kontext (Reference-Locked Images)
**Model ID**: `black-forest-labs/flux-kontext-pro`
**Best for**: When you need pixel-perfect character/product identity retention across multiple images.
**Standard config**:
```python
{
    "prompt": "[SCENE PROMPT]",
    "reference_images": ["[URL1]", "[URL2]"],
    "size": "1024x1792",
    "guidance_scale": 4.5,
    "num_inference_steps": 50
}
```
**Cost**: \\~$0.05 per generation.
**Notes**: Highest identity retention for image gen. Use for character sheet variations that must stay identical.
---
## ⚙️ Step 4 — The Migration Walkthrough (30 Minutes)
Complete migration from Higgsfield to Replicate direct.
### Minute 0-5: Account + Token
→ Sign up for Replicate with github<br>→ Add billing + $50 spend cap<br>→ Copy API token<br>→ Save to `.env` or environment variables
### Minute 5-10: Install Dependencies
```bash
pip install replicate
# OR for Node:
npm install replicate
```
Confirm working:
```python
import replicate
client = replicate.Client(api_token="r8_...")
```
### Minute 10-15: Build the Claude Skill
→ Copy the Replicate Direct Generation Skill instructions (Step 2)<br>→ Paste into Claude Fable 5 Projects or Claude Code /skill<br>→ Test with a 1-scene brief to confirm API calls generate
### Minute 15-20: Migrate Your Assets
→ Export product/character/location references from Higgsfield<br>→ Upload to a public URL host (Cloudflare R2 / AWS S3 / even Imgur for testing)<br>→ Save URLs — you'll paste these into Replicate API calls
### Minute 20-25: First Test Generation
Pick a simple scene. Run through the Claude skill. Get the API call. Execute:
```python
import replicate

output = replicate.run(
    "bytedance/seedance-2-pro",
    input={
        "prompt": "A woman opens a package in a bright kitchen, warm morning light, natural expression",
        "duration": 5,
        "aspect_ratio": "9:16",
        "reference_images": ["<https://your-url.com/character.jpg>"]
    }
)
print(output)
```
Output returns a video URL in 45-90 seconds.
### Minute 25-30: Verify Output Quality
Compare to a Higgsfield generation of the same brief. Should be visually indistinguishable — because it's the same underlying model.
If quality matches: cancel your Higgsfield subscription, migration complete.
If quality differs: check that model ID + parameters match Higgsfield's underlying config. Usually a `guidance_scale` or `motion_amount` mismatch.
---
## ⚙️ 6 Vertical Model Config Bundles
Each bundle is a preset for a specific DTC vertical.
### Vertical 1 — Skincare / Beauty
```javascript
Default model: Seedance 2.0 Pro
Aspect ratio: 9:16
Character reference: woman 25-40, bathroom morning
Location reference: bathroom natural light, 3/4
  angle
Product reference: product sheet (front + 3/4)
Prompt style: soft warm lighting, natural skin,
  first-person application
Motion amount: 5 (natural)
Cost per 30-second ad: ~$2.10
```
### Vertical 2 — Supplements / Wellness
```javascript
Default model: Seedance 2.0 Pro
Aspect ratio: 9:16
Character reference: 30-50, kitchen morning
Location reference: modern kitchen, morning
  light, 3/4 angle
Product reference: bottle + capsule detail
Prompt style: calm authoritative, peer-credible,
  mechanism-forward
Motion amount: 4 (subtle)
Cost per 30-second ad: ~$2.10
```
### Vertical 3 — Fitness / Athletic
```javascript
Default model: Kling 2.5 (for physics realism
  on movement)
Aspect ratio: 9:16
Character reference: 22-40 athletic, home gym
Location reference: home gym gritty lighting,
  3/4 angle
Product reference: fitness product close-up
Prompt style: high-contrast, dynamic, defiant
Motion amount: 8 (dynamic)
Cost per 30-second ad: ~$1.68
```
### Vertical 4 — Fashion
```javascript
Default model: Runway Gen-4 (for identity lock
  on outfit)
Aspect ratio: 9:16
Character reference: 22-38 style-aware, natural
  light
Location reference: bedroom with mirror, 3/4
  angle
Product reference: garment on hanger + on-body
Prompt style: bright, confident, editorial
Motion amount: 6 (elegant)
Cost per 30-second ad: ~$2.40
```
### Vertical 5 — Food / Beverage
```javascript
Default model: Seedance 2.0 Pro + Kling 2.5
  for pour moments
Aspect ratio: 9:16
Character reference: 25-40 foodie, kitchen
  morning
Location reference: modern kitchen or café,
  warm light, 3/4 angle
Product reference: package + pour + first sip
Prompt style: warm, delighted, casual
Motion amount: 5 (natural)
Cost per 30-second ad: ~$2.24
```
### Vertical 6 — Tech / SaaS
```javascript
Default model: Runway Gen-4 (for UI + hero
  shots) + Pika 2.2 (for stylized transitions)
Aspect ratio: 16:9 or 9:16
Character reference: 28-45 operator/founder,
  home office
Location reference: home office, warm desk
  light, 3/4 angle
Product reference: UI screenshot + device hero
Prompt style: peer-to-peer, decisive, quiet
  confidence
Motion amount: 5 (natural)
Cost per 30-second ad: ~$2.55
```
---
## ⚙️ Side-By-Side: Higgsfield vs Replicate Direct
<table header-row="true">
<tr>
<td>Element</td>
<td>Higgsfield</td>
<td>Replicate Direct</td>
</tr>
<tr>
<td>Monthly cost at 100 generations</td>
<td>$150-$300</td>
<td>$15-$30</td>
</tr>
<tr>
<td>Per-generation cost (Seedance 2.0 Pro)</td>
<td>\\~$3.50</td>
<td>\\~$0.35</td>
</tr>
<tr>
<td>Interface</td>
<td>Polished wrapper UI</td>
<td>API + your choice of client</td>
</tr>
<tr>
<td>Workflow templates</td>
<td>Pre-built</td>
<td>Build once in Claude skill, reuse forever</td>
</tr>
<tr>
<td>Credit expiration</td>
<td>Monthly credits expire unused</td>
<td>Pay only for what you use</td>
</tr>
<tr>
<td>Rate limits</td>
<td>Wrapper tier limits</td>
<td>Replicate's raw API limits (higher)</td>
</tr>
<tr>
<td>Model access</td>
<td>Curated selection</td>
<td>Full Replicate marketplace</td>
</tr>
<tr>
<td>Onboarding time</td>
<td>30 minutes</td>
<td>30 minutes</td>
</tr>
<tr>
<td>Best for</td>
<td>5-15 generations/month, prefer UI</td>
<td>20+ generations/month, prefer control</td>
</tr>
</table>
The mechanism: wrappers absorb their markup by offering UX. If you value UX enough to pay 5-10x, Higgsfield wins. If you'd rather run 10x the generations for the same spend, Replicate direct wins.
For operators shipping 20+ AI ads per week, Replicate direct is the strictly-dominant choice.
---
## ⚙️ When Higgsfield IS Worth Paying For
Being honest: wrappers aren't scams. They provide real value in specific cases.
Higgsfield IS worth paying for when:
→ You generate fewer than 10 ads per month (wrapper UX beats API friction)<br>→ You need Soul Cinema's specific workflow templates and don't want to rebuild them<br>→ You're not comfortable running Python API calls<br>→ You value the community + templates + support the wrapper provides<br>→ You're testing whether AI ads work for your brand before committing to volume
Higgsfield is NOT worth paying for when:
→ You're shipping 20+ generations per month<br>→ You're comfortable with Claude / Cursor / basic Python<br>→ You want to run 10x the volume for the same spend<br>→ You're production-tier and every dollar of tooling eats into ad spend<br>→ Your competitor is running direct API and outspending you 10:1 on tests
The migration decision is: how many generations per month, and how comfortable are you with API-level access? Above 20 gens/mo + basic technical comfort = migrate.
---
## ⚙️ The Kill-or-Scale Matrix for Replicate-Generated Ads
Deploy 4-6 Replicate-generated ads per batch to Meta + TikTok at $30-$50/day each. Run the matrix at hour 24.
<table header-row="true">
<tr>
<td>Metric</td>
<td>Kill Below</td>
<td>Hold Range</td>
<td>Scale Above</td>
</tr>
<tr>
<td>Hook rate (3-sec view)</td>
<td><32%</td>
<td>32-42%</td>
<td>>42%</td>
</tr>
<tr>
<td>Hold rate (15-sec watch)</td>
<td><13%</td>
<td>13-19%</td>
<td>>19%</td>
</tr>
<tr>
<td>CTR</td>
<td><1.0%</td>
<td>1.0-1.6%</td>
<td>>1.6%</td>
</tr>
<tr>
<td>CPA vs target</td>
<td>>1.4x</td>
<td>1.0-1.4x</td>
<td><1.0x</td>
</tr>
</table>
Same performance benchmarks as any AI-generated ad — because Replicate outputs the identical models. The kill-or-scale decision is about creative performance, not tool source.
### The Matrix Prompt
```javascript
Run the kill-or-scale matrix on the Replicate
batch deployed in the last 24 hours.

Data:
[PASTE: ad name, Replicate model used,
generation cost, spend, hook rate, hold rate,
CTR, CPA]

For each ad return:
1. Decision: KILL / HOLD / SCALE
2. Reason (cite threshold breach)
3. If SCALE: which model (Seedance / Kling /
   Runway / Pika) + prompt style is winning
4. If KILL: which parameter to adjust in the
   Replicate call

Show total generation cost vs total ad spend
ratio. If generation cost exceeds 5% of ad
spend, flag as tooling-cost issue (unlikely on
Replicate direct).

No hedging. Decisive calls.
```
---
## ⚙️ The Integration Playbook
Replicate direct is the **cost-optimization layer** underneath your AI ad stack.
### Where this slots into the broader stack:
<table header-row="true">
<tr>
<td>Layer</td>
<td>Previous Tool</td>
<td>Replicate Direct Alternative</td>
</tr>
<tr>
<td>Reaction UGC production</td>
<td>Arcads ($110/mo)</td>
<td>Keep Arcads (unique avatar library, no direct-API alternative yet)</td>
</tr>
<tr>
<td>Cinematic brand pillar</td>
<td>Higgsfield ($150-$300/mo)</td>
<td>Kling 2.5 on Replicate ($3-$8/mo at same volume)</td>
</tr>
<tr>
<td>Full product ads</td>
<td>Higgsfield ($150-$300/mo)</td>
<td>Seedance 2.0 Pro on Replicate ($3-$10/mo at same volume)</td>
</tr>
<tr>
<td>Product/character sheets</td>
<td>Higgsfield Soul Cinema</td>
<td>GPT Image 2 + Flux Kontext on Replicate</td>
</tr>
<tr>
<td>Volume UGC</td>
<td>AI UGC Factory</td>
<td>Keep as-is</td>
</tr>
<tr>
<td>Distribution</td>
<td>Cross-platform tools</td>
<td>Keep as-is</td>
</tr>
</table>
Not everything moves to Replicate. Arcads has a genuine avatar library moat. The AI UGC Factory workflow uses tools with real UX value. But Higgsfield-specific workflows for cinematic + product ads consolidate cleanly to Replicate direct.
### Recommended migration cadence:
→ Week 1: Set up Replicate account + Claude skill + test 1 generation<br>→ Week 2: Migrate cinematic brand pillar workflow to Kling on Replicate<br>→ Week 3: Migrate full product ad workflow to Seedance on Replicate<br>→ Week 4: Cancel Higgsfield subscription, reinvest saved $150-$300/mo into ad spend<br>→ Month 2+: Explore Replicate marketplace for models not on Higgsfield (Wan 2.5, Hailuo, etc.)
---
## ⚙️ What NOT to Do
→ Don't cancel Higgsfield before validating Replicate outputs match. Run parallel for 1 week.
→ Don't migrate if you're under 10 generations/month. Wrapper UX still wins at that volume.
→ Don't use Pika 2.2 for hero product ads. It's stylized short-form only. Use Seedance/Kling for hero content.
→ Don't skip the Claude skill. Copy-pasting model IDs and parameters manually gets tedious fast.
→ Don't set your Replicate spend cap too high initially. Start at $50/mo, raise as you validate the workflow.
→ Don't ignore Replicate's cold-start latency. First generation after inactivity can take 90 seconds. Subsequent generations are 30-60 seconds.
→ Don't skip the reference image URL setup. Local files can't be passed to Replicate API — you need public URLs (Cloudflare R2, S3, or Imgur for testing).
→ Don't assume every Higgsfield feature has a 1:1 Replicate equivalent. Some workflow templates (like Soul Cinema's specific presets) require rebuilding in your Claude skill.
→ Don't use Runway Gen-4 for scenes where identity lock isn't critical. It's the most expensive video model. Use Seedance for standard scenes.
→ Don't migrate before backing up your Higgsfield assets. Download product/character/location references first.
→ Don't try to hide the migration from your team if you're on a shared workspace. Their credits stop working when you cancel.
---
## ⚙️ Troubleshooting
<table header-row="true">
<tr>
<td>Problem</td>
<td>Fix</td>
</tr>
<tr>
<td>Replicate generation quality below Higgsfield</td>
<td>Model parameter mismatch. Check `guidance_scale`, `motion_amount`, `quality` fields match Higgsfield's underlying config.</td>
</tr>
<tr>
<td>API returns 401 unauthorized</td>
<td>API token expired or missing. Regenerate from account settings.</td>
</tr>
<tr>
<td>Reference image URLs return 403</td>
<td>Image host not public. Upload to Cloudflare R2 / S3 with public read access.</td>
</tr>
<tr>
<td>Generation costs higher than expected</td>
<td>Using Runway Gen-4 for every scene. Switch defaults to Seedance 2.0 Pro.</td>
</tr>
<tr>
<td>Cold start latency on first generation</td>
<td>Normal Replicate behavior. Subsequent generations within same session are fast.</td>
</tr>
<tr>
<td>Character drift across scenes</td>
<td>Reference image URL not consistent across API calls. Use identical URL per scene.</td>
</tr>
<tr>
<td>Prompt output doesn't match Higgsfield style</td>
<td>Missing style anchors in prompt. Add cinematic vocabulary + color/lighting/grain refs.</td>
</tr>
<tr>
<td>Video output is 4-second when 5 requested</td>
<td>Model rounded down. Increase `duration` to 6 for 5-second output.</td>
</tr>
<tr>
<td>Batch generations timing out</td>
<td>Replicate free tier concurrency limit. Upgrade to paid tier ($5/mo minimum) for higher concurrency.</td>
</tr>
<tr>
<td>Can't find model on Replicate marketplace</td>
<td>Some newest models (like Fable 5) aren't on Replicate. Use Anthropic API direct + Replicate for generation models.</td>
</tr>
<tr>
<td>Credit-tax feels missing</td>
<td>Because it was tax. That's the point.</td>
</tr>
</table>
---
## ⚙️ The Weekly Production Cadence (Post-Migration)
This is the routine that sustains 20+ AI ads per week at 1/10th the previous cost.
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
<td>Run Claude skill on 5-7 ad briefs</td>
<td>5-7 API call sequences</td>
</tr>
<tr>
<td>Monday</td>
<td>9:30-11:00</td>
<td>Execute Replicate API calls</td>
<td>5-7 generations queued</td>
</tr>
<tr>
<td>Monday</td>
<td>11:00-12:00</td>
<td>QC outputs, re-run failed scenes</td>
<td>5-7 deploy-ready ads</td>
</tr>
<tr>
<td>Monday</td>
<td>12:00-12:30</td>
<td>Deploy to Meta + TikTok</td>
<td>Live</td>
</tr>
<tr>
<td>Tuesday</td>
<td>onwards</td>
<td>Data accumulates</td>
<td>Signals forming</td>
</tr>
<tr>
<td>Wednesday</td>
<td>9:00-9:30</td>
<td>Hour-24 matrix on Monday batch</td>
<td>Winners identified</td>
</tr>
<tr>
<td>Wednesday</td>
<td>10:00-11:30</td>
<td>Run next 5-7 ad briefs</td>
<td>Next batch</td>
</tr>
<tr>
<td>Thursday-Friday</td>
<td>flex</td>
<td>Run additional briefs as needed</td>
<td>Total 15-25 ads/week</td>
</tr>
</table>
Weekly output: 15-25 finished AI ads at total generation cost of $10-$20. Same output that previously cost $100-$300 on Higgsfield.
---
## 🎯 Closer
**Sign up for Replicate with github. Get your API token. Install the ****`replicate`**** package. Copy the Claude Replicate Direct Generation Skill instructions into your Fable 5 skill library. Upload your product + character + location references to a public URL. Run your first generation on Seedance 2.0 Pro. Compare output to your last Higgsfield generation. Notice they're identical because they're the same underlying model. Cancel Higgsfield. Reinvest the $150-$300/month you're saving into Meta ad spend. By end of week 1 you'll have migrated the workflow. By end of month 1 you'll have run 10x the generations for the same total spend. By end of quarter 1 you'll have re-invested $500-$1,000 of saved tooling budget into additional ad tests that would've been impossible under wrapper pricing.**
The wrapper tax was the constraint.
Direct Replicate API access on the same underlying models is what fixes it.
---
**The 6 Replicate model configs + Claude API wrapper skill + 30-minute migration + 6 vertical bundles + matrix is the full system. Bookmark this guide. Migrate this week.**
---
