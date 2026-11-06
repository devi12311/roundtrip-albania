// Phone booking bar: appears once the hero has scrolled away and steps aside for the footer,
// which has its own booking actions. Runs regardless of motion preference.
export function initBookBar() {
  const bar = document.querySelector('[data-book-bar]');
  const hero = document.querySelector('.hero');
  const footer = document.querySelector('[data-footer]');
  let heroVisible = true;
  let footerVisible = false;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.target === hero) heroVisible = e.isIntersecting;
      else footerVisible = e.isIntersecting;
    });
    bar.classList.toggle('is-visible', !heroVisible && !footerVisible);
  });
  io.observe(hero);
  io.observe(footer);
}
