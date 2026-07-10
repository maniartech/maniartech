/* Home hero — the machine names itself.
 *
 * The gear caption ends with one word that slowly crossfades through the
 * business systems the machine stands for. Meaning without interaction:
 * nothing to hover, nothing tracks the rotating artwork (the lesson from the
 * per-gear-hover attempt — pointer interaction on moving geometry jitters).
 * Reduced motion gets a static list instead of a cycle.
 */
(function () {
  'use strict';

  var WORDS = ['sales', 'billing', 'operations', 'inventory', 'reporting', 'people'];
  var HOLD_MS = 2400;   // how long each word rests
  var FADE_MS = 350;    // must match the CSS opacity transition

  function init() {
    var el = document.getElementById('gcWord');
    if (!el) return;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = 'sales, billing, operations & more';
      return;
    }

    var i = 0;
    el.textContent = WORDS[0];
    setInterval(function () {
      el.classList.add('is-fading');
      setTimeout(function () {
        i = (i + 1) % WORDS.length;
        el.textContent = WORDS[i];
        el.classList.remove('is-fading');
      }, FADE_MS);
    }, HOLD_MS);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
