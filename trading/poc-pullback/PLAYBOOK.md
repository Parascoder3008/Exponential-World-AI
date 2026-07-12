# Prev-Day POC Pullback — Trading Playbook

Strategy extracted from the "Nolan shows simplest trading model for perfect entries" reel.
Core idea: yesterday's highest-volume price (the volume profile **Point of Control**) is where
"serious money" transacted. When price pulls back to it today, it tends to react — trade the
rejection **in the direction of your higher-timeframe bias**.

---

## 1. Chart setup (TradingView)

1. Open the instrument on the **30-minute timeframe** (video default; works on 15m–1H too).
2. Chart Settings → **Events → Session breaks ON** — vertical lines mark each trading day.
3. Left toolbox → **Fixed Range Volume Profile** → stretch it across the **previous trading
   day's full range** (session break to session break).
4. Extend the profile's **POC line** into the current session.
   (The Pine Script in this folder draws it automatically.)

## 2. Bias filter — mandatory

The reel's own caveat: it "works almost like magic **when you have your higher-timeframe bias**."

- Default filter: price vs **4-hour EMA-50** (configurable in the script).
- Above the EMA → **longs only** at the POC. Below → **shorts only**.
- No bias (price chopping around the EMA) → **no trade**. This is the #1 filter.

## 3. Entry rules

| | LONG | SHORT |
|---|---|---|
| Bias | Price above HTF EMA | Price below HTF EMA |
| Setup | Price dips **down into** prev-day POC | Price rallies **up into** prev-day POC |
| Trigger | 30m candle wicks the POC but **closes back above** it | 30m candle wicks the POC but **closes back below** it |
| Entry | Next candle open | Next candle open |

Skip the setup if price **closes through** the POC instead of rejecting it — acceptance
through the level invalidates the trade (see §6).

## 4. Stop loss

Two options (both in the script):

- **Rejection candle** (default): 1 tick beyond the rejection candle's extreme.
- **ATR buffer**: POC ± 1.0 × ATR(14) — wider, survives noise, smaller position size.

## 5. Target & management

- Fixed **2R** take-profit by default (script input `Reward : risk`).
- Optional discretionary upgrade: take half at 2R, trail the rest behind 30m swings.
- **One trade per day per instrument** (script enforces this). The first touch of the POC
  is the informative one; the third retest usually breaks.

## 6. Invalidations — do NOT trade when

- A 30m candle **closes through** the POC (acceptance, not rejection).
- Price opens far from the POC and never pulls back — no chase.
- Prev day was a tight inside/doji day — POC of a rangeless day carries little information.
- High-impact news within ~30 min (NFP, FOMC, CPI) — levels get run.
- No higher-timeframe bias.

## 7. Risk rules

- Risk a fixed **0.5–1% of account per trade**, position-sized from the stop distance.
- Max 1 trade/day per instrument, stop trading the setup for the day after the trade resolves.
- Expect roughly 40–55% win rate at 2R — the edge is in the R-multiple, not the hit rate.

## 8. Testing protocol (do this before risking money)

1. Load `poc_pullback_strategy.pine` in TradingView's Pine Editor → *Add to chart*.
2. Test on **gold**: `OANDA:XAUUSD` or `COMEX:GC1!`, **30m** timeframe.
3. Strategy Tester → record: net profit, profit factor, win rate, max drawdown, trade count.
4. Re-run with bias filter OFF to see how much the filter contributes (it should matter a lot).
5. Walk-forward sanity check: does the most recent quarter look like the full sample?
6. Only then forward-test small size for 2–4 weeks.

## 9. Honest caveats

- This is a well-known volume-profile concept, not a secret. It fails in strong one-way
  trend days (price never pulls back) and in acceptance regimes (price plows through POC).
- Spot forex/CFD "volume" is tick volume, not true volume — POC is an approximation there.
  Futures (GC, MCX GOLD) have real volume.
- The reel's final CTA ("comment Pro for free signals") is lead-gen marketing — the level
  logic above is the only part with substance.
