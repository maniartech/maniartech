/* Mobile menu toggle (the theme's nav collapses on < lg with no toggle of its
 * own, so we add a self-contained slide-in menu). */
(function () {
  function init() {
    var burger = document.querySelector('.mt-burger');
    var menu = document.querySelector('.mt-mobile-menu');
    var backdrop = document.querySelector('.mt-menu-backdrop');
    var closeBtn = menu ? menu.querySelector('.close button') : null;
    if (!burger || !menu) return;

    function set(open) {
      menu.classList.toggle('open', open);
      if (backdrop) backdrop.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      // a11y: reflect state + keep the closed menu out of the tab/AT order
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (backdrop) backdrop.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (open) {
        (closeBtn || menu.querySelector('a')).focus();
      } else if (menu.contains(document.activeElement)) {
        burger.focus();  // restore focus to the trigger, but only if it was inside the menu
      }
    }

    burger.addEventListener('click', function () { set(!menu.classList.contains('open')); });
    if (backdrop) backdrop.addEventListener('click', function () { set(false); });
    if (closeBtn) closeBtn.addEventListener('click', function () { set(false); });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { set(false); });
    });
    // Escape closes the menu
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) set(false);
    });
    // simple focus trap: keep Tab inside the open menu
    menu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !menu.classList.contains('open')) return;
      var f = menu.querySelectorAll('a[href], button:not([disabled])');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    // close on resize up to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 991) set(false);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
