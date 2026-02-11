---
name: heartbeat
description: Autonomous maintenance cycle — triages inbox, consolidates memory, audits vault health, and logs to daily note. Use when the human says "run a heartbeat", "do housekeeping", "triage my inbox", or on any scheduled autonomous run.
---

# heartbeat

> Periodic maintenance orchestrator for the superpaper vault. Triages `superpaper/inbox/`, consolidates `superpaper/memory/`, audits vault health, and appends a summary to the daily note in `daily/`.

## When to use

- Scheduled autonomous runs (if configured)
- "Run a heartbeat", "do housekeeping", "triage my inbox"
- After a burst of work to clean up and consolidate

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| scope | no | `full` (default), `inbox`, `memory`, `health`. Limits which steps run. |

## Process

### STEP 1 — Bootstrap context

Read these files (do not skip any):
- [[AGENTS]] — the full operating manual
- [[Memory map]] — current knowledge graph entry point
- `superpaper/AGENTS.md` — workspace index and subfolder purposes
- `.agents/skills/AGENTS.md` — available skills and triggers

### STEP 2 — Triage inbox

Read every file in `superpaper/inbox/` (skip `AGENTS.md`).

For each item:
1. **Assess:** Is it a fleeting thought, a source to process, a project idea, or noise?
2. **Route:** Create the destination note in the appropriate folder:
   - *Fleeting thought* → `superpaper/memory/` with `type: fleeting`. Link to 1–2 existing notes.
   - *Source material* → `superpaper/sources/`. Extract key evidence as memory notes if high-signal.
   - *Project idea* → `superpaper/projects/scratch/` or the relevant project folder.
   - *Noise / already captured* → still move to `processed/`, note why it was dismissed.
3. **Preserve provenance:** Add `processed_to: "[[Destination note]]"` to the inbox item's frontmatter. Move it to `superpaper/inbox/processed/`. The destination note should link back.
4. **Update AGENTS.md indexes** in any folder that gained or lost files.

After this step, `superpaper/inbox/` should contain only `AGENTS.md` and items less than 48h old that need more human context.

### STEP 3 — Memory consolidation

Skip if `superpaper/memory/` has fewer than 5 non-index notes.

1. **Merge duplicates:** If 2+ notes describe the same concept, merge into one. Mark the redundant note with `superseded_by: "[[surviving-note]]"` in frontmatter.
2. **Promote mature fleeting notes:** Notes with `type: fleeting` older than 7 days that have been referenced (inbound links > 0):
   - Update `type` to `permanent` (or `claim`, `pattern`, `bridge` as appropriate).
   - Ensure 2+ outbound wiki-links and 1–3 existing notes updated to link back.
   - Add a `## Relates` section with typed relations if missing.
   - Link to at least one `[[pattern/...]]` note or cross-domain analogy.
3. **Prune stale fleeting notes:** Notes with `type: fleeting`, zero inbound links, older than 30 days → propose deletion to human (list them; don't delete autonomously).
4. **Strengthen connections:** Scan for notes that mention concepts as plain text instead of `[[wiki-links]]`. Convert to links.
5. **Contradiction check:** Any `contradicts` relation without a corresponding question or experiment note → create a question note.
6. **Update [[Memory map]]:** Add new clusters if themes emerged. Update existing cluster descriptions if they've grown.

### STEP 4 — Vault health audit (quick)

A lightweight version of the [[introspect]] skill. Run a surface scan:

1. **Orphan check:** Find notes with zero inbound wiki-links (excluding `AGENTS.md` index files and templates).
2. **Low-density check:** Flag notes with fewer than 2 outbound wiki-links.
3. **AGENTS.md coverage:** Every folder with 2+ non-index files should have an `AGENTS.md`. Flag missing ones.
4. **Frontmatter compliance:** Spot-check 3–5 recent notes for required fields (`type`, `created`).
5. **Template drift:** Verify `_templates/memory-note.md` and `_templates/daily-note.md` still match the schemas in [[AGENTS]].

Record issues found — don't fix them inline. Fixes happen as separate tasks.

### STEP 5 — Skill opportunities

Scan recent daily notes and memory for repeated workflows (2+ occurrences). If a pattern isn't already a skill, suggest one to the human: name + one-line description + what it automates.

### STEP 6 — Daily log

Append to today's daily note in `daily/` (create from `_templates/daily-note.md` if it doesn't exist):

```markdown
### Heartbeat — HH:MM
- **Inbox:** triaged N items (N promoted, N routed, N discarded)
- **Memory:** N notes consolidated, N promoted, N stale candidates flagged
- **Health:** N orphans, N low-density notes, N missing AGENTS.md
- **Actions taken:** [1-line per significant action]
- **Needs human input:** [items requiring a decision, or "none"]
```

## Outputs

- Clean `superpaper/inbox/`
- Updated `superpaper/memory/` with consolidated, promoted, and better-linked notes
- Updated [[Memory map]] with new clusters
- Updated `AGENTS.md` index files in affected folders
- Daily note entry summarizing the cycle
- List of issues for human review (if any)

## Decision authority

- **YOU DECIDE:** triage routing, note promotion, link strengthening, cluster naming, daily log content
- **ESCALATE TO HUMAN:** deleting any note, restructuring folders, changing schemas or templates, anything with irreversible impact

## Conventions

- Follow all [[AGENTS]] schemas for frontmatter, naming, wiki-links.
- Never touch `.obsidian/` config files.
- Never store secrets.
- Archive, don't delete — when in doubt, move to a subfolder or flag for human review.
- Update `AGENTS.md` indexes whenever you create, move, rename, or delete files.
- Memory writes follow the distributed write protocol: new note + update 1–3 existing notes to link back.
- Keep the daily log entry scannable — the human should understand what happened in 10 seconds.
