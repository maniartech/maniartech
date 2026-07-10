# Inbox Dossier — GoCurl

> Collection doc (not a page yet). Source: local repo E:\Projects\go-libs\gocurl
> (README, go.mod; rich repo: VISION/OBJECTIVE/ROADMAP/SECURITY/specs/book). Status:
> **collected** — open Qs at bottom.

## STATUS
**INTERNAL now → OSS later** (per Aamir). README says **pre-1.0, active dev**, MIT.
Built to scratch a real daily itch (the team integrates many REST APIs that only ship
curl/JS/Python examples).

**Classification:** ManiarTech® **Labs** — Open-source Go library + CLI (eventual).
**One-liner:** Paste any curl command from any API doc **straight into Go** — test it in
the shell, run the *exact same* command in your code. A curl-ergonomic HTTP client (and
CLI) on `net/http`. **It just works.**

**Origin story (relatable, strong):** "Every REST API documents itself with curl
(+ JS/Python). Almost none ship a Go SDK for their long-tail endpoints. So we made the
curl command *be* the Go code — no mental translation to `http.NewRequest`, headers, body
encoding, auth." Removes the integration tax every Go dev pays.

---

## 1. Identity

| Field | Value |
|---|---|
| Name | GoCurl |
| Type | curl-ergonomic HTTP client **library + CLI** (shared syntax) for Go |
| Import | `github.com/maniartech/gocurl` · CLI: `cmd/gocurl` |
| Author | ManiarTech® |
| License | **MIT** |
| Go | 1.22+ |
| Built on | stdlib `net/http` (+ golang.org/x/net for HTTP/2; brotli; godotenv) — lean |
| Status | **pre-1.0, active dev** (parser flag coverage expanding); internal for now |

## 2. The key distinction (per Aamir + README)

**NOT a "curl → Go code converter."** It doesn't generate boilerplate you paste and edit.
It **executes the curl command directly** at runtime (or via CLI), returning a standard
`*http.Response`. The curl command literally *is* the code. One syntax for shell AND Go.

## 3. What it does (API surface)

- Entry points take a curl command (one string OR separate argv tokens) → `*http.Response`:
  `Curl(ctx, ...args)`, `CurlString` (body+resp), `CurlJSON` (decode into struct),
  `CurlBytes`, `CurlDownload` (stream to file).
- **Variable substitution:** `$VAR`/`${VAR}` from env auto-expand; or pass an explicit,
  testable `Variables` map via `*WithVars` (avoids pulling process env). `.env` via godotenv.
- **CLI** mirrors the library exactly: `gocurl -H "Authorization: Bearer $TOKEN" <url>`,
  `-X POST -d`, `-o file`, etc.

## 4. "Takes care of everything curl can do with HTTP" (coverage)

Targets the HTTP/HTTPS flags that appear in real API docs: methods (`-X`), headers (`-H`),
data/body (`-d`), form + file upload (`-F`), basic & bearer auth (`-u`), output to file
(`-o`), **TLS** (`--cert`, `--key`, `--cacert`, `-k`), **proxies** (`-x`, incl. **SOCKS5**),
**compression** (`--compressed`; brotli). Plus (from repo files): **HTTP/2**, redirects,
retry, cookies, middleware, security hardening, verbose mode. Deliberately **excludes**
curl's non-HTTP protocols (FTP/SMTP…) and flags that don't map to HTTP API usage.

## 5. Engineering signals (repo shows real depth)

Extensive test suite (parity, race/concurrent, internal, fuzz-ish parity tests, benchmarks),
**SECURITY.md** + security tests, TLS feature/enhancement tests, middleware system,
client pooling, retry, error classification, a **tokenizer/parser** for curl syntax, and
**design.md / objective.md / VISION / ROADMAP + a "book"**. Same disciplined-docs +
honest-status pattern as the other ManiarTech Go libs.
- Honest scoping (README): "at its best where HTTP is glue, not the hot path; for a
  high-throughput production client, hand-tune `net/http`." Keep that honesty.

## 6. Positioning / relationships

Strengthens the **"ManiarTech Go developer-experience toolkit"** cluster:
**Booster** (dev env) · **gowork** (workspaces) · **gocurl** (API integration) ·
**signals/orchestrator** (concurrency). Theme: *we build the Go tooling we wish existed.*
SEO: "curl to go", "go http client curl", "run curl in go", "curl command go library",
"golang api integration curl". Niche, high-intent, ownable.

## 7. Site placement

Labs entry; **teaser until OSS** (Aamir's bar) — but it's an easy, demoable, relatable
win (paste a GitHub curl → working Go in 3 lines). Good feature page when published; credit
**ManiarTech Lab**. No install links until public.

## 8. Open questions for Aamir

- [ ] OSS timing + first public version (pre-1.0 now).
- [ ] Group under a "Go DX toolkit" with Booster/gowork, or stand alone?
- [ ] OK to tell the origin story ("APIs only ship curl/JS/Python, not Go SDKs")?
- [ ] Lab attribution wording.
- [ ] Confirm MIT stays at release (vs other licenses in the portfolio).
