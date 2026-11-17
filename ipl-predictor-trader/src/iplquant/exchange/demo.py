"""Run the whole system on the practice exchange: a series of past matches replayed one
after another, the bot trading each in the browser, signals written for the dashboard.

The model used is trained only on matches played before the first replayed match, so
what it shows during the replay is a genuine forecast. Prices on the practice exchange
are simulated, so the profit and loss means nothing.
"""
from __future__ import annotations

import tempfile
from pathlib import Path

from .. import data, models
from ..trader import TraderConfig
from . import mock
from .bot import RiskLimits, TradingBot
from .browser import BrowserExchange


def pick_matches(matches, leagues, n: int) -> list:
    m = matches[matches["standard"] & matches["league"].isin(leagues)].sort_values("date")
    per = max(n // max(len(leagues), 1), 1)
    chosen = [m[m["league"] == lg].tail(per) for lg in leagues]
    import pandas as pd
    return list(pd.concat(chosen).sort_values("date")["match_id"])


def run_demo(leagues=("ipl", "bbl"), n: int = 6, ms: int = 1200, mode: str = "execute",
             port: int = 8777, signals: str = "signals.jsonl", ledger: str = "ledger.jsonl",
             headless: bool = True, data_dir=None, notify=print, bankroll: float = 10_000.0,
             max_risk: float = 100.0, executable_path: str | None = None) -> list:
    matches, balls = data.load(data_dir)
    ids = pick_matches(matches, list(leagues), n)
    first = matches.loc[matches["match_id"] == ids[0], "date"].iloc[0]
    notify(f"Training a model on matches before {first.date()} only ...")
    bundle = models.train_bundle(data_dir, until=first)
    site_dir = Path(tempfile.mkdtemp(prefix="practice-"))
    srv = None
    ex = None
    results = []
    try:
        for k, mid in enumerate(ids, 1):
            d = mock.build_ticks(bundle, matches, balls, mid, seed=k)
            mock.write_site(d, site_dir, ms=ms)
            if srv is None:
                srv = mock.serve(site_dir, port)
            cfg = mock.practice_site(port)
            if ex is None:
                ex = BrowserExchange(cfg, profile_dir=site_dir / "profile", headless=headless,
                                     executable_path=executable_path).start()
            else:
                ex.page.goto(cfg.url)
            ex.page.wait_for_selector("#market .back")
            notify(f"\n[{k}/{len(ids)}] {d['title']}")
            bot = TradingBot(ex, bundle, mode, d["batting_first"], d["bowling_first"], d["venue"],
                             cfg=TraderConfig(commission=0.02), bankroll=bankroll,
                             limits=RiskLimits(max_risk, 3 * max_risk, str(site_dir / "STOP")),
                             ledger_path=ledger, signals_path=signals, notify=notify)
            results.append(bot.run(poll_seconds=min(cfg.poll_seconds, ms / 2000)))
    finally:
        if ex is not None:
            ex.close()
        if srv is not None:
            srv.shutdown()
    return results
