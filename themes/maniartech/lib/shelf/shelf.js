/* ManiarTech - the /insights/ shelf.

   The hero is a control, not a picture: every post is a tile, and picking a
   thread re-groups the shelf AND filters the index below from one piece of
   state, so the page moves together.

   MAINTENANCE NOTES - read before changing anything here.

   This file deliberately does NO layout. An earlier version positioned every
   tile absolutely and measured row heights in JS; it shipped two bugs (a
   hardcoded row height, and an initial layout that animated from stale
   positions) and it had to be re-derived every time the type changed. CSS Grid
   already does geometry correctly. All this file does now is:

     - count the posts per thread and write those counts into the buttons,
     - set `order` on a tile so the grid re-groups (one property, no maths),
     - toggle `hidden` on index rows,
     - keep the counters in sync.

   Nothing here contains content, labels or counts. Threads are defined once in
   tajmahal.yaml (`context.threads`) and looped by the template; counts are
   derived from the posts on screen. If you find yourself typing a number or a
   label in this file, something has gone wrong.

   Degrades honestly: with JS off, every tile and row is present and readable
   and the buttons simply do nothing.
*/
(function () {
  'use strict';

  var field = document.getElementById('shelfField');
  var rows  = document.getElementById('postRows');
  if (!field || !rows) return;

  var lenses = document.getElementById('shelfLenses');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var tiles  = Array.prototype.slice.call(field.querySelectorAll('.shelf-tile'));
  var rowEls = Array.prototype.slice.call(rows.querySelectorAll('.post-row'));

  var elState = document.getElementById('shelfState');
  var elCount = document.getElementById('shelfCount');
  var elHint  = document.getElementById('shelfHint');
  var elLive  = document.getElementById('liveCount');
  var elTotal = document.getElementById('liveTotal');
  var elLens  = document.getElementById('liveLens');
  var elEmpty = document.getElementById('rowsEmpty');

  var TOTAL = tiles.length;
  var active = 'all';

  /* Counts come from the posts, never from a template literal. */
  function countOf(k) {
    if (k === 'all') return TOTAL;
    var n = 0;
    for (var i = 0; i < tiles.length; i++) if (tiles[i].getAttribute('data-thread') === k) n++;
    return n;
  }

  var buttons = lenses ? Array.prototype.slice.call(lenses.querySelectorAll('.lens')) : [];
  var THREADS = buttons.map(function (b) { return b.getAttribute('data-thread'); })
                       .filter(function (k) { return k !== 'all'; });

  buttons.forEach(function (b) {
    var n = b.querySelector('.n');
    if (n) n.textContent = countOf(b.getAttribute('data-thread'));
  });

  function labelFor(k) {
    if (k === 'all') return 'all threads';
    var b = lenses && lenses.querySelector('.lens[data-thread="' + k + '"]');
    return b ? (b.getAttribute('data-label') || k) : k;
  }

  function setThread(k) {
    active = k;
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-thread') === k));
    });

    // Grid does the geometry; `order` is the whole re-group.
    tiles.forEach(function (t) {
      var hit = (k === 'all' || t.getAttribute('data-thread') === k);
      t.style.order = hit ? '0' : '1';
      t.classList.toggle('is-hit',  hit && k !== 'all');
      t.classList.toggle('is-miss', !hit && k !== 'all');
    });

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
      ? TOTAL + ' pieces - ' + THREADS.length + ' threads'
      : shown + ' of ' + TOTAL + ' - ' + lab;
    if (elHint) elHint.textContent = k === 'all'
      ? 'Pick a thread - the shelf regroups, and so does the index below.'
      : 'Pick it again to see everything.';
    if (elEmpty) elEmpty.hidden = shown > 0;
  }

  if (lenses) {
    lenses.addEventListener('click', function (e) {
      var b = e.target.closest('.lens');
      if (b) setThread(b.getAttribute('data-thread'));
    });
  }

  // A tile is a shortcut into its own thread; pressing it again clears the filter.
  // Modified clicks and the keyboard still follow the link to the post.
  field.addEventListener('click', function (e) {
    var t = e.target.closest('.shelf-tile');
    if (!t || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    var k = t.getAttribute('data-thread');
    setThread(active === k ? 'all' : k);
  });

  // The thread cards are controls too: they set the lens and take you to the
  // index, instead of being four paragraphs that link nowhere.
  var cards = document.getElementById('threadCards');
  if (cards) {
    cards.addEventListener('click', function (e) {
      var c = e.target.closest('.thread-card');
      if (!c || e.target.closest('a')) return;   // the "start with" link still wins
      setThread(c.getAttribute('data-thread'));
      var idx = document.getElementById('postIndex');
      if (idx) idx.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
    });
    cards.addEventListener('keydown', function (e) {
      var c = e.target.closest('.thread-card');
      if (!c || (e.key !== 'Enter' && e.key !== ' ')) return;
      e.preventDefault();
      c.click();
    });
  }

  if (elTotal) elTotal.textContent = TOTAL;
  setThread('all');
})();
