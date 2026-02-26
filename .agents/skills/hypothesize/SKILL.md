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
2. **Retrieve knowledge neighborhood** — search existing knowledge for related concepts, claims, and patterns using 4-surface retrieval (lexical, structural, semantic, temporal). This primes cross-domain connections.
3. SUPER IMPORTANT: Assess ALL primary authors' work history and ALL primary references for relevance to the user's broader work. Identify ideas worth capturing.
4. **Create the source note** in `superpaper/sources/<topic>/` with: title, authors, abstract summary, methodology notes. Give every key finding and quotable passage a `^block-id` so it's independently embeddable (`![[source#^finding-1]]`).
5. **Extract atoms aggressively (atomic-first).** Every distinct finding, method, framework, and quotable claim from the paper deserves its own note — not just hypotheses. A key finding → its own note linked to the source. A novel method → its own note. A quote by an author → its own note linked to their `people/` entry. The more atoms, the more potential cross-domain bridges.
6. Extract 3–5 falsifiable hypotheses from the paper's claims and broader ideas gathered that could address limitations of the work/area under consideration or fix gaps in the current paradigm.
7. For each hypothesis worth remembering, create a claim note in `superpaper/concepts/`:
   - `type: claim`, `confidence: 0.4–0.7`
   - Include predictions ("if true, expect…") and embed the evidence passage (`![[source#^finding]]`)
   - Tags: `#domain/...` + `#topic/...`
   - Link to the source note and any related existing knowledge notes
8. **Compose a hub note** if the paper produced 4+ atoms — embed the atomic notes with thin connective prose explaining how the findings relate. This becomes the "processed paper" that reads like a document but traces every claim to its source.
9. Link everything: source note links to claim notes, claim notes link to each other and to related existing knowledge. Update 1–3 existing notes to link back (distributed write).

## Outputs
- 1 source note in `superpaper/sources/<topic>/`
- 1+ evidence notes (key excerpts) in `superpaper/.evidence/`
- 2+ claim notes (hypotheses) in `superpaper/concepts/`
- All cross-linked with distributed write

## Done when

- Hypotheses are testable and falsifiable
- Claim notes have predictions ("if true, expect…")
- Source note has proper `source:` frontmatter
- All notes have 2+ wiki-links with distributed write (existing notes updated to link back)
- Tags are specific (`#domain/...` + `#topic/...`), not broad
