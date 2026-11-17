"""Teach the bot where things are on your exchange page by clicking them once.

``ipl calibrate --url <match page>`` opens a browser. Log in, open a match, then follow
the prompts in the terminal: each time, click the element named. While calibration is
waiting for a pick, the click is captured and does nothing on the page (so clicking
the Place button here places nothing). Press Escape in the browser to skip an optional
item. The result is a small JSON file you pass to ``ipl bot --site``.
"""
from __future__ import annotations

import time

from .config import SiteConfig

PICKER_JS = r"""
() => {
  if (window.__iqInstalled) return;
  window.__iqInstalled = true;
  window.__iqArmed = false; window.__iqPick = null;
  const css = (el) => {
    if (el.id && document.querySelectorAll('#' + CSS.escape(el.id)).length === 1)
      return '#' + CSS.escape(el.id);
    const parts = [];
    while (el && el.nodeType === 1 && el !== document.documentElement) {
      if (el.id && document.querySelectorAll('#' + CSS.escape(el.id)).length === 1) {
        parts.unshift('#' + CSS.escape(el.id)); break;
      }
      let i = 1, s = el;
      while ((s = s.previousElementSibling)) if (s.tagName === el.tagName) i++;
      parts.unshift(el.tagName.toLowerCase() + ':nth-of-type(' + i + ')');
      el = el.parentElement;
    }
    return parts.join(' > ');
  };
  let last = null;
  document.addEventListener('mouseover', (e) => {
    if (!window.__iqArmed) return;
    if (last) last.style.outline = last.__iqOutline || '';
    last = e.target; last.__iqOutline = last.style.outline; last.style.outline = '2px solid #e0457b';
  }, true);
  document.addEventListener('click', (e) => {
    if (!window.__iqArmed) return;
    e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
    if (last) last.style.outline = last.__iqOutline || '';
    window.__iqPick = css(e.target); window.__iqArmed = false;
  }, true);
  document.addEventListener('keydown', (e) => {
    if (window.__iqArmed && e.key === 'Escape') { window.__iqPick = ''; window.__iqArmed = false; }
  }, true);
}
"""

STEPS = [
    ("runner_name", 0, "the NAME of the first team in the match odds market", True),
    ("back_price", 0, "the BACK price of the first team", True),
    ("lay_price", 0, "the LAY price of the first team", True),
    ("runner_name", 1, "the NAME of the second team", True),
    ("back_price", 1, "the BACK price of the second team", True),
    ("lay_price", 1, "the LAY price of the second team", True),
    ("score", None, "the live SCORE text (or Escape if the page has none)", False),
]
SLIP_STEPS = [
    ("stake_input", None, "the STAKE box in the bet slip", True),
    ("odds_input", None, "the ODDS box in the bet slip (Escape to skip)", False),
    ("place_button", None, "the PLACE BET button (nothing will be placed)", True),
    ("confirm_button", None, "a CONFIRM button if the site asks twice (Escape to skip)", False),
    ("slip_cancel", None, "the CANCEL / clear button of the slip (Escape to skip)", False),
    ("bet_matched", None, "one MATCHED BET entry in your bets list (Escape to skip; "
                          "without it the bot cannot confirm fills)", False),
]


def install(page) -> None:
    page.evaluate(PICKER_JS)


def pick_once(page, timeout: float = 300.0) -> str | None:
    """Wait for one click. Returns a CSS selector, '' if skipped, None on timeout."""
    install(page)
    page.evaluate("() => { window.__iqPick = null; window.__iqArmed = true; }")
    end = time.time() + timeout
    while time.time() < end:
        v = page.evaluate("() => window.__iqPick")
        if v is not None:
            return v
        page.wait_for_timeout(150)
    page.evaluate("() => { window.__iqArmed = false; }")
    return None


def describe(page, selector: str) -> str:
    try:
        return page.inner_text(selector, timeout=1000).strip().replace("\n", " ")[:60]
    except Exception:  # noqa: BLE001
        return "?"


def run(page, cfg: SiteConfig, with_slip: bool = True, ask=input, say=print) -> SiteConfig:
    """Interactive calibration on an open page."""
    def do(steps):
        for key, idx, text, required in steps:
            while True:
                say(f"\n-> Click {text}.")
                sel = pick_once(page)
                if sel is None:
                    say("   timed out; try again.")
                    continue
                if sel == "" and required:
                    say("   this one is required.")
                    continue
                if sel:
                    say(f"   got: {sel}   (shows: {describe(page, sel)!r})")
                if idx is None:
                    setattr(cfg, key, sel)
                else:
                    getattr(cfg, key)[idx] = sel
                break
    cfg.url = cfg.url or page.url
    do(STEPS)
    if with_slip:
        ask("\nNow click any BACK price yourself so the bet slip opens (that click is not "
            "captured and places nothing), then press Enter here.")
        do(SLIP_STEPS)
    return cfg
