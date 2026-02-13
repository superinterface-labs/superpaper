---
name: introspect
description: Audit vault health — connectivity, consistency, memory quality, and evolution potential. Use when the human says "audit the system", "introspect", "check vault health", "what could be better?", or after structural changes to the vault.
---

# introspect

> The vault's immune system. Audits connectivity, consistency, memory quality, and structural health — then proposes upgrades. Read-only: never modifies files during the audit.

## When to use

- On demand: "audit the system", "introspect", "check vault health"
- After structural changes: new skills added, templates changed, folders reorganized
- Weekly cadence during [[heartbeat]] cycles (recommended)
- When something feels off: agents failing to find context, duplicated work, stale references

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| scope | no | `full` (default), `connectivity`, `consistency`, `memory`, `evolution` |
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

The knowledge graph across entity folders (`people/`, `concepts/`, `questions/`, `sources/`) is the vault's most valuable asset. Audit its health.

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

### LAYER 4 — Completeness

1. **Thin skills:** `SKILL.md` files with <3 process steps — too much room for interpretation.
2. **Empty sections:** Placeholder content (`- —`, empty tables, template boilerplate left unfilled).
3. **Missing templates:** Note types referenced in [[AGENTS]] that don't have a corresponding template in `_templates/`.
4. **Skill coverage:** Are there recurring workflows the human does that could be a skill? Check daily notes for patterns.
5. **Source pipeline:** Are there sources in `superpaper/sources/` without corresponding evidence/claim notes in `superpaper/concepts/`? Flag unprocessed sources.

**Output:** completeness report — gaps ranked by impact.

### LAYER 5 — Evolution (deep only)

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
4. **Proposals:** 1–3 bold, grounded ideas. Each: one paragraph, the problem, the unlock, estimated effort. Prefer ideas that compound.

**Output:** evolution brief — patterns, structural ideas, knowledge health, and high-leverage proposals.

### LAYER 6 — Synthesis

Combine all layers into a single report.

1. Write the report to `superpaper/projects/scratchpad/introspection-report.md`.
2. Structure:
   ```markdown
   ## Introspection report — YYYY-MM-DD

   ### Health score
   [A–F grade for each layer, with one-line justification]

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
