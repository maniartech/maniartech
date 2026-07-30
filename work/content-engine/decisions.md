---
title: "The calls that mattered"
---

## The calls that mattered

**Classical NLP, honestly scoped.** In 2010 there was no model you could prompt into paraphrasing. Several vendors pitched for this; we proposed what the tooling of the day could genuinely deliver - tokenization, part-of-speech tagging, lemmatization, word-sense disambiguation on NLTK - and nothing it could not. Winning on a calibrated proposal beat winning on an inflated one, because we then had to ship it.

**An assistant, not an autopilot.** We built the tool as interactive suggestions the editor accepts or rejects, not automatic replacement. That was a deliberate hedge against the technology's limits: word-sense disambiguation worked in many cases, not all, so a wrong guess had to cost a rejected suggestion - never a published error. The human stayed in control; the machine took the drudgery.

**Grammar first, vocabulary second.** A synonym that breaks the sentence is worse than no synonym. So suggestions were filtered by grammatical form - matching tense, voice, and inflection - before they were offered at all. It is the difference between a tool editors trust and a tool they turn off.

**Sign-off inside the tool.** Faster rewriting is worthless if it escapes editorial control, so secure, signed approval was built into the same pipeline. The speed-up stayed inside a governed workflow.

Fifteen years on, these are the same calls we make in AI work today: calibrate claims to what the technology can do, keep the human in the loop, and build the tool into the real workflow.
