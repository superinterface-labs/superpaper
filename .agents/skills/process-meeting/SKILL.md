---
name: process-meeting
description: Process a meeting transcript — extract decisions, action items, insights, and commitments. Use when the human says "process this meeting", shares a transcript from Granola/Otter/etc, or pastes meeting notes.
---

# process-meeting

> Turns a meeting transcript into structured knowledge and actionable items. Stores the source, extracts what matters, routes to the right places.

## When to use

- "Process this meeting", "here's a transcript"
- Human shares output from Granola, Otter, or any meeting recorder
- After any significant conversation worth capturing

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| transcript | yes | Meeting text — pasted, file path, or URL |
| context | no | Meeting name, participants, project it relates to |

## Process

### STEP 1 — Store source

Save the raw transcript to `superpaper/sources/meetings/` with frontmatter:
```yaml
type: source
source: meeting
participants: []
created: YYYY-MM-DD
```

### STEP 2 — Extract

Read the full transcript. Retrieve knowledge neighborhood for mentioned concepts, people, and projects. Extract:

1. **Decisions** — what was decided and by whom
2. **Action items** — who committed to what, with deadlines if mentioned
3. **Insights** — ideas, frameworks, connections worth remembering
4. **Open questions** — unresolved topics that need follow-up
5. **Commitments** — promises made (by human or others)

### STEP 3 — Route

- **Decisions** → append to [[Decisions log]] with date, participants, reasoning
- **Insights worth keeping** → create atomic notes in `superpaper/concepts/`. Link to source transcript and related existing notes.
- **Learnings** → append to [[Learning log]]
- **Action items** → add to the task board (`apps/My tasks.md`) under **Todo**
- **Project-relevant items** → update the relevant project note in `superpaper/projects/`

### STEP 4 — Agent log summary

Append to today's agent log (`inbox/log/YYYY-MM-DD`):

```markdown
### Meeting: [name] — HH:MM
- **With:** [participants]
- **Decisions:** [1-line each]
- **Actions:** N items added to board
- **Insights:** [[note1]], [[note2]]
- **Follow up:** [open questions]
```

**Never write to the human's daily note** (`daily/YYYY-MM-DD`) — it's a pure date anchor.

## Outputs

- Source transcript in `superpaper/sources/meetings/`
- Updated living documents (Decisions log, Learning log)
- 0+ new atomic notes in entity folders
- Action items on task board
- Agent log meeting summary (`inbox/log/YYYY-MM-DD`)

## Decision authority

- **YOU DECIDE:** what to extract, severity/priority of action items, routing
- **ESCALATE TO HUMAN:** anything involving commitments to others, sensitive content, ambiguous decisions

All notes created by this skill must include `created-by: ai`. The meeting transcript itself is `created-by: human` — never modify its body, only update frontmatter properties. Source notes, atomic notes, log entries, and board cards are `created-by: ai`.
