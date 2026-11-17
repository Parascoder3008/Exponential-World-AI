# In-play T20 predictor and trader

Win-probability models for 11 franchise T20 leagues (IPL, Big Bash, PSL, CPL, SA20,
ILT20, MLC, BPL, LPL, Vitality Blast, Super Smash), an odds-trading engine (value
entries, hedging to an equal result on both outcomes, stop-losses, arbitrage), and a
browser bot that reads a Betfair-style exchange page and either advises you, paper
trades, or clicks the bets itself.

Started from two public IPL repos
([beingpratheek/IPL-win-probability-predictor](https://github.com/beingpratheek/IPL-win-probability-predictor),
[sanidhyajadaun/IPL-Match-Winner-Prediction](https://github.com/sanidhyajadaun/IPL-Match-Winner-Prediction))
and rebuilt the parts of them that do not hold up. Roadmap: [PLAN.md](PLAN.md).

## Read this first

1. **Nothing here has been tested against real betting odds.** The trading results are
   a stress test against *simulated* markets. Whether this makes money is open until
   it has run on real prices.
2. **No trade wins every time.** A hedge locks in whatever the price move gave you; if
   the price moved against you it locks in a loss on both outcomes. Against an
   efficient simulated market the rule ended green on 4% of trades and red on 83%.
3. **The in-play model is good and well calibrated.** A good model is still not an
   edge. An edge is knowing something the market does not.
4. **The bot cannot tell a demo account from a real one.** In execute mode it clicks
   on whatever account the browser is logged into. Stake and loss limits are enforced
   in code; check which account is open before starting.
5. **Check the law where you live.** Several countries, India included, restrict or
   prohibit online betting.

## Results

Walk-forward on 2021-2026: each season is predicted by models trained only on earlier
seasons. Full tables, per league, in [reports/REPORT.md](reports/REPORT.md).

| | This project | Reference-repo approach | No skill |
|---|---|---|---|
| In-play log loss, all leagues (lower is better) | **0.511** | 0.605 | 0.693 |
| In-play log loss, IPL only | **0.535** | 0.584 | 0.693 |
| Pre-match accuracy, all leagues | 56.4% | - | 50.0% |
| Pre-match accuracy, IPL only | 48.1% | - | 50.0% |
| First-innings total, average miss | **16.3 runs** | - | 18.2 (par rate) |

Calibration: when the model said 80-90%, the batting side won 86.8% of the time; when
it said 30-40%, 36.1%. Pre-match picks are better than a coin flip in most leagues
(65% in the BPL, 62% in the Big Bash) but not in the IPL, SA20 or LPL.

Trading rule against simulated markets (2,447 matches, 5% commission, 1-point spread):

| Simulated market | ROI on money risked | Chance of any profit | Green / red on both sides |
|---|---|---|---|
| Only as smart as the reference repos | +30.6% | 100% | 31% / 59% |
| Knows what this model knows, plus random mispricing | +8.0% | 100% | 61% / 38% |
| Knows more than this model, plus random mispricing | -1.3% | 26% | 14% / 75% |
| Efficient: knows more, no mispricing | -5.2% | 2% | 4% / 83% |

A liquid exchange market most likely sits in the bottom rows. Turnaround matches
(both sides become the outsider) are common - in 44% of matches both sides traded at
3.0 or longer - but backing both underdogs nets about zero at fair prices and -4.7%
after costs.

## Trading from the browser

The bot runs on **your** computer, in a normal browser window you log into yourself.
It never sees or stores your password: the login lives in a browser profile folder on
your machine (`~/.iplquant/browser-profile`).

### 1. Install (once)

```bash
cd ipl-predictor-trader
pip install -e ".[browser,app,dev]"
playwright install chromium
ipl train                # about 15 seconds
```

### 2. Rehearse on the practice exchange (no account, no money)

```bash
ipl practice ipl-1535465        # replays the 2026 IPL final with simulated prices
# in a second terminal:
ipl bot --site practice_site.json --mode execute --yes-place-bets \
    --batting-first "Gujarat Titans" --bowling-first "Royal Challengers Bengaluru" \
    --venue "Narendra Modi Stadium"
```

Watch it read the score and prices, open a position, and hedge it on the page.

### 3. Calibrate your exchange site (once per site)

```bash
ipl calibrate --out site.json
```

A browser opens. Log in, open a live match's match-odds market, press Enter, then click
each item the terminal names: both team names, both back and lay prices, the score,
and the bet slip's stake box and Place button. While calibrating, those clicks are
captured and place nothing. Add `--read-only` to skip the bet slip if you only want
advise or paper mode.

### 4. Run a match

```bash
ipl bot --site site.json --mode advise \
    --batting-first "Mumbai Indians" --bowling-first "Chennai Super Kings" \
    --venue "Wankhede Stadium" --alias "MI=Mumbai Indians,CSK=Chennai Super Kings"
```

| Mode | What it does |
|---|---|
| `advise` | Beeps and prints each bet, price and stake for you to place by hand, and tells you when and how to hedge. Never clicks. |
| `paper` | Same decisions, recorded to `ledger.jsonl` only. Never clicks. |
| `execute` | Clicks the bet slip. Needs `--yes-place-bets`. Records the price the page actually matched. |

Limits enforced in code: `--max-risk` (money at risk per new position, default 100),
`--daily-loss-limit` (no new positions after this, default 300). To stop, press Ctrl+C
or create a file named `STOP` in the folder: the bot first hedges any open position at
the current price, then exits. If the score on the page cannot be read, or the price
moves without the score changing, the bot does not trade.

`--alias` maps the names the site shows to the team names in the data, when they
differ. `--batting-first` is the side that bats first: the model prices that side.

### 5. Watch every signal on the dashboard

```bash
ipl dashboard            # first run asks you to choose a password
```

Open http://127.0.0.1:8800 and log in. The bot writes every poll to `signals.jsonl`
and the page shows it live:

- a banner with the bet to place now (advise mode) or the bet just placed;
- model against market for both teams, with the edge and back/lay prices;
- a chart of model and market over the match;
- open position (what you win or lose either way, and what hedging now locks in),
  this match, today and all-time results;
- a feed of trade signals, or every signal including each hold and why.

Run the dashboard from the same folder as the bot, or pass `--signals <path>`.
Change the password with `ipl dashboard --set-password`. It is stored only as a
scrypt hash in `~/.iplquant/dashboard.json`; five wrong attempts lock that device out
for five minutes. To open it from your phone on the same Wi-Fi, use `--host 0.0.0.0`
and browse to your computer's address; that is plain HTTP unless you pass `--cert`
and `--key`, so only do it on a network you trust.

## Command line

```bash
# Win probability and fair odds for a live match state
ipl predict-live --batting "Mumbai Indians" --bowling "Chennai Super Kings" \
    --venue "Wankhede Stadium" --innings 2 --score 96 --wickets 3 --overs 12.0 --target 181

# First innings: also prices an innings-runs line
ipl predict-live --batting "Punjab Kings" --bowling "Delhi Capitals" \
    --venue "Arun Jaitley Stadium" --innings 1 --score 88 --wickets 2 --overs 9.4 --line 195.5

# One-off trade advice from a state and the prices you can get
ipl advise --prob 0.58 --back 2.02 --lay 2.04

# Hedge calculator: what to place so both outcomes pay the same
ipl hedge --position "back@2.5x100" --back 1.98 --lay 2.00

# Arbitrage check across bookmakers (book:oddsA,oddsB)
ipl arb bookA:2.10,1.80 bookB:1.85,2.06 --stake 1000

# How often matches turn around, and what backing both underdogs earns
ipl swings

# Run a past match through the live engine, ball by ball
ipl replay ipl-1535465

# Re-run the evaluation, or backtest on real odds once you have them
ipl evaluate
ipl backtest --odds-csv my_odds.csv --trades-out trades.csv
```

Dashboard (manual entry of score and prices): `streamlit run app.py`.

## What was wrong with the reference repos

- **beingpratheek**: shuffles individual balls and splits them 80/20 at random, so
  balls from the same match land in both training and test sets. Its 80% accuracy
  comes from that. Scored honestly on later seasons the same approach gets a log loss
  of 0.584 on the IPL.
- **sanidhyajadaun**: uses `player_of_match` and `result_margin` as inputs. Both are
  only known after the match.
- Both stop at 2019/2020. The average IPL first-innings score has since risen from
  168 (2019) to 196 (2026).

## What this does differently

- **Data**: 5,532 matches across 11 leagues, with playing XIs; players carry their
  record from league to league.
- **No leakage**: every feature uses earlier matches only, and tests enforce it.
- **Era- and league-adjusted**: scores are measured against a par for the venue and
  league, and the model has a per-league offset.
- **Simple on purpose**: gradient-boosted trees overfit; regularised logistic
  regression on engineered features won on tuning seasons and ships.
- **Live safety**: a stale-score guard, stake caps, a daily loss limit, a kill switch,
  and fills booked at the price actually matched.

## Not verified

- The bot has only run against the practice exchange in this repo. Your site's page
  will differ; calibration handles layout, but each site's bet slip may behave in ways
  not seen here. Run it in advise and paper mode first.
- `ipl odds` (The Odds API client) is tested on a sample payload only.
- The trading rule's settings were not tuned, because tuning them on simulated prices
  would be meaningless.
- Partially matched and unmatched bets are treated as not filled; the bot does not
  cancel or manage resting orders on the site.

## Layout

```
src/iplquant/
  ingest.py     Cricsheet JSON -> data/matches.csv, data/balls.csv.gz
  data.py       loading, name clean-up, per-ball match state
  features.py   point-in-time ratings, form, venue, squad strength
  models.py     pre-match, in-play and innings-total models; walk-forward
  odds.py       odds maths, price ladder, positions, hedging, arbitrage
  trader.py     the entry/exit rule
  live.py       live scoreboard, stale-score guard, paper ledger, match replay
  backtest.py   market simulation, real-odds loader, backtest, summary
  swings.py     turnaround matches and the back-both-underdogs strategy
  report.py     evaluation -> reports/
  oddsfeed.py   The Odds API client (unverified)
  exchange/     browser bot: site config, calibration, score reader, bot, practice exchange
  dashboard/    password-protected live dashboard of every signal
  cli.py        the `ipl` command
app.py          Streamlit dashboard
```

Data: [Cricsheet](https://cricsheet.org), see [data/SOURCE.md](data/SOURCE.md).
