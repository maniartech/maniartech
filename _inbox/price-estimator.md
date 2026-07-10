# Inbox Dossier — AI Project Price Estimator

> Collection doc. Source: local repo E:\Projects\maniartech.com\price-estimator
> (business docs, phase3 product philosophy, prompts, go.mod). Status: **collected** —
> THIS IS THE PRIMARY WEBSITE CTA + a growth engine. Open Qs at bottom.

**Classification:** ManiarTech® **growth tool / lead-gen product** (internal, in active
dev). **The PRIMARY CTA of the new website** ("Estimate Your Project →"). Also reusable as
**partner enablement** (white-label).
**One-liner:** An AI-backed tool that asks a prospect a few sharp, domain-expert clarifying
questions about their project and returns an **upfront ballpark estimate** (explicitly NOT a
final quote) — building confidence that ManiarTech understands their domain and can deliver.

---

## 1. Identity / tech

| Field | Value |
|---|---|
| Name | (AI) Project Price Estimator |
| Type | AI lead-gen / proof-of-competence tool |
| Stack | **Go 1.25**; **AWS Lambda + DynamoDB + S3 + SES**; **Genkit** AI prompts; **WASM** build target (client-side capable) |
| Repo | github.com/maniartech/priceestimator (internal) |
| Status | Active dev (phase 3); internal tool |

## 2. Strategic role (straight from their own docs — excellent)

- **It is a proof-of-competence TOUCHPOINT, not a closing tool.** Job: *instill confidence*
  so the prospect explores ManiarTech and warms toward a conversation. NOT to close a contract
  in-flow. ("We are trying to earn trust and hand the prospect onward.")
- **Closes the "offshore trust gap"** — the real obstacle for an India-based shop selling to
  US/EU. The estimator's **expert, domain-aware questions** make a prospect think *"these
  people clearly know their craft."* **Competence shown beats competence claimed.**
- **Doubles as partner enablement** — a credibility tool channel partners can use
  (potentially white-labelled) to open/qualify their own deals.

## 3. The product philosophy (a masterclass — phase3/PHILOSOPHY.md)

The clarifying questions ARE the first impression. Principles:
- Ask **from the stance of a domain expert who already knows the field** — confirm the few
  decisions we genuinely can't settle, never the obvious. Prospect should think *"they didn't
  waste my time on the obvious — they went straight to what matters."*
- Every question must be (1) a genuine expert-can't-infer gap, (2) a **scope fork that changes
  price**, (3) answerable by THIS prospect (persona inferred from product: business owner vs.
  technical buyer). Probe **magnitude/complexity (quantum)**, not yes/no.
- Hard **NEVER-ASK** list: quality NFRs, our internal build mechanics, generic
  business-discovery (budget/timeline/market), anything already stated, filler options.
- 3–6 questions scaled to complexity, ≤7 total, best answer format each. Acceptance checklist.
→ This rigor is the SAME honest-engineering ethos as the Labs — applied to sales. It's why the
tool builds trust instead of feeling like a generic form.

## 4. Positioning it encodes (POSITIONING.md — important for whole site)

- **ManiarTech = excellent quality at ~50% cost.** Two structural reasons: India cost base +
  heavy AI-assisted development. Framed as a **structural margin we can share**, not a discount.
- That 50% edge funds everything: generous partner commissions, white-label markups, and a
  **free estimator + content as lead magnets**.
- **Lead with "excellent quality at half the cost"** in every pitch. ← This is a core brand
  message; reconcile with the site's overall positioning (boutique research lab + value).

## 5. Go-to-market (GO_TO_MARKET.md — directly answers Aamir's LinkedIn question)

Constraints: **no marketing budget; model budget IS available; time is the scarce resource.**
Principle: **product quality = distribution** (can't buy reach; earn it).
**Channel priority (their own ranking):**
1. Owned & warm (newsletter, past clients, email signatures) — highest trust, free
2. **Founder-led LinkedIn** ← exactly what Aamir is proposing; #2 in their own plan
3. Launch spikes (Show HN, Product Hunt, BetaList, subreddits, Indie Hackers)
4. Communities (share helpfully, never spam)
5. **SEO — the compounding play**: pre-generate an **"estimate library"** of "Cost to build
   X" landing pages → rank for high-intent searches → funnel into the tool (highest-leverage)
6. Channel partners (pay on results)
7. **Paid ads — LAST**, small, only behind a proven funnel
**CRITICAL discipline (their own doc): "validate before you spend or scale" — don't push
traffic to an experience that doesn't convert yet.** Soft-launch to warm traffic, measure the
funnel (start → complete → explore), only scale a channel that already converts.
**Viral loop:** a **shareable estimate result** carrying "Estimated by ManiarTech" branding —
every user = free reach (better than any single LinkedIn post).
Guardrails (because models cost money on a free public tool): reCAPTCHA + per-session caps +
input limits + budget alarm. GDPR/ePrivacy before any EU push.

## 6. My take on the LinkedIn distribution idea → see DISTRIBUTION-STRATEGY.md addendum
Short version: **smart and on-strategy (it's #2 in their own GTM), BUT sequencing is
everything.** The estimator hands prospects to the rest of ManiarTech — so the **website must
be ready to convert them FIRST.** Driving LinkedIn traffic to a leaky funnel burns your
network's one-time attention. Organic founder-led + the shareable-estimate viral loop are the
wins; be cautious with "unorganic"/paid (their own playbook puts paid LAST; spam damages a
trust brand). Full reasoning in DISTRIBUTION-STRATEGY.md.

## 7. Relationship to the website

- **The estimator and the website are ONE system:** Estimator builds confidence → hands
  prospect to the site → site converts (services, Labs proof, case studies, contact). If the
  site doesn't convert, the estimator's confidence leaks away. **This is a core reason to get
  the website right before scaling estimator distribution.**
- Primary CTA everywhere on the site: **"Estimate Your Project →"**; secondary: Contact.
- Decide: estimator lives at `/estimate/` on maniartech.com, a subdomain (estimate.maniartech.com),
  and/or a standalone shareable landing for LinkedIn/partners (white-label). Likely all three
  surfaces, one engine.

## 8. Open questions for Aamir
- [ ] **Funnel-readiness gate:** agree to validate the tool + ship the converting website
      BEFORE scaling LinkedIn/launch traffic? (Their own GTM mandates this.)
- [ ] "Organic/unorganic" — clarify "unorganic": paid LinkedIn ads (their plan = LAST), or
      mass-posting? (Caution: spam/bought engagement hurts a trust brand.)
- [ ] Build the **shareable-estimate viral loop** ("Estimated by ManiarTech") — highest-ROI
      distribution, beats founder posts. Priority?
- [ ] Build the **SEO estimate-library** ("cost to build X" pages) — the compounding engine?
- [ ] **Positioning reconciliation:** "excellent quality at ~50% cost" (estimator docs) vs.
      "boutique research lab" (site) — how loudly do we lead with the price/cost message vs.
      the depth/quality message? (They can combine, but needs a deliberate call.)
- [ ] Surfaces: /estimate/ on-site, subdomain, standalone shareable, white-label — which now?
- [ ] Is the estimator itself a **named product** (with its own page), or purely the CTA?
