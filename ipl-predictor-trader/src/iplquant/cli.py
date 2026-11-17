"""Command line interface: ``ipl <command>``."""
from __future__ import annotations

import argparse
import json
import sys

from . import odds as O


def _overs_to_balls(overs: str) -> int:
    """'12.3' -> 75 legal balls (12 overs and 3 balls)."""
    whole, _, part = str(overs).partition(".")
    balls = int(part) if part else 0
    if not 0 <= balls <= 5:
        raise SystemExit("overs must look like 12.3 (the part after the dot is balls, 0-5)")
    return int(whole) * 6 + balls


def _parse_position(text: str | None) -> O.Position:
    """'back@2.5x100,lay@2.1x40' -> Position (all bets quoted on team A)."""
    pos = O.Position()
    if not text:
        return pos
    for part in text.split(","):
        side, rest = part.strip().split("@")
        price, stake = rest.split("x")
        pos.add(O.Bet(side.strip(), float(price), float(stake)))
    return pos


def _print(obj) -> None:
    def fmt(v):
        return round(v, 4) if isinstance(v, float) else v
    if isinstance(obj, dict):
        obj = {k: fmt(v) for k, v in obj.items() if k != "features"}
    print(json.dumps(obj, indent=2, default=str))


def _bundle(args):
    from .models import Bundle
    try:
        return Bundle.load(args.model)
    except FileNotFoundError:
        raise SystemExit("no trained model found - run `ipl train` first")


# ---- commands -------------------------------------------------------------
def cmd_ingest(a):
    from pathlib import Path
    from .ingest import LEAGUES, ingest, ingest_leagues
    src = Path(a.json_dir)
    if any((src / code).is_dir() for code in LEAGUES):
        m, b = ingest_leagues(src, a.out)
    else:
        m, b = ingest(src, a.out, league=a.league)
    print(f"wrote {len(m)} matches and {len(b)} deliveries to {a.out}")
    print(m.groupby("league").size().to_string())


def cmd_train(a):
    from .models import train_bundle
    b = train_bundle(a.data)
    print(f"trained through {b.trained_through}; saved to {b.save(a.model)}")


def cmd_evaluate(a):
    from . import report
    r = report.evaluate(a.data)
    out = report.write(r, a.out)
    print(report.to_markdown(r))
    print(f"written to {out}/REPORT.md and {out}/metrics.json")


def cmd_backtest(a):
    import pandas as pd
    from . import backtest, models, report
    from .trader import TraderConfig
    cfg = TraderConfig(commission=a.commission, entry_edge=a.entry_edge, exit_edge=a.exit_edge,
                       stop_loss=a.stop_loss, hedge_exits=not a.hold)
    *_, states = models.prepare(a.data)
    seasons = a.seasons or report.TEST_SEASONS
    oos = models.walk_forward_inplay(states, seasons)
    d = backtest.to_team1(oos)
    if a.odds_csv:
        d = backtest.load_odds_csv(a.odds_csv, d)
        trades = backtest.run(d, cfg, a.bankroll)
        _print(backtest.market_quality(d) | backtest.summarize(trades, d["match_id"].nunique(), a.bankroll))
        if a.trades_out:
            trades.to_csv(a.trades_out, index=False)
        return
    print("No real odds supplied: prices are SIMULATED. This is a stress test, not proof of profit.\n")
    grid = backtest.scenario_grid(oos, cfg)
    cols = ["scenario", "market_logloss", "model_logloss", "trades", "roi_on_risk_pct",
            "green_both_sides_pct", "red_both_sides_pct", "held_to_result_pct", "prob_profit_pct"]
    with pd.option_context("display.width", 200, "display.max_columns", 20):
        print(grid[cols].round(3).to_string(index=False))


def cmd_swings(a):
    import pandas as pd
    from . import models, report, swings
    *_, states = models.prepare(a.data)
    oos = models.walk_forward_inplay(states, a.seasons or report.TEST_SEASONS, with_baseline=False)
    r = swings.analyse(oos, tuple(a.thresholds))
    _print(r["lead_changes"])
    cols = ["threshold", "turnaround_pct", "turnaround_pct_if_prices_fair", "avg_profit_when_turned",
            "avg_result_when_not_turned", "roi_pct", "matches_in_profit_pct"]
    with pd.option_context("display.width", 200, "display.max_columns", 20):
        print("\nAt the model's fair prices:")
        print(pd.DataFrame(r["fair_prices"])[cols].round(2).to_string(index=False))
        print("\nAfter a 1-point spread and 5% commission:")
        print(pd.DataFrame(r["with_costs"])[cols].round(2).to_string(index=False))


def cmd_replay(a):
    from . import data
    from .live import replay
    matches, balls = data.load(a.data)
    r = replay(_bundle(a), matches, balls, a.match_id, ledger_path=a.ledger)
    print(f"{r['batting_first']} batted first against {r['bowling_first']}; winner {r['winner']}")
    print("Prices were simulated, so the profit figure is not evidence of anything.")
    for t in r["trades"]:
        print(f"  {t['side']:>4} {r['batting_first']} at {t['entry_odds']:.2f}, stake {t['stake']:,.0f}"
              f" -> {t['exit']}: {t['pnl']:+,.0f}")
    _print(r["summary"])


def _site(path):
    from .exchange.config import SiteConfig
    try:
        return SiteConfig.load(path)
    except FileNotFoundError:
        raise SystemExit(f"no site file at {path} - run `ipl calibrate` first")


def cmd_calibrate(a):
    from .exchange import calibrate
    from .exchange.browser import BrowserExchange
    from .exchange.config import SiteConfig
    cfg = SiteConfig.load(a.out) if a.update else SiteConfig(name=a.name, url=a.url or "")
    ex = BrowserExchange(cfg, headless=False).start()
    try:
        input("A browser window has opened. Log in yourself, open a LIVE match's match-odds "
              "market, then press Enter here.")
        cfg.url = ex.page.url
        calibrate.run(ex.page, cfg, with_slip=not a.read_only)
    finally:
        print(f"\nSaved to {cfg.save(a.out)}. Missing for reading: {cfg.missing() or 'nothing'}; "
              f"for placing bets: {cfg.missing(execute=True) or 'nothing'}")
        ex.close()


def cmd_bot(a):
    from .exchange.bot import RiskLimits, TradingBot, load_aliases
    from .exchange.browser import BrowserExchange
    from .trader import TraderConfig
    cfg = _site(a.site)
    missing = cfg.missing(execute=a.mode == "execute")
    if missing:
        raise SystemExit(f"{a.site} is missing {missing}; run `ipl calibrate --update --out {a.site}`")
    if a.mode == "execute" and not a.yes_place_bets:
        raise SystemExit("execute mode clicks real bet slips on whatever account the browser is "
                         "logged into. Re-run with --yes-place-bets once you have checked it is "
                         "the account you mean.")
    bundle = _bundle(a)
    ex = BrowserExchange(cfg, headless=a.headless).start()
    if not a.no_wait:
        input("Browser open. Log in if needed and open the match-odds market of the match, "
              "then press Enter to start.")
    bot = TradingBot(ex, bundle, a.mode, a.batting_first, a.bowling_first, a.venue, a.league,
                     TraderConfig(commission=a.commission, entry_edge=a.entry_edge),
                     a.bankroll, RiskLimits(a.max_risk, a.daily_loss_limit),
                     ledger_path=a.ledger, aliases=load_aliases(a.alias), record_path=a.record,
                     signals_path=a.signals)
    print(f"Mode: {a.mode}. Stop with Ctrl+C or by creating a file named STOP here.")
    try:
        _print(bot.run(poll_seconds=cfg.poll_seconds))
    finally:
        ex.close()


def cmd_practice(a):
    import tempfile
    import time
    from . import data
    from .exchange import mock
    matches, balls = data.load(a.data)
    d = mock.build_ticks(_bundle(a), matches, balls, a.match_id)
    site = mock.write_site(d, a.dir or tempfile.mkdtemp(prefix="practice-"), ms=a.ms)
    srv = mock.serve(site, a.port)
    mock.practice_site(a.port).save(a.site_out)
    print(f"Practice exchange: http://127.0.0.1:{a.port}/index.html  ({d['title']})")
    print(f"Site file for the bot: {a.site_out}")
    print(f"Try: ipl bot --site {a.site_out} --mode paper --batting-first \"{d['batting_first']}\" "
          f"--bowling-first \"{d['bowling_first']}\" --venue \"{d['venue']}\"")
    print("The page restarts the match each time it is reloaded. Ctrl+C to stop the server.")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        srv.shutdown()


def cmd_dashboard(a):
    import getpass
    from .dashboard.auth import MIN_LENGTH, PasswordStore
    from .dashboard.server import make_server
    store = PasswordStore(a.password_file)
    if a.set_password or not store.is_set:
        if not store.is_set:
            print("No dashboard password yet. Choose one now.")
        while True:
            p1 = getpass.getpass(f"New password (at least {MIN_LENGTH} characters): ")
            if p1 == getpass.getpass("Again: "):
                try:
                    store.set(p1)
                    break
                except ValueError as e:
                    print(e)
            else:
                print("They did not match.")
        print(f"Saved (hashed) to {store.path}")
        if a.set_password:
            return
    if a.host not in ("127.0.0.1", "localhost", "::1") and not a.cert:
        print("WARNING: other devices on your network can reach this page and it is plain HTTP, "
              "so the password and signals cross the network unencrypted. Use --cert/--key "
              "for HTTPS, or only do this on a network you trust.")
    srv = make_server(a.signals, a.host, a.port, store, a.cert, a.key)
    scheme = "https" if a.cert else "http"
    shown = "127.0.0.1" if a.host in ("0.0.0.0", "::") else a.host
    print(f"Dashboard: {scheme}://{shown}:{a.port}  (reading {a.signals}). Ctrl+C to stop.")
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        srv.shutdown()


def cmd_predict_match(a):
    b = _bundle(a)
    r = b.prematch_prob(a.team1, a.team2, a.venue, a.toss_winner, a.toss_decision)
    _print({"team1": a.team1, "team2": a.team2, "p_team1": r["p_team1"], "p_team2": r["p_team2"],
            "fair_odds_team1": O.fair_odds(r["p_team1"]), "fair_odds_team2": O.fair_odds(r["p_team2"]),
            "par_first_innings": r["par"], "model_trained_through": b.trained_through})


def _live_prob(b, a) -> dict:
    """P(batting side wins) for a live state, plus the context used."""
    first, second = (a.batting, a.bowling) if a.innings == 1 else (a.bowling, a.batting)
    toss_w, toss_d = (a.toss_winner, a.toss_decision) if a.toss_winner else (first, "bat")
    pm = b.prematch_prob(a.batting, a.bowling, a.venue, toss_w, toss_d)
    balls = _overs_to_balls(a.overs)
    p = b.inplay_prob(a.innings, a.score, a.wickets, balls, pm["p_team1"], pm["par"], a.target)
    out = {"batting": a.batting, "bowling": a.bowling, "p_batting_wins": p, "p_bowling_wins": 1 - p,
           "fair_odds_batting": O.fair_odds(min(max(p, 1e-4), 1 - 1e-4)),
           "fair_odds_bowling": O.fair_odds(min(max(1 - p, 1e-4), 1 - 1e-4)),
           "prematch_p_batting": pm["p_team1"], "par_first_innings": pm["par"]}
    if a.innings == 1:
        tot = b.innings_total(a.score, a.wickets, balls, pm["p_team1"], pm["par"], a.line)
        out |= {"expected_total": tot["expected_total"], "total_sd": tot["sd"]}
        if a.line is not None:
            out |= {"line": a.line, "p_over": tot["p_over"], "p_under": 1 - tot["p_over"]}
    return out


def cmd_predict_live(a):
    _print(_live_prob(_bundle(a), a))


def cmd_advise(a):
    from .trader import TraderConfig, advise
    if a.prob is not None:
        p = a.prob
    else:
        need = [a.batting, a.bowling, a.venue, a.innings, a.score, a.wickets, a.overs]
        if any(v is None for v in need):
            raise SystemExit("give --prob, or the live state: --batting --bowling --venue "
                             "--innings --score --wickets --overs [--target]")
        p = _live_prob(_bundle(a), a)["p_batting_wins"]
    cfg = TraderConfig(commission=a.commission, entry_edge=a.entry_edge, exit_edge=a.exit_edge,
                       stop_loss=a.stop_loss)
    pos = _parse_position(a.position)
    risk = sum(b.liability for b in pos.bets[:1])
    _print(advise(p, a.back, a.lay, a.bankroll, cfg, pos, risk))


def cmd_hedge(a):
    pos = _parse_position(a.position)
    if not pos.bets:
        raise SystemExit("give --position, e.g. 'back@2.5x100'")
    before = pos.exposure()
    h = pos.hedge(a.back, a.lay)
    out = {"profit_if_a_wins_before": before[0], "profit_if_a_loses_before": before[1]}
    if h is None:
        out["hedge"] = "already flat"
    else:
        pos.add(h)
        after = pos.exposure()
        net = pos.locked(a.back, a.lay, a.commission)
        out |= {"hedge_side": h.side, "hedge_odds": h.odds, "hedge_stake": h.stake,
                "hedge_liability": h.liability, "profit_either_way_before_commission": after[0],
                "profit_either_way_after_commission": net,
                "result": "GREEN on both outcomes" if net > 0 else "RED on both outcomes - this locks in a loss"}
    _print(out)


def cmd_arb(a):
    quotes = {}
    for q in a.quote:
        name, prices = q.split(":")
        pa, pb = prices.split(",")
        quotes[name] = (float(pa), float(pb))
    _print(O.scan_arbitrage(quotes, a.stake))


def cmd_odds(a):
    from . import oddsfeed
    events = oddsfeed.fetch(a.api_key, regions=a.regions)
    for e in oddsfeed.summarize(events, a.stake):
        _print(e)


# ---- parser ---------------------------------------------------------------
def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(prog="ipl", description=__doc__)
    sub = p.add_subparsers(dest="cmd", required=True)

    def add(name, fn, help_):
        sp = sub.add_parser(name, help=help_)
        sp.set_defaults(fn=fn)
        return sp

    def live_args(sp, required=True):
        sp.add_argument("--batting", required=required, help="side batting now")
        sp.add_argument("--bowling", required=required)
        sp.add_argument("--venue", required=required)
        sp.add_argument("--innings", type=int, choices=(1, 2), required=required)
        sp.add_argument("--score", type=float, required=required)
        sp.add_argument("--wickets", type=int, required=required)
        sp.add_argument("--overs", required=required, help="overs bowled, e.g. 12.3")
        sp.add_argument("--target", type=float, help="runs needed to win (innings 2)")
        sp.add_argument("--line", type=float, help="innings-runs line to price (innings 1)")
        sp.add_argument("--toss-winner")
        sp.add_argument("--toss-decision", choices=("bat", "field"))
        sp.add_argument("--model")

    def trade_args(sp):
        sp.add_argument("--commission", type=float, default=0.05)
        sp.add_argument("--entry-edge", type=float, default=0.04)
        sp.add_argument("--exit-edge", type=float, default=0.01)
        sp.add_argument("--stop-loss", type=float, default=0.5)
        sp.add_argument("--bankroll", type=float, default=100_000.0)

    sp = add("ingest", cmd_ingest, "build data tables from Cricsheet match JSON files "
                                   "(a folder of files, or a folder of league folders)")
    sp.add_argument("json_dir"); sp.add_argument("--out", default="data")
    sp.add_argument("--league", default="ipl", help="league code when json_dir is a single league")

    sp = add("train", cmd_train, "train on all data and save the model bundle")
    sp.add_argument("--data"); sp.add_argument("--model")

    sp = add("evaluate", cmd_evaluate, "walk-forward evaluation, writes reports/")
    sp.add_argument("--data"); sp.add_argument("--out")

    sp = add("backtest", cmd_backtest, "backtest the trading rule (real odds CSV or simulated)")
    sp.add_argument("--data"); sp.add_argument("--odds-csv"); sp.add_argument("--trades-out")
    sp.add_argument("--seasons", type=int, nargs="*"); sp.add_argument("--hold", action="store_true",
                                                                      help="no hedging; hold to result")
    trade_args(sp)

    sp = add("swings", cmd_swings, "how often matches turn around, and what backing both underdogs earns")
    sp.add_argument("--data"); sp.add_argument("--seasons", type=int, nargs="*")
    sp.add_argument("--thresholds", type=float, nargs="*", default=[2.5, 3.0, 4.0, 6.0])

    sp = add("replay", cmd_replay, "run a past match through the live paper-trading engine")
    sp.add_argument("match_id"); sp.add_argument("--data"); sp.add_argument("--model")
    sp.add_argument("--ledger", help="append the paper ledger to this file")

    sp = add("calibrate", cmd_calibrate, "click through your exchange page once to record where things are")
    sp.add_argument("--url", help="exchange page to open (you can navigate after)")
    sp.add_argument("--out", default="site.json"); sp.add_argument("--name", default="exchange")
    sp.add_argument("--update", action="store_true", help="start from an existing --out file")
    sp.add_argument("--read-only", action="store_true", help="skip the bet slip (advise/paper only)")

    sp = add("bot", cmd_bot, "run the in-play trader on an exchange page in the browser")
    sp.add_argument("--site", default="site.json")
    sp.add_argument("--mode", choices=("advise", "paper", "execute"), default="advise")
    sp.add_argument("--batting-first", required=True); sp.add_argument("--bowling-first", required=True)
    sp.add_argument("--venue", required=True); sp.add_argument("--league", help="e.g. ipl, bbl, psl")
    sp.add_argument("--alias", help="page name=team name pairs, e.g. 'MI=Mumbai Indians,CSK=Chennai Super Kings'")
    sp.add_argument("--bankroll", type=float, default=10_000.0)
    sp.add_argument("--max-risk", type=float, default=100.0, help="money at risk per new position")
    sp.add_argument("--daily-loss-limit", type=float, default=300.0)
    sp.add_argument("--commission", type=float, default=0.02)
    sp.add_argument("--entry-edge", type=float, default=0.04)
    sp.add_argument("--ledger", default="ledger.jsonl"); sp.add_argument("--model")
    sp.add_argument("--record", help="also save every score and price reading to this CSV")
    sp.add_argument("--signals", default="signals.jsonl", help="every signal, for `ipl dashboard`")
    sp.add_argument("--headless", action="store_true"); sp.add_argument("--no-wait", action="store_true")
    sp.add_argument("--yes-place-bets", action="store_true", help="required for execute mode")

    sp = add("practice", cmd_practice, "serve a practice exchange that replays a past match")
    sp.add_argument("match_id", nargs="?", default="ipl-1535465")
    sp.add_argument("--port", type=int, default=8777); sp.add_argument("--ms", type=int, default=1500,
                                                                        help="milliseconds per ball")
    sp.add_argument("--site-out", default="practice_site.json"); sp.add_argument("--dir")
    sp.add_argument("--data"); sp.add_argument("--model")

    sp = add("dashboard", cmd_dashboard, "password-protected live dashboard of every signal")
    sp.add_argument("--signals", default="signals.jsonl")
    sp.add_argument("--host", default="127.0.0.1",
                    help="0.0.0.0 to open it from your phone on the same Wi-Fi")
    sp.add_argument("--port", type=int, default=8800)
    sp.add_argument("--set-password", action="store_true", help="set or change the password and exit")
    sp.add_argument("--password-file", help="where the hashed password is kept")
    sp.add_argument("--cert", help="TLS certificate file, to serve over HTTPS")
    sp.add_argument("--key", help="TLS private key file")

    sp = add("predict-match", cmd_predict_match, "pre-match win probability")
    sp.add_argument("--team1", required=True); sp.add_argument("--team2", required=True)
    sp.add_argument("--venue", required=True); sp.add_argument("--toss-winner")
    sp.add_argument("--toss-decision", choices=("bat", "field")); sp.add_argument("--model")

    sp = add("predict-live", cmd_predict_live, "in-play win probability and innings total")
    live_args(sp)

    sp = add("advise", cmd_advise, "trade advice: enter, hold or hedge, with stakes")
    live_args(sp, required=False)
    sp.add_argument("--prob", type=float, help="skip the model: your own P(team A wins)")
    sp.add_argument("--back", type=float, required=True, help="price available to back team A")
    sp.add_argument("--lay", type=float, required=True, help="price available to lay team A")
    sp.add_argument("--position", help="open bets on A, e.g. 'back@2.5x100,lay@2.1x40'")
    trade_args(sp)

    sp = add("hedge", cmd_hedge, "stake that equalises profit on both outcomes")
    sp.add_argument("--position", required=True); sp.add_argument("--back", type=float, required=True)
    sp.add_argument("--lay", type=float, required=True); sp.add_argument("--commission", type=float, default=0.05)

    sp = add("arb", cmd_arb, "check bookmaker quotes for an arbitrage")
    sp.add_argument("quote", nargs="+", help="book:oddsA,oddsB  e.g. bet365:1.95,1.95")
    sp.add_argument("--stake", type=float, default=1000.0)

    sp = add("odds", cmd_odds, "fetch live IPL odds from The Odds API and scan for arbitrage")
    sp.add_argument("--api-key", required=True); sp.add_argument("--regions", default="uk,eu,au")
    sp.add_argument("--stake", type=float, default=1000.0)
    return p


def main(argv=None) -> int:
    args = build_parser().parse_args(argv)
    args.fn(args)
    return 0


if __name__ == "__main__":
    sys.exit(main())
