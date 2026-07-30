---
title: "vault-storage — IndexedDB power, localStorage-simple"
description: "A tiny TypeScript browser-storage library: IndexedDB capacity and rich types behind a localStorage-simple API, in a ~1.5KB core."
labStatus: "Published"
category: "Libraries & Frameworks"
license: "MIT"
repo: "https://github.com/maniartech/vault-storage"
order: 6
---

`vault-storage` is a small TypeScript browser-storage library — published as v2, MIT — that gives web apps IndexedDB's power behind a localStorage-simple API.

## What it is

`vault-storage` gives web apps the power of IndexedDB — large capacity, rich data types (objects, `Date`, `Map`, `Set`, `Blob`, `BigInt`, and more) — behind an API as simple as localStorage: `vault.key = value`, `await vault.key`. It's written in TypeScript and ships full type definitions. v2 adds a composable **middleware** architecture, with built-in middleware for encryption, validation, and expiration (TTL).

## Why it matters

The checkable proof is in the package itself: a **~1.5KB core** (gzipped, tree-shakeable, zero dependencies) backed by **350+ browser tests** — run in real Chrome and Firefox, not just a simulated DOM. The middleware architecture means encryption, validation, and expiration compose cleanly rather than being bolted on. You get IndexedDB's capacity and a localStorage-shaped API without carrying a heavy dependency.

One honest caveat worth stating up front: the **backup export of encrypted data is decrypted** at export time. Encrypted-at-export is still being designed — so plan your backup handling accordingly, and don't assume an export file is ciphertext.

## Status & how to see it

Published as v2 and production-ready. See it for yourself:

- **Source & tests:** [github.com/maniartech/vault-storage](https://github.com/maniartech/vault-storage)
- Published to **npm** as `vault-storage`.


