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

## Commands

| Command | Description |
|---------|-------------|
| `npx superpaper init [path]` | Install or upgrade Superpaper in a vault |
| `npx superpaper update [path]` | Same as `init` (auto-detects mode) |
| `npx superpaper upgrade [path]` | Same as `init` (auto-detects mode) |

All three commands are identical — they auto-detect whether Superpaper is already installed and run in the appropriate mode (fresh install or upgrade). Add `--force` to skip confirmation prompts.

## What it does

1. **Fetches infrastructure** — templates, skills, categories, and `AGENTS.md` from the Superpaper repo
2. **Installs community skills** — from [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills)
3. **Creates minimal structure** — `superpaper/`, `superpaper/inbox/`, `daily/`. Everything else grows organically.
4. **Sets up agent integrations** — `CLAUDE.md` and `.claude/skills` symlinks

## Init vs Update

The CLI automatically detects whether Superpaper is already installed by checking for `.agents/skills/superpaper/SKILL.md`. If found, it runs in **upgrade mode** — fetching the latest infrastructure and saving conflicts as `.new` files. If not found, it runs a fresh install.

All three commands (`init`, `update`, `upgrade`) are interchangeable — use whichever feels natural.

## Safe to re-run

Existing files are never overwritten. If a file already exists and differs from the incoming version, the update is saved with a `.new` suffix. A merge guide is generated at `superpaper/Superpaper update — merge required.md` with a prompt you can paste into your AI agent to resolve conflicts safely.

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
