# ManiarTech site review - positioning, motion, CodeRabbit comparison

Reviewed 2026-10-11 against the local build at http://localhost:7000 (Home, About) and the
theme source in `themes/maniartech/templates/`. Screenshots taken with headless Chrome at
1440x900, one per section. No code was changed.

---

## 1. Positioning: is it too consultancy-oriented?

**Yes.** Measured against what the page actually says, Home reads as a services firm that
happens to have products, not an engineering shop that ships its own technology.

Evidence, in page order:

| Section | What it says | Reads as |
|---|---|---|
| Hero H1 | "The software your business runs on - engineered right, and built to last." | Generic agency promise; any dev shop could sign it |
| Hero CTAs | "Discuss a system" / "See how we work" | Consulting intake, not a product or proof |
| "Is this you?" | 5 buyer pains (manual ops, aging system, burned before) | Lead-gen funnel copy |
| "Four ways we build" | 4 service lines | Services catalogue |
| Proof | One case study (Chemo Test Lab) | Good - the only place real UI appears |
| "What you can count on" | 6 checkmark promises | Process assurances, abstract |
| Founder | 27 years, JP Morgan-era | Credibility, but biography-shaped |
| Foundry | "We don't just use technology - we make it" | **The most differentiated material, placed 9th of 11** |
| Close | "Tell us what you're building" | Consulting CTA again |

Root cause: the documented Presentation Doctrine (`_inbox/PRESENTATION-DOCTRINE.md`, RESUME
objective 4) deliberately says *depth (the Foundry) is the closer, never the opener*. The site
executes that doctrine faithfully. So the "too consultancy" feel is not a bug in execution - it
is the doctrine working. Changing it is a strategy decision, not a copy tweak.

**What a product/engineering-led positioning looks like** (without breaking the doctrine's real
concern, which is scaring a cold buyer with exotic tech):

- **Lead with a thesis, not a promise.** CodeRabbit opens with a point of view ("The future
  isn't writing code. It's reviewing it."). An equivalent for ManiarTech is a claim about how
  software should be built that the Foundry proves, e.g. "Most firms assemble software. We
  build the parts too." or "Software that outlives its authors." The services become the
  answer to the thesis instead of the headline.
- **Show the work in the first viewport.** The Chemo/Processious UI screenshot and the
  Internet Object playground are the strongest assets on the site and neither is visible
  above the fold.
- **Reframe services as outcomes of the platform.** "Four ways we build" becomes "What we've
  built with it", each line anchored to a real artifact (Processious -> enterprise workflows,
  RTL -> modernization, Documentor -> applied AI) rather than a pain statement.
- **Keep the safety layer, move it later.** The ISO / senior-review / mainstream-stack
  assurances stay, but as a compact proof strip, not a full section of checkmarks.
- **Keep "mainstream technology" explicit.** The real fear the doctrine guards against is
  lock-in to in-house tech. One line ("We build on Go, Python, React, PostgreSQL. Our own
  tools stay ours.") defuses it, so depth can move up without the risk.

## 2. Home and About animations and visuals

### Home hero - multicolour gear cluster (canvas)
**Not effective.**
- The gears are rainbow-coloured (red, purple, yellow, blue, orange) on a dark+mint brand. It
  is the only off-palette element on the page and pulls the eye away from the headline.
- "Gears = machinery = business systems" is the stock metaphor of the category; it says
  nothing ManiarTech-specific. It fails thumb rule 5 ("a hero shows what the page below
  cannot") - it shows nothing at all about the work.
- The rotating caption word ("operations") is 14px grey under the visual, so the one piece of
  motion carrying meaning is the least visible.
- Contrast with CodeRabbit: their hero motion carries *content* (a rotating verb in the H1,
  then a product panel); ours carries decoration.

### Home marquee - "ENTERPRISE SYSTEMS ENGINEERING * APPLICATION & PRODU..."
Low value. It repeats the four service names from the next section at display size, cropped
mid-word at both edges. It adds motion without information. CodeRabbit's marquee scrolls
*fake-but-realistic PR titles* - it is product evidence, not a label list.

### Home services cards - small SVG vizes (circuit path, bar chart, dots, line)
Mixed. The idea is right (each card has its own specimen) but the specimens are abstract -
bars, dots, a flat line - and three of four cards render as near-empty boxes at rest. They
read as placeholder art. Rule: show real content at rest. Replace with a cropped real UI
fragment per service.

### Home proof - Processious UI screenshot
**The best visual on the site.** Real UI, real data structure, "demo data" honestly labelled.
This is exactly the CodeRabbit move; it just needs to come earlier and be used more.

### Home stats (27 / 100% / 2 / 1999)
Fine as a strip; "100%" needs its label visible to be verifiable at a glance.

### About hero - Rubik's cube in dark+mint ("Complexity, solved.")
**Weak.** On-palette and well-rendered, but the Rubik's cube is the most common stock image for
"we solve complex problems". It conflicts with the page's own message ("honest by rule",
"deliberately small"), which is about people and conduct, not puzzles. A founder photo,
the team, or an artefact (a commit graph, a spec page) would be more honest and more
specific.

### About "How we work" - tabbed 01-06 list with big ghosted numeral card
**Effective.** Clear, scannable, numbered like CodeRabbit's pillars. Only issue: the content
duplicates Home's "What you can count on" almost line for line.

### About "What drives us" - typing terminal (`npm install vault-storage`)
**Right idea, weak execution.** A runnable command is perfect verifiability. But at rest the
terminal is ~80% empty dark box with one line of output, so a skimmer sees a void. Show the
whole transcript at rest (3-4 real commands across IO, UEXL, signals) and animate only the
cursor.

### General
- Copy served on :7000 still contains em-dashes throughout, contrary to the ASCII-first rule in
  `CLAUDE.md`. The source has them too (e.g. `themes/maniartech/templates/home.html:10`).
- The header CTA and hero CTA are identical ("Discuss a system"), and RESUME still lists the
  CTA routing ruling as open.

## 3. CodeRabbit comparison

What they do, and the concrete change for us:

| Dimension | CodeRabbit | ManiarTech now | Proposed change |
|---|---|---|---|
| Hero headline | 2-line contrarian thesis, rotating verb | 4-line generic promise | Short thesis H1 (<= 8 words); move the rotating word into the H1 |
| Hero layout | H1 left, subhead + 1 CTA top-right, product panel peeking at the fold | H1 + body + 2 CTAs + link + note left, gears right | Text band on top, a real product stage directly below, peeking into the first view |
| Product visuals | Live HTML mocks with realistic specific content, link to a real public PR | One screenshot, 4 abstract card vizes | A tabbed "product stage": Processious UI / IO playground / UEXL benchmark / Taj Mahal build - each with a "verify it" link to the live playground or repo |
| Taxonomy | Numbered pillars "01 Review" recur in hero tabs, sections, pricing | Services numbered on Home, standards numbered on About, unrelated | Pick one numbered taxonomy and repeat it everywhere |
| Motion | Restrained; motion lives inside product mocks (cycling tabs with timer bars, cycling thread) | Motion on decoration (gears, marquee, typing) | Remove decorative motion; animate the product stage only |
| Social proof | Logo grid + 3 big stats + one famous quote, right after hero | 1 testimonial carousel mid-page, stats near bottom | Proof strip immediately after hero: client names/logos, ISO 9001 / 27001, years, one strong quote with full attribution |
| CTA | One primary action repeated, white button with arrow | 3 CTAs in hero ("Discuss", "See how", "Estimate") | One primary ("Estimate a project", per RESUME objective 3) + one secondary |
| Type and colour | Neutral dark, colour only inside UI mocks and thin strokes, mono eyebrows | Dark + mint, fine; rainbow gears break it | Keep dark + mint; drop the rainbow; adopt mono eyebrows for code-ish labels |

Not worth copying: the funding announcement bar, and their density of feature lists - we do not
have a SaaS feature matrix to show.

## 4. Prioritized recommendations

1. **Decide the positioning question** (strategy, blocks the rest): keep the Doctrine's
   "Foundry as closer" or move to engineering-led, where real work leads and safety follows.
2. **Replace the home hero**: short thesis headline + one primary CTA, with a real product
   stage (tabbed, real screenshots/mocks, "verify it" links) directly below in the first view.
   Remove the rainbow gears.
3. **Proof strip right after the hero**: client names, ISO certs, years, one attributed quote.
   Move it up from mid-page.
4. **Cut the marquee** and the abstract service-card vizes; replace with real UI crops.
5. **About hero**: replace the Rubik's cube with something specific (founder/team or a real
   artefact).
6. **About terminal**: show the full transcript at rest, animate the cursor only.
7. **One numbered taxonomy** reused across Home, About, services and estimate.
8. **De-duplicate** Home "What you can count on" vs About "How we work".
9. **ASCII sweep** of served copy (em-dashes), per CLAUDE.md.
