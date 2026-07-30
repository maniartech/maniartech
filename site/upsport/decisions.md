---
title: "The calls that mattered"
---

## The calls that mattered

**Prove it before promising it.** The draw-on-live-video studio sat at the edge of what browsers could do in 2019. We refused to bet the client's build on an assumption: we built a proof-of-concept first, purely to establish that the browser could carry live capture plus live annotation. Only when the PoC held did we commit to the full build. A few weeks of de-risking against a venture-scale promise - an easy call, made deliberately.

**Keep the studio entirely in the browser.** No downloads, no desktop app, no plugins - a coach opens a match video anywhere and goes straight to work. That was the product's promise, and it dictated the hardest engineering: everything, including the drawing on moving video, had to be captured live, client-side, with WebRTC.

**Draw on our own framework.** For live annotation over running video we used WebDoodling, our own canvas framework, rather than forcing a general-purpose library into a job at the edge of its design. When you are pushing a platform to its frontier, owning the drawing layer - and being able to fix it at the source - matters.

**Stay small and senior.** The whole platform was built from scratch by a two-person team, with the architecture and the complex core led by our founder. Frontier work is not where you scale headcount; it is where you concentrate experience.
