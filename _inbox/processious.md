# Processious — Dossier

> **The first Product, and the single most important TRUST asset in the whole
> portfolio.** Everything else in the catalog is a library, a standard, a research
> project, or an internal tool. Processious is a **commercial platform that has shipped,
> runs in production, and serves a real paying customer.** It is the direct, factual
> answer to Trust Risk #1 ("almost everything is pre-1.0 — can they ship?"). Handle its
> claims with extra care precisely *because* it carries so much weight — see the honesty
> calibration section.

- **Type:** Product (commercial) — flagship.
- **Category:** No-code / low-code **business process automation (BPA) & application
  platform**. "Django for Go," but the product vision is a platform to build "virtually
  any modern system" (ERP modules, line-of-business apps, SaaS products).
- **Owner:** ManiarTech (built and owned).
- **Repos seen:** `E:\Projects\processious\prcs-v2` (the V2 monorepo) + its `docs/`.
- **Sourcing:** repo-wide `docs/` (00–09), package design docs referenced therein, and
  Aamir's verbal status (2026-06).

---

## What it is

Processious is ManiarTech's process-automation and application platform. Process
automation is the primary objective (workflow designer, business-rule engine, forms,
task management, notifications/escalations, audit trails), but the platform is
deliberately general: schema-driven data models, auto-generated CRUD APIs, RBAC,
multi-tenancy, and an integration hub sit underneath, so it can build full
line-of-business systems and ERPs, not just workflows.

The guiding analogy across the codebase is **"Django for Go"**: opinionated
project/app structure, an ORM-like data layer with schema migrations, an auth/authz
stack, middleware, management commands, and an auto-admin — but compiled, type-safe,
and performance-oriented (Go + MongoDB).

The end-state product vision is an **80 / 15 / 5** model of who builds what:
- **No-Code (80%)** — business users, a visual "Studio" builder (YAML/JSON, runtime-interpreted).
- **Low-Code (15%)** — power users, light scripting/extensions (JS/TS).
- **Pro-Code (5%)** — developers, full custom Go logic and integrations.

---

## Status — V1 / V2 / V3 (HONEST, and the most important thing to get right)

Processious is delivered across three generations. **Conflating them would be the
single easiest way to break Governing Rule #1**, so keep them strictly separate on the
site.

| Gen | Honest status | What it is |
|-----|---------------|------------|
| **V1** | ✅ **DELIVERED — live in production.** Used by a real (paying) customer + internal systems. | The original platform that proved the product and the business. This is the SHIPPED proof. |
| **V2** | 🚧 **In active development** (the `prcs-v2` repo). Per Aamir: "most of the base is ready; we can go to market for a project, and by the time we grab the project ~70–80% will be ready, and the rest is developed alongside the client project." | A ground-up re-architecture building the modular, multi-tenant Go **foundation/runtime** (data layer, auth/acp/tenancy, caching, HTTP, workflow engine, separate frontend). V2's job is to get the base right — it is NOT the finished no-code product. |
| **V3** | 📋 **Planned** | The full no-code/low-code experience (the visual Studio builder, the 80/15/5 model), built **as an application on top of the V2 core** (not a separate rewrite). Aamir: "once V2 is done and live on a couple of systems, we'll go V3." |

**The relationship that matters:** V3 is an application that runs on V2; V2 is the
engine that makes the no-code vision possible. Today the **pro-code Go path is the
primary way to build** on V2; no-code/low-code is the V3 build-out.

### Internal subsystem maturity (V2 repo, from `docs/08-STATUS-ROADMAP.md`)
The repo's own status doc is refreshingly honest (legend: ✅ done · 🟡 partial · 🚧 active · 📋 design-only):
- ✅ **Mature & well-tested:** data layer (`stores`, `mongostores` ~97% cov, query
  framework 200+ tests), config/errs/logging/caching, webserver (Echo v4), schema DSL,
  application (no-code defs serving, hot reload).
- 🚧 **Active (Phase 1):** `auth` (login/register/logout/sessions shipping, Argon2id,
  lockout/audit), `acp` (RBAC `Can`), `tenancy`, the `ordin` workflow engine, frontend
  (`prcs_client`, React 19 + Vite + Bun — early).
- 🟡 **Partial:** schema codegen CLI (`prcs schema:generate` — produces `*_gen.go`
  models, full end-to-end CLI incomplete), migrations.
- 📋 **Design-only (no code yet):** `pkg/engage` (25-doc design of record), `pkg/queries`
  stored-queries execution, FuseAPI implementation, the `framework/` package + `prcs`
  CLI + auto-admin, `prcs_infra` (empty).

> ⚠️ **Calibration note:** "~70–80% ready" and the internal partial/design statuses are
> honest INTERNAL planning facts. They are NOT public marketing copy. Publicly we lead
> with **V1 in production** and "the V2 platform powering new engagements" — we do NOT
> advertise a percentage-complete or promise V2 feature-completeness. (See site
> placement.)

---

## The monorepo (what's actually in there)

A genuine, substantial platform — not a toy:
- **`prcs_server`** — the Go backend framework + runtime (most mature). ~20 shared
  `pkg/*` packages (data, auth, acp, tenancy, caching, webserver, application, engage…),
  shared `services/*`, product `apps/*`.
- **`prcs_client`** — React 19 / Vite / Bun workspace, `@prcs/*` shared packages (early).
- **`ordin`** — ⚠️ **PLACEHOLDER / consumer only.** Per Aamir (2026-06): the real **Ordin
  is a separate system/product with its own repo (coming next)**; the `ordin/` here in
  `prcs-v2` is just the integration point where Processious *consumes* Ordin. So Ordin =
  its own Product dossier (pending the repo). Don't treat this folder as the source of
  truth for Ordin. (Resolves the earlier "Ordin = subsystem or product?" question:
  **separate product**, consumed by Processious.)
- **`fuseapi`** — protocol spec v1.0 (REST + streaming + deferred jobs). **This is the
  FUSE standard** from the Labs catalog, used here as Processious's API protocol.
- **`prcs_infra`** — deployment/IaC (placeholder, empty).

### Architectural signatures worth featuring (the honest-engineering thread)
- **NF-ARCH-001 — selective compilation:** "No application shall include unused
  capabilities in its compiled binary." Every `pkg/*` is a thin always-on spine + opt-in
  feature packages (auto-registered via `init()`), gated by imports/build tags. Design
  targets 40–60% smaller binaries + reduced attack surface for focused apps.
- **Schema-first development:** persisted models are GENERATED from YAML schemas (DSL
  with field flags, inheritance, profiles, compound/TTL indexes) into models/DTOs/
  validators/handlers — the bridge between no-code and pro-code.
- **App-as-executable:** each product app compiles to its own standalone binary
  (microservice-style), composing packages + services.
- **Three sibling identity packages** (`auth` = who are you · `acp` = what can you do ·
  `tenancy` = which tenant) with **no interface-level dependency on each other** —
  composed only at the app layer via structural typing. Clean, deliberate engineering.

---

## Processious Engage — a standout subsystem (and a White Papers goldmine)

`pkg/engage` is a **change-safe, tenant-aware behavioral policy & recognition engine**:
business apps emit events; Engage evaluates them against **versioned policies**, writes
to an **immutable ledger**, and materializes leaderboards/badges/quests/rewards/appraisal
read models — with **simulation, scoped recalculation, progressive rollout, and rollback
built in from day one**.

Why it matters beyond the feature list:
- **It IS the productized answer to the planned White Paper "How gamification enhances
  motivation in the enterprise."** Engage's entire thesis is *behavioral policy, NOT
  gamification* — its design explicitly cites that "generic game layers can worsen
  enterprise performance," so it makes alignment-to-objective, fairness, and governance
  the defaults (points/badges are one opt-in mechanic, never the goal). That is exactly
  the evidence-based, original-POV substance the White Papers section needs — and it's
  backed by real engineering, not a marketing essay. **Strong cross-link: White Paper ↔
  Engage ↔ Processious.**
- **Honesty as design:** consequential outputs (appraisal) are normalized,
  confidence-scored, carry reason codes + policy version, stay human-decided; aligned to
  NIST AI RMF / OECD, GDPR-minimized. The same intellectual-honesty thread as the specs.
- **Status: design phase only (25-doc design of record, no code yet).** Supersedes the
  earlier `pkg/gamification`. → Label it **Research/Design**, never imply it ships today.

---

## Strategic significance (why this is the flagship Product)

1. **It is the proof that ManiarTech SHIPS.** The portfolio's biggest credibility risk
   is "lots of pre-1.0 / unpublished — can they deliver?" Processious **V1 is live in
   production with a paying customer.** That is the strongest single rebuttal on the
   whole site — a commercial platform, not a repo. Lead Trust Risk #1's answer with it.
2. **It proves the capability CEILING for enterprise work.** A multi-tenant BPA/ERP
   platform with a generated data layer, RBAC, workflow engine, and a governed
   behavioral-policy subsystem is exactly the "we can handle work THIS hard" evidence the
   Labs-prove-the-ceiling argument needs — but in PRODUCT form, for business buyers who
   don't read GitHub. (TRUST-STRATEGY: "Use Processious as capability proof too.")
3. **It anchors the Services story.** "Enterprise software development / process
   automation" as a service is far more credible when backed by an owned platform that
   delivers it. Processious is both a product AND the engine behind the process-automation
   service line.
4. **It ties the ecosystem together — visibly.** Processious consumes **FUSE** (API
   protocol), **Ordin** (orchestration), and references **AddressQL** (`iql_go` in the
   workspace) and the honest-engineering patterns from the Go libs. It's the place the
   standards/labs stop being abstract and become a working commercial system. Powerful
   open-core-adjacent narrative: *the research feeds the product.*
5. **The internal docs model the brand's own ethos.** The repo's `docs/` literally
   practice what the site preaches — explicit "aspirational vs. implemented" sections,
   honest status legends, "when this doc and the package doc disagree, the package doc
   wins." This honesty discipline is itself a (quiet, internal) trust signal.

---

## Honesty calibration (Governing Rule #1 — read before writing any Processious copy)

Because Processious carries the most weight, it's also where an exaggeration would do the
most damage. The line to hold:

> **🔑 DECIDED (Aamir, 2026-06) — PUBLIC = "Processious", ONE product, NO version
> numbers, NO internal state.** Externally we never expose V1/V2/V3, never say "70%
> ready," never slice it into generations. It is simply **"Processious — our
> process-automation & application platform, in production."** The V1/V2/V3 split is an
> INTERNAL planning concern only. This actually simplifies honesty: one true,
> unqualified statement (it's a real platform, in production) with nothing to over- or
> under-claim.

- ✅ **TRUE to say (public):** "Processious is our process-automation & application
  platform, **in production**." "It powers [the kind of system it already runs]." "We
  build enterprise systems and process automation on it."
- ❌ **DO NOT say / imply (public):** version numbers or "V2/V3"; "% ready" or readiness
  state of any kind; that a self-serve no-code Studio exists today; that Engage / FuseAPI
  / stored-queries are shipping (design phase) — only describe what's genuinely available;
  a named customer or logo without explicit permission; unverified user/revenue/scale
  numbers.
- ⚠️ **Internal-only (never public):** the "go to market now; ~70–80% ready when we land a
  project; finish the rest alongside the client" delivery model, and the per-generation
  maturity. Legitimate sales posture, but stays internal.
- **Status label on the Product card:** **"In production."** Single, clean label — no
  version, no qualifier. (True today, and matches Aamir's "just say Processious" rule.)

---

## Site placement

- **Products → Processious detail page** (flagship product; likely the first/most
  prominent Product card). Page shape: hero + "what it does" + proof (V1 in production) +
  capabilities + the V2/V3 trajectory (honestly labeled) + CTA (Estimate / Contact).
- **Home:** Processious belongs in the proof section / numbers strip as the headline
  commercial product — "our process-automation platform, in production." Strongest
  single "they ship" signal on the home page.
- **Services:** cross-link from "Process Automation" and "Enterprise Software
  Development" — Processious is the platform that backs those service lines.
- **Labs cross-links:** FUSE (Processious's protocol), Ordin (its orchestration engine),
  AddressQL (used internally), and the honest-engineering ethos — show the research feeding the
  product.
- **White Papers:** the gamification/behavioral-policy paper pairs with **Engage** — the
  written POV plus the engine that implements it. Also "the real cost drivers of custom
  software" ties to the Estimator.
- **Status labels:** apply the three-generation labels above; never blend them.

---

## Open questions for Aamir

**✅ RESOLVED (Aamir, 2026-06):**
- ✅ **The production customer = THE one real case study** Aamir referenced earlier. This
  is the flagship proof asset — Processious in production for a real client.
  → Action: build it via CASE-STUDY-TEMPLATE.md Part A intake. (Still need: permission to
  name vs anonymize the client; the actual outcome details.)
- ✅ **No version numbers / no state, public.** Externally it's just "Processious," in
  production. V1/V2/V3 and readiness are internal-only. (See honesty calibration.)
- ✅ **Ordin = a SEPARATE product/system** (its own repo, coming next). The `ordin/` folder
  in `prcs-v2` is only a placeholder/consumer where Processious integrates it. → Ordin
  gets its own Product dossier when Aamir shares the repo.

**Still open:**
- [ ] **Case study specifics** — may we NAME the client (logo + name) or anonymize? Plus
      the outcome/metrics for the case-study page (use the intake questionnaire).
- [ ] **One-line positioning for Processious** — lead with "process automation,"
      "enterprise application platform," or "business process automation & ERP"? (Affects
      the product headline. Avoid "no-code platform" as the headline since the self-serve
      no-code surface isn't public yet — keep that framing for the future.)
- [ ] **FuseAPI dual-listing:** FUSE appears both as a Labs standard and as Processious's
      protocol. Confirm we present it once (Labs) and cross-link from Processious, rather
      than duplicating.
- [ ] **Engage as a public story?** Genuinely impressive subsystem but design-phase only.
      OK to describe it as a forthcoming/Research capability + use it to anchor the
      gamification White Paper? Or keep it internal for now?
- [ ] **Which capabilities are safe to showcase** as "available today"? (I'll default to
      what's genuinely in production + the mature, working pieces — and describe nothing
      that's design-only as if it ships — unless you say otherwise.)
- [ ] **Screenshots / demo:** any production UI we can show (scrubbed of client data)?
      Visual proof would strengthen the product page a lot.
- [ ] **License / model:** Processious is a commercial product (closed), correct? (vs the
      open-core Labs items.) Confirm so the page positions it right.
