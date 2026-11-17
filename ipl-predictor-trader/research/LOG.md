# Improvement log: IPL and Big Bash

Tuning = walk-forward seasons 2017-2022 on IPL+BBL matches (671 matches). Exam =
2023-2026, looked at only after a change is accepted. Accept rule: tuning log loss
down by at least 0.001 and P(better) >= 0.90 (paired bootstrap over matches).

Starting point: tuning log loss 0.5322 (IPL 0.5547, BBL 0.5044).

## Iteration 1 (2026-11-17): score-line tweaks - nothing accepted

| Experiment | Tuning log loss | Delta | P(better) | IPL | BBL |
|---|---|---|---|---|---|
| IPL+BBL weighted x2 | 0.5326 | +0.0004 | 0.03 | 0.5551 | 0.5047 |
| IPL+BBL weighted x4 | 0.5329 | +0.0008 | 0.02 | 0.5556 | 0.5050 |
| Recency 0.9^age | 0.5320 | -0.0001 | 0.59 | 0.5550 | 0.5038 |
| Recency 0.8^age | 0.5319 | -0.0002 | 0.59 | 0.5556 | 0.5027 |
| C = 0.002 / 0.05 / 0.3 | 0.5323 / 0.5322 / 0.5322 | ~0 | <0.45 | | |
| Momentum: last 6 and 30 balls, dot share | 0.5322 | +0.0000 | 0.40 | 0.5549 | 0.5043 |
| Wickets x phase, required rate x wickets | 0.5325 | +0.0003 | 0.14 | 0.5552 | 0.5045 |

Reading: training on all leagues beats focusing on IPL/BBL, and the score-line model is
close to what a linear model can extract. Next: a resources-remaining table, per-league
calibration, a residual tree model, then scorecard features (who is batting/bowling).

Rating: 5.0/10 (prediction 2/3, correctness 1/1, live readiness 2/2, real prices 0/4).
