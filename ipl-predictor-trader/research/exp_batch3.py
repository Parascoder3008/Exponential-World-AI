"""Backlog items 9, 10, 11 (scorecard) and 13 (BBL-only calibration)."""
import pickle
from pathlib import Path

from sklearn.linear_model import LogisticRegression

import scorecard
from harness import Bench
from iplquant import models
from iplquant.models import INN1, INN2, logit

b = Bench()
cache = Path("/tmp/claude-0/-home-user-Exponential-World-AI/2ecafdae-0529-5278-b32a-eb8797db7598/scratchpad/sc_states.pkl")
if cache.exists():
    sc = pickle.loads(cache.read_bytes())
else:
    players = scorecard.player_table(b.matches, b.balls)
    sc = scorecard.compute(b.states, b.matches, players)
    cache.write_bytes(pickle.dumps(sc))
print(sc[scorecard.SC1].describe().T.round(3))
b.states = sc                                  # same rows, extra columns; baseline unchanged
b.cache.clear()

CREASE = ["crease_r", "crease_d", "set_log"]
BOWL = ["bowl_rem_e", "bowl_rem_w"]
DEPTH = ["depth_bpa", "depth_r"]
b.run("9: batters at the crease (quality, how set)", inn1=INN1 + CREASE, inn2=INN2 + CREASE)
b.run("10: bowling overs left (quality)", inn1=INN1 + BOWL, inn2=INN2 + BOWL)
b.run("11: batting depth to come", inn1=INN1 + DEPTH, inn2=INN2 + DEPTH)
ALL = CREASE + BOWL + DEPTH
b.run("9-11 together", inn1=INN1 + ALL, inn2=INN2 + ALL, exam=True)


def bbl_calibration(m, train, test):
    last = train["season"].max()
    m0 = models.InPlayModel().fit(train[train["season"] < last])
    ho = train[(train["season"] == last) & (train["league"] == "bbl")].copy()
    p = test["p"].to_numpy().copy()
    if len(ho) < 2000:
        return p
    ho["p0"] = m0.predict(ho)
    for inn, g in ho.groupby("innings"):
        mask = ((test["league"] == "bbl") & (test["innings"] == inn)).to_numpy()
        lr = LogisticRegression(C=1e6).fit(logit(g["p0"]).reshape(-1, 1), g["won"])
        p[mask] = lr.predict_proba(logit(p[mask]).reshape(-1, 1))[:, 1]
    return p


r = b.run("13: Big Bash-only calibration", post=bbl_calibration)
# the idea came from looking at tuning results, so check the exam regardless
ex = b.compare(b.predictions(list(range(2023, 2027)), post=bbl_calibration), b.baseline(list(range(2023, 2027))))
print(f"    13 on exam seasons: {ex['base']:.4f} -> {ex['new']:.4f} (delta {ex['delta']:+.4f}, P {ex['p_better']:.2f}) "
      f"BBL {ex['base_bbl']:.4f}->{ex['new_bbl']:.4f}")
