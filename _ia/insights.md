# Insights — LIST PAGE (Taj Mahal list/article module; 2026-06-29)

> ★ This is the **list page** of a Taj Mahal **list/article** module: `insights: /insights/*`
> → this list page + an inferred **article page** per post. Per the skill (Ch. 9), the list page
> renders an `articles` collection — **each card is generated from the post's frontmatter**
> (`title`, `postStatus` badge, `description`, `url`), ordered by `order`. So the cards in §3 are NOT
> hand-authored copy; they mirror what the template emits from the four article files
> (`_ia/insights/*.md`). **To change a card, edit that post's frontmatter.**
>
> **AUDIENCE = depth / developer-leaning (peer + OSS-community + SEO).** This is the **content
> engine** from the Distribution Strategy (Phase 3): the "why we built X / how X works" pieces that
> turn our own specs into developer-native content + SEO authority. Per the Presentation Doctrine's
> **KNOW YOUR AUDIENCE** clause, an Insights/blog index is a *developer/peer surface where
> depth-first is correct*. It is therefore tagged **depth**, NOT client. The page opens honestly and
> never oversells. **Honest status first:** this section is just launching, so the seed posts are
> **planned, clearly labelled `postStatus: "Coming"`, NOT yet written** — every post stays "Coming"
> until it is genuinely published. Never link to an empty page as if it were live; never fabricate a
> body. Every claim still TRUE + SOURCED (Governing Rule #1): no comparative/quantified performance
> claim appears until a reproducible, linked benchmark backs it. Primary CTA stays **Estimate** —
> depth-appropriate here, and the Estimator is the one thing that's live today.

---

## 1 · LIST-PAGE INTRO  *(static content above the auto-rendered list)*

# Insights from the workbench.

Notes on the engineering decisions behind our work — why we build the way we do, how the tools we've
made actually work, and what we've learned shipping software that has to last. Written by the people
who do the work, for people who care how it's done.

> New here, and growing deliberately. We'd rather publish one piece worth your time than a feed of
> filler — roughly once or twice a month, not on a content treadmill.

**[ Get a free project estimate → ]**   ·   [ Talk to a human ]

`[Plain, honest framing — no "welcome to our blog!" filler, no fake post count. Sets the
"engineer-written, substance-over-cadence" expectation that matches the brand voice. Depth-first
hero is CORRECT for this developer/peer surface (Presentation Doctrine §"KNOW YOUR AUDIENCE") — it
stays honest and un-flexy. The honest cadence hedge ("roughly once or twice a month") matches the
Distribution Strategy's "sustainable 1–2/month, not daily" — do NOT promise a schedule we won't keep.]`

---

## 2 · WHAT TO EXPECT  *(set the topic lanes — honest about cadence)*

### What we'll write about.

- **Why we built it.** The decisions behind our open-source work — the trade-offs, the dead ends,
  the reasons. Built in plain sight; you can read every line.
- **How it works.** Walkthroughs of the tools and formats we've made — runnable, verifiable, no hand-waving.
- **How we work.** The process behind the work: senior-only delivery, a documented quality process,
  and what "right-sized, not over-engineered" looks like in practice.
- **The standards we've authored.** Data and language specifications we wrote and published — what
  problem each one solves, and how to try it yourself.

`["Standards we've authored," never "industry standards" (Honesty rule). Topic lanes double as SEO
anchors. ISO FIX (skeptic med): dropped the bare "ISO-certified" boast here — an unverified ISO claim
makes a small shop MORE suspicious (customer-lens-review.md). Replaced with the verifiable
"documented quality process"; the dedicated Trust page carries the ISO cert with its # + issuing
body. See "Placeholders" below if we want to reinstate a verifiable ISO line here.]`

---

## 3 · THE LIST  *(auto-rendered from each post's frontmatter, sorted by `order`)*

`[Each item = one card the list template emits per article: postStatus badge · title · description ·
"Read the post →" → /insights/<slug>/. Mirror of the four article files (`_ia/insights/*.md`); do
not hand-edit here. ★ EVERY post stays `postStatus: "Coming"` until it is genuinely published — the
card renders the badge straight from frontmatter, so it never implies a post is live before it is.
Do NOT fabricate bodies; the linked pages are stubs until written + approved.]`

**`[ Coming ]`  UExL: the only zero-allocation expression engine (run the benchmark yourself)**
A reproducible-benchmark launch post — leads with the exact zero-alloc claim and a harness you run on
your own machine; timings vary.  → `/insights/uexl-zero-alloc/`

**`[ Coming ]`  How we build: dogfood first, then release**
Our internal-first maturation model — why we run on our own tools in production before recommending
them, and why so much is deliberately pre-1.0.  → `/insights/dogfood-first/`

**`[ Coming ]`  Why a boutique team authors its own standards**
The maker ethos behind Internet Object, UExL, and Indigo — what it means to write and publish your
own specs, and why a small team bothers.  → `/insights/we-author-standards/`

**`[ Coming ]`  The real cost drivers of custom software**
What actually moves an estimate — scope, integration, and risk — written to tie directly into the
Estimator.  → `/insights/cost-drivers-custom-software/`

> `[★ CLAIM-AUDIT GATE: no card teaser carries a comparative or quantified claim ("faster," "fewer
> tokens than JSON," any %) until its reproducible proof is live and linked. The UExL card states the
> zero-allocation claim because it is precise + falsifiable and the post ships the harness to check
> it; it does NOT assert "faster than X" until that benchmark URL is current and clickable. Each seed
> post is GATED on Aamir's review + approval before publishing (Distribution Strategy: "Aamir
> supplies the technical spine / approves; AI drafts"). Until a piece ships its `postStatus` stays
> "Coming."]`

---

## 4 · WHILE THE WRITING CATCHES UP  *(bridge the empty-shelf → something live & verifiable)*

### Just launching — but there's already plenty you can run and read.

The shelf of articles is new, and we're filling it deliberately. In the meantime, the work itself is
already live and open: the libraries, the live playgrounds, and the public repositories are all there
to read and run, right now. Start with the Internet Object playground or the UExL repo — see how we
think by watching what we've actually built.

Prefer to talk about your own project? A free, no-obligation estimate is a fast, low-pressure way to
see how we approach a problem — a few questions, and you get something concrete back.

**[ Get a free project estimate → ]**

*Secondary:* [ Explore what we've built ]   ·   [ Talk to a human ]

`[FIXES APPLIED / CARRIED FORWARD:
- Empty-shelf framing (skeptic low #7): reframed from "Nothing to read yet?" to deliberate confidence
  that immediately pivots to concrete, LIVE proof — the playgrounds + repos that exist today. Pairs
  the honesty with something real, not an empty-handed impression.
- Voice/jargon (skeptic low): cut the "our AI asks the questions a senior engineer would…" line —
  removed the jargon and the self-praising promise the reader hasn't tested. Reframed around the
  reader's payoff and kept it hedged.
- CTA discipline (skeptic med): ONE primary CTA. Per the task's depth-appropriate direction the
  primary is the Estimator (the one thing live today, and a fast way to see how we work), with
  "Explore what we've built" + "Talk to a human" as the quieter secondary line.
- Verifiability thread: every CTA here points at something LIVE today (Estimator, work, playgrounds,
  repos, human) — no claim depends on an unshipped article or an unlinked benchmark.]`

---

## What this page does (rationale)
- **List/article module** — this page is now the LIST PAGE of an `insights` module mirroring
  case-studies: it renders an `articles` collection, one card per post, generated from each post's
  frontmatter and sorted by `order`. Card copy is NOT hand-authored here; edit the article file to
  change a card.
- **Audience tagged depth/developer** — an Insights/blog index is a peer surface where depth-first is
  correct (Presentation Doctrine §"KNOW YOUR AUDIENCE"); we did NOT bolt a fake client funnel onto a
  blog. Client-first order and client case proof live on the client-audience pages (home/about).
- **Honest launch state** — owns that the section is new/thin, then pivots to live, runnable proof
  rather than leaving an empty-handed impression (Honesty / Governing Rule #1).
- **Seed posts are STUBS, status "Coming"** — planned, clearly labelled via `postStatus: "Coming"`,
  gated on Aamir's approval; no article bodies fabricated. Every post stays "Coming" until genuinely
  published.
- **No comparative/quantified claim ships before its proof is linked** — the UExL card carries only
  the precise, falsifiable zero-allocation claim (the post ships the harness); "faster than X" stays
  out until a reproducible benchmark URL is one click away.
- **"Standards we've authored," never "industry standards."**
- **ISO claim removed from this page** — bare "ISO-certified" dropped; the dedicated Trust page
  carries the cert with its # + issuing body.
- **Primary CTA = Estimate** — depth-appropriate here and the one thing live today; secondary line
  carries "Explore what we've built" + "Talk to a human."

## Placeholders / inputs needed from Aamir
- `[Approve the 4 seed-post titles + summaries; supply the technical spine for each before drafting.
  Until then each stays a stub with postStatus "Coming".]`
- `[UExL: link the current, reproducible benchmark repo, then confirm the exact calibrated wording
  the benchmarks support. No comparative/performance superlative ("faster than X") enters the
  title/teaser/body until that repo URL is live and clickable from this page; the zero-allocation
  claim stays because it is precise + the post ships the harness.]`
- `[Dogfood post: confirm which projects are genuinely "In production" so the claim is true + sourced.]`
- `[Standards post: confirm which authored specs to feature + each one's honest status label
  (Published / Beta / Research / In development).]`
- `[Cost-drivers post: confirm the cost-driver framing matches the Estimator's actual inputs so the
  post and the tool stay consistent.]`
- `[ISO: if we want a quality-process line to appear ON this page, supply the verifiable form — cert
  number + issuing body (URS/UKAS) + a verification link. Otherwise it stays solely on the Trust page.]`
- `[Newsletter: if we add a "from the Lab" signup later, stand up the list/provider first and finalize
  the honest opt-in wording before it goes live.]`

---

`[note] LIST/ARTICLE WIRING (tajmahal-ssg Ch. 9): at site generation, module `insights` declares
`insights: /insights/*`. The four `_ia/insights/*.md` stubs become the article content, served under
clean slugs (`uexl-zero-alloc.md`, `dogfood-first.md`, `we-author-standards.md`,
`cost-drivers-custom-software.md` → `/insights/<slug>/`). Article frontmatter drives the cards:
`title · description · postStatus` (display badge — NOT the reserved `status`) `· order` (curated)
`· date · image`. The list template loops `articles` sorted by `order`; pagination via `page_size`
if the set grows. Honesty per post lives in each stub's own outline + `[DRAFT — to write]` marker —
no body is published until written + approved, and every card stays "Coming" until then.]`
