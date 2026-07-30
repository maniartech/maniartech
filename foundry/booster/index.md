---
title: Booster
description: Our dev-environment orchestrator - provisions a whole local stack from one config; runs in production across many of our own projects.
productStatus: Internal - in production
---

Booster is our dev-environment orchestrator: one config brings up a whole local stack - services,
data stores, and dependencies - so every engineer runs the same environment, and a new machine is
productive in minutes rather than days.

## One command, the whole stack

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A single booster.yaml config feeds Booster, which brings up a local stack of native processes and Docker Compose services in dependency order, gated on readiness; a band below shows the single terminal view with status, uptime, CPU, memory, and live logs">
  <g font-family="inherit" font-size="12.5">
    <rect x="40" y="56" width="180" height="72" rx="8" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.35)" stroke-width="1.2"/>
    <g text-anchor="middle">
      <text x="130" y="78" fill="rgba(255,255,255,.78)" font-weight="600">booster.yaml</text>
      <text x="130" y="96" fill="rgba(255,255,255,.5)" font-size="11">services, dependencies,</text>
      <text x="130" y="112" fill="rgba(255,255,255,.5)" font-size="11">readiness checks</text>
    </g>
    <line x1="220" y1="92" x2="265" y2="92" stroke="rgba(255,255,255,.45)" stroke-width="1.5"/>
    <polygon points="265,87 265,97 272,92" fill="rgba(255,255,255,.5)"/>
    <rect x="272" y="56" width="130" height="72" rx="8" fill="rgba(20,207,147,.15)" stroke="rgba(20,207,147,.6)" stroke-width="1.2"/>
    <text x="337" y="88" text-anchor="middle" fill="rgba(255,255,255,.85)" font-weight="600">Booster</text>
    <text x="337" y="106" text-anchor="middle" fill="rgba(255,255,255,.55)" font-size="11">one command</text>
    <line x1="402" y1="92" x2="450" y2="92" stroke="rgba(255,255,255,.45)" stroke-width="1.5"/>
    <polygon points="450,87 450,97 457,92" fill="rgba(255,255,255,.5)"/>
    <rect x="464" y="24" width="256" height="124" rx="10" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.2" stroke-dasharray="5 4"/>
    <text x="592" y="44" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="11">your local stack</text>
    <g fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.35)" stroke-width="1.2">
      <rect x="484" y="54" width="216" height="34" rx="8"/>
      <rect x="484" y="100" width="216" height="34" rx="8"/>
    </g>
    <g text-anchor="middle" fill="rgba(255,255,255,.75)" font-size="11.5">
      <text x="592" y="75">native processes</text>
      <text x="592" y="121">Docker Compose services</text>
    </g>
    <text x="592" y="166" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="11">brought up in dependency order, gated on readiness</text>
    <rect x="40" y="184" width="680" height="36" rx="8" fill="rgba(20,207,147,.10)" stroke="rgba(20,207,147,.5)" stroke-width="1.2"/>
    <text x="380" y="206" text-anchor="middle" fill="rgba(255,255,255,.7)" font-size="12">One terminal view: status, uptime, CPU / memory, live logs for every service</text>
  </g>
</svg>
<figcaption><strong>Config in, supervised stack out.</strong> The config describes the stack once; Booster brings it up and then stays with it, supervising native processes and containerized services side by side in a single terminal view. Described as we use it internally - it isn't publicly available yet.</figcaption>
</figure>

One config file describes the stack: which services exist, what each one depends on, and what
"ready" means for it. Booster reads that file and brings everything up in dependency order, waiting
for each service's readiness check before starting the ones that need it - and it treats native
processes and Docker Compose services as one stack, supervised together. Then it stays for the whole
working day: a single terminal view showing every service's status, uptime, CPU and memory, with a
live log stream across the stack. The same config also works headless, so the stack can be brought up
and verified in CI, not just on a laptop.

## Where it stands

Booster runs **in production across many of our own projects** - it's how we build, day to day, and
the strongest test we can give it. It's internal for now, not something we sell; we plan to
open-source it later, once it's proven enough to stand on its own in public.

## Why it's here

We list Booster because it's honest proof of how we build: we dogfood our own tools on real projects
before anyone else relies on them. The discipline that keeps our environments reproducible is the same
discipline that keeps the systems we build for you maintainable.
