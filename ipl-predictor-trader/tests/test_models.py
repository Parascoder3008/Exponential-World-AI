import numpy as np
import pytest

from iplquant import models


def test_prematch_probabilities_are_complementary(bundle):
    kw = dict(venue="Eden Gardens", toss_winner="Kolkata Knight Riders", toss_decision="field")
    a = bundle.prematch_prob("Kolkata Knight Riders", "Punjab Kings", **kw)["p_team1"]
    b = bundle.prematch_prob("Punjab Kings", "Kolkata Knight Riders", **kw)["p_team1"]
    assert abs(a + b - 1.0) < 1e-9
    assert 0.25 < a < 0.75   # nothing about an IPL fixture justifies a lopsided pre-match price


def chase(bundle, **kw):
    base = dict(innings=2, score=100, wickets=3, balls_bowled=72, target=180,
                pm_prob_batting=0.5, par=175.0)
    return bundle.inplay_prob(**(base | kw))


def test_chase_gets_harder_with_more_runs_needed(bundle):
    ps = [chase(bundle, target=t) for t in (150, 170, 190, 210, 230)]
    assert all(a > b for a, b in zip(ps, ps[1:]))


def test_chase_gets_harder_with_wickets_lost(bundle):
    ps = [chase(bundle, wickets=w) for w in (1, 3, 5, 7, 9)]
    assert all(a > b for a, b in zip(ps, ps[1:]))


def test_chase_extremes(bundle):
    assert chase(bundle, score=178, balls_bowled=90, wickets=2) > 0.97
    assert chase(bundle, score=100, balls_bowled=114, wickets=8) < 0.03
    assert chase(bundle, score=180) == 1.0


def test_first_innings_scoring_faster_helps(bundle):
    kw = dict(innings=1, wickets=2, balls_bowled=60, pm_prob_batting=0.5, par=175.0)
    ps = [bundle.inplay_prob(score=s, **kw) for s in (50, 80, 110, 140)]
    assert all(a < b for a, b in zip(ps, ps[1:]))


def test_first_innings_start_is_close_to_the_prior(bundle):
    p = bundle.inplay_prob(innings=1, score=0, wickets=0, balls_bowled=0,
                           pm_prob_batting=0.5, par=175.0)
    assert 0.35 < p < 0.60


def test_invalid_states_rejected(bundle):
    with pytest.raises(ValueError):
        bundle.inplay_prob(innings=2, score=10, wickets=0, balls_bowled=6, pm_prob_batting=0.5, par=170)
    with pytest.raises(ValueError):
        bundle.inplay_prob(innings=1, score=10, wickets=10, balls_bowled=60, pm_prob_batting=0.5, par=170)


def test_total_projection_is_sane(bundle):
    t = bundle.innings_total(score=90, wickets=2, balls_bowled=60, pm_prob_batting=0.5,
                             par=180.0, line=185.5)
    assert 150 < t["expected_total"] < 230
    assert t["sd"] > 5
    lo = bundle.innings_total(90, 2, 60, 0.5, 180.0, line=150.5)["p_over"]
    hi = bundle.innings_total(90, 2, 60, 0.5, 180.0, line=230.5)["p_over"]
    assert lo > t["p_over"] > hi


def test_walk_forward_never_trains_on_the_test_season(prepared, monkeypatch):
    *_, states = prepared
    seen = []
    real = models.fit_inplay

    def spy(s):
        seen.append(int(s["season"].max()))
        return real(s)
    monkeypatch.setattr(models, "fit_inplay", spy)
    oos = models.walk_forward_inplay(states, [2025, 2026], with_baseline=False)
    assert seen == [2024, 2025]
    assert set(oos["season"]) == {2025, 2026}
    assert np.isfinite(oos["p_model"]).all()


def test_bundle_round_trip(bundle, tmp_path):
    path = bundle.save(tmp_path / "b.joblib")
    again = models.Bundle.load(path)
    assert chase(again) == pytest.approx(chase(bundle))


def test_prepare_until_drops_later_matches():
    matches, *_ , states = models.prepare(until="2020-01-01")
    assert matches["date"].max() < __import__("pandas").Timestamp("2020-01-01")
    assert states["date"].max() < __import__("pandas").Timestamp("2020-01-01")
