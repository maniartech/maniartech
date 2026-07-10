# Inbox Dossier — NITES

> Collection doc (not a page yet). Source: local repo
> E:\Projects\research\nites\nites-specs (README spec, formal docx/PDF). Status:
> **collected** — open Qs at bottom.

**Classification:** ManiarTech® **Labs** — **Research / specification** (a standard,
not a library). **Finalization pending.** Aamir's goal: **a universal cross-language,
cross-platform standard.**
**One-liner:** Natural and Intuitive Time Expression Syntax — one human-readable,
case-insensitive date/time format-specifier system to replace the fragmented mess of
`strftime`, Go's `2006-01-02`, and case-sensitive `yyyy`/`MM` across languages.

**Relationship:** NITES is the **specification**; **GoTime** is its Go **reference
implementation** (GoTime's `yyyy-mm-dd` specifiers ARE NITES). Same spec+impl pattern as
**Internet Object** (spec) + its parsers. → ManiarTech now has **two authored standards**.

---

## 1. Identity

| Field | Value |
|---|---|
| Name | NITES — Natural and Intuitive Time Expression Syntax |
| Type | Open specification / proposed universal standard |
| Author | Mohamed Aamir Maniar, ManiarTech® |
| Version | **1.0** (created 2026-06-04) — **finalization pending** |
| Artifacts | Markdown spec + **formal NITES_Specification_1.0.0.docx / .pdf** |
| Repo | github.com/maniartech/**idsf-specs** ⚠️ (remote named "idsf-specs" — confirm canonical repo/name; possible rename) |
| Reference impl | GoTime (`github.com/maniartech/gotime/v2`) |
| Status | Research, spec drafted, finalization in progress (contents/3.finalization) |

## 2. The problem (strong, universally-felt pain)

Every language formats dates differently:
- **C/Python:** `strftime`/`strptime` cryptic `%Y %m %d %H %M %S`.
- **Go:** reference-date `Mon Jan 2 15:04:05 MST 2006`.
- **C#/Java:** case-sensitive `yyyy`/`MM`/`dd`/`HH` (and differ from each other).
- **JavaScript:** no built-in formatting at all.
→ High cognitive load, classic bugs (`%m` minutes vs months), painful multi-language
interop & i18n. *Everyone who codes has felt this — great hook.*

## 3. The NITES solution (design)

- **Case-insensitive, intuitive, "hackable"** specifiers. Memorable conventions:
  - single char = no padding (`y m d h i s`); doubled = zero-padded (`yy mm dd hh ii ss`);
    `b` suffix = blank/space-padded; `t` suffix = ordinal (`dt`→"2nd").
  - Note: minutes = `i`/`ii` (not `m`) — removes the #1 strftime bug (month vs minute).
- **Full coverage:** years (2/4-digit, ordinal), months (num/short/full name), days
  (incl. day-of-year), 12h/24h hours, AM/PM, micro/nanoseconds, weeks & weekday names,
  timezones (Z, abbrev, offsets ±07 / ±0700 / ±07:00).
- **Named layouts** — memorable aliases instead of format strings: `iso`, `rfc`, `sql`,
  `http`, `unix`, `js`, `longdate`, `time12`, etc. (`iso` instead of `yyyy-mm-ddThh:ii:ss`).

## 4. Objectives / why it matters

Standardization · simplicity/intuitiveness · interoperability (distributed systems,
time zones) · accessibility (lower barrier for new devs) · error reduction · ease of
adoption · backward compatibility where possible. **Vision: the universal date/time
format standard across languages & platforms.**

## 5. Strategic value for the brand (this is the big one)

- **Two authored standards** (NITES for time, Internet Object for data) positions
  ManiarTech as a firm that **defines standards, not just uses them** — exactly the
  "Most companies use technology. We make it" thesis, proven twice.
- NITES already has a **working reference implementation (GoTime, published)** — so it's
  not vaporware; the standard ships in real code. That's the credible version of an
  ambitious "universal standard" claim.
- Aspirational framing ("aims to be universal") must be paired with the honest current
  state (v1.0 draft, finalizing, one reference impl) — ambition + proof, no overclaim.

## 6. SEO angle

"universal date time format", "strftime alternative", "cross-language date formatting",
"intuitive date format specifiers", "date format standard". Niche but ownable —
ManiarTech could own the "NITES" term entirely.

## 7. Site placement

Labs **research** entry (pairs with Internet Object as the two "ManiarTech standards").
Page shape: hero (one intuitive time syntax for every language) → the fragmentation
problem (the `%m` vs `MM` vs `2006-01-02` mess) → the NITES idea (conventions + specifier
table + named layouts) → reference implementation (GoTime, live) → honest status (v1.0
draft, finalizing; invite adoption/implementers) → vision (universal standard) → links
(spec PDF, GoTime). Consider a small interactive "type a NITES format, see output" demo
later (GoTime/WASM could power it).

## 8. Open questions for Aamir

- [ ] **Repo/name:** remote is `idsf-specs` — is the canonical repo/name NITES, IDSF, or
      something else? (Avoid confusing branding.)
- [ ] Finalization ETA — write page to v1.0 now & gate, or publish as "draft RFC, feedback
      welcome"? (The latter suits a standard seeking adoption.)
- [ ] Host the formal spec as a downloadable **PDF** and/or an online docs site?
- [ ] Want to actively **invite other-language implementations** on the page (call for
      contributors/implementers)? Aligns with the "universal" goal.
- [ ] Other ManiarTech implementations planned beyond GoTime (JS/Python/Rust)? (Mirrors
      Internet Object's multi-language parser story.)
- [ ] OK to present NITES + Internet Object together as "standards authored at ManiarTech"?
