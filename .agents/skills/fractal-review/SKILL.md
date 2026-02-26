---
name: fractal-review
description: Facilitate the human's fractal journaling practice — gather fragments, surface themes, prepare review surfaces at every cadence (daily, weekly, monthly, yearly, 5-year). The AI prepares; the human reflects. Use when the heartbeat detects a review is due, or when the human says "review my week", "monthly review", "what happened today", or any reflection prompt.
---

# fractal-review

> The human's reflective practice, AI-facilitated. Kepano's fractal journaling: capture fragments throughout the day, compile them into reviews at increasing timescales, trace how ideas emerged and bubbled up into bigger themes. The AI gathers, surfaces, and prepares — the human does the actual reflecting. The maintenance *is* the understanding. [Don't delegate understanding.](https://stephango.com/understand)

## Philosophy

Fractal journaling is **not** summarization. The AI's job is to make it *easy* for the human to reflect, not to reflect *for* them. The human's voice is the signal; the AI is the librarian who pulls the right files and says "you might want to look at these."

Three principles:
1. **Prepare the surface, don't write the review.** Gather fragments, surface themes, highlight connections — then hand the pen to the human.
2. **Cascading timescales.** Daily fragments feed weekly reviews. Weekly reviews feed monthly. Monthly feed yearly. Each level distills, never duplicates.
3. **The human writes the review.** AI creates `created-by: ai` preparation notes. The review itself is `created-by: human`. The human's words are the durable artifact.

## When to use

- Heartbeat detects a review is due (see cadence table below)
- "Review my week", "monthly review", "what happened today/this week/this month"
- "Prepare my yearly review", "help me reflect"
- End of day when fragments exist
- Any time the human wants to look back

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| cadence | no | `daily`, `weekly`, `monthly`, `yearly`, `5-year`. Auto-detected if omitted. |
| period | no | Specific period to review, e.g. `2026-W08`, `2026-02`, `2026`. Defaults to the most recent completed period. |

## Cadences

| Cadence | Trigger condition | What the AI prepares | What the human writes |
|---------|-------------------|---------------------|-----------------------|
| **Daily** | End of day, or 2+ fragments exist for today | List of today's fragments, links made, notes touched | Nothing required — fragments *are* the daily capture |
| **Weekly** | Sunday evening (or 7+ days since last weekly review) | Fragment digest, themes across the week, connections made, open threads | `YYYY-[W]ww.md` — salient themes, what mattered, what to carry forward |
| **Monthly** | 1st of month (or 30+ days since last monthly review) | Weekly review digest, recurring themes, goal progress, pattern shifts | `YYYY-MM.md` — distill the month's patterns, review weekly reviews |
| **Yearly** | January (or 365+ days since last yearly review) | Monthly review digest, year arc, growth trajectory, [40 questions](https://stephango.com/40-questions) template | `YYYY.md` — answer the 40 questions, review the year's monthly reviews |
| **5-year** | Every 5 years, or on request | Yearly review digest, life arc, identity evolution, decade themes | `YYYY–YYYY.md` — the long view |

## Process

### STEP 1 — Detect cadence and gather material

If cadence isn't specified, check what's due:

1. **Read the most recent review at each cadence.** Check `daily/` for the daily note, vault root (or `personal/journal/`) for weekly/monthly/yearly reviews. Use filename patterns: `YYYY-[W]ww.md`, `YYYY-MM.md`, `YYYY.md`.
2. **Determine which reviews are overdue.** A weekly review is due if >7 days since the last one. Monthly if >30 days. Yearly if >365 days. Start with the smallest overdue cadence.
3. **If multiple cadences are due, work bottom-up.** Do daily → weekly → monthly → yearly in sequence. Each feeds the next.

### STEP 2 — Gather fragments for the period

Based on the cadence, collect the raw material. The `Daily.base` (embedded on each daily note) provides ready-made views: **Fragments** (journal fragments for that date), **Reviews** (weekly/monthly/yearly reviews covering that date), **Human** / **AI** (split by authorship). Use these as a starting point — they do most of the gathering for you.

**Daily:**
- The `Daily.base` → Fragments view shows all notes with the `YYYY-MM-DD HHmm` prefix pattern
- Find all notes modified today (check `file.mtime`)
- Find all links made to today's daily note (`[[YYYY-MM-DD]]` backlinks) — the Everything view
- List any notes the human touched, bookmarks processed, tasks completed

**Weekly:**
- Find all fragments from the past 7 days
- Find all daily notes from the week (check backlinks on each)
- Collect: new notes created, notes promoted (fleeting → permanent), connections made, tasks shipped, bookmarks processed
- Surface: recurring themes (concepts that appeared 3+ times), open questions, unresolved threads

**Monthly:**
- Read all weekly reviews from the month
- Collect: new knowledge notes, meta observations, goal progress, project movement
- Surface: patterns across weeks, shifting interests, emerging dimensions

**Yearly:**
- Read all monthly reviews from the year
- Collect: major milestones, biggest insights, relationships deepened, projects shipped/abandoned
- Surface: growth arc, identity shifts, recurring struggles, breakthrough moments

**5-year:**
- Read all yearly reviews in the range
- Surface: life trajectory, identity evolution, decade themes, what you'd tell your past self

### STEP 3 — Prepare the review surface

Create a preparation note: `inbox/reviews/YYYY-MM-DD Review prep — [cadence].md`

```yaml
---
type: log
created: YYYY-MM-DD
created-by: ai
tags: [review-prep]
---
```

The prep note contains:

1. **Period summary** — what timeframe this covers, how many fragments/notes/reviews exist
2. **Fragment digest** — each fragment with its opening line and links, grouped by day (for weekly) or week (for monthly)
3. **Themes detected** — recurring concepts, people, places, emotions. Link each to vault notes.
4. **Connections surfaced** — links the human made during this period that bridge previously unconnected ideas
5. **Open threads** — questions asked but not answered, tasks started but not finished, ideas seeded but not developed
6. **Random revisit candidates** — 3–5 older notes (from before this period) that connect to this period's themes. The human may want to revisit them.
7. **Prompt questions** — 3–5 reflective questions tailored to what actually happened (not generic). E.g. "You mentioned [[burnout]] twice this week but also shipped [[Project X]]. What's the relationship?"

**For yearly reviews:** Include the [40 questions template](https://stephango.com/40-questions) as a starting scaffold.

### STEP 4 — Invite the human to review

Present the prep note to the human in chat. Don't summarize their life — show them the raw material and ask:

> "You have [N] fragments from this [week/month/year]. I've prepared a review surface with themes I noticed and some questions. Ready to write your [weekly/monthly/yearly] review? I'll create the note and you fill it in."

If the human says yes, create the review note from the appropriate template (see below). The note is `created-by: human` — the human writes in it.

### STEP 5 — Support the review (if the human engages)

While the human is writing their review:
- Answer questions about what happened ("what did I write about on Tuesday?")
- Surface specific fragments on request ("show me everything about [[Project X]] this month")
- Suggest connections ("your note about [[burnout]] connects to what you wrote in [[2026-W03]]")
- **Do not write the review for them.** Reflect back, surface, connect — but the words are theirs.

### STEP 6 — Post-review linking

After the human finishes their review:

1. **Link the review to the period's daily notes.** Add `[[YYYY-[W]ww]]` links to each daily note in the period (as backlinks — the daily notes stay empty, but the review now appears in their backlinks pane).
2. **Link upward.** If a monthly review exists, link this weekly review to it. If a yearly exists, link the monthly.
3. **Extract durable insights.** If the human wrote something that deserves its own atomic note (a realization, a decision, a pattern), suggest it. Create the note only with their approval — it will be `created-by: ai-assisted` since the insight came from the human's review.
4. **Update meta.** If the review surfaces a preference, alignment insight, or reasoning pattern, note it in `meta/` and update `AGENTS.md` if it changes a convention.

## Review note naming

| Cadence | Filename | Location |
|---------|----------|----------|
| Weekly | `YYYY-[W]ww.md` | vault root or `personal/journal/` |
| Monthly | `YYYY-MM.md` | vault root or `personal/journal/` |
| Yearly | `YYYY.md` | vault root or `personal/journal/` |
| 5-year | `YYYY–YYYY.md` | vault root or `personal/journal/` |

Location follows the human's preference. Default to wherever they've been writing journal fragments. If no preference established, ask.

## Outputs

- Review prep note (`inbox/reviews/`, `created-by: ai`) — the AI's gathered material
- Review note (`created-by: human`) — the human's actual reflection
- Updated daily note backlinks connecting the period
- 0+ atomic notes extracted from the review (`created-by: ai-assisted`)
- Agent log entry (`inbox/log/YYYY-MM-DD`) summarizing which review was facilitated

## Decision authority

- **YOU DECIDE:** what to gather, which themes to surface, prompt questions, connection suggestions, which older notes to recommend for revisit
- **ESCALATE TO HUMAN:** the review itself (always), extracting atomic notes from reviews, choosing review location preference

All prep notes created by this skill must include `created-by: ai`. Review notes are `created-by: human`. Extracted insights are `created-by: ai-assisted`. Never modify the body of the human's review — only update frontmatter properties.

## Integration with heartbeat

The heartbeat checks review cadences during **STEP 8 — Skill opportunities** (or a dedicated review step). Logic:

```
if today is Sunday (or >7 days since last weekly review):
    if fragments exist from the past week:
        suggest: "You have N fragments this week. Ready for a weekly review?"
        if human absent (unattended heartbeat): create prep note, leave board card

if today is 1st of month (or >30 days since last monthly review):
    if weekly reviews exist from the past month:
        suggest monthly review

if today is January (or >365 days since last yearly review):
    if monthly reviews exist from the past year:
        suggest yearly review
```

The heartbeat **never writes the review** — it creates the prep note and either prompts the human or leaves a board card ("Weekly review ready — see `inbox/reviews/...`").

## Integration with introspect

Fractal review and introspect are **complementary practices**:

| | fractal-review | introspect |
|--|---------------|------------|
| **Who reflects** | The human | The AI |
| **What's examined** | The human's life, thoughts, experiences | The vault's health, knowledge quality, meta layer |
| **Output** | Human-written reviews | AI-generated audit reports |
| **Cadence** | Daily/weekly/monthly/yearly | Weekly (quick) during heartbeat, deep on demand |
| **Shared value** | Both surface patterns. Introspect finds *structural* patterns (orphan notes, stale dimensions). Fractal review finds *experiential* patterns (recurring themes, shifting interests). Together they give the partnership eyes on both the system and the life it serves. |

During introspect's **LAYER 4 (Meta)**, reference the human's recent reviews — they're the richest signal for whether the meta layer accurately reflects the human's actual thinking. A gap between what reviews say and what `meta/` claims is a calibration opportunity.

## Conventions

- The AI prepares; the human reflects. Never write the review for them.
- Prep notes are disposable — they live in `inbox/reviews/` and can be cleaned up after the review is done.
- Review notes are sacred human documents (`created-by: human`). Never modify their body.
- If a cadence has no material (no fragments for daily, no weekly reviews for monthly), skip it. Don't create empty reviews.
- The 40 questions template for yearly reviews comes from Kepano: https://stephango.com/40-questions
- Random revisit is part of the review process — always include 3–5 older notes that connect to current themes.
- Don't over-prepare. The prep note should take <30 seconds to scan. If it's too long, the human won't read it.
