---
name: process-journal-entry
description: Process a daily freewrite or journal entry — reflect back, route insights to living documents and atomic notes. Use when the human says "process my journal", "process today's writing", or feeds a freewrite/daily note.
---

# process-journal-entry

> Turns raw writing into structured knowledge. Reads a journal entry, reflects back in reflective friend mode, routes insights to living documents, and creates atomic notes for genuine discoveries.

## When to use

- "Process my journal", "process today's writing"
- Human pastes or points to a freewrite, daily note, or voice transcript
- After a daily writing session

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| entry | yes | The journal text — a daily note path, pasted text, or "today" (reads today's daily note) |

## Process

### STEP 1 — Read and retrieve

1. Read the full journal entry.
2. Retrieve knowledge neighborhood for every concept, person, project, or emotion mentioned.
3. Check [[Reflections log]], [[Learning log]], [[Decisions log]], [[Goals]] for recent entries — continuity matters.

### STEP 2 — Reflect back (reflective friend mode)

Respond conversationally. Mirror what the human wrote. Surface:
- Patterns you notice (especially recurring themes across entries)
- Connections to existing knowledge the human may not have seen
- One deepening question — not advice, just a question that opens a door

Do not coach unless explicitly asked.

### STEP 3 — Route to living documents

For each insight type found in the entry, append a dated entry:

- **Reflection** → [[Reflections log]] — what was reflected on, what surfaced, link to source
- **Something learned** → [[Learning log]] — what, from where, why it matters
- **Decision made** → [[Decisions log]] — what was decided, reasoning, alternatives considered
- **Goal set or updated** → [[Goals]] — what changed and why

Each entry: one paragraph, dated, with wiki-links to related notes.

### STEP 4 — Create atomic notes

For any genuine insight worth its own note (not just a log entry):
1. Create a knowledge note in `superpaper/knowledge/` using the knowledge note template.
2. Link to 2+ existing notes. Update 1–3 existing notes to link back.
3. Link from the log entry to the new atomic note.

### STEP 5 — Daily note update

Append to today's daily note under `## Notes`:

```markdown
### Journal processed — HH:MM
- **Reflections:** [1-line summary]
- **Learnings:** N entries added
- **Decisions:** N entries added
- **New notes:** [[note1]], [[note2]]
- **Question to sit with:** [the deepening question from step 2]
```

## Outputs

- Conversational reflection (in chat)
- Updated living documents with dated entries
- 0+ new atomic knowledge notes
- Daily note summary

## Decision authority

- **YOU DECIDE:** what to reflect, which insights to route, log entry content
- **ESCALATE TO HUMAN:** creating notes about sensitive/personal topics, anything that feels like advice rather than reflection
