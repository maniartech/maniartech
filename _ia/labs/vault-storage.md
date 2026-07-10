---
title: "vault-storage — IndexedDB power, localStorage-simple"
description: "A tiny TypeScript browser-storage library: IndexedDB capacity and rich types behind a localStorage-simple API, in a ~1.5KB core."
order: 24
labStatus: "Published"
category: "Open Source Libraries"
license: "MIT"
repo: "https://github.com/maniartech/vault-storage"
image: ""
---

# vault-storage — IndexedDB power, localStorage-simple

**Status: Published · v2 · MIT · TypeScript**

---

## What it is

`vault-storage` is a small browser-storage library that gives web apps the power of
IndexedDB — large capacity, rich data types (objects, `Date`, `Map`, `Set`, `Blob`,
`BigInt`, and more) — behind an API as simple as localStorage: `vault.key = value`,
`await vault.key`. It's written in TypeScript and ships full type definitions. v2 adds a
composable **middleware** architecture, with built-in middleware for encryption,
validation, and expiration (TTL).

## Why it matters

The checkable proof is in the package itself: a **~1.5KB core** (gzipped, tree-shakeable,
zero dependencies) backed by **350+ browser tests** — run in real Chrome and Firefox, not
just a simulated DOM. The middleware architecture means encryption, validation, and
expiration compose cleanly rather than being bolted on. You get IndexedDB's capacity and a
localStorage-shaped API without carrying a heavy dependency.

One honest caveat worth stating up front: the **backup export of encrypted data is
decrypted** at export time. Encrypted-at-export is still being designed — so plan your
backup handling accordingly, and don't assume an export file is ciphertext.

## Status & how to see it

Published as v2 and production-ready. See it for yourself:

- **Source & tests:** [github.com/maniartech/vault-storage](https://github.com/maniartech/vault-storage)
- Published to **npm** as `vault-storage`.

---

[ Browse the repositories → ] · [ Estimate your project → ]

---

`[note] Honesty gates applied:
- Proof = ~1.5KB core + 350+ real-browser tests + middleware architecture (from dossier).
- Encryption caveat stated explicitly: backup export of encrypted data is DECRYPTED — page
  does NOT claim encrypted-at-export, per the brief.
- Star count omitted (modest) — led with footprint/utility as instructed.
- Repo URL "https://github.com/maniartech/vault-storage" confirmed public (v2) in the brief.`
