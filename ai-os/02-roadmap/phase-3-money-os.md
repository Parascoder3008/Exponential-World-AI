# Phase 3 — Money OS (90 days)

**Goal:** know exactly which money the business makes and where surplus goes, then build the market side as education and own-capital tooling.

**Scope boundary, set once and enforced throughout:** education plus Paras's own capital. No advisory-for-fee, no managing anyone else's money. See [`../00-strategy/risks-and-constraints.md`](../00-strategy/risks-and-constraints.md) §5.

---

## Two halves, in this order

**Business money first.** Unit economics, allocation, runway. Unglamorous, immediately useful, and it makes every decision in Phases 1–2 retroactively measurable.

**Market money second.** Screener, backtest, execution, risk. Where the FRM Level-1 / NSE Technical Analyst / F&O credential set lives, and where the second audience is.

Inverting this is tempting because the market side is more interesting. It is also how a business ends up with a sophisticated trading stack and no idea which marketing channel pays.

---

## The agents

| # | Agent | Job | Weeks |
|---|---|---|---|
| $1 | **Unit Economics** | P&L per channel, CAC, LTV, payback, runway | 1–3 |
| $2 | **Allocation** | Rules — % to ops, ads, reinvestment, reserve, personal | 3–4 |
| $6 | **Money Compliance** | Gates every Money OS output against the education-only boundary | 4–5 |
| $3 | **Screener** | Fundamental + technical research, the proven 5-tool stack | 5–7 |
| $4 | **Backtest** | Strategy testing, Pine Script generation, result capture | 7–9 |
| $5 | **Execution** | Paper first; live only on own capital, hard-gated | 9–11 |
| — | Money OS education product | Packaging the above into the rung-6 offer | 11–13 |

**$6 comes before $3, $4 and $5, not after.** A compliance gate built after the thing it gates has already shipped is a review, not a gate.

---

## $1 — Unit Economics (the one that matters most)

Not a trading agent. The business's own P&L, per channel.

Questions it must answer every month:

| Question | Why it changes behaviour |
|---|---|
| CAC by channel — organic, paid, outbound, referral | Tells you where the next rupee goes |
| Payback period per channel | A 9-month payback at this cash position is a no |
| LTV by offer rung | Tells you which rung to push |
| Revenue per video | Makes the content investment legible |
| Cost per agent run | Cheap now; will not always be |
| Runway | The number that decides how brave to be |

Most businesses this size cannot answer any of these and compensate with conviction. The scorecard from Phase 0 already collects the raw inputs — $1 turns them into decisions.

---

## $2 — Allocation

Rules decided in advance, in writing, so they are not decided in the moment.

Shape (percentages to be set, not prescribed here): operations and payroll · ad spend · reinvestment into the business · reserve · personal, of which a portion is the capital the market side runs on.

The discipline is that the reserve and the reinvestment line are decided *before* a good month, not during one.

---

## $3–$5 — The market side

Built on the method already proven in the webinar: **five tools, four steps each — Access → Configure → Execute → Output.** Perplexity for sector research, ChatGPT for reasoning and shortlisting, Grok for head-to-head comparison, Claude for valuation and statements, Gemini for real-time news and sentiment.

Each ships with a copy-paste prompt, because **the prompts are the product and the tool is just the container.**

$4 extends into Pine Script strategy generation and backtesting — TradingView setup, indicator application, signal generation, and a captured backtest result. The existing webinar already demos a moving-average crossover end-to-end; the agent version makes it repeatable.

$5 is paper-trading first. Live execution runs on Paras's own capital only, behind an explicit gate, and never on anyone else's.

---

## The education product

Rung 6 of the ladder. Curriculum, prompts, screeners, backtesting method, Pine Script strategies — the tooling and the method, run by the buyer on their own capital.

Content constraints, all of them non-negotiable and all already in `paras-webinar-builder`:

- **No performance guarantees.** No "consistent monthly returns", no ROI promises. Outcomes are framed as skill and process.
- **Market-risk disclaimer** on any Indian-market campaign.
- **Broker-partner requirements confirmed, never assumed**, on any co-branded campaign.
- **Demo before offer.** A real prompt run and a real backtest before any price appears.

---

## The channel question

Trading content pulls a different audience than SMB AI content. Introducing it too early muddies the positioning at the point where clarity is producing growth.

By Phase 3 the channel has ~26 weeks of consistent SMB-AI positioning behind it, which is enough that a second theme reads as range rather than drift. Two ways to handle it, decide before publishing:

- **Same channel, clearly-labelled series** — simplest, keeps the audience, some dilution
- **Separate channel or playlist** — cleaner positioning, starts from zero on reach

Recommendation: same channel, labelled series, and watch the retention data on the first three. The audience will answer the question faster than analysis will.

---

## Exit criteria

1. Unit economics answerable monthly for every channel, without assembly
2. Allocation rules written and followed for a full quarter
3. Money Compliance gate live **before** any market-side agent ships anything public
4. Screener and Backtest running on Paras's own capital, with results logged
5. Education product built and sold at least once
6. Content OS and Commerce OS still running — publishing held, installs delivered

Criterion 6 again. Each new phase is a new opportunity to drop the previous one.
