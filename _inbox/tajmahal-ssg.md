# Inbox Dossier — Taj Mahal SSG

> Collection doc (not a page yet). Source: local repo E:\Projects\tajmahal\src
> (README, WHY.md, VERSION, full docs/ incl. "Mastering Taj Mahal SSG" book, go.mod).
> Status: **collected** — open Qs at bottom.

**Classification:** ManiarTech® **Labs** — Open-source Go framework (**OSS soon**, not yet
published). **The engine behind this very website (maniartech.com v2) and 10+ ManiarTech
sites.** Open-core counterpart to the **Taj Mahal Spaces** product (managed hosting).
**One-liner:** A modern, modular static-site generator in Go — Markdown content +
Django/Jinja-style templates → fast, SEO-friendly static sites, with theme inheritance,
a built-in asset pipeline, and a great dev experience.

**🌟 Self-referential proof point (use it):** *"This very website runs on it."* maniartech.com
v2 is being built ON Taj Mahal — the strongest possible credibility for an SSG. And it's
**battle-tested across 10+ live ManiarTech websites**, so "production-proven" is honest.

---

## 1. Identity

| Field | Value |
|---|---|
| Name | Taj Mahal (SSG) |
| Type | Static-site generator **framework** (Go) |
| Import / repo | `github.com/maniartech/tajmahal` |
| Author | ManiarTech® |
| Go | 1.23 |
| Templating | **Pongo2** (Django/Jinja-style) |
| CLI | `taj serve` (dev server, live reload), `taj build` (static output) |
| Status | **Used internally on 10+ sites incl. maniartech.com; OSS SOON** (not public yet) |
| License | TBC (confirm at OSS release) |

## 2. What it is / mental model (three layers)

1. **Configuration** — `tajmahal.yaml` (site), `module.yaml` (per module), `theme.yaml`
   (per theme). Defines structure, routing, theme resolution.
2. **Content** — Markdown + YAML frontmatter in module content dirs; numeric filename
   prefixes control ordering (`01-`, `01.025-`); `00-index.md` = directory index.
3. **Presentation** — themes: Pongo2 `templates/`, `assets/` (served as-is), `lib/`
   (esbuild tree-shaking pipeline), `components/`; **theme inheritance** via `base:`.

**Defining idea — MODULES:** each section of a site (docs, blog, landing) is an
independent module with its own content dir, routes, and optionally its own theme. (This
modular architecture is what sets it apart from Hugo/Jekyll-style SSGs.)

## 3. Key features (from README / WHY / docs)

- **Design–content separation**, **SEO-friendly**, **fast**, **easy to use** (the WHY.md
  pillars).
- **Themes + theme inheritance**, **custom tags**, **plugins** (extensibility).
- **Built-in tree-shaking, minification, bundling** (esbuild `lib/` pipeline) — not bolted on.
- **Great DX:** live reload, fast builds, **enhanced error reporting**, shortcodes,
  publishing support; dev server prints local addresses + an **IP QR code** (nice touch).
- **Docs-site superpowers:** `/*` and `/**` routing auto-infer list+article pages; `/**`
  adds **docs sidebar nav** (`related` summary tree), **breadcrumbs**, `current` active-node
  context, scoped related trees (`collection`/`rootSection`/`currentDir`), deterministic
  ordering (numeric prefix → frontmatter order → timestamp → alpha), allow-listed fields.
- Advanced content model (part 8 of the book): selecting/ordering content, derived views,
  article config, an internal **SQL + param registry**, drafts/headless output, redirects/
  virtual pages. (Genuinely sophisticated for an SSG.)

## 4. Exceptional documentation (a real asset)

Ships a complete book — **"Mastering Taj Mahal SSG"**: 8 parts, ~29 chapters (foundations →
config → content/routing → templates/themes/assets → docs sites/navigation → build/quality
workflows → reference appendices → advanced content model). This is far beyond typical OSS
docs and is itself a credibility signal.

## 5. AI / agent integration (notable, timely)

Repo has **`tajmahal-ai/`** and a **`skills/`** dir (`skills.json`,
`tajsite-static-website-builder`) — i.e. an **agent skill** for building Taj Mahal sites
with AI. (This is literally the basis of the "tajmahal-ssg" skill being used to build
maniartech.com v2.) → "AI-native SSG / build your site with an AI agent" is a sharp 2026
angle worth featuring; ties to the MDKit / AI-services story.

## 6. Strategic role

- **Open-core flagship product pair:** Taj Mahal **SSG** (open source, the engine) ↔ Taj
  Mahal **Spaces** (commercial, managed hosting). Classic Ghost/Vercel-style model — the
  cleanest open-core story in the portfolio.
- **Dogfooding at scale:** 10+ live sites + maniartech.com itself = honest "production-
  proven," not aspirational.
- Reinforces "we make technology" from the **framework/platform** angle (complements the
  standards and the language).
- SEO: "static site generator go", "hugo alternative", "modular ssg", "markdown website
  generator", "jamstack go".

## 7. Site placement

Labs entry now (OSS soon → teaser/"powers this site" angle; full page + repo links on OSS
release). **Best self-referential demo on the whole site** — a footer "Built with Taj Mahal"
badge + a Labs page that says "the site you're reading runs on it." Pair visibly with **Taj
Mahal Spaces** (Products) to tell the open-core story. When OSS: docs site (the book) + the
AI-build angle are strong assets.

## 8. Open questions for Aamir

- [ ] **OSS timing** ("soon" — when?) + license at release.
- [ ] Confirm the metric: "**powers 10+ websites including maniartech.com**" — OK to state,
      and can we name any of the 10+ sites publicly?
- [ ] Current version number (VERSION file is guidelines only; `version.go` holds the actual)?
- [ ] Feature the **AI-build / agent-skill** angle ("build your site with an AI agent")?
- [ ] Confirm the **SSG ↔ Spaces open-core** framing (engine OSS, hosting commercial).
- [ ] Footer "Built with Taj Mahal" badge on maniartech.com — yes? (Great proof + funnel.)
