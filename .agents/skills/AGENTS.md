# Skills Directory

> Agent Skills are reusable instruction packages that extend agent capabilities. Each skill is a folder with a `SKILL.md` file following the [Agent Skills](https://agentskills.io) open standard.

## How skills work

1. **Discovery** — At startup, read this file. Names and descriptions tell you when each skill is relevant.
2. **Activation** — When a task matches a skill's description, read the full `SKILL.md` into context.
3. **Execution** — Follow the skill's instructions, loading referenced files or running bundled scripts as needed.

## Available skills

| Skill | Description | Trigger |
|-------|-------------|---------|
| [[.agents/skills/heartbeat/SKILL\|heartbeat]] | Autonomous batch cycle — fills the pipeline, dispatches tasks, housekeeps | Scheduled (hourly) or "run a heartbeat" |
| [[.agents/skills/hypothesize/SKILL\|hypothesize]] | Extract falsifiable hypotheses from a paper | "distill this paper" or similar |
| [[.agents/skills/introspect/SKILL\|introspect]] | Audit the vault — connectivity, consistency, evolution potential | "audit the system", "introspect", after structural changes |
| [[.agents/skills/process-journal-entry/SKILL\|process-journal-entry]] | Process a daily freewrite or journal entry — reflect back, route insights to living documents and atomic notes | "process my journal", "process today's writing", or when fed a freewrite/daily note |
| [[.agents/skills/process-meeting/SKILL\|process-meeting]] | Process a meeting transcript — extract decisions, action items, insights, and commitments | "process this meeting", or when fed a transcript from Granola/Otter/etc |
| [[.agents/skills/skill-creator/SKILL\|skill-creator]] | Create new skills from observed patterns or explicit requests | "make a skill for...", or when you notice repeated workflows |

## When to suggest a new skill

Watch for these signals during normal work:
- The human requests the same multi-step workflow **2–3 times**
- A memory note of type `pattern` describes a recurring procedure
- During consolidation, you find multiple decision notes with similar reasoning chains

When you spot a pattern: mention it, propose a skill name + one-line description, and offer to build it using the `skill-creator` skill.

## Conventions

- Skills live in `.agents/skills/<skill-name>/SKILL.md`
- Folder name must match the `name` field in frontmatter
- Keep this index up to date when skills are added, renamed, or retired
