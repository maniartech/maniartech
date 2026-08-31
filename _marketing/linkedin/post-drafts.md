# LinkedIn post drafts - teardown format
(2026-08-28, third revision: buyer-first + teardown anatomy + LinkedIn form)

Every draft here follows the five-part teardown: **artifact -> diagnosis -> fix -> principle ->
soft invitation.** Buyer-first, 1,000-1,400 characters, one-sentence paragraphs, a hook that
survives the "see more" truncation, no external links, no CTA gimmick.

Rationale and evidence in `content-strategy.md`. ASCII only - no emoji, no smart quotes.

---

# Post A - The audit trail that is a diary
**Artifact:** an `approved_by` column presented as compliance evidence.
**Buyer point:** your process only exists where the software enforces it.

---

Most audit trails I get shown are one column.

approved_by. A name and a timestamp.

It looks like evidence. It isn't.

That column records a claim. It never enforced anything.

Nothing in it stopped the wrong person approving. Nothing stopped the value being edited
afterwards. Nothing proves the approver held that role on that date.

So when an auditor asks "under what authority," the column has no answer. The person does, from
memory.

The fix isn't a better column. It's moving the rule.

Who may approve a step belongs in the process definition, enforced at the transition itself. The
wrong person is refused outright - so there is nothing to record, because nothing happened.

And the record writes itself as a side effect of every permitted transition: who, what, from-state,
to-state, when. Nobody remembers to log it, because nobody logs it.

We built this for a 35-year-old NABL-accredited testing laboratory, where every report carries
regulatory weight. Their reports can still be verified by COA number on their public site.

If a person has to remember to record who approved what, you don't have an audit trail. You have a
diary.

Which one does your system have?

---

**Claim audit.** 35 years, NABL accreditation, transition-level role enforcement, the machine-written
who/what/when record and the public COA verifier are all from `_ia/case-studies/chemo.md` and
`foundry/processious/index.md`, already public on `/case-studies/chemo/`.

**Accreditation guard:** NABL only. Never "US FDA" - unverified, correction logged 2026-08-11 in
`_inbox/case-study-chemo-lab.md`.

**Needs your confirmation:** client permission to reference Chemo in a post under your name. The
case study is public on our site, so likely settled - worth being certain. (Note: this draft no
longer names them, so if permission is awkward, it already reads fine as written.)

**Deliberately absent:** Processious is unnamed. This post's power is that it isn't about a product;
naming one converts a diagnosis into an advertisement. The profile's Featured section carries the
link for anyone who goes looking.

---

# Post B - The benchmark with no losing number
**Artifact:** a vendor benchmark chart with three bars and no methodology.
**Buyer point:** how to separate an engineering partner from a good salesperson.

---

Every vendor benchmark you have seen was published by its winner.

That isn't fraud. It's selection.

Think about the last one you were shown. Three bars, theirs tallest.

What's missing is the machine it ran on, the versions of everything, how many runs, and which run
they kept. Without those, that chart isn't a measurement. It's a picture of one.

And one number is missing entirely: where their product is slowest.

Everything engineered has one. If a vendor can't tell you theirs in a sentence, they haven't
measured it - and you will, on your own project, after signing.

So here is ours.

We build an expression engine for Go called UExL. Used as designed it is fast, and we published the
comparison against the two best-known alternatives with the exact machine, compiler version and
method, so anyone can re-run it.

Used the obvious way instead - one call that parses, compiles and runs every time - it costs
roughly 10,000 nanoseconds per evaluation and allocates memory on each one.

That is the worst number on our own page. It is also the one a developer in a hurry reaches for
first.

It sits in our README next to the good numbers, in the same size type.

A number that only holds on the happy path isn't a measurement. It's an advertisement.

Ask your next vendor where their product is slow. How fast they answer tells you more than the
number does.

---

**Claim audit.** Methodology (AMD Ryzen 7 5700G, Windows/amd64, Go 1.26, `-benchmem`, warm-state
median of 6 runs), the published comparison against `expr` and `cel-go`, and the ~10,000 ns
one-shot `Eval()` cost with allocations are all from the uexl-go README as recorded in
`foundry/uexl/index.md`. "The two best-known alternatives" is a fair characterisation of `expr` and
`cel-go`, not a sourced fact - name them instead if you want to stay literal.

**Needs your confirmation:** none outstanding. The earlier draft's closing promise (that our project
reports carry a "what did not work" section) is cut - it was the one claim we could not yet stand
behind on every engagement.

**Deliberately absent:** the allocation counts (2 per custom function call, ~104 for a `|map:` over
100 items). True and strong, but they need "allocation" explained, which costs the opening. They
belong in the peer-channel version.

---

# Post C - The import that died on row 8,112
**Artifact:** a failed bulk import.
**Buyer point:** brittle data exchange is an operational risk, not a developer annoyance.

---

A 40,000-row import failed last night.

Row 8,112 had a stray comma.

The other 39,999 rows were fine. None of them loaded.

This is normal, which is the actual problem. Most data formats are all-or-nothing: the file parses
completely or not at all. One bad byte and you have nothing.

So the fix everyone reaches for is a retry, plus a person who checks the file first.

The real fix sits further back.

Records should be independent. A bad one gets reported with its position, and the rest still
arrive. Your pipeline degrades instead of stopping.

The second half is shape. JSON has no opinion about what a valid record looks like, so validation
becomes a separate layer somebody remembers to add. Put the schema inside the document and the
parse becomes the validation - data cannot reach your code unchecked.

We ended up publishing a format that does both, called Internet Object, because we kept losing
nights to row 8,112.

If one bad record can cost you the other 39,999, that is a design choice. Just not one anybody made
deliberately.

How does your pipeline handle its worst row?

---

**Claim audit.** Record independence ("one bad record must not break the rest" is a rule of the
specification, not one implementation's courtesy) and validation-during-parse are from
`foundry/internet-object/index.md`. The 40,000-row import and row 8,112 are an **illustrative
composite**, not a specific incident - see the confirmation note.

**Needs your confirmation:** the opening. It is written as a scene, and a reader will assume it
happened to us. Either (a) confirm a real incident we can stand behind, (b) reword to the generic
present - "A 40,000-row import fails. Row 8,112 has a stray comma." - which keeps the hook and
claims nothing, or (c) supply a real one. **Recommend (b)** unless you have a real incident; it
costs almost nothing and removes the only unverifiable line in the slate.

**Deliberately absent:** the byte-saving and token-saving numbers. They are the site's headline
figures, but they argue efficiency to a reader who is currently thinking about reliability. One
idea per post.

---

## The final gate, before any of these publish

Every post must pass the CLAIM AUDIT and the SKEPTIC TEST (doctrine), and then one more:

**Would you stop and read this if it were somebody else's post?**

If the honest answer is no, the post does not go out - regardless of how well it scores against the
format rules. Formula compliance produces posts that pass every checklist and that no senior person
stops for.
