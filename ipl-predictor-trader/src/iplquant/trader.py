"""The trading rule: when to open a position, when to hedge it flat.

The same ``decide`` function drives the backtest and the live advice command, so
what gets tested is what gets used.

The trade
---------
1. *Enter* when the model's probability differs from the price you can actually
   trade at (after crossing the spread) by at least ``entry_edge``. Back the side
   the model likes, or lay the side it thinks is overpriced.
2. *Exit by hedging* - a single opposite bet sized so profit is identical whichever
   team wins - when the market has moved to the model's view (edge gone), when the
   locked profit hits a target, or when the locked loss hits the stop.

If the price moved your way between 1 and 2, the hedged book is green on both
outcomes. If it moved against you, hedging locks in a loss on both outcomes. No
rule can make step 2 always green; that depends on being right in step 1.
"""
from __future__ import annotations

from dataclasses import dataclass

from . import odds as O


@dataclass
class TraderConfig:
    commission: float = 0.05        # exchange commission on net market winnings
    entry_edge: float = 0.04        # min probability edge (after spread) to open
    exit_edge: float = 0.01         # hedge when remaining edge falls below this
    take_profit: float | None = None  # hedge when locked profit >= this x risk
    stop_loss: float | None = 0.5   # hedge when locked loss >= this x risk
    kelly_fraction: float = 0.25    # fraction of full Kelly to stake
    max_risk_frac: float = 0.02     # cap on money at risk per trade, share of bankroll
    min_prob: float = 0.08          # do not open positions at extreme prices
    max_prob: float = 0.92
    max_trades_per_match: int = 3
    hedge_exits: bool = True        # False = value-bet and hold to settlement
    reenter_after_stop: bool = False  # True = allow a new position on a side that was just stopped out


@dataclass
class Action:
    kind: str                # "hold", "enter", "exit"
    bet: O.Bet | None = None
    reason: str = ""
    risk: float = 0.0        # money at risk on entry
    edge: float = 0.0


def entry(p_a: float, back_odds: float, lay_odds: float, bankroll: float,
          cfg: TraderConfig) -> Action:
    """Decide whether to open a position on selection A."""
    back_edge = p_a - O.implied_prob(back_odds)     # model thinks A is underpriced
    lay_edge = O.implied_prob(lay_odds) - p_a       # model thinks A is overpriced
    if back_edge >= cfg.entry_edge and cfg.min_prob <= O.implied_prob(back_odds) <= cfg.max_prob:
        f = min(cfg.kelly_fraction * O.kelly_back(p_a, back_odds, cfg.commission),
                cfg.max_risk_frac)
        stake = f * bankroll
        if stake > 0:
            return Action("enter", O.Bet("back", back_odds, stake, "entry"),
                          "model above market", risk=stake, edge=back_edge)
    if lay_edge >= cfg.entry_edge and cfg.min_prob <= O.implied_prob(lay_odds) <= cfg.max_prob:
        f = min(cfg.kelly_fraction * O.kelly_lay(p_a, lay_odds, cfg.commission),
                cfg.max_risk_frac)
        liability = f * bankroll
        if liability > 0:
            return Action("enter", O.Bet("lay", lay_odds, liability / (lay_odds - 1.0), "entry"),
                          "model below market", risk=liability, edge=lay_edge)
    return Action("hold", reason="no edge")


def exit_check(p_a: float, back_odds: float, lay_odds: float, position: O.Position,
               risk: float, cfg: TraderConfig) -> Action:
    """Decide whether to hedge an open position flat."""
    if position.is_flat or not cfg.hedge_exits:
        return Action("hold")
    a, l = position.exposure()
    long_a = a > l
    # Edge still available on the side we hold, measured at the price we would exit at.
    remaining = (p_a - O.implied_prob(lay_odds)) if long_a else (O.implied_prob(back_odds) - p_a)
    locked = position.locked(back_odds, lay_odds, cfg.commission)
    reason = ""
    if cfg.stop_loss is not None and locked <= -cfg.stop_loss * risk:
        reason = "stop loss"
    elif cfg.take_profit is not None and locked >= cfg.take_profit * risk:
        reason = "take profit"
    elif remaining < cfg.exit_edge:
        reason = "edge gone"
    if not reason:
        return Action("hold", reason="edge remains", edge=remaining)
    return Action("exit", position.hedge(back_odds, lay_odds), reason, edge=remaining)


def decide(p_a: float, back_odds: float, lay_odds: float, position: O.Position,
           bankroll: float, cfg: TraderConfig, risk: float = 0.0) -> Action:
    if position.bets and not position.is_flat:
        return exit_check(p_a, back_odds, lay_odds, position, risk, cfg)
    return entry(p_a, back_odds, lay_odds, bankroll, cfg)


def advise(p_a: float, back_odds: float, lay_odds: float, bankroll: float,
           cfg: TraderConfig | None = None, position: O.Position | None = None,
           risk: float = 0.0) -> dict:
    """Human-readable version of ``decide`` for live use."""
    cfg = cfg or TraderConfig()
    position = position or O.Position()
    act = decide(p_a, back_odds, lay_odds, position, bankroll, cfg, risk)
    out = {
        "model_prob_a": p_a,
        "market_prob_a_mid": (O.implied_prob(back_odds) + O.implied_prob(lay_odds)) / 2,
        "action": act.kind, "reason": act.reason, "edge": act.edge,
    }
    if act.bet is not None:
        out |= {"side": act.bet.side, "odds": act.bet.odds, "stake": act.bet.stake,
                "liability": act.bet.liability}
    if position.bets:
        a, l = position.exposure()
        out |= {"profit_if_a_wins_now": a, "profit_if_a_loses_now": l,
                "locked_if_hedged_now": position.locked(back_odds, lay_odds, cfg.commission)}
    return out
