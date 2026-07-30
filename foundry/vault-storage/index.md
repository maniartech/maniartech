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

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two-column comparison: localStorage stores strings only, synchronously, in about 5MB; vault-storage stores rich types asynchronously in IndexedDB with encryption and TTL middleware">
  <g font-family="inherit" font-size="12.5">
    <rect x="30" y="20" width="340" height="210" rx="10" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.35)" stroke-width="1.2"/>
    <rect x="390" y="20" width="340" height="210" rx="10" fill="rgba(20,207,147,.08)" stroke="rgba(20,207,147,.55)" stroke-width="1.5"/>
    <text x="200" y="48" text-anchor="middle" fill="rgba(255,255,255,.8)" font-weight="600">localStorage</text>
    <text x="560" y="48" text-anchor="middle" fill="#14cf93" font-weight="600">vault-storage</text>
    <line x1="52" y1="60" x2="348" y2="60" stroke="rgba(255,255,255,.2)" stroke-width="1.2"/>
    <line x1="412" y1="60" x2="708" y2="60" stroke="rgba(20,207,147,.35)" stroke-width="1.2"/>
    <g fill="rgba(255,255,255,.65)" font-size="12">
      <text x="52" y="88">strings only - serialize it yourself</text>
      <text x="52" y="116">synchronous - can block the UI thread</text>
      <text x="52" y="144">~5MB typical cap</text>
      <text x="52" y="172">one flat store per origin</text>
      <text x="52" y="200">no expiration, no encryption built in</text>
    </g>
    <g fill="rgba(255,255,255,.75)" font-size="12">
      <text x="412" y="88">rich types: objects, Date, Map, Set, Blob...</text>
      <text x="412" y="116">async, non-blocking (IndexedDB underneath)</text>
      <text x="412" y="144">browser-limit capacity, often 250MB+</text>
      <text x="412" y="172">multiple isolated stores</text>
      <text x="412" y="200">TTL expiration + encryption middleware</text>
    </g>
  </g>
</svg>
<figcaption><strong>What you trade up from.</strong> The rows come from the library's own README comparison; the ~5MB figure is the typical localStorage cap and the 250MB+ figure is what browsers commonly grant IndexedDB - both vary by browser. The whole upgrade costs ~1.5KB gzipped.</figcaption>
</figure>

## Using it from code

The default vault needs zero setup - write like localStorage, but store real types and never block the UI:

```js
import vault from "vault-storage";

// store an object, not a string
vault.settings = { theme: "dark", volume: 0.8 };

// reads are async - IndexedDB under the hood
const settings = await vault.settings;
```

The v2 middleware system is where it grows up with your app - isolated stores that compose encryption and expiration:

```js
import Vault from "vault-storage/vault";
import { encryption, expiration }
  from "vault-storage/middlewares";

const store = new Vault("app-cache");
store.use(encryption({ password, salt }));
store.use(expiration({ cleanupStrategy: "proactive" }));

// encrypted at rest, gone in an hour
await store.setItem("session", data, { ttl: 3600000 });
```

## Why it matters

The checkable proof is in the package itself: a **~1.5KB core** (gzipped, tree-shakeable, zero dependencies) backed by **350+ browser tests** — run in real Chrome and Firefox, not just a simulated DOM. The middleware architecture means encryption, validation, and expiration compose cleanly rather than being bolted on. You get IndexedDB's capacity and a localStorage-shaped API without carrying a heavy dependency.

One honest caveat worth stating up front: the **backup export of encrypted data is decrypted** at export time. Encrypted-at-export is still being designed — so plan your backup handling accordingly, and don't assume an export file is ciphertext.

## Status & how to see it

Published as v2 and production-ready. See it for yourself:

- **Source & tests:** [github.com/maniartech/vault-storage](https://github.com/maniartech/vault-storage)
- Published to **npm** as `vault-storage`.


