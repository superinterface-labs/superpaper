---
name: introspect
description: The system's introspective core — audits vault health, knowledge quality, and the meta layer where the partnership learns about itself. Connectivity, consistency, memory, self-improvement, and evolution potential. Use when the human says "audit the system", "introspect", "check vault health", "what could be better?", or after structural changes.
---

# introspect

> The system's introspective core. Layers 1–3 audit the vault's structural health — connectivity, consistency, memory quality. Layer 4 goes deeper: the meta layer where the partnership examines how it thinks, decides, learns, and evolves. Layer 5–6 find gaps and propose what's next. Read-only by default. Always read the current `AGENTS.md` first — the human may have customized the vault layout, note types, or conventions from the defaults.

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

Ideally, every note is reachable from [[AGENTS]] within 3 hops via wiki-links. Dead ends hurt navigation.

1. **Scan all `.md` files** outside `.obsidian/` and code blocks.
2. **Broken wiki-links:** `[[target]]` where target file does not exist. (Intentional seed links like `*(seed — not yet created)*` are acceptable.)
3. **Orphan nodes:** Files with zero inbound wiki-links (excluding `AGENTS.md` indexes and templates).
4. **AGENTS.md coverage:** Folders with 2+ non-index files benefit from an `AGENTS.md`.
5. **Link density:** Flag files with <2 outbound wiki-links.
6. **Root discovery test:** From [[AGENTS]], trace paths to every skill, every folder index, every template. Flag anything >3 hops away.
7. **Reverse discovery:** From each `SKILL.md`, can an agent navigate back to [[AGENTS]]? To sibling skills?

**Output:** connectivity report — broken links, orphans, missing indexes, low-density nodes, hop-count issues.

### LAYER 2 — Consistency

The protocol is distributed across [[AGENTS]], folder `AGENTS.md` files, templates, and skills. Contradictions cause divergent behavior.

1. **Frontmatter schema:** Check notes against the *current* `AGENTS.md` base schema. If the human customized the schema, use that as the benchmark. All notes should have at least `type` and `created`.
2. **Cross-file consistency:** Skill index matches actual skills, template index matches actual templates, folder `AGENTS.md` files describe what's actually there, Dataview `FROM` clauses reference existing paths.
3. **Stale references:** Wiki-links or paths pointing to moved/renamed files.
4. **Template drift:** Compare templates against [[AGENTS]] conventions. If the human intentionally diverged, the *protocol* may need updating, not the templates.
5. **Protocol drift:** Compare what `AGENTS.md` *says* against how the vault *actually* works. If the human organizes differently than documented, flag `AGENTS.md` as the thing to update — not the human's files.

**Output:** consistency report — violations grouped by severity (breaking > confusing > cosmetic).

### LAYER 3 — Memory quality

The knowledge graph is the vault's most valuable asset. Audit across whatever entity folders the human uses.

1. **Relation coverage:** What % of knowledge notes have a `## Relates` section with at least one relation? Target: >80%.
2. **Link health:** Spot-check notes for distributed write compliance (2+ outbound links, existing notes updated to link back). Flag plain-text concept mentions that should be `[[wiki-links]]`.
3. **Contradiction health:** Notes with `contradicts` relations — is there a corresponding question or experiment note? Stale contradictions are waste.
4. **Fleeting backlog:** Fleeting notes older than 14 days. Flag those with zero inbound links as prune candidates.
5. **Hub identification:** Top notes by inbound link count — the emerging ontology.
6. **[[Knowledge map]] freshness:** Does it reflect current clusters?

**Output:** memory quality report — relation coverage %, fleeting backlog, pruning candidates, hub notes.

### LAYER 4 — Meta (introspective core)

`meta/` is the deepest layer of the system — the place where the partnership thinks about how it thinks. Everything that makes this system self-improving lives here: how decisions get made and why, how taste develops and sharpens, how the AI's model of the human evolves, how the human's model of the AI evolves, what the system believes and whether those beliefs hold up. It subsumes alignment, auditability, self-logging, proxy taste development, continual learning, metaphysics, and any reflective surface the partnership invents next. Introspection is the engine of evolution — without it, the system is static.

Every dimension in `meta/` is a progressive amendment trail. Notes aren't snapshots — they're a record of how understanding changed, with each revision linked to the one before it. This makes every decision auditable, every taste judgment traceable, every shift in alignment explainable. The AI should be able to point to *why* it made a choice, and the human should be able to watch the reasoning mature over time.

Observations here should be offered as insights, not compliance failures. This layer is the most personal — and the most scalable. The dimensions below are starting points. The partnership will invent new ones.

#### Seeding and growth

If `meta/` is empty or thin, that's the most important finding in the entire audit. Bootstrap it:

1. **First seed:** After any meaningful interaction, write the first meta note — even one observation about how the human communicates, decides, or judges quality is enough to start a dimension. Don't wait for permission; offer the note as a gift.
2. **Dimension emergence:** New dimensions aren't planned — they're *noticed*. When the AI sees a pattern across 2–3 interactions that doesn't fit an existing dimension (e.g., the human keeps rejecting certain phrasings, or consistently prioritizes speed over polish), name the pattern and propose a new dimension.
3. **Growth by amendment:** Each new observation within a dimension links to the previous one, forming a chain. Early notes will be rough. That's correct — precision comes from revision, not from getting it right the first time.
4. **The human's role:** The AI seeds and proposes; the human validates, corrects, and sharpens. A meta note the human edits is worth ten the AI wrote alone. Flag dimensions that lack human input.

Discover whatever dimensions the human has built in `meta/` (common starting points: alignment, decision-making, risk-taking, taste — but the set will grow as the partnership deepens). For each dimension found, apply the universal audit:

#### Per-dimension audit

1. **Recency:** Flag if no note in the dimension has been created or updated in >14 days. Stale dimensions mean the AI may be operating on assumptions.
2. **Specificity:** Vague observations are useless. Look for concrete, actionable content. Flag notes that need sharpening.
3. **Stated vs. revealed:** Compare what the dimension *claims* against actual behavior visible in daily notes, task logs, and artifacts. Flag gaps between intention and practice.
4. **Contradiction detection:** Do notes within the dimension contradict each other, or contradict recent actions?
5. **Evolution:** Compare oldest notes to newest. Is the dimension sharpening or fossilized? A healthy dimension shows increasing precision over time.
6. **Transfer:** Is the AI *applying* what this dimension teaches? Check recent work for alignment with documented preferences. Flag gaps.

#### System-level meta health

1. **Dual authorship:** If one side writes >80% of meta, the other's perspective may be missing. The partnership benefits from both voices.
2. **Self-reference density:** Do meta notes link to each other? Isolated observations don't compound. A healthy meta subgraph is densely connected.
3. **Actionability:** Are meta notes being referenced in actual work? Growing but never consulted = dead weight.
4. **Feedback loops:** Evidence of meta → action → meta cycles? These are the self-improvement mechanism. Flag if absent.
5. **Dimension coverage:** Are there areas of the partnership (how work gets prioritized, how quality is judged, how risk is managed, how communication works) that have *no* meta dimension yet? Suggest new dimensions when patterns emerge.

**Output:** meta health report — dimension depth scores (0–5 each), authorship balance, actionability %, feedback loop count, sharpening recommendations.

### LAYER 5 — Completeness

1. **Thin skills:** `SKILL.md` files with <3 process steps — too much room for interpretation.
2. **Missing templates:** Note types referenced in [[AGENTS]] without a corresponding template.
3. **Unprocessed pipelines:** Sources, meetings, bookmarks, or journal entries that surfaced insights but never produced atomic notes. Flag unextracted value.
4. **Skill coverage:** Recurring workflows (2+ occurrences in daily notes) that aren't yet a skill.
5. **Base health:** Are `.base` views still valid? Filters referencing correct paths and properties?

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
   - Isolated clusters that could be cross-linked.
   - Domains with many fleeting notes but no permanent notes — ripe for synthesis.
   - Cross-domain bridge opportunities — two clusters that share structural patterns but aren't linked.
4. **Protocol health:** Is `AGENTS.md` an accurate reflection of how the vault actually works? Flag conventions that have drifted from practice. The protocol should evolve — stale conventions are as harmful as stale notes.
5. **Meta trajectory:** For each dimension the human has built — is it deepening or stagnating? Are dimensions reinforcing each other (alignment informing taste, decisions informed by risk profiles)? Name the overall trajectory: **accelerating** / **improving** / **stable** / **drifting** / **declining**.
6. **Proposals:** 1–3 bold, grounded ideas. Each: one paragraph, the problem, the unlock, estimated effort. Prefer ideas that compound. Include protocol updates if `AGENTS.md` conventions don't match practice.

**Output:** evolution brief — patterns, structural ideas, knowledge health, meta trajectory, and high-leverage proposals.

### LAYER 7 — Synthesis

Combine all layers into a single report.

1. Write the report to `superpaper/projects/scratchpad/introspection-report.md`.
2. Structure:
   ```markdown
   ## Introspection report — YYYY-MM-DD

   ### Health score
   [A–F grade for each layer, with one-line justification]

   ### Meta — introspective core
   | Dimension | Depth (0–5) | Last updated | Sharpest note | Biggest gap |
   |-----------|-----------|-------------|--------------|------------|
   | [for each dimension found in meta/] | | | | |

   **Authorship balance:** human N / AI N
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
   - Meta depth: [dimension] N/5 (one row per dimension found)
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
- **ESCALATE TO HUMAN:** evolution proposals (present, don't implement), structural changes to [[AGENTS]] or skill architecture, any suggestion to retire a skill. Small convention updates to `AGENTS.md` (fixing documented vs. actual practice) can be noted in the report for the heartbeat to act on.

## Conventions

- **Read-only by default.** Don't modify files during the audit. Fixes happen as separate tasks (board cards or heartbeat actions).
- The report is a living document — overwrite it each run so it always reflects current state.
- Grade honestly. An A means "this would work flawlessly for any agent reading [[AGENTS]] cold." That bar should be hard to hit — but remember the protocol is meant to evolve, so "not yet customized" is different from "broken."
- **Distinguish intentional divergence from drift.** If the human organized something differently than `AGENTS.md` suggests, that's a protocol update opportunity, not a violation. Ask before "fixing" what might be intentional.
- Evolution proposals should be bold but grounded — tied to specific patterns observed, not generic advice.
- When proposing new skills, draft the one-line `description` and trigger phrases — make it easy to pick up.
- Link everything in the report with wiki-links — the report itself should be a navigation hub.
- Keep the report scannable — the human should understand system health in 30 seconds from the health score section.
