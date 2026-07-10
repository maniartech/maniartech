/* Smooth gear hover acceleration.
 *
 * The CSS (_gears.scss) rotates each gear with a keyframe animation and, on
 * hover, shortens animation-duration — which makes the browser re-map the
 * current playback time onto the new duration and the gear visibly JUMPS.
 *
 * Here we take over rotation with requestAnimationFrame: every gear keeps
 * accumulating its own angle, and a single speed multiplier EASES from 1x
 * toward a hover target and back, so the whole cluster accelerates and
 * decelerates smoothly from its current position. We read each gear's base
 * speed + direction straight from the CSS so the config stays in one place.
 *
 * If this script never runs, the CSS animation remains as a graceful (if
 * jerky-on-hover) fallback.
 */
(function () {
  function init() {
    var svg = document.querySelector('.gear-svg');
    if (!svg) return;

    var gears = [];
    svg.querySelectorAll('[id^="gr-"]').forEach(function (el) {
      var cs = getComputedStyle(el);
      var name = (cs.animationName || '').trim();      // 'rt' (cw) or 'rrt' (ccw)
      if (name !== 'rt' && name !== 'rrt') return;
      var dur = parseFloat(cs.animationDuration) || 8; // seconds per turn
      el.style.animation = 'none';                     // take over from CSS
      gears.push({
        el: el,
        v: (name === 'rrt' ? -1 : 1) * 360 / dur,      // deg per second
        angle: 0
      });
    });
    if (!gears.length) return;

    var HOVER_SPEED = 8;   // ~matches the old 8s -> 1s ratio
    var EASE = 2.6;        // higher = snappier ramp; ~0.4s time constant
    var mult = 1, target = 1;

    var hot = document.querySelector('.gear-wrapper') || svg;
    hot.addEventListener('mouseenter', function () { target = HOVER_SPEED; });
    hot.addEventListener('mouseleave', function () { target = 1; });

    var last = 0;
    function frame(t) {
      var dt = last ? Math.min((t - last) / 1000, 0.05) : 0;
      last = t;
      // exponential ease of the speed multiplier toward its target
      mult += (target - mult) * (1 - Math.exp(-EASE * dt));
      for (var i = 0; i < gears.length; i++) {
        var g = gears[i];
        g.angle += g.v * mult * dt;
        g.el.style.transform = 'rotate(' + g.angle.toFixed(3) + 'deg)';
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
