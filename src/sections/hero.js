import gsap from 'gsap';
import { q } from '../lib/dom.js';

export function initHero() {
  const hero = q('.hero');

  // Intro: headline lines rise out of their masks.
  gsap.from('.hero__title .line > span', { yPercent: 110, duration: 1.2, ease: 'power4.out', stagger: 0.1, delay: 0.15 });
  gsap.from(['.hero__lead', '.hero__content .btn'], { y: 24, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.55 });

  // On scroll: the bottom edge curves into the cream canvas, media drifts.
  const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
  gsap.fromTo(hero,
    { clipPath: 'inset(0% 0% 0% 0% round 0% 0% 0% 0% / 0px 0px 0px 0px)' },
    { clipPath: 'inset(0% 0% 0% 0% round 0% 0% 50% 50% / 0px 0px 180px 180px)', ease: 'none', scrollTrigger: st });
  gsap.to('.hero__media', { yPercent: 18, scale: 1.08, ease: 'none', scrollTrigger: { ...st } });
  gsap.to('.hero__content', { y: -80, opacity: 0, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: '60% top', scrub: true } });
}
