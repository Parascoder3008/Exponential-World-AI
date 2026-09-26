# Alpha-combination recipe: what it does and doesn't do

The screenshot "A Unified Framework for Alpha Extraction and Signal Combination"
is a reworded version of Kakushadze & Yu, *How to Combine a Billion Alphas*
(Journal of Asset Management, 2017; [arXiv:1603.05937](https://arxiv.org/abs/1603.05937)).

**What it is:** a recipe for choosing weights when you combine many trading
signals ("alphas") you already have. It does not measure randomness, and it
does not create an edge.

- Eqs. 1–6 describe how each signal's history moves together with the others
  (volatility and co-movement).
- Eqs. 7–9 take each signal's recent average return and remove the part that
  the co-movement explains.
- Eqs. 10–11 turn what's left into weights: w = η·ε/σ, with Σ|w| = 1.

Problems in the screenshot itself: `S_i` in eq. 12 is never defined, the
sentence starting "After" is never finished, and eq. 6 repeats eq. 4.

## Results (`python3 alpha_combination.py`, fixed seeds, runs in about 30 s)

| Test | Result |
|---|---|
| 200 pure-noise signals, 20 years walk-forward, 20 seeds | In-sample Sharpe **+115**. Out-of-sample Sharpe **−0.03**. |
| In-sample loss check (same noise runs, 4,740 monthly windows) | **0 / 4,740** lost money. The in-sample PnL equals d·η·‖ε‖², so it is never negative. |
| 200 signals with weak real edges (annual Sharpe ~ N(0.2, 0.5)) | Formula (M=60, d=20): **+2.00**. Equal weight: +2.29. Inverse volatility: **+2.61**. If the true edges were known: +8.79. |
| Same, paired by seed | The formula lost to inverse volatility in **8 of 10** seeds. Its weights changed by 94% of gross each month, vs 6% for inverse volatility. |
| N signals ≤ M periods | Weights are **identical to inverse-volatility weights** (difference ~1e-16). E(i) only sets one overall sign. |

How often the trailing d-day mean E(i) gets the sign wrong for a signal with a real edge:

| True annual Sharpe | d = 20 | d = 60 | d = 252 |
|---|---|---|---|
| 0.5 | 44% | 40% | 31% |
| 1.0 | 39% | 31% | 16% |
| 2.0 | 29% | 16% | 2% |

## Conclusion

This is the last layer of a trading system: it combines signals, it doesn't
make them. It only differs from inverse-volatility weighting when you have more
signals than time periods (N > M). Fed noise, it produces a backtest that can't
lose in-sample and makes nothing out of sample. All results are before
transaction costs, and they assume signal edges stay constant over time. Both
assumptions flatter the formula.
