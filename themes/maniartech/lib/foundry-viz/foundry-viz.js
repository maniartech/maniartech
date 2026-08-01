/* ManiarTech — "The living Foundry"
   An interactive Canvas map of everything we've authored and how the pieces
   connect. Lives in the Foundry hero (and the About hero).

   Structure note (dogfooding): all pixel-pushing goes through the tiny `R`
   Renderer seam below — clear / glow / guide / edge / disc / label. When we
   port this to WebDoodling, only `R` and `resize()` change; the data, layout,
   and interaction code stay put. Vanilla JS, zero dependencies.

   Category review: any element on the page with data-viz-cat="<cat>" (e.g. the
   Foundry nav links) acts as a live control — hovering/focusing it lights that
   whole category in the map. Categories match the Foundry hub sections. */
(function () {
  'use strict';

  var canvas = document.getElementById('foundryViz');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  var cap = document.getElementById('foundryVizCap');
  var capName = cap && cap.querySelector('.fv-name');
  var capDesc = cap && cap.querySelector('.fv-desc');

  var TAU = Math.PI * 2;
  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- palette (accent pulled from the theme via --viz-accent) ----
  function hexToRgb(h) {
    h = (h || '').trim().replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    if (isNaN(n)) return [20, 207, 147];
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  var ACCENT = hexToRgb(getComputedStyle(canvas).getPropertyValue('--viz-accent') || '#14cf93');
  var WHITE = [255, 255, 255];
  function rgba(c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }

  // ---- data: nodes mirror the Foundry hub sections (labs/foundry/index.md) ----
  // ring encodes the stack inside-out: authored core (languages+standards) ->
  // libraries+tools -> products. `cat` matches the nav anchors for highlighting.
  var CATS = {
    languages: { ring: 0, label: 'Languages' },
    standards: { ring: 0, label: 'Standards' },
    libraries: { ring: 1, label: 'Libraries & Frameworks' },
    tools:     { ring: 1, label: 'Developer Tools' },
    products:  { ring: 2, label: 'Products' }
  };
  var NODES = [
    // authored core — languages
    { id: 'indigo',     label: 'Indigo',          cat: 'languages', one: 'A Go superset language',          url: '/foundry/indigo/' },
    { id: 'uexl',       label: 'UExL',            cat: 'languages', one: 'Embeddable expression engine',    url: '/foundry/uexl/' },
    // authored core — standards
    { id: 'io',         label: 'Internet Object', cat: 'standards', one: 'Schema-first data format',        url: '/foundry/internet-object/', badge: 1 },
    { id: 'nites',      label: 'NITES',           cat: 'standards', one: 'One intuitive time format',       url: '/standards/' },
    { id: 'fuse',       label: 'FUSE',            cat: 'standards', one: "REST that's live by default",     url: '/standards/' },
    { id: 'addressql',  label: 'AddressQL',       cat: 'standards', one: 'URL-native query language',       url: '/standards/' },
    // libraries
    { id: 'signals',    label: 'signals',         cat: 'libraries', one: 'Type-safe Go events',             url: '/foundry/signals/' },
    { id: 'gotime',     label: 'gotime',          cat: 'libraries', one: 'Intuitive Go date/time',          url: '/foundry/gotime/' },
    { id: 'vault',      label: 'vault-storage',   cat: 'libraries', one: 'Browser storage, upgraded',       url: '/foundry/vault-storage/' },
    { id: 'gocurl',     label: 'gocurl',          cat: 'libraries', one: 'curl → Go HTTP code',        url: '/foundry/' },
    // developer tools
    { id: 'taj',        label: 'Taj Mahal SSG',   cat: 'tools',     one: 'Builds this very site',           url: '/foundry/tajmahal-ssg/' },
    { id: 'booster',    label: 'Booster',         cat: 'tools',     one: 'Dev-environment orchestrator',    url: '/products/booster/' },
    { id: 'gowork',     label: 'gowork',          cat: 'tools',     one: 'Go workspace management',          url: '/foundry/' },
    // products
    { id: 'processious', label: 'Processious',    cat: 'products',  one: 'Process-automation platform',     url: '/products/processious/', badge: 1 },
    { id: 'ordin',       label: 'Ordin',          cat: 'products',  one: 'Durable workflow engine',         url: '/products/ordin/' },
    { id: 'documentor',  label: 'Documentor.AI',  cat: 'products',  one: 'AI document platform',            url: '/products/documentor/' },
    { id: 'dam',         label: 'Enterprise DAM', cat: 'products',  one: 'Digital asset management',        url: '/products/tallery-gallery/' }
  ];

  // ---- REAL relationship edges. VERIFY / EXTEND (Aamir knows the true graph). ----
  var EDGES = [
    ['gotime', 'nites'],          // gotime = the reference implementation of NITES (per the hub itself)
    ['processious', 'addressql']  // Processious runs AddressQL (iql_go) queries in production — VERIFY
    // TODO(Aamir): add the real dependency edges, e.g. ['ordin','uexl'], ['taj','io'] ...
  ];

  var byId = {};
  var rings = [[], [], []];
  var counts = {};
  NODES.forEach(function (n, i) {
    n.i = i; n.seed = i * 1.7; n.ring = CATS[n.cat].ring;
    byId[n.id] = n; rings[n.ring].push(n);
    counts[n.cat] = (counts[n.cat] || 0) + 1;
  });

  function linked(a, b) {
    for (var i = 0; i < EDGES.length; i++) {
      var e = EDGES[i];
      if ((e[0] === a.id && e[1] === b.id) || (e[1] === a.id && e[0] === b.id)) return true;
    }
    return false;
  }
  function relatives(n) {
    var out = [];
    EDGES.forEach(function (e) {
      if (e[0] === n.id && byId[e[1]]) out.push(byId[e[1]].label);
      else if (e[1] === n.id && byId[e[0]]) out.push(byId[e[0]].label);
    });
    return out;
  }

  // ---- Renderer seam — swap these primitives for WebDoodling later ----
  var R = {
    clear: function () { ctx.clearRect(0, 0, W, H); },
    glow: function (x, y, r, col, a) {
      var g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, rgba(col, a)); g.addColorStop(1, rgba(col, 0));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    },
    guide: function (r, a) {
      ctx.strokeStyle = rgba(WHITE, a); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(CX, CY, r, 0, TAU); ctx.stroke();
    },
    edge: function (a, b, col, alpha, w) {
      var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      var qx = CX + (mx - CX) * 0.55, qy = CY + (my - CY) * 0.55;
      ctx.strokeStyle = rgba(col, alpha); ctx.lineWidth = w;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.quadraticCurveTo(qx, qy, b.x, b.y); ctx.stroke();
    },
    disc: function (x, y, r, fill) { ctx.fillStyle = fill; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); },
    halo: function (x, y, r, col, a) {
      ctx.strokeStyle = rgba(col, a); ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke();
    },
    label: function (x, y, txt, col, align, weight, size) {
      ctx.font = weight + ' ' + size + 'px Poppins, sans-serif';
      // A dark plate behind each label. The rings rotate, so labels drift across
      // each other; without this the overlaps read as broken text.
      var tw = ctx.measureText(txt).width, ph = size + 6;
      var px = align === 'left' ? x - 4 : x - tw - 4;
      ctx.fillStyle = 'rgba(16,16,16,.72)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(px, y - ph / 2, tw + 8, ph, 4);
      else ctx.rect(px, y - ph / 2, tw + 8, ph);
      ctx.fill();
      ctx.fillStyle = col; ctx.textAlign = align; ctx.textBaseline = 'middle';
      ctx.fillText(txt, x, y);
    },
    // widest label at the ring-2 size, used to keep labels inside the canvas
    widestLabel: function (labels, size) {
      ctx.font = '600 ' + size + 'px Poppins, sans-serif';
      var m = 0;
      for (var i = 0; i < labels.length; i++) m = Math.max(m, ctx.measureText(labels[i]).width);
      return m;
    }
  };

  // ---- sizing / layout ----
  var W = 0, H = 0, CX = 0, CY = 0, RAD = [0, 0, 0];
  function resize() {
    var w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    W = w; H = h; CX = w / 2; CY = h / 2;
    var S = Math.min(w, h);
    // The outer ring must leave room for the label that hangs off it, or names
    // get clipped at the canvas edge (this used to cut "Enterprise DAM" in half).
    var pad = R.widestLabel(NODES.map(function (n) { return n.label; }), 15) + 20;
    var maxOuter = Math.max(S * 0.24, (w / 2) - pad);
    RAD = [0, 0, 0];
    RAD[2] = Math.min(S * 0.44, maxOuter);
    RAD[1] = RAD[2] * 0.68;
    RAD[0] = RAD[2] * 0.36;
  }

  // ---- motion + interaction state ----
  var SPIN = reduce ? [0, 0, 0] : [0.05, -0.032, 0.021]; // rad/sec per ring
  var animTime = 0, last = null, hovered = null, focusIdx = -1;
  var activeCat = null, activeCatLabel = '';

  function positions() {
    for (var r = 0; r < 3; r++) {
      var arr = rings[r], n = arr.length;
      for (var j = 0; j < n; j++) {
        var node = arr[j];
        var ang = (j / n) * TAU - Math.PI / 2 + SPIN[r] * animTime;
        var bob = reduce ? 0 : Math.sin(animTime * 0.8 + node.seed) * (RAD[0] * 0.05);
        node.x = CX + Math.cos(ang) * (RAD[r] + bob);
        node.y = CY + Math.sin(ang) * (RAD[r] + bob);
        node.ang = ang;
      }
    }
  }

  function draw() {
    R.clear();
    R.glow(CX, CY, RAD[2] * 1.3, ACCENT, 0.06);
    for (var r = 0; r < 3; r++) R.guide(RAD[r], 0.05);

    var focusing = hovered || activeCat;

    EDGES.forEach(function (e) {
      var a = byId[e[0]], b = byId[e[1]]; if (!a || !b) return;
      var hot = hovered && (hovered.id === a.id || hovered.id === b.id);
      R.edge(a, b, ACCENT, hot ? 0.9 : 0.12, hot ? 1.6 : 1);
    });

    NODES.forEach(function (n) {
      var isHot = hovered && hovered.id === n.id;
      var inCat = activeCat && n.cat === activeCat;
      var lit = isHot || inCat;
      var dim = focusing && !lit && !(hovered && linked(hovered, n));

      var base = n.ring === 0 ? 5 : n.ring === 1 ? 4 : 4.6;
      var r = isHot ? base + 2.4 : (inCat ? base + 1 : base);
      if (lit) R.glow(n.x, n.y, isHot ? 32 : 22, ACCENT, isHot ? 0.55 : 0.32);
      R.disc(n.x, n.y, r, dim ? rgba(WHITE, 0.16) : (lit ? rgba(ACCENT, 1) : rgba(WHITE, 0.85)));
      if (isHot) R.halo(n.x, n.y, r + 5, ACCENT, 0.5);
      if (n.badge) R.disc(n.x + r + 2.5, n.y - r - 2.5, 2, rgba(ACCENT, dim ? 0.25 : 0.95));

      var right = Math.cos(n.ang) >= 0;
      var lx = n.x + (right ? r + 8 : -(r + 8));
      var lcol = dim ? rgba(WHITE, 0.14) : (lit ? rgba(ACCENT, 1) : rgba(WHITE, 0.66));
      R.label(lx, n.y, n.label, lcol, right ? 'left' : 'right', lit ? '600' : '500', lit ? 15 : 13);

      n._sx = n.x; n._sy = n.y; n._sr = r;
    });
  }

  function frame(ts) {
    if (last == null) last = ts;
    var dt = Math.min((ts - last) / 1000, 0.05); last = ts;
    if (W === 0) resize();
    if (canvas.clientWidth === 0) { raf = requestAnimationFrame(frame); return; } // hidden (mobile)
    if (!hovered && !activeCat && !reduce) animTime += dt;  // any focus freezes motion for reading
    positions();
    draw();
    raf = requestAnimationFrame(frame);
  }

  // ---- caption ----
  function setCap(name, desc) { if (capName) { capName.textContent = name; capDesc.textContent = desc; } }
  function refreshCap() {
    if (hovered) {
      var rel = relatives(hovered);
      setCap(hovered.label, hovered.one + (rel.length ? '   ↳ ' + rel.join(', ') : ''));
    } else if (activeCat) {
      var c = counts[activeCat] || 0;
      setCap(activeCatLabel || CATS[activeCat].label, c + (c === 1 ? ' thing' : ' things') + " we've authored in this category.");
    } else {
      setCap('The ManiarTech Foundry', "Everything we've authored — hover a node, or a category, to trace what it's built on.");
    }
  }

  // ---- interaction: nodes ----
  function pick(mx, my) {
    var best = null, bd = 1e9;
    for (var i = 0; i < NODES.length; i++) {
      var n = NODES[i], dx = mx - n._sx, dy = my - n._sy, d = Math.sqrt(dx * dx + dy * dy);
      if (d < n._sr + 11 && d < bd) { bd = d; best = n; }
    }
    return best;
  }
  function setHover(n) {
    if (n === hovered) return;
    hovered = n;
    canvas.style.cursor = n ? 'pointer' : 'default';
    refreshCap();
  }
  canvas.addEventListener('pointermove', function (ev) {
    var rect = canvas.getBoundingClientRect();
    setHover(pick(ev.clientX - rect.left, ev.clientY - rect.top));
  });
  canvas.addEventListener('pointerleave', function () { setHover(null); });
  canvas.addEventListener('click', function () { if (hovered && hovered.url) window.location.href = hovered.url; });
  canvas.addEventListener('keydown', function (ev) {
    if (ev.key === 'ArrowRight' || ev.key === 'ArrowDown') { focusIdx = (focusIdx + 1) % NODES.length; setHover(NODES[focusIdx]); ev.preventDefault(); }
    else if (ev.key === 'ArrowLeft' || ev.key === 'ArrowUp') { focusIdx = (focusIdx - 1 + NODES.length) % NODES.length; setHover(NODES[focusIdx]); ev.preventDefault(); }
    else if (ev.key === 'Enter' && hovered && hovered.url) { window.location.href = hovered.url; }
    else if (ev.key === 'Escape') { setHover(null); focusIdx = -1; }
  });
  canvas.addEventListener('blur', function () { setHover(null); focusIdx = -1; });

  // ---- interaction: category controls (any [data-viz-cat] on the page) ----
  function setCat(cat, label) {
    if (cat === activeCat) return;
    activeCat = cat; activeCatLabel = label || (cat && CATS[cat] ? CATS[cat].label : '');
    if (!hovered) refreshCap();
  }
  var ctrls = document.querySelectorAll('[data-viz-cat]');
  Array.prototype.forEach.call(ctrls, function (el) {
    var cat = el.getAttribute('data-viz-cat');
    if (!CATS[cat]) return;
    el.addEventListener('mouseenter', function () { setCat(cat, el.textContent.trim()); });
    el.addEventListener('mouseleave', function () { setCat(null); });
    el.addEventListener('focus', function () { setCat(cat, el.textContent.trim()); });
    el.addEventListener('blur', function () { setCat(null); });
  });

  // ---- boot ----
  var raf;
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener('resize', resize);
  resize();
  raf = requestAnimationFrame(frame);
})();
