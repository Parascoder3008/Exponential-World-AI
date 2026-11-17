"""Models: pre-match winner, in-play win probability, first-innings total.

Every number reported by this package comes from walk-forward evaluation: to predict
season S a model is trained only on seasons before S. Rows from one match are never
split between training and test data.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path

import joblib
import lightgbm as lgb
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline, make_pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

from . import data, features
from .features import FEATURES, TOSS_FEATURES

EPS = 1e-6
DEFAULT_MODEL_DIR = Path(__file__).resolve().parents[2] / "models"


def logit(p):
    p = np.clip(np.asarray(p, dtype=float), EPS, 1 - EPS)
    return np.log(p / (1 - p))


def sigmoid(x):
    return 1.0 / (1.0 + np.exp(-np.asarray(x, dtype=float)))


# --------------------------------------------------------------------------
# Pre-match
# --------------------------------------------------------------------------
class PreMatchModel:
    """Regularised logistic regression with no intercept on antisymmetric features,
    so P(team1 beats team2) + P(team2 beats team1) = 1 exactly."""

    def __init__(self, C: float = 0.005):
        self.C = C
        self.pipe = make_pipeline(
            StandardScaler(with_mean=False),
            LogisticRegression(C=C, fit_intercept=False, max_iter=2000),
        )

    def fit(self, F: pd.DataFrame) -> "PreMatchModel":
        d = F.dropna(subset=["y"])
        self.pipe.fit(d[FEATURES].to_numpy(), d["y"].to_numpy())
        return self

    def predict(self, F: pd.DataFrame, use_toss: bool = True) -> np.ndarray:
        X = F[FEATURES].copy()
        if not use_toss:
            X[TOSS_FEATURES] = 0.0
        return self.pipe.predict_proba(X.to_numpy())[:, 1]

    def coefficients(self) -> dict:
        scale = self.pipe[0].scale_
        coef = self.pipe[1].coef_[0]
        return {f: float(c) for f, c in zip(FEATURES, coef * 1.0)} | {
            "_scaled_by_std": {f: float(s) for f, s in zip(FEATURES, scale)}}


def walk_forward_prematch(F: pd.DataFrame, first_season: int = 2011, C: float = 0.005) -> pd.DataFrame:
    """Out-of-sample P(team1 wins) for every match. Seasons before ``first_season``
    have too little history to fit on, so they fall back to the Elo probability."""
    out = F[["match_id", "season", "y", "elo_prob"]].copy()
    out["p_toss"] = F["elo_prob"].to_numpy()
    out["p_pre"] = F["elo_prob"].to_numpy()
    for season in sorted(F["season"].unique()):
        if season < first_season:
            continue
        train, test = F[F["season"] < season], F[F["season"] == season]
        model = PreMatchModel(C=C).fit(train)
        out.loc[test.index, "p_toss"] = model.predict(test, use_toss=True)
        out.loc[test.index, "p_pre"] = model.predict(test, use_toss=False)
    return out


# --------------------------------------------------------------------------
# In-play
# --------------------------------------------------------------------------
# Model selection note. With ~1,000 completed matches there are only ~1,000
# independent outcomes, however many balls were bowled. On tuning seasons 2016-2020
# (walk-forward) gradient-boosted trees overfit match-level noise (log loss 0.569 at
# best, 0.63 when allowed to grow); a regularised logistic regression on the
# era-relative features below scored 0.566, and the reference-repo approach 0.622.
# So the simple model is the one that ships.
INN1 = ["proj_vs_par", "pv_frac", "wl", "wl_frac", "frac", "rel_rate", "l18", "l18w", "pm_logit"]
INN2 = ["rr_gap", "gap_x_lb", "rn_per_ball", "rpw", "wl", "wl_x_lb", "lb", "easy",
        "target_vs_par", "l18", "l18w", "pm_logit"]
INPLAY_C = 0.01


def add_inplay_features(states: pd.DataFrame, pm: pd.DataFrame, F: pd.DataFrame) -> pd.DataFrame:
    """Attach the pre-match prior, par score and engineered features to ball states."""
    s = states.merge(pm[["match_id", "p_toss"]], on="match_id", how="left")
    s = s.merge(F[["match_id", "par"]], on="match_id", how="left")
    p_bat = np.where(s["batting_team"] == s["team1"], s["p_toss"], 1 - s["p_toss"])
    s["pm_prob"] = p_bat
    s["pm_logit"] = logit(p_bat)
    return engineer(s)


def engineer(s: pd.DataFrame) -> pd.DataFrame:
    """Era-relative match-state features.

    Scoring rates have risen a lot (a par first-innings score went from ~160 to
    ~190+), so raw runs mean different things in different seasons. Everything here
    is measured against ``par``: the expected first-innings total at this venue,
    estimated only from earlier matches.
    """
    s = s.copy()
    full = data.FULL_INNINGS_BALLS
    bowled = (full - s["balls_left"]).clip(lower=0)
    par_rate = s["par"] / 20.0
    s["crr"] = np.where(bowled > 0, s["score"] * 6.0 / bowled.clip(lower=1), np.nan)
    s["frac"] = bowled / full
    s["lb"] = np.log(s["balls_left"].clip(lower=1))
    s["wl"] = s["wickets_left"]
    s["l18"] = s["last18_runs"].fillna(par_rate * 3.0 * np.minimum(bowled, 18) / 18.0)
    s["l18w"] = s["last18_wkts"].fillna(0.0)
    # first innings
    s["rel_rate"] = (s["crr"] - par_rate).fillna(0.0)
    s["proj_vs_par"] = s["score"] + s["balls_left"] * (s["par"] / full) - s["par"]
    s["pv_frac"] = s["proj_vs_par"] * s["frac"]
    s["wl_frac"] = (s["wl"] - 10 + 4.5 * s["frac"]) * s["frac"]
    # second innings
    if "runs_needed" not in s:
        s["runs_needed"] = np.nan
    if "target" not in s:
        s["target"] = np.nan
    s["rrr"] = (s["runs_needed"] * 6.0 / s["balls_left"].clip(lower=1)).clip(upper=36)
    s["rr_gap"] = s["rrr"] - par_rate
    s["gap_x_lb"] = s["rr_gap"] * s["lb"]
    s["rn_per_ball"] = s["runs_needed"] / s["balls_left"].clip(lower=1)
    s["rpw"] = s["runs_needed"] / s["wl"].clip(lower=1)
    s["wl_x_lb"] = s["wl"] * s["lb"]
    s["easy"] = np.log1p(s["runs_needed"].clip(lower=0))
    s["target_vs_par"] = s["target"] - s["par"]
    return s


@dataclass
class InPlayModel:
    """Regularised logistic regression, one per innings, on era-relative features plus
    a per-league offset. (Tuning seasons 2019-2020: the league terms cut log loss from
    0.528 to 0.525 overall and from 0.539 to 0.537 on the IPL; letting the scoreboard
    effects vary by league as well added nothing.)"""
    C: float = INPLAY_C
    models: dict = field(default_factory=dict)
    leagues: list = field(default_factory=list)
    inn1: list | None = None          # feature lists; None means the defaults above
    inn2: list | None = None

    def cols(self, inn: int) -> list:
        return (self.inn1 or INN1) if inn == 1 else (self.inn2 or INN2)

    def _X(self, s: pd.DataFrame, cols: list) -> np.ndarray:
        base = s[cols].to_numpy(dtype=float)
        if not self.leagues:
            return base
        lg = s["league"].to_numpy() if "league" in s else np.full(len(s), None)
        dummies = np.column_stack([(lg == l).astype(float) for l in self.leagues])
        return np.hstack([base, dummies])

    def fit(self, s: pd.DataFrame, weight: np.ndarray | None = None) -> "InPlayModel":
        self.leagues = sorted(s["league"].dropna().unique()) if "league" in s else []
        for inn in (1, 2):
            mask = (s["innings"] == inn).to_numpy()
            d = s[mask]
            kw = {} if weight is None else {"logisticregression__sample_weight": np.asarray(weight)[mask]}
            self.models[inn] = make_pipeline(
                StandardScaler(), LogisticRegression(C=self.C, max_iter=3000)
            ).fit(self._X(d, self.cols(inn)), d["won"].to_numpy(), **kw)
        return self

    def predict(self, s: pd.DataFrame) -> np.ndarray:
        """P(the side batting now wins). An unknown league gets the average offset."""
        p = np.full(len(s), np.nan)
        for inn in (1, 2):
            cols = self.cols(inn)
            mask = (s["innings"] == inn).to_numpy()
            if mask.any():
                p[mask] = self.models[inn].predict_proba(self._X(s.loc[mask], cols))[:, 1]
        return p


def fit_inplay(s: pd.DataFrame) -> InPlayModel:
    return InPlayModel().fit(s)


class BaselineInPlay:
    """The approach used by the public repos this project started from: logistic
    regression on score/wickets/balls/run-rates plus one-hot team names. Kept as a
    benchmark and as the 'unsophisticated market' in the stress test."""

    def __init__(self):
        def pipe(num):
            return Pipeline([
                ("prep", ColumnTransformer([
                    ("num", StandardScaler(), num),
                    ("cat", OneHotEncoder(handle_unknown="ignore"),
                     ["batting_team", "bowling_team"]),
                ])),
                ("lr", LogisticRegression(max_iter=2000)),
            ])
        self.cols = {1: ["score", "wickets_left", "balls_left", "crr0"],
                     2: ["runs_needed", "balls_left", "wickets_left", "target", "crr0", "rrr"]}
        self.pipes = {1: pipe(self.cols[1]), 2: pipe(self.cols[2])}

    @staticmethod
    def _prep(s):
        s = s.copy()
        s["crr0"] = s["crr"].fillna(0.0)
        return s

    def fit(self, s):
        s = self._prep(s)
        for inn in (1, 2):
            d = s[s["innings"] == inn]
            self.pipes[inn].fit(d[self.cols[inn] + ["batting_team", "bowling_team"]], d["won"])
        return self

    def predict(self, s):
        s = self._prep(s)
        p = np.full(len(s), np.nan)
        for inn in (1, 2):
            mask = (s["innings"] == inn).to_numpy()
            if mask.any():
                p[mask] = self.pipes[inn].predict_proba(
                    s.loc[mask, self.cols[inn] + ["batting_team", "bowling_team"]])[:, 1]
        return p


def walk_forward_inplay(s: pd.DataFrame, test_seasons: list[int], with_baseline: bool = True) -> pd.DataFrame:
    """Out-of-sample in-play probabilities for each test season."""
    parts = []
    for season in test_seasons:
        train, test = s[s["season"] < season], s[s["season"] == season].copy()
        model = fit_inplay(train)
        test["p_model"] = model.predict(test)
        if with_baseline:
            test["p_base"] = BaselineInPlay().fit(train).predict(test)
        parts.append(test)
    return pd.concat(parts, ignore_index=True)


# --------------------------------------------------------------------------
# First-innings total (for over/under "innings runs" lines)
# --------------------------------------------------------------------------
TOT = ["balls_left", "wickets_left", "score", "rel_rate", "l18", "l18w", "par", "pm_logit"]
TOT_BUCKETS = np.array([0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 121])


@dataclass
class TotalsModel:
    n_estimators: int = 200
    model: object = None
    sd: np.ndarray | None = None

    def fit(self, s: pd.DataFrame, sd: np.ndarray | None = None) -> "TotalsModel":
        d = s[s["innings"] == 1]
        self.model = lgb.LGBMRegressor(
            n_estimators=self.n_estimators, learning_rate=0.03, num_leaves=6,
            min_child_samples=3000, subsample=0.8, subsample_freq=1, reg_lambda=100.0,
            verbose=-1, n_jobs=4, random_state=7)
        self.model.fit(d[TOT], d["final_total"] - d["score"])
        if sd is not None:
            self.sd = sd
        return self

    def predict_total(self, s: pd.DataFrame) -> np.ndarray:
        return s["score"].to_numpy() + np.maximum(self.model.predict(s[TOT]), 0.0)

    def sd_for(self, balls_left) -> np.ndarray:
        idx = np.clip(np.searchsorted(TOT_BUCKETS, np.asarray(balls_left), side="right") - 1,
                      0, len(self.sd) - 1)
        return self.sd[idx]

    def prob_over(self, s: pd.DataFrame, line) -> np.ndarray:
        """P(final first-innings total > line), normal approximation."""
        from math import erf, sqrt
        mu, sd = self.predict_total(s), self.sd_for(s["balls_left"])
        z = (np.asarray(line, dtype=float) - mu) / np.maximum(sd, 1e-6)
        return 1.0 - 0.5 * (1.0 + np.vectorize(erf)(z / sqrt(2.0)))


def _resid_sd(resid: np.ndarray, balls_left: np.ndarray) -> np.ndarray:
    idx = np.clip(np.searchsorted(TOT_BUCKETS, balls_left, side="right") - 1, 0, len(TOT_BUCKETS) - 2)
    sd = np.array([resid[idx == i].std() if (idx == i).sum() > 30 else np.nan
                   for i in range(len(TOT_BUCKETS) - 1)])
    return pd.Series(sd).interpolate(limit_direction="both").to_numpy()


def fit_totals(s: pd.DataFrame) -> TotalsModel:
    d = s[s["innings"] == 1]
    last = d["season"].max()
    tr, ho = d[d["season"] < last], d[d["season"] == last]
    probe = TotalsModel().fit(tr)
    resid = ho["final_total"].to_numpy() - probe.predict_total(ho)
    sd = _resid_sd(resid, ho["balls_left"].to_numpy())
    return TotalsModel().fit(d, sd=sd)


def add_final_total(s: pd.DataFrame, balls: pd.DataFrame) -> pd.DataFrame:
    tot = balls[balls["innings"] == 1].groupby("match_id")["runs_total"].sum().rename("final_total")
    return s.merge(tot, on="match_id", how="left")


def walk_forward_totals(s: pd.DataFrame, test_seasons: list[int]) -> pd.DataFrame:
    parts = []
    for season in test_seasons:
        train = s[s["season"] < season]
        test = s[(s["season"] == season) & (s["innings"] == 1)].copy()
        model = fit_totals(train)
        test["total_pred"] = model.predict_total(test)
        test["total_sd"] = model.sd_for(test["balls_left"])
        parts.append(test)
    return pd.concat(parts, ignore_index=True)


# --------------------------------------------------------------------------
# Bundle: everything needed to price a new fixture or a live match state
# --------------------------------------------------------------------------
@dataclass
class Bundle:
    prematch: PreMatchModel
    inplay: InPlayModel
    totals: TotalsModel
    state: features.FeatureState
    trained_through: str

    def save(self, path: str | Path | None = None) -> Path:
        path = Path(path) if path else DEFAULT_MODEL_DIR / "bundle.joblib"
        path.parent.mkdir(parents=True, exist_ok=True)
        joblib.dump(self, path, compress=3)
        return path

    @staticmethod
    def load(path: str | Path | None = None) -> "Bundle":
        return joblib.load(Path(path) if path else DEFAULT_MODEL_DIR / "bundle.joblib")

    # ---- prediction helpers ----------------------------------------------
    def prematch_prob(self, team1, team2, venue, toss_winner=None, toss_decision=None,
                      xi1=None, xi2=None, league=None) -> dict:
        f = self.state.features(team1, team2, venue, xi1, xi2, toss_winner, toss_decision, league)
        p = float(self.prematch.predict(pd.DataFrame([f]), use_toss=True)[0])
        return {"p_team1": p, "p_team2": 1 - p, "par": f["par"], "league": f["league"], "features": f}

    def inplay_prob(self, innings: int, score: float, wickets: int, balls_bowled: int,
                    pm_prob_batting: float, par: float, target: float | None = None,
                    last18_runs: float | None = None, last18_wkts: float | None = None,
                    league: str | None = None) -> float:
        balls_left = data.FULL_INNINGS_BALLS - balls_bowled
        if balls_left <= 0 or wickets >= 10:
            raise ValueError("innings is over")
        if innings == 2 and target is None:
            raise ValueError("second innings needs a target")
        row = {
            "innings": innings, "balls_left": balls_left, "wickets_left": 10 - wickets,
            "score": score, "target": target if innings == 2 else np.nan,
            "runs_needed": (target - score) if innings == 2 else np.nan,
            "last18_runs": np.nan if last18_runs is None else last18_runs,
            "last18_wkts": np.nan if last18_wkts is None else last18_wkts,
            "par": par, "pm_logit": float(logit(pm_prob_batting)), "league": league,
        }
        if innings == 2 and row["runs_needed"] <= 0:
            return 1.0
        s = engineer(pd.DataFrame([row]))
        return float(self.inplay.predict(s)[0])

    def innings_total(self, score: float, wickets: int, balls_bowled: int,
                      pm_prob_batting: float, par: float, line: float | None = None,
                      last18_runs: float | None = None, last18_wkts: float | None = None) -> dict:
        row = {"innings": 1, "balls_left": data.FULL_INNINGS_BALLS - balls_bowled,
               "wickets_left": 10 - wickets, "score": score,
               "last18_runs": np.nan if last18_runs is None else last18_runs,
               "last18_wkts": np.nan if last18_wkts is None else last18_wkts,
               "par": par, "pm_logit": float(logit(pm_prob_batting))}
        s = engineer(pd.DataFrame([row]))
        out = {"expected_total": float(self.totals.predict_total(s)[0]),
               "sd": float(self.totals.sd_for(s["balls_left"])[0])}
        if line is not None:
            out["p_over"] = float(self.totals.prob_over(s, line)[0])
        return out


def prepare(data_dir=None):
    """Load data and build every frame the models need."""
    matches, balls = data.load(data_dir)
    F, state = features.build(matches, balls)
    pm = walk_forward_prematch(F)
    states = add_inplay_features(data.ball_states(matches, balls), pm, F)
    states = add_final_total(states, balls)
    return matches, balls, F, state, pm, states


def train_bundle(data_dir=None) -> Bundle:
    matches, balls, F, state, pm, states = prepare(data_dir)
    return Bundle(
        prematch=PreMatchModel().fit(F),
        inplay=fit_inplay(states),
        totals=fit_totals(states),
        state=state,
        trained_through=str(matches["date"].max().date()),
    )
