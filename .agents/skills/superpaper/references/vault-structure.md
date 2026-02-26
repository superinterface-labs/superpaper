# Vault structure

Full vault structure for [[../SKILL.md|Superpaper]]: folder tree, scaling principles, subfolder emergence, what-goes-where routing, folder indexes, reorganization protocol, no-deletion policy, and infrastructure vs content separation.

**Cross-references:** [[../SKILL.md#Vault structure|SKILL.md]] has the summary. [[knowledge-protocol.md#Note types (full descriptions)|Note types]] determine which folder a note lives in. [[knowledge-protocol.md#Categories — multi-belonging without folders|Categories]] give cross-cutting membership without subfolders. [[rendering-guide.md#Bases — vault usage patterns|Bases]] provide database views over folder contents.

---

## Folder tree (minimal)

```
/
├── AGENTS.md                   # This file
├── superpaper/
│   ├── people/                 # Who — contacts, collaborators, public figures
│   ├── concepts/               # What I understand — ideas, patterns, principles, claims
│   ├── questions/              # What I'm exploring — open threads, retrieval magnets
│   ├── sources/                # Where I learned it — articles, books, papers
│   ├── personal/               # My life — health, relationships, finances, hobbies, journal
│   │   └── journal/            # Self-reflection and growth
│   ├── meta/                   # The introspective core — how we think, choose, collaborate
│   ├── projects/               # Active work — bias here when >1 file needed
│   ├── apps/                   # Mini apps — interactive tools the human uses regularly
│   │   └── My tasks.md         # Kanban board — todo, in progress, done, blocked
│   ├── inbox/                  # Quick capture — triage within 48h
│   └── Knowledge map.md        # Browsable entry point to the knowledge graph
├── daily/                      # Date anchors — each embeds Daily.base (human-first dashboard)
├── .archive/                   # Soft-deleted files — never rm, always move here
├── .scripts/                   # Shared TS/JS modules (hidden from Obsidian)
├── categories/                 # Category hub pages — each embeds its .base
├── _templates/                 # Note + base templates (ships with repo)
└── .obsidian/
    └── snippets/               # Custom CSS
```

**This is a reference map, not a day-one checklist.** Only `superpaper/`, `superpaper/inbox/`, and `daily/` are created during bootstrap. Everything else — `people/`, `concepts/`, `sources/`, `projects/`, `personal/`, `meta/`, `apps/`, `questions/` — appears **the first time the human actually needs it**. Entity folders are broad enough to last forever. Subfolders emerge only when volume demands it — never before. If the human prefers a different layout — fewer folders, different names, flat structure — go with it.

---

## Scaling principle

Top-level folders under `superpaper/` organize by **entity type** (what it is) and **function** (what it does). Domains live in `#domains/` tags and `categories` — they cross-cut folders naturally. When a domain grows large enough to feel cluttered, cluster by domain *within* an entity folder (e.g. `people/work/`, `sources/papers/`, `concepts/ai/`). Everything flows through the same pipeline:

**inbox → sources → concepts/questions → personal/journal → projects → daily**

---

## When subfolders emerge

Create subfolders **only when volume accumulates**, not to pre-organize. These are suggestive anchors — the organic space you can grow into:

| Subfolder | When to create | Lives under |
|-----------|---------------|-------------|
| `work/`, `public-figures/`, `mentors/` | 8+ people notes | `people/` |
| `<domain>/` (e.g. `ai/`, `philosophy/`), `mental-models/`, `frameworks/`, `claims/` | 5+ concept notes in one domain | `concepts/` |
| `active/`, `parked/`, `resolved/` | Volume of questions grows | `questions/` |
| `bookmarks/` | First processed bookmark (created during bootstrap) | `sources/` |
| `papers/`, `books/`, `articles/`, `podcasts/`, `courses/` | Source type accumulates | `sources/` |
| `meetings/`, `conversations/` | Regular event transcripts | `sources/` |
| `events/`, `places/` | First time-bound event or location note | `personal/` |
| `health/`, `finances/`, `relationships/`, `goals/`, `hobbies/`, `possessions/` | 5+ notes in a life area | `personal/` |
| `journal/`, `reflections/`, `weekly-reviews/`, `retrospectives/`, `gratitude/` | First long-form reflection or review | `personal/` |
| `experiments/` | First designed personal trial (sleep, habits, routines) | `personal/` |
| `decisions/` | Accumulating life decisions worth tracking | `personal/` |
| `<dimension>/` (e.g. `alignment/`, `taste/`, `decision-making/`) | Any meta dimension develops depth | `meta/` |
| `<name>/` | Any active project with multiple files | `projects/` |
| `experiments/` | First designed trial within a project | `projects/<name>/` |
| `scratchpad/` | First throwaway experiment or deliverable (auto-archive after 14 days) | `projects/` |
| `log/` | First task execution log | `inbox/` |

Don't pre-create these. Let them emerge from use. Expand organically as categories surface. Always respect the user's taste in organizing — especially in existing vaults.

---

## What goes where

| I have... | It goes in | Because |
|-----------|-----------|--------|
| A person — contact, mentor, author, public figure | `people/` | First-class entity with its own note |
| An insight, pattern, principle, claim, mental model | `concepts/` | The "what I understand" bucket. Permanent (evergreen) notes live here — sentence-like titles, well-linked, durable ideas |
| An open question I'm exploring | `questions/` | Retrieval magnet — pulls neighborhoods |
| A link, article, paper, book | `sources/` | Raw material — immutable reference. See [[knowledge-protocol.md#Bookmark processing lifecycle|bookmark lifecycle]] |
| A meeting, conversation, or time-bound event | `sources/` | Transcript is source material — insights extracted to entity folders |
| A physical or virtual location | `personal/places/` | Spatial anchor — where things happen (folder emerges when needed) |
| A creative hunch, brainstorm, what-if | `concepts/` | `type: idea` — low pressure, no structure required |
| Something personal (health, relationships, finances) | `personal/` | Private life knowledge |
| Processing an experience or struggle | `personal/journal/` | Self-reflection, growth |
| A running log (decisions, goals, learnings) | `personal/journal/*.log.md` | Append-only living document |
| A designed trial (sleep protocol, habit test) | `personal/experiments/` | Structured test with hypothesis + outcome |
| A preference, value, self-knowledge, or introspective observation | `meta/` | The introspective core — how we think, choose, and collaborate. Subdimensions emerge as depth grows. See [[knowledge-protocol.md#Meta — the introspective core|meta layer]] |
| A quick thought, voice note, screenshot | `inbox/` | Triage within 48h |
| Something I'm actively building (>1 file) | `projects/<name>/` | Multi-file work lives in projects |
| A project experiment or A/B test | `projects/<name>/experiments/` | Designed trial scoped to a project |
| An interactive tool the human will reuse | `apps/<name>/` | Mini apps — see [[rendering-guide.md#Artifact ideas|artifact ideas]] and [[rendering-guide.md#TypeScript artifacts (CodeScript Toolkit)|CodeScript Toolkit]] |
| A blog, tweet, video, podcast, or link I liked | `inbox/` → `sources/bookmarks/` | Captured in inbox, enriched and moved to library after processing |
| A task the agent should work on | `apps/My tasks.md` | Kanban card — heartbeat picks it up |
| A task execution log entry | inbox log folder | Granular record of what was done, when, and why |
| Agent's daily anchor | `inbox/log/YYYY-MM-DD.md` | Agent activity rolls up here — keeps `daily/` clean |
| Human's date anchor | `daily/` | Nothing is written in daily notes — they exist solely to be linked *to*. Value is in backlinks. |

Domain doesn't change the destination. A fitness concept and a philosophy concept both go to `concepts/`. A novel draft and a product spec both go to `projects/`. **When work needs more than one central file, bias toward `projects/`** — entity folders hold atomic singles; projects hold coordinated efforts. Tags, categories, and wiki-links handle the rest.

If directory structure regresses, confirm with the user before resetting; maybe they organized based their preferences.

---

## Folder indexes

Key folders get an `AGENTS.md` that describes what they contain — subfolders, key files, purpose, and local conventions. Keep these informative so agents don't have to scan the folder to understand it.

Update the relevant `AGENTS.md` whenever you create, move, rename, or delete files in that folder. Staleness here is a bug.

---

## Reorganization

When a folder accumulates too many items (roughly >8–10), cluster them into subfolders by emergent theme. **Always confirm with the human before moving files.** Use `obsidian move` to relocate files — it auto-updates wiki-links. After reorganizing:
1. Update every `AGENTS.md` affected (parent and children)
2. Fix any Dataview `FROM` clauses and `.base` filters that referenced old paths
3. Log the change in `inbox/log/` with a link to the agent's daily log (`[[inbox/log/YYYY-MM-DD]]`)

---

## No deletions (strong default)

**Never delete files** unless the human explicitly asks. Move them to `.archive/` instead, preserving the original folder structure (e.g. `.archive/superpaper/concepts/old-note.md`). The `.archive/` folder is a dot-folder — hidden from Obsidian's file explorer and search, but recoverable anytime. If the human asks to see archived files, list them.

**User-written content is sacred.** Never overwrite, truncate, or discard the original text in `inbox/` items. You may **process** them into new notes, but the human's original words must survive intact. After processing an inbox item, move it to `inbox/processed/` — never delete it. Nothing is written in daily notes — they exist solely to be linked *to* from other entries.

**Authorship provenance (`created-by`).** Every note carries `created-by: human`, `created-by: ai`, or `created-by: ai-assisted`. Always set it accurately. Human-written notes are read-only for agents — aside from adding or updating frontmatter properties. To connect, extend, or respond to human notes, create AI **proxy connection docs** (`created-by: ai`) that link to the human note. This keeps originals pristine while weaving them into the graph.

---

## Infrastructure vs content

The vault has two layers:

- **Infrastructure** — defines how the OS works. Distributable, versioned, shared: `AGENTS.md` (root, `.agents/skills/`, `_templates/`), `.agents/**`, `_templates/**`, `categories/**`, `.obsidian/**`, `.scripts/**`.
- **Content** — the human's personal data. Never distributed: `people/**`, `concepts/**`, `questions/**`, `sources/**`, `personal/**`, `meta/**`, `daily/**`, `projects/**`, `inbox/**`, `.archive/**`, `.plans/**`.

**Personal preferences live in both `meta/` and `AGENTS.md`.** When a preference changes a convention, update `AGENTS.md` so the protocol evolves. `meta/` holds nuance and calibration; `AGENTS.md` holds the working agreements.
