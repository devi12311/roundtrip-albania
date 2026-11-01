import gsap from 'gsap';
import { q, qa, relRect, splitWords, stepper } from '../lib/dom.js';

// Desktop only: pinned type reveal → token photo grows into the chapter frame → 4 service chapters.
export function initJourney() {
  const section = q('.journey');
  const stage = q('[data-journey-stage]');
  const text = q('.journey__text', stage);
  const token = q('[data-journey-token]', stage);
  const photo = q('[data-journey-photo]', stage);
  const van = q('[data-journey-van]', stage);
  const wheels = qa('.van__wheel', van);
  const chapters = qa('[data-chapter]', stage);
  const frame = q('.chapter__media', chapters[0]);
  const progress = q('[data-journey-progress]', stage);
  const words = splitWords(text);

  gsap.set(token, { autoAlpha: 0 });
  chapters.slice(1).forEach((c) => gsap.set(q('.chapter__media', c), { clipPath: 'inset(100% 0% 0% 0%)' }));

  const times = [];
  const update = stepper(times, [chapters, qa('li', progress)], (idx) => {
    progress.classList.toggle('is-visible', idx >= 0);
  });

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    onUpdate: () => update(tl),
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=650%',
      pin: true,
      scrub: 0.8,
      invalidateOnRefresh: true,
    },
  });

  // 1. Words fill grey → ink; token photo pops in; van drives in.
  tl.to(words, { color: '#000000', duration: 0.3, stagger: 0.22 }, 0);
  tl.fromTo(photo,
    {
      left: () => relRect(token, stage).left,
      top: () => relRect(token, stage).top,
      width: () => relRect(token, stage).width,
      height: () => relRect(token, stage).height,
      scale: 0,
    },
    { scale: 1, duration: 0.5, ease: 'back.out(1.6)' }, 0.5);
  tl.fromTo(van, { x: () => window.innerWidth * 0.45 }, { x: 0, duration: 1.6, ease: 'power2.out' }, 0.2);
  tl.fromTo(wheels, { rotation: 0 }, { rotation: -900, transformOrigin: '50% 50%', duration: 1.6, ease: 'power2.out' }, 0.2);

  // 2. Text clears, van drives off, token photo grows into the chapter frame.
  tl.to(text, { autoAlpha: 0, y: -40, duration: 0.6 }, 2.4);
  tl.to(van, { x: () => -window.innerWidth, duration: 1, ease: 'power2.in' }, 2.3);
  tl.to(wheels, { rotation: -1800, duration: 1, ease: 'power2.in' }, 2.3);
  tl.to(photo, {
    left: () => relRect(frame, stage).left,
    top: () => relRect(frame, stage).top,
    width: () => relRect(frame, stage).width,
    height: () => relRect(frame, stage).height,
    duration: 1,
    ease: 'power2.inOut',
  }, 2.5);
  times.push(3.2);

  // 3. Chapters: each new photo wipes up over the last, headline swaps.
  chapters.slice(1).forEach((c, i) => {
    const t = 4 + i * 1.2;
    const media = q('.chapter__media', c);
    tl.to(media, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power2.inOut' }, t);
    tl.fromTo(q('img', media), { scale: 1.2 }, { scale: 1, duration: 1.2 }, t);
    times.push(t + 0.4);
  });
  tl.to({}, { duration: 0.8 });
}
