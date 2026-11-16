import json

import numpy as np
import pandas as pd
import pytest

from iplquant import backtest as B
from iplquant import data
from iplquant.live import LiveSession, MatchState, PaperTrader, StaleGuard, replay
from iplquant.trader import TraderConfig


def test_match_state_reproduces_the_historical_scoreboard(prepared):
    """Feeding raw deliveries through MatchState must give the same score, wickets,
    balls and momentum the model was trained on."""
    matches, balls, *_ = prepared
    states = data.ball_states(matches, balls)
    mid = matches.loc[matches["standard"], "match_id"].iloc[-3]
    b = balls[balls["match_id"] == mid]
    want = states[states["match_id"] == mid].set_index(["innings", "seq"])
    ms, seq = MatchState(), 0
    for inn in (1, 2):
        if inn == 2:
            ms.start_second_innings()
        for row in b[b["innings"] == inn].itertuples(index=False):
            if (inn, seq) in want.index:
                w = want.loc[(inn, seq)]
                runs18, wkts18 = ms.last18()
                assert (ms.score, ms.wickets, 120 - ms.balls_bowled) == (w["score"], w["wickets"], w["balls_left"])
                assert (runs18, wkts18) == (w["last18_runs"], w["last18_wkts"])
                if inn == 2:
                    assert ms.target == w["target"]
                seq += 1
            ms.ball(row.runs_total, row.wicket, bool(row.legal))
    assert seq == len(want)
    assert ms.is_over


def test_sync_drops_momentum_and_requires_a_target():
    ms = MatchState()
    ms.ball(4)
    ms.sync(1, 50, 2, 36)
    assert ms.last18() == (None, None)
    with pytest.raises(ValueError):
        MatchState().sync(2, 10, 0, 6)


def test_guard_blocks_old_scores_and_unexplained_moves():
    g = StaleGuard(max_score_age=8, max_unexplained_move=0.03)
    assert g.check(100, None, 0.5, None) == (False, "no score yet")
    assert not g.check(100, 80, 0.5, 0.5)[0]
    assert not g.check(100, 99, 0.56, 0.50)[0]
    assert g.check(100, 99, 0.51, 0.50) == (True, "")


def test_paper_trader_books_a_green_round_trip():
    pt = PaperTrader(TraderConfig(), 10_000, "m")
    assert pt.on_tick(0.60, 1 / 0.505, 1 / 0.495).kind == "enter"
    assert pt.on_tick(0.60, 1 / 0.555, 1 / 0.545).kind == "hold"
    assert pt.on_tick(0.60, 1 / 0.605, 1 / 0.595).kind == "exit"
    assert len(pt.trades) == 1 and pt.pnl > 0 and pt.open_trade is None


def test_paper_trader_respects_entry_block_and_trade_cap():
    pt = PaperTrader(TraderConfig(max_trades_per_match=1), 10_000, "m")
    assert pt.on_tick(0.60, 1.98, 2.02, allow_entry=False).kind == "hold"
    assert pt.on_tick(0.60, 1.98, 2.02).kind == "enter"
    pt.on_tick(0.50, 1.60, 1.62)                      # exits
    assert pt.on_tick(0.60, 1.98, 2.02).kind == "hold"   # cap reached
    assert pt.n_trades == 1


def test_live_session_trades_only_on_fresh_data(bundle, tmp_path):
    ledger = tmp_path / "ledger.jsonl"
    s = LiveSession(bundle, "Mumbai Indians", "Chennai Super Kings", "Wankhede Stadium",
                    ledger_path=ledger, bankroll=10_000)
    assert s.on_price(0, 2.0, 2.02)["reason"] == "no score yet"
    s.on_score(1, 1, 60, 0, 30)                       # flying start: model well above 50%
    p = s.prob_a()
    assert p > 0.55
    first = s.on_price(2, 2.0, 2.02)
    assert first["action"] == "enter" and first["side"] == "back"
    # Twenty seconds with no score refresh: nothing may happen, even at a silly price.
    stale = s.on_price(22, 1.2, 1.22)
    assert stale["fresh"] is False and stale["action"] == "hold"
    # Score refreshed and unchanged, price has shot in: the move is unexplained, so wait.
    s.on_score(23, 1, 60, 0, 30)
    assert s.on_price(24, 1.2, 1.22)["reason"] == "price moved but the score did not"
    assert s.blocked == 3
    out = s.finish(a_won=True)
    assert out["trades"] == 1 and out["pnl"] > 0
    rows = [json.loads(x) for x in ledger.read_text().splitlines()]
    assert [r.get("action", r.get("event")) for r in rows] == ["enter", "finished"]


def test_live_session_second_innings_flips_perspective(bundle):
    s = LiveSession(bundle, "Mumbai Indians", "Chennai Super Kings", "Wankhede Stadium")
    s.on_score(0, 2, 150, 2, 96, target=160)          # chasing side cruising
    assert s.prob_a() < 0.1                            # A batted first, so A is losing
    s.on_score(1, 2, 160, 2, 100, target=160)
    assert s.prob_a() == 0.0


def test_replay_runs_a_whole_match(bundle, prepared):
    matches, balls, *_ = prepared
    mid = matches.loc[matches["standard"], "match_id"].iloc[-1]
    r = replay(bundle, matches, balls, mid)
    assert r["final_state"].is_over
    assert r["summary"]["blocked_ticks"] == 0          # a ball-perfect feed is never stale
    assert len(r["ticks"]) > 150
    assert all(0 < t["p_model"] < 1 for t in r["ticks"])


def test_lagging_scores_lose_and_the_guard_prevents_it():
    # Wicket at ball 5: the true probability and the price both drop from 60% to 40%.
    p = np.r_[np.full(5, 0.60), np.full(15, 0.40)]
    d = pd.DataFrame({"match_id": "m", "season": 2025, "date": pd.Timestamp("2025-04-01"),
                      "seq": range(20), "p_a": p, "p_mkt": p, "a_won": 0})
    d = B.add_prices(d, 0.01)
    assert B.run(d, TraderConfig(), 10_000).empty                       # no lag: no edge, no trade
    late = B.run(d, TraderConfig(), 10_000, score_lag=2)
    assert len(late) == 1 and late["side"].iloc[0] == "back" and late["pnl"].iloc[0] < 0
    assert B.run(d, TraderConfig(), 10_000, score_lag=2, guard=StaleGuard()).empty
