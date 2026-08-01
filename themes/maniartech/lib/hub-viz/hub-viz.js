/* ManiarTech - hub hero canvases (mini-app).

   The navigator pages (/services/, /case-studies/, /white-papers/, /insights/)
   each get ONE bespoke hero piece that EXPLAINS that section's idea rather than
   decorating it. Any canvas carrying data-hub-viz="<piece>" is mounted; a page may host
   several (a hero plus concept visuals in the body). The pieces:

     - "services-lanes"   Three lanes of work feed one system; two capability
                          bands (AI, Modernization) cross all three. That is the
                          page's own structure, drawn instead of asserted.
     - "work-timeline"    The REAL engagement record, 2010 -> today, to scale.
                          Every year on it is sourced from the case pages; the
                          long mint bar is the lab system still in daily service.
     - "papers-evidence"  Claims arrive; only the ones that resolve to a source
                          survive and keep their citations. The rest dissolve.
                          That is literally how these papers are written.
     - "insights-cadence" A stream of filler drifts past; the few pieces worth
                          publishing lift out of it and stay.

   House rules this file follows:
     - Every draw goes through the small `R` renderer seam, so a WebDoodling
       port swaps R's internals and touches nothing else.
     - SYNCHRONOUS first draw at boot - a hero must never flash blank, and this
       preview/CI environment can pause rAF while the page is hidden.
     - Pieces play ONCE and rest WHOLE: the final frame is a complete, readable
       picture, never an empty stage waiting for a hover.
     - prefers-reduced-motion jumps straight to that final frame.
     - Interaction only once the geometry has stopped moving.
     - Prose lives in the HTML caption (#hubVizCap), never baked into pixels;
       only short labels that ARE the diagram are drawn on canvas.
*/
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Mount every canvas that declares a piece. A page may host several - a hero
     plus concept visuals further down - so nothing here is keyed to one id. */
  function mount(canvas) {
  if (!canvas || !canvas.getContext) return;
  var pieceName = canvas.getAttribute('data-hub-viz') || '';

  var ctx = canvas.getContext('2d');
  var capId = canvas.getAttribute('data-cap');
  var cap = capId ? document.getElementById(capId) : null;
  if (!cap && canvas.parentElement) cap = canvas.parentElement.querySelector('.hub-viz-cap');
  var capDefault = cap ? cap.textContent : '';

  function accentRgb() {
    var v = (getComputedStyle(canvas).getPropertyValue('--viz-accent') || '#14cf93').trim().replace('#', '');
    if (v.length === 3) v = v[0] + v[0] + v[1] + v[1] + v[2] + v[2];
    var n = parseInt(v, 16);
    return isNaN(n) ? [20, 207, 147] : [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  var MINT = accentRgb();
  function mintA(a) { return 'rgba(' + MINT[0] + ',' + MINT[1] + ',' + MINT[2] + ',' + a + ')'; }
  function whiteA(a) { return 'rgba(255,255,255,' + a + ')'; }

  var W = 0, H = 0, DPR = 1;
  function size() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    // clientWidth can be 0 when the page boots hidden - fall back up the tree
    // so the first draw is never zero-wide.
    W = canvas.clientWidth || (canvas.parentElement && canvas.parentElement.clientWidth) ||
        (document.documentElement && document.documentElement.clientWidth) || 640;
    H = canvas.clientHeight || 340;
    canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  /* ---- Renderer seam (the only part a WebDoodling port would replace) ---- */
  var R = {
    clear: function () { ctx.clearRect(0, 0, W, H); },
    rect: function (x, y, w, h, r, fill, stroke, lw, alpha) {
      ctx.globalAlpha = alpha == null ? 1 : alpha;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, w, Math.max(0.01, h), r); else ctx.rect(x, y, w, h);
      if (fill) { ctx.fillStyle = fill; ctx.fill(); }
      if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw || 1; ctx.stroke(); }
      ctx.globalAlpha = 1;
    },
    dot: function (x, y, r, fill, alpha) {
      if (r <= 0) return;
      ctx.globalAlpha = alpha == null ? 1 : alpha;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = fill; ctx.fill(); ctx.globalAlpha = 1;
    },
    ring: function (x, y, r, stroke, lw, alpha) {
      if (r <= 0) return;
      ctx.globalAlpha = alpha == null ? 1 : alpha;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = stroke; ctx.lineWidth = lw || 1; ctx.stroke(); ctx.globalAlpha = 1;
    },
    line: function (x1, y1, x2, y2, stroke, lw, alpha, dash) {
      ctx.globalAlpha = alpha == null ? 1 : alpha;
      if (dash) ctx.setLineDash(dash);
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
      ctx.strokeStyle = stroke; ctx.lineWidth = lw || 1; ctx.stroke();
      if (dash) ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    },
    text: function (x, y, str, fill, px, align, weight) {
      ctx.globalAlpha = 1;
      ctx.font = (weight || 500) + ' ' + (px || 11) + 'px Poppins, "Helvetica Neue", Arial, sans-serif';
      ctx.fillStyle = fill; ctx.textAlign = align || 'left'; ctx.textBaseline = 'middle';
      ctx.fillText(str, x, y);
      ctx.textAlign = 'left';
    },
    measure: function (str, px, weight) {
      ctx.font = (weight || 500) + ' ' + (px || 11) + 'px Poppins, "Helvetica Neue", Arial, sans-serif';
      return ctx.measureText(str).width;
    }
  };

  function lcg(seed) { var s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

  /* ======================= piece: services-lanes =======================
     Three lanes carry work into one system. Two capability bands cross
     every lane - which is exactly what the page says in words. */
  function servicesLanes() {
    var TOTAL = 4.6, TRAVEL = 1.9;
    var LANES = ['Enterprise', 'Application', 'Partnership'];
    var BANDS = ['AI, applied', 'Modernization'];
    var packets = [], geo = null;

    function layout() {
      var padL = Math.max(84, Math.min(120, W * 0.22));
      var padR = 26;
      var sysW = Math.max(58, Math.min(84, W * 0.16));
      var sysX = W - padR - sysW;
      var top = 30, bot = H - 46;
      var laneY = [top + (bot - top) * 0.14, top + (bot - top) * 0.5, top + (bot - top) * 0.86];
      var runX0 = padL + 8, runX1 = sysX - 12;
      geo = {
        padL: padL, laneY: laneY, x0: runX0, x1: runX1,
        sysX: sysX, sysW: sysW, sysY: laneY[0] - 22, sysH: (laneY[2] - laneY[0]) + 44,
        bands: [
          { x: runX0 + (runX1 - runX0) * 0.34, w: Math.max(20, (runX1 - runX0) * 0.09) },
          { x: runX0 + (runX1 - runX0) * 0.62, w: Math.max(20, (runX1 - runX0) * 0.09) }
        ]
      };
    }

    function build() {
      layout();
      var rnd = lcg(20260801); packets = [];
      for (var l = 0; l < 3; l++) {
        for (var i = 0; i < 9; i++) {
          packets.push({ lane: l, delay: 0.55 + i * 0.30 + l * 0.12 + rnd() * 0.06, w: 13 + rnd() * 9 });
        }
      }
    }

    function draw(t) {
      R.clear();
      var g = geo, i, l;

      // lanes draw in first
      for (l = 0; l < 3; l++) {
        var lp = easeOut(clamp01((t - l * 0.12) / 0.9));
        R.line(g.x0, g.laneY[l], g.x0 + (g.x1 - g.x0) * lp, g.laneY[l], whiteA(0.16), 1.5, 1);
        R.text(g.padL - 12, g.laneY[l], LANES[l], whiteA(0.55 + 0.15 * lp), 11.5, 'right', 500);
        R.dot(g.x0, g.laneY[l], 3, mintA(0.85), lp);
      }

      // capability bands cross every lane
      for (i = 0; i < g.bands.length; i++) {
        var bp = clamp01((t - (1.9 + i * 0.22)) / 0.7);
        if (bp <= 0) continue;
        var b = g.bands[i];
        R.rect(b.x, g.laneY[0] - 26, b.w, (g.laneY[2] - g.laneY[0]) + 52, 6, mintA(0.06 * bp), mintA(0.26 * bp), 1, 1);
        R.text(b.x + b.w / 2, H - 20, BANDS[i], mintA(0.72 * bp), 10.5, 'center', 500);
      }

      // packets travel the lanes; a packet inside a band picks up its tint
      var arrived = 0;
      for (i = 0; i < packets.length; i++) {
        var p = packets[i];
        var prog = clamp01((t - p.delay) / TRAVEL);
        if (prog <= 0) continue;
        if (prog >= 1) { arrived++; continue; }
        var x = g.x0 + (g.x1 - g.x0) * prog, y = g.laneY[p.lane];
        var inBand = false;
        for (var k = 0; k < g.bands.length; k++) {
          if (x > g.bands[k].x && x < g.bands[k].x + g.bands[k].w) inBand = true;
        }
        var passed = x > g.bands[0].x;
        var fill = inBand ? mintA(0.85) : passed ? mintA(0.5) : whiteA(0.34);
        R.rect(x - p.w / 2, y - 4, p.w, 8, 2.5, fill, null, 0, 1);
      }

      // the system assembles from what arrives
      var sysP = easeOut(clamp01((t - 1.1) / 1.5));
      if (sysP > 0) {
        R.rect(g.sysX, g.sysY + (g.sysH * (1 - sysP)) / 2, g.sysW, g.sysH * sysP, 9,
               'rgba(20,26,24,.85)', mintA(0.25 + 0.45 * sysP), 1.5, 1);
      }
      if (sysP > 0.6) {
        R.text(g.sysX + g.sysW / 2, g.sysY + g.sysH + 13, 'your system', whiteA(0.5), 10.5, 'center', 500);
      }
      if (arrived > 0 && sysP > 0.5) {
        var cols = 3, tileW = (g.sysW - 16 - (cols - 1) * 4) / cols, tileH = 7;
        for (i = 0; i < Math.min(arrived, 27); i++) {
          var cx = g.sysX + 8 + (i % cols) * (tileW + 4);
          var cy = g.sysY + 10 + Math.floor(i / cols) * (tileH + 4);
          if (cy + tileH > g.sysY + g.sysH - 8) break;
          R.rect(cx, cy, tileW, tileH, 2, mintA(0.55), null, 0, 1);
        }
      }
    }

    return {
      total: TOTAL, build: build, draw: draw,
      caps: [
        { at: 0, text: 'Three kinds of engineering work, running as three lanes.' },
        { at: 2.0, text: 'AI and modernization are not a fourth lane - they cross all three.' },
        { at: TOTAL, text: 'Whichever lane you start in, the work converges on one system you own. Click to replay.' }
      ]
    };
  }

  /* ======================= piece: work-timeline =======================
     The real record, to scale. Years are sourced from the case pages;
     nothing here is rounded up or invented. */
  function workTimeline() {
    var Y0 = 2010, Y1 = 2026, TOTAL = 4.4;
    var ROWS = [
      { name: 'Content Engine', from: 2010, to: 2011,
        note: 'Content Engine, 2010-2011 - production NLP a decade before the AI wave.' },
      { name: 'Reliable Analytical Labs', from: 2011, to: 2026, live: true,
        note: 'Reliable Analytical Laboratories, from 2011 - 600+ forms became one screen, and by the lab\'s account it is still in daily service.' },
      { name: 'Touchpoint Dashboard', from: 2012, to: 2018,
        note: 'Touchpoint Dashboard, 2012-2018 - six years inside a CX platform used by Fortune 500 teams; acquired by Strativity.' },
      { name: 'UpSport', from: 2019, to: 2019, point: true,
        note: 'UpSport, 2019 - drawing on live video in the browser, at the edge of what was then possible.' },
      { name: 'Sales Navigator', from: 2026, to: 2026, point: true, live: true,
        note: 'Sales Navigator, live 2026 - an end-to-end real-estate presales platform.' },
      { name: 'Chemo Test Laboratory', from: 2026, to: 2026, point: true, live: true,
        note: 'Chemo Test Laboratory - a LIMS in production today on our own Processious platform.' }
    ];
    var geo = null, hot = -1;

    function layout() {
      // Narrow canvases cannot afford a label gutter - "Reliable Analytical Labs"
      // alone is ~130px - so below this width the label sits ABOVE its bar instead.
      var stacked = W < 520;
      var padL = stacked ? 10 : Math.max(96, Math.min(150, W * 0.26));
      var padR = stacked ? 12 : 18, axisY = H - 30, top = stacked ? 18 : 26;
      var rowGap = (axisY - 16 - top) / ROWS.length;
      geo = { stacked: stacked, padL: padL, x0: padL + 6, x1: W - padR,
              axisY: axisY, top: top, rowGap: rowGap,
              barH: stacked ? 7 : Math.max(8, Math.min(12, rowGap * 0.42)) };
    }
    function xOf(y) { return geo.x0 + (geo.x1 - geo.x0) * ((y - Y0) / (Y1 - Y0)); }
    function rowY(i) { return geo.top + geo.rowGap * i + geo.rowGap / 2; }

    function build() { layout(); }

    function draw(t) {
      R.clear();
      var g = geo, i;

      // axis + year ticks
      R.line(g.x0 - 6, g.axisY, g.x1, g.axisY, whiteA(0.14), 1, 1);
      for (var y = Y0; y <= Y1; y += 2) {
        var xt = xOf(y);
        R.line(xt, g.axisY - 4, xt, g.axisY, whiteA(0.18), 1, 1);
        R.text(xt, g.axisY + 13, String(y), whiteA(0.38), 9.5, 'center', 500);
      }

      for (i = 0; i < ROWS.length; i++) {
        var r = ROWS[i], y2 = rowY(i);
        var p = easeOut(clamp01((t - 0.25 - i * 0.28) / 1.0));
        if (p <= 0) continue;
        var isHot = hot === i;
        var xa = xOf(r.from), xb = xOf(r.to);

        if (g.stacked) {
          R.text(g.x0, y2 - g.rowGap * 0.28, r.name, whiteA(isHot ? 0.95 : 0.62), 10, 'left', isHot ? 600 : 500);
        } else {
          R.text(g.padL - 12, y2, r.name, whiteA(isHot ? 0.95 : 0.6), 11, 'right', isHot ? 600 : 500);
        }

        if (g.stacked) y2 += g.rowGap * 0.16;
        if (r.point) {
          R.dot(xa, y2, 5.5 * p, r.live ? mintA(0.95) : whiteA(0.6), 1);
          if (r.live && p > 0.6) R.ring(xa, y2, 5.5 + 5 * (0.5 + 0.5 * Math.sin(t * 2.4)), mintA(0.35), 1.4, 1);
        } else {
          var wFull = Math.max(6, xb - xa);
          R.rect(xa, y2 - g.barH / 2, wFull * p, g.barH, g.barH / 2,
                 r.live ? mintA(isHot ? 0.85 : 0.62) : whiteA(isHot ? 0.4 : 0.24), null, 0, 1);
          if (r.live && p >= 1) {
            R.dot(xb, y2, g.barH / 2 + 1.5, mintA(0.95), 1);
            R.ring(xb, y2, g.barH / 2 + 3 + 4 * (0.5 + 0.5 * Math.sin(t * 2.4)), mintA(0.3), 1.4, 1);
          }
        }
        if (isHot) R.line(g.x0 - 6, y2 + g.rowGap / 2 - 1, g.x1, y2 + g.rowGap / 2 - 1, whiteA(0.08), 1, 1);
      }

      // "today" marker at the live edge
      var tp = clamp01((t - 2.4) / 0.8);
      if (tp > 0) {
        R.line(xOf(Y1), g.top - 6, xOf(Y1), g.axisY, mintA(0.22 * tp), 1, 1, [3, 4]);
        R.text(xOf(Y1), g.top - 14, 'today', mintA(0.7 * tp), 9.5, 'end', 600);
      }
    }

    function hitTest(mx, my) {
      if (!geo) return -1;
      for (var i = 0; i < ROWS.length; i++) {
        var y2 = rowY(i);
        if (my > y2 - geo.rowGap / 2 && my < y2 + geo.rowGap / 2 && mx > 12) return i;
      }
      return -1;
    }

    return {
      total: TOTAL, build: build, draw: draw, hitTest: hitTest,
      setHot: function (i) { hot = i; },
      noteFor: function (i) { return i >= 0 && i < ROWS.length ? ROWS[i].note : null; },
      caps: [
        { at: 0, text: 'Sixteen years of client engineering, plotted to scale.' },
        { at: 2.4, text: 'The long mint bar is a laboratory system delivered in 2011 - still in daily service.' },
        { at: TOTAL, text: 'Every year here comes from the case study it belongs to. Hover a bar to read it.' }
      ]
    };
  }

  /* ======================= piece: papers-evidence =======================
     Claims arrive. The ones that resolve to a source keep their citations
     and stay; the ones that do not, dissolve. That is the editorial rule
     these papers are written under. */
  function papersEvidence() {
    var TOTAL = 5.0;
    var claims = [], geo = null;

    function layout() {
      var padL = Math.max(18, W * 0.05);
      var padR = Math.max(18, W * 0.05);
      var keptTop = 42, keptGap = Math.min(40, (H * 0.44 - 20) / 2);
      geo = {
        x0: padL, x1: W - padR,
        colX: padL + 6, colW: (W - padL - padR) * 0.54,
        keptTop: keptTop, keptGap: keptGap,
        rule: H * 0.60,
        dropTop: H * 0.60 + 30, dropGap: Math.min(22, (H - (H * 0.60 + 40)) / 3)
      };
    }
    function build() {
      layout();
      var rnd = lcg(20260620); claims = [];
      var keep = [0, 2, 5];                       // 3 survive, 4 do not
      var ki = 0, di = 0;
      for (var i = 0; i < 7; i++) {
        var isKeep = keep.indexOf(i) >= 0;
        claims.push({
          keep: isKeep,
          slot: isKeep ? ki++ : di++,
          y0: 26 + rnd() * (H - 60),
          x0: -70 - rnd() * 150,
          w: geo.colW * (0.6 + rnd() * 0.4),
          delay: i * 0.24,
          sources: 2 + Math.floor(rnd() * 2)
        });
      }
    }
    function draw(t) {
      R.clear();
      var g = geo, i, j;

      // the two shelves this piece sorts into
      var hp = clamp01((t - 1.6) / 0.8);
      if (hp > 0) {
        R.text(g.x0, g.keptTop - 22, 'RESOLVES TO A SOURCE', mintA(0.6 * hp), 9.5, 'left', 600);
        R.line(g.x0, g.rule, g.x1, g.rule, whiteA(0.09 * hp), 1, 1, [4, 5]);
        R.text(g.x0, g.rule + 16, 'DOES NOT', whiteA(0.32 * hp), 9.5, 'left', 600);
      }

      for (i = 0; i < claims.length; i++) {
        var c = claims[i];
        var enter = easeOut(clamp01((t - c.delay) / 1.0));
        if (enter <= 0) continue;
        var settle = easeInOut(clamp01((t - c.delay - 0.6) / 1.0));

        if (c.keep) {
          var ty = g.keptTop + c.slot * g.keptGap;
          var x = c.x0 + (g.colX - c.x0) * enter;
          var y = c.y0 + (ty - c.y0) * settle;
          R.rect(x, y - 9, c.w, 18, 5, mintA(0.10), mintA(0.55), 1.4, 1);
          R.dot(x + 12, y, 3.2, mintA(0.95), 1);

          var srcP = clamp01((t - c.delay - 1.4) / 1.1);
          for (j = 0; j < c.sources; j++) {
            var sp = clamp01(srcP * c.sources - j);
            if (sp <= 0) continue;
            var sx = x + c.w + 18 + j * 24;
            if (sx > g.x1 - 4) break;
            R.line(x + c.w + 3, y, x + c.w + 3 + (15 + j * 24) * sp, y, mintA(0.3), 1, sp, [2, 3]);
            R.dot(sx, y, 3, mintA(0.5 + 0.35 * sp), sp);
          }
        } else {
          // Dropped claims stay visible as hollow, dashed outlines. Showing them
          // is the point - "we did not publish these" is a claim you can see.
          var dy = g.dropTop + c.slot * g.dropGap;
          var dx = c.x0 + (g.colX - c.x0) * enter;
          var yy = c.y0 + (dy - c.y0) * settle;
          ctx.setLineDash([3, 4]);
          R.rect(dx, yy - 6, c.w * 0.8, 12, 4, null, whiteA(0.18), 1, 1);
          ctx.setLineDash([]);
        }
      }
    }
    return {
      total: TOTAL, build: build, draw: draw,
      caps: [
        { at: 0, text: 'Every claim a paper wants to make arrives the same way: unproven.' },
        { at: 2.0, text: 'The ones that resolve to a source we would stand behind keep their citations.' },
        { at: TOTAL, text: 'The hollow ones did not, so they are not in the paper. That is the whole editorial rule. Click to replay.' }
      ]
    };
  }

  /* ======================= piece: insights-cadence =======================
     A stream of filler drifts past. The few pieces worth your time lift out
     of it and stay. The page promises once or twice a month, not a treadmill. */
  function insightsCadence() {
    var TOTAL = 5.0;
    var stream = [], geo = null;

    function layout() {
      geo = { streamY: H * 0.76, shelfY: H * 0.30, x0: 18, x1: W - 18 };
    }
    function build() {
      layout();
      var rnd = lcg(20260715); stream = [];
      var lifts = [2, 5, 9, 13];
      for (var i = 0; i < 18; i++) {
        stream.push({
          lift: lifts.indexOf(i), i: i,
          w: 22 + rnd() * 20, h: 12 + rnd() * 6,
          drift: rnd() * 0.5, jitter: (rnd() - 0.5) * 10
        });
      }
    }
    function draw(t) {
      R.clear();
      var g = geo, i;
      var spanX = g.x1 - g.x0;

      var hp = clamp01((t - 1.4) / 0.8);
      if (hp > 0) {
        R.text(g.x0, g.shelfY - 34, 'WORTH YOUR TIME', mintA(0.6 * hp), 9.5, 'left', 600);
        R.text(g.x0, g.streamY - 26, 'EVERYTHING ELSE', whiteA(0.3 * hp), 9.5, 'left', 600);
      }
      // the stream line
      var lp = easeOut(clamp01(t / 0.9));
      R.line(g.x0, g.streamY + 22, g.x0 + spanX * lp, g.streamY + 22, whiteA(0.10), 1, 1);

      var liftedCount = 0;
      for (i = 0; i < stream.length; i++) {
        var s = stream[i];
        var appear = clamp01((t - 0.2 - i * 0.11) / 0.6);
        if (appear <= 0) continue;
        var baseX = g.x0 + spanX * (i / (stream.length - 1)) * 0.94;
        if (s.lift >= 0) {
          var raise = easeInOut(clamp01((t - 1.0 - s.lift * 0.55) / 1.0));
          var shelfX = g.x0 + 10 + s.lift * ((spanX - 40) / 4);
          var x = baseX + (shelfX - baseX) * raise;
          var y = g.streamY + (g.shelfY - g.streamY) * raise;
          var wNow = s.w + ((spanX - 40) / 4 - 14 - s.w) * raise;
          var hNow = s.h + (46 - s.h) * raise;
          R.rect(x, y - hNow / 2, wNow, hNow, 4,
                 raise > 0.2 ? mintA(0.08 + 0.06 * raise) : whiteA(0.04),
                 raise > 0.2 ? mintA(0.25 + 0.4 * raise) : whiteA(0.14), 1.3, appear);
          if (raise > 0.6) {
            var lt = (raise - 0.6) / 0.4;
            R.line(x + 10, y - 9, x + wNow - 14, y - 9, mintA(0.5), 1.6, lt);
            R.line(x + 10, y - 1, x + wNow - 26, y - 1, whiteA(0.26), 1.6, lt);
            R.line(x + 10, y + 7, x + wNow - 40, y + 7, whiteA(0.18), 1.6, lt);
          }
          if (raise >= 1) liftedCount++;
        } else {
          R.rect(baseX, g.streamY + s.jitter - s.h / 2, s.w, s.h, 3, whiteA(0.05), whiteA(0.16), 1, appear * 0.95);
        }
      }
    }
    return {
      total: TOTAL, build: build, draw: draw,
      caps: [
        { at: 0, text: 'Most of what could be published is filler - it drifts past.' },
        { at: 2.0, text: 'Now and then something is actually worth your time.' },
        { at: TOTAL, text: 'Those are the ones that get written up. Once or twice a month, not a treadmill.' }
      ]
    };
  }

  var REGISTRY = {
    'services-lanes': servicesLanes,
    'work-timeline': workTimeline,
    'papers-evidence': papersEvidence,
    'insights-cadence': insightsCadence
  };
  var piece = REGISTRY[pieceName] ? REGISTRY[pieceName]() : null;
  if (!piece) return;

  var start = null, done = false, lastT = 0;

  function setCapFor(t) {
    if (!cap) return;
    var text = piece.caps[0].text;
    for (var i = 0; i < piece.caps.length; i++) if (t >= piece.caps[i].at) text = piece.caps[i].text;
    cap.textContent = text;
  }
  function frame(ts) {
    if (start === null) start = ts;
    var t = (ts - start) / 1000;
    lastT = Math.min(t, piece.total);
    piece.draw(lastT);
    setCapFor(t);
    if (t >= piece.total) { done = true; setCapFor(piece.total); return; }
    requestAnimationFrame(frame);
  }
  function redrawRest() { piece.draw(piece.total); }

  function boot() {
    size(); piece.build();
    if (reduce) { done = true; lastT = piece.total; redrawRest(); setCapFor(piece.total); return; }
    piece.draw(0); setCapFor(0);          // synchronous first draw - never blank
    requestAnimationFrame(frame);
  }

  // Interaction only once the geometry has stopped moving.
  if (piece.hitTest) {
    canvas.addEventListener('mousemove', function (e) {
      if (!done) return;
      var b = canvas.getBoundingClientRect();
      var i = piece.hitTest(e.clientX - b.left, e.clientY - b.top);
      piece.setHot(i);
      redrawRest();
      if (cap) cap.textContent = (i >= 0 && piece.noteFor(i)) || capDefault || piece.caps[piece.caps.length - 1].text;
    });
    canvas.addEventListener('mouseleave', function () {
      if (!done) return;
      piece.setHot(-1); redrawRest();
      if (cap) cap.textContent = piece.caps[piece.caps.length - 1].text;
    });
  } else {
    canvas.addEventListener('click', function () {
      if (!done) return;
      done = false; start = null;
      requestAnimationFrame(frame);
    });
  }

  window.addEventListener('resize', function () {
    size(); piece.build();
    if (done) { redrawRest(); } else { piece.draw(lastT); }
  });

  boot();
  }

  var nodes = document.querySelectorAll('canvas[data-hub-viz]');
  for (var i = 0; i < nodes.length; i++) mount(nodes[i]);
})();
