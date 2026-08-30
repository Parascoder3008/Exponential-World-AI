# Estefania Freites Resource Library — local corpus

A cleaned, de-duplicated copy of the public Notion resource library at
[freebie-for-you.notion.site](https://freebie-for-you.notion.site/Estefania-Freites-Resource-Library-35292e2e92e980eb8f14ca219b521462),
harvested so the material can be read, diffed and mined offline instead of one
Notion page at a time.

**76 pages · 2.21M characters · harvested 2026-08-30**

The content is someone else's marketing collateral, published free behind an
agency pitch. It is kept here as source material for building our own ad
system, not as anything to ship. Treat every performance number in it as an
unverified claim by the author.

## Layout

```
raw/            one .md per page, YAML front matter + body
MANIFEST.json   every page: slug, title, page_id, layer, chars, sha1, duplicate_of
tools/harvest.py  the harvester (re-runnable, idempotent)
```

Front matter on each page:

```yaml
title: "The Claude Code + Meta Ads MCP Playbook: ..."
page_id: 36292e2e92e9809f8f5bda7dd7813d8c
layer: skills
source: https://freebie-for-you.notion.site/36292e2e92e9809f8f5bda7dd7813d8c
```

## What was stripped

Every guide on the site wraps its real content in an identical marketing shell,
which is most of the byte count and none of the value:

- cover art, a Wistia video embed, a Calendly booking callout
- a "mindset shift" block and an agency pitch at the bottom
- eight case-study / testimonial banner images

`harvest.py` cuts the header at the divider that closes it (or, on pages that
use a single divider, by the three verbatim pitch lines), truncates the body at
the first footer marker, replaces signed S3 image URLs with `[IMG]`, drops the
booking callout in any colour, and unescapes Notion's backslash escapes
(`\$5K` → `$5K`). Verified: no page in `raw/` still matches
`We help established DTC brands|mindset shift|hueccoincubator|calendly|Banner_[0-9]`.

Removing the shell takes the corpus from roughly 4M characters to 2.21M.

## Layers

Pages are tagged by a first-match-wins keyword rule on the title
(`LAYER_RULES` in `harvest.py`). The tags are a reading aid, not a taxonomy the
source itself uses:

| layer | n | what it holds |
|---|---|---|
| `production` | 44 | video/image generation guides — Seedance, GPT Image 2, Higgsfield, Kling, storyboard systems |
| `ugc` | 9 | UGC-specific pipelines (Maxfusion, MakeUGC, hyper-real, swarm) |
| `skills` | 8 | Claude agents, skills, plugins, MCP wiring |
| `strategy` | 6 | the "engine" / "department" / strategist framings |
| `research` | 5 | hook libraries, competitor and account audits |
| `reporting` | 2 | ROAS and performance-intelligence systems |
| `brain` | 1 | the brand-memory schema |
| `index` | 1 | the library's own landing page |

## Duplicates

Three pages are byte-identical to another page after the shell is stripped;
they are recorded in `MANIFEST.json` with `duplicate_of` set and are not
written to `raw/`:

- The 50-Hook Library + Claude MCP Setup (Higgsfield Hooks)
- The Cinematic Ad Production Board System: ChatGPT Image 2 + Seedance 2.0 (1)
- The Claude Amazon Listing System

Two ROAS pages share a title stem but differ in content, so both are kept:
`the-claude-higgsfield-roas-system` (34.6K) and
`the-claude-higgsfield-roas-system-performance-intelligence-for-meta-ads` (16.0K).

## Not captured

Two links in the index point at a different Notion workspace and return
`object_not_found` for any reader outside it. They are not in the corpus:

| page | id |
|---|---|
| The DTC Creative Scaling Playbook | `32caa863d7d080cdbf4cc096356330ed` |
| Nano Banana Pro Ad Playbook | `33c4bce6aca28077b470c1f79b85ad05` |

## Re-running the harvest

```
python3 tools/harvest.py [--transcript-dir DIR] [--out DIR]
```

The harvester does not call Notion. It reads the Claude Code session
transcript, which stores every `notion-fetch` result verbatim — both the
inline results in `<session>.jsonl` and the oversized ones spilled to
`tool-results/*.txt`. Fetching ~80 pages and then writing them out by hand
would have cost an enormous number of output tokens; reading them back off
disk costs none. To extend the corpus, fetch the new pages through the Notion
MCP in a session and re-run the script against that session's transcript
directory.

Page URLs must use the `notion.site/<32-hex-id>` form. The `app.notion.com/p/<id>`
form that appears inside the fetched content 404s for outside readers.
