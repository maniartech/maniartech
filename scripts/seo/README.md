# seo-check - the SEO gate for maniartech.com

Crawls the running site by following every internal link, audits each page
against the checklist below, and exits non-zero on any FAIL - so it can gate
a deploy. No dependencies; Node 18+.

## How to run

Against the dev server (most common):

```
node scripts/seo/seo-check.mjs http://localhost:7000
```

Against the BUILT site (what will actually deploy - run this before every
release): build first, serve the build with the `static` launch config
(port 8099) or any static server, then:

```
node scripts/seo/seo-check.mjs http://localhost:8099
```

The exit code is 0 only when there are no FAILs. WARNs never fail the run -
they are judgment calls for a human.

## What it checks

Per page (every page it can reach from `/` by internal links):

| Check | Level | Rule |
|---|---|---|
| HTTP status | FAIL | every crawled page must be 200 |
| `<title>` | FAIL missing / WARN length | present, unique site-wide, 25-65 chars |
| meta description | FAIL missing or duplicate / WARN length | present, unique, 70-165 chars |
| `<h1>` | FAIL | exactly one per page |
| canonical | FAIL | present, absolute https, not localhost; WARN if path differs |
| robots meta | WARN | flags noindex so it is always a deliberate choice |
| Open Graph | FAIL og:title/description/url/type; WARN og:image | link previews depend on these |
| twitter:card | WARN | |
| JSON-LD | FAIL | every block must parse as JSON |
| image alt text | FAIL missing / WARN empty | every `<img>` needs an alt attribute |
| image lazy-loading | WARN | non-logo images should carry `loading="lazy"` |
| heading order | WARN | no h2 -> h4 skips, measured on CONTENT only (nav/footer/mobile-menu stripped) |
| thin content | WARN | under ~150 words (list pages exempt) |
| `<html lang>` | FAIL | |

Site level: robots.txt present and not blocking everything (FAIL), sitemap.xml
present with no localhost URLs (WARN when missing - generation is owned by
Aamir at build time), favicon (WARN).

## How pages control their SEO text

Frontmatter overrides, consumed by `base.html` - they change ONLY the meta/
snippet layer, never the visible H1 or page copy:

```yaml
titleTag: "Short, Keyword-Bearing Title"        # replaces title in <title> and og:title
seoDescription: "A 70-160 char description."    # replaces description in meta/og
```

Editorial titles stay long and human on the page; titleTag is what Google
shows. Craft it for the searcher: the buyer vocabulary, under ~52 chars
(the " | ManiarTech" suffix adds 13).

## Known, accepted WARNs (do not chase these)

- `sitemap.xml missing` on the dev server - sitemap generation happens at
  build time and is owned by Aamir. The check stays as a WARN so the BUILT
  site run still verifies it.
- `heading skip` on `/`, `/services/`, `/contact/`, `/foundry/`, `/products/`,
  `/white-papers/` - card/door titles use h3/h5 by the theme's typography
  scale. Heading order is an accessibility nicety, not a ranking factor;
  restyling card headings is not worth the churn. Revisit only in a theme pass.

## Dos and don'ts

- DO run against the dev server after editing frontmatter - and note that
  NEW frontmatter keys need a server RESTART (+ `rm -rf .cache`) before they
  render; body edits hot-reload, frontmatter does not.
- DO run against the built site before any deploy; treat FAIL as a blocker.
- DO keep titleTag/seoDescription honest - they are claims in search results;
  Governing Rule #1 applies to snippets too.
- DON'T stuff keywords. One clear phrase beats three crammed ones.
- DON'T mark a page noindex casually; the WARN exists so it is always a choice.
- DON'T raise the length limits to silence warns - shorten the text instead.
- The label-vs-destination rule from the link work applies here in spirit:
  a titleTag must describe the page it sits on.

## Relationship to site-health

`_marketing/growth/scripts/site-health/` checks operational health (routes,
uniqueness, JSON-LD parse, robots). This script is the SEO-depth gate and
overlaps it deliberately - either can catch a regression the other misses.
