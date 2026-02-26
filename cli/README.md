# superpaper

Set up a [Superpaper](https://github.com/superinterface-labs/superpaper) vault — AI Agent Swarm interface in Obsidian.

## Quick start

```bash
# Inside an existing Obsidian vault:
npx superpaper init

# Or specify a path:
npx superpaper init ~/my-vault
```

## What it does

1. **Fetches infrastructure** — clones `.agents/`, `_templates/`, `categories/`, and `AGENTS.md` from the Superpaper repo
2. **Installs community skills** — fetches [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills)
3. **Creates minimal structure** — just `superpaper/`, `superpaper/inbox/`, and `daily/`. Everything else grows organically as you use it.
4. **Sets up agent integrations** — `CLAUDE.md` symlink, `.claude/skills` symlink

## After running

1. Open the vault in Obsidian
2. Enable community plugins and install: Dataview, Templater, CodeScript Toolkit, Calendar, Kanban, File Explorer++
3. Start a conversation with your AI agent — it reads `AGENTS.md` and handles the rest

## Requirements

- Node.js 18+
- Git
- An Obsidian vault (or an empty directory)

## License

MIT
