---
audience: "engineering"
contentType: "engineering-deep-dive"
evidenceType: "Architecture analysis"
artifactLabel: "Repository"
artifactUrl: "https://github.com/maniartech/vault"
title: "Vault Storage: the engineering behind a localStorage-simple API on IndexedDB"
description: "How a Proxy with a per-key pending queue, a seven-operation middleware pipeline, and a Web Worker deadline scheduler give IndexedDB a localStorage-simple API - design notes read straight from the source."
date: "2024-05-14"  # true first publication: Medium, 14 May 2024 (rebuilt from the v2 source, 2026)
titleTag: "Vault Storage - IndexedDB localStorage Alternative"
seoDescription: "A ~1.5 KB TypeScript library with localStorage's simplicity and IndexedDB's power: typed values, async API, encryption and TTL middleware."
thread: "tools"
shortTitle: "Vault Storage"
receipts:
  - "browser storage"
  - "MIT, on npm"
keyReceipt: "1.48 KB gzipped"
heroProof: "1.48 KB gzipped"
heroProofNote: "core Vault class, measured by the repository's own size script - zero dependencies, MIT, on npm"
---

*First published in the ManiarTech Engineering Journal on Medium (May 2024). This version is rebuilt from the v2.0 source - every code sample below is the shipped API, and every number was re-measured from the repository before publishing.*

[Vault Storage](https://github.com/maniartech/vault) is our open-source browser storage library: localStorage's one-line ergonomics on IndexedDB's engine. The pitch fits in four lines of code:

```js
import vault from 'vault-storage';

vault.theme = 'dark';                     // structured, async, no stringify
vault.user  = { name: 'John', roles: ['editor'] };
const user  = await vault.user;           // an object, not a string
```

This post is not the pitch. It is the design story - because those four lines sit on three pieces of engineering that are worth reading even if you never install the package: a Proxy that refuses to lie about asynchronous IO, a middleware pipeline that turns encryption and expiration into plugins, and a cleanup worker that schedules deadlines instead of polling. All of it in 1.48 KB gzipped for the core class, with zero dependencies.

## Two storage APIs, and why both are wrong

The browser gives you two key-value stores, and each is wrong in the opposite direction.

**localStorage has the right API and the wrong engine.** Assignment syntax, five minutes to learn - but it is synchronous (every read and write blocks the main thread), it stores only strings (every object pays `JSON.stringify`/`parse` and loses its Dates, Maps, and typed arrays on the way), and it holds roughly 5 MB.

**IndexedDB has the right engine and the wrong API.** Asynchronous, transactional, structured-clone storage measured in hundreds of megabytes - behind an interface of open requests, version-upgrade events, transaction scopes, and request objects with `onsuccess` handlers. Storing one value the raw way is about twenty lines. Most teams either stay on localStorage past the point where they should not, or adopt a wrapper.

Vault's design brief was narrower than "wrapper": keep the *assignment syntax* of localStorage - not just `getItem`/`setItem`, but `vault.theme = 'dark'` - on top of IO that is genuinely asynchronous, **without the ergonomics becoming a source of race conditions**. That last clause is where the engineering lives.

## The Proxy: property access that survives async

A JavaScript `Proxy` can trap property reads and writes, so routing `vault.theme` to IndexedDB is the easy part. The hard part is a contract collision: the Proxy spec requires the `set` trap to answer *synchronously* - return `true` and move on - while the IndexedDB write it just started needs milliseconds to commit. A naive proxy creates this bug:

```js
vault.token = 'abc';            // write starts, returns immediately
const t = await vault.token;    // read races the write - and can win
```

If the read reaches the store before the write commits, it returns stale data or `null` - intermittently, timing-dependent, unreproducible in the debugger. Ergonomics that produce that class of bug are not ergonomics; they are deferred debugging.

Vault closes the race with a **per-key pending-operation queue**, kept in a hidden, non-enumerable map on the instance:

```ts
// condensed from src/proxy-handler.ts - the write and read traps
set(target, key, value) {
  if (key in target) { target[key] = value; return true; }   // real members win
  const pending = ensurePending(target);
  const p = target.setItem(key, value)
    .then(() => value)
    .catch(() => undefined)               // a property write cannot throw - see below
    .finally(() => pending.delete(key));
  pending.set(key, p);                    // the write announces itself
  return true;                            // Proxy contract: answer now
},

get(target, key) {
  if (key in target) { /* real members; async methods are wrapped, see below */ }
  const pending = ensurePending(target).get(key);
  if (pending) return pending;            // a read behind a write gets the write's promise
  return target.getItem(key);             // otherwise, straight to IndexedDB
}
```

A read that arrives while a write is in flight does not race it - it *becomes* it: awaiting the property hands you the pending write's own promise, which resolves to the value being written. No timing window, because there is no second trip to the store.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Timeline diagram. A naive async proxy: a property write starts an IndexedDB put, an immediate awaited read hits the store before the write commits and returns null. Vault's per-key pending queue: the same read instead receives the pending write's promise and resolves to the written value when it settles.">
  <g font-family="inherit" font-size="12">
    <text x="40" y="28" fill="rgba(255,255,255,.8)" font-weight="600" font-size="12.5">A naive async proxy</text>
    <text x="40" y="62" fill="rgba(255,255,255,.75)" font-family="Consolas, monospace">vault.token = 'x'</text>
    <rect x="250" y="50" width="240" height="17" rx="4" fill="rgba(255,255,255,.2)"/>
    <text x="498" y="62" fill="rgba(255,255,255,.55)">IndexedDB put, in flight</text>
    <text x="40" y="94" fill="rgba(255,255,255,.75)" font-family="Consolas, monospace">await vault.token</text>
    <rect x="250" y="82" width="56" height="17" rx="4" fill="rgba(255,255,255,.2)"/>
    <text x="316" y="94" fill="rgba(255,120,120,.9)">-&gt; null - the read hit the store before the write committed</text>
    <text x="40" y="152" fill="rgba(255,255,255,.8)" font-weight="600" font-size="12.5">Vault's per-key pending queue</text>
    <text x="40" y="186" fill="rgba(255,255,255,.75)" font-family="Consolas, monospace">vault.token = 'x'</text>
    <rect x="250" y="174" width="240" height="17" rx="4" fill="rgba(255,255,255,.2)"/>
    <text x="498" y="186" fill="rgba(255,255,255,.55)">IndexedDB put, in flight</text>
    <text x="250" y="210" fill="#14cf93" font-size="11">registers itself in the pending map under 'token'</text>
    <text x="40" y="242" fill="rgba(255,255,255,.75)" font-family="Consolas, monospace">await vault.token</text>
    <rect x="250" y="230" width="240" height="17" rx="4" fill="rgba(20,207,147,.35)"/>
    <text x="498" y="242" fill="#14cf93" font-weight="600">-&gt; 'x'</text>
    <text x="545" y="242" fill="rgba(255,255,255,.7)">when the write settles</text>
    <text x="40" y="288" fill="rgba(255,255,255,.5)" font-size="11.5">Method calls coordinate with the same queue: getItem waits for that key's pending op, keys() and length()</text>
    <text x="40" y="304" fill="rgba(255,255,255,.5)" font-size="11.5">wait for all of them, and clear() parks every later operation behind its own pending promise.</text>
  </g>
</svg>
<figcaption><strong>The read-after-write race, and the queue that closes it.</strong> The read does not race the pending write - it receives the write's own promise.</figcaption>
</figure>

The queue is not only for property access. The `get` trap wraps the method API so both styles see one consistent world: `getItem` waits for that key's pending operation before reading; `setItem` chains behind any prior operation on the same key and then registers its own; `keys()` and `length()` wait for *all* pending writes and deletes so counts never include half-landed state. `clear()` gets the strongest treatment: it waits for every pending operation to settle, and while it runs, a pending-clear promise parks every subsequent read and write behind it - so a read issued right after an un-awaited `clear()` observes the cleared store, not a snapshot mid-wipe.

<aside class="mt-callout is-flip">
<span class="co-tag">The trade-off this puts on you</span>
<p>Because the Proxy <code>set</code> trap must answer synchronously, <b>a property write is fire-and-forget</b>: it cannot report failure, and its rejection is deliberately swallowed so it cannot surface as unhandled-promise noise. If a write can fail in a way you must know about - quota exceeded, a validation middleware rejecting it, unserializable input - use <code>await vault.setItem(key, value)</code>, which returns a real promise with real errors. Property style is for data you would have put in localStorage; the method style is the audit path. Two smaller edges of the same contract: function values are never persisted (IndexedDB cannot clone them; they are attached to the instance instead), and a key that collides with an API name like <code>getItem</code> is reachable only through the method style.</p>
</aside>

## One pipeline, seven operations: the middleware spine

Everything beyond plain storage - encryption, expiration, validation - is a plugin, and the plugin surface is small enough to quote in full:

```ts
// src/types/middleware.ts - the whole extension surface
export interface Middleware {
  name: string;
  onRegister?(vault): void;         // setup work when attached (e.g. spawn a sweeper)
  before?(context): Context;        // rewrite the operation before it runs
  after?(context, result): any;     // rewrite the result before it returns
  error?(context, error): Error | void;  // transform - or swallow - failures
}
```

Every one of the seven operations (`get`, `set`, `remove`, `clear`, `keys`, `length`, `getItemMeta`) funnels through a single `executeWithMiddleware` path in the core class. It builds a context carrying the operation name, key, value, and metadata; for keyed operations it fetches the *previous* stored state first, so middleware can diff old against new; then it runs every `before` hook in registration order, executes the IndexedDB operation, and runs the `after` hooks over the result. An `error` hook may replace the error or swallow it entirely. Because the pipeline is the only road in, a middleware never wonders which code path bypassed it - nothing does.

The proof that the abstraction carries its weight is `EncryptedVault`, the package's flagship feature. Minus comments, this is the entire class:

```ts
// src/encrypted-vault.ts - the whole class
export default class EncryptedVault extends Vault {
  constructor(config: EncryptionConfig, options: EncryptedVaultOptions = {}) {
    const { storageName, ...encryptionOptions } = options;
    super(storageName || 'encrypted-vault-storage', true);
    this.use(encryptionMiddleware(config, encryptionOptions));
    return new Proxy(this, proxy);
  }
}
```

Encrypted storage is not a fork of the storage engine; it is the storage engine with one middleware pre-installed. Composition looks the way you would hope, and order is meaningful - `before` hooks run in registration order, so validation below inspects plaintext before encryption scrambles it:

```js
import Vault from 'vault-storage/vault';
import { validationMiddleware, encryptionMiddleware, expirationMiddleware }
  from 'vault-storage/middlewares';

const store = new Vault('session-store')
  .use(validationMiddleware((ctx) => {
    if (ctx.operation === 'set' && !ctx.key.startsWith('sess:'))
      throw new Error('Session keys only');
  }))
  .use(encryptionMiddleware({ password, salt }))
  .use(expirationMiddleware({ defaultTTL: '12h' }));

await store.setItem('sess:current', { user, scopes }, { ttl: '1h' });
```

The hook design enables patterns the core never had to anticipate. `clear()` accepts an optional confirmation flag that the core itself ignores - but a five-line `before` hook can turn it into a safety lock that rejects any un-confirmed wipe of the store. The core stays small; the policy lives with whoever needs the policy.

## Inside the encryption middleware

The crypto layer uses only what the browser ships - the Web Crypto API, which is the reason the whole package needs zero dependencies. The pipeline: your password and salt go through PBKDF2 (SHA-256, 100,000 iterations by default) to derive an AES-256-GCM key; every write generates a fresh random 12-byte IV, prepended to the ciphertext; every read slices it back off and decrypts. Open DevTools on an encrypted store and the values are byte arrays.

Two details are worth stealing for any client-side crypto work:

- **Key derivation is cached and coalesced.** PBKDF2 at 100k iterations is deliberately slow - that is its job - so derived keys are cached (bounded, oldest-out), and concurrent requests for the *same* key while a derivation is in flight all await one shared promise instead of burning the CPU N times.
- **Credentials can be per-key.** Instead of fixed credentials, you can hand `EncryptedVault` an async provider - `key => ({ password, salt })` - and derive different credentials for different keys. Returning `null` from the provider skips encryption for that key entirely, so one store can hold plaintext preferences next to encrypted tokens.

```js
const store = new EncryptedVault(async (key) => {
  if (!key.startsWith('secret:')) return null;   // plaintext for ordinary keys
  return credentialsFor(key);                    // { password, salt } per secret
});
```

Encryption also has to answer for JSON's blind spots, because ciphertext hides the value from IndexedDB's own structured-clone machinery. So the middleware tags what JSON would mangle - `Date`, `Map`, `Set`, typed arrays, `ArrayBuffer`, `Blob`/`File`, `BigInt`, `RegExp`, even `NaN` and `Infinity` - and restores each to its real type on decrypt. A `Map` you encrypt is a `Map` when it comes back. Circular structures are detected and rejected with an explicit error rather than a stack overflow.

## Expiration is a scheduler, not a poller

TTL support starts conventionally: metadata. `setItem(key, value, { ttl: '30m' })` - durations as `'1d'`/`'2h'`/`'30m'`/`'45s'` strings or raw milliseconds - is converted at write time into an absolute `expires` timestamp stored beside the value. The interesting decision is who deletes expired data, and when.

The lazy answer is checking at read time - but then keys nobody reads again live forever. The common answer is a polling loop - but then you pay a full-store scan every N milliseconds, forever, mostly finding nothing. Vault's default (`proactive` mode) is a **deadline scheduler** in a Web Worker:

- The worker is *inlined as a string* and started from a Blob URL - no separate file to serve, no bundler configuration, one worker per storage name.
- On start and after every sweep it scans once, deletes anything already expired, finds the **next future expiration**, and sets exactly one `setTimeout` for exactly that moment. No expirations scheduled, no timer at all.
- Every `set`, `remove`, and `clear` nudges the worker to recompute its deadline, so a new shortest-lived item pulls the wake-up earlier.

Off the happy path, the layers hold: reads always check the metadata at access time, so an expired item returns `null` and is deleted even if the worker has not fired yet; and in environments without Worker support, the middleware degrades to a throttled in-band sweep. Three other modes (`immediate`, `background`, `hybrid`) trade strictness against overhead when the default does not fit.

The same metadata channel is general-purpose: anything you pass as the third argument of `setItem` - roles, provenance, versions - is stored beside the value and comes back via `getItemMeta`, without touching the value itself. Mutations also raise events on the instance - `vault.addEventListener('change', e => ...)` reports the operation and key from `e.detail` - which is how you hook cache invalidation or UI refresh onto storage without wrapping every call site.

<p class="mt-pull">Ergonomics that lie under load are not ergonomics - <em>they are deferred debugging</em>.</p>

## Where the simplicity stops

A design story is only honest with its edges drawn plainly.

- **Client-side encryption has a precise threat model.** What AES-GCM buys here is ciphertext at rest in IndexedDB - and how much that is worth depends entirely on where the credentials live. If they are fetched from a server after authentication and never persisted, data at rest on a stolen or shared device stays sealed; if they are hardcoded in the bundle or derivable from anything else on the device, that same attacker can decrypt. And no arrangement protects against code running in your own origin: an XSS payload that can call your credential provider can read your data. We state it that way because anything stronger would be false - the same limits apply to every client-side encryption scheme, whatever its marketing says.
- **Backup exports decrypt.** The export utility produces plaintext, by design, so backups are restorable without the original credentials. Treat an export of an encrypted store with the same care as the secrets in it. An encrypted-export format is an open design question in the repository.
- **Property writes do not report failure.** The Proxy contract, covered above. When a write must be confirmed, `await setItem` is the API.
- **Events are same-tab.** The change bus is an in-process `EventTarget`. localStorage's `storage` event, for all its faults, fires across tabs; Vault today does not. Cross-tab sync is yours to build (a `BroadcastChannel` bridge is the natural shape) until the library grows one.
- **Capacity is browser-managed.** IndexedDB quotas depend on the browser and free disk, and an origin's data can be evicted under storage pressure unless persistent storage is granted. "Far more than localStorage's 5 MB" is honest; a guaranteed number would not be.

## The numbers, measured, not asserted

Size claims in READMEs rot, so the repository ships its own measurement script (`npm run size`, gzip over the built output) - these figures are from running it on v2.0.1 while writing this post:

| Module (gzipped) | Size |
|---|---|
| Core `Vault` class (`vault-storage/vault`) | 1.48 KB |
| Default entry - the ready-made `vault` singleton | 1.98 KB |
| Encryption middleware | 2.13 KB |
| Expiration middleware, sweeper worker included | 2.74 KB |
| Proxy handler | 679 B |
| Everything in the package, all modules summed | 14.18 KB |

You import only what you use - the package marks itself side-effect-free, so a bundler tree-shakes the rest. And because Proxies, IndexedDB, Web Workers, and Web Crypto are exactly the things a simulated DOM gets wrong, the test suite - 355 specs at this writing - runs under Karma in a real Chrome browser, not jsdom.

## Status, and where it fits

Vault Storage is v2.0.1 on npm as [`vault-storage`](https://www.npmjs.com/package/vault-storage), MIT-licensed, zero dependencies. It fits where client-side state has outgrown 5 MB of stringly-typed storage: offline-first PWAs and API caches, encrypted token storage, form-draft persistence, multi-tenant apps that want an isolated store per context.

It followed the same path as everything we release: built for our own production needs, published when it stopped surprising us - the [dogfood-first model](/insights/dogfood-first/) - and it lives in the [ManiarTech Foundry](/foundry/vault-storage/) alongside our Go libraries and the specifications we author.

```bash
npm install vault-storage
```

The source is the best part of the documentation - the Proxy handler alone is a working seminar on making JavaScript metaprogramming coexist with async IO: [github.com/maniartech/vault](https://github.com/maniartech/vault).
