"""Read a cricket score out of whatever text the exchange page shows.

Handles the usual shapes, e.g.::

    MI 96/3 (12.0)                 -> innings 1, 96 for 3 after 12.0 overs
    MI 96-3 (12.2 ov)
    CSK 180/6 (20) | MI 96/3 (12)  -> innings 2, target 181
    MI 96/3 (12.0) Target 181      -> innings 2
    96/3 in 12.4 overs, need 85 from 44 balls

If a site uses something else, ``parse`` returns None and the bot will not trade:
a score it cannot read is treated as a stale score.
"""
from __future__ import annotations

import re
from dataclasses import dataclass

# runs/wickets, then overs either in brackets or after "in"/"from"
_INNINGS = re.compile(
    r"(?P<runs>\d{1,3})\s*[/-]\s*(?P<wkts>\d{1,2})"
    r"\s*(?:\(\s*|in\s+|from\s+|,\s*)?(?P<ov>\d{1,2})(?:\.(?P<b>\d))?\s*(?:ov(?:ers?)?|\))?",
    re.IGNORECASE)
_ALL_OUT = re.compile(r"(?P<runs>\d{1,3})\s*(?:all\s*out|a/o)", re.IGNORECASE)
_TARGET = re.compile(r"target\s*[:\-]?\s*(?P<t>\d{1,3})", re.IGNORECASE)
_NEED = re.compile(r"need(?:s)?\s+(?P<n>\d{1,3})\s+(?:runs?\s+)?(?:from|off|in)\s+(?P<b>\d{1,3})\s*b",
                   re.IGNORECASE)


@dataclass(frozen=True)
class Score:
    innings: int
    runs: int
    wickets: int
    balls: int
    target: int | None = None


def _balls(ov: str, b: str | None) -> int | None:
    o, bb = int(ov), int(b) if b else 0
    if bb > 5 or o > 20 or (o == 20 and bb):
        return None
    return o * 6 + bb


def parse(text: str | None) -> Score | None:
    if not text:
        return None
    text = " ".join(str(text).split())
    found = []
    for m in _INNINGS.finditer(text):
        balls = _balls(m["ov"], m["b"])
        if balls is None:
            continue
        found.append((m.start(), int(m["runs"]), int(m["wkts"]), balls))
    allout = [(m.start(), int(m["runs"])) for m in _ALL_OUT.finditer(text)]
    if not found:
        return None
    runs, wkts, balls = found[-1][1:]
    if wkts > 10:
        return None
    t = _TARGET.search(text)
    if t:
        return Score(2, runs, wkts, balls, int(t["t"]))
    need = _NEED.search(text)
    if need:
        return Score(2, runs, wkts, balls, runs + int(need["n"]))
    earlier = [f for f in found[:-1]] + [(pos, r, 10, 120) for pos, r in allout if pos < found[-1][0]]
    if earlier:
        first_runs = max(earlier, key=lambda f: f[0])[1]
        return Score(2, runs, wkts, balls, first_runs + 1)
    return Score(1, runs, wkts, balls)
