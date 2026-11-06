import gsap from 'gsap';
import { q, qa, splitWords } from '../lib/dom.js';

// Phone: the same type reveal as desktop, held by a CSS sticky stage rather than a ScrollTrigger pin,
// so the address bar can't make it jump. Always trigger on the tall parent, never the sticky element.
export function initJourneyPhone() {
  const track = q('[data-journey-intro]');
  const text = q('.journey__text', track);
  const token = q('[data-journey-token]', track);
  const van = q('[data-journey-van]', track);
  const words = splitWords(text);

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: track, start: 'top top', end: 'bottom bottom', scrub: 0.5, invalidateOnRefresh: true },
  });

  // transform only for the van; `color` just repaints the word that is changing.
  tl.to(words, { color: '#000000', duration: 0.3, stagger: 0.12 }, 0);
  tl.from(token, { scale: 0, duration: 0.4, ease: 'back.out(1.6)' }, 0.25);
  tl.fromTo(van,
    { x: () => window.innerWidth },
    { x: () => -van.offsetWidth - 24, duration: tl.duration(), ease: 'power1.inOut' }, 0);
  tl.fromTo(qa('.van__wheel', van),
    { rotation: 0 },
    { rotation: -1440, transformOrigin: '50% 50%', duration: tl.duration(), ease: 'power1.inOut' }, 0);
}
