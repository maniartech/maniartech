---
title: Booster
description: Our dev-environment orchestrator — provisions a whole local stack from one config; runs in production across many of our own projects.
productStatus: Internal · in production
---

Booster is our dev-environment orchestrator: one config brings up a whole local stack — services,
data stores, and dependencies — so every engineer runs the same environment, and a new machine is
productive in minutes rather than days.

## Where it stands

Booster runs **in production across many of our own projects** — it's how we build, day to day, and
the strongest test we can give it. It's internal for now, not something we sell; we plan to
open-source it later, once it's proven enough to stand on its own in public.

## Why it's here

We list Booster because it's honest proof of how we build: we dogfood our own tools on real projects
before anyone else relies on them. The discipline that keeps our environments reproducible is the same
discipline that keeps the systems we build for you maintainable.
