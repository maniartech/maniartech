# Growth scripts

Each script lives in its **own directory** with a detailed README covering execution, safety, and
when to run. All scripts are **Node 18+**, dependency-free, and run with `node <path-to>.mjs`.

| Directory | Script | Purpose | Read/Write | Run when |
|---|---|---|---|---|
| [`site-health/`](site-health/) | `site-health.mjs` | On-page SEO/health check (routes, meta, canonical, JSON-LD, robots/sitemap) | **Read-only** (safe anytime) | Weekly + after template/config changes + before launch |
| [`submit-to-search-engines/`](submit-to-search-engines/) | `submit-to-search-engines.mjs` | IndexNow submission (Bing/Yandex/...) + Google/Bing manual guide | **Outward-facing** (read its README first) | Launch day, then per new page |

Read each script's own README before running it. Convention for any future script: **its own
directory + a README** documenting purpose, usage, safety/dos-and-donts, and when to run.
