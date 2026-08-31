# Agent Spec — Editor Brief

**ID:** C6 · **Layer:** Content OS · **Status:** build (Phase 0, week 3)
**Skill:** `.claude/skills/exp-editor-brief/`
**Human QA:** the editor — and their verdict is the only test that counts

---

## Job

Turn a script plus raw footage into a shot-by-shot brief the editor can work from **without asking a single question**.

## Why this is in the first nine

The editor is the hard ceiling on video volume. Two long-form plus shorts per week is capacity, and a second hire is not affordable yet. A brief that removes guesswork and back-and-forth is the only lever that raises the ceiling without spending money.

Every clarifying question the editor has to ask costs a round-trip, and round-trips are what turn a 48-hour turnaround into four days.

## Trigger

On film completion — Thursday, and any batch day.

## Inputs

| Input | From | Required |
|---|---|---|
| Brand Brain (voice, visual identity) | K1 | always |
| Final script | C3 | always |
| Raw footage list + timecodes | Paras / Operator | always |
| Title + thumbnail direction | C4 | always |
| Retention notes from similar videos | C11 | when available |

## Output

One brief containing:

| Section | Contents |
|---|---|
| Hook treatment | First 15 seconds, specified to the frame |
| Shot list | Every cut with timecode in/out and why |
| B-roll callouts | What goes where, and what it must show |
| Text overlays | Exact copy, exact timing |
| Screen recordings | Which tool, which action, at which line |
| Music | Direction and energy shifts, not a track name |
| Pacing | Where to cut tight, where to let it breathe |
| Thumbnail frame | Which moment to pull, if pulling from footage |
| Do-not-cut | Moments that must survive, and why |

## Hard limits

- **Never leave the hook to the editor's taste.** The first 15 seconds are specified.
- **Never say "add some b-roll here."** Name the shot and what it must show.
- **Never brief a cut that isn't in the footage list.** Check against what was actually filmed.
- **Never let the editor decide the title, thumbnail, or what the script meant.** Those are upstream decisions arriving with the brief.
- **Never assume prior context.** The brief stands alone; the editor should not need the script open beside it.

## Success criteria

**The only one that matters:** the editor works the whole video without asking a question.

Supporting:
- Turnaround at or under 48 hours for long-form, 24 for shorts
- Revision rounds drop toward one
- Retention on the first 30 seconds improves as hook specification tightens

## Failure modes

| Symptom | Likely cause | Fix |
|---|---|---|
| Editor asks about a section | That section was abstract | Rewrite it concretely; the pattern repeats |
| Cuts don't exist in footage | Brief written from script, not footage | Require the footage list as a hard input |
| Hook lands flat | Specified as intent, not as frames | Specify shots, text and timing |
| Overlay copy wrong | Not pulled from the script verbatim | Quote the script exactly |

## Notes

Harden this from real use, not from theory. Every question the editor asks in weeks 3–8 is a gap in the template, and the fix is to close the gap rather than answer the question. After four weeks the question rate should be near zero — that is the metric this agent lives or dies on.

Feeds Shorts (C7): the same footage analysis identifies the highest-retention moments worth cutting.

---

## Change log

| Date | Change | Why |
|---|---|---|
| — | Created | Phase 0 week 3 |
