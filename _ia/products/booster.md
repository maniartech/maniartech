---
title: "Booster — a dev-environment orchestrator"
description: "Our dev-environment orchestrator — provisions a whole local stack from one config; we run our own products on it."
order: 50
productStatus: "Internal"
image: ""
---

# Booster — Draft v2 (depth-first; AUDIENCE EXCEPTION — dev-tool / engineer-facing, 2026-06)

> ★ ORDER for this page: **depth-first is correct here** (Presentation Doctrine "Know Your
> Audience" exception — this is a developer tool; engineers want the substance up front). BUT the
> page still leads with **the developer's problem** (onboarding pain), then what Booster does,
> **how it works concretely**, then the **dogfood proof** (we run our own work on it), honest
> **positioning** vs the tools a peer will already be thinking of, and finally **status + roadmap**.
> Honesty (Governing Rule #1) is the binding constraint: Booster is **proprietary + pre-public**,
> so NO repo links, NO install commands, NO availability/pricing claims. Open-core is the *stated
> future direction*, not a shipping fact. Every `[note]` = placeholder / verify / rationale.
>
> ⚠️ HARD GUARDRAILS (from inbox dossier — do not violate):
> - **No repo links, no `install`/module-path/clone commands.** Core is proprietary & pre-launch.
>   Architecture-level facts (binary, OS support, gating model) ARE safe to state — they're not the
>   sensitive CLI surface. Specific command *names* stay off-page until launch.
> - **TUI screenshots must be scrubbed** before publishing — the demo workload is a *real internal
>   client project* (real-estate app: "Sales Navigator", django/postgres/minio, property names).
>   Those client/project names must NOT appear anywhere. Booster's page is about Booster, not the
>   demo stack. Until a scrubbed asset exists, ship with the description, not the raw screenshot.
> - **Do NOT overclaim the "and much more" differentiator vs Docker Compose** — it is not yet
>   crisply defined (open question for Aamir). State only what is true and demonstrated. Naming the
>   neighbors (Tilt/Procfile/mprocs) honestly is allowed and expected; sweeping superiority is not.

---

## 1 · HERO  *(the developer's problem first — even on a depth page)*

# Booster — one config to run your whole local stack.

A new engineer joins. Before they can write a line of code, they clone several repos, install the
right language runtimes, and start a handful of services in the right order — following a setup
README that's usually a little out of date. **Booster turns that into one reviewable config:
provision the workspace once, then a single command brings the whole stack up** — in a fast,
keyboard-first terminal UI that runs and watches everything while you work.

> **Status: internal tool — in production on our own work.** Open-source core and an enterprise
> edition are the planned direction (not yet available).

`[FIXED (skeptic HIGH): no longer claims onboarding is literally "one command." The real flow is
provision-once (clone + set up runtimes) and then one command for the daily run — the hero now
scopes "one command" to the run step. Honest status label up front per Governing Rule #1. NO
download/install CTA — pre-public. Still leads with the developer's pain before the feature list.]`

---

## 2 · WHAT IT DOES  *(the substance — engineers want this)*

### Provision, then supervise — from one `booster.yaml`.

Most tools do one half of the job. Booster does both, for the two moments that actually slow a dev
team down:

- **Onboarding (provision).** Point Booster at a config and it clones the workspace repos and
  prepares the required language runtimes (runtime versions are delegated to a standard version
  manager — Booster orchestrates it, it doesn't reinvent it) — so "get a new developer productive"
  stops being a day of following a stale README.
- **Daily development (supervise).** One terminal UI starts, stops, and restarts every service in
  your stack — with dependency ordering, restart policies, and TCP-readiness gating — then streams
  logs and shows live status for everything in one place.

It runs **native processes and Docker Compose services side by side, supervised together** — so a
front-end dev server and a containerized backend group live in the same view, not two windows. This
unified native + Compose supervision is the part most single-purpose tools don't do.

`[FIXED (skeptic MED, "and much more" guardrail): the runtime line now says explicitly that version
setup is delegated to a standard version manager and Booster orchestrates it — pre-empting the
"so it's a wrapper around mise + a supervisor?" objection instead of implying Booster provisions
more than it does. All claims verifiable from the dossier (§1–§2). No specific command names.]`

---

## 3 · HOW IT WORKS, CONCRETELY  *(NEW — depth for the depth audience; no sensitive CLI surface)*

### The architecture, stated plainly.

For engineers evaluating this on substance, here's what Booster actually is — none of which leaks
the pre-public command surface:

- **A single static Go binary.** No runtime to install for Booster itself; drop it in and run.
- **Cross-platform** — Windows, Linux, and macOS.
- **Dependency-ordered startup.** Services declare what they depend on; Booster brings them up in
  order and won't start a dependent before its dependency is actually accepting connections.
- **TCP-readiness gating**, not just "process launched" — a service is treated as up when its port
  is ready, so dependents don't race a half-started backend.
- **Restart policies** per service, with live status, ports, uptime, and CPU/memory in the UI.
- **Native and Docker Compose under one supervisor** — both kinds of service in a single view.
- **Optional headless mode.** The same definition can run without the TUI and be driven
  programmatically — wait-for-ready / verify semantics that fit a CI pipeline, not just a laptop.

`[NEW SECTION — fixes skeptic MED "under-delivers depth for the stated audience" and the
oneBiggestProblem. Every bullet is architecture-level and verifiable-in-spirit from the dossier
(single Go binary; Win/Linux/macOS; depends_on conditions; ready_tcp gating; restart policies;
native+Compose; headless HTTP control / CI wait/verify). NONE of it names an install command or
module path, so it stays inside the hard guardrail. PLACEHOLDER - verify with Aamir: that
"headless mode for CI" is accurate to describe publicly as a capability (dossier lists a headless
HTTP control API + wait/verify) — keep this bullet only if confirmed safe to state pre-launch.]`

---

## 4 · THE TERMINAL UI  *(strongest demo asset — currently gated on a scrubbed screenshot)*

### Your whole stack, in one fast, keyboard-first view.

A single screen shows every service — status, port, uptime, and live CPU/memory — with unified and
per-service log views, full keyboard navigation, and mouse support. No tab-juggling across a dozen
terminals.

`[★ LAUNCH-BLOCKING MEDIA SLOT (skeptic HIGH — the #1 hole). For a depth audience the TUI is the
single strongest demonstrable asset, and shipping it as text-only converts the best proof into an
unverifiable claim. This is NOT an optional screenshot — treat the scrubbed TUI capture as a
launch dependency. DO NOT publish the existing screenshots: the demo workload is a real internal
client project (real-estate app — django/postgres/minio, "Sales Navigator", real property names).
PLACEHOLDER - needs Aamir (TOP DEPENDENCY): re-shoot the TUI against a neutral sample stack (no
client names) — screenshot or short screencast — and ship it here. Until that asset exists this is
the weakest part of an otherwise depth-first page; flag it as the top blocker.]`

---

## 5 · WE BUILT IT TO RUN OUR OWN WORK  *(the dogfood proof — the trust currency for a dev tool)*

### We run our own development on it, every day.

Booster exists because we needed it. It provisions and supervises the local stack behind our own
work — **Tallery Gallery's development environment is set up and run entirely by Booster** — and
we ship it to ourselves before we ship it to anyone else.

`[FIXED (skeptic MED — dogfood plural vs one named example). Old copy said "we run our PRODUCTS
(plural) on it" backed by a single small named example. Tightened to match the one CONFIRMED proof:
Tallery Gallery (Aamir, 2026-06; tg_container/booster.yaml + session logs). "Used internally across
multiple projects" is also confirmed but NOT given a count on-page.]`
`[PLACEHOLDER - needs Aamir / verify: a citable number ("runs the dev environments for N internal
ManiarTech projects"). IF Aamir confirms a real count, restore the plural: "runs the development
environments for N of our own projects, including Tallery Gallery." Until then keep the single
named proof. Do NOT invent a count.]`

---

## 6 · HOW IT COMPARES  *(honest positioning — name the neighbors a peer already has in mind)*

### Built for local development and onboarding — not production orchestration.

Booster is deliberately scoped to the developer's machine and the onboarding journey. It is **not**
a Kubernetes or production-deployment replacement, and we don't pretend it is — that focus is the
point.

A peer evaluating this will already be thinking of tools that do parts of it, so here's the honest
neighborhood:

- **Procfile runners (Foreman) and process multiplexers (mprocs / overmind)** run several local
  processes together. Booster does that too, and adds dependency ordering, readiness gating,
  restart policies, and a status-rich keyboard TUI — plus it *provisions* the workspace first.
- **Tilt** targets local development as well, but is oriented around Kubernetes / container
  workflows. Booster instead treats **native processes and Compose services as first-class
  together**, on a single cross-platform binary, without requiring a cluster.
- **Docker Compose** orchestrates containers. Booster also provisions the workspace (repos and
  runtimes) and supervises native processes *alongside* your Compose services.
- **vs a setup README + scripts** — one reviewable config and a supervising UI replace brittle,
  drift-prone onboarding docs.

Booster's specific angle is the **combination**: provision the workspace, then supervise native and
Compose services together, with readiness gating and a keyboard-first TUI, from one cross-platform
binary.

`[FIXED (skeptic MED — positioning gap). Now names the obvious neighbors (Foreman/Procfile,
mprocs/overmind, Tilt, Compose) honestly per dossier §4/§6b — pre-empting "isn't this just Tilt /
Procfile + a TUI?". Honesty about the crowded space reads as confidence. STILL no "and much more" /
sweeping-superiority claim — the crisp single differentiator is an open question (§6b/§7); only the
true combined scope is stated. PLACEHOLDER - verify with Aamir: that the Tilt/Foreman/mprocs framing
is accurate and that he's comfortable naming them. If he later defines the crisp differentiator, it
slots in HERE — not before. Consider adding devbox/Garden only if the contrast is genuinely true.]`

---

## 7 · WHERE IT'S HEADED  *(roadmap — stated as direction, not as shipping fact)*

### Open core, on the way.

Booster's core is proprietary today. The direction we've chosen is **open-core**: an open-source
core to make it freely usable, and an **enterprise edition / engagement** for teams that want
standardized golden-path onboarding, internal developer-platform work, and support. It follows the
same dogfood-first-then-open path we've taken with our other tooling — for example our
[Taj Mahal static-site generator] and the [Internet Object] data format.

We're not publishing a download or a date yet. When the core opens, this becomes a full product
page.

`[FIXED (skeptic LOW — "foundational tools" self-superlative dropped). Replaced the unbacked
"foundational" framing with two concrete, linkable examples (Taj Mahal SSG, Internet Object) so the
dogfood-first-then-open pattern is shown, not asserted. Open-core stated as DIRECTION (decided per
§6b), not as an available product. NO availability date, NO pricing, NO repo/booster-hub links.]`
`[PLACEHOLDER - needs Aamir / verify: (a) launch timing + open-source license; (b) whether
booster-hub — the open companion catalogue of real-world configs — is part of the public story at
launch or later; (c) final name/tagline; (d) confirm internal links exist for Taj Mahal SSG and
Internet Object on this site (wire the [bracketed] links to those pages). Hold (a)–(c) until
confirmed.]`

---

## 8 · CTA  *(low-commitment; gives the skeptic a path toward proof, no false availability)*

### Want to see Booster run — or run it in your team's workflow?

We're rolling it out beyond our own work deliberately. Two ways forward, neither implying it's
publicly available yet:

- **See it run** — request a short walkthrough of Booster supervising a live stack (the TUI, in
  motion, on a neutral sample project).
- **Talk to us** — if standardized dev onboarding or a golden-path developer environment is on your
  roadmap, tell us what you're running and we'll talk.

**[ See Booster run (request a walkthrough) → ]**   ·   **[ Talk to us about Booster → ]**   ·   [ Explore what else we've built ]

`[FIXED (skeptic LOW — CTA verifiability). On a page with no repo/install/screenshot links, the only
prior action was "talk to us." Added a low-commitment, NON-availability-implying primary action that
leads toward proof ("see it run / request a walkthrough") — the verification path that substitutes
for the missing inline screenshot. PLACEHOLDER - needs Aamir: confirm a walkthrough request is a
real, fulfillable offer (and where it routes). If a notify-list ever exists, "Get notified when the
core opens" can replace or join this. Omit any "notify me at launch" until a list/path actually
exists, to avoid implying imminent availability.]`

---

## Notes / what this draft deliberately does NOT do
- **Depth-first, but problem-led:** engineer audience gets the substance early (the doctrine's
  audience exception), yet §1 still opens with the onboarding pain so a developer sees themselves.
- **"One command" scoped honestly** — provision once, then one command to run; no compressing three
  steps into one for punch.
- **Concrete architecture stated** (new §3): single Go binary, cross-platform, dependency ordering,
  TCP-readiness gating, restart policies, native+Compose unified, optional headless/CI mode — all
  verifiable-in-spirit, none of it the sensitive CLI surface.
- **Neighbors named honestly** (§6): Foreman/Procfile, mprocs/overmind, Tilt, Compose — combined
  angle stated, no sweeping superiority.
- **No repo links, no install/CLI command *names*, no module path** — core is proprietary + pre-public.
- **No raw screenshots** — the TUI media is a *launch-blocking* gated asset (real client demo workload).
- **No "and much more" overclaim vs Compose** — differentiator undefined; only true comparisons shown.
- **No invented numbers** — dogfood stated to match the one confirmed name (Tallery); a citable
  project count is left as a placeholder.
- **No availability/pricing/date** — open-core is direction, not a shipping fact.
- **Open placeholders for Aamir:** scrubbed TUI screenshot (TOP) · citable internal-project count ·
  headless/CI claim safe to state pre-launch · Tilt/Foreman/mprocs framing accuracy · launch timing
  + OSS license · booster-hub's place at launch · internal links for Taj Mahal SSG + Internet Object
  · walkthrough-request is fulfillable · final name/tagline.
