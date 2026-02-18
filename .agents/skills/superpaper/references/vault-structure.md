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
│   ├── meta/                   # How we think — shared AI+human introspection layer
│   ├── .evidence/              # (hidden) granular evidence for AI citation
│   ├── projects/               # Active work — bias here when >1 file needed
│   ├── apps/                   # Mini apps — interactive tools the human uses regularly
│   │   └── My tasks.md         # Kanban board — todo, in progress, done, blocked
│   ├── inbox/                  # Quick capture — triage within 48h
│   └── Knowledge map.md        # Browsable entry point to the knowledge graph
├── daily/                      # Human's daily notes (via Calendar plugin) — no agent links here
├── .archive/                   # Soft-deleted files — never rm, always move here
├── .scripts/                   # Shared TS/JS modules (hidden from Obsidian)
├── _templates/                 # Note templates
└── .obsidian/
    └── snippets/               # Custom CSS
```

**Elegant simplicity.** Entity folders (`people/`, `concepts/`, `questions/`, `sources/`, `personal/`, `meta/`) are broad enough to last forever. Subfolders within them emerge only when volume demands it — never before. A clean vault invites use; a pre-organized one intimidates.

---

## Scaling principle

Top-level folders under `superpaper/` organize by **entity type** (what it is) and **function** (what it does). Domains live in `#domains/` tags and `kind` fields — they cross-cut folders naturally. When a domain grows large enough to feel cluttered, cluster by domain *within* an entity folder (e.g. `people/work/`, `sources/papers/`, `concepts/ai/`). Everything flows through the same pipeline:

**inbox → sources → concepts/questions → personal/journal → projects → daily**

---

## When subfolders emerge

Create subfolders **only when volume accumulates**, not to pre-organize. These are suggestive anchors — the organic space you can grow into:

| Subfolder | When to create | Lives under |
|-----------|---------------|-------------|
| `work/`, `public-figures/`, `mentors/` | 8+ people notes | `people/` |
| `<domain>/` (e.g. `ai/`, `philosophy/`), `mental-models/`, `frameworks/`, `patterns/`, `claims/` | 5+ concept notes in one domain or kind | `concepts/` |
| `active/`, `parked/`, `resolved/` | Volume of questions grows | `questions/` |
| `bookmarks/` | First processed bookmark (created during bootstrap) | `sources/` |
| `papers/`, `books/`, `articles/`, `podcasts/`, `courses/` | Source type accumulates | `sources/` |
| `meetings/`, `conversations/` | Regular event transcripts | `sources/` |
| `events/`, `places/` | First time-bound event or location note | `personal/` |
| `health/`, `finances/`, `relationships/`, `goals/`, `hobbies/`, `possessions/` | 5+ notes in a life area | `personal/` |
| `journal/`, `reflections/`, `weekly-reviews/`, `retrospectives/`, `gratitude/` | First long-form reflection or review | `personal/` |
| `experiments/` | First designed personal trial (sleep, habits, routines) | `personal/` |
| `decisions/` | Accumulating life decisions worth tracking | `personal/` |
| `alignment/`, `decision-making/`, `risk-taking/`, `taste/` | Core dimension develops depth | `meta/` |
| `values/`, `beliefs/`, `preferences/`, `cognitive-patterns/`, `blindspots/` | Self-knowledge deepens | `meta/` |
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
| An insight, pattern, principle, claim, mental model | `concepts/` | The "what I understand" bucket |
| An open question I'm exploring | `questions/` | Retrieval magnet — pulls neighborhoods |
| A link, article, paper, book | `sources/` | Raw material — immutable reference. See [[knowledge-protocol.md#Bookmark processing lifecycle|bookmark lifecycle]] |
| A meeting, conversation, or time-bound event | `sources/` | Transcript is source material — insights extracted to entity folders |
| A physical or virtual location | `personal/places/` | Spatial anchor — where things happen (folder emerges when needed) |
| A creative hunch, brainstorm, what-if | `concepts/` | `type: idea` — low pressure, no structure required |
| Something personal (health, relationships, finances) | `personal/` | Private life knowledge |
| Processing an experience or struggle | `personal/journal/` | Self-reflection, growth |
| A running log (decisions, goals, learnings) | `personal/journal/*.log.md` | Append-only living document |
| A designed trial (sleep protocol, habit test) | `personal/experiments/` | Structured test with hypothesis + outcome |
| A preference, value, or self-knowledge note | `meta/` | How we think — human or AI writes. See [[knowledge-protocol.md#Meta — the self-referential layer|meta layer]] |
| Alignment observation (trust, communication, calibration) | `meta/alignment/` | Tuning weights of the partnership |
| A decision-making framework or reasoning pattern | `meta/decision-making/` | How choices get made |
| Risk appetite, comfort zones, growth edges | `meta/risk-taking/` | When to push, when to hold |
| Quality bar, aesthetic sense, intellectual standards | `meta/taste/` | What "good" looks like |
| Granular evidence supporting a claim | `.evidence/` | AI-facing, linked from knowledge notes |
| A quick thought, voice note, screenshot | `inbox/` | Triage within 48h |
| Something I'm actively building (>1 file) | `projects/<name>/` | Multi-file work lives in projects |
| A project experiment or A/B test | `projects/<name>/experiments/` | Designed trial scoped to a project |
| An interactive tool the human will reuse | `apps/<name>/` | Mini apps — see [[rendering-guide.md#Artifact ideas|artifact ideas]] and [[rendering-guide.md#TypeScript artifacts (CodeScript Toolkit)|CodeScript Toolkit]] |
| A blog, tweet, video, podcast, or link I liked | `inbox/` → `sources/bookmarks/` | Captured in inbox, enriched and moved to library after processing |
| A task the agent should work on | `apps/My tasks.md` | Kanban card — heartbeat picks it up |
| A task execution log entry | `inbox/log/mmm-yy/dd/<task>.md` | Granular record of what was done, when, and why |
| Agent's daily anchor | `inbox/log/YYYY-MM-DD.md` | Agent activity rolls up here — keeps `daily/` clean |
| Human's date anchor | `daily/` | Empty — value is in backlinks from the human's own fragments and life |

Domain doesn't change the destination. A fitness concept and a philosophy concept both go to `concepts/`. A novel draft and a product spec both go to `projects/`. **When work needs more than one central file, bias toward `projects/`** — entity folders hold atomic singles; projects hold coordinated efforts. Tags, kinds, and wiki-links handle the rest.

If directory structure regresses, confirm with the user before resetting; maybe they organized based their preferences.

---

## Folder indexes (`AGENTS.md` + `CLAUDE.md`)

Every non-trivial folder gets an `AGENTS.md` that describes what it contains — subfolders, key files, purpose, and conventions specific to that space. Keep these informative so you dont have to look through the folder to understand what it contains: a heading, a table or list, and any local rules.

**Every `AGENTS.md` MUST have a corresponding `CLAUDE.md` symlink** in the same directory, so both Claude Code and other agent runtimes discover it:

```bash
ln -sf AGENTS.md CLAUDE.md
```

At the vault root, `CLAUDE.md → AGENTS.md`. In every subfolder that has an `AGENTS.md`, create the same symlink. This is a one-line operation when creating the index — never skip it.

Update the relevant `AGENTS.md` (and its symlink) whenever you create, move, rename, or delete files in that folder. Staleness here is a bug.

---

## Reorganization

When a folder accumulates too many items (roughly >8–10), cluster them into subfolders by emergent theme. **Always confirm with the human before moving files.** Use `obsidian move` to relocate files — it auto-updates wiki-links. After reorganizing:
1. Update every `AGENTS.md` affected (parent and children)
2. Fix any Dataview `FROM` clauses and `.base` filters that referenced old paths
3. Log the change in `inbox/log/` with a link to the agent's daily log (`[[inbox/log/YYYY-MM-DD]]`)

---

## No deletions

**Never delete files.** Move them to `.archive/` instead, preserving the original folder structure (e.g. `.archive/superpaper/concepts/old-note.md`). The `.archive/` folder is a dot-folder — hidden from Obsidian's file explorer and search, but recoverable anytime. If the human asks to see archived files, list them.

**User-written content is sacred.** Never overwrite, truncate, or discard the original text in `inbox/` items. You may **process** them into new notes, but the human's original words must survive intact. After processing an inbox item, move it to `inbox/processed/` — never delete it. Daily notes are empty date anchors — don't write into them; link *to* them from other notes instead.

---

## Infrastructure vs content

The vault has two layers:

- **Infrastructure** — defines how the OS works. Distributable, versioned, shared: `AGENTS.md`, `.agents/**` (including [[../SKILL.md|this skill]] and all [[../SKILL.md#Reference files — read on activation|references]]), `_templates/**`, `.obsidian/**`, `.scripts/**`, `AGENTS.md` files in any folder.
- **Content** — the human's personal data. Never distributed: `people/**`, `concepts/**`, `questions/**`, `sources/**`, `personal/**` (includes `events/`, `places/`, `journal/`), `meta/**`, `daily/**`, `projects/**` (except AGENTS.md), `inbox/**`, `.archive/**`, `.plans/**`.

**Personal preferences live in `meta/`, not in AGENTS.md.** When either party — human or AI — notices a preference, reasoning pattern, alignment insight, or taste judgment, store it in `superpaper/meta/`. AGENTS.md defines the generic OS protocol; `meta/` holds the specific calibration of *this* partnership.
