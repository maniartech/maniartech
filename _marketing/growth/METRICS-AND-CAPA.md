# Metrics, Checkpoints & CAPA - are we on track, and what do we do when not

> The verification spine. Weekly one-line log; formal checkpoints at 2 weeks, 30/60/90 days,
> 6 and 9 months. Every miss gets a CAPA entry: root cause -> corrective action (fix it now)
> -> preventive action (stop it recurring). Honest numbers only - this log is for steering,
> not for feeling good.

## Data sources (all free)
- Google Search Console (impressions, clicks, queries, coverage, links) - PRIMARY
- Bing Webmaster (same, smaller)
- GA4 (sessions, sources, estimate-CTA conversions)
- LinkedIn analytics (post impressions, followers)
- GitHub (stars/traffic per repo), directory dashboards (profile views)
- `scripts/site-health/site-health.mjs` (technical health)
- `LEADS.md` (ground truth: actual inbound)

## KPIs (keep to these; vanity metrics excluded)
| KPI | Source | Why it matters |
|---|---|---|
| Indexed pages | GSC coverage | Is Google seeing the site at all |
| Search impressions/wk + trend | GSC | Leading indicator of all SEO work |
| Clicks/wk + top queries | GSC | Are the RIGHT queries appearing (brand vs service vs tech) |
| Brand-query rank (ManiarTech, Maniar Technologies, Aamir Maniar, Maniar) | GSC + manual incognito | Entity ownership |
| Referring domains (new/total) | GSC links | Authority growth (launch effectiveness) |
| Estimate submissions + qualified leads | GA4 + LEADS.md | The only number that pays |
| LinkedIn: impressions/wk, followers delta | LI analytics | Social engine health |
| Site health | script | Never regress silently |

## Baseline (fill at pre-flight, before go-live)
<!-- date | indexed: | impressions/wk: | clicks/wk: | ref domains: | LI followers: | stars(io/uexl/signals): -->

## Weekly log (Friday, ONE line - see WEEKLY-ROUTINE)
Format:
`YYYY-MM-DD | idx:N | impr:N | clicks:N | refdom:N | LI impr:N | leads:N | health:PASS/FAIL | note`
<!-- append below -->

## Checkpoints & honest thresholds
> Targets, not predictions. AMBER = investigate; RED = CAPA entry mandatory.

### CP-2W (W2)
- Indexed: 15+ of ~36 pages (GREEN) / 5-14 (AMBER) / <5 (RED -> coverage report diagnosis:
  robots? canonical? sitemap errors? request indexing again)
- site-health: PASS all
- Social: 6+ posts out, zero missed weeks

### CP-30D (W4)
- Indexed: 25+ / brand query "ManiarTech" = #1 (GREEN)
- Impressions: any consistent upward weekly trend (GREEN); flat near zero (AMBER - normal-ish
  but check queries); zero impressions entirely (RED - technical problem, not patience problem)
- Launch #1 done: ANY genuine traction (front page OR 10+ real comments OR 5+ ref domains) = GREEN;
  flopped = AMBER (normal - retro, adjust angle, next one)
- 1+ directory profile live with 1+ verified review in progress

### CP-60D (W8)
- Impressions: 4+ consecutive weeks up-trend; service/vertical queries starting to appear
- Ref domains: +10 or more vs baseline (launches working) / +3-9 AMBER / <+3 RED
- First organic estimate submission by now = GREEN (0 = AMBER: check the funnel itself -
  does the CTA work, is copy landing - not just SEO volume)

### CP-90D - the 3-month gate ("effects showing")
- GREEN looks like: 30+ pages indexed; impressions clearly trending (order of hundreds+/day
  in aggregate); brand SERP owned (ManiarTech #1, Aamir Maniar profile+site page 1);
  Tier 3 branded-tech terms ranking; 2-3 launches done with 15+ new referring domains total;
  LI posting streak intact; 2+ real leads logged; 3 verified directory reviews
- If broadly AMBER: SEO timelines are honest - stay the course, tighten the weakest workstream
- If broadly RED: full CAPA - usually cause is (a) technical indexing fault, (b) cadence
  collapsed, or (c) content targeting wrong queries. All three are fixable; find WHICH.

### CP-6M (Jan) - compounding visible
- Tier 1 vertical terms (LIMS etc.) page 1-2; Tier 2 long-tail terms appearing in top 20;
  steady weekly organic clicks; leads monthly not quarterly; 25+ ref domains total;
  4-5 launches done; guest posts + 1-2 podcasts live

### CP-9M (Apr) - "full fledge"
- Multiple Tier 1/2 terms page 1; organic = a reliable weekly lead channel; brand entity solid
  (knowledge-panel-grade signals: GBP live, Wikidata, consistent citations); decide next
  9 months incl. deferred scope (newsletter, paid tests, product funnels)

## CAPA log (append per miss)
Template:
```
CAPA-NNN | date | checkpoint | what missed (number vs threshold)
CAUSE (be specific - "posts stopped W6-W8" not "SEO is slow"):
CORRECTIVE (fix now, owner=Aamir, deadline):
PREVENTIVE (system change so it cannot recur):
VERIFY (which checkpoint confirms closure):
```
<!-- append below -->

## Standing preventive rules (learned-in-advance)
1. Two consecutive skipped social weeks -> officially reduce cadence (2/wk) instead of failing 3/wk.
2. Any site-health FAIL older than 7 days -> it becomes Monday's first task, before content.
3. A launch flop is AMBER, never RED - the queue has 6+ properties; retro and continue.
4. Never respond to a slow month by inflating claims. The moat is calibration.
5. If leads arrive but do not convert -> that is a POSITIONING/funnel issue, route it to the
   site/estimator, not to "more marketing volume".
