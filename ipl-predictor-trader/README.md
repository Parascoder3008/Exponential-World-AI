# IPL predictor and trader

Win-probability models for the IPL plus an odds-trading engine: value entries,
hedging to an equal result on both outcomes ("greening up"), stop-losses,
bookmaker arbitrage, and a walk-forward backtester.

Started from two public repos
([beingpratheek/IPL-win-probability-predictor](https://github.com/beingpratheek/IPL-win-probability-predictor),
[sanidhyajadaun/IPL-Match-Winner-Prediction](https://github.com/sanidhyajadaun/IPL-Match-Winner-Prediction))
and rebuilt the parts of them that do not hold up.

**Where this is going:** see [PLAN.md](PLAN.md) for the roadmap to a live in-play trader.

## Read this first

1. **Nothing here has been tested against real betting odds.** No free historical
   ball-by-ball IPL odds exist in this repo. The trading results are a stress test
   against *simulated* markets. Whether this makes money is an open question until
   you run it on real prices.
2. **Before the match, the model is a coin flip.** On 2021-2026 it picked the winner
   49.8% of the time; an Elo rating scored 49.5%. That is not a bug: once both sides
   have played five games, the side with the better record that season has won only
   51.6% of the time (702 matches since 2008). There is no pre-match trade here.
3. **In play, the model is good and well calibrated** - and much better than the
   reference repos' approach. A good model is still not an edge. An edge is knowing
   something the market does not.
4. **Hedging cannot make every trade green.** A hedge locks in whatever the price
   move gave you. If the price moved against you, it locks in a loss on both
   outcomes. Against an efficient simulated market the rule ended green on 4% of
   trades and red on 81%.
5. **Nothing here places bets.** It gives probabilities, stakes and hedge sizes. You
   would place the bets yourself. Check the law where you live first: several
   countries, India included, restrict or prohibit online betting.

## Results

Walk-forward on 2021-2026: each season is predicted by models trained only on earlier
seasons. Full tables in [reports/REPORT.md](reports/REPORT.md).

| | This project | Reference-repo approach | No skill |
|---|---|---|---|
| Pre-match accuracy (after toss) | 49.8% | - | 50.0% |
| In-play log loss (lower is better) | **0.532** | 0.582 | 0.693 |
| In-play, 2nd innings only | **0.423** | 0.468 | 0.693 |
| First-innings total, average miss | **16.9 runs** | - | 19.1 (par rate) |

Calibration: when the in-play model said 80-90%, the batting side won 84.7% of the
time; when it said 30-40%, 36.7%.

Trading rule against simulated markets (415 matches, 5% commission, 1-point spread):

| Simulated market | Market vs model | ROI on money risked | Trades ending green / red on both sides |
|---|---|---|---|
| Only as smart as the reference repos | much worse | +15.4% | 33% / 60% |
| Knows what this model knows, plus random mispricing | equal | +8.6% | 62% / 37% |
| Knows more than this model, plus random mispricing | better | +2.9% (72% chance of any profit) | 14% / 74% |
| Knows more, little mispricing | better | +1.1% (56%) | 5% / 80% |
| Efficient: knows more, no mispricing | better | -2.0% (36%) | 4% / 81% |

A liquid exchange market on the IPL most likely sits in the bottom rows.

## What was wrong with the reference repos

- **beingpratheek**: shuffles individual balls and splits them 80/20 at random, so
  balls from the same match land in both training and test sets. The model is
  graded on matches it has already seen the result of. The notebook's 80% accuracy
  comes from that. Scored honestly on later seasons, the same approach gets a log
  loss of 0.582.
- **sanidhyajadaun**: uses `player_of_match` and `result_margin` as inputs. Both are
  only known after the match is over.
- Both stop at 2019/2020 data. The average first-innings score has risen from 168 (2019) to 196 (2026).

## What this does differently

- **Data**: all 1,243 matches through the 2026 final, with playing XIs.
- **No leakage**: every feature is computed from earlier matches only, and tests
  enforce it (`tests/test_data_features.py`).
- **Era-adjusted**: scores are measured against a par score for the venue and season,
  so 180 in 2014 and 180 in 2026 are not treated as the same thing.
- **Simple on purpose**: there are about 1,200 independent results however many
  balls were bowled. Gradient-boosted trees overfit (0.569 to 0.637 on tuning seasons);
  regularised logistic regression on engineered features scored 0.566 and ships.
- **A trading layer**: Kelly staking, back/lay book-keeping with commission, hedge
  sizing, stop-loss, arbitrage scan, backtester.

## Quick start

```bash
cd ipl-predictor-trader
pip install -e ".[app,dev]"
ipl train                # ~15 seconds
pytest -q                # 52 tests
streamlit run app.py     # dashboard
```

## Commands

```bash
# Win probability and fair odds for a live match state
ipl predict-live --batting "Mumbai Indians" --bowling "Chennai Super Kings" \
    --venue "Wankhede Stadium" --innings 2 --score 96 --wickets 3 --overs 12.0 --target 181

# First innings: also prices an innings-runs line
ipl predict-live --batting "Punjab Kings" --bowling "Delhi Capitals" \
    --venue "Arun Jaitley Stadium" --innings 1 --score 88 --wickets 2 --overs 9.4 --line 195.5

# Trade advice: same state plus the prices you can get, plus any open bets
ipl advise --batting "Mumbai Indians" --bowling "Chennai Super Kings" \
    --venue "Wankhede Stadium" --innings 2 --score 96 --wickets 3 --overs 12.0 --target 181 \
    --back 1.60 --lay 1.62 --position "back@2.02x1000"

# Hedge calculator: what to place so both outcomes pay the same
ipl hedge --position "back@2.5x100" --back 1.98 --lay 2.00

# Arbitrage check across bookmakers (book:oddsA,oddsB)
ipl arb bookA:2.10,1.80 bookB:1.85,2.06 --stake 1000

# How often matches turn around, and what backing both underdogs earns
ipl swings

# Re-run the evaluation, or backtest on real odds once you have them
ipl evaluate
ipl backtest --odds-csv my_odds.csv --trades-out trades.csv
```

`--position` lists bets on the batting side: `back@price x stake`, comma separated.

## How the trade works

1. **Enter** when the model's probability beats the price you can actually get by at
   least 4 points after the spread. Stake is a quarter of Kelly, capped at 2% of
   bankroll.
2. **Hedge flat** with one opposite bet, sized so both outcomes pay the same, when
   the market reaches the model's view, or when the locked loss hits half the money
   at risk.

Arbitrage is the one trade that is positive on both sides without a forecast. It needs
two bookmakers whose best prices sum to under 100%, both bets accepted, and neither
account limited.

## Getting to a real answer

The backtester already accepts real prices. Supply a CSV with
`match_id, innings, balls_bowled, back_a, lay_a` (A = `team1` in `data/matches.csv`)
and run `ipl backtest --odds-csv`. Betfair sells historical exchange data; the work
is lining its timestamps up with balls, because the ball-by-ball data has none.
Paper-trade a season before staking anything.

## Not verified

- `ipl odds` (The Odds API client) is written to the documented response format and
  tested on a sample of that shape. It has not been run against the live service.
- The trading rule's settings were not tuned, because tuning them on simulated
  prices would be meaningless.

## Layout

```
src/iplquant/
  ingest.py     Cricsheet JSON -> data/matches.csv, data/balls.csv.gz
  data.py       loading, name clean-up, per-ball match state
  features.py   point-in-time ratings, form, venue, squad strength
  models.py     pre-match, in-play and innings-total models; walk-forward
  odds.py       odds maths, positions, hedging, arbitrage
  trader.py     the entry/exit rule
  backtest.py   market simulation, real-odds loader, backtest, summary
  swings.py     turnaround matches and the back-both-underdogs strategy
  report.py     evaluation -> reports/
  oddsfeed.py   The Odds API client (unverified)
  cli.py        the `ipl` command
app.py          Streamlit dashboard
```

Data: [Cricsheet](https://cricsheet.org), see [data/SOURCE.md](data/SOURCE.md).
