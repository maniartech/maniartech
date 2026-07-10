# Case study — "Content Engine", Euclid Infotech — context-aware NLP editorial tool (Draft v3, 2026-06)

> v3 changes (2026-06): named the project **Content Engine** + named the client **Euclid Infotech**;
> added the real outcome (**3 months to build · ~2 years in production**); added the full tool scope
> (grammar-aware suggestions, word-sense disambiguation, secure sign-off); sealed the PRIVATE
> wind-down context (NOT for the public page); held the < US$3,000 figure internal per positioning;
> added the "appetite GenAI would serve a decade later" framing.

> First case study, from Aamir's narrative (2026-06; enriched). ★ ANGLE: a content-editing + approval
> tool with **grammar-aware** and **context-aware (word-sense-disambiguation)** paraphrasing, built on
> classical NLP/NLTK in **2010–2011 — years before GenAI**. A heritage/depth proof that ties straight
> to the AI positioning today, and a genuine competence showcase (WSD pre-deep-learning is hard).
> Per CASE-STUDY-TEMPLATE this is a SUPPORTING/depth study (lead the section with living/recent ones —
> Processious in-production, Sales Navigator), but a STANDOUT on the **AI capability** page. Every
> claim TRUE + SOURCED (Governing Rule #1); honest hedges kept ("in many cases, not all").

---

## PART A — Intake (captured from Aamir, compaction-safe)
- **Client:** **Euclid Infotech** — ran (Aamir believes still runs, but is NOT in touch / unsure)
  **India's largest procurement news portal**. ✅ Aamir OK to NAME them (2026-06).
- **Era:** 2010–2011, one of ManiarTech's initial projects.
- **How it started:** Aamir already worked with them on other projects; their **founder** wanted to
  automate the copywriting/paraphrasing to cut cost + time. Pre-GenAI; they consulted several vendors;
  ManiarTech proposed **NLTK + NLP** and won.
- **Problem:** they aggregate large volumes of procurement info from many sources; **copywriters**
  manually paraphrase it into publishable items before approval — slow + costly bottleneck.
- **What we built (FULL scope — richer than v1):** not just a paraphrasing engine — a tool that **sits
  inside their content-editing + approval pipeline** with **automatic secured signing** support, and:
  - assisted paraphrasing — change words and whole lines using **various randomization methods**;
  - **interactive, grammar-aware suggestions** — click a word → the system detects its **type + lemma +
    grammatical form** and offers **form-matched** alternatives (an `-ing` continuous-present verb →
    continuous-present alternatives; **passive voice → passive-voice** alternatives), so suggestions
    slot in without breaking the sentence;
  - **context-aware word-sense disambiguation** — in MANY cases (not all) it detected the word's
    meaning from context and suggested sense-appropriate alternatives. Example — **"tender"**:
    *"This flower is tender and soft"* (delicate) vs. *"The Government of India is going to publish
    tenders about new steel-plant machinery"* (procurement bid) — two different senses; the system
    would, in many cases, correctly pick the right one.
  - **secure approval sign-off** built into the tool (items move through editing→approval with secured
    signing).
  - All on the **NLTK** engine.
- **Project name:** **"Content Engine"** (Phase 1). **3 months** of work.
- **Outcome:** delivered; **ran in production for ~2 years.** (That's the real run-duration metric.)
- **⛔ PRIVATE — NOT for the public page (handle like the Tallery V1 chapter):** Aamir believes the
  project wound down ~2 years later because *some* of their copywriters were expecting **today's
  GenAI-level quality** — impossible in 2010. This is NOT an engineering shortcoming (the tool was
  excellent and ran 2 years in production); it reflects users wanting the future early. NEVER state
  "the project died / users were disappointed" on the public page. Engineering success ≠ how long the
  client kept it alive. Public story = built in 3 months, ran ~2 years in production, did hard NLP.
- **Cost:** **Phase 1 was under US$3,000** (Aamir corrected from "<1000" to "<3000"). ⚠️ POSITIONING:
  do NOT headline the dollar figure — per the decided **depth/quality** positioning (the "cheaper /
  ~50% cost" pillar was deliberately removed), a rock-bottom price can cheapen the premium brand AND
  reinforce the offshore-cheap stereotype to avoid. If used at all → frame as "a small Phase-1
  engagement" (value implied), not a price billboard. AAMIR'S CALL.

`[OPEN for Aamir (none required to publish honestly): any rough OUTCOME signal (time/cost cut,
articles-per-day, how long it ran — "quite some time" = months? years?); any old quote/testimonial;
confirm the "tender" example is OK to use verbatim (it's a great illustration).]`

---

## PART B — The case-study page (draft)

---
title: "Euclid Infotech: context-aware paraphrasing built into an editorial pipeline — years before GenAI"
client: "Euclid Infotech"
industry: "Media / publishing — public-procurement news"
services: ["AI & NLP engineering", "Custom application engineering"]
tech: ["Python", "NLTK", "classical NLP (tokenization · POS tagging · lemmatization · word-sense disambiguation · thesaurus/dictionary)"]
duration: "3 months (Phase 1, 2010–2011) · in production ~2 years"
status: "case-study"
---

# The tool knew that "tender" meant two different things

> **Content Engine** — grammar-aware, context-aware paraphrasing built into an editorial pipeline on
> classical NLP, a decade before generative AI.

> **Client:** Euclid Infotech, one of India's largest public-procurement news publishers ·
> **Work:** Content Engine — an NLP-powered content-editing + approval tool, embedded in their
> pipeline · **When:** 2010–2011 · **Stack:** Python / NLTK · **Built in:** 3 months ·
> **Result:** editors got grammar- and context-aware rewriting suggestions plus secure approval
> sign-off — **run in production for about two years.**

## The client
Euclid Infotech runs one of India's largest public-procurement news services. They aggregate tenders
and procurement notices from a wide range of sources and publish them — reworked into original news
items — for their subscribers. `[Aamir OK to name; "largest" stated as-at-the-time.]`

## The challenge
The raw material couldn't be published as-is. A team of copywriters rewrote and paraphrased every item
by hand into original, publishable copy before it went through editorial approval — accurate, but slow
and labour-intensive, and the paraphrasing step was the bottleneck throttling how fast and how
affordably they could publish. Their founder wanted to automate that rewriting and streamline the
editing-and-approval pipeline around it.

## Our approach
This was years before generative AI — no large language models to call. The publisher evaluated several
vendors for an approach that could actually work with the NLP of the day. We proposed a classical-NLP
solution built on **NLTK**, and won the engagement on the strength of the proposal.

What we built wasn't a black-box "rewrite" button — it was an **assistant for the editors**, living
inside their content-editing and approval workflow:

- **Grammar-aware suggestions.** Click any word, and the tool detects its part of speech, its lemma,
  and its grammatical form — then suggests alternatives that *match that form.* A verb in the
  continuous present (the `-ing` form) gets continuous-present alternatives; a passive-voice
  construction gets passive-voice ones. The suggestion drops in without breaking the sentence.
- **Context-aware word sense.** This is the hard part. The same word can mean different things, and a
  naïve thesaurus swap produces nonsense. Take **"tender"**: in *"this flower is tender and soft"* it
  means *delicate*; in *"the government will publish tenders for new steel-plant machinery"* it means a
  *procurement bid.* In many cases, the tool read the surrounding context and suggested only
  **sense-appropriate** alternatives. (Honestly: not every case — word-sense disambiguation is hard,
  and this was a decade before deep-learning models made it easier. But it got it right often enough to
  be genuinely useful.)
- **Line- and word-level paraphrasing** using a range of randomization methods, to help editors
  re-express sourced material as original copy.
- **Secure approval sign-off.** The tool carried automatic secured signing, so items moved through the
  edit-and-approve pipeline with proper, tamper-evident sign-off — not a side utility, but part of the
  governed workflow.

## What we delivered
**Content Engine** — a working application embedded in Euclid Infotech's editorial pipeline:
interactive, grammar- and context-aware paraphrasing assistance for the copywriting team, plus secure
approval sign-off, all on an NLTK-based engine. We delivered Phase 1 in **three months.**

## The results
- **Built in three months**, then **run in production for about two years** inside Euclid Infotech's
  editorial pipeline.
- Took the **manual paraphrasing step off the critical path**, giving editors fast, grammar-safe
  rewriting suggestions instead of rewriting every line from scratch.
- **Word-sense-aware** suggestions meant fewer nonsense swaps and less editor correction.
- **Secure sign-off** kept the speed-up inside a governed approval process.
- `[PLACEHOLDER — Aamir, if recalled: any throughput/turnaround figure. Honest only; never invent.]`

`[No client quote — older engagement. Acceptable for the page; the specifics (the "tender" example)
carry it. Do NOT fabricate a quote.]`

## Why it still matters
Lemmatization, part-of-speech-aware suggestion, word-sense disambiguation, human-in-the-loop editorial
assist, secure sign-off — in 2010–2011, on classical NLP. It's the same class of problem today's
generative-AI writing tools take on, and the same design principles still apply: understand the
language structurally, keep the human in control, and build the tool into the real workflow. We were
building for the appetite that generative AI would serve a decade later — before the models existed.
That lineage runs straight through to the AI work we do now.

**Have a similar challenge?** [Estimate your project →](/estimate/) · [Talk to us →](/contact/)

---

## Placement / usage notes
- **AI capability page:** feature this prominently — "we built grammar- and context-aware NLP into a
  production editorial tool before GenAI existed" is a standout, on-brand proof.
- **Case-studies section:** supporting depth; lead the section with living/recent studies (Processious
  in production · Sales Navigator).
- **Honesty guardrails:** named with Aamir's OK; "largest" as-at-the-time; WSD hedged ("in many cases,
  not all"); no invented metrics; no faked ongoing relationship (momentum = the true through-line to
  today's AI). **Price deliberately NOT headlined** (depth/quality positioning) — facts box may carry
  "Phase 1" framing; the < US$3,000 figure stays internal unless Aamir explicitly wants it shown.
