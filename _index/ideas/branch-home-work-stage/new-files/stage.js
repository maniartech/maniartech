/* Home > the work stage: tab switching, keyboard roving, and a gentle auto-advance.
 *
 * Auto-advance only runs while the stage is on screen, the pointer and focus
 * are elsewhere, and the visitor has not chosen a tab themselves. The first
 * manual choice stops it for good. Reduced-motion: no auto-advance at all, the
 * stage simply rests on the first tab. Without JS the first panel is already
 * shown (server-rendered `is-on`), so nothing depends on this file.
 */
(function () {
  'use strict';

  var DURATION = 8000;

  function init() {
    var stage = document.querySelector('[data-stage]');
    if (!stage) return;
    var tabs = Array.prototype.slice.call(stage.querySelectorAll('[role="tab"]'));
    var panels = Array.prototype.slice.call(stage.querySelectorAll('[role="tabpanel"]'));
    if (tabs.length < 2) return;

    var current = 0, timer = null, visible = false, paused = false, manual = false;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    stage.style.setProperty('--ws-dur', (DURATION / 1000) + 's');

    function show(i, focus) {
      current = (i + tabs.length) % tabs.length;
      tabs.forEach(function (t, n) {
        var on = n === current;
        t.classList.toggle('is-on', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
      });
      panels.forEach(function (p, n) {
        var on = n === current;
        p.classList.toggle('is-on', on);
        if (on) p.removeAttribute('hidden'); else p.setAttribute('hidden', '');
      });
      if (focus) tabs[current].focus();
      restart();
    }

    function stop() {
      if (timer) { clearTimeout(timer); timer = null; }
      stage.classList.remove('is-timed');
    }

    function restart() {
      stop();
      if (reduce || manual || paused || !visible) return;
      // Re-trigger the CSS timer bar: drop the class, force a reflow, add it back.
      void stage.offsetWidth;
      stage.classList.add('is-timed');
      timer = setTimeout(function () { show(current + 1, false); }, DURATION);
    }

    function choose(i, focus) { manual = true; show(i, focus); }

    tabs.forEach(function (t, n) {
      t.addEventListener('click', function () { choose(n, false); });
      t.addEventListener('keydown', function (e) {
        var k = e.key;
        if (k === 'ArrowRight' || k === 'ArrowDown') { e.preventDefault(); choose(current + 1, true); }
        else if (k === 'ArrowLeft' || k === 'ArrowUp') { e.preventDefault(); choose(current - 1, true); }
        else if (k === 'Home') { e.preventDefault(); choose(0, true); }
        else if (k === 'End') { e.preventDefault(); choose(tabs.length - 1, true); }
      });
    });

    stage.addEventListener('mouseenter', function () { paused = true; restart(); });
    stage.addEventListener('mouseleave', function () { paused = false; restart(); });
    stage.addEventListener('focusin', function () { paused = true; restart(); });
    stage.addEventListener('focusout', function () { paused = false; restart(); });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        restart();
      }, { threshold: 0.35 }).observe(stage);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
