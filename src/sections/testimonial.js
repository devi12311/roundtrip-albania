import gsap from 'gsap';
import { q } from '../lib/dom.js';

export function initTestimonial() {
  const section = q('[data-testimonial]');
  const frame = q('[data-testimonial-frame]', section);
  const mark = q('[data-testimonial-mark]', section);
  const quote = q('[data-testimonial-quote]', section);
  const desktop = window.matchMedia('(min-width: 900px)').matches;

  // Inset photo grows to full-bleed as it scrolls in.
  gsap.fromTo(frame,
    { clipPath: 'inset(12% 10% 12% 10% round 20px)' },
    { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'top top', scrub: true } });

  // Then the brand mark draws itself and the quote fades in.
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: desktop
      ? { trigger: section, start: 'top top', end: '+=120%', pin: true, scrub: 0.8 }
      : { trigger: section, start: 'top 40%', end: 'bottom bottom', scrub: 0.8 },
  });
  tl.fromTo(mark, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1 }, 0);
  tl.from(quote, { autoAlpha: 0, y: 40, duration: 0.6 }, 0.4);
  tl.to({}, { duration: 0.3 });
}
