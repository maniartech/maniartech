---
title: "What we built"
---

## What we built

Content Engine was not a black-box "rewrite" button. It was an assistant for the editors, living inside Euclid Infotech's content-editing and approval pipeline:

- **Grammar-aware suggestions.** Click any word, and the tool detected its part of speech, its lemma, and its grammatical form - then offered alternatives that matched that form. A verb in the continuous present (the "-ing" form) drew continuous-present alternatives; a passive-voice construction drew passive-voice ones. Suggestions slotted in without breaking the sentence.
- **Context-aware word-sense disambiguation.** The hard part. The same word can mean different things, and a naive thesaurus swap produces nonsense. Take "tender": in "this flower is tender and soft" it means delicate; in "the government is going to publish tenders for new steel-plant machinery" it means a procurement bid. In many cases, the tool read the surrounding context and suggested only sense-appropriate alternatives. Not every case - word-sense disambiguation is genuinely hard, and this was a decade before deep-learning models made it easier - but it got it right often enough to be useful.
- **Line- and word-level paraphrasing**, using a range of randomization methods, to help editors re-express sourced material as original copy.
- **Secure approval sign-off.** The tool carried automatic secured signing, so items moved through the edit-and-approve pipeline with proper, tamper-evident sign-off - part of the governed workflow, not a side utility.

All of it ran on an NLTK-based engine, in Python. We designed and delivered Phase 1 in three months, and it took its place inside the pipeline the copywriting team used every day.
