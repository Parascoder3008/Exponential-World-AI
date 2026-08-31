# Agent Specs — The Content Loop (wire, not build)

Five agents that already exist as `paras-*` skills. Each gets its own full spec once wired; this file records **what wiring means** for each, so the Phase 1 work is unambiguous.

**"Wire" means three things, for every agent here:**

1. It reads Brand Brain (K1) before producing anything
2. Its output feeds the next agent without being reformatted by hand
3. The named human QA runs it — not Paras

---

## C1 · Research — `paras-research`

**Job:** saturation analysis, content gap, three ranked angles, competition-vs-opportunity score.
**Trigger:** Saturday deep work, and on demand.
**QA:** Paras.

**Wiring work**
- Read positioning and never-say from Brand Brain, so off-position topics get flagged before research starts
- Emit angles in the format Angle Bank (C2) will consume — vertical, emotional trigger, effort, payoff
- Cross-link against the existing scripted-video library so every video closes or opens a loop

**Preserve:** the net-score gate — >7.5 make it, 6–7.5 refine, <6 pass. And the pushback rules: deep-technical topics without business framing get flagged as off-position before any research happens.

---

## C3 · Script — `paras-script-writer`

**Job:** full script in Hinglish voice, retention-engineered, 3E balanced.
**Trigger:** after Research lands an approved angle.
**QA:** Paras.

**Wiring work**
- Voice comes from Brand Brain rather than from the skill's own copy — one source, one place to correct drift
- Pull open loops from Brand Brain so promised topics actually get made
- Emit in the shape Packaging (C4) and Editor Brief (C6) consume

**Watch for:** the first agent-written script should be compared honestly against a hand-written one on retention. Record the delta in week 5–6 either way. If it is worse, that is data, not a reason to stop.

---

## C4 · Packaging — `paras-titles-thumbnails`

**Job:** titles and thumbnail briefs. Mobile-truncation checked, emotional triggers varied.
**Trigger:** after script approval.
**QA:** Paras.

**Wiring work**
- Read the recent-title history so the same emotional trigger isn't used three videos running
- Feed swap candidates to Performance (C11) for A/B testing
- Emit the thumbnail frame reference into Editor Brief

**Highest-leverage agent in the loop.** CTR gates everything downstream — a 2% improvement here is worth more than a 20% improvement almost anywhere else in the system.

---

## C8 · Repurpose — `paras-repurpose`

**Job:** one video → LinkedIn, IG carousel, X thread, FB, WhatsApp, GMB. Native voice per platform.
**Trigger:** T+24h after publish.
**QA:** **Operator** — this is the first agent Paras hands over entirely.
**Hard limit:** never the same text across platforms. Native or nothing.

**Wiring work**
- Two voices from Brand Brain: Hinglish for the creator audience, English for LinkedIn's client audience
- Bundle as one task, never six
- Skool drop carries **the actual agent**, not a description of it — that is what makes the membership justify itself weekly

---

## C9 · Publish — `paras-publishing-package`

**Job:** description, chapters, tags, pinned comment, Skool post, Community Tab, GHL email — the 48-hour protocol.
**Trigger:** publish day, 9am IST.
**QA:** Operator.
**Hard limit:** **Brand Guard (K4) output is a required input, not an optional preflight.** Nothing publishes without passing the gate.

**Wiring work**
- Current offers and CTAs from Brand Brain, so no video ships with a stale price
- Promise-checker output writes back to Brand Brain's open-loops section
- UTMs on every link, without exception — Scorekeeper depends on it

**The first two hours cannot be scheduled.** Comment replies in that window are a ranking input and a community signal at once, and they need a person.

---

## Also in Phase 1

**C7 · Shorts** — `paras-shorts-selector`. Picks 3–5 highest-retention cuts and specs them. Wires off the same footage analysis as Editor Brief. QA: editor.

**C11 · Performance** — `paras-ctr-audit`. CTR/AVD against the 4% / 6% / 8% targets at day 30/60/90, three swap options per underperformer, systemic pattern flags. Feeds Scorekeeper and Monday planning. QA: Paras.

---

## The full chain

```
C1 Research → C2 Angle Bank → C3 Script → C4 Packaging → film/C5 render
   → C6 Editor Brief → [EDITOR] → C7 Shorts → C8 Repurpose
   → K4 Brand Guard → C9 Publish → C10 Community → C11 Performance → K3 Scorekeeper
                                                                          ↓
                                                                    back to C1
```

The loop closes at Scorekeeper. An open chain produces content; a closed one produces content that gets better.
