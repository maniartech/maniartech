# Case Study Template & Toolkit (trust-worthy by design)

> Purpose: produce case studies that **build trust with skeptical buyers** — especially the
> US/EU-evaluating-an-offshore-team gap (see price-estimator POSITIONING.md). The mechanism
> is the same as the estimator's: **competence SHOWN beats competence claimed.** Specifics,
> numbers, and the *how* do the convincing — not adjectives.
>
> Workflow: Aamir fills **Part A (Intake)** per engagement (rough notes are fine) → I write
> **Part B (the page)** from it → Aamir gets client sign-off on quotes/naming.
>
> **★ Handling OLDER-but-strong case studies (Aamir has 4–5; 2026-06):** Use them — strong-but-old
> >> empty (the cold panel's #1 blocker was having NONE). Handle "outdated" honestly: (1) PAIR with
> the recent ones (Processious in-production · Sales Navigator current) — lead the section with
> recent (proves active/current), older ones reinforce track-record; (2) write each around the
> TIMELESS problem→solution→OUTCOME, not the date or tech-of-the-day; (3) usually DON'T headline
> dates (most firms don't) — but NEVER fake recency; real date if shown; (4) anonymize older/
> hard-to-reach clients ("a [industry] company"); (5) if tech is dated, lead with the business
> outcome, de-emphasize the stack (or honestly "today we'd build this on [modern stack]").
> Prioritize the 4–5 by: relevance to clients we want NOW · strongest concrete outcome · name-able
> or cleanly anonymizable.
>
> **★ Handling DEAD / short-lived client projects (Aamir flagged: some clients folded, but the work
> was technically very strong):** KEY DISTINCTION — *engineering success ≠ client business survival.*
> A client folding for market/funding/execution reasons is NOT an engineering failure; the strong
> work is a real success regardless. Handle: (1) **ANONYMIZE** the dead ones — solves BOTH the
> no-permission-from-a-defunct-company problem AND removes the "prospect googles them, finds them
> gone" risk; (2) frame around the **TECHNICAL challenge + what was delivered** ("built X; it did Y;
> ran reliably"), TRUE regardless of the client's later fate — NEVER imply "we made them thrive" if
> they didn't; (3) a system that ran solidly / handled real load / did its job IS a genuine positive
> ENGINEERING outcome, statable honestly; (4) these = **capability proof** ("we can build hard things
> well") — exactly the #1 gap the cold panel named; (5) ORDER: lead the section with LIVING/named/
> clean-outcome clients (e.g. Processious in production), use anonymized dead-but-strong ones as
> supporting depth. Fully Governing-Rule-#1-clean: tell the engineering story (always true), never a
> business outcome that didn't happen.

---

## The 7 rules of a trust-worthy case study
1. **Specific beats impressive.** "Cut invoice processing from 3 days to 4 hours" >
   "dramatically improved efficiency." Numbers, names, and concrete nouns build belief;
   vague superlatives destroy it.
2. **Frame the problem from the CLIENT's pain**, not "they hired us." The reader must see
   *their own* problem in it.
3. **Quantify the outcome** — before → after, with a metric. If exact numbers are
   confidential, use honest ranges/percentages ("~60% faster") or proxy metrics. Never invent.
4. **Show the HOW, not just the what.** A paragraph on a hard decision or constraint you
   navigated proves expertise (this is the offshore-trust closer). It's the difference
   between "we built an app" and "we knew what we were doing."
5. **Provide proof anchors:** a named client quote (role + company), real tech stack,
   timeline, team size, and — if permitted — a logo. Anonymous + unverifiable = ignored.
6. **Be honest about constraints/trade-offs.** Acknowledging a real challenge or a scoped
   compromise makes the whole story *more* believable, and it's on-brand (honest engineering).
7. **End with momentum + a CTA.** Ongoing relationship = trust signal; then "Estimate your
   project / Talk to us."

**Avoid:** unverifiable superlatives ("world-class", "cutting-edge"), buzzword soup, vague
outcomes, stock-photo filler, hiding the client behind total anonymity with no reason given.

---

## PART A — Intake questionnaire (Aamir fills this; rough notes OK)
> One per engagement. The richer this is, the stronger the case study. Skip what truly
> doesn't apply. Where something is confidential, say so and suggest how to anonymize.

**Client & context**
1. Client name + industry + size (or an honest descriptor if NDA: e.g. "a US-based
   logistics enterprise, ~500 staff"). Can we name them / use their logo / link them?
2. One line on what the client does.
3. How did the engagement start (referral, inbound, etc.)? *(internal note; may not publish)*

**The problem / challenge**
4. What problem did they come to you with? In their words — the pain, not the tech.
5. Why did it matter to their business? What was at stake / the cost of not solving it?
6. What made it hard or risky (legacy system, tight deadline, compliance, scale, prior
   failed attempt)?
7. Did they consider/try other vendors or approaches first? *(the trust-gap angle)*

**What you did**
8. What did you build / deliver (in plain terms)?
9. **The hard part:** one or two key engineering/architecture decisions or obstacles, and
   how you handled them. (This is the competence proof — be specific.)
10. Tech stack & approach (languages, platforms, any ManiarTech tools/standards used —
    Processious? UExL? Taj Mahal? AI? — dogfooding is a great signal).
11. Timeline (duration) and team size.
12. How did your process help (ISO 9001/27001, AI-assisted delivery, the ~50% cost edge)?

**The results (most important)**
13. **Quantified outcomes** — before → after numbers. Time saved, % faster, cost reduced,
    revenue/volume enabled, errors cut, users served, uptime, etc. Best-effort + honest.
14. Qualitative outcomes — what changed for the client's team/business/customers?
15. Business impact in the client's eyes — why did it matter to *them*?

**Proof**
16. A **client quote** we can publish (name + role + company if allowed). Even a paraphrase
    we get approved is gold. *(5 testimonials exist on the old site — start there.)*
17. Is the relationship ongoing? What did they do next (phase 2, retainer, referral)?
18. Anything we must NOT disclose (numbers, names, domain specifics)?

---

## PART B — The case-study page (structure I'll write into)

```markdown
---
title: "<Client/Industry>: <headline outcome in a phrase>"
client: "<Name or honest descriptor>"
industry: "<Industry>"
services: ["<service 1>", "<service 2>"]
tech: ["<stack>"]
duration: "<e.g. 4 months>"
status: "case-study"
---

# <Headline that leads with the OUTCOME>
> e.g. "Cutting a logistics firm's order processing from 3 days to 4 hours"

<!-- AT-A-GLANCE STRIP (scannable proof, top of page) -->
> **Client:** <name/descriptor> · **Industry:** <x> · **Engagement:** <type, duration> ·
> **Result:** <the one headline metric>

<!-- 1. THE CLIENT (1–2 sentences) -->
## The client
<Who they are, briefly — enough context to make the problem real.>

<!-- 2. THE CHALLENGE (the client's pain + stakes + why it was hard) -->
## The challenge
<The problem in the client's terms. What was at stake. What made it hard/risky.
This section must make the target reader think "that's my problem too.">

<!-- 3. THE APPROACH (competence shown — the HOW) -->
## Our approach
<What you did AND the key decisions/obstacles you navigated. Demonstrate domain
expertise and judgment. This is the trust-gap closer — show you knew what you were doing.
Name the tech, and any ManiarTech tools/standards used (dogfooding signal).>

<!-- 4. THE SOLUTION (what was delivered) -->
## What we delivered
<Concrete deliverables/capabilities. Optional: a diagram or screenshot if shareable.>

<!-- 5. THE RESULTS (quantified — the money section) -->
## The results
- **<Metric>:** <before> → <after> (<% change>)
- **<Metric>:** <number/impact>
- <Qualitative outcome + business impact in the client's eyes>

<!-- 6. CLIENT VOICE (named proof) -->
> "<Client quote — specific, not generic praise.>"
> — <Name>, <Role>, <Company>

<!-- 7. MOMENTUM + CTA -->
## What's next
<Ongoing relationship / phase 2 / referral — the trust signal.>

**Have a similar challenge?** [Estimate your project →](/estimate/) · [Talk to us →](/contact/)

<!-- FACTS BOX (sidebar/footer) -->
**At a glance:** <duration> · <team size> · <stack> · ISO 9001 & 27001 · delivered from <location>
```

---

## Illustrative example (FICTIONAL — shows the voice/shape only; replace with real)
> ⚠️ Not a real ManiarTech client. Purely to demonstrate the level of specificity to aim for.

**Title:** *"From 3-day backlog to same-hour dispatch: automating a logistics operator's
order pipeline"*

**At a glance:** Mid-size EU logistics operator · Process Automation + Enterprise Systems ·
5 months · headline: **order-to-dispatch cut from ~3 days to under 1 hour**

**The challenge:** Orders arrived across email, a portal, and spreadsheets, and a team of 6
re-keyed them by hand — a 3-day backlog, frequent errors, and no visibility. Peak season
made it untenable; a failed prior automation attempt had made them wary of vendors.

**Our approach:** Rather than rip-and-replace, we modeled their actual workflow first and
automated it incrementally on Processious, integrating their existing ERP and carrier APIs.
The hard part was reconciling three inconsistent order formats — we built a normalization
layer (using our own UExL rules engine) so business users could adjust mappings without code.

**The results:** order-to-dispatch **~3 days → <1 hour**; manual re-keying **down ~85%**;
the 6-person data-entry team redeployed to exceptions/customer service; zero data-entry
errors in the first quarter post-launch.

**Client voice:** *"They understood our operation better than vendors we'd used for years —
and they shipped."* — Head of Operations.

**What's next:** Phase 2 (predictive capacity planning) underway.

---

## Practical notes
- **2 strong case studies are enough to start.** One in your strongest vertical, one
  showing range. Quality > quantity.
- **Anonymize honestly when needed:** "a US fintech startup" with real numbers beats a named
  client with vague ones. State the reason ("under NDA") so it reads as discretion, not weakness.
- **No perfect metrics? Use honest proxies/ranges** ("roughly halved", "from days to hours")
  and qualitative + a strong quote. Better an honest range than a fake precise number.
- **Home page** should feature 2–3 result headlines from these, linking to the full pages
  (this is the "Proof, not promises" section in the homepage draft).
- These feed the SEO + distribution engine too (a case study is also a shareable asset).
```
