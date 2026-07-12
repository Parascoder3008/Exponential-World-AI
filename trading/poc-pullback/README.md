# POC Pullback Strategy

- `poc_pullback_strategy.pine` — TradingView Pine v5 strategy: builds the previous day's
  volume profile, extends its POC, and trades rejections with an HTF-EMA bias filter,
  ATR/candle stops and a fixed-R target. Open the Pine Editor in TradingView, paste, and
  "Add to chart" on a 30m gold chart (`OANDA:XAUUSD` or `COMEX:GC1!`) to see backtest
  results in the Strategy Tester.
- `PLAYBOOK.md` — full rule set: setup, bias filter, entries, stops, targets,
  invalidations, risk rules, and testing protocol.

To test via a local TradingView MCP: open Claude Code on your machine inside your
`ai trader` project folder, pull this branch, and ask Claude to load the strategy on the
gold chart and report the Strategy Tester metrics.
