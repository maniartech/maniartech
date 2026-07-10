# Inbox Dossier — Printeer

> Collection doc (not a page yet). Source: local repo E:\Projects\printeer
> (README, package.json, CHANGELOG, docs/). Status: **collected** — open Qs below.

**Classification:** ManiarTech® **Labs** — Open-source tool. **PARTIALLY PUBLISHED**
(npm v1.2.15 is live but rough; a much-improved version is in progress, unreleased).
**One-liner:** Convert any web page to a pixel-perfect PDF or high-quality PNG —
one command, CLI or Node library. Puppeteer/headless-Chrome done right.

---

## 1. Identity

| Field | Value |
|---|---|
| Name | Printeer 🖨️ |
| Type | Web-to-PDF/PNG conversion — **CLI + Node.js library** (dual use) |
| Lang | TypeScript (ESM) |
| Engine | Puppeteer ^25 / headless Chromium |
| Author | Mohamed Aamir Maniar / ManiarTech® |
| License | **Apache-2.0** |
| Repo / npm | github.com/maniartech/printeer · npm `printeer` |
| **Published** | npm **v1.2.15** (2026-02-20) — the "baseline release" |
| **Current (unreleased)** | branch `jun26-fixes` — **launch-readiness remediation** (see §4) |
| Node | published needs ≥20; new packaging sets engines ≥18 |
| Runtimes | Node 16.8+ (full), **Bun** 1.0+ (supported), **Deno** 2.0+ (experimental) |

## 2. Positioning / hook

"Web-to-PDF/PNG conversion **done right**." Tagline: "Convert any web page to
pixel-perfect PDFs or high-quality screenshots with a single command."
- **Zero config**, sensible defaults; auto-detects PDF vs PNG from file extension.

## 3. Features (current/target version)

- **PDF & PNG** output; format auto-detected from extension.
- **Device emulation:** mobile (iPhone-like 375×812 @2x touch), tablet (iPad-like),
  custom viewports.
- **Full-page capture** incl. scrolling + lazy-loaded content.
- **Batch processing:** hundreds of URLs from `jobs.json`, concurrency control,
  `--continue-on-error`.
- **Auth:** basic auth, cookies, custom headers.
- **Wait strategies:** `--wait-selector`, `--wait-until networkidle0` (SPA-friendly).
- **PDF options:** format, orientation, margins, print-background.
- **`printeer doctor`** — built-in environment diagnostics (Node, Chromium, display
  server, fonts, sandbox). *(Nice differentiator — most tools don't self-diagnose.)*
- **Dual use:** clean CLI + programmatic API (`DefaultBrowserManager` for browser pooling).
- **Config files** (`.printeerrc.json`, cosmiconfig) + env vars.

## 4. The "improved a lot" story (published vs current)

⚠️ **The PUBLISHED v1.2.15 has real, documented bugs.** The current branch is a
**launch-readiness remediation** — each fix backed by an automated regression test
(docs/bug-fixes/). Fixed since published:
- Library API 2-arg call `printeer(url, output)` threw `TypeError` (waitUntil) — fixed.
- CLI `--version` always printed `1.0.0` — fixed.
- `--quiet doctor` errored; browser-pool lazy init always fell back to oneshot;
  bare-array `jobs.json` rejected; failed jobs returned exit 0; fail-fast leaked an
  unhandled rejection; surprising default `--output-dir ./output` removed.
- Packaging hardened (files allowlist, prepublishOnly build, no source/tests in tarball);
  license metadata corrected to Apache-2.0.

→ **IMPLICATION FOR THE SITE:** do NOT drive people to `npm i printeer` until the
improved version ships — the live version would underwhelm and contradict our
"engineering done right" brand. Options in §7.

## 5. Use cases / SEO

Automated report/invoice generation, web→PDF archiving, screenshot services,
PDF microservices, CI document generation, thumbnailing. Pairs with **Documentor AI**
(doc generation) and could underpin a **Taj Mahal Spaces** / Processious feature.
SEO: "html to pdf", "web page to pdf cli", "puppeteer pdf", "headless chrome screenshot",
"batch url to pdf", "node pdf library".

## 6. Honesty / status framing

- It's an **underdog mid-overhaul** (Aamir's words: "current published version is not
  great, improved a lot"). Be honest: present as **actively-developed**, not as a
  finished flagship. Don't cite the live version's quality.
- Apache-2.0 (note: different from MIT items — fine, just track licenses).

## 7. Site placement options (decide at `_ia` phase)

Because published ≠ current quality:
- **(A) "Coming soon / major update in progress" Labs card** — show the concept &
  `doctor`/batch differentiators, link to GitHub repo (active), but DON'T headline the
  npm install until the improved release lands. *(Recommended — like UExL handling.)*
- **(B) Full page, gated on the new release** — write now, publish page on release day.
- **(C) Omit until the improved version ships.**
Recommendation: **(A)** now → flip to **(B)** full page when the overhaul releases.

## 8. Open questions for Aamir

- [ ] **Target release date / version** for the improved Printeer? (Gates teaser vs full.)
- [ ] Until then: OK to show a teaser that links the GitHub repo but NOT push npm install?
- [ ] New version number on release (1.3.x? 2.0?) — and is it a rename/rebrand at all?
- [ ] Any hosted/SaaS ambition for Printeer (a "PDF API" product), or pure OSS tool?
- [ ] OK to mention Bun/Deno support as a selling point?
