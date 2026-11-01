import gsap from 'gsap';
import { q } from '../lib/dom.js';

export function initFooter() {
  const footer = q('[data-footer]');

  gsap.fromTo(q('[data-footer-media] img', footer),
    { yPercent: -8, scale: 1.12 },
    { yPercent: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: footer, start: 'top bottom', end: 'bottom bottom', scrub: true } });

  // Second line of the statement fades up to full strength.
  gsap.fromTo(q('[data-footer-l2]', footer),
    { opacity: 0.15 },
    { opacity: 1, ease: 'none', scrollTrigger: { trigger: footer, start: 'top 55%', end: 'top 5%', scrub: true } });
}
