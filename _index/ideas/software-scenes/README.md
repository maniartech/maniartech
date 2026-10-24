# Software scenes (three directions)

Made after Aamir's verdict on the stone-arch pilot: "This is not looking like a software company."
The Keystone idea stays; the imagery must be software. **Open `index.html`** (needs internet for
fonts, GSAP and three.js). Each scene plays while on screen and loops.

| Scene | Story | Look | Tech |
|---|---|---|---|
| **A. The system, alive** | Work flows through layers of services; one part fails; the system routes around it | Glass modules on a dark grid, cables of light, packets, slow dolly | three.js, bloom |
| **B. Code to production** | Write the decision, the code, prove it, ship it, see it run | Real code, tests and a pipeline in floating panes the camera flies through | CSS 3D + GSAP (crisp text) |
| **C. Tangle to order** | Dependencies around one person are surveyed, documented, given layers; one contract locks in; it runs without them | A graph that rearranges itself; the person node leaves; data flows | three.js, bloom |

Suggested use: C as the Keystone Method centrepiece and the "quiet killers" problem statement; A as
the quiet continuous background for other sections; B for "how we engineer" and the hand-off.

## Status

Prototype for comparison. Awaiting Aamir's choice of direction (2026-10-20). Nothing is in the site.

## Notes

- Everything is illustrative and labelled; no invented numbers. The code, test names and the orders
  screen in B are generic stand-ins, not real project material.
- Tested in headless Chrome with a software GPU at desktop size only; frame rate on real hardware
  and phones is unmeasured.
- Known roughness: C's ordered state is a ring cage that could be shaped more like a real
  architecture diagram; A's modules are plain boxes (no labels yet); B's panes need a mobile
  layout and more content variety.
- Fixed during build: a negative first-frame time step crashed curve sampling (clamp `dt` to
  0..0.05 in any requestAnimationFrame loop).
