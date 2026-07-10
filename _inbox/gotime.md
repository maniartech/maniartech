# Inbox Dossier — GoTime

> Collection doc (not a page yet). Source: local repo E:\Projects\gotime\gotime
> (README, go.mod, RELEASENOTES). Status: **collected** — open Qs at bottom.

**Classification:** ManiarTech® **Labs** — Open-source Go library. **PUBLISHED**
(v2.0.3); **new version ready & coming soon** (per Aamir).
**One-liner:** Intuitive date/time manipulation for Go — extends the standard `time`
package with human-friendly formatting, parsing, relative time, and business-date math.

---

## 1. Identity

| Field | Value |
|---|---|
| Name | GoTime 🕐 |
| Type | Go library — ergonomic layer over the stdlib `time` package |
| Import | **`github.com/maniartech/gotime/v2`** (v2 module path) |
| Author | ManiarTech® |
| License | **MIT** |
| Go version | **1.13+** (go.mod declares 1.19); **TinyGo compatible*** (embedded/WASM) |
| Deps | **Zero** (stdlib only) |
| Stars | ~42★ (per earlier GitHub scan — confirm at build) |
| **Status** | **PUBLISHED v2.0.3** (Dec 2025); **next version ready, coming soon** |
| Repo | github.com/maniartech/gotime |

## 2. Positioning / hook

- **Tagline:** "Intuitive time manipulation for Go — making date/time operations as
  simple as they should be."
- **The pain it kills:** Go's cryptic reference-time formatting (`2006-01-02 15:04:05`).
- **The fix — NITES:** human-readable format specifiers (`yyyy-mm-dd hh:ii:ss`).
  *(NITES = their named format-specifier system; distinctive, documented concept.)*

## 3. Key features (for the page)

- **Intuitive formatting:** `Format(t, "mmmm dt, yyyy")` → "July 7th, 2025". No more
  `2006-01-02`.
- **Smart parsing:** `Parse("07/07/2025", "mm/dd/yyyy")`.
- **One-line conversion:** `Convert(val, fromFmt, toFmt)` — parse+format in one call.
- **Human relative time:** `TimeAgo(t)` → "5 minutes ago" / "Next week" (replaces ~15
  lines of stdlib code).
- **Business-date math:** `WorkDay(1, t)`, `NetWorkDays(start, end)`, business calendar,
  quarters, weekday counts, age calculation, ranges, relative functions.
- **Date arithmetic helpers:** `Days(10, t)`, etc.

## 4. Quality signals (strong)

- **100% test coverage**, **250+ test cases** (badges in README).
- **Zero dependencies** (stdlib only — supply-chain clean).
- **TinyGo compatible*** — runs in embedded & WebAssembly (core lib; test helpers use
  reflect/runtime and aren't TinyGo, but end users don't need them).
- "Production ready — used in real-world applications."

## 5. v2 story (modernization — same honest-engineering thread as signals)

v2.0.0 (Jul 2025) = "complete architectural modernization" aligning with Go best
practices — notably **eliminated panic anti-patterns** (v1 panicked on bad user input;
v2 returns errors). v2.0.3 finalized the v2 module-path migration. → Reinforces the
Labs narrative: ManiarTech refactors toward correctness/idiomatic design, not just
features. **A newer version is ready and coming soon** (get specifics from Aamir).

## 6. Use cases / SEO

Web APIs (consistent date formatting), reports (human timestamps/ranges), business logic
(working days, invoices, schedules), data processing (format conversion), UIs ("2 hours
ago"). SEO: "Go time formatting", "golang date format", "go time ago library",
"golang business days", "go date parsing", "humanize time go".

## 7. Site placement

Labs entry, **PUBLISHED & linkable now**. Clean, broadly-relevant utility (every Go dev
fights `2006-01-02`), so it's an easy, relatable proof point. Page shape: hero (intuitive
Go time) → the `2006-01-02` pain vs NITES → key features (format/convert/TimeAgo/business)
→ quality (100% cov, zero deps, TinyGo) → links (GitHub/pkg.go.dev) → cross-sell to Go
services. Decide whether to write to current v2.0.3 or the imminent new version.

## 8. Open questions for Aamir

- [ ] **New version** — version number, ETA, and headline new features? (Write page to it
      now & gate go-live, or describe v2.0.3 and update on release?)
- [ ] Confirm star count to cite (~42) or omit.
- [ ] OK to feature **NITES** by name as a branded concept?
- [ ] Any nameable adopters / "used in real-world applications" specifics?
