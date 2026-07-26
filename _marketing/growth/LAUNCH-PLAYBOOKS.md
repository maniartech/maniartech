# Launch Playbooks - the single biggest authority lever

> One good launch per project, done by hand, to the right community. A single front-page
> HN/Reddit hit outweighs months of other link building - and even a modest one earns real
> links and real users. Cadence: max 1/month (sole founder; launch day costs 6-8h presence).

## Launch queue + gates (do not launch through a failed gate)
| # | Property | Angle (true + reproducible) | Gates before launch |
|---|---|---|---|
| 1 | Internet Object | "A schema-first data format: 40-60% smaller than minified JSON, ~30% fewer LLM tokens" | Playground up (play.internetobject.org), benchmark repo current, README polished, spec readable |
| 2 | UExL | "Zero allocations on the hot path - benchmarked vs cel-go and expr" | LICENSE chosen + committed, v0.1.0 tagged, README benchmark current, DO NOT link the stale comparison repo |
| 3 | signals v1.4 | "A tiny type-safe event system for Go" (release-note launch) | v1.4 shipped, changelog, examples |
| 4 | Taj Mahal SSG | "The Go SSG that builds maniartech.com and client sites" | Public repo, docs enough to try it, quickstart works cold |
| 5 | Indigo (teaser/RFC) | "A Go superset that compiles to idiomatic Go - RFC + design notes" | Aamir decides readiness; pre-1.0 honesty in the post itself |
| later | Booster / gotime / vault-storage / WebDoodling | per-project | screenshots scrubbed (Booster!), playground (WebDoodling) |

## The playbook (per launch)

### T-7 days (prep week - CALENDAR allocates it)
- [ ] Re-verify every claim in the launch copy against the repo TODAY (benchmarks re-run,
      numbers current). One wrong number on HN = the thread becomes about the wrong number.
- [ ] README pass: a stranger must get to "works on my machine" in under 5 minutes.
- [ ] Draft: Show HN title (2-3 variants), the FIRST COMMENT (context: who/why/how, honest
      status, known limitations - HN rewards self-aware honesty), r/golang variant post.
- [ ] Prepare answers to the 5 hardest questions (why not X? benchmarks rigged? one-person
      project? license? production-ready?). Honest answers, drafted calmly in advance.
- [ ] Check target community rules (r/golang self-promo rules; participate genuinely there
      in the weeks before - accounts with zero history get flagged).

### Launch day (Tue/Wed/Thu, submit 07:00-10:00 US-Eastern)
- [ ] Submit (Show HN / subreddit). Personal account, no vote solicitation - EVER
      (HN detects voting rings; it is also against Rule #1 in spirit).
- [ ] Be present 6-8h: answer every substantive comment fast, honestly, without defensiveness.
      Concede fair criticism ("fair point - filed") - it reads as strength.
- [ ] LinkedIn/X echo post AFTER traction exists (or next day) - link the discussion.
- [ ] Log: peak position, points, comments, referral traffic, stars delta, links earned.

### T+2 to T+7
- [ ] Answer stragglers; file real issues raised
- [ ] Launch retro blog post (true numbers only) - becomes social material
- [ ] Submit to aggregators where honest: Golang Weekly, awesome-go PR (follow their bar),
      relevant "alternatives to X" lists
- [ ] Update METRICS log + retro notes in this file (append below)

## Anti-patterns (never)
- Vote rings, engagement pods, launch-day begging DMs
- Launching with a stale benchmark or a 404 link anywhere in the post
- Arguing with critics; deleting critical comments
- Two launches in one month (attention debt + burnout)
- Automating Reddit/HN in any way

## Retro log (append per launch)
<!-- YYYY-MM-DD | property | venue | result (points/comments/position) | links earned | lessons -->
