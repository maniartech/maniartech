# Ordin — Dossier

> **Ordin is a standalone, plugin-driven workflow / job automation engine** (think
> "open, Go-native n8n / Zapier-class engine") — its own product/system with its own
> repo, NOT merely a Processious subsystem. Processious *consumes* Ordin as its
> background-automation engine (the `ordin/` folder in `prcs-v2` is only the integration
> placeholder). Aamir (2026-06): "still under development, but the core infrastructure is
> already implemented."

- **Type:** Product / engine (commercial-leaning, **fair-code** licensed — see license).
  Doubles as the automation engine inside Processious. Aamir earlier called it the
  "Process Orchestrator."
- **Category:** Declarative, plugin-based **workflow / job orchestration & automation
  engine**. YAML-defined workflows; event-driven; pluggable activities.
- **Language/stack:** Go (single-binary, cross-platform), Cobra CLI, YAML workflows with
  dynamic tags + template + expression engines.
- **Repo:** `\\wsl.localhost\Ubuntu\home\aamir\projects\processious\ordin` (separate Go
  workspace; own `.git`).
- **Sourcing:** repo `README.md`, `docs/WORKFLOW_ENGINE_ROADMAP.md` (the honest current-
  state doc), `specs/` (SRS, intro, competitors), `TODO.md`, plugin READMEs, `LICENSE`.

---

## What it is

Ordin executes **YAML-defined workflows** through a **pluggable activity system**.
Events start execution (timers, cron, webhooks, file watchers, system events); activities
do the work through plugins (shell, HTTP/ping, file I/O, mail, expressions, state
updates); YAML values are made dynamic via **tags, expressions, templates, and env/state
references**. The runtime coordinates state, results, errors, lifecycle, and
output-based routing (including conditional fan-out to multiple downstream nodes).

Compact, readable workflow syntax — the public surface:
```yaml
flows:
  - timer: ping_server
  - ping_server.success: [reset_failure_count, update_log]
  - ping_server.failure: log_failure
```

**Architecture (host → loader → plugin):** the Ordin host scans for plugins; for each, it
finds a loader for the plugin type, loads/verifies/gets/sets-up the plugin; a workflow
manager loads definitions and an orchestrator drives the workflow graph against managed
run state. Core building blocks: `ordin` executable + CLI, plugin core (types + registry),
workflow manager, workflow state, orchestrator, plugin loader, YAML tags, template engine,
expression engine.

**Implemented plugins (real, in-repo):** `expr` (expression eval), `fileio`, `pinger`
(HTTP/network checks), `scheduler` (cron/timer), `shell`, `template`, `mjml` (email
markup), plus the native Go plugin adapter (`plugins/core/adapters/native`). Planned
loaders (TODO): JS, Python, WASI, Java, .NET — only **native Go** works today. Planned
plugins: WebHook, Slack, Email, SMS.

---

## Status — honest, from the repo's own roadmap

Aamir: "still under development, core infrastructure already implemented." The repo's
`WORKFLOW_ENGINE_ROADMAP.md` is admirably candid (another instance of the honest-
engineering ethos — it even has a "Documentation Cleanup" task: *"some older documents
describe future capabilities as if they already exist… separate implemented behavior from
proposals"*).

**Direct quote:** *"The workflow runtime is no longer just a prototype, but it is not best
in class yet."*

- ✅ **Implemented:** event-to-activity execution; optional event-context injection;
  activity/event error propagation; compact-flow loader normalization; output-based
  routing; fan-out (one output → many nodes); result storage (`workflows.results`); native
  Go plugin loader + the working plugin set above; end-to-end tests for event-to-activity
  and conditional fan-out.
- 🚧 **Gaps the team itself lists (not yet done):** a first-class **workflow run model**
  (run IDs, run status, node-execution records, timing, cancellation); **observability**
  (still uses `fmt.Printf` in core paths — structured logging pending); **pre-execution
  validation**; a documented **plugin output/error contract**; **event lifecycle** for
  finite vs long-running workflows; **queue/concurrency policy** (worker count,
  backpressure, retry); doc consolidation.
- 📋 **Planned/aspirational:** JS/Python/WASI/Java/.NET plugin loaders; web UI; distributed
  execution; AI-agent flows; data-pipeline flows; persistence (SQL/NoSQL-agnostic).

> **Honest status label: "In development" (internal).** Core infra works; it is explicitly
> *not* best-in-class yet by its own assessment. Never imply it's a finished/production
> automation platform.

---

## License — fair-code (important, and a deliberate positioning)

`LICENSE` = **Fair Code** (faircode.io) — **source-available, not classic OSS.** This is
the **same model n8n uses**, and it's a smart, intentional choice: it signals "open and
inspectable, sustainably monetizable" rather than "free-for-all MIT." It positions Ordin
squarely against the **n8n / Zapier / Make / Workato / Tray.io** field (the repo's own
`competitors.md` lists exactly these). → On the site, describe it accurately as
**fair-code / source-available**, NOT as "open source / MIT." (RECONCILIATION item — most
other Labs items are MIT-ish; Ordin is deliberately different.)

---

## Naming & identity residue (RECONCILIATION)

1. **"Processious BRE" → "Ordin".** The older `specs/` and the pitch deck call it
   **"Processious BRE" (Business Rules Engine)**, gRPC-triggered, YAML rules. The current
   product is **"Ordin," a workflow/automation engine.** The concept evolved from a
   business-rules engine into a broader workflow orchestrator. Use **Ordin** as the single
   canonical name; don't surface "Processious BRE."
2. **Ordin vs. the standalone `conductor`/"Orchestrator" Go library** (separate Labs
   dossier — `conductor-orchestrator.md`). **Strong inference (CONFIRM with Aamir):** they
   are *distinct* — Ordin is a high-level YAML workflow-automation engine (n8n-class);
   conductor/Orchestrator is a low-level **goroutine/task orchestration library** (an
   in-process Go concurrency primitive). They could relate (Ordin might use such a library
   internally), but they're not the same product. Resolve the overlapping
   "orchestrator" wording so the site doesn't confuse them.
3. **Aamir's "Process Orchestrator" label** for Ordin vs. the engine's self-description as
   a "workflow automation engine / BRE." Pick one public phrase.

---

## ⛔ HONESTY RED FLAG — `specs/presentations/pitch-deck.md` is FABRICATED placeholder copy

**This file must NEVER be a source for site copy. It is the most dangerous file in the
repo for Governing Rule #1.** It's a template pitch deck stuffed with invented marketing:

- A fake **"ABC Corp" case study** — "90% optimal decision-making in just half a year."
- **"99.999% uptime and zero breaches… the Fort Knox of BREs."**
- Fabricated **sources** — McKinsey, Forbes, Gartner, TechRadar, "SaaS Benchmark Report,"
  "Cybersecurity Excellence Awards" — none real/verified.
- **Fake testimonials** — "CTO, NextGenTech," "CEO, Zenith Innovations," "reviews from
  ProductHunt and Capterra."
- A "150% increase in daily decisions" stat with a hand-wavy citation.

These are illustrative placeholders from an early deck, **not facts.** Flagging loudly so
none of it leaks into the website. → **RECONCILIATION: quarantine this file as
non-factual.** It's exactly the kind of unsourced superlative/fake-scale/fake-testimonial
the CLAIM AUDIT bans. (Same category as the Booster/MDKit template residues.)

> ✅ **Context from Aamir (2026-06):** this deck "was created long back as a probable
> visualization — not a ready-to-go-to-market asset," and "we'll never go to market with
> fabricated things." So it was an early exploratory mockup, never an intended claim. The
> quarantine stands purely as a guardrail so no placeholder line gets reused as copy by
> mistake — not as any doubt about intent. (This *confirms* Governing Rule #1 is the
> founder's own standard, which is the best possible footing for the whole site.)

**Also internal-only, not public:** the SRS performance figures — **"< 10ms latency,"
">10,000 events/second"** — are *design targets/aspirations*, not measured benchmarks.
Don't publish them as achieved numbers (and they happen to mirror the Engage targets, so
double-check we don't double-count them). If we ever cite performance, it must be
reproducible with method shown.

---

## Strategic significance

1. **Completes the Processious story.** Process automation is Processious's *primary*
   objective; Ordin is the engine that actually runs the long-running, scheduled,
   event-driven work. Showing Ordin = showing that ManiarTech built the automation
   substrate itself, not glued together someone else's.
2. **Another "we make technology, not just use it" proof.** A from-scratch,
   plugin-architected workflow engine in the n8n/Zapier weight class is serious systems
   engineering — capability-ceiling evidence for the Labs/Products narrative.
3. **Fair-code positioning is a distribution play.** Like n8n, a source-available workflow
   engine can build a developer community and inbound interest — *if* it's published and
   launched well (ties to DISTRIBUTION-STRATEGY). Today it's pre-release, so this is
   future upside, labeled honestly.
4. **Reinforces the ecosystem coherence:** Ordin (orchestration) + FUSE (API protocol) +
   Engage (behavioral policy) + the data layer = a genuinely integrated platform, all
   ManiarTech-authored.

---

## Site placement

- **Primary:** present Ordin as **Processious's automation/orchestration engine** within
  the Processious product story (and the Process-Automation service), labeled **"In
  development."** This is the honest, low-risk placement today.
- **Secondary (future):** Ordin has standalone-product DNA (fair-code, own repo, n8n-class
  competitor set). When it's published/launch-ready, it can graduate to its **own Product
  or flagship open/fair-code project** page. For now, a brief honest mention + "in
  development," not a full product page promising features.
- **Labs cross-link option:** if we have a "Go DX / engines" cluster, Ordin fits as the
  workflow engine, cross-linked to Processious and to conductor/Orchestrator (once their
  relationship is settled).
- **Hard rule:** ignore the pitch deck entirely; cite only the roadmap's
  implemented-list; use "fair-code," not "open source"; no performance numbers.

---

## Open questions for Aamir

- [ ] **Ordin vs. conductor/"Orchestrator" library** — confirm they're distinct (my
      inference), related, or to be merged. Resolve the "orchestrator" naming overlap.
- [ ] **Canonical public name & one-liner** — "Ordin" confirmed? Tagline: "workflow
      automation engine," "process orchestrator," or "job/automation engine"? (Drop
      "Processious BRE.")
- [ ] **How to present it now:** (a) only as Processious's engine, (b) a brief standalone
      "in development" mention, or (c) hold it back until launch? (I recommend (a)+(b):
      honest mention, no feature promises.)
- [ ] **Confirm fair-code licensing** is the intended public model (vs MIT/Apache). Happy
      to lean into the n8n-style "fair-code / source-available" framing?
- [ ] **OK to quarantine the pitch deck** as non-factual and ensure none of its claims
      (ABC Corp, 99.999%, fake sources/testimonials) ever appear publicly? (Strongly
      recommend yes.)
- [ ] **Performance numbers** — are <10ms / 10k-events-sec measured anywhere, or targets?
      (If we ever show them, need a reproducible benchmark; otherwise omit.)
- [ ] **Roadmap to publish/launch** — when does Ordin become public? That gates whether we
      tell any standalone story or keep it inside the Processious narrative.
