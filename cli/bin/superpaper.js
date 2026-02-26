#!/usr/bin/env node

import { execFileSync, execSync } from "node:child_process";
import { existsSync, mkdirSync, copyFileSync, readFileSync, writeFileSync, readdirSync, statSync, rmSync } from "node:fs";
import { join, resolve, basename, relative } from "node:path";
import { createInterface } from "node:readline";

const REPO_URL = "https://github.com/superinterface-labs/superpaper.git";
const COMMUNITY_SKILLS_URL = "https://github.com/kepano/obsidian-skills.git";

const PROTOCOL_OPEN_TAG = "<superpaper-protocol>";
const PROTOCOL_CLOSE_TAG = "</superpaper-protocol>";

function extractProtocolBlock(fileContent) {
  const openIdx = fileContent.indexOf(PROTOCOL_OPEN_TAG);
  const closeIdx = fileContent.indexOf(PROTOCOL_CLOSE_TAG);
  if (openIdx === -1 || closeIdx === -1) return null;
  return fileContent.slice(openIdx, closeIdx + PROTOCOL_CLOSE_TAG.length);
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function log(msg) { console.log(`  ${msg}`); }
function success(msg) { console.log(`  ✓ ${msg}`); }
function warn(msg) { console.log(`  ⚠ ${msg}`); }
function conflict(msg) { console.log(`  ↔ ${msg}`); }
function header(msg) { console.log(`\n  ${"─".repeat(50)}\n  ${msg}\n  ${"─".repeat(50)}`); }

function ask(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(`  ${question} `, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// Tracks every file that was saved as .new instead of overwriting
const conflicts = [];

function safeCopyFile(srcPath, destPath, vaultDir) {
  if (!existsSync(destPath)) {
    copyFileSync(srcPath, destPath);
    return "created";
  }
  // File exists — compare contents before flagging as conflict
  const existingContent = readFileSync(destPath);
  const incomingContent = readFileSync(srcPath);
  if (existingContent.equals(incomingContent)) {
    return "identical";
  }
  const newPath = destPath + ".new";
  copyFileSync(srcPath, newPath);
  conflicts.push({
    existing: relative(vaultDir, destPath),
    incoming: relative(vaultDir, newPath),
  });
  return "conflict";
}

function copyDirRecursive(src, dest, vaultDir) {
  if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    if (statSync(srcPath).isDirectory()) {
      copyDirRecursive(srcPath, destPath, vaultDir);
    } else {
      safeCopyFile(srcPath, destPath, vaultDir);
    }
  }
}

function gitCloneSparse(url, tmpDir, paths) {
  execFileSync("git", ["clone", "--no-checkout", "--filter=blob:none", url, tmpDir], { stdio: "pipe" });
  execFileSync("git", ["sparse-checkout", "set", ...paths], { cwd: tmpDir, stdio: "pipe" });
  execFileSync("git", ["checkout"], { cwd: tmpDir, stdio: "pipe" });
}

function generateMergePrompt(conflicts, vaultDir) {
  const date = new Date().toISOString().slice(0, 10);
  const fileList = conflicts.map(c =>
    `| \`${c.existing}\` | \`${c.incoming}\` |`
  ).join("\n");

  return `---
created: ${date}
type: system
created-by: ai
---

# Superpaper Update — Merge Required

\`npx superpaper init\` found **${conflicts.length} file(s)** that already exist in your vault. The updated versions were saved with a \`.new\` suffix so nothing was overwritten.

## Files to merge

| Your file (current) | Updated version (.new) |
|---|---|
${fileList}

---

## What to do

Copy-paste the prompt below into your AI agent (Claude, ChatGPT, etc.) to resolve these merges safely.

---

### Prompt — paste this into your AI agent

\`\`\`
I just ran \`npx superpaper init\` to update my Superpaper vault and there are ${conflicts.length} file(s) where the updated version was saved as a .new file because my existing file was preserved. I need your help merging them.

For each pair below, do the following:
1. Read BOTH files — my current version and the .new version.
2. Identify what changed in the .new version (new sections, updated instructions, removed content, structural changes).
3. Explain each significant change to me in plain language — what it does, why it matters, and whether it could affect my existing customizations.
4. Propose a merged version that:
   - Preserves ALL my personal customizations, preferences, and vault-specific content
   - Incorporates the new protocol updates, instructions, and structural improvements
   - Never removes anything I added unless it directly conflicts with a new feature
5. Show me the proposed changes and wait for my approval before applying them.
6. After I approve, apply the merge and delete the .new file.

Files to merge:
${conflicts.map(c => `- ${c.existing} ← ${c.incoming}`).join("\n")}

**Special case — AGENTS.md:** If AGENTS.md is in the list above, the .new file contains ONLY the updated \`<superpaper-protocol>...</superpaper-protocol>\` block, not a full AGENTS.md replacement. To merge it:
1. Read the new protocol block from AGENTS.md.new
2. Compare it to the existing \`<superpaper-protocol>...</superpaper-protocol>\` block in AGENTS.md
3. Show me what changed between the old and new protocol blocks
4. Replace the old block with the new one, preserving everything OUTSIDE the tags (my own content above/below the protocol block)
5. If I customized anything INSIDE the protocol block (e.g. personal rules), carry those customizations into the new block where they still make sense
6. Delete AGENTS.md.new after merging

After merging all files, do a **protocol reindex sweep**:
- Scan my vault for any notes, templates, bases, or skill files that reference outdated conventions from the previous version.
- Check for stale folder references, renamed properties, deprecated patterns, or instructions that conflict with the updated protocol.
- If the sweep is large (50+ files to review), tell me the scope first and ask whether I want to proceed or do it in batches.
- For each issue found, explain what changed and propose the minimal fix. Wait for my approval before editing.

Important rules:
- NEVER modify my files without showing me what will change first.
- NEVER delete my customizations, personal rules, or vault-specific settings.
- If you're unsure whether something is my customization or a default, ask me.
- Treat my AGENTS.md, .obsidian/types.json, and any notes I wrote as sacred — merge INTO them, never replace them.
\`\`\`

---

After your agent resolves all merges and completes the reindex sweep, you can delete this file.
`;
}

// ── Mode detection ───────────────────────────────────────────────────────────

function detectMode(vaultDir) {
  const hasSuperpaperSkill = existsSync(join(vaultDir, ".agents", "skills", "superpaper", "SKILL.md"));
  const hasAgents = existsSync(join(vaultDir, ".agents"));
  const hasTemplates = existsSync(join(vaultDir, "_templates"));
  const hasCategories = existsSync(join(vaultDir, "superpaper", "categories"));
  const isInstalled = hasAgents && hasTemplates && hasCategories && hasSuperpaperSkill;
  return { isInstalled, hasAgents, hasTemplates, hasCategories, hasSuperpaperSkill };
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function init() {
  const vaultDir = resolve(process.argv[3] || ".");

  const isObsidianVault = existsSync(join(vaultDir, ".obsidian"));
  const { isInstalled } = detectMode(vaultDir);
  const isUpgrade = isInstalled;

  if (isUpgrade) {
    console.log(`
  ╔═══════════════════════════════════════════════╗
  ║             Superpaper  ↑ Update              ║
  ║         An obsidian-native AI workspace       ║
  ╚═══════════════════════════════════════════════╝
  `);
  } else {
    console.log(`
  ╔═══════════════════════════════════════════════╗
  ║                  Superpaper                   ║
  ║         An obsidian-native AI workspace       ║
  ╚═══════════════════════════════════════════════╝
  `);
  }

  const forceFlag = process.argv.includes("--force");

  if (isUpgrade) {
    log("Superpaper is already installed — running in upgrade mode.");
    log("Existing files will NOT be overwritten — conflicts saved as .new files.");
    if (!forceFlag) {
      const proceed = await ask("Continue with upgrade? (y/N)");
      if (proceed.toLowerCase() !== "y") {
        log("Aborted.");
        process.exit(0);
      }
    }
  }

  if (!isObsidianVault) {
    log("This folder isn't an Obsidian vault. Open Obsidian,");
    log("create a new vault pointing to this folder, then re-run: npx superpaper init");
    log("or run the command inside an existing Obsidian vault folder you have");
    process.exit(0);
  }

  log(`Vault: ${vaultDir}`);
  if (isUpgrade) log("Mode: upgrade (fetching latest infrastructure)");

  // ── Step 1: Clone infrastructure from repo ──────────────────────────────

  header(`1/4  ${isUpgrade ? "Updating" : "Fetching"} Superpaper infrastructure`);

  const tmpDir = join(vaultDir, ".superpaper-tmp");
  try {
    if (existsSync(tmpDir)) rmSync(tmpDir, { recursive: true, force: true });

    log("Cloning repo (sparse — only infrastructure files)...");
    gitCloneSparse(REPO_URL, tmpDir, [
      ".agents",
      "_templates",
      "categories",
      "AGENTS.md",
      "obsidian-types-init.json",
    ]);

    // Copy infrastructure directories — never overwrites, saves .new for conflicts
    const infraDirs = [".agents", "_templates"];
    for (const dir of infraDirs) {
      const srcPath = join(tmpDir, dir);
      const destPath = join(vaultDir, dir);
      if (existsSync(srcPath)) {
        copyDirRecursive(srcPath, destPath, vaultDir);
        success(dir);
      } else {
        warn(`${dir} not found in repo — skipping`);
      }
    }

    // Categories go inside superpaper/ (not vault root)
    const categoriesSrc = join(tmpDir, "categories");
    const categoriesDest = join(vaultDir, "superpaper", "categories");
    if (existsSync(categoriesSrc)) {
      mkdirSync(join(vaultDir, "superpaper"), { recursive: true });
      copyDirRecursive(categoriesSrc, categoriesDest, vaultDir);
      success("superpaper/categories");
    } else {
      warn("categories not found in repo — skipping");
    }

    // AGENTS.md — extract protocol block from repo, append or flag conflict
    const agentsSrc = join(tmpDir, "AGENTS.md");
    const agentsDest = join(vaultDir, "AGENTS.md");
    const repoProtocol = existsSync(agentsSrc)
      ? extractProtocolBlock(readFileSync(agentsSrc, "utf-8"))
      : null;

    if (!repoProtocol) {
      warn("Could not extract <superpaper-protocol> from repo AGENTS.md — skipping");
    } else if (!existsSync(agentsDest)) {
      writeFileSync(agentsDest, repoProtocol + "\n");
      success("AGENTS.md (created with superpaper protocol)");
    } else {
      const existing = readFileSync(agentsDest, "utf-8");
      if (existing.includes(PROTOCOL_OPEN_TAG)) {
        const existingProtocol = extractProtocolBlock(existing);
        if (existingProtocol === repoProtocol) {
          log("AGENTS.md superpaper protocol is up to date");
        } else {
          writeFileSync(agentsDest + ".new", repoProtocol + "\n");
          conflicts.push({
            existing: "AGENTS.md (superpaper-protocol block)",
            incoming: "AGENTS.md.new",
          });
          conflict("AGENTS.md protocol block changed → saved update as AGENTS.md.new");
        }
      } else {
        writeFileSync(agentsDest, existing.trimEnd() + "\n\n" + repoProtocol + "\n");
        success("AGENTS.md (appended superpaper protocol)");
      }
    }

    // Property types
    const typesSource = join(tmpDir, "obsidian-types-init.json");
    const typesDest = join(vaultDir, ".obsidian", "types.json");
    if (existsSync(typesSource)) {
      mkdirSync(join(vaultDir, ".obsidian"), { recursive: true });
      const typesResult = safeCopyFile(typesSource, typesDest, vaultDir);
      if (typesResult === "created") {
        success(".obsidian/types.json (property types)");
      } else {
        conflict(".obsidian/types.json exists → saved incoming update as types.json.new");
      }
    }
  } finally {
    if (existsSync(tmpDir)) rmSync(tmpDir, { recursive: true, force: true });
  }

  // ── Step 2: Community skills ────────────────────────────────────────────

  header(`2/4  ${isUpgrade ? "Updating" : "Fetching"} community skills`);

  const tmpSkills = join(vaultDir, ".skills-tmp");
  try {
    if (existsSync(tmpSkills)) rmSync(tmpSkills, { recursive: true, force: true });

    log("Cloning kepano/obsidian-skills...");
    gitCloneSparse(COMMUNITY_SKILLS_URL, tmpSkills, ["skills"]);

    const skillsSrc = join(tmpSkills, "skills");
    const skillsDest = join(vaultDir, ".agents", "skills");
    if (existsSync(skillsSrc)) {
      for (const skill of readdirSync(skillsSrc)) {
        const src = join(skillsSrc, skill);
        if (statSync(src).isDirectory()) {
          copyDirRecursive(src, join(skillsDest, skill), vaultDir);
          success(`skill: ${skill}`);
        }
      }
    }
  } catch (e) {
    warn("Could not fetch community skills (network issue?). Skipping — you can add them later.");
  } finally {
    if (existsSync(tmpSkills)) rmSync(tmpSkills, { recursive: true, force: true });
  }

  // ── Step 3: Create minimal structure ────────────────────────────────────

  header(`3/4  ${isUpgrade ? "Verifying" : "Creating"} vault structure`);

  const dirs = [
    "superpaper",
    "superpaper/inbox",
    "daily",
  ];

  for (const dir of dirs) {
    const dirPath = join(vaultDir, dir);
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
      success(dir + "/");
    } else {
      log(`${dir}/ already exists`);
    }
  }

  // Create Knowledge map stub
  const kmPath = join(vaultDir, "superpaper", "Knowledge map.md");
  if (!existsSync(kmPath)) {
    writeFileSync(kmPath, [
      "---",
      "type: log",
      `created: ${new Date().toISOString().slice(0, 10)}`,
      "created-by: ai",
      "---",
      "",
      "# Knowledge map",
      "",
      "The browsable entry point to your knowledge graph. Clusters, stats, and connections will appear here as your vault grows.",
      "",
      "## Recent additions",
      "",
      "````dataview",
      'TABLE type, confidence, created',
      'FROM "superpaper"',
      'WHERE type AND type != "daily"',
      "SORT created DESC",
      "LIMIT 10",
      "````",
      "",
      "## Clusters",
      "",
      "_Empty for now. As you add notes, themes will emerge and get listed here._",
      "",
    ].join("\n"));
    success("superpaper/Knowledge map.md");
  }

  // ── Step 4: Claude Code / agent symlinks ────────────────────────────────

  header(`4/4  ${isUpgrade ? "Verifying" : "Setting up"} agent integrations`);

  // CLAUDE.md symlink
  const claudePath = join(vaultDir, "CLAUDE.md");
  if (!existsSync(claudePath)) {
    try {
      execSync(`ln -sf AGENTS.md CLAUDE.md`, { cwd: vaultDir, stdio: "pipe" });
      success("CLAUDE.md → AGENTS.md (symlink)");
    } catch {
      warn("Could not create CLAUDE.md symlink. Create manually: ln -sf AGENTS.md CLAUDE.md");
    }
  } else {
    log("CLAUDE.md already exists");
  }

  // .claude/skills symlink
  const claudeDir = join(vaultDir, ".claude");
  if (!existsSync(claudeDir)) mkdirSync(claudeDir, { recursive: true });
  const claudeSkills = join(claudeDir, "skills");
  if (!existsSync(claudeSkills)) {
    try {
      execSync(`ln -sf ../.agents/skills .claude/skills`, { cwd: vaultDir, stdio: "pipe" });
      success(".claude/skills → .agents/skills (symlink)");
    } catch {
      warn("Could not create .claude/skills symlink.");
    }
  } else {
    log(".claude/skills already exists");
  }

  // ── Merge report ────────────────────────────────────────────────────────

  if (conflicts.length > 0) {
    header("Merge required");

    const reportPath = join(vaultDir, "superpaper", "Superpaper update — merge required.md");
    writeFileSync(reportPath, generateMergePrompt(conflicts, vaultDir));

    console.log(`
  ${conflicts.length} file(s) already existed and were NOT overwritten.
  Updated versions saved with .new suffix:
`);
    for (const c of conflicts) {
      conflict(`${c.existing} → ${c.incoming}`);
    }

    const reportRelPath = "superpaper/Superpaper update — merge required.md";
    console.log(`
  A merge guide has been created at:
    ${reportRelPath}

  Ask your AI agent to check and follow ${reportRelPath}
  Your existing files were not touched.
`);
  }

  // ── Done ────────────────────────────────────────────────────────────────

  const agentsPath = join(vaultDir, "AGENTS.md");

  if (conflicts.length === 0 && !isUpgrade) {
    console.log(`
  ${"─".repeat(50)}
  ✓ Superpaper installed!
  ${"─".repeat(50)}

  Your vault is ready. Here's what to do next:

  1. Open this vault in Obsidian
  2. Enable community plugins (Settings → Community plugins → Turn on)
  3. Install: Dataview, Templater, CodeScript Toolkit,
     Calendar, Kanban, File Explorer++
  4. Start a conversation with your AI agent — it will
     read AGENTS.md and walk you through setup

  Superpaper starts almost empty on purpose.
  Folders and features appear as you need them.

  ┌─────────────────────────────────────────────────┐
  │  AI AGENT: Read the full protocol to bootstrap: │
  │                                                 │
  │  ${agentsPath}
  │                                                 │
  │  Then read .agents/skills/AGENTS.md for the     │
  │  skill index and _templates/AGENTS.md for the   │
  │  template inventory.                            │
  │                                                 │
  │  DO NOT create entity folders (people/,         │
  │  concepts/, sources/, etc.) during setup. They  │
  │  are created on first use only.                 │
  │                                                 │
  └─────────────────────────────────────────────────┘
  `);
  } else if (conflicts.length === 0 && isUpgrade) {
    console.log(`
  ${"─".repeat(50)}
  ✓ Superpaper upgraded — no conflicts!
  ${"─".repeat(50)}

  All infrastructure files are up to date.
  New files were added, no existing files needed merging.

  ┌─────────────────────────────────────────────────┐
  │  AI AGENT: Superpaper was just upgraded.        │
  │                                                 │
  │  Re-read these files for updated instructions:  │
  │                                                 │
  │  • ${agentsPath}
  │  • .agents/skills/AGENTS.md                     │
  │  • .agents/skills/superpaper/SKILL.md           │
  │  • _templates/AGENTS.md                         │
  │                                                 │
  │  Then run a quick protocol reindex: scan for    │
  │  stale references, renamed properties, or       │
  │  deprecated patterns.                           │
  │                                                 │
  └─────────────────────────────────────────────────┘
  `);
  } else {
    console.log(`
  ${"─".repeat(50)}
  ✓ Superpaper ${isUpgrade ? "upgraded" : "updated"}!
  ${"─".repeat(50)}

  New files were added. ${conflicts.length} file(s) had conflicts
  — saved as .new files (existing files untouched).

  ┌────────────────────────────────────────────────────┐
  │  AI AGENT: Merge guide created at:                 │
  │                                                    │
  │  superpaper/Superpaper update — merge required.md  │
  │                                                    │
  │  Read that file and follow its instructions to     │
  │  merge .new files into existing files. Then read:  │
  │                                                    │
  │  ${agentsPath}
  │                                                    │
  │  DO NOT create entity folders (people/, concepts/, │
  │  sources/, etc.) during setup. They are created on │
  │  first use only.                                   │
  │                                                    │
  └────────────────────────────────────────────────────┘
  `);
  }
}

// ── CLI routing ──────────────────────────────────────────────────────────────

const command = process.argv[2];

if (command === "init" || command === "update" || command === "upgrade") {
  init().catch((e) => {
    console.error(`\n  ✗ Error: ${e.message}`);
    process.exit(1);
  });
} else {
  console.log(`
  superpaper — Obsidian-native AI workspace

  Usage:
    npx superpaper init [path]      Install or upgrade Superpaper in a vault
    npx superpaper update [path]    Same as init (auto-detects mode)
    npx superpaper upgrade [path]   Same as init (auto-detects mode)

  Options:
    --force                         Skip confirmation prompts

  All three commands are identical — they auto-detect whether
  Superpaper is already installed and run in the appropriate mode.

  Examples:
    npx superpaper init             Set up or upgrade in current directory
    npx superpaper update ~/vault   Set up or upgrade vault at ~/vault
  `);
}
