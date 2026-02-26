---
name: process-journal-entry
description: Process a freewrite or journal entry — reflect back, route insights to living documents and atomic notes. Use when the human says "process my journal", "process today's writing", or feeds a freewrite/journal fragment.
---

# process-journal-entry

> Turns raw writing into structured knowledge. Reads a journal entry, reflects back in reflective friend mode, routes insights to living documents, and creates atomic notes for genuine discoveries.

## When to use

- "Process my journal", "process today's writing"
- Human pastes or points to a freewrite, journal fragment, or voice transcript
- After a writing session

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| entry | yes | The journal text — a file path (e.g. a journal fragment in `personal/journal/`), pasted text, or "today" (finds today's journal fragments by date prefix) |

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

### STEP 4 — Create atomic notes (atomic-first)

Extract aggressively — more atoms = richer connection network. Every distinct concept, quote, finding, or claim in the journal entry deserves its own note:
1. **One concept per note.** If the human wrote about three ideas, create three notes. A quote by someone → its own note attributed to that person (`people/` link). A principle or belief → its own evergreen-titled note. A finding or observation → its own note linked to its source context.
2. Create each note in the appropriate entity folder (`superpaper/concepts/`, `superpaper/people/`, `superpaper/questions/`, `superpaper/sources/`, `superpaper/meta/`, etc.) using the knowledge note template. Route self-knowledge and alignment insights to `meta/`.
3. **Preserve attribution.** Every atom traces to where it came from — the journal entry, the person who said it, the source that inspired it. Add `^block-ids` to key passages so they're independently embeddable.
4. Link to 2+ existing notes. Update 1–3 existing notes to link back.
5. Link from the log entry to the new atomic notes.
6. If the journal entry produced 3+ atoms, consider creating a lightweight hub note that embeds them with thin connective prose — this becomes the "processed" version of the journal entry.

### STEP 5 — Evergreen candidate detection

Scan the journal entry and any new atomic notes for evergreen potential. A note is an evergreen candidate if its title works as a standalone statement (e.g. *"Pain is information"*, *"You have no obligation to your former self"*). If the human wrote something with that quality, **suggest** promoting it to `type: permanent`. Never auto-promote — always confirm with the human. This is how the vault's best ideas get surfaced proactively.

### STEP 6 — Agent log update

Append to today's agent log (`inbox/log/YYYY-MM-DD`):

```markdown
### Journal processed — HH:MM
- **Reflections:** [1-line summary]
- **Learnings:** N entries added
- **Decisions:** N entries added
- **New notes:** [[note1]], [[note2]]
- **Question to sit with:** [the deepening question from step 2]
```

**Never write to the human's daily note** (`daily/YYYY-MM-DD`) — it's a pure date anchor.

## Outputs

- Conversational reflection (in chat)
- Updated living documents with dated entries
- 0+ new atomic knowledge notes
- Agent log summary (`inbox/log/YYYY-MM-DD`)

## Decision authority

- **YOU DECIDE:** what to reflect, which insights to route, log entry content
- **ESCALATE TO HUMAN:** creating notes about sensitive/personal topics, anything that feels like advice rather than reflection

All notes created by this skill must include `created-by: ai`. The journal entry itself is `created-by: human` — never modify its body, only update frontmatter properties. New atomic notes, log entries, and connection docs are `created-by: ai`.
