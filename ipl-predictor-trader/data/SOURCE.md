# Data source

`matches.csv` and `balls.csv.gz` were built with `ipl ingest` from Cricsheet match JSON
files: every men's match in 11 franchise T20 leagues up to 2026-09-20 (5,532 matches,
1,288,266 deliveries; super overs excluded).

| Code | League | Matches |
|---|---|---|
| ipl | Indian Premier League | 1,243 |
| ntb | Vitality Blast | 1,570 |
| bbl | Big Bash League | 662 |
| bpl | Bangladesh Premier League | 469 |
| cpl | Caribbean Premier League | 445 |
| psl | Pakistan Super League | 357 |
| ssm | Super Smash | 270 |
| lpl | Lanka Premier League | 143 |
| ilt | International League T20 | 134 |
| sat | SA20 | 130 |
| mlc | Major League Cricket | 109 |

Source: [Cricsheet](https://cricsheet.org), by Stephen Rushe, under the Open Data Commons
Attribution License. Downloaded 2026-11-17 from https://cricsheet.org/downloads/
(`<code>_json.zip`).

To refresh: download the archives above, unzip each into a folder named by its code
(`leagues/ipl`, `leagues/bbl`, ...), then run
`ipl ingest leagues --out data && ipl train && ipl evaluate`.
