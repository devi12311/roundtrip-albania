import gsap from 'gsap';
import { q } from '../lib/dom.js';

export function initWinter() {
  const hero = q('[data-winter-hero]');
  const media = q('[data-winter-media]', hero);

  // Inset panel expands to full-bleed.
  gsap.fromTo(media,
    { clipPath: 'inset(10% 8% 10% 8% round 20px)' },
    { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top bottom', end: 'top top', scrub: true } });

  // Headline revealed line by line, then supporting copy.
  const tl = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top 35%', toggleActions: 'play none none reverse' } });
  tl.from('.winter__title .line > span', { yPercent: 110, duration: 1.1, ease: 'power4.out', stagger: 0.12 })
    .from(['.winter__content .tag', '.winter__content .body-lg', '.winter__content .btn'],
      { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08 }, 0.3);
}
