"""Walk-forward backtest of the trading rule.

IMPORTANT - what this can and cannot tell you
---------------------------------------------
There is no free historical ball-by-ball odds feed for the IPL in this repository.
So the market prices here are *simulated*. A profit against a simulated market is
not evidence the strategy makes money; it only shows how profit depends on how
sharp the real market is relative to the model. The moment you have real odds
(``load_odds_csv``) the same engine runs on them and the answer becomes real.

Simulated market
----------------
    logit(market) = logit(reference) + private information + noise

* ``reference``  - whose opinion the market starts from: ``baseline`` (a market only
  as smart as the public reference repos) or ``model`` (a market that already knows
  everything this model knows).
* ``info``       - how much the market knows that the model does not (team news,
  who is at the crease, dew, pitch, the weight of money from people with better
  models). Modelled properly as a private signal S ~ Normal(+info, 1) when A goes
  on to win and Normal(-info, 1) when A loses; a rational market then shifts its
  log-odds by 2*info*S. info = 0 means the market knows nothing extra. The signal is
  sometimes wrong, so the market is sharper on average, not clairvoyant. Real
  exchanges have info > 0; how much is exactly what cannot be known without real
  odds.
* ``noise``      - slow-moving random mispricing that carries no information.
"""
from __future__ import annotations

from dataclasses import asdict, dataclass

import numpy as np
import pandas as pd

from . import odds as O
from .models import logit, sigmoid
from .trader import TraderConfig


@dataclass
class MarketConfig:
    reference: str = "model"      # "model", "baseline"
    info: float = 0.0             # strength of the market's private signal (0 = none)
    noise_sd: float = 0.10        # stationary sd of mispricing, in logits
    noise_rho: float = 0.95       # ball-to-ball persistence of mispricing
    spread: float = 0.01          # back/lay gap in probability units
    seed: int = 11


def to_team1(oos: pd.DataFrame) -> pd.DataFrame:
    """Re-express batting-side probabilities as P(team1 wins) = selection A."""
    d = oos.copy()
    bat1 = (d["batting_team"] == d["team1"]).to_numpy()
    d["p_a"] = np.where(bat1, d["p_model"], 1 - d["p_model"])
    if "p_base" in d:
        d["p_base_a"] = np.where(bat1, d["p_base"], 1 - d["p_base"])
    d["a_won"] = (d["winner"] == d["team1"]).astype(int)
    return d


def simulate_market(d: pd.DataFrame, cfg: MarketConfig) -> pd.DataFrame:
    """Add ``p_mkt``, ``back_a`` and ``lay_a`` columns from a simulated market."""
    d = d.sort_values(["date", "match_id", "seq"], kind="stable").reset_index(drop=True)
    ref = d["p_a"] if cfg.reference == "model" else d["p_base_a"]
    rng = np.random.default_rng(cfg.seed)
    noise = np.empty(len(d))
    innov = cfg.noise_sd * np.sqrt(1 - cfg.noise_rho ** 2)
    start = d["match_id"].ne(d["match_id"].shift()).to_numpy()
    z = rng.standard_normal(len(d))
    e = 0.0
    for i in range(len(d)):
        e = cfg.noise_sd * z[i] if start[i] else cfg.noise_rho * e + innov * z[i]
        noise[i] = e
    # One private signal per match, shared by every ball of that match.
    sign = 2.0 * d["a_won"].to_numpy() - 1.0
    match_idx = np.cumsum(start) - 1
    signal = rng.standard_normal(match_idx.max() + 1)[match_idx] + cfg.info * sign
    d["p_mkt"] = sigmoid(logit(ref) + 2.0 * cfg.info * signal + noise)
    return add_prices(d, cfg.spread)


def add_prices(d: pd.DataFrame, spread: float) -> pd.DataFrame:
    h = spread / 2.0
    mid = d["p_mkt"].clip(0.01 + h, 0.99 - h)
    d["back_a"] = 1.0 / (mid + h)     # price to back A: slightly worse than fair
    d["lay_a"] = 1.0 / (mid - h)      # price to lay A
    return d


def load_odds_csv(path: str, d: pd.DataFrame) -> pd.DataFrame:
    """Attach real exchange prices. The CSV needs one row per (match, ball state):
    ``match_id, innings, balls_bowled, back_a, lay_a`` where A is ``team1`` in
    data/matches.csv. States with no quote are dropped."""
    q = pd.read_csv(path, dtype={"match_id": str})
    need = {"match_id", "innings", "balls_bowled", "back_a", "lay_a"}
    if not need <= set(q.columns):
        raise ValueError(f"odds file needs columns {sorted(need)}")
    q = q.drop_duplicates(["match_id", "innings", "balls_bowled"], keep="last")
    out = d.merge(q[list(need)], on=["match_id", "innings", "balls_bowled"], how="inner")
    out["p_mkt"] = (1 / out["back_a"] + 1 / out["lay_a"]) / 2
    return out.sort_values(["date", "match_id", "seq"], kind="stable").reset_index(drop=True)


def run(d: pd.DataFrame, cfg: TraderConfig | None = None, bankroll: float = 100_000.0,
        score_lag: int = 0, guard=None) -> pd.DataFrame:
    """Trade every match in ``d`` (needs p_a, back_a, lay_a, a_won). Stakes are sized
    off a fixed bankroll so results are additive and easy to read. Returns one row
    per round-trip trade.

    ``score_lag`` makes the trader's view of the match that many balls behind the
    prices it trades at, which is what a slow score feed does. ``guard`` (a
    ``live.StaleGuard``) then blocks any action when the price has moved further than
    it allows since the last score the trader has seen.
    """
    from .live import PaperTrader
    cfg = cfg or TraderConfig()
    trades = []
    for mid, g in d.groupby("match_id", sort=False):
        p = g["p_a"].to_numpy(); back = g["back_a"].to_numpy(); lay = g["lay_a"].to_numpy()
        seq = g["seq"].to_numpy(); a_won = bool(g["a_won"].iloc[0]); season = int(g["season"].iloc[0])
        mid_price = (1.0 / back + 1.0 / lay) / 2.0
        pt = PaperTrader(cfg, bankroll, mid, season)
        for i in range(len(g)):
            j = max(i - score_lag, 0)                  # the state the trader knows about
            if guard is not None and abs(mid_price[i] - mid_price[j]) > guard.max_unexplained_move:
                continue
            pt.on_tick(float(p[j]), float(back[i]), float(lay[i]), tag=int(seq[i]))
        pt.settle(a_won)
        trades.extend(pt.trades)
    cols = ["match_id", "season", "entry_seq", "side", "entry_odds", "stake", "risk",
            "entry_edge", "exit_seq", "exit", "exit_odds", "pnl"]
    return pd.DataFrame(trades, columns=cols)


def stale_score_test(oos: pd.DataFrame, cfg: TraderConfig | None = None, lags=(0, 1, 2, 3)) -> pd.DataFrame:
    """What a lagging score feed costs, with and without the stale-data guard.

    Uses the kindest realistic market (it knows exactly what the model knows, plus
    random mispricing), so any damage shown comes from the lag alone."""
    from .live import StaleGuard
    cfg = cfg or TraderConfig()
    d = simulate_market(to_team1(oos), MarketConfig(reference="model", info=0.0, noise_sd=0.10))
    n = d["match_id"].nunique()
    rows = []
    for lag in lags:
        for name, guard in (("off", None), ("on", StaleGuard())):
            s = summarize(run(d, cfg, score_lag=lag, guard=guard), n)
            rows.append({"score_lag_balls": lag, "guard": name, "trades": s.get("trades", 0),
                         "roi_on_risk_pct": s.get("roi_on_risk_pct", 0.0),
                         "prob_profit_pct": s.get("prob_profit_pct", 0.0)})
    return pd.DataFrame(rows)


def summarize(trades: pd.DataFrame, n_matches: int, bankroll: float = 100_000.0,
              n_boot: int = 2000, seed: int = 3) -> dict:
    if trades.empty:
        return {"matches": n_matches, "trades": 0, "pnl": 0.0}
    hedged = trades["exit"] != "settled"
    per_match = trades.groupby("match_id")["pnl"].sum()
    # Matches with no trade contribute zero; include them when resampling.
    full = np.concatenate([per_match.to_numpy(), np.zeros(max(n_matches - len(per_match), 0))])
    rng = np.random.default_rng(seed)
    boots = rng.choice(full, size=(n_boot, len(full)), replace=True).sum(axis=1)
    equity = trades["pnl"].cumsum()
    return {
        "matches": n_matches,
        "matches_traded": int(per_match.size),
        "trades": int(len(trades)),
        "pnl": float(trades["pnl"].sum()),
        "pnl_pct_bankroll": float(trades["pnl"].sum() / bankroll * 100),
        "roi_on_risk_pct": float(trades["pnl"].sum() / trades["risk"].sum() * 100),
        "win_rate_pct": float((trades["pnl"] > 0).mean() * 100),
        "hedged_pct": float(hedged.mean() * 100),
        "green_both_sides_pct": float((hedged & (trades["pnl"] > 0)).mean() * 100),
        "red_both_sides_pct": float((hedged & (trades["pnl"] <= 0)).mean() * 100),
        "held_to_result_pct": float((~hedged).mean() * 100),
        "max_drawdown": float((equity.cummax() - equity).max()),
        "pnl_ci90": [float(np.percentile(boots, 5)), float(np.percentile(boots, 95))],
        "prob_profit_pct": float((boots > 0).mean() * 100),
    }


def market_quality(d: pd.DataFrame) -> dict:
    """Log loss of the market mid price vs the model, on the same balls."""
    y = d["a_won"].to_numpy()

    def ll(p):
        p = np.clip(p, 1e-6, 1 - 1e-6)
        return float(-(y * np.log(p) + (1 - y) * np.log(1 - p)).mean())
    return {"market_logloss": ll(d["p_mkt"].to_numpy()), "model_logloss": ll(d["p_a"].to_numpy())}


# Named scenarios, from most to least flattering. Only the last few resemble a
# liquid exchange market.
SCENARIOS = [
    ("Naive market: only as smart as the reference repos",
     MarketConfig(reference="baseline", info=0.0, noise_sd=0.10)),
    ("Sharper overall, but blind to what this model sees",
     MarketConfig(reference="baseline", info=0.45, noise_sd=0.10)),
    ("Knows what this model knows, plus random mispricing",
     MarketConfig(reference="model", info=0.0, noise_sd=0.10)),
    ("Knows more than this model, plus random mispricing",
     MarketConfig(reference="model", info=0.30, noise_sd=0.10)),
    ("Knows more than this model, little mispricing",
     MarketConfig(reference="model", info=0.30, noise_sd=0.03)),
    ("Efficient: knows more, no mispricing",
     MarketConfig(reference="model", info=0.30, noise_sd=0.0)),
]


def scenario_grid(oos: pd.DataFrame, cfg: TraderConfig | None = None,
                  scenarios=None) -> pd.DataFrame:
    """Run the trading rule against each simulated market scenario."""
    cfg = cfg or TraderConfig()
    d0 = to_team1(oos)
    n_matches = d0["match_id"].nunique()
    rows = []
    for name, mc in (scenarios or SCENARIOS):
        d = simulate_market(d0, mc)
        s = summarize(run(d, cfg), n_matches)
        rows.append({"scenario": name} | asdict(mc) | market_quality(d) | s)
    return pd.DataFrame(rows)
