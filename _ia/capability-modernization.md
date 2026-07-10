# Modernization & Migration — Draft v2 (client-first, Presentation Doctrine, post-skeptic-review, 2026-06)

> ★ A **cross-cutting capability** page (not a single service): bring an existing system —
> enterprise platform OR application — onto a modern, supported stack, including migration to Go
> *when the workload genuinely benefits*. Per the Doctrine: **lead with THEIR fear (the big-bang
> rewrite) and the de-risk method, prove we deliver (our OWN rebuilds, run in public, until a client
> case study is live), make it SAFE (incremental · reversible · no lock-in · honest-broker polyglot),
> credibility via the 27-year / JP Morgan track record, depth as the CLOSER, low-risk CTA.** Honest
> Go framing throughout: we migrate to Go when it helps and tell you when it doesn't — NO "Python is
> slow" bashing (we build in Python too), NO unverified speed multiples. Every claim TRUE + SOURCED
> (Governing Rule #1). Each `[note]` = placeholder / verify / rationale.
>
> **v2 changes (skeptic review):** §4 retitled honestly (dogfood ≠ client proof; the missing client
> case study is now an explicit, visible gap, not buried under a "PROOF" header) · live links pulled
> into the copy · §5 team/bus-factor de-risk made visible (placeholder, not inference) · §5 ISO claim
> requires cert number + body inline, dropped the unsourced "most teams our size carry neither" · §6
> Indigo pre-1.0 honesty moved into customer-facing copy, "used by developers worldwide" replaced with
> the verifiable/clickable form · §8 CTA overclaim softened · §2 "who we serve" added · footer: legal
> entity + jurisdiction.

---

## 1 · HERO  *(their fear named + the safe alternative)*

# Modernize the system you can't afford to break.

Aging systems don't get replaced because the replacement is terrifying: the all-at-once rewrite
that's late, over budget, and breaks the business on go-live. We modernize the other way —
**incrementally, with the old and new systems running side by side, and every step reversible** —
so the system keeps working the whole time.

**[ Get a free modernization estimate → ]**   ·   [ See how the migration works ]

> No big-bang rewrite. No lock-in — we move you onto mainstream, hireable technology. An honest
> assessment of what's worth migrating, and what isn't, before you commit.

`[Leads with THEIR fear (the big-bang rewrite that breaks the business) — the single emotion that
keeps modernization projects frozen — then immediately answers it with the de-risk method +
no-lock-in + honest scoping. Brilliance is held for §6.]`

---

## 2 · IS THIS YOU?  *(let them see themselves — problem-first)*

### You probably found us because one of these is true:

- **You have an aging system** that still runs the business but is slow, fragile, or expensive to
  keep alive — and every change feels risky.
- **The people who built it have moved on**, the framework is years out of support, and hiring for
  it is getting hard.
- **You were quoted a full rewrite** — and the cost, timeline, and "we have to take it offline"
  risk made you put it off.
- **You have a smaller app that's quietly aging** — not enterprise-scale, but important to you, and
  you'd rather modernize it carefully than gamble on a rebuild.
- **A specific part is buckling under load** — concurrency, throughput, or compute cost — and you
  suspect it needs a different engine under it.
- **You want to modernize without betting the company** on a single big-bang cutover.

This is exactly the work this capability exists for.   **[ Tell us what you're running → ]**

> **Who we work with:** From enterprise platforms to a single important application — we take on
> smaller systems too, scoped to fit. If you're not sure you're "big enough," ask; we'll tell you
> honestly whether we're a fit.

`[The "do they get MY problem?" fix, in the customer's words. v2: added a smaller-scale bullet + an
explicit "who we work with" line so the SME persona (feared "too-small / too-expensive") sees
themselves and isn't priced out by inference. The "specific part buckling under load" bullet quietly
opens the Go conversation WITHOUT a blanket "rewrite it in Go" pitch — honest framing.]`

---

## 3 · HOW WE DE-RISK IT  *(the method = the real differentiator, LED here)*

### We modernize incrementally — never all at once.

The fear is the rewrite that breaks everything on cutover. Our method is the opposite of that:

- **Audit & plan first.** We inventory the existing system — its dependencies, its risks, what it
  actually does — and decide *with you* what's worth migrating and what should stay. Sometimes the
  honest answer is "leave that part alone."
- **One module at a time.** We migrate piece by piece, not all at once, so risk stays small and
  visible at every step.
- **Old and new run side by side.** The legacy system keeps serving while the modern one comes up
  behind it — gated by feature flags, so we can switch traffic gradually.
- **Every step is reversible.** If a step misbehaves, we roll it back. No point of no return, no
  "pray it works on Saturday night."
- **Tested as we go.** Each migrated piece ships with tests and checks, so "modernized" also means
  "verified," not "we'll find out in production."

This is a real strangler-fig migration discipline — replace the old system gradually from the
inside until the modern one carries the load. It's the method we run on **our own** products, in
public, with the artifacts to prove it (see below).

**[ See a migration plan for your system → ]**

`[Method LEADS because it directly kills the hero fear — and because, per the Doctrine, the de-risk
story is the trust currency for this page. "Strangler-fig," "feature flags," "reversible migrations"
are real and sourced (service-legacy-modernization.md, Tallery philosophy.md). "Sometimes leave it
alone" = the straight-talk de-risker.]`

---

## 4 · WE RUN THIS METHOD ON OUR OWN SYSTEMS, IN PUBLIC  *(verifiable demonstration — honest about what it is)*

### We don't just describe this method — we run it on our own products, where you can check the work.

We'll be straight about what this section is: **these are our own systems, not client engagements.**
It's a working demonstration you can verify yourself — not a substitute for a client reference, which
we're adding below as soon as one is cleared to share.

- **A digital-asset-management system of our own** — a live, documented legacy-to-modern migration:
  an older Django / MySQL application moved onto a current Django / PostgreSQL stack, module by module.
  *Notably, we modernized it to newer Python — not to Go — because that was the right call for that
  system.*
  **See it live: [PLACEHOLDER — needs Aamir: public URL]** ·
  **Migration write-up: [PLACEHOLDER — needs Aamir: link]**
  `[★ CRITICAL — TALLERY HARD GATE: do NOT surface the "Tallery" brand name on this client page, and
  the migration write-up is HARD-GATED. ANY Tallery mention — here or in the write-up — MUST start
  from the CURRENT / V2 story (the modern stack we run today) and NEVER narrate, reference, hint at,
  or imply the V1 history or any V1 failure (Tallery V1 is PRIVATE). If the write-up cannot be told
  cleanly from the V2/current story alone, DROP the public write-up entirely rather than risk
  exposing V1. Stack specifics (td_backend Django 3/4 MySQL → tg_server Django 6 PostgreSQL 17) and
  the public URL/write-up are all [verify — Aamir] before publish. This gate supersedes any softer
  earlier note.]`
- **Processious** — our own internal operations platform, which we are re-architecting onto a
  modular **Go** core, because *that* workload genuinely benefited from it. **In the interest of
  straight talk: that re-architecture is in active development / early-stage — we cite it as evidence
  of how we approach a Go re-architecture, not as a finished, shipped result.**
  `[verify current status labels before publishing: V1 "in production," V2 "in development" /
  "early-stage." Keep the honest label visible in the copy, not just here.]`

One to modern Python, one to Go — same method, two destinations, each chosen by what the workload
actually needed. That's the point worth keeping: **the method is the same; the destination depends on
your system, not on a house preference.**

> ### And a client system we modernized that's still running 15 years later.
> A demonstration on our own systems answers "can they do it?" Here's a client answer to "have they
> done it, and did it last?":
>
> **Reliable Analytical Laboratories** — we replaced a sprawling 600-form legacy system with a single,
> workflow-driven screen where staff see exactly where every sample stands. By the lab's account, it's
> still running ~15 years later.

`[★ v2 FIX of the #1 issue: the old "PROOF" header promised client proof the section didn't contain
(dogfood only). Now there IS real client proof: the RTL snippet (wired VERBATIM from canonical
case-study-proof-snippets.md) is a genuine 15-year-living modernization/longevity story. Company
NAMED, individual never named; longevity hedged "by the lab's account" (secondhand) — public-safe.
The client case is NO LONGER absent. A second client engagement with an explicit before→after
outcome would still strengthen it (gated on Aamir, never fabricated). Processious V2's early-stage
status stays in the visible copy. The Python-vs-Go split is the honest-broker framing. NEVER
fabricate an external engagement.]`

---

## 5 · WHY IT'S SAFE  *(de-risk the commitment itself)*

### Modernizing with us doesn't trade one risk for another.

- **No lock-in — we move you onto mainstream technology.** The whole point of modernizing is to get
  *off* something only a few people can maintain. We won't put you back there. You land on hireable,
  well-supported tech — Go, Python, React, PostgreSQL — that your own team (or any team) can run.
- **Experienced engineers — and more than one of them.** Migrations are where the buried risks live.
  Experienced people do this work — we don't learn on your system. And because a migration can't
  depend on a single person being available, the plan and the work are shared across the team, with a
  clear handover commitment so the project doesn't stall if any one person is out.
  `[PLACEHOLDER — needs Aamir: name 2–3 real senior team members (name + role), OR an explicit
  written continuity/handover commitment (who covers the work if the founder is unavailable, how the
  migration plan is documented and transferable). The bus-factor fear is the buyer's top concern for
  migrations specifically; "senior engineers only" asserts a team but the page currently shows none.
  Do NOT invent team members — if the team is genuinely small, state the continuity commitment
  plainly instead.]`
- **Right-sized, not over-engineered.** We modernize to solve your actual problem, at the right
  scale. We won't turn a working system into a science experiment.
- **Honest about Go — and about everything.** We migrate to Go when your workload genuinely
  benefits — high concurrency, performance-critical paths, lower compute cost, single-binary
  deployment. When it doesn't, we'll tell you, and we'll modernize on the stack that fits. We build
  in Python too; we're not selling you a language, we're solving your problem.
- **Predictable by process.** We work to documented quality and security processes — we're **ISO
  9001:2015 (quality) and ISO/IEC 27001:2022 (security) certified**, by **URS** under **UKAS**
  accreditation (cert. 123961/B/0001 & 123961/A/0001; verify at info@urs-certification.com) — which
  on a migration means change is controlled, reviewed, and auditable rather than ad hoc.
  `[ISO wired 2026-06; no printed expiry until the post-Aug-2026 recert cert (certification continuous
  from June per URS).]`

`[v2: bus-factor line rewritten to commit to continuity explicitly (placeholder for real names/commit)
rather than leaving a team to inference. ISO line: dropped the unsourced comparative, requires
cert number + body + link inline, and translated into the plain migration benefit. Other lines kill
specific fears: lock-in (the #1 reason to modernize, so it leads) · juniors-on-a-migration ·
over-engineering · the Go-zealot worry. Go honesty calibrated per the Golang dossier: value framed on
SPECIFIC needs, no "Python slow," no speed multiples.]`

---

## 6 · AND THE DEPTH BEHIND IT  *(the CLOSER — Go authorship + Indigo, after trust)*

### When a migration needs Go, you're working with a team that has built deeply in the Go ecosystem.

Most shops that offer a "move to Go" *use* Go. We've spent years **building** for it — and all of it
is public, so you can read and run it yourself:

- **Open-source Go libraries, public on our GitHub** — including our Go signals/event library, plus
  time, storage, and utility libraries. They're open for anyone to read, run, and check.
  **[PLACEHOLDER — needs Aamir: link the named repos directly (e.g. signals, gotime, vault-storage,
  xlib) so "check it yourself" is one click.]**
  `[v2: replaced "used by developers worldwide" — an unbacked superlative standing in for the star
  count the Doctrine says to suppress — with the verifiable, clickable form. Say the verifiable thing
  (it's public, here's the repo), not the puffed thing.]`
- **Go developer tooling we authored in-house** — workflow, orchestration, and CLI tooling we built
  to make our own Go work better. `[verify which are public vs internal before naming individually
  and linking; describe as a category until confirmed — gowork, gocurl, conductor/orchestrator,
  Booster.]`
- **Production Go work** — including our own Processious Go server and workflow engine (early-stage;
  see §4). `[verify status labels before publishing; keep consistent with §4.]`
- **⭐ Indigo — a research language we're actively developing (pre-1.0)** that explores a Go *superset*
  (loosely, "TypeScript for Go") which compiles to clean, idiomatic Go on the principle that *no
  output is better than wrong output*. **To be clear: Indigo is in active development and not a
  shipping product — we mention it as evidence of how deeply we work in Go, not as something we put
  into your migration.** By design it produces plain Go that runs on the standard toolchain, **with
  no runtime and no lock-in** — but you wouldn't depend on it for your project regardless; your system
  is migrated onto mainstream Go.
  `[v2: pre-1.0 / in-development honesty MOVED into the customer-facing copy (was buried in the note).
  Framed as proof of depth, NOT a shipping capability, and explicitly NOT used in client migrations —
  this defuses the "obscure shop claims it's building a programming language" disbelief pattern the
  Doctrine warns about. Do NOT position Indigo as a migration accelerator unless/until Aamir confirms
  it's appropriate (open Q in indigo.md).]`

We don't ask you to adopt any of this — your system is migrated onto mainstream Go that any team can
maintain. It's simply *why* we can be trusted with the hard parts of a Go migration: we've worked in
the ecosystem deeply enough to build inside it, in the open.

**[ Explore the Go ecosystem we've built → ]**

`[Depth lands HERE as the closer, reframed the three ways the Doctrine demands: (1) BENEFIT ("a team
that has built deeply in the ecosystem you're moving to"); (2) NO LOCK-IN (mainstream Go + Indigo's
no-runtime + "not in your migration"); (3) VERIFIABLE ("it's public, read and run it" with links in
the copy). Indigo kept rigorously status-honest as pre-1.0 IN THE VISIBLE COPY. NO "expert-quality
Go" / "agentic" jargon as a client hook.]`

---

## 7 · THE TEAM BEHIND THE MIGRATION  *(credibility — 27 years / JP Morgan)*

### Migrations are where experience pays off most.

ManiarTech is a senior, founder-led team, led by **Aamir Maniar (Managing Director & Engineering
Head)** — **[on LinkedIn](https://www.linkedin.com/in/aamironline)** — who has built and modernized
serious software for 27 years, including financial-technology systems at **JP Morgan** — exactly the
kind of foundational, can't-break-it work a modernization demands. **Oomera Maniar** runs operations,
and the migration work is delivered by a senior core plus a vetted network of specialist engineers.
We pair that depth of experience with current, hands-on delivery, and because we work by documented
process, the migration plan lives in our systems — documented and transferable — not in one person's
head.
`[Named-leadership line per canonical team wording: Aamir (MD & Engineering Head) + Oomera (Operations
— solo role, no team implied) + senior core + vetted network. Hitesh Sharma RESERVED — do NOT add.
Never imply a big team; never reference the old team photo.]`

**[ Meet the team & our story → ]**

`[JP Morgan leads the credibility, framed for the modernization buyer ("can't-break-it work").
Countrywide etc. omitted here (lives on About) to keep this page tight; no toxic flex. v2: the
skeptic flagged "old pedigree without recent delivery amplifies the 'what have you done lately?'
question." Softened with "current, hands-on delivery" — but the real answer to "lately?" is the §4
client case study (placeholder) + the live dogfood links; this section leans on process for
bus-factor, and §5 now carries the explicit continuity commitment.]`
`[PLACEHOLDER — needs Aamir: if there are named senior team members, surfacing them here (or on the
linked team page) is the strongest answer to both "what have you done lately" and bus-factor. See §5.]`

---

## 8 · CLOSING CTA

### Tell us what you're running.

Start with a free, no-obligation estimate. Describe the system you want to modernize and our AI asks
the questions a senior engineer would — about your stack, your constraints, and where the risk of
moving it actually lives — so you get a clear sense of how we'd approach it, before you've committed
to anything. Prefer a person? Just reach out.

**[ Get a free modernization estimate → ]**   ·   [ Talk to a human ]

`[v2: softened the CTA. Old copy ("within minutes you'll see we understand both the system and the
risk of moving it") promised the estimator would demonstrably PROVE understanding sight-unseen —
adjacent to the "clears review first pass" overclaim family already killed elsewhere. New copy
promises only what the tool can actually deliver: it asks senior-engineer-grade questions so the
buyer gets a sense of our approach. No guarantee of demonstrated understanding.]`

---

## Cross-links
- **Specialization:** Transition to the Go ecosystem (the focused "migrate to Go" page) → [[service-golang-transition]]
- **Related service:** Legacy System Modernization → [[service-legacy-modernization]]
- **Demonstration (our own systems):** Processious, and a digital-asset-management system of our own → [[processious]]
  `[DAM cross-link to the Tallery product page REMOVED from this client page — its default label/URL
  would expose the "Tallery" brand (V1 private). Present DAM as a capability we build & run; if a DAM
  link is wanted, point to the Enterprise DAM service with a neutral label, not the product slug.
  Hard gate per §4.]`
- **Depth:** Indigo + the Go Labs cluster → [[indigo]]
- **Method:** the Keystone Method (Survey → Document → Design → Set the Keystone → Bear Load) → [[service-business-process-automation]]

---

## Footer / contracting basics  *(procurement de-risk)*
> **[PLACEHOLDER — needs Aamir: legal entity name + registration number + jurisdiction (country/state
> of incorporation), and primary business location.]** The customer-lens doc flags the absence of a
> legal entity / jurisdiction as an enterprise-procurement blocker that reads as "offshore-hiding" —
> acute on a page asking a buyer to hand over a production system. State it plainly (footer is fine).
> Do NOT invent these details.

---

## Notes on doctrine compliance / what to verify
- **Order (unchanged, correct for a client audience):** fear (§1) → de-risk method (§3) → verifiable
  own-systems demonstration (§4) → safe/no-lock-in (§5) → depth closer (§6) → JP Morgan credibility
  (§7) → low-risk CTA (§8). Brilliance held to the closer.
- **Honest Go framing:** "migrate to Go when it genuinely benefits — and tell you when it doesn't,"
  Python modernization shown as a *peer* outcome (Tallery), zero "Python is slow," zero speed
  multiples. ✅ per Golang dossier.
- **v2 fixes applied (skeptic review):**
  - §4 retitled from "PROOF" → "WE RUN THIS METHOD ON OUR OWN SYSTEMS, IN PUBLIC"; dogfood framed as
    verifiable demonstration; the RTL client case (15-yr-living modernization) NOW WIRED as real client
    proof (canonical snippet, verbatim) — client case no longer absent; Tallery brand HARD-GATED (V2
    story only, never V1; or drop the write-up); Processious V2 early-stage status in visible copy;
    live links pulled into copy (placeholders for URLs). [HIGH]
  - §5 bus-factor: explicit continuity/handover commitment in copy + placeholder for real team
    names/commitment, instead of leaving a team to inference. [HIGH]
  - §6 Indigo: pre-1.0 / in-development honesty moved into visible copy; framed as depth-proof, not
    shipping, explicitly not used in client migrations. "Used by developers worldwide" replaced with
    "public on our GitHub — read and run it" + repo-link placeholder. [MED]
  - §5 ISO: dropped unsourced "most teams our size carry neither"; requires cert number + body (URS/
    UKAS) + link inline; translated to plain migration benefit. [MED]
  - Verifiability threaded into copy: Tallery live/write-up links, named Go repos, Processious — all as
    in-copy links (placeholders where URLs unconfirmed), not trapped in [verify] notes. [MED]
  - §8 CTA overclaim softened (no "you'll see we understand … sight-unseen" guarantee). [LOW]
  - §2 "who we serve" line + smaller-scale bullet added for the SME persona. [LOW]
  - Footer placeholder for legal entity + jurisdiction. [LOW]
- **Placeholders left (need Aamir / verify before publish):** (1) ★ a SECOND external client
  modernization case with an explicit before→after outcome (§4) — the RTL longevity case is now wired
  as real client proof; (2) ★ Tallery: brand name NOT surfaced on this client page; migration write-up
  HARD-GATED to the V2/current story only — NEVER narrate V1 (private), or drop the write-up; public
  URL + stack-specificity OK = [verify — Aamir] (§4); (3)
  Processious + Go-platform status labels (§4, §6); (4) real senior team names OR continuity commitment
  (§5, §7); (5) ISO cert number + certifying body + certificate link (§5); (6) which Go tools/Indigo
  are public vs namable + repo links (§6); (7) Indigo positioning as pre-1.0 (§6); (8) legal entity +
  jurisdiction (footer).
