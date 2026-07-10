# Tallery Gallery — Dossier

> **A collaborative Digital/Media Asset Management (DAM/MAM) platform.** The second
> Product collected. Its story is the **most human and the most carefully-handled** in the
> portfolio: **V1 was built, launched, and failed — it lost money during COVID.** The team
> is now rebuilding a far more rigorous V2 *with the lessons of that failure
> institutionalized into the engineering process.* That makes it a genuine
> "learned-from-our-mistakes, came back stronger" narrative — powerful and TRUE — **but
> the failure/financial-loss details are private and must never be public.**

- **Type:** Product (commercial). DAM/MAM — digital & media asset management with
  collaboration, sharing, and compliance.
- **Owner:** ManiarTech.
- **Status (Aamir, 2026-06):** "V1 failed miserably, we lost all our money during COVID.
  We're now developing a much better version after learning from our mistakes. **Server
  side is 70–80% ready; client integration is being developed by another developer.**"
- **Repo:** `\\wsl.localhost\Ubuntu\…\tallerygallery\tg` (Windows: `E:\Projects\tallerygallery\tg`)
  — `tg_server` (Django backend), `tg_client` (React webclient), `tg_container` (Docker/dev).
- **Sourcing:** `tg_server/docs/migration-guide/` (esp. `README.md` master overview dated
  2026-04-24, and `philosophy.md`), `SERVICES_SUMMARY.md`, app structure, client
  `package.json`, container config.

---

## What it is

Tallery Gallery is a **multi-account, collaborative DAM/MAM platform.** From the Django
app structure, the product = a system to **store, organize, share, discuss, and govern
digital/media assets** across teams:

- **assets** — the core: `Asset`, `Repository`, `Folder`, `Tag`, S3-backed uploads,
  trash/restore. (The DAM heart.)
- **collaboration** — `Collaborator`, `SharedLink`, `Thread`/`Comment`, `ActivityEntry`
  (sharing, commenting, activity log) — ReBAC-style sharing.
- **membership** — multi-account/organization, users, roles, invitations, RBAC.
- **compliance** — `AuditEvent` audit logging, GDPR anonymize/export.
- **discussions** — threaded discussion.

So: a team uploads and organizes media into repositories/folders, tags and searches it,
shares it via links/collaborators, comments and tracks activity, all under account-scoped
RBAC with audit/GDPR compliance. (A Bynder/Brandfolder/Canto-class space.)

---

## The "learned from failure" story (handle with care — this is the heart of it)

**V1** = the legacy `td_backend` (Django 3/4, MySQL, DRF, knox tokens) + an old webclient.
It launched and **did not survive COVID** (Aamir: failed, lost the money). **V2** is the
ground-up rebuild: legacy `td_backend` → modern `tg_server`, migrated **one module at a
time** under a strict, documented philosophy — *with a literal "Lessons Learned Registry"*
that every module's plan must cite and apply. That is, the failure has been turned into
**process**: review-before-action, ADRs, zero-warning gates, lessons applied forward.

→ **Public-safe framing (TRUE):** "Tallery Gallery is being rebuilt from the ground up with
a rigorous, modern engineering process." The *resilience + rigor* is the story.
→ **NEVER public:** "failed miserably," "lost all our money," the COVID loss, any framing
that reads as a distressed/abandoned product. That's private founder context, not copy.
(And note: V2 is **not live yet**, so we also cannot say "in production" the way we can for
Processious — see status/placement.)

---

## Current state — honest (from the migration master README, 2026-04-24)

Substantial, real progress — and the repo tracks it with refreshing honesty (✅ done /
⬜ pending markers throughout). This corroborates Aamir's "server 70–80%."

**Modern stack (V2), all decided & in place:**
- **Python 3.13 · Django 6.0.4 · django-ninja (Pydantic v2) · JWT (django-ninja-jwt) ·
  PostgreSQL 17 (psycopg3) · uv + pyproject.toml · S3 (django-storages/boto3) · MJML
  email.** (A deliberate modern re-platform vs V1's MySQL/DRF/knox.)

**Completed (server):**
- **Membership** ✅ — full auth (register/login/logout/refresh/verify/reset/profile),
  accounts/members/roles/invitations CRUD, account-scoped JWT with instant revocation,
  RBAC, rate limiting, JWT blacklist. (25+ services, large test suite.)
- **Assets** ✅ — repositories/assets/folders/tags CRUD, S3 upload initiate+finalize,
  trash/restore/permanent-delete with admin guards.
- **Collaboration** ✅ — collaborators, shared links, threads+comments, admin activity log.
- **Compliance** ✅ — audit events, GDPR anonymize/hard-delete pipeline.
- **Auth refactor A–E** ✅ — **580 tests passing** (per the doc).

**Pending (server, the remaining ~20–30%):** email wiring into register/password-reset,
production email backend (SES), GDPR data-export endpoint, metrics, OpenAPI polish, CI
pipeline, async email. (All tracked with acceptance criteria.)

**Client (`tg_client`):** separate webclient, **React 19 + MUI v9 + Vite + Storybook**,
authored by **nomaan.maniar (nomaan@maniar.tech)** — repo `tg-webclient3` (note the "3":
third-generation client). In active development (Aamir: "by another developer"). MIT
license on the client package itself (the webclient code).

> **Honest status label: "In development."** Real, rigorous, well-tested progress — but NOT
> launched/live. Never imply it's a shipping product yet.

---

## Two strong, TRUE trust signals this repo gives us

1. **It's a TEAM, not a solo act** — directly answers Trust Risk #2 ("traces to one
   person?"). The client is built by a **second named engineer (nomaan.maniar@maniar.tech)**
   while the server is built separately. Concrete, citable evidence of a real team with
   division of labor. (Don't publish the email, but the "multiple engineers, parallel
   workstreams" fact is usable.)
2. **The engineering rigor is genuinely exceptional** — and it's the brand's
   honest-engineering ethos in its purest form. `philosophy.md` mandates: **zero-warning
   policy** (stop & fix any `manage.py check` warning before proceeding), **80% min / 95%
   for critical** coverage, a **Lessons-Learned Registry**, **ADRs** for every major
   decision, **review-before-action** (no module migrated without an approved plan),
   **security-first CVE SLAs** (critical patched ≤7 days), **rollback plans + feature
   flags**, **one-file-per-endpoint** discipline, **dependency evaluation matrices**. This
   is process maturity most boutique shops can't show — and it's all real, in-repo. Strong
   capability-ceiling + "predictable by process, not heroics" proof (Trust Risk #2 antidote).

---

## Dogfooding & ecosystem ties (quiet proof points)

- **Runs on Booster:** `tg_container/` contains `booster.yaml` + multiple `booster-session-*`
  logs — Tallery Gallery's dev environment is orchestrated by **Booster** (ManiarTech's own
  dev-env tool). Authentic dogfooding: they build their product with their own tooling.
- **MJML email** ties to the same MJML usage seen in Ordin's plugins — shared house tooling.
- Contrast worth noting: Tallery Gallery is **Django/Python + PostgreSQL**, whereas
  Processious V2 is **Go + MongoDB**. Honest read: ManiarTech is **polyglot and
  pragmatic** (right tool per product), not religiously one-stack. Fine to reflect — they
  pick stacks deliberately (the PostgreSQL-over-MySQL ADR is a good example of that
  judgment).

---

## Honesty calibration (Governing Rule #1)

- ✅ **TRUE / public-safe:** "A collaborative digital asset management platform, being
  rebuilt with a modern, rigorously-tested engineering process." "Built by a team." "Modern
  stack (Django 6, PostgreSQL, typed APIs, 80%+ test coverage discipline)."
- ❌ **NEVER public:** the V1 failure, the COVID money loss, "abandoned/failed"; any claim
  it's **live / in production / available** (it isn't yet); a launch date we haven't set;
  performance numbers (none are benchmarked here); the engineer's email address; "580
  tests" as a marketing stat unless Aamir wants it (it's an internal snapshot that will
  change).
- ⚠️ **Stack-version residue:** the older `SERVICES_SUMMARY.md` (Nov 2025) and
  `tg_container/instructions.md` say **Django 5.2 / MySQL**; the authoritative migration
  README (Apr 2026) records the **decision to move to Django 6.0.4 / PostgreSQL 17 / Python
  3.13 / uv**. **Use the newer stack** as current; the MySQL docs are stale. (RECONCILIATION.)
- **Status label:** **"In development."** Not "Beta," not "In production." Honest and clean.

---

## Site placement (needs an Aamir decision — see questions)

> **★ UPDATE (Aamir, 2026-06): Tallery Gallery also powers a SERVICE — "Enterprise Digital
> Asset Management," handled through the Tallery Gallery *framework*** (see
> [[service-enterprise-dam]]). This partly RESOLVES the placement question: rather than
> presenting Tallery Gallery as a not-yet-live *product*, lead with the **capability as a
> SERVICE** (Tallery Gallery = the framework behind it). Honest, monetizable now, no "live
> product" claim. Tallery Gallery can still get a modest "framework / in-development" mention.

Because V2 isn't live and V1 is a sensitive chapter, placement is a judgment call:
- **Option A (recommended): "Coming soon / In development" product entry.** A real but
  modest Tallery Gallery page that presents the *product vision* + honest "in development"
  label, no failure history, no live claims. Plus use its **process rigor** as capability
  proof elsewhere (About/Services/"how we build").
- **Option B: Hold it off the site entirely** until V2 launches, and use only the
  *capability/process* story (anonymously) as proof. Safest if Aamir prefers not to signal
  an unreleased product.
- **Not recommended:** a confident "live product" page — false today.
- **Either way:** the **engineering-rigor narrative** (zero-warning, lessons-learned, ADRs,
  coverage gates) is gold for an **About / "How we engineer" / Services** section and for
  Trust Risk #2 — usable even if the product page stays minimal or absent.
- Cross-links: Booster (dogfooding), the honest-engineering ethos thread, Services
  (enterprise software development capability proof).

---

## Open questions for Aamir

- [ ] **Put Tallery Gallery on the site now, or hold until launch?** (Recommend: a modest
      "in development" product entry + use the process-rigor story as proof. Your call.)
- [ ] **Confirm the V1 failure / COVID loss stays 100% private** — and that we frame V2
      only as "rebuilt with rigor," never referencing the failure. (Strongly recommend.)
- [ ] **One-line positioning** — "digital asset management," "media asset management,"
      "collaborative DAM platform," or a more specific niche (which industry/use-case is
      Tallery Gallery aimed at)? Who's the target customer?
- [ ] **The team story:** OK to say "built by a team / multiple engineers" (citing the
      parallel server+client workstreams) as a Trust-Risk-#2 signal — without naming the
      individual or email?
- [ ] **The engineering-rigor narrative:** OK to feature our process (zero-warning gates,
      lessons-learned, ADRs, 80%+ coverage) on About/Services as proof of how we build?
      (It's one of the strongest trust assets in the whole portfolio.)
- [ ] **Expected launch / availability timeframe** — so we label it accurately and decide
      whether to tease it at all.
- [ ] **License / model** — commercial product, correct? (Client package is MIT, but the
      product as a whole is commercial — confirm.)
- [ ] **Any V1 assets reusable?** Old customers, testimonials, or screenshots from V1 we
      can ethically reuse — or is V1 fully closed?
