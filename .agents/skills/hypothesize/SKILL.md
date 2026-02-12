---
name: hypothesize
description: Extract falsifiable hypotheses from a paper or research source. Use when the human says "distill this paper", "what are the key claims", or shares an academic paper/article for deep analysis.
---

# hypothesize

## When to use

- "distill this paper" or similar
- Human shares a paper, preprint, or research article for analysis
- Human asks for key claims, hypotheses, or falsifiable predictions from a source

## Process
1. Read the full paper (URL, PDF, or pasted text)
2. **Retrieve memory neighborhood** — search existing memory for related concepts, claims, and patterns using 4-surface retrieval (lexical, structural, semantic, temporal). This primes cross-domain connections.
3. SUPER IMPORTANT: Assess ALL primary authors' work history and ALL primary references for relevance to the user's broader work. Identify ideas worth capturing.
4. Write a source note in `superpaper/sources/<topic>/` with: title, authors, abstract summary, key findings, methodology notes.
5. Extract 3–5 falsifiable hypotheses from the paper's claims and broader ideas gathered that could address limitations of the work/area under consideration or fix gaps in the current paradigm.
6. For each hypothesis worth remembering, create a claim note in `superpaper/memory/`:
   - `type: claim`, `confidence: 0.4–0.7`
   - Include predictions ("if true, expect…") and link to the evidence note(s)
   - Tags: `#domain/...` + `#topic/...`
   - Link to the source note and any related existing memory notes
7. Link everything: source note links to claim notes, claim notes link to each other and to related existing knowledge. Update 1–3 existing notes to link back (distributed write).

## Outputs
- 1 source note in `superpaper/sources/<topic>/`
- 1+ evidence notes (key excerpts) in `superpaper/memory/`
- 2+ claim notes (hypotheses) in `superpaper/memory/`
- All cross-linked with distributed write

## Done when

- Hypotheses are testable and falsifiable
- Claim notes have predictions ("if true, expect…")
- Source note has proper `source:` frontmatter
- All notes have 2+ wiki-links with distributed write (existing notes updated to link back)
- Tags are specific (`#domain/...` + `#topic/...`), not broad
