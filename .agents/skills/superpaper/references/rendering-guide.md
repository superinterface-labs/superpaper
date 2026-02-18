# Rendering guide

Full rendering toolkit for [[../SKILL.md|Superpaper]]: Dataview queries, CodeScript Toolkit artifacts, HTML/CSS, frontmatter/properties, block IDs, canvas, tags, filenames, Obsidian URI, workspace/navigation, task management, and plugin configuration.

**Cross-references:** This file is the rendering companion to [[../SKILL.md#Knowledge — your persistent knowledge graph|the knowledge protocol]]. Templates and note types live in [[knowledge-protocol.md]]. Folder routing lives in [[vault-structure.md]]. Bootstrap setup references this file for [[#Required plugins|plugins]] and [[#Bases — vault usage patterns|Bases syntax]]. Interaction principles (including [[../SKILL.md#Principles|interactive-first]]) govern how you use these tools.

For Obsidian Flavored Markdown syntax (formatting, wikilinks, embeds, callouts, math, Mermaid) → see the `obsidian-markdown` skill.
For `.base` file syntax → see the `obsidian-bases` skill.
For JSON Canvas syntax → see the `json-canvas` skill.
For CLI commands → see the `obsidian-cli` skill.

---

## Dynamic queries (Dataview plugin)

### DQL — declarative queries

Live tables and lists that auto-update as notes change.

````markdown
```dataview
TABLE type, created, tags
FROM "superpaper/concepts"
WHERE type = "permanent"
SORT created DESC
LIMIT 20
```
````

````markdown
```dataview
LIST
FROM #domains/design
WHERE type = "permanent"
SORT file.name ASC
```
````

````markdown
```dataview
TASK
FROM "superpaper/projects"
WHERE !completed
```
````

**Key operators:** `FROM` (folder/tag), `WHERE` (filter), `SORT`, `GROUP BY`, `FLATTEN`, `LIMIT`. Access frontmatter fields directly by name. Access file metadata via `file.name`, `file.ctime`, `file.mtime`, `file.size`, `file.tags`, `file.link`.

### Native query blocks

Obsidian has a built-in `query` code block that embeds live search results — no plugins needed:

````markdown
```query
tag:#domains/ai path:superpaper/concepts
```
````

Simpler than Dataview for basic filtering. Supports the same search syntax as Obsidian's search bar (tag, path, file, section, line operators). Use Dataview when you need tables, sorting, or computed fields.

### DataviewJS — full JavaScript rendering

When DQL isn't enough, use JavaScript for complete control:

````markdown
```dataviewjs
const notes = dv.pages('"superpaper/concepts"')
  .where(p => p.type === "permanent")
  .sort(p => p.created, 'desc');

dv.table(
  ["Note", "Type", "Confidence", "Created"],
  notes.map(p => [p.file.link, p.type, p.confidence, p.created])
);
```
````

````markdown
```dataviewjs
// Render a custom HTML element
const el = dv.el("div", "");
el.innerHTML = `
  <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:8px;">
    <div style="background:#e8f5e9; padding:12px; border-radius:8px;">
      <strong>Active</strong><br>12 notes
    </div>
    <div style="background:#fff3e0; padding:12px; border-radius:8px;">
      <strong>Fleeting</strong><br>5 notes
    </div>
    <div style="background:#e3f2fd; padding:12px; border-radius:8px;">
      <strong>Permanent</strong><br>34 notes
    </div>
  </div>
`;
```
````

### Bases — vault usage patterns

For the full `.base` YAML syntax, filters, formulas, and function reference → see the `obsidian-bases` skill.

Turn any set of notes into a filterable, sortable, editable database. Data lives in [[#Frontmatter (YAML properties)|frontmatter properties]] — no separate database. Bases are `.base` files (YAML) that define filters, formulas, display names, and multiple views. Every [[knowledge-protocol.md#Categories — multi-belonging without folders|category]] gets a base as part of the category trinity (template + base + category page).

**Create:** Right-click folder → New base, or Command Palette → "Bases: Create new base".

**Embed in any note:**
```markdown
![[My base.base]]
![[My base.base#View Name]]
```

**Bookmarks base example:**
```yaml
filters:
  and:
    - 'type == "bookmark"'                                # ← All views filter: only bookmarks
formulas:
  days_waiting: "dateDiff(now(), date(created), 'days')"   # ← Computed column: age in days
  insight_count: "file.backlinks.length"                    # ← How many notes cite this bookmark
  has_tags: "list(tags).length > 1"                         # ← list() wraps safely even if empty
  related: "file.hasLink(this.file)"                        # ← `this` = whatever note you're viewing
display:
  formula.days_waiting: "⏳ Days"                           # ← Rename columns for humans
  formula.insight_count: "💡 Insights"
  formula.has_tags: "🏷 Tagged"
views:
  - type: table
    name: "Unprocessed"                                    # ← View 1: triage queue
    filters: 'status != "processed"'                       # ← Per-view filter (stacks on All views)
    order: [file.link, url, tags, formula.days_waiting]
    limit: 30
  - type: table
    name: "Library"                                        # ← View 2: everything, newest first
    order: [file.link, url, tags, formula.insight_count, created]
    limit: 50
  - type: table
    name: "Stale"                                          # ← View 3: needs attention
    filters: 'formula.days_waiting > 7 && status == "unprocessed"'
    order: [file.link, url, formula.days_waiting]
  - type: table
    name: "Connected"                                      # ← View 4: contextual — changes per note
    filters: 'formula.related'                             # ← Only bookmarks linked to current note
    order: [file.link, tags, formula.insight_count]
```

**Key primitives:**

| Primitive | Example | What it does |
|-----------|---------|-------------|
| `inFolder(file.file, "path")` | `inFolder(file.file, "superpaper/sources")` | Notes in a folder |
| `taggedWith(file.file, "tag")` | `taggedWith(file.file, "domains/ai")` | Notes with a specific tag |
| `linksTo(file.file, "Note")` | `linksTo(file.file, "AI safety")` | Notes that link to a specific note |
| `file.hasLink(this.file)` | filter: `file.hasLink(this.file)` | Backlinks to the currently focused note |
| `this.file.hasLink(file)` | filter: `this.file.hasLink(file)` | Outlinks from the currently focused note |
| `file.backlinks` / `file.links` | `file.backlinks.length` | All backlinks / outlinks as lists |
| `dateDiff(now(), date(field), 'days')` | formula: `dateDiff(now(), date(created), 'days')` | Days since a date field |
| `list(prop).map(...)` / `.filter(...)` | `list(tags).filter(value.contains("domains"))` | Safe iteration over list properties |
| `formula["name"]` | `formula["days_waiting"] > 7` | Reuse a formula in filters or other formulas |
| `note["prop-name"]` | `note["last-contact"]` | Access properties with dashes |
| `if(cond, then, else)` | `if(status == "processed", "✅", "⏳")` | Conditional values |
| `/regex/.matches(field)` | `/\d{4}/.matches(file.name)` | Regex matching |
| `.toString()` / `.contains()` / `.slice()` | `url.toString().contains("arxiv")` | String operations |
| `.sort()` / `.unique()` / `.flat()` | `list(tags).sort().unique()` | List manipulation |
| `value.asFile()` | `file.backlinks.map(value.asFile())` | Convert link to file object |

**`this` — the self-referential keyword.** In an embedded base, `this` refers to the note containing the embed. In the sidebar, `this` refers to the currently active note. This enables contextual, dynamic views that change based on what you're looking at.

**View types:**

| Type | Use for | Key properties |
|------|---------|---------------|
| `table` | Default — sortable rows and columns | `order`, `sort`, `limit`, `columnSize` |
| `cards` | Visual browsing — images, covers, media | `image` (property or formula for the image source) |
| `map` | Spatial browsing — places, trips, events | `coordinates`, `defaultZoom`, `markerIcon`, `markerColor` |

**Cards example** — browse books/movies with covers:
```yaml
views:
  - type: cards
    name: Library
    order: [file.name, rating, genre]
    sort:
      - property: rating
        direction: DESC
    image: cover
```

**Map example** — places with typed markers:
```yaml
formulas:
  Icon: list(type)[0].asFile().properties.icon
  Color: list(type)[0].asFile().properties.color
views:
  - type: map
    name: Map
    coordinates: note.coordinates
    markerIcon: formula.Icon
    markerColor: formula.Color
    defaultZoom: 2
```

Type notes (e.g. `[[Restaurant]]`, `[[Museum]]`) carry `icon` and `color` properties so the map computes marker appearance dynamically.

**When to use Bases vs Dataview:**

| Scenario | Use |
|----------|-----|
| Human-facing dashboard, editable properties | **Bases** — native, interactive, inline editing |
| Complex JS rendering, custom HTML output | **DataviewJS** — full programmatic control |
| Simple live query embedded in a note | **Dataview DQL** or **Bases embed** |
| Agent-only auditing in scripts | **Dataview** — easier to query programmatically |

**High-leverage bases for this vault:**

| Base | Location | Purpose |
|------|----------|---------|
| `Meta dashboard.base` | `superpaper/meta/` | Views per dimension (alignment, decision-making, risk-taking, taste). Formula: `dateDiff(now(), date(updated), 'days')` flags stale notes. Filter by author (human vs AI). |
| `Knowledge health.base` | `superpaper/` | Views: orphan notes (backlinks = 0), low-confidence claims, stale fleeting notes (>14 days), unrequited outlinks. The introspect skill in base form. |
| `People.base` | `superpaper/people/` | CRM view — last-contact, role, context. Sortable, inline-editable. Filter by staleness. |
| `Questions.base` | `superpaper/questions/` | Views: open, answered, superseded. Link count shows which questions are pulling the most knowledge. |
| `Bookmarks.base` | `superpaper/sources/` | The human's read-later library. Views: unprocessed (triage), library (browse all), stale (>7 days unprocessed), connected (backlinks to current note via `this`). Formulas: days waiting, insight count, tag coverage. The showcase base — see syntax example above. |
| `Experiments.base` | `superpaper/` | All experiments (personal + project). Views by status: active, completed, abandoned. Track hypothesis → outcome. |
| `Contextual backlinks.base` | sidebar | Filter: `file.hasLink(this.file)`. Drag to sidebar — dynamic backlinks with editable properties for whatever note you're viewing. |
| `Related.base` | sidebar | Computes link overlap + tag overlap between current note and all others. Surfaces structurally related notes *without manual linking*. The automatic connection discovery engine. |
| `Ratings.base` | `superpaper/` | Everything you've ever rated, cross-category. Views: all ratings by recency, recent (last 60 days). "Show me all 7s" returns best books, movies, restaurants, trips in one view. |
| `Map.base` | `superpaper/sources/` | Geo-spatial view of all notes with `coordinates`. Type notes carry `icon` + `color` for marker appearance. Views: global map, location-filtered, type-filtered. |

Don't create all of these at once. Start with **Bookmarks** and **Related** — they're the first bases the human will use daily. Others emerge as content grows. The [[knowledge-protocol.md#Knowledge map|Knowledge map]] embeds key bases for a browsable entry point.

---

## TypeScript artifacts (CodeScript Toolkit)

**Your most powerful rendering tool.** Create rich, interactive UIs that live inside markdown notes. The human sees a working application; the source is a code block. The [[../SKILL.md#Principles|interactive-first principle]] says: prefer building a small throwaway UI over sending a text reply.

**UI as lens, Markdown as source.** Script UIs read from and write to frontmatter, tasks, or structured lists/tables. The raw Markdown must remain understandable without running the script.

### The `code-button` block

````markdown
```code-button
---
caption: Click me
---
// TypeScript or JavaScript runs here
console.log("Hello from inside Obsidian!");
```
````

### Configuration (YAML header)

| Key | Default | Effect |
|-----|---------|--------|
| `isRaw` | `false` | **`true` = invisible execution.** Hides button + code, shows only output. Perfect for UIs. |
| `shouldAutoRun` | `false` | **`true` = runs on note open.** Combined with `isRaw`, creates seamless rendered UIs. |
| `caption` | `(no caption)` | Button label text |
| `shouldAutoOutput` | `true` | Auto-display last evaluated expression |
| `shouldWrapConsole` | `true` | Show `console.log` output in results panel |
| `shouldShowSystemMessages` | `true` | Show system/error messages |

### The context object: `codeButtonContext`

Available inside every code-button block:

| API | What it does |
|-----|-------------|
| `codeButtonContext.container` | The HTML element wrapping the output. Use standard DOM APIs to build UIs. |
| `codeButtonContext.renderMarkdown(md)` | Render a markdown string into the output panel. Supports all Obsidian markdown. |
| `codeButtonContext.insertAfterCodeButtonBlock(text)` | Insert text into the note after this code block |
| `codeButtonContext.insertBeforeCodeButtonBlock(text)` | Insert text before this code block |
| `codeButtonContext.replaceCodeButtonBlock(text)` | Replace this entire code block with text |
| `codeButtonContext.removeCodeButtonBlock()` | Remove this code block from the note |
| `codeButtonContext.registerTempPlugin(PluginClass)` | Register a temporary Obsidian plugin for prototyping |

### Pattern library

#### Seamless auto-rendering UI

The human opens the note and sees a working UI — no button, no code visible.

````markdown
```code-button
---
isRaw: true
shouldAutoRun: true
---
const el = codeButtonContext.container;
el.style.cssText = 'font-family: system-ui; padding: 16px;';

// Build a daily habit tracker
const habits = ['Meditate', 'Exercise', 'Read 30 min', 'Journal'];
const today = new Date().toISOString().split('T')[0];

const header = el.createEl('h3', { text: `Habits — ${today}` });
header.style.cssText = 'margin: 0 0 12px 0; font-size: 1.1em;';

for (const habit of habits) {
  const row = el.createDiv();
  row.style.cssText = 'display:flex; align-items:center; gap:10px; padding:6px 0; border-bottom:1px solid rgba(128,128,128,0.15);';
  const cb = row.createEl('input');
  cb.type = 'checkbox';
  cb.style.cssText = 'width:18px; height:18px; cursor:pointer;';
  const label = row.createEl('span', { text: habit });
  label.style.cssText = 'font-size: 0.95em;';
  cb.addEventListener('change', () => {
    label.style.textDecoration = cb.checked ? 'line-through' : 'none';
    label.style.opacity = cb.checked ? '0.5' : '1';
  });
}
```
````

#### Rendered markdown output

````markdown
```code-button
---
isRaw: true
shouldAutoRun: true
---
const pages = await requireAsync('obsidian/app').then(m => m);
// Or simply render rich markdown:
await codeButtonContext.renderMarkdown(`
> [!success] System status
> - **Knowledge notes:** 42 permanent, 8 fleeting
> - **Last consolidation:** 2026-02-09
> - **Graph density:** 3.2 links per note

> [!tip]- Recommended actions
> 1. Promote 3 fleeting notes that survived 7 days
> 2. Link the isolated cluster around [[design-patterns]]
> 3. Archive superseded note on old API
`);
```
````

#### Interactive button that modifies the note

````markdown
```code-button
---
caption: ✏️ Add today's entry
---
const today = new Date().toISOString().split('T')[0];
const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
await codeButtonContext.insertAfterCodeButtonBlock(
  `\n### ${today} at ${time}\n\n- \n`
);
```
````

#### Load reusable TypeScript modules

````markdown
```code-button
---
isRaw: true
shouldAutoRun: true
---
// Load from a dot-folder (hidden from Obsidian's indexer)
const { renderDashboard } = require('./.scripts/dashboard.ts');
renderDashboard(codeButtonContext.container);
```
````

Put shared scripts in `.scripts/` — Obsidian ignores dot-folders, but CodeScript Toolkit can `require()` them. Full TypeScript syntax works (type annotations are stripped at runtime).

#### Building heavier apps

For anything beyond vanilla TS (React, complex state, large dependencies):

1. **Bundle outside Obsidian** — build with Vite/esbuild into one JS bundle, drop output into `superpaper/apps/<name>/dist/`
2. **Lazy-load inside Obsidian** — use `requireAsync()` with cache control:
   ```js
   const app = await requireAsync('./superpaper/apps/myapp/dist/bundle.js', { cacheInvalidationMode: 'always' });
   app.mount(codeButtonContext.container);
   ```
   Cache modes: `always` (dev), `whenPossible` (default), `never` (stable releases). ESM works fine.
3. **Mount into a single root** — one `codeButtonContext.container` per block. Return a cleanup function and call it before remounting.

**Performance rules (keep Obsidian fast):**
- Lazy-load everything — never import heavy deps at top-level
- One mount root per block — avoid scattering listeners across the DOM
- Dispose intervals/listeners on rerender/unload — memory leaks in Electron hurt
- Push heavy compute to a Web Worker or a local service

#### Persistence: files, not localStorage

**Every tracker, log, and app must be backed by markdown files or [[#Frontmatter (YAML properties)|frontmatter]]** — never localStorage alone. The human must be able to read history without running code. Patterns:
- **Frontmatter fields** — store state in the note's own YAML (`streak: 5`, `last_run: 2026-02-12`)
- **Append to log files** — `personal/journal/*.log.md` for time-series data (mood, habits, workouts)
- **One file per entry** — `inbox/log/mmm-yy/dd/<task>.md` for granular task tracking

localStorage is acceptable only as a UI cache for the current session. The source of truth is always a file.

#### Invocable scripts (command palette)

Create `.scripts/my-command.ts`:
```typescript
import type { App } from 'obsidian';

export async function invoke(app: App): Promise<void> {
  const file = app.workspace.getActiveFile();
  if (!file) return;
  // Do something with the active file
  console.log(`Processing: ${file.path}`);
}
```

Configure the scripts folder in CodeScript Toolkit settings → appears in Cmd+P as `CodeScript Toolkit: Invoke script: my-command`.

#### Startup script

Runs every time Obsidian opens. Configure in plugin settings.

```typescript
import type { App } from 'obsidian';

export async function invoke(app: App): Promise<void> {
  console.log('Vault loaded. Agent OS ready.');
}

export async function cleanup(app: App): Promise<void> {
  console.log('Shutting down.');
}
```

### Artifact ideas

| Artifact | Implementation |
|----------|---------------|
| Daily habit tracker | `code-button` with checkboxes, file-backed via frontmatter or daily log |
| Reading progress dashboard | `dataviewjs` querying source-notes by status |
| Knowledge graph stats | `dataviewjs` counting note types, link density, orphans |
| Quick capture form | `code-button` that creates a new note via Obsidian API |
| Standup template generator | `code-button` that pulls today's tasks and yesterday's shipped items |
| Pomodoro timer | `code-button` with `setInterval`, visual countdown |
| Spaced repetition queue | `dataviewjs` querying notes by last-reviewed date |
| Mood/energy tracker | `code-button` with slider inputs, appends to daily log |
| Budget / expense tracker | `code-button` with form inputs, file-backed via frontmatter or log |
| Meal planner / recipe scaler | `code-button` with ingredient math, links to health notes |
| Workout log | `code-button` with exercise sets/reps, trends over time |
| Decision matrix | `code-button` with weighted criteria, visual comparison |
| Flashcard reviewer | `code-button` with spaced repetition, pulls from knowledge notes |

---

## My tasks (`apps/My tasks.md`)

A Kanban board (Obsidian Kanban plugin) with four lanes: **Todo**, **In progress**, **Done**, **Blocked**. This is the agent's task queue. Filed per [[vault-structure.md#What goes where|what-goes-where routing]]. Configure with `prepend-archive-separator`, `prepend-archive-date`, and — critically — no submit button: cards save on every keystroke (`new-card-insertion-method: obsidian-default`). The board must feel like a text file, not a form.

**How it works:**
- The human or agent adds cards with a one-line description. Each card can link to a project, note, or inbox item.
- The **heartbeat skill** reads this board on every cycle. It picks up Todo items, works them (research, build, organize, process), moves them to In progress → Done, and logs execution to `inbox/log/`.
- Blocked items get a comment explaining why. The agent escalates to the human during the next interaction.

**Every card MUST link to its log.** When a task ships, append `→ [[inbox/log/mmm-yy/dd/task-slug]]` to the card so the human can trace what happened without leaving the board.

**Task lifecycle:**

```
1. CAPTURE   → Card added to Todo (link to inbox item or inline description)
2. PICK UP   → Move to In Progress — agent begins work
3. SHIP      → Move to Done — append @{YYYY-MM-DD} + link to log entry
4. ARCHIVE   → After 7 days in Done — heartbeat removes card, log persists
5. BLOCKED   → Move to Blocked — comment explains why, escalate to human
```

**Task execution logs** live in `inbox/log/mmm-yy/dd/<task-slug>.md`:

```markdown
---
type: log
task: "[[apps/My tasks]]#card-name"
status: done
created: YYYY-MM-DD
---

## What was done
Brief summary.

## Evidence
Links to created/updated notes.

## What remains
Next steps or "complete".
```

The heartbeat links task board activity summaries to the agent's daily log (`[[inbox/log/YYYY-MM-DD]]`), not the human's daily note. Over time, `inbox/log/` becomes a complete audit trail of everything the agents did and why. The human's `daily/` stays clean — only their own fragments and life events surface in backlinks.

---

## HTML and CSS

Obsidian renders inline HTML in reading mode. Use for custom layouts when markdown isn't enough.

```html
<div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:12px 0;">
  <div style="background:var(--background-secondary); padding:16px; border-radius:8px;">
    <strong>Column A</strong><br>Content here
  </div>
  <div style="background:var(--background-secondary); padding:16px; border-radius:8px;">
    <strong>Column B</strong><br>Content here
  </div>
</div>
```

Use Obsidian CSS variables (`var(--background-primary)`, `var(--text-normal)`, `var(--interactive-accent)`, etc.) for theme-aware styling.

### CSS snippets

Place `.css` files in `.obsidian/snippets/` and enable in Settings → Appearance → CSS snippets. Obsidian exposes its entire DOM — you can target anything.

| Pattern | Example |
|---------|---------|
| Tag-based styling | `.tag[href="#important"] { color: var(--color-red); }` — visual semantics |
| Folder-specific looks | `.nav-file[data-path^="journal"] { font-style: italic; }` — visual grouping |
| Custom callout types | `[data-callout="trace"] { --callout-color: ... }` — agent-specific callouts |
| Artifact typography | `.code-button-output { font-family: system-ui; }` — polished UIs |
| cssclasses per note | `cssclasses: [wide, dashboard]` in frontmatter → scoped styles for that note |

Use Obsidian CSS variables (`var(--background-primary)`, `var(--text-normal)`, `var(--interactive-accent)`) for theme-aware styling. The `agent-ui.css` snippet handles all agent-facing visual polish.

---

## Frontmatter (YAML properties)

Properties are collapsed by default (`propertiesInDocument: hidden` in `.obsidian/app.json`). Every note can have structured metadata. The [[knowledge-protocol.md#Knowledge note template|knowledge note template]] shows the full property schema. [[knowledge-protocol.md#Reference templates — composable by design|Reference templates]] (Book, Movie, Place, etc.) define category-specific properties.

```yaml
---
type: permanent
source: "https://example.com"
confidence: 0.8
tags:
  - domains/design
  - topics/memory
aliases:
  - Alternate name
cssclasses:
  - soft-embed
created: 2026-02-10
---
```

Default properties: `tags` (list), `aliases` (list), `cssclasses` (list).

**Aliases solve vocabulary drift.** `aliases: [AI, Artificial Intelligence, ML]` means the same concept is findable regardless of phrasing. Aliases power `[[` autocomplete, enable unlinked mention detection, and keep the graph coherent when different notes use different terms for the same idea. Every knowledge note should have 2–4.

Property types: text, list, number, checkbox (`true`/`false`), date (`YYYY-MM-DD`), date & time (`YYYY-MM-DDTHH:MM:SS`).

Wikilinks inside properties must be quoted:
```yaml
link: "[[Some note]]"
links: ["[[A]]", "[[B]]"]
```

Queryable by Dataview, visible in Obsidian's Properties view, machine-readable by agents.

**Property design rules:**

- **Default to `list` over `text`** if there's any chance a property might contain more than one value in the future. Changing type later is painful; starting as list is free.
- **Short names.** `start` not `start-date`. `loc` not `location-name`. Faster to type, less noise in frontmatter.
- **Reuse across categories.** `genre` is shared across books, movies, shows, and albums — one query surfaces all sci-fi media. `author` works for books, articles, and recipes. `rating` is universal. Design properties so they cross category boundaries.
- **Five property families** cover most notes:

| Family | Properties | Used by |
|--------|-----------|---------|
| Dates | `created`, `start`, `end`, `last`, `published` | Everything |
| People | `author`, `director`, `artist`, `cast`, `host`, `guests`, `via` | Media, sources, events |
| Themes | `genre`, `type`, `topics`, `categories` | Cross-cutting retrieval |
| Locations | `loc`, `coordinates` | Places, trips, events |
| Ratings | `rating` (1–7) | Anything worth evaluating |

- **Composable templates = composable properties.** Since templates are mixins, property sets merge naturally. A note with both Person and Author templates gets both property sets without conflict.

---

## Block IDs

Append `^id` to any paragraph to make it linkable:

```markdown
This is an important insight. ^key-insight
```

For structured blocks (lists, quotes, callouts, tables), place the `^id` on its own line after the block with blank lines around it:

```markdown
- item one
- item two

^my-list-id
```

Now `[[note#^key-insight]]` links to — and `![[note#^key-insight]]` embeds — just that block.

> [!info] Block references are Obsidian-specific and not portable to other Markdown renderers.

---

## Canvas

`.canvas` files are spatial thinking boards — nodes (notes, images, text cards) arranged freely on an infinite canvas with edges between them. For the JSON Canvas file format → see the `json-canvas` skill.

| Use canvas for | Why spatial beats linear |
|----------------|------------------------|
| Brainstorming | Clustering reveals groupings text hides |
| Relationship mapping | Visible edges make dependencies explicit |
| Project kickoffs | Lay out scope, unknowns, and connections before writing |
| Argument mapping | Place claims, evidence, and objections spatially |

Create canvases alongside the work they support. Link to them from notes: `[[Project kickoff.canvas]]`. When a canvas stabilizes, distill it into linked atomic notes — the canvas is the sketch, the notes are the architecture.

---

## Tags

`#tag` and `#tag/nested/subtag`. Searchable, filterable by Dataview. Use for cross-cutting concerns that span folders.

**Three namespaces** — all lowercase, **always plural**, kebab-case:

| Namespace | Purpose | Examples |
|-----------|---------|----------|
| `#domains/` | Field or life area | `#domains/ai`, `#domains/health`, `#domains/finance` |
| `#topics/` | Specific concept | `#topics/memory`, `#topics/feedback-loops`, `#topics/sleep` |
| `#status/` | Lifecycle state | `#status/active`, `#status/paused`, `#status/review` |

**Always pluralize tags and categories.** This eliminates decision fatigue — you never wonder "is it `#domains/book` or `#domains/books`?" The answer is always plural. One rule, hundreds of future decisions collapsed.

**Conventions:**
- Frontmatter `tags:` for file-level tags. Inline `#tag` for block-level context.
- Nest when hierarchy aids retrieval — `#domains/ai/nlp` is useful; four levels deep is not.
- Searching `tag:#domains/ai` returns all subtags beneath it ([docs](https://help.obsidian.md/tags)).
- Don't duplicate what `type`, `kind`, or folders already express — tags are for *retrieval*, not classification.

---

## Filenames

Use natural, human-readable titles with spaces: `Knowledge map.md`, not `knowledge-map.md`. Dashed names only for code and scripts. Avoid characters that break links: `# | ^ : %% [[ ]]`

**Don't repeat what the folder already says.** A note in `sources/` is titled `Design of Everyday Things.md`, not `Source – Design of Everyday Things.md`. The folder *is* the type.

In visible text (headings, prose, callouts), prefer spaces over dashes. Write "part of", not "part-of". Frontmatter property values may use dashes for structured data.

---

## Obsidian URI (automation surface)

Open, create, or search notes programmatically:

| URI | Effect |
|-----|--------|
| `obsidian://open?vault=V&file=path%2Fnote` | Open a note |
| `obsidian://new?vault=V&file=name&content=text` | Create a note (supports `append` and `prepend` params) |
| `obsidian://daily` | Open today's daily note (requires Daily notes plugin) |
| `obsidian://search?vault=V&query=term` | Open search |

URI-encode values (`/` → `%2F`, space → `%20`, `#` → `%23`, `^` → `%5E`). Supports `x-success` / `x-error` callbacks for integrations.

Use URIs to make Obsidian the hub: paste `obsidian://open?vault=...&file=...` links into calendar events, task managers, emails, or scripts. Clicking from anywhere on the system jumps straight to the right note. The vault becomes the brain that other tools point to.

---

## Workspace and navigation

### Panes and splits

Obsidian's interface is an IDE for thought. Always help the user to set up the views to work with multiple notes simultaneously — source on the left, writing on the right, graph at the bottom and so on.

**Examples of Saved workspaces** (core plugin) snapshot a pane arrangement and restore it instantly:

| Workspace | Layout |
|-----------|--------|
| Research | Source note + writing pane + graph view |
| Review | Knowledge map + backlinks panel |
| Daily | Today's daily note + inbox + task query |
| Build | Project file + artifact preview |

Suggest workspace setups when context demands it. The human shouldn't manually arrange panes for recurring work.

### Command palette (`Cmd+P`)

Every action — core, plugin, or custom — lives in the command palette. It is the universal action surface. Invocable scripts (`.scripts/`) appear here too. The human should reach for `Cmd+P` before reaching for a menu. When creating invocable scripts, name them so they're findable by intent (e.g. `capture-to-inbox`, `promote-fleeting-note`). Guide the user to use `Cmd+P` for regularly useful actions.

### Hotkeys

Any command can be bound to a keyboard shortcut. The goal is flow state — the tool disappears and it's just the human and the ideas. Suggest bindings for frequent actions like:

- **Daily note** — one key to open today
- **Quick capture** — one key to append to inbox
- **Template insert** — one key per template type
- **Toggle reading/edit view** — instant context switch
- **Split pane** — spatial arrangement without the mouse

---

## Required plugins

| Plugin | CLI id |
|--------|--------|
| CodeScript Toolkit | `fix-require-modules` |
| Dataview | `dataview` |
| Templater | `templater-obsidian` |
| Calendar | `calendar` |
| Kanban | `obsidian-kanban` |
| File Explorer++ | `file-explorer-plus` |
| Bases | *(core plugin — enable in Settings → Core plugins)* |

Install all community plugins: `obsidian plugin:install id=<id> enable` for each row above. Enable Bases and Properties in Settings → Core plugins. Then configure to match vault conventions (template folder → `_templates/`, scripts → `.scripts/`, daily notes → `daily/`, Dataview JS queries → enabled, etc.). Look up each plugin's latest docs online for its settings schema.

**File Explorer++:** Write `.obsidian/plugins/file-explorer-plus/data.json` with:

**Read the plugin's source code or existing `data.json` first** to confirm the exact config schema (e.g. `hideFilters` and `pinFilters` are objects with `active`, `paths`, `tags`, and `frontMatter` arrays — not flat arrays). Never guess the shape.

*Hide filters* — keep infrastructure out of the file explorer:
- Hide `_templates` (wildcard, `FILES_AND_DIRECTORIES`) — accessed via Templater, not browsed.
- Hide `_attachments` (wildcard, `FILES_AND_DIRECTORIES`) — media storage, not browsed.
- Hide `AGENTS|CLAUDE` (regex, `FILES_AND_DIRECTORIES`) — matches all `AGENTS.md` and `CLAUDE.md` files across the vault.
- Hide `inbox` (wildcard, `FILES_AND_DIRECTORIES`) — agent-managed; humans capture via Quick Capture UI, not by browsing inbox.

*Pin to top* — the things the human reaches for daily:
- **Folders:** `superpaper/`, `apps/`, `personal/`, `projects/`
- **Files:** central files like `My tasks.md`, every `.base` file (e.g. `Bookmarks.base`) [knowledge map is an exception it shouldn't be pinned]

**After any plugin install, config change, or `.obsidian/` edit:** reload Obsidian with `obsidian reload` so changes take effect. Never assume a config change is live without reloading.

**Graph View color groups** (configure in `.obsidian/graph.json`):
- `path:superpaper/concepts` green, `path:superpaper/people` teal, `path:superpaper/questions` cyan, `path:superpaper/personal` purple, `path:superpaper/sources` amber, `path:superpaper/meta` gold, `path:superpaper/projects` blue, `path:daily` gray, `[type:claim]` orange, `[status:blocked]` red.
