# SEO Plan - maniartech.com (2026-07-11)

> Goal (Aamir): "solid on SEO on all important keywords... even just the name Maniar, top
> outsourcing, consultancy company... we worked so hard, want to take advantage of that."
> This plan is grounded in an audit of the actual build, not generic advice. Governing Rule #1
> applies to SEO too: we pursue rankings we can genuinely win, and never fake signals.

---

## 0. Audit findings (what is actually true today)

**The current live site is ONE PAGE.** `origin/master` serves GitHub Pages from `/docs`, and that
directory contains a single `index.html`. That is the whole of maniartech.com today.
- Consequence 1: the invisibility is structural. A one-page site has almost nothing to rank.
- Consequence 2: migration risk is close to zero. There is no URL structure or page-level equity
  to preserve, so replacing it with the 36-page v2 site is nearly pure upside.
- Consequence 3: any existing authority is domain-level only (age + whatever backlinks exist).

**Technical SEO gaps in the v2 build (all fixable, most are quick):**
| # | Gap | Severity | Where |
|---|---|---|---|
| 1 | `url: "http://localhost:8080"` - canonical / sitemap / og:url would all emit localhost | CRITICAL | `tajmahal.yaml` |
| 2 | No canonical tag | High | `base.html` head |
| 3 | No Open Graph or Twitter Card tags (bad social/link previews) | High | `base.html` head |
| 4 | No `robots.txt`, no `sitemap.xml` (no `root/` dir exists) | High | project root |
| 5 | No site-wide Organization / WebSite / LocalBusiness JSON-LD | High | `base.html` head |
| 6 | Google Fonts loaded render-blocking from an external origin (Core Web Vitals + privacy) | Medium | `base.html` |
| 7 | Title separator uses an em dash, violating the repo ASCII rule | Low | `base.html` title block |
| 8 | Image alt-text coverage unaudited | Medium | theme + content |

**Already good:** all 36 index pages carry a unique `title` and `description`; the rebuilt service
pages carry buyer-vocabulary title tags, keyword-bearing H2s, Service + FAQPage JSON-LD, and
hub-and-spoke internal linking.

---

## 1. The honest keyword strategy (where we push back)

### Terms we should NOT chase: "top outsourcing company", "best consultancy company"
Frank assessment: these head terms are owned by (a) global giants - TCS, Infosys, Wipro, Accenture,
Cognizant - and (b) directory/listicle sites - Clutch, GoodFirms, DesignRush, A-list sites. Those
directories are the actual SERP for "top X company" queries, because the searcher wants a *list*.
- A boutique site cannot outrank them on those terms in any realistic timeframe, at any effort level
  we can honestly fund.
- Worse, the traffic is a poor fit: "top outsourcing companies" is list-research and price-shopping
  intent, which actively contradicts the depth/quality positioning (price is deliberately NOT a
  brand promise per PROJECT-CANON).
- **Better play for that intent: get LISTED on the directories that already rank** (Clutch,
  GoodFirms) rather than trying to outrank them. That is a profile/reviews task, not an SEO task.

### "Maniar" alone - partially winnable, set expectations
"Maniar" is a common Indian surname. The SERP contains other people, jewellers, and businesses. We
can realistically own **"ManiarTech"**, **"Maniar Technologies"**, **"Maniar software"**, and
**"Aamir Maniar"** completely, and appear for "Maniar" - but owning the bare surname outright is not
a goal worth optimizing for.

### Where we genuinely win (this is "taking advantage of the hard work")

**★ The Foundry is the SEO moat.** ManiarTech has authored technology that literally no one else
has. These are zero-competition terms owned by construction, and they are exactly what a normal
outsourcing shop can never produce:
- Branded tech terms: `Internet Object`, `UExL`, `Indigo language`, `Taj Mahal SSG`, `signals Go`,
  `gotime`, `vault-storage`, `AddressQL`, `PressML`, `WebDoodling`, `Processious`
- Problem/comparison terms with real search demand and genuine standing to rank:
  "JSON alternative", "smaller than JSON", "fewer LLM tokens than JSON", "Go expression language",
  "cel-go vs expr benchmark", "flexbox on canvas", "PixiJS alternative", "Konva alternative",
  "Go superset language", "static site generator in Go"
- Why this compounds: these earn *genuine backlinks* (developers cite tools and benchmarks), which
  raises domain authority, which lifts the commercial pages too. Per DISTRIBUTION-STRATEGY, this
  also feeds the talent funnel - one asset, two funnels.

**Commercial long-tail (winnable, right intent):** the rebuilt service pages already target these:
"custom application development services", "enterprise software development services", "legacy
system modernization services", "AI development services for business", "business process
automation consultancy", "architecture review and advisory", plus stack-qualified variants
("Go development company", "Django development company").

**Geo (winnable, real intent):** "software development company Thane", "software development
company Mumbai", "custom software development India". Backed by a real registered address.

**Trust/procurement long-tail (low volume, very high intent):** "ISO 27001 certified software
development company", "ISO 9001 software development India" - the /security/ page targets this.

**The estimate-library loop (already in canon):** programmatic-ish "cost to build X" pages feeding
the estimator. High-intent, low-competition, and it doubles as lead capture.

---

## 2. Phased plan

### Phase 0 - Technical foundation (do BEFORE launch; blockers)
1. Set `url:` in `tajmahal.yaml` to the production origin (decide apex vs www, then be consistent).
2. Add to `base.html` head: canonical, `og:*` (title, description, url, type, image, site_name),
   `twitter:card`, and a `robots` meta hook so individual pages can be noindexed when needed
   (insights/white-paper stubs should be noindex until they have real content).
3. Create `root/robots.txt` (allow all + sitemap URL) and emit `sitemap.xml`. Taj Mahal Part 9
   documents a `sitemap.xml` / `feed:` capability but it is Draft status - verify against the
   binary; if unsupported, generate the sitemap at build time.
4. Add site-wide JSON-LD in `base.html`: `Organization` (legal name Maniar Technologies Private
   Limited, logo, address Thane/Maharashtra, `sameAs` -> LinkedIn company, LinkedIn founder,
   GitHub org) + `WebSite`. Consider `LocalBusiness` for the geo angle.
5. Self-host or `preconnect` the fonts; audit Core Web Vitals (the theme runs GSAP + canvas
   animations - measure LCP/CLS/INP on mobile before launch).
6. Favicon + apple-touch-icon (assets exist per INPUTS-FROM-AAMIR).
7. Fix the em-dash title separator (ASCII rule).
8. Alt-text pass on all images.
9. Unique-title/description sanity check across all 36 pages (they exist; verify none collide).

### Phase 1 - Launch and instrumentation
1. Decide hosting: GitHub Pages currently serves `master:/docs`. The v2 build output must land
   there (or the site moves hosts). **Aamir's stated direction: the public repo will contain only
   generated build pages** - that fits: build v2 -> publish to the Pages source.
2. Redirect map: trivial today (old site is one page). Preserve `/` and add redirects only if any
   old anchors/paths are externally linked.
3. Set up **Google Search Console** + **Bing Webmaster Tools**, verify domain, submit sitemap.
4. Analytics (GA4 or a privacy-friendly alternative), plus conversion events on the estimate CTA.
5. Request indexing for the priority pages; confirm coverage over the following weeks.

### Phase 2 - Own the brand SERP (fast wins, weeks)
1. Organization schema + `sameAs` consistency across LinkedIn, GitHub, and the site.
2. **Google Business Profile** for the Thane address (unlocks map/local pack + knowledge panel
   signals). Consistent NAP everywhere.
3. LinkedIn **company** page tightened to match the site (the founder profile work is already done).
4. An `/about/` page strong enough to rank for "Aamir Maniar" alongside the LinkedIn profile.
5. Get listed on Clutch / GoodFirms (this is how we address "top outsourcing company" intent
   honestly - by appearing in the lists that already rank).

### Phase 3 - Commercial pages (the money terms)
1. The six rebuilt pages are the foundation - verify they render, then monitor.
2. Add geo signals/pages where honest (Thane/Mumbai/India).
3. Build the estimate-library ("cost to build X") cluster feeding /estimate/.
4. Internal linking discipline: every Foundry/insight page links up to a relevant service page.

### Phase 4 - The moat: technical authority + links (the compounding engine)
1. Give every Foundry project a real, complete page (several are still "detail coming").
2. Ship the playgrounds (Internet Object is live; UExL playground is pending a domain) -
   interactive tools earn links and dwell time.
3. Publish reproducible benchmarks with method shown (IO vs JSON, UExL vs cel-go/expr) - citable
   assets, and Rule #1 compliant because they are reproducible.
4. **Launches**, per DISTRIBUTION-STRATEGY: one good launch per project to r/golang, Hacker News,
   Lobsters. This is the single biggest domain-authority lever available and costs no ad budget.
5. Insights/blog as the ongoing content engine (mandatory per canon) - write, do not perform:
   drafted from Aamir's specs, he approves.

### Phase 5 - Measure and iterate
Track: brand-term ownership, indexed-page count, Search Console impressions/clicks/positions by
cluster (brand / service / geo / technical), backlink growth, and estimate-CTA conversions.
Re-evaluate quarterly. Expect brand terms to land in weeks; competitive commercial terms 6-12
months; technical/branded-tech terms fast (near-zero competition).

---

## 3. Sequencing note (important)
**None of this matters until v2 is live.** The single highest-leverage SEO action available right
now is shipping the v2 site, because it takes the indexable surface from 1 page to 36+. Phase 0
items are the gate.

---

## 5. "Maniar" as a target - honest mechanics (added 2026-07-11)

Current SERP: **maniar.com** (industrial/automobile manufacturing) holds #1 on an exact-match
domain. Aamir wants maniartech.com at #1 or #2.

**Frank assessment.** You cannot target a *position* - you can only build the entity signals that
make ranking likely. For a bare surname query, Google ranks by **entity authority**, not on-page
optimization. The levers that actually move it:
1. **Branded search volume** - people searching "ManiarTech" teaches Google the entity exists.
   This is downstream of everything else (launches, LinkedIn, directories).
2. **Organization schema + `sameAs`** wired to LinkedIn (company + founder), GitHub org, and every
   profile - so Google fuses the mentions into one entity.
3. **Backlinks carrying "ManiarTech" / "Maniar Technologies" anchor text** from credible sources.
4. **Google Business Profile** (Thane) - the strongest single knowledge-panel signal available.
5. **Wikidata entry** - legitimate for a real registered company; feeds knowledge panels.
6. Consistent NAP (name/address/phone) across every citation.

**But be clear-eyed about return:** bare "Maniar" is a *low-commercial-intent* query - the people
searching it are largely looking for the surname, the automobile company, or other Maniar
businesses. Almost none are buying software. Treat page-1 presence for "Maniar" as a **byproduct**
of brand-building, not a KPI. The same work that earns it (entity authority) lifts every commercial
page too - so it is not wasted effort, it is just not the scoreboard.

**Realistic:** page-1 presence in 6-12 months with sustained brand signals. Position 2 specifically
is not controllable by anyone.

---

## 6. Expanded keyword map, ordered by expected return

### Tier 1 - Highest return: vertical niches where we have UNMATCHED proof
This is the most underexploited asset in the whole plan. Specific verticals, low competition, and
we hold proof nobody can fake:
- **Laboratory / LIMS** - we have **two** analytical-laboratory clients (RTL, ~15 years live;
  Chemo, live on Processious today). Terms: "LIMS software development", "laboratory information
  management system development", "custom LIMS India", "NABL laboratory software", "lab sample
  workflow software". Genuine vertical authority; a generalist shop cannot match this.
- **Real estate presales / RERA** - Sales Navigator. Terms: "real estate presales software",
  "RERA payment plan software", "property inventory management system", "real estate CRM development India".
- **Customer journey / CX platforms** - Touchpoint Dashboard. Terms: "customer journey mapping
  software development", "journey analytics platform development".
- **DAM** - Tallery framework. Terms: "custom digital asset management development",
  "enterprise DAM development".
> Each deserves its own page or case-study-backed landing page. Vertical pages convert far better
> than generic service pages because the buyer sees their exact situation.

### Tier 2 - High return: commercial long-tail with buying intent
- "custom software development company India" / "Mumbai" / "Thane"
- "offshore software development company" (the honest, winnable cousin of "top outsourcing company")
- "dedicated development team India" / "hire dedicated developers India"
- "software architecture consulting" / "architecture review services"
- "legacy system modernization services" / "legacy application migration"
- "business process automation company" / "workflow automation development"
- "hire Go developers" / "hire Golang development company" / "Django development company"
- "custom ERP development" / "custom workflow software"
- "ISO 27001 certified software development company" (procurement intent, very high value)

### Tier 3 - The technical moat (near-zero competition, earns LINKS)
Branded: Internet Object, UExL, Indigo, Taj Mahal SSG, signals (Go), gotime, vault-storage,
WebDoodling, PressML, AddressQL, Processious.
Comparison/problem: "JSON alternative", "smaller than JSON", "fewer LLM tokens than JSON",
"Go expression language", "cel-go vs expr", "flexbox on canvas", "PixiJS alternative",
"Konva alternative", "Go superset language", "static site generator in Go".
> These rank fast and their real value is **backlinks** - which lift Tier 1 and 2.

### Tier 4 - Informational / blog (top of funnel, feeds the estimator)
- "how much does custom software development cost"
- "rewrite vs refactor legacy system" / "strangler fig migration"
- "in-house vs outsourced development"
- "how to choose a software development partner"
- "what is business process automation"
- The **estimate-library**: "cost to build a LIMS", "cost to build a CRM", "cost to build a
  marketplace" - each feeding /estimate/.

### Tier 5 - Brand/entity (own completely)
"ManiarTech", "Maniar Technologies", "Aamir Maniar", "ManiarTech reviews", "Processious".

---

## 7. Outbound SEO / link-building program (Aamir is ready to invest effort)

Ordered by **payoff per unit of effort**. Rule #1 applies: no paid link schemes, no PBNs, no fake
reviews - those are also the ones Google penalizes.

### A. Immediate, high-value, low-effort
1. **Directory listings** - Clutch, GoodFirms, DesignRush, Sortlist, TechBehemoths, The Manifest.
   Doubles as the honest answer to "top outsourcing company" intent (appear *in* the lists that
   rank). Clutch/GoodFirms need verified client reviews - ties directly to the existing
   testimonial/consent work.
2. **Existing client link** - chemotestlaboratory.com already carries "Powered by ManiarTech".
   Confirm it links, and ask other clients if a credit link is acceptable.
3. **"Built with Taj Mahal" badge** (already in canon) - a passive, compounding link engine as the
   SSG gets adopted. Same for any open-source README linking home.
4. **Profile links** - GitHub org profile, LinkedIn company, pkg.go.dev, npm, Crunchbase,
   Stack Overflow, dev.to, Wellfound. Low authority individually, strong for entity consistency.
5. **Local citations** (for geo + entity): Google Business Profile, JustDial, IndiaMART, Sulekha,
   India-focused B2B directories. Consistent NAP.

### B. Highest authority payoff - the launches (the single biggest lever)
Per DISTRIBUTION-STRATEGY: **one good launch per project**, to the right communities.
- Hacker News (Show HN), r/golang, r/programming, Lobsters, Golang Weekly, JSON/data-format
  communities, awesome-go and similar curated lists.
- Front-page-worthy angles that are *true and reproducible*: "Internet Object: ~30% fewer LLM
  tokens than JSON", "UExL: zero allocations vs cel-go and expr", "Indigo: a Go superset that
  compiles to idiomatic Go".
- A single successful HN/Reddit launch can outweigh months of other link building.

### C. Sustained authority - technical content
1. **Guest/syndicated technical writing**: dev.to, Hashnode, Medium engineering pubs, InfoQ,
   Better Programming. Write, do not perform - drafted from Aamir's specs, he approves.
2. **Answer where the buyers/devs already are**: Stack Overflow, GitHub discussions, Reddit -
   genuinely helpful answers, with the tool linked only where relevant.
3. **Podcasts / interviews** - Go, data-format, and India-tech podcasts. The founder story
   (27 years, JP Morgan, authored standards) is a genuinely good booking pitch.
4. **HARO / Qwoted / Featured** - respond to journalist requests as a software-engineering expert.
   Earns high-authority editorial links.
5. **Open-source ecosystem** - get the libraries into awesome-lists, package registries, and
   comparison/benchmark repos (where honest).

### D. Partnerships (ties to the channel-partner growth model)
Co-branded "delivered by ManiarTech" pages on partner/agency sites - transparent, per canon
(never white-label, which keeps us invisible).

### What NOT to do
Paid link networks, guest-post farms, comment/forum spam, fake reviews, exact-match anchor
over-optimization. All are penalizable and all contradict Rule #1.

## 4. Open questions for Aamir
1. **Apex vs www** for the canonical origin (currently the cert covers both; pick one and 301 the other).
2. Is there an existing **Google Search Console** property / analytics on maniartech.com today?
3. Any **existing backlinks** worth knowing about (old directory listings, partner sites)?
4. Appetite for **Google Business Profile** (needs the Thane address public - it already is, in the footer/Contact).
5. OK to pursue **Clutch / GoodFirms** listings (they need client reviews - ties to the testimonial/consent work)?
6. Target **ideal-client profile** is still open in canon - it sharpens keyword and geo targeting materially.
