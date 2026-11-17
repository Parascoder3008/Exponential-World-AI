"""Turn Cricsheet-format IPL match JSON files into two compact tables.

Cricsheet (https://cricsheet.org) publishes one JSON file per match. This module
reads a directory of those files and writes ``matches.csv`` and ``balls.csv.gz``,
which is everything the rest of the package needs. Re-run it whenever you download
a newer ``ipl_json.zip``.
"""
from __future__ import annotations

import json
from pathlib import Path

import pandas as pd

# Franchise T20 leagues used here: Cricsheet archive code -> name.
LEAGUES = {
    "ipl": "Indian Premier League",
    "bbl": "Big Bash League",
    "psl": "Pakistan Super League",
    "cpl": "Caribbean Premier League",
    "sat": "SA20",
    "ilt": "International League T20",
    "mlc": "Major League Cricket",
    "bpl": "Bangladesh Premier League",
    "lpl": "Lanka Premier League",
    "ntb": "Vitality Blast",
    "ssm": "Super Smash",
}

MATCH_COLUMNS = [
    "match_id", "league", "season", "date", "venue", "city", "team1", "team2",
    "toss_winner", "toss_decision", "winner", "result", "method",
    "win_by_runs", "win_by_wickets", "target_runs", "target_overs",
    "team1_players", "team2_players",
]
BALL_COLUMNS = [
    "match_id", "innings", "over", "batting_team", "batter", "non_striker", "bowler",
    "runs_batter", "runs_extras", "runs_total", "wide", "noball",
    "wicket", "player_out", "kind",
]

# Dismissals that do not cost the batting side a wicket.
NOT_A_WICKET = {"retired hurt", "retired not out"}
# Dismissals not credited to the bowler.
NOT_BOWLER_WICKET = {"run out", "retired hurt", "retired out", "retired not out",
                     "obstructing the field"}


def _season(info: dict) -> int:
    """Cricsheet seasons look like 2017 or '2007/08'; IPL seasons are named by the
    calendar year they are played in, which is the year of the first match date."""
    return int(str(info["dates"][0])[:4])


def parse_match(match_id: str, doc: dict, league: str = "ipl") -> tuple[dict, list[dict]]:
    info = doc["info"]
    teams = info["teams"]
    outcome = info.get("outcome", {})
    by = outcome.get("by", {})
    winner = outcome.get("winner") or outcome.get("eliminator")
    if outcome.get("result") == "no result":
        result = "no result"
    elif outcome.get("result") == "tie":
        result = "tie"  # decided by super over; `winner` holds the super-over winner
    else:
        result = "win"

    innings = [inn for inn in doc.get("innings", []) if not inn.get("super_over")]
    target = innings[1].get("target", {}) if len(innings) > 1 else {}
    players = info.get("players", {})
    match = {
        "match_id": match_id,
        "league": league,
        "season": _season(info),
        "date": str(info["dates"][0]),
        "venue": info.get("venue"),
        "city": info.get("city"),
        "team1": teams[0],
        "team2": teams[1],
        "toss_winner": info.get("toss", {}).get("winner"),
        "toss_decision": info.get("toss", {}).get("decision"),
        "winner": winner,
        "result": result,
        "method": outcome.get("method"),
        "win_by_runs": by.get("runs"),
        "win_by_wickets": by.get("wickets"),
        "target_runs": target.get("runs"),
        "target_overs": target.get("overs"),
        "team1_players": "|".join(players.get(teams[0], [])),
        "team2_players": "|".join(players.get(teams[1], [])),
    }

    balls: list[dict] = []
    for inn_no, inn in enumerate(innings[:2], start=1):
        for over in inn.get("overs", []):
            for d in over.get("deliveries", []):
                extras = d.get("extras", {})
                wickets = d.get("wickets", [])
                real = [w for w in wickets if w.get("kind") not in NOT_A_WICKET]
                balls.append({
                    "match_id": match_id,
                    "innings": inn_no,
                    "over": over["over"],
                    "batting_team": inn["team"],
                    "batter": d["batter"],
                    "non_striker": d.get("non_striker"),
                    "bowler": d["bowler"],
                    "runs_batter": d["runs"]["batter"],
                    "runs_extras": d["runs"]["extras"],
                    "runs_total": d["runs"]["total"],
                    "wide": int("wides" in extras),
                    "noball": int("noballs" in extras),
                    "wicket": len(real),
                    "player_out": real[0]["player_out"] if real else None,
                    "kind": real[0]["kind"] if real else None,
                })
    return match, balls


def _is_mens_t20(doc) -> bool:
    if not isinstance(doc, dict) or "info" not in doc:
        return False
    info = doc["info"]
    return info.get("gender", "male") == "male" and info.get("match_type", "T20") == "T20"


def _read_dir(json_dir: Path, league: str, matches: list, balls: list) -> None:
    for f in sorted(json_dir.glob("*.json")):
        with open(f, encoding="utf-8") as fh:
            doc = json.load(fh)
        if not _is_mens_t20(doc):
            continue
        m, b = parse_match(f"{league}-{f.stem}", doc, league)
        matches.append(m)
        balls.extend(b)


def _write(matches, balls, out_dir: Path):
    mdf = pd.DataFrame(matches, columns=MATCH_COLUMNS).sort_values(["date", "match_id"])
    bdf = pd.DataFrame(balls, columns=BALL_COLUMNS)
    out_dir.mkdir(parents=True, exist_ok=True)
    mdf.to_csv(out_dir / "matches.csv", index=False)
    bdf.to_csv(out_dir / "balls.csv.gz", index=False, compression="gzip")
    return mdf, bdf


def ingest(json_dir: str | Path, out_dir: str | Path, league: str = "ipl") -> tuple[pd.DataFrame, pd.DataFrame]:
    """One folder of match files from a single league."""
    json_dir, out_dir = Path(json_dir), Path(out_dir)
    if not any(json_dir.glob("*.json")):
        raise FileNotFoundError(f"no .json match files in {json_dir}")
    matches, balls = [], []
    _read_dir(json_dir, league, matches, balls)
    return _write(matches, balls, out_dir)


def ingest_leagues(root: str | Path, out_dir: str | Path) -> tuple[pd.DataFrame, pd.DataFrame]:
    """``root`` holds one sub-folder per league, named by its code in ``LEAGUES``
    (the unzipped ``<code>_json.zip`` archives from cricsheet.org/downloads)."""
    root = Path(root)
    matches, balls = [], []
    found = []
    for code in LEAGUES:
        d = root / code
        if d.is_dir() and any(d.glob("*.json")):
            _read_dir(d, code, matches, balls)
            found.append(code)
    if not found:
        raise FileNotFoundError(f"no league folders ({', '.join(LEAGUES)}) in {root}")
    return _write(matches, balls, Path(out_dir))
