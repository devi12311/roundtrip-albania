import './styles/main.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { initI18n } from './i18n.js';
import { initWhatsApp } from './lib/whatsapp.js';
import { initHeader } from './sections/header.js';
import { initHero } from './sections/hero.js';
import { initJourney } from './sections/journey.js';
import { initJourneyPhone } from './sections/journey-phone.js';
import { initTestimonial } from './sections/testimonial.js';
import { initDestinations } from './sections/destinations.js';
import { initWinter } from './sections/winter.js';
import { initOffer, initOfferPhone } from './sections/offer.js';
import { initFooter } from './sections/footer.js';
import { initReveals } from './sections/reveals.js';
import { initBookBar } from './sections/bookbar.js';

gsap.registerPlugin(ScrollTrigger);

// Keep in sync with the media queries in src/styles/sections.css.
const MOTION = '(prefers-reduced-motion: no-preference)';
const MOTION_DESKTOP = '(min-width: 900px) and (prefers-reduced-motion: no-preference)';

async function boot() {
  const t = await initI18n();
  initWhatsApp(t);
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  let lenis = null;
  if (window.matchMedia(MOTION).matches) {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  initHeader(lenis);
  initBookBar();

  // Sections are created in page order so pin spacing is measured correctly;
  // matchMedia reverts everything when the layout switches to the static version.
  gsap.matchMedia().add({ motion: MOTION, desktop: MOTION_DESKTOP }, ({ conditions }) => {
    if (!conditions.motion) return;
    initHero(conditions.desktop);
    if (conditions.desktop) initJourney();
    else initJourneyPhone();
    initTestimonial();
    if (conditions.desktop) initDestinations();
    initWinter(conditions.desktop);
    if (conditions.desktop) initOffer();
    else initOfferPhone();
    initReveals();
    initFooter();
    ScrollTrigger.sort();
  });

  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

boot();
