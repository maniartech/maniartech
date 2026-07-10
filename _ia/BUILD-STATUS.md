# maniartech.com v2 — build status (historical, 2026-07-04)

> ⚠️ **The current resume anchor is `/RESUME.md` at the repo root** — read that first.
> This file is kept for the as-built architecture + Taj Mahal gotchas below (still accurate),
> but predates the Foundry / AddressQL·PressML renames / interactive About & Home work.

**State (2026-07-04): ALL PAGES BUILT & RENDERING (every route 200, no server errors).**
Content was drafted in `_ia/`; transformed into Taj Mahal pages. Dark+mint brand intact
(#1a1a1a bg / #14cf93 mint — verified in DOM). Presentation Doctrine ordering + Governing
Rule #1 honesty honored; every `[note]`/`[PLACEHOLDER — needs Aamir]` respected (gated claims
omitted, not faked; link-dark where work isn't public).

## Architecture (as built)
- **`site` module** — general pages: home · about (content-directory: founder/work/team/drivers
  section files) · services hub + 4 service details (enterprise-software-engineering,
  application-software-engineering, ai, modernization) · case-studies hub + 6 details
  (chemo, rtl, sales-navigator, touchpoint, content-engine, upsport) · standards · estimate ·
  contact · careers · partnerships.
- **`labs` module** — everything we MAKE, per Aamir (2026-07-04, "move products into labs module"):
  Labs hub + 7 flagship details (indigo, internet-object, uexl, signals, gotime, vault-storage,
  tajmahal-ssg) AND Products hub + 5 details (processious, ordin, documentor, tallery-gallery,
  booster). URLs unchanged (/labs/*, /products/*); pure module reorg, nav unchanged.
- **`insights` module** = `/insights/*` list/article (4 seed posts, all "Coming soon").
- **`white-papers` module** = `/white-papers/*` list/article (3 papers, "In preparation").
- Detail collections share templates via one-line `{% extends %}` shims (case-detail, lab-detail,
  service-detail, product-detail, page). Hubs (services/case-studies/labs) drive cards from
  frontmatter arrays (pageContext.*). List pages read framework `articles` (custom fields like
  `a.postStatus` DO surface — verified).

## ⚠️ Taj Mahal gotchas discovered this build (field-verified against the binary)
1. **List-page `content:` must be a BARE collection name, not a path.** `content: ./posts/`
   PANICS the whole server: `SECURITY: invalid table name 'insights_./posts/'`. Use
   `content: posts` (subdir under the module). Restart + `rm -rf .cache` after.
2. **A `---` thematic break in a markdown BODY breaks frontmatter parsing → `invalid-document`
   (page 404s).** The parser only tolerates the 2 frontmatter delimiters; a 3rd `---` anywhere
   in the body corrupts the doc. Keep bodies free of `---` rules. (Was hit in ~15 agent-authored
   files; fixed by stripping body `---`.)
3. (Known) After moving/renaming content or editing module.yaml: stop `tajmahal`, `rm -rf .cache`,
   restart — cache is sticky and a bad config can leave a corrupt table.

## ⚠️ Flags for Aamir (decisions / inputs — NOT blockers, pages ship honest without them)
- ~~UpSport anonymized/testimonial inconsistency~~ RESOLVED 2026-07-04: case study now names Jeff Hines +
  IntelMaven LLC (company), matches the home testimonial, and drops the "venture closed" framing per
  Aamir's recorded respect-decision. Home testimonial keeps "UpSport IO" (product brand).
- **ISO cert numbers** (123961/B/0001 & /A/0001): omitted pending verification (recert audits
  Jul/Aug 2026). Add once confirmed. Currently pages state "ISO 9001/27001 certified (URS/UKAS)".
- **Client-proof lines** on service pages: gated ones were omitted (no fabricated outcomes).
  Confirm anonymized Enterprise/Application client outcomes to strengthen those pages.
- **Live links to gate on publish**: UExL playground (dark now), IO playground/repo (live),
  repos per labs page. Verify each before public launch.
- Insights posts + white papers are honest **stubs/outlines** ("Coming soon"/"In preparation") —
  write the real pieces later; never shown as published.

## Optional / not done
- Retrofit home + products spotlights to the content-directory pattern (still hardcoded in
  templates; functional and on-brand — low priority).
- 10 remaining Labs projects shown on the hub as "Detail coming" (nites, fuse, iql, xlib, gowork,
  gocurl, orchestrator, mdkit, webdoodling, printeer) — pass-2 detail pages when ready.
- Maturity-ladder ("graduated") system — ON HOLD per Aamir.

## How to run
`tajmahal start` (port 8085 via .claude/launch.json). If it panics/500s on content: stop tajmahal,
`rm -rf .cache`, restart.
