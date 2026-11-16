import numpy as np
import pandas as pd

from iplquant import data, features
from iplquant.ingest import parse_match


def test_snapshot_shape(prepared):
    matches, balls, *_ = prepared
    assert len(matches) > 1200
    assert matches["date"].is_monotonic_increasing
    assert set(balls["innings"].unique()) == {1, 2}
    assert not matches.loc[matches["standard"], "winner"].isna().any()


def test_ball_state_reconstructs_the_scoreboard(prepared):
    matches, balls, *_ = prepared
    states = data.ball_states(matches, balls)
    mid = states["match_id"].iloc[-1]
    s = states[states["match_id"] == mid]
    first = s[s["innings"] == 1]
    assert first.iloc[0][["score", "wickets", "balls_left"]].tolist() == [0, 0, 120]
    # target shown in the chase is the first-innings total plus one
    total = balls[(balls["match_id"] == mid) & (balls["innings"] == 1)]["runs_total"].sum()
    assert s[s["innings"] == 2]["target"].iloc[0] == total + 1
    assert (s["balls_left"] > 0).all() and (s["wickets_left"] > 0).all()
    assert s["won"].isin([0, 1]).all()


def test_features_never_use_the_future(prepared):
    """Features for match k must be identical whether or not later matches exist."""
    matches, balls, F, *_ = prepared
    k = 900
    cut = matches.iloc[: k + 1]
    Fk, _ = features.build(cut, balls[balls["match_id"].isin(cut["match_id"])])
    a = Fk.iloc[k][features.FEATURES + ["par"]].astype(float).to_numpy()
    b = F.iloc[k][features.FEATURES + ["par"]].astype(float).to_numpy()
    np.testing.assert_allclose(a, b, rtol=0, atol=1e-12)


def test_features_do_not_depend_on_the_match_result(prepared):
    """Flipping the winner of match k must not change match k's own features."""
    matches, balls, F, *_ = prepared
    k = 700
    m2 = matches.iloc[: k + 1].copy()
    row = m2.iloc[k]
    m2.iloc[k, m2.columns.get_loc("winner")] = row.team2 if row.winner == row.team1 else row.team1
    F2, _ = features.build(m2, balls[balls["match_id"].isin(m2["match_id"])])
    np.testing.assert_allclose(
        F2.iloc[k][features.FEATURES].astype(float).to_numpy(),
        F.iloc[k][features.FEATURES].astype(float).to_numpy(), atol=1e-12)


def test_features_are_antisymmetric(prepared):
    *_, state, _, _ = prepared
    a = state.features("Mumbai Indians", "Chennai Super Kings", "Wankhede Stadium",
                       toss_winner="Mumbai Indians", toss_decision="field")
    b = state.features("Chennai Super Kings", "Mumbai Indians", "Wankhede Stadium",
                       toss_winner="Mumbai Indians", toss_decision="field")
    for f in features.FEATURES:
        assert abs(a[f] + b[f]) < 1e-9, f


def test_aliases():
    assert data.normalize_team("Delhi Daredevils") == "Delhi Capitals"
    assert data.normalize_team("Royal Challengers Bangalore") == "Royal Challengers Bengaluru"
    assert data.normalize_venue("Wankhede Stadium, Mumbai") == "Wankhede Stadium"
    assert data.normalize_venue("Feroz Shah Kotla") == "Arun Jaitley Stadium"


def test_parse_match_handles_super_over_and_retirements():
    def ball(batter, runs, extras=None, wickets=None):
        d = {"batter": batter, "bowler": "B", "non_striker": "N",
             "runs": {"batter": runs, "extras": 0, "total": runs}}
        if extras:
            d["extras"] = extras
            d["runs"]["extras"] = sum(extras.values())
            d["runs"]["total"] += sum(extras.values())
        if wickets:
            d["wickets"] = wickets
        return d
    doc = {"info": {"dates": ["2020-10-18"], "teams": ["X", "Y"], "venue": "V", "city": "C",
                    "toss": {"winner": "X", "decision": "bat"},
                    "outcome": {"result": "tie", "eliminator": "Y"},
                    "players": {"X": ["a", "b"], "Y": ["c", "d"]}},
           "innings": [
               {"team": "X", "overs": [{"over": 0, "deliveries": [
                   ball("a", 4), ball("a", 0, {"wides": 1}),
                   ball("a", 0, wickets=[{"kind": "retired hurt", "player_out": "a"}]),
                   ball("b", 0, wickets=[{"kind": "bowled", "player_out": "b"}])]}]},
               {"team": "Y", "target": {"runs": 6, "overs": 20},
                "overs": [{"over": 0, "deliveries": [ball("c", 5)]}]},
               {"team": "X", "super_over": True, "overs": [{"over": 0, "deliveries": [ball("a", 6)]}]},
           ]}
    m, b = parse_match("1", doc)
    assert (m["result"], m["winner"], m["target_runs"]) == ("tie", "Y", 6)
    assert len(b) == 5                       # super over excluded
    assert [x["wicket"] for x in b] == [0, 0, 0, 1, 0]   # retired hurt is not a wicket
    assert b[1]["wide"] == 1 and b[1]["runs_total"] == 1
