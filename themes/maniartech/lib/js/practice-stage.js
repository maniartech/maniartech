/* Home > What we do - the practice stage arms on arrival.
 *
 * The first panel's at-rest open state (expansion + the blueprint drawing
 * itself) is gated behind `.is-armed`, added here the first time the stage
 * scrolls into view - so the animation plays where the visitor can actually
 * see it, instead of firing off-screen during page load. Fires once; hover
 * behaviour is pure CSS and needs nothing from this file. Reduced-motion
 * still arms - the CSS shows the finished state instantly. Without JS the
 * stage simply rests with four equal panels, hover intact.
 */
(function () {
  'use strict';

  function init() {
    var stage = document.querySelector('.practice-stage');
    if (!stage) return;
    if (!('IntersectionObserver' in window)) { stage.classList.add('is-armed'); return; }
    // Trigger on a VIEWPORT LINE, not on a fraction of the stage's own area:
    // an area threshold fires as soon as that share has peeked past the bottom
    // edge (35% of a 554px stage = 194px, i.e. while it is still at the very
    // bottom of the screen), and it also scales badly - a taller stage would
    // arm even earlier, and one taller than the viewport might never reach a
    // high threshold at all. Shrinking the root's bottom by 60% with
    // threshold 0 means: arm when the stage's top edge rises above 40% of the
    // viewport - the section is properly on screen, at any stage height.
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { stage.classList.add('is-armed'); io.disconnect(); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -60% 0px' });
    io.observe(stage);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
