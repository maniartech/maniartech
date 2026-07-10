# Inbox Dossier — Vault Storage

> Collection doc (not a page yet). Source: local repo E:\Projects\vault\vault
> (README, package.json). Status: **collected** — open Qs at bottom.

**Classification:** ManiarTech® **Labs** — Open-source library. **PUBLISHED.**
**One-liner:** A tiny (~1.5KB) browser storage library that gives web apps
IndexedDB power behind a localStorage-simple API — structured data, encryption,
expiration, validation, and events, via a composable middleware system.

---

## 1. Identity

| Field | Value |
|---|---|
| Name | Vault Storage (npm: **`vault-storage`**) |
| Type | Browser/client-side storage library (IndexedDB wrapper) |
| Lang | TypeScript (ships full type defs) |
| Author | ManiarTech® — Mohamed Aamir Maniar |
| License | **MIT** |
| Repo | github.com/maniartech/vault · npm: vault-storage |
| Version | **2.0.1** (v2.0 = major release: middleware architecture) |
| Stars | ~7★ (smaller than signals; lead with utility/size, not stars) |
| Status | **PUBLISHED & v2.0 production-ready** ("feature-complete, production-ready") |
| Deps | **Zero dependencies** |

## 2. Positioning / hook

"A sophisticated browser-based storage library that leverages IndexedDB — significant
improvements over LocalStorage — with a localStorage-like API, in a micro footprint."
**The pitch:** localStorage's simplicity + IndexedDB's power, at ~1.5KB.
- **"Just start using it!"** — zero setup; `vault.key = value` / `await vault.key`.

## 3. Why it's impressive (key features)

- **Tiny & modular:** ~**1.5KB** gzipped (core), ~**3KB** with EncryptedVault. Tree-shakeable,
  zero deps, `sideEffects:false`.
- **localStorage-like API** with dot-notation & indexer syntax — but async/non-blocking.
- **Huge capacity:** IndexedDB (often ≥250MB) vs LocalStorage's ~5MB.
- **Rich data types:** objects, arrays, Date, Map, Set, TypedArrays, Blob, BigInt,
  RegExp… (LocalStorage = strings only).
- **Middleware system (v2.0 flagship):** composable before/after/error hooks. Built-ins:
  **encryption**, **validation**, **expiration** (TTL w/ 4 cleanup strategies:
  immediate/background/hybrid/proactive). Custom middleware supported.
- **EncryptedVault:** pre-configured encrypted storage; supports **dynamic per-key
  credentials** (Web Crypto). Security best-practices documented.
- **Multiple isolated stores**, **metadata per item**, **event system** (set/get/
  delete/clear/change via EventTarget), **backup/restore** (export/import).
- **TypeScript-first**, **354+ tests** (Karma, real Chrome/Firefox browsers).

## 4. vs LocalStorage (great comparison table in README)

Capacity (≥250MB vs 5MB), multiple stores, metadata, encryption, validation,
auto-expiration, events, rich types, backup/restore, async non-blocking — all ✅ vs ❌,
at ~1.5–3KB. *This table is ready-made page content.*

## 5. Use cases / SEO

Offline-first PWAs, client-side caching, encrypted token/session storage, form
draft persistence, large structured client data, app state that outgrows localStorage.
SEO keywords (from package.json): indexeddb, idb wrapper, offline-storage, web-storage,
browser-database, nosql, key-value, data-persistence, persistent-storage, data-cache.

## 6. Honesty notes

- v2.0 README self-describes as "feature-complete / production-ready" — supportable
  (354+ browser tests). Fine to echo.
- One documented caveat: **backup export of encrypted data is decrypted** (README flags
  it; they're still designing encrypted export). Don't claim encrypted-at-export.
- Breaking change v1→v2: SecuredVault → EncryptedVault (migration guide exists).

## 7. Site placement

Labs entry. Smaller star count than signals, so **lead with the value/size story**
("IndexedDB power in 1.5KB"), the vs-LocalStorage table, and the middleware architecture —
not stars. Good companion to a future front-end services narrative. Page shape:
hero (tiny browser storage, big power) → vs LocalStorage table → middleware/encryption/
expiration → rich types → published/MIT/npm install → links (GitHub/npm) → cross-sell.

## 8. Open questions for Aamir

- [ ] Stars are modest (~7) — agree to **lead with footprint/utility, not stars**?
- [ ] Any usage/adoption numbers worth citing (npm downloads/month)? (Can pull at build.)
- [ ] Confirm "production-ready" language is OK to repeat verbatim.
- [ ] Is Vault used in any ManiarTech product (Processious/Tallery) we can name as dogfooding?
