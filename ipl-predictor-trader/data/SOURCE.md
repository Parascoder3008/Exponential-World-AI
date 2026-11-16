# Data source

`matches.csv` and `balls.csv.gz` were built with `ipl ingest` from Cricsheet-format
match JSON files: every IPL match from 2008-04-18 to the 2026 final on 2026-05-31
(1,243 matches, 295,557 deliveries; super overs excluded).

- Original ball-by-ball records: [Cricsheet](https://cricsheet.org), by Stephen Rushe,
  made available under the Open Data Commons Attribution License.
- JSON files were taken from the mirror
  [ritesh-ojha/IPL-DATASET](https://github.com/ritesh-ojha/IPL-DATASET) (MIT licence),
  commit `5c638d9`, dated 2026-06-02.

To refresh: download `ipl_json.zip` from https://cricsheet.org/downloads/, unzip it,
then run `ipl ingest <folder> --out data && ipl train && ipl evaluate`.
