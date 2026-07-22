# maniartech.com v2 — project brief

## ▶ First: read `RESUME.md` (repo root).
It is the single resume anchor — current state, what's next, how to run, and pointers to the
deeper canon (`_ia/FOUNDRY-IA.md`, `_ia/BUILD-STATUS.md`, `_inbox/PROJECT-CANON.md`,
`_inbox/PRESENTATION-DOCTRINE.md`). If you're in a new session, start there before touching anything.

## What this is
Multi-page, SEO-first static rebuild of maniartech.com on the **Taj Mahal SSG** (Go; modules +
YAML + Pongo2), built with the **`tajmahal-ssg` skill** — invoke it before any Taj Mahal work.
Theme: `themes/maniartech/`. Run with `tajmahal start` (port 8085); if content panics, `rm -rf .cache`
and restart; `module.yaml`/routing changes are startup-only.

**Website objective:** make a substance-rich, near-invisible senior shop *visible and trusted* — close the
offshore trust gap via radical verifiability, convert prospects (CTA = Estimate a project), per the
Presentation Doctrine (`_inbox/PRESENTATION-DOCTRINE.md`): *their safety first, our brilliance last, every
claim verifiable*; depth (the Foundry) is the closer, never the opener. Design crux + full objectives: `RESUME.md`.

**Design language (learned this build, in RESUME.md):** metaphor over decoration; align on the metaphor
before building; canvas for visuals / HTML+SVG for words; show real content at rest (not empty-on-hover);
vary treatments; no interaction on moving geometry.

## Non-negotiables
- **Brand = dark (#1a1a1a) + mint (#14cf93). NOT navy/gold.** Keep dark+mint even though the brand guide is navy/gold.
- **Never exaggerate (Governing Rule #1).** Every claim true, sourced, calibrated; honest status labels; no fabricated proof. Understated maker-tone.
- **CSS: never `!important`** — `_mt.scss` loads last; win by specificity. Fluid `clamp()` tokens.
- **Canvas visuals go through a small `R` renderer seam** (WebDoodling-ready) and do a synchronous first draw at boot.
- **Names:** IQL was renamed to **AddressQL** (private, everywhere). **PDML** shows publicly as **PressML** but stays PDML internally — do not sweep PDML→PressML in specs/code/dossiers.
- **ASCII-first.** Use plain ASCII characters/symbols wherever possible (straight quotes, `-`/`--` not em/en-dashes, `|` not middot, `->`/`<-` not arrows) — "smart" typography mangles on copy-paste into external tools (LinkedIn, forms, plain-text editors). **No emojis** in any content or heading, anywhere (site copy, dossiers, docs).

## Working with Aamir
Frank critique over agreement. Align on the metaphor/approach *before* building; keep content real and
visible; vary layouts. Commit only when asked; **no `Co-Authored-By` trailers.**
