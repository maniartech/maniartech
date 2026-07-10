---
title: "Documentor.AI — describe the document you want; an AI drafts it from your own knowledge"
description: "An AI document platform — describe the document you want; it drafts from your own knowledge so it cites your facts."
order: 30
productStatus: "Early-stage"
image: ""
---

# Documentor.AI — Draft v2 (product detail · client audience, through the Presentation Doctrine, 2026-06)

> ★ This is a **CLIENT** page, not a recruiting/depth page — so it leads with **their safety and a
> problem they recognize**, anchors believability in a **verifiable human track record (JP Morgan +
> 27 years)** BEFORE the AI depth, proves the engineering is real and *verifiable*, and lands the deep
> AI architecture as the CLOSER. Documentor is an **early-stage / in-development AI venture** — its job
> on the public site is to be **proof we can build serious, current-best-practice AI**, NOT a product
> you can sign up for. So: **honest "in development" status throughout; separate "working today" from
> "being built"; NO availability/beta-open claims; NO pricing/monetisation; NO "100+ beta users";
> fundraising narrative stays OUT.** Every claim TRUE + SOURCED + CALIBRATED (Governing Rule #1). Each
> `[note]` = placeholder/verify/rationale. Voice/format match home.md + about.md.
>
> ⚠️ **v2 RESPONSE TO SKEPTIC REVIEW:** the v1 problem was *"an unknown company describes serious AI
> using a product you can't see, run, or verify — and the JP Morgan credibility bridge was missing."*
> v2 fixes: (1) **the page now stands on the team's verifiable track record, not on unprovable product
> claims** — because nothing in Documentor is publicly demoable yet, we say so plainly and lean on what
> *can* be checked (founder's JP Morgan / 27-yr record, shipped OSS, ISO certs); (2) a **credibility
> step (§5) is inserted before the AI-depth closer**; (3) every present-tense "built" feature is
> **re-labeled "working today" vs "being built"** so the honest hero isn't undercut; (4) absolutes
> ("designed out," "instead of inventing") are **calibrated to "reduces / grounds & cites"**; (5) ISO
> and security claims are made **verifiable or framed as architecture intent**; (6) **one primary CTA**
> (the estimator) with the rest demoted to text links.

---

## 1 · HERO  *(their problem + an honest status label up front)*

# Describe the document. The AI develops it — grounded in your own knowledge.

Documentor is an AI document platform we're building — our take on what conversational AI did for
writing code, applied to whole documents. You have a conversation about the document you want, and an
AI agent drafts, develops, and refines it turn by turn, using *your* uploaded sources as the source of
truth.

**Status: in development — not yet open to sign up.** This page shows what we're building, what already
works internally, and the engineering behind it. We'd rather show you the real track record of the
people building it than ask you to take an unreleased product on faith.

`[Leads with the reader's problem in plain language and labels the status HONESTLY in the first screen.
v2: the hero now sets the honest frame the skeptic asked for — "we can't show you the product yet, so
here's what you CAN verify." No "available / live / beta-open." "Vibe" label dropped from the headline.]`

---

## 2 · IS THIS THE PROBLEM YOU KNOW?  *(let them see themselves)*

### You probably recognize at least one of these:

- **The blank page is the slow part** — you know roughly what the document should say, but turning
  that into a structured, finished draft eats hours.
- **AI writing tools make things up** — they sound confident and cite facts you never gave them.
- **Your real knowledge lives in scattered files** — PDFs, notes, prior docs — and none of it makes
  it into the draft without manual copy-paste.
- **Long documents drift** — tone wanders, sections contradict, and keeping it consistent is manual.

If you run a team where institutional knowledge lives in people's heads — agencies, professional-
services firms, knowledge-heavy operations — Documentor is being built for exactly your situation.

`[The "do they get MY problem?" fix + the "who is this for" fit signal the review flagged as missing.
Speaks the reader's situation before we talk about us.]`

---

## 3 · WHAT IT DOES  *(the capability — honestly split into "working today" vs "being built")*

### Three things, usually split across separate tools — being brought into one place.

We're honest about maturity, so each capability below is marked **[working today]** (runs in our
internal builds) or **[being built]** (designed and in progress, not yet proven end-to-end). Because
Documentor isn't open yet, none of this is something you can click and verify today — which is exactly
why the rest of this page leans on the team's *checkable* track record rather than on these words alone.

- **AI that authors, then refines.** **[working today]** Describe the document; an AI agent drafts a
  structured first draft, then edits it section by section through chat — insert, rewrite, restructure,
  restyle, summarize — streaming changes and asking you when it isn't sure, so you stay in the loop.
- **Grounded in your own knowledge.** **[working today]** Upload your sources (PDFs, docs, notes);
  they're indexed into a knowledge base, and the AI builds from *your* facts and cites them — so it's
  far less likely to invent things than a generic chat tool.
- **Built for real teams.** **[being built]** Projects and folders, versioning, roles and permissions,
  document locking, audit trails, and shareable links — the collaboration backbone, designed so a team
  can eventually trust it as a system of record. This is in progress, not finished.

Also designed in, at varying stages: tone and style transformations, reusable project variables
(e.g. `@client_name`), document export (PDF, Word, Markdown), and persistent chat history.

`[v2 fixes the #1 contradiction: an honest "in development" hero followed by a present-tense feature
brochure. Now each feature is status-labeled, "instead of inventing them" is calibrated to "far less
likely to invent," and "the backbone that makes it a tool a team can trust" is downgraded to "designed
so a team can eventually trust it... in progress, not finished." NO pricing, NO signup, NO user counts.
⚠️ VERIFY which features are truly "working today" before publish — see open items.]`

---

## 4 · WHY WE'RE BUILDING IT THIS WAY  *(de-risk — the same safety story, applied to a product)*

### Built on mainstream technology, with grounding and security designed in from the start.

- **It builds from your facts, not its imagination.** The grounding layer means the AI answers from
  the knowledge *you* provide and cites it. This is the thing we engineered against first — grounding
  and citation *reduce* the biggest fear with AI writing (confident invention). They don't make it
  impossible, and we don't claim they do; they make it far less likely and easy to check.
- **No exotic stack.** It runs on mainstream, hireable technology — Python (Django), Next.js,
  PostgreSQL — the same no-lock-in discipline we apply to client work. `[VERIFY stack names before
  publishing — per dossier: Django + django-ninja backend, Next.js editor, PostgreSQL/pgvector,
  LangGraph agents. Confirm current + OK to state publicly.]`
- **Security boundaries by design.** By design, the writing surface never talks to the AI engine
  directly — AI keys and secrets stay server-side and aren't exposed to the browser. This is how the
  system is architected, not a guarantee we're asking you to take on faith on an unreleased product.
  `[sourced: dossier "the editor talks to the AI engine server-side only (secrets never reach the
  browser)." Framed as architecture INTENT per skeptic review — link an arch doc/repo here once public.]`
- **The same engineering discipline as the rest of our work.** Documented process, service-layer
  architecture, role-based access, and automated tests — the same systems behind our **ISO 9001:2015 &
  ISO/IEC 27001:2022 certified delivery** (URS, UKAS-accredited; cert. 123961/B/0001 & 123961/A/0001,
  verify at info@urs-certification.com). `[ISO wired 2026-06; 27001 confirmed = 2022. No printed expiry
  until the post-Aug-2026 recert cert.]`

`[Applies the home/about de-risk lens to a product page. v2: "designed out from the start" is gone —
hallucination is now honestly framed as REDUCED, not solved; the ISO claim carries a mandatory verify-
link placeholder; the security claim is framed as architecture intent a skeptic can't be asked to
verify on unreleased software.]`

---

## 5 · WHO'S BUILDING IT  *(credibility — lead JP Morgan; the verifiable trust bridge, BEFORE the depth)*

### The honest reason to believe we can build this: look at who's building it.

You can't run Documentor yet — so don't judge it on the product. Judge it on the track record of the
people building it, which you *can* check.

- **27 years building the layers under software.** ManiarTech's founder, **[Aamir Maniar](https://www.linkedin.com/in/aamironline)**, has spent a
  career building developer-grade infrastructure — including time at **JP Morgan**, where he built a
  FIX-protocol analyzer with its own script engine and compiler, and as a technology architect at
  Countrywide Financial (now part of Bank of America). `[LinkedIn wired 2026-06. Verified facts from
  founder-bio dossier; keep MORE understated than his LinkedIn.]`
- **We publish the engineering we're proud of.** The same team ships open-source libraries and
  authored standards in the open — that's the most direct, clickable evidence that we build serious
  systems, not just wire up an API. `[PLACEHOLDER — needs Aamir: pick 1–2 of the strongest PUBLISHED,
  verifiable repos to link here (e.g. signals 325★, an Internet Object / UExL playground) as concrete
  "we make technology" proof. Only link what's actually public and current.]`
- **Built by a senior team, in audited systems.** Documentor is built by senior engineers — the same
  people who deliver our client work — inside the ISO-certified process above. It's an in-development
  venture, not one person's side project: the work lives in documented systems, so it doesn't depend on
  any single individual. `[Addresses the bus-factor / "abandoned project #18" fear per skeptic review.
  Honest hedge: small senior team + on-call associate network; NEVER claim a large headcount. PLACEHOLDER
  — needs Aamir: confirm exact wording for team size/continuity he's comfortable stating publicly.]`

`[NEW SECTION inserted per the Doctrine and skeptic review: the page jumped from de-risk straight to AI
depth with NO credibility step. This is the bridge — "can these unknown people build real AI?" answered
with a VERIFIABLE human track record (JP Morgan, shipped OSS) BEFORE the LangGraph/pgvector depth, so
the depth lands as credential, not flex. Fundraising stays OUT.]`

---

## 6 · WHERE IT CAME FROM  *(the grounded origin — credibility, not hype)*

### It started as a way to capture how an organization actually works.

Documentor grew out of a real problem we kept seeing in business-process work: when everything an
organization knows lives in people's heads, the organization is fragile — slow to onboard, hard to
audit, dependent on a few individuals. The fix is to *document* it — processes, formats, decisions,
records — so the knowledge lives in systems, not memory.

Documentor began as the tool for exactly that, and grew toward the AI document platform we're building
today. That origin is why it's built around *your* knowledge, with versioning, roles, and audit trails
designed in — it was always meant to be trustworthy institutional memory, not just fast prose. That's
also why we're patient with it: we'd rather ship it when it's genuinely trustworthy than rush it open.

`[Uses the dossier's "true identity" reframe — the more defensible, enterprise-credible story that earns
the collaboration/RBAC/audit features honestly. v2: the patient-maker / dogfood-first framing is made
explicit so "in development" reads as deliberate maturation, not a stalled side project. Fundraising
stays OUT of public copy.]`

---

## 7 · THE AI ENGINEERING BEHIND IT  *(the DEPTH — the closer, benefit-first then the tech)*

### Why this is here: it's the kind of AI engineering we can build into *your* product.

If you're evaluating whether we can actually build modern AI systems — not wrap an API and call it a
product — here's what's under the hood, each point led by what it gets you and named by its
verifiable specifics:

- **The AI plans before it writes, so complex documents hold together** — built as cooperating agents
  that plan and act (using **LangGraph**), not a single prompt-and-pray call.
- **Answers stay tied to your sources and are cited, so they're far easier to trust and check** —
  retrieval grounding over your indexed knowledge using vector search (**pgvector**), with coverage
  and citation checks against acceptance criteria.
- **It uses the right model for each step, balancing quality and cost** — per-task model routing rather
  than sending everything to one expensive model. `[VERIFY this is implemented and working, not just
  designed, before stating; otherwise mark "[being built]" per the claim audit.]`
- **The AI can evolve without breaking everything around it** — a deliberate separation between the AI
  engine, the document system, the editor, and the infrastructure.

This is the deep end of what we do. If your own product or process needs real AI engineering — agents
that plan, answers grounded in your data, built to be trusted — this is the kind of work we'd bring to
it. Documentor is one place we're proving that engineering on ourselves first.

`[The depth lands HERE as the CLOSER, AFTER the reader knows the problem, the capability, the safety,
the people (§5), and the origin. v2: every bullet now LEADS WITH THE PLAIN BENEFIT and names the tech
in parens as the verifiable specific (the skeptic flagged §6 for front-loading jargon). Model-routing
carries a verify note so we don't assert un-shipped specs as done. Framed as proof OF capability that
benefits THEM, NOT a Documentor signup. EXPLICITLY NO banned superlatives ("pioneered / innovative
architecture / military-grade").]`

---

## 8 · CTA  *(ONE primary action, low-risk, honest — no product signup)*

### Building something that needs real AI?

Documentor itself isn't open to sign up yet — but the engineering behind it is exactly the kind of work
we do for clients. The lowest-risk way to start is a free, no-commitment project estimate.

**[ Get a free project estimate → ]**

Prefer to just talk it through first? [Talk to a human →]

`[v2 CONSOLIDATES the three competing CTAs ("Talk to us about applied AI" / "Get a free estimate" /
"Talk to a human") into ONE primary action — the estimator, our proven low-commitment entry — with
"talk to a human" demoted to a secondary text link, per the customer-lens "need ONE clear primary"
finding. Deliberately NOT "try Documentor" (false availability claim).]`

---

## Open items / [PLACEHOLDER — needs Aamir / verify]

- `[LinkedIn wired 2026-06]` **Founder LinkedIn URL** = https://www.linkedin.com/in/aamironline —
  wired onto "Aamir Maniar" in §5 (the Doctrine's #1 credibility lead). Supplied 2026-06.
- `[PLACEHOLDER — needs Aamir]` **1–2 strongest PUBLISHED OSS repos / playground links** for §5 ("we
  publish the engineering we're proud of"). Only public + current ones.
- `[PLACEHOLDER — needs Aamir]` **ISO certificate verify-link** (cert number + URS/UKAS verification
  page) for §4, and **confirm 27001 version (2022 vs 2013)**. Without a one-click verify, the customer-
  lens review says the ISO mention should be CUT, not asserted.
- `[PLACEHOLDER — needs Aamir]` **Product proof, if/when any exists** — the skeptic's #1 ask is one
  clickable artifact: a 20–40s screen capture of the AI drafting/refining a real doc, 2–3 annotated
  screenshots, or one "here's a document it produced from these 3 uploaded sources" sample. If nothing
  is showable yet, this page is deliberately written to stand on the team's verifiable record instead —
  but a single artifact would materially strengthen §3.
- `[PLACEHOLDER — needs Aamir]` **Team-continuity wording** for §5 (size/on-call network) he's
  comfortable stating publicly; never claim a large headcount.
- `[PLACEHOLDER — needs Aamir]` **Public-signal decision:** show Documentor as a product page now, or
  keep it as AI-capability proof under the AI-Engineering service + About? This draft is a modest
  in-development page that doubles as capability proof.
- `[PLACEHOLDER — needs Aamir]` **One-line positioning** — "AI-native document platform" vs "AI document
  co-author" vs other; and primary target (agencies / professional services / enterprise knowledge
  teams). Hero uses a plain-language framing and avoids the "vibe" label.
- `[VERIFY before publish]` **Stack names** in §4 (Django/django-ninja, Next.js, PostgreSQL/pgvector,
  LangGraph) — confirm current and OK to state publicly.
- `[VERIFY before publish]` **Feature maturity** — confirm which §3 capabilities are truly "working
  today" vs "being built"; confirm whether per-task model routing (§7) is implemented or still designed.
  Infographic/vision generation deliberately omitted until confirmed stable.
- `[FIX-BEFORE-PUBLICITY — from dossier]` Replace the v0.app boilerplate in `dc-editor/README.md`
  (exposes a personal Vercel URL + email) before any link-out; never let "Military Grade Robustness"
  (an internal AGENTS.md dev term) reach site copy. Neither appears in this draft.

---

## Doctrine checklist (why this page is shaped this way)
- **Client page → safety-first order:** their problem (§1–2) → what it does, status-honest (§3) → why
  it's safe/de-risked (§4) → **credibility, JP Morgan-led (§5)** → grounded origin (§6) → AI depth as
  the CLOSER (§7) → ONE low-risk CTA (§8). The §5 credibility step is the v2 structural fix.
- **Honesty / Claim Audit:** "in development" labeled in the hero and repeated; each §3 feature marked
  "working today" vs "being built"; hallucination framed as REDUCED not "designed out"; ISO + security
  claims carry verify-links / framed as architecture intent; NO available/live/beta-open; NO pricing;
  NO user counts; NO fundraising; depth described by specifics, no banned superlatives.
- **Verifiable + plain language:** the page anchors believability in the team's CHECKABLE record (JP
  Morgan, shipped OSS, ISO) rather than unprovable product claims; every depth bullet leads with the
  plain benefit, then names the tech as the verifiable specific.
- **Skeptic Test:** answers "can an unknown company build serious AI?" with a human track record one
  click from proof — not with a product nobody can open.
