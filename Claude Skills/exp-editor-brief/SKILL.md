---
name: exp-editor-brief
description: Turns a script plus raw footage into a shot-by-shot edit brief that Paras Arora's video editor can work from without asking a single question. Use after filming any long-form video or batch, when preparing work for the editor, when the editor keeps asking clarifying questions, or when Paras says "brief the editor", "prep this for editing", "what do I send my editor", "make the edit brief". Also use to spec Shorts cuts from the same footage. Covers hook treatment to the frame, shot list with timecodes, b-roll callouts, text overlays, screen recordings, music direction, pacing, and do-not-cut moments.
argument-hint: [script file or topic] [+ footage list / timecodes]
auto-activate: false
---

# Editor Brief — Exponential World

Produce a brief the editor works from unaided.

**The only success test:** the editor edits the whole video without asking a question. Every question they ask is a gap in the brief, and the fix is to close the gap — not to answer the question.

## Why this matters more than it looks

One editor is the hard ceiling on video volume — two long-form plus shorts a week is capacity, and a second hire isn't affordable yet. Every clarifying question costs a round-trip, and round-trips turn a 48-hour turnaround into four days. This brief is the only lever that raises the ceiling without spending money.

## Before writing anything

1. **Read Brand Brain** (`exp-brand-brain`) — voice, visual identity, never-say.
2. **Get the footage list.** Timecodes, takes, what was actually shot. Without it you will brief cuts that don't exist. If it's missing, ask — do not proceed on the script alone.
3. **Get the title and thumbnail direction** from Packaging. If the thumbnail pulls from footage, the brief names the frame.
4. **Check retention notes** on similar past videos if available.

## The brief

Produce every section. A section with nothing to say says "none" — it never gets dropped, because a missing section reads as an oversight.

```
# Edit Brief — [Title]
Video: [long-form / short] · Target length: [n] min · Publish: [Tue/Fri, date]
Footage: [file refs] · Script: [ref]

## 1. Hook — first 15 seconds
Specified to the frame. Which take, which words, which cut points,
what's on screen, what text appears and when.
Never left to taste.

## 2. Shot list
| # | In | Out | Take | What | Why |
Every cut. Timecodes from the footage list.

## 3. B-roll
| At | What the shot must show | Source |
Name the shot and its job. Never "add some b-roll here."

## 4. Text overlays
| At | Exact copy | Style |
Copy quoted verbatim from the script.

## 5. Screen recordings
| At | Tool | Action to capture | Highlight |

## 6. Music
Direction and energy shifts by timestamp. Not a track name.

## 7. Pacing
Where to cut tight, where to let it breathe. Name the moments.

## 8. Thumbnail frame
Which moment to pull, or "external asset".

## 9. Do-not-cut
Moments that must survive, and why. Usually the proof beats
and the emotional turn.

## 10. Shorts candidates
| Moment | In–Out | Why it stands alone | Hook rewrite |
3–5 cuts. Feeds the Shorts agent.
```

## Hard limits

- **Never leave the hook to the editor's taste.** First 15 seconds, specified.
- **Never write "add some b-roll here."** Name the shot and what it must show.
- **Never brief a cut that isn't in the footage list.** Check every timecode.
- **Never let the editor decide the title, the thumbnail, or what the script meant.** Those arrive with the brief.
- **Never assume prior context.** The brief stands alone — the editor should not need the script open beside it.
- **Never approximate a timecode.** Wrong is worse than absent; absent gets asked about, wrong gets cut.

## Hardening it

Weeks 3–8 are for tightening. Log every question the editor asks and fix the template, not the instance. After four weeks the question rate should be near zero — that is the metric this agent lives on.

| Symptom | Cause | Fix |
|---|---|---|
| Editor asks about a section | It was abstract | Rewrite concretely; the pattern will repeat |
| Cuts don't exist in footage | Written from script only | Require the footage list as a hard input |
| Hook lands flat | Specified as intent, not frames | Shots, text, timing |
| Overlay copy wrong | Paraphrased | Quote the script verbatim |

Spec: `ai-os/04-agents/editor-brief.md`.
