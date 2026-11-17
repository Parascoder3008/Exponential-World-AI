"""The in-play trading bot: read the page, price the match, decide, act.

Modes
-----
advise   prints each trade for you to place by hand, and tracks the position as if
         you did (so it also tells you when and how to hedge). Never clicks.
paper    same decisions, recorded to the ledger only. Never clicks.
execute  clicks the bet slip on the page. The bot cannot tell a demo account from a
         real-money one: whatever account the browser is logged into is the one that
         gets the bets. Stake and loss limits below are enforced in code.

Stopping: Ctrl+C, or create a file named STOP in the folder the bot runs from. Either
way the bot first hedges any open position at the current price, then exits.
"""
from __future__ import annotations

import difflib
import json
import time
from dataclasses import asdict, dataclass
from pathlib import Path

from .. import odds as O
from ..live import LiveSession
from ..trader import TraderConfig
from . import scoreparse

MODES = ("advise", "paper", "execute")


@dataclass
class RiskLimits:
    max_risk_per_trade: float = 100.0   # money at risk on one new position
    daily_loss_limit: float = 300.0     # no new positions once losses reach this
    stop_file: str = "STOP"


def match_runner(names: list, team: str, aliases: dict | None = None) -> int | None:
    """Which runner on the page is ``team``? Exact, alias, then fuzzy match."""
    if aliases:
        names = [aliases.get(n, n) if n else n for n in names]
    low = [(n or "").strip().lower() for n in names]
    t = team.strip().lower()
    if t in low:
        return low.index(t)
    for i, n in enumerate(low):
        if n and (n in t or t in n):
            return i
    initials = "".join(w[0] for w in t.split() if w)
    for i, n in enumerate(low):
        if n.replace(" ", "") == initials:
            return i
    scores = [difflib.SequenceMatcher(None, n, t).ratio() for n in low]
    best = max(range(len(scores)), key=scores.__getitem__)
    return best if scores[best] >= 0.6 else None


class TradingBot:
    def __init__(self, exchange, bundle, mode: str, batting_first: str, bowling_first: str,
                 venue: str, league: str | None = None, cfg: TraderConfig | None = None,
                 bankroll: float = 10_000.0, limits: RiskLimits | None = None,
                 ledger_path: str | Path | None = None, notify=print, clock=time.time,
                 aliases: dict | None = None, record_path: str | Path | None = None,
                 signals_path: str | Path | None = None):
        if mode not in MODES:
            raise ValueError(f"mode must be one of {MODES}")
        self.ex, self.mode, self.notify, self.clock = exchange, mode, notify, clock
        self.limits = limits or RiskLimits()
        self.team_a, self.team_b = batting_first, bowling_first
        self.aliases = aliases or {}
        self.session = LiveSession(bundle, batting_first, bowling_first, venue, cfg, bankroll,
                                   ledger_path=ledger_path, match_id=f"{batting_first} v {bowling_first}")
        if league:
            self.session.league = league
        self.idx_a: int | None = None
        self.last_snap = None
        self.finished: dict | None = None
        self.unreadable = 0
        self.record_path = Path(record_path) if record_path else None
        self.signals_path = Path(signals_path) if signals_path else None
        self._sc = None
        self.session.log({"event": "start", "mode": mode, "batting_first": batting_first,
                          "bowling_first": bowling_first, "venue": venue,
                          "league": self.session.league, "limits": asdict(self.limits)})
        self._signal({"event": "start", "action": "start", "reason": "bot started"})

    # ---- helpers -------------------------------------------------------------
    @property
    def realised(self) -> float:
        return self.session.trader.pnl

    def _execute(self, bet: O.Bet):
        """Turn a bet on team A into clicks. Returns the bet as filled (at the price the
        page reports, which can be better than asked) or False if it did not go through."""
        if self.mode != "execute":
            return True
        res = self.ex.place(self.idx_a, bet.side, bet.odds, bet.stake)
        self.session.log({"event": "order", "side": bet.side, "odds": bet.odds,
                          "stake": round(bet.stake, 2), "ok": res.ok, "confirmed": res.confirmed,
                          "filled_odds": res.filled_odds, "reason": res.reason})
        if not res.ok:
            self.notify(f"  ! order not placed ({res.reason})")
            return False
        if not res.confirmed:
            self.notify("  ! placed, but this site config cannot confirm it was matched - check the page")
        if res.filled_odds and abs(res.filled_odds - bet.odds) > 1e-9:
            return O.Bet(bet.side, res.filled_odds, bet.stake, bet.tag)
        return bet

    def _say(self, out: dict) -> None:
        if out.get("action") not in ("enter", "exit"):
            return
        side, odds, stake = out["side"].upper(), out["odds"], out["stake"]
        verb = {"advise": "PLACE NOW", "paper": "paper", "execute": "placed"}[self.mode]
        bell = "\a" if self.mode == "advise" else ""
        if out["action"] == "enter":
            liab = stake if out["side"] == "back" else stake * (odds - 1)
            tail = (f"(at risk {liab:,.2f})  model {out['p_model']*100:.1f}% vs market "
                    f"{out['p_market']*100:.1f}%")
            what = "OPEN"
        else:
            locked = out.get("locked", 0.0)
            tail = f"-> {locked:+,.2f} whoever wins ({'green' if locked > 0 else 'red'})"
            what = f"HEDGE ({out['reason']})"
        self.notify(f"{bell}[{verb}] {what}: {side} {self.team_a} @ {odds:.2f}  stake {stake:,.2f}  {tail}")

    def _record(self, ts: float, snap, sc) -> None:
        """Append every reading to a CSV: real score and price side by side, the
        dataset needed to test the strategy on real odds later."""
        if self.record_path is None:
            return
        import csv
        new = not self.record_path.exists()
        b = 1 - self.idx_a
        with open(self.record_path, "a", newline="", encoding="utf-8") as fh:
            w = csv.writer(fh)
            if new:
                w.writerow(["ts", "team_a", "team_b", "score_text", "innings", "runs", "wickets",
                            "balls_bowled", "target", "back_a", "lay_a", "back_b", "lay_b"])
            w.writerow([f"{ts:.3f}", self.team_a, self.team_b, snap.score_text,
                        *(("", "", "", "", "") if sc is None else
                          (sc.innings, sc.runs, sc.wickets, sc.balls, sc.target or "")),
                        snap.back[self.idx_a], snap.lay[self.idx_a], snap.back[b], snap.lay[b]])

    def _stop_requested(self) -> bool:
        return Path(self.limits.stop_file).exists()

    # ---- signals ---------------------------------------------------------------
    def _signal(self, out: dict) -> None:
        """Append one line per poll to the signals file the dashboard reads: what the
        bot saw, what the model said, and what it did and why."""
        if self.signals_path is None:
            return
        s, tr, snap = self.session.state, self.session.trader, self.last_snap
        row = {"t": round(self.clock(), 3), "match": tr.match_id, "mode": self.mode,
               "team_a": self.team_a, "team_b": self.team_b, "league": self.session.league,
               "score": snap.score_text if snap else None,
               "innings": s.innings, "runs": s.score, "wickets": s.wickets, "balls": s.balls_bowled,
               "target": s.target, "realised": round(tr.pnl, 2)}
        for k in ("event", "action", "reason", "side", "odds", "stake", "locked", "fresh",
                  "p_model", "p_market", "back", "lay", "a_won", "trades", "pnl", "why", "flat"):
            if k in out and out[k] is not None:
                v = out[k]
                row[k] = round(v, 4) if isinstance(v, float) else v
        if row.get("reason") == "no score yet":
            row.pop("p_model", None)          # no score: the model has nothing to say
        if "p_model" in row and "p_market" in row:
            row["edge"] = round(row["p_model"] - row["p_market"], 4)
        if snap is not None and self.idx_a is not None:
            if "back" not in row:
                row["back"], row["lay"] = snap.back[self.idx_a], snap.lay[self.idx_a]
            row["back_b"], row["lay_b"] = snap.back[1 - self.idx_a], snap.lay[1 - self.idx_a]
        if tr.open_trade is not None:
            win, lose = tr.position.exposure()
            row["pos_if_a_wins"], row["pos_if_a_loses"] = round(win, 2), round(lose, 2)
            if row.get("back") and row.get("lay"):
                row["locked_now"] = round(tr.position.locked(row["back"], row["lay"], tr.cfg.commission), 2)
        self.signals_path.parent.mkdir(parents=True, exist_ok=True)
        with open(self.signals_path, "a", encoding="utf-8") as fh:
            fh.write(json.dumps(row, default=str) + "\n")

    # ---- one poll ------------------------------------------------------------
    def step(self) -> dict:
        out = self._step()
        self._signal(out)
        return out

    def _step(self) -> dict:
        snap = self.ex.read()
        ts = self.clock()
        self.last_snap = snap
        if self.idx_a is None:
            self.idx_a = match_runner(snap.names, self.team_a, self.aliases)
            other = match_runner(snap.names, self.team_b, self.aliases)
            if self.idx_a is None or other is None or other == self.idx_a:
                raise RuntimeError(f"cannot tell which runner is which: page shows {snap.names}, "
                                   f"expected {self.team_a!r} and {self.team_b!r} (use --alias)")
            self.notify(f"{self.team_a} is runner {self.idx_a + 1} on the page; prices are read for it.")
        st = self.session.state
        sc = scoreparse.parse(snap.score_text)
        self._record(ts, snap, sc)
        if sc is None:
            self.unreadable += 1
        else:
            if sc.innings == 2 and st.innings == 1:
                self.session.start_second_innings(ts, sc.target)
            if sc.innings == st.innings:
                self.session.on_score(ts, sc.innings, sc.runs, sc.wickets, sc.balls, sc.target)
        st = self.session.state
        if st.is_over:
            if st.innings == 2:
                return self.finish(a_won=st.score < st.target)
            return {"action": "hold", "reason": "innings break"}
        back_a, lay_a = snap.back[self.idx_a], snap.lay[self.idx_a]
        if back_a is None or lay_a is None:
            return {"action": "hold", "reason": "no price"}
        if back_a <= 1.01 or back_a >= 1000:
            return self.finish(a_won=back_a <= 1.01)
        if self._stop_requested():
            return self.stop("stop file found")
        allow = self.realised > -self.limits.daily_loss_limit
        out = self.session.on_price(ts, back_a, lay_a, allow_entry=allow,
                                    execute=self._execute, max_risk=self.limits.max_risk_per_trade)
        if not allow and out.get("reason") == "entry blocked":
            out["reason"] = "daily loss limit reached"
        self._say(out)
        return out

    # ---- ending ----------------------------------------------------------------
    def stop(self, why: str) -> dict:
        snap = self.last_snap
        ok = True
        if snap is not None and self.idx_a is not None and snap.back[self.idx_a] and snap.lay[self.idx_a]:
            ok = self.session.trader.flatten(snap.back[self.idx_a], snap.lay[self.idx_a],
                                             tag=self.clock(), execute=self._execute)
        out = {"event": "stopped", "why": why, "flat": ok, "pnl": self.realised,
               "action": "stopped", "reason": why}
        if not ok:
            self.notify("  ! could not hedge the open position - hedge it by hand on the page now")
        self.session.log(out)
        self.finished = out
        return out

    def finish(self, a_won: bool) -> dict:
        if self.finished is None:
            self.finished = self.session.finish(a_won)
            self.notify(f"Match over ({self.team_a} {'won' if a_won else 'lost'}). "
                        f"Trades {self.finished['trades']}, result {self.finished['pnl']:+,.2f}")
        return self.finished

    def run(self, poll_seconds: float = 1.0, max_seconds: float | None = None, sleep=time.sleep) -> dict:
        start = self.clock()
        try:
            while self.finished is None:
                self.step()
                if self.finished is None and max_seconds is not None and self.clock() - start > max_seconds:
                    out = self.stop("time limit")
                    self._signal(out)
                    return out
                sleep(poll_seconds)
        except KeyboardInterrupt:
            out = self.stop("stopped by you")
            self._signal(out)
            return out
        return self.finished


def load_aliases(text: str | None) -> dict:
    """'MI=Mumbai Indians,CSK=Chennai Super Kings' -> dict."""
    out = {}
    for part in (text or "").split(","):
        if "=" in part:
            k, v = part.split("=", 1)
            out[k.strip()] = v.strip()
    return out


def summary(ledger: str | Path) -> dict:
    rows = [json.loads(x) for x in Path(ledger).read_text().splitlines() if x.strip()]
    fin = [r for r in rows if r.get("event") in ("finished", "stopped")]
    return {"matches": len(fin), "pnl": sum(r.get("pnl", 0) for r in fin),
            "orders": sum(1 for r in rows if r.get("event") == "order"),
            "failed_orders": sum(1 for r in rows if r.get("event") == "order" and not r.get("ok"))}
