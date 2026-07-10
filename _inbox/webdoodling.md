# Inbox Dossier — WebDoodling

> Collection doc (not a page yet). Source: local repos wd-ts (modern rewrite) +
> webdoodling-old (legacy), esp. wd-ts/docs/why-webdoodling.md. Status: **collected**.

**Classification:** ManiarTech® **Labs** — Open-source creative-coding library.
**STATUS: UNDER DEVELOPMENT (modern rewrite).** Legacy version existed years ago;
new TS version is a ground-up rewrite "with lots of learning." **Playground coming
soon** (per Aamir). Not yet published — do NOT push `npm i webdoodling` yet.
**One-liner:** A powerful 2D canvas library for creative coding — *"Bring the WOW to
your canvas."* Flutter-grade rendering + CSS-grade layout + jQuery-like queries +
reactive bindings.

---

## 1. Identity

| Field | Value |
|---|---|
| Name | WebDoodling |
| Type | 2D graphics / creative-coding library (canvas scene graph) |
| Lang | TypeScript (ESM + CJS), tree-shakeable |
| Author | Aamir Maniar / ManiarTech® |
| License | **MIT** |
| Repo / npm | github.com/maniartech/webdoodling · npm name `webdoodling` |
| Target version | **2.0.0** (rewrite; the "2.0" reflects new gen vs legacy) |
| Node | ≥18 |
| Status | **In active development**; playground imminent; legacy v1 long deprecated |
| Note | wd-ts/README.md is just a stub; real positioning lives in docs/why-webdoodling.md + docs/book/ |

## 2. Positioning / hook

- **Tagline:** "**Bring the WOW to your canvas.**"
- Pitch: "Flutter-grade rendering with CSS-grade layout, jQuery-like queries, and
  reactive bindings — superpowers other canvas libraries don't have."
- Thesis: *most canvas libs treat layout as an afterthought; interactivity then fights
  positioning.* WebDoodling fixes the architecture.

## 3. Differentiators (genuinely novel — this is a strong story)

1. **True layout engine** — **Facebook's Yoga (Flexbox)** on canvas + anchor + grid
   positioning. No manual x/y math. *(No major canvas lib does real Flexbox.)*
2. **Layout + Transform separation** ("secret weapon") — layout `x/y` vs visual
   `translate/rotate/scale` are independent; drag without breaking layout, `resetTransform()`
   snaps back. Solves the classic drag-vs-layout conflict.
3. **Query engine** — CSS selectors for canvas: `scene.query('.enemy:visible')`,
   `queryOne('#player')`, pseudo-classes — jQuery-for-canvas at 60 FPS.
4. **Expression language + reactive bindings** — `earth.bind('x', "$('#sun').x + 150*cos(time)")`.
   Safe (no eval, sandboxed), serializable (strings → JSON), zero-GC (compiled once),
   extensible (register custom fns). *(Thematically kin to UExL — possible synergy story,
   but it's WebDoodling's own ExpressionFunctions; don't claim it IS UExL unless confirmed.)*
5. **Multiple renderers** — Canvas2D (~50KB), **CanvasKit/Skia** (Flutter-grade text/AA,
   ~3MB), WebGL — same scene API, swap backend.
6. **Behavior system** — composable Draggable/Resizable/Rotatable/Hoverable without
   inheritance; custom behaviors with lifecycle hooks.
7. **O(1) hit testing** — color-buffer technique, one-pixel read; instant even at 10K objects.
8. **Layer system** — static-background caching vs animated content for big perf wins.
9. **Full serialization** — entire scene (objects, styles, behaviors, bindings, animations)
   ⇄ JSON; editor-friendly.
10. **Asset system** — batch loading, progress, retry, format fallbacks (WebP→PNG),
    images/SVG/JSON/text/fonts/binary.
11. **Frame-rate-independent animation** with auto-pause when off-screen; easing API.
12. **Unified pointer events** (mouse/touch/pen, CSS-scale & scroll aware) — no
    getBoundingClientRect math.
13. **Tree-shaking first**, **TypeScript-typed**, **extensible at every level**
    (objects, styles, behaviors, paths, hit regions via `@register`).

## 4. Competitive framing (their comparison tables — ready content)

Positioned vs **PixiJS** (games/sprites — WD wins on layout/UI/architecture), **Fabric.js**
(image editing — WD wins on scene graph, renderers, assets), **Konva** (general — WD wins on
layout, transform separation, query, assets). Honest: PixiJS still wins raw 10K-sprite
throughput; WD wins complex UI/interactive architecture. *(Keep that honesty.)*

## 5. Vision / roadmap (nice "where it's going" material)

- **Applets** (planned): plug-and-play interactive mini-apps — scratch cards, jackpot
  wheel, jigsaw, memory game, quiz, drawing pad, generative art, particle sims, etc.
  Customizable props + events. Strong demo/marketing surface once the playground lands.

## 6. Use cases / SEO

Animations & effects, design tools/editors (Figma-like, whiteboards, diagram/flowchart),
data viz (interactive dashboards, custom charts), game UIs, interactive experiences
(configurators, edu simulations, storytelling), generative/creative art.
SEO: "canvas library", "creative coding JavaScript", "canvas scene graph", "PixiJS
alternative", "Konva alternative", "flexbox canvas", "interactive canvas animations".

## 7. Site placement (decide at `_ia` phase)

- **Now:** "In development — playground coming soon" Labs teaser. Lead with the tagline
  + the 3 headline superpowers (Flexbox layout, query engine, reactive bindings) + the
  comparison angle. Link repo if/when public; DON'T push npm install yet.
- **On playground launch:** upgrade to a showcase page — **live interactive demos/Applets**
  are the perfect "WOW" proof. This is the most *visually demoable* item in all of Labs;
  it deserves the richest media treatment when ready.

## 8. Open questions for Aamir

- [ ] **Playground URL & ETA** (you said "soon") — gates teaser → showcase flip.
- [ ] Repo public yet, or private until launch? (No npm-install CTA until published.)
- [ ] Does WebDoodling's expression language relate to **UExL** (shared engine?) or fully
      independent? (Affects whether we tell a "one expression language across our stack" story.)
- [ ] OK to publish the PixiJS/Fabric/Konva comparison tables (names competitors)?
- [ ] Target audience emphasis: creative coders/indie devs, or enterprise interactive UI?
- [ ] Want to feature the **Applets** vision publicly now, or hold until demoable?
