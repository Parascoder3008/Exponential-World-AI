#!/usr/bin/env python3
"""
Harvest the Estefania Freites resource library out of this session's Claude Code
transcript and into a clean local corpus.

Every guide on that Notion site wraps its real content in an identical marketing
shell: cover art, a Wistia video, a Calendly callout, then at the bottom a
"mindset shift" block, an agency pitch and eight case-study banners. That shell is
most of the byte count and none of the value, so it gets cut here.

Sources, in order of preference:
  1. tool-results/*.txt   - results too large to inline, already on disk
  2. <session>.jsonl      - everything else, verbatim in the transcript

Both hold the same payload shape, so they are parsed the same way.

Usage:  python3 harvest.py [--transcript-dir DIR] [--out DIR]
"""

import argparse
import hashlib
import json
import os
import re
import sys
from collections import Counter

# --- the marketing shell -----------------------------------------------------

# The header runs from the top of the page to the first "---\n---" divider. It is
# only a header if this line is in it, otherwise the divider is real content.
HEADER_TELL = "We help established DTC brands ship"

# Everything from here down is the pitch, repeated verbatim on all 80 pages.
FOOTER_MARKERS = (
    "### **The mindset shift**",
    "### **If you want my team to build this system for you**",
)

# Some pages close the header with a single divider instead of "---\n---", so the
# divider cut misses and these three lines survive. They are always verbatim.
PITCH_LINES = re.compile(
    r"^(?:We help established DTC brands ship[^\n]*"
    r"|Goal: scale your paid ads profitably[^\n]*"
    r"|Here.s a quick video explaining what we do:)\s*$",
    re.MULTILINE,
)

# The booking callout appears in gray_bg, pink_bg and blue_bg. Match on the link.
BOOKING_CALLOUT = re.compile(
    r"<callout[^>]*>\n(?:(?!</callout>).)*?(?:calendly\.com|hueccoincubator)"
    r"(?:(?!</callout>).)*?</callout>\n?",
    re.DOTALL,
)

# Notion escapes these in its markdown export; they are noise in a plain corpus.
NOTION_ESCAPE = re.compile(r"\\+([$\[\]<>:#*_])")

IMG_URL = re.compile(r"https://prod-files-secure[^\s\")]+")
BANNER = re.compile(r"^!\[\]\(\[IMG\]\)\s*$", re.MULTILINE)
WISTIA = re.compile(r"^<embed src=\"https://embed-cloudfront\.wistia[^\n]*\n?", re.MULTILINE)
EMPTY_BLOCK = re.compile(r"^<empty-block/>\s*$", re.MULTILINE)
BLANK_RUN = re.compile(r"\n{3,}")
DIVIDER_RUN = re.compile(r"(?:^---\s*$\n?){2,}", re.MULTILINE)

PAGE_ID = re.compile(r"app\.notion\.com/p/([0-9a-f]{32})")
CONTENT = re.compile(r"<content>\n(.*)\n</content>", re.DOTALL)
TITLE_PROP = re.compile(r'"title"\s*:\s*"((?:[^"\\]|\\.)*)"')


# --- classification ----------------------------------------------------------
# Ordered: first rule that matches wins, so the specific layers are tested before
# the catch-all production bucket.

LAYER_RULES = [
    ("index", ("resource library",)),
    ("brain", ("brand memory", "memory schema", "brand-context", "onboard")),
    ("research", ("research killer", "ads library", "competitor", "meta ads research",
                  "audit playbook", "hook system", "50-hook")),
    # MCP and agent wiring is tooling, not strategy, so it is tested before strategy.
    ("skills", ("claude skills", "claude agents", "creative plugin", "skills for paid ads",
                "agents for", "subagent", "mcp", "plugin")),
    ("strategy", ("strategist", "playbook", "scaling playbook", "marketing engine",
                  "ad engine", "creative department", "agency system", "1-chat")),
    ("reporting", ("roas system", "ad reporting", "performance intelligence", "matrix")),
    ("ugc", ("ugc",)),
    ("production", ()),  # default
]


def classify(title: str) -> str:
    low = title.lower()
    for layer, keys in LAYER_RULES:
        if any(k in low for k in keys):
            return layer
    return "production"


def slugify(title: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    return (s[:72] or "untitled").rstrip("-")


# --- cleaning ----------------------------------------------------------------

def strip_shell(text: str) -> str:
    """Remove the repeated marketing wrapper from one page's content."""
    # Header: cut through the divider that closes it, but only when the pitch
    # line is actually present above that divider.
    m = re.search(r"\n---\n---\n", text)
    if m and HEADER_TELL in text[: m.start()]:
        text = text[m.end():]

    # Footer: cut at whichever pitch marker appears first.
    cuts = [text.find(mk) for mk in FOOTER_MARKERS]
    cuts = [c for c in cuts if c != -1]
    if cuts:
        text = text[: min(cuts)]

    text = IMG_URL.sub("[IMG]", text)
    text = WISTIA.sub("", text)
    text = BANNER.sub("", text)
    text = EMPTY_BLOCK.sub("", text)
    text = BOOKING_CALLOUT.sub("", text)
    text = PITCH_LINES.sub("", text)
    text = NOTION_ESCAPE.sub(r"\1", text)

    text = DIVIDER_RUN.sub("---\n", text)
    text = BLANK_RUN.sub("\n\n", text)
    return text.strip()


def unescape(s: str) -> str:
    return s.replace("\\n", "\n").replace("\\t", "\t").replace('\\"', '"')


# --- extraction --------------------------------------------------------------

def parse_payload(raw: str):
    """Pull (page_id, title, cleaned_body) out of one notion-fetch result blob."""
    body = CONTENT.search(raw)
    if not body:
        return None
    text = strip_shell(body.group(1))
    if len(text) < 400:  # index pages and stubs carry no system worth keeping
        return None

    pid = PAGE_ID.search(raw)
    titles = TITLE_PROP.findall(raw)
    # The first "title" is the tool wrapper's, the last is the page property.
    title = unescape(titles[-1]) if titles else "Untitled"
    title = NOTION_ESCAPE.sub(r"\1", title).strip()
    return (pid.group(1) if pid else None), title, text


def iter_blobs(transcript_dir: str):
    """Yield every raw notion-fetch result found on disk, largest source first."""
    results_dir = None
    for root, dirs, _ in os.walk(transcript_dir):
        if "tool-results" in dirs:
            results_dir = os.path.join(root, "tool-results")
            break

    if results_dir:
        for name in sorted(os.listdir(results_dir)):
            if "notion-fetch" not in name:
                continue
            with open(os.path.join(results_dir, name), errors="replace") as fh:
                yield unescape(fh.read())

    # Transcript result lines carry the payload but not the tool name, so match
    # on the payload itself. The same string is stored twice per entry (once
    # under message.content, once under toolUseResult) - hence the seen set.
    seen = set()
    for name in sorted(os.listdir(transcript_dir)):
        if not name.endswith(".jsonl"):
            continue
        with open(os.path.join(transcript_dir, name), errors="replace") as fh:
            for line in fh:
                if "<content>" not in line or "app.notion.com/p/" not in line:
                    continue
                try:
                    obj = json.loads(line)
                except json.JSONDecodeError:
                    continue
                for blob in walk_text(obj):
                    if "<content>" not in blob or "app.notion.com/p/" not in blob:
                        continue
                    fingerprint = hashlib.sha1(blob.encode()).hexdigest()
                    if fingerprint in seen:
                        continue
                    seen.add(fingerprint)
                    yield unescape(blob)


def walk_text(node):
    """Every string in a nested transcript entry."""
    if isinstance(node, str):
        yield node
    elif isinstance(node, dict):
        for v in node.values():
            yield from walk_text(v)
    elif isinstance(node, list):
        for v in node:
            yield from walk_text(v)


# --- main --------------------------------------------------------------------

def main():
    here = os.path.dirname(os.path.abspath(__file__))
    ap = argparse.ArgumentParser()
    ap.add_argument(
        "--transcript-dir",
        default="/root/.claude/projects/-home-user-Exponential-World-AI",
    )
    ap.add_argument("--out", default=os.path.dirname(here))
    args = ap.parse_args()

    raw_dir = os.path.join(args.out, "raw")
    os.makedirs(raw_dir, exist_ok=True)

    by_id = {}
    for blob in iter_blobs(args.transcript_dir):
        parsed = parse_payload(blob)
        if not parsed:
            continue
        pid, title, text = parsed
        key = pid or hashlib.sha1(title.encode()).hexdigest()[:32]
        # Keep the longest capture of a page; a truncated one may appear first.
        if key not in by_id or len(text) > len(by_id[key][1]):
            by_id[key] = (title, text)

    if not by_id:
        sys.exit("No notion-fetch results found. Fetch the pages first.")

    # Content-identical pages are the library's own duplicates.
    seen_hash = {}
    manifest = []
    for pid, (title, text) in sorted(by_id.items(), key=lambda kv: kv[1][0].lower()):
        digest = hashlib.sha1(text.encode()).hexdigest()[:12]
        layer = classify(title)
        slug = slugify(title)
        duplicate_of = seen_hash.get(digest)
        if duplicate_of is None:
            seen_hash[digest] = slug

        entry = {
            "slug": slug,
            "title": title,
            "page_id": pid,
            "layer": layer,
            "chars": len(text),
            "sha1": digest,
            "duplicate_of": duplicate_of,
        }
        manifest.append(entry)

        if duplicate_of:
            continue  # one copy on disk is enough

        front = [
            "---",
            f"title: {json.dumps(title)}",
            f"page_id: {pid}",
            f"layer: {layer}",
            f"source: https://freebie-for-you.notion.site/{pid}",
            "---",
            "",
        ]
        with open(os.path.join(raw_dir, f"{slug}.md"), "w") as fh:
            fh.write("\n".join(front) + text + "\n")

    with open(os.path.join(args.out, "MANIFEST.json"), "w") as fh:
        json.dump(manifest, fh, indent=2)
        fh.write("\n")

    dupes = sum(1 for e in manifest if e["duplicate_of"])
    layers = Counter(e["layer"] for e in manifest if not e["duplicate_of"])
    total = sum(e["chars"] for e in manifest if not e["duplicate_of"])

    print(f"pages captured : {len(manifest)}")
    print(f"duplicates     : {dupes}")
    print(f"written        : {len(manifest) - dupes}")
    print(f"corpus size    : {total:,} chars")
    for layer, n in layers.most_common():
        print(f"  {layer:<12} {n}")


if __name__ == "__main__":
    main()
