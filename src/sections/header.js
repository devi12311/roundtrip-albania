import { q, qa } from '../lib/dom.js';

export function initHeader(lenis) {
  const header = q('[data-site-header]');
  const burger = q('[data-burger]');
  const menu = q('#mobile-menu');

  // Header theme follows the section currently under it (data-header="dark|light").
  let ticking = false;
  let lastY = window.scrollY;
  const update = () => {
    ticking = false;
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 80);
    // Like Zipline: hide on scroll down, reveal on scroll up.
    if (Math.abs(y - lastY) > 4) {
      header.classList.toggle('is-hidden', y > lastY && y > 400 && menu.hidden);
      lastY = y;
    }
    const under = document
      .elementsFromPoint(window.innerWidth / 2, 40)
      .find((el) => !header.contains(el) && el.closest('[data-header]'));
    header.classList.toggle('is-dark', under?.closest('[data-header]').dataset.header === 'dark');
  };
  const onScroll = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  };
  if (lenis) lenis.on('scroll', onScroll);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();

  const setMenu = (open) => {
    header.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    if (lenis) open ? lenis.stop() : lenis.start();
    else document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => setMenu(menu.hidden));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) setMenu(false);
  });

  // Smooth in-page anchors (Lenis when available).
  qa('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const target = id === '#top' ? document.body : q(id);
      if (!target) return;
      e.preventDefault();
      if (!menu.hidden) setMenu(false);
      if (lenis) lenis.scrollTo(id === '#top' ? 0 : target, { duration: 1.4 });
      else target.scrollIntoView();
      history.replaceState(null, '', id);
    });
  });
}
