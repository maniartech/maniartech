# The Keystone Film

A pilot scene built to a cinematic standard, so the quality bar can be judged before anything else
is made. It is the visual form of ManiarTech's Keystone idea: a documented system holds the load,
not a person.

**Open `index.html`** in a browser (needs internet for GSAP, three.js and fonts).

## What happens (about 14.5 s)

1. Lights come up. The camera pushes in slowly.
2. Eight stones (departments) land in pairs, bottom up, each raising dust.
3. The camera leans in on the empty top. The mint keystone is lowered, hesitates, then locks:
   sparks, a shockwave on the floor, a flash of light, a lens kick and a short camera shake.
4. The timber scaffolding falls away. The camera pulls back and orbits.
5. "A system that stands on its own." fades in. Slow drifting motes keep the frame alive.

Controls: Pause or Play, Replay, and a scrubber. It rests on the finished frame at load and plays
once when scrolled into view. Reduced-motion stays on the finished frame.

## How it is made

- three.js r147 (pinned: the UMD post-processing scripts were removed in later versions), GSAP 3.12.
- Extruded annular-sector stones with bevels and a procedural bump texture; PBR-style standard
  material; spot light with soft shadows, mint rim light, warm fill, an impact flash light.
- Particles: custom point shader (dust and sparks), one ring mesh for the shockwave.
- Post: bloom, then one custom pass for chromatic aberration, ACES tone map, vignette and grain.
- All motion is one GSAP timeline in `build()`; camera is a small rig object tweened by the
  timeline.

## Tuning knobs (all in `index.html`)

| To change | Look for |
|---|---|
| Length | `DURATION` and the times passed to each `T.` call in `build()` |
| Mood, brightness | light intensities in `build()`, `exposure` in `FinalShader`, bloom threshold |
| Stone look | `stoneMat()` colours, `bumpScale`, `noiseTexture()` |
| Camera moves | the `cam` tweens in `build()` |
| Words | `CAPS` and the `.title` element |
| Impact weight | `shake`, `fov`, `flash` and `bloomState` tweens at 7.5 s |

## Known limits

- Tested only in headless Chrome with a software GPU at desktop size. Not yet tested on a phone or
  a real GPU, so frame rate is unmeasured.
- Without WebGL it shows a message. On the site the plan is a still frame instead.
- Stone and timber are procedural. A studio would sculpt and photo-scan them; that is the biggest
  remaining gap to film quality, along with sound.

## If it goes on the site

- Vendor the libraries into the theme (no CDN on the production site), or `npm install three` in
  the theme and import through `{% lib %}` (esbuild tree-shakes the modules). Expect roughly
  600 KB before compression.
- Load only when the section scrolls into view, pause off-screen, cap pixel ratio, and show a still
  frame for no-WebGL, small screens and reduced motion.
- Put the words in frontmatter so the copy lives once.
- Label the scene "illustration" if it sits next to factual claims.
