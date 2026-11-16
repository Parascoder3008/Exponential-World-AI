"""Live paper trading: track the match, price it, decide, keep a ledger.

Nothing in this module places a bet anywhere. It records what the trading rule
would have done at the prices it was shown.

Pieces
------
``MatchState``   the scoreboard, updated ball by ball or from scoreboard snapshots.
``StaleGuard``   refuses to open trades when the score is probably behind the market.
``PaperTrader``  the rule plus a ledger. The backtester runs on this same class, so
                 what is tested is what runs live.
``LiveSession``  ties the three to the trained models for one match.

Selection A is always the side that bats first.
"""
from __future__ import annotations

import json
from collections import deque
from dataclasses import dataclass, field
from pathlib import Path

from . import odds as O
from .data import FULL_INNINGS_BALLS
from .trader import Action, TraderConfig, decide


# --------------------------------------------------------------------------
# Scoreboard
# --------------------------------------------------------------------------
@dataclass
class MatchState:
    innings: int = 1
    score: int = 0
    wickets: int = 0
    balls_bowled: int = 0
    target: int | None = None
    recent: deque = field(default_factory=lambda: deque(maxlen=18))
    momentum_known: bool = True

    def ball(self, runs: int, wicket: int = 0, legal: bool = True) -> None:
        """Apply one delivery. ``legal`` is False for wides and no-balls."""
        self.score += int(runs)
        self.wickets += int(wicket)
        self.balls_bowled += 1 if legal else 0
        self.recent.append((int(runs), int(wicket)))

    def start_second_innings(self, target: int | None = None) -> None:
        self.target = int(target) if target is not None else self.score + 1
        self.innings, self.score, self.wickets, self.balls_bowled = 2, 0, 0, 0
        self.recent.clear()
        self.momentum_known = True

    def sync(self, innings: int, score: int, wickets: int, balls_bowled: int,
             target: int | None = None) -> None:
        """Overwrite from a scoreboard reading. Recent-ball momentum is then unknown."""
        if innings == 2 and target is None and self.target is None:
            raise ValueError("second innings needs a target")
        changed = (innings, score, wickets, balls_bowled) != (
            self.innings, self.score, self.wickets, self.balls_bowled)
        self.innings, self.score, self.wickets, self.balls_bowled = innings, score, wickets, balls_bowled
        if target is not None:
            self.target = int(target)
        if changed:
            self.recent.clear()
            self.momentum_known = False

    @property
    def is_over(self) -> bool:
        done = self.balls_bowled >= FULL_INNINGS_BALLS or self.wickets >= 10
        chased = self.innings == 2 and self.target is not None and self.score >= self.target
        return done or chased

    def last18(self) -> tuple[float | None, float | None]:
        if not self.momentum_known:
            return None, None
        return float(sum(r for r, _ in self.recent)), float(sum(w for _, w in self.recent))


# --------------------------------------------------------------------------
# Stale-data guard
# --------------------------------------------------------------------------
@dataclass
class StaleGuard:
    """A free score feed lags the betting market. When a wicket falls the price moves
    first; a model still looking at the old score sees a big 'edge' that is really
    just news it has not received yet. Two checks stop that:

    * the score must have been refreshed within ``max_score_age`` seconds, and
    * the price must not have moved more than ``max_unexplained_move`` (probability
      points) since the score last changed.
    """
    max_score_age: float = 8.0
    max_unexplained_move: float = 0.03

    def check(self, now: float, score_ts: float | None, mid_now: float,
              mid_at_score: float | None) -> tuple[bool, str]:
        if score_ts is None:
            return False, "no score yet"
        if now - score_ts > self.max_score_age:
            return False, f"score is {now - score_ts:.0f}s old"
        if mid_at_score is not None and abs(mid_now - mid_at_score) > self.max_unexplained_move:
            return False, "price moved but the score did not"
        return True, ""


# --------------------------------------------------------------------------
# Rule + ledger
# --------------------------------------------------------------------------
@dataclass
class PaperTrader:
    cfg: TraderConfig = field(default_factory=TraderConfig)
    bankroll: float = 100_000.0
    match_id: str = ""
    season: int = 0
    position: O.Position = field(default_factory=O.Position)
    risk: float = 0.0
    n_trades: int = 0
    open_trade: dict | None = None
    trades: list = field(default_factory=list)

    def on_tick(self, p_a: float, back: float, lay: float, tag=None,
                allow_entry: bool = True) -> Action:
        """Show the rule one (probability, price) observation and act on it."""
        act = decide(p_a, back, lay, self.position, self.bankroll, self.cfg, self.risk)
        if act.kind == "enter":
            if not allow_entry or self.n_trades >= self.cfg.max_trades_per_match:
                return Action("hold", reason="entry blocked")
            self.position = O.Position().add(act.bet)
            self.risk, self.n_trades = act.risk, self.n_trades + 1
            self.open_trade = {"match_id": self.match_id, "season": self.season, "entry_seq": tag,
                               "side": act.bet.side, "entry_odds": act.bet.odds,
                               "stake": act.bet.stake, "risk": self.risk, "entry_edge": act.edge}
        elif act.kind == "exit" and self.open_trade is not None:
            self.position.add(act.bet)
            pnl = self.position.settle(True, self.cfg.commission)   # same either way once hedged
            self.trades.append(self.open_trade | {"exit_seq": tag, "exit": act.reason,
                                                  "exit_odds": act.bet.odds, "pnl": pnl})
            self.position, self.risk, self.open_trade = O.Position(), 0.0, None
        return act

    def settle(self, a_won: bool) -> None:
        """Match over: an unhedged position is settled on the result."""
        if self.open_trade is not None:
            pnl = self.position.settle(a_won, self.cfg.commission)
            self.trades.append(self.open_trade | {"exit_seq": -1, "exit": "settled",
                                                  "exit_odds": float("nan"), "pnl": pnl})
            self.position, self.risk, self.open_trade = O.Position(), 0.0, None

    @property
    def pnl(self) -> float:
        return float(sum(t["pnl"] for t in self.trades))


# --------------------------------------------------------------------------
# One live match
# --------------------------------------------------------------------------
class LiveSession:
    def __init__(self, bundle, batting_first: str, bowling_first: str, venue: str,
                 cfg: TraderConfig | None = None, bankroll: float = 100_000.0,
                 guard: StaleGuard | None = None, ledger_path: str | Path | None = None,
                 match_id: str = "live"):
        self.bundle = bundle
        self.teams = (batting_first, bowling_first)
        pm = bundle.prematch_prob(batting_first, bowling_first, venue, batting_first, "bat")
        self.pm_a, self.par = pm["p_team1"], pm["par"]
        self.state = MatchState()
        self.guard = guard or StaleGuard()
        self.trader = PaperTrader(cfg or TraderConfig(), bankroll, match_id)
        self.ledger_path = Path(ledger_path) if ledger_path else None
        self.score_ts: float | None = None
        self.last_mid: float | None = None
        self.mid_at_score: float | None = None
        self.blocked = 0

    # ---- inputs ------------------------------------------------------------
    def _score_changed(self, ts: float) -> None:
        # The next price seen becomes the reference: a move that arrives together
        # with a score change is explained by it.
        self.score_ts = ts
        self.mid_at_score = None

    def on_ball(self, ts: float, runs: int, wicket: int = 0, legal: bool = True) -> None:
        self.state.ball(runs, wicket, legal)
        self._score_changed(ts)

    def on_score(self, ts: float, innings: int, score: int, wickets: int, balls_bowled: int,
                 target: int | None = None) -> None:
        """A scoreboard reading. Call it on every poll, changed or not: an unchanged
        reading still proves the score is fresh."""
        before = (self.state.innings, self.state.score, self.state.wickets, self.state.balls_bowled)
        self.state.sync(innings, score, wickets, balls_bowled, target)
        if (innings, score, wickets, balls_bowled) != before or self.score_ts is None:
            self._score_changed(ts)
        else:
            self.score_ts = ts

    def start_second_innings(self, ts: float, target: int | None = None) -> None:
        self.state.start_second_innings(target)
        self._score_changed(ts)

    # ---- model -------------------------------------------------------------
    def prob_a(self) -> float:
        s = self.state
        if s.innings == 2 and s.score >= s.target:
            return 0.0
        if s.is_over:
            raise ValueError("innings is over; start the second innings or finish the match")
        runs18, wkts18 = s.last18()
        pm_bat = self.pm_a if s.innings == 1 else 1 - self.pm_a
        p_bat = self.bundle.inplay_prob(s.innings, s.score, s.wickets, s.balls_bowled, pm_bat,
                                        self.par, s.target, runs18, wkts18)
        return p_bat if s.innings == 1 else 1 - p_bat

    # ---- price tick ----------------------------------------------------------
    def on_price(self, ts: float, back_a: float, lay_a: float) -> dict:
        mid = (O.implied_prob(back_a) + O.implied_prob(lay_a)) / 2
        self.last_mid = mid
        if self.mid_at_score is None and self.score_ts is not None:
            self.mid_at_score = mid
        ok, why = self.guard.check(ts, self.score_ts, mid, self.mid_at_score)
        p = min(max(self.prob_a(), 1e-4), 1 - 1e-4) if self.score_ts is not None else mid
        out = {"ts": ts, "p_model": p, "p_market": mid, "back": back_a, "lay": lay_a,
               "fresh": ok, "action": "hold", "reason": why}
        if not ok:
            self.blocked += 1
            # With stale data nothing new is opened and nothing is closed on the model's
            # say-so. An open position stays as it is until the data is fresh again.
            return out
        act = self.trader.on_tick(p, back_a, lay_a, tag=ts)
        out |= {"action": act.kind, "reason": act.reason}
        if act.kind in ("enter", "exit") and act.bet is not None:
            out |= {"side": act.bet.side, "odds": act.bet.odds, "stake": act.bet.stake}
            self._log(out)
        return out

    def finish(self, a_won: bool) -> dict:
        self.trader.settle(a_won)
        summary = {"event": "finished", "a_won": a_won, "trades": len(self.trader.trades),
                   "pnl": self.trader.pnl, "blocked_ticks": self.blocked}
        self._log(summary)
        return summary

    def _log(self, row: dict) -> None:
        if self.ledger_path:
            self.ledger_path.parent.mkdir(parents=True, exist_ok=True)
            with open(self.ledger_path, "a", encoding="utf-8") as fh:
                fh.write(json.dumps({"match_id": self.trader.match_id, **row}, default=str) + "\n")


def replay(bundle, matches, balls, match_id: str, cfg: TraderConfig | None = None,
           noise_sd: float = 0.10, noise_rho: float = 0.95, spread: float = 0.01,
           seed: int = 11, ledger_path: str | Path | None = None) -> dict:
    """Run one past match through ``LiveSession`` ball by ball, as if it were live.

    Prices are simulated around the model's own probability (the real ones were never
    recorded), so the profit figure means nothing. What this proves is that the live
    engine tracks the score correctly and produces a coherent ledger."""
    import numpy as np

    from .models import logit, sigmoid
    m = matches.loc[matches["match_id"] == str(match_id)]
    if m.empty:
        raise KeyError(f"no match {match_id}")
    m = m.iloc[0]
    b = balls[balls["match_id"] == str(match_id)]
    first = b.loc[b["innings"] == 1, "batting_team"].iloc[0]
    second = m["team2"] if first == m["team1"] else m["team1"]
    sess = LiveSession(bundle, first, second, m["venue"], cfg, ledger_path=ledger_path,
                       match_id=str(match_id))
    rng = np.random.default_rng(seed)
    e, ts, h, ticks = noise_sd * rng.standard_normal(), 0.0, spread / 2, []
    sess.on_score(ts, 1, 0, 0, 0)
    for inn in (1, 2):
        if inn == 2:
            sess.start_second_innings(ts, int(m["target_runs"]) if m["target_runs"] == m["target_runs"] else None)
        for row in b[b["innings"] == inn].itertuples(index=False):
            if sess.state.is_over:
                break
            p = min(max(sess.prob_a(), 1e-4), 1 - 1e-4)
            e = noise_rho * e + noise_sd * (1 - noise_rho ** 2) ** 0.5 * rng.standard_normal()
            mid = float(np.clip(sigmoid(logit(p) + e), 0.01 + h, 0.99 - h))
            ticks.append(sess.on_price(ts + 1, 1 / (mid + h), 1 / (mid - h)))
            sess.on_ball(ts + 2, row.runs_total, row.wicket, bool(row.legal))
            ts += 3
    a_won = m["winner"] == first
    return {"match_id": str(match_id), "batting_first": first, "bowling_first": second,
            "winner": m["winner"], "summary": sess.finish(bool(a_won)),
            "trades": sess.trader.trades, "ticks": ticks, "final_state": sess.state}
