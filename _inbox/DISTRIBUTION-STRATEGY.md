# Distribution Strategy — fixing the "we don't market ourselves" weakness

> Recorded 2026-06 at Aamir's request. The Lab's biggest weakness: world-class engineering,
> near-zero social/marketing presence → few stars despite outstanding projects. Constraint:
> Aamir is a hardcore developer-founder; **social media is not his cup of tea.** The strategy
> MUST respect that — the answer is systems + delegation, not "become an influencer."

---

## The core reframe
**This is a DISTRIBUTION problem, not a marketing problem — and not a product problem.**
The hard thing (building world-class tech) is already done. What's missing is *getting it
in front of developers*. That's the EASIER problem, and it's engineering-adjacent, not a
popularity contest. Stars are a **lagging indicator** of (discoverability × first-impression
× proof). Fix those three and stars follow. Don't chase stars directly.

Crucial: a developer who dislikes social media should NOT try to become a social-media
person. The strategy is to make the *work itself* do the marketing, build distribution
*into the products*, write in an authentic technical voice, and *delegate/automate* the
performative layer. The founder supplies substance; others/automation supply reach.

---

## Five principles (founder-fit)
1. **Let the work market itself — but remove the friction hiding it.** Stub READMEs,
   unpublished repos, no cross-links, no launch = self-inflicted invisibility. Fix the
   foundation first.
2. **Build distribution INTO the products** (passive, compounding, zero daily effort):
   "Built with Taj Mahal" badges, repo cross-linking, playground→spec→services funnels,
   the website as the hub.
3. **Write, don't perform.** Technical writing — the engineering decisions and the *why* —
   is content marketing in developer-native form. Aamir already wrote the hard part (the
   specs/books are goldmines). AI (me) can draft articles FROM those specs for his approval.
4. **Systematize & delegate.** Make it a pipeline, not a willpower tax. A content calendar
   an assistant or AI agent executes; scheduled posts; "we shipped X" automation. Founder
   approves + supplies depth; does NOT run the daily social.
5. **Show up where developers already are** (HN, r/golang, Lobsters, dev.to, GitHub topics,
   Go/Rust communities) — NOT where influencers are (TikTok/IG). One good launch >
   a hundred performative posts.

---

## The plan, in priority order

### Phase 0 — Foundation (THIS PROJECT: the website)
The new maniartech.com IS the highest-leverage marketing asset. No point driving traffic to
a site that doesn't convert. Every project page, the Labs/Standards hub, proof-first
ordering, "built with Taj Mahal" — these convert the visitors who arrive. **Build this
right first.** (In progress.)

### Phase 1 — Repo & GitHub optimization (one-time, high ROI)
Most devs discover tools via GitHub search/topics/trending. Leaving stars on the table:
- Fix stub READMEs (WebDoodling etc.); every repo: clear value prop in first 3 lines,
  badges, **social-preview image**, **GitHub topics/tags**.
- **Org profile README** (github.com/maniartech) that tells the lab story + links projects.
- **Cross-link every repo** to the others + the website (the ecosystem flywheel).
- Pin the best repos; a one-line "from ManiarTech Lab" + link in each.
→ This alone likely lifts stars meaningfully, with zero ongoing effort.

### Phase 2 — Per-project LAUNCH moments (one-time, big spikes, dev-native)
When a project hits 1.0 / publishes, do ONE good launch — not ongoing performance:
- **Show HN** / **r/golang** / **Lobsters** / **dev.to** post + a "why we built this" article.
- These are episodic, high-impact, and authentic to a developer.
- Several here are genuine **front-page-worthy** stories, presented right:
  - **UExL beats Google's cel-go and expr on every benchmark** — classic HN catnip.
  - **Internet Object: ~30% fewer LLM tokens than JSON** — AI-era story.
  - **Indigo: a TypeScript for Go** — instantly graspable, viral-friendly.
  - **FUSE: "Don't just REST"** — provocative, ownable.
  - **signals: how we made a Go event lib zero-allocation (honestly)** — the honesty angle.
- AI (me/agents) can draft each launch post + article from existing specs for approval.

### Phase 3 — Content engine (systematized, delegated)
- A **blog/Insights section on the site** (SEO + authority) — the "why we built X",
  "how X works" pieces. Aamir supplies the technical spine (often already in the specs);
  AI drafts; Aamir approves. Cadence: sustainable (1–2/month), not daily.
- **Newsletter** ("from the Lab") — low-effort, owned audience, not algorithm-dependent.
- Repurpose: one article → a few social posts, scheduled by an assistant/agent. Founder
  never touches the daily feed.

### Phase 4 — Delegate the social layer entirely
- The founder does NOT need to be the poster. Options: a part-time DevRel/marketing hire,
  a contractor, or **AI agents** drafting+scheduling with Aamir's approval.
- Aamir's only job: approve, and occasionally show up authentically (a technical thread, a
  conference talk, answering issues) — high-signal, low-frequency, on his terms.

### Phase 5 — Compounding flywheels
- **Open source IS marketing** — every published repo is a discovery surface. Publishing the
  unpublished/internal projects (Indigo, UExL, Taj Mahal, Booster, gowork, gocurl…) is itself
  the single biggest distribution unlock available. Each one = a new front door.
- **AI-native angle** (MCP servers, agent skills) is inherently newsworthy/shareable in 2026.
- **Dogfooding stories** — "we run our own company on these" — credible and repeatable.

---

## What this means for the website (actionable now)
- **Insights/Blog is not optional** — it's the content engine. Build it into the IA.
- **Labs/Standards hub** = the discovery showcase; proof-first.
- **Founder presence** — a technical-founder voice (the authentic channel), not a faceless brand.
- **"Built with Taj Mahal" badge** + repo/website cross-linking = passive distribution.
- **Newsletter signup** + clear social links (even if posting is delegated).
- Every project page = a mini landing page optimized to convert a developer who arrives.

## Honest framing for Aamir
The low star counts are NOT a verdict on the work — they're the predictable result of zero
distribution. That's *good news*: it means the upside is entirely unrealized and the fix is
mechanical, not creative. You don't need to change who you are. You need to (1) finish &
publish, (2) make the work discoverable, (3) launch each piece once, well, and (4) delegate
the ongoing noise. The engineering already earned the audience — we just have to deliver it.

## ⚠️ THE REAL STAKES — this is costing CLIENTS & REVENUE, not just stars (Aamir, 2026-06)
Same root cause (invisibility), but **client acquisition is a DIFFERENT funnel from OSS
stars** — different buyer, different levers. Be precise:

| | OSS stars funnel | Client/revenue funnel |
|---|---|---|
| Buyer | developers (broad) | CTOs / founders / decision-makers (narrow, high-value) |
| Driver | discoverability + cool factor | **trust + proof of capability + reduced risk** |
| Levers | repos, launches, HN, content | case studies, positioning, SEO, referrals, the Estimator, **the Lab as differentiator** |

**Key insight: the Lab is the single most powerful CLIENT-acquisition asset ManiarTech has
— it's the "unfair advantage."** A CTO doesn't hire you for GitHub stars; they hire you
because they trust you'll deliver and de-risk their project. "The firm that builds its own
standards, languages, and tools" is a trust signal **no cheaper outsourcing shop can fake.**
But today that proof is invisible, and there's **no path from "impressed" → "let's hire
them."** The website builds that path.

### Client-acquisition levers (founder-fit, NOT social)
1. **The website as conversion surface for ALL channels.** When someone hears "ManiarTech"
   (referral, search, OSS) and Googles it, the current single-page site UNDERSELLS and loses
   them. The new site is the #1 direct client-acquisition fix. Every channel dead-ends here.
2. **CASE STUDIES = the highest-leverage client content that exists.** Buyers buy on proof
   of *outcomes*, not capability claims. This is THE missing input only Aamir can supply
   (real client problems → outcomes with numbers). Highest priority. (Testimonials exist on
   the old site — start there.)
3. **The Lab as the differentiator in every pitch** — reframes ManiarTech from "a dev shop"
   (competes on price, loses) to "the lab that makes the technology" (competes on depth, wins).
4. **SEO on services pages** = passive enterprise inbound, no social needed. Rank for
   "enterprise software development", "process automation", "legacy modernization", "Go
   experts", etc. Pure engineering-adjacent work.
5. **Systematize referrals** (likely their current main channel): ask happy clients for
   referrals + testimonials + case-study permission. Boutiques run on reputation — make it
   legible and repeatable.
6. **The Estimator CTA** — a clever low-friction conversion mechanism (try-before-contact);
   primary CTA on the new site. Captures intent that would otherwise bounce.
7. **Delegated targeted outbound** — warm, specific, to ideal-fit clients (NOT spam);
   can be run by a contractor/AI with Aamir's approval. Optional, later phase.

### The connection (the flywheel)
Lab visibility → developer awareness + credibility → some devs become leads, AND CTOs who
see the depth trust the services pitch → clients → revenue funds more Lab work → more proof.
**OSS marketing and client marketing reinforce each other, but the CLIENT funnel needs its
own deliberate levers (above) — don't assume stars alone bring enterprise clients.**

### Realistic expectations (honest)
Distribution compounds over months, not days. Clients won't appear overnight. But the
foundation — a converting website + visible proof + case studies + a clear path to contact +
SEO — is exactly the right, durable investment, and it's precisely what THIS project builds.
The reputation already exists; we're making it legible and giving it a front door.

## ADDENDUM — the Price Estimator as distribution (Aamir's LinkedIn idea, 2026-06)
The AI Price Estimator (see price-estimator.md) is the PRIMARY CTA + a genuine growth engine.
Aamir plans to share it on LinkedIn (organic + "unorganic"). My take:
- **It's smart and ON-strategy** — founder-led LinkedIn is literally #2 in the estimator's own
  GO_TO_MARKET doc. Aamir's network is a high-trust, free, warm channel — better than ads.
- **BUT sequencing is everything (their own doc says so): "validate before you scale; don't
  push traffic to an experience that doesn't convert yet."** The estimator's whole job is to
  build confidence and HAND the prospect to the rest of ManiarTech. So two things must be ready
  BEFORE a LinkedIn push: (1) the estimator itself is genuinely excellent (sharp questions,
  fast, credible estimate), and (2) **the website converts** (Labs proof, case studies,
  services, contact). Driving your network — a ONE-TIME attention asset — to a leaky funnel
  (old single-page site) wastes the best free reach you have. **Fix the funnel, then open the tap.**
- **Organic vs "unorganic":** organic founder posts = on-brand, free, fit a dev-founder
  (AI-drafted, curated, you approve). "Unorganic" (paid ads / mass-posting) — their OWN
  playbook puts paid ads LAST, behind a proven funnel, and warns spam is penalized + resented.
  For a TRUST brand selling to skeptical offshore buyers, bought/spam reach can backfire. Lean
  organic; treat paid as a small, later, post-validation test.
- **Two plays that beat LinkedIn posting** (both in their docs, build these): (a) the
  **shareable-estimate viral loop** — every estimate carries "Estimated by ManiarTech",
  turning each user into free reach; (b) the **SEO estimate-library** ("cost to build X" pages)
  — compounding inbound that works while you sleep. LinkedIn is a spike; these compound.
- **The estimator + website are ONE funnel.** This is a concrete reason the website must be
  built well and FIRST. Recommended sequence: ship converting site → validate estimator on warm
  traffic → measure funnel → THEN scale LinkedIn + add viral loop + SEO library.

## Open questions for Aamir
- [x] **CASE STUDIES** — Aamir confirmed **2 real case studies available** (sharing LATER).
      2 is enough to start. → Build the IA with case-study slots ready (home proof section +
      /case-studies/ page) so they drop in without rework. Still pending: the actual content
      (problem → solution → outcome, numbers where possible).
- [ ] Testimonials from the old site — get text + permission to name clients?
- [ ] Appetite to **publish the unpublished projects** sooner? (Biggest OSS-awareness unlock.)
- [ ] Willing to **delegate** social/content/outbound (part-time DevRel, or AI-agent pipeline)?
- [ ] OK for AI to **draft launch posts + articles** from your specs for your approval?
- [ ] Include a **blog/Insights + newsletter** in the website IA? (Strongly recommended.)
- [ ] Comfortable being a **visible technical founder** (occasional, on your terms)?
- [ ] Who are the **ideal-fit clients** (industry, size, problem type)? Sharpens positioning + SEO.
