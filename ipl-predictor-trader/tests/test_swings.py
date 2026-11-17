import numpy as np
import pandas as pd
import pytest

from iplquant import swings


def match(mid, p_a, a_won):
    """A match from team1's point of view: team1 bats throughout for simplicity."""
    n = len(p_a)
    return pd.DataFrame({
        "match_id": mid, "season": 2025, "date": pd.Timestamp("2025-04-01"), "seq": range(n),
        "innings": 1, "balls_left": np.arange(n, 0, -1), "team1": "A", "team2": "B",
        "batting_team": "A", "winner": "A" if a_won else "B", "p_model": p_a})


def test_turnaround_pays_the_same_whoever_wins_and_is_positive():
    path = [0.5, 0.4, 0.3, 0.5, 0.7, 0.8]          # A drifts to 3.33, then B drifts to 3.33
    pnl = [swings.back_both_underdogs(match("m", path, won), 3.0)["pnl"].iloc[0] for won in (True, False)]
    assert pnl[0] == pytest.approx(pnl[1])
    # backed A at 1/0.3 and B at 1/0.3: 100 * (3.333 - 2) locked in
    assert pnl[0] == pytest.approx(100 * (1 / 0.3 - 2))


def test_no_turnaround_loses_the_first_stake():
    t = swings.back_both_underdogs(match("m", [0.5, 0.35, 0.3, 0.2, 0.1, 0.02], False), 3.0)
    assert not t["turned"].iloc[0]
    assert t["pnl"].iloc[0] == pytest.approx(-100.0)


def test_first_leg_can_be_on_team_b():
    path = [0.5, 0.7, 0.75, 0.5, 0.3]              # B is the outsider first, then A
    for won in (True, False):
        t = swings.back_both_underdogs(match("m", path, won), 3.0)
        assert t["turned"].iloc[0] and t["pnl"].iloc[0] > 0


def test_no_trade_when_nobody_reaches_the_threshold():
    assert swings.back_both_underdogs(match("m", [0.5, 0.55, 0.45, 0.5], True), 3.0).empty


def test_costs_reduce_the_locked_profit():
    path = [0.5, 0.3, 0.7, 0.9]
    free = swings.back_both_underdogs(match("m", path, True), 3.0)["pnl"].iloc[0]
    paid = swings.back_both_underdogs(match("m", path, True), 3.0, spread=0.02, commission=0.05)["pnl"].iloc[0]
    assert 0 < paid < free


def test_summary_and_lead_changes():
    d = pd.concat([match("a", [0.5, 0.3, 0.7, 0.9], True), match("b", [0.5, 0.3, 0.1], False)])
    s = swings.summarize(swings.back_both_underdogs(d, 3.0), 3.0, 2)
    assert s["traded"] == 2 and s["turnaround_pct"] == 50.0
    assert s["turnaround_pct_if_prices_fair"] == pytest.approx(50.0)
    lc = swings.lead_changes(d)
    assert lc["both_sides_favourite_at_70"] == 0.5
    assert lc["winner_was_below_30"] == 0.5
