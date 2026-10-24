# Branch `home-work-stage` (local, uncommitted)

Everything built so far in the site itself, from branch `home-work-stage` cut from `v2` at
`e6de7db`. Nothing is committed or pushed. This folder is the safety copy: `changes.patch` holds
the diff of tracked files and `new-files/` holds copies of the five new files.

To view it: switch to the branch and run `tajmahal start` (the repo's usual command).
To restore it elsewhere: `git apply _index/ideas/branch-home-work-stage/changes.patch`, then copy
the files in `new-files/` to the paths below.

## What was built

1. **Home work stage** (under the hero): a tabbed panel with real specimens: Processious (the Chemo
   screenshot, demo data), Internet Object (JSON next to Internet Object, with the published
   benchmark and its caveat), UExL (real syntax), Taj Mahal (the real `site/module.yaml`). Each tab
   carries its register status chips and a verify link only where the project is public. A
   four-cell proof strip sits between the hero and the stage. Data lives in `site/home/index.md`
   (`workStage`); `scripts/seo/seo-check.mjs` fails if the chips drift from each project page's
   status line.
2. **Four living service cards** ("Four ways we build"): 01 blueprint-to-production slider, 02 seams
   swapped while requests flow (with Roll back), 03 a source check at a gate (toggle), 04 the
   tamper test. Cards 02 and 03 were liked; 01 and 04 were redone twice.
3. **About hero:** the cube's six faces are the six "How we work" principles (numerals, turning
   gears, chips to turn to a face, a link into the matching tab, and tab clicks turn the cube).
   A facts strip under the hero (entity and place, since 2010, ISO with certificate numbers,
   public repositories).

## Files

New: `themes/maniartech/templates/includes/work-stage.html`, `lib/js/stage.js`,
`lib/js/practice-live.js`, `lib/layout/_stage.scss`, `lib/layout/_practice-live.scss`.

Changed: `site/home/index.md`, `templates/home.html`, `templates/about.html`,
`lib/style.scss`, `lib/layout/_mt.scss` (old service-card vignette rules removed),
`lib/cube-viz/cube-viz.js`, `lib/how-showcase/how-showcase.js`, `scripts/seo/seo-check.mjs`.
(`seo-check.mjs` already had an uncommitted edit by Aamir before this work; the patch mixes both.)

## Checks last run (2026-10-11)

`check-site.js` 0 errors, `tajmahal routes` OK, `tajmahal build` OK, `seo-check` 0 FAIL (5 known
warnings). Interactions tested by script at 1440 px; no horizontal overflow at 390 px.

## Known follow-ups

- Aamir judged the SVG-grade animation too basic; the new standard is the keystone-film.
- The Home copy below the hero still needs the specific, sourced rewrite.
- About: UExL `go get` line, Countrywide bolding, team-paragraph wording (see `site-review-2026-10`).
- "RTL: modernized in production" on service card 02 is a client case study; wording undecided.
