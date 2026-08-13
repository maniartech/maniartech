---
title: "Taj Mahal"
headline: "Don't build a website. Build a Taj Mahal."
description: "As simple as Markdown. As powerful as a framework. As beautiful as its name."
eyebrow: "Developer tool"
titleTag: "Taj Mahal - Superfast Modular Static Site Framework"
seoDescription: "Taj Mahal: a modular static site framework in Go. Internal benchmark notes record ~30-35 ms to open a page on test sites up to 100,000 pages."
order: 7
tocDepth: "3"
statusLine: "Production-dogfooded | Private | Open source planned"
artifacts:
  - label: "See it running: this site"
    url: "/"
    primary: true
  - label: "A client site it renders"
    url: "https://chemotestlaboratory.com"
railMeta:
  - { k: "Type", v: "Modular static site framework (Go)" }
  - { k: "Maturity", v: "Production-dogfooded" }
  - { k: "Availability", v: "Private" }
  - { k: "Licence", v: "None published" }
  - { k: "Adoption", v: "Not available; open-source release planned" }
  - { k: "Evidence", v: "Renders maniartech.com and live client sites; dev-loop numbers from the project's benchmark notes" }
  - { k: "Reviewed", v: "13 August 2026" }
railLinks:
  - label: "This website"
    note: "Every page here is Taj Mahal output - view source on any of them"
    url: "/"
  - label: "chemotestlaboratory.com"
    note: "A 35-year accredited laboratory's public site, rendered by Taj Mahal"
    url: "https://chemotestlaboratory.com"
privateReview: "The source is private while documentation, packaging, licensing and release readiness are completed. Qualified customers can request a technical walkthrough; the benchmark harness ships with the open-source release."
---

## Superfast: the site opens before you switch tabs

A modular static site framework in Go whose proof is not a feature list - **you are reading its output right now.** Write in Markdown, configure in YAML, compose with server-rendered components that carry their own scoped CSS and JS - then ship static files anywhere for free. The number that matters to a working engineer is not the overnight build - it is the loop you live in: launch the dev server, open your page, edit, see it. The dev server renders pages on demand: internal benchmark notes record approximately 30-35 ms to open an individual page on test sites up to 100,000 pages - the same as a 100-page site - and the public release is planned to include the harness. **Milliseconds, not minutes.** From those notes, on a **10,000-post site**:

| Launch to article page | Hugo | Taj Mahal | |
|---|---|---|---|
| Linux | 2,763 ms | **35 ms** | **79x** |
| Windows (Defender real-time scanning on - it taxes both engines similarly, ~15x) | 47,500 ms | **210 ms** | **~226x** |
| Edit to visible in browser | - | **~120 ms** | |

The structural reason, which no tuning can take away: **Hugo builds the whole site to show you one page; Taj Mahal builds one page.** The dev server renders on demand, and a save re-parses one file. Neither cost knows how big your site is - which is why a 1,000-page, a 10,000-page and a **100,000-page site all open in roughly 30-35 ms**.

Full builds are the supporting act, not the headline: on the same 10,000-post site (Linux), Hugo builds in 2.84 s, Taj Mahal cold in 2.54 s - and **warm in 1.09 s (2.6x)**, because Hugo has no incremental mode. Both engines share the same Markdown parser and write the same number of files, so cold-build parity is the structural expectation; the dev loop is where the architecture actually pays.

*The numbers above come from the project's internal benchmark notes; the harness ships with the open-source release so they can be reproduced rather than believed.*

## From directories to a deployable site

A site is a set of **modules** (services, work, research), each module a set of **pages**, each page a **content directory** of Markdown with YAML frontmatter, rendered through a **template resolved by naming convention**. Configuration is data, content is files, output is plain static HTML any host can serve.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Taj Mahal pipeline: modules and YAML configuration feed content discovery, templates are resolved by naming convention, the Taj Templates engine and asset pipeline render, and static output is produced; a note marks that routing and configuration changes are startup-time decisions">
  <g font-family="inherit" font-size="12">
    <rect x="40" y="34" width="200" height="52" rx="9" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.4)"/>
    <text x="140" y="56" text-anchor="middle" fill="rgba(255,255,255,.85)" font-weight="600">modules + YAML config</text>
    <text x="140" y="74" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10.5" font-family="Consolas, monospace">tajmahal.yaml, module.yaml</text>
    <path d="M240 60 L296 60" stroke="rgba(255,255,255,.35)" stroke-width="1.4"/>
    <rect x="298" y="34" width="180" height="52" rx="9" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.4)"/>
    <text x="388" y="56" text-anchor="middle" fill="rgba(255,255,255,.85)" font-weight="600">content discovery</text>
    <text x="388" y="74" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10.5" font-family="Consolas, monospace">module/page/index.md + sections</text>
    <path d="M478 60 L534 60" stroke="rgba(255,255,255,.35)" stroke-width="1.4"/>
    <rect x="536" y="34" width="184" height="52" rx="9" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.4)"/>
    <text x="628" y="56" text-anchor="middle" fill="rgba(255,255,255,.85)" font-weight="600">template resolution</text>
    <text x="628" y="74" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10.5" font-family="Consolas, monospace">page name -> theme template</text>
    <path d="M628 86 L628 130 L448 130 L448 150" stroke="rgba(255,255,255,.35)" stroke-width="1.4" fill="none"/>
    <rect x="298" y="152" width="300" height="52" rx="9" fill="rgba(20,207,147,.1)" stroke="rgba(20,207,147,.55)"/>
    <text x="448" y="174" text-anchor="middle" fill="#14cf93" font-weight="600">render + asset pipeline</text>
    <text x="448" y="192" text-anchor="middle" fill="rgba(255,255,255,.55)" font-size="10.5">Taj Templates engine; SCSS/JS built via esbuild, content-hashed</text>
    <path d="M448 204 L448 228" stroke="rgba(255,255,255,.35)" stroke-width="1.4"/>
    <rect x="318" y="230" width="260" height="46" rx="9" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.45)"/>
    <text x="448" y="250" text-anchor="middle" fill="rgba(255,255,255,.85)" font-weight="600">static output</text>
    <text x="448" y="266" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10.5">portable HTML - any host, no runtime, no bills</text>
    <text x="140" y="250" text-anchor="middle" fill="rgba(255,200,120,.75)" font-size="10.5">routing + config are</text>
    <text x="140" y="265" text-anchor="middle" fill="rgba(255,200,120,.75)" font-size="10.5">startup-time decisions</text>
  </g>
</svg>
<figcaption><strong>Configuration is data; content is files; output is portable.</strong> Routing and module structure are resolved when the server starts - a deliberate boundary that keeps the rendering path simple and the output deterministic, at the cost of a restart when the site's shape changes.</figcaption>
</figure>

## Modular: composition at every layer

- **Modules** - blog, docs, projects each drop in as a self-contained unit with its own `module.yaml`, content, routes and configuration. This is a real one, from the configuration rendering the page you are on:

```yaml
name: labs

pages:
  - internet-object: /foundry/internet-object/
  - uexl:            /foundry/uexl/
  - signals:         /foundry/signals/
  - foundry:         /foundry/
  - products:        /products/
```

- **Themes with real inheritance** - `base:` lets a theme extend another and override only what it needs.
- **Components with props and named slots** - a named unit owning its markup, its typed contract, **and its own scoped CSS and JS**. Server-rendered, so the content is real HTML in the page source - SEO-clean, with no client framework shipped to the reader.
- **The rest of a real site's needs** - asset and library pipeline (SCSS + esbuild, content-hashed), i18n, feeds, sitemaps, redirects, derived views.

Site-wide facts live once in `tajmahal.yaml` and flow to every template as context - the Foundry registry behind this very page's menus and hub is a single YAML list, because a fact typed twice eventually becomes a lie.

## Super easy: nothing to relearn

- **Markdown and YAML.** No database, no server, no build configuration to learn.
- **Familiar templates on day one** - macro and call tags, imports and template inheritance work the way template engines have taught everyone to expect, so existing themes and habits port without a rewrite. Familiar on day one, powerful on day two.
- **Its own engine.** Taj Templates was built for this framework - compile-once, thread-safe by construction, a zero-allocation render path, and errors that point at the line. Older Pongo2-dialect themes still render through a compatibility translator.
- **Single binary, static output.** Runs free on GitHub Pages, S3 or any CDN. No server, no database, no bills, nothing to hack.

## Dogfooding, verifiable from outside

- **This site.** Every page of maniartech.com is Taj Mahal output - view source on any of them.
- **A client's public site.** [chemotestlaboratory.com](https://chemotestlaboratory.com), the public site of a 35-year, NABL-accredited testing laboratory, is rendered by Taj Mahal - its footer reads "Powered by ManiarTech."

Not screenshots of a tool - live sites you can inspect from the outside.

## Known limits

- **Startup-only configuration.** Routing, module structure and page shape are read at startup; changing them means restarting the server. A deliberate trade for a deterministic render path - and a real habit its users must learn.
- **Cold full builds are parity, not dominance.** Same Markdown parser as Hugo, same files written - the framework's speed story is the dev loop and warm builds, and this page claims exactly that.
- **The benchmark harness is not yet public.** The dev-loop numbers come from the project's internal benchmark notes; reproduce-it-yourself arrives with the open-source release.
- **Private source; no licence published**, because nothing is released. "Open source planned" is intent, not a present grant.

## Status: four facts, kept separate

- **Availability** - **private.** Used in ManiarTech's internal production work today.
- **Licence** - none published.
- **Maturity** - **production-dogfooded**: this site and live client sites are rendered by it.
- **Adoption** - not available yet. An open-source release is planned; qualified customers can request a technical walkthrough meanwhile.

## What this demonstrates

The architecture bet - render one page on demand instead of building the world - is what makes a 100,000-page site open as fast as a 100-page one, and it took building a template engine, a module system and an asset pipeline to hold that bet end to end. Operating the result across our own and client production sites for years is where the design earned its adjectives. That is the judgment an enterprise customer draws on when we design their content platform or any system where the loop a human lives in matters more than the batch job nobody watches.
