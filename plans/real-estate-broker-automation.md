# Real Estate Broker Automation — Build Plan

**Status:** Draft v1 · Owner: Exponential World AI · Target: Indian residential brokers / channel partners / developer sales teams

---

## 0. Read this before the plan

Three things in the original brief are wrong, and they are the exact things that kill these projects.

**0.1 — This is not five systems. It is one system with five behaviours.**
Lead capture, qualification, follow-up, booking and re-engagement are not five products. They are five *states* of a single lead record. If you build them as five tools stitched together, every seam becomes a place where a lead silently dies — and you will spend more time reconciling five sources of truth than selling. Build **one lead table + one state machine + one dashboard**. Everything else is a worker that reads and writes that table.

**0.2 — AI qualification must never reject a lead. It only re-orders the queue.**
The brief says "sales team will only talk to serious buyers." That premise is dangerous in real estate. Intent here is *manufactured* by the salesperson, not *detected* by a bot. A buyer who says "just looking, 6-8 months" converts at a lower rate — not a zero rate — and a good agent moves that timeline. If the bot marks them Cold and they drop out of the pipeline, you have silently deleted revenue and nobody will ever see it in a report.

The correct design: qualification produces a **score + structured fields + a priority tier**. Hot goes to a human in under 5 minutes. Warm goes into a nurture cadence. Cold goes into a long-cycle drip. *Nothing is ever deleted or hidden.* Only "wrong city / wrong budget by 5x / broker or job-seeker / bad number" is a true disqualification, and even that gets a human-reversible flag.

**0.3 — "Very simple" and "AI voice agent" are in tension. Sequence them.**
A voice agent is the highest-failure, highest-latency, highest-cost, hardest-to-debug component in this stack — Hindi/Hinglish code-mixing, noisy calls, DND rules, and unpredictable interruptions. If you make it the qualification gate in v1, your pilot fails on the voice agent and the client never sees the other 80% of value that actually works.

**Correct order: WhatsApp qualification first (v1), voice agent as fallback layer (v3).** Pick-up rates for unknown numbers in India are low; WhatsApp read rates are high, it is async, auditable, cheap, and it produces structured text you can score without an ASR step. The voice agent's real job is the 60-70% who *never reply on WhatsApp* and the after-hours window — that is a genuinely valuable niche, and it is a Phase 3 problem, not a Phase 1 one.

*Confidence: [Likely] on 0.2 and 0.3 — based on general funnel economics and the Indian channel mix, not on a measurement of this specific client. Instrument and verify in the pilot.*

**0.4 — The real bottleneck is probably not lead flow. It is site-visit conversion and agent discipline.**
Most brokers do not have a lead-capture problem. They have a "247 leads in a WhatsApp group and nobody called 190 of them" problem. So this system's most valuable output is not the AI — it is the **agent accountability layer**: who was assigned, how fast did they respond, what did they log, did the site visit happen. Build that on day one. If the client resists being measured, the project will fail regardless of how good the automation is, and you should know that before you quote.

---

## 1. The one-system architecture

```
                         ┌─────────────────────────────┐
   Meta Lead Ads ───┐    │                             │
   Instagram DM ────┤    │      INGEST LAYER           │
   Website form ────┼───▶│  normalise → dedupe →       │
   99acres / MB ────┤    │  consent stamp → store      │
   Housing.com  ────┤    └──────────────┬──────────────┘
   Missed call/IVR ─┤                   │
   Walk-in (manual)─┘                   ▼
                              ┌───────────────────┐
                              │   LEADS TABLE     │◀── single source of truth
                              │  + state machine  │
                              └─────────┬─────────┘
                                        │
        ┌───────────────┬───────────────┼───────────────┬────────────────┐
        ▼               ▼               ▼               ▼                ▼
  ┌───────────┐  ┌────────────┐  ┌───────────┐  ┌────────────┐  ┌──────────────┐
  │ QUALIFY   │  │  ASSIGN    │  │ FOLLOW-UP │  │  BOOKING   │  │ RE-ENGAGE    │
  │ WhatsApp  │  │ round-robin│  │  cadence  │  │ slot picker│  │ post-visit,  │
  │ bot → LLM │  │ + SLA timer│  │  engine   │  │ + reminders│  │ revival, ref │
  │ (voice v3)│  └────────────┘  └───────────┘  └────────────┘  └──────────────┘
        │               │               │               │                │
        └───────────────┴───────────────┴───────────────┴────────────────┘
                                        ▼
                        ┌───────────────────────────────┐
                        │  ONE DASHBOARD                │
                        │  Owner view · Agent view      │
                        │  SLA breaches · funnel · calls│
                        └───────────────────────────────┘
```

**Everything is event-driven off one table.** No worker talks to another worker. They all read the lead, act, write back a state + an activity row. This is the single most important architectural decision in the document — it is what makes the system debuggable and what lets you add the voice agent later without rewriting anything.

---

## 2. Recommended stack

You already have `new-client-system`, `trigger-dev` and `n8n` skills in this repo. Use them — do not invent a new stack per client.

| Layer | Choice | Why |
|---|---|---|
| DB | **Postgres** (Supabase or Neon) | Relational, row-level security, realtime for the dashboard, cheap |
| Backend jobs | **Trigger.dev v3** | Durable long-running workflows, scheduled runs, retries, delays measured in days — exactly what a follow-up cadence needs. Cron + queues without babysitting infra |
| Frontend | **Next.js 16** (the `new-client-system` template) | Already your house style; one dashboard, two roles |
| Messaging | **WhatsApp Cloud API** via Meta directly, or a BSP (AiSensy / Interakt / Gupshup / Wati) | Direct = cheaper + full control. BSP = faster to launch, easier template management, non-technical staff can use the shared inbox. **Recommend BSP for client #1, direct API once you have 3+ clients** |
| Voice (Phase 3) | Vapi / Retell / Bland for orchestration; Sarvam AI or ElevenLabs for Hindi TTS/STT | Evaluate Hindi/Hinglish quality on *real recorded client calls* before promising anything |
| Calendar | Cal.com (self-hostable, API-first) or Google Calendar API | Cal.com if you need round-robin across agents with their own availability |
| Telephony | Exotel / Knowlarity / MyOperator | Call masking, call recording, missed-call capture, click-to-call from dashboard. Recording is what makes agent coaching possible |
| Observability | Trigger.dev run history + a `lead_activity` audit table | Every state change must be attributable |

**Do not use** a spreadsheet as the database, and do not use n8n as the primary orchestrator for the follow-up cadence. n8n is excellent for the ingest adapters (portal webhooks, email parsing, quick glue) but multi-day stateful cadences with retries belong in Trigger.dev. *[Likely] — n8n can do it with wait nodes, but debugging a 14-day paused execution is miserable compared to a durable task.*

---

## 3. Data model

Minimum viable schema. Resist adding fields until a real workflow needs them.

```sql
-- 3.1 The lead
leads (
  id                uuid pk,
  created_at        timestamptz,
  source            text,        -- meta_lead_ad | instagram_dm | website | 99acres |
                                 -- magicbricks | housing | missed_call | walkin | referral
  source_campaign   text,        -- ad set / project name / portal listing id
  full_name         text,
  phone_e164        text,        -- normalised +91XXXXXXXXXX, this is the dedupe key
  email             text,
  city              text,

  -- qualification fields (filled by bot, agent, or both)
  budget_min        int,         -- in INR
  budget_max        int,
  configuration     text,        -- 1BHK | 2BHK | 3BHK | 4BHK+ | plot | commercial
  preferred_areas   text[],
  purpose           text,        -- end_use | investment
  timeline          text,        -- immediate | 1_3_months | 3_6_months | 6_plus | unclear
  funding           text,        -- self | loan_needed | loan_approved | unclear
  site_visit_ready  boolean,

  -- system fields
  state             text,        -- see 3.2
  score             int,         -- 0-100
  tier              text,        -- hot | warm | cold | disqualified
  disqualify_reason text,
  assigned_agent_id uuid,
  assigned_at       timestamptz,
  first_response_at timestamptz, -- for the SLA clock. THE metric.
  next_action_at    timestamptz, -- drives the cadence engine
  consent_source    text,        -- what the user actually agreed to, for DPDP
  consent_at        timestamptz,
  do_not_contact    boolean default false,
  dedupe_of         uuid         -- points to the original lead if this is a re-enquiry
)

-- 3.2 Every state change and every touch, append-only
lead_activity (
  id, lead_id, at, actor,        -- 'system' | 'bot' | agent uuid
  type,                          -- state_change | whatsapp_out | whatsapp_in |
                                 -- call_attempt | call_connected | note | visit_logged
  channel, payload jsonb, outcome text
)

agents (id, name, phone, whatsapp, active, capacity_per_day, territories text[], working_hours jsonb)
projects (id, name, developer, locality, price_min, price_max, configs text[], rera_id, brochure_url, location_url)
site_visits (id, lead_id, agent_id, project_id, slot_start, status, cab_required, feedback, outcome, next_step)
```

### 3.2 The state machine — this is the product

```
NEW
 └─▶ CONTACT_ATTEMPTED        (auto WhatsApp fired within 60s)
      ├─▶ ENGAGED             (lead replied)
      │    └─▶ QUALIFIED      (enough fields captured + scored)
      │         └─▶ ASSIGNED  (human agent owns it, SLA clock starts)
      │              └─▶ CONNECTED         (agent actually spoke to them)
      │                   └─▶ VISIT_BOOKED
      │                        ├─▶ VISIT_DONE
      │                        │    ├─▶ NEGOTIATION ─▶ BOOKED(sale) ─▶ CUSTOMER
      │                        │    └─▶ NOT_INTERESTED ─▶ NURTURE_LONG
      │                        └─▶ VISIT_NO_SHOW ─▶ REBOOK_ATTEMPT
      │              └─▶ UNREACHABLE  (n call attempts failed) ─▶ VOICE_AGENT_QUEUE (v3)
      └─▶ NO_RESPONSE (no reply after full cadence) ─▶ NURTURE_LONG ─▶ REVIVAL (90d)

Terminal-ish: CUSTOMER, DISQUALIFIED, DNC
NURTURE_LONG and REVIVAL always loop back. Nothing is ever truly dead.
```

**Rule: a lead may never sit in a state with `next_action_at IS NULL` unless it is terminal.** A nightly job that finds violations and screams at you in Slack is worth more than any AI feature in this document.

---

## 4. Layer 1 — Lead capture

This is the layer that will consume more of your build time than you expect. Not because it is hard, but because *every source behaves differently and the client's access to each one is uncertain.*

| Source | Mechanism | Reality check |
|---|---|---|
| **Meta Lead Ads** (FB + IG forms) | Graph API webhook `leadgen` → fetch by `leadgen_id`. Real-time. | [Certain] Cleanest path. Needs Business Manager admin + `leads_retrieval` permission + app review or a system user token. Test with Meta's Lead Ads Testing Tool. |
| **Website forms** | Post directly to your API endpoint, or webhook from the form tool | [Certain] Trivial. Also capture UTM params — you will want source attribution later. |
| **Instagram / FB DMs** | Messenger Platform webhook | [Likely] Works but messy: half of DMs are not leads. Route through a light intent classifier before creating a lead record. |
| **99acres / MagicBricks / Housing / NoBroker** | Portal-provided lead API or CRM integration — **availability depends on the client's subscription tier** | [Likely] **This is your biggest unknown. Verify per-client before quoting.** Portals gate API/CRM push behind higher plans and a support request. |
| **Portal fallback** | Parse the lead notification emails they send to a dedicated inbox | [Likely] Ugly but reliable and vendor-independent. Gmail API or IMAP → regex/LLM extract → normalise. **Build this as the default; treat a working portal API as a bonus.** |
| **Missed call / IVR** | Exotel or MyOperator webhook on inbound call | [Certain] Underrated in India. A missed-call number on a hoarding is still a high-intent lead source. |
| **Walk-in / offline / broker network** | A 30-second form in the dashboard, or a WhatsApp message from the agent to a bot number | [Certain] Do not skip this. If offline leads live outside the system, the dashboard lies. |

### 4.1 Ingest rules (non-negotiable)

1. **Normalise the phone number** to E.164 first, before anything else. `+91`, `0`, `91`, spaces, `+91 0`. This is your identity key.
2. **Dedupe on phone within a rolling window.** Same number in <90 days = the *same* lead, new activity row + `re_enquiry` event — not a new record. Same number after 90 days = new lead with `dedupe_of` pointing back, because they may genuinely be re-entering the market. Duplicate leads are the number one cause of two agents calling the same buyer and looking like amateurs.
3. **Stamp consent at ingest.** Store what they agreed to and when. DPDP Act 2023 makes this a legal requirement, not a nicety.
4. **Never lose a payload.** Write the raw inbound JSON to a `raw_events` table *before* parsing. When a parser breaks at 2 AM, you replay; you do not lose the day's leads.
5. **Ingest must be idempotent.** Portals and Meta both retry webhooks. Key on the source's own event id.

---

## 5. Layer 2 — Qualification

### 5.1 The 60-second auto-response (the highest-ROI thing in this entire document)

Within 60 seconds of ingest, fire a WhatsApp template. Not a call. Not an email. A WhatsApp message, from the broker's business number, personalised with the project they enquired about.

Why this matters more than any AI: response speed dominates outcome in every lead-response study of the last decade. *[Likely] — the widely-cited "contact within 5 minutes" research is US B2B, so treat the direction as sound and the magnitude as unverified. Measure it yourself: your dashboard will have `first_response_at`, so you can prove it for this client within 60 days.*

### 5.2 The qualification conversation

Seven fields. That is all you need. Anything more and drop-off rises.

1. **Budget** — range, not a number. Give buttons: `Under ₹50L` / `₹50L–1Cr` / `₹1–2Cr` / `₹2Cr+`
2. **Configuration** — 1/2/3/4BHK / plot / commercial
3. **Preferred locality** — offer the 5-6 areas the broker actually operates in, plus "other"
4. **Purpose** — end use vs investment (changes the entire pitch)
5. **Timeline** — immediate / 1-3m / 3-6m / 6m+
6. **Funding** — self-funded / loan needed / loan pre-approved
7. **Site visit readiness** — "would this weekend work?" — the single best intent signal

**Use interactive WhatsApp buttons and lists, not free text, for 1-6.** Buttons give you structured data with zero parsing risk and a much higher completion rate than open questions. Use the LLM for: handling off-script replies, Hinglish comprehension, answering "what is the price?", and extracting fields when someone dumps everything in one paragraph. Do not use the LLM to *ask* the questions when a button will do.

### 5.3 Scoring

Keep it a transparent weighted rubric, not a black box. The broker must be able to look at a score and understand it, or they will not trust the queue order.

```
timeline:      immediate 30 | 1-3m 22 | 3-6m 12 | 6m+ 5   | unclear 8
budget fit:    within inventory range 25 | stretch ±20% 12 | far off 0
site visit:    said yes 20 | maybe 10 | no 0
funding:       pre-approved 10 | loan needed 6 | unclear 3
purpose:       end use 8 | investment 6 | unclear 4
engagement:    replied within 10 min 7 | within 1 hr 4 | later 2

HOT   ≥ 65  → assign to human agent NOW, SLA 5 minutes
WARM  35-64 → assign within 2 working hours, standard cadence
COLD  < 35  → long nurture, weekly value drip, revisit in 30 days
```

Store the score **and the component breakdown** in the activity log. When the client says "your AI is wrong," you open the row and show them the arithmetic. Re-tune the weights after 90 days using actual site-visit-to-booking data — the initial weights above are an informed starting point, not truth. *[Guessing] on the exact numbers; [Certain] that you must re-fit them from real outcomes.*

### 5.4 Where the voice agent actually belongs (Phase 3)

Not as the gate. As the **rescue layer**, for three specific jobs:

- **The non-responders.** Lead did not reply to WhatsApp within 24h → outbound AI call in Hindi/English, single objective: get *one* piece of information (timeline or budget) and offer a slot. 60-90 seconds max.
- **After-hours.** Lead comes in at 11 PM. WhatsApp goes out immediately; AI call goes out at 9:30 AM next morning before the human team has cleared their queue.
- **Bulk revival.** 2,000 dead leads in an old Excel file. No human is calling those. An AI agent working through them at ₹5-10/call to find the 3% who re-entered the market is genuinely economic.

**Hard requirements before you promise a voice agent to a client:**
- Test on *their* recorded calls, in *their* accent mix, before quoting. Hinglish code-switching is where these systems break.
- Under ~1.5s response latency, or the caller hangs up.
- Barge-in / interruption handling must work.
- Mandatory AI disclosure at the top of the call, and instant handoff to a human on request.
- DND/NDNC scrubbing and calling-hours compliance (9 AM–9 PM).
- Every call recorded, transcribed, and written back to `lead_activity`. A voice agent that does not write structured output back to the lead record is a toy.

---

## 6. Layer 3 — Assignment and the SLA clock

The automation the client will actually *feel*.

- **Round-robin with weighting** — by territory, project specialisation, current open-lead load, and working hours. Do not assign to an agent who is off, or who already has 40 untouched leads.
- **Assignment notification** — WhatsApp to the agent + push in the dashboard, with a one-tap click-to-call.
- **SLA timers with escalation:**
  - Hot lead untouched in **5 minutes** → re-notify agent
  - **15 minutes** → reassign to the next agent in rotation
  - **30 minutes** → alert the sales manager, log an SLA breach against the original agent
- **Weekly SLA leaderboard**, auto-posted to the team WhatsApp group. Not to shame people — to make response time a visible number that agents compete on. *This changes behaviour faster than any feature you will build.*
- **Call masking** through the telephony provider so agents cannot take the client's leads with them when they leave. Brokers care about this more than you expect — lead leakage is a real and expensive problem, and it is a strong reason for the owner to buy.

---

## 7. Layer 4 — Follow-up cadence

Rules, not vibes. Encode them once; the engine runs them forever. `next_action_at` drives everything; a single Trigger.dev scheduled task picks up due leads every 5 minutes.

**HOT — no reply after qualification**
```
T+0min    WhatsApp: project details + brochure + location pin
T+5min    Agent call attempt #1
T+2hr     WhatsApp: "tried calling, when should I call?" + 3 time buttons
T+1day    Agent call attempt #2 (different time of day)
T+2day    WhatsApp: price sheet / offer / availability update
T+4day    Agent call attempt #3
T+7day    Final WhatsApp: "shall I keep you posted or close this?" (explicit opt-out)
          → no reply → NURTURE_LONG
```

**WARM** — same shape, stretched over 21 days, fewer calls, more content.
**COLD / NURTURE_LONG** — one useful message every 10-14 days: new launches in their locality, price trends, loan rate changes, a completed-project video. Value, not "sir, are you interested?". Every message carries a one-tap "book a visit" and a one-tap "stop".

**Cadence rules that prevent this becoming spam:**
- Never more than 1 automated message per 24h. Hard cap.
- 9 AM–8 PM only, respecting Sunday preferences (weekends are actually *good* for site-visit offers).
- Any inbound reply **pauses all automation instantly** and hands to the human. Nothing is worse than a bot talking over a live conversation.
- Any "stop"/"not interested"/"remove" → `do_not_contact = true`, immediately, no confirmation loop.
- Every WhatsApp template must be pre-approved by Meta; utility-category templates are far cheaper than marketing-category, so structure the cadence to be genuinely utility where possible. *[Likely] — verify current category pricing, Meta changed the model in 2025.*

---

## 8. Layer 5 — Booking

Simple, and mostly not an AI problem.

- **Slot picker link** (Cal.com), sent inside WhatsApp. Shows only slots where the assigned agent *and* the project's site team are free.
- Booking writes a `site_visits` row + calendar invite to the agent + confirmation to the buyer with **location pin, agent name and photo, what to carry (ID, cheque if booking), and parking/cab info.**
- **Reminder ladder:** T-24h, T-3h, T-30min. No-shows are the single biggest waste in real estate sales, and reminders measurably reduce them. *[Likely]*
- **Cab / pickup coordination** if the broker offers it — capture pickup address at booking time, not on the morning of the visit.
- **Reschedule in one tap.** More valuable than the original booking flow: a buyer who can reschedule with a tap reschedules; one who has to call, ghosts.
- **Post-visit feedback capture is mandatory** — a 2-minute structured form for the agent (liked / concerns / budget objection / competitor comparison / next step / probability). This is the fuel for Layer 6. If agents will not fill it, gate their next lead assignment on it.

---

## 9. Layer 6 — Retention, re-engagement, referral

The layer everyone plans and nobody builds. Build it in Phase 2, not "later" — because it is where the margin is.

**Post-visit, didn't buy (the biggest bucket)**
- Day 1: thank you + the specific objection addressed (from the feedback form)
- Day 3: 2-3 alternative properties matching their stated concern
- Day 10: price/availability update on the unit they saw
- Day 30+: monthly locality drip until they buy, ask to stop, or 12 months pass

**Dead-lead revival**
- Quarterly sweep of every `NURTURE_LONG` lead older than 90 days
- Trigger-based, not calendar-based: new launch in their preferred locality, price drop, home-loan rate cut, possession announcement. A *reason to call* converts; "just following up" does not.
- This is the ideal AI-voice-agent workload (see 5.4).

**Post-booking / customer**
- Milestone updates (agreement, registration, construction stage, possession) — these are utility messages, cheap, and they build the relationship that produces referrals
- Possession + 30 days: referral ask, with a defined incentive
- Anniversary of possession: check-in + referral ask
- Investor customers: annual portfolio note — investors buy repeatedly and are systematically under-farmed by brokers

**Referral loop**
- Unique referral link per customer, pre-filled WhatsApp share text
- Referred leads enter as `source = referral` with a **score bonus and top-of-queue priority** — they convert far better than paid leads
- Transparent incentive tracking so the referrer can see status without calling to ask

---

## 10. Requirements checklist

### 10.1 From the client — get these *before* you write code
Chase them hard. Missing access is the #1 cause of timeline slip on this kind of project.

- [ ] Meta Business Manager **admin** access; FB Page + IG business account linked; existing lead forms
- [ ] Website access or GTM container for form + UTM capture
- [ ] Portal accounts (99acres / MagicBricks / Housing) — **confirm in writing whether their plan includes lead API/CRM push**; if not, a dedicated inbox for email parsing
- [ ] A **dedicated phone number for WhatsApp Business API** — must not be active on the WhatsApp consumer or Business app. This trips up almost every project.
- [ ] Facebook Business verification (documents; takes days, sometimes weeks — start on day one)
- [ ] DLT / TRAI entity registration + header + template registration, if SMS is in scope
- [ ] Export of the existing CRM / Excel / WhatsApp-group lead history
- [ ] Agent roster: names, numbers, territories, working hours, daily capacity
- [ ] **Project/inventory master data** — name, developer, locality, configs, price bands, RERA number, brochure, location pin. *Most brokers do not have this in a clean form. Budget real time for it — the qualification engine is worthless without it, since "budget fit" scoring needs a price range to fit against.*
- [ ] Approved messaging copy in English + Hindi, and sign-off on tone
- [ ] Named owner on the client side who can make decisions. If it's the founder and they're never available, the project stalls.

### 10.2 Compliance — India
*[Likely] on specifics; have the client confirm with their own counsel. Do not treat this section as legal advice.*
- **DPDP Act 2023** — consent capture at source, purpose limitation, deletion on request, breach notification. Store consent text + timestamp per lead.
- **TRAI / DLT** — SMS requires registered entity, header and templates. Unregistered SMS simply will not deliver.
- **DND / NDNC** — scrub before outbound calling; 9 AM–9 PM calling window.
- **WhatsApp Business Policy** — opt-in required; template pre-approval; quality rating can throttle or ban a number that gets blocked too often. **Design the cadence to avoid blocks — a banned number takes the client's whole channel down.**
- **RERA** — advertising and disclosure obligations; project RERA number should appear in promotional messages.
- **AI disclosure** on voice calls, plus human handoff on request.

### 10.3 Team requirements — say this out loud in the sales call
The system does not replace the sales team; it exposes it. The client must commit to:
- Agents responding inside the SLA and logging outcomes
- A manager reviewing the SLA report weekly
- Someone owning inventory data freshness
- 2-3 weeks of behaviour change while people stop working out of WhatsApp groups

**If the client will not commit to these, decline or reprice. This is not a technical risk — it is the risk that decides whether the project succeeds.**

---

## 11. Build plan

### Phase 0 — Discovery (1 week)
Shadow the team for two days. Map the *actual* current flow, count leads by source, measure current response time and site-visit conversion. **Get baseline numbers.** Without a baseline you can never prove the system worked, and you will not get the renewal or the case study.

### Phase 1 — Capture + instant response + one dashboard (Weeks 2-4)
Ingest from the top 2-3 sources. Dedupe. 60-second auto WhatsApp. Round-robin assignment + SLA timers + escalation. One dashboard: live lead list, agent view, SLA breach report. Manual entry for walk-ins.

**Ship this and stop.** Do not build qualification yet. Phase 1 alone typically delivers most of the visible improvement, because it fixes leads-going-nowhere. Let the client feel that before you add anything clever.

### Phase 2 — Qualification + cadence + booking (Weeks 5-8)
WhatsApp button-based qualification flow + LLM fallback for off-script replies. Scoring and tiering. Full follow-up cadence engine. Slot booking + reminder ladder. Post-visit feedback form. Basic re-engagement.

### Phase 3 — Voice agent + full retention (Weeks 9-14)
Outbound AI voice for non-responders, after-hours, and bulk revival. Complete retention/referral loops. Scoring re-fit against real outcome data. Attribution reporting: cost per lead → per qualified lead → per site visit → per booking, by source.

### Phase 4 — Productise (ongoing)
Extract the client-specific bits into config. Templates, cadences, scoring weights, project data — all config, no code. Target: **client #2 live in under 2 weeks.** This is where a services project becomes a business.

---

## 12. Cost model
*[Guessing] on all figures — verify current pricing before quoting. Directionally useful, not a quote.*

**Monthly running cost, ~1,000 leads/month:**

| Item | Est. ₹/month |
|---|---|
| WhatsApp messages (~6 templates/lead, mixed utility/marketing) | 4,000 – 12,000 |
| BSP platform fee (if used) | 2,000 – 8,000 |
| Postgres (Supabase/Neon) | 0 – 2,500 |
| Trigger.dev | 0 – 2,500 |
| Hosting (Vercel) | 0 – 2,000 |
| LLM (qualification + extraction) | 1,500 – 5,000 |
| Telephony (masking, recording, ~2,000 calls) | 3,000 – 10,000 |
| Cal.com | 0 – 1,500 |
| **Subtotal (no voice agent)** | **₹11k – 44k** |
| Voice agent, if added (~600 calls × 2 min) | +15,000 – 45,000 |

**Note the economics:** the voice agent can cost as much as the entire rest of the stack. That is the strongest possible argument for Phase 3 sequencing — prove ROI on the cheap layers first, then let the client fund the expensive one out of demonstrated gains.

**Your pricing:** ₹1.5–4L setup + ₹25–60k/month retainer is defensible *if* you can show a baseline-vs-after number. Which is exactly why Phase 0 exists.

---

## 13. Metrics — the dashboard that justifies the invoice

**Owner view (5 numbers, nothing else):**
1. Median first-response time (target: under 5 min for hot)
2. % leads contacted within SLA (target: 95%+)
3. Lead → site visit % (this is the money metric)
4. Site visit → booking %
5. Cost per booking, by source

**Manager view:** SLA breaches by agent, open leads by agent, overdue actions, no-show rate, feedback-form completion rate.

**Agent view:** exactly two things — *my leads due now* and *my bookings today.* Nothing else. An agent dashboard with more than two things on it does not get used.

---

## 14. How this fails (and the counter-move)

| Failure mode | Counter |
|---|---|
| Agents keep working out of WhatsApp groups | Kill the group in week 1. Assignment only through the system. Owner must enforce, and must say so publicly. |
| Portal API access turns out not to exist | Build email parsing as the default path. Never make an API you haven't tested a dependency of the timeline. |
| WhatsApp number gets blocked/quality-throttled | Frequency caps, instant opt-out, utility templates, monitor quality rating daily, keep a backup number verified. |
| AI over-filters and kills real leads | AI never disqualifies — it only orders the queue. Audit a sample of Cold leads monthly with a human. |
| Inventory data is stale, so scoring is nonsense | Named owner + a weekly freshness check that flags projects untouched in 30 days. |
| Voice agent fails on Hinglish | Test on the client's real recordings *before* quoting. Ship it as an add-on, never as a Phase 1 dependency. |
| Client sees no ROI because there was no baseline | Phase 0. Non-negotiable. Refuse the project without it. |
| Duplicate leads → two agents call one buyer | Phone-normalised dedupe at ingest, before anything else runs. |

---

## 15. Immediate next actions

1. Pick **one** pilot broker. Not three. One, with 300+ leads/month and an owner who will enforce process.
2. Run Phase 0. Come back with baseline response time and site-visit conversion.
3. In parallel, start Facebook Business verification and WhatsApp number provisioning — these have the longest lead times and zero engineering content.
4. Confirm in writing which portal integrations are actually available on their subscription.
5. Scaffold the repo from `new-client-system` (Next.js dashboard + Trigger.dev worker). Build the leads table and the state machine first — everything else attaches to it.
