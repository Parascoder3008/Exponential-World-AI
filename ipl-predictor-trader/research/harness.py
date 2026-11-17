"""Test bench for improving the in-play model on the IPL and Big Bash.

Protocol (fixed before any experiment was run):

* Tuning: walk-forward over calendar seasons 2017-2022. For each season S, train on
  every league's matches before S, score the IPL and Big Bash matches in S.
* Final exam: seasons 2023-2026. Never used to choose between experiments; looked at
  only when a change has already been accepted on tuning.
* Accept a change only if it lowers tuning log loss on IPL+BBL by at least 0.001 AND
  a paired bootstrap over matches says it is better with at least 90% probability.

Usage from another script:

    from harness import Bench
    bench = Bench()
    bench.run("name", add=lambda s: s.assign(x=...), inn1=[...], inn2=[...])
"""
from __future__ import annotations

import json
import sys
import time
from pathlib import Path

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))
from iplquant import models  # noqa: E402

HERE = Path(__file__).parent
TUNE = list(range(2017, 2023))
EXAM = list(range(2023, 2027))
FOCUS = ("ipl", "bbl")
MIN_GAIN, MIN_PROB = 0.001, 0.90
EPS = 1e-6


def ball_loss(y, p):
    p = np.clip(p, EPS, 1 - EPS)
    return -(y * np.log(p) + (1 - y) * np.log(1 - p))


class Bench:
    def __init__(self):
        t = time.time()
        self.matches, self.balls, self.F, self.state, self.pm, self.states = models.prepare()
        self.cache: dict = {}
        print(f"[bench] data ready in {time.time() - t:.0f}s: {len(self.states):,} ball states")

    # ---- core ------------------------------------------------------------------
    def predictions(self, seasons, add=None, inn1=None, inn2=None, weight=None, C=None,
                    post=None, fold=None) -> pd.DataFrame:
        """``add(s)`` adds columns that only use information up to each ball (safe to
        compute once). ``fold(train, test)`` adds columns that must be learned from the
        training seasons only (lookup tables, calibration), once per season."""
        s = add(self.states.copy()) if add else self.states
        out = []
        for season in seasons:
            train = s[s["season"] < season]
            test = s[(s["season"] == season) & s["league"].isin(FOCUS)].copy()
            if test.empty:
                continue
            if fold:
                train, test = fold(train.copy(), test)
            m = models.InPlayModel(C=C or models.INPLAY_C, inn1=inn1, inn2=inn2)
            m.fit(train, weight(train) if weight else None)
            test["p"] = m.predict(test)
            if post:
                test["p"] = post(m, train, test)
            out.append(test[["match_id", "league", "season", "innings", "won", "p"]])
        d = pd.concat(out, ignore_index=True)
        d["loss"] = ball_loss(d["won"].to_numpy(), d["p"].to_numpy())
        return d

    def baseline(self, seasons) -> pd.DataFrame:
        key = ("base", tuple(seasons))
        if key not in self.cache:
            self.cache[key] = self.predictions(seasons)
        return self.cache[key]

    @staticmethod
    def compare(new: pd.DataFrame, base: pd.DataFrame, n_boot: int = 2000, seed: int = 1) -> dict:
        a = base.groupby("match_id")["loss"].agg(["sum", "size"])
        b = new.groupby("match_id")["loss"].sum().reindex(a.index)
        diff, n = (b - a["sum"]).to_numpy(), a["size"].to_numpy()
        rng = np.random.default_rng(seed)
        idx = rng.integers(0, len(diff), size=(n_boot, len(diff)))
        boot = diff[idx].sum(1) / n[idx].sum(1)
        out = {"delta": float(diff.sum() / n.sum()), "p_better": float((boot < 0).mean()),
               "base": float(base["loss"].mean()), "new": float(new["loss"].mean())}
        for lg in FOCUS:
            bm, nm = base[base["league"] == lg], new[new["league"] == lg]
            out[f"base_{lg}"], out[f"new_{lg}"] = float(bm["loss"].mean()), float(nm["loss"].mean())
        return out

    # ---- one experiment ----------------------------------------------------------
    def run(self, name: str, note: str = "", exam: bool = False, **kw) -> dict:
        t = time.time()
        res = self.compare(self.predictions(TUNE, **kw), self.baseline(TUNE))
        res["accepted"] = res["delta"] <= -MIN_GAIN and res["p_better"] >= MIN_PROB
        if exam and res["accepted"]:
            ex = self.compare(self.predictions(EXAM, **kw), self.baseline(EXAM))
            res.update({f"exam_{k}": v for k, v in ex.items()})
        res.update(name=name, note=note, seconds=round(time.time() - t))
        with open(HERE / "results.jsonl", "a") as fh:
            fh.write(json.dumps(res) + "\n")
        verdict = "ACCEPT" if res["accepted"] else "reject"
        print(f"[{verdict}] {name}: tuning {res['base']:.4f} -> {res['new']:.4f} "
              f"(delta {res['delta']:+.4f}, P(better) {res['p_better']:.2f}) | "
              f"IPL {res['base_ipl']:.4f}->{res['new_ipl']:.4f}  BBL {res['base_bbl']:.4f}->{res['new_bbl']:.4f}"
              + (f" | exam delta {res['exam_delta']:+.4f}" if "exam_delta" in res else ""))
        return res
