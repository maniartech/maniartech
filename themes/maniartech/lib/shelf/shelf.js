/* ManiarTech - the /insights/ thread filter.

   The hero does not list the posts; the index does that, once, properly. This
   file only drives the filter that sits above the index.

   MAINTENANCE NOTES - read before changing anything here.

   It does NO layout and holds NO content. Threads are defined once in
   tajmahal.yaml (`context.threads`) and looped by the template; the counts are
   derived from the rows actually on the page, because a typed count silently
   becomes a false claim the day a post is added. If you find yourself writing a
   number or a label in this file, something has gone wrong.

   An earlier version positioned tiles absolutely and measured row heights in
   JS. It shipped two bugs and had to be re-derived whenever the type changed.
   Do not reintroduce layout here - CSS already does geometry correctly.

   Degrades honestly: with JS off every row is present and readable, and the
   buttons simply do nothing.
*/
(function () {
  'use strict';

  var rows = document.getElementById('postRows');
  if (!rows) return;

  var lenses = document.getElementById('shelfLenses');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var rowEls = Array.prototype.slice.call(rows.querySelectorAll('.post-row'));

  var elLive  = document.getElementById('liveCount');
  var elTotal = document.getElementById('liveTotal');
  var elLens  = document.getElementById('liveLens');
  var elEmpty = document.getElementById('rowsEmpty');

  var TOTAL = rowEls.length;
  var active = 'all';

  /* Counts come from the posts on the page, never from a template literal. */
  function countOf(k) {
    if (k === 'all') return TOTAL;
    var n = 0;
    for (var i = 0; i < rowEls.length; i++) if (rowEls[i].getAttribute('data-thread') === k) n++;
    return n;
  }

  var buttons = lenses ? Array.prototype.slice.call(lenses.querySelectorAll('.lens')) : [];
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

    var shown = 0;
    rowEls.forEach(function (r) {
      var hit = (k === 'all' || r.getAttribute('data-thread') === k);
      r.hidden = !hit;
      if (hit) shown++;
    });

    if (elLive) elLive.textContent = shown;
    if (elLens) elLens.textContent = labelFor(k);
    if (elEmpty) elEmpty.hidden = shown > 0;
  }

  if (lenses) {
    lenses.addEventListener('click', function (e) {
      var b = e.target.closest('.lens');
      if (b) setThread(b.getAttribute('data-thread'));
    });
  }

  // The thread cards are controls too: they set the filter and take you to the
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
