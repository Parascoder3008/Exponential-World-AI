"""Turnaround matches: games where each side is the underdog at some point.

The idea being tested
---------------------
Back team A when it is the outsider at long odds. If the match turns and team B
becomes the outsider at long odds, back B as well. With both bets struck above
evens the book is green whoever wins.

That second bet really is risk-free profit. The catch is the first one: you place
it before you know whether the match will turn. This module measures, on real
matches, how often the turn comes and what the whole strategy earns including the
matches where it does not.

Prices here are the model's own fair odds, because no historical market odds are
available. A real market's prices will differ; the arithmetic of the strategy does
not.
"""
from __future__ import annotations

import numpy as np
import pandas as pd

from . import odds as O
from .backtest import to_team1

THRESHOLDS = (2.5, 3.0, 4.0, 6.0)


def lead_changes(oos: pd.DataFrame) -> dict:
    """How often the favourite changes, and how far behind winners came from."""
    d = to_team1(oos)
    g = d.groupby("match_id")["p_a"]
    lo, hi = g.min(), g.max()
    out = {"matches": int(len(lo))}
    for level in (0.6, 0.7, 0.8, 0.9):
        # each side was at least this strong a favourite at some point
        out[f"both_sides_favourite_at_{int(level*100)}"] = float(((lo <= 1 - level) & (hi >= level)).mean())
    won = d.groupby("match_id")["a_won"].first()
    winner_low = np.where(won == 1, lo, 1 - hi)       # winner's lowest probability
    for level in (0.4, 0.3, 0.2, 0.1):
        out[f"winner_was_below_{int(level*100)}"] = float((winner_low <= level).mean())
    return out


def back_both_underdogs(oos: pd.DataFrame, threshold: float, spread: float = 0.0,
                        commission: float = 0.0, stake: float = 100.0) -> pd.DataFrame:
    """Simulate the strategy at one odds threshold. One row per match that traded.

    Leg 1: the first time either side's price reaches ``threshold`` or longer, back
    it for ``stake``. Leg 2: if the *other* side later reaches ``threshold`` or
    longer, back it too, sized so both outcomes pay the same.
    """
    d = to_team1(oos).sort_values(["date", "match_id", "seq"], kind="stable")
    q = 1.0 / threshold
    h = spread / 2.0
    rows = []
    for mid, g in d.groupby("match_id", sort=False):
        p = g["p_a"].to_numpy()
        a_won = bool(g["a_won"].iloc[0])
        a_dog = np.flatnonzero(p <= q)            # A is the outsider
        b_dog = np.flatnonzero(p >= 1 - q)        # B is the outsider
        first_a = a_dog[0] if a_dog.size else None
        first_b = b_dog[0] if b_dog.size else None
        if first_a is None and first_b is None:
            continue
        leg1_is_a = first_b is None or (first_a is not None and first_a < first_b)
        i1 = first_a if leg1_is_a else first_b
        p1 = p[i1] if leg1_is_a else 1 - p[i1]                 # prob of the side backed
        o1 = 1.0 / min(max(p1 + h, 1e-4), 0.999)               # price after the spread
        other = b_dog if leg1_is_a else a_dog
        later = other[other > i1]
        pos = O.Position().add(O.Bet("back" if leg1_is_a else "lay", o1 if leg1_is_a else o1 / (o1 - 1),
                                     stake if leg1_is_a else stake * (o1 - 1)))
        turned = later.size > 0
        if turned:
            i2 = later[0]
            p_a2 = p[i2]
            back_a = 1.0 / min(max(p_a2 + h, 1e-4), 0.999)
            lay_a = 1.0 / min(max(p_a2 - h, 1e-4), 0.999)
            pos.add(pos.hedge(back_a, lay_a))
        pnl = pos.settle(a_won, commission)
        rows.append({"match_id": mid, "season": int(g["season"].iloc[0]),
                     "leg1_innings": int(g["innings"].iloc[i1]),
                     "leg1_balls_left": int(g["balls_left"].iloc[i1]),
                     "leg1_odds": o1, "turned": turned, "pnl": pnl, "staked": stake})
    return pd.DataFrame(rows)


def summarize(trades: pd.DataFrame, threshold: float, n_matches: int) -> dict:
    if trades.empty:
        return {"threshold": threshold, "matches": n_matches, "traded": 0}
    t, f = trades[trades["turned"]], trades[~trades["turned"]]
    # If prices are fair, the chance of a full turnaround from 1/X to 1-1/X is 1/(X-1).
    implied = 1.0 / (threshold - 1.0)
    return {
        "threshold": threshold,
        "matches": n_matches,
        "traded": int(len(trades)),
        "traded_pct": float(len(trades) / n_matches * 100),
        "turnaround_pct": float(trades["turned"].mean() * 100),
        "turnaround_pct_if_prices_fair": float(min(implied, 1.0) * 100),
        "avg_profit_when_turned": float(t["pnl"].mean()) if len(t) else 0.0,
        "no_turn_first_bet_won_pct": float((f["pnl"] > 0).mean() * 100) if len(f) else 0.0,
        "avg_result_when_not_turned": float(f["pnl"].mean()) if len(f) else 0.0,
        "total_pnl": float(trades["pnl"].sum()),
        "roi_pct": float(trades["pnl"].sum() / trades["staked"].sum() * 100),
        "matches_in_profit_pct": float((trades["pnl"] > 0).mean() * 100),
    }


def analyse(oos: pd.DataFrame, thresholds=THRESHOLDS) -> dict:
    n = oos["match_id"].nunique()
    out = {"lead_changes": lead_changes(oos), "fair_prices": [], "with_costs": [], "by_phase": []}
    for x in thresholds:
        out["fair_prices"].append(summarize(back_both_underdogs(oos, x), x, n))
        out["with_costs"].append(summarize(
            back_both_underdogs(oos, x, spread=0.01, commission=0.05), x, n))
    # Does the turnaround rate depend on when the first bet was struck?
    t = back_both_underdogs(oos, 3.0)
    if not t.empty:
        phase = np.select(
            [(t["leg1_innings"] == 1) & (t["leg1_balls_left"] > 60), t["leg1_innings"] == 1,
             (t["leg1_innings"] == 2) & (t["leg1_balls_left"] > 60)],
            ["1st innings, overs 1-10", "1st innings, overs 11-20", "2nd innings, overs 1-10"],
            default="2nd innings, overs 11-20")
        for name, g in t.groupby(phase):
            out["by_phase"].append({"phase": name, "trades": int(len(g)),
                                    "turnaround_pct": float(g["turned"].mean() * 100),
                                    "roi_pct": float(g["pnl"].sum() / g["staked"].sum() * 100)})
    return out
