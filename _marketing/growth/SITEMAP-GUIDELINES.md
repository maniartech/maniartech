# sitemap.xml - guidelines & acceptance checklist

> Aamir owns getting Taj Mahal to emit a correct sitemap (framework side). This doc is the SPEC:
> what "correct" means, how to verify it, and the gotchas specific to this project. Pair with
> `scripts/site-health/site-health.mjs` (which checks the served sitemap once it exists).

## What it is and why it must be right
A single XML file at `https://maniartech.com/sitemap.xml` listing every indexable URL, submitted
to Google Search Console + Bing on day one. It is how the crawler discovers all ~36 pages instead
of finding them link-by-link. Because the old live site is a single page, the sitemap is doing
real discovery work from launch - it has to be complete and it has to carry absolute production URLs.

## How Taj Mahal generates it (per the framework book, Part 9 / Ch31)
- The sitemap is a **build artifact**: written during `tajmahal build`, NOT served by the dev
  server (`tajmahal start`). So a 404 at `localhost:.../sitemap.xml` on the dev server is EXPECTED;
  it only appears in the build output. (This is why `site-health.mjs` reports it as the one FAIL
  in dev - ignore that FAIL locally, enforce it against the deployed build.)
- It is written to the root of the build output (`/sitemap.xml`), one `<loc>` per generated HTML
  content URL - list pages, article pages, general pages, taxonomy/archive views.
- It is **always written** (no opt-in). Excluded automatically: `feed.xml` files and any page with
  `mode: json` (anything ending `.xml`/`.json`).
- Absolute vs relative URLs are controlled by ONE setting: **`url:` in `tajmahal.yaml`**.

## The critical dependency (already fixed this session)
`tajmahal.yaml` now has `url: "https://maniartech.com"`. Before this session it was
`http://localhost:8080` - a sitemap built then would have listed localhost URLs, which are useless
to Google. **The sitemap is only correct if `url:` is the production origin at build time.** Do not
build a release with `url:` pointing at localhost or a preview host.

## Acceptance checklist (all must pass before submitting to Search Console)
1. [ ] `tajmahal build` completes without error; `build/sitemap.xml` exists.
2. [ ] Every `<loc>` starts with `https://maniartech.com/` - ZERO `localhost`, ZERO `http://`.
3. [ ] URL count is ~36 (all real pages). Run: `grep -c '<loc>' build/sitemap.xml`.
4. [ ] It INCLUDES: home, all service pages, /how-we-work/, /security/, /about/, /estimate/,
       /contact/, all case studies, /foundry/ + foundry detail pages, /standards/, all
       /insights/ posts, /partnerships/, /careers/.
5. [ ] It EXCLUDES the noindex stubs - the 3 white-paper stubs (and any other `noindex: true`
       page) should NOT be in the sitemap. ** VERIFY THIS SPECIFICALLY** (see gotcha below).
6. [ ] Valid XML: opens with `<?xml ...>` and `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`.
7. [ ] Served at `https://maniartech.com/sitemap.xml` (200, `Content-Type` xml) after deploy.
8. [ ] `robots.txt` already points to it (`Sitemap: https://maniartech.com/sitemap.xml`) - confirm
       that line survives to production (it lives in `root/robots.txt`).

## ⚠ Gotchas specific to this project
- **noindex pages may still appear in the sitemap.** Taj Mahal's sitemap walks generated HTML URLs;
  it does not necessarily read our `noindex:` frontmatter flag (that flag only drives the
  `<meta name="robots" noindex>` tag in `base.html`). A page can be noindex AND in the sitemap -
  which sends Google a mixed signal (sitemap says "index me", meta says "don't"). **Check item 5.**
  If the 3 stub papers show up, options: (a) confirm whether Taj Mahal supports excluding a page
  from the sitemap (a per-page flag / `mode`), or (b) post-process the built sitemap to strip the
  3 stub URLs, or (c) publish the stubs' real content before launch so noindex is removed anyway.
  Recommend (c) long-term; (b) as a launch-day fallback (a 3-line script).
- **Dev-server 404 is not a bug** - only the build emits it (see above).
- **Stale prebuilt binary** can lag framework features; if the sitemap is missing or malformed
  after a clean build, rebuild the binary from source (per the tajmahal-ssg skill ERRATA) before
  assuming a config problem.
- **buildDir is `build/`** per tajmahal.yaml; the deploy must publish that directory's contents
  (including sitemap.xml + robots.txt) to the Pages source.

## After it is verified live
1. Submit `https://maniartech.com/sitemap.xml` in Google Search Console (Sitemaps section).
2. Submit the same in Bing Webmaster Tools.
3. Re-run `node _marketing/growth/scripts/site-health/site-health.mjs https://maniartech.com` - the sitemap
   FAIL should now be a PASS (script checks loc count >= 20 and flags any localhost).

## Nice-to-have (not blocking)
- `<lastmod>` per URL improves crawl efficiency; only add if Taj Mahal emits it accurately from
  content dates (a wrong lastmod is worse than none). Do not hand-fake lastmod values.
- `<priority>`/`<changefreq>` are largely ignored by Google now - not worth engineering.
