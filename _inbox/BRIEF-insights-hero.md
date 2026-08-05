# BRIEF: the /insights/ hero visual

> **STATUS: SUPERSEDED (2026-08-05) - kept as the record of how the brief was framed, not as work
> to do.** This brief commissioned a visual for the *right-hand half* of a two-column hero. That
> structure is gone: `/insights/` now has a full-view band hero (`min-height:100svh`, statement
> centred above a proof strip built from `heroProof:` frontmatter), and the lesson that ended the
> search was that the hero had to be a **control, not a picture** - see RESUME.md part 6 and the
> page-design thumb rules in CLAUDE.md. Read the eight rejected concepts below for why the
> obvious answers fail; ignore the slot geometry in section 2.

**Original status:** open. Eight concepts have been rejected (listed below). The visual direction is
deliberately NOT specified here - that is the thing being commissioned.

**Owner:** Aamir Maniar. **Repo:** `maniartech.com/maniartech`, branch `v2`.
**Read first:** `RESUME.md`, then root `CLAUDE.md`. This brief assumes both.

---

## 1. The job

The right-hand half of the `/insights/` hero is a visual slot. Its current occupant does not earn
its space. Replace it.

**Page:** `/insights/` - the engineering blog index. 13 posts, listed below.
**Audience:** two kinds, and the piece has to survive both.
  - A **buyer** evaluating an offshore engineering firm. Skeptical. Four of the 13 posts are
    written for them (cost, in-house vs outsourced, choosing a partner, what a LIMS costs).
  - An **engineer** deciding whether this team is any good. Nine posts are for them.

**What the hero must do:** make a stranger want to read something in the archive. That is the
whole test. It is not there to state our values, describe our publishing cadence, or decorate.

**Site objective it serves:** close the offshore trust gap through radical verifiability
(`_inbox/PRESENTATION-DOCTRINE.md`). Their safety first, our brilliance last, every claim checkable.

---

## 2. Where it goes, exactly

| | |
|---|---|
| Template | `themes/maniartech/templates/insights.html` - the `.hub-viz` figure in the hero row |
| Slot size | `col-lg-6`; canvas is 100% width, height `clamp(240px, 26vw, 330px)`. Roughly **635 x 330** at 1440px |
| Mobile | Same slot, stacked below the copy, roughly **360 x 250** |
| Mini-app | `themes/maniartech/lib/hub-viz/hub-viz.js` - a piece registry; add a piece and mount it with `<canvas data-hub-viz="<name>" data-cap="<captionId>">` |
| Caption | An HTML `<figcaption class="hub-viz-cap">` under the canvas. Prose lives THERE, not in pixels |
| Styles | `themes/maniartech/lib/layout/_mt.scss` (loads last; win by specificity, never `!important`) |

You may replace the canvas with SVG, CSS 3D, or DOM if that serves the idea better - one existing
concept deliberately used CSS 3D because its content was words. Justify the choice.

---

## 3. Hard constraints

These are not preferences.

1. **Governing Rule #1 - never exaggerate.** Every number, claim and label must be true, sourced
   and calibrated. No invented metrics, no fabricated proof. Section 5 lists the verified facts you
   may draw on; do not add to it without a source.
2. **Brand: dark `#1a1a1a` + mint `#14cf93`.** Not navy/gold, whatever the brand guide says.
   Additional hues, if used, should come from what the theme already carries: lime `#caff33`
   (`$main_color2`), sky `#7fb0ff`, periwinkle `#a6b4ff`. Inventing a new palette needs an argument.
3. **No heavy dependencies.** Three.js is ~600 KB on a marketing hero for a firm whose pitch is
   engineering restraint. If you want 3D, hand-roll the projection or use CSS 3D.
4. **Canvas work goes through the small `R` renderer seam** in `hub-viz.js` (WebDoodling-ready),
   and does a **synchronous first draw at boot** - a hero must never flash blank.
5. **Play once, then rest WHOLE.** The final frame must be a complete, readable picture on its own.
   No empty stage waiting for a hover. Real content at rest.
6. **`prefers-reduced-motion` jumps straight to that final frame.** Interaction only after the
   geometry has stopped moving.
7. **ASCII only. No emoji anywhere** - content, headings, labels, commit messages.
8. **No horizontal overflow at 390px.** Grid items need `min-width: 0` or a wide `<pre>` pushes the
   page sideways.
9. **Accessibility:** the canvas needs a real `aria-label` describing what it shows; the caption is
   `aria-live="polite"`. Keyboard focus must be visible if anything is focusable.

---

## 4. Taj Mahal gotchas that will cost you an hour each

- **`categories` and `tags` are RESERVED frontmatter keys.** They coerce to `[]string`, so a list of
  maps under them parses to an empty slice and the template loop renders NOTHING - silently, no
  error in the log or on the page. This was live on `/services/` for weeks.
- **New frontmatter keys are startup-only.** Restart the server AND `rm -rf .cache`. Body edits
  hot-reload; frontmatter does not. Same for `module.yaml` / routing.
- **A `---` line in a markdown BODY** breaks frontmatter parsing and 404s the page.
- **`forloop.Counter` / `forloop.Last` must be Capitalized** in this binary.

---

## 5. The real content you have to work with

Everything here is published on the site today and can be used verbatim. **Nothing outside this
list may be asserted without finding a source first.**

**The 13 posts** (`research/posts/`):
`choosing-a-software-development-partner`, `cost-drivers-custom-software`, `cost-to-build-lims`,
`dogfood-first`, `from-json-to-internet-object-part-1`, `from-json-to-internet-object-part-2`,
`inhouse-vs-outsourced-development`, `lims-software-lessons`, `real-estate-presales-software`,
`rewrite-vs-refactor-strangler-fig`, `uexl-zero-alloc`, `vault-storage-localstorage-alternative`,
`we-author-standards`

**Verified figures:**

| Fact | Source |
|---|---|
| UExL: ~108 ns/op, **0 allocations**; expr ~325 ns / 4 allocs; cel-go ~348 ns / 4 allocs. String pattern match, warm-state medians, six runs, Ryzen 7 5700G / Go 1.26 | `uexl-zero-alloc` post |
| Internet Object: 3-object collection JSON 628 B -> IO 273 B (~57% smaller, ~40% smaller than *minified* JSON). Single object 190 B -> 142 B with schema, 67 B data-only. ~30% fewer LLM tokens on multi-record data | `from-json-to-internet-object-part-1` |
| Vault Storage: ~1.5 KB gzipped core (~3 KB with encryption), zero dependencies, MIT, on npm | `vault-storage-localstorage-alternative` |
| A lab system: 600+ Access forms replaced by one workflow screen, delivered ~2011, **still in daily service ~15 years on** (the lab's account) | `/case-studies/rtl/` |
| Chemo Test Laboratory: LIMS in production today on our own Processious platform; two public URLs anyone can open | `/case-studies/chemo/` |
| Touchpoint Dashboard: 2012-2018, six years, acquired by Strativity | `/case-studies/touchpoint/` |
| Content Engine: production NLP, 2010-2011 | `/case-studies/content-engine/` |
| UpSport: draw-on-video in the browser, 2019 | `/case-studies/upsport/` |
| Sales Navigator: live 2026, built in ~4 months | `/case-studies/sales-navigator/` |

---

## 6. Already rejected - do NOT re-propose

**Shipping now, and the thing being replaced:**
- **Cadence** - filler drifts past, a few pieces lift out and stay. Rejected: it is a claim about
  our publishing habits, made to someone with no stake in them. Self-regarding, and it shows
  nothing that is actually in the archive.

**Rejected 2026-08-01, all built and reviewed as working prototypes:**

| | Concept | |
|---|---|---|
| A | Claim + check - real claims in rows, each tracing to its evidence | rejected |
| B | Workbench - four panels showing the artifact kinds inside posts | rejected |
| C | One real number - the UExL benchmark drawn to scale | rejected |
| D | A claim has depth - the claim in front, four evidence layers receding in 3D | rejected |
| E | The lattice - 13 posts on a rotating sphere, edges by shared subject | rejected |
| F | Questions, answered - CSS 3D wall of cards flipping question to answer | rejected |
| G | Where we are actually deep - 3D columns, height = years of production work | rejected |

**Rejected earlier on this project** (from `RESUME.md`, different pages but the same taste):
rising-line growth timeline, empty numbered assembly slabs, anonymous dot minimaps, flat icon-card
grids, per-element hover naming on moving geometry.

**The pattern in the rejections is not stated.** Treat the aesthetic direction as genuinely open;
do not assume the failure was execution quality, and do not simply re-skin one of the above.

---

## 7. Acceptance criteria

A proposal is ready to review when all of these are true:

- [ ] Runs live at the real slot size, on `#1a1a1a`, not as a static mockup
- [ ] Legible and complete in its **resting** frame, with motion disabled
- [ ] Every fact on it traces to Section 5 or to a source you cite
- [ ] Readable at 360px wide; **0 horizontal overflow** at 390px
- [ ] `node scripts/seo/seo-check.mjs http://localhost:7000` - 0 FAIL
- [ ] Zero console errors
- [ ] `aria-label` describes the content, not the decoration
- [ ] Adds no runtime dependency

## 8. How to run and see it

```bash
tajmahal start --port 7000          # if content panics: rm -rf .cache, restart
node scripts/seo/seo-check.mjs http://localhost:7000
```

The Claude browser pane often cannot composite on this machine. Headless Chrome does, canvas
included:

```bash
chrome --headless --disable-gpu --hide-scrollbars --virtual-time-budget=8000 \
  --window-size=1440,900 --screenshot=out.png http://localhost:7000/insights/
```

Add `--force-prefers-reduced-motion` to capture the **resting** frame - rAF animations do not
finish inside the virtual-time budget. Headless enforces a minimum window width, so a
`--window-size=390` capture is cropped desktop, not a mobile render; measure mobile with a
`scrollWidth - clientWidth` probe in a real browser instead.

## 9. Deliverable

Two or three distinct directions, each running, each with a one-paragraph argument for why it
belongs on THIS page - plus what it costs and what it rules out. Not variations on one idea.
