"""Live IPL odds from The Odds API (https://the-odds-api.com), free tier available.

STATUS: written against the documented v4 response format and unit-tested on a
fixture of that shape. It has NOT been run against the live service - the build
environment had no outbound access to it and the IPL was out of season. Check the
first response by eye before relying on it.
"""
from __future__ import annotations

import json
import urllib.parse
import urllib.request

from . import odds as O

URL = "https://api.the-odds-api.com/v4/sports/cricket_ipl/odds"


def fetch(api_key: str, regions: str = "uk,eu,au", timeout: float = 20.0) -> list:
    qs = urllib.parse.urlencode({"apiKey": api_key, "regions": regions, "markets": "h2h",
                                 "oddsFormat": "decimal"})
    with urllib.request.urlopen(f"{URL}?{qs}", timeout=timeout) as resp:  # noqa: S310
        return json.loads(resp.read().decode("utf-8"))


def quotes(event: dict) -> dict:
    """bookmaker -> (odds on home_team, odds on away_team) for one event."""
    home, away = event["home_team"], event["away_team"]
    out = {}
    for book in event.get("bookmakers", []):
        for market in book.get("markets", []):
            if market.get("key") != "h2h":
                continue
            prices = {o["name"]: float(o["price"]) for o in market.get("outcomes", [])}
            if home in prices and away in prices:
                out[book.get("key", book.get("title"))] = (prices[home], prices[away])
    return out


def summarize(events: list, stake: float = 1000.0) -> list:
    rows = []
    for e in events:
        q = quotes(e)
        if not q:
            continue
        scan = O.scan_arbitrage(q, stake)
        fair = O.devig(scan["odds_a"], scan["odds_b"])
        rows.append({"home": e["home_team"], "away": e["away_team"],
                     "commence_time": e.get("commence_time"), "books": len(q),
                     "best_home": f"{scan['odds_a']} @ {scan['book_a']}",
                     "best_away": f"{scan['odds_b']} @ {scan['book_b']}",
                     "market_p_home": fair[0], "is_arb": scan["is_arb"],
                     "arb_roi": scan["roi"], "stake_home": scan["stake_a"],
                     "stake_away": scan["stake_b"]})
    return rows
