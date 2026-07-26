# Social AI Pipeline - "write, do not perform"

> The AI-driven social system. AI drafts from the repo's canon; Aamir approves; scheduler
> posts. Nothing goes out unapproved. Nothing goes out inflated.

## Channels (now)
| Channel | Role | Cadence | Automation level |
|---|---|---|---|
| LinkedIn - Aamir personal | Primary. The trust surface buyers check | 3 posts/wk | AI-draft + approve + schedule |
| LinkedIn - company page | Mirror/amplify (reshare personal 2x/wk + company news) | 2/wk | Same batch |
| X/Twitter | Dev-audience echoes of launch/benchmark content only | Launch weeks | AI-draft + approve |
| Reddit (r/golang etc.) | Launches + genuine answers ONLY | Launch playbook | **MANUAL ONLY - never automated** |
| Hacker News | Launches only | Launch playbook | **MANUAL ONLY** |
LATER: newsletter, YouTube/shorts, X as a daily channel.

## The weekly batch (what the AI session produces)
Input (Aamir's 3-5 bullets: what shipped/learned/is due) + this file + the dossiers.
Output: 3 LinkedIn posts, each delivered as:
1. The post text (ASCII, no emojis, no hashtag walls - max 3 tasteful hashtags or none)
2. Source line: which dossier/commit/page each claim traces to
3. Mini claim-audit: TRUE? SOURCED? CALIBRATED? STATUS-HONEST? (one line each)
4. Suggested slot (Tue/Thu/Sat)

## Post-type rotation (keeps the feed varied; pick 3 per week)
1. **Proof post** - a real artifact: case-study fact, live system, benchmark. Link the proof.
   ("A lab system we modernized in 2011 is still in daily use. Here is what made it last: ...")
2. **Build log** - what we are building/learned this week, maker-tone, no announcement-speak.
   (The Foundry work is endless material: Indigo decisions, IO spec notes, SSG internals.)
3. **Straight-talk post** - honest industry take from the values: when NOT to build, why we
   say no, root-cause fixes, senior-only reasoning. These earn trust and comments.
4. **Founder-story post** - sparingly (1-2/month): 27 years, FIX analyzer, bansuri/craft
   parallels. Humanizing, never chest-beating.
5. **Launch/echo post** - launch weeks only: the launch, the retro, the numbers (true ones).

## Voice rules (enforced in every draft)
- Understated maker-tone. Plain sentences. Specifics beat adjectives.
- BANNED: world-class, cutting-edge, leading, game-changer, thrilled/excited-to-announce,
  emojis, engagement-bait hooks, "Agree?"
- Hedges kept: "by the lab's account", "in the scenarios measured", "most of the time".
- Every number must be the calibrated one from canon (40-60% smaller, ~30% fewer tokens,
  ~15 years, 600+ forms -> 1). Never round up. Link the verifiable artifact when one exists.
- First line must stand alone (LinkedIn truncates); no clickbait, just the substance.

## The master prompt (paste into a Claude session in this repo)
"Run the weekly social batch. Read _marketing/growth/SOCIAL-AI-PIPELINE.md and follow it
exactly. This week's material: <bullets>. Draft 3 LinkedIn posts using the post-type rotation,
each with source line + mini claim-audit + suggested slot. Voice: understated maker-tone,
ASCII only, no emojis. Do not invent any fact not present in the repo's dossiers or my bullets."

## Approval gate (Aamir, per post, 2 minutes)
- Would I say this to a client's face? (voice check)
- Is every claim one I can back right now? (audit check)
- Does it read as bragging? (if yes: cut or reframe as lesson)
- Reject freely - a skipped post costs nothing; an inflated one costs the moat.

## Scheduling
- LinkedIn native scheduler (free, adequate). Buffer free tier if cross-posting to X.
- Slots: Tue/Thu/Sat ~08:30-10:00 IST or afternoon IST for US-morning overlap on
  buyer-targeted posts. Consistency > perfect timing.

## Comment protocol (where the real reach is)
- Reply to every substantive comment within 24h, same tone.
- 10 min/day max engaging with others' posts in the space (genuine comments, no link drops).

## Blog syndication (DECIDED 2026-07-23) - original on-site, Medium as mirror
The existing Medium publication (blog.maniartech.com) is a SYNDICATION channel, not a content home.
Flow, per post - SAME DAY is fine (Aamir's preference, 2026-07-23), in this order:
(1) publish at maniartech.com/insights/ (the canonical home - SEO and links accrue to the root
domain); (2) GSC -> URL inspection -> Request indexing for the new URL (2 min - puts the original
in the crawl queue first); (3) republish to the Medium publication via Medium's IMPORT tool (which
sets rel=canonical to the original) - never copy-paste, which loses the canonical; (4) same motion
later extends to dev.to/Hashnode (both support canonical URLs).
EXCEPTION: if canonical import is ever unavailable (fallback = "Originally published at" line
only), wait ~1 week after site publication instead of same-day.
Rationale: engineering posts are the link-magnet content that lifts the commercial pages - they
must live on the root domain; subdomain/Medium authority consolidates weakly. The "split by topic"
option (engineering -> Medium, business -> site) was considered and REJECTED for that reason.
[VERIFY once: Medium import + canonical still work on the publication; fallback = republish with
an "Originally published at maniartech.com" line.]

## Monthly light retro (last Friday, 15 min inside the Friday block)
Top 3 posts by impressions/comments -> which post-types worked -> adjust next month's rotation.
Log one line in METRICS-AND-CAPA.
