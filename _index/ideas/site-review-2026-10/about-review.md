# About page review

Reviewed 2026-10-11 from `themes/maniartech/templates/about.html`, the `site/about/*.md`
sections, and section-by-section screenshots at 1440x900. Findings only; no code changed.

## What the page is for
A skeptical buyer lands here to answer one question: "is this a real, accountable company
I can trust with money?" The page should therefore be a page of verifiable facts and people.
Today it is mostly prose plus two decorative visuals.

## Section by section

| # | Section | Verdict | Why |
|---|---|---|---|
| 1 | Hero: headline + interactive Rubik's cube ("Complexity, solved.") | Weak | The cube is the stock "we solve complex problems" image. It is technically nice (it scrambles and solves) but says nothing specific about ManiarTech, and the page's own message is about people and conduct, not puzzles. No person, place or number is visible in the first screen. |
| 2 | The founder: one heading + two paragraphs | Weak | No face, no timeline, a big empty band below the text (about 250px). The facts are strong but delivered as a paragraph. |
| 3 | How we work: six tabs with ghost numeral | Good structure, two flaws | The ghost numeral "02" collides with the panel title (they overlap on the right). And five of the six principles are repeated on Home ("What you can count on") and again in the Team paragraph. |
| 4 | The team: copy plus a roster card | Mixed | The roster card (one lead, six specialism chips, 2010 / ISO / +1) is a good idea. "+1 only when the work justifies it" is cryptic. The paragraph repeats ISO and senior-led claims a third time. |
| 5 | What drives us: terminal with typed commands | Right idea, weak execution, one claim problem | At rest it is a mostly empty dark box. See the licence issue below. |
| 6 | Closing CTA | Redundant | "Let's talk about what you're building." is immediately followed by the footer's "Let's build something that lasts." Two closers back to back, plus the header CTA. |

## Claim and canon issues (fix before anything else)

1. **UExL "go get" in the terminal.** The terminal prints `go get github.com/maniartech/uexl-go`
   with "Every line above runs today". The Foundry register says UExL has no licence granted and
   is "not adoptable". Inviting a `go get` contradicts that status. Replace the line with
   "read the source" or drop it.
2. **Countrywide Financial is bolded** in the founder paragraph. The Presentation Doctrine says
   to demote it to a plain list item (2008 baggage). JP Morgan and Patni are bold too, so the
   emphasis pattern is arbitrary.
3. **JP Morgan weight.** Your 2026-08-31 ruling (recorded in `home.html`) was that one year at
   JP Morgan is not hero-weight. The About founder paragraph opens with it in bold. Decide
   whether About should follow the same ruling.
4. **Team paragraph typo-style wording:** "Mohamed Aamir Maniar - Aamir - Managing Director"
   reads as a broken sentence.
5. **ISO is stated four times** on the page (hero lead, team paragraph, roster stat, footer
   badge) with no cert numbers or "verify with the registrar" link, which is what makes it
   verifiable.

## What is missing

- Where the company is: legal entity and "Thane, Maharashtra" appear only in the footer. For an
  offshore-trust-gap page this belongs in the first screen.
- A face: the founder (photo or a candid working shot) and, if real, the second named
  engineer. The canon notes a real second face matters.
- A dated timeline: 1999 career start, 2010 founded, ISO milestones, first products. It makes
  "27 years" and "since 2010" tangible.
- Proof of delivery: not one client, case study or outcome is linked from About.
- A verifiable-facts block: entity, registration year, ISO certificate numbers with the
  registrar's verify route, LinkedIn, public repositories.

## Motion and visuals

- **Cube:** keep only if you like it. It is the best-built piece on the page. Use it smaller,
  or move it, so the first screen leads with people and proof.
- **How-we-work tabs:** good pattern (it mirrors CodeRabbit's numbered pillars). Fix the ghost
  numeral overlap, and cut the duplication with Home.
- **Terminal:** show all four commands and their results at rest, animate only the cursor.
- **Roster card:** the strongest "show real content" element; extend it into the main visual.

## Suggested direction (for discussion)

1. First screen: headline, a founder portrait, and a four-cell facts strip (entity and place,
   since 2010, ISO with cert numbers, 27 years). Cube moves lower or becomes a small accent.
2. Founder: a short dated timeline instead of a paragraph.
3. How we work: keep the tabs, remove the overlap and the repeats; link each principle to a
   proof (a case study, the ISO page, the security page).
4. Team: keep the roster card; reword "+1".
5. What drives us: the terminal at rest shows all commands; remove the UExL install line.
6. One closing CTA.

## Priorities

| Priority | Change |
|---|---|
| P0 | Remove the UExL `go get` line; unbold Countrywide; fix the team-paragraph wording |
| P1 | Facts strip and place in the first screen; ISO with cert numbers and verify route |
| P1 | Fix the ghost-numeral overlap; remove duplicated principles |
| P2 | Founder timeline and portrait; terminal fully visible at rest |
| P2 | Single closing CTA; cube smaller or moved |
