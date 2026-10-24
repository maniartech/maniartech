/* Home > What we do: drives the four living vignettes.
 *
 * Only the LIVE card runs: the hovered or focused card, otherwise the first
 * (desktop accordion), or every card currently on screen (stacked mobile). A
 * card that is not live is stopped and shows its finished, readable state - the
 * same state it has with no JS or under reduced-motion. A visitor's own click on
 * a card's button takes over from the auto-loop for that card.
 *
 * All text and numbers shown are illustrative; nothing here is a measurement.
 */
(function () {
  'use strict';

  var stage = document.querySelector('[data-practice]');
  if (!stage) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var panels = Array.prototype.slice.call(stage.querySelectorAll('.svc-panel'));
  var stacked = window.matchMedia ? window.matchMedia('(max-width: 991px)') : { matches: false };

  function all(panel, sel) { return Array.prototype.slice.call(panel.querySelectorAll(sel)); }
  function caption(panel, text) { var el = panel.querySelector('[data-live]'); if (el) el.textContent = text; }

  /* ---- 01 build: one slider from blueprint to production ---------------------- */
  function build(panel) {
    var app = panel.querySelector('[data-app]');
    var range = panel.querySelector('[data-scrub]');
    var live = panel.querySelector('.ba-live');
    var p = 1, raf = 0, manual = false, t0 = 0;
    var DUR = 5200;          // blueprint -> production
    var HOLD = 1600;         // linger on the finished product

    function words(v) {
      if (v < 0.34) return 'Blueprint: scope and structure agreed';
      if (v < 0.67) return 'Build: components, data, states';
      return 'Production: shipped, with the decisions on record';
    }
    function set(v) {
      p = Math.max(0, Math.min(1, v));
      if (app) app.style.setProperty('--p', String(p));
      if (range) range.value = String(Math.round(p * 100));
      if (live) live.style.opacity = p > 0.93 ? '1' : '0';
      caption(panel, words(p));
    }
    function ease(x) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }
    function frame(ts) {
      if (!t0) t0 = ts;
      var el = ts - t0;
      if (el < DUR) set(ease(el / DUR));
      else if (el < DUR + HOLD) set(1);
      else { t0 = ts; set(0); }
      raf = requestAnimationFrame(frame);
    }
    function stopRaf() { if (raf) { cancelAnimationFrame(raf); raf = 0; } t0 = 0; }
    function start() {
      if (raf || manual || reduce) return;
      raf = requestAnimationFrame(frame);
    }
    if (range) range.addEventListener('input', function () {
      manual = true; stopRaf(); set(range.value / 100);
    });
    return { start: start, stop: function () { if (!manual) { stopRaf(); set(1); } } };
  }

  /* ---- 02 modernize ------------------------------------------------------ */
  function modern(panel) {
    var blocks = all(panel, '.md-blk');
    var env = panel.querySelector('[data-env]');
    var n = blocks.length, done = n, timer = null, manual = false, swapTimer = null;

    function paint(swappingAt) {
      blocks.forEach(function (b, i) { b.classList.toggle('is-new', i < done); });
      if (env) {
        var on = swappingAt !== undefined && swappingAt !== null;
        env.classList.toggle('is-on', on);
        if (on) env.setAttribute('x', String(+blocks[swappingAt].getAttribute('x') - 4));
      }
      caption(panel, done + ' of ' + n + ' seams replaced | still serving');
    }
    function step() {
      if (done >= n) { done = 0; paint(); return; }
      paint(done);                       // the rollback envelope is drawn first
      swapTimer = setTimeout(function () { done += 1; paint(); }, 650);
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
      if (swapTimer) { clearTimeout(swapTimer); swapTimer = null; }
      done = n; paint();
    }
    function start() {
      if (timer || manual || reduce) return;
      done = 0; paint();
      timer = setInterval(step, 1700);
    }
    var btn = panel.querySelector('[data-act="rollback"]');
    if (btn) btn.addEventListener('click', function () {
      manual = true;
      if (timer) { clearInterval(timer); timer = null; }
      if (swapTimer) { clearTimeout(swapTimer); swapTimer = null; }
      if (done > 0) { done -= 1; paint(); caption(panel, 'step rolled back | ' + done + ' of ' + n + ' replaced | still serving'); }
    });
    return { start: start, stop: function () { if (!manual) stop(); } };
  }

  /* ---- 03 applied AI ----------------------------------------------------- */
  function ai(panel) {
    var btn = panel.querySelector('[data-act="strict"]');
    function apply(on) {
      panel.setAttribute('data-strict', on ? 'on' : 'off');
      if (btn) {
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        btn.textContent = 'Require a source: ' + (on ? 'on' : 'off');
      }
      caption(panel, on ? 'Unsure answers go to a person, not to a customer'
                        : 'Without a source check, unsure answers reach the customer');
    }
    if (btn) btn.addEventListener('click', function () { apply(panel.getAttribute('data-strict') !== 'on'); });
    return { start: function () {}, stop: function () {} };
  }

  /* ---- 04 enterprise: the tamper test -------------------------------------- */
  function scale(panel) {
    var rows = all(panel, '.ch li');
    var timer = null, manual = false, hitTimer = null;
    var texts = rows.map(function (r) { return r.querySelector('.ch-t').textContent; });
    var amounts = rows.map(function (r) { return r.querySelector('.ch-v').textContent; });
    var orig = amounts.slice();
    var tampered = -1, next = 2;

    // A small, deterministic string hash (FNV-1a, 16-bit view): enough to show the principle.
    function h(str) {
      var x = 0x811c9dc5;
      for (var i = 0; i < str.length; i++) { x ^= str.charCodeAt(i); x = (x * 16777619) >>> 0; }
      return ('0000' + (x & 0xffff).toString(16)).slice(-4);
    }
    // Stored seals are computed once, from the untouched entries.
    var stored = [];
    (function () {
      var prev = 'seed';
      orig.forEach(function (v, i) { prev = h(prev + '|' + texts[i] + '|' + v); stored.push(prev); });
    })();

    function verify() {
      var prev = 'seed', ok = [];
      amounts.forEach(function (v, i) {
        prev = h(prev + '|' + texts[i] + '|' + v);
        ok.push(prev === stored[i]);
      });
      return ok;
    }
    function bump(v) {
      var n = parseInt(v.replace(/,/g, ''), 10) * 10;
      return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    function paint() {
      var ok = verify(), firstBad = ok.indexOf(false), bad = 0;
      rows.forEach(function (r, i) {
        var good = ok[i];
        if (!good) bad += 1;
        r.classList.toggle('is-edit', i === tampered);
        r.classList.toggle('is-broken', !good && i !== tampered);
        r.querySelector('.ch-v').textContent = amounts[i];
        r.querySelector('code').textContent = good ? stored[i] : h('x' + i + amounts[i]);
      });
      if (firstBad < 0) caption(panel, rows.length + ' of ' + rows.length + ' entries verify');
      else caption(panel, 'tamper detected at entry ' + (firstBad + 1) + ' | ' + bad + ' no longer verify');
    }
    function hit(i) {
      var r = rows[i];
      r.classList.remove('is-hit'); void r.offsetWidth; r.classList.add('is-hit');
      if (hitTimer) clearTimeout(hitTimer);
      hitTimer = setTimeout(function () { r.classList.remove('is-hit'); }, 500);
    }
    function alter() {
      restoreValues();
      tampered = next;
      next = next >= rows.length - 2 ? 1 : next + 1;
      amounts[tampered] = bump(orig[tampered]);
      paint(); hit(tampered);
    }
    function restoreValues() { tampered = -1; amounts = orig.slice(); }
    function restore() { restoreValues(); paint(); }

    function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
    function start() {
      if (timer || manual || reduce) return;
      restore();
      var phase = 0;
      timer = setInterval(function () {
        phase = (phase + 1) % 3;
        if (phase === 1) alter(); else if (phase === 0) restore();
      }, 1700);
    }
    var a = panel.querySelector('[data-act="alter"]');
    var r = panel.querySelector('[data-act="restore"]');
    if (a) a.addEventListener('click', function () { manual = true; stopTimer(); alter(); });
    if (r) r.addEventListener('click', function () { manual = true; stopTimer(); restore(); });
    paint();
    return { start: start, stop: function () { if (!manual) { stopTimer(); restore(); } } };
  }

  var makers = { build: build, modern: modern, ai: ai, scale: scale };
  var vigs = panels.map(function (p) {
    var make = makers[p.getAttribute('data-vig')];
    return make ? make(p) : { start: function () {}, stop: function () {} };
  });

  /* ---- who is live ------------------------------------------------------- */
  var hovered = -1, focused = -1, onScreen = false;
  var panelOnScreen = panels.map(function () { return false; });

  function liveSet() {
    var set = {};
    if (stacked.matches) {
      panelOnScreen.forEach(function (v, i) { if (v) set[i] = true; });
    } else if (onScreen) {
      var i = hovered >= 0 ? hovered : (focused >= 0 ? focused : 0);
      set[i] = true;
    }
    return set;
  }
  function sync() {
    var set = liveSet();
    panels.forEach(function (p, i) {
      var on = !!set[i];
      p.classList.toggle('is-live', on);
      if (on) vigs[i].start(); else vigs[i].stop();
    });
  }

  panels.forEach(function (p, i) {
    p.addEventListener('mouseenter', function () { hovered = i; sync(); });
    p.addEventListener('mouseleave', function () { hovered = -1; sync(); });
    p.addEventListener('focusin', function () { focused = i; sync(); });
    p.addEventListener('focusout', function () { focused = -1; sync(); });
  });
  if (stacked.addEventListener) stacked.addEventListener('change', sync);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      onScreen = entries[0].isIntersecting;
      sync();
    }, { threshold: 0.25 }).observe(stage);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var i = panels.indexOf(e.target);
        if (i >= 0) panelOnScreen[i] = e.isIntersecting;
      });
      sync();
    }, { threshold: 0.4 });
    panels.forEach(function (p) { io.observe(p); });
  }
})();
