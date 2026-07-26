#!/usr/bin/env node
/**
 * site-health.mjs - weekly technical SEO/health verification for maniartech.com
 *
 * Usage:
 *   node site-health.mjs https://maniartech.com
 *   node site-health.mjs http://localhost:9000        (pre-launch check)
 *
 * Node 18+ (built-in fetch). No dependencies. Exit code 0 = all PASS, 1 = any FAIL.
 * Checks: key routes 200, canonical/OG/description tags, no localhost leaks,
 * robots.txt + sitemap.xml, JSON-LD parses, title/description uniqueness.
 */

const BASE = (process.argv[2] || 'http://localhost:9000').replace(/\/+$/, '');

const KEY_PATHS = [
  '/',
  '/services/',
  '/services/application-software-engineering/',
  '/services/enterprise-software-engineering/',
  '/services/ai/',
  '/services/modernization/',
  '/how-we-work/',
  '/security/',
  '/about/',
  '/estimate/',
  '/contact/',
  '/case-studies/',
  '/case-studies/chemo/',
  '/case-studies/rtl/',
  '/foundry/',
];

let pass = 0, fail = 0, warn = 0;
const failures = [];

function ok(label) { pass++; console.log(`  PASS  ${label}`); }
function bad(label) { fail++; failures.push(label); console.log(`  FAIL  ${label}`); }
function meh(label) { warn++; console.log(`  WARN  ${label}`); }

async function get(path) {
  const url = BASE + path;
  try {
    const res = await fetch(url, { redirect: 'manual' });
    const body = res.status === 200 ? await res.text() : '';
    return { status: res.status, body };
  } catch (e) {
    return { status: 0, body: '', err: String(e) };
  }
}

function extract(re, s) { const m = s.match(re); return m ? m[1] : null; }

console.log(`site-health against ${BASE}\n`);

// --- 1. Key routes ---------------------------------------------------------
console.log('[1] Key routes');
const pages = {};
for (const p of KEY_PATHS) {
  const r = await get(p);
  if (r.status === 200) { ok(`${p} -> 200`); pages[p] = r.body; }
  else bad(`${p} -> ${r.status}${r.err ? ' ' + r.err : ''}`);
}

// --- 2. Per-page head checks ----------------------------------------------
console.log('\n[2] Head tags (title, description, canonical, og)');
const titles = {}, descs = {};
for (const [p, html] of Object.entries(pages)) {
  const title = extract(/<title>([^<]*)<\/title>/i, html);
  const desc = extract(/<meta\s+name="description"\s+content="([^"]*)"/i, html);
  const canonical = extract(/<link\s+rel="canonical"\s+href="([^"]*)"/i, html);
  const og = /property="og:title"/i.test(html);

  if (title && title.trim().length > 5) titles[p] = title.trim();
  else bad(`${p} missing/short <title>`);

  if (desc && desc.trim().length > 30) descs[p] = desc.trim();
  else bad(`${p} missing/short meta description`);

  if (canonical) {
    if (canonical.includes('localhost')) bad(`${p} canonical points at localhost: ${canonical}`);
    else ok(`${p} canonical ok`);
  } else meh(`${p} no canonical tag`);

  if (!og) meh(`${p} no og:title`);

  if (/http:\/\/localhost:\d+/.test(html.replace(/<!--[\s\S]*?-->/g, '')))
    bad(`${p} contains a localhost URL in output`);
}

// --- 3. Uniqueness ----------------------------------------------------------
console.log('\n[3] Title/description uniqueness');
function dupes(map) {
  const seen = {}; const d = [];
  for (const [p, v] of Object.entries(map)) {
    if (seen[v]) d.push(`${seen[v]} == ${p}`); else seen[v] = p;
  }
  return d;
}
const dt = dupes(titles), dd = dupes(descs);
dt.length ? dt.forEach(x => bad(`duplicate title: ${x}`)) : ok('all titles unique');
dd.length ? dd.forEach(x => bad(`duplicate description: ${x}`)) : ok('all descriptions unique');

// --- 4. JSON-LD parses ------------------------------------------------------
console.log('\n[4] JSON-LD validity');
for (const [p, html] of Object.entries(pages)) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const [i, m] of blocks.entries()) {
    try { JSON.parse(m[1]); ok(`${p} JSON-LD #${i + 1} parses`); }
    catch (e) { bad(`${p} JSON-LD #${i + 1} INVALID: ${String(e).slice(0, 80)}`); }
  }
}

// --- 5. robots.txt + sitemap ------------------------------------------------
console.log('\n[5] robots.txt + sitemap.xml');
const robots = await get('/robots.txt');
if (robots.status === 200 && !/Disallow:\s*\/\s*$/m.test(robots.body)) ok('robots.txt present, not blocking all');
else if (robots.status !== 200) bad(`robots.txt -> ${robots.status}`);
else bad('robots.txt blocks everything (Disallow: /)');

const sm = await get('/sitemap.xml');
if (sm.status === 200) {
  const urls = (sm.body.match(/<loc>/g) || []).length;
  if (urls >= 20) ok(`sitemap.xml present with ${urls} URLs`);
  else meh(`sitemap.xml present but only ${urls} URLs`);
  if (/localhost/.test(sm.body)) bad('sitemap.xml contains localhost URLs');
} else bad(`sitemap.xml -> ${sm.status}`);

// --- Summary ----------------------------------------------------------------
console.log(`\n==== ${fail === 0 ? 'ALL PASS' : 'FAILURES PRESENT'} | pass:${pass} warn:${warn} fail:${fail} ====`);
if (failures.length) {
  console.log('\nFailures:');
  failures.forEach(f => console.log('  - ' + f));
}
process.exit(fail === 0 ? 0 : 1);
