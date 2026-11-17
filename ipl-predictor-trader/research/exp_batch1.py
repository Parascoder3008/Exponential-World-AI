"""Backlog items 1-4 and 8: things the exchange's score line alone can support."""
import numpy as np
import pandas as pd
from harness import Bench
from iplquant.models import INN1, INN2

b = Bench()
# 1. focus-league weighting
for w in (2.0, 4.0):
    b.run(f"1: IPL+BBL weight x{w:g}", weight=lambda tr, w=w: np.where(tr["league"].isin(["ipl", "bbl"]), w, 1.0))
# 2. recency
for r in (0.9, 0.8):
    b.run(f"2: recency {r}^age", weight=lambda tr, r=r: r ** (tr["season"].max() - tr["season"]).to_numpy())
# 3. regularisation
for C in (0.002, 0.05, 0.3):
    b.run(f"3: C={C}", C=C)


# 4. momentum windows
def momentum(s):
    s = s.sort_values(["match_id", "innings", "seq"])
    g = s.groupby(["match_id", "innings"], sort=False)
    for n in (6, 30):
        s[f"r{n}"] = (g["runs_total"].transform(lambda x: x.shift(1).rolling(n, min_periods=1).sum())).fillna(0)
        s[f"w{n}"] = (g["wicket"].transform(lambda x: x.shift(1).rolling(n, min_periods=1).sum())).fillna(0)
    dot = (s["runs_total"] == 0).astype(float)
    s["dots12"] = dot.groupby([s["match_id"], s["innings"]]).transform(lambda x: x.shift(1).rolling(12, min_periods=1).mean()).fillna(0)
    return s.sort_index()


mom = ["r6", "w6", "r30", "w30", "dots12"]
b.run("4: momentum windows 6/30 + dot share", add=momentum, inn1=INN1 + mom, inn2=INN2 + mom)


# 8. interactions
def inter(s):
    s = s.copy()
    s["wl_x_frac"] = s["wl"] * s["frac"]
    s["wl_x_frac2"] = s["wl"] * s["frac"] ** 2
    s["gap_x_wl"] = s["rr_gap"] * s["wl"]
    s["rn_per_wl_ball"] = s["runs_needed"] / (s["wl"].clip(lower=1) * s["balls_left"].clip(lower=1) ** 0.5)
    return s


b.run("8: wickets x phase, required rate x wickets", add=inter,
      inn1=INN1 + ["wl_x_frac", "wl_x_frac2"], inn2=INN2 + ["gap_x_wl", "rn_per_wl_ball", "wl_x_frac"])
