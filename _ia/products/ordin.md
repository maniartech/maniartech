---
title: "Ordin — a workflow-automation engine"
description: "A workflow-automation engine — YAML-defined workflows, pluggable activities; fair-code / source-available."
order: 20
productStatus: "In development"
image: ""
---

# Ordin (product detail) — Draft v2 (skeptic-lens / Presentation Doctrine, 2026-06)

> ★ HONEST-STATUS PAGE. Ordin is **in development** — by its own roadmap, "no longer just a
> prototype, but not best-in-class yet." This page leads with the client's problem (automation that
> ties their tools together), shows what genuinely works today — **anchored to its one real home,
> Processious in production** — frames the safety (no lock-in, mainstream Go, source-available), adds
> a JP-Morgan-grade credibility beat, and lands the depth — "we build the automation engine
> ourselves" — as the closer. It NEVER promises features that aren't built, NEVER cites the
> fabricated pitch deck (no ABC Corp / 99.999% / fake testimonials), and NEVER publishes the
> design-target perf numbers (<10ms, 10k events/sec) as if measured. Every claim TRUE + SOURCED +
> status-honest (Governing Rule #1). Each `[note]` = placeholder/verify/rationale.

> `[POSITIONING DECISION — needs Aamir. The dossier recommends presenting Ordin (a) as Processious's
> automation engine + (b) a brief honest standalone "in development" mention — NOT a full product
> page promising features. This draft is now written explicitly as a SUB-PAGE OF PROCESSIOUS — "The
> engine behind Processious" — reachable by the technically curious, not a top-level product a buyer
> lands on cold. The skeptic review flagged that the prior draft tried to be both a buyer landing page
> and an engine detail and satisfied neither. This v2 commits to the sub-page framing and routes every
> buyer to Processious. If Aamir wants Ordin held back until launch (option c), don't publish this.]`

> `[VERIFIABILITY — needs Aamir. The doctrine's spine is "every big claim one click from proof," and
> this page invites verification ("source-available, you can read it") but has NO links yet. Every
> place that should carry a proof link is marked **[LINK — needs Aamir]** below: the source-available
> repo URL, the LICENSE file, and (ideally) a runnable example. Until a real link exists for a given
> claim, the claim has been SOFTENED to match what we can actually back. Do not publish the
> source-available invitation without the repo link, or the n8n-license comparison without the
> LICENSE confirmed — both are things a technical buyer will check.]`

---

## 1 · HERO  *(their problem first — the work that should run itself)*

# The work that should just run itself — scheduled, watched, and automated.

Ordin is the automation engine we built to run the background work a business depends on: jobs on a
schedule, reactions to events, checks that something is still healthy, steps that hand off to the
next step. It's the engine that runs the scheduled and event-driven automation inside
**Processious** — our process-automation platform that's **in production today for a real client**.

**Status: in development.** The core engine is past prototype and runs the real workflows behind
Processious in our own operations — but it is **not** yet a finished, off-the-shelf product, and
you'd never run it yourself. You use it the way our client does: as the engine inside Processious.
We'll tell you exactly where the line is.

**[ See Processious → ]**   ·   [ Talk to a human ]

`[FIXED per skeptic. Old hero said "runs real workflows today" → read as "in production somewhere,"
unproven. Now anchored to a verifiable home: it runs the automation behind Processious, which IS in
production for a real client (see product-processious.md §3). Also neutralizes the in-development
fear up front: you consume it through Processious, you never operate Ordin directly. No superlatives,
no perf numbers. Single primary CTA = Processious (the buyer's path), per customer-lens "ONE clear
primary CTA."]`

---

## 2 · IS THIS YOU?  *(let them see the problem Ordin solves)*

### You probably care about this if:

- **You run jobs by hand** — backups, syncs, reports, health checks — and you want them on a
  schedule, not on someone's memory.
- **Something needs to react to an event** — a file lands, a webhook fires, a timer trips — and the
  right steps should follow automatically.
- **Your tools don't talk to each other** — and you want a step in one to trigger a step in another.
- **You've outgrown brittle scripts** and want automation that's defined, readable, and version-able
  — not a pile of cron entries no one understands.

If you're evaluating something like **n8n, Zapier, Make, or Workato**, Ordin is in that family — a
Go-native, self-hosted engine in the same category. The honest difference: you don't adopt Ordin as
a tool; you get its automation delivered as part of **Processious**, built and run for you.
`[competitors.md lists exactly these; honest peer framing, not a "we beat them" claim. Added the
"you consume it via Processious" clarifier so a buyer doesn't think they're being sold an unfinished
tool to operate themselves.]`

`[The "is this MY problem?" fix. Speaks the real situations in the customer's words. Names the peer
category honestly so a technical buyer can place it.]`

---

## 3 · WHAT IT DOES TODAY  *(proof it works — only what's real, and where you can check it)*

### Workflows you can read, triggered by events you choose.

You describe a workflow in plain **YAML** — what starts it, what runs, and what happens next. Ordin
runs it.

```yaml
flows:
  - timer: ping_server
  - ping_server.success: [reset_failure_count, update_log]
  - ping_server.failure: log_failure
```

That's the whole idea: an event starts the flow; each step's **outcome routes to the next steps** —
including fanning out to several at once. It's compact enough to read at a glance and explicit enough
to reason about.

**Working today — and running behind Processious in production:**

- **Event-driven execution** — timers, cron, and other events kick off workflows.
- **A pluggable activity system** — steps run through plugins. The ones built and in the repo today:
  shell commands, HTTP / network health checks, file I/O, email markup (MJML), expression
  evaluation, scheduling, and templating.
- **Outcome-based routing and fan-out** — one step's result can branch to one path or many.
- **Result storage and error propagation** through the workflow.
- **Single Go binary, cross-platform**, driven by a command-line interface.
- **End-to-end tested** for the core event-to-activity and conditional fan-out paths.

These capabilities aren't a wish-list: they're the paths that run the scheduled and event-driven
automation inside Processious today. `[STRENGTHENED per skeptic: the prior draft sourced every bullet
ONLY to the engine's own roadmap doc (self-attested) with zero third-party anchor. The honest,
verifiable anchor we DO have is Processious-in-production — so the bullets are now tied to that real
home rather than presented as abstract self-claims. The bullet list itself is still sourced from the
implemented-list in WORKFLOW_ENGINE_ROADMAP.md.]`

> **[LINK — needs Aamir]** *Read it / run it yourself.* If we publish the source-available repo, this
> is where the **repo link** and a **runnable example** ("clone and run this YAML") belong — one click
> from the claim, per the doctrine. **Do not ship this section's "you can read the source" invitation
> until a real repo URL exists here.** Until then, this page states only what Processious's production
> use already backs, and offers no verification link it can't honour.

`[This is the "proof we deliver" section. For an in-development engine the honest proof is twofold:
(1) it runs real automation behind a platform that IS in production (verifiable via the Processious
case study, gated on Aamir), and (2) the source is readable — but ONLY once we can link it. Skeptic
review's #1 doctrine breach was "invites verification, links nothing." Fixed by anchoring to
Processious now and marking the repo/runnable links as hard prerequisites.]`

---

## 4 · WHAT'S NOT DONE YET  *(the honesty that earns the rest of the page)*

### We'll tell you where the line is.

Ordin's own roadmap puts it plainly: *"The workflow runtime is no longer just a prototype, but it is
not best in class yet."* We agree, and we'd rather you hear it from us. Still in progress:

- A first-class **run model** — run IDs, run status, per-step records, timing, cancellation.
- **Observability** — structured logging across the engine (some core paths still print directly).
- **Pre-execution validation** and a documented **plugin input/output/error contract**.
- **Concurrency and queueing policy** — worker counts, backpressure, retries.
- More **plugin types** — JavaScript, Python, WASI, Java, and .NET loaders are planned; today only
  native **Go** plugins run. A web UI and distributed execution are on the roadmap, not built.

**What this means for you, the client:** none of this is your exposure. You don't run Ordin, operate
it, or wait on its roadmap — you get outcomes through **Processious**, which we build, run, and
support. The in-development engine is our problem to mature; your project rides on the platform, not
on the engine's rough edges.

`[The dossier's gaps + planned/aspirational lists, stated as honest "not yet." ADDED per skeptic
("why would a CLIENT touch an in-development engine / what's my exposure"): the candid limits list is
trust currency, but it now closes the client's risk loop explicitly — you consume Processious
outcomes, you never bet on Ordin directly. Crucially still closes the door on anyone reading §3 and
assuming the planned items already exist.]`

---

## 5 · WHY IT'S SAFE  *(de-risk — no lock-in, mainstream, inspectable)*

### Built so you're never trapped in it.

- **Mainstream Go, self-hosted.** Ordin is a single Go binary that runs on ordinary infrastructure —
  no proprietary cloud you're tied to, no team-only black box. Mainstream, hireable technology.
- **Source-available, fair-code licensed.** Ordin is intended to be **fair-code** (faircode.io) —
  *source-available, not classic open source*. The goal is that you (or any engineer) can read the
  source and inspect exactly how your automation runs.
  `[CLAIMS SOFTENED per skeptic (two unsourced overclaims removed):
  (1) Dropped the bald "the same licensing model n8n uses" — the page's own note says license terms
  are unverified, and a technical buyer checks the LICENSE file; a mismatch detonates trust. Re-add an
  n8n comparison ONLY after the LICENSE is confirmed, and even then phrase as "a fair-code,
  source-available model (like n8n's)."
  (2) Changed "You can read the source" → "the goal is that you can read the source," because there is
  no public repo link yet. Restore the firm wording the moment the repo + LICENSE links below exist.
  NEVER describe Ordin as "open source" or "MIT" — it is deliberately fair-code per its LICENSE.]`
  > **[LINK — needs Aamir]** repo URL + the actual **LICENSE file**, so the fair-code claim is one
  > click from proof. **Hold the n8n equivalence until the LICENSE is confirmed.**
- **Readable workflows you own.** Your automation lives in plain YAML you can read, diff, and keep in
  version control — not locked inside a UI only we understand.
- **Right-sized.** Ordin is a focused engine, not a sprawling platform. If your need is simpler than
  a full workflow engine, we'll tell you — and recommend the simpler thing.

`[The doctrine's safety pillar: NO LOCK-IN (mainstream Go, self-hosted, your own YAML) ·
inspectable (source-available, once linked) · right-sized · honest. Fair-code stated accurately,
never inflated to "open source," and now never asserting the n8n license parity or a live "read the
source" link before either can be proven.]`

---

## 6 · WHO BUILDS IT  *(credibility beat — so the depth-closer has trust under it)*

### Built by the team that engineered Processious.

Ordin was built by **ManiarTech** — a senior engineering team founded in 2010 by **[Aamir Maniar](https://www.linkedin.com/in/aamironline)**,
who earlier in his career built financial-technology systems at **JP Morgan**. It isn't a side
project: it's the automation substrate underneath a platform we run in production, maintained by the
same people who build the systems our clients depend on.

**[ Meet the team & our story → ]**

`[ADDED per skeptic (HIGH-adjacent gap): the prior draft had ZERO credibility scaffold, so the §7
depth-closer "we build our own engine" landed on an empty trust account, and the doctrine's #1 trust
bridge (JP Morgan) appeared nowhere. This beat is deliberately ONE line, consistent with
product-processious.md §5 and about §2 — JP Morgan LEADS, no Countrywide flex on a deep sub-page. It
ALSO answers the bus-factor / "is this one guy's side project I'll be stranded on?" fear
(customer-lens blocker #2) by naming the team and the continuity. VERIFY founder/pedigree wording
matches the canonical about-page version before publishing. [LinkedIn wired 2026-06]]`

---

## 7 · WHERE IT FITS  *(Processious — the closer + single buyer CTA)*

### The engine behind Processious automation.

Process automation is what **Processious** is for, and Ordin is the engine that actually runs the
long-running, scheduled, and event-driven work behind it. That's the honest point worth making: when
ManiarTech needed an automation substrate for our own operations platform, **we built the engine
rather than gluing together someone else's** — which is why it does exactly what Processious needs,
and why we can take it as deep as a client problem requires. You never run Ordin; you get its work,
fully supported, as part of Processious.

**The clearest path for you is Processious**, where Ordin already does this work in production.

**[ See Processious → ]**

*Developer, curious about the engine itself?* When the source-available repo is published it'll be
linked here to read. **[LINK — needs Aamir]**

`[Keeps Ordin in its honest home (Processious's engine) and lands the depth — "we make the engine,
not just use one" — as the CLOSER, now with the §6 credibility beat beneath it so it reads as
credential, not flex (skeptic fix). CTA simplified per customer-lens "ONE clear primary CTA": "See
Processious →" is the single primary action for buyers; the developer/source-available path is
demoted to a quiet secondary line, gated on a real repo link. The hero's two CTAs were also reduced
to Processious + "talk to a human."]`

`[NAMING — needs Aamir. Use "Ordin" as the single canonical name; do NOT surface the old
"Processious BRE" label. Confirm the one-line descriptor: "automation engine" / "workflow automation
engine" / "process orchestrator" — this draft uses "automation engine." Also confirm Ordin is
distinct from the separate `conductor`/"Orchestrator" Go concurrency library so the site doesn't
conflate the two "orchestrator" terms.]`

---

## What this page deliberately does NOT do  *(guardrails / Claim-Audit notes)*

- **No fabricated pitch-deck content.** The repo's `pitch-deck.md` (ABC Corp "90% optimal decisions,"
  "99.999% uptime / Fort Knox of BREs," invented McKinsey/Forbes/Gartner sources, fake CTO/CEO
  testimonials) is quarantined as non-factual and appears nowhere here. `[Per dossier + Aamir: that
  deck was an early visualization, never a go-to-market claim. Hard rule: never source it.]`
- **No performance numbers.** The "<10ms latency / >10,000 events/sec" figures are *design targets*,
  not measured benchmarks — omitted. If performance is ever claimed, it must ship with a reproducible
  benchmark and method shown.
- **No "production-ready / finished product" implication.** Status is "in development" throughout;
  the only thing described as in production is **Processious**, where Ordin runs — never Ordin as a
  standalone product.
- **No "runs real workflows today" left unanchored.** Every "works today" claim is tied to a
  verifiable home (Processious in production) or marked as needing a proof link before publish.
- **No unverified license comparison.** The bald "same licensing as n8n" claim is cut until the
  LICENSE is confirmed and linkable.
- **No source-available invitation without a link.** "Read the source" is softened wherever no repo
  URL exists yet.
- **No claim that any planned plugin/UI/distributed feature exists today.**

## What changed in v2 (skeptic review applied)
- **Anchored every "works today" claim to Processious-in-production** (HERO + §3) instead of the
  engine's own roadmap alone — fixes the "self-attested, unverifiable" HIGH issue and the "runs real
  workflows today reads as in production" overclaim.
- **Added a JP-Morgan-led credibility beat (§6)** so the depth-closer (§7) has a trust foundation —
  fixes the "empty trust account" + missing-pedigree gaps and the bus-factor fear.
- **Cut the unsourced n8n-license claim** and **softened "you can read the source"** to match what we
  can prove; marked **[LINK — needs Aamir]** at every place a proof link belongs (repo, LICENSE,
  runnable example) — fixes the "verifiability is the spine, links nothing" HIGH issue.
- **Closed the client-risk loop (§1, §4):** "you never operate Ordin; you consume Processious
  outcomes, fully supported" — neutralizes the in-development risk and bus-factor fear.
- **Single primary CTA = Processious;** demoted the developer/source path to a quiet, gated secondary
  line — fixes the multi-CTA confusion.
- **Reframed as an explicit Processious SUB-PAGE** ("the engine behind Processious"), not a cold
  top-level buyer landing — fixes the audience-fit issue.

## Decisions to confirm with Aamir
- **Positioning:** publish as a Processious sub-page ("the engine behind Processious") — confirm vs.
  holding Ordin back until launch.
- **Verifiability links (blocking):** repo URL, LICENSE file, and a runnable example — needed before
  the source-available invitation and n8n comparison can be stated at all.
- **Founder/pedigree wording (§6):** confirm it matches the canonical about-page version (JP Morgan
  lead; no Countrywide flex on this sub-page).
- **Processious anchor:** confirm it's accurate to say Ordin runs the scheduled + event-driven
  automation behind Processious in production (it should be — Processious §3 — but verify the specific
  framing).
- **Canonical name & one-liner** ("Ordin"; "automation engine") — confirm; drop "Processious BRE."
- **Ordin vs. conductor/"Orchestrator" library** — confirm distinct; resolve the wording overlap.
- **Fair-code licensing** is the intended public model — confirm before publishing license specifics.
- **Pitch deck quarantine** confirmed; **perf numbers** omitted until reproducible.
