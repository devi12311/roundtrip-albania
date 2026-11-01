import gsap from 'gsap';
import { q, qa, stepper } from '../lib/dom.js';

// Desktop only: pinned 3-column. Centre card cycles 8 destinations with a violet wipe.
export function initDestinations() {
  const section = q('.dest');
  const items = qa('[data-dest-item]', section);
  const counter = q('[data-dest-current]', section);
  const dashes = qa('li', q('[data-dest-progress]', section));

  items.slice(1).forEach((it) => {
    gsap.set([q('.dest-item__wipe', it), q('.dest-item__img', it)], { clipPath: 'inset(100% 0% 0% 0%)' });
  });

  const times = [0];
  const update = stepper(times, [items, dashes], (idx) => {
    counter.textContent = String(Math.max(idx, 0) + 1).padStart(2, '0');
  });

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    onUpdate: () => update(tl),
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${items.length * 70}%`,
      pin: true,
      scrub: 0.8,
    },
  });

  tl.from(q('.dest-item__card', items[0]), { scale: 0.85, duration: 0.6, ease: 'power2.out' }, 0);
  items.slice(1).forEach((it, i) => {
    const t = 0.8 + i;
    tl.to(q('.dest-item__wipe', it), { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5 }, t);
    tl.to(q('.dest-item__img', it), { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5 }, t + 0.25);
    tl.fromTo(q('.dest-item__img img', it), { scale: 1.2 }, { scale: 1, duration: 0.9, ease: 'none' }, t + 0.25);
    times.push(t + 0.4);
  });
  tl.to({}, { duration: 0.6 });
}
