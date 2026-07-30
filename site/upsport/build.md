---
title: "What we built"
---

## What we built

A small ManiarTech team - two people, with our own architect leading the core and the hardest parts - built the platform from scratch.

The first version was the recruitment platform: profiles and an advanced search engine so coaches, agents and recruiters could find players. Straightforward engineering, deliberately so.

The heart of the build came next: an **in-browser video-review editor**. A coach plays a player's uploaded match footage and works on it live:

- **records voice commentary** over the video as it plays;
- **draws directly on the running video** - not on a paused frame, on the moving picture - to show a player exactly what to fix;
- **sets markers and comments** at the moments that matter;
- **slows the video down or speeds it up** to study a movement.

And the part that made it hard: all of it, including the drawing on the moving video, is **captured live, in the browser** - so what the coach produces is a finished, watchable review a player can learn from.

For the live capture we used **WebRTC**. For drawing on the running video we used **WebDoodling, our own canvas framework** - real production use of technology we make ourselves. Because the whole concept sat at the frontier of what 2019 browsers could do, we built a **proof-of-concept first**, to prove the browser could support live capture and live annotation before committing to the full build.

As the product evolved toward working with sports academies, we extended the platform with academy-specific logins, so an academy could adopt it to develop its own players.
