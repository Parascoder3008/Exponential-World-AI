# Agent Spec — Chief of Staff

**ID:** K2 · **Layer:** Kernel · **Status:** wire (Phase 0, week 2)
**Skill:** `paras-daily-task` — exists, needs Brand Brain + pipeline state + per-person routing
**Human QA:** OS Operator runs it; Paras reviews the week

---

## Job

Answer one question every morning: **what happens today, and who does it?**

## Trigger

Daily, 7am IST.

## Inputs

| Input | From | Required |
|---|---|---|
| Brand Brain | K1 | always |
| Date + position in the 90-day cycle | computed | always |
| Day-of-week rhythm | the cadence table | always |
| Pipeline state — filmed / edited / scheduled | Operator | always |
| Last week's scorecard | K3 | weekly |
| Anything stuck | escalation log | always |

Pipeline state is the input that makes this real rather than theoretical. Without it the agent plans against an assumed cycle position and produces a plausible, wrong day.

## Output

6–10 time-boxed tasks across video, monetisation, community and algorithm, with **a maximum of two must-do items**, each routed to a named person and linked to the reasoning.

## Hard limits

- **Never more than two must-dos.** A list where everything is critical is a list where nothing is.
- **Never a generic task.** "Engage with community" is not a task. "Reply to the top 10 Tuesday comments by 11am" is.
- **Never move filming to a publish day.** Tuesday morning is not for filming, ever.
- **Never schedule cohort or brand-sponsorship work before its milestone week.**
- **Never bundle six platform posts as six tasks.** One repurposing task, routed to the Operator.
- **Never plan a week that drops the publish rhythm.** Tue/Fri 9am survives everything.

## Success criteria

- Operator can run the whole day from the output without asking Paras anything
- Tasks route to people by name, not to categories
- When the scorecard says something is wrong, the next Monday's plan visibly reflects it
- Paras's day contains only camera, offers, calls, and judgment

## Failure modes

| Symptom | Likely cause | Fix |
|---|---|---|
| Plan doesn't match reality | Pipeline state stale | Operator updates before 7am |
| Everything marked must-do | Cycle position wrong or too much in flight | Recompute; cut |
| Paras doing operator work | Routing missing names | Add the person to every task |
| Same task recurs weekly, unautomated | Agent Factory not watching | Flag it in Monday review, question 5 |

## The rhythm it enforces

| Day | Primary |
|---|---|
| Mon | CTR audit + weekly planning |
| Tue | **9am publish** + 48h protocol |
| Wed | Shorts + live build session |
| Thu | Film / script next batch |
| Fri | **9am publish** + 48h protocol |
| Sat | Deep work — harden the week's agent, research |
| Sun | Shorts + next-week planning |

## When it should push back

Already specified in `paras-daily-task` and worth preserving verbatim in behaviour:

- **Pipeline under two videos ready** → override the day's rhythm, prioritise filming
- **Last publish CTR badly low** → Monday becomes a full repackage, not a standard audit
- **Seven-plus consecutive publishing days with no rest** → recommend rest. Burnout at week six costs more than any week's output.

---

## Change log

| Date | Change | Why |
|---|---|---|
| — | Spec written; wiring scheduled | Phase 0 week 2 |
