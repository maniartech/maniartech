# Continuous motion system

**The brief (Aamir, 2026-10-20):** the best quality, but simple, continuous animation of
excellent grade, for various sections of the page.

Read as a design rule: one calm, always-moving idea per section, built with restraint and
precision (see the correction below), never busy. Motion that loops forever (ambient), with a deliberate moment only
where the story needs it.

## Correction (2026-10-20)

Aamir: "Too much Hollywood. Should be balanced like an Apple website, good effects with telling real
things. Effects and interactions should simplify the explanation of the concept." The seven rules in
`../method-explained/README.md` override anything below that suggests spectacle. Film-grade 3D
(`keystone-film`, `software-scenes`) is no longer the target.

## Principles

1. **One motion per section, and it explains that section.** No decoration.
2. **Continuous, not triggered.** Slow loops (8 to 20 s) that never snap or restart visibly; a
   visitor can arrive at any moment and still see something alive and meaningful.
3. **Simple shapes, excellent finish.** Few objects, but real lighting or crisp vector craft, one
   easing family, one palette (dark, mint, a single warm accent for "warning").
4. **Real content at rest.** The first still frame must already say something. Reduced-motion
   shows that frame.
5. **Quiet for the reader.** Nothing moves faster than the eye can ignore while reading; text never
   sits on a moving high-contrast area.
6. **Cheap by default.** Three tiers, chosen per section: CSS/SVG, Canvas 2D, WebGL. Start in the
   cheapest tier that can reach the finish. Pause off-screen. Cap pixel ratio.
7. **Honest.** Everything illustrative is labelled and carries no invented numbers.

## Section map (proposal)

| Section | Continuous idea | Tier |
|---|---|---|
| Hero | Keep the gears. Optionally a slow light sweep so they read as machined metal | existing canvas |
| Work stage (tabs) | Each specimen breathes: the wireframe-to-production sweep, hash seals re-verifying | CSS/JS, done |
| What we do (four cards) | Living vignettes per card, one running at a time | SVG/JS, done |
| Client proof | Slow parallax drift across the real Processious screen, status chips ticking | CSS |
| Why it is safe | A seal that turns slowly with the audit trail reading around its rim | Canvas |
| Founder | A career timeline line that draws itself continuously from 1999 to now, pausing on milestones | SVG |
| The method | The five-stage arch loop: survey scan, records into ledger, blueprint draw, keystone, load | WebGL (film standard) |
| The quiet killers | The org network with a slow pulse; the person node dims and re-lights | Canvas |
| What drives us | The Foundry graph as a slow constellation; edges shimmer, status labels honest | Canvas (exists) |
| Close | The finished arch, idle, with drifting light, behind the call to action | WebGL (reuse keystone) |

## Build order

1. Rebuild "the method" to the film standard (it is the centrepiece).
2. The quiet killers, then the close.
3. The seal and the founder timeline (cheap tiers).
4. Foundry graph polish.
Each reviewed with Aamir before the next, on a branch, uncommitted.

## Open questions

- Is the film-grade 3D acceptable on every section, or only the method and the close?
- Sound: none by default; is an optional muted-by-default ambient track wanted?
- Mobile: still frames, or a lighter loop?
