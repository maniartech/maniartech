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
// Conversion density (added 2026-08-11, P7/P8 close-out).
//
// The substance pages earn the ask; they do not repeat it. Each one carries
// EXACTLY ONE conversion - "Discuss a system" -> /contact/, placed after the
// evidence - and never routes its primary ask to the estimator, which is a
// separate scoping tool with its own entrances.
//
// Counted in the BODY only: <main> excludes the global header and footer, both
// of which legitimately carry a /contact/ link on every page. Counting the
// whole document would measure the chrome, not the page.
// ---------------------------------------------------------------------------
{
  const ONE_CONVERSION = ['/services/', '/services/enterprise-software-engineering/',
                          '/services/application-software-engineering/', '/services/modernization/',
                          '/services/ai/', '/how-we-work/'];
  let hits = 0;
  for (const path of ONE_CONVERSION) {
    const page = seen.get(path);
    if (!page || page.status !== 200) { F(`${path} not crawled - conversion density unverified`); hits++; continue; }
    const main = page.body.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    if (!main) { F(`${path} has no <main> - body CTAs cannot be separated from the chrome`); hits++; continue; }
    const est = [...main[1].matchAll(/href="\/estimate\/[^"]*"/g)].length;
    const con = [...main[1].matchAll(/href="\/contact\/[^"]*"/g)].length;
    if (est) { F(`${path} routes to the estimator in the body (${est} link(s)) - the estimator is not this page's conversion`); hits++; }
    if (con !== 1) { F(`${path} has ${con} body /contact/ conversion(s) - expected exactly 1, after the evidence`); hits++; }
  }
  if (!hits) P('substance pages carry exactly one body conversion and no estimator route');
}

// ---------------------------------------------------------------------------
// Foundry hero integrity (added 2026-08-14). Two regressions this gate exists
// to stop, both of which actually happened:
//
//  1. The hero was shrunk to fit the exhibit above the fold - overriding
//     `.view-hero`'s `min-height: 100svh` with `min-height: 0`. The rule is
//     that "evidence above the fold" is solved by DESIGNING the hero (a proof
//     band at its foot), never by removing it. Height cannot be measured over
//     HTTP, but the override that causes it is a string in the compiled CSS.
//  2. A page shipped without its proof band, leaving a prose-only hero with
//     nothing of the project in it.
// ---------------------------------------------------------------------------
{
  const FOUNDRY_DETAIL = [
    '/foundry/internet-object/', '/foundry/uexl/', '/foundry/signals/',
    '/foundry/vault-storage/', '/foundry/gotime/', '/foundry/tajmahal-ssg/',
    '/foundry/gocurl/', '/foundry/gowork/', '/foundry/indigo/',
    '/products/processious/', '/products/ordin/', '/products/documentor/',
    '/products/tallery-gallery/', '/products/booster/'];
  let hits = 0;
  for (const path of FOUNDRY_DETAIL) {
    const page = seen.get(path);
    if (!page || page.status !== 200) { F(`${path} not crawled - Foundry hero unverified`); hits++; continue; }
    const hero = page.body.match(/<header[^>]*class="[^"]*\bfd-hero\b[^"]*"[\s\S]*?<\/header>/i);
    if (!hero) { F(`${path} has no .fd-hero header`); hits++; continue; }
    const bands = [...hero[0].matchAll(/class="vh-strip fd-proof"/g)].length;
    if (bands !== 1) { F(`${path} hero has ${bands} proof band(s) - expected exactly 1 project-specific specimen`); hits++; }
    // The hero must not carry a sales CTA; artifacts only (repo, spec, demo).
    if (/href="\/contact\/|href="\/estimate\//.test(hero[0])) {
      F(`${path} hero contains a conversion link - the hero carries artifacts, never a sales CTA`); hits++;
    }
  }
  // The compact override, in whatever whitespace form the compiler emits.
  // NOTE: the theme's stylesheet hrefs are RELATIVE ("../../themes/..."), so this
  // fetches the compiled bundle by its known absolute path instead of scraping
  // the href - an earlier version scraped it, matched nothing, and silently
  // skipped the check entirely, which is exactly the failure a gate must not have.
  const sheet = await fetchPage('/themes/maniartech/lib/style.css');
  if (sheet.status !== 200) {
    F(`compiled stylesheet unreachable (HTTP ${sheet.status}) - hero height rule unverified`); hits++;
  } else if (/\.fd-hero\s*\{[^}]*min-height\s*:\s*0/.test(sheet.body)) {
    F('.fd-hero overrides min-height to 0 - the compact hero is REVERTED; heroes own 100svh'); hits++;
  }
  if (!hits) P('every Foundry detail hero is full-height and carries exactly one proof band');
}

// ---------------------------------------------------------------------------
// Separator character (added 2026-08-11, P8). The ASCII-first rule: a middot
// between two facts survives nothing - it mangles the moment a reader pastes a
// line into LinkedIn, a form, or a plain-text editor. The separator is "|".
// Scoped deliberately to U+00B7 only: the site's em-dashes and arrows are a
// settled typographic choice, and widening this would fail hundreds of lines
// nobody has decided to change.
// ---------------------------------------------------------------------------
{
  let hits = 0;
  for (const [path, page] of seen) {
    if (page.status !== 200 || !page.body) continue;
    // Both spellings: the literal character and the entity a template may emit.
    const n = (strip(page.body).match(/·|&middot;|&#0*183;|&#x0*b7;/gi) || []).length;
    if (n) { F(`${path} renders ${n} middot separator(s) - use "|" (ASCII-first)`); hits += n; }
  }
  if (!hits) P('no middot separators in rendered copy');
}

// ---------------------------------------------------------------------------
// Fragment reachability (added 2026-08-11, P7).
//
// The crawl already fails a link whose PAGE is missing, but not one whose
// ANCHOR is missing - and that is the failure that actually happened: deleting
// the service section files left seven dead #anchors in the main navigation,
// on all 57 pages, silently. An in-site link that scrolls nowhere is a broken
// link, so it fails here.
// ---------------------------------------------------------------------------
{
  const broken = new Map();                 // "href (reason)" -> [pages]
  for (const [path, page] of seen) {
    if (page.status !== 200 || !page.body) continue;
    for (const m of page.body.matchAll(/href="([^"]*#[^"]+)"/g)) {
      const href = m[1];
      if (/^https?:/i.test(href)) continue;
      const i = href.indexOf('#');
      const target = href.slice(0, i) || path;
      const frag = href.slice(i + 1);
      if (!frag || !target.startsWith('/')) continue;
      const tp = seen.get(target) || (seen.set(target, await fetchPage(target)), seen.get(target));
      const why = tp.status !== 200 || !tp.body
        ? `target HTTP ${tp.status}`
        : new RegExp(`\\sid="${frag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(tp.body) ? null : 'no such id';
      if (!why) continue;
      const key = `${href} (${why})`;
      if (!broken.has(key)) broken.set(key, []);
      broken.get(key).push(path);
    }
  }
  for (const [key, pages] of broken)
    F(`fragment link goes nowhere: ${key} - on ${pages.length} page(s), e.g. ${pages[0]}`);
  if (!broken.size) P('every in-site #fragment link resolves to a real id');
}

// ---------------------------------------------------------------------------
// Claims Aamir has ruled must not be published (2026-08-11).
//
// Two families, both of which had already leaked back onto live pages once:
//   (a) staffing ABSOLUTES - "senior-only delivery", "we don't learn on your
//       project", "no juniors" - promises about who touches the work that no
//       engagement can guarantee unconditionally. The publishable form is the
//       commitment we control: senior-led, and no substitution of trainees for
//       the engineers presented during the engagement.
//   (b) unqualified CURRENT certification. The certificates run on a fixed
//       audit cycle, so "ISO-certified" in the present tense is a claim about
//       today that only the registrar can make. Naming the standards, the
//       management systems and the audit is fine; asserting present validity is
//       not. Client certifications (a lab's own NABL/ISO status, verified from
//       their public evidence) are about someone else and are not caught here.
// ---------------------------------------------------------------------------
{
  const BANNED = [
    [/senior[- ]only\s+(?:delivery|team|staffing)/i, 'staffing absolute'],
    [/we\s+don'?t\s+learn\s+on\s+your\s+project/i, 'staffing absolute'],
    [/no\s+juniors?\b/i, 'staffing absolute'],
    [/(?:experienced\s+engineers|senior\s+engineers)\s+only\b/i, 'staffing absolute'],
    [/\bwe\s+(?:are|'re)\s+ISO[- ]certified\b/i, 'unqualified current certification'],
    [/\bISO[- ]certified\s+(?:process|system|company|firm)/i, 'unqualified current certification'],
    [/\bwe\s+hold\s+(?:a\s+)?(?:current\s+)?ISO[^.]{0,40}certification/i, 'unqualified current certification'],
    [/\bcertification\s+is\s+current\b/i, 'unqualified current certification'],
  ];
  let hits = 0;
  for (const [path, page] of seen) {
    if (page.status !== 200 || !page.body) continue;
    // Head metadata counts too - a description is published copy.
    const text = strip(page.body) + ' ' + [...page.body.matchAll(/<meta[^>]+content="([^"]*)"/g)].map((m) => decode(m[1])).join(' ');
    for (const [re, family] of BANNED) {
      const m = text.match(re);
      if (m) { F(`${path} publishes a ruled-out claim (${family}): "${m[0].trim()}"`); hits++; }
    }
  }
  if (!hits) P('no ruled-out staffing or certification absolutes on any page');
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

    // The audience doors filter on data-audience; a row without a valid one is
    // unreachable through an entrance.
    const rowAud = [...html.matchAll(/class="post-row"[^>]*data-audience="([^"]*)"/g)].map((m) => m[1]);
    const badAud = rowAud.filter((a) => a !== 'engineering' && a !== 'enterprise').length;
    if (rowAud.length !== rowThreads.length || badAud)
      F(`/insights/ ${badAud || rowThreads.length - rowAud.length} row(s) missing or invalid data-audience`);

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

  // -- Unverifiable credential claims (white-paper review, 2026-08-11). We
  //    described a client laboratory as "US FDA-accredited"; that could not be
  //    verified from public evidence (the lab's own site says government
  //    approved / QMS certified), and US FDA does not "accredit" laboratories
  //    in the way the phrase implies. Accreditation and approval regimes are
  //    NOT interchangeable - NABL accreditation, state FDA/CDSCO approval,
  //    FSSAI recognition and ISO certification each mean something different.
  //    Naming a specific regime for someone else's business requires a current
  //    certificate in hand. Remove a pattern here only when Aamir supplies one.
  let credHits = 0;
  for (const [path, page] of seen) {
    if (page.status !== 200 || !page.body) continue;
    const meta = [...page.body.matchAll(/<meta[^>]+content="([^"]*)"/g)].map((m) => m[1]).join(' ');
    const text = strip(page.body) + ' \n ' + meta;
    for (const re of [/US\s*FDA[- ]accredited/i, /FDA[- ]accredited/i, /USFDA[- ]accredited/i]) {
      const m = text.match(re);
      if (m) {
        credHits++;
        F(`${path} claims "${m[0].trim()}" for a client - unverified credential, and FDA approval is not accreditation`);
      }
    }
  }
  if (!credHits) P('no unverified FDA-accreditation claim on any page');

  // -- Overreaching evidence language in white papers (same review). The
  //    gamification paper's original "reliably backfire" conclusion exceeded
  //    what Mekler 2013/2017 establish (no significant intrinsic-motivation
  //    effect either way; output quantity rose). These absolutes are the exact
  //    phrasings that were corrected; they must not return.
  let overHits = 0;
  for (const [path, page] of seen) {
    if (!/^\/white-papers\/[a-z0-9-]+\/$/.test(path) || page.status !== 200 || !page.body) continue;
    const meta = [...page.body.matchAll(/<meta[^>]+content="([^"]*)"/g)].map((m) => m[1]).join(' ');
    const text = strip(page.body) + ' \n ' + meta;
    for (const re of [
      /reliably backfire/i,
      /structurally impossible/i,
      /hard veto/i,
      /\bnever rank individuals\b/i,
      /would ever have produced/i,
      /exactly what this model predicts/i,
    ]) {
      const m = text.match(re);
      if (m) {
        overHits++;
        F(`${path} uses an evidence-overreaching phrase ("${m[0].trim()}") corrected in the 2026-08-11 review`);
      }
    }
  }
  if (!overHits) P('no corrected overreach phrasing has returned to the white papers');

  // -- /standards/ publication accuracy (2026-08-11 revision). This page is the
  //    easiest on the site to overstate, because every project genuinely exists
  //    and the difference between "we built it" and "you can inspect it" is one
  //    careless sentence. Six distinctions must never collapse: a public
  //    specification, public source, a public concept note, an unpublished spec
  //    offered for private review, an internal implementation, and something
  //    ready to adopt. Internet Object is the ONLY project with a publicly
  //    accessible specification; UExL and NITES/GoTime have public code with
  //    unpublished specs; Indigo, FUSE and AddressQL are concept notes over
  //    private work. Update these constants only when the underlying fact
  //    changes - i.e. when a spec is actually published, or UExL gets a license
  //    and a tagged release.
  {
    const st = seen.get('/standards/');
    if (!st || st.status !== 200 || !st.body) {
      F('/standards/ did not render - the publication-accuracy gates could not run');
    } else {
      const html = st.body;
      const text = strip(html);
      let sHits = 0;
      const SF = (msg) => { sHits++; F(`/standards/ ${msg}`); };

      // (a) the visible working-draft notice and its review date
      if (!/Public working draft/i.test(text)) SF('is missing the visible "Public working draft" notice');
      if (!/Last reviewed\s+\d{1,2}\s+\w+\s+\d{4}/i.test(text)) SF('is missing the "Last reviewed <date>" stamp');
      if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html)) SF('must stay indexable - noindex found');

      // (b) only Internet Object may be described as having a public specification
      for (const m of text.matchAll(/(public(?:ly accessible|ly available)?\s+specification)/gi)) {
        const around = text.slice(Math.max(0, m.index - 190), m.index + 190);
        const claimsOther = /\b(UExL|NITES|Indigo|FUSE|AddressQL)\b/i.test(around) &&
                            !/only|not (?:yet )?public|unpublished|standalone specification is not/i.test(around);
        if (claimsOther) SF(`describes a project other than Internet Object as having a "${m[1]}" - only Internet Object does`);
      }

      // (c) phrasings corrected in this revision must not return
      for (const [re, why] of [
        [/spec below/i, '"spec below" - the page carries descriptions, not the specifications'],
        [/maturing in the open/i, '"maturing in the open" - private work is not maturing in the open'],
        [/labeled honestly/i, '"labeled honestly" - state the status, do not claim honesty'],
        [/implementation complete/i, '"implementation complete" for UExL - licensing, API freeze, CI and a release remain'],
        [/here'?s the spec to critique/i, 'offers a spec to critique that is not published'],
      ]) {
        const m = text.match(re);
        if (m) SF(`uses ${why}`);
      }

      // (d) UExL is public source with no license and no tagged release - it is
      //     not open source and not production-ready until both exist.
      const uexlWin = text.slice(Math.max(0, text.search(/\bUExL\b/i) - 100));
      for (const re of [/UExL[^.]{0,120}open[- ]source/i, /open[- ]source[^.]{0,120}UExL/i,
                        /UExL[^.]{0,120}production[- ]ready/i, /production[- ]ready[^.]{0,120}UExL/i]) {
        if (re.test(uexlWin)) SF('calls UExL open-source or production-ready before it has a license and a release');
      }

      // (e) private review must never read as unrestricted source access
      for (const re of [/full (?:source|repository) access/i, /complete source (?:code )?access/i,
                        /we(?:'| w)ll send you the (?:source|repo)/i, /unrestricted access/i]) {
        const m = text.match(re);
        if (m) SF(`describes private review as unrestricted source access ("${m[0].trim()}")`);
      }

      // (f) every registry row carries all four facts (rendered as these spans)
      const rows = [...html.matchAll(/<li>\s*<a href="#[^"]+">([\s\S]*?)<\/a>\s*<\/li>/g)].map((m) => m[1]);
      if (rows.length < 6) SF(`registry renders ${rows.length} rows - expected the full authored set`);
      for (const row of rows) {
        const name = (row.match(/class="sr-name">([^<]*)/) || [])[1] || '?';
        for (const [cls, fact] of [['sr-public', 'public visibility'], ['sr-review', 'private-review availability'],
                                   ['sr-stand', 'maturity'], ['sr-adopt', 'adoption guidance']]) {
          const cell = row.match(new RegExp(`class="${cls}[^"]*">([^<]*)`));
          if (!cell || !cell[1].trim()) SF(`registry row "${name.trim()}" is missing ${fact}`);
        }
      }

      // (g) every public artifact named on the page must be linked and reachable
      const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
      for (const url of ['https://docs.internetobject.org/', 'https://play.internetobject.org/',
                         'https://github.com/maniartech/InternetObject-js',
                         'https://github.com/maniartech/uexl-go',
                         'https://github.com/maniartech/gotime']) {
        if (!hrefs.some((h) => h.startsWith(url))) SF(`names a public artifact without linking it: ${url}`);
      }

      if (!sHits) P('/standards/ publication status, registry facts and artifact links are accurate');
    }
  }
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
