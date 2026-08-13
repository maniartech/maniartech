---
title: "Vault Storage"
headline: "localStorage's API. IndexedDB's engine."
description: "A tiny TypeScript browser-storage library: property-style reads and writes on IndexedDB's capacity and structured types, with encryption, validation and expiration composing as middleware rather than bolted on."
eyebrow: "Library"
titleTag: "vault-storage - Browser Storage, Upgraded"
seoDescription: "Vault Storage: a ~1.5KB TypeScript library giving web apps IndexedDB capacity behind a localStorage-simple API, with composable middleware. MIT, v2.0.1."
order: 6
tocDepth: "3"
statusLine: "MIT | v2.0.1 on npm | Repo: maniartech/vault | 355 specs in real Chrome"
artifacts:
  - label: "Repository"
    url: "https://github.com/maniartech/vault"
    primary: true
  - label: "npm package"
    url: "https://www.npmjs.com/package/vault-storage"
railMeta:
  - { k: "Type", v: "TypeScript browser-storage library" }
  - { k: "Maturity", v: "Stable; v2.0.1 tagged and published" }
  - { k: "Availability", v: "Public source + public npm package" }
  - { k: "Licence", v: "MIT" }
  - { k: "Adoption", v: "Adoptable; npm install vault-storage" }
  - { k: "Names", v: "Repository maniartech/vault; package vault-storage" }
  - { k: "Reviewed", v: "13 August 2026" }
railLinks:
  - label: "Repository"
    note: "Source, browser test suite and size scripts"
    url: "https://github.com/maniartech/vault"
  - label: "npm: vault-storage"
    note: "v2.0.1, MIT, zero dependencies"
    url: "https://www.npmjs.com/package/vault-storage"
  - label: "The architecture write-up"
    note: "Proxies, middleware and the 48-byte budget, from the source"
    url: "/insights/vault-storage-localstorage-alternative/"
reviewKicker: "Public evidence"
privateReview: "Nothing is gated - the source and its test suite are public. The Insights write-up above walks the Proxy handler and middleware design in depth."
---

localStorage won by being effortless - `localStorage.theme = "dark"` and you're done - and it stayed won despite a ~5MB ceiling, strings-only values, and a synchronous API that blocks the main thread. IndexedDB fixes all three and almost nobody enjoys using it raw. Vault Storage's bet is that the ergonomics were the product: keep the one-line API, swap the engine underneath.

```js
import vault from 'vault-storage';

vault.theme = "dark";                    // property-style write
const theme = await vault.theme;         // async read - IndexedDB underneath
await vault.setItem("session", data, { ttl: 3600000 });  // options when you need them
```

No setup, no schema, no open-database ceremony. The default `vault` instance is usable on import, the way localStorage always was.

## How a property assignment becomes a transaction

The trick is a Proxy: property access is intercepted, queued per key, and executed through a middleware chain before it touches IndexedDB. That layering is the architecture - each layer does one job, and the layers compose.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Architecture cutaway in four layers: the application API of property access and setItem calls; the Proxy and per-key pending-operation layer that serializes operations; the middleware chain of validation, encryption and expiration; and IndexedDB storage at the bottom">
  <g font-family="inherit" font-size="12">
    <rect x="120" y="24" width="520" height="52" rx="9" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.4)" stroke-width="1.2"/>
    <text x="380" y="46" text-anchor="middle" fill="rgba(255,255,255,.85)" font-weight="600">application API</text>
    <text x="380" y="64" text-anchor="middle" fill="rgba(255,255,255,.55)" font-size="10.5" font-family="Consolas, monospace">vault.theme = "dark"   |   await vault.getItem("k")   |   setItem(k, v, { ttl })</text>
    <path d="M380 76 L380 96" stroke="rgba(255,255,255,.35)" stroke-width="1.5"/>
    <rect x="120" y="98" width="520" height="52" rx="9" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.4)" stroke-width="1.2"/>
    <text x="380" y="120" text-anchor="middle" fill="rgba(255,255,255,.85)" font-weight="600">Proxy + per-key pending-operation queue</text>
    <text x="380" y="138" text-anchor="middle" fill="rgba(255,255,255,.55)" font-size="10.5">property access intercepted; operations on the same key serialize, different keys stay parallel</text>
    <path d="M380 150 L380 170" stroke="rgba(255,255,255,.35)" stroke-width="1.5"/>
    <rect x="120" y="172" width="520" height="66" rx="9" fill="rgba(20,207,147,.1)" stroke="rgba(20,207,147,.55)" stroke-width="1.3"/>
    <text x="380" y="194" text-anchor="middle" fill="#14cf93" font-weight="600">middleware chain - executeWithMiddleware()</text>
    <g font-family="Consolas, monospace" font-size="10.5" fill="rgba(255,255,255,.65)" text-anchor="middle">
      <text x="230" y="216">validation</text>
      <text x="380" y="216">encryption</text>
      <text x="530" y="216">expiration</text>
    </g>
    <text x="380" y="231" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10.5">before / after / error hooks; compose with .use() - or write your own</text>
    <path d="M380 238 L380 258" stroke="rgba(255,255,255,.35)" stroke-width="1.5"/>
    <rect x="120" y="260" width="520" height="44" rx="9" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.35)" stroke-width="1.2"/>
    <text x="380" y="279" text-anchor="middle" fill="rgba(255,255,255,.8)" font-weight="600">IndexedDB</text>
    <text x="380" y="296" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10.5">browser-granted capacity, structured values, async by nature - multiple named stores, one API</text>
    <text x="380" y="322" text-anchor="middle" fill="rgba(255,255,255,.45)" font-size="11">Every box is a real module: proxy-handler.ts, vault.ts (executeWithMiddleware), src/middlewares/, backup.ts.</text>
  </g>
</svg>
<figcaption><strong>Each layer does one job.</strong> The Proxy makes property syntax possible on an async engine; the per-key queue keeps racing writes to the same key ordered without serializing everything; the middleware chain is where encryption, validation and expiration live - as composable steps, not forks of the storage class.</figcaption>
</figure>

Composition in practice, from the README:

```js
import { encryptionMiddleware, validationMiddleware, expirationMiddleware }
  from 'vault-storage/middlewares';

vault
  .use(validationMiddleware((ctx) => { /* reject bad shapes before they persist */ }))
  .use(encryptionMiddleware({ /* PBKDF2-derived key, AES-GCM at rest */ }))
  .use(expirationMiddleware({ /* TTL cleanup strategy */ }));
```

Because the layers compose, the pre-configured `EncryptedVault` is not a second implementation - it is the same `Vault` with the encryption middleware already applied. Every mutation also emits a standard `EventTarget` `change` event, so reactive UIs can subscribe to storage the way they subscribe to anything else.

## Small enough to not argue about

The README's stated sizes, each measurable from the repository with `npm run size`: **~1.5KB** minified+gzipped for the core Vault class, **~2KB** for the bundled core entry, **~4KB** bundled with `EncryptedVault` - encryption included. Zero dependencies, modular, tree-shakeable: you include what you use.

## Test evidence, stated precisely

**355 specs at this writing, run under Karma in a real Chrome browser** - against actual IndexedDB, not a simulated DOM. Two qualifications, stated separately: one performance-threshold spec is timing-sensitive and may fail on slower runs, and Firefox is configured as an available launcher but is not enabled. We say "real Chrome", and that is exactly what the committed configuration runs.

## Known limits

- **Backup export of encrypted data is decrypted at export time.** Encrypted-at-export is still being designed - plan your backup handling accordingly, and do not assume an export file is ciphertext.
- **Reads are asynchronous.** `await vault.theme` is the price of the IndexedDB engine; code expecting localStorage's synchronous reads needs the `await`.
- **Cross-browser test execution is not claimed** - the committed suite runs Chrome only, as stated above.
- **The names differ**: the repository is `maniartech/vault`, the npm package is `vault-storage`. Both are linked in the rail; the package is the thing you install.

## Status: four facts, kept separate

- **Availability** - public source at [github.com/maniartech/vault](https://github.com/maniartech/vault), published package [`vault-storage`](https://www.npmjs.com/package/vault-storage).
- **Licence** - **MIT**, in the repository and on the package.
- **Maturity** - **stable at v2.0.1**, a major release built on the middleware architecture; v1.x remains documented at its own tag.
- **Adoption** - adoptable now: `npm install vault-storage`.

## What this demonstrates

The hard part of this library is invisible when it works: making JavaScript property syntax - which is synchronous by definition - coexist with an asynchronous storage engine, without losing ordering when two writes race for the same key. Solving that with a Proxy, a per-key operation queue and a middleware seam, inside a 1.5KB budget, is the same discipline as any systems boundary: keep the interface your users already know, and absorb the complexity on your side of it.
