/* Partnership page runtime - two working controls, no decoration.
 *
 * Doctrine: all verdict/label text lives in the MARKUP (this file only toggles
 * visibility), every number is derived from the DOM (count what is there,
 * never hardcode), and everything shows real content at rest - without JS the
 * page still reads as complete prose with a neutral line where the live
 * verdict would be.
 */
(function () {
  'use strict';

  /* --- the fit check: tick what is true, get the honest routing ----------- */
  var fit = document.getElementById('partnerFit');
  if (fit) {
    var boxes = Array.prototype.slice.call(fit.querySelectorAll('input[type="checkbox"]'));
    var verdicts = {
      rest: fit.querySelector('.pf-v-rest'),
      low:  fit.querySelector('.pf-v-low'),
      mid:  fit.querySelector('.pf-v-mid'),
      high: fit.querySelector('.pf-v-high')
    };
    var show = function (key) {
      for (var k in verdicts) if (verdicts[k]) verdicts[k].hidden = (k !== key);
    };
    var judge = function () {
      var n = boxes.filter(function (b) { return b.checked; }).length;
      if (n === 0) { show('rest'); }
      else if (n === boxes.length) { show('high'); }
      else if (n >= boxes.length - 2) { show('mid'); }
      else { show('low'); }
    };
    boxes.forEach(function (b) { b.addEventListener('change', judge); });
    judge();
  }

  /* --- the briefing checklist: progress derived, list copyable ------------ */
  var brief = document.getElementById('partnerBrief');
  if (brief) {
    var items = Array.prototype.slice.call(brief.querySelectorAll('input[type="checkbox"]'));
    var progress = brief.querySelector('.bc-progress');
    var paint = function () {
      if (!progress) return;
      var n = items.filter(function (b) { return b.checked; }).length;
      progress.textContent = n + ' of ' + items.length + ' assembled';
      progress.classList.toggle('is-done', n === items.length);
    };
    items.forEach(function (b) { b.addEventListener('change', paint); });
    paint();

    var copy = brief.querySelector('.bc-copy');
    if (copy) {
      if (navigator.clipboard) {
        var label = copy.textContent;
        copy.addEventListener('click', function () {
          /* Build a plain-ASCII checklist from the DOM itself - the page is
             the single source of the list. */
          var lines = [];
          brief.querySelectorAll('.bc-group').forEach(function (g) {
            var h = g.querySelector('.bc-h');
            if (h) lines.push(h.textContent.trim().toUpperCase());
            g.querySelectorAll('label').forEach(function (l) {
              lines.push('[ ] ' + l.textContent.trim());
            });
            lines.push('');
          });
          navigator.clipboard.writeText(lines.join('\n').trim() + '\n').then(function () {
            copy.textContent = 'Copied - paste it into your notes';
            copy.classList.add('is-done');
            window.setTimeout(function () {
              copy.textContent = label;
              copy.classList.remove('is-done');
            }, 2200);
          }, function () { /* clipboard refused: leave the button as-is */ });
        });
      } else {
        copy.hidden = true;
      }
    }
  }
})();
