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

## Page-design thumb rules (Aamir, 2026-08 — apply to every page built or rebuilt)
1. **The hero owns 100% of the view height** (sans header). The navbar is `position:absolute`/73px, so
   `min-height: 100svh` IS the full view; the stage's top padding clears the bar. `min-height`, never
   `height` — on small screens the hero grows rather than trapping content. Reference: `/insights/`.
2. **Bands, not columns.** "Text left, thing right" forces filler into the right half and leaves ragged
   holes (measured: a 330px paragraph marooned in a 660px column; rules running ~206px past their text).
   Full-width stacked bands are sized by their own content. Hairline dividers run BETWEEN cells
   (vertically), never under them, so a rule can never cross empty space.
3. **Balance the air.** Content centres in the space the hero gives it — equal px above and below
   (measure it; do not eyeball). Never pin content to the top of a tall stage over a hole.
4. **Design for the content type, not from a template.** A paper page presents evidence and reading;
   a standards page presents specifications and status; a language page presents code. The furniture
   (specimens, figures, proof strips) must be OF the content, never generic cards about it.
5. **A hero shows what the page below cannot** — aggregate proof, a control, a specimen. Never a
   lower-fidelity duplicate of the section that follows it.
6. **Data lives once.** Page-level lists (threads, figures, statuses) come from frontmatter or
   `tajmahal.yaml` context — looped by the template, counts derived at runtime, never typed in HTML.
   Where drift is possible, add a FAIL to `scripts/seo/seo-check.mjs`.
7. **Contrast floor:** small text needs WCAG AA 4.5:1 **alpha-blended** against #1a1a1a — that means
   white text at alpha >= .46 (`.5` is the working floor). Probe with blending; a raw-channel check
   lies.
8. **No promises about the future** (cadence, roadmap dates) in site copy — a standard we control, not
   a schedule we might miss.

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
