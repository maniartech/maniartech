# Services rebuild - P0 claims register and content audit

**Created 2026-08-11.** This is the gate for the Services reconstruction: no page copy is
written until every material claim below is marked *publish*, *revise* or *remove*. It exists
because the Services pages carry the highest density of unconditioned absolutes on the site,
and several of them are commitments (staffing, data handling, reversibility) rather than
descriptions.

Status values: **PUBLISH** (verified, use as-is) | **REVISE** (true but must be conditioned)
| **BLOCKED** (needs Aamir before it can be published in any form) | **REMOVE**.

---

## 1. Claims requiring Aamir's decision (BLOCKED - copy cannot be finalized without these)

| # | Claim, as published today | Where | Why it is blocked | Proposed resolution |
|---|---|---|---|---|
| B1 | "Your documents, data, and prompts are **not used to train any third-party model**." Answer begins with a flat "No." | `services/ai/faq.md:9`, `services/ai/safe.md:9` (and therefore in FAQ JSON-LD) | This is a guarantee about **someone else's** processing. It holds only if the chosen provider, contract tier and deployment configuration all guarantee it, per engagement. It is not a property of ManiarTech. | Rewrite as a commitment we control: provider, deployment mode, retention and training terms are **documented and agreed per engagement before any data flows**, and named in the design record. Needs Aamir to confirm which providers/tiers are actually used. |
| B2 | "**Every step reversible**" - stated 6 times, including the page `description` and `seoDescription` | `services/modernization/` index, method, offerings, faq | Not universally true. Data migrations with destructive transforms, external-system cutovers, and regulator-facing switchovers are not reversible in general. Publishing it as a blanket property is the single largest overclaim in the section. | Replace with a **rollback envelope**: which steps are reversible, for how long, under what conditions, and which decisions require an explicit cutover. Needs Aamir to confirm the real envelope from RTL/Processious experience. |
| B3 | "**Experienced engineers only - no juniors learning on your project**" | `services/ai/trust.md`, `services/enterprise-software-engineering/safe.md`, `site/about/team.md`, `site/careers/index.md` | A staffing **promise**, not a description - same class as the response-time SLA we removed. If a vetted specialist ever brings an associate, the site is retroactively false. | Either (a) Aamir confirms it as a standing, enforceable commitment, or (b) restate descriptively: "the work is done by the senior core and a vetted specialist network; we do not staff trainees on client work." |
| B4 | ISO 9001:2015 and ISO/IEC 27001:2022, "certified by URS under UKAS accreditation - certificates 123961/B/0001 and 123961/A/0001" | 28 files mention ISO 9001; 16 mention 27001 | The certificate numbers and registrar are specific and checkable - good. What is unverified here is **current validity** (issue/expiry dates). A lapsed certificate published as current is a serious claim failure. | Aamir to confirm expiry dates; add them to the register and re-check at each review. Wording itself is fine. |
| B5 | Firm tenure: footer says "Engineering **since 1999**"; Services/estimate say "shipping software for clients **since 2010**" | `themes/.../includes/footer.html:65`, `site/estimate/index.md`, `site/estimate/who.md`, `services/.../faq.md` | Two different start dates attached to the same entity in the reader's eye. 1999 is Aamir's career start (consistent with "27 years"); 2010 is the firm. As published, the footer reads as the company's founding year. | Decide one convention: firm = 2010, founder's career = 1999/27 years, and never attach 1999 to "Maniar Technologies Pvt. Ltd." |

---

## 2. Claims that are true but must be conditioned (REVISE)

| # | Claim | Where | Condition to add |
|---|---|---|---|
| R1 | "built in about four months" (Sales Navigator) | `services/services/index.md:28`, app-SE page | Keep as a **fact about one project**; never phrase as a delivery-speed capability. Add scope ("presales only, no bookings/payments"). |
| R2 | "still in daily use about 15 years later" (RTL) | `services/modernization/index.md` | Already hedged with "about" and "by the lab's account". Keep, and mark it as **client-reported**, not measured by us. |
| R3 | "27 years in software and financial-technology systems built at JP Morgan" | 9 files | True per founder bio. Ensure it always attaches to **Aamir**, never to the firm's staff pool. |
| R4 | "mainstream, hireable technology" | 12 files (`hireable`), 27 (`mainstream`) | True and defensible, but it is now a motif. Keep the substance, cut the repetition (see the motif sweep in §5). |
| R5 | Chemo "live in production" | services + case study | Verified: two public URLs including the report checker. Keep. Do **not** extend to throughput/outcome numbers - none are measured. |
| R6 | Processious "In production", Booster "Internal - in production" | `foundry/*/index.md` | Accurate as internal/production-for-us. Must **not** be presented as customer deployments of a product. |

---

## 3. AI evidence - maturity must be stated per artifact (the brief's four-way split)

Verified from `foundry/*/index.md` `productStatus`:

| Artifact | Declared status | May be presented as |
|---|---|---|
| Documentor | **Early-stage** | Product in development. NOT a customer deployment. |
| Tallery Gallery | **Early-stage** | Product in development. |
| Ordin | **In development** | Product in development. |
| Processious | **In production** | Our platform, in production, carrying a client system (Chemo). |
| Booster | **Internal - in production** | Internal use only. |
| Content Engine | **no `productStatus` key found** | BLOCKED - cannot be cited as evidence until Aamir states its status. |

Several Foundry projects (gocurl, gotime, gowork, indigo, internet-object, uexl, vault-storage,
tajmahal-ssg, signals) carry **no `productStatus`** at all. For the Services evidence index, use
the /standards/ publication model instead (public spec / public implementation / concept note),
which is already verified.

---

## 4. Information architecture decision (agreed from the brief, recorded here as canon)

The current root presents Enterprise SE, Application SE and Technology Partnership as three
equivalent "kinds of engineering work", with AI and Modernization demoted to "capabilities".
That mixes three different axes. The rebuild separates them:

**Engineering practices (what the work IS) - four, each a first-class page:**
1. Enterprise Systems Engineering - systems spanning processes, roles, departments, governed
   records, approvals, integrations, controls, audit obligations.
2. Application and Product Engineering - a bounded product with a defined domain, user
   population, lifecycle and ownership boundary.
3. Modernization and Migration.
4. Applied AI Systems.

**Engagement models (how we work together) - presented separately, not as service lines:**
1. Technical assessment and architecture review
2. Engineering delivery
3. Embedded engineering partnership
4. Selective technology co-founder partnership (`/partnerships/`)

**Routes are preserved.** `/services/ai/` and `/services/modernization/` keep their URLs while
being promoted to practices; `/partnerships/` keeps its URL while being reframed as an
engagement model. No redirects needed.

---

## 5. Motif and CTA density audit (measured on the current pages)

| Problem | Measured | Target |
|---|---|---|
| "Get a free project estimate" as the primary action on every service page | in the shared `service-detail.html` hero + repeated per page | One restrained hero action per page, practice-specific ("Discuss an operational system", "Request an architecture review", "Request a modernization assessment", "Evaluate an AI use case") |
| "honest/honestly" as a motif | present across services (same problem already fixed on /standards/) | Demonstrate through conditioned claims, rejected options and not-fit sections |
| "mainstream" x27, "hireable" x12 | site-wide | Keep the idea, state it once per page where it bears weight |
| Generic headings ("What we build", "How we engage", "Why you can trust us") | all four pages | Headings must carry an engineering argument |

---

## 6. Template state (P1 input)

- `themes/maniartech/templates/service-detail.html` **exists but is orphaned** - no template
  extends it (`grep -l "service-detail"` returns nothing). The four practice pages each have
  their own 211-251 line template with duplicated structure and inline styles.
- Total to replace: services.html (168) + 4 practice templates (936) = ~1,100 lines with heavy
  duplication.
- The reading shell to reuse is the one now proven on `/standards/`: `.article-body` +
  `.toc`/`.toc-list` + `article/article.js`, with `data-depth="3"` available for nested
  navigation. **Do not build another TOC.**

---

## 7. Confidentiality boundaries (hard rules for this rebuild)

- The Love-and-Beyond partner briefing and any named partner proposal are **confidential** -
  never named, quoted or characterized on any page.
- `/partnerships/` must not imply a completed co-founder partnership or a venture portfolio.
- Client-specific operational detail beyond what the case studies already publish requires a
  sanitization pass; prefer sanitized abstractions labelled as such.
- No unpublished specification or implementation may be described as public (the /standards/
  gates already enforce this site-wide).

---

## 8. What must not be invented (restated from the brief, as a build-time rule)

Failed approaches - incidents - customer outcomes - performance figures - security guarantees -
deployment status - adoption numbers - confidential system details - any response-time SLA.
