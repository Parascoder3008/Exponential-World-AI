"""A practice exchange: replays a past match in the browser with simulated prices.

``ipl practice <match_id>`` serves it on http://127.0.0.1:8777 so the bot (in any mode,
including execute) can be rehearsed end to end with no account and no money. The
calibration file for it is ``practice_site.json`` next to this module.
"""
from __future__ import annotations

import json
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

import numpy as np

from ..live import LiveSession
from ..models import logit, sigmoid
from ..odds import to_tick
from .config import SiteConfig

HERE = Path(__file__).parent


def practice_site(port: int = 8777) -> SiteConfig:
    return SiteConfig(
        name="practice exchange", url=f"http://127.0.0.1:{port}/index.html",
        runner_name=["#market tr:nth-of-type(1) .name", "#market tr:nth-of-type(2) .name"],
        back_price=["#market tr:nth-of-type(1) .back", "#market tr:nth-of-type(2) .back"],
        lay_price=["#market tr:nth-of-type(1) .lay", "#market tr:nth-of-type(2) .lay"],
        score="#score", stake_input="#stake", odds_input="#odds", place_button="#place",
        slip_cancel="#cancel", bet_matched="#bets li.bet-matched", poll_seconds=0.5)


def _overs(balls: int) -> str:
    return f"{balls // 6}.{balls % 6}"


def build_ticks(bundle, matches, balls, match_id: str, noise_sd: float = 0.15,
                noise_rho: float = 0.97, seed: int = 5, swap_runners: bool = True) -> dict:
    """One tick per delivery: score text plus back/lay prices for both runners.

    Prices wander around the model's own probability, so the bot sees mispricings to
    trade. That makes this a rehearsal of the machinery, not a test of profit."""
    m = matches.loc[matches["match_id"] == str(match_id)]
    if m.empty:
        raise KeyError(f"no match {match_id}")
    m = m.iloc[0]
    b = balls[balls["match_id"] == str(match_id)]
    first = b.loc[b["innings"] == 1, "batting_team"].iloc[0]
    second = m["team2"] if first == m["team1"] else m["team1"]
    sess = LiveSession(bundle, first, second, m["venue"])
    rng = np.random.default_rng(seed)
    e = noise_sd * rng.standard_normal()
    runners = [second, first] if swap_runners else [first, second]
    a_idx = runners.index(first)
    ticks = []

    def add(score_text, p_a, status=""):
        nonlocal e
        e = noise_rho * e + noise_sd * (1 - noise_rho ** 2) ** 0.5 * rng.standard_normal()
        mid = float(np.clip(sigmoid(logit(p_a) + e), 0.012, 0.988))
        pr = [mid, 1 - mid] if a_idx == 0 else [1 - mid, mid]
        back = [to_tick(1 / min(q + 0.004, 0.99), "down") for q in pr]
        lay = [to_tick(1 / max(q - 0.004, 0.01), "up") for q in pr]
        ticks.append({"score": score_text, "back": back, "lay": lay, "status": status})

    first_line = ""
    for inn in (1, 2):
        if inn == 2:
            s = sess.state
            first_total = s.score
            first_line = f"{first} {s.score}/{s.wickets} ({_overs(s.balls_bowled)})"
            sess.start_second_innings(0.0, int(m["target_runs"]) if m["target_runs"] == m["target_runs"] else None)
        for row in b[b["innings"] == inn].itertuples(index=False):
            s = sess.state
            if s.is_over:
                break
            text = f"{first} {s.score}/{s.wickets} ({_overs(s.balls_bowled)})" if inn == 1 else (
                f"{first_line} | {second} {s.score}/{s.wickets} "
                f"({_overs(s.balls_bowled)}) Target {s.target}")
            add(text, min(max(sess.prob_a(), 0.005), 0.995))
            sess.state.ball(row.runs_total, row.wicket, bool(row.legal))
        if inn == 1:
            s = sess.state
            add(f"{first} {s.score}/{s.wickets} ({_overs(s.balls_bowled)}) - innings break",
                ticks[-1]["back"][a_idx] and 1 / ticks[-1]["back"][a_idx], "Innings break")
    a_won = m["winner"] == first
    s = sess.state
    final = {"score": f"{first_line} | {second} {s.score}/{s.wickets} ({_overs(s.balls_bowled)}) "
                      f"Target {s.target}", "status": f"Closed: {m['winner']} won",
             "back": [None, None], "lay": [None, None]}
    final["back"][a_idx] = 1.01 if a_won else 1000.0
    final["back"][1 - a_idx] = 1000.0 if a_won else 1.01
    ticks.append(final)
    return {"title": f"{first} v {second} - {m['venue']} ({str(m['date'])[:10]})",
            "runners": runners, "batting_first": first, "bowling_first": second,
            "venue": m["venue"], "winner": m["winner"], "ticks": ticks}


def write_site(data: dict, out_dir: str | Path, ms: int = 1000) -> Path:
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)
    (out / "index.html").write_text((HERE / "mock_exchange.html").read_text())
    (out / "data.json").write_text(json.dumps(data | {"ms": ms}))
    return out


class _Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *a):  # noqa: D401 - keep the console for the bot
        pass


def serve(directory: str | Path, port: int = 8777) -> ThreadingHTTPServer:
    """Serve ``directory`` on 127.0.0.1 in a background thread."""
    srv = ThreadingHTTPServer(("127.0.0.1", port), partial(_Quiet, directory=str(directory)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv
