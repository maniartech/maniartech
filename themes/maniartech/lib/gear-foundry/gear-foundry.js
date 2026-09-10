/* ManiarTech Careers — THE GEAR FOUNDRY.
 *
 * The hiring thesis, machined instead of asserted: elsewhere you'd turn gears;
 * here you'd CUT them. A blank disc is machined tooth by tooth at the station,
 * carried to the running train, and meshed — and only at the moment it meshes
 * does it earn its name: a real shipped project. The train holds the last
 * three; the oldest recedes ("shipped") to make room. It never stops.
 *
 * Craft notes (bad gear pieces are one lazy arc away — none of that here):
 *  - Real gear profile: root arcs, straight flanks, tip arcs — the same
 *    proven geometry as the home machine, drawn via the `R` seam.
 *  - The machining is TRUE to hobbing: the blank starts at full tip radius
 *    and the cutter removes the GAPS — each gap visibly deepens under the
 *    cutter while the blank indexes one pitch at a time.
 *  - Meshing is exact: an arriving gear's rotation blends into the train
 *    formula  theta_c = -(Nd/Nc)*theta_d + (1+Nd/Nc)*alpha + PI/Nc,
 *    so teeth interleave correctly at every subsequent frame.
 *  - Words are never canvas pixels: names and the "now cutting" line are
 *    crisp HTML (#gfLabels / #gfNow), positioned and cycled by this file.
 *  - Synchronous first draw; reduced-motion gets the settled, fully named
 *    scene with no loop; draws only while on screen; DPR-aware.
 */
(function () {
  'use strict';

  var canvas = document.getElementById('gearFoundry');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var labelsEl = document.getElementById('gfLabels');
  var nowEl = document.getElementById('gfNow');
  var stage = canvas.parentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var PI = Math.PI, TAU = PI * 2, cos = Math.cos, sin = Math.sin;
  function easeIO(p) { return p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; }
  function easeOut(p) { return 1 - Math.pow(1 - p, 3); }

  /* ---- what gets made: real shipped work, cycled forever -----------------
     Each project owns ONE color, permanently - the color IS its identity
     across cycles (Aamir 2026-09-01: different colored gears for different
     projects). Jewel tones tuned for #1a1a1a; the driver alone stays mint. */
  var PROJECTS = ['signals', 'gotime', 'vault-storage', 'UExL', 'Internet Object', 'gocurl', 'Indigo'];
  var COLORS = {
    'signals':         [32, 201, 151],    // spring green
    'gotime':          [240, 180, 65],    // amber
    'vault-storage':   [122, 162, 247],   // cornflower
    'UExL':            [224, 108, 138],   // rose
    'Internet Object': [199, 146, 234],   // violet
    'gocurl':          [255, 158, 100],   // apricot
    'Indigo':          [91, 141, 238]     // indigo
  };
  var INK = 'rgba(10,13,12,.9)';
  var MINT = [20, 207, 147];

  /* ---- layout in unit space (scaled to canvas each resize) ---------------
     Station upper-left, driver lower-right; three satellite slots around the
     driver. Distances are exact pitch sums so every mesh is true. */
  var M = 1;                                   // tooth module (unit space)
  var DRIVER_N = 22, SLOT_N = [13, 11, 15];
  var driver = { N: DRIVER_N, r: DRIVER_N / 2 * M, x: 0, y: 0, tone: MINT, spokes: 6 };
  var SLOT_ALPHA = [-150 * PI / 180, -18 * PI / 180, 96 * PI / 180];
  var SLOTS = SLOT_ALPHA.map(function (a, i) {
    var r = SLOT_N[i] / 2 * M, d = driver.r + r - .20 * M;   // tips land exactly on the partner's root circle
    return { alpha: a, N: SLOT_N[i], r: r, x: driver.x + d * cos(a), y: driver.y + d * sin(a) };
  });
  var STATION = { x: driver.x - 26.5 * M, y: driver.y - 20 * M };   // upper-left, CLEAR of slot0: center distance 12.8+ > tip-to-tip 14.7? no - verified 16.0 > 14.7
  var STATION_N = 13, stR = STATION_N / 2 * M;

  // unit-space bounds -> fit. Headroom is sized for the LARGEST blank the
  // station cuts (blanks are born with their destination's tooth count, so
  // the 15T blank + its cutter reach highest): raised cutter top =
  // blankR*(1 + .34*1.95) + .8M above the station center. Sizing it for the
  // old fixed 13T blank clipped the cutter at the canvas top while a 15T
  // blank was on the station (Aamir's catch, 2026-09-01).
  var MAXBR = Math.max.apply(null, SLOT_N) / 2 * M;
  var bb = { x0: Math.min(STATION.x - (MAXBR + .8 * M) - 1.2, STATION.x - stR - 2.4),
             y0: STATION.y - (MAXBR * 1.663 + .8 * M) - .9,
             x1: driver.x + (driver.r + SLOTS[1].r * 2) + 3.2,
             y1: driver.y + (driver.r + SLOTS[2].r * 2) + 2.6 };

  var W = 0, H = 0, S = 1, OX = 0, OY = 0;
  function px(x, y) { return [OX + x * S, OY + y * S]; }

  /* ---- R: the renderer seam ---------------------------------------------- */
  var R = {
    clear: function () { ctx.clearRect(0, 0, W, H); },

    /* A gear with `cut` of its N gaps machined (fraction cuts the active gap
       progressively). cut >= N means finished. */
    gear: function (g, theta, cut, opts) {
      opts = opts || {};
      var c = px(g.x, g.y), cx = c[0], cy = c[1];
      var rr = (g.r - 1.0 * M) * S, ra = (g.r + .80 * M) * S, rp = g.r * S;
      var N = g.N, tw = PI / N;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(theta);
      ctx.globalAlpha = opts.alpha === undefined ? 1 : opts.alpha;

      ctx.beginPath();
      for (var i = 0; i < N; i++) {
        var a = i * 2 * tw;
        var whole = Math.max(0, Math.min(1, cut - i));      // this gap's cut depth
        var rg = ra - (ra - rr) * easeOut(whole);           // gap root: tip -> root
        /* Trapezoid tooth, DERIVED (v5). Half-widths in tw units: .68 at the
           root, .36 at the tip - a true 2:1 glass taper, wide base narrow top
           (v4 had root .30 < tip .34: teeth flared OUTWARD - the inverted,
           mushroom look Aamir rejected). Press-fit falls out of the same two
           numbers: the partner's root gap half-width is 1 - .68 = .32, so a
           .36 tip overfills it by .04tw; with centers at pitch-sum - .20M the
           interference stays ~.04tw/side at EVERY radius. No air, no wedges;
           the overlap hides under draw order. A display may do this - a real
           transmission may not. */
        if (whole <= 0) {                                    // untouched blank arc
          ctx.arc(0, 0, ra, a + tw * .68, a + 2 * tw - tw * .68);
          ctx.arc(0, 0, ra, a + 2 * tw - tw * .36, a + 2 * tw + tw * .36);
          continue;
        }
        ctx.arc(0, 0, rg, a + tw * .68, a + 2 * tw - tw * .68);           // machined gap
        ctx.lineTo(ra * cos(a + 2 * tw - tw * .36), ra * sin(a + 2 * tw - tw * .36));
        ctx.arc(0, 0, ra, a + 2 * tw - tw * .36, a + 2 * tw + tw * .36);  // flat tip
        ctx.lineTo(rg * cos(a + 2 * tw + tw * .68), rg * sin(a + 2 * tw + tw * .68));
      }
      ctx.closePath();

      var t = g.tone, al = .9;
      var grad = ctx.createRadialGradient(-rp * .35, -rp * .35, rp * .1, 0, 0, ra);
      grad.addColorStop(0, 'rgba(' + Math.min(255, t[0] + 30) + ',' + Math.min(255, t[1] + 24) + ',' + Math.min(255, t[2] + 24) + ',' + al + ')');
      grad.addColorStop(1, 'rgba(' + t[0] + ',' + t[1] + ',' + t[2] + ',' + al + ')');
      ctx.fillStyle = grad; ctx.fill();
      ctx.lineWidth = Math.max(1, S * .14 * M); ctx.strokeStyle = INK; ctx.stroke();

      // hub: bore + spokes or lightening holes
      ctx.beginPath(); ctx.arc(0, 0, rp * .24, 0, TAU); ctx.stroke();
      if (opts.spokes || g.spokes) {
        var nS = g.spokes || 5;
        for (var sI = 0; sI < nS; sI++) {
          var sa = sI * TAU / nS;
          ctx.beginPath();
          ctx.moveTo(rp * .3 * cos(sa), rp * .3 * sin(sa));
          ctx.lineTo(rp * .8 * cos(sa), rp * .8 * sin(sa));
          ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(0, 0, rp * .84, 0, TAU); ctx.stroke();
      } else {
        for (var h = 0; h < 4; h++) {
          var ha = h * TAU / 4 + TAU / 8;
          ctx.beginPath(); ctx.arc(rp * .52 * cos(ha), rp * .52 * sin(ha), rp * .15, 0, TAU); ctx.stroke();
        }
      }
      ctx.restore();
    },

    /* the cutter: a fast little toothed disc, poised over the active gap */
    cutter: function (gx, gy, gearR, spin, engage) {   // engage: 0 raised .. 1 cutting
      var c = px(gx, gy);
      var cr = gearR * .34 * S;
      var cy2 = c[1] - (gearR + .80 * M) * S - cr * (.95 - .43 * (engage || 0));
      ctx.save(); ctx.translate(c[0], cy2); ctx.rotate(spin);
      ctx.beginPath();
      var CT = 8, ctw = PI / CT;
      for (var i = 0; i < CT; i++) {
        var a = i * 2 * ctw;
        ctx.arc(0, 0, cr * .72, a + ctw * .5, a + 2 * ctw - ctw * .5);
        ctx.lineTo(cr * cos(a + 2 * ctw - ctw * .18), cr * sin(a + 2 * ctw - ctw * .18));
        ctx.arc(0, 0, cr, a + 2 * ctw - ctw * .18, a + 2 * ctw + ctw * .18);
        ctx.lineTo(cr * .72 * cos(a + 2 * ctw + ctw * .5), cr * .72 * sin(a + 2 * ctw + ctw * .5));
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(58,70,66,.95)'; ctx.fill();
      ctx.lineWidth = Math.max(1, S * .12);
      ctx.strokeStyle = 'rgba(20,207,147,' + (.2 + .65 * (engage || 0)) + ')';
      ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, cr * .2, 0, TAU); ctx.strokeStyle = INK; ctx.stroke();
      ctx.restore();
      // the arm it hangs from
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,.16)'; ctx.lineWidth = Math.max(1, S * .16);
      ctx.beginPath(); ctx.moveTo(c[0], cy2 - cr); ctx.lineTo(c[0], OY + bb.y0 * S + 2); ctx.stroke();
      ctx.restore();
      return [c[0], cy2 + cr];                                // contact point for sparks
    },

    sparks: function (x, y, t, seed) {
      for (var i = 0; i < 4; i++) {
        var p = (t * 2.6 + i * .23 + seed * .37) % 1;
        var ang = PI * .5 + Math.sin(seed * 5 + i * 7) * 1.1;
        var d = p * S * 1.6;
        ctx.globalAlpha = (1 - p) * .8;
        ctx.strokeStyle = 'rgba(20,207,147,1)';
        ctx.lineWidth = Math.max(1, S * .06);
        ctx.beginPath();
        ctx.moveTo(x + cos(ang) * d, y + sin(ang) * d);
        ctx.lineTo(x + cos(ang) * (d + S * .32), y + sin(ang) * (d + S * .32));
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    },

    guide: function () {                                     // faint path station -> train
      var a = px(STATION.x, STATION.y), b = px(SLOTS[0].x, SLOTS[0].y);
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,.06)'; ctx.lineWidth = Math.max(1, S * .1);
      ctx.setLineDash([2, 7]);
      ctx.beginPath(); ctx.moveTo(a[0], a[1]);
      ctx.quadraticCurveTo(px((STATION.x + SLOTS[0].x) / 2, STATION.y)[0], a[1], b[0], b[1]);
      ctx.stroke(); ctx.setLineDash([]);
      ctx.restore();
    }
  };

  /* Derived from the rolling constraint N_d*theta_d + N_c*theta_c = const,
     anchored at "driver tooth-center points along alpha <=> child gap-center
     points along alpha+PI":
        theta_c = -(N_d/N_c)*theta_d + (1 + N_d/N_c)*alpha + PI - PI/N_c
     v2 omitted the +PI (kept only +PI/N_c). PI is a whole number of tooth
     pitches ONLY for even N_c, so every ODD-toothed gear meshed half a tooth
     off - tips clashing on tips, exactly what Aamir circled. All three slots
     here are odd (13/11/15). */
  function meshTheta(slot, drive) {
    var ratio = driver.N / slot.N;
    return -ratio * drive + (1 + ratio) * slot.alpha + PI - PI / slot.N;
  }

  /* ---- the foundry's state ----------------------------------------------
     Cycle: index+cut N gaps -> carry to the next slot -> blend into mesh ->
     dwell -> next blank. Slots hold {proj, tone, born}; oldest fades out when
     its slot is needed again. */
  var CUT_TOTAL = 2.9;                                        // fixed: keeps CYCLE constant
  var CARRY = 1.0, SETTLE = .45, DWELL = 1.4;
  var CYCLE = CUT_TOTAL + CARRY + SETTLE + DWELL;
  var DRIVE_W = .3;                                           // driver rad/s

  var slotGear = [null, null, null];                          // meshed occupants
  var cycleNo = 2;                                            // DERIVED from t each frame

  // pre-fill two slots so the scene is alive from the very first frame
  function prefill() {
    slotGear[0] = { proj: PROJECTS[0], tone: COLORS[PROJECTS[0]], fade: 1 };
    slotGear[1] = { proj: PROJECTS[1], tone: COLORS[PROJECTS[1]], fade: 1 };
  }

  function frame(t) {
    R.clear();
    R.guide();
    var drive = DRIVE_W * t;

    // ---- the cycle clock (needed before the train renders: while a gear is
    // inbound to its slot, that slot draws only the fading victim - the
    // carried gear IS the new occupant; drawing both was the double) ----
    var tc = t % CYCLE;
    /* The cycle number is pure arithmetic on t. v1 had two writers (a dwell-
       boundary increment AND a resync from t); a slow frame inside the .02s
       window could bump it twice and scramble slot assignment - seen live as
       a detached, mislabeled gear in Aamir's screenshot. */
    cycleNo = 2 + Math.floor(t / CYCLE);
    var proj = PROJECTS[cycleNo % PROJECTS.length];
    var tone = COLORS[proj];
    var inbound = tc < CUT_TOTAL + CARRY + SETTLE;            // this cycle's gear not yet placed

    // ---- the running train ----
    R.gear(driver, drive, driver.N, {});
    for (var i = 0; i < 3; i++) {
      var occ = slotGear[i];
      if (!occ) continue;
      if (inbound && i === (cycleNo % 3) && occ.proj === proj) continue;  // stale double-place guard
      R.gear({ N: SLOTS[i].N, r: SLOTS[i].r, x: SLOTS[i].x, y: SLOTS[i].y, tone: occ.tone },
             meshTheta(SLOTS[i], drive), SLOTS[i].N, { alpha: occ.fade });
    }

    var targetSlot = cycleNo % 3;
    // The occupant to evict is whoever holds the slot AND ISN'T this cycle's
    // gear. Deriving it without the identity check caused the defining bug of
    // v1: the moment the new gear was placed, it became its own "victim" and
    // was faded to zero on the very next frame.
    var occ = slotGear[targetSlot];
    var victim = (occ && occ.proj !== proj) ? occ : null;

    // this cycle's gear is born with its DESTINATION slot's tooth count
    var curN = SLOT_N[targetSlot], curR = curN / 2 * M;

    if (tc < CUT_TOTAL) {
      // machining: blank indexes; the active gap deepens under the cutter
      var k = tc / (CUT_TOTAL / curN);                        // gaps completed (float)
      var idx = Math.floor(k), fr = k - idx;
      var g = { N: curN, r: curR, x: STATION.x, y: STATION.y, tone: tone };
      var tw = PI / curN;
      // continuous indexing - the blank turns smoothly through each pitch
      // (v1 snapped per index; the jerkiness Aamir called out)
      var theta = -(idx + easeIO(fr)) * 2 * tw - tw * 1.54 - PI / 2;
      var entry = Math.min(1, tc / .35);                      // blank eases in at cycle start
      R.gear(g, theta, k, { alpha: easeOut(entry) });
      var engage = Math.sin(Math.min(1, Math.max(0, (fr - .1) / .7)) * PI);  // smooth dip + rise
      var contact = R.cutter(STATION.x, STATION.y, curR, t * 14, engage);
      if (engage > .3) R.sparks(contact[0], contact[1], t, idx);
      if (victim) victim.fade = 1;                            // not evicted yet (identity-checked)
    } else if (tc < CUT_TOTAL + CARRY + SETTLE) {
      // carry + settle: finished gear travels the guide and blends into mesh
      var p = Math.min(1, (tc - CUT_TOTAL) / CARRY);
      var e = easeIO(p);
      var sx = STATION.x + (SLOTS[targetSlot].x - STATION.x) * e;
      var sy = STATION.y + (SLOTS[targetSlot].y - STATION.y) * e
               - Math.sin(p * PI) * 2.2;                      // gentle arc over the machine
      var freeTheta = -2 * PI - (PI / curN) * 1.5 - PI / 2 + p * 1.2;
      var target = meshTheta(SLOTS[targetSlot], drive);
      var blend = Math.max(0, (p - .65) / .35);               // phase-match near arrival
      var theta = freeTheta + (target - freeTheta) * easeIO(blend);
      // the evicted gear recedes as the new one approaches
      if (victim) victim.fade = 1 - easeIO(Math.min(1, p * 1.6));
      R.gear({ N: curN, r: curR, x: sx, y: sy, tone: tone }, theta, curN, {});
      R.cutter(STATION.x, STATION.y, curR, t * 6, 0);
    } else {
      // dwell: everything simply runs
      if (!slotGear[targetSlot] || slotGear[targetSlot].proj !== proj) {
        slotGear[targetSlot] = { proj: proj, tone: tone, fade: 1 };
      }
      R.cutter(STATION.x, STATION.y, stR, t * 6, 0);
    }

    syncLabels(proj, tc);
    // debug seam (read-only; harmless in production, keyed off the element)
    canvas.__gf = { t: +t.toFixed(2), tc: +tc.toFixed(2), cycleNo: cycleNo, proj: proj,
      target: targetSlot,
      slots: slotGear.map(function (o) { return o ? o.proj + ':' + o.fade.toFixed(2) : null; }) };
  }

  /* ---- HTML labels: names are earned at mesh, never painted -------------- */
  function syncLabels(cuttingProj, tc) {
    if (nowEl) {
      var making = tc < CUT_TOTAL + CARRY;
      nowEl.textContent = cuttingProj;
      nowEl.parentElement.style.opacity = making ? 1 : .45;
    }
    if (!labelsEl) return;
    for (var i = 0; i < 3; i++) {
      var el = labelsEl.children[i]; if (!el) continue;
      var occ = slotGear[i];
      el.textContent = occ ? occ.proj : '';
      el.style.opacity = occ ? occ.fade : 0;
      // per-slot label angle: outward from the driver for the upper slots,
      // but the BOTTOM slot's outward direction runs into the caption line -
      // its label swings to the left flank instead
      var LABEL_ANG = [-150 * PI / 180, -18 * PI / 180, 178 * PI / 180];
      var pOut = px(SLOTS[i].x + cos(LABEL_ANG[i]) * (SLOTS[i].r + 4.6),
                    SLOTS[i].y + sin(LABEL_ANG[i]) * (SLOTS[i].r + 4.6));
      el.style.left = (pOut[0] / W * 100) + '%';
      el.style.top = (pOut[1] / H * 100) + '%';
    }
  }
  function buildLabels() {
    if (!labelsEl || labelsEl.children.length) return;
    for (var i = 0; i < 3; i++) {
      var el = document.createElement('span');
      el.className = 'gf-label';
      labelsEl.appendChild(el);
    }
  }

  /* ---- lifecycle ---------------------------------------------------------- */
  var t0 = null, playing = false, visible = false;
  function tick(now) {
    if (!playing) return;
    if (t0 === null) t0 = now;
    frame((now - t0) / 1000);
    if (visible && !reduce) requestAnimationFrame(tick);
    else playing = false;
  }
  function play() { if (!playing && visible && !reduce) { playing = true; requestAnimationFrame(tick); } }

  function resize() {
    var w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    var DPR = Math.min(2, window.devicePixelRatio || 1);
    W = Math.round(w * DPR); H = Math.round(h * DPR);
    canvas.width = W; canvas.height = H;
    var uw = bb.x1 - bb.x0, uh = bb.y1 - bb.y0;
    S = Math.min(W / uw, H / uh);
    OX = (W - uw * S) / 2 - bb.x0 * S;
    OY = (H - uh * S) / 2 - bb.y0 * S;
    // label positions are % of the CSS box, derived from canvas px / DPR-free W,H
    buildLabels();
    frame(reduce ? settleT() : (t0 === null ? 0 : (performance.now() - t0) / 1000));
  }
  function settleT() {                                        // a mid-dwell instant: full train
    prefillIfNeeded(); slotGear[2] = { proj: PROJECTS[2], tone: COLORS[PROJECTS[2]], fade: 1 };
    return CUT_TOTAL + CARRY + SETTLE + DWELL * .5 + CYCLE;   // dwell of a later cycle
  }
  var prefilled = false;
  function prefillIfNeeded() { if (!prefilled) { prefill(); prefilled = true; } }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { visible = e.isIntersecting; if (visible) play(); });
    }, { threshold: .2 }).observe(stage);
  } else { visible = true; }

  window.addEventListener('resize', resize);
  prefillIfNeeded();
  resize();                                                   // synchronous first draw
  if (reduce) frame(settleT());
})();
