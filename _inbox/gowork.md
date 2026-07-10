# Inbox Dossier — gowork

> Collection doc (not a page yet). Source: local repo E:\Projects\go-libs\gowork
> (README, go.mod, docs/). Status: **collected** — open Qs at bottom.

## STATUS
**INTERNAL now → OSS later** (per Aamir: "once satisfied with the output we may open
source it, with mention for the Lab"). Built to scratch a real ManiarTech itch (the team
works with Go workspaces often).

**Classification:** ManiarTech® **Labs** — Open-source Go CLI tool (eventual).
**One-liner:** Modern, friendly tooling for **Go workspaces** — a beautiful, consistent
CLI that wraps the clunky `go work` experience and adds the workflow commands Go leaves out.

**Origin story (genuine, relatable — great for the page):** "We work with Go workspaces
all the time, but `go work`'s commands and handling aren't user-friendly. So we built the
tool we wished existed." Classic scratch-your-own-itch dev tool — credible and likeable.

---

## 1. Identity

| Field | Value |
|---|---|
| Name | gowork |
| Type | CLI tool for managing Go **multi-module workspaces** (`go.work`) |
| Import | `github.com/maniartech/gowork` |
| Author | ManiarTech® |
| License | MIT (assumed; confirm) — internal for now |
| Go | **1.24** |
| Stack | **cobra** (CLI) + **charmbracelet/lipgloss** (styled TUI output) + **golang.org/x/mod** (go.mod/go.work parsing) + **modernc.org/sqlite** (pure-Go cache) |
| Status | Internal, pre-1.0, active dev (roadmap toward v1.0 + post-v1.0 diagnostics) |

## 2. The problem it solves

Go's native `go work` is minimal and awkward: manual `go.work` editing, fiddly local
`replace` management, no friendly multi-module workflows, no diagnostics. Teams running
several interdependent modules feel this constantly. gowork wraps it in a **consistent,
well-designed CLI** with the higher-level commands Go omits.

## 3. Command surface (rich — a real engineered tool, not a `go work` wrapper)

From docs/requirements/commands/: **init**, **add**, **remove**, **up** (flagship daily
workflow), **doctor** (diagnose + auto-fix; absorbed the old `check`), **explain** (per-code
docs), **link** (local `replace` management), **mod** (module lifecycle, e.g. `mod align`),
**modularize** / split / join (monorepo ⇄ multi-module migration), **vendor**, **tidy**,
**cache**, **eject**. Serves both **developers** (daily `up`/`doctor`) and **CI**
(`doctor --ci`, JSON gates).

**`gowork up` (flagship)** — one command to get a multi-module workspace ready:
`go work sync` + **dependency-ordered tidy** (builds the module DAG, **topological sort
into layers**, **parallel within each layer**) + lightweight health checks. Clever detail:
local resolution is **ephemeral** — it temporarily patches each `go.mod` (or uses a
temporary `-modfile`) around sync/tidy and restores originals, so **no persistent edits**
and no accidental committed local replaces. Backed by a **SQLite cache** (parsed go.work/
go.mod, dependency graph) for 5–60× speedups on warm runs. `--changed-only` (git-aware),
`--json`, `--tidy`.

**`gowork doctor`** — the diagnostic+repair brain, 3 modes: `doctor` (full read-only scan),
`doctor --fix` (auto-repair), `doctor --ci` (fast structural gate; replaced the old
`check`). Detects AND fixes: **local replaces** (moves them to go.work, tags `// gowork:dev`),
**missing/orphaned modules** (prunes broken `use`, adds discovered modules), **vendor drift**
(re-vendors), **unreferenced replace/exclude directives** (removes), **Go-version drift**
(`--align-go-version`), and **circular dependencies** (DFS cycle trace + suggested break;
manual-only). Idempotent, atomic writes, dry-run, `--json`.

## 4. Quality / design signals (genuinely production-grade — upgrade assessment)

The requirements docs are exceptionally rigorous — this is NOT a weekend utility:
- **Design-system-driven CLI:** semantic color tokens (hex + ANSI fallbacks), typography
  tokens, Unicode icons with ASCII fallbacks, **lipgloss**; strict **NO_COLOR / non-TTY /
  CI** handling and accessibility (never rely on color alone). Dedicated CLI_UI_GUIDE,
  DESIGN_SYSTEM, cli_guidelines docs.
- **Unix-grade CLI contract:** unified **exit codes** (0/1/2/3, plus 64 usage, 130 SIGINT),
  STDOUT/STDERR separation, **stable-sorted JSON** with backward-compat guarantees,
  non-interactive/CI-safe prompts, `--dry-run`/`--yes`/`--force` safety.
- **Engineering depth:** dependency DAG + **topological sort (Kahn's)**, **DFS cycle
  detection**, layer-parallel execution with bounded concurrency, **SQLite cache** with
  middleware-managed invalidation, atomic temp-file+rename writes, `.gitignore`-aware
  scanning, cross-platform path handling (Windows drive letters), idempotency + read-only
  guarantees, performance targets (<2s warm / <5s cold for 50 modules).
- **Architecture principles:** KISS / SRP / "don't reinvent" (reuses `golang.org/x/mod`),
  shared `internal/core/*` APIs with **no command-to-command imports** (acyclic), interface/
  DI design, extensive test fixtures per detector. Multiple coverage profiles in repo.
- **Honest scoping & helpful errors:** every error wraps action context + a copyable repro
  (`cd <dir> && go <cmd>`) + a suggestion — the same DX-care ethos as Booster's TUI.

→ **Revised take:** gowork is a *flagship-quality* developer tool, on par with Booster as
proof of deep DX/tooling capability — not a minor utility. Treat accordingly on the site.

## 5. Positioning / relationships

- Joins **Booster** (dev-env orchestrator), **conductor/orchestrator** (task orchestration),
  **signals** (events) as ManiarTech's **Go developer-tooling / DX** cluster. There's a
  clear theme: *ManiarTech builds the Go tooling it wishes existed.*
- Niche but real audience: Go teams with multi-module workspaces (growing pattern).
- SEO: "go workspace tool", "go.work manager", "go multi-module workspace", "go work cli".

## 6. Site placement

Labs entry, **teaser until OSS + satisfied with output** (Aamir's bar) — but on quality,
this deserves a **proper feature page**, not a footnote. The before/after `up` story
(15-min morning routine → 5 seconds) and `doctor --fix` self-healing are vivid,
screenshot/demo-friendly proof. Explicitly credit **ManiarTech Lab** (Aamir's ask). Pairs
with Booster + gowork as the "Go DX toolkit" cluster. Don't push install links until public.

## 6b. Residue noticed (→ RECONCILIATION)
`gowork check` was **absorbed into `gowork doctor --ci` (2026-03-05)**; check.md retained as
"historical." The bare README/older command lists still imply a separate `check`. Align all
docs/site copy to the current `doctor --ci` (one diagnostic command).

## 7. Open questions for Aamir

- [ ] License (MIT?) + open-source timing ("once satisfied with output").
- [ ] Confirm desired framing: standalone tool, or part of a "ManiarTech Go DX toolkit"
      grouping with Booster/orchestrator/signals?
- [ ] Name final ("gowork" — clean; any collision concerns? it's descriptive/ownable enough).
- [ ] OK to tell the honest origin story ("go work isn't friendly, so we built this")?
- [ ] Lab attribution wording you want ("from ManiarTech Lab").
