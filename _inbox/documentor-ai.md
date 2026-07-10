# Documentor.AI — Dossier

> **A "Vibe Document Development" platform** — the document-world analogue of vibe-coding
> tools (Cursor / v0 / Lovable / Bolt): you *chat about the document you want*, and an
> AI agent continuously **builds, develops, and refines** it for you, grounded in your own
> uploaded knowledge. Aamir (2026-06): **"a vibe document development platform — we're
> looking for investors. Currently at post-POC stage."**
>
> **This resolves the long-open "Documentor AI = Labs or Product?" question → it's a
> PRODUCT (a commercial AI venture), NOT Labs.** Labs = OSS/standards/tools ManiarTech
> builds for the ecosystem; Documentor is a standalone commercial AI product seeking
> investment. Handle like Tallery Gallery: pre-launch, honest "early-stage" framing, and
> primarily valuable as **AI-engineering capability proof**.

- **Type:** Product — commercial **AI venture** (seeking investors).
- **Stage (Aamir):** **post-POC.** Working multi-component prototype + a polished,
  investor-grade product spec; NOT a launched/available product.
- **Category:** AI-native document creation, development & collaboration platform
  ("vibe documenting").
- **Repos shared:** `dc-container` (infra/orchestration), `dc-editor` (Next.js editor),
  `dc-server` (Django backend). Two more components referenced but **not shared**:
  `dc-agentkit` (the AI engine) and `dc-webclient` (management hub).
- **Sourcing:** `dc-server/the-documentor/` (11-doc product spec incl. the featured
  `vibe-document-development.md`), `dc-editor/documentor-ai-features.md` + README,
  `dc-server/README.md` + `wip-notes/`, `AGENTS.md`.

---

## What it is

Most "AI writing" tools dump a wall of text into a box. Documentor's thesis is different
and timely: **"vibe coding → vibe documenting."** You don't grind out paragraphs — you have
a conversation, and the document evolves turn by turn. It combines three things usually
split across tools:

1. **AI authoring** — autonomous agents draft a whole structured document from one prompt,
   then refine it section-by-section through chat (insert / rewrite / restructure / restyle
   / summarise), streaming changes and asking when unsure (human-in-the-loop).
2. **Your own knowledge (grounding)** — uploaded sources (PDFs/docs/notes) are indexed in a
   **knowledge base (pgvector RAG)**; the AI cites *your* facts instead of hallucinating,
   and output is validated against acceptance criteria (coverage/citations/completeness).
3. **Real collaboration backbone** — accounts, projects/folders, versioning, roles/RBAC,
   document locking, audit trails, shareable links — the infrastructure that makes it a
   team tool, not a toy.

Plus: tone/style transformations, project variables (`@client_name`), multi-modal
**infographic** generation (vision models), export (PDF/Word/MD/TXT), persistent chat
history. Target users: solo creators → small teams (agencies/consultancies) → orgs needing
controlled, auditable, knowledge-grounded document production.

---

## Architecture — five cooperating components (genuinely serious AI systems work)

| Component | Role | Stack |
|-----------|------|-------|
| **dc-server** | Backbone / system-of-record — identity, projects, documents, knowledge base, AI-session records, security/audit | Django + django-ninja + **PostgreSQL/pgvector**, JWT, RBAC, service-layer |
| **dc-agentkit** | The **AI engine** — generation, conversational editing agent, infographics, knowledge research, **per-task model routing** | FastAPI + **LangGraph** agents *(not shared)* |
| **dc-webclient** | Management hub — projects, billing, account *(not shared)* | — |
| **dc-editor** | Writing surface — rich WYSIWYG + AI assistant acting on the doc | **Next.js** (bootstrapped via v0.app), Bun/pnpm, Tailwind |
| **dc-container** | Engine room — DB, orchestration, dev tooling | Docker Compose, **Booster** (`booster.yaml` + session logs) |

The separation is deliberate (per the spec): the **AI engine evolves independently** of the
document system; heavy AI work scales separately; clear security boundaries. The editor
talks to dc-agentkit **server-side only** (secrets never reach the browser) — a sound
security choice worth noting.

**The AI substance is real:** agentic architecture (LangGraph), RAG grounding with citation
validation, multi-model routing for cost/quality control, streaming + human-in-the-loop.
This is legitimate, current-best-practice AI engineering — the strongest such proof in the
portfolio.

---

## Honest current state (post-POC)

- The **`the-documentor/` spec is investor-grade product documentation** (overview, problem,
  personas, features, AI capabilities, knowledge base, components, customer journey,
  monetisation, glossary) — excellent, but it describes the **product vision**, not 1:1 what
  ships today.
- **Real, working pieces exist:** dc-server (Django backbone w/ RBAC, pgvector, tests per
  `wip-notes`), dc-editor (functional Next.js editor with AI chat integration — its `docs/`
  show completed chat integration, editor facade, auth), Booster-orchestrated stack.
- **Stage = post-POC / pre-launch.** Not generally available; no public beta confirmed.
- Same **house engineering patterns** as Tallery & Processious (Django-ninja + service layer
  + Result types + RBAC + `wip-notes`/lessons docs) — consistency across ManiarTech products
  (and dogfoods Booster). Reinforces the "systematic, not ad-hoc" story.

> **Honest status label: "Early-stage / In development" (AI venture, seeking investment).**
> Never "available," "live," or "beta-open" until true.

---

## ★ Origin & true identity (Aamir, 2026-06) — important reframe

Documentor was **born from the Business-Process-Automation service vision**, not as an AI
toy. The BPA method depends on **documenting everything** (processes, formats, procedures,
records) so an organization is resilient — independent of any one person, with less bias and
lower supervision cost. **Documentor was started to be the tool for exactly that:**
institutional knowledge/process capture. It *later* grew toward an "AI vibe document
environment," **but essentially it is still that.** [[service-business-process-automation]]

Why this matters for the site:
- It gives Documentor a **more grounded, enterprise-credible narrative** than "vibe coding
  for docs" alone — it's tied to a real, owned service and a real enterprise problem
  (process resilience, bus-factor, bias, supervision cost).
- **Two faces to manage:** (a) enterprise **institutional-documentation** tool (its roots,
  ties to the main service) and (b) AI **vibe-document** platform (the investor pitch). The
  enterprise-documentation angle is the more defensible public story; the vibe angle is the
  fundable/innovation angle. Decide how loudly to tell each (open question below).

## Strategic significance

1. **The portfolio's flagship AI-ENGINEERING proof.** An agentic, RAG-grounded,
   multi-component AI product directly substantiates the **"AI Engineering & Applied AI"**
   service line. For buyers asking "can ManiarTech actually build serious AI?" — this is the
   evidence, in product form. (Capability-ceiling proof, à la Labs-prove-the-ceiling.)
2. **On-trend and fundable.** "Vibe documenting" rides the vibe-coding wave with a clear,
   ownable wedge (development-by-conversation + knowledge grounding + real collab). Timely.
3. **Reinforces ManiarTech as a builder of AI ventures**, not just a dev shop — a strong
   identity signal *if* framed without overpromising.
4. **Ecosystem consistency:** dogfoods Booster; mirrors the same Django-ninja/service-layer
   discipline as the other products → evidence of a repeatable engineering system.

---

## Honesty calibration (Governing Rule #1) — extra care: this is investor-facing

Investor-pitch claims (TAM, monetisation tiers, projected adoption) are **NOT** website
claims. For the public site:

- ✅ **TRUE / public-safe:** "An AI-native document platform we're building — 'vibe
  documenting': describe the document, the AI develops it, grounded in your own knowledge."
  "Agentic AI + retrieval-grounded generation." Use as **proof we engineer real AI**.
- ❌ **NEVER public (as-is):** that it's available/live/in beta; **"100+ beta users"** —
  that's a *success-metric TARGET* in the features doc, **not a real number**; the
  monetisation tiers/prices (the spec itself flags these as illustrative, not committed);
  any specific user/revenue figure; "innovative architecture pioneered at ManiarTech" as an
  unqualified superlative — describe the *specifics* (agentic + RAG + model routing) instead.
- ⚠️ **Residues to fix (RECONCILIATION):**
  - `AGENTS.md` mandates **"Military Grade Robustness"** — the same banned hype term flagged
    for conductor. Internal dev guideline only; must never reach site copy.
  - `dc-editor/README.md` is the **v0.app boilerplate**, exposing a personal Vercel URL +
    email handle. Replace before any publicity; the v0/Vercel origin needn't be highlighted.
- **Investor vs public split:** keep the fundraising narrative in private investor
  materials; the website should treat Documentor as an early-stage AI product + AI-capability
  proof, nothing presented as shippable today.

---

## Site placement (needs Aamir's call — see questions)

Because it's pre-launch AND fundraising, placement is a judgment call (same shape as Tallery
Gallery / Taj Mahal Spaces):
- **Option A (recommended): use it primarily as AI-CAPABILITY PROOF**, not a product page.
  Feature the *capability* under the AI-Engineering **Service** and About ("we're building
  agentic, knowledge-grounded AI products") with an honest "early-stage" label — strong
  credibility, zero overpromise.
- **Option B: a modest "in development / AI venture" Product entry** with the vibe-documenting
  vision, honest stage label, no availability/pricing claims, no signup.
- **Option C: hold it off the public site** while investor conversations are active, and use
  only the anonymized AI-capability story. (Choose if fundraising should stay private.)
- **Not recommended:** any "try it / sign up / live product" treatment — false today.
- **Classification decision:** **Product (AI venture), not Labs** — remove from the
  "unclassified / Labs?" bucket.

---

## Open questions for Aamir

- [ ] **Show Documentor publicly at all right now, or keep it for investor conversations?**
      (Recommend: use it as AI-capability proof on the AI-Engineering service + About; full
      product page only if/when you want a public signal. Your call given fundraising.)
- [ ] **If shown — Product page or capability proof only?** (Recommend capability-proof-first.)
- [ ] **Confirm honest stage wording** — "early-stage / in development," no
      availability/beta/pricing claims, and drop the "100+ beta users" target from anything
      public. Agreed?
- [ ] **One-line positioning** — "vibe document development platform," "AI-native document
      platform," or "AI document co-author"? Who's the primary target (solo / agencies /
      enterprise knowledge teams)?
- [ ] **How public is the fundraise?** Should the site mention you're building/raising for an
      AI venture, or stay silent publicly?
- [ ] **OK to feature the AI architecture** (agentic + RAG-grounded + model routing) as
      proof of AI-engineering depth — described specifically, without "pioneered/innovative"
      superlatives?
- [ ] **Fix-before-publicity:** replace the v0 boilerplate `dc-editor/README.md` (personal
      Vercel/email exposure); drop "Military Grade" wording from public-facing material.
- [ ] **License / IP:** commercial/proprietary venture, correct? (Confirm so it's positioned
      right vs the open Labs items.)
