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
    from .ingest import ingest
    m, b = ingest(a.json_dir, a.out)
    print(f"wrote {len(m)} matches and {len(b)} deliveries to {a.out}")


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

    sp = add("ingest", cmd_ingest, "build data tables from Cricsheet match JSON files")
    sp.add_argument("json_dir"); sp.add_argument("--out", default="data")

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
