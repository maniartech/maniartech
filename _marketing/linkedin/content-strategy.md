# LinkedIn content strategy - authority posts, not capability posts
(2026-08-28 | three revisions same day: buyer-first correction, then external research, then the
teardown redesign)

Companion to `profile-and-strategy.md` (the profile itself). That doc fixes the landing page; this
one decides what gets published on it and why. Governed by `_inbox/PRESENTATION-DOCTRINE.md` and
Governing Rule #1 (never exaggerate). Drafts live in `post-drafts.md`.

---

## The decisions (Aamir, 2026-08-28)

A drafted post listing four things we author (Internet Object, PressML, Indigo, UExL) was
**discarded before publishing** - Aamir's read: "this looks like a marketing message."

He is right, and the doctrine already said so. `PRESENTATION-DOCTRINE.md`, first entry under DON'T:

> Lead with "we make technology / five standards / a programming language." From a company they've
> never heard of, it sounds *inflated*, not impressive ("if it were real, I'd have heard of them").

**DECIDED:**
1. **LinkedIn is a prospect channel. Every LinkedIn post is buyer-first, without exception.**
2. **Technical depth is the proof, never the topic.** Engineering material enters as evidence for a
   point a non-engineer already cares about. The subject is always something happening to the reader.
3. **The teardown is our default format** (see below). It is the format that best matches what we
   already are: people who show their work.
4. **Pure depth-first material goes to peer channels** (Hacker News, r/golang), where the doctrine's
   audience exception applies. The discarded four-product draft is retargeted there, not deleted.
5. This **supersedes** the TODO at the end of `profile-and-strategy.md` ("draft 3-4 launch-style
   posts") for LinkedIn specifically. Launch posts still exist - they are just not LinkedIn posts.

### Corrections logged
- **Buyer-first (rev 1).** The first slate led with an engineer-first post on benchmark methodology
  and called it "both currencies." **There is no both-currency post on LinkedIn** - a post either
  opens on the buyer's world or a buyer never reads it.
- **Form (rev 2).** The drafts were 1,500-2,400 characters of dense prose. They were essays wearing
  a post's badge. See the form rules below.
- **Format (rev 3).** Right substance, wrong container. All three rebuilt as teardowns.

## Why the channel changes the format

From `profile-and-strategy.md` ("The follower reality"): the 12K followers are an artifact of an
early LION/following phase - **breadth, not audience.** LinkedIn is a prospecting and conversion
surface, not a broadcast channel.

So a post is not feed content. **A post is the body of work a skeptical prospect reads after landing
on the profile** from a search, an intro, the website, a repo or the estimator. One person, possibly
months later, deciding whether to email.

- **Evergreen beats topical.** It will be read out of its week.
- **Few beats frequent.** Ten permanent posts outperform a hundred disposable ones.
- **Engagement is the wrong scoreboard** - and the research below turns that from a preference into
  a measured finding.

## What the research says (external, 2026-08-28)

**Source caveat, applied to ourselves:** these are marketing-agency blogs, not peer-reviewed data.
They contradict each other on specifics (external links cost ~60% of reach, says one; links in the
body carry no penalty at all, says another). Treat every percentage as unverifiable. What is worth
trusting is directional consensus across independent sources.

### The finding that matters most
One analysis deconstructed ten high-performing posts and classified each as lead-generating or
vanity. **Eight of ten were vanity.** The two lead-generating posts scored **0.43% and 0.33%**
engagement, against 1.21% and 1.03% for the top vanity posts. Wins, origin stories and confessions
all draw reactions and no pipeline.

**Optimizing for reactions actively selects against the posts that bring work.** This is the
strongest external support for the position this doc already held.

### The three formats that convert
1. **Teardown** - publicly break down a real artifact. Anatomy: **artifact -> diagnosis -> fix ->
   principle -> soft invitation.** It converts because it shows the work instead of describing it:
   buyers hire the consultant they watched being good on something concrete, not the one who claimed
   to be good. **This is our default.**
2. **Value-first sell** - name a belief the reader holds, dismantle it, give the insight away, never
   pitch.
3. **Problem-first product post** - the pain point occupies the post; the product appears last.

### Sourcing artifacts to tear down
The research suggests volunteers, anonymised examples, or composites. **We have a fourth and better
option: tear down our own.** Our own worst benchmark number, our own rewritten spec, our own wrong
call. It fits the verifiability doctrine and cannot be read as punching down at a client.

### Form rules (adopt fully - they cost nothing)
- **800-1,400 characters.** Our first drafts were 1,500-2,400.
- **The first three lines are the post.** Everything before "see more" decides whether the rest
  exists. Short lines, roughly under 49 characters.
- **One-sentence paragraphs, heavy whitespace.** Dense prose is the most common failure mode.
- **Close with a question or a directive** the reader can act on. Comments carry far more weight
  than likes, and a good closing question makes prospects self-qualify.
- **One idea per post.** Everything else gets cut, however true.

### Rejected, deliberately
- **Comment-as-opt-in** ("comment TEARDOWN and I'll send you..."). Measurably the highest-converting
  format found. It reads as marketing theatre and would cost more senior-buyer trust than the leads
  are worth. The soft version does the same job: name who should respond, invite a DM, no keyword.
- **Reach tactics generally** - cadence games, engagement bait, comment pods. Our conversion path is
  profile -> site -> email, not virality.
- **Chasing the comment-to-like ratio.** Even the source recommending it concedes it measures
  engagement, never validated against actual pipeline.

### The external-link decision
Doctrine says every claim sits one click from proof; LinkedIn reportedly punishes links.
**Resolution: state the verifiable fact without the URL** - "their reports can be verified by COA
number on their public site." The claim stays checkable, so doctrine holds; no link, so reach is
intact. A motivated reader finds it in ten seconds, and the profile's Featured section carries the
permanent links.

## The LinkedIn slate

| Order | ID | Artifact torn down | Buyer point | Proof drawn from |
|---|---|---|---|---|
| 1st | A | An `approved_by` column sold as compliance evidence | Your process exists only where the software enforces it | Chemo LIMS - transition-level roles, machine-written audit record |
| 2nd | B | A vendor benchmark chart with no methodology | How to tell an engineering partner from a salesperson | UExL's published worst-case number, in our own README |
| 3rd | C | A 40,000-row import killed by one bad row | Brittle data exchange is an operational risk | Internet Object - record independence, validation in the parse |
| 4th | D | **Our own wrong call** | What we changed after getting it wrong | **Aamir only - not in the repo** |

Post D is the highest trust-per-word format available and nearly nobody writes it. It needs material
only Aamir has.

The Indigo "six operators" post is **removed from LinkedIn** - a compiler-design argument with no
buyer reading.

## The peer channel slate (Hacker News / r/golang - not LinkedIn)

- The discarded four-product post, which is the right post for that audience.
- "Six operators, and no more" - Indigo's closed operator set and the refusal-to-emit rule.
- The methodology-first UExL benchmark write-up, with the full ns/op table and allocation counts.

## What we do not post on LinkedIn

- Capability lists and "we build it, we don't use it" framing (doctrine DON'T #1).
- Anything whose first three lines require knowing what an allocation is.
- Star counts as a headline (doctrine: modest to a developer, meaningless to a buyer).
- Anything touching code/IP ownership, lock-in or exit terms (project non-negotiable).
- Any claim that fails the CLAIM AUDIT. Specifically for Chemo: **NABL-accredited /
  government-approved / ISO 9001:2015 certified only.** The "US FDA-accredited" line is unverified
  and must never be published (correction logged 2026-08-11 in `_inbox/case-study-chemo-lab.md`).

## The three gates

1. **CLAIM AUDIT** (Governing Rule #1): true, sourced, calibrated, status-honest.
2. **SKEPTIC TEST** (doctrine): do I see my problem, is it believable from an unknown company, is it
   verifiable, where is the proof?
3. **THE AUTHOR TEST** (Aamir, 2026-08-28): *would you stop and read this if it were somebody
   else's post?* If no, it does not go out - however well it scores on the format rules. Formula
   compliance produces posts that pass every checklist and that no senior person stops for.

## Open

- **The ICP is not formally decided** (`_inbox/app-se-page-redesign.md:87`: "ICP not decided --
  would be decoration"). This is the ceiling on every post: the opening can only be as sharp as our
  definition of the reader. The current three open on *artifacts* rather than industries, which
  works without an ICP - but a decided ICP would sharpen all of them.
- Post C's opening scene is an illustrative composite and needs either a real incident or a reword
  to the generic present. See the note on the draft.
- Post D unwritten pending Aamir's material.
