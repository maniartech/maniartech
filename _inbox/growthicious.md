# Growthicious — Dossier

> **Status: PLANNING / DESIGN STAGE** (Aamir, 2026-06: "this is under planning stage!").
> Concept + a substantial spec/SRS set — **nothing built yet.** The earliest-stage item in
> the catalog. A product is planned, and *"we'll also provide a similar service later on"*
> (product + service, both future). Handle with maximum status-honesty: it is a **plan**, not
> a product.

- **Type:** Product (planned) — and a future related service. Commercial.
- **Category:** **AI-driven content-strategy & authority-building platform** — content
  generation + social-media automation + trend monitoring + analytics, aimed at **startups /
  emerging businesses** building thought leadership.
- **Owner:** ManiarTech. (This is the "growthicious" growth/marketing app also referenced as a
  Processious product-app — relationship to reconcile, see below. [[processious]])
- **Repo/docs seen:** `E:\Dropbox\projects\Grothicious-Docs\docs` — home-page, system/ (15-doc
  authority-building paper), backend-srs/ (15-doc SRS), plans.md, roadmap, AI/scraping configs.
- **Sourcing:** those planning docs (all aspirational/spec — not implemented).

---

## What it is (the concept)

Growthicious helps a business **establish authority in its industry** by automating the
content-marketing loop: AI researches industry trends → generates content ideas and
articles/posts → schedules and publishes to blogs + social → monitors engagement → feeds
analytics back into strategy. Framed around **"authority building for startups"** who lack the
team/budget to produce consistent thought-leadership content.

Planned capabilities (from the SRS — all design intent): AI content idea/article generation,
persona mapping, content calendar, social scheduling + engagement monitoring, trend/"Source
Scout" downloader, SEO + readability tools, performance analytics, multi-tenant.

**Planned architecture (design):** RAG-based — content + uploads embedded into **Qdrant
(vector DB) + MongoDB**, generative AI models, API gateway + services (auth, onboarding,
content-gen, social, engagement, scheduler), Python/Node, social-media APIs. **Roadmap:** MVP
(Source Scout + basic web client w/ content suggestions/generation) → registration/user-mgmt +
scheduling → publish to blogs/social → analytics dashboard.

---

## Strategic significance (genuinely interesting — but keep it honest)

1. **It's an authority-building / distribution engine — the exact problem ManiarTech itself
   has.** ManiarTech's #1 weakness is distribution (near-zero marketing → few stars/clients).
   Growthicious is literally a tool to fix *that* problem for startups. **Dogfood potential:**
   ManiarTech could one day use it to publish its own white papers/thought leadership. Strong
   narrative tie to [[DISTRIBUTION-STRATEGY]] — but only *after* it's real.
2. **Reinforces the AI-products identity** — another RAG/AI product alongside Documentor; backs
   the AI-Driven Innovation service capability story. [[service-ai-engineering]]
3. **Ties to the White Papers / "be an advisor" theme** — content-as-authority is the same
   thesis as the White Papers section.
4. **Pattern fit:** like the others, a planned product that could anchor a future **service**
   ("content-marketing / authority-building as a service") — the product↔service pattern.

> ⚠️ All of this is *potential*. Today it's a plan. The strategic value is real; the product is
> not built.

---

## Honesty calibration (Governing Rule #1) — this one needs the firmest hand

- **Status label: "Planning" / "Concept"** (earliest stage). Never "available," "beta,"
  "product," or "coming soon" with a date.
- ❌ **NONE of the planning-doc specifics are facts:** the **$150/$300/month pricing** is
  illustrative; the **testimonials are placeholders** ("Hear from clients…" — no real clients);
  the feature lists and outcome claims ("become a leader," "drive traffic," "boost
  productivity") are aspirational marketing drafts. **Do not publish any of it as real.**
- ❌ The home-page draft is heavy with unbacked outcome promises and a banned-superlative vibe
  ("Excellent AI-Backed Research," "Become a Leader") — reference only; would need full
  recalibration *if* it ever ships.
- ✅ **Safe (only if we mention it at all):** "an AI content-strategy product in planning."
  Nothing more.

---

## Site placement — recommendation: HOLD (don't feature yet)

Consistent with Taj Mahal Spaces (deferred) and the no-overpromise rule: **a planning-stage
product should not get a public product page.** Options:
- **Recommended:** keep it OUT of the public site for now; capture it in the catalog. It's too
  early to announce without overpromising, and announcing far-off products dilutes the
  proof-first story.
- *If* Aamir wants any signal: at most a single honest line in a "what we're exploring" context
  — no features, no pricing, no date. (I'd still lean against it.)
- Revisit when it reaches at least POC (like Documentor) and there's something real to show.

---

## Open questions for Aamir

- [ ] **Confirm HOLD** — keep Growthicious off the public site until it's further along?
      (Recommend yes.)
- [ ] **Relationship to Processious** — the Processious docs list a "growthicious" product-app
      built ON Processious, but these docs describe a standalone Python/Node + Qdrant stack. Is
      Growthicious (a) a standalone product, (b) a Processious app, or (c) a concept that may be
      built on Processious? (RECONCILIATION — affects how/whether we ever present it.)
- [ ] **The future "similar service"** — content-marketing/authority-building as a service:
      same product↔service pattern. Note for later; not now.
- [ ] **Canonical spelling** — "Growthicious" (docs folder is "Grothicious" — typo?). Confirm.
- [ ] Dogfood angle — is using Growthicious for ManiarTech's own distribution part of the plan?
