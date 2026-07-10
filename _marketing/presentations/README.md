# Presentations

Sales decks for prospects. Each keeps an editable source + a self-contained built file.

## maniartech-pitch — the core sales deck ✅ built
A standalone, navigable pitch deck (12 slides). **Its own argument, not a re-skin of the website.**
- **Narrative spine:** the *maker's thesis* fused with *problem → antidote* —
  We make it → why custom software disappoints → so we built the opposite →
  makers not assemblers (depth) → what that means for you → senior & honest →
  in production → track record → the people → where we help → how we start → close.
- **Design:** dark `#1a1a1a` / mint `#14cf93`, Satoshi (embedded), full-viewport slides with
  keyboard/click/swipe nav, progress bar + counter; progressively enhances to a scroll story on
  mobile/no-JS; `@media print` → one landscape page per slide for PDF export.
- **Self-contained:** Satoshi-Variable font + logo + ISO badge inlined as data URIs (CSP-safe);
  typographic chars normalized to HTML entities so it renders on any charset.

### Files
- `deck.src.html` — editable source (real content; `__SATOSHI__` / `__LOGO__` / `__ISO__` placeholders).
- `build.js` — inlines the font/logo/iso + entity-normalizes → writes `index.html`.
- `index.html` — the built, self-contained deck (do not hand-edit; regenerate).

### Rebuild
```
node _marketing/presentations/maniartech-pitch/build.js
```
Preview locally: launch config `deck` (http://localhost:8090). Publish/update: Artifact `index.html`.

### Published Artifact
https://claude.ai/code/artifact/c80ef658-b612-4d22-9d6c-e1f546764b35

### To export a PDF
Open the deck, Print → Save as PDF, landscape, background graphics ON (print CSS gives one slide/page).
