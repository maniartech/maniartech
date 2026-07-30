/* ManiarTech - case-study canvas illustrations.
   One canvas hook (#caseViz, data-viz="<piece>") shared by all case studies;
   each piece embodies that case's story:
     - "rtl-consolidation": 600 scattered forms converge into one workflow
       screen, whose status rail then lights up. (RTL, 2011)
     - "upsport-annotate": a coach's annotation draws itself over running
       video - the video keeps playing while the ink lands. (UpSport, 2019)
   Pieces play once and rest WHOLE (content real at rest); click replays.
   All words live in the HTML caption (#caseVizCap), never in canvas.

   WebDoodling-ready: every draw goes through the small `R` Renderer seam -
   a port swaps R's internals and touches nothing else. Synchronous first
   draw at boot (this preview environment can pause rAF while hidden). */
(function () {
  'use strict';

  var canvas = document.getElementById('caseViz');
  if (!canvas || !canvas.getContext) return;
  var pieceName = canvas.getAttribute('data-viz') || '';

  var ctx = canvas.getContext('2d');
  var cap = document.getElementById('caseVizCap');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function accentRgb() {
    var v = (getComputedStyle(canvas).getPropertyValue('--viz-accent') || '#14cf93').trim().replace('#', '');
    if (v.length === 3) v = v[0] + v[0] + v[1] + v[1] + v[2] + v[2];
    var n = parseInt(v, 16); return isNaN(n) ? [20, 207, 147] : [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  var MINT = accentRgb();
  function mintA(a) { return 'rgba(' + MINT[0] + ',' + MINT[1] + ',' + MINT[2] + ',' + a + ')'; }

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
    },
    stroke: function (pts, upTo, stroke, lw) {
      // draw a polyline up to fraction `upTo` of its points (freehand ink)
      var n = Math.max(2, Math.floor(pts.length * Math.max(0, Math.min(1, upTo))));
      ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
      for (var i = 1; i < n; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.strokeStyle = stroke; ctx.lineWidth = lw || 2;
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
    }
  };

  function lcg(seed) { var s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

  /* ================= piece: rtl-consolidation ================= */
  function rtlPiece() {
    var T1 = 2.2, T2 = 1.1, T3 = 1.6;
    var forms = [];
    function build() {
      var rnd = lcg(20110601); forms = [];
      for (var i = 0; i < 140; i++) {
        var a = rnd() * Math.PI * 2, d = (0.35 + rnd() * 0.62) * Math.min(W, H) * 0.66;
        forms.push({ x: W / 2 + Math.cos(a) * d * (W > H ? 1.35 : 1), y: H / 2 + Math.sin(a) * d * 0.8,
                     w: 14 + rnd() * 26, h: 9 + rnd() * 16, delay: rnd() * 0.45, rot: (rnd() - 0.5) * 0.6 });
      }
    }
    function box() { var sw = Math.min(W * 0.62, 520), sh = Math.min(H * 0.66, 210); return { x: (W - sw) / 2, y: (H - sh) / 2, w: sw, h: sh }; }
    function draw(t) {
      R.clear();
      var s = box(), p1 = Math.min(1, t / T1);
      if (p1 < 1) for (var i = 0; i < forms.length; i++) {
        var f = forms[i], k = easeInOut(Math.max(0, Math.min(1, (p1 - f.delay) / (1 - f.delay))));
        var x = f.x + (W / 2 - f.x) * k, y = f.y + (H / 2 - f.y) * k, sh2 = 1 - k * 0.82;
        ctx.save(); ctx.translate(x, y); ctx.rotate(f.rot * (1 - k));
        R.rect(-f.w * sh2 / 2, -f.h * sh2 / 2, f.w * sh2, f.h * sh2, 2, 'rgba(255,255,255,.10)', 'rgba(255,255,255,.38)', 1, (1 - k * 0.55) * 0.9);
        ctx.restore();
      }
      var p2 = Math.max(0, Math.min(1, (t - T1) / T2));
      if (p2 > 0) {
        var g = easeInOut(p2), bw = s.w * (0.28 + 0.72 * g), bh = s.h * (0.22 + 0.78 * g);
        var bx = W / 2 - bw / 2, by = H / 2 - bh / 2;
        R.rect(bx, by, bw, bh, 10, '#141917', mintA(0.25 + 0.5 * g), 1.5);
        if (g > 0.55) { var tb = (g - 0.55) / 0.45;
          R.rect(bx, by, bw, Math.min(26, bh * 0.16), 10, mintA(0.10 * tb), null, 0, tb);
          R.dot(bx + 12, by + 12, 3, mintA(0.8), tb); }
      }
      var p3 = Math.max(0, Math.min(1, (t - T1 - T2) / T3));
      if (p3 > 0) {
        var rows = 4, cols = 9, padX = s.w * 0.08, padTop = 40, rowGap = (s.h - padTop - 18) / rows;
        for (var r = 0; r < rows; r++) {
          var rowT = Math.max(0, Math.min(1, p3 * rows - r)); if (rowT <= 0) continue;
          var y2 = s.y + padTop + r * rowGap + rowGap / 2;
          R.line(s.x + padX * 0.6, y2, s.x + s.w - padX * 0.6, y2, 'rgba(255,255,255,.07)', 1, rowT);
          for (var c = 0; c < cols; c++) {
            var ct = Math.max(0, Math.min(1, rowT * cols - c)); if (ct <= 0) continue;
            var x2 = s.x + padX + (s.w - padX * 2) * (c / (cols - 1)), on = c <= r * 2 + 1;
            R.dot(x2, y2, 4.5, on ? mintA(0.28 + 0.62 * ct) : 'rgba(255,255,255,.13)', ct);
            if (on && ct > 0.6) R.dot(x2, y2, 2, mintA(0.95), ct);
          }
        }
      }
    }
    return {
      total: T1 + T2 + T3, build: build, draw: draw,
      caps: [
        { at: 0, text: '600+ Access forms and reports, each holding one sliver of the lab.' },
        { at: T1, text: 'One workflow screen. Every sample, its whole journey, at a glance.' },
        { at: T1 + T2 + T3, text: 'Delivered 2011. By the lab\'s account, still in daily use. Click to replay.' }
      ]
    };
  }

  /* ================= piece: upsport-annotate ================= */
  function upsportPiece() {
    var TOTAL = 5.2;               // video runs the whole time; ink lands within it
    var ink = [];                  // freehand path points (built per size)
    function build() {
      // a coach's swoosh: a curved run path + an arrowhead, drawn in frame coords
      var f = frameBox(); ink = [];
      var x0 = f.x + f.w * 0.2, y0 = f.y + f.h * 0.72;
      var x1 = f.x + f.w * 0.62, y1 = f.y + f.h * 0.3;
      for (var i = 0; i <= 60; i++) {
        var t = i / 60;
        // quadratic curve with a hand wobble
        var mx = f.x + f.w * 0.32, my = f.y + f.h * 0.34;
        var x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * mx + t * t * x1;
        var y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * my + t * t * y1;
        ink.push([x + Math.sin(t * 21) * 1.6, y + Math.cos(t * 17) * 1.4]);
      }
      // arrowhead
      ink.push([x1 - 14, y1 - 2]); ink.push([x1, y1]); ink.push([x1 - 4, y1 + 13]);
    }
    function frameBox() {
      var fw = Math.min(W * 0.72, 560), fh = Math.min(H * 0.72, 230);
      return { x: (W - fw) / 2, y: (H - fh) / 2 - 8, w: fw, h: fh };
    }
    function draw(t) {
      R.clear();
      var f = frameBox();
      // the "video": frame, court line, moving player dot - it NEVER pauses
      R.rect(f.x, f.y, f.w, f.h, 10, '#101312', 'rgba(255,255,255,.22)', 1.4);
      R.line(f.x + 14, f.y + f.h * 0.78, f.x + f.w - 14, f.y + f.h * 0.78, 'rgba(255,255,255,.16)', 2);
      R.dot(f.x + 24, f.y + f.h * 0.78, 4, 'rgba(255,255,255,.25)');
      var loop = (t % 2.6) / 2.6;                       // the player keeps moving
      var px = f.x + 24 + (f.w - 60) * easeInOut(loop);
      var py = f.y + f.h * 0.78 - Math.sin(loop * Math.PI) * f.h * 0.34;
      R.dot(px, py, 7, 'rgba(255,255,255,.75)');
      // playhead + timeline
      R.line(f.x, f.y + f.h + 16, f.x + f.w, f.y + f.h + 16, 'rgba(255,255,255,.14)', 3);
      R.line(f.x, f.y + f.h + 16, f.x + f.w * Math.min(1, t / TOTAL), f.y + f.h + 16, mintA(0.8), 3);
      // REC dot while the ink is landing
      var inkT = Math.max(0, Math.min(1, (t - 0.9) / 2.6));
      if (t < TOTAL) R.dot(f.x + f.w - 18, f.y + 16, 5, 'rgba(240,90,90,' + (0.45 + 0.4 * Math.abs(Math.sin(t * 3))) + ')');
      // the coach's ink draws OVER the running video and stays
      if (inkT > 0 && ink.length) R.stroke(ink, inkT, mintA(0.9), 3.5);
    }
    return {
      total: TOTAL, build: build, draw: draw,
      caps: [
        { at: 0, text: 'The video keeps playing - a coach reviews a live run.' },
        { at: 0.9, text: 'Commentary recording; the annotation lands on the RUNNING video.' },
        { at: TOTAL, text: 'WebRTC recording + our WebDoodling canvas engine, in the browser. Click to replay.' }
      ]
    };
  }

  var piece = pieceName === 'rtl-consolidation' ? rtlPiece() :
              pieceName === 'upsport-annotate' ? upsportPiece() : null;
  if (!piece) return;

  var start = null, done = false;
  function setCapFor(t) {
    if (!cap) return;
    var text = piece.caps[0].text;
    for (var i = 0; i < piece.caps.length; i++) if (t >= piece.caps[i].at) text = piece.caps[i].text;
    cap.textContent = text;
  }
  function frame(ts) {
    if (start === null) start = ts;
    var t = (ts - start) / 1000;
    piece.draw(Math.min(t, piece.total));
    setCapFor(t);
    if (t >= piece.total) { done = true; setCapFor(piece.total); return; }
    requestAnimationFrame(frame);
  }
  function boot() {
    size(); piece.build();
    if (reduce) { done = true; piece.draw(piece.total); setCapFor(piece.total); return; }
    piece.draw(0); setCapFor(0);                 // synchronous first draw - never blank
    requestAnimationFrame(frame);
  }
  canvas.addEventListener('click', function () {
    if (!done) return;
    done = false; start = null;
    requestAnimationFrame(frame);
  });
  window.addEventListener('resize', function () { size(); piece.build(); if (done) piece.draw(piece.total); });

  boot();
})();
