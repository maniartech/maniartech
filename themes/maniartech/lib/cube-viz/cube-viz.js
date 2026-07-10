/* ManiarTech — "Complexity, solved."
   A 3x3 speed-cube for the About hero. It loads scrambled and solves itself,
   then you can drag to turn it or click to scramble-and-resolve. The metaphor:
   senior engineering takes a tangled, many-sided problem and brings it to a
   clean, ordered state — by method, not luck.

   Real 3D in Canvas 2D: 26 cubies, integer 90° turns on a cubie model (so a
   scramble's reverse is guaranteed to solve), painter-sorted facelets, a light
   model for form. No WebGL, no deps — a WebDoodling-ready dogfood piece. The `R`
   Renderer seam and project()/orient() are the only bits a port would touch. */
(function () {
  'use strict';

  var canvas = document.getElementById('cubeViz');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var cap = document.getElementById('cubeVizCap');
  var capDesc = cap && cap.querySelector('.fv-desc');

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PI = Math.PI, cos = Math.cos, sin = Math.sin;

  // ---- palette: restrained mint + neutrals (one hue family) per face ----
  function accentRgb() {
    var v = (getComputedStyle(canvas).getPropertyValue('--viz-accent') || '#14cf93').trim().replace('#', '');
    if (v.length === 3) v = v[0] + v[0] + v[1] + v[1] + v[2] + v[2];
    var n = parseInt(v, 16); return isNaN(n) ? [20, 207, 147] : [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  var ACCENT = accentRgb();
  var FACE = {                 // keyed by outward direction
    '0,1,0': [226, 240, 233],  // U — pale
    '0,-1,0': [24, 30, 27],    // D — near-black
    '0,0,1': ACCENT,           // F — mint (hero face)
    '0,0,-1': [14, 96, 70],    // B — deep mint
    '1,0,0': [58, 78, 71],     // R — dark slate-green
    '-1,0,0': [128, 150, 142]  // L — muted sage
  };

  // ---- cubie model: 26 outer cubies, each carrying its outward facelets ----
  var DIRS = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
  var cubies = [];
  for (var x = -1; x <= 1; x++) for (var y = -1; y <= 1; y++) for (var z = -1; z <= 1; z++) {
    if (x === 0 && y === 0 && z === 0) continue;
    var faces = [];
    DIRS.forEach(function (d) {
      if ((d[0] === 1 && x === 1) || (d[0] === -1 && x === -1) ||
          (d[1] === 1 && y === 1) || (d[1] === -1 && y === -1) ||
          (d[2] === 1 && z === 1) || (d[2] === -1 && z === -1)) {
        faces.push({ dir: d.slice(), color: FACE[d.join(',')] });
      }
    });
    cubies.push({ pos: [x, y, z], faces: faces });
  }

  // integer 90° rotation of a lattice vector around an axis (0=x,1=y,2=z)
  function rot90(v, axis, dir) {
    var a = v[0], b = v[1], c = v[2];
    if (axis === 0) return dir > 0 ? [a, -c, b] : [a, c, -b];
    if (axis === 1) return dir > 0 ? [c, b, -a] : [-c, b, a];
    return dir > 0 ? [-b, a, c] : [b, -a, c];
  }
  function commit(m) {
    for (var i = 0; i < cubies.length; i++) {
      var cu = cubies[i];
      if (cu.pos[m.axis] === m.layer) {
        cu.pos = rot90(cu.pos, m.axis, m.dir);
        for (var j = 0; j < cu.faces.length; j++) cu.faces[j].dir = rot90(cu.faces[j].dir, m.axis, m.dir);
      }
    }
  }
  function inv(m) { return { axis: m.axis, layer: m.layer, dir: -m.dir }; }
  function randMove() { return { axis: (Math.random() * 3) | 0, layer: ((Math.random() * 3) | 0) - 1, dir: Math.random() < 0.5 ? 1 : -1 }; }

  // ---- move queue (animated) + scramble/solve ----
  var queue = [], anim = null, MOVE_DUR = 0.14, solved = false, curState = '';
  var CAP = {
    scrambling: 'A tangled, many-sided problem…',
    solving: 'Bringing it to order — by method, not luck.',
    solved: 'Drag to turn it. Click to scramble it and watch it resolve.'
  };
  function state(s) { if (s === curState) return; curState = s; canvas.setAttribute('data-state', s); if (capDesc) capDesc.textContent = CAP[s]; }
  function next() {
    if (queue.length) { anim = { m: queue.shift(), t: 0 }; state(anim.m.phase); }
    else { anim = null; solved = true; state('solved'); }
  }
  function scrambleThenSolve(animateScramble) {
    var scr = [];
    for (var i = 0; i < 14; i++) { var m = randMove(); scr.push(m); if (animateScramble) { m.phase = 'scrambling'; queue.push(m); } else commit(m); }
    for (var k = scr.length - 1; k >= 0; k--) { var s = inv(scr[k]); s.phase = 'solving'; queue.push(s); }
    solved = false; next();
  }

  // ---- geometry / projection ----
  var W = 0, H = 0, CX = 0, CY = 0, PX = 0;
  function resize() {
    var w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    W = w; H = h; CX = w / 2; CY = h / 2 - h * 0.02; PX = Math.min(w, h) * 0.172;
  }
  var yaw = -0.62, pitch = 0.52;
  function orient(p) {
    var cyw = cos(yaw), syw = sin(yaw), cpt = cos(pitch), spt = sin(pitch);
    var x1 = cyw * p[0] + syw * p[2], z1 = -syw * p[0] + cyw * p[2], y1 = p[1];
    return [x1, cpt * y1 - spt * z1, spt * y1 + cpt * z1];
  }
  function slice(p, axis, a) {
    var c = cos(a), s = sin(a), x = p[0], y = p[1], z = p[2];
    if (axis === 0) return [x, c * y - s * z, s * y + c * z];
    if (axis === 1) return [c * x + s * z, y, -s * x + c * z];
    return [c * x - s * y, s * x + c * y, z];
  }
  function project(p) { var q = 1 + p[2] * 0.11; return [CX + p[0] * PX * q, CY - p[1] * PX * q]; }

  var LIGHT = (function () { var l = [0.32, 0.6, 0.72], m = Math.hypot(l[0], l[1], l[2]); return [l[0] / m, l[1] / m, l[2] / m]; })();
  function corners(pos, dir) {
    var s = 0.455, cx = pos[0] + dir[0] * 0.5, cy = pos[1] + dir[1] * 0.5, cz = pos[2] + dir[2] * 0.5;
    var ax = dir[0] ? 0 : (dir[1] ? 1 : 2), ua = (ax + 1) % 3, va = (ax + 2) % 3;
    var u = [0, 0, 0], v = [0, 0, 0]; u[ua] = s; v[va] = s;
    return [
      [cx - u[0] - v[0], cy - u[1] - v[1], cz - u[2] - v[2]],
      [cx + u[0] - v[0], cy + u[1] - v[1], cz + u[2] - v[2]],
      [cx + u[0] + v[0], cy + u[1] + v[1], cz + u[2] + v[2]],
      [cx - u[0] + v[0], cy - u[1] + v[1], cz - u[2] + v[2]]
    ];
  }

  // ---- Renderer seam ----
  var R = {
    clear: function () { ctx.clearRect(0, 0, W, H); },
    glow: function (r, a) {
      var g = ctx.createRadialGradient(CX, CY, 0, CX, CY, r);
      g.addColorStop(0, 'rgba(' + ACCENT[0] + ',' + ACCENT[1] + ',' + ACCENT[2] + ',' + a + ')');
      g.addColorStop(1, 'rgba(' + ACCENT[0] + ',' + ACCENT[1] + ',' + ACCENT[2] + ',0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(CX, CY, r, 0, PI * 2); ctx.fill();
    },
    quad: function (pts, col, shade) {
      ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
      for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.fillStyle = 'rgb(' + Math.round(col[0] * shade) + ',' + Math.round(col[1] * shade) + ',' + Math.round(col[2] * shade) + ')';
      ctx.fill();
      ctx.strokeStyle = 'rgba(8,10,9,.85)'; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.stroke();
    }
  };

  function draw() {
    R.clear();
    R.glow(Math.min(W, H) * 0.44, solved ? 0.11 : 0.07);
    var quads = [];
    for (var i = 0; i < cubies.length; i++) {
      var cu = cubies[i];
      var aff = anim && cu.pos[anim.m.axis] === anim.m.layer;
      var ang = aff ? anim.m.dir * anim.t * (PI / 2) : 0;
      for (var j = 0; j < cu.faces.length; j++) {
        var f = cu.faces[j];
        var n = f.dir.slice(); if (aff) n = slice(n, anim.m.axis, ang); n = orient(n);
        if (n[2] <= 0.03) continue; // cull back faces
        var cs = corners(cu.pos, f.dir).map(function (p) { if (aff) p = slice(p, anim.m.axis, ang); return orient(p); });
        var depth = (cs[0][2] + cs[1][2] + cs[2][2] + cs[3][2]) / 4;
        var diff = Math.max(0, n[0] * LIGHT[0] + n[1] * LIGHT[1] + n[2] * LIGHT[2]);
        quads.push({ p: cs.map(project), col: f.color, shade: 0.52 + 0.48 * diff, depth: depth });
      }
    }
    quads.sort(function (a, b) { return a.depth - b.depth; });
    for (var q = 0; q < quads.length; q++) R.quad(quads[q].p, quads[q].col, quads[q].shade);
  }

  // ---- loop ----
  var raf, last = null, dragging = false;
  function frame(ts) {
    if (last == null) last = ts;
    var dt = Math.min((ts - last) / 1000, 0.05); last = ts;
    if (W === 0) resize();
    if (canvas.clientWidth === 0) { raf = requestAnimationFrame(frame); return; }
    if (anim) {
      anim.t += dt / MOVE_DUR;
      if (anim.t >= 1) { commit(anim.m); next(); }
    } else if (!dragging && !reduce) {
      yaw += 0.22 * dt; // gentle idle turn
    }
    draw();
    raf = requestAnimationFrame(frame);
  }

  // ---- interaction ----
  var downX = 0, downY = 0, moved = 0;
  canvas.style.cursor = 'grab';
  canvas.addEventListener('pointerdown', function (ev) {
    dragging = true; moved = 0; downX = ev.clientX; downY = ev.clientY;
    canvas.style.cursor = 'grabbing'; canvas.setPointerCapture && canvas.setPointerCapture(ev.pointerId);
  });
  canvas.addEventListener('pointermove', function (ev) {
    if (!dragging) return;
    var dx = ev.clientX - downX, dy = ev.clientY - downY; downX = ev.clientX; downY = ev.clientY;
    moved += Math.abs(dx) + Math.abs(dy);
    yaw += dx * 0.01; pitch += dy * 0.01;
    if (pitch > 1.2) pitch = 1.2; if (pitch < -1.2) pitch = -1.2;
  });
  function release() { if (!dragging) return; dragging = false; canvas.style.cursor = 'grab'; }
  canvas.addEventListener('pointerup', function () {
    var wasClick = moved < 6;
    release();
    if (wasClick && solved && !anim && queue.length === 0) scrambleThenSolve(true); // click = scramble & resolve
  });
  canvas.addEventListener('pointerleave', release);
  canvas.addEventListener('keydown', function (ev) {
    if (ev.key === 'ArrowLeft') { yaw -= 0.2; ev.preventDefault(); }
    else if (ev.key === 'ArrowRight') { yaw += 0.2; ev.preventDefault(); }
    else if (ev.key === 'ArrowUp') { pitch = Math.max(-1.2, pitch - 0.2); ev.preventDefault(); }
    else if (ev.key === 'ArrowDown') { pitch = Math.min(1.2, pitch + 0.2); ev.preventDefault(); }
    else if ((ev.key === 'Enter' || ev.key === ' ') && solved && queue.length === 0) { scrambleThenSolve(true); ev.preventDefault(); }
  });

  // ---- boot ----
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener('resize', resize);
  resize();
  if (reduce) { solved = true; state('solved'); }   // start solved & static
  else { scrambleThenSolve(false); }                 // load scrambled, then solve itself
  draw();                                            // paint one frame immediately (don't wait on rAF)
  raf = requestAnimationFrame(frame);
})();
