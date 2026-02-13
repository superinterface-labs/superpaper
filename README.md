# Superpaper

A new way to think and work with AI agents using simple markdown files in Obsidian.
You talk, the agent writes files, knowledge compounds. No code, no build steps, no lock-in — just markdown.

## Things to know before you start

Your Obsidian vault is just a folder of text files. No database, no lock-in.

### Tools that you will need
- Install **[Obsidian](https://obsidian.md)** — a free app that renders markdown files into rich, interactive documents. Your vault is an Obsidian folder. [Watch this quick intro](https://youtu.be/z4AbijUCoKU?si=C52APZ14oehdnprN) if you are new to Obsidian.
- Install one or more **AI (coding) agents** — tools like [Claude Cowork](https://claude.ai/cowork), [Codex](https://openai.com/codex), [Claude Code](https://claude.ai/code), [Cursor](https://cursor.com), [Windsurf](https://windsurf.dev) that read and write files on your behalf and use various tools to perform actions.

### Good to know about
- **[AGENTS.md](https://agents.md)** — a single markdown file that teaches agents how to operate in your vault.
- **[Agent Skills](https://agentskills.io)** — reusable instruction packages agents discover and follow automatically.
- **[Markdown](https://www.markdownguide.org/basic-syntax/)** — headings, links, lists, checkboxes. Enough to read and lightly edit what agents produce.

## Get started under 2 minutes

1. Copy [`AGENTS.md`](https://raw.githubusercontent.com/superinterface-labs/superpaper/main/AGENTS.md) from this repo to the root of your Obsidian vault as `AGENTS.md`
2. Open your obsidian vault (or start a new one) in any AI coding agent (Claude Code, Codex, Cursor, Windsurf — whatever you use)
3. Tell the agent: *"Read AGENTS.md in full and set up the vault."*
4. Start chatting and following instructions to set it up.
5. You will see a new folder called `superpaper` in your vault. This is where the agent will store strutured notes, artifacts, and projects.
6. You can write daily logs or ideas into inbox or daily folder. And ask help from the agent to process them.

Tips:
- You can also setup a vault as a folder that contains all your projets so the agent can use context from them and work on them with you.
- Obsidian is also available on most platforms, so you can keep track of your notes and (eventually) the agents in the same place.
- You can use the obsidian-terminal public plugin to run the coding agent from within obsidian.

We are planning on providing a service that will allow you to do all this from any device with zero setup overhead and with additional features like ambient agents.

## Why this exists

Most AI setups put the chat at the center. Your notes are an afterthought. This flips it.

**Obsidian is the interface. The agent operates inside it.** Every response is a `.md` file you own — not a vanishing chat bubble. Close the chat and everything is still there. Embedded web pages, dashboards, diagrams, interactive TypeScript UIs — all rendering inside your vault.

Two modes feed each other:

- **Writing mode.** You write notes, journals, ideas. No AI in the way.
- **Agent mode.** You open the vault in your coding agent. It reads your full knowledge graph and updates files based on what you discuss.

What you write becomes context for the agent. What the agent produces becomes notes you build on.

## How memory works

Not a flat log. A knowledge graph.

The agent stores atomic notes connected by wiki-links — fleeting thoughts, source material, claims with confidence scores, permanent insights, cross-domain bridges, questions, experiments. When you ask something, it doesn't search for one note. It activates a *neighborhood* of related notes (backlinks, semantic similarity, recent context) and synthesizes.

When a genuine insight occurs, it creates a new note and backlinks 1–3 existing ones. Every idea becomes reachable from multiple directions. Over time, fleeting notes get promoted or pruned, contradictions generate questions, orphans get connected. The graph self-organizes around what matters.

The model gets smarter through knowledge synthesis.

## What you can do with it

| You say | What happens |
|---------|--------------|
| "Research X" | Sources gathered from the web, distilled into memory |
| "Process my journal" | Daily writing gets reflected back as atomic insights and updated living documents |
| "I just had a weird dream about..." | Fleeting note captured, linked to recurring themes the agent has noticed over time |
| "Build me a meditation tracker" | Interactive artifact in `superpaper/projects/` you open daily in Obsidian |
| "What do I actually believe about free will?" | Agent synthesizes across your philosophy notes, highlights contradictions, surfaces what you've changed your mind on |
| "Help me plan a trip to Japan" | Research notes, budget tracker, itinerary artifact — all linked and queryable later |
| "I keep getting headaches after lunch" | Health log entry; over weeks the agent spots patterns across diet, sleep, and energy notes |
| "Find connections between stoicism and my parenting notes" | Cross-domain bridge notes surface structural parallels you hadn't seen |
| "Write a draft of my essay on..." | Agent pulls claims, evidence, and patterns from memory into a structured draft |
| "What's changed in my life this quarter?" | Agent reviews goals, journals, decisions, and experiments — reconstructs your arc |
| "Log my run: 5k in 28 minutes, felt strong" | Health log entry; over time agent spots correlations between training volume and energy/mood |
| "What should I read next?" | Agent looks at what you've read, what you're curious about, and what gaps exist in your graph |

Research, build, organize, memorize — you never pick which mode. The agent routes automatically.

## Skills

Reusable instruction packages in `.agents/skills/`. Each skill is a folder with a `SKILL.md` file. The agent discovers them at startup, activates them when relevant, and suggests new ones when it notices you repeating a workflow. They follow the [Agent Skills](https://agentskills.io) open standard and work with any coding agent that reads files.

## Vault structure

```
├── AGENTS.md                   # Operating manual — agents read this first
├── superpaper/
│   ├── people/                 # Who — contacts, collaborators, public figures
│   ├── concepts/               # What I understand — patterns, principles, claims
│   ├── questions/              # What I'm exploring — open threads
│   ├── sources/                # Where I learned it — articles, books, papers
│   ├── events/                 # Time — meetings, conversations, logs
│   ├── places/                 # Space — physical & virtual locations
│   ├── personal/               # My life — health, relationships, journal
│   ├── projects/               # Active work
│   ├── apps/                   # Mini apps — trackers, dashboards, utilities
│   └── inbox/                  # Quick capture — triage within 48h
├── daily/                      # Daily notes
├── .agents/skills/             # Reusable agent skills
├── .scripts/                   # Shared TypeScript modules
├── _templates/                 # Note templates
└── .obsidian/                  # Obsidian config
```

## Guardrails

Small actions (filing notes, linking concepts) happen automatically. Big actions (deleting files, reorganizing folders) — the agent asks first. You're always the final authority. And everything the agent does, you can do by hand. It's just text.

## Where this is going

Today it's one agent and a handful of skills. Tomorrow it's dozens of agents running continuously — linking notes, monitoring topics, processing your inbox, building tools. Your vault looks the same either way.

One vault. Plain text. Knowledge that compounds.
