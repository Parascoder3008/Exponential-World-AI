import numpy as np
import pandas as pd
import pytest

from iplquant import backtest as B
from iplquant import odds as O
from iplquant import oddsfeed
from iplquant.cli import _overs_to_balls, _parse_position
from iplquant.trader import TraderConfig, advise, decide, entry, exit_check


def frame(p_a, p_mkt, a_won, match_id="m1", season=2025):
    n = len(p_a)
    d = pd.DataFrame({"match_id": match_id, "season": season, "date": pd.Timestamp("2025-04-01"),
                      "seq": range(n), "p_a": p_a, "p_mkt": p_mkt, "a_won": int(a_won)})
    return B.add_prices(d, spread=0.01)


def test_no_trade_without_edge():
    cfg = TraderConfig()
    assert entry(0.50, 1.98, 2.02, 10_000, cfg).kind == "hold"
    assert entry(0.53, 1.98, 2.02, 10_000, cfg).kind == "hold"   # edge under the 4-point bar


def test_backs_when_model_is_higher_and_lays_when_lower():
    cfg = TraderConfig()
    up = entry(0.60, 1.98, 2.02, 10_000, cfg)
    assert (up.kind, up.bet.side) == ("enter", "back")
    down = entry(0.40, 1.98, 2.02, 10_000, cfg)
    assert (down.kind, down.bet.side) == ("enter", "lay")


def test_risk_is_capped():
    cfg = TraderConfig(max_risk_frac=0.02)
    a = entry(0.90, 2.00, 2.02, 10_000, cfg)
    assert a.risk == pytest.approx(200.0)
    lay = entry(0.10, 1.98, 2.00, 10_000, cfg)
    assert lay.bet.liability == pytest.approx(200.0)


def test_no_entries_at_extreme_prices():
    assert entry(0.99, 1.0 / 0.94, 1.0 / 0.93, 10_000, TraderConfig()).kind == "hold"


def test_exit_when_market_reaches_the_model():
    cfg = TraderConfig()
    pos = O.Position().add(O.Bet("back", 2.5, 100))
    act = exit_check(0.50, 1.98, 2.00, pos, 100, cfg)
    assert (act.kind, act.reason, act.bet.side) == ("exit", "edge gone", "lay")
    pos.add(act.bet)
    assert pos.is_flat and pos.exposure()[0] > 0


def test_stop_loss_fires():
    cfg = TraderConfig(stop_loss=0.3)
    pos = O.Position().add(O.Bet("back", 2.0, 100))
    act = exit_check(0.50, 3.9, 4.0, pos, 100, cfg)
    assert act.reason == "stop loss"


def test_hold_while_edge_remains():
    pos = O.Position().add(O.Bet("back", 2.5, 100))
    assert decide(0.60, 2.4, 2.44, pos, 10_000, TraderConfig(), 100).kind == "hold"


def test_backtest_green_trade_pays_the_same_whoever_wins():
    # Model says 60% throughout; market starts at 50% and walks up to 60%.
    p_mkt = np.linspace(0.50, 0.62, 30)
    results = []
    for won in (True, False):
        t = B.run(frame(np.full(30, 0.60), p_mkt, won), TraderConfig(), bankroll=10_000)
        assert len(t) == 1 and t["exit"].iloc[0] == "edge gone"
        results.append(t["pnl"].iloc[0])
    assert results[0] == pytest.approx(results[1])
    assert results[0] > 0


def test_backtest_unhedged_position_settles_on_the_result():
    cfg = TraderConfig(hedge_exits=False)
    p_mkt = np.full(10, 0.50)
    win = B.run(frame(np.full(10, 0.60), p_mkt, True), cfg, 10_000)["pnl"].iloc[0]
    lose = B.run(frame(np.full(10, 0.60), p_mkt, False), cfg, 10_000)["pnl"].iloc[0]
    stake = 200.0                               # 2% cap
    back = 1 / 0.505
    assert win == pytest.approx(stake * (back - 1) * 0.95)
    assert lose == pytest.approx(-stake)


def test_backtest_agreeing_market_never_trades():
    p = np.linspace(0.3, 0.7, 40)
    assert B.run(frame(p, p, True), TraderConfig(), 10_000).empty


def test_simulated_market_is_reproducible_and_informed_market_is_sharper():
    rng = np.random.default_rng(0)
    n_matches, balls = 400, 5
    won = np.repeat(rng.integers(0, 2, n_matches), balls)
    d = pd.DataFrame({"match_id": np.repeat([f"m{i:04d}" for i in range(n_matches)], balls),
                      "season": 2025, "date": pd.Timestamp("2025-04-01"),
                      "seq": np.tile(np.arange(balls), n_matches),
                      "p_a": 0.5, "p_base_a": 0.5, "a_won": won})
    m1 = B.simulate_market(d, B.MarketConfig(info=0.0, seed=5))
    m2 = B.simulate_market(d, B.MarketConfig(info=0.0, seed=5))
    assert np.allclose(m1["p_mkt"], m2["p_mkt"])
    assert (m1["lay_a"] > m1["back_a"]).all()
    # With no private information the market cannot beat a model that says 50%.
    assert B.market_quality(m1)["market_logloss"] >= B.market_quality(m1)["model_logloss"]
    # An informed market is the better forecaster, but it is not always right.
    sharp = B.simulate_market(d, B.MarketConfig(info=0.6, noise_sd=0.0, seed=5))
    q = B.market_quality(sharp)
    assert q["market_logloss"] < q["model_logloss"]
    wrong_side = ((sharp["p_mkt"] > 0.5) != (sharp["a_won"] == 1)).mean()
    assert 0.05 < wrong_side < 0.45
    # The private signal is one draw per match, not per ball.
    assert sharp.groupby("match_id")["p_mkt"].nunique().max() == 1


def test_summary_counts_green_and_red():
    trades = pd.DataFrame({"match_id": ["a", "b", "c"], "risk": [100, 100, 100],
                           "exit": ["edge gone", "stop loss", "settled"], "pnl": [20.0, -50.0, 90.0]})
    s = B.summarize(trades, n_matches=5, n_boot=200)
    assert s["trades"] == 3 and s["pnl"] == pytest.approx(60.0)
    assert s["green_both_sides_pct"] == pytest.approx(100 / 3)
    assert s["red_both_sides_pct"] == pytest.approx(100 / 3)
    assert s["held_to_result_pct"] == pytest.approx(100 / 3)


def test_real_odds_csv_join(tmp_path):
    d = frame(np.full(5, 0.6), np.full(5, 0.5), True)
    d["innings"], d["balls_bowled"] = 1, range(5)
    q = pd.DataFrame({"match_id": "m1", "innings": 1, "balls_bowled": [0, 1, 2],
                      "back_a": [2.0, 2.1, 2.2], "lay_a": [2.02, 2.12, 2.22]})
    path = tmp_path / "odds.csv"
    q.to_csv(path, index=False)
    out = B.load_odds_csv(str(path), d.drop(columns=["back_a", "lay_a", "p_mkt"]))
    assert len(out) == 3 and out["back_a"].tolist() == [2.0, 2.1, 2.2]


def test_advise_reports_locked_profit():
    out = advise(0.50, 1.60, 1.62, 10_000, position=O.Position().add(O.Bet("back", 2.02, 1000)),
                 risk=1000)
    assert out["action"] == "exit" and out["locked_if_hedged_now"] > 0


def test_cli_parsers():
    assert _overs_to_balls("12.3") == 75 and _overs_to_balls("20") == 120
    with pytest.raises(SystemExit):
        _overs_to_balls("12.7")
    pos = _parse_position("back@2.5x100, lay@2.1x40")
    assert [b.side for b in pos.bets] == ["back", "lay"]


def test_odds_api_payload_parsing():
    event = {"home_team": "Mumbai Indians", "away_team": "Chennai Super Kings",
             "commence_time": "2027-04-01T14:00:00Z",
             "bookmakers": [
                 {"key": "bookx", "markets": [{"key": "h2h", "outcomes": [
                     {"name": "Mumbai Indians", "price": 2.10},
                     {"name": "Chennai Super Kings", "price": 1.80}]}]},
                 {"key": "booky", "markets": [{"key": "h2h", "outcomes": [
                     {"name": "Chennai Super Kings", "price": 2.06},
                     {"name": "Mumbai Indians", "price": 1.85}]}]},
                 {"key": "empty", "markets": [{"key": "totals", "outcomes": []}]},
             ]}
    assert oddsfeed.quotes(event) == {"bookx": (2.10, 1.80), "booky": (1.85, 2.06)}
    row = oddsfeed.summarize([event], 1000)[0]
    assert row["is_arb"] and row["books"] == 2
