# Plan: in-play T20 trader

Decisions this plan is built on:

| Question | Your choice |
|---|---|
| Target | Profit over many trades; individual trades can lose |
| Execution | Both: advise (you place bets) and automatic (the bot clicks) |
| Venue | A Betfair-style exchange website, through the browser; a demo account first |
| Coverage | All franchise T20 leagues like the IPL |
| Data | Free: Cricsheet history, live score and prices read off the exchange page |

## What "9.9 out of 10" will mean here

Not "every trade wins". No system does that, and one that claims to is hiding its
losses. The measurable version:

- positive return over at least 300 trades at real exchange prices,
- a 90% confidence interval on that return that sits above zero,
- no single day losing more than a fixed cap,
- every number produced walk-forward, never on data the model was fitted to.

If the system cannot reach that bar on the demo account, it does not get real money.

## What the evidence says so far (2026-11-17)

- 5,532 matches in 11 leagues. In-play held-out log loss 0.511 across leagues, 0.535 on
  the IPL (the reference-repo approach: 0.605 and 0.584). Well calibrated.
- Turnaround matches are common: in 44% of 2,447 held-out matches both sides traded at
  3.0 or longer. Backing both underdogs nets about zero at fair prices and -4.7% after
  spread and commission. The hint from the IPL alone that late first bets do better
  did not hold up across all leagues.
- Against simulated markets, the trading rule makes money only when the market knows
  no more than the model. Real markets probably know more. Only real prices settle it.

## Phases

### Phase 1 - Stronger model, all leagues - partly done

Done: all 11 leagues ingested (`ipl ingest`), league-aware par scores and chase bias, a
per-league offset in the in-play model, players carrying their record across leagues.

Still to do, each kept only if it lowers held-out log loss: who is batting and how set
they are, the current bowler and overs each bowler has left, batting depth to come,
phase of play.

### Phase 2 - Real-time engine and browser bot - done

- Live engine with a stale-score guard and paper ledger (`live.py`).
- Browser bot (`exchange/`): calibrate any Betfair-style page by clicking its elements
  once; read score and prices; modes advise, paper and execute; stake cap, daily loss
  limit, kill switch; fills booked at the price the page reports.
- Practice exchange (`ipl practice`) that replays a past match, so every mode can be
  rehearsed with no account. Tested end to end in a headless browser.

### Phase 3 - Real prices from the demo site - next, needs you

- Calibrate the demo site: `ipl calibrate --out site.json` on your computer.
- Run `ipl bot --mode paper --record ticks.csv` on every live T20 match. That builds
  the dataset that does not exist anywhere for free: real score and real prices side
  by side.
- After enough matches, rebuild the trading and turnaround tables from those real
  prices. This is the first real test of whether the strategy has an edge.

Leagues in season soon: Big Bash (from mid-December), SA20 and ILT20 (January),
PSL (spring), IPL (from March).

### Phase 4 - Execute mode on the demo account

The bot places bets itself on the demo account. Done when 300 trades are logged.
Then one of two things is true:

- The bar above is met. Go to Phase 5.
- It is not. I report why, and we change the strategy or stop.

### Phase 5 - Real money, small and capped

Only after Phase 4 meets the bar. Starts at the minimum stake with the code-enforced
limits; stakes rise only after a further 300 real trades still meet the bar. Runs on a
machine of yours, because this cloud session shuts down when idle.

## Things that could stop this

| Risk | What it means |
|---|---|
| The market is sharper than the model | The most likely outcome. Phase 3 measures it before any money is involved |
| The site's score widget lags its prices | The guard refuses to trade, so the bot trades rarely. Shows up in the paper ledger |
| The site changes its page | Re-run `ipl calibrate --update` |
| The site blocks automated use | Possible on any site without an official interface; advise mode still works |
| In-play bet delay | Prices move before a bet is matched; the bot books the matched price and skips unmatched bets |
| Betting law | Your responsibility to confirm for where you live before Phase 5 |

## What I need from you

| When | What |
|---|---|
| Phase 3 | Python on your computer, `pip install -e ".[browser]"` and `playwright install chromium`, then `ipl calibrate` on the demo site. Or connect your computer to this session through the Claude desktop app and I can drive those steps |
| Phase 3 | Run paper mode with `--record` on live matches and push or send me the CSV files |
| Phase 5 | A funded account, a machine to run it on, and your confirmation that betting is legal where you live |
