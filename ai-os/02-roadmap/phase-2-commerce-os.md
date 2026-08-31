# Phase 2 — Commerce OS (days 121–210)

**Goal:** automate what Phases 0–1 ran by hand, and turn the channel's output into paid installs.

**The revenue phase.** Content OS is the moat; this is where it gets charged for.

---

## The agents

| # | Agent | Status | Weeks |
|---|---|---|---|
| M1 | Offer Architect | build | 1–2 |
| M2 | Funnel / Landing | wire `build-premium-website` | 2–3 |
| M3 | Lead Engine | **exists** — move to a schedule | 3–4 |
| M4 | Webinar | wire `paras-webinar-builder` | 4–5 |
| M5 | Nurture (GHL + WhatsApp) | build | 5–7 |
| M6 | Sales Assistant | build | 7–8 |
| M7 | Onboarding / Delivery | wire `new-client-system` | 8–10 |
| M8 | **Case Study Capture** | build | 10–11 |
| M9 | Support | wire `customer-support` | 11–12 |

M3 is the one that changes least and matters most — it is already complete, including sourcing rules, the 4C rubric, the audit template, outreach with the credibility bridge, and pipeline tracking. The work is scheduling it and keeping the Paras-reviews-every-send constraint intact while it runs unattended.

**M8 is the one people skip.** It is the join between back end and front end: delivery produces results, results become proof, proof becomes content, content produces the next client. Delivery that generates no proof asset is delivered at half value.

---

## Runtime migration

This is the phase where always-on work moves off skills.

| Moves to n8n / Trigger.dev | Stays a skill |
|---|---|
| Lead Engine sourcing runs | Offer design |
| Nurture sequences | Webinar building |
| Scorecard pulls | Sales call prep |
| Comment / DM monitoring | Case study writing |
| Publish scheduling | Anything with voice or judgment |

Migration rule, per [`../01-architecture/stack.md`](../01-architecture/stack.md): 30 days as a skill first, spec current, watched for a full cycle after moving, **and the skill is kept** — it is Phase 4 product inventory even after the automated version takes over.

---

## The 13 weeks

| Weeks | Focus | Lands |
|---|---|---|
| **1–3** | Offer and front door | Ladder priced and written. Landing pages live with tracking. |
| **3–5** | Pipeline | Lead Engine scheduled. Webinar agent producing decks and registration copy. |
| **5–7** | Follow-up | Nurture live in GHL + WhatsApp. Speed-to-lead under 5 minutes. |
| **7–8** | Sales | Sales Assistant producing call briefs and proposals. |
| **8–10** | Delivery | Onboarding scaffold. First installs delivered on a repeatable process. |
| **10–12** | The loop closes | Case Study Capture running. Support agent live. |
| **13** | Review | Unit economics per channel. Phase 3 planned. |

---

## The commercial target

**Ten paid installs of Content OS by the end of the phase.**

Ten is not arbitrary — it is the gate on Phase 4. A product built on fewer than ten real installs is built on guesses about what clients need.

Route to ten:
- Inbound from the channel (13 weeks of Phase 1 content compounding)
- The Wednesday workshop, which by now qualifies buyers automatically
- Lead Engine outbound, scheduled and Paras-reviewed
- Referrals from the first three installs — the cheapest and most-neglected source

Price per [`../00-strategy/offer-ladder.md`](../00-strategy/offer-ladder.md) rung 4: project fee for the build, retainer for running it. Priced against the headcount it replaces or the revenue it unlocks, never against hours.

---

## What "installed OS" means

Concretely, so it can be scoped and quoted:

1. **4C audit** — the free wedge, already the outreach offer
2. **Brand Brain for their business** — their voice, offers, proof, ICP. The per-client memory layer.
3. **Content OS agents wired to their channels** — the same nine, pointed at their brand
4. **30–60 days running it with them**, not handing over a folder
5. **Handover to their operator**, or a retainer if they would rather not have one

Step 2 is where the Phase 4 architecture gets validated. Every install is a manual Tenant Brain (P2). By the tenth, the pattern is known well enough to automate — which is the entire reason ten is the gate.

---

## Exit criteria

1. Ten paid installs delivered
2. Lead Engine running scheduled, with bounce rate under 3%
3. Speed-to-lead under 5 minutes on every inbound
4. Every install produced a case study asset
5. Unit economics known per channel — CAC and payback for organic, paid, outbound and referral
6. Content OS still publishing twice a week throughout

Criterion 6 is the one at risk. Phase 2 is the phase where revenue work crowds out the channel, and the channel is what makes the revenue work possible. Guard the Tue/Fri slots.
