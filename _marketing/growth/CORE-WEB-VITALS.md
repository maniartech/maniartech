# Core Web Vitals - what was fixed, what was measured, what remains

> CWV (LCP < 2.5s, CLS < 0.1, INP < 200ms mobile) is a Google ranking factor. This doc records the
> safe fixes applied this session, the page-weight probe findings, and the measurement-gated work
> that must NOT be done blind (it would risk breaking the animation-heavy theme).

## Fixes APPLIED this session (safe, high-confidence, verified rendering)
1. **Font preconnect** - `<link rel=preconnect>` to fonts.googleapis.com + fonts.gstatic.com
   (crossorigin), added in `base.html` before the font stylesheets. Cuts the DNS+TLS handshake
   delay before fonts load -> faster text paint (LCP). Fonts already use `display=swap` (no
   invisible-text flash).
2. **Layout-shift prevention (CLS)** - explicit `width`/`height` on all 6 theme `<img>` tags
   (logo 649x212, chemo 745x560, ISO 1000x1000). The browser now reserves the correct space before
   the image loads, so nothing jumps. CSS still scales them (`height:auto` / `max-width`), so
   display size is unchanged - only the reserved aspect ratio is added.
3. **Lazy-loading** - `loading="lazy"` + `decoding="async"` on all below-the-fold images
   (footer logo, ISO badge, home + products case images, hamburger-menu logo). They no longer
   compete with the initial render.
4. **LCP hint** - `fetchpriority="high"` on the header logo (above the fold).

These are pure wins with no visual/behavioral risk. Done.

## Page-weight PROBE (home page, measured this session)
- HTML: ~195 KB
- Render-blocking in <head>: **6 CSS stylesheets + 3 font requests** (9 blocking resources)
- Shipped JS (end of body): **~675 KB** across jQuery, jQuery-migrate, plugins.js, GSAP, ScrollTrigger, + the lib bundle

Largest shipped assets:
| Asset | Size | Note |
|---|---|---|
| `js/plugins.js` | **478 KB** | All-in-one vendor bundle - the single biggest lever |
| `css/plugins/bootstrap.min.css` | 159 KB | Full Bootstrap; site likely uses a fraction |
| `js/gsap.min.js` + `ScrollTrigger.min.js` | 110 KB | Needed for the animations |
| `css/plugins/fontawesome-all.min.css` | 58 KB | Full icon font; likely few icons used |

`js/demo.js` (104 KB) exists in assets but is **NOT loaded** by base.html - dead weight on disk
only (safe to delete from the repo for cleanliness; does not affect CWV).

## Honest current assessment
The safe fixes remove the easy CLS and font-latency risks. But the **~478 KB plugins.js + ~234 KB
of plugin CSS render-blocking** is the real CWV exposure - on mobile this likely lands LCP/INP in
"needs improvement" rather than "good." The site will WORK and rank; it just will not score green
on mobile until the vendor bundles are trimmed.

## Measurement-gated work - DO NOT do blind (risk of breaking the theme)
The theme was converted from a purchased HTML theme carrying pre-built all-in-one bundles (exactly
what the tajmahal-ssg skill warns against). Trimming them is the big win but must be measured and
tested, because the gears/cube/navigator animations depend on this JS:

1. **Run Lighthouse (mobile) on the DEPLOYED site** - Chrome DevTools -> Lighthouse -> Mobile.
   Record LCP/CLS/INP + the specific "reduce unused JS/CSS" findings. This is the required first
   step; everything below is prioritized by what it reports.
2. **Trim `plugins.js`** - identify which plugins are actually used (the theme's real dependencies
   are jQuery + GSAP + ScrollTrigger + a few UI plugins). Rebuild a minimal bundle through the lib
   tree-shaking pipeline instead of shipping the 478 KB blob. Test every interactive surface after
   (nav, menu, gears, cube, service-stage, foundry map).
3. **Trim Bootstrap + FontAwesome CSS** - PurgeCSS-style pass to keep only used classes/icons, or
   subset FontAwesome to the handful of icons in use.
4. **Consider self-hosting the 2 fonts** - eliminates the external origin entirely (preconnect is
   the interim win). Must go in `assets/` unprocessed, NOT the lib pipeline (per ERRATA: url()-CSS
   in lib/ breaks the build).
5. **Re-run Lighthouse; confirm green.**

Owner: a dedicated post-launch theme-optimization pass (or before launch if time allows). Not a
blind edit - it is measure -> trim -> re-test.

## Quick verification anytime
`node _marketing/growth/scripts/site-health/site-health.mjs <url>` covers correctness (tags/schema/links), not
performance. For performance, Lighthouse is the tool - there is no honest shortcut.
