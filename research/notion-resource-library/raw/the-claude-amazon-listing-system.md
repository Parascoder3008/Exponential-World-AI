---
title: "The Claude Amazon Listing System"
page_id: 3bf92e2e92e980009229d8ac948b0b61
layer: production
source: https://freebie-for-you.notion.site/3bf92e2e92e980009229d8ac948b0b61
---
# The Claude Amazon Listing System: Map Angles, Generate the Multi-Stack, Let Amazon's Algorithm Pick the Winner
---
## 🎯 What You're Getting
The exact Claude workflow that maps every buyer angle for your product, turns each angle into a full 5-image listing stack (Hero, Benefits, Ingredients, Lifestyle, Reviews), and deploys all 25+ images to Amazon's carousel so the algorithm rotates them and picks the winner. No A/B test setup. No 3-week creative cycles. No guessing which angle converts. Let Amazon's data tell you.
The master Claude Skill system prompt (paste-ready into a Claude Project). The Angle Mapping prompt that surfaces 5-8 buyer hooks per product. The Multi-Stack Generation prompts for each of the 5 image types (Hero / Benefits / Ingredients / Lifestyle / Reviews). 6 vertical templates calibrated for energy drinks, supplements, skincare, beauty devices, kitchen/food, and premium beauty. Amazon-specific image specs (dimensions, file size, naming conventions).
You stop briefing creative agencies for "the 7 listing images." You stop running manual A/B tests through Amazon Experiments (which only test 2 images at a time anyway). You let Amazon's native image carousel rotation do the testing for you. 25 images per product gives the algorithm enough variance to find the winning angle in days, not months.
By the end of this guide, you'll have:
→ The master Claude Skill that runs angle mapping → multi-stack generation in 1 chat<br>→ The Angle Mapping prompt (paste-ready)<br>→ The Multi-Stack Generation prompts (1 per image type — Hero, Benefits, Ingredients, Lifestyle, Reviews)<br>→ 6 vertical-specific Claude Project configurations<br>→ The Amazon image specs (dimensions, file size, file naming)<br>→ The algorithmic test reading matrix (how to interpret Amazon's data + identify winners)<br>→ The deploy + scale workflow<br>→ The daily/weekly cadence for listing image production
If you're already running Meta ad creative production with Claude + Higgsfield, this is the **Amazon listing layer** — completely different surface, completely different testing mechanism, complementary to everything else in your DTC creative stack. Amazon is where buyer intent converts. Most brands are leaving conversion on the table because they're not testing angles at scale.
---
## ⚙️ The Hidden Mechanism — Why Amazon's Algorithmic Image Rotation Is Free A/B Testing
Every standard Amazon listing workflow has the same broken loop:
1. Brand books a product photographer for 7 images (Hero + 6 alts)
2. Photographer delivers in 2-3 weeks
3. Brand picks 7 final images, uploads to listing
4. Listing sits for weeks/months while team coordinates next refresh
5. Brand never knows if a different angle would've converted better
Amazon's image carousel is actually doing free A/B testing — the algorithm rotates which image shows in which buyer's search results based on session data. The more variance you give the algorithm, the faster it identifies the winning angle.
The standard 7-image approach gives Amazon's algorithm 7 data points. Mostly variations of the same "hero shot" angle.
The Multi-Stack approach gives Amazon's algorithm 25-35 data points across 5+ distinct buyer hooks. The algorithm gets enough variance to identify the winning angle within days.
→ More angles = more data<br>→ More data = faster winner identification
→ Faster winners = faster conversion lift
The fix is not better single images. The fix is **flooding the carousel with 25+ images across 5+ distinct angles** — the thing that lets Amazon's algorithm do your A/B testing for free.
---
## ⚙️ The 5-Image Stack Structure Explained
Every angle gets the same 5 image types. Together they form a complete buying narrative.
<table header-row="true">
<tr>
<td>#</td>
<td>Image Type</td>
<td>Job</td>
</tr>
<tr>
<td>1</td>
<td>Hero</td>
<td>Product front-and-center with the angle's core claim ("CLEAN ENERGY. SHARP FOCUS. ZERO CRASH.")</td>
</tr>
<tr>
<td>2</td>
<td>Benefits</td>
<td>Bullet-pointed benefits chart with key features for this angle</td>
</tr>
<tr>
<td>3</td>
<td>Ingredients</td>
<td>What's inside, with ingredient callouts ("160mg Natural Caffeine, B Vitamins, Electrolytes, L-Theanine")</td>
</tr>
<tr>
<td>4</td>
<td>Lifestyle</td>
<td>Real person using the product in the context of the angle (workout for athletic, focus for performance, etc.)</td>
</tr>
<tr>
<td>5</td>
<td>Reviews</td>
<td>Social proof / testimonial / before-after visual</td>
</tr>
</table>
Each angle's 5-stack tells a complete buying story. 5 angles × 5 image types = 25 images per product. Amazon's algorithm rotates them all.
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
<td>Claude (with Listing Image Skill installed)</td>
<td>Runs Angle Mapping → Multi-Stack Generation in 1 chat</td>
</tr>
<tr>
<td>Persistent context</td>
<td>Claude Project</td>
<td>Stores product specs, brand kit, competitor analysis, prior winners</td>
</tr>
<tr>
<td>Image generation</td>
<td>GPT Image 2 (inside ChatGPT, Higgsfield, or Lovart)</td>
<td>Generates each of the 25 images per Claude's brief</td>
</tr>
<tr>
<td>Specs validation</td>
<td>Amazon Seller Central image upload</td>
<td>Auto-validates dimensions + file size</td>
</tr>
<tr>
<td>Deploy</td>
<td>Amazon Listing Manager</td>
<td>Uploads to listing carousel</td>
</tr>
<tr>
<td>Analytics</td>
<td>Amazon Brand Analytics + Helium 10</td>
<td>Reads winning image data</td>
</tr>
</table>
Claude is the orchestrator. GPT Image 2 executes the briefs. Amazon does the testing.
---
## ⚙️ The Workflow Math
Traditional Amazon listing creative cycle: $2K-$5K per product for photography + designer. 2-3 weeks per refresh. 1 listing test every 2-3 months. Limited data because only 7 images = low variance.
This system: Claude subscription + image generation credits. 60-90 minutes per product. 25 images per cycle (5 angles × 5 stack types). Amazon does the testing natively.
The leverage shift: you stop coordinating shoots and start running Claude. The bottleneck moves from production capacity to angle creativity (which the Angle Mapping prompt + 6 vertical templates fix).
---
## ⚙️ Step 1 — Install the Claude Skill
Create a Claude Project named "[Brand] Amazon Listing System." Paste the master Skill (Section 7) into Project Instructions.
Load Project Knowledge:
→ Product specs (full ingredient list, features, claims)<br>→ Brand kit (palette, typography, tone)<br>→ Top 5 Amazon competitor listings (PDP URLs)<br>→ Customer review themes (mine 50 recent reviews for recurring buyer language)<br>→ Prior winning listing angles (if you have data from past listings)
Save. The Skill activates on every chat inside the Project.
---
## ⚙️ Step 2 — Run the Angle Mapping Prompt
Start a fresh chat. Drop:
```plain text
Run Angle Mapping for [PRODUCT NAME].

Surface every distinct buyer hook this product
can sell on. Cross-reference customer reviews,
competitor positioning, and category buyer pain
points.
```
Claude returns 5-8 distinct buyer angles ranked by predicted conversion fit. For an energy drink, this might look like:
→ Angle 1: Clean Energy (caffeine sensitivity audience)<br>→ Angle 2: Zero Crash (performance audience)<br>→ Angle 3: Better Performance (athletic audience)<br>→ Angle 4: Refreshing Taste (taste-driven audience)<br>→ Angle 5: Built Different (premium positioning)<br>→ Angle 6: Functional Focus (productivity audience)
Approve. Pick the top 5 angles to brief in Step 3.
---
## ⚙️ Step 3 — Generate the Multi-Stack via Claude Orchestrated GPT Image 2
Drop:
```plain text
Run Multi-Stack Generation for the top 5 angles
from Angle Mapping.

For each angle, generate 5 GPT Image 2 prompts
covering the full image stack:
1. Hero
2. Benefits
3. Ingredients
4. Lifestyle
5. Reviews

Output 25 paste-ready GPT Image 2 prompts total.
```
Claude generates 25 distinct GPT Image 2 prompts. Each prompt is tied to a specific angle + image type with brand-consistent palette + typography callouts.
Paste each prompt into GPT Image 2 (in ChatGPT, Lovart, or Higgsfield). Generate.
Output: 25 listing images, all brand-aligned, all tied to a specific buyer angle.
Total generation time: 25-30 minutes (1 minute per image with parallel generation).
---
## ⚙️ Step 4 — Deploy All 25 Images to Amazon's Carousel
Amazon listings allow 7-9 images on the main carousel + additional A+ Content images. To deploy 25:
→ Use the main 7 carousel slots for the top-performing angle (1 angle's full 5-stack + 2 hero variations)<br>→ Use A+ Content modules to embed additional angle stacks<br>→ Use Brand Story modules for lifestyle / reviews content<br>→ Update product variations to show different angles per variant
If your listing has multiple SKU variants (flavors, sizes, formats), each variant gets a different angle's primary stack. This lets you test angles across the SKU level.
For listings with single SKU, focus the main 7-slot carousel on the highest-predicted-fit angle's full stack, then use A+ Content for the other 4 angles.
---
## ⚙️ Step 5 — Read Amazon's Algorithmic Winner Data
Amazon's algorithm rotates images based on session data. Check the winning data via:
→ Amazon Brand Analytics — search query performance per image<br>→ Helium 10 / Jungle Scout — image rotation tracking<br>→ Amazon Experiments — formal A/B test setup (limit: 2 images at a time)<br>→ Listing conversion rate by image variant
Within 7-14 days, the data shows which angle is winning. Reinforce the winner:
→ Move the winning angle's full 5-stack to the primary carousel<br>→ Update A+ Content to feature winning angle as the headline<br>→ Adjust SKU variants to weight toward winning angle<br>→ Update next listing refresh's angle priorities
The system compounds. By cycle 3-4, your listings are calibrated to your specific Amazon buyer behavior.
---
## ⚙️ The Master Claude Skill System Prompt
Paste this into your Claude Project instructions.
```javascript
You are the Amazon Listing System for [BRAND
NAME].

Your job: take a product brief and output 5-8
buyer angles + 25 GPT Image 2 prompts (5 angles
× 5 image types) in a single chat.

Project context (loaded once):
- Product specs (ingredients, features, claims)
- Brand kit (palette, typography, tone)
- Top 5 Amazon competitor listings
- Customer review themes (recurring buyer
  language)
- Prior winning listing angles (if available)

Brief input (operator provides):
- PRODUCT: [name + key specs]
- CATEGORY: [energy drink / supplement /
  skincare / etc.]
- SKU VARIANTS: [if applicable]

Workflow (2 steps with approval gates):

Step 1 — Angle Mapping

Surface every distinct buyer hook this product
can sell on. Cross-reference:
- Customer review language (recurring themes)
- Competitor positioning (what hooks they sell
  on, what hooks are underutilized)
- Category buyer pain points (what makes a
  buyer pick this category over alternatives)

Output 5-8 angles ranked by predicted
conversion fit.

Format per angle:
ANGLE [N]: [name]
Buyer hook: [the specific reason this buyer
buys]
Target buyer profile: [who responds to this
angle]
Visual cues: [what this angle should look like
visually]
Hero claim language: [3-5 word headline for
the hero image]
Competitor gap: [whether competitors are
saturating this angle or leaving it open]

Pause for operator approval before Step 2.

Step 2 — Multi-Stack Generation

For each approved angle, generate 5 GPT Image 2
prompts covering the full image stack:

1. HERO image
- Product front-and-center
- Hero claim language as overlay text
- Brand-aligned palette + typography
- Clean studio background
- High-contrast for thumbnail visibility

2. BENEFITS image
- Bullet-pointed benefits chart
- 3-5 specific benefits for this angle
- Icon + label format
- Product visible alongside chart
- Brand palette + typography

3. INGREDIENTS image (or FEATURES for non-
consumable products)
- Ingredient callouts with quantities
- Each ingredient: name + amount + benefit
- Icon for each ingredient
- Product visible with ingredient context

4. LIFESTYLE image
- Real person using the product in the angle's
  context
- (Workout for athletic angle, focus for
  performance angle, etc.)
- Product clearly visible
- Setting matches the buyer's life context

5. REVIEWS image
- Social proof visual
- 2-3 customer testimonial quotes
- Star ratings or "verified buyer" badges
- Product alongside testimonials

For each of the 25 images, output a paste-
ready GPT Image 2 prompt that:
- References the locked brand palette +
  typography
- Specifies Amazon image dimensions (1000×1000
  minimum, 2000×2000 recommended for zoom)
- Uses brand-aligned model archetype for
  lifestyle images
- Maintains product accuracy (label, color,
  proportions)

Output structure:

ANGLE 1: [angle name]
  1. Hero — [prompt]
  2. Benefits — [prompt]
  3. Ingredients — [prompt]
  4. Lifestyle — [prompt]
  5. Reviews — [prompt]

ANGLE 2: [angle name]
  ... (5 prompts)

(Continue for all 5 angles)

Total: 25 paste-ready prompts.

Constraints (apply to every prompt):
- Brand palette HEX codes locked
- Typography style consistent (font family +
  weight)
- Product appearance accurate (no label
  distortion)
- Amazon dimensions (1000×1000 or 2000×2000)
- Reviews + claims must be supportable (no
  fabricated testimonials)
```
---
## ⚙️ The Angle Mapping Prompt (Standalone)
Use this as a standalone prompt if you don't want to install the full Skill.
```javascript
Run Angle Mapping for [PRODUCT NAME] in the
[CATEGORY] category.

Input context:
- Product specs: [PASTE FULL SPECS]
- Top 5 competitor listings: [URLs OR
  DESCRIPTIONS]
- Customer review themes: [PASTE 10-20 RECENT
  REVIEW EXCERPTS]
- Category buyer pain points: [LIST KEY
  CATEGORY PAINS]

Task:
Surface every distinct buyer hook this product
can sell on. Cross-reference customer review
language, competitor positioning gaps, and
category buyer pain points.

Output 5-8 angles ranked by predicted
conversion fit.

Format per angle:

ANGLE [N]: [name]
Buyer hook: [why this buyer buys]
Target buyer profile: [demographic +
psychographic]
Visual cues: [what this angle looks like]
Hero claim language: [3-5 word headline]
Competitor gap: [is this angle saturated or
open?]

Under 600 words.
```
---
## ⚙️ The Multi-Stack Generation Prompts
These are the 5 image type prompts Claude generates per angle. Each lives inside the Multi-Stack output.
### Hero Image Prompt Template
```javascript
Generate an Amazon Hero listing image for
[BRAND] [PRODUCT] — Angle: [ANGLE NAME].

Specs:
- 2000×2000 pixels, white background
- Product centered, 60-70% of frame
- Hero claim text overlay: "[HERO CLAIM
  LANGUAGE]" in [BRAND FONT], [BRAND COLOR]
- Subtle product highlights / glow
- Amazon-safe (no claims in image text that
  aren't substantiated)

Product details: [SPECIFIC PRODUCT VISUAL
DESCRIPTION]
Brand palette: [PRIMARY HEX] + [ACCENT HEX]
```
### Benefits Image Prompt Template
```javascript
Generate an Amazon Benefits chart listing image
for [BRAND] [PRODUCT] — Angle: [ANGLE NAME].

Specs:
- 2000×2000 pixels, white or brand-palette
  background
- Product on left side (40% of frame)
- Benefits chart on right side (60% of frame)
- 3-5 benefits with icon + label format

Benefits to include (specific to angle):
1. [BENEFIT 1 — e.g. "160mg Natural Caffeine
   for clean, lasting energy"]
2. [BENEFIT 2 — e.g. "B Vitamins to support
   energy metabolism"]
3. [BENEFIT 3 — e.g. "Electrolytes to hydrate
   & replenish"]
4. [BENEFIT 4 — e.g. "L-Theanine to support
   focus without the jitters"]

Brand palette + typography locked.
```
### Ingredients Image Prompt Template
```javascript
Generate an Amazon Ingredients listing image
for [BRAND] [PRODUCT].

Specs:
- 2000×2000 pixels
- Product visible alongside ingredient list
- Each ingredient: icon + name + quantity +
  brief benefit

Ingredients to feature:
1. [INGREDIENT 1 + AMOUNT + BENEFIT]
2. [INGREDIENT 2 + AMOUNT + BENEFIT]
3. [INGREDIENT 3 + AMOUNT + BENEFIT]
4. [INGREDIENT 4 + AMOUNT + BENEFIT]

Layout: ingredient panels arranged in a clean
grid, brand-aligned palette + typography.
```
### Lifestyle Image Prompt Template
```javascript
Generate an Amazon Lifestyle listing image for
[BRAND] [PRODUCT] — Angle: [ANGLE NAME].

Specs:
- 2000×2000 pixels
- Real person using product in the angle's
  context
- Product clearly visible

Person context (matches angle):
- Workout context for athletic angle
- Focus / desk context for productivity angle
- Outdoor / adventure for free-spirited angle
- Etc.

Model archetype: [AGE + DEMOGRAPHIC + VIBE]
Setting: [SPECIFIC SETTING MATCHING ANGLE]
Lighting: natural, brand-aligned
```
### Reviews Image Prompt Template
```javascript
Generate an Amazon Reviews listing image for
[BRAND] [PRODUCT].

Specs:
- 2000×2000 pixels
- Product alongside 2-3 testimonial quotes
- Star ratings visible
- "Verified buyer" badges

Testimonial quotes (from actual customer
reviews — never fabricate):
1. "[REAL REVIEW EXCERPT]" — [VERIFIED BUYER
   FIRST NAME]
2. "[REAL REVIEW EXCERPT]" — [VERIFIED BUYER
   FIRST NAME]
3. "[REAL REVIEW EXCERPT]" — [VERIFIED BUYER
   FIRST NAME]

Layout: clean testimonial cards, brand palette
+ typography.
```
---
## ⚙️ The 5 Image Types Explained
Each image type does a specific job in the buying journey.
<table header-row="true">
<tr>
<td>Image Type</td>
<td>What It Sells</td>
<td>Where Amazon Shows It</td>
</tr>
<tr>
<td>Hero</td>
<td>The angle's core promise</td>
<td>Search result thumbnail + PDP main image</td>
</tr>
<tr>
<td>Benefits</td>
<td>Specific feature/benefit reasons to buy</td>
<td>Carousel position 2-3</td>
</tr>
<tr>
<td>Ingredients</td>
<td>Trust + transparency on what's inside</td>
<td>Carousel position 3-4</td>
</tr>
<tr>
<td>Lifestyle</td>
<td>Buyer self-identification (this is me using it)</td>
<td>Carousel position 4-5</td>
</tr>
<tr>
<td>Reviews</td>
<td>Social proof reinforcement</td>
<td>Carousel position 5-6</td>
</tr>
</table>
The 5-image arc walks the buyer from awareness (hero) → consideration (benefits + ingredients) → identification (lifestyle) → decision (reviews). 5 angles × this 5-image arc = 25 buying narratives running simultaneously.
---
## ⚙️ 6 Vertical Templates
Each is a vertical-specific Claude Project configuration.
### Vertical 1 — Energy Drinks / Beverages
```javascript
Project name: [BRAND] Energy Drink Amazon System
Top angles to prioritize: Clean Energy, Zero
Crash, Performance, Refreshing Taste, Functional
Focus
Image stack defaults: studio macro for hero +
benefits, lifestyle in athletic/work/outdoor
contexts
Brand palette anchor: high-contrast brand colors
for thumbnail visibility
```
### Vertical 2 — Supplements
```javascript
Project name: [BRAND] Supplement Amazon System
Top angles to prioritize: Specific Result
(energy/sleep/cognition), Clean Ingredients,
Clinical Backing, Daily Ritual, Founder Story
Image stack defaults: kitchen / bathroom morning
context for lifestyle, ingredient close-ups for
ingredients
Brand palette anchor: clean + medical for
clinical positioning, warm + earthy for natural
positioning
```
### Vertical 3 — Skincare / Beauty Products
```javascript
Project name: [BRAND] Skincare Amazon System
Top angles to prioritize: Ingredient Education,
30-Day Result, Sensitive Skin Safe, Clean
Formulation, Before/After
Image stack defaults: bathroom morning +
fingertip application for lifestyle, ingredient
macro for ingredients
Brand palette anchor: soft pastels for clean
beauty, premium dark for luxury beauty
```
### Vertical 4 — Beauty Devices (IPL, LED masks, etc.)
```javascript
Project name: [BRAND] Beauty Device Amazon System
Top angles to prioritize: At-Home Convenience,
$ Savings vs Salon, Professional Results, Safe
on All Skin Tones, 30-Day Transformation
Image stack defaults: bathroom + bedroom device
demo, before/after for lifestyle
Brand palette anchor: clean tech (whites +
brand accent) for premium positioning
```
### Vertical 5 — Kitchen / Food Products
```javascript
Project name: [BRAND] Kitchen Amazon System
Top angles to prioritize: Taste Reaction,
Ingredient Origin / Quality, Daily Ritual,
Convenience, Premium Craft
Image stack defaults: kitchen counter golden
hour for lifestyle, ingredient macro + recipe
for ingredients
Brand palette anchor: warm + appetizing
(amber, cream, deep red)
```
### Vertical 6 — Premium Beauty (Luxury fragrance, prestige skincare)
```javascript
Project name: [BRAND] Premium Beauty Amazon
System
Top angles to prioritize: Sensory Experience,
Heritage / Craft Story, Premium Ingredients,
Iconic Moments, Gift / Special Occasion
Image stack defaults: editorial luxury
photography for lifestyle, bottle/jar macro for
ingredients
Brand palette anchor: champagne + deep navy +
gold accents
```
---
## ⚙️ The Amazon-Specific Image Specs
Every image must meet Amazon's spec requirements or it gets rejected.
<table header-row="true">
<tr>
<td>Spec</td>
<td>Requirement</td>
</tr>
<tr>
<td>Dimensions</td>
<td>Minimum 1000×1000 pixels (square). 2000×2000 recommended for zoom feature</td>
</tr>
<tr>
<td>File format</td>
<td>JPEG, TIFF, or PNG (JPEG recommended for size)</td>
</tr>
<tr>
<td>Background</td>
<td>Pure white (#FFFFFF) for main image. Brand-palette acceptable for secondary images</td>
</tr>
<tr>
<td>Product coverage</td>
<td>Product must fill 85% of frame for main image</td>
</tr>
<tr>
<td>File size</td>
<td>Under 10MB</td>
</tr>
<tr>
<td>Color profile</td>
<td>sRGB</td>
</tr>
<tr>
<td>Naming</td>
<td>Use product ASIN + descriptor (e.g. "B0XXXXX_hero_clean_energy.jpg")</td>
</tr>
<tr>
<td>Text in image</td>
<td>Allowed on secondary images. Hero image text limited to product label + tagline</td>
</tr>
</table>
Amazon rejects images that violate these specs. Build them into the GPT Image 2 prompts (Claude does this automatically in the master Skill).
---
## ⚙️ Side-By-Side: Single-Angle Listing vs Multi-Stack Listing
<table header-row="true">
<tr>
<td>Element</td>
<td>Standard Single-Angle Listing</td>
<td>Multi-Stack Listing (This System)</td>
</tr>
<tr>
<td>Total images deployed</td>
<td>7</td>
<td>25-35 (across carousel + A+ Content)</td>
</tr>
<tr>
<td>Buyer angles tested</td>
<td>1</td>
<td>5-8</td>
</tr>
<tr>
<td>A/B test setup required</td>
<td>Yes (Amazon Experiments, 2 images max at a time)</td>
<td>None (carousel rotation = native testing)</td>
</tr>
<tr>
<td>Time to winner identification</td>
<td>4-8 weeks</td>
<td>7-14 days</td>
</tr>
<tr>
<td>Creative production cost</td>
<td>$2K-$5K per refresh</td>
<td>Claude + GPT Image 2 subscription</td>
</tr>
<tr>
<td>Iteration cycle</td>
<td>2-3 weeks per refresh</td>
<td>60-90 min per refresh</td>
</tr>
<tr>
<td>Conversion lift driven by</td>
<td>Creative director intuition</td>
<td>Amazon's algorithmic data</td>
</tr>
</table>
The mechanism: more variance in the carousel = more data = faster winner identification. Standard listings give the algorithm 7 data points (mostly variations of 1 angle). Multi-stack gives 25-35 across 5+ angles.
---
## ⚙️ The Algorithmic Test Reading Matrix
After 7-14 days of carousel rotation, read the winning data.
<table header-row="true">
<tr>
<td>Signal</td>
<td>What To Look For</td>
<td>Interpretation</td>
</tr>
<tr>
<td>Search query CTR by image</td>
<td>Which image gets clicked most from search</td>
<td>Hero of winning angle</td>
</tr>
<tr>
<td>Time on PDP after image click</td>
<td>Which image leads to longest dwell</td>
<td>Winning angle's full stack is engaging</td>
</tr>
<tr>
<td>Add-to-cart rate by image</td>
<td>Which image converts to cart</td>
<td>Winning angle's hero + benefits combo</td>
</tr>
<tr>
<td>Purchase rate by image position</td>
<td>Which carousel position drives purchases</td>
<td>Tells you which images deserve top positions</td>
</tr>
<tr>
<td>Helium 10 image rotation tracking</td>
<td>Which angle Amazon shows most often</td>
<td>Amazon's algorithm has identified the winner</td>
</tr>
</table>
Once a clear winner emerges (1 angle outperforming others by 20%+ in CTR + conversion):
1. Move winning angle's full 5-stack to the primary 7-slot carousel
2. Update A+ Content to feature winning angle as the headline narrative
3. Deprecate (but don't delete) losing angles — useful as variants for future refresh
4. Update next listing refresh to weight toward winning angle's pattern
The system compounds. Each refresh cycle gets smarter.
---
## ⚙️ The Integration Playbook
The Amazon Listing System is the **Amazon-specific conversion layer** of your DTC creative stack.
### Recommended weekly cadence per active listing:
→ Monday: Run Angle Mapping for 1-2 new product launches OR re-run for existing listings<br>→ Tuesday: Generate 25 images in GPT Image 2 (parallel where possible)<br>→ Wednesday: Upload to Amazon listing<br>→ Thursday-Friday: Let carousel rotation run<br>→ Next Monday: Hour-7-day data check<br>→ Following Monday: Hour-14-day data check + reinforce winning angle
### Where this slots into Eugenio's existing stack:
<table header-row="true">
<tr>
<td>Layer</td>
<td>Tool</td>
<td>Job</td>
</tr>
<tr>
<td>Meta/TikTok ad creative</td>
<td>Higgsfield + MakeUGC + Claude</td>
<td>Paid social testing layer</td>
</tr>
<tr>
<td>Brand cinematic</td>
<td>Lovart + Higgsfield Pitch Deck</td>
<td>Brand pillar pieces</td>
</tr>
<tr>
<td>Amazon listing creative (this system)</td>
<td>Claude + GPT Image 2</td>
<td>Amazon-specific conversion layer</td>
</tr>
<tr>
<td>Product page hero (DTC site)</td>
<td>6-angle composite + Premium Poster</td>
<td>DTC PDP + paid social</td>
</tr>
<tr>
<td>Long-form video</td>
<td>51-second UGC playbook</td>
<td>Conversion + retention</td>
</tr>
</table>
This system is the only one purpose-built for Amazon's algorithm. Everything else is for paid social or DTC PDP.
---
## ⚙️ What NOT to Do
→ Don't skip the customer review mining for Angle Mapping. Real review language is the gold for surfacing angles that ACTUALLY convert. Without it, you're guessing.
→ Don't generate 25 images without brand palette HEX locking. Inconsistent palette across images breaks brand recognition in the carousel.
→ Don't fabricate testimonial quotes for the Reviews image. Use real customer review excerpts only. Amazon rejects fake testimonials + it violates TOS.
→ Don't put unsubstantiated claims in image text. Amazon polices this. Stick to what's in your product specs.
→ Don't deploy all 25 images to the primary 7-slot carousel. Use the 7 slots for the strongest-predicted angle. Use A+ Content for the other 4 angles.
→ Don't run Amazon Experiments at the same time as carousel rotation. Pick one testing mechanism. Native rotation is faster.
→ Don't reinforce a winning angle before 7-14 days of data. Early signal can be noise. Wait for stability.
→ Don't update brand palette mid-refresh. Lock it for the full 25-image generation. Update between cycles only.
→ Don't expect every refresh to find a new winner. Sometimes the original angle wins again. The system value is in the speed of validation.
→ Don't replace your existing DTC creative workflows with this. The Amazon system is purpose-built for Amazon. Meta/TikTok creative still needs its own systems.
→ Don't skip the Amazon image specs check. Wrong dimensions or background color = rejected upload.
---
## ⚙️ Troubleshooting
<table header-row="true">
<tr>
<td>Problem</td>
<td>Fix</td>
</tr>
<tr>
<td>Angle Mapping output feels generic</td>
<td>Add 20+ recent customer reviews to project memory. Real review language drives specific angles.</td>
</tr>
<tr>
<td>Images don't render with locked brand palette</td>
<td>Reinforce HEX codes + repeat the palette anchor in every GPT Image 2 prompt.</td>
</tr>
<tr>
<td>Lifestyle images show wrong demographic</td>
<td>Model archetype too vague in prompt. Add age range, ethnicity, vibe, wardrobe specifics.</td>
</tr>
<tr>
<td>Benefits chart text garbled</td>
<td>GPT Image 2 mangles dense text. Render the benefits chart in Figma post-extraction.</td>
</tr>
<tr>
<td>Amazon rejects image</td>
<td>Spec violation (likely background color or dimensions). Verify each image meets specs before upload.</td>
</tr>
<tr>
<td>Hero image too text-heavy</td>
<td>Amazon prefers product-dominant hero. Reduce text to product label + 3-5 word tagline.</td>
</tr>
<tr>
<td>Carousel rotation doesn't show variance</td>
<td>Amazon's algorithm needs 5-7 days minimum to find patterns. Wait longer before judging.</td>
</tr>
<tr>
<td>Algorithm picks winner that surprises you</td>
<td>Trust the data. Buyer signal often differs from creative director intuition. Reinforce the winner.</td>
</tr>
<tr>
<td>Costs add up across 25 images</td>
<td>Run all 25 in parallel where possible. Use Claude to batch the prompts efficiently.</td>
</tr>
<tr>
<td>Reviews image testimonials look fake</td>
<td>Use real customer review excerpts with first names only. Add "verified buyer" badge.</td>
</tr>
<tr>
<td>Refresh cycle takes too long</td>
<td>Most time is in upload + Amazon approval (1-2 days). Generate images Monday, upload Wednesday for fastest cycle.</td>
</tr>
</table>
---
## ⚙️ The Daily / Weekly Production Cadence
This is the routine that runs 1-2 Amazon listing refreshes per week.
<table header-row="true">
<tr>
<td>Day</td>
<td>Time</td>
<td>Step</td>
<td>Output</td>
</tr>
<tr>
<td>Monday</td>
<td>9:00-9:15</td>
<td>Run Angle Mapping for 1 new/refresh product</td>
<td>5-8 angles ranked</td>
</tr>
<tr>
<td>Monday</td>
<td>9:15-9:45</td>
<td>Approve top 5 angles + run Multi-Stack Generation</td>
<td>25 GPT Image 2 prompts</td>
</tr>
<tr>
<td>Monday</td>
<td>9:45-10:30</td>
<td>Generate 25 images in GPT Image 2 (parallel batches)</td>
<td>25 listing images</td>
</tr>
<tr>
<td>Monday</td>
<td>10:30-10:45</td>
<td>Spec validation + minor Figma touch-ups</td>
<td>Amazon-ready images</td>
</tr>
<tr>
<td>Tuesday</td>
<td>9:00-9:15</td>
<td>Upload to Amazon listing (main carousel + A+ Content)</td>
<td>Live listing</td>
</tr>
<tr>
<td>Tuesday</td>
<td>Onwards</td>
<td>Amazon rotation runs natively</td>
<td>Data accumulates</td>
</tr>
<tr>
<td>7 days later</td>
<td>9:00-9:15</td>
<td>First data check in Brand Analytics + Helium 10</td>
<td>Initial signal</td>
</tr>
<tr>
<td>14 days later</td>
<td>9:00-9:30</td>
<td>Confirm winner + reinforce in primary carousel</td>
<td>Winning angle scaled</td>
</tr>
</table>
Run 1-2 refreshes per week per active listing. Compounding intelligence as project memory updates with confirmed winners.
---
## 🎯 Closer
**Install the Claude Skill into a Project. Upload product specs + brand kit + competitor analysis + customer review themes to Project Knowledge. Run Step 1 — Angle Mapping. Approve top 5 angles. Run Step 2 — Multi-Stack Generation. Get 25 paste-ready GPT Image 2 prompts. Generate 25 listing images. Upload to Amazon. Let the algorithm rotate. Check data at day 7. Reinforce winners at day 14. By end of month 1 you'll have data-validated winning angles for every product in your Amazon catalog. By end of month 3 you'll have compounding listing intelligence calibrated to your specific Amazon buyer behavior.**
The 7-image single-angle listing was the bottleneck.
The 25-image multi-stack with algorithmic rotation is what fixes it.
---
**The Claude Skill system prompt + Angle Mapping prompt + Multi-Stack Generation prompts (5 image types) + 6 vertical templates + Amazon image specs + algorithmic test reading matrix is the full system. Bookmark this guide. Run it weekly.**
---
