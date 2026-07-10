# Labs Page — Organization / IA (recommendation)

> How to organize the Labs section (~17 projects). Feeds the `_ia/` build. Decided
> principle: **category-first, proof-first WITHIN each category, honest status label on
> every card.** Rationale: leads with the unique "we author standards + a language" story,
> keeps it navigable (5 clusters not 17 cards), stays honest (labels + hero proof stats),
> lets each visitor self-route (CTO→Standards, dev→Tools).

## Why category-first (vs alternatives)
- By **maturity** (Published→Research): most "honest" but BURIES Indigo (the crown) in
  "Research" and scatters the standards story — defensive, loses the narrative.
- By **language/tech**: meaningless to business buyers.
- By **category**: leads with the differentiator, navigable, self-routing. WINNER —
  honesty handled via per-card status labels + hero proof stats.

## Page structure (`/labs/` landing)
1. **Hero** — "We don't just use technology. We make it." + PROOF STRIP:
   5 standards · a language · 40+ OSS repos · signals 325★ · 10+ sites on Taj Mahal.
   (Proof up top keeps the bold framing grounded.)
2. **Standards & Languages** — the headliner; gets its OWN deep sub-hub (see below).
   ⭐ Indigo (featured) · Internet Object · NITES · UExL · FUSE · AddressQL. "Explore standards →"
3. **Open Source Libraries** — the PROOF; lead with starred/published:
   signals (325★) · gotime · vault-storage · xlib.
4. **Developer Tools** — "tools we built because we wished they existed":
   Booster · gowork · gocurl · conductor/orchestrator.
5. **Frameworks & Platforms** — Taj Mahal SSG (+"powers this very site") · MDKit ·
   WebDoodling · Printeer.
6. **Wider GitHub org** — "40+ repositories" card → links out.
7. **CTA** — "This is the rigor we bring to your project" → Estimate / Talk to us.

**Section ORDER:** lead with Standards & Languages (impact/uniqueness), immediately back
with Open Source (hard proof). Safe on Labs page (visitor opted into "show me tech");
hero stats + per-card labels keep it grounded. NOTE: homepage still leads proof-first
(different page/job).

## Cross-cutting (every card)
- **Status label** (Published · Beta · Shipping soon · Research · Internal) — fixed vocab,
  color-coded, on EVERY card. Honesty as a feature.
- **One proof badge** where strong: ★ count, benchmark ("beats cel-go"), "30% fewer tokens",
  "powers this site".
- One-liner + tech tags + link to detail page.
- **Optional filter** (status/language) for drill-down; curated sections = default view.
- **Section intros** — one line of connective tissue per cluster.
- **Cross-links:** Standards hub · Products (open-core SSG↔Spaces) · Services ("the rigor
  your project gets") · White Papers.

## Category assignment (note a few flex items)
- **Standards & Languages:** Indigo, Internet Object, NITES, UExL, FUSE, AddressQL.
- **Open Source Libraries:** signals, gotime, vault-storage, xlib. *(xlib also = UExL's
  stdlib — cross-link to UExL.)*
- **Developer Tools:** Booster, gowork, gocurl, conductor/orchestrator. *(gocurl is also a
  lib; conductor is import-style — fine, theme is "improves how devs work".)*
- **Frameworks & Platforms:** Taj Mahal SSG, MDKit, WebDoodling, Printeer.
(4–5 clusters max = scannable. A couple items could sit in two buckets; pick the stronger
story, cross-link the other.)

## Standards & Languages = its own deep HUB (recommended)
Impressive + identity-central enough to warrant a dedicated page (the "we author standards"
narrative, 5 standards + Indigo headlining, multi-language ambition, the honest-engineering
ethos). Featured as a section on Labs with "Explore →". This is the "Research/Standards/
Languages hub" already flagged in PROJECT-STATUS IA directives.

## Taj Mahal implementation notes
- `/labs/*` list/article stream; listing page = the organized landing.
- Drive clustering via a **`category` frontmatter field** per project + `order`; the listing
  template groups by category (Taj Mahal content model supports selecting/ordering + derived
  views — book part 8). Status label = a `status` frontmatter field; proof badge = a field.
- Each project = a detail page (from the dossier content), with status, proof, links, and
  "talk to us about this / estimate" CTA.

## Open questions for Aamir
- [ ] Approve category-first organization + the 4 clusters + names?
- [ ] Standards & Languages as its own hub page (recommended) vs just a Labs section?
- [ ] Section name — "Labs" (current) confirmed? (vs "Open Source", "Engineering", "Build")
- [ ] Any project to feature/demote, or category reassignments?
