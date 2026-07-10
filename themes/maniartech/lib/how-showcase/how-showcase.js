/* ManiarTech — About > "How we work" spotlight.
   One principle at a time: a clickable index drives a spotlit stage, and the
   active row auto-advances (the CSS progress bar's animationend fires `next`,
   so pause-on-hover and reduced-motion come free from CSS). Plain DOM, no deps. */
(function () {
  'use strict';
  var root = document.getElementById('howShowcase');
  if (!root) return;
  var items = Array.prototype.slice.call(root.querySelectorAll('.hw-item'));
  var panels = Array.prototype.slice.call(root.querySelectorAll('.hw-panel'));
  var N = Math.min(items.length, panels.length);
  if (N === 0) return;

  function num(i) { return ('0' + (i + 1)).slice(-2); }
  for (var i = 0; i < N; i++) {
    var n = num(i);
    var numEl = items[i].querySelector('.hw-num'); if (numEl) numEl.textContent = n;
    var ghost = panels[i].querySelector('.hw-ghost'); if (ghost) ghost.textContent = n;
    items[i].setAttribute('aria-selected', 'false');
    items[i].setAttribute('tabindex', i === 0 ? '0' : '-1');
  }

  var active = -1, activatedAt = 0;
  var nowFn = (window.performance && performance.now) ? function () { return performance.now(); } : function () { return 0; };
  function setActive(i) {
    if (i === active || i < 0 || i >= N) return;
    active = i; activatedAt = nowFn();
    for (var k = 0; k < N; k++) {
      var on = k === i;
      items[k].classList.toggle('is-active', on);
      items[k].setAttribute('aria-selected', on ? 'true' : 'false');
      items[k].setAttribute('tabindex', on ? '0' : '-1');
      panels[k].classList.toggle('is-active', on);
    }
  }

  // auto-advance: the active row's progress bar finishes -> go to next
  items.forEach(function (it, i) {
    var bar = it.querySelector('.hw-progress');
    if (bar) bar.addEventListener('animationend', function () {
      // guard against environments that fast-forward CSS animations (real
      // browsers take the full 6s, so this only blocks spurious instant fires)
      if (it.classList.contains('is-active') && nowFn() - activatedAt > 1500) setActive((i + 1) % N);
    });
    it.addEventListener('click', function () { setActive(i); it.focus(); });
    it.addEventListener('keydown', function (ev) {
      if (ev.key === 'ArrowDown' || ev.key === 'ArrowRight') { setActive((active + 1) % N); items[active].focus(); ev.preventDefault(); }
      else if (ev.key === 'ArrowUp' || ev.key === 'ArrowLeft') { setActive((active - 1 + N) % N); items[active].focus(); ev.preventDefault(); }
      else if (ev.key === 'Home') { setActive(0); items[0].focus(); ev.preventDefault(); }
      else if (ev.key === 'End') { setActive(N - 1); items[N - 1].focus(); ev.preventDefault(); }
    });
  });

  setActive(0);
})();
