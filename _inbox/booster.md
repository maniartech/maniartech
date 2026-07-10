# Inbox Dossier — Booster

> Collection doc (not a page yet). Source: local repos E:\Projects\booster +
> E:\Projects\booster-hub (READMEs, IP-CONFIDENTIAL.md) + 2 TUI screenshots.
> Reviewed with Aamir's explicit permission. Status: **collected** — open Qs below.

## ⚠️ CONFIDENTIALITY / STATUS
- **Booster core is currently PROPRIETARY & CONFIDENTIAL** (carries ManiarTech
  IP-CONFIDENTIAL notice; all rights reserved; trade secret). **Open source is the
  EVENTUAL plan — NOT now.** Launching "soon" (internal → public).
- **Used internally across MULTIPLE ManiarTech projects already** (real dogfooding —
  confirmed by Aamir 2026-06). Concrete named example: **Tallery Gallery's** dev
  environment runs on Booster (`tg_container/booster.yaml` + session logs). This is part
  of ManiarTech's deliberate **dogfood-first → then market** model (see [[tallery-gallery]]
  and the maturation-model note in TRUST-STRATEGY.md).
- **PUBLIC-COPY GUARDRAILS:** until it's public, do NOT publish repo links / install
  commands / internal architecture. The screenshots also show a *different* internal
  client project (a real-estate sales app: django/postgres/minio, property names) used
  merely as Booster's demo workload — **those client/project names must NOT appear in
  any public copy.** Booster's page is about Booster, not the demo stack.

**Classification:** Likely a **Product** (commercial-intent developer tool), not a Labs
OSS library — even though it'll be open-sourced later. Has an **open companion**
(booster-hub) → an open-core shape.
**One-liner:** A dev-environment orchestrator — provisions *and* supervises your whole
local stack from one `booster.yaml`, in a fast keyboard-first TUI. One command to
onboard, one place to run everything.

---

## 1. What Booster IS (my understanding)

A cross-platform **Go** tool (Go 1.24+) that **provisions and supervises** a local dev
stack from a single `booster.yaml`. It:
- **Provisions:** `booster init <url>` fetches a config → review → `booster install`
  **clones the workspace repos and sets up runtimes** (via mise; `booster doctor --fix`
  installs core tools like git/mise).
- **Supervises:** starts/stops/restarts processes, handles restart policies, dependency
  ordering, and readiness gating — then streams logs and shows live metrics.
- **Presents:** a fast, keyboard-first **TUI service supervisor** (the "BOOSTER" UI in
  the screenshots) — table of services with status/PID/port/uptime/CPU/MEM, unified +
  per-service log views, contextual footer, help screen, native terminal nav + mouse.

**The two problems it solves:**
1. **Onboarding:** "clone N repos, install the right runtimes, start everything in the
   right order" → collapses to `booster init` → `booster install` → `booster`.
2. **Daily dev:** one terminal UI to run/observe your entire multi-service stack
   (native processes AND Docker Compose services together).

## 2. Capabilities (from README + screenshots)

- **Commands:** `booster` (TUI), `init`, `install`, `doctor [--fix]`, `verify`
  (config-defined verification stages), `wait` (CI readiness gate), `status`, `stop`,
  `logs`, `--headless` (no TUI, exposes an **HTTP control API**).
- **Config (`booster.yaml`):** services with `command` (argv or string; string form
  **rejects shell operators `&& | > < ;`** — security-conscious), `workdir`, `env`,
  `restart`/`max_restarts`/`restart_delay`, `depends_on` (Docker-Compose-like conditions),
  readiness (`ready_tcp` for deterministic gating).
- **Manages mixed stacks:** screenshot shows a native app ("Webapp", port 5173) +
  a **Docker Compose** group (django :8000, postgres :5432, minio :9090) supervised
  together, with per-service CPU/Mem/uptime and a live log stream (even surfacing
  app-level query timings).
- **CI-friendly:** `wait`/`verify`/headless API make it usable in pipelines, not just
  interactively.
- Cross-platform: Windows, Linux, macOS.

## 3. booster-hub (the OPEN companion)

- **Public catalogue of real-world Booster configs** for open-source projects — a
  "developer learning platform," explicitly **not** a Kubernetes/Compose production
  replacement (dev + onboarding focus).
- Two tiers: **verified/** (Booster team personally installs+runs cross-platform; weekly
  CI watches regressions) and **community/** (contributed, no CI guarantee).
- Each verified project carries `verify.sh` + `check-latest.sh` (validate setup; flag
  upstream version bumps). First-wave targets: grafana-stack, outline, plane.
- Status: **bootstrap** — skeleton, contribution contract, CI scaffold, verifier exist;
  no verified configs added yet.
- Module path referenced: `github.com/maniartech/booster/cmd/booster` (for when public).

## 4. Positioning vs alternatives

- **vs Docker Compose:** Compose only orchestrates containers; Booster also **provisions**
  (clones repos, installs runtimes) and supervises **native processes** alongside Compose
  — covering the whole "get a new dev productive" journey, not just container runtime.
- **vs Make/scripts/README setup:** replaces brittle onboarding docs with one reviewable
  config + a supervising UI.
- **vs Kubernetes:** explicitly NOT production orchestration — it's a **local dev**
  experience. (Keep this honest scoping; it's a strength, not a limitation.)
- Closest comparisons (for our framing, not necessarily on-page): Tilt, Foreman/Procfile,
  Tilt/Garden/DevSpace, mprocs/overmind — Booster's angle is provisioning + onboarding +
  TUI + cross-platform in one Go binary.

## 5. Brand value

- **The ultimate dogfooding proof:** "the tool we built to run our own projects, now
  yours." Reinforces the engineering-depth story and pairs with the OSS narrative.
- Fits the recurring theme: ManiarTech builds the **foundational tooling** others just
  assemble. Another "we make technology" data point (a dev-tooling product this time).
- Open-core trajectory (proprietary core → open source + open booster-hub catalogue)
  mirrors the IO/Taj Mahal pattern.

## 6. Site placement (decide at `_ia` phase)

Because it's pre-public: **teaser now, full launch later** (same handling as UExL/Printeer).
- **Now:** a "coming soon" Product/Labs card — the TUI screenshot is a GREAT visual; show
  the value prop (one config, whole stack, onboarding in one command) WITHOUT repo/install
  links and WITHOUT the demo stack's client names.
- **On launch:** full page (and decide Product vs Labs once licensing/pricing is settled).
- Strong demo asset: the TUI is screenshot/video-friendly — like WebDoodling, give it
  rich media when ready.

## 6b. PRODUCT STRATEGY — enterprise open-core (DECIDED direction, Aamir 2026-06)

Aamir: *"Is Booster good for product? Maybe later. I want to introduce it for enterprise
clients."* → Recorded direction + my frank assessment:

**The honest read (critique, per Aamir's "critique me frankly"):**
- ❌ **As a standalone mass-market dev tool, it's a HARD bet.** Dev-environment
  orchestration is crowded (Docker Compose, Dev Containers, Tilt, Garden, Gitpod, Coder,
  Daytona, DevPod, Nix/devbox…), much of it free or VC-funded. Developers resist *paying*
  for env tooling ("we'll just use compose"), and winning the category needs heavy
  DevRel/distribution — **ManiarTech's known weakness.** The "and much more" differentiator
  vs Compose+Dev Containers is **not yet crisply defined** — that gap must be closed before
  it's a real product.
- ✅ **As an ENTERPRISE capability + eventual OPEN-CORE, the instinct is right and
  de-risked.** It rides the existing services relationship (no cold dev-tool marketing);
  enterprises genuinely budget for dev-onboarding / golden-path / internal-developer-
  platform work (what Coder / Gitpod Enterprise / Humanitec / Backstage sell); and it's
  proof-of-competence ("we run every ManiarTech product on it" — dogfood-first credibility),
  which sidesteps the OSS-stars trap.

**DECIDED shape:**
1. **Now:** Booster = **capability / dogfood proof**, NOT a product page. Internal-labeled
   dev-tool in Labs ("the orchestrator we built and run our own products on"). No
   availability/pricing claims (proprietary + pre-launch) — Governing Rule #1.
2. **Later (open-core, mirrors Taj Mahal SSG ↔ Spaces):** OSS/free core for *awareness*
   (distribution unlock) + an **enterprise edition / engagement** for revenue
   (standardization, golden paths, support). Reach + margin without a pure dev-tool
   monetization bet.
3. **Sequence AFTER** the framework + flagship products — Booster productization does not
   jump the queue. "Maybe later" is the correct call.
4. **Gate:** before it's ever an enterprise product, answer *"what is the 'and much more'
   that beats Compose + Dev Containers?"* — that single answer decides product vs.
   very-good-internal-tool.

## 7. Open questions for Aamir

- [x] **Product or Labs?** → **RESOLVED (direction):** future **enterprise open-core
      PRODUCT** (OSS core + enterprise edition/engagements); for NOW, presented as
      capability/dogfood proof in Labs, no product page. (See §6b.)
- [ ] **Define the "and much more" differentiator** vs Docker Compose + Dev Containers —
      the single most important thing to nail before productizing. (NEW — top priority.)
- [ ] **Launch timing** + first public version; open-source license at that point?
- [ ] Name/branding final ("Booster")? Tagline preference?
- [ ] OK to use the **TUI screenshot** publicly if we scrub the internal demo project
      (replace "Sales Navigator"/property names with a neutral sample stack)?
- [ ] Is **booster-hub** part of the public story at launch, or later?
- [ ] Any metric we can cite ("used across N internal ManiarTech projects")?
- [ ] Relationship to Taj Mahal Spaces / Processious infra — any product synergy to tell?
