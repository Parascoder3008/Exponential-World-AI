"""Odds arithmetic: implied probability, staking, back/lay books, hedging, arbitrage.

Conventions
-----------
* Odds are decimal (2.50 means a 1.00 stake returns 2.50 including the stake).
* A two-way market has selections "A" and "B"; exactly one wins.
* A *back* bet on A with stake s at odds o wins s*(o-1) if A wins, loses s otherwise.
* A *lay* bet on A with (backer's) stake s at odds o wins s if A loses and loses the
  liability s*(o-1) if A wins. Laying A is the same exposure as backing B.
* Exchange commission is charged on the net winnings of the whole market, not per bet.
"""
from __future__ import annotations

from dataclasses import dataclass, field


def implied_prob(odds: float) -> float:
    if odds <= 1.0:
        raise ValueError("decimal odds must be greater than 1")
    return 1.0 / odds


def fair_odds(prob: float) -> float:
    if not 0.0 < prob < 1.0:
        raise ValueError("probability must be strictly between 0 and 1")
    return 1.0 / prob


def overround(odds_a: float, odds_b: float) -> float:
    """Bookmaker margin: how far the implied probabilities exceed 100%."""
    return implied_prob(odds_a) + implied_prob(odds_b) - 1.0


def devig(odds_a: float, odds_b: float) -> tuple[float, float]:
    """Strip the bookmaker margin proportionally to get fair probabilities."""
    pa, pb = implied_prob(odds_a), implied_prob(odds_b)
    return pa / (pa + pb), pb / (pa + pb)


def edge_back(p: float, odds: float, commission: float = 0.0) -> float:
    """Expected profit per unit staked on a back bet."""
    return p * (odds - 1.0) * (1.0 - commission) - (1.0 - p)


def edge_lay(p: float, odds: float, commission: float = 0.0) -> float:
    """Expected profit per unit of backer's stake accepted on a lay bet."""
    return (1.0 - p) * (1.0 - commission) - p * (odds - 1.0)


def kelly_back(p: float, odds: float, commission: float = 0.0) -> float:
    """Kelly fraction of bankroll to stake on a back bet (0 if no edge)."""
    b = (odds - 1.0) * (1.0 - commission)
    return max((p * b - (1.0 - p)) / b, 0.0) if b > 0 else 0.0


def kelly_lay(p: float, odds: float, commission: float = 0.0) -> float:
    """Kelly fraction of bankroll to put at risk as *liability* on a lay bet."""
    q = 1.0 - p                                   # chance the lay wins
    b = (1.0 - commission) / (odds - 1.0)         # profit per unit of liability
    return max((q * b - p) / b, 0.0) if b > 0 else 0.0


@dataclass
class Bet:
    side: str           # "back" or "lay", always quoted on selection A
    odds: float
    stake: float        # backer's stake
    tag: str = ""

    def __post_init__(self):
        if self.side not in ("back", "lay"):
            raise ValueError("side must be 'back' or 'lay'")
        if self.odds <= 1.0 or self.stake <= 0:
            raise ValueError("need odds > 1 and stake > 0")

    @property
    def liability(self) -> float:
        return self.stake if self.side == "back" else self.stake * (self.odds - 1.0)

    def pnl(self) -> tuple[float, float]:
        """(profit if A wins, profit if A loses), before commission."""
        if self.side == "back":
            return self.stake * (self.odds - 1.0), -self.stake
        return -self.stake * (self.odds - 1.0), self.stake


@dataclass
class Position:
    """All bets held in one two-way market, expressed on selection A."""
    bets: list = field(default_factory=list)

    def add(self, bet: Bet) -> "Position":
        self.bets.append(bet)
        return self

    def exposure(self) -> tuple[float, float]:
        """(profit if A wins, profit if A loses), before commission."""
        a = sum(b.pnl()[0] for b in self.bets)
        l = sum(b.pnl()[1] for b in self.bets)
        return a, l

    @property
    def is_flat(self) -> bool:
        a, l = self.exposure()
        return abs(a - l) < 1e-9

    def worst_case(self) -> float:
        return min(self.exposure())

    def settle(self, a_won: bool, commission: float = 0.0) -> float:
        a, l = self.exposure()
        gross = a if a_won else l
        return gross * (1.0 - commission) if gross > 0 else gross

    def hedge(self, back_odds: float, lay_odds: float) -> Bet | None:
        """The single bet that makes profit identical whichever side wins.

        ``back_odds`` is the price available to back A, ``lay_odds`` the price
        available to lay A (lay_odds >= back_odds on a real exchange)."""
        a, l = self.exposure()
        diff = a - l
        if abs(diff) < 1e-9:
            return None
        if diff > 0:                       # too long A -> lay A
            return Bet("lay", lay_odds, diff / lay_odds, tag="hedge")
        return Bet("back", back_odds, -diff / back_odds, tag="hedge")

    def locked(self, back_odds: float, lay_odds: float, commission: float = 0.0) -> float:
        """Profit locked in on both outcomes if hedged right now (after commission).
        Positive = a green book; negative = hedging now crystallises a loss."""
        h = self.hedge(back_odds, lay_odds)
        if h is None:
            g = self.exposure()[0]
        else:
            a, l = self.exposure()
            g = a + h.pnl()[0]             # equals l + h.pnl()[1] by construction
        return g * (1.0 - commission) if g > 0 else g


def green_up(back_odds: float, back_stake: float, lay_odds: float) -> dict:
    """Classic back-then-lay: you backed A, the price shortened, now lay to lock in.

    Returns the lay stake and the profit on each outcome (equal by construction)."""
    pos = Position().add(Bet("back", back_odds, back_stake))
    h = pos.hedge(back_odds=lay_odds, lay_odds=lay_odds)
    pos.add(h)
    a, l = pos.exposure()
    return {"lay_stake": h.stake, "lay_liability": h.liability,
            "profit_if_a_wins": a, "profit_if_a_loses": l}


# --------------------------------------------------------------------------
# Arbitrage / dutching across bookmakers
# --------------------------------------------------------------------------
def arbitrage(odds_a: float, odds_b: float, total_stake: float = 100.0) -> dict:
    """Back A at one book and B at another. If 1/odds_a + 1/odds_b < 1 the stakes
    below return the same amount whichever side wins, and that amount exceeds the
    total staked. This is the only trade here whose profit does not depend on a
    forecast being right - but it does depend on both bets actually being accepted
    at those prices and on neither book voiding or limiting you."""
    book = implied_prob(odds_a) + implied_prob(odds_b)
    stake_a = total_stake * implied_prob(odds_a) / book
    stake_b = total_stake - stake_a
    payout = stake_a * odds_a
    return {"is_arb": book < 1.0, "book_sum": book, "stake_a": stake_a, "stake_b": stake_b,
            "payout": payout, "profit": payout - total_stake,
            "roi": payout / total_stake - 1.0}


def best_prices(quotes: dict) -> dict:
    """``quotes`` maps bookmaker -> (odds_a, odds_b). Returns the best price per side."""
    if not quotes:
        raise ValueError("no quotes")
    book_a = max(quotes, key=lambda k: quotes[k][0])
    book_b = max(quotes, key=lambda k: quotes[k][1])
    return {"a": (book_a, quotes[book_a][0]), "b": (book_b, quotes[book_b][1])}


def scan_arbitrage(quotes: dict, total_stake: float = 100.0) -> dict:
    best = best_prices(quotes)
    out = arbitrage(best["a"][1], best["b"][1], total_stake)
    out["book_a"], out["book_b"] = best["a"][0], best["b"][0]
    out["odds_a"], out["odds_b"] = best["a"][1], best["b"][1]
    return out
