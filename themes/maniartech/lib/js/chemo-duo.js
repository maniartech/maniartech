/* Home "See it in action": the Chemo desktop + phone pair.
 * 1. Reveal: the pair eases in once when it first enters the viewport.
 * 2. Scroll parallax: while on screen, --p runs -1..1 with scroll.
 * 3. Pointer parallax: over the section's row (fine pointers only), --mx and
 *    --my follow the mouse, eased, and settle back to 0 on leave.
 * CSS moves each layer by a different amount, so the pair separates in depth.
 * Reduced motion: none of it runs; both images simply sit at rest. */
(function () {
  function init() {
    var duo = document.querySelector('.mt-duo');
    if (!duo) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    duo.classList.add('is-armed');
    var visible = false, ticking = false;

    function update() {
      ticking = false;
      var r = duo.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      // 0 when the pair's centre is at the viewport centre, -1/1 at the edges
      var p = ((r.top + r.height / 2) - vh / 2) / (vh / 2 + r.height / 2);
      p = Math.max(-1, Math.min(1, p));
      duo.style.setProperty('--p', p.toFixed(3));
    }
    function onScroll() {
      if (visible && !ticking) { ticking = true; requestAnimationFrame(update); }
    }

    // Pointer: ease the current value toward the target on every frame until settled.
    var area = duo.closest('.row') || duo;
    var tx = 0, ty = 0, cx = 0, cy = 0, running = false;
    function glide() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      duo.style.setProperty('--mx', cx.toFixed(3));
      duo.style.setProperty('--my', cy.toFixed(3));
      if (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) {
        requestAnimationFrame(glide);
      } else { running = false; }
    }
    function go() { if (!running) { running = true; requestAnimationFrame(glide); } }
    if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
      area.addEventListener('pointermove', function (e) {
        var r = area.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
        go();
      });
      area.addEventListener('pointerleave', function () { tx = 0; ty = 0; go(); });
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          visible = e.isIntersecting;
          if (visible) { duo.classList.add('is-in'); update(); }
        });
      }, { threshold: 0.2 }).observe(duo);
    } else {
      duo.classList.add('is-in');
      visible = true;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
