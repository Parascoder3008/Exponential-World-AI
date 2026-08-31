# Phase 4 — Productize (12 months+)

**Goal:** the AI OS becomes something a stranger can buy and run without Paras in the room.

**The gate:** ten clients live on the Phase 2 installed OS. Not nine, and not "nearly ten with a couple in the pipeline."

---

## Three product forms, in order

```
  AGENT PACKS  ──────▶  INSTALLED OS  ──────▶  LICENSED OS
  low ticket            high ticket             subscription
  Skool-delivered       done-for-you            self-serve
  exists by Phase 1     exists by Phase 2       12 months+
  ────────────────────────────────────────────────────────
  margin: high          margin: high            margin: high after payback
  support: low          support: high           support: medium
  proof needed: some    proof needed: lots      proof needed: enormous
```

The order is not negotiable, and the reason is the last row. Each form requires more proof than the one before, and proof is the slowest input to acquire.

---

## Form 1 — Agent packs

**What:** the skills themselves, delivered through Skool, versioned as they improve.

Content Pack (the nine) · Commerce Pack (lead engine, funnel, webinar, nurture) · Money Pack (education-only).

**Why first:** it already exists. Every agent built in Phases 0–3 is inventory the moment it passes the 30-day rule. Building once and selling twice stops being a metaphor here and becomes literal — the agent that wrote this week's script is the agent in the pack.

**The constraint that protects it:** nothing enters a pack until it has run this business for 30 days. Packs shipping half-tested agents would destroy the thing the whole model rests on.

**Support burden:** low. Buyers who can run a skill can mostly help themselves, and the Skool community absorbs the rest.

---

## Form 2 — Installed OS

**What:** Paras's team builds and runs it inside a client's business. Already the Phase 2 offer; Phase 4 makes it repeatable rather than bespoke.

**What changes from Phase 2:** the install stops being a project and becomes a process — a scoped checklist, a standard timeline, a named deliverable set, a trained operator on the client side. That is what makes it delegable to a delivery lead instead of requiring Paras.

**Why it stays in the mix even after software exists:** it is the highest-margin, fastest-cash form, and it is the only one that keeps producing case studies. Software companies that abandon services lose their proof supply.

---

## Form 3 — Licensed OS

**What:** the client-facing product. Next.js dashboard plus Trigger.dev workers — `Claude Skills/new-client-system/` already scaffolds exactly this, with auth, dashboard, automations list, and Composio connection handling.

**When:** after the ten installs. Twelve months out at the earliest, and later is fine.

**What the ten installs produce that no amount of design work would:**

| From the installs | What it decides in the product |
|---|---|
| Which agents every client wanted | The default pack |
| Which they never used | What not to build |
| Where onboarding stalled | The setup flow |
| What broke unattended | The reliability work |
| What they asked to change | The configuration surface |
| What they'd pay monthly | Pricing |

That is the argument for the gate. Every one of those is expensive to guess and free to observe.

**The architectural bet already made:** P2 (Tenant Brain) is a per-client Brand Brain. Because K1 is a *document agents read* rather than instructions baked into each agent, multi-tenancy is pointing at a different document — a path change, not a rewrite. That decision was made in Sprint 0 specifically to make this phase cheap.

**Layer 4 agents:** Install Agent (P1), Tenant Brain (P2), Usage/Billing (P3), Client Success (P4).

---

## What could go wrong here

**Building it too early.** The most likely failure in the whole plan, because this is the most interesting problem and the one that feels most like a real company. A product with no distribution and no proven agents is a support burden attached to zero revenue.

**Abandoning services once software exists.** Services fund the software and produce the proof. The right end state is both.

**Competing on features.** By the time this ships there will be many AI-agency-in-a-box products. The defensibility is not the feature list — it is the loop: channel → pipeline → clients → case studies → channel. A competitor can copy the agents in a month and cannot copy four years of that loop.

**Support eating the business.** Self-serve software at a low price point with a high-touch buyer is the worst combination available. Either price for support or design the product so the community absorbs it. Skool already exists for exactly this.

---

## Sequencing summary

| When | Sell | Build |
|---|---|---|
| Phase 1 | Manual DFY, workshop | Content OS agents |
| Phase 2 | Installs, cohort | Commerce OS agents, first packs |
| Phase 3 | Installs, packs, Money OS education | Money OS agents |
| Phase 4 | Packs, installs, licences | The dashboard |

The through-line, the same in every row: **sell the manual version of the thing you are building the automated version of.** Revenue arrives first, and the product arrives having already been paid for.
