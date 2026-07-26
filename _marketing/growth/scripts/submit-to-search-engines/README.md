# submit-to-search-engines.mjs

Notifies search engines that maniartech.com pages exist or changed, so they get crawled sooner.
Automates everything that CAN be legitimately automated (via the IndexNow protocol), and gives you
exact instructions for the one part that cannot (Google).

**This is an OUTWARD-FACING script.** It sends real requests to external search engines about your
live site. Read the Safety section before the first real run.

---

## The honest scope (why it does not "auto-submit to Google")
| Engine | How | Automatable? |
|---|---|---|
| **Bing, Yandex, Seznam, Naver** (+ other IndexNow participants) | IndexNow API, one POST | **Yes** - this script |
| **Google** | Search Console: verify domain + submit sitemap (one-time) | **No** - manual, by design |
| **Bing** (also) | Can import from Google Search Console in one click; also honors IndexNow | Partly |

Google **retired** its sitemap-ping endpoint in 2023, and its Indexing API is officially limited to
job-posting / broadcast content - using it for ordinary business pages violates Google's terms and
can get a site penalized. So there is **no honest script for Google**. Any tool claiming otherwise is
either hitting the dead ping endpoint (does nothing) or abusing the Indexing API (risky). The right
path is the one-time Google Search Console step, and `guide` prints it.

## Prerequisites
- **Node 18+** (built-in fetch). No dependencies.
- The site must be **LIVE** (IndexNow verifies ownership by fetching a key file from your domain).
- Run the commands from anywhere; paths are resolved relative to the script.

## Commands
```bash
# 0. See the full picture, including the Google/Bing manual steps
node submit-to-search-engines.mjs guide

# 1. ONE-TIME: generate your IndexNow key -> writes root/<key>.txt
node submit-to-search-engines.mjs init
#    then COMMIT root/<key>.txt and DEPLOY (it must be live at https://maniartech.com/<key>.txt)

# 2. Submit the whole sitemap (Bing/Yandex/Seznam/Naver) - do this on launch day
node submit-to-search-engines.mjs submit

# 2b. Preview what would be sent, sending nothing
node submit-to-search-engines.mjs submit --dry-run

# 3. Notify about ONE new page (run each time you publish a blog post)
node submit-to-search-engines.mjs submit-urls https://maniartech.com/insights/your-new-post/
```

## The correct order (important)
1. Site is deployed and live.
2. `init` -> commit the generated `root/<key>.txt` -> deploy again (key file now live).
3. `submit`. (It refuses to run if the key file is not reachable, or if the sitemap has
   localhost / off-host URLs - so you cannot broadcast a broken sitemap.)
4. Separately, do the **Google Search Console** one-time step from `guide` - this is the important one.

## When to run
- **Launch day:** `init` (once, before), then `submit` after the key file is live.
- **Every time you publish a new page/post:** `submit-urls <that url>`. Fast, targeted, polite.
- **After a big content refresh:** `submit` again (re-submitting the full sitemap is fine).
- **Do NOT** run `submit` on a schedule / in a loop - see rate limits below.

## Safety - dos and don'ts
- **DO** run `guide` and `--dry-run` freely; they send nothing to search engines.
- **DO** treat the IndexNow key file (`root/<key>.txt`) as PUBLIC - it is meant to be served openly.
  It is not a secret and grants no access to anything; it only proves you control the domain for
  IndexNow. Committing it to the repo is correct and expected.
- **DON'T** spam it. IndexNow is for real changes. Submitting the same unchanged URLs repeatedly can
  earn a `429` (too many requests) and is pointless. One submit at launch, then per-new-page, is right.
- **DON'T** run it before the site is live - it will fail the ownership check, and there is nothing to crawl.
- **DON'T** submit URLs for pages that are `noindex` or not meant to be public - you would be asking
  engines to crawl pages you told them to ignore (mixed signal). The script pulls from your sitemap,
  which should already exclude noindex stubs (verify per `../../SITEMAP-GUIDELINES.md`).
- **This script does not touch Google.** It cannot accidentally do anything against Google's terms,
  because it never calls Google. Google is 100% the manual GSC flow.
- No credentials are stored or transmitted. The only "auth" is the public key file, by design.

## Exit codes & responses
- Clean exit on success. Non-zero exit on error (missing key, unreachable key file, broken sitemap).
- IndexNow HTTP responses: `200`/`202` = accepted; `403` = key not found/live; `422` = URL/host
  mismatch; `429` = too many requests (back off).

## Related
- `../../SITEMAP-GUIDELINES.md` - the sitemap this script reads must be correct first.
- `../site-health/README.md` - verify the site is healthy before submitting it.
