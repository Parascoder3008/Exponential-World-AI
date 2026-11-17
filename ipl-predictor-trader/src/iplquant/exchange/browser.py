"""Drive the exchange page in a real browser (Playwright).

The browser runs with a persistent profile folder, so you log in once by hand and the
login is remembered on your computer. This module never types a password.
"""
from __future__ import annotations

import os
import re
import time
from dataclasses import dataclass
from pathlib import Path

from .config import SiteConfig

DEFAULT_PROFILE = Path.home() / ".iplquant" / "browser-profile"
_NUM = re.compile(r"\d+(?:\.\d+)?")

# All reads happen in one round trip so prices and score come from the same instant.
_READ_JS = """
(sel) => {
  const txt = (s) => { if (!s) return null; const e = document.querySelector(s);
                       return e ? (e.innerText || e.textContent || '').trim() : null; };
  return {names: sel.names.map(txt), back: sel.back.map(txt), lay: sel.lay.map(txt),
          score: txt(sel.score), matched: sel.matched ? document.querySelectorAll(sel.matched).length : null};
}
"""


def parse_price(text: str | None) -> float | None:
    """'2.04', '2.04\\n£1,203' -> 2.04; '', '-', None -> None."""
    if not text:
        return None
    m = _NUM.search(text.replace(",", ""))
    if not m:
        return None
    v = float(m.group())
    return v if 1.0 < v <= 1000.0 else None


@dataclass
class Snapshot:
    ts: float
    names: list
    back: list
    lay: list
    score_text: str | None
    matched_count: int | None = None

    @property
    def priced(self) -> bool:
        return all(v is not None for v in self.back + self.lay)


@dataclass
class PlaceResult:
    ok: bool
    reason: str = ""
    confirmed: bool = False
    filled_odds: float | None = None   # price actually matched, when the page shows it


_AT_PRICE = re.compile(r"@\s*(\d+(?:\.\d+)?)")


def fill_price(text: str | None) -> float | None:
    """'Matched: BACK X @ 3.50 stake 100' -> 3.5. Only trusts a price written after '@'."""
    if not text:
        return None
    m = _AT_PRICE.search(text)
    return float(m.group(1)) if m and 1.0 < float(m.group(1)) <= 1000 else None


class BrowserExchange:
    def __init__(self, cfg: SiteConfig, profile_dir: str | Path | None = None,
                 headless: bool = False, executable_path: str | None = None):
        self.cfg = cfg
        self.profile_dir = Path(profile_dir) if profile_dir else DEFAULT_PROFILE
        self.headless = headless
        self.executable_path = executable_path or os.environ.get("IPLQUANT_CHROME")
        self._pw = self._ctx = self.page = None

    # ---- lifecycle ---------------------------------------------------------
    def start(self) -> "BrowserExchange":
        from playwright.sync_api import sync_playwright
        self.profile_dir.mkdir(parents=True, exist_ok=True)
        self._pw = sync_playwright().start()
        kw = {"headless": self.headless}
        if self.executable_path:
            kw["executable_path"] = self.executable_path
        self._ctx = self._pw.chromium.launch_persistent_context(str(self.profile_dir), **kw)
        self.page = self._ctx.pages[0] if self._ctx.pages else self._ctx.new_page()
        if self.cfg.url:
            self.page.goto(self.cfg.url)
        return self

    def attach(self, page) -> "BrowserExchange":
        """Use an existing Playwright page (tests, or a browser you started yourself)."""
        self.page = page
        return self

    def close(self) -> None:
        for obj in (self._ctx, self._pw):
            try:
                if obj is not None:
                    obj.close() if obj is self._ctx else obj.stop()
            except Exception:  # noqa: BLE001 - closing must never raise
                pass

    # ---- reading -----------------------------------------------------------
    def read(self) -> Snapshot:
        c = self.cfg
        raw = self.page.evaluate(_READ_JS, {"names": c.runner_name, "back": c.back_price,
                                            "lay": c.lay_price, "score": c.score or None,
                                            "matched": c.bet_matched or None})
        return Snapshot(ts=time.time(), names=raw["names"],
                        back=[parse_price(x) for x in raw["back"]],
                        lay=[parse_price(x) for x in raw["lay"]],
                        score_text=raw["score"], matched_count=raw["matched"])

    # ---- placing -----------------------------------------------------------
    def _matched(self) -> int:
        return self.page.locator(self.cfg.bet_matched).count() if self.cfg.bet_matched else 0

    def place(self, runner: int, side: str, odds: float, stake: float,
              timeout: float = 8.0) -> PlaceResult:
        """Back or lay ``runner`` (0 or 1). Returns ok only when the click sequence
        completed; ``confirmed`` is True only when the page showed a new matched bet."""
        c, pg = self.cfg, self.page
        if side not in ("back", "lay"):
            raise ValueError("side must be back or lay")
        before = self._matched()
        try:
            pg.click((c.back_price if side == "back" else c.lay_price)[runner], timeout=3000)
            if c.odds_input:
                pg.fill(c.odds_input, f"{odds:.2f}", timeout=3000)
            pg.fill(c.stake_input, f"{stake:.2f}", timeout=3000)
            pg.click(c.place_button, timeout=3000)
            if c.confirm_button:
                try:
                    pg.click(c.confirm_button, timeout=2000)
                except Exception:  # noqa: BLE001 - optional step
                    pass
        except Exception as e:  # noqa: BLE001
            self._cancel()
            return PlaceResult(False, f"click failed: {type(e).__name__}")
        if not c.bet_matched:
            return PlaceResult(True, "placed; this site config cannot confirm a match", False)
        end = time.time() + timeout
        while time.time() < end:
            if self._matched() > before:
                last = self.page.locator(self.cfg.bet_matched).nth(before)
                try:
                    text = last.inner_text(timeout=1000)
                except Exception:  # noqa: BLE001
                    text = None
                return PlaceResult(True, "matched", True, fill_price(text))
            pg.wait_for_timeout(100)
        self._cancel()
        return PlaceResult(False, "not matched in time")

    def _cancel(self) -> None:
        if self.cfg.slip_cancel:
            try:
                self.page.click(self.cfg.slip_cancel, timeout=1000)
            except Exception:  # noqa: BLE001
                pass
