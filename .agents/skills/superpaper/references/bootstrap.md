# Bootstrap — setting up a fresh vault

Four steps to a working vault. **The system starts almost empty** — only `superpaper/` (with `inbox/` and `categories/`), `daily/`, `_templates/`, and infrastructure files exist on day one. Entity folders, bases, and features appear **only when the human first needs them**. Do NOT create folders speculatively.

> [!danger] Before starting bootstrap, you MUST read ALL sibling reference files into context.
> Bootstrap touches every part of the system. Read these now:
> 1. [[rendering-guide.md]] — plugins + rendering toolkit
> 2. [[knowledge-protocol.md]] — category trinity, templates, Knowledge map spec
> 3. [[vault-structure.md]] — folder reference map + routing rules
> 4. [[../SKILL.md|SKILL.md]] — philosophy, interaction style, write protocol

---

## 1. Verify installation

**Assume `npx superpaper init` has already been run.** Don't run it yourself. Instead, verify the infrastructure is in place by checking for these markers:

| Check for | Means |
|-----------|-------|
| `.agents/skills/` exists with skill folders | Skills installed |
| `_templates/` exists with `.md` and `Bases/` | Templates installed |
| `superpaper/categories/` exists with hub pages | Category pages installed |
| `.obsidian/types.json` exists | Property types copied |
| `superpaper/inbox/` exists | Minimal structure created |
| `daily/` exists | Daily notes folder created |
| `CLAUDE.md` symlink → `AGENTS.md` | Agent integration set up |

**If any of these are missing**, ask the human to run the installer:

```bash
npx superpaper init
```

Don't proceed with bootstrap until the infrastructure is confirmed. The CLI handles cloning the repo, copying templates and categories into `superpaper/categories/`, installing skills, setting up property types, creating minimal folders (`superpaper/`, `superpaper/inbox/`, `superpaper/categories/`, `daily/`), and creating agent symlinks.

Once verified, update `.agents/skills/AGENTS.md` to index all installed skills if not already done.

> [!danger] DO NOT create entity folders during bootstrap.
> After `npx superpaper init`, only these folders should exist inside `superpaper/`: `inbox/` and `categories/`. **Do NOT create** `people/`, `concepts/`, `sources/`, `projects/`, `personal/`, `meta/`, `apps/`, `questions/`, or any other entity folder during setup. Each folder is created **the first time you write a note that belongs in it** — not before. Creating empty folders upfront clutters the vault and overwhelms the human. If a folder doesn't have a note going into it *right now*, it doesn't exist yet.

**What ships with the repo (no need to create):**
- **Templates** (`_templates/`) — 14 note templates + 36 base templates (including 11 utility bases). Read `_templates/AGENTS.md` for the full inventory.
- **Category pages** (`superpaper/categories/`) — 26 hub pages, each embedding its `.base`.
- **Property types** (`obsidian-types-init.json`) — copy to `.obsidian/types.json` so Obsidian knows the correct type for each property.
- **Base templates** (`_templates/Bases/`) — deploy bases only when the content they serve exists. Don't copy 36 bases into an empty vault. When the human creates their first bookmark, deploy `Bookmarks.base`. When they write their first concept, deploy `Concepts.base`. Bases earn their place by having something to show.

Briefly explain the category system: each category is a [[knowledge-protocol.md#Categories — multi-belonging without folders|trinity]] of template + base + category page. When a new category emerges, spin up all three — the templates make this instant.

---

## 2. Configure plugins

This step is critical — the vault needs plugins to function well.

0. **Core settings first.** Settings → Files & Links → enable **Automatically update internal links** and set **Default location for new attachments** to `_attachments/`.
1. **Enable all core plugins.** Settings → Core plugins → turn on everything except **Random note** and **Publish**. This ensures Bases, Properties, Backlinks, Outgoing links, Tags, Templates, Word count, and all other native features are available.
2. **Install community plugins.** Try Obsidian CLI first (`obsidian install <plugin-id>`). If unavailable, walk the human through: Settings → Community plugins → Browse → search → install → enable. Required: **Dataview**, **Templater**, **CodeScript Toolkit**, **Calendar**, **Kanban**, **File Explorer++**.
3. **Configure every plugin.** Before writing any plugin's `data.json`, **read the plugin's actual source code or existing config file** to learn the exact schema — never assume the shape of the JSON. Write the correct settings JSON directly to `.obsidian/plugins/<plugin-id>/data.json`, or guide the human through the settings UI if file access isn't possible. Do not leave defaults — set values to match vault conventions. Key configs:
   - **Daily notes (core):** date format `YYYY-MM-DD`, new file location `daily/`, template `_templates/Daily note.md`, **open daily note on startup** enabled. This auto-creates today's daily note when Obsidian launches — fragments always have a backlink target.
   - **Templater:** template folder `_templates/`, **trigger on new file creation** enabled, **empty file template** `_templates/Knowledge note.md`. This auto-stamps `created-by: human` on every note the human creates (via hotkey, unique note, file explorer). Agents override to `ai` programmatically. Zero friction for the human.
   - **Dataview:** enable JavaScript queries and inline queries.
   - **File Explorer++:** see [[../../../AGENTS.md#Environment & tools|AGENTS.md]] for hide/pin filters.
4. **Verify with human.** Ask: "Can you see any `AGENTS.md` files in your file explorer?" If yes, debug the hide filters. Confirm `_templates` and `inbox` are hidden. Confirm plugins are working. **The human's visual confirmation is the only proof.**

---

## 3. First conversation

This is the real bootstrap — everything else grows from here.

### Get to know the human

Have an easy, curious conversation. What are they working on? What do they nerd out about? What's on their mind? Let it wander. This isn't a step to rush through — it's the foundation of the partnership.

### Write the first note together

Pick something the human cares about and write an atomic concept note together using the [[knowledge-protocol.md#Knowledge note template|knowledge note template]]. Show them the [[../SKILL.md#How to write knowledge (trigger-based)|write protocol]] in action:
- One idea per note, sentence-like title
- Typed relations in the `## Relates` section
- Links to future notes that don't exist yet (growth points)
- A transclusion, a callout, a Dataview query — whatever fits naturally

Explain why fewer, denser, better-linked notes win. Don't force a demo. Let the features appear because the content needs them. The human sees the system's power through their own idea, not a canned example.

### Index existing context

If the vault has existing content — folders, projects, notes — scan them now. Don't reorganize. Just make them findable: create `source` notes in `superpaper/sources/` (create the folder now if needed) with brief descriptions and links. The human's existing work is the richest starting context — go through it meticulously.

### Seed the meta layer

Capture what you learned about the human as notes in `superpaper/meta/` (create the folder now) — preferences, alignment observations, taste signals, reasoning patterns. This seeds the introspective core that makes everything else improve. See [[../SKILL.md#Meta — the introspective core|meta section]] and [[introspect]] for how meta dimensions grow.

**Update `AGENTS.md`** with whatever structure and preferences emerged.

---

## 4. Evolve — features that earn their place

These aren't bootstrap steps — they're features that appear when the human's workflow calls for them. Suggest each one at the natural moment, not upfront.

### Quick Capture UI
**When:** the human starts capturing thoughts regularly, or asks for a faster way to jot things down.

Create `daily/Quick capture.md` — a [[rendering-guide.md#The code-button block|code-button]] with `isRaw: true` and `shouldAutoRun: true` (see [[rendering-guide.md#Seamless auto-rendering UI|seamless UI pattern]]) rendering four capture buttons:
- **Thought** → timestamped fragment note linking to today's daily note (`[[YYYY-MM-DD]]`)
- **Task** → kanban card on `apps/My tasks.md` under **Todo**
- **Idea** → note in `concepts/` with `type: idea`
- **Link** → `type: bookmark` note in `inbox/`

Pin to sidebar. Add a `## Drops` section for cross-device capture: `- [ ] text or URL` per line. On next note open, the UI auto-processes each unchecked drop (URLs → bookmarks in `inbox/`, text → timestamped fragments). The heartbeat also scans for unchecked drops during triage. This makes Quick capture the single capture surface across all devices.

### Mobile bookmarking
**When:** the human mentions saving links from their phone, or after Quick Capture is live.

Help set up a Siri Shortcut (iOS) / share sheet action that appends `- [ ] URL` to `daily/Quick capture.md`'s Drops section. Walk through building it step by step. The UI and heartbeat handle the rest.

### CSS polish
**When:** the human notices visual rough edges, or asks for cleaner UI.

Create `.obsidian/snippets/agent-ui.css` with theme-aware styles for code-button outputs, callouts, and artifact UIs.

### File Explorer++ tuning
**When:** new folders or pinned files emerge from use.

Update hide/pin filters in `.obsidian/plugins/file-explorer-plus/data.json`. Pin `superpaper/apps/`, `projects/`, and key `.base` files as they get created. Knowledge map must never be pinned.

---

## Throughout setup

- Explain each step before doing it — why it matters, what it enables.
- One step at a time. Wait for confirmation before proceeding.
- You create the files yourself — don't direct the human to do it manually.
- Signpost progress: "Step 2 of 3 — almost there."
