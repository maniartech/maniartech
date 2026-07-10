# FOUNDRY — the maker section (DECIDED 2026-07, supersedes "Labs")

**Foundry** = everything ManiarTech *makes* (its own creations), as distinct from **Work**
(what we did *for clients* = case studies) and **Services** (what we do *for* you).

## The model (locked)
- **Unit = the project.** Each made thing is ONE entity with ONE page. It is NOT sorted into an
  exclusive type-folder (that tore multi-nature things apart).
- **Facets are tags, not folders.** A project wears every tag that's true: `Product` · `Open source` ·
  `Standard` · `Language` · `Library` · `Framework` · `Tool` · `Playground`. So Internet Object
  honestly shows under *both* Standards and Open Source — no contradiction.
- **Maturity = a status badge**, never a category: `In production` · `Published` · `Publish-ready` ·
  `In development` · `Research` · `Internal`.
- **Relationships live on the pages**, not as menu icons: e.g. GoTime page says
  "↳ reference implementation of the NITES standard."
- **Understated tone (see brand guide §4).** The maker work is a matter-of-fact part of life at
  ManiarTech, NOT a boast. Plain statements, quiet confidence — no "Yes — we build X!", no
  "most companies use X, we author it" superiority. Proof (benchmarks/repos) is fine; bragging isn't.

## Views (browse doorways, NOT exclusive homes) → each a CURATED, custom-designed page
Products · Programming Languages · Standards · Libraries & Frameworks · Developer Tools · Open Source
(Open Source is the cross-cutting view = all public repos.)

## Menu = a crafted MEGA-MENU
Four columns (**Products · Languages · Libraries & Frameworks · Developer Tools**), each item shows
name + 4–6 word micro-copy + optional status badge; a footer row of **cross-cutting doorways**:
Open Source · **Standards & specifications** · Explore the Foundry.
The ☰ navigator mirrors the same structure (3-level).

### Column rule (DECIDED 2026-07 — resolves the "crossing zones" churn)
A menu **column = the project's LEAD NOUN** — the one word the maker would say first — and each project
appears in **exactly one** column. Everything else (open-source, ships-as-a-library, implements-a-standard)
is a **tag + cross-link on the page**, never a second menu row. This stops the columns behaving like
exclusive folders (the thing that kept cracking: AddressQL-is-a-language, Internet-Object's-impl-is-a-library).
- Languages (executed): Indigo · UExL · AddressQL · PDML `Soon` (public name: **PressML**)  ← AddressQL moved here (it's a language, not a "standard")
- Libraries & Frameworks (impl): signals · gotime · vault-storage · gocurl
- Developer Tools: Booster · Taj Mahal SSG · gowork
- Products: Processious `Live` · Ordin · Documentor.AI · Enterprise DAM

### Standards = a doorway, NOT a column (DECIDED 2026-07)
"Standard" isn't a sibling of Languages/Libraries — every formal language *is* a standard, and a data
standard's implementation *is* a library, so it can't be an exclusive column. It's a **facet you browse
into**, exactly like Open Source. So it lives as a **footer doorway** → `/standards/`, which shows all of
them together (Internet Object, NITES, FUSE) regardless of their other facets. A pure spec with no
implementation isn't a category — it's just a `Research`-stage maturity state.

### Frosting (DECIDED 2026-07)
ALL header dropdowns (small + mega) = frosted glass: `rgba(16,16,16,.82)` + `backdrop-filter: blur(26px)`.
The navbar's own `.blur` backdrop-filter is neutralized (`nav.navbar.blur { backdrop-filter:none }`) so the
nested panel filters can sample the page. NO page-scrim — the user wants the *menu* frosted, not the page.

## Project inventory → tags
- Products: Processious `In production` · Ordin `In dev · source-available` · Documentor.AI `Early` · Enterprise DAM `Early`
- Languages: Indigo `Research` · UExL `Publish-ready` · AddressQL `Research` · PDML `In development`
  (AddressQL is a query *language* → lives under Languages, not Standards. PDML = Printable Document
   Markup Language: HTML/CSS-like markup for PDFs/books/reports/invoices; upcoming.)

### Name split: PressML (public) / PDML (internal) — DECIDED 2026-07
Unlike AddressQL (renamed everywhere), PDML keeps a **dual name by design**:
- **Public / marketing name = PressML** — the ONLY name shown on the site & collateral. "Press" = printing
  press, which is what it's for (print/PDF/books/reports/invoices). Verified clean (vs. the crowded PDML;
  neighbours are PPML, PML, PromptML — all distinct). Fits the `<Word>QL`-style evocative pattern.
- **Internal name = PDML** — kept verbatim in **specs, code, repos, and `_inbox`/`_ia` dossiers**. Do NOT
  sweep PDML→PressML internally; only public-facing surfaces show PressML.
- Applied so far: the two nav entries (mega + navigator) show **PressML**. That's the whole public surface today.

### Name: AddressQL (DECIDED 2026-07 — was "IQL / Intent Query Language", still private)
Renamed **IQL → AddressQL** before any public launch. Rationale:
- **Collision:** "IQL" is one of the most-reused query-language acronyms — and `markkurossi/iql` is literally
  "Internet Query Language" for querying URLs, i.e. same name + same idea. UNQL (UnQLite), UQL (Grafana/
  Lightstep), USQL (MS Azure U-SQL), WebQL/WQL (WMI), PathQuery (Google) all taken too. The whole
  web/URL-query naming space is exhausted by big players.
- **Marketing:** `<Word>QL` is the credible category pattern (GraphQL). "AddressQL" rides that lineage on
  sight AND names its defining feature — it *lives in the address bar*. Like GraphQL, you say it in full,
  so the taken short forms (AQL=ArangoDB, ADQL=astronomy) never come up. Verified clean as a full name.
- Tagline: **"URL-native query language."**
- ⚠ Rename applied to site + IA + `_inbox`/`_ia` dossiers (dossier file `iql.md` → `addressql.md`).
  STILL TODO by Aamir (all private, no rush): repo `iql_go` → `addressql_go`, the "Mastering IQL" book,
  and the marketing booklet (needs rebuild). Those are repo/artifact identifiers — rename at the source.
- Standards: Internet Object `Published` · NITES `Research` · FUSE `Research`
- Libraries & Frameworks: signals · gotime · vault-storage · gocurl · xlib · MDKit · Printeer · WebDoodling
- Developer Tools: Booster `Internal` · Taj Mahal SSG (website dev tool) · gowork · Orchestrator
  (gocurl is a LIBRARY → moved up; Taj Mahal is a TOOL → moved here)

## ▶ Build phases
- [ ] **P1 (now):** Foundry mega-menu in the top nav (headline); rename ☰ navigator Labs→Foundry.
      Links point at existing pages for now (`/products/*`, `/labs/*`, `/standards/`).
- [~] **P2:** `/foundry/` hub + 6 curated view pages, each custom-designed with its own vibe.
      - [x] **Languages** (`/foundry/languages/`, template `languages.html`) — BUILT & APPROVED (direction
            + understated tone confirmed by Aamir). Code-forward: Indigo before→after compiles-to,
            UExL zero-alloc benchmark. This is the reference vibe/voice for the rest.
      - [x] **`/foundry/` hub** (template `foundry.html`, content `labs/foundry/index.md`) — BUILT.
            The honest tagged showcase: hero + browse row + 6 category sections (project cards with
            status badge + facet tags) + "Open source — not a category, a habit". Foundry nav +
            "Explore the Foundry" repointed from /labs/ → /foundry/. ⚠ routing change = server restart.
      - [ ] Standards (spec/RFC feel) · Developer Tools (terminal) · Products (product-marketing) ·
            Libraries & Frameworks · Open Source — the dedicated view pages, in the SAME register.
- [x] **URL migration DONE:** all project URLs moved `/labs/*` → `/foundry/*`; old `/labs/` hub
      retired (files deleted, route 404s); breadcrumbs/categories/navigator/footer/home all say
      Foundry. Client "laboratory" refs (chemo/rtl) correctly kept. Content dirs stay `labs/<slug>/`.
- [ ] **P3:** give NITES/FUSE/AddressQL/gowork/gocurl/etc. their own project pages; add relationship links.
- [ ] Retire the `/standards/`-vs-`Labs>Standards&Languages` duplication (Standards view is canonical).
