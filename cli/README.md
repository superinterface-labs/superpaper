# superpaper

Set up [Superpaper](https://github.com/superinterface-labs/superpaper) — an Obsidian-native AI workspace.

## Quick start

```bash
npx superpaper init
```

Or specify a path:

```bash
npx superpaper init ~/my-vault
```

## What it does

1. **Fetches infrastructure** — templates, skills, categories, and `AGENTS.md` from the Superpaper repo
2. **Installs community skills** — from [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills)
3. **Creates minimal structure** — `superpaper/`, `superpaper/inbox/`, `daily/`. Everything else grows organically.
4. **Sets up agent integrations** — `CLAUDE.md` and `.claude/skills` symlinks

## Safe to re-run

Existing files are never overwritten. If a file already exists, the updated version is saved with a `.new` suffix. A merge guide is generated at `superpaper/Superpaper update — merge required.md` with a prompt you can paste into your AI agent to resolve conflicts safely.

## After running

1. Open the vault in Obsidian
2. Open the vault folder in your AI coding agent
3. Tell it: *"Read AGENTS.md in full and set up Superpaper."*

## Requirements

- Node.js 18+
- Git
- An Obsidian vault (open the folder in Obsidian first so `.obsidian/` exists)

## License

MIT
