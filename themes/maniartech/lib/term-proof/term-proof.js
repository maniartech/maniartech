/* ManiarTech — About > "What drives us" terminal.
   Types real, runnable commands for the things we've built, with honest output
   lines. The claim in the copy is "you can verify it yourself" — this IS the
   verification, as a shell you could copy. HTML text (crisp/selectable),
   type-on effect starts when scrolled into view; reduced-motion or hidden
   tabs render the finished transcript instantly. No deps. */
(function () {
  'use strict';
  var body = document.getElementById('termProof');
  if (!body) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // real artifacts only — commands anyone can run today
  var LINES = [
    { cmd: 'npm install vault-storage', out: '✓ browser storage · ~1.5 KB core · 350+ tests · MIT' },
    { cmd: 'go get github.com/maniartech/signals', out: '✓ type-safe Go events · used in production' },
    { cmd: 'go get github.com/maniartech/uexl-go', out: '✓ expression engine · zero-alloc hot path' },
    { cmd: 'open https://github.com/maniartech', out: '→ every public repo, open to read and run' }
  ];

  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function lineHtml(l, cmdText, withOut) {
    var h = '<span class="tp-prompt">$</span> <span class="tp-cmd">' + esc(cmdText) + '</span>';
    if (withOut) h += '\n<span class="tp-out">' + esc(l.out) + '</span>';
    return h;
  }
  function fullHtml(upTo, partialCmd) {
    var parts = [];
    for (var i = 0; i < upTo; i++) parts.push(lineHtml(LINES[i], LINES[i].cmd, true));
    if (partialCmd != null) parts.push(lineHtml(LINES[upTo], partialCmd, false));
    return parts.join('\n\n') + '<span class="tp-cursor" aria-hidden="true"></span>';
  }
  function finish() { body.innerHTML = fullHtml(LINES.length, null); }

  // typing sequence — plain timeouts; guarded so it can't double-run
  var started = false;
  function play() {
    if (started) return; started = true;
    var li = 0, ci = 0;
    function step() {
      if (li >= LINES.length) { finish(); return; }
      ci++;
      if (ci <= LINES[li].cmd.length) {
        body.innerHTML = fullHtml(li, LINES[li].cmd.slice(0, ci));
        setTimeout(step, 24 + Math.random() * 40);
      } else {
        li++; ci = 0;
        body.innerHTML = fullHtml(li, null);      // command "runs": output appears
        setTimeout(step, li >= LINES.length ? 0 : 520);
      }
    }
    setTimeout(step, 350);
  }

  if (reduce || document.hidden || !('IntersectionObserver' in window)) { finish(); return; }
  body.innerHTML = fullHtml(0, '');               // empty prompt + cursor until seen
  var io = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) { io.disconnect(); play(); }
  }, { threshold: 0.4 });
  io.observe(body);
})();
