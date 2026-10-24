# The method, explained (style proof)

Made after Aamir's verdict on the cinematic scenes (2026-10-20): "This is too much Hollywood. It
should be balanced like an Apple website: good effects, telling real things. Effects and
interactions should simplify the explanation of the concept."

**Open `index.html`** (needs internet for fonts and GSAP). Scroll.

## The idea

One section, the Keystone Method, told as a scroll story. Text steps scroll on the left; one diagram
stays on the right and changes exactly one thing per step:

1. **Survey:** six departments, all connected to one person in the middle.
2. **Document:** the person's knowledge (six mint dots) leaves them and lands on pages.
3. **Design:** the handoffs re-point from the person to the written process.
4. **Set the keystone:** the written process becomes the centre; the person steps aside as reviewer.
5. **Bear load:** work flows, three measures rise, and **Remove the person** shows the work carries on.

## The rules this proof holds itself to (use them for every section)

1. **One change per step.** The motion is the explanation; if a movement explains nothing, delete it.
2. **Real words and roles.** Plain labels from the real subject (Sales, Orders, Billing). No
   decoration, no invented numbers; the diagram is labelled "illustration".
3. **Colour means "this changed".** Mint appears only on what the step just did.
4. **No spectacle.** No glow, particles, camera moves, film grain or shake. Easing and timing do the
   polish (0.4 to 1.1 s, one easing family).
5. **Large, calm type** carries the story; the diagram supports it.
6. **Interaction answers a question.** The one button ("Remove the person") exists because it
   answers "what if they leave?".
7. **Content first.** Rest state is complete and legible; reduced-motion removes the transitions.

## Where the other work fits

- `keystone-film` and `software-scenes` are the high-spectacle end. Aamir judged them too much.
  Keep them as a reference for tone; use at most an ambient, restrained version where they help.
- Apply this treatment to the other sections: the quiet killers, a change travelling, the work
  stage, the services. Each gets one diagram, one change per step, real content.

## Notes

- Built with SVG and GSAP (no WebGL), so it is cheap, crisp and works without a GPU.
- Mobile: the diagram sticks to the top, steps scroll underneath.
- Possible refinements: the people could carry real role names, a short real example could replace
  the six generic dots, and step 5's measures need real definitions before they show values.
