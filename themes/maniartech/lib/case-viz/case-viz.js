/* ManiarTech - case-study canvas illustrations.
   One canvas hook (#caseViz, data-viz="<piece>") shared by all case studies;
   each piece embodies that case's story. First piece: "rtl-consolidation" -
   600 scattered forms converge into one workflow screen, then the screen's
   status rail lights up. Plays once, rests WHOLE (content real at rest);
   click replays. All words live in the HTML caption, never in canvas.

   WebDoodling-ready: every draw goes through the small `R` Renderer seam
   below - a port swaps R's internals and touches nothing else. Synchronous
   first draw at boot (this preview environment can pause rAF while hidden). */
(function () {
  'use strict';

  var canvas = document.getElementById('caseViz');
  if (!canvas || !canvas.getContext) return;
  var piece = canvas.getAttribute('data-viz') || '';
  if (piece !== 'rtl-consolidation') return;

  var ctx = canvas.getContext('2d');
  var cap = document.getElementById('caseVizCap');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function accentRgb() {
    var v = (getComputedStyle(canvas).getPropertyValue('--viz-accent') || '#14cf93').trim().replace('#', '');
    if (v.length === 3) v = v[0] + v[0] + v[1] + v[1] + v[2] + v[2];
    var n = parseInt(v, 16); return isNaN(n) ? [20, 207, 147] : [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  var MINT = accentRgb();

  var W = 0, H = 0, DPR = 1;
  function size() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    // clientWidth can be 0 when the page boots hidden (background tab / hidden
    // preview pane) - fall back up the tree so the first draw is never 0-wide.
    W = canvas.clientWidth || (canvas.parentElement && canvas.parentElement.clientWidth) ||
        (document.documentElement && document.documentElement.clientWidth) || 640;
    H = canvas.clientHeight || 320;
    canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  // ---- Renderer seam (the only part a WebDoodling port would replace) ----
  var R = {
    clear: function () { ctx.clearRect(0, 0, W, H); },
    rect: function (x, y, w, h, r, fill, stroke, lw, alpha) {
      ctx.globalAlpha = alpha == null ? 1 : alpha;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, w, h, r); else ctx.rect(x, y, w, h);
      if (fill) { ctx.fillStyle = fill; ctx.fill(); }
      if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw || 1; ctx.stroke(); }
      ctx.globalAlpha = 1;
    },
    dot: function (x, y, r, fill, alpha) {
      ctx.globalAlpha = alpha == null ? 1 : alpha;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = fill; ctx.fill(); ctx.globalAlpha = 1;
    },
    line: function (x1, y1, x2, y2, stroke, lw, alpha) {
      ctx.globalAlpha = alpha == null ? 1 : alpha;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
      ctx.strokeStyle = stroke; ctx.lineWidth = lw || 1; ctx.stroke(); ctx.globalAlpha = 1;
    }
  };

  // Deterministic scatter (seeded LCG) so every replay tells the same story.
  function lcg(seed) { var s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

  var FORMS = 140;                       // stands in for the 600+ (density, not a count claim)
  var forms = [];
  function buildForms() {
    var rnd = lcg(20110601);
    forms = [];
    for (var i = 0; i < FORMS; i++) {
      var mx = W / 2, my = H / 2;
      var a = rnd() * Math.PI * 2, d = (0.35 + rnd() * 0.62) * Math.min(W, H) * 0.66;
      forms.push({
        x: mx + Math.cos(a) * d * (W > H ? 1.35 : 1), y: my + Math.sin(a) * d * 0.8,
        w: 14 + rnd() * 26, h: 9 + rnd() * 16,
        delay: rnd() * 0.45, rot: (rnd() - 0.5) * 0.6
      });
    }
  }

  var T_CONVERGE = 2.2, T_SCREEN = 1.1, T_RAIL = 1.6;  // phase durations (s)
  var TOTAL = T_CONVERGE + T_SCREEN + T_RAIL;
  var start = null, done = false;

  function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

  function screenBox() {
    var sw = Math.min(W * 0.62, 520), sh = Math.min(H * 0.66, 210);
    return { x: (W - sw) / 2, y: (H - sh) / 2, w: sw, h: sh };
  }

  function draw(t) {
    R.clear();
    var s = screenBox();
    var mint = 'rgb(' + MINT[0] + ',' + MINT[1] + ',' + MINT[2] + ')';
    var mintA = function (a) { return 'rgba(' + MINT[0] + ',' + MINT[1] + ',' + MINT[2] + ',' + a + ')'; };

    // Phase 1: the sprawl converges
    var p1 = Math.min(1, t / T_CONVERGE);
    if (p1 < 1) {
      for (var i = 0; i < forms.length; i++) {
        var f = forms[i];
        var k = easeInOut(Math.max(0, Math.min(1, (p1 - f.delay) / (1 - f.delay))));
        var x = f.x + (W / 2 - f.x) * k, y = f.y + (H / 2 - f.y) * k;
        var shrink = 1 - k * 0.82, fade = 1 - k * 0.55;
        ctx.save(); ctx.translate(x, y); ctx.rotate(f.rot * (1 - k));
        R.rect(-f.w * shrink / 2, -f.h * shrink / 2, f.w * shrink, f.h * shrink, 2,
               'rgba(255,255,255,.10)', 'rgba(255,255,255,.38)', 1, fade * 0.9);
        ctx.restore();
      }
    }

    // Phase 2: the one screen forms
    var p2 = Math.max(0, Math.min(1, (t - T_CONVERGE) / T_SCREEN));
    if (p2 > 0) {
      var g = easeInOut(p2);
      var bw = s.w * (0.28 + 0.72 * g), bh = s.h * (0.22 + 0.78 * g);
      var bx = W / 2 - bw / 2, by = H / 2 - bh / 2;
      R.rect(bx, by, bw, bh, 10, '#141917', mintA(0.25 + 0.5 * g), 1.5);
      if (g > 0.55) {
        var tb = (g - 0.55) / 0.45;
        R.rect(bx, by, bw, Math.min(26, bh * 0.16), 10, mintA(0.10 * tb), null, 0, tb);
        R.dot(bx + 12, by + 12, 3, mintA(0.8), tb);
      }
    }

    // Phase 3: the status rail lights up, row by row (the 2011 grid's echo)
    var p3 = Math.max(0, Math.min(1, (t - T_CONVERGE - T_SCREEN) / T_RAIL));
    if (p3 > 0) {
      var rows = 4, cols = 9;
      var padX = s.w * 0.08, padTop = 40, rowGap = (s.h - padTop - 18) / rows;
      for (var r = 0; r < rows; r++) {
        var rowT = Math.max(0, Math.min(1, p3 * rows - r));
        if (rowT <= 0) continue;
        var y2 = s.y + padTop + r * rowGap + rowGap / 2;
        R.line(s.x + padX * 0.6, y2, s.x + s.w - padX * 0.6, y2, 'rgba(255,255,255,.07)', 1, rowT);
        for (var c = 0; c < cols; c++) {
          var ct = Math.max(0, Math.min(1, rowT * cols - c));
          if (ct <= 0) continue;
          var x2 = s.x + padX + (s.w - padX * 2) * (c / (cols - 1));
          var on = c <= r * 2 + 1;   // earlier rows further along - a working lab, mid-day
          R.dot(x2, y2, 4.5, on ? mintA(0.28 + 0.62 * ct) : 'rgba(255,255,255,.13)', ct);
          if (on && ct > 0.6) R.dot(x2, y2, 2, mintA(0.95), ct);
        }
      }
    }
  }

  function setCap(text) { if (cap) cap.textContent = text; }

  var CAPS = {
    sprawl: '600+ Access forms and reports, each holding one sliver of the lab.',
    one: 'One workflow screen. Every sample, its whole journey, at a glance.',
    rest: 'Delivered 2011. By the lab\'s account, still in daily use. Click to replay.'
  };

  function frame(ts) {
    if (start === null) start = ts;
    var t = (ts - start) / 1000;
    draw(t);
    if (t < T_CONVERGE) setCap(CAPS.sprawl);
    else if (t < TOTAL) setCap(CAPS.one);
    if (t >= TOTAL) { done = true; setCap(CAPS.rest); draw(TOTAL); return; }
    requestAnimationFrame(frame);
  }

  function boot() {
    size(); buildForms();
    if (reduce) { done = true; draw(TOTAL); setCap(CAPS.rest); return; }
    draw(0); setCap(CAPS.sprawl);          // synchronous first draw - never blank
    requestAnimationFrame(frame);
  }

  canvas.addEventListener('click', function () {
    if (!done) return;
    done = false; start = null;
    requestAnimationFrame(frame);
  });
  window.addEventListener('resize', function () { size(); buildForms(); if (done) draw(TOTAL); });

  boot();
})();
