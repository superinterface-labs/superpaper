---
name: plan
description: Decompose a goal into a phased implementation strategy
type: skill
status: active
version: 2
created: "2026-02-07"
tags:
  - type/skill
---
# plan

> Decompose a goal into a phased implementation strategy.
>
> Part of [[.agents/SKILLS|Skills Directory]]. Used by: [[.agents/hierarchy/exec-ops|Operations]], [[.agents/hierarchy/exec-forge|Forge]].

## When to Use

- New project or initiative needs a roadmap
- Complex task needs breakdown before execution
- Strategic decision requires options analysis

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| goal | yes | What needs to be accomplished |
| constraints | no | Budget, timeline, tech stack, team size |
| context | no | Links to relevant superinterface/knowledge/ or superinterface/knowledge/memory/ notes |

## Process

1. Clarify the goal — what does success look like? State observable outcomes, not internal attributes.
2. Identify unknowns — what do we need to research or prototype first? For significant unknowns, plan explicit spike/prototype phases that validate feasibility before committing.
3. Break into phases with clear dependencies
4. For each phase: define deliverables and acceptance criteria phrased as behavior a human can verify
5. Identify risks and mitigations
6. Write the plan as a note or add tasks to the board
7. For complex tasks: write the plan as a file (in project folder or `.plans/`). Plans that live as files can be handed to any agent or human cold. For technically rigorous work, escalate to [[.agents/skills/tech-plan/SKILL|tech-plan]].

## Subagent Orchestration

When work partitions into independent subgraphs, dispatch parallel subagents with clear scope boundaries:

- Each subagent gets a self-contained task spec: objective, owned areas, do-not-touch list, acceptance criteria
- Define shared interfaces/contracts *before* parallel work begins
- Integrate in controlled order (highest-dependency first)
- Do NOT parallelize tightly-coupled work through shared state

## Outputs

- Plan document (in project folder, `.plans/`, or `superinterface/ops/`)
- Tasks on [[Mission Control]] with phase labels
- Dependencies noted (which tasks block which)

## Conventions

- Plans are living documents — update as reality changes. Maintain a Decision Log for why you changed course.
- Prefer fewer, larger phases over many tiny steps
- Every phase should produce something demonstrable — observable outcomes, not just "code that compiles"
- Include a "What We Don't Build" section to prevent scope creep
- Record surprises and discoveries as you go — they inform future plans
- Plans should be self-contained enough that a novice (or stateless agent) can pick them up cold
