# Prospectus booklet

The high-quality, comprehensive **booklet** — the keepsake a prospect can read cover-to-cover to
understand all of ManiarTech. Print- and screen-ready. Unlike the pitch deck (a focused argument),
the booklet is **comprehensive**.

## maniartech-prospectus ✅ built
A4 portrait, ~16 pages + covers. Dark `#1a1a1a` / mint `#14cf93`, Satoshi (embedded), authentic
brand motifs (hand-drawn gears, dot-grid) and the **real in-production Chemo screenshot** — no stock
photography a software firm can't credibly use.

### Sections
Cover → opening statement → contents → who we are → the maker's edge → what you can count on →
services (Enterprise / Application+AI / Partnership) → products → labs & standards →
proof (Chemo in production + track record) → testimonials → the people → how we start →
trust & certifications → back-cover contact panel.

### Files
- `booklet.src.html` — editable source (`__SATOSHI__`/`__LOGO__`/`__ISO__`/`__CHEMO__` placeholders).
- `build.js` — inlines font/logo/iso/chemo + entity-normalizes → writes `index.html`.
- `index.html` — the built, self-contained booklet (regenerate; don't hand-edit).

### Rebuild
```
node _marketing/prospectus/maniartech-prospectus/build.js
```
Preview locally: launch config `booklet` (http://localhost:8091). Publish/update: Artifact `index.html`.

### Published Artifact
https://claude.ai/code/artifact/4126c744-1299-4066-90ec-9ce002599d97

### Export a print-ready PDF
Open the booklet → Print → Save as PDF → **A4**, margins **None**, background graphics **ON**
(`@page A4` + print CSS gives one section per sheet). For a physical bound booklet, send that PDF to
the printer (add bleed if the printer requires it).
