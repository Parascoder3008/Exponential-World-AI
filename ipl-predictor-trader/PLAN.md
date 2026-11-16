# Plan: in-play T20 trader on Betfair Exchange

Decisions this plan is built on (your answers, 2026-11-16):

| Question | Your choice |
|---|---|
| Target | Profit over many trades; individual trades can lose |
| Execution | Fully automatic, real money |
| Venue | Betfair Exchange |
| Coverage and data | All T20 leagues, free live data |

## What "9.9 out of 10" will mean here

Not "every trade wins". No system does that, and one that claims to is hiding its
losses. The measurable version:

- positive return over at least 300 trades at real Betfair prices,
- a 90% confidence interval on that return that sits above zero,
- no single day losing more than a fixed cap,
- every number produced walk-forward, never on data the model was fitted to.

If the system cannot reach that bar on paper, it does not get real money. That
outcome is possible and the plan is built to find it out cheaply.

## What the evidence says so far

- The in-play model is well calibrated (held-out log loss 0.532; the reference-repo
  approach scores 0.582).
- Turnaround matches are common: in 44% of 415 matches both sides traded at 3.0 or
  longer. The second bet in those matches locks in about +124 per 100 staked.
- The matches that do not turn lose about 95 per 100. Net at fair prices: about
  zero. After spread and commission: -3.4%.
- So turnarounds only pay if the market misprices how likely they are. Whether it
  does is unknown until we look at real prices. That is Phase 3.

## Phases

Each phase ends with something pushed to GitHub and a number you can check.

### Phase 1 - A stronger in-play model (no outside access needed)

Add the factors that can be measured from ball-by-ball data. Each one stays only if
it lowers held-out log loss; anything that does not is dropped and listed.

- Who is batting: quality of both batters, how set each one is, partnership so far.
- Who is bowling: quality of the current bowler, overs each bowler has left, how
  much of the attack's best bowling remains.
- Phase of play: powerplay, middle, death, and how each side performs in each.
- Batting depth still to come, not just wickets in hand.
- Venue: par score, chasing bias, boundary rate.
- A "swing likelihood" estimate: how volatile the rest of this match is likely to be.

Also: extend from IPL to all major T20 leagues (Big Bash, SA20, ILT20, PSL, CPL,
The Hundred excluded as it is not T20). Needs the Cricsheet archive; this
environment currently blocks cricsheet.org, so I will ask you to approve that one
host.

Done when: held-out log loss is reported per league, with a table of which factors
earned their place.

### Phase 2 - Real-time engine, proven on replays

- A live session: ball events in, model probability out, trade decisions out.
- Replay mode: feed any past match through it ball by ball, as if live. This is how
  the engine is tested before any live match exists.
- Paper ledger: every simulated bet, hedge, and settled result, saved to disk.
- Stale-data guard. This matters more than any model feature: free scores lag the
  market by 15 to 60 seconds, so after a wicket the price moves before the score
  does and the model sees a fake edge. The engine will refuse to trade when the
  score is older than a few seconds or the price has just jumped.

Done when: a full season replays end to end with results identical to the
backtester.

### Phase 3 - Real prices (needs your Betfair account)

- Betfair price stream connector, read-only.
- Recorder: every live T20 match, save score and price together with timestamps.
  This builds the dataset that does not exist anywhere for free.
- Historical Betfair price files, to measure on real odds: how often do both sides
  trade above 3.0, and is that more or less often than the prices imply? This is
  the direct test of the turnaround idea.
- Factors that need outside data: dew and weather from a free weather archive,
  day or night start.

Done when: the report shows model against real market prices, and the turnaround
table is rebuilt from real odds.

### Phase 4 - Paper trading on live matches

Big Bash starts in mid-December, then SA20, ILT20, PSL and the IPL in March. The
engine trades every match on paper at the live Betfair price.

Done when: 300 paper trades are logged. Then one of two things is true:

- The bar above is met. Go to Phase 5.
- It is not. I report why, and we change the strategy or stop. No real money.

### Phase 5 - Real money, small and capped

- Order placement through Betfair's official interface.
- Hard limits enforced in code: stake per trade, open exposure per match, loss per
  day, and a kill switch that hedges everything and stops.
- Starts at the minimum stake. Stakes rise only after a further 300 real trades
  still meet the bar.
- Runs on a machine of yours or a small server, not in this session, because the
  session shuts down when idle.

## Things that could stop this

| Risk | What it means |
|---|---|
| Betfair does not accept residents of some countries, India among them | If that is you, automatic trading on Betfair is not available and I will not build a way around it |
| The market is sharper than the model | The most likely outcome. Phase 3 measures it before any money is involved |
| Free live scores are too slow | Fine for paper trading. Real money needs a fast paid feed (roughly 50 to 150 US dollars a month); decide at Phase 5 |
| Betfair's live interface key has a one-off fee | A few hundred pounds; the delayed key used in Phases 3 and 4 is free |
| Betfair delays in-play bets by a few seconds | Prices can move before the bet is matched; the paper ledger will model this |
| Betting law | Your responsibility to confirm for where you live before Phase 5 |

## What I need from you, and when

| When | What |
|---|---|
| Phase 1 | Approve network access to cricsheet.org when prompted |
| Phase 3 | A Betfair account and a (free) delayed application key, entered through the secure credential form, never in chat |
| Phase 5 | A live key, a funded account, a machine to run it on, and your confirmation that real-money betting is legal where you live |
