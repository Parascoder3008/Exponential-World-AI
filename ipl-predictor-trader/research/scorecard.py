"""Scorecard features: who is at the crease, how set they are, batting depth to come,
and the quality of the bowling overs still available. All computed from information
known before each ball (ratings as of the start of the match, events earlier in the
innings)."""
from __future__ import annotations

import time

import numpy as np
import pandas as pd

from iplquant import features

SC1 = ["crease_r", "crease_d", "set_log", "depth_bpa", "depth_r", "bowl_rem_e", "bowl_rem_w"]


def player_table(matches, balls) -> dict:
    players: dict = {}
    features.build(matches, balls, players=players)
    return players


def compute(states: pd.DataFrame, matches: pd.DataFrame, players: dict) -> pd.DataFrame:
    t0 = time.time()
    xi = {}
    for r in matches.itertuples(index=False):
        xi[(r.match_id, r.team1)] = [p for p in r.team1_players.split("|") if p]
        xi[(r.match_id, r.team2)] = [p for p in r.team2_players.split("|") if p]
    n = len(states)
    out = {k: np.full(n, np.nan) for k in SC1}
    cols = ["match_id", "innings", "batting_team", "bowling_team", "batter", "non_striker", "bowler",
            "wide", "legal", "wicket", "player_out", "balls_left"]
    arr = {c: states[c].to_numpy() for c in cols}
    i = 0
    while i < n:
        mid, inn = arr["match_id"][i], arr["innings"][i]
        j = i
        while j < n and arr["match_id"][j] == mid and arr["innings"][j] == inn:
            j += 1
        rat = players.get(mid, {})
        rpb0, dpb0 = rat.get("_league_rates", (1.25, 0.045))
        default = (rpb0 * 0.92, dpb0 * 1.1, 6.0, rpb0 * 1.04, dpb0 * 0.9, 6.0)
        R = lambda p: rat.get(p, default)  # noqa: E731
        bat_xi = xi.get((mid, arr["batting_team"][i]), [])
        bowl_xi = xi.get((mid, arr["bowling_team"][i]), [])
        faced: dict = {}
        out_set: set = set()
        used: dict = {}                      # bowler -> legal balls this innings
        # bowling candidates: players with a real bowling share
        bowlers = [(p, R(p)) for p in bowl_xi]
        rem_e = rem_w = None
        last_balls_left = None
        for k in range(i, j):
            s, ns, bw = arr["batter"][k], arr["non_striker"][k], arr["bowler"][k]
            rs, rn = R(s), R(ns)
            out["crease_r"][k] = (rs[0] + rn[0]) / 2 - rpb0
            out["crease_d"][k] = (rs[1] + rn[1]) / 2 - dpb0
            out["set_log"][k] = np.log1p(faced.get(s, 0)) + np.log1p(faced.get(ns, 0))
            rest = [R(p) for p in bat_xi if p not in out_set and p != s and p != ns]
            rest.sort(key=lambda x: -x[2])
            top = rest[:4]
            out["depth_bpa"][k] = sum(x[2] for x in rest[:6]) / 20.0
            out["depth_r"][k] = (np.mean([x[0] for x in top]) - rpb0) if top else -rpb0
            bl = arr["balls_left"][k]
            if last_balls_left is None or bl % 6 == 0 or rem_e is None:
                # captain uses the best remaining overs first; part-timers fill any gap
                need = int(np.ceil(bl / 6))
                slots = []
                for p, r in bowlers:
                    if r[5] < 6:                 # under an over a game: not a real bowler
                        continue
                    left = max(4 - used.get(p, 0) // 6, 0)
                    slots += [(r[3], r[4])] * left
                slots.sort()
                take = slots[:need] + [(rpb0 * 1.15, dpb0 * 0.8)] * max(need - len(slots), 0)
                rem_e = np.mean([x[0] for x in take]) - rpb0 if take else 0.0
                rem_w = np.mean([x[1] for x in take]) - dpb0 if take else 0.0
            last_balls_left = bl
            out["bowl_rem_e"][k], out["bowl_rem_w"][k] = rem_e, rem_w
            # apply the ball
            if not arr["wide"][k]:
                faced[s] = faced.get(s, 0) + 1
            if arr["legal"][k]:
                used[bw] = used.get(bw, 0) + 1
            if arr["wicket"][k] and isinstance(arr["player_out"][k], str):
                out_set.add(arr["player_out"][k])
        i = j
    res = states.copy()
    for k, v in out.items():
        res[k] = v
    res["crease_r"] *= 10
    res["crease_d"] *= 100
    res["depth_r"] *= 10
    res["bowl_rem_e"] *= 10
    res["bowl_rem_w"] *= 100
    print(f"[scorecard] {n:,} balls in {time.time() - t0:.0f}s")
    return res
