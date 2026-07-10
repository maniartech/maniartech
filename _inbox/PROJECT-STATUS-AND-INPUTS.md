# Project Status, Roadmap & Pending Inputs

> The single "where are we / what's next / what are we waiting on" doc. Read this first
> after any context compaction. All detail lives in the linked docs/dossiers (on disk =
> compaction-safe); this is the index + the things that were conversation-only.

---

## ✅ IA DRAFTED + CRITICALLY REVIEWED (2026-06) — all **21 client-facing `_ia/` pages** are
drafted on the Presentation Doctrine (lead with their safety, depth as closer) AND have been through a
whole-site multi-agent critical review (3 cold buyer personas + cross-page consistency + claim-audit/
Governing-Rule-#1 + gated-flag harvest). **34 surgical fixes applied** in this pass — cut surviving
"most teams our size carry neither" comparatives, softened every not-live-estimator guarantee,
standardized the bald "Senior engineers only" absolute → behaviour form site-wide, calibrated the
Labs claims (no v2 pass had run there), dropped Processious V1/V2 version tokens, and fixed founder-bio
/ status-label cross-page inconsistencies. **→ Full findings + the consolidated launch-blocker
checklist: [`_inbox/REVIEW-FINDINGS-AND-LAUNCH-BLOCKERS.md`].** Pages done: sitemap · home · about ·
careers · services (overview + Enterprise SE + Application SE + AI capability + Modernization
capability + Partnerships) · labs · standards · products (listing + Processious/Ordin/Documentor/
Tallery/Booster) · white-papers · insights · estimate · contact. **Cold-panel verdict:** all 3 personas
"would hesitate" (4–6/10), none bounce — the open is earned; trust turns to "yes" the moment the
launch blockers are filled. **LAUNCH BLOCKERS (only Aamir can supply):** (1) ≥1 real client case study
[#1 unanimous] · (2) Processious flagship proof card (name/anonymize + outcome + scrubbed screenshot) ·
(3) ISO cert #s + URS/UKAS + verify link + 27001 version · (4) legal entity + address + jurisdiction ·
(5) founder LinkedIn URL · (6) resolve placeholder nav links · (7) estimator interim SLA/surface ·
(8) White Papers out of nav until ≥1 published paper · (9) Booster demo + scrub client names.
**Remaining build work (not gated):** Labs detail pages (×17, lowest priority) → theme conversion →
site generation.

## Where we are (as of 2026-06)

**Phase: discovery/collection — nearly done.** We are documenting ManiarTech's full
portfolio into `_inbox/` dossiers BEFORE building the site IA. Build `_ia/` only after the
catalog + key decisions are settled.

- ✅ **Labs / Standards / tooling: COLLECTED** — 20 dossiers (see `_inbox/README.md` tracker).
- ✅ **Strategy captured:** Lab confidence report, Trust strategy (2 fears), Distribution
  strategy (incl. client-acquisition + LinkedIn/estimator), Reconciliation register.
- ✅ **Price Estimator** (primary CTA + growth engine) documented.
- 🚧 **Products: IN PROGRESS** — ✅ Processious ([processious.md] — flagship; "in
  production" publicly, no version exposure) · ✅ Ordin ([ordin.md] — fair-code workflow
  engine, in development, consumed by Processious; pitch-deck FABRICATED → quarantine).
  ✅ Tallery Gallery ([tallery-gallery.md] — collaborative DAM/MAM; V2 rebuild in dev;
  V1-failure/COVID-loss PRIVATE; strong rigor + 2nd-engineer team signal). Still pending:
  Taj Mahal Spaces (+ Booster-as-product). ✅ Documentor.AI collected
  ([documentor-ai.md] — CLASSIFIED as Product/AI-venture not Labs; post-POC, seeking
  investors; flagship AI-engineering proof). ✅ Taj Mahal Spaces DECISION: not a product
  entry now — fold open-core direction into Taj Mahal SSG page (future tense), no date,
  launches ~2-3mo after framework release (internal timing only). Same flow.
- ✅ **Services: ~COMPLETE** — ✅ Business (Process) Automation & Integration (MAIN/flagship;
  consultative value-ladder; **"ManiarTech Keystone Method"** w/ 5 stages; proof Processious+
  Ordin+Engage+papers+ISO) · ✅ Enterprise DAM (on Tallery framework) · ✅ AI-Driven Innovation
  & Development (proof Documentor+Estimator) · ✅ Legacy System Modernization (de-risk method +
  dogfood proof) · ✅ Transition to Golang ecosystem (⭐ authored-Go-ecosystem+Indigo proof;
  honest polyglot framing). PATTERN: each service backed by an owned framework/proof
  (BPA↔Processious, DAM↔Tallery, AI↔Documentor, Go↔Go-ecosystem). Pending: confirm whether
  "Enterprise Software Development" is still a distinct service or absorbed.
- ✅ **Positioning decision RESOLVED (Aamir, 2026-06): DEPTH/QUALITY/WORLD-CLASS.** "~50% cost /
  cheaper" REMOVED as a positioning pillar (contradicted premium brand + reinforced offshore-cheap
  stereotype). No price as a brand promise; efficiency = a quiet discovered benefit. Premium
  positioning now → premium pricing/world-class team as proof+revenue grow. (Full: memory + sitemap.)

## Roadmap (planned sequence)
1. Finish **Products + Services** dossiers (in progress).
2. **Consolidated open-questions review** with Aamir (gather every dossier's "Open
   questions" + the inputs below + positioning call).
3. **Rebuild `_ia/`** from the full catalog + decisions (current `_ia/` is a STALE early
   draft — see warning below). Includes the IA build directives below.
4. **Convert the Infolio theme** (`_external-themes/Infolio/`) → Taj Mahal theme matching the
   IA's page shapes (per tajmahal-ssg skill build-site workflow).
5. **Generate content** from `_ia/` (drafts I write + Aamir's real inputs slotted in).
6. **Build & verify** (`taj serve`/`taj build`), then launch sequence (validate estimator →
   converting site → THEN scale distribution; see DISTRIBUTION-STRATEGY.md).

## ⚠️ `_ia/` IS STALE — REBUILD, DON'T TRUST
`_ia/sitemap.md`, `_ia/home/index.md`, `_ia/labs/internet-object.md`, etc. were drafted
EARLY (when only ~4 Labs items existed) and predate the full catalog + all strategy. They
hold useful seed structure/voice but are OUT OF DATE. Treat as drafts to supersede in step 3,
not as the current plan. (research-notes.md is still valid reference.)

---

## IA build directives (decisions that MUST shape the rebuilt `_ia/`)
Distilled from the strategy docs so they aren't missed when we rebuild:
- **⛔ #1 GOVERNING RULE: NOWHERE exaggerate or overpromise.** Every claim TRUE + SOURCED +
  CALIBRATED + status-honest. Run the CLAIM AUDIT (TRUST-STRATEGY.md top) on every page before
  it ships. Overrides everything. The truth is impressive enough — show it, never inflate it.
- **Primary CTA everywhere: "Estimate Your Project →"**; secondary: Contact. (Estimator +
  site = ONE funnel; site must convert — price-estimator.md.)
- **Insights/Blog is MANDATORY**, not a nice-to-have — it's the content/SEO engine for the
  distribution fix (DISTRIBUTION-STRATEGY.md). Plan the SEO "estimate-library" loop too.
- **NEW: Research / Papers section** (RESEARCH-PAPERS-SECTION.md) — formal applied-research
  papers shared with clients (e.g. gamification-in-enterprise). Elevates vendor→advisor,
  closes trust gap, distribution asset. THREE distinct content types to keep separate but
  connected: **Labs/Standards** (built), **Papers/Research** (written), **Insights/Blog**
  (timely). QUALITY BAR is make-or-break — a few excellent papers, not a content farm.
  Dogfood with MDKit + host on Taj Mahal. Page shape: `/research/*` list/article + PDF.
- **A "Research / Standards / Languages" hub** with **Indigo as headliner** above the 5
  standards (IO/NITES/UExL/FUSE/AddressQL). The strongest single statement on the site.
- **Labs page organization** (LABS-PAGE-IA.md): category-first, proof-first within, honest
  status label on every card. 4 clusters: Standards & Languages (own sub-hub) · Open Source
  Libraries · Developer Tools · Frameworks & Platforms. Hero proof strip; CTA to Estimate.
- **Labs section** = the credibility engine; **proof-first ordering** (published/starred
  first: signals ~325★, vault, gotime, Internet Object; research labeled as pipeline).
- **Honest per-project status labels**, fixed vocabulary: Published · Beta · Shipping soon ·
  Research · Internal. One per project. (RECONCILIATION.md §F.)
- **Answer the two trust fears deliberately** (TRUST-STRATEGY.md): "can they ship?" (lead
  with shipped + 15yr delivery + ISO) and "one person?" (founder as asset + team + process).
- **Founder presence** (technical-founder voice) on Home + About — deliberate, not faceless.
- **Case-study slots ready** (home proof section + `/case-studies/`) — 2 real ones coming.
- **"Built with Taj Mahal" footer badge** + repo/website cross-linking (passive distribution).
- **Newsletter signup** (owned audience).
- **Open-core story** told visibly: Taj Mahal SSG (OSS engine) ↔ Taj Mahal Spaces (product).
- **Go DX toolkit** cluster (Booster/gowork/gocurl/orchestrator) + the standards cluster.
- **Positioning to resolve before final copy:** value (~50% cost) vs depth (research lab) —
  combine as "world-class engineering, structurally half the cost," but Aamir sets the emphasis.
- Apply the RECONCILIATION fixes (one canonical name/license/version/status per project).
- Keep the honest-engineering ethos visible (reproducible benchmarks, "no output better than
  wrong output") — it's the core differentiator and trust signal.

---

## PENDING INPUTS FROM AAMIR (consolidated — the only things blocking precision)
None block continued collection; all sharpen the final site.

**Highest leverage (client conversion):**
- [ ] **2 real case studies** — confirmed available, sharing LATER. → Use the intake
      questionnaire in **CASE-STUDY-TEMPLATE.md Part A** (Aamir fills rough notes → I write
      the page). Lowest-friction path to the highest-leverage asset.
- [ ] **Testimonials** from old site — text + permission to name clients.
- [ ] **Ideal-client profile** (industry, size, problem type) — sharpens positioning + SEO.
- [ ] **Real numbers** — clients served, projects delivered, team size, OSS stars/downloads.

**Positioning / brand:**
- [ ] **Price-vs-depth positioning call** (lead with value, depth, or combined?).
- [ ] **How visible Aamir wants to be as founder** (bio, photo, voice, prominence).
- [ ] **Team details** — who else, roles, size framing we're comfortable stating.

**Distribution:**
- [ ] Appetite to **publish unpublished projects** sooner (biggest OSS-awareness unlock).
- [ ] Willing to **delegate** social/content/outbound (part-time DevRel or AI pipeline)?
- [ ] OK for AI to **draft launch posts/articles** from specs for approval?
- [ ] Estimator **surfaces** (/estimate/ on-site, subdomain, standalone shareable, white-label)?

**Per-project (from dossiers' "Open questions" — review in step 2):**
- [ ] Publication status, license, version, and canonical NAME for each project
      (RECONCILIATION.md is the register).
- [ ] **Ordin ↔ conductor/orchestrator** relationship; **Documentor AI** = Labs or Product?
- [ ] Internet Object version to show (0.2.1 vs 1.0.0-beta.1); feature the Zen poem?
- [ ] Confirm nameable adopters / "used internally" / "10+ sites on Taj Mahal" wording.
- [ ] Confirm OK to publish competitor-naming benchmark tables (UExL vs cel-go/expr; WebDoodling
      vs PixiJS/Konva; FUSE/AddressQL comparison tables).

**Assets:**
- [ ] Office address detail, social handles, GitHub org URL, ISO badge images, logo/brand.

---

## Key conversation-only conclusions now safely recorded
(So they survive compaction — full versions in linked docs + project memory)
- ManiarTech is a **standards-and-languages research lab**, not a dev shop; **under-selling,
  not over-selling**; the gap is **distribution, not capability** (REPORT-maniartech-lab.md).
- The **low stars & few clients share one cause (invisibility)** but need different cures;
  the **website is the #1 client-acquisition fix** (DISTRIBUTION-STRATEGY.md).
- **Sequence: fix the converting funnel (website) FIRST, then open distribution taps.**
- Aamir = hardcore dev-founder; **social isn't his thing** → systems + delegation, not
  "become an influencer."
