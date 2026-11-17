"""Point-in-time pre-match features.

Everything here is computed by walking through matches in date order and only ever
using information from matches that finished *before* the one being described. That
is the whole point: a feature that peeks at the result it is predicting produces
great-looking accuracy and loses money.

All features are antisymmetric - swapping team1 and team2 flips their sign - so a
model built on them has no built-in bias toward whichever side is listed first.
"""
from __future__ import annotations

from collections import defaultdict, deque
from dataclasses import dataclass, field

import numpy as np
import pandas as pd

from .data import normalize_team, normalize_venue
from .ingest import NOT_BOWLER_WICKET

FEATURES = [
    "elo", "form", "h2h", "venue_wr", "home",
    "bat_rpb", "bat_dpb", "bowl_rpb", "bowl_wpb",
    "toss_won", "bat_first", "chase_adv",
]
TOSS_FEATURES = ["toss_won", "bat_first", "chase_adv"]

ELO_K = 8.0
ELO_SEASON_CARRY = 0.7      # share of a team's rating edge kept across seasons
PLAYER_SEASON_DECAY = 0.7   # older seasons count for less in player ratings
BAT_PRIOR_BALLS = 60.0
BOWL_PRIOR_BALLS = 90.0


def player_match_stats(balls: pd.DataFrame) -> tuple[dict, dict]:
    """Per-match batting and bowling lines, keyed by match_id."""
    faced = balls[balls["wide"] == 0]
    bat = faced.groupby(["match_id", "batter"]).agg(
        runs=("runs_batter", "sum"), balls=("runs_batter", "size"))
    outs = balls.dropna(subset=["player_out"]).groupby(["match_id", "player_out"]).size()
    bowl_w = balls[balls["wicket"].gt(0) & ~balls["kind"].isin(NOT_BOWLER_WICKET)]
    bowl = balls.groupby(["match_id", "bowler"]).agg(
        runs=("runs_total", "sum"), balls=("legal", "sum"))
    wk = bowl_w.groupby(["match_id", "bowler"]).size()

    batting: dict = defaultdict(dict)
    for (mid, p), r in bat.iterrows():
        batting[mid][p] = [float(r["runs"]), float(r["balls"]), 0.0]
    for (mid, p), n in outs.items():
        batting[mid].setdefault(p, [0.0, 0.0, 0.0])[2] += float(n)
    bowling: dict = defaultdict(dict)
    for (mid, p), r in bowl.iterrows():
        bowling[mid][p] = [float(r["runs"]), float(r["balls"]), 0.0]
    for (mid, p), n in wk.items():
        bowling[mid][p][2] += float(n)
    return batting, bowling


def _elo0(): return 1500.0
def _d5(): return deque(maxlen=5)
def _d8(): return deque(maxlen=8)
def _d30(): return deque(maxlen=30)
def _d60(): return deque(maxlen=60)
def _z2(): return [0.0, 0.0]
def _z3(): return [0.0, 0.0, 0.0]
def _dd(factory): return lambda: defaultdict(factory)


@dataclass
class FeatureState:
    """Everything known about the league at one moment in time."""
    elo: dict = field(default_factory=_dd(_elo0))
    recent: dict = field(default_factory=_dd(_d5))
    h2h: dict = field(default_factory=_dd(_d8))
    venue_team: dict = field(default_factory=_dd(_z2))
    team_venues: dict = field(default_factory=_dd(_d30))
    venue_chase: dict = field(default_factory=_dd(_z2))
    league_chase: dict = field(default_factory=_dd(_z2))
    venue_first: dict = field(default_factory=_dd(_d30))
    league_first: dict = field(default_factory=_dd(_d60))
    team_league: dict = field(default_factory=dict)
    venue_league: dict = field(default_factory=dict)
    bat: dict = field(default_factory=_dd(_z3))
    bowl: dict = field(default_factory=_dd(_z3))
    apps: dict = field(default_factory=_dd(float))
    league_bat: list = field(default_factory=_z3)
    last_xi: dict = field(default_factory=dict)
    season: int | None = None

    # ---- season rollover -------------------------------------------------
    def start_season(self, season: int) -> None:
        if self.season is not None and season != self.season:
            for t in list(self.elo):
                self.elo[t] = 1500.0 + ELO_SEASON_CARRY * (self.elo[t] - 1500.0)
            for store in (self.bat, self.bowl):
                for p in store:
                    store[p] = [v * PLAYER_SEASON_DECAY for v in store[p]]
            for p in self.apps:
                self.apps[p] *= PLAYER_SEASON_DECAY
            self.league_bat = [v * PLAYER_SEASON_DECAY for v in self.league_bat]
        self.season = season

    # ---- pieces ----------------------------------------------------------
    def league_of(self, *teams, venue: str | None = None) -> str | None:
        for t in teams:
            if t in self.team_league:
                return self.team_league[t]
        return self.venue_league.get(venue)

    def par_score(self, venue: str, league: str | None = None) -> float:
        """Expected first-innings total here, shrunk toward the recent average of the
        league being played (scoring levels differ a lot between leagues)."""
        lf = self.league_first.get(league) if league else None
        league_avg = float(np.mean(lf)) if lf else 160.0
        v = self.venue_first[venue]
        k = 8.0
        return (sum(v) + k * league_avg) / (len(v) + k)

    def chase_edge(self, venue: str, league: str | None = None) -> float:
        lw, ln = self.league_chase[league] if league in self.league_chase else (0.0, 0.0)
        league = (lw + 10.0) / (ln + 20.0)
        w, n = self.venue_chase[venue]
        k = 12.0
        return (w + k * league) / (n + k) - 0.5

    def _league_rates(self) -> tuple[float, float]:
        runs, balls, outs = self.league_bat
        if balls < 500:
            return 1.25, 0.045
        return runs / balls, outs / balls

    def team_strength(self, xi: list[str]) -> dict:
        """Batting and bowling indices for an XI from decayed player records."""
        rpb0, dpb0 = self._league_rates()
        # An unknown batter is assumed a little worse than the league average batter.
        bw = br = bd = 0.0
        ow = orr = ow_w = 0.0
        for p in xi:
            n = self.apps[p]
            runs, balls, outs = self.bat[p]
            w = (balls + 6.0 * 2.0) / (n + 2.0)             # balls faced per appearance
            r = (runs + BAT_PRIOR_BALLS * rpb0 * 0.92) / (balls + BAT_PRIOR_BALLS)
            d = (outs + BAT_PRIOR_BALLS * dpb0 * 1.10) / (balls + BAT_PRIOR_BALLS)
            bw += w; br += w * r; bd += w * d
            cruns, cballs, cwk = self.bowl[p]
            wb = (cballs + 6.0 * 2.0) / (n + 2.0)           # balls bowled per appearance
            e = (cruns + BOWL_PRIOR_BALLS * rpb0 * 1.04) / (cballs + BOWL_PRIOR_BALLS)
            k = (cwk + BOWL_PRIOR_BALLS * dpb0 * 0.90) / (cballs + BOWL_PRIOR_BALLS)
            ow += wb; orr += wb * e; ow_w += wb * k
        if bw == 0 or ow == 0:
            return {"bat_rpb": rpb0, "bat_dpb": dpb0, "bowl_rpb": rpb0, "bowl_wpb": dpb0}
        return {"bat_rpb": br / bw, "bat_dpb": bd / bw,
                "bowl_rpb": orr / ow, "bowl_wpb": ow_w / ow}

    # ---- feature row -----------------------------------------------------
    def features(self, team1: str, team2: str, venue: str,
                 xi1: list[str] | None = None, xi2: list[str] | None = None,
                 toss_winner: str | None = None, toss_decision: str | None = None,
                 league: str | None = None) -> dict:
        team1, team2 = normalize_team(team1), normalize_team(team2)
        venue = normalize_venue(venue)
        league = league or self.league_of(team1, team2, venue=venue)
        toss_winner = normalize_team(toss_winner)
        xi1 = xi1 or self.last_xi.get(team1, [])
        xi2 = xi2 or self.last_xi.get(team2, [])

        def form(t):
            r = self.recent[t]
            return (sum(r) + 1.0) / (len(r) + 2.0)

        def venue_wr(t):
            w, n = self.venue_team[(t, venue)]
            return (w + 2.0) / (n + 4.0)

        def home(t):
            v = self.team_venues[t]
            return (sum(1 for x in v if x == venue)) / (len(v) + 4.0)

        key = tuple(sorted((team1, team2)))
        meetings = self.h2h[key]
        wins1 = sum(1 for w in meetings if w == team1)
        h2h = (wins1 + 1.5) / (len(meetings) + 3.0) - 0.5

        s1, s2 = self.team_strength(xi1), self.team_strength(xi2)
        f = {
            "elo": (self.elo[team1] - self.elo[team2]) / 400.0,
            "form": form(team1) - form(team2),
            "h2h": h2h,
            "venue_wr": venue_wr(team1) - venue_wr(team2),
            "home": home(team1) - home(team2),
            # Positive always means "good for team1".
            "bat_rpb": (s1["bat_rpb"] - s2["bat_rpb"]) * 10,
            "bat_dpb": (s2["bat_dpb"] - s1["bat_dpb"]) * 100,
            "bowl_rpb": (s2["bowl_rpb"] - s1["bowl_rpb"]) * 10,
            "bowl_wpb": (s1["bowl_wpb"] - s2["bowl_wpb"]) * 100,
            "toss_won": 0.0, "bat_first": 0.0, "chase_adv": 0.0,
        }
        if toss_winner in (team1, team2) and toss_decision in ("bat", "field"):
            won = 1.0 if toss_winner == team1 else -1.0
            bats_first = won if toss_decision == "bat" else -won
            f["toss_won"] = won
            f["bat_first"] = bats_first
            f["chase_adv"] = -bats_first * self.chase_edge(venue, league) * 10
        f["par"] = self.par_score(venue, league)
        f["league"] = league
        f["elo_prob"] = 1.0 / (1.0 + 10 ** (-f["elo"]))
        return f

    # ---- update after a result -------------------------------------------
    def update(self, row, first_innings: tuple | None, batting: dict, bowling: dict) -> None:
        t1, t2, venue, winner = row.team1, row.team2, row.venue, row.winner
        league = getattr(row, "league", None)
        if league:
            self.team_league[t1] = self.team_league[t2] = self.venue_league[venue] = league
        xi1 = [p for p in row.team1_players.split("|") if p]
        xi2 = [p for p in row.team2_players.split("|") if p]
        if xi1:
            self.last_xi[t1] = xi1
        if xi2:
            self.last_xi[t2] = xi2
        for p in xi1 + xi2:
            self.apps[p] += 1.0
        for p, (r, b, o) in batting.items():
            s = self.bat[p]; s[0] += r; s[1] += b; s[2] += o
            self.league_bat[0] += r; self.league_bat[1] += b; self.league_bat[2] += o
        for p, (r, b, w) in bowling.items():
            s = self.bowl[p]; s[0] += r; s[1] += b; s[2] += w
        self.team_venues[t1].append(venue)
        self.team_venues[t2].append(venue)

        if not isinstance(winner, str):
            return  # no result: squads and venues update, ratings do not
        e1 = 1.0 / (1.0 + 10 ** (-(self.elo[t1] - self.elo[t2]) / 400.0))
        s1 = 1.0 if winner == t1 else 0.0
        self.elo[t1] += ELO_K * (s1 - e1)
        self.elo[t2] -= ELO_K * (s1 - e1)
        self.recent[t1].append(s1)
        self.recent[t2].append(1.0 - s1)
        self.h2h[tuple(sorted((t1, t2)))].append(winner)
        for t, s in ((t1, s1), (t2, 1.0 - s1)):
            vt = self.venue_team[(t, venue)]
            vt[0] += s; vt[1] += 1.0

        if row.standard and first_innings is not None:
            bat_first_team, total = first_innings
            chased = 1.0 if winner != bat_first_team else 0.0
            vc = self.venue_chase[venue]
            vc[0] += chased; vc[1] += 1.0
            lc = self.league_chase[league]
            lc[0] += chased; lc[1] += 1.0
            self.venue_first[venue].append(total)
            self.league_first[league].append(total)


def build(matches: pd.DataFrame, balls: pd.DataFrame) -> tuple[pd.DataFrame, FeatureState]:
    """Walk the history once. Returns one feature row per match plus the final state
    (which is what you use to price a fixture that has not been played yet)."""
    batting, bowling = player_match_stats(balls)
    first = balls[balls["innings"] == 1].groupby("match_id").agg(
        team=("batting_team", "first"), runs=("runs_total", "sum"))
    first_map = {mid: (r["team"], float(r["runs"])) for mid, r in first.iterrows()}

    state = FeatureState()
    rows = []
    for row in matches.itertuples(index=False):
        state.start_season(int(row.season))
        xi1 = [p for p in row.team1_players.split("|") if p]
        xi2 = [p for p in row.team2_players.split("|") if p]
        f = state.features(row.team1, row.team2, row.venue, xi1, xi2,
                           row.toss_winner, row.toss_decision, getattr(row, "league", None))
        f["match_id"] = row.match_id
        f["y"] = (1.0 if row.winner == row.team1 else 0.0) if isinstance(row.winner, str) else np.nan
        rows.append(f)
        state.update(row, first_map.get(row.match_id),
                     batting.get(row.match_id, {}), bowling.get(row.match_id, {}))
    feats = pd.DataFrame(rows)
    feats = feats.drop(columns=["league"])
    out = matches[["match_id", "league", "season", "date", "team1", "team2", "venue", "winner",
                   "standard"]].merge(feats, on="match_id")
    return out, state
