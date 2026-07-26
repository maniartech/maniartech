#!/usr/bin/env node
/**
 * submit-to-search-engines.mjs - notify search engines about maniartech.com URLs.
 *
 * WHAT A SCRIPT CAN AND CANNOT DO (honest, Governing Rule #1):
 *  - IndexNow (Bing, Yandex, Seznam, Naver, and other participants): FULLY automatable. One POST
 *    to the shared endpoint notifies all participating engines. This script does that.
 *  - Google: NOT automatable for a normal business site. Google retired the sitemap-ping endpoint
 *    in 2023, and its Indexing API is officially limited to JobPosting/BroadcastEvent content -
 *    using it for general pages violates Google's terms. The honest path is a ONE-TIME manual
 *    submission in Google Search Console (this script prints the exact steps). Do not fake it.
 *  - Bing Webmaster Tools: covered by IndexNow above; also has an optional API (not required here).
 *
 * Node 18+ (built-in fetch). No dependencies.
 *
 * USAGE:
 *   node submit-to-search-engines.mjs init
 *       Generates an IndexNow key and writes root/<key>.txt (deploys with the site).
 *       Run once, then deploy, then use `submit`.
 *
 *   node submit-to-search-engines.mjs submit [--dry-run]
 *       Reads https://maniartech.com/sitemap.xml and submits every URL via IndexNow.
 *       --dry-run validates + prints what WOULD be sent, without sending. Safe to run anytime.
 *
 *   node submit-to-search-engines.mjs submit-urls <url> [<url> ...]
 *       Submits specific URLs (e.g. a single new blog post) via IndexNow. Use after publishing one page.
 *
 *   node submit-to-search-engines.mjs guide
 *       Prints the one-time Google Search Console + Bing Webmaster manual setup steps.
 */

import { readdirSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

// --- config ---------------------------------------------------------------
const HOST = 'maniartech.com';
const ORIGIN = `https://${HOST}`;
const SITEMAP = `${ORIGIN}/sitemap.xml`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'; // shared: forwards to all participants
// repo root = up from _marketing/growth/scripts/submit-to-search-engines/
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '..', '..', '..', '..');
const PUBLIC_DIR = join(REPO_ROOT, 'root'); // Taj Mahal copies root/ to the site root at build

const cmd = process.argv[2];
const args = process.argv.slice(3);
const DRY = args.includes('--dry-run');

// --- helpers --------------------------------------------------------------
function findKey() {
  // The IndexNow key IS the filename: root/<key>.txt (32-hex convention).
  if (!existsSync(PUBLIC_DIR)) return null;
  const f = readdirSync(PUBLIC_DIR).find(n => /^[a-f0-9]{16,64}\.txt$/i.test(n));
  return f ? f.replace(/\.txt$/i, '') : null;
}

async function genKey() {
  // 32 hex chars - a public token, not a secret; crypto-random is preferred but not essential.
  const { randomBytes } = await import('node:crypto');
  return randomBytes(16).toString('hex');
}

async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP, { redirect: 'follow' });
  if (res.status !== 200) throw new Error(`sitemap.xml -> HTTP ${res.status}. Is the site live and built with a sitemap?`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(m => m[1]);
  if (!urls.length) throw new Error('sitemap.xml contained no <loc> URLs.');
  const bad = urls.filter(u => /localhost|127\.0\.0\.1|:8080|:7000/.test(u));
  if (bad.length) throw new Error(`sitemap has non-production URLs (build with url: https://${HOST}). e.g. ${bad[0]}`);
  const offHost = urls.filter(u => { try { return new URL(u).host !== HOST; } catch { return true; } });
  if (offHost.length) throw new Error(`sitemap has off-host URLs: ${offHost[0]}`);
  return urls;
}

async function indexNowSubmit(urlList, key) {
  const body = { host: HOST, key, keyLocation: `${ORIGIN}/${key}.txt`, urlList };
  if (DRY) {
    console.log('[dry-run] would POST to', INDEXNOW_ENDPOINT);
    console.log('[dry-run] payload:', JSON.stringify({ ...body, urlList: `${urlList.length} URLs` }, null, 2));
    console.log('[dry-run] first 3 URLs:', urlList.slice(0, 3).join('\n                 '));
    return { dryRun: true };
  }
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  return { status: res.status, text: await res.text().catch(() => '') };
}

function verifyKeyFileLive(key) {
  return fetch(`${ORIGIN}/${key}.txt`).then(r => r.status === 200).catch(() => false);
}

// --- commands -------------------------------------------------------------
async function doInit() {
  const existing = findKey();
  if (existing) {
    console.log(`An IndexNow key already exists: root/${existing}.txt`);
    console.log(`Key file must be live at ${ORIGIN}/${existing}.txt after deploy. Nothing to do.`);
    return;
  }
  const key = await genKey();
  if (!existsSync(PUBLIC_DIR)) mkdirSync(PUBLIC_DIR, { recursive: true });
  const file = join(PUBLIC_DIR, `${key}.txt`);
  writeFileSync(file, key + '\n', 'utf8');
  console.log('IndexNow key generated.');
  console.log(`  Wrote: root/${key}.txt  (contents: the key itself)`);
  console.log('  NEXT:');
  console.log('   1. Commit root/' + key + '.txt and DEPLOY so it is live at');
  console.log(`      ${ORIGIN}/${key}.txt`);
  console.log('   2. Then run: node submit-to-search-engines.mjs submit');
  console.log('  (IndexNow verifies you own the site by fetching that key file.)');
}

async function doSubmit(urls) {
  const key = findKey();
  if (!key) {
    throw new Error('No IndexNow key found in root/. Run:  node submit-to-search-engines.mjs init');
  }
  if (!DRY) {
    const live = await verifyKeyFileLive(key);
    if (!live) {
      throw new Error(`Key file not reachable at ${ORIGIN}/${key}.txt - deploy root/${key}.txt (commit + publish), then retry.`);
    }
  }
  console.log(`Submitting ${urls.length} URL(s) via IndexNow (Bing, Yandex, Seznam, Naver, ...)`);
  const r = await indexNowSubmit(urls, key);
  if (r.dryRun) return;
  // IndexNow: 200 or 202 = accepted; 403 = key invalid/not live; 422 = URL/host mismatch; 429 = too many.
  if (r.status === 200 || r.status === 202) console.log(`  OK (HTTP ${r.status}) - accepted.`);
  else console.log(`  HTTP ${r.status} ${r.text ? '- ' + r.text.slice(0, 200) : ''}`);
  console.log('\nReminder: Google is NOT covered by IndexNow. Do the one-time GSC step:');
  console.log('  node submit-to-search-engines.mjs guide');
}

function printGuide() {
  console.log(`
== One-time manual setup a script cannot legitimately do ==

GOOGLE SEARCH CONSOLE (required - the primary engine)
  1. https://search.google.com/search-console  ->  Add property  ->  Domain: ${HOST}
  2. Verify via DNS TXT record (Google gives you the value; add it at your DNS host).
  3. Sitemaps  ->  submit:  sitemap.xml
  4. (Optional) URL Inspection  ->  paste a key URL  ->  Request Indexing (for priority pages).
  NOTE: Google retired the old ping URL and its Indexing API does not allow general pages -
        there is no honest script for this. GSC is the way. It is one-time.

BING WEBMASTER TOOLS (recommended - also powers DuckDuckGo, ecosia, etc.)
  1. https://www.bing.com/webmasters  ->  Add site  ->  ${ORIGIN}
     (You can IMPORT from Google Search Console in one click once GSC is verified.)
  2. Verify, then Sitemaps  ->  submit:  ${SITEMAP}
  Bing also honors IndexNow automatically (this script's 'submit' command).

AUTOMATED (this script, after 'init' + deploy):
  IndexNow 'submit' notifies Bing + Yandex + Seznam + Naver in one call.
  Run it on launch, and again whenever you publish a new page (submit-urls <url>).
`);
}

// --- main -----------------------------------------------------------------
(async () => {
  try {
    if (cmd === 'init') await doInit();
    else if (cmd === 'submit') await doSubmit(await fetchSitemapUrls());
    else if (cmd === 'submit-urls') {
      if (!args.filter(a => a.startsWith('http')).length) throw new Error('Provide at least one http(s) URL.');
      await doSubmit(args.filter(a => a.startsWith('http')));
    } else if (cmd === 'guide') printGuide();
    else {
      console.log('Commands: init | submit [--dry-run] | submit-urls <url...> | guide');
      console.log('Start with:  node submit-to-search-engines.mjs guide');
    }
  } catch (e) {
    console.error('ERROR:', e.message);
    process.exitCode = 1;
  }
})();
