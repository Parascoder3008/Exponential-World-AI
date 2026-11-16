"""Load the match/ball snapshot and derive the per-ball match state."""
from __future__ import annotations

from pathlib import Path

import numpy as np
import pandas as pd

DEFAULT_DATA_DIR = Path(__file__).resolve().parents[2] / "data"

# Franchises that were renamed keep one identity. Franchises that were dissolved and
# replaced (Deccan Chargers -> Sunrisers, Pune Warriors, Gujarat Lions ...) stay
# separate: a new franchise starts with a new squad and a fresh rating.
TEAM_ALIASES = {
    "Delhi Daredevils": "Delhi Capitals",
    "Kings XI Punjab": "Punjab Kings",
    "Royal Challengers Bangalore": "Royal Challengers Bengaluru",
    "Rising Pune Supergiants": "Rising Pune Supergiant",
}

VENUE_ALIASES = {
    "M.Chinnaswamy Stadium": "M Chinnaswamy Stadium",
    "Feroz Shah Kotla": "Arun Jaitley Stadium",
    "Sardar Patel Stadium": "Narendra Modi Stadium",
    "Punjab Cricket Association Stadium": "Punjab Cricket Association IS Bindra Stadium",
    "Zayed Cricket Stadium": "Sheikh Zayed Stadium",
    "Subrata Roy Sahara Stadium": "Maharashtra Cricket Association Stadium",
}

FULL_INNINGS_BALLS = 120


def normalize_team(name):
    if not isinstance(name, str):
        return name
    return TEAM_ALIASES.get(name, name)


def normalize_venue(name):
    if not isinstance(name, str):
        return name
    base = name.split(",")[0].strip()
    return VENUE_ALIASES.get(base, base)


def load(data_dir: str | Path | None = None) -> tuple[pd.DataFrame, pd.DataFrame]:
    """Return ``(matches, balls)`` with normalized names, sorted chronologically."""
    data_dir = Path(data_dir) if data_dir else DEFAULT_DATA_DIR
    matches = pd.read_csv(data_dir / "matches.csv", dtype={"match_id": str})
    balls = pd.read_csv(data_dir / "balls.csv.gz", dtype={"match_id": str})

    for col in ("team1", "team2", "toss_winner", "winner"):
        matches[col] = matches[col].map(normalize_team)
    matches["venue"] = matches["venue"].map(normalize_venue)
    matches["date"] = pd.to_datetime(matches["date"])
    matches["team1_players"] = matches["team1_players"].fillna("")
    matches["team2_players"] = matches["team2_players"].fillna("")
    # A "standard" match is a completed, full 20-over-a-side game. Rain-shortened and
    # Duckworth-Lewis matches change what "balls left" means, so the in-play model
    # and backtests skip them.
    matches["standard"] = (
        (matches["result"] != "no result")
        & matches["method"].isna()
        & (matches["target_overs"] == 20)
        & matches["winner"].notna()
    )
    matches = matches.sort_values(["date", "match_id"]).reset_index(drop=True)

    balls["batting_team"] = balls["batting_team"].map(normalize_team)
    balls["legal"] = 1 - np.maximum(balls["wide"], balls["noball"])
    return matches, balls


def ball_states(matches: pd.DataFrame, balls: pd.DataFrame) -> pd.DataFrame:
    """One row per delivery describing the match *before* that ball is bowled.

    The label ``won`` is 1 when the side batting at that moment went on to win.
    Only standard matches are returned.
    """
    m = matches.loc[matches["standard"], ["match_id", "season", "date", "team1", "team2",
                                            "winner", "target_runs", "venue"]]
    b = balls.merge(m, on="match_id", how="inner").reset_index(drop=True)
    g = b.groupby(["match_id", "innings"], sort=False)

    b["score"] = g["runs_total"].cumsum() - b["runs_total"]
    b["wickets"] = g["wicket"].cumsum() - b["wicket"]
    b["balls_bowled"] = g["legal"].cumsum() - b["legal"]
    b["balls_left"] = FULL_INNINGS_BALLS - b["balls_bowled"]
    b["wickets_left"] = 10 - b["wickets"]

    # Momentum: runs and wickets over the previous 18 deliveries of this innings
    # (a 19-wide window that includes the current ball, minus the current ball).
    b["last18_runs"] = (g["runs_total"].rolling(19, min_periods=1).sum()
                        .reset_index(level=[0, 1], drop=True) - b["runs_total"])
    b["last18_wkts"] = (g["wicket"].rolling(19, min_periods=1).sum()
                        .reset_index(level=[0, 1], drop=True) - b["wicket"])

    b["bowling_team"] = np.where(b["batting_team"] == b["team1"], b["team2"], b["team1"])
    b["target"] = np.where(b["innings"] == 2, b["target_runs"], np.nan)
    b["runs_needed"] = b["target"] - b["score"]
    b["won"] = (b["batting_team"] == b["winner"]).astype(int)

    # A handful of rows sit past the end of a finished innings in the source data
    # (extra deliveries logged after ball 120); drop them.
    b = b[(b["balls_left"] > 0) & (b["wickets_left"] > 0)]
    b = b[(b["innings"] == 1) | (b["runs_needed"] > 0)]
    b = b.sort_values(["date", "match_id", "innings"], kind="stable").reset_index(drop=True)
    b["seq"] = b.groupby("match_id").cumcount()
    return b


def innings_totals(balls: pd.DataFrame) -> pd.DataFrame:
    """Runs, wickets and legal balls per (match, innings)."""
    return (balls.groupby(["match_id", "innings"])
            .agg(runs=("runs_total", "sum"), wickets=("wicket", "sum"), balls=("legal", "sum"))
            .reset_index())
