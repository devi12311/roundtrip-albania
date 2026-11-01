import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { qa } from '../lib/dom.js';

// Generic entrance animations: [data-reveal] fades up, [data-stagger] groups rise in sequence,
// [data-count] numbers count up once.
export function initReveals() {
  qa('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 40, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  gsap.set('[data-stagger]', { y: 80, opacity: 0 });
  ScrollTrigger.batch('[data-stagger]', {
    start: 'top 92%',
    once: true,
    onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.12 }),
  });

  qa('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const counter = { v: 0 };
    el.textContent = '0';
    ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () => gsap.to(counter, {
        v: end, duration: 1.4, ease: 'power2.out',
        onUpdate: () => { el.textContent = Math.round(counter.v); },
      }),
    });
  });
}
