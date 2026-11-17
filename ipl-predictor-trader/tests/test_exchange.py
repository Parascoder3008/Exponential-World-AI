import json
import os
import time
from pathlib import Path

import pytest

from iplquant import odds as O
from iplquant.exchange import mock, scoreparse
from iplquant.exchange.bot import RiskLimits, TradingBot, match_runner, summary
from iplquant.exchange.browser import BrowserExchange, PlaceResult, Snapshot, fill_price, parse_price
from iplquant.exchange.config import SiteConfig
from iplquant.trader import TraderConfig

S = scoreparse.Score


# ---- pure helpers -------------------------------------------------------------
@pytest.mark.parametrize("text,want", [
    ("MI 96/3 (12.0)", S(1, 96, 3, 72)),
    ("MI 96-3 (12.2 ov)", S(1, 96, 3, 74)),
    ("Mumbai Indians 0/0 (0.0)", S(1, 0, 0, 0)),
    ("CSK 180/6 (20) | MI 96/3 (12)", S(2, 96, 3, 72, 181)),
    ("MI 96/3 (12.0) Target 181", S(2, 96, 3, 72, 181)),
    ("CSK 150 all out | MI 20/1 (3.1)", S(2, 20, 1, 19, 151)),
    ("96/3 in 12.4 overs, need 85 from 44 balls", S(2, 96, 3, 76, 181)),
])
def test_score_parser(text, want):
    assert scoreparse.parse(text) == want


@pytest.mark.parametrize("text", [None, "", "Match starts at 19:30", "MI 96/3 (12.7)", "MI 96/13 (12.0)"])
def test_score_parser_refuses_what_it_cannot_read(text):
    assert scoreparse.parse(text) is None


def test_price_readers():
    assert parse_price("2.04\n£1,203") == 2.04
    assert parse_price("-") is None and parse_price("") is None and parse_price("0.5") is None
    assert fill_price("Matched: BACK X @ 3.50  stake 100.00") == 3.5
    assert fill_price("stake 100") is None


def test_price_ladder():
    assert O.to_tick(2.037, "down") == 2.02 and O.to_tick(2.037, "up") == 2.04
    assert O.to_tick(3.33, "up") == 3.35 and O.to_tick(7.31, "down") == 7.2
    assert O.to_tick(0.5) == 1.01 and O.to_tick(5000) == 1000.0


def test_runner_matching():
    names = ["Royal Challengers Bengaluru", "Gujarat Titans"]
    assert match_runner(names, "Gujarat Titans") == 1
    assert match_runner(["RCB", "GT"], "Gujarat Titans") == 1
    assert match_runner(["Bengaluru", "Gujarat"], "Royal Challengers Bengaluru") == 0
    assert match_runner(["MI", "CSK"], "Chennai Super Kings", {"CSK": "Chennai Super Kings"}) == 1
    assert match_runner(["Team X", "Team Y"], "Perth Scorchers") is None


def test_site_config_round_trip(tmp_path):
    cfg = mock.practice_site()
    assert cfg.missing(execute=True) == []
    again = SiteConfig.load(cfg.save(tmp_path / "s.json"))
    assert again == cfg
    assert "stake_input" in SiteConfig(url="x", runner_name=["a", "b"], back_price=["a", "b"],
                                       lay_price=["a", "b"]).missing(execute=True)
    (tmp_path / "bad.json").write_text(json.dumps({"url": "x", "password": "no"}))
    with pytest.raises(ValueError):
        SiteConfig.load(tmp_path / "bad.json")


# ---- bot logic with a scripted exchange ---------------------------------------
class FakeExchange:
    """Plays back a list of (score_text, back_a, lay_a) with team A as runner 2."""
    def __init__(self, frames, fill_better=0.0):
        self.frames, self.i, self.orders, self.fill_better = frames, 0, [], fill_better

    def read(self):
        score, back, lay = self.frames[min(self.i, len(self.frames) - 1)]
        self.i += 1
        return Snapshot(time.time(), ["Chennai Super Kings", "Mumbai Indians"],
                        [2.0, back], [2.02, lay], score)

    def place(self, runner, side, odds, stake):
        self.orders.append((runner, side, odds, stake))
        better = odds + self.fill_better if side == "back" else odds - self.fill_better
        return PlaceResult(True, "matched", True, round(better, 2))


def frames(prices, start_runs=60):
    return [(f"MI {start_runs + i}/0 ({5 + i // 6}.{i % 6})", 1 / (p + 0.005), 1 / (p - 0.005))
            for i, p in enumerate(prices)]


def make_bot(bundle, ex, mode="execute", tmp=None, **lim):
    clock = iter(range(10_000)).__next__
    return TradingBot(ex, bundle, mode, "Mumbai Indians", "Chennai Super Kings", "Wankhede Stadium",
                      cfg=TraderConfig(commission=0.02), bankroll=10_000,
                      limits=RiskLimits(**({"stop_file": str(tmp / "STOP")} | lim)),
                      ledger_path=tmp / "ledger.jsonl", notify=lambda *_: None, clock=lambda: float(clock()))


def test_bot_opens_and_greens_with_fill_prices_recorded(bundle, tmp_path):
    # Fast start: the model likes MI well above a 45% market; then the market catches up.
    ex = FakeExchange(frames([0.45] * 3 + [0.55, 0.65, 0.75, 0.80, 0.85]), fill_better=0.02)
    bot = make_bot(bundle, ex, tmp=tmp_path)
    for _ in range(8):
        bot.step()
    assert [o[0] for o in ex.orders] == [1] * len(ex.orders)          # always MI's row
    assert ex.orders[0][1] == "back"
    t = bot.session.trader.trades
    assert len(t) == 1 and t[0]["pnl"] > 0
    assert t[0]["entry_odds"] == round(ex.orders[0][2] + 0.02, 2)    # filled better than asked
    assert t[0]["risk"] <= 100.0 + 1e-9


def test_recorder_saves_every_reading(bundle, tmp_path):
    import csv
    ex = FakeExchange(frames([0.45, 0.5]) + [("Live", 2.0, 2.04)])
    bot = make_bot(bundle, ex, mode="paper", tmp=tmp_path)
    bot.record_path = tmp_path / "ticks.csv"
    for _ in range(3):
        bot.step()
    rows = list(csv.DictReader(open(tmp_path / "ticks.csv")))
    assert len(rows) == 3 and rows[0]["runs"] == "60" and rows[0]["team_a"] == "Mumbai Indians"
    assert rows[2]["innings"] == "" and float(rows[2]["back_a"]) == 2.0


def test_paper_and_advise_never_click(bundle, tmp_path):
    for mode in ("paper", "advise"):
        ex = FakeExchange(frames([0.45] * 3 + [0.6, 0.8]))
        bot = make_bot(bundle, ex, mode=mode, tmp=tmp_path)
        for _ in range(5):
            bot.step()
        assert ex.orders == [] and bot.session.trader.n_trades == 1


def test_stop_file_hedges_and_stops(bundle, tmp_path):
    ex = FakeExchange(frames([0.45] * 6))
    bot = make_bot(bundle, ex, tmp=tmp_path)
    for _ in range(3):
        bot.step()
    assert bot.session.trader.open_trade is not None
    (tmp_path / "STOP").write_text("")
    out = bot.step()
    assert out["event"] == "stopped" and out["flat"]
    assert bot.session.trader.open_trade is None and len(ex.orders) == 2


def test_daily_loss_limit_blocks_new_positions(bundle, tmp_path):
    ex = FakeExchange(frames([0.45] * 4))
    bot = make_bot(bundle, ex, tmp=tmp_path, daily_loss_limit=0.0)
    for _ in range(4):
        out = bot.step()
    assert ex.orders == [] and out["reason"] == "daily loss limit reached"


def test_unreadable_score_means_no_trading(bundle, tmp_path):
    ex = FakeExchange([("Live", 1 / 0.455, 1 / 0.445)] * 4)
    bot = make_bot(bundle, ex, tmp=tmp_path)
    for _ in range(4):
        out = bot.step()
    assert ex.orders == [] and out["reason"] == "no score yet" and bot.unreadable == 4


def test_unknown_runners_stop_the_bot(bundle, tmp_path):
    ex = FakeExchange(frames([0.5]))
    bot = TradingBot(ex, bundle, "paper", "Perth Scorchers", "Sydney Sixers", "Perth Stadium",
                     ledger_path=tmp_path / "l.jsonl", notify=lambda *_: None)
    with pytest.raises(RuntimeError):
        bot.step()


# ---- real browser against the practice exchange --------------------------------
def _chrome():
    if os.environ.get("IPLQUANT_CHROME"):
        return os.environ["IPLQUANT_CHROME"]
    p = Path("/opt/pw-browsers/chromium-1243/chrome-linux64/chrome")
    return str(p) if p.exists() else None


@pytest.fixture(scope="module")
def practice(bundle, prepared, tmp_path_factory):
    pytest.importorskip("playwright")
    matches, balls, *_ = prepared
    d = mock.build_ticks(bundle, matches, balls, "ipl-1535465")
    site = mock.write_site(d, tmp_path_factory.mktemp("practice"), ms=60)
    srv = mock.serve(site, 8791)
    yield d, mock.practice_site(8791)
    srv.shutdown()


@pytest.fixture
def browser_ex(practice, tmp_path):
    d, cfg = practice
    try:
        ex = BrowserExchange(cfg, profile_dir=tmp_path / "profile", headless=True,
                             executable_path=_chrome()).start()
    except Exception as e:  # noqa: BLE001
        pytest.skip(f"no browser: {e}")
    ex.page.wait_for_selector("#market .back")
    yield ex
    ex.close()


def test_practice_data_is_a_real_match(practice):
    d, _ = practice
    assert d["runners"] == [d["bowling_first"], d["batting_first"]]   # A is deliberately 2nd
    assert all(scoreparse.parse(t["score"]) for t in d["ticks"])
    assert d["ticks"][-1]["status"].startswith("Closed")


def test_calibration_picker_records_a_working_selector(browser_ex):
    from iplquant.exchange import calibrate
    pg = browser_ex.page
    calibrate.install(pg)
    pg.evaluate("() => { window.__iqPick = null; window.__iqArmed = true; }")
    pg.click("#market tr:nth-of-type(2) .lay")
    sel = pg.evaluate("() => window.__iqPick")
    assert pg.evaluate("(s) => document.querySelector(s) === document.querySelector('#market tr:nth-of-type(2) .lay')", sel)
    assert pg.is_hidden("#slip")                    # the captured click did not reach the page


def test_bot_trades_a_whole_match_in_the_browser(browser_ex, practice, bundle, tmp_path):
    d, _ = practice
    bot = TradingBot(browser_ex, bundle, "execute", d["batting_first"], d["bowling_first"], d["venue"],
                     cfg=TraderConfig(commission=0.02), bankroll=10_000,
                     limits=RiskLimits(100, 300, str(tmp_path / "STOP")),
                     ledger_path=tmp_path / "ledger.jsonl", notify=lambda *_: None)
    out = bot.run(poll_seconds=0.03, max_seconds=60)
    assert out["event"] == "finished" and out["a_won"] == (d["winner"] == d["batting_first"])
    page_bets = browser_ex.page.evaluate("window.__mock.bets")
    orders = [r for r in map(json.loads, (tmp_path / "ledger.jsonl").read_text().splitlines())
              if r.get("event") == "order"]
    assert len(page_bets) == len(orders) and all(b["runner"] == d["batting_first"] for b in page_bets)
    assert all(b["matched"] for b in page_bets)
    # The ledger books every bet at the price the page actually matched.
    booked = [(t["entry_odds"], t["exit_odds"]) for t in bot.session.trader.trades]
    flat = [x for pair in booked for x in pair if x == x]
    assert flat == pytest.approx([b["odds"] for b in page_bets][:len(flat)])
    assert summary(tmp_path / "ledger.jsonl")["matches"] == 1
