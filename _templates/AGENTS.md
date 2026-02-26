# _templates/

Vault templates used by Templater and other workflows.

## Contents

| File / Folder | Purpose |
|---|---|
| `Knowledge note.md` | Default — 6 fields: `type`, `categories`, `created`, `created-by`, `tags`, `aliases` |
| `Claim.md` | Epistemic — adds `id`, `status`, `confidence`, `evidence_for/against`, `predictions` |
| `Experiment.md` | Epistemic — adds `id`, `status`, `hypothesis`, `prediction`, `outcome` |
| `Decision.md` | Epistemic — adds `id`, `status` |
| `Bookmark.md` | Inbox capture — adds `url`, `status`, `rating`, `via` |
| `Person.md` | People — adds `role`, `context`, `last-contact` |
| `Idea note.md` | Low-friction idea capture |
| `Reflection.md` | Journal reflection with structured prompts |
| `Place.md` | Location — adds `loc`, `coordinates`, `type`, `rating` |
| `Podcast episode.md` | Source processing — adds `podcast`, `url`, `host`, `guests`, `topics` |
| `Daily note.md` | Pure date anchor — nothing is written here, value is entirely in backlinks |
| `Sequence.md` | Sequence note — composes atomic notes into ordered causal chains |
| `Weekly review.md` | Fractal journaling — compile the week's salient themes |
| `Monthly review.md` | Fractal journaling — distill monthly patterns from weekly reviews |
| `Yearly review.md` | Fractal journaling — 40 questions + year arc from monthly reviews |
| `Bases/` | Reusable `.base` templates — see below |

### Bases/ contents
| File | Purpose |
|---|---|
| `Bookmarks.base` | Bookmarks library (unprocessed/library/stale/connected) |
| `Related.base` | Contextual related-notes for the currently focused note |
| `Ratings.base` | Cross-category view of all rated notes |
| `Map.base` | Places view for notes with `coordinates` |
| `Concepts.base` | All/permanent/claims/ideas/connected |
| `People.base` | All people/connected |
| `Papers.base` | Academic papers/connected |
| `Books.base` | All/top rated/by author/connected |
| `Essays.base` | Long-form web essays |
| `Reports.base` | Analyst reports, syntheses |
| `Podcasts.base` | Show/feed hubs |
| `Episodes.base` | Individual podcast/video episodes |
| `Projects.base` | Active work streams |
| `Questions.base` | Open threads |
| `Places.base` | Locations with map view |
| `Experiments.base` | Personal trials, A/B tests |
| `Sequences.base` | All sequence notes — by domain, connected |
| + future bases | Albums, Movies, Shows, Games, Companies, Events, Meetings, Products, Recipes, Trips, Posts, Journal |

## Conventions

- All templates include `categories: []` as a core field for multi-belonging browse views.
- All templates include `created-by: human` — agents override to `ai` when they create a note. Values: `human`, `ai`, `ai-assisted`.
- Templates are composable mixins: applying multiple templates should merge cleanly.
- Default to list properties where multi-valued fields are plausible (`tags`, `categories`, `loc`).
- Epistemic fields (`id`, `status`, `confidence`, `evidence_for/against`, `predictions`) only on Claim/Experiment/Decision templates — not on the default Knowledge note.
- Tags use plural namespaces: `domains/*`, `topics/*`.
