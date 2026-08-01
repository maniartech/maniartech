/* ManiarTech - the shelf: the /insights/ hero, which is a CONTROL, not a picture.

   The lesson this replaced eight rejected concepts with: a hero visual does not
   have to argue a metaphor. It can just SHOW the archive and let you cut it.

   Every post in the archive is a tile up top. Picking a thread re-lays the shelf
   AND filters the index below it, from one piece of state - so the whole page
   moves together and the hero is doing real navigational work at the same time
   as it is showing real content at rest.

   Notes on how it is built:
     - Tiles are absolutely positioned and moved with transform, so re-grouping
       animates for free and never reflows the document.
     - The markup is rendered by the template from frontmatter; this file only
       positions and filters. Nothing here invents content.
     - It degrades honestly: with JS off, every tile and every row is present and
       readable, the lenses simply do nothing.
     - Reduced motion drops the transition; the layout still happens.
*/
(function () {
  'use strict';

  var field = document.getElementById('shelfField');
  var rows  = document.getElementById('postRows');
  if (!field || !rows) return;

  var lenses  = document.getElementById('shelfLenses');
  var reduce  = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var tiles   = Array.prototype.slice.call(field.querySelectorAll('.shelf-tile'));
  var rowEls  = Array.prototype.slice.call(rows.querySelectorAll('.post-row'));
  var elState = document.getElementById('shelfState');
  var elCount = document.getElementById('shelfCount');
  var elHint  = document.getElementById('shelfHint');
  var elLive  = document.getElementById('liveCount');
  var elLens  = document.getElementById('liveLens');
  var elEmpty = document.getElementById('rowsEmpty');

  var TOTAL = tiles.length;
  var active = 'all';

  function labelFor(k) {
    if (k === 'all') return 'all threads';
    var b = lenses && lenses.querySelector('.lens[data-thread="' + k + '"]');
    return b ? (b.getAttribute('data-label') || k) : k;
  }

  /* Absolute grid: two columns when there is room, one when there is not. */
  function layout() {
    if (!tiles.length) return;
    var w = field.clientWidth;
    if (!w) return;
    var cols = w < 320 ? 1 : 2;
    var gapX = 10, gapY = 8;
    var tw = (w - gapX * (cols - 1)) / cols;

    // Width first, THEN measure: row height is content-driven, and hardcoding it
    // made the rows overlap the moment the type metrics differed at all.
    tiles.forEach(function (t) { t.style.width = tw + 'px'; });
    var th = Math.round(tiles[0].getBoundingClientRect().height) || 46;

    var hits = [], misses = [];
    tiles.forEach(function (t) {
      (active === 'all' || t.getAttribute('data-thread') === active) ? hits.push(t) : misses.push(t);
    });
    // matches float to the top; the rest keep their place, dimmed - the shelf
    // never hides what it holds, it only re-orders it
    var order = hits.concat(misses);
    order.forEach(function (t, i) {
      var c = i % cols, r = Math.floor(i / cols);
      t.style.transform = 'translate(' + Math.round(c * (tw + gapX)) + 'px,' + Math.round(r * (th + gapY)) + 'px)';
      var hit = hits.indexOf(t) > -1;
      t.classList.toggle('is-hit',  hit && active !== 'all');
      t.classList.toggle('is-miss', !hit && active !== 'all');
    });
    field.style.height = (Math.ceil(order.length / cols) * (th + gapY) - gapY) + 'px';
  }

  function setThread(k) {
    active = k;
    if (lenses) {
      Array.prototype.forEach.call(lenses.querySelectorAll('.lens'), function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-thread') === k));
      });
    }
    var shown = 0;
    rowEls.forEach(function (r) {
      var hit = (k === 'all' || r.getAttribute('data-thread') === k);
      r.hidden = !hit;
      if (hit) shown++;
    });

    var lab = labelFor(k);
    if (elCount) elCount.textContent = shown;
    if (elLive)  elLive.textContent  = shown;
    if (elLens)  elLens.textContent  = lab;
    if (elState) elState.textContent = k === 'all'
      ? TOTAL + ' pieces - 4 threads'
      : shown + ' of ' + TOTAL + ' - ' + lab;
    if (elHint) elHint.textContent = k === 'all'
      ? 'Pick a thread - the shelf regroups, and so does the index below.'
      : 'Pick it again to see everything.';
    if (elEmpty) elEmpty.hidden = shown > 0;
    layout();
  }

  if (lenses) {
    lenses.addEventListener('click', function (e) {
      var b = e.target.closest('.lens');
      if (b) setThread(b.getAttribute('data-thread'));
    });
  }

  // A tile is a shortcut into its own thread; pressing it again clears the filter.
  field.addEventListener('click', function (e) {
    var t = e.target.closest('.shelf-tile');
    if (!t) return;
    var k = t.getAttribute('data-thread');
    setThread(active === k ? 'all' : k);
  });

  // The four thread cards further down are controls too: they set the lens and
  // take you to the index, rather than being four paragraphs that link nowhere.
  var cards = document.getElementById('threadCards');
  if (cards) {
    cards.addEventListener('click', function (e) {
      var c = e.target.closest('.thread-card');
      if (!c || e.target.closest('a')) return;   // the "start with" link still wins
      setThread(c.getAttribute('data-thread'));
      var idx = document.getElementById('postIndex');
      if (idx) idx.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  if (reduce) field.classList.add('no-motion');

  // The FIRST placement must not animate. Tile widths are applied instantly but
  // transforms transition, so an initial layout against unsettled metrics leaves
  // full-width tiles sliding from stale positions - which reads as overlap.
  // Transitions are enabled only once a correct layout is on screen.
  layout();
  requestAnimationFrame(function () {
    layout();
    requestAnimationFrame(function () { field.classList.add('is-ready'); });
  });

  window.addEventListener('resize', layout);
  // web fonts can land after first paint and change tile metrics
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
})();
