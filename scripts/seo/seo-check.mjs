#!/usr/bin/env node
/**
 * seo-check.mjs - the SEO gate for maniartech.com.
 *
 * Crawls the running site (dev server or a served build), follows every
 * internal link, and audits each page against the checklist in README.md.
 * Exits non-zero on FAIL findings so it can gate a deploy.
 *
 * Usage:
 *   node scripts/seo/seo-check.mjs http://localhost:7000
 *   node scripts/seo/seo-check.mjs http://localhost:8099   (built site via the `static` launch config)
 *
 * No external dependencies. Node 18+.
 */

const BASE = (process.argv[2] || 'http://localhost:7000').replace(/\/+$/, '');
const SEEDS = ['/'];

// ---------------------------------------------------------------------------
// Tunables (documented in README.md - change deliberately, not casually)
// ---------------------------------------------------------------------------
const TITLE_MIN = 25, TITLE_MAX = 65;        // Google truncates ~600px; ~65 chars is the safe zone
const DESC_MIN = 70, DESC_MAX = 165;         // snippets truncate ~155-165
const THIN_WORDS = 150;                      // warn below this (list pages excepted)
const LIST_PAGES = new Set(['/insights/', '/white-papers/', '/case-studies/', '/foundry/', '/products/', '/services/']);

const pass = [], warn = [], fail = [];
const P = (m) => pass.push(m);
const W = (m) => warn.push(m);
const F = (m) => fail.push(m);

async function fetchPage(path) {
  try {
    const r = await fetch(BASE + path, { redirect: 'manual' });
    const body = r.ok ? await r.text() : '';
    return { status: r.status, body, headers: r.headers };
  } catch (e) {
    return { status: 0, body: '', error: String(e) };
  }
}

const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/gi, ' ')
                      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
                      .replace(/<[^>]+>/g, ' ')
                      .replace(/\s+/g, ' ').trim();
const attr = (tag, name) => (tag.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`, 'i')) || [])[1];
const decode = (s) => (s || '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
                               .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');

// ---------------------------------------------------------------------------
// Crawl
// ---------------------------------------------------------------------------
const seen = new Map();          // path -> page record
const queue = [...SEEDS];
while (queue.length) {
  const path = queue.pop();
  if (seen.has(path)) continue;
  const page = await fetchPage(path);
  seen.set(path, page);
  if (page.status !== 200) { F(`${path} -> HTTP ${page.status}`); continue; }
  for (const m of page.body.matchAll(/href="(\/[^"]*)"/g)) {
    const href = m[1];
    if (href.startsWith('/themes/')) continue;
    const base = href.split('#')[0];
    if (base && base.endsWith('/') && !seen.has(base) && !queue.includes(base)) queue.push(base);
    if (base && /\/page-\d+$/.test(base) && !seen.has(base) && !queue.includes(base)) queue.push(base);
  }
}

// ---------------------------------------------------------------------------
// Per-page audits
// ---------------------------------------------------------------------------
const titles = new Map(), descs = new Map();

for (const [path, page] of seen) {
  if (page.status !== 200) continue;
  const html = page.body;
  const id = path;

  // -- title
  const title = decode((html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1]?.trim());
  if (!title) F(`${id} missing <title>`);
  else {
    if (title.length < TITLE_MIN) W(`${id} title short (${title.length}): "${title}"`);
    if (title.length > TITLE_MAX) W(`${id} title long (${title.length}): "${title.slice(0, 50)}..."`);
    if (titles.has(title)) F(`${id} DUPLICATE title with ${titles.get(title)}: "${title.slice(0, 60)}"`);
    titles.set(title, id);
  }

  // -- meta description
  const descTag = (html.match(/<meta[^>]+name="description"[^>]*>/i) || [])[0];
  const desc = decode(descTag ? attr(descTag, 'content') : '');
  if (!desc) F(`${id} missing meta description`);
  else {
    if (desc.length < DESC_MIN) W(`${id} description short (${desc.length})`);
    if (desc.length > DESC_MAX) W(`${id} description long (${desc.length})`);
    if (descs.has(desc)) F(`${id} DUPLICATE description with ${descs.get(desc)}`);
    descs.set(desc, id);
  }

  // -- exactly one H1
  const h1s = [...html.matchAll(/<h1[\s>]/gi)].length;
  if (h1s === 0) F(`${id} has no <h1>`);
  else if (h1s > 1) F(`${id} has ${h1s} <h1> elements`);

  // -- canonical
  const canonTag = (html.match(/<link[^>]+rel="canonical"[^>]*>/i) || [])[0];
  const canon = canonTag ? attr(canonTag, 'href') : null;
  if (!canon) F(`${id} missing canonical`);
  else {
    if (!/^https:\/\//.test(canon)) F(`${id} canonical not absolute https: ${canon}`);
    if (canon.includes('localhost')) F(`${id} canonical points at localhost`);
    const canonPath = canon.replace(/^https?:\/\/[^/]+/, '');
    if (canonPath !== path) W(`${id} canonical path differs: ${canonPath}`);
  }

  // -- robots / noindex awareness
  const robotsTag = (html.match(/<meta[^>]+name="robots"[^>]*>/i) || [])[0];
  const robots = robotsTag ? attr(robotsTag, 'content') : '';
  if (/noindex/i.test(robots)) W(`${id} is NOINDEX (deliberate?)`);

  // -- Open Graph + Twitter
  for (const req of ['og:title', 'og:description', 'og:url', 'og:type']) {
    if (!new RegExp(`property="${req}"`, 'i').test(html)) F(`${id} missing ${req}`);
  }
  if (!/property="og:image"/i.test(html)) W(`${id} missing og:image (link previews will be bare)`);
  if (!/name="twitter:card"/i.test(html)) W(`${id} missing twitter:card`);

  // -- JSON-LD validity
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { F(`${id} INVALID JSON-LD: ${String(e).slice(0, 60)}`); }
  }
  if (!/application\/ld\+json/.test(html)) W(`${id} has no JSON-LD at all`);

  // -- images: alt coverage + lazy hints
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = m[0];
    const src = attr(tag, 'src') || '';
    const alt = attr(tag, 'alt');
    if (alt === undefined) F(`${id} img missing alt: ${src.split('/').pop()}`);
    else if (alt.trim() === '' && !/logo|icon/i.test(src)) W(`${id} img empty alt: ${src.split('/').pop()}`);
    if (!/loading\s*=/.test(tag) && !/logo/i.test(src)) W(`${id} img not lazy: ${src.split('/').pop()}`);
  }

  // -- heading order + word counts measure CONTENT, not chrome: the nav's h6
  //    column headers and footer headings are shared furniture, not page outline.
  const content = html.replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
                      .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
                      .replace(/<div class="hamenu"[\s\S]*?<!-- \/hamenu -->/gi, ' ');

  // heading order sanity (no h2 -> h4 skips) within content
  const levels = [...content.matchAll(/<h([1-6])[\s>]/gi)].map((m) => +m[1]);
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) { W(`${id} heading skip h${levels[i - 1]} -> h${levels[i]}`); break; }
  }

  // thin content
  const words = strip(content).split(' ').length;
  if (words < THIN_WORDS && !LIST_PAGES.has(path) && !/\/page-\d+$/.test(path)) W(`${id} thin content (~${words} words)`);

  // -- lang attribute
  if (!/<html[^>]+lang=/i.test(html)) F(`${id} missing <html lang>`);
}

// ---------------------------------------------------------------------------
// Site-level audits
// ---------------------------------------------------------------------------
{
  const robots = await fetchPage('/robots.txt');
  if (robots.status !== 200) F('robots.txt missing');
  else if (/^\s*Disallow:\s*\/\s*$/m.test(robots.body)) F('robots.txt blocks the whole site');
  else P('robots.txt present and permissive');

  const sitemap = await fetchPage('/sitemap.xml');
  if (sitemap.status !== 200) W('sitemap.xml missing (build-time generation is owned by Aamir)');
  else {
    P('sitemap.xml present');
    const locs = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    if (locs.some((l) => l.includes('localhost'))) F('sitemap contains localhost URLs');
    for (const l of locs) {
      const p = l.replace(/^https?:\/\/[^/]+/, '');
      if (seen.get(p)?.status !== 200 && !seen.has(p)) W(`sitemap lists uncrawled/missing page: ${p}`);
    }
  }

  const fav = await fetchPage('/favicon.ico');
  if (fav.status !== 200 && ![...seen.get('/').body.matchAll(/rel="(?:shortcut )?icon"/g)].length)
    W('no favicon.ico and no <link rel="icon">');
}

// ---------------------------------------------------------------------------
// /insights/ integrity
//
// The thread filter is client-side and its labels come from ONE list in
// tajmahal.yaml (context.threads). Things that can drift silently as posts are
// added - all of them user-visible lies, so they fail the build:
//   - a post with a `thread` no filter knows about is unreachable
//   - a post with no `thread` at all belongs to nothing
//   - the archive outgrowing page_size means the filter only cuts page one
//   - a `heroProof` figure with no note, or no proof rows at all
// ---------------------------------------------------------------------------
{
  const page = seen.get('/insights/');
  if (!page || page.status !== 200) {
    W('/insights/ not crawled - skipping integrity checks');
  } else {
    const html = page.body;
    const known = new Set(
      [...html.matchAll(/class="lens"[^>]*data-thread="([^"]*)"/g)].map((m) => m[1]).filter((k) => k !== 'all')
    );
    const rowThreads = [...html.matchAll(/class="post-row"[^>]*data-thread="([^"]*)"/g)].map((m) => m[1]);

    if (!known.size) F('/insights/ has no thread filters - context.threads is empty or not loaded');
    if (!rowThreads.length) F('/insights/ index has no rows');

    const missing = rowThreads.filter((t) => !t).length;
    if (missing) F(`/insights/ ${missing} post(s) have no thread: in frontmatter`);

    const unknown = [...new Set(rowThreads.filter((t) => t && !known.has(t)))];
    if (unknown.length) F(`/insights/ post(s) use unknown thread(s): ${unknown.join(', ')}`);

    for (const k of known) {
      if (!rowThreads.includes(k)) F(`/insights/ thread "${k}" has no posts - remove it or write one`);
    }

    // Pagination would make the client-side filter cut only the visible page.
    if (/aria-label="Pagination"/.test(html))
      F('/insights/ is paginated - the thread filter would only cut the current page (raise page_size)');

    // The hero's proof rows: every figure needs its explanatory note, or the
    // number stands unqualified - which is exactly what we tell people not to do.
    const figs = [...html.matchAll(/class="pv-fig">([^<]*)</g)].map((m) => m[1].trim());
    const notes = [...html.matchAll(/class="pv-note">([^<]*)</g)].map((m) => m[1].trim());
    if (!figs.length) F('/insights/ hero has no proof rows - no post carries heroProof');
    if (figs.length !== notes.length || notes.some((n) => !n))
      F(`/insights/ ${figs.length} heroProof figure(s) but ${notes.filter(Boolean).length} note(s) - each needs heroProofNote`);

    if (!unknown.length && !missing && figs.length && figs.length === notes.length)
      P(`/insights/ integrity: ${rowThreads.length} posts, ${known.size} threads, ${figs.length} proof rows`);
  }
}

// ---------------------------------------------------------------------------
// No public stand on code/IP ownership or lock-in (Aamir, 2026-08-05)
//
// The honest answer is "it depends on the project type and the deal", so the
// site must never state one - not in copy, not in an FAQ answer, not in a meta
// description or JSON-LD blob. Ownership and exit terms are negotiated per
// engagement and belong in the contract. This gate exists because the claims
// are easy to re-add in good faith (they read like reassurance) and impossible
// to spot by eye across 55 pages. See the Non-negotiables in CLAUDE.md.
//
// What we DO say - mainstream hireable technology, documentation as a
// deliverable, decisions written down, handover - is true regardless of terms
// and is deliberately NOT matched here.
// ---------------------------------------------------------------------------
{
  const BANNED = [
    /\block[- ]?in\b/i,           // \b prevents matching "blocking" / "interlocking"
    /locked (?:in|to|into)\b/i,
    /lock you\b/i,
    /owns? the code\b/i,
    /the code (?:and|&) (?:the )?IP\b/i,
    /\byour IP\b/i,
    /IP (?:is|are) yours\b/i,
    /code and IP\b/i,
    /\byou own\b/i,
    /you can walk\b/i,
    /walk away (?:with|owning)\b/i,
    /goes with you\b/i,
    /trap you\b/i,
  ];
  const strip = (html) =>
    html
      .replace(/<script(?![^>]*ld\+json)[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<[^>]+>/g, ' ');

  let hits = 0;
  for (const [path, page] of seen) {
    if (page.status !== 200 || !page.body) continue;
    const meta = [...page.body.matchAll(/<meta[^>]+content="([^"]*)"/g)].map((m) => m[1]).join(' ');
    const text = strip(page.body) + ' \n ' + meta;
    for (const re of BANNED) {
      const m = text.match(re);
      if (m) {
        hits++;
        F(`${path} states a code/IP ownership or lock-in position ("${m[0].trim()}") - deal-dependent, must not appear publicly`);
      }
    }
  }
  if (!hits) P('no public code/IP ownership or lock-in stand on any page');

  // -- Unconfirmed response SLA (editorial review, 2026-08-11): "one business
  //    day" is an operational commitment nobody has made - who owns the inbox,
  //    coverage during absence, escalation. Until that exists, the site says
  //    "reviews it and responds", never a clock. Remove this gate only when
  //    the SLA is operationally committed by Aamir.
  let slaHits = 0;
  for (const [path, page] of seen) {
    if (page.status !== 200 || !page.body) continue;
    const meta = [...page.body.matchAll(/<meta[^>]+content="([^"]*)"/g)].map((m) => m[1]).join(' ');
    const text = strip(page.body) + ' \n ' + meta;
    if (/one business day/i.test(text) || /within 24 hours/i.test(text)) {
      slaHits++;
      F(`${path} promises a response SLA ("one business day"/"24 hours") - not operationally committed`);
    }
  }
  if (!slaHits) P('no unconfirmed response-time SLA on any page');

  // -- Publication metadata (editorial program P1): every insights article
  //    declares its audience, content type and evidence label from the
  //    approved sets - rendered as mt-* metas by the article template. An
  //    unlabeled article, or an invented label, fails the build.
  const AUD = new Set(['engineering', 'enterprise']);
  const CT = new Set(['field-report', 'engineering-deep-dive', 'engineering-report', 'decision-framework', 'architecture-analysis', 'executive-brief']);
  const EV = new Set(['Production field evidence', 'Reproducible benchmark', 'Architecture analysis', 'Experience-based estimate', 'Research synthesis', 'Technical specification', 'Enterprise decision framework']);
  let labeled = 0;
  for (const [path, page] of seen) {
    if (!/^\/insights\/[a-z0-9-]+\/$/.test(path) || page.status !== 200) continue;
    const get = (n) => (page.body.match(new RegExp(`<meta name="${n}" content="([^"]*)"`)) || [])[1];
    const aud = get('mt-audience'), ct = get('mt-content-type'), ev = get('mt-evidence');
    if (!aud || !ct || !ev) { F(`${path} missing publication metadata (audience/contentType/evidenceType)`); continue; }
    if (!AUD.has(aud)) F(`${path} audience "${aud}" not in the approved set`);
    if (!CT.has(ct)) F(`${path} contentType "${ct}" not in the approved set`);
    if (!EV.has(ev)) F(`${path} evidenceType "${ev}" not in the approved set`);
    labeled++;
  }
  if (labeled) P(`${labeled} insights article(s) carry approved publication metadata`);
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
const say = (label, arr) => { if (arr.length) { console.log(`\n${label} (${arr.length})`); for (const m of arr) console.log('  ' + m); } };
console.log(`SEO check against ${BASE} - ${seen.size} pages crawled`);
say('FAIL', fail);
say('WARN', warn);
console.log(`\n==== ${fail.length ? 'FAILURES PRESENT' : 'NO FAILURES'} | pages:${seen.size} fail:${fail.length} warn:${warn.length} ====`);
process.exit(fail.length ? 1 : 0);
