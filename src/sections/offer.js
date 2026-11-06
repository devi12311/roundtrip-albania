import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { q, qa, stepper } from '../lib/dom.js';

// Mountain silhouettes for the image mask (objectBoundingBox units, same point count so they morph).
const SHAPES = [
  'M0,0.94 L0.30,0.16 Q0.34,0.06 0.38,0.16 L0.53,0.52 L0.66,0.30 Q0.70,0.23 0.74,0.30 L1,0.94 Q0.5,1.04 0,0.94 Z',
  'M0,0.94 L0.24,0.36 Q0.28,0.28 0.32,0.36 L0.45,0.56 L0.64,0.10 Q0.68,0.02 0.72,0.10 L1,0.94 Q0.5,1.04 0,0.94 Z',
];

// Desktop only: black pinned section; headline/body swap, masked image cross-fades and the mask morphs.
export function initOffer() {
  const section = q('.offer');
  const items = qa('[data-offer-item]', section);
  const imgs = qa('[data-offer-img]', section);
  const clip = q('[data-offer-clip]', section);
  const dashes = qa('li', q('[data-offer-progress]', section));

  gsap.set(imgs.slice(1), { autoAlpha: 0 });

  gsap.from(q('.offer__mask', section), {
    scale: 0.8, ease: 'none',
    scrollTrigger: { trigger: section, start: 'top bottom', end: 'top top', scrub: true },
  });

  const times = [0];
  const update = stepper(times, [items, dashes]);
  const tl = gsap.timeline({
    defaults: { ease: 'power1.inOut' },
    onUpdate: () => update(tl),
    scrollTrigger: { trigger: section, start: 'top top', end: '+=400%', pin: true, scrub: 0.8 },
  });

  imgs.slice(1).forEach((img, i) => {
    const t = 0.6 + i;
    tl.to(img, { autoAlpha: 1, duration: 0.5 }, t);
    tl.fromTo(q('img', img), { scale: 1.15 }, { scale: 1, duration: 1, ease: 'none' }, t);
    tl.to(clip, { attr: { d: SHAPES[(i + 1) % 2] }, duration: 1 }, t - 0.25);
    times.push(t + 0.25);
  });
  tl.to({}, { duration: 0.5 });
}

// Phone: the masked visual is held by CSS sticky above the list. Each item swaps the photo as it
// reaches the reading line, on a short timed tween: scrubbing the clip path would repaint every frame.
export function initOfferPhone() {
  const section = q('.offer');
  const items = qa('[data-offer-item]', section);
  const imgs = qa('[data-offer-img]', section);
  const clip = q('[data-offer-clip]', section);
  let current = 0;

  gsap.set(imgs.slice(1), { autoAlpha: 0 });
  items[0].classList.add('is-active');

  const show = (i) => {
    if (i === current) return;
    gsap.to(imgs[current], { autoAlpha: 0, duration: 0.5, overwrite: true });
    gsap.to(imgs[i], { autoAlpha: 1, duration: 0.5, overwrite: true });
    gsap.to(clip, { attr: { d: SHAPES[i % 2] }, duration: 0.6, ease: 'power2.inOut', overwrite: true });
    items.forEach((it, n) => it.classList.toggle('is-active', n === i));
    current = i;
  };

  items.forEach((it, i) => ScrollTrigger.create({
    trigger: it, start: 'top 62%', end: 'bottom 62%',
    onEnter: () => show(i), onEnterBack: () => show(i),
  }));
}
