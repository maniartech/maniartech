# site-health.mjs

On-page / technical-SEO health check for maniartech.com. Fetches a running site and verifies the
things that quietly break SEO: dead routes, missing or duplicate meta tags, canonical/OG problems,
invalid JSON-LD, localhost leaks, and the sitemap/robots files.

**It only checks CORRECTNESS, not performance.** For Core Web Vitals (speed), use Lighthouse - see
`../../CORE-WEB-VITALS.md`. This script will happily pass a page that is correct but slow.

---

## What it checks
1. **Key routes return 200** (home, all service pages, /how-we-work/, /security/, /about/, /estimate/,
   /contact/, case studies, /foundry/).
2. **Per-page head tags** - a real `<title>` and meta description; a `<link rel=canonical>` that is
   NOT localhost; presence of og:title; and no stray `localhost` URL anywhere in the HTML.
3. **Title/description uniqueness** across pages (duplicates hurt rankings).
4. **JSON-LD validity** - every `application/ld+json` block must parse (a trailing comma silently
   disqualifies a rich result).
5. **robots.txt** present and not blocking everything.
6. **sitemap.xml** present, 20+ URLs, no localhost. *(Expected to FAIL on the dev server - see below.)*

## How to run
```bash
# against the local dev server (whatever port tajmahal is on)
node site-health.mjs http://localhost:7000

# against production, after deploy
node site-health.mjs https://maniartech.com
```
Requires **Node 18+** (built-in fetch). No dependencies, no install.

## Reading the output
- `PASS` / `WARN` / `FAIL` per check, then a summary line.
- **Exit code 0** = zero failures; **exit code 1** = one or more failures. Usable in CI / a git hook.

### The one expected failure on the dev server
`sitemap.xml -> 404` is NORMAL when running against `tajmahal start`. Taj Mahal only writes the
sitemap during `tajmahal build`, not on the dev server. So locally, everything-green-except-sitemap
is a pass. Against the deployed site, the sitemap must be present - if it 404s in production, that is
a real failure (see `../../SITEMAP-GUIDELINES.md`).

## When to run it
- **Every Friday** (the weekly routine's verification step).
- **Before announcing anything** on launch day - all green (bar the dev-server sitemap note) first.
- **After any template or config change** that could touch the head, routing, or schema - this is how
  the forloop-casing and localhost-canonical bugs were caught this session.

## Safety - dos and don'ts
- **DO** run it as often as you like. It is **read-only**: it makes GET requests and prints a report.
  It writes nothing, changes nothing, submits nothing.
- **DON'T** confuse a green result with "good SEO" - it means the on-page mechanics are correct, not
  that you rank. Rankings need content + links + time (see the growth program).
- **DON'T** point it at a site you do not own (it is harmless GET traffic, but keep it to maniartech.com).
- No secrets, no keys, no network writes - nothing to leak.

## Extending it
The route list and checks are plain JS at the top of the file. Add a route to `KEY_PATHS` when a new
important page ships. Keep it dependency-free.
