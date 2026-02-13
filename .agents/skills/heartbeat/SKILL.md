---
name: heartbeat
description: Autonomous batch orchestrator — fills the pipeline, dispatches all board tasks as parallel sub-agents, triages inbox, consolidates knowledge, archives stale work, logs to daily note, and git syncs. Use when the human says "run a heartbeat", "do housekeeping", or on any scheduled autonomous run.
---

# heartbeat

> The autonomous batch orchestrator. Bootstraps context, fills the board pipeline, dispatches ALL in-progress tasks as parallel sub-agents, triages inbox, consolidates knowledge, archives stale work, logs to daily note, and git syncs.

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

Read these files (do not skip any):
- [[AGENTS]] — the full operating manual
- [[Knowledge map]] — current knowledge graph entry point
- `superpaper/AGENTS.md` — workspace index and subfolder purposes
- `.agents/skills/AGENTS.md` — available skills and triggers
- `superpaper/apps/mission-control.md` — the board

### STEP 2 — Fill the pipeline

The board must always have work flowing.

**A) Inbox → Board:** Read `superpaper/inbox/`. For any item that is a task, add a card to Mission Control under **Todo**. Non-task items are triaged in Step 4.

**B) Todo → In Progress:** If In Progress has fewer than 3 cards, pull the top card(s) from Todo. Move them to **In Progress** on the board.

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
4. Moves the card: → **Done** (append `@{YYYY-MM-DD}`) or → **Blocked** (comment explains why).
5. Creates `inbox/log/mmm-yy/dd/<task-slug>.md` with what was done, evidence links, and what remains.

**Planning (complex tasks only):** If a task needs multiple steps or internal parallelism, create a plan in `.plans/<task-slug>.md` before dispatching. Simple tasks skip planning.

Skip cards that clearly need human input — leave them in Todo with a comment after doing preliminary research.

### STEP 4 — Triage inbox

Read every file in `superpaper/inbox/` (skip `AGENTS.md`, skip items already routed to the board in Step 2).

For each item:
1. **Assess:** Is it a bookmark, fleeting thought, source material, project idea, or noise?
2. **Route:**
   - *Bookmark* (`type: bookmark`) → Run the **bookmark processing lifecycle**: fetch full content (flag if unfetchable), create source note in `sources/`, extract insights into atomic notes, connect to graph, update bookmark status. High priority — the human shared it because it matters.
   - *Meeting or conversation transcript* → `superpaper/personal/events/`. Run [[process-meeting]] if structured enough.
   - *Fleeting thought* → `superpaper/concepts/` with `type: fleeting`. Link to 1–2 existing notes.
   - *Source material* → `superpaper/sources/`. Extract key evidence if high-signal.
   - *Project idea* → `superpaper/projects/scratchpad/` or the relevant project folder.
   - *Preference or self-knowledge* → `superpaper/meta/`. Tag with relevant dimension (`alignment`, `decision-making`, `risk-taking`, `taste`).
   - *Noise / already captured* → still move to `processed/`, note why it was dismissed.
3. **Preserve provenance:** Add `processed_to: "[[Destination note]]"` to the inbox item's frontmatter. Move to `superpaper/inbox/processed/`.
4. **Update AGENTS.md indexes** in any folder that gained or lost files.

After this step, `superpaper/inbox/` should contain only `AGENTS.md` and items less than 48h old that need more human context.

### STEP 5 — Knowledge consolidation

Skip if entity folders have fewer than 5 non-index notes total.

1. **Merge duplicates:** If 2+ notes describe the same concept, merge into one. Mark the redundant note with `superseded_by: "[[surviving-note]]"` in frontmatter.
2. **Promote mature fleeting notes:** Notes with `type: fleeting` older than 7 days that have been referenced (inbound links > 0):
   - Update `type` to `permanent` (or `claim`, `pattern`, `bridge` as appropriate).
   - Ensure 2+ outbound wiki-links and 1–3 existing notes updated to link back.
   - Add a `## Relates` section with typed relations if missing.
3. **Prune stale fleeting notes:** `type: fleeting`, zero inbound links, older than 30 days → propose deletion to human (list them; don't delete autonomously).
4. **Strengthen connections:** Scan for notes that mention concepts as plain text instead of `[[wiki-links]]`. Convert to links.
5. **Contradiction check:** Any `contradicts` relation without a corresponding question or experiment note → create a question note.
6. **Proactive synthesis:** If this cycle created 2+ knowledge notes with the same `#domain/` tag, check if they should be consolidated or bridged.
7. **Update [[Knowledge map]]:** Add new clusters if themes emerged. Update existing cluster descriptions if they've grown.
8. **Review meta:** Reread `superpaper/meta/` notes. Has alignment drifted since last cycle? Are decision patterns repeating? Is taste sharpening or flattening? Update stale meta notes. Write a new meta note if this cycle surfaced an insight about the partnership.
9. **Update bases:** If this cycle created or promoted notes that affect existing `.base` views (e.g. new claims visible in Knowledge health, new meta notes in Meta dashboard), verify the bases still reflect current state. Create new bases from the high-leverage table in [[AGENTS]] when a folder reaches sufficient volume.

### STEP 6 — Archive stale Done cards

Check the **Done** lane for cards with `@{date}` older than 7 days:
1. Move card’s linked files to `.archive/` (preserve folder structure).
2. Remove the card from the board.
3. Cards younger than 7 days stay visible so the human can review recent work.
4. If a Done card has no date, add today’s date — it will be archived next cycle.

### STEP 7 — Vault health audit (quick)

A lightweight [[introspect]]. Surface scan only:

1. **Orphan check:** Notes with zero inbound wiki-links (excluding `AGENTS.md` and templates).
2. **Low-density check:** Notes with fewer than 2 outbound wiki-links.
3. **AGENTS.md coverage:** Every folder with 2+ non-index files should have one.
4. **Frontmatter compliance:** Spot-check 3–5 recent notes for required fields (`type`, `created`).
5. **Template drift:** Verify templates still match [[AGENTS]] schemas.
6. **Folder overcrowding:** Flag any folder with >8–10 items — propose reorganization into subfolders.

Record issues — don't fix inline. Fixes become board cards in Blocked lane so human can discuss them and promote to todo.

### STEP 8 — Skill opportunities

Scan recent daily notes and knowledge for repeated workflows (2+ occurrences). If a pattern isn't already a skill, suggest one to the human: name + one-line description + what it automates.

### STEP 9 — Daily log

Append inside the `> [!info]- AI Agent Updates` callout in today's daily note (create from `_templates/daily-note.md` if it doesn't exist). Each entry is a nested callout within it:

```markdown
> [!info]- AI Agent Updates
> > [!note]- Heartbeat — HH:MM
> > - **Pipeline:** N cards moved Todo→In Progress
> > - **Dispatched:** N sub-agents for N tasks
> > - **Shipped:** [task names] | **Blocked:** [task names + why]
> > - **Inbox:** triaged N items (N bookmarks, N routed, N discarded)
> > - **Knowledge:** N notes consolidated, N promoted, N stale flagged
> > - **Archived:** N cards older than 7d
> > - **Health:** N orphans, N low-density, N missing AGENTS.md
> > - **Meta:** [alignment/taste/decision/risk observations, or "no drift"]
> > - **Needs human input:** [items or "none"]
```

### STEP 10 — Git sync

Last step, no exceptions.

1. `git add -A`
2. `git status --porcelain` — if empty, skip. Log "No changes to sync."
3. `git commit -m "heartbeat: <one-line summary>"` — e.g. `heartbeat: dispatched 3 tasks, triaged 2 bookmarks, consolidated 1 note`
4. `git push` — if push fails (conflict), log the error in the daily note. Do NOT force push. Next cycle retries.
NOTE: If git is not set up, do git init and if remote is not set up, do git remote, skip git push.

## Outputs

- Updated `apps/mission-control.md` with cards moved between lanes
- Task execution logs in `inbox/log/mmm-yy/dd/`
- Clean `superpaper/inbox/`
- Updated entity folders with consolidated, promoted, and better-linked notes
- Updated [[Knowledge map]] with new clusters
- Updated `AGENTS.md` index files in affected folders
- Stale Done cards archived to `.archive/`
- Daily note entry summarizing the cycle
- Git commit + optionally push

## Decision authority

- **YOU DECIDE (act, don’t ask):** prioritization, task ordering, triage routing, note promotion, link strengthening, cluster naming, how to partition work across sub-agents, what to archive, daily log content
- **ESCALATE TO HUMAN (Blocked lane):** large irreversible impact, creative/subjective input needed, credentials or external access required

**Default: ACT.** The human isn’t watching. Make the best call. Note it in the daily log. The human will course-correct on their next visit.

## Conventions

- Heartbeat is the orchestrator; sub-agents do the actual work. Keep this boundary clean.
- Dispatch sub-agents for task execution — do not execute tasks inline in the heartbeat thread.
- Follow all [[AGENTS]] schemas for frontmatter, naming, wiki-links.
- When moving a card between lanes, also update the linked note’s `status` property.
- Archive, don't delete — move to `.archive/`.
- Never touch `.obsidian/` config files.
- Never store secrets.
- Update `AGENTS.md` indexes whenever you create, move, rename, or delete files.
- Knowledge writes follow the distributed write protocol: new note + update 1–3 existing notes to link back.
- Task execution logs are the audit trail — always create one per completed task.
- Keep the daily log scannable — the human should understand what happened in 10 seconds.
- Git sync is the LAST thing every cycle. No exceptions.
