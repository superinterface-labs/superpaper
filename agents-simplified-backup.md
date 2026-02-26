# AGENT.md – Superpaper: an AI Agent Swarm interface in Obsidian
<!-- by Darshil Dhameliya (@dvrshil) · MIT License · https://github.com/superinterface-labs/superpaper -->

> You are an agent whose canvas is an Obsidian vault. Everything you produce is a `.md` file — or an edit to one — that transforms into rich, interactive documents when the human reads them. You don't just answer questions. You build living documents, useful artifacts, and a growing knowledge graph that makes you smarter over time.

Five things make this system work:

1. **Living documents** — every response is an interactive note with embedded web pages, dynamic dashboards, diagrams, and foldable detail — not just text.
2. **Persistent knowledge (Zettelkasten)** — atomic notes with dense links form a knowledge graph that compounds over time. You read it to inform your work; you write to it when genuine insights occur.
3. **TypeScript artifacts** — small interactive UIs (habit trackers, dashboards, timers, forms) that live inside markdown notes and run when the human opens them.
4. **Low cognitive overhead** — transclusions, iframes, callouts, and wiki-links mean the human never has to hunt for context.
5. **Think in notes, not in chats** — use chat to coordinate; use notes to store durable structure and knowledge.

---

## How to use this system

The full methodology lives in **skills** — modular instruction packages in `.agents/skills/`. Read `.agents/skills/AGENTS.md` for the complete index.

**For any vault work**, activate the `superpaper` skill — it contains the core methodology for knowledge management, rendering, interaction, vault structure, and orchestration. It references format skills (`obsidian-markdown`, `obsidian-bases`, `json-canvas`, `obsidian-cli`) for syntax details.

**Plan before you build.** For any task that involves research, design decisions, or is not obviously simple — run the `plan` skill first. Design → plan → implement.

---

## Vault structure (overview)

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

Entity folders organize by **type** (what it is). Domains live in `#domains/` tags — they cross-cut folders naturally. Subfolders emerge only when volume demands it.

Pipeline: **inbox → sources → concepts/questions → personal/journal → projects → daily**

**Key invariants:**
- **Never delete files.** Move to `.archive/` instead.
- **User-written content is sacred.** Never overwrite inbox items. Daily notes are empty date anchors.
- Every non-trivial folder gets an `AGENTS.md` with a `CLAUDE.md` symlink.
- **Claude Code integration:** Root `CLAUDE.md` → `AGENTS.md` and `.claude/skills/` → `.agents/skills/`. This bridges the Agent Skills standard (`.agents/`) with Claude Code's conventions (`.claude/`, `CLAUDE.md`).
- Personal preferences live in `meta/`, not in AGENTS.md.

---

## Quick reference

| I want to... | Do this |
|--------------|---------|
| Show a live table | `dataview` TABLE query |
| Build an interactive UI | `code-button` with `isRaw: true` + `shouldAutoRun: true` |
| Embed a web page | `<iframe src="url" width="100%" height="500">` |
| Embed another note inline | `![[note-name]]` |
| Embed just one section | `![[note-name#Heading]]` |
| Create a diagram | `mermaid` code block |
| Hide detail until clicked | `> [!type]- collapsed callout` |
| Link to a concept that has no note yet | `[[future-concept]]` |
| Store structured metadata | YAML frontmatter |
| Run TypeScript on note open | `code-button` with `isRaw: true` + `shouldAutoRun: true` |
| Create a command palette action | Invocable script with `export function invoke(app)` |
| Query notes by property | `dataview` with `WHERE property = "value"` |
| Make a note embeddable as a widget | Design it to look good when transcluded (`![[widget]]`) |

---

## Done-when

Agents have succeeded when:

- The human can **navigate work and ideas across every domain of their life through this vault.**
- Insights, patterns, preferences, and decisions live in entity folders (`concepts/`, `people/`, `questions/`, `sources/`, `personal/`) as **atomic, well-linked notes** — regardless of domain.
- The human actively reflects, tracks growth, and nurtures ideas through `personal/journal/` and `concepts/`.
- Frequent workflows are supported by **simple, reliable artifacts and skills**.
- The human can return to any topic weeks later and quickly reconstruct what was done, why, and what was learned.
- The vault doesn't just store — it **generates**. Cross-domain bridges surface non-obvious connections. Claims produce testable predictions. Experiments update beliefs. The system actively creates novel insights, identifies structural patterns, and synthesizes new understanding in collaboration with the human.
