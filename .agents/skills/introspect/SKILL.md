---
name: introspect
description: Audit vault health and partnership intelligence — connectivity, consistency, memory quality, meta calibration, and evolution potential. Use when the human says "audit the system", "introspect", "check vault health", "what could be better?", or after structural changes to the vault.
---

# introspect

> The vault's immune system and the partnership's calibration surface. Audits connectivity, consistency, memory quality, meta health, and structural health — then proposes upgrades. Read-only: never modifies files during the audit. The meta layer is introspect's deepest contribution — it's how the system learns about itself.

## When to use

- On demand: "audit the system", "introspect", "check vault health"
- After structural changes: new skills added, templates changed, folders reorganized
- Weekly cadence during [[heartbeat]] cycles (recommended)
- When something feels off: agents failing to find context, duplicated work, stale references

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| scope | no | `full` (default), `connectivity`, `consistency`, `memory`, `meta`, `completeness`, `evolution` |
| depth | no | `quick` (surface scan) or `deep` (exhaustive + evolution). Default: `deep` |

## Process

### LAYER 1 — Connectivity

Every note should be reachable from [[AGENTS]] within 3 hops via wiki-links. Dead ends kill navigation.

1. **Scan all `.md` files** outside `.obsidian/` and code blocks.
2. **Broken wiki-links:** `[[target]]` where target file does not exist. (Intentional seed links like `*(seed — not yet created)*` are acceptable.)
3. **Orphan nodes:** Files with zero inbound wiki-links (excluding `AGENTS.md` indexes and templates).
4. **AGENTS.md coverage:** Every folder with 2+ non-index files should have an `AGENTS.md`.
5. **Link density:** Flag files with <2 outbound wiki-links.
6. **Root discovery test:** From [[AGENTS]], trace paths to every skill, every folder index, every template. Flag anything >3 hops away.
7. **Reverse discovery:** From each `SKILL.md`, can an agent navigate back to [[AGENTS]]? To sibling skills?

**Output:** connectivity report — broken links, orphans, missing indexes, low-density nodes, hop-count issues.

### LAYER 2 — Consistency

The protocol is distributed across [[AGENTS]], folder `AGENTS.md` files, templates, and skills. Contradictions cause divergent behavior.

1. **Frontmatter schema compliance:**
   - Knowledge notes have: `type`, `kind`, `confidence`, `source`, `connections`, `created`, `updated`, `tags`, `aliases`, `relations` (per `_templates/knowledge-note.md`).
   - Daily notes have: `type: daily`, `created`.
   - Index files have: `type: index`, `created`.
   - All notes have at least `type` and `created`.
2. **Naming conventions:**
   - Files use natural, human-readable titles (spaces allowed). Dashed names only for code/scripts.
   - Verify filenames are clear and descriptive.
3. **Cross-file consistency:**
   - Skill names in `.agents/skills/AGENTS.md` index match actual skill folder names.
   - Template index (if in `_templates/AGENTS.md`) matches actual template files.
   - Folder `AGENTS.md` descriptions match actual folder contents.
   - Dataview `FROM` clauses reference paths that exist.
4. **Folder overcrowding:** Flag folders with >8–10 items — candidates for subfolder reorganization per [[AGENTS]] conventions.
5. **Stale references:** Wiki-links or paths pointing to files that have been moved or renamed.
6. **Template drift:** Compare `_templates/knowledge-note.md` and `_templates/daily-note.md` against the schemas defined in the Knowledge section of [[AGENTS]]. Flag divergence.

**Output:** consistency report — violations grouped by severity (breaking > confusing > cosmetic).

### LAYER 3 — Memory quality

The knowledge graph across entity folders (`people/`, `concepts/`, `questions/`, `sources/`, `events/`, `places/`) is the vault's most valuable asset. Audit its health.

1. **Relation coverage:** What % of knowledge notes have a `## Relates` section with at least one typed relation? Target: >80%.
2. **Confidence hygiene:** Are `confidence` scores present and numeric? Flag notes with missing or stale confidence.
3. **Distributed write compliance:** Spot-check 3–5 notes — do they link to 2+ existing notes? Were existing notes updated to link back?
4. **Contradiction health:** Notes with `contradicts` relations — is there a corresponding question or experiment note? Stale contradictions are waste.
5. **Fleeting note age:** List fleeting notes older than 14 days. Flag those with zero inbound links as prune candidates.
6. **Empty relations:** Notes where `## Relates` has no prose or links — these need gardening.
7. **Wikilink density:** Flag notes that mention concepts as plain text instead of `[[wiki-links]]`.
8. **Hub identification:** Top 5 notes by inbound link count — these are your emerging ontology.
9. **[[Knowledge map]] freshness:** Does it reflect current clusters? Are recent additions showing in the Dataview query?

**Output:** memory quality report — relation coverage %, fleeting backlog, pruning candidates, hub notes, garden tasks.

### LAYER 4 — Meta (partnership intelligence)

`meta/` is the vault's self-referential layer — where human and AI write about how they think, choose, and collaborate. Introspect is its primary health surface. Audit deeply.

#### 4a. Alignment

The tuning weights of the partnership. Read every note in `meta/alignment/` (or tagged `#meta/alignment`).

1. **Recency:** Flag if no alignment note has been created or updated in the last 14 days. The partnership is moving — stale alignment means the AI is operating on assumptions.
2. **Specificity:** Vague notes ("we communicate well") are useless. Look for concrete, actionable observations: "When I say 'clean it up' I mean reduce to essentials, not reformat." Flag vague notes for sharpening.
3. **Contradiction detection:** Do any alignment notes contradict each other? Has a stated preference been violated in recent daily notes or task logs? Cross-reference alignment claims against actual behavior.
4. **Alignment debt:** Areas where the AI is making recurring assumptions without documented understanding. Scan recent interactions for patterns where the agent guessed instead of knowing. Each gap is a note that should exist but doesn't.
5. **Calibration drift:** Compare the oldest alignment notes to the most recent. Has the relationship evolved but the notes haven't? Flag fossilized alignment notes that no longer reflect reality.

#### 4b. Decision-making

How choices get made. Read every note in `meta/decision-making/` (or tagged `#meta/decision-making`).

1. **Capture rate:** After significant decisions (in daily notes, project logs, Decisions log), was the *reasoning* captured in meta? Decisions without reasoning are lost learning.
2. **Pattern recognition:** Are recurring decision patterns named? Look for the same heuristic appearing across multiple decisions but never abstracted into its own note. Name the pattern.
3. **Failure analysis:** Are decisions that went poorly being reviewed? Check for post-mortems. A system that only records wins has a blind spot.
4. **Bias tracking:** Are cognitive biases being identified? (Sunk cost, recency, anchoring, status quo.) If the human keeps making the same type of suboptimal choice, that pattern belongs in meta.
5. **Framework utility:** Are captured decision frameworks actually being *referenced* in later decisions? Meta notes that exist but never get consulted are dead weight.

#### 4c. Risk-taking

Appetite for uncertainty. Read every note in `meta/risk-taking/` (or tagged `#meta/risk-taking`).

1. **Profile existence:** Does a risk profile exist at all? If not, flag as critical — the system can't calibrate boldness without a baseline.
2. **Stated vs. revealed:** Compare the stated risk appetite against actual behavior. Is the human bolder or more cautious than they think? Check project decisions, experiments attempted, ideas pursued vs. parked.
3. **Growth edges:** Are comfort zone boundaries documented? Are there notes about *where* the human wants to stretch? Without these, the AI defaults to safety.
4. **Risk review:** After risks taken (experiments, bold decisions), was the outcome reflected on? Risk-taking improves only through reviewed experience.

#### 4d. Taste

The subtle, high bar for ideas. The hardest dimension to build. Read every note in `meta/taste/` (or tagged `#meta/taste`).

1. **Specificity:** "I like clean design" is useless. "I prefer sparse layouts with generous whitespace, muted colors, and type-driven hierarchy" is actionable. Flag vague taste notes.
2. **Domain coverage:** Does taste exist across the human's active domains (design, writing, code, thinking, communication)? Or is it concentrated in one area? Flag thin domains.
3. **Evolution:** Is taste *sharpening* over time? Compare early notes to recent ones. Taste that stays static isn't being refined. Look for increasing precision and nuance.
4. **Negative examples:** Taste is often clearest in what it rejects. Are there notes about what the human finds mediocre, ugly, or lazy? Negative taste notes are as valuable as positive ones.
5. **Transfer:** Is the AI applying taste notes in its work? Check recent artifacts, deliverables, and creative output against stated taste. Flag gaps where the AI produced something that violates documented taste.

#### 4e. System health

1. **Dual authorship:** Count notes by author (human vs AI). Flag imbalance — if one side writes >80% of meta, the other's perspective is missing. The partnership needs both voices.
2. **Self-reference density:** Do meta notes link to each other? Isolated meta observations don't compound. A healthy meta subgraph is densely connected — alignment notes reference taste notes, decision patterns reference risk profiles.
3. **Actionability:** Are meta notes being *used*? Check if recent plans, decisions, creative work, or heartbeat cycles reference meta notes. Growing but never consulted = dead weight.
4. **Feedback loops:** Is there evidence of meta → action → meta cycles? (e.g., alignment note → behavior change → updated alignment note.) These loops are the self-improvement mechanism. Flag if absent.

**Output:** meta health report — dimension depth scores (0–5 each), authorship balance, self-reference density, actionability %, feedback loop count, specific sharpening recommendations per dimension.

### LAYER 5 — Completeness

1. **Thin skills:** `SKILL.md` files with <3 process steps — too much room for interpretation.
2. **Empty sections:** Placeholder content (`- —`, empty tables, template boilerplate left unfilled).
3. **Missing templates:** Note types referenced in [[AGENTS]] that don't have a corresponding template in `_templates/`.
4. **Skill coverage:** Are there recurring workflows the human does that could be a skill? Check daily notes for patterns.
5. **Source pipeline:** Are there sources in `superpaper/sources/` or events in `superpaper/events/` without corresponding evidence/claim notes in `superpaper/concepts/`? Flag unprocessed sources and events.
6. **Journal pipeline:** Are there `personal/journal/` reflections that surfaced insights but never created atomic notes? Flag unextracted value.
7. **Base health:** Do the high-leverage `.base` files from [[AGENTS]] exist? Are their filters still valid (correct paths, properties)? Are bases being embedded where specified (Knowledge map, sidebar)? Flag missing or stale bases. Suggest new bases when a folder reaches sufficient volume.

**Output:** completeness report — gaps ranked by impact.

### LAYER 6 — Evolution (deep only)

Not "what's broken?" but "what's the next unlock?"

1. **Pattern detection:**
   - Recurring multi-step workflows that could become skills.
   - Concepts frequently mentioned but never given their own note.
   - Knowledge clusters that are growing and might need sub-structure.
2. **Structural opportunities:**
   - Could any skill be decomposed into smaller, composable skills?
   - Are there skills always invoked together — should they be chained?
   - Would a new folder or organizational layer reduce friction?
3. **Knowledge graph growth:**
   - Isolated clusters that should be cross-linked.
   - Domains with many fleeting notes but no permanent/pattern notes — ripe for synthesis.
   - Cross-domain bridge opportunities — two clusters that share structural patterns but aren't linked.
4. **Meta trajectory:** The highest-signal measure of system health. For each dimension:
   - **Alignment:** Is the AI's model of the human more precise than 30 days ago? Cite specific notes that show deepening vs. stagnation.
   - **Decision-making:** Are decisions improving? Look for shorter deliberation on recurring choices (frameworks working), better outcomes on novel choices (judgment sharpening).
   - **Risk-taking:** Is the comfort zone expanding? Are experiments getting bolder? Or has the system settled into safe patterns?
   - **Taste:** Is taste becoming more precise and cross-domain? The ultimate sign of growth: taste notes that connect patterns across domains the human didn't initially relate.
   - Name the overall trajectory: **accelerating** (dimensions reinforcing each other), **improving** (steady growth), **stable** (maintaining but not deepening), **drifting** (gaps widening, notes going stale), **declining** (contradictions accumulating, calibration breaking down).
5. **Proposals:** 1–3 bold, grounded ideas. Each: one paragraph, the problem, the unlock, estimated effort. Prefer ideas that compound.

**Output:** evolution brief — patterns, structural ideas, knowledge health, meta trajectory, and high-leverage proposals.

### LAYER 7 — Synthesis

Combine all layers into a single report.

1. Write the report to `superpaper/projects/scratchpad/introspection-report.md`.
2. Structure:
   ```markdown
   ## Introspection report — YYYY-MM-DD

   ### Health score
   [A–F grade for each layer, with one-line justification]

   ### Meta — partnership intelligence
   | Dimension | Depth (0–5) | Last updated | Sharpest note | Biggest gap |
   |-----------|-----------|-------------|--------------|------------|
   | Alignment | | | | |
   | Decision-making | | | | |
   | Risk-taking | | | | |
   | Taste | | | | |

   **Authorship balance:** human N / AI N
   **Self-reference density:** N links between meta notes
   **Actionability:** N of N meta notes referenced in recent work
   **Feedback loops:** N complete meta→action→meta cycles observed
   **Trajectory:** [accelerating | improving | stable | drifting | declining]

   ### Critical issues (fix now)
   [Anything that breaks navigation or causes incorrect behavior]

   ### Improvements (fix soon)
   [Consistency violations, thin content, missing links]

   ### Evolution proposals
   [1–3 high-leverage ideas with problem/unlock/effort]

   ### Metrics
   - Total files scanned: N
   - Broken links: N
   - Orphan nodes: N
   - Schema violations: N
   - Memory relation coverage: N%
   - Fleeting notes >14d: N
   - Mean link density: N links/file
   - Max hops from [[AGENTS]]: N
   - Meta depth: alignment N/5, decision-making N/5, risk-taking N/5, taste N/5
   - Meta feedback loops: N
   - Partnership trajectory: [accelerating | improving | stable | drifting | declining]
   ```
3. If critical issues are found, list them as actionable items for the human.
4. Log a one-line summary in today's daily note.

## Outputs

- `superpaper/projects/scratchpad/introspection-report.md` — the full report (overwritten each run)
- Daily note entry summarizing health score
- Optional: knowledge notes for evolution insights worth preserving

## Decision authority

- **YOU DECIDE:** what to scan, severity classification, which issues to flag, report structure
- **ESCALATE TO HUMAN:** evolution proposals (present, don't implement), any suggestion to modify [[AGENTS]] or skill structure, any suggestion to retire a skill

## Conventions

- **Read-only.** Never modify files during the audit. Fixes happen as separate tasks.
- The report is a living document — overwrite it each run so it always reflects current state.
- Grade honestly. An A means "this would work flawlessly for any agent reading [[AGENTS]] cold." That bar should be hard to hit.
- Evolution proposals should be bold but grounded — tied to specific patterns observed, not generic advice.
- When proposing new skills, draft the one-line `description` and trigger phrases — make it easy to pick up.
- Link everything in the report with wiki-links — the report itself should be a navigation hub.
- Keep the report scannable — the human should understand system health in 30 seconds from the health score section.
