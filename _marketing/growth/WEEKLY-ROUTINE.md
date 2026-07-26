# The Weekly Routine - sole-founder operating system

> The repeating engine. The CALENDAR says WHAT this week; this file says HOW every week runs.
> Time-boxed so it cannot eat engineering time. If pressed, the Monday block is the one
> that must survive.

## MONDAY - Social batch (60-90 min, hard stop)
1. (5 min) Open last week's metrics line (METRICS-AND-CAPA log) - anything on fire?
2. (10 min) Collect this week's raw material: what shipped, what was learned, which calendar
   items are due, any launch material in flight.
3. (30-45 min) AI drafting session - in a Claude session in this repo:
   "Run the weekly social batch per _marketing/growth/SOCIAL-AI-PIPELINE.md. This week's
   material: <paste 3-5 bullets>."
   Output: 3 LinkedIn posts (+ variants if a launch week), each with the Rule-#1 mini-audit.
4. (20 min) Aamir approves/edits each post. Reject anything that smells inflated - the brand
   IS the calibration.
5. (10 min) Schedule all posts (LinkedIn native scheduler: Tue / Thu / Sat mornings IST
   overlapping US-East morning where possible).

## TUESDAY-THURSDAY - Passive presence (15 min/day, phone-friendly)
- Reply to every comment on posts (same-day replies double reach; also: real humans notice).
- Accept relevant connection requests; note any inbound lead in the tracker (see below).
- NO doomscrolling. 15 minutes, then close.

## WEDNESDAY - Content block (2-3 h, calendar-driven)
- Whatever CALENDAR says this week: blog post (AI drafts from dossier -> Aamir rewrites in
  his voice -> publish), launch prep, directory profiles, vertical page, HARO pitches.
- One block, one deliverable. Do not split across five half-tasks.

## FRIDAY - Verification + close (45-60 min)
1. Run: `node _marketing/growth/scripts/site-health/site-health.mjs https://maniartech.com`
   - any FAIL -> fix now or file as next week's first task (do not let health rot).
2. GSC 5-minute scan: Coverage (indexed count moving?), Performance (impressions trend,
   any new queries worth noting), Manual actions (must always be zero).
3. Analytics 5-minute scan: sessions, top pages, estimate submissions this week.
4. Append ONE line to the metrics log (template in METRICS-AND-CAPA.md).
5. Tick completed CALENDAR items; roll incomplete ones forward EXPLICITLY (never silently).
6. (Launch weeks) Log links earned + referral spikes in the launch retro.

## The lead tracker (zero-tooling version)
A single file: `_marketing/growth/LEADS.md` (create on first lead). One line per inbound:
`date | source (organic/linkedin/launch/directory/referral) | who | ask | status | next step`
This is the ground-truth ROI record - every checkpoint review reads it.

## Weekly floor (the bad-week protocol)
Client crunch, travel, illness: do ONLY Monday's batch (45 min minimum: 2 posts, schedule).
Log the skipped week in the metrics log with reason. Two consecutive skipped weeks = flag it
in the next checkpoint as a CAPA item (cause: capacity; preventive action: reduce cadence
officially rather than fail silently - a sustainable 2 posts/week beats a collapsed 3).

## Rules that keep this honest and cheap
- Nothing publishes without Aamir's approval - AI drafts, human ships.
- Every claim in every post passes the mini claim-audit (SOCIAL-AI-PIPELINE).
- No engagement-bait ("Agree?", rage-hooks, fake polls). Understated maker-tone.
- Batch everything; never create content ad hoc on other days (that is how weeks die).
- ASCII text in all published copy (straight quotes, " - ", no emojis) per brand rule.
