# Reconciliation Register — flagged residues across the portfolio

> Consolidated list of every discrepancy / inconsistency / "residue" surfaced while
> collecting dossiers. Per Aamir: most are leftovers from earlier framework/plan states
> that changed over time. **Why this matters for the site:** inconsistency erodes trust —
> the website must show ONE name, ONE version stance, ONE license per project. Use this
> as the cleanup checklist before (and during) `_ia` build. Not blocking collection.

Legend: 🏷️ naming · ⚖️ license · 🔢 version/status · 📄 docs/README · 🔒 confidentiality

---

## A. Naming residues (pick ONE canonical name per project)
- 🏷️ **NITES** — git remote is `idsf-specs` (old name "IDSF"?). Canonical = NITES? Confirm
  & rename repo, or explain the relationship. [[nites]]
- 🏷️ **MDKit** vs **"MarkdownKit"** — README title "MDKit"; IP-CONFIDENTIAL says
  "MarkdownKit - Markdown Processor"; npm `@mdkit/cli` with aliases `mdkit`/`mdkit-cli`/
  `maniar-mdkit`. Pick the public brand. [[mdkit]]
- 🏷️ **xlib** — module/import path is `github.com/maniartech/x` (just "x"), repo dir
  "xlib", README title "xlib". Decide the public name (xlib? x?). [[xlib]]
- 🏷️ **FUSE vs FuseAPI** — deliberate split (FUSE = protocol, FuseAPI = impl). NOT an
  error, but must be explained consistently so it doesn't read as confusion. [[fuseapi]]
- 🏷️ **WebDoodling** capitalization — "WebDoodling" vs "Web Doodling" vs npm `webdoodling`.
  Standardize. [[webdoodling]]
- 🏷️ **Conductor / Orchestrator** — folder `conductor` (repo ~12★) vs module path
  `github.com/maniartech/orchestrator` vs README title "Orchestrator". Name **not
  finalized**. Also avoid collision with **Netflix Conductor** and the generic
  "orchestrator" term. Pick a distinct canonical name. **AND now also collides with Ordin**
  (Aamir's "Process Orchestrator") — clarify they're distinct: Ordin = high-level YAML
  workflow-automation engine (n8n-class); conductor/Orchestrator = low-level goroutine/task
  orchestration library. Confirm + separate the wording. [[conductor-orchestrator]] [[ordin]]
- 🏷️ **Growthicious** — (1) folder is "Grothicious" (likely typo) — confirm canonical
  **"Growthicious"**; (2) appears BOTH as a standalone planned product (own Python/Node+Qdrant
  SRS) AND as a "growthicious" product-app built ON Processious — clarify which. [[growthicious]] [[processious]]
- 🏷️ **Ordin** — older specs/pitch-deck call it **"Processious BRE" (Business Rules
  Engine)**; current product = **"Ordin"** (workflow/automation engine). Drop "Processious
  BRE." Also pick its public tagline (orchestrator vs workflow engine vs BRE). [[ordin]]
- 🏷️ **"The ManiarTech Keystone Method"** (the main service's methodology brand) — ⚠️ ALWAYS
  use the **"ManiarTech Keystone" lockup, NEVER bare "Keystone."** The bare word is crowded
  in consulting/ERP/IT (Keystone Strategy/AI = a tech-advisory firm in our lane; Keystone
  Business Services/Consulting/Software; **active USPTO "KEYSTONE" filing** serial 99028486).
  A *"Keystone Method"* as a named methodology is unclaimed → the lockup is usable/defensible.
  If marketing scales, trademark-attorney check in classes 35 (consulting) + 42 (software) on
  the lockup. Don't attempt to register bare "Keystone." [[service-business-process-automation]]

- 🔢 **Company founding year** — ✅ RESOLVED (Aamir): he left employment in **2009** to found it;
  the company was **officially registered in 2010**. **Use "since 2010"** site-wide (official,
  defensible). [[founder-bio]]
- 🏷️ **Founder past-employer framing** — ✅ corrected (Aamir): he worked **AT Countrywide
  Financial** (then world's leading home-loan provider; "North America's Most Admired Fortune
  500 Company" per Fortune), which is **now part of Bank of America** — keep the "(now BofA)"
  notation; it's accurate (= what the company became), like **Patni → iGATE** (then India's
  4th-largest IT services/consulting). He did NOT work *for* BofA. Lead with JP Morgan + the
  Fortune "Most Admired" framing. [[founder-bio]]

- 🔢 **ISO certs — exact details to verify from the certificates before publishing** (hard,
  buyer-verifiable claim): both **currently valid** (9001:2015 renewal ~next month; 27001 renewal
  ~Oct 2026) → claimable now. CONFIRM: (a) **27001 version** — Aamir said "2055" (typo); must be
  **2022** (not 2013, post-2025 transition); (b) **certificate numbers**; (c) **UKAS-accredited
  mark** present (UKAS-accredited = gold standard — state it explicitly); (d) validity dates.
  Roles: **URS** = the certification body/registrar that **issued** the cert (URS also offers
  consulting & training as separate services — hence Aamir's "consulting company" remark — but
  for OUR certs it acted as the certification body); **UKAS** = accreditation body that accredits
  URS. Phrase: "certified by URS under UKAS accreditation." Keep renewals current or the claim
  lapses. [[founder-bio]] [[TRUST-STRATEGY]]

## B. License residues (decide & state ONE license per project)
The portfolio currently spans MIT, ISC, Apache-2.0, AGPL-3.0+Commercial, CC-BY-ND-4.0,
and "unstated/proprietary." That's fine *if intentional* — but each public page must
state it clearly, and the inconsistencies below need a decision:
- ⚖️ **Internet Object** — ISC (per repo). Confirm that's the public story. [[internet-object]]
- ⚖️ **UExL** — license NOT stated in README. Decide before publish. [[uexl]]
- ⚖️ **xlib** — **AGPL-3.0 OR Commercial** (dual) — intentional & a selling point, but
  differs from the MIT/ISC siblings; confirm messaging. [[xlib]]
- ⚖️ **MDKit** — README footer says **MIT** + public clone, but repo has **IP-CONFIDENTIAL**
  (proprietary). Contradiction = the #1 thing to reconcile here. [[mdkit]]
- ⚖️ **Booster** — IP-CONFIDENTIAL now; OSS license TBD at release. [[booster]]
- ⚖️ **FuseAPI** — dual: spec CC-BY-ND-4.0 + impl Apache-2.0 (intentional). [[fuseapi]]
- ⚖️ **printeer** — Apache-2.0 (differs from MIT siblings; fine, just note). [[printeer]]

## C. Version / publication-status residues (state ONE honest status per project)
- 🔢 **Internet Object** — package.json **0.2.1** vs CHANGELOG **1.0.0-beta.1**. DECIDED:
  omit version on site until reconciled. [[internet-object]]
- 🔢 **xlib** — CHANGELOG says **"v1.0.0 Final Release (Dec 2025)"** but publication
  UNCONFIRMED (likely not public, since UExL its consumer isn't). "Final but not public"
  is a contradiction to resolve. Also stale **coverage numbers**: README table 70.8%/293
  vs headline+CHANGELOG **80.2%/332**. Use 80.2%; fix the table. [[xlib]]
- 🔢 **WebDoodling** — package.json **v2.0.0** but "under development / unpublished"; legacy
  v1 existed. The "2.0" = new-gen-vs-legacy, not a shipped 2.0. Clarify. [[webdoodling]]
- 🔢 **printeer** — **published v1.2.15 has real bugs**; improved version unreleased.
  Published ≠ current quality → don't push npm install until overhaul ships. [[printeer]]
- 🔢 **gotime** — published **v2.0.3** (itself a docs-only hotpatch finishing the v2
  module-path migration — a migration residue) + "new version coming soon." [[gotime]]
- 🔢 **signals** — README **retired** old "sub-10ns / zero-alloc" blanket claims (honest
  self-correction); **v1.4 not yet published** though docs describe it. [[signals]]
- 🔢 **UExL** — not published; close (pending datetime + builtins + stdlib). [[uexl]]
- 🔢 **NITES** — spec v1.0 **draft**, finalization pending. [[nites]]
- 🔢 **FUSE/FuseAPI** — **pre-1.0 design phase**, wire protocol NOT frozen, PoC first. [[fuseapi]]
- 🔢 **Booster** — not published; "soon." [[booster]]
- 🔢 **MDKit** — v0.1.0, internal. [[mdkit]]
- 🔢 **Tallery Gallery** — stack-version residue: older `SERVICES_SUMMARY.md` (Nov 2025) +
  `tg_container/instructions.md` say **Django 5.2 / MySQL**; authoritative migration README
  (Apr 2026) records the move to **Django 6.0.4 / PostgreSQL 17 / Python 3.13 / uv**. Use
  the NEW stack as current; MySQL docs are stale. [[tallery-gallery]]

## D. Docs / README residues
- 📄 **WebDoodling** — README is a **stub** ("# WebDoodling"); real positioning lives in
  docs/why-webdoodling.md. (Doesn't affect site, but repo looks unfinished when public.) [[webdoodling]]
- 📄 **MDKit** — README references `bun.lockb` but repo has `bun.lock`; self-contradicting
  MIT-vs-confidential (see B). [[mdkit]]
- 📄 **Internet Object** — JSON-compatibility chapter is a placeholder stub. [[internet-object]]
- 📄 **xlib** — README "Excel compatibility" table stale vs headline (see C). [[xlib]]

## D2. Tone / claim residues (reconcile with the house honesty standard)
The brand's strongest asset is **provable, honest engineering** (signals' v1.4 doc bans
"military-grade / mission-critical / battle-tested" until invariants are mechanically
proven). A few repos still carry older hype language that contradicts it:
- 📄 **Conductor/Orchestrator** — README headline "**Military-Grade** Goroutine
  Orchestration" + "zero-allocation" claims. Drop or earn (signals-style proof). [[conductor-orchestrator]]
- 📄 **signals** — already self-corrected (retired blanket "sub-10ns/zero-alloc"). Use as
  the MODEL for how to phrase claims everywhere. [[signals]]
- 📄 **Documentor.AI** — `AGENTS.md` mandates **"Military Grade Robustness"** (same banned
  term as conductor); internal dev guideline only — never public. Also the
  **"100+ beta users"** in `documentor-ai-features.md` is a success-metric TARGET, NOT real
  — never cite as fact. Monetisation tiers/prices = illustrative, not committed. [[documentor-ai]]
- General rule for the site: every superlative must be backed by a committed benchmark /
  proof, or replaced with calmer provable language. No "military-grade" without the proof.

## D3. Command/feature-evolution residues
- 📄 **gowork** — `check` command **absorbed into `doctor --ci` (2026-03-05)**; `check.md`
  retained "historical," but the minimal README and older command lists still imply a
  standalone `check`. Align README + site copy to the unified `doctor` (modes:
  `doctor` / `--fix` / `--ci`). [[gowork]]

## E. Confidentiality residues (handle before anything goes public)
- 🔒 **IP-CONFIDENTIAL template placeholder** — Booster's (and MDKit's) IP-CONFIDENTIAL.md
  still contains the **template instruction comment block** at the top ("Copy this file…
  replace [PROJECT NAME]…"). Residue of a template; scrub when files go public. [[booster]]
- 🔒 **Booster demo screenshots** show a *different internal client project* (real-estate
  sales app + property names). MUST be scrubbed/replaced with a neutral sample before any
  public use of those screenshots. [[booster]] **★ NOW IDENTIFIED:** this is the **Sales
  Navigator** engagement — a REAL current client (real-estate construction company) being built
  end-to-end (see [[service-custom-software-engineering]]). So it's a real case-study candidate
  (anonymized), and the client/property names in the screenshots are REAL → scrub everywhere.
- 🔒 **Booster / MDKit** — proprietary now; no repo/install links on site until public. [[booster]] [[mdkit]]
- 🔒 **Documentor.AI** — proprietary AI venture (seeking investors): keep fundraising
  narrative (TAM/monetisation/projections) OUT of public site; `dc-editor/README.md` is v0
  boilerplate exposing a personal Vercel URL + email — replace before any publicity; not
  live → never "available/beta-open." [[documentor-ai]]
- 🔒 **Tallery Gallery V1 failure is PRIVATE** — V1 launched and failed (lost money during
  COVID). NEVER public. Public framing = "rebuilt with rigor," never the failure/loss.
  Also: V2 is **not live yet** → never say "in production/available." Status = "In
  development." Don't publish the client engineer's email. [[tallery-gallery]]
- 🔒⛔ **Ordin pitch deck is FABRICATED** — `ordin/specs/presentations/pitch-deck.md` is a
  template deck full of INVENTED claims: a fake "ABC Corp" case study ("90% optimal
  decision-making"), "99.999% uptime / zero breaches," fabricated McKinsey/Forbes/Gartner/
  TechRadar sources, fake testimonials ("CTO NextGenTech," "CEO Zenith Innovations").
  **NONE is real — quarantine; must NEVER reach the site.** The single worst Governing-
  Rule-#1 hazard in the portfolio. Also: Ordin/Engage **"<10ms / >10k events-sec" are
  TARGETS, not measured** — don't publish as facts. [[ordin]]
- 🔒⛔ **Love and Beyond partner briefing is CONFIDENTIAL** — `Love-and-Beyond-Partner-Briefing.pdf`
  (the Technology Partnership reference proposal) is marked "for discussion among founding partners
  only," Confidential on every page; names a specific venture + a partner's recruiting network +
  market/pricing detail. **NEVER publish, share, quote, or name the venture publicly.** Use only
  as (a) internal proof of venture-grade capability and (b) the basis for a fully ANONYMIZED "how
  we structure partnerships" framework (method only, no deal/names/numbers). Also: ManiarTech has
  **NO completed venture partnership** → never claim a track record of co-founded ventures. [[service-technology-partnership]]
- 🔒 **Growthicious planning docs are ILLUSTRATIVE** — the **$150/$300/mo pricing**, the
  **placeholder testimonials** ("Hear from clients…" — no real clients), and the feature/
  outcome lists are planning drafts, NOT facts. Planning-stage product → never publish any of
  it as real; recommend HOLD off the public site entirely. [[growthicious]]

## F. Cross-cutting decisions this surfaces (good to settle once, globally)
1. **A licensing policy table** — one row per project, public license stated. Removes all
   per-project ambiguity above; could even be a small public "Open Source & Licensing" note.
2. **A naming/brand convention** — canonical name + casing per project; resolve the
   protocol-vs-implementation splits (FUSE/FuseAPI) and old names (idsf, MarkdownKit, x).
3. **A status vocabulary** — fixed labels site-wide: e.g. **Published · Beta · Shipping
   soon · Research (design phase) · Internal**. Apply one per project; never imply more.
4. **Version display policy** — when to show a version number vs not (default: show only
   for published-and-current; omit where in flux, e.g. Internet Object).

> None of this blocks dossier collection. It becomes the **cleanup pass** during `_ia`
> build so the site presents a consistent, trustworthy face. Several are also quick repo
> hygiene fixes worth doing regardless of the website.
