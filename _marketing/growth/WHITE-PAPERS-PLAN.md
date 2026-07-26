# White Papers & Research Briefs - execution plan

> Aamir's directive (2026-07): data-backed, no-fluff research on modern tech / AI / enterprise
> systems, 100% correct data + analysis, shareable on LinkedIn, cadence ~1 per 15 days, starting
> after launch. This plan makes that SUSTAINABLE and BRAND-SAFE. Strategy/canon lives in
> `_inbox/RESEARCH-PAPERS-SECTION.md`; this is the execution/cadence/methodology layer.

## Cadence decision (UPDATED 2026-07 - Aamir): biweekly IS the plan, resourced
Canon's "~1/quarter" was calibrated to a solo-founder-as-only-writer constraint. Aamir is relaxing
that: **a dedicated person + Claude Cowork orchestration** for research/drafting/charting/PDF/
first-pass fact-check. That makes biweekly PRODUCTION feasible - conceded. So biweekly is the baseline,
NOT ~quarterly. But two risks that tooling does NOT solve govern how we run it (see Guardrails):
1. **Original data does not scale with compute.** AI accelerates writing/synthesis, not the generation
   of new primary data. A biweekly cadence will drift toward synthesis-of-others'-data unless
   deliberately fed original ManiarTech measurements. That drift is the real quality risk, not throughput.
2. **"100% correct" gets HARDER at speed.** More AI draft volume = more hallucinated citations and
   subtly-wrong numbers. The verification gate is the one step that cannot parallelize away - a human
   must open every source and own every figure. The dedicated person's PRIMARY job is verification.

The two-tier split below is still useful as an INTERNAL scoping tool (not every topic warrants 20
pages; scoping the biweekly ones tight keeps them sharp) even if everything is labeled publicly as
"ManiarTech Research" / "White Paper":

| Tier | What | Length | Cadence | Data basis |
|---|---|---|---|---|
| **Research Brief** | One tight question, one dataset, one clear finding | 3-6 pages | **Every 15 days** | Own benchmark/project data, OR a single reproducible experiment, OR a precisely-cited primary source + original ManiarTech analysis |
| **White Paper** | Deep, multi-section, flagship study | 10-20 pages | **~Quarterly** (every 6-8 wks if a strong one is ready) | Combines original data + synthesis + POV; the marquee assets |

The biweekly drumbeat = Research Briefs. White Papers punctuate. Both are 100%-data-backed and pass
the same verification gate. This gives the cadence WITHOUT the treadmill-quality collapse.
> If Aamir prefers a single label, call them all "ManiarTech Research" and vary depth - but keep the
> deep-vs-brief distinction internally so the biweekly ones are scoped tightly enough to be real.

## GUARDRAILS (what keeps biweekly from becoming biweekly slop)
Non-negotiable, because at 24/year the failure mode is silent erosion, not a single bad paper:
1. **Verification is owned by a named human who signs off.** AI does first-pass fact-check; a human
   opens every source, re-runs/spot-checks every reproducible figure, and stakes their name on the
   piece. This does NOT parallelize - budget real time for it every cycle. No sign-off, no publish.
2. **Original-data floor: at least 1 in 3 pieces must carry ORIGINAL ManiarTech data** (Tier A), not
   pure synthesis. This forces the differentiator to stay alive and surfaces when the original-data
   well is running dry (which is the biweekly cadence's real failure mode).
3. **Two tripwires that force a slow-down:**
   - Any factual error found AFTER publish -> mandatory public correction + a retro + the next cycle
     slows to fix the process gap. One caught error on a "100% correct" brand costs more than a skipped
     fortnight. (Governing Rule #1.)
   - Two consecutive pieces that are pure synthesis with no original ManiarTech angle -> the pipeline
     is running dry; PAUSE new topics and replenish original data (run a benchmark, mine a real project)
     before resuming. Do not paper over an empty well with more citations.
A slipped fortnight is fine and expected. An unverified number, or a quarter of pure-synthesis
commodity content, is not.

## THE NON-NEGOTIABLE: how "100% correct data" is actually guaranteed
This is the core of the whole plan. Every quantitative claim in every piece must be ONE of:
1. **Reproducible from a published harness** - our own benchmark with the method + repo public, so a
   reader can re-run it (Internet Object size/token benchmark, UExL allocation benchmark). GOLD -
   this is the brand's radical-verifiability edge; prefer it.
2. **Cited to a primary, dated, linkable source** - the actual survey/paper/official doc, not "studies
   show" and not a blog citing a blog. Format: claim [Source, Org, Year, URL]. Secondary sources must
   trace to their primary.
3. **Explicitly labeled as an estimate/assumption** - with the assumption stated ("assuming X req/s...")
   so the reader can judge it. Never dress an estimate as a measurement.

Anything that fits none of the three does NOT go in the paper. No exceptions.

**The verification gate (before every publish):** a dedicated claim-audit pass - every number and every
factual sentence checked against its source/harness, every source link opened and confirmed live +
dated, every reproducible claim actually re-run or spot-checked. (Claude can run this adversarially,
same method as the service-page claim audit - one agent tries to falsify each claim.) A paper does not
ship with a single unverified number.

**On "100% correct analysis":** data can be 100% correct; ANALYSIS involves judgment, so the honest
promise is *rigorous, defensible analysis with assumptions stated and uncertainty acknowledged* - which
is MORE credible than false certainty, and on-brand. A brief that says "here is what we measured, here
is what we cannot conclude from it" beats one that overreaches. Acknowledging limits is a feature.

## What ManiarTech can credibly own (topic pipeline, by data strength)

### Tier A - ORIGINAL ManiarTech data (strongest; lead with these)
- **The token tax: how data-format choice changes LLM cost at scale** - Internet Object vs JSON,
  our reproducible benchmark (size + ~30% fewer tokens on multi-record data). AI + enterprise + our
  own research. ★ The ideal opener - modern, data-backed, uniquely ours.
- **Zero-allocation expression evaluation in Go** - UExL production study (allocations, GC pressure,
  where it wins/loses). Reproducible harness already public.
- **Fifteen years of one system** - what makes enterprise software survive (LIMS longevity, 600
  forms -> 1); our real project data, honestly framed ("by the lab's account").

### Tier B - ManiarTech POV + precisely-cited primary data (the analysis is original)
- **What ships vs what demos: AI in enterprise operations** - Documentor experience + cited AI-adoption
  data; the honest "when AI is NOT the answer" angle.
- **The bus-factor tax** - quantifying single-point-dependency risk in enterprise systems (ties to the
  Keystone method), with cited data on knowledge-loss/turnover cost.
- **Data formats and RAG grounding** - reducing hallucination surface / cost in enterprise AI pipelines.
- **A risk model for legacy modernization** - rewrite vs strangler-fig, with a cost/risk framework.
- **Automate vs augment** - a decision framework for enterprise processes.

### Tier C - rigorous synthesis (use sparingly; weakest differentiation)
- Syntheses of primary industry data (DORA/Accelerate, Stack Overflow Developer Survey, official
  benchmarks) WITH a ManiarTech analytical layer. Only if the analysis adds something original - never
  a summary of others' findings (that is commodity content the brand should avoid).

> Maintain this as a living pipeline: each idea gets a one-line thesis + its intended data basis
> (which of the 3 verification categories) BEFORE it is scheduled. No data basis = not scheduled.

## Structure of a piece (no-fluff template)
1. **Title** - a claim or a question, not a topic ("The token tax", not "About data formats").
2. **TL;DR / key finding** (3-4 sentences) - the answer up front; respect the reader's time.
3. **Why it matters** (the decision the reader faces).
4. **Method / sources** - what we measured or which sources, stated plainly. Reproducibility link.
5. **Findings** - data, charts, the numbers. Every figure sourced/reproducible.
6. **Analysis** - what it means, assumptions stated, limits acknowledged.
7. **What to do with it** - actionable for the reader's real decisions.
8. **Verify it yourself** - the harness/repo/source links. The brand signature.
9. Author byline + date + a low-key "talk to us about this" CTA.
No filler sections, no padding to hit a page count. A tight 4-pager beats a bloated 15-pager.

## Production workflow (founder-fit, per-piece)
1. **Pick from pipeline** - thesis + data basis confirmed.
2. **Gather/measure** - run the harness, or collect + open every cited source.
3. **AI drafts** from the verified data + Aamir's POV (write, do not perform).
4. **VERIFICATION GATE** - adversarial claim-audit; every number + source confirmed. (Claude.)
5. **Aamir voice pass + approval** - it must sound like him and he must stand behind every claim.
6. **Produce PDF** - dogfood with MDKit; host the web version on Taj Mahal (/white-papers/).
7. **Publish on-site (canonical)** -> LinkedIn -> other channels (see below).

## LinkedIn & distribution
- **On-site page is canonical** (SEO + the durable asset); LinkedIn is distribution (same rule as the
  blog syndication - `SOCIAL-AI-PIPELINE.md`).
- LinkedIn formats: (a) **native PDF document post** (LinkedIn renders it swipeable) - best for briefs;
  (b) a **summary post + link** to the on-site paper; (c) a **carousel** of the key findings. Rotate.
- Each piece feeds the weekly social batch for 1-2 weeks (announce, then a key-finding follow-up).
- Papers double as **sales enablement** (share with a prospect) and **partner collateral**.

## Total content load (with a dedicated person + Cowork)
Blog 2/month + briefs 2/month = ~4 substantial pieces/month. With a dedicated researcher/writer this
is now feasible - the founder-time bottleneck is relieved. Two notes so it stays coherent, not just
high-volume:
- **The dedicated person's #1 job is VERIFICATION, then research, then writing** - in that priority.
  If they optimize for output over rigor, the brand erodes faster at 24/year than at 4/year. Hire/brief
  for a researcher's temperament (treats an unverified claim as unshippable), not a content marketer's.
- **Still worth integrating the streams where natural** - a research brief is premium content that can
  seed that fortnight's blog + LinkedIn, so 4 pieces do not mean 4 unrelated efforts. But with the
  resource, they CAN run as parallel tracks if desired.
- **Aamir's role compresses to POV + final sign-off**, not drafting - which is the right use of founder
  time and keeps his voice/accountability on every piece without making him the bottleneck.

## Sequencing (post-launch)
The growth CALENDAR currently pegs the first white paper at M6. Aamir's directive moves research
earlier. Reconciled plan:
- **Launch + 2 weeks:** Research Brief #1 = **the token tax** (Tier A, data ready, maximally on-brand,
  AI + enterprise). This also unlocks the White Papers section in nav (canon gate: >=1 real paper).
- **Then biweekly briefs** from the Tier A/B pipeline, verification-gated.
- **~Quarter 1:** first deep **White Paper** (expand the strongest brief, or the LIMS-longevity study).
- Update CALENDAR M-milestones to reflect this once Aamir confirms the cadence/tier split.

## Open decisions for Aamir
1. **Tier split OK?** (Briefs biweekly + White Papers quarterly, one quality bar) - or insist on
   "white paper" label for all, varying depth?
2. **Total load:** integrate streams (recommended ~2-3/month multi-channel) or run blog + briefs as
   separate biweekly tracks?
3. **Byline:** "ManiarTech Research" / "Aamir Maniar" / team? (Canon open Q.)
4. **Access:** fully open (recommended) or optional "get the PDF" email capture?
5. **First 3 topics** to lock from the Tier A/B pipeline (recommend: token tax, then bus-factor tax,
   then what-ships-vs-demos).
6. **Charts/data viz** - OK to use the dataviz standards for figures? (Consistent, accessible visuals
   raise the credibility of a data paper significantly.)
