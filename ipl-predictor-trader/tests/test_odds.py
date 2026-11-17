import math

import pytest

from iplquant import odds as O


def test_devig_sums_to_one_and_removes_margin():
    pa, pb = O.devig(1.80, 2.00)
    assert math.isclose(pa + pb, 1.0)
    assert O.overround(1.80, 2.00) > 0
    assert pa > pb


def test_kelly_zero_without_edge():
    assert O.kelly_back(0.5, 2.0) == 0.0
    assert O.kelly_back(0.4, 2.0) == 0.0
    assert O.kelly_lay(0.5, 2.0) == 0.0


def test_kelly_matches_textbook():
    # p=0.6 at evens -> f* = 2p-1 = 0.2
    assert math.isclose(O.kelly_back(0.6, 2.0), 0.2)
    # laying at evens when p=0.4 is the mirror image
    assert math.isclose(O.kelly_lay(0.4, 2.0), 0.2)


def test_commission_shrinks_edge():
    assert O.edge_back(0.55, 2.0, 0.05) < O.edge_back(0.55, 2.0, 0.0)
    assert O.kelly_back(0.55, 2.0, 0.05) < O.kelly_back(0.55, 2.0, 0.0)


def test_green_up_equalises_and_is_positive_when_price_shortens():
    g = O.green_up(back_odds=2.5, back_stake=100, lay_odds=2.0)
    assert math.isclose(g["profit_if_a_wins"], g["profit_if_a_loses"])
    assert math.isclose(g["lay_stake"], 125.0)
    assert math.isclose(g["profit_if_a_wins"], 25.0)


def test_green_up_locks_a_loss_when_price_drifts():
    g = O.green_up(back_odds=2.0, back_stake=100, lay_odds=2.5)
    assert math.isclose(g["profit_if_a_wins"], g["profit_if_a_loses"])
    assert g["profit_if_a_wins"] < 0


def test_hedge_from_lay_position_uses_back():
    pos = O.Position().add(O.Bet("lay", 2.0, 100))
    h = pos.hedge(back_odds=2.6, lay_odds=2.64)
    assert h.side == "back"
    pos.add(h)
    a, l = pos.exposure()
    assert math.isclose(a, l)
    assert a > 0  # laid short, backed back longer -> green


def test_spread_costs_money_on_round_trip():
    pos = O.Position().add(O.Bet("back", 2.00, 100))
    assert pos.locked(back_odds=2.00, lay_odds=2.02) < 0


def test_settle_charges_commission_on_net_winnings_only():
    pos = O.Position().add(O.Bet("back", 3.0, 100))
    assert math.isclose(pos.settle(True, 0.05), 190.0)
    assert math.isclose(pos.settle(False, 0.05), -100.0)


def test_locked_matches_settlement_after_hedging():
    pos = O.Position().add(O.Bet("back", 3.0, 100)).add(O.Bet("lay", 2.2, 40))
    locked = pos.locked(2.0, 2.04, commission=0.05)
    pos.add(pos.hedge(2.0, 2.04))
    assert math.isclose(pos.settle(True, 0.05), locked)
    assert math.isclose(pos.settle(False, 0.05), locked)
    assert pos.is_flat


def test_arbitrage_detects_and_sizes():
    arb = O.arbitrage(2.10, 2.05, 1000)
    assert arb["is_arb"]
    assert math.isclose(arb["stake_a"] * 2.10, arb["stake_b"] * 2.05)
    assert arb["profit"] > 0
    assert not O.arbitrage(1.90, 1.90)["is_arb"]


def test_scan_picks_best_price_per_side():
    res = O.scan_arbitrage({"x": (1.85, 2.02), "y": (2.08, 1.80), "z": (1.95, 1.95)})
    assert (res["book_a"], res["book_b"]) == ("y", "x")
    assert res["is_arb"]


def test_bad_inputs_rejected():
    with pytest.raises(ValueError):
        O.implied_prob(1.0)
    with pytest.raises(ValueError):
        O.Bet("buy", 2.0, 10)
    with pytest.raises(ValueError):
        O.Bet("back", 2.0, 0)
