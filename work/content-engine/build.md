---
title: "What we built"
---

## What we built

Content Engine was not a black-box "rewrite" button. It was an assistant for the editors, living inside Euclid Infotech's content-editing and approval pipeline:

- **Grammar-aware suggestions.** Click any word, and the tool detected its part of speech, its lemma, and its grammatical form - then offered alternatives that matched that form. A verb in the continuous present (the "-ing" form) drew continuous-present alternatives; a passive-voice construction drew passive-voice ones. Suggestions slotted in without breaking the sentence.
- **Context-aware word-sense disambiguation.** The hard part. The same word can mean different things, and a naive thesaurus swap produces nonsense. Take "tender": in "this flower is tender and soft" it means delicate; in "the government is going to publish tenders for new steel-plant machinery" it means a procurement bid. In many cases, the tool read the surrounding context and suggested only sense-appropriate alternatives. Not every case - word-sense disambiguation is genuinely hard, and this was a decade before deep-learning models made it easier - but it got it right often enough to be useful.
- **Line- and word-level paraphrasing**, using a range of randomization methods, to help editors re-express sourced material as original copy.
- **Secure approval sign-off.** The tool carried automatic secured signing, so items moved through the edit-and-approve pipeline with proper, tamper-evident sign-off - part of the governed workflow, not a side utility.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pipeline: a word in a sourced article is analysed for part of speech, lemma and grammatical form, disambiguated by context, form-matched suggestions are offered, and the editor accepts or rejects them">
  <g font-family="inherit" font-size="11.5">
    <g fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.35)" stroke-width="1.2">
      <rect x="10" y="42" width="128" height="48" rx="8"/>
      <rect x="163" y="42" width="128" height="48" rx="8"/>
      <rect x="316" y="42" width="128" height="48" rx="8"/>
      <rect x="469" y="42" width="128" height="48" rx="8"/>
    </g>
    <rect x="622" y="42" width="128" height="48" rx="8" fill="rgba(20,207,147,.15)" stroke="rgba(20,207,147,.6)" stroke-width="1.2"/>
    <g text-anchor="middle" fill="rgba(255,255,255,.75)">
      <text x="74" y="61">Sourced</text><text x="74" y="77">article</text>
      <text x="227" y="61">POS + lemma</text><text x="227" y="77">+ form detected</text>
      <text x="380" y="61">Word sense</text><text x="380" y="77">from context</text>
      <text x="533" y="61">Form-matched</text><text x="533" y="77">suggestions</text>
      <text x="686" y="61">Editor accepts</text><text x="686" y="77">or rejects</text>
    </g>
    <g text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="14">
      <text x="150" y="70">&rarr;</text><text x="303" y="70">&rarr;</text>
      <text x="456" y="70">&rarr;</text><text x="609" y="70">&rarr;</text>
    </g>
    <g text-anchor="middle" font-size="10.5">
      <text x="380" y="108" fill="rgba(240,200,90,.75)">right in many cases, not all</text>
      <text x="686" y="108" fill="rgba(20,207,147,.8)">the human decides</text>
    </g>
    <text x="380" y="140" text-anchor="middle" fill="rgba(255,255,255,.45)">Click a word - the engine analyses it, filters senses by context, and offers alternatives that slot into the sentence.</text>
  </g>
</svg>
<figcaption><strong>The suggestion pipeline, editor in the loop.</strong> Every suggestion had to match the word's grammatical form; the word-sense step got it right in many cases, not all - and the editor always made the final call.</figcaption>
</figure>

All of it ran on an NLTK-based engine, in Python. We designed and delivered Phase 1 in three months, and it took its place inside the pipeline the copywriting team used every day.
