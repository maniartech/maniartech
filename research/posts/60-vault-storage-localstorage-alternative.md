---
title: "Vault Storage: IndexedDB power behind a localStorage-simple API"
description: "A 1.5KB, zero-dependency browser storage library - structured data without stringify, AES-GCM encryption in one line, TTL expiration, and a composable middleware system. MIT, on npm."
date: "2024-05-14"  # true first publication: Medium, 14 May 2024 (refreshed Nov 2025)
titleTag: "Vault Storage - IndexedDB localStorage Alternative"
seoDescription: "A ~1.5 KB TypeScript library with localStorage's simplicity and IndexedDB's power: typed values, async API, encryption and TTL middleware."
thread: "tools"
shortTitle: "Vault Storage"
receipts:
  - "browser storage"
  - "MIT, on npm"
keyReceipt: "~1.5 KB gzipped"
heroProof: "~1.5 KB gzipped"
heroProofNote: "zero dependencies, MIT, published on npm"
---

*Adapted from two articles first published in the ManiarTech Engineering Journal on Medium (May 2024 and November 2025), merged and updated for maniartech.com.*

Choosing your client-side storage layer is an architectural decision, not something to retrofit when the problems arrive. LocalStorage works - for prototypes, small apps, and simple key-value needs it is perfectly adequate. But the moment your application needs security for tokens, more than a few megabytes, structured data, automatic expiration, or isolated storage spaces, you are patching around a tool from 2010.

[Vault Storage](https://github.com/maniartech/vault) is our answer: a browser storage library that starts as simple as LocalStorage and scales to production requirements. Open source (MIT), zero dependencies, about 1.5KB gzipped for the core (~3KB with encryption included), published on npm as `vault-storage`, and backed by more than 350 automated tests that run in real browsers.

The one-glance comparison:

```js
// LocalStorage: simple, but limited
localStorage.theme = 'dark';
localStorage.user = JSON.stringify({ name: 'John' });

// Vault Storage: just as simple - but structured, async, scalable
vault.theme = 'dark';
vault.user = { name: 'John' };        // no stringify needed
const user = await vault.user;        // already an object
```

## Level 1: start exactly where LocalStorage left you

```js
import vault from 'vault-storage';

vault.theme = 'dark';
const theme = await vault.theme;

vault.user = { name: 'John', preferences: { sidebar: true } };
const user = await vault.user;   // an object, not a string
```

No configuration, no setup. What you gain immediately:

- **IndexedDB capacity** - typically 250MB or more, versus LocalStorage's ~5MB.
- **Rich types without serialization** - objects, arrays, Dates, Maps, Sets, TypedArrays, Blobs; LocalStorage stores only strings.
- **Async, non-blocking operations** - storage work stays off the UI thread.

Most applications can stop here. The rest of the library exists for the day they cannot.

## Level 2: encryption in one line

Storing tokens in LocalStorage is the finding every security review writes up. With Vault:

```js
import { EncryptedVault } from 'vault-storage/encrypted-vault';

const authVault = new EncryptedVault('auth', {
  password: 'your-secret-key',
  salt: 'your-unique-salt'
});

authVault.token = 'secret-jwt-token';
const token = await authVault.token;
```

Values are encrypted with AES-256-GCM through the Web Crypto API - proper key derivation, no third-party crypto dependency, no hand-rolled encrypt/decrypt calls to get wrong. Open DevTools and the stored values are ciphertext.

One honest caveat, straight from the README: the backup/export feature currently exports decrypted data (an encrypted-export design is still in progress). If you export, treat the export file with the same care as the secrets themselves.

## Level 3: data that knows when to leave

Caches grow; stale data accumulates. Vault's expiration middleware handles the lifecycle:

```js
import { Vault } from 'vault-storage/vault';
import { createExpiration } from 'vault-storage/middlewares';

const cache = new Vault('api-cache', {
  middlewares: [createExpiration({ defaultTTL: '24h' })]
});

await cache.setItem('session', data, { ttl: '1h' });
```

Expired entries clean themselves up - four cleanup strategies (immediate, background, hybrid, proactive) let you match the behavior to your performance profile. No cleanup scripts, no stale-data bugs.

## Level 4: compose your own storage layer

The v2.0 architecture is middleware all the way down - validation, encryption, expiration, or anything custom, layered like Express middleware:

```js
vault
  .use(validationMiddleware({ /* your rules */ }))
  .use(encryptionMiddleware({ /* ... */ }))
  .use(expirationMiddleware({ cleanupStrategy: 'hybrid' }));
```

Add to that isolated multi-store support (a separate vault per user or per context), per-item metadata, an event system for reacting to storage changes, and backup/restore - each a real production need that LocalStorage answers with "write it yourself."

## The before and after

The pattern every LocalStorage app accumulates - manual JSON parsing, manual timestamps, manual expiration checks, try/catch around everything - collapses to:

```js
import vault from 'vault-storage';
import { expirationMiddleware } from 'vault-storage/middlewares';

vault.use(expirationMiddleware());

async function saveUserPreferences(prefs) {
  vault.user_prefs = prefs;
  vault.setMeta('user_prefs', { ttl: 86400000 });   // 24 hours
}

async function getUserPreferences() {
  return await vault.user_prefs;
}
```

<p class="mt-pull">Roughly thirty lines of error-prone boilerplate become <em>three that state their intent</em>.</p>

## Where it fits

Offline-first PWAs and API caching, encrypted token and session storage, form-draft persistence, multi-tenant client apps needing isolated stores, and any application state that has outgrown 5MB of stringly-typed storage.

Vault Storage follows the same path as everything we publish: built for our own needs first, released when it stopped surprising us - the [dogfood-first model](/insights/dogfood-first/). It is one of the open-source libraries in the [ManiarTech Foundry](/foundry/vault-storage/), alongside our Go libraries and the specifications we author.

```bash
npm install vault-storage
```

Repository and docs: [github.com/maniartech/vault](https://github.com/maniartech/vault). If it saves you a debugging session, a star helps other developers find it.
