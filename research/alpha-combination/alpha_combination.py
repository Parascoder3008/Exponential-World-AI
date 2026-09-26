#!/usr/bin/env python3
"""Stress test of the recipe in "A Unified Framework for Alpha Extraction and
Signal Combination" (the 12-equation screenshot).

That recipe restates Kakushadze & Yu, "How to Combine a Billion Alphas"
(Journal of Asset Management, 2017; arXiv:1603.05937). It turns the return
histories of N trading signals you already have ("alphas") into weights for
combining them. The experiments below check three claims:

  1. It is not a randomness test. Fed pure noise, it still returns weights,
     and its in-sample profit is non-negative by construction.
  2. With real but weak edges, the trailing-mean estimate E(i) is mostly
     noise, so the result depends on how much history you feed it.
  3. With no more signals than periods (N <= M), the weights collapse to
     inverse-volatility weights: the E(i) values only contribute one sign.

Run:  pip install numpy && python3 alpha_combination.py
"""
from math import erf, sqrt

import numpy as np

DAYS_PER_YEAR = 252
HOLD = 21  # re-estimate weights every 21 trading days (~monthly)


def combine_weights(R, d):
    """Weights for N alphas from their (N, M) return history, following the
    screenshot's equations (1)-(11). Returns w with sum(|w|) = 1."""
    N, M = R.shape
    X = R - R.mean(axis=1, keepdims=True)               # (1) demean each alpha over time
    sigma = np.sqrt((X ** 2).mean(axis=1))              # (2) volatility
    Y = X / sigma[:, None]                              # (3) normalize
    Y = Y[:, : M - 1]                                   # (4) rows of X sum to 0: drop one period
    Lam = Y - Y.mean(axis=0, keepdims=True)             # (5) demean across alphas
    Lam = Lam[:, : M - 1]                               # (6) a no-op with this indexing
    E = R[:, M - d:].mean(axis=1)                       # (7) expected return = trailing d-period mean
    E_norm = E / sigma                                  # (8)
    beta = np.linalg.lstsq(Lam, E_norm, rcond=None)[0]  # (9) regress on Lam, no intercept
    eps = E_norm - Lam @ beta
    w = eps / sigma                                     # (10)
    return w / np.abs(w).sum()                          # (11) eta chosen so sum(|w|) = 1


def equal_weights(R):
    return np.full(R.shape[0], 1.0 / R.shape[0])


def inverse_vol_weights(R):
    inv = 1.0 / R.std(axis=1)
    return inv / inv.sum()


def simulate(rng, N, T, annual_sharpe, n_factors=5, factor_share=0.3):
    """(N, T) daily alpha returns with uneven volatilities, a common-factor share
    of variance (so alphas co-move), and true annual Sharpe `annual_sharpe`
    (0 = pure noise). Also returns the true means and covariance."""
    vol = 0.01 * np.exp(rng.normal(0.0, 0.5, N))
    B = rng.normal(size=(N, n_factors))
    B /= np.linalg.norm(B, axis=1, keepdims=True)
    z = (np.sqrt(factor_share) * B @ rng.normal(size=(n_factors, T))
         + np.sqrt(1 - factor_share) * rng.normal(size=(N, T)))
    mu = vol * np.broadcast_to(annual_sharpe, N) / np.sqrt(DAYS_PER_YEAR)
    cov = np.outer(vol, vol) * (factor_share * B @ B.T + (1 - factor_share) * np.eye(N))
    return mu[:, None] + vol[:, None] * z, mu, cov


def walk_forward(R, weight_fn, M, in_sample_days=None):
    """Every HOLD days, fit weights on the previous M days and trade them on the
    next HOLD days. Returns daily out-of-sample PnL, the PnL of the same weights
    on the last `in_sample_days` of their own fitting window, and the average
    weight turnover per rebalance (sum of |change in w|)."""
    oos, ins, turnover, prev = [], [], [], None
    for t in range(M, R.shape[1] - HOLD + 1, HOLD):
        w = weight_fn(R[:, t - M:t])
        oos.append(w @ R[:, t:t + HOLD])
        if in_sample_days:
            ins.append(w @ R[:, t - in_sample_days:t])
        if prev is not None:
            turnover.append(np.abs(w - prev).sum())
        prev = w
    return (np.concatenate(oos), np.concatenate(ins) if ins else None,
            float(np.mean(turnover)))


def sharpe(pnl):
    return pnl.mean() / pnl.std() * np.sqrt(DAYS_PER_YEAR)


def summary(values):
    v = np.asarray(values)
    return f"{v.mean():+6.2f}  (seeds range {v.min():+.2f} to {v.max():+.2f})"


def experiment_noise(seeds=20, N=200, M=60, d=20, years=20):
    print(f"1) PURE NOISE: {N} alphas with zero true edge, M={M}, d={d}, "
          f"{years}y walk-forward x {seeds} seeds")
    ins, oos, losing, windows = [], [], 0, 0
    for seed in range(seeds):
        R, _, _ = simulate(np.random.default_rng(seed), N, years * DAYS_PER_YEAR, 0.0)
        o, i, _ = walk_forward(R, lambda r: combine_weights(r, d), M, in_sample_days=d)
        ins.append(sharpe(i))
        oos.append(sharpe(o))
        window_pnl = i.reshape(-1, d).sum(axis=1)  # equals d * eta * |eps|^2, never < 0
        losing += int((window_pnl < 0).sum())
        windows += window_pnl.size
    print(f"   in-sample Sharpe (weights scored on the data that made them): {summary(ins)}")
    print(f"   out-of-sample Sharpe (next month, never seen):                {summary(oos)}")
    print(f"   in-sample windows that lost money: {losing} of {windows}\n")


def experiment_weak_edges(seeds=10, N=200, years=20):
    print(f"2) WEAK REAL EDGES: {N} alphas, true annual Sharpe per alpha ~ Normal(0.2, 0.5), "
          f"{years}y walk-forward x {seeds} seeds, before costs")
    methods = {
        "formula, M=60,  d=20 ": (60, lambda r: combine_weights(r, 20)),
        "formula, M=60,  d=60 ": (60, lambda r: combine_weights(r, 60)),
        "formula, M=150, d=150": (150, lambda r: combine_weights(r, 150)),
        "equal weight         ": (60, equal_weights),
        "inverse volatility   ": (60, inverse_vol_weights),
    }
    results = {name: ([], []) for name in methods}
    oracle = []
    for seed in range(seeds):
        rng = np.random.default_rng(1000 + seed)
        R, mu, cov = simulate(rng, N, years * DAYS_PER_YEAR, rng.normal(0.2, 0.5, N))
        for name, (M, fn) in methods.items():
            pnl, _, turnover = walk_forward(R, fn, M)
            results[name][0].append(sharpe(pnl))
            results[name][1].append(turnover)
        w = np.linalg.solve(cov, mu)  # max-Sharpe weights if the true edges were known
        oracle.append(mu @ w / np.sqrt(w @ cov @ w) * np.sqrt(DAYS_PER_YEAR))
    for name, (sharpes, turnovers) in results.items():
        print(f"   {name} out-of-sample Sharpe {summary(sharpes)}   "
              f"weight turnover/month {np.mean(turnovers):.2f}")
    print(f"   ceiling (true edges known)  Sharpe {summary(oracle)}")
    formula, inv_vol = results["formula, M=60,  d=20 "][0], results["inverse volatility   "][0]
    wins = sum(f > v for f, v in zip(formula, inv_vol))
    print(f"   formula (M=60, d=20) beat inverse volatility in {wins} of {seeds} seeds\n")


def experiment_collapse():
    print("3) FEW SIGNALS: does the output differ from plain inverse-volatility weights?")
    rng = np.random.default_rng(7)
    for N, M in [(5, 252), (50, 252), (252, 252), (253, 252), (400, 252)]:
        R, _, _ = simulate(rng, N, M, rng.normal(0.5, 0.5, N))
        w = combine_weights(R, d=M)
        iv = inverse_vol_weights(R)
        gap = np.abs(w - np.sign(w.sum()) * iv).max()
        verdict = "identical" if gap < 1e-9 else "different"
        print(f"   N={N:>3} signals, M={M} periods: max |w - inverse-vol| = {gap:.1e}  -> {verdict}")
    print()


def estimation_noise_table():
    print("4) HOW NOISY IS E(i)? Chance the trailing d-day mean has the WRONG SIGN "
          "for an alpha with a real edge")
    print("   true annual Sharpe |  d=20   d=60   d=252")
    for sr in (0.5, 1.0, 2.0):
        row = []
        for d in (20, 60, 252):
            t_stat = sr * sqrt(d / DAYS_PER_YEAR)
            row.append(0.5 * (1 + erf(-t_stat / sqrt(2))))  # Phi(-t)
        print(f"   {sr:>18.1f} | " + "  ".join(f"{p:5.0%}" for p in row))
    print()


if __name__ == "__main__":
    experiment_noise()
    experiment_weak_edges()
    experiment_collapse()
    estimation_noise_table()
