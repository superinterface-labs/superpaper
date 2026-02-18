# Bootstrap — setting up a fresh vault

Full bootstrap guide for [[../SKILL.md|Superpaper]]. If the vault isn't already configured, walk the human through these steps one at a time. Confirm readiness before each step. Don't rush.

> [!danger] Before starting bootstrap, you MUST read ALL sibling reference files into context.
> Bootstrap touches every part of the system — rendering, knowledge, vault structure, interaction — so you need the full picture loaded before you begin. Read these now:
> 1. [[rendering-guide.md]] — you'll need this for plugins (step 2), CodeScript Toolkit (step 5), Bases syntax (step 6), and the full rendering toolkit
> 2. [[knowledge-protocol.md]] — you'll need this for note templates (step 4), the category trinity (step 6), bookmark lifecycle, and the Knowledge map spec
> 3. [[vault-structure.md]] — you'll need this for the folder tree (step 3), what-goes-where routing, and subfolder emergence rules
>
> Also ensure you've read [[../SKILL.md|SKILL.md]] in full — especially the [[../SKILL.md#Knowledge — your persistent knowledge graph|knowledge protocol]], [[../SKILL.md#Interaction style|interaction style]], and [[../SKILL.md#Tutoring protocol|tutoring protocol]].

**Step-by-reference map:** Step 2 → [[rendering-guide.md#Required plugins|plugin list]]. Step 3 → [[vault-structure.md#Folder tree (minimal)|folder tree]]. Step 4 → [[knowledge-protocol.md#Knowledge note template|note templates]]. Step 5 → [[rendering-guide.md#TypeScript artifacts (CodeScript Toolkit)|CodeScript Toolkit]]. Step 6 → [[rendering-guide.md#Bases — vault usage patterns|Bases syntax]] + [[knowledge-protocol.md#Categories — multi-belonging without folders|category trinity]]. Step 7 → [[../SKILL.md#How to write knowledge (trigger-based)|write protocol]].

---

## 0. Install skills

If `.agents/` doesn't already exist in the vault root, fetch it from the repo:

```bash
git clone --no-checkout --filter=blob:none https://github.com/superinterface-labs/superpaper.git /tmp/superpaper \
  && cd /tmp/superpaper \
  && git sparse-checkout set .agents \
  && git checkout \
  && cp -r .agents "$OLDPWD" \
  && cd "$OLDPWD" \
  && rm -rf /tmp/superpaper
```

Then pull community skills from [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills):

```bash
git clone --no-checkout --filter=blob:none https://github.com/kepano/obsidian-skills.git /tmp/obsidian-skills \
  && cd /tmp/obsidian-skills \
  && git sparse-checkout set skills \
  && git checkout \
  && cp -r skills/* "$OLDPWD/.agents/skills/" \
  && cd "$OLDPWD" \
  && rm -rf /tmp/obsidian-skills
```

After installing, set up Claude Code integration symlinks:

```bash
# Root CLAUDE.md → AGENTS.md (so Claude Code reads vault instructions)
ln -sf AGENTS.md CLAUDE.md

# .claude/skills → .agents/skills (so Claude Code discovers agent skills)
mkdir -p .claude
ln -sf ../.agents/skills .claude/skills
```

Then update `.agents/skills/AGENTS.md` to index all installed skills.

---

## 1. Index existing context

Scan the vault for existing folders, projects, notes, and files outside `superpaper/`. Sibling folders (code repos, writing projects, research directories) are assets — index them into `sources/` as `source` notes with brief descriptions and links. The human's existing work is the richest starting context. Don't reorganize it; just make it findable and warmup the knowledge, go through them meticulously.

---

## 2. Set up environment

This step is non-negotiable — do not skip or defer it.

0. **Core settings first.** Settings → Files & Links → enable **Automatically update internal links** and set **Default location for new attachments** to a folder (e.g. `_attachments/`).
1. **Enable all core plugins.** Settings → Core plugins → turn on everything except **Random note** and **Publish**. This ensures Bases, Properties, Backlinks, Outgoing links, Tags, Templates, Word count, and all other native features are available.
2. **Try CLI first.** If not available, ask the human to enable it in Obsidian: Settings → General → Advanced and turn on **Command-line interface**.
3. **If CLI is unavailable, even after the user tries it**, walk the human through installing each plugin manually: open Settings → Community plugins → Browse → search → install → enable. Do this one plugin at a time, confirming each is active before moving on.
4. **Configure every plugin.** Before writing any plugin's `data.json`, **read the plugin's actual source code or existing config file** to learn the exact schema — never assume the shape of the JSON. Write the correct settings JSON directly to `.obsidian/plugins/<plugin-id>/data.json`, or guide the human through the settings UI if file access isn't possible. Do not leave defaults — set values to match vault conventions.
5. **Verify.** Confirm each plugin is installed, enabled, and configured before proceeding.

---

## 3. Create vault structure

Create the entity and function folders per [[vault-structure.md#Folder tree (minimal)|the folder tree]] under `superpaper/`: `people/`, `concepts/`, `questions/`, `sources/`, `personal/`, `personal/journal/`, `meta/`, `.evidence/`, `projects/`, `apps/`, `inbox/`. Also create `daily/`, `.archive/`, `.scripts/`, `_templates/` at root. Then create `superpaper/Knowledge map.md` per the **Knowledge map** specification. **Do not pre-create subfolders** — they appear naturally as content flows in.

---

## 4. Create templates

Create the [[knowledge-protocol.md#Knowledge note template|Knowledge note template]], [[knowledge-protocol.md#Daily note template|Daily note template]], [[knowledge-protocol.md#Idea note template|Idea note template]], [[knowledge-protocol.md#Reflection template|Reflection template]], [[knowledge-protocol.md#Person template|Person template]], and [[knowledge-protocol.md#Bookmark template|Bookmark template]] in `_templates/`. Use Templater variables (`{{date}}`, `{{title}}`) where appropriate.

Also create `_templates/Bases/` for base templates. Start with `Bookmarks.base` (created in step 6). As the human adopts new categories, each gets the full [[knowledge-protocol.md#Categories — multi-belonging without folders|category trinity]]: template + base + category page. Base templates make spinning up new categories instant.

---

## 5. Create Quick Capture UI

Create `daily/Quick capture.md` — a [[rendering-guide.md#The code-button block|code-button]] with `isRaw: true` and `shouldAutoRun: true` (see [[rendering-guide.md#Seamless auto-rendering UI|seamless UI pattern]]) that renders four capture buttons: **Thought**, **Task**, **Idea**, **Link**. Each opens an inline input, then saves to the right place:
- *Thought* → creates a timestamped fragment note linking to today's daily note (`[[2026-02-16]]`)
- *Task* → creates a card on `apps/My tasks.md` under **Todo**
- *Idea* → creates a note in `concepts/` with `type: idea`
- *Link* → creates a `type: bookmark` note in `inbox/`

This is the human's primary capture surface. Pin it to a sidebar tab. It replaces direct browsing of `inbox/` — the agent ingests from inbox behind the scenes.

**Cross-device drops.** Quick capture doubles as a drop zone. A `## Drops` section below the code block accepts raw items from any device (Siri Shortcut, share sheet, manual append). Format: `- [ ] text or URL` — one item per line. On next note open, the UI auto-processes each unchecked drop (URLs → bookmarks in `inbox/`, text → timestamped fragments linking to today's daily note), checks it off, and surfaces it in the unprocessed trail. The heartbeat also scans for unchecked drops during triage. This makes Quick capture the single capture surface across all devices — no need to target `inbox/` directly.

---

## 6. Create starter bases

Create one high-leverage `.base` file:

1. **`superpaper/sources/Bookmarks.base`** — use the exact YAML from [[rendering-guide.md#Bases — vault usage patterns|the Bases section]]. This is the human's browsable library and the showcase for what Bases can do: computed columns (`⏳ Days`, `💡 Insights`, `🏷 Tagged`), contextual filtering via `this`, multiple views (Unprocessed, Library, Stale, Connected), and inline-editable properties.

Embed `![[Bookmarks.base#Library]]` in the Knowledge map under a `## Bookmarks` section. Other bases (Knowledge health, People, Questions, Experiments etc) emerge as content grows — don't pre-create them.

---

## 7. Create a first knowledge note

Write an atomic concept note together using the [[knowledge-protocol.md#Knowledge note template|knowledge note template]] — one idea the human cares about, typed relations, links to future notes that don't exist yet. Explain the [[../SKILL.md#How to write knowledge (trigger-based)|write protocol]] and why fewer, denser, better-linked notes win.

---

## 8. Set up mobile bookmarking

Help the human set up a Siri Shortcut (iOS) and/or share sheet action that appends `- [ ] URL or text` to the `## Drops` section of `daily/Quick capture.md`. Walk through building it step by step. The UI and heartbeat handle the rest.

---

## 9. Add CSS polish

Create `.obsidian/snippets/agent-ui.css` with theme-aware styles for code-button outputs, callouts, and artifact UIs. Enable it in Settings → Appearance → CSS snippets.

---

## 10. SUPER IMPORTANT: Verify environment from humans

Final check before declaring setup complete:

1. **File Explorer++ hiding:** Ask the human: "Can you see any `AGENTS.md` files in your file explorer sidebar?" If yes, the hide filters aren't working — debug `.obsidian/plugins/file-explorer-plus/data.json` and reload. Also confirm `_templates` and `inbox` are hidden.
2. **File Explorer++ pinning:** Confirm `superpaper/apps/`, `personal/`, `projects/` are pinned. Confirm `My tasks.md` and `.base` files are pinned. Knowledge map must never be pinned.
3. **Pinned tabs:** Confirm Quick Capture, Meta dashboard (if created), and daily note are pinned or in sidebar tabs.
4. **Core plugins:** Spot-check that Bases, Properties, Backlinks, Outgoing links, and Tags are all enabled and configured as expected.
5. **Community plugins:** Confirm Dataview, Templater, CodeScript Toolkit, Calendar, Kanban, and File Explorer++ are installed, enabled, and configured as expected.

---

## 11. Get to know the human

By now the vault is alive and the human has seen what it can do. Take a breath. Have an easy, curious conversation — the kind you'd have with someone interesting you just met at a meetup. What are they working on? What do they nerd out about? What's on their mind lately? Let it wander.

Capture what you learn as notes in `meta/` — preferences, alignment observations, taste, risk profile. Follow the [[knowledge-protocol.md#Meta — the self-referential layer|meta layer]] protocol and the [[../SKILL.md#Growth orientation|growth orientation]] principles. This seeds the self-referential layer that makes everything else improve.

---

## 12. Demo the full system

Give the human a prompt that exercises everything: transclusion or iframe embeds, callouts for [[../SKILL.md#Progressive disclosure — reducing cognitive overhead|progressive disclosure]], knowledge links, a Mermaid diagram or [[rendering-guide.md#Dynamic queries (Dataview plugin)|Dataview query]], and a small [[rendering-guide.md#TypeScript artifacts (CodeScript Toolkit)|TypeScript artifact]]. Walk through the result, pointing out how each primitive works.

**Never assume hiding/pinning using the File Explorer++ works from config alone.** The human's visual confirmation is the only proof. Don't say "we're 100% set up" until they confirm.

---

## Throughout setup

- Explain each step before doing it — why it matters, what it enables.
- One step at a time. Wait for confirmation before proceeding.
- You create the files yourself — don't direct the human to do it manually.
- Signpost progress: "Step 5 of 10 — we're halfway."
