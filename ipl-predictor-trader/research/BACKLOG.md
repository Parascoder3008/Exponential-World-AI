# Experiment backlog: IPL and Big Bash in-play model

Status: `todo`, `done (accepted)`, `done (rejected)`. Results in LOG.md.

"Live: score line" = needs only score, wickets, overs and target, which the exchange
page shows. "Live: scorecard" = needs batter/bowler names and figures, which would need
a second page (a live scorecard) read by the bot.

| # | Experiment | Live input | Status |
|---|---|---|---|
| 1 | Weight IPL and BBL matches more in training | score line | done (rejected) |
| 2 | Weight recent seasons more | score line | done (rejected) |
| 3 | Regularisation strength | score line | done (rejected) |
| 4 | Momentum windows: last 6 and last 30 balls, dot-ball share | score line | done (rejected) |
| 5 | Resources-remaining table (expected runs left for balls x wickets, learned per fold) | score line | done (rejected) |
| 6 | Per-league calibration on the last training season | score line | done (rejected) |
| 7 | Low-capacity boosted trees on the logistic model's residual | score line | done (rejected) |
| 8 | Wickets x phase and required-rate x wickets interactions | score line | done (rejected) |
| 9 | Batters at the crease: quality and how set (balls faced) | scorecard | todo |
| 10 | Bowling resources left: overs remaining from the best bowlers | scorecard | todo |
| 11 | Batting depth: quality of batters still to come | scorecard | todo |
| 12 | Era terms for rule changes (IPL impact player 2023+, BBL power surge 2020+) | score line | todo, exam seasons only can show it |
| 13 | Calibration for the Big Bash only (idea taken from #6's result, so it must also pass the exam seasons) | score line | todo |
