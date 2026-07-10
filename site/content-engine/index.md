---
title: "Content Engine — Euclid Infotech"
description: "Production natural-language paraphrasing with context-aware word-sense disambiguation — applied NLP a decade before the AI wave."
caseStatus: "Delivered · 2010–2011"
client: "Euclid Infotech"
services: "AI & NLP engineering · Custom application engineering"
tech: "Python · NLTK · classical NLP"
order: 5
---

*Context-aware, grammar-aware paraphrasing built into an editorial pipeline — on classical NLP, a decade before generative AI.*

## The situation

Euclid Infotech ran one of India's largest public-procurement news portals. They aggregated tenders and procurement notices from a wide range of sources and republished them, reworked into original news items, for their subscribers.

The raw material couldn't go out as-is. A team of copywriters rewrote and paraphrased every item by hand into original, publishable copy before it cleared editorial approval — accurate, but slow and costly, and the paraphrasing step was the bottleneck on how fast and how affordably they could publish.

Their founder wanted that rewriting automated. This was pre-GenAI: no large language models to call. They evaluated several vendors for an approach that could actually work with the natural-language tooling of the day.

## What we built

We proposed a classical-NLP solution built on **NLTK**, and won the engagement on the strength of that proposal.

What we delivered — **Content Engine** — wasn't a black-box "rewrite" button. It was an assistant for the editors, living inside Euclid Infotech's content-editing and approval pipeline:

- **Grammar-aware suggestions.** Click any word, and the tool detected its part of speech, its lemma, and its grammatical form — then offered alternatives that *matched that form.* A verb in the continuous present (the `-ing` form) drew continuous-present alternatives; a passive-voice construction drew passive-voice ones. Suggestions slotted in without breaking the sentence.
- **Context-aware word-sense disambiguation.** This was the hard part. The same word can mean different things, and a naïve thesaurus swap produces nonsense. Take **"tender"**: in *"this flower is tender and soft"* it means *delicate*; in *"the government is going to publish tenders for new steel-plant machinery"* it means a *procurement bid.* In many cases, the tool read the surrounding context and suggested only **sense-appropriate** alternatives. Not every case — word-sense disambiguation is genuinely hard, and this was a decade before deep-learning models made it easier — but it got it right often enough to be useful.
- **Line- and word-level paraphrasing**, using a range of randomization methods, to help editors re-express sourced material as original copy.
- **Secure approval sign-off.** The tool carried automatic secured signing, so items moved through the edit-and-approve pipeline with proper, tamper-evident sign-off — part of the governed workflow, not a side utility.

All on an NLTK-based engine.

## Where it stands

Content Engine was delivered and **ran in production for about two years** inside Euclid Infotech's editorial pipeline, taking the manual paraphrasing step off the critical path for their copywriting team.

## What the client said

> "As per our organization experience Maniar Technologies Pvt. Ltd has given best solution for Web Portal as well as windows application."
>
> — **Shailesh Pichori, AVP — Information Technology, TendersInfo.com (Euclid Infotech)**

## Why it matters

Lemmatization, part-of-speech-aware suggestion, word-sense disambiguation, human-in-the-loop editorial assist, secure sign-off — in 2010–2011, on classical NLP. That's the same class of problem today's generative-AI writing tools take on, and the same design principles still hold: understand the language structurally, keep the human in control, and build the tool into the real workflow.

We were applying production NLP to an editorial pipeline a decade before modern AI made it fashionable. That's the depth and heritage behind the AI work we do now.


**Have a similar challenge?** [Estimate Your Project →](/estimate/) · [Talk to a human →](/contact/)
