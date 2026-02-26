---
name: heartbeat
description: Autonomous batch orchestrator — fills the pipeline, dispatches all board tasks as parallel sub-agents, triages inbox, consolidates knowledge, archives stale work, logs to agent log, and git syncs. Use when the human says "run a heartbeat", "do housekeeping", or on any scheduled autonomous run.
---

# heartbeat

> The autonomous batch orchestrator. Bootstraps context, fills the board pipeline, dispatches ALL in-progress tasks as parallel sub-agents, triages inbox, consolidates knowledge, archives stale work, logs to agent log (`inbox/log/YYYY-MM-DD`), and git syncs. Adapts to whatever vault structure and conventions the human chose — always read the current `AGENTS.md` for the actual layout. Never write to the human's `daily/` notes — they are pure date anchors whose value is in backlinks.

## When to use

- Scheduled autonomous runs (hourly or configured interval)
- "Run a heartbeat", "do housekeeping", "triage my inbox"
- After a burst of work to clean up and consolidate
- This is the **unattended** mode — no human in the loop

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| scope | no | `full` (default), `tasks`, `inbox`, `knowledge`, `health`. Limits which steps run. |

## Process

### STEP 1 — Bootstrap context

Start from [[AGENTS]] and follow its indexes to discover the current workspace:
- The root `AGENTS.md` — the full operating manual and source of truth for vault layout
- Folder indexes — each folder's `AGENTS.md` describes its contents and purpose
- The skills index — available skills and triggers
- The board — wherever the human's task board lives
- The knowledge map — current graph entry point

Don't hardcode paths. The human may have reorganized. Let `AGENTS.md` tell you where things are.

### STEP 2 — Fill the pipeline

The board should always have work flowing.

**A) Inbox → Board:** Read the inbox folder. For any item that is a task, add a card to the board under **Todo**. Non-task items are triaged in Step 4.

**B) Todo → In Progress:** If In Progress is light, pull top cards from Todo. The right WIP limit depends on the human's capacity — start with 3, adjust based on throughput patterns.

After this step, In Progress should have cards (unless the entire board is empty).

### STEP 3 — Dispatch all tasks (parallel)

This is the heartbeat’s main job. Dispatch ALL In Progress tasks as **parallel sub-agents**.

**Parallelization rules:**
- Every unrelated task gets its own sub-agent running concurrently.
- **Serialize** tasks onto the same thread ONLY when they belong to the same project or have true data dependencies — one sub-agent handles them in sequence so context carries over.
- Maximize throughput. All In Progress tasks should progress simultaneously, not one at a time.

**Each sub-agent:**
1. Reads the task’s card and any linked notes for context
2. Does the actual work (research, build, organize, process). Uses appropriate skills.
3. Updates the task with a `## Progress` entry (most recent at top): what changed, why, how validated, what remains.
4. Moves the card: → **Done** (append `@{YYYY-MM-DD}`) or → **Blocked** (explains why). Each card should link to its progress log.
5. Creates a progress log for the task (in the vault's log location) with what was done, evidence links, and what remains.

**Planning (complex tasks only):** If a task needs multiple steps or internal parallelism, create a plan in `.plans/<task-slug>.md` before dispatching. Simple tasks skip planning.

Skip cards that clearly need human input — leave them in Todo with a comment after doing preliminary research.

### STEP 4 — Triage inbox

**A) Quick capture drops.** Check the human's quick capture surface for unchecked items. Process and check them off.

**B) Inbox files.** Read every file in the inbox (skip `AGENTS.md`, skip items already on the board).

For each item:
1. **Assess** what it is and **route** it per the "What goes where" table in [[AGENTS]]. Use the vault's actual folder layout.
2. **Rich content** gets priority — fetch full content, enrich, extract insights, connect to graph. Use appropriate skills.
3. **Preferences or self-knowledge** → meta folder. If a preference changes a convention in `AGENTS.md`, update the protocol too.
4. **Preserve provenance:** Add `processed_to: "[[destination]]"` to the inbox item, then move to the vault's processed location.
5. **Update folder indexes** in any folder that gained or lost files.

After this step, inbox should contain only `AGENTS.md` and items <48h old that need human context.

### STEP 5 — Knowledge consolidation

Skip if entity folders have fewer than 5 non-index notes total.

1. **Split monoliths:** Scan for notes covering multiple concepts. Split each idea into its own atomic note, then replace the original with a hub that embeds the atoms. Every split increases the graph's connectable surface area.
2. **Extract unattributed atoms:** Find quotes, findings, or claims embedded in longer notes without their own note or `^block-id`. Give each one a block ID or its own note so it's independently linkable. A quote by a person → its own note linked to that person's `people/` entry.
3. **Merge duplicates:** If 2+ notes cover the same concept, merge. Mark redundant notes with `superseded_by`.
4. **Promote fleeting → permanent (evergreen):** Notes with `type: fleeting`, >7 days old, and inbound links > 0 deserve promotion. Ensure 2+ outbound wiki-links and update existing notes to link back. Also scan human-written notes for evergreen candidates — sentence-like titles, 2+ inbound links, 7+ days old. **Suggest** promotion to the human; never auto-promote. Add candidates to the board as a card: "Evergreen candidates ready for review."
5. **Prune stale fleeting notes:** Zero inbound links + >30 days old → propose deletion to human (list them; don't delete autonomously).
6. **Strengthen connections:** Convert plain-text concept mentions to `[[wiki-links]]`. Resolve contradictions (create question notes). Bridge notes in the same domain that should be linked.
7. **Audit embed composition:** Check hub notes and project deliverables — are they embedding atomic notes or rewriting content? Convert paraphrased sections to transclusions (`![[atom#^core-claim]]`). Higher-level notes should be compositions of embeds with thin connective prose.
8. **Elevate meta awareness:** Deepen the introspective core by seeding new meta notes or amending existing dimensions. If a convention in `AGENTS.md` drifted from practice, update the protocol. Update [[Knowledge map]] and `.base` views if the graph changed.

### STEP 6 — Archive stale Done cards

Check the **Done** lane for cards with `@{date}` older than 7 days:
1. Move card's linked files to the vault's archive location (preserve folder structure).
2. Remove the card from the board.
3. Cards younger than 7 days stay visible so the human can review recent work.
4. If a Done card has no date, add today's date — it will be archived next cycle.

### STEP 7 — Vault health audit (quick)

Run a lightweight [[introspect]] with `depth: quick`. Record issues as board cards in Blocked lane — don't fix inline. The human promotes them to Todo when ready.

### STEP 8 — Fractal review cadence

Check if any [[fractal-review]] is due. The human's reflective practice runs on cascading timescales — the heartbeat's job is to detect when a review is due and prepare the surface.

1. **Weekly:** If today is Sunday (or >7 days since last `review/weekly` tagged note), and fragments exist from the past week → run `fractal-review` with `cadence: weekly`. If the human is absent, create the prep note and leave a board card: "Weekly review ready."
2. **Monthly:** If today is the 1st (or >30 days since last `review/monthly`), and weekly reviews exist from the past month → run `fractal-review` with `cadence: monthly`.
3. **Yearly:** If today is in January (or >365 days since last `review/yearly`), and monthly reviews exist → run `fractal-review` with `cadence: yearly`.

The heartbeat **never writes the review** — it creates the prep note and prompts the human. Reviews are `created-by: human`.

### STEP 9 — Skill opportunities

Scan recent agent logs and task progress logs for repeated workflows (2+ occurrences). If a pattern isn't already a skill, suggest one: name + one-line description + what it automates.

### STEP 10 — Agent log

Append a summary to today's agent log (`inbox/log/YYYY-MM-DD`). Cover: pipeline movement, tasks dispatched/shipped/blocked, inbox triage count, knowledge changes, health flags, review prep (if any), meta observations (new seeds, amended dimensions, protocol updates), and anything that needs human input. Keep it scannable — the human should understand what happened in 10 seconds. **Never write to the human's daily note** (`daily/YYYY-MM-DD`) — it's a pure date anchor.

### STEP 11 — Git sync

Last step of every cycle.

1. `git add -A`
2. `git status --porcelain` — if empty, skip. Log "No changes to sync."
3. `git commit -m "heartbeat: <one-line summary>"` — e.g. `heartbeat: dispatched 3 tasks, triaged 2 bookmarks, consolidated 1 note`
4. `git push` — if push fails (conflict), log the error in the agent log. Do NOT force push. Next cycle retries.
NOTE: If git is not set up, do git init and if remote is not set up, do git remote, skip git push.

## Outputs

- Updated board with cards moved between lanes
- Task progress logs (one per completed/blocked task)
- Clean inbox
- Updated knowledge graph — consolidated, promoted, and better-linked notes
- Updated [[Knowledge map]] with new clusters
- Updated folder indexes where files moved
- Stale Done cards archived
- Meta/ growth — new seeds or amended dimensions from this cycle's observations
- Agent log entry (`inbox/log/YYYY-MM-DD`) summarizing the cycle
- Git commit + optionally push

## Decision authority

- **YOU DECIDE (act, don't ask):** prioritization, task ordering, triage routing, note promotion, link strengthening, cluster naming, how to partition work across sub-agents, what to archive, agent log content, small protocol updates
- **ESCALATE TO HUMAN (Blocked lane):** large irreversible impact, creative/subjective input needed, credentials or external access required, structural changes to vault layout or note type system

**Default: ACT.** The human isn't watching. Make the best call. Note it in the agent log. The human will course-correct on their next visit. If you notice a preference pattern, update `AGENTS.md` — small convention tweaks don't need permission, structural changes do.

## Conventions

- Heartbeat orchestrates; sub-agents execute. Don't run tasks inline in the heartbeat thread.
- Follow the current [[AGENTS]] conventions — they're the human's agreed patterns, not fixed rules.
- Archive, don't delete. Task logs are the audit trail — one per completed task.
- Knowledge writes: new note + update 1–3 existing notes to link back (distributed write). All agent-created notes must include `created-by: ai`. Never modify the body of `created-by: human` notes — only update their frontmatter properties. To connect human notes, create proxy connection docs (`created-by: ai`).
- Update `AGENTS.md` indexes when files move. Git sync is the last step every cycle.
- **Protocol evolution:** If this cycle reveals a convention in `AGENTS.md` doesn't match reality, update it.
