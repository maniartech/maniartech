# Marketing Calendar - W0 through M9

> Assumption: go-live Monday 2026-07-27 ("next week"). If the date slips, shift everything;
> the sequence matters more than the dates. Weeks run Mon-Sun.
> Legend: [GATE] = blocked on something; do not fake it, resolve or skip honestly.

## PRE-FLIGHT (this week, before go-live) - the launch is a marketing event, prepare it
- [ ] SEO Phase 0 tech items done (see `_inbox/SEO-PLAN.md` Phase 0): production `url:` in
      tajmahal.yaml, canonical + OG/Twitter tags, robots.txt + sitemap.xml, Organization JSON-LD,
      favicon, stub pages noindexed. VERIFY: `node scripts/site-health/site-health.mjs http://localhost:9000`
- [ ] Google Search Console + Bing Webmaster: create accounts, verify domain (DNS TXT) NOW -
      verification can lag; have it ready for launch day. Run `node scripts/submit-to-search-engines/submit-to-search-engines.mjs guide`
      for the exact steps. Also run `... init` to generate the IndexNow key file (commit root/<key>.txt).
- [ ] GA4 (or chosen analytics) property created; estimate-CTA conversion event defined
- [ ] Google Business Profile: START registration (postcard/phone verification takes days) [GATE: Aamir]
- [ ] LinkedIn company page: audit against site (logo, tagline, About, website link)
- [ ] Scheduler account ready (LinkedIn native scheduling or Buffer free)
- [ ] Chemo client quote request sent (highest-value single testimonial ask) [GATE: Aamir]
- [ ] Draft the go-live LinkedIn announcement (personal + company versions) - AI drafts, Aamir approves
- [ ] Snapshot baseline metrics (see METRICS-AND-CAPA "Baseline")

## W0 - Go-live week (target: Mon 2026-07-27)
Theme: launch clean, get indexed, announce once, verify everything.
- [ ] Deploy v2 to production; DNS/Pages cutover
- [ ] Run `scripts/site-health/site-health.mjs https://maniartech.com` - all green before announcing
- [ ] Verify the built sitemap against `SITEMAP-GUIDELINES.md` (absolute URLs, ~36 pages, stubs excluded)
- [ ] Submit sitemap in GSC + Bing; request indexing for: home, 4 service pages, /how-we-work/,
      /security/, /about/, /estimate/, top 3 case studies
- [ ] Run `node scripts/submit-to-search-engines/submit-to-search-engines.mjs submit` (IndexNow -> Bing/Yandex/Seznam/Naver)
- [ ] Publish go-live announcement: LinkedIn personal + company (staggered, not same minute)
- [ ] Update every profile that links home: GitHub org website field, LinkedIn (personal contact
      info + company), any package registry links
- [ ] Verify analytics events fire (submit a test estimate)
- [ ] Social: announcement + 1 substance post (e.g. a "what is on the new site" proof tour)
- Deliverables: live site, sitemap submitted, announcement out, baseline logged

## W1 (Aug 3-9)
Theme: directories batch 1 + cadence starts.
- [ ] Clutch profile created + complete; GoodFirms profile created + complete
- [ ] Send first 2 client review invitations (Clutch flow) [GATE: client consent list]
- [ ] Social cadence starts: 3 posts (see SOCIAL-AI-PIPELINE) - Mon batch drafts all
- [ ] Blog post 1 drafted + published: dogfood story - "We rebuilt maniartech.com on our own
      static-site generator" (true, verifiable, links Taj Mahal SSG + the repo)
- [ ] Fri: weekly checklist + site-health run

## W2 (Aug 10-16)
Theme: entity + citations.
- [ ] GBP finalized (verification completed) [GATE]
- [ ] Citations batch: JustDial, IndiaMART, Sulekha + 2 more India B2B listings - consistent NAP
- [ ] sameAs audit: Organization JSON-LD lists LinkedIn (company+founder), GitHub; all profiles
      link back to maniartech.com
- [ ] Social: 3 posts
- [ ] **CHECKPOINT CP-2W** (METRICS-AND-CAPA): indexation + health review -> CAPA if red

## W3 (Aug 17-23)
Theme: Launch #1 prep (do not launch and prep in the same week).
- [ ] Pick Launch #1 per LAUNCH-PLAYBOOKS gates - default: **Internet Object** (live playground,
      public benchmark = strongest ready-made asset) [GATE: re-verify benchmark + README + playground]
- [ ] Launch copy drafted (Show HN title variants, first comment, r/golang variant) - AI drafts,
      Aamir approves + rehearses answers to hard questions
- [ ] Blog post 2 drafted: vertical anchor - "Building laboratory information systems" angle
      (LIMS, backed by RTL + Chemo cases; targets Tier 1 vertical keywords)
- [ ] Social: 3 posts

## W4 (Aug 24-30)
Theme: LAUNCH #1 + 30-day review.
- [ ] Launch day (Tue-Thu morning US time): submit, be present 6-8h for comments
- [ ] Same week: nothing else heavy. Social = launch-related only
- [ ] Publish blog post 2 (LIMS vertical)
- [ ] **CHECKPOINT CP-30D**: full metrics review + CAPA
- Deliverables: launch retro notes (what hit, what questions came, links earned)

## W5 (Aug 31 - Sep 6)
- [ ] Post-launch follow-through: answer stragglers, write launch retro blog post 3 (true numbers
      only), submit library to awesome-lists where honest
- [ ] Directories batch 2: DesignRush, Sortlist, TechBehemoths, The Manifest
- [ ] Social: 3 posts (launch retro material feeds them)

## W6 (Sep 7-13)
- [ ] Blog post 4: estimate-library #1 - "What does a custom LIMS cost?" (honest ranges,
      links /estimate/) [GATE: Aamir comfortable with published ranges; if not, frame as
      "what drives the cost" with no numbers]
- [ ] HARO/Qwoted signup + first 3 pitches (AI-drafted responses, Aamir approves)
- [ ] Social: 3 posts
- [ ] Review push #2: next 2 review invitations

## W7 (Sep 14-20)
- [ ] Launch #2 prep - default: **UExL** [GATE: LICENSE chosen + v0.1.0 tagged + benchmark
      README current; if gate fails, swap in signals v1.4 or Taj Mahal SSG]
- [ ] Blog post 5: modernization Tier 4 - "Rewrite vs refactor: the strangler-fig approach"
- [ ] Social: 3 posts

## W8 (Sep 21-27)
- [ ] LAUNCH #2 (same playbook)
- [ ] **CHECKPOINT CP-60D**: metrics + CAPA
- [ ] Social: launch-related

## W9 (Sep 28 - Oct 4)
- [ ] Launch #2 retro + follow-through
- [ ] Guest publishing starts: cross-post best 2 blog posts to dev.to/Hashnode with canonical URL
- [ ] Podcast outreach: 3 pitches (Go / India-tech / founder-story angles)
- [ ] Social: 3 posts

## W10 (Oct 5-11)
- [ ] Vertical landing #2: real-estate presales / RERA page (backed by Sales Navigator case,
      which should be post-launch by now - update case study with live status) [GATE: client OK]
- [ ] Citations cleanup pass (NAP consistency re-check)
- [ ] Social: 3 posts

## W11 (Oct 12-18)
- [ ] Launch #3 prep - candidates: signals v1.4, Taj Mahal SSG OSS release, or the IO
      LLM-tokens angle as a separate Show HN [GATE: per-project readiness]
- [ ] Blog post 6: second vertical or Tier 2 commercial target
- [ ] Newsletter decision: if 2+ blog posts earned real traffic, wire signup (else defer)

## W12 (Oct 19-25)
- [ ] LAUNCH #3
- [ ] **CHECKPOINT CP-90D - the 3-month full review**: score every KPI, write the CAPA log,
      decide M4-M9 adjustments. This is the "effects showing" gate Aamir asked for.

## M4-M9 (monthly themes; expand weekly detail at each month start)
- M4 (Nov): content scale - 2 blog posts/mo sustained; guest post #1 placed; launch #4 if ready
- M5 (Dec): partnerships outreach (channel/delivery per DISTRIBUTION-STRATEGY); review push #3;
  holiday-aware social (lighter)
- M6 (Jan): **CP-6M full review**; first white paper published IF genuinely ready (unlocks
  White Papers nav per canon); launch #5
- M7 (Feb): podcast appearances recorded; estimate-library expansion (2 more cost pages)
- M8 (Mar): launch #6; vertical landing #3 (CX/journey or DAM)
- M9 (Apr): **CP-9M full review** - the "full fledge effects" checkpoint; plan the next
  9 months; revisit scope additions (products matured, newsletter, paid experiments)

## Standing gates ledger (do not lose these)
- UExL: license + v0.1.0 tag + playground domain [Aamir]
- Chemo quote; further client review consents [Aamir]
- Published cost ranges yes/no for estimate-library [Aamir]
- GBP verification [process]
- Sales Navigator go-live status for outcomes claims [client]
