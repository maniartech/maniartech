/* Article page runtime - insights/white-paper reading pages.
 *
 * Everything here is DERIVED from the article itself (thumb rule: data lives
 * once): the "On this page" nav is built from the h2s actually rendered, the
 * reading time from the word count the template stamped, the code chips from
 * the fenced block's own language class. No layout, no content, no numbers
 * typed by hand.
 */
(function () {
  'use strict';

  var body = document.querySelector('.article-body');
  if (!body) return;

  /* --- reading time: words stamped by the template -> minutes ------------- */
  var mins = document.querySelector('[data-read-mins]');
  if (mins) {
    var words = parseInt(mins.getAttribute('data-words'), 10);
    if (words > 0) mins.textContent = String(Math.max(1, Math.ceil(words / 220)));
  }

  /* --- thin top progress bar: how far into the page the reader is --------- */
  var bar = document.querySelector('.read-progress');
  if (bar) {
    var paint = function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      bar.style.width = (max > 0 ? (100 * doc.scrollTop / max) : 0) + '%';
    };
    document.addEventListener('scroll', paint, { passive: true });
    window.addEventListener('resize', paint);
    paint();
  }

  /* --- language chips on fenced code blocks ------------------------------- */
  body.querySelectorAll('pre > code[class*="language-"]').forEach(function (code) {
    var m = code.className.match(/language-([\w+-]+)/);
    if (m && m[1] !== 'text' && m[1] !== 'plain') {
      code.parentElement.setAttribute('data-lang', m[1]);
    }
  });

  /* --- "On this page": built from the headings present, scrollspied -------
     h2 only by default (an article's sections ARE its h2s). A page whose real
     units of interest sit one level down - /standards/, where each project is
     an h3 under a publication-status h2 - opts in with data-depth="3" and gets
     those nested underneath. Opt-in, so no existing page's nav changes. */
  var toc = document.querySelector('.toc');
  var list = toc && toc.querySelector('.toc-list');
  var deep = toc && toc.getAttribute('data-depth') === '3';
  var heads = [];
  body.querySelectorAll(deep ? 'h2[id], h3[id]' : 'h2[id]').forEach(function (h) {
    if (h.textContent.trim()) heads.push(h);
  });

  if (toc && list && heads.length >= 2) {
    var links = heads.map(function (h) {
      var sub = h.tagName === 'H3';
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + h.id;
      /* Project headings read "Indigo - a Go superset whose output is..." in the
         prose; the nav only needs the name before the dash. */
      a.textContent = sub ? h.textContent.split(' - ')[0].trim() : h.textContent;
      if (sub) { li.className = 'is-sub'; a.className = 'is-sub'; }
      li.appendChild(a);
      list.appendChild(li);
      return a;
    });
    toc.hidden = false;

    var current = -1;
    var setActive = function (i) {
      if (i === current) return;
      if (current >= 0) links[current].classList.remove('is-active');
      if (i >= 0) links[i].classList.add('is-active');
      current = i;
    };
    /* The "reading line" sits 30% down the viewport: the section whose
       heading has crossed it is the one being read. */
    var spy = function () {
      var line = window.innerHeight * 0.3;
      var active = -1;
      for (var i = 0; i < heads.length; i++) {
        if (heads[i].getBoundingClientRect().top <= line) active = i;
      }
      setActive(active);
    };
    document.addEventListener('scroll', spy, { passive: true });
    window.addEventListener('resize', spy);
    spy();
  }

  /* --- copy-link control --------------------------------------------------- */
  var copy = document.querySelector('.copy-link');
  if (copy) {
    if (navigator.clipboard && window.isSecureContext !== false) {
      var label = copy.textContent;
      copy.addEventListener('click', function () {
        navigator.clipboard.writeText(location.origin + location.pathname).then(function () {
          copy.textContent = 'Link copied';
          copy.classList.add('is-done');
          window.setTimeout(function () {
            copy.textContent = label;
            copy.classList.remove('is-done');
          }, 1800);
        }, function () { /* clipboard refused: leave the button as-is */ });
      });
    } else {
      copy.hidden = true;
    }
  }
})();
