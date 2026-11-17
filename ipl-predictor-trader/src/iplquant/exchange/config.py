"""Where things are on the exchange page, as CSS selectors.

Every site lays its page out differently, so the selectors live in a small JSON file
made by ``ipl calibrate`` (you click each element once) rather than in the code.
"""
from __future__ import annotations

import json
from dataclasses import asdict, dataclass, field
from pathlib import Path

REQUIRED_READ = ("runner_name", "back_price", "lay_price")
REQUIRED_EXECUTE = ("stake_input", "place_button")


@dataclass
class SiteConfig:
    name: str = "exchange"
    url: str = ""
    # One selector per runner (two for a match-odds market), first runner first.
    runner_name: list = field(default_factory=lambda: ["", ""])
    back_price: list = field(default_factory=lambda: ["", ""])
    lay_price: list = field(default_factory=lambda: ["", ""])
    score: str = ""                 # optional: element showing the live score
    # Bet slip, needed only to place bets.
    stake_input: str = ""
    odds_input: str = ""            # optional: set the price explicitly
    place_button: str = ""
    confirm_button: str = ""        # optional second click some sites need
    bet_matched: str = ""           # optional: element whose count rises on a matched bet
    slip_cancel: str = ""           # optional: clears the slip after a failed attempt
    poll_seconds: float = 1.0

    def missing(self, execute: bool = False) -> list[str]:
        out = []
        for k in REQUIRED_READ:
            v = getattr(self, k)
            if not (isinstance(v, list) and len(v) == 2 and all(v)):
                out.append(k)
        if execute:
            out += [k for k in REQUIRED_EXECUTE if not getattr(self, k)]
        if not self.url:
            out.append("url")
        return out

    def save(self, path: str | Path) -> Path:
        path = Path(path)
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(asdict(self), indent=2))
        return path

    @staticmethod
    def load(path: str | Path) -> "SiteConfig":
        raw = json.loads(Path(path).read_text())
        known = SiteConfig.__dataclass_fields__
        unknown = set(raw) - set(known)
        if unknown:
            raise ValueError(f"unknown keys in {path}: {sorted(unknown)}")
        return SiteConfig(**raw)
