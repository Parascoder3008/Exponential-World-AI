# Scorecard: how close is this to a 9.9/10 system?

A rating only means something if each point is earned by evidence. Ten points:

| Area | Points | How it is earned |
|---|---|---|
| Prediction quality | 3 | Exam-season (2023-2026) log loss on IPL+BBL vs the starting model and the reference repos; calibration within 2 points in every bin |
| Correctness | 1 | No leakage (tests), every number walk-forward |
| Live readiness | 2 | Bot, guard, limits, dashboard tested end to end; live inputs available for every feature the model uses |
| Evidence against real prices | 4 | 0 until real odds are recorded. 2 when 100+ recorded IPL/BBL matches show the model beating the market price on log loss or a stable mispricing. 4 when 300 paper trades meet the bar in PLAN.md |

The last 4 points cannot be earned in this container: they need prices recorded from
the exchange during real matches (`ipl bot --mode paper --record ticks.csv`). Without
them the honest ceiling is 6/10.

## Current rating

See the latest entry in LOG.md.
