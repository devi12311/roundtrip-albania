# Zipline.com on a phone vs desktop: hands-on teardown (measured 2026-11-06)

Evidence tags used below:
- **[M]** measured in the live page on 2026-11-06, using Playwright driving installed Google Chrome (headless). Phone context: 390x844, DPR 2, isMobile, hasTouch, iPhone Safari user agent. Desktop context: 1440x900.
- **[C]** read from Zipline's production JS/CSS bundles, which are minified. Variable names are not original.
- **[I]** my inference.

zipline.com did not block automation: it returned HTTP 200 and rendered fully at both sizes. Only the homepage was tested. Every [M] and [C] item comes from https://www.zipline.com/ or its bundles, and raw data is in the scratchpad files listed under the last question.

Limits that apply throughout:
- This was Chrome with an iPhone user agent, not WebKit or a real phone. There is no real collapsing address bar, so svh, lvh and dvh all equal innerHeight here.
- Each test was run once or a few times.
- The cookie notice was never accepted. The trace runs opted out through the site's own "Do Not Sell" control. Other runs only hid the banner with injected CSS, in throwaway browser contexts.

## For each section at 390x844 with touch: pinned or not, scrubbed or not, layout change, and what replaces desktop-only effects?

### Takeaway
Zipline does not switch off its scroll scenes on phones. It keeps 2 of its 5 pins, with real scrubbing and the 3D drone, and turns the other three into normal-flow sections that still animate with the scroll. Pinned scroll still makes up about 42% of the phone page, against about 72% on desktop. It keeps the two scenes that explain the product and unpins the ones that are just atmosphere or repetition.

### Cited Findings

**Section table.** "Scrubbed" was confirmed by holding still for 1.6s and finding the animation stopped at an intermediate value, which a time-based tween would not do. Heights are spacer heights, including the pin distance.

| # | Section | Desktop 1440x900 | Phone 390x844 | Verdict | What changes on the phone |
|---|---|---|---|---|---|
| 1 | Header | Transparent at top, then floating pill; hides on scroll down | Logo, CTA and burger; hides on scroll down; full-width cream bar with violet CTA on scroll up | Changed | See the header question. Full-screen violet menu replaces the desktop nav |
| 2 | Video hero | Not pinned, 1099px, curved bottom | Not pinned, 898px, curved bottom | Kept | Separate portrait video, 720x1554, instead of 1600x888. Centred text instead of bottom-left. Curve scales by width (54px vs 199px tall, both 13.8122vw) |
| 3 | Pinned type reveal, photo token, drone | Pinned, scrubbed; shares one 9,900px pin with section 4 | **Pinned**, scrubbed; 2,897px pin | Kept, shorter | Copy reflowed from 3 lines to 4 using separate `line-mobile` elements. Three.js drone kept. Token kept and still grows into the first chapter image |
| 4 | Sticky image with swapping chapters | 3 chapters inside the pin, side by side, dash progress | Chapter 1 ends the pin. Chapters 2 and 3 are **unpinned** `100svh` cards (1,688px) | Changed | Headline above photo instead of beside it. Swap replaced by normal scrolling with a scrubbed reveal on each photo. Headline words trigger on enter. Dash progress dropped |
| 5 | Testimonial, inset grows to full-bleed | Pinned, 1,080px, scrubbed | **Not pinned**, 844px | Changed | Full-bleed from the start, so the inset growth is dropped. Quote stacks above the portrait. The cut-out figure and logo outline still move with scroll |
| 6 | Pinned 3-col "How to" | Pinned, 4,680px, scrubbed | **Pinned**, 4,389px, scrubbed | Kept, near identical | 3 columns become a vertical stack: title, card, step title. Card 342x380 vs 384x634. Same violet wipe, video and dash progress |
| 7 | Secondary hero | Pinned, 500px, inset to full-bleed | **Not pinned**, 844px | Changed | Full-bleed from the start. Pin replaced by a scrubbed background scale from 1.2 down. Portrait video |
| 8 | Black pinned "Why", logo mask | Pinned, 4,680px, headline cross-fades, one masked image | **Not pinned**, about 1,713px | Changed | Cross-fade replaced by a separate mobile DOM: 3 stacked heading, masked image and paragraph items. Logo mask kept on every image. Image moves with scroll. Dash progress hidden |
| 9 | Stats cards, count-up | Not pinned, 3 columns, 528px | Not pinned, 1 column, 1,134px | Kept, restacked | 3 cards at 342x342, enter one by one. Count-up kept |
| 10 | Articles | 4 cards in a row, hover states | 2x2 grid, 771px | Kept, restacked | Not a carousel. Violet cover reveal kept. Section slides up on scroll |
| 11 | Footer | 1100px, photo, curved top | 646px, photo, curved top | Kept, condensed | Photo band plus link bar stacked below it |

**Pins and scrub**
- Phone has exactly 2 `.pin-spacer` elements: `KIERrW_drone-journey__pin` (spacer 3,741px, padding 2,897px) and `_0rynyG_how-it-works` (spacer 5,233px, padding 4,389px). Desktop has 5, adding `IxjmKW_testimonials` (1,080px), `koItKa_hero__pin-wrapper` (500px) and `Q0v0Oq_benefits` (4,680px) — [M, zipline.com](https://www.zipline.com/)
- In the scroll trace the pinned element was `position: fixed` during the hold, then a transform afterwards (`translate(0, 2897px)`, `translate(0, 4389px)`). The drone pin held from about y=900 to 3700 and How-to from about y=7100 to 11400, sampled every 100px — [M](https://www.zipline.com/)
- Values that stayed intermediate after a 1.6s hold on the phone: How-to slides at 506px, 131px, -767px, 542px and 117px; reveal `line-mobile` at opacity 0.76; image token at scale 0.986; chapter photo at 3.6%; drone text block at opacity 0.30 — [M](https://www.zipline.com/)
- The drone pin uses `scrub: true`, and its end is computed as `(scenes + 3) * viewportHeight * factor`. The caller passes `speedMultiplier: p ? .6 : 1`, a `maxProgress`, and renders the remaining chapters with `p && <Stack cases={e.slice(1)}/>` — [C](https://www.zipline.com/)
- Chapter cards are `.oVyEea_card {height: 100svh; position: relative}` with scrubbed photo reveals (`start: "top bottom", end: "top 65%", scrub: .7`) and `onEnter` triggers for the headline — [C](https://www.zipline.com/)
- The testimonial pin timeline sits inside `gsap.matchMedia().add("(min-width: 992px)", ...)`, so it does not exist on phones — [C](https://www.zipline.com/)
- The "Why" section renders two trees: `Q0v0Oq_benefits__row d-none d-lg-flex` (desktop) and `Q0v0Oq_benefits__mobile d-lg-none`, each item 542px tall — [M](https://www.zipline.com/)
- The secondary hero's `koItKa_hero__bg-wrapper-inner` changed scale continuously across y=12200 to 14100 in 18 distinct sampled values, starting from `scale(1.2)` — [M](https://www.zipline.com/)
- The stat count-up was visible mid-run (74,000+ then 74,320+) in the phone screenshots. Count-up fires at progress ≥ 0.75 of a trigger running `"top 80%"` to `"top top"` — [M](https://www.zipline.com/); [C](https://www.zipline.com/)

**Gating, tested across viewport types**

| Context | Pins | Lenis | Page height |
|---|---|---|---|
| 390x844 phone, touch | 2 | off | 17,780 |
| 390x844 desktop UA, no touch | 2 | **on** | 17,780 |
| 820x1180 tablet, touch | 2 | off | 26,335 |
| 844x390 landscape phone | 2 | off | 14,538 |
| 390x844, `prefers-reduced-motion` | 1 (How-to pin gone) | off | 13,391 |

- So layout and pins switch on **viewport width** at 992px, while Lenis switches on **input type** — [M](https://www.zipline.com/)

### Inferences
- [I] The rule appears to be: keep pins that carry a sequence the reader must follow (reveal, 3 steps), and unpin scenes that only add atmosphere or repeat a swap. That is my reading of the result, not a stated Zipline policy.
- [I] Solving the mobile pin distance gives `maxProgress` ≈ 0.55 with `speedMultiplier` 0.6, so the phone pin plays about half the desktop timeline at a faster rate. This assumes 8 scenes, which is back-calculated from desktop's 11-screen pin, and I did not read `maxProgress` directly.
- [I] `p` is almost certainly a max-width 991px flag, given the gating table, but its definition was not captured.
- [I] For Roundtrip Albania, the direct lesson is that "disable all pins under 992px" is not what Zipline does. Zipline's recipe is: keep one or two pins, re-stack their contents vertically for portrait, and give every unpinned section a scrubbed reveal or parallax so nothing is static.

### Gaps
- Whether the testimonial logo outline literally draws in on mobile, or simply moves, was not isolated. It was fully visible in the frames at y=6400 and 6800.
- Exact mapping of each unlabelled `scrub` config to its element was not done for every element. Mappings above are the ones confirmed by class name or behaviour.
- Secondary-hero video playback state on the phone was not sampled at that scroll position.

## Total page height and height per section, mobile vs desktop

### Takeaway
The phone page is about 17,500px (20.7 screens) against 28,748px on desktop (31.9 screens). Most of the difference comes from unpinning, since How-to is exactly the same length in screens on both.

### Cited Findings

| Section | Desktop px | Desktop screens (900) | Phone px | Phone screens (844) |
|---|---|---|---|---|
| Hero | 1,099 | 1.22 | 898 | 1.06 |
| Drone reveal + chapters | 10,800 | 12.00 | 3,741 + 1,688 = 5,429 | 4.43 + 2.00 = 6.43 |
| Testimonial | 1,980 | 2.20 | 844 | 1.00 |
| How to | 5,580 | 6.20 | 5,233 | 6.20 |
| Secondary hero | 1,400 | 1.56 | 844 | 1.00 |
| Why | 5,580 | 6.20 | 1,713 (2,046 at load) | 2.03 (2.42) |
| Stats | 528 | 0.59 | 1,134 | 1.34 |
| Articles | 812 | 0.90 | 771 | 0.91 |
| Footer | 1,100 | 1.22 | 646 | 0.77 |
| **Whole page** | **28,748** | **31.9** | **17,446 to 17,780** | **20.7 to 21.1** |

Figures are from [M, zipline.com](https://www.zipline.com/). Sections overlap slightly, so the rows do not sum exactly to the total.

- Phone height is unstable. It reads 17,780 at load and 17,446 to 17,489 after scrolling. Benefits shrinks from 2,046px to 1,713px once its images load (`height: auto`). A separate 42px comes from the drone wrapper's `marginBottom: -5vh` going to 0 — [M](https://www.zipline.com/); [C](https://www.zipline.com/)
- Desktop was stable at 28,748 before and after a full pass — [M](https://www.zipline.com/)
- Pinned scroll distance: desktop 20,840px (23.2 screens, 72% of the page); phone 7,286px (8.6 screens, 42% of the page) — computed from [M](https://www.zipline.com/)
- Pin distances scale with viewport height: How-to is 5.2 × innerHeight (390, 844 and 1180 tall all fit). The phone drone pin is 3.43 × innerHeight at the same three heights — [M](https://www.zipline.com/)
- How-to's 520vh comes from `holdPerSlide: 120, transition: 80`: 3×120 + 2×80 — [C](https://www.zipline.com/)
- Desktop's "Why" section is also 5.2 screens of pin — [M](https://www.zipline.com/)

### Inferences
- [I] Zipline deliberately held How-to at the desktop length on phones. It is the only long section that lost no scroll time.
- [I] The benefits height shift of 333px means images there have no reserved aspect ratio at load, so ScrollTrigger positions below it may need recalculating. I saw no visible error from it.

### Gaps
- Heights on a real iPhone will differ, since `100lvh` sections would use the large viewport rather than 844.

## Are there horizontal swipe carousels, sticky or fixed CTAs, tap interactions? How does the header behave?

### Takeaway
There are no carousels, no sticky CTA, and almost no tap interactions: the phone experience is driven entirely by vertical scroll. The only persistent element is the header, which hides on scroll down and returns on scroll up.

### Cited Findings
- No horizontal scrollers on the phone: zero `overflow-x: auto/scroll` elements with overflow, zero `scroll-snap-type`. Touch swipes of 250px across Testimonial, How-to, Stats and Articles left `scrollX` at 0 and `scrollY` unchanged — [M](https://www.zipline.com/)
- None of swiper, embla, keen-slider, splide or flickity appear in the loaded JS — [C](https://www.zipline.com/)
- The only fixed page element is the header (filter excluded the CookieYes and HubSpot containers). No element computed to `position: sticky` at either size — [M](https://www.zipline.com/)
- The CTA lives in the header ("Get delivery"), in the heroes ("Try it now", "Get delivery") and in the footer ("Try it today") — [M](https://www.zipline.com/)
- Burger tap opens a full-screen violet menu: `header-nav` fixed at 844px tall, `body {overflow: hidden}`, four huge display links (Technology, Solutions, Company, Careers), then secondary links and social icons. Partner CTA appears there too — [M](https://www.zipline.com/)
- Header test by real touch gesture: top 0 at y=0; hidden (`top: -60`) after scrolling to 1198; back at 0 after a gesture up of about 300px, where it renders as a cream bar with violet CTA and burger; hidden again after a gesture down of about 100px — [M](https://www.zipline.com/)
- Header config: `{topOffset: 8, atTopOffset: 180, hideAfterPx: 100, showAfterPx: 200, minDeltaPx: 2, inactivityMs: 3000}`, animated with Framer Motion, `y: "-100%"`, 0.28s easeOut — [C](https://www.zipline.com/)
- Same hook drives both desktop and phone. Header colour variant switches per section via `data-header-variant` with a scroll listener. On phone it changed at y≈900, 6300, 7100, 13200 and 14900 — [M](https://www.zipline.com/); [C](https://www.zipline.com/)
- `@media (hover: none)` shows captions that are hover-revealed elsewhere: `.vQ5p8q_caption {opacity: 1; transform: none}`. `@media (pointer: coarse)` enlarges small video-control tap targets to 40x40 — [C](https://www.zipline.com/)
- "Read article" buttons measured 0x0 on the phone at the moment sampled, so the hover pill is not shown — [M](https://www.zipline.com/)

### Inferences
- [I] The `inactivityMs: 3000` value suggests the header also auto-hides after 3s idle. This was read from code and not timed.
- [I] The asymmetry (hide after 100px, show after 200px) stops the bar flickering on small reverse scrolls.
- [I] During the first ~500px the header stayed up longer than `hideAfterPx` implies. The minified code holds it while the hero is in view and adds a 650ms delay, which fits the measured start of hiding at about y=500.

### Gaps
- The Do Not Sell / cookie flows and the hub pages' lightbox were out of scope. Only the homepage was tested, and carousels might exist on other pages.
- The swipe screenshot-difference check was not meaningful because the page has running video, so the conclusion rests on `scrollX`, the DOM scan and the bundle search.
- The scroller and sticky scans ran at load, not at every scroll position.

## What is the tech? GSAP/ScrollTrigger, Lenis, scroll-snap, position: sticky, svh/dvh, video vs image? Does ScrollTrigger pin on mobile, and with what distance?

### Takeaway
It is Next.js with GSAP 3.15 ScrollTrigger on every device, Lenis 1.3.23 only on hover-capable devices, Three.js with a Draco GLB on both, and portrait-specific Cloudinary video on phones. ScrollTrigger does pin on phones: 2,897px and 4,389px at 844 tall.

### Cited Findings
- GSAP 3.15.0 via `window.gsapVersions`. `window.gsap` and `window.ScrollTrigger` are not global since they are bundled, so detection relies on `.pin-spacer`. Three.js r182 via `__THREE__`. Next.js via `__next_f` and `NEXT_DEPLOYMENT_ID`. Framer Motion via `MotionIsMounted` — [M](https://www.zipline.com/)
- Lenis 1.3.23 on desktop only: `html.lenis`, `window.lenis` true; both absent on phone — [M](https://www.zipline.com/)
- Lenis is skipped in code: `if (matchMedia("(hover: none)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;` Otherwise `new Lenis({duration: 1.2, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 2})` — [C](https://www.zipline.com/)
- Phones therefore scroll natively, with pins driven by native scroll — [M](https://www.zipline.com/)
- Scroll-snap: none computed at either size. `position: sticky`: none computed on the homepage at either size, although 20 declarations exist across site CSS — [M](https://www.zipline.com/); [C](https://www.zipline.com/)
- Viewport units across site CSS: `100svh` 26 times, `100lvh` 19, `100dvh` 4, `50lvh` 1. Homepage pinned scenes and heroes use `lvh` (`.koItKa_hero`, `.KIERrW_drone-journey__pin`, `._0rynyG_how-it-works`, `.IxjmKW_testimonials`, `.Q0v0Oq_benefits`). Unpinned chapter cards use `svh` — [C](https://www.zipline.com/)
- Shared pin helper: `{pin: true, start: "top top", end: "+=N", scrub: true, anticipatePin: 1, invalidateOnRefresh: true}`. Pin end values are computed from `window.innerHeight`. The drone pin does not use `anticipatePin` — [C](https://www.zipline.com/)
- Breakpoints: mainly `(min-width: 992px)` / `(max-width: 991px)`, plus 767px and 1199px, and many `(prefers-reduced-motion)` branches — [C](https://www.zipline.com/)
- Hero video on phone: `homepage_hero_mobile_21042026_bffpou.mp4`, 720x1554, Cloudinary `w_720,q_auto:good,f_auto`, 3.58MB, with a JPEG-source poster. Desktop: `w_1600`, 1600x888, 4.21MB — [M](https://www.zipline.com/)
- All video is `autoplay muted playsinline loop`, `preload="metadata"` — [M](https://www.zipline.com/)
- Video runs only when relevant: hero paused at y=7600 and resumed at y=600; only the active How-to clip played at y=7600 — [M](https://www.zipline.com/)
- How-to clips are portrait mobile-size files (369KB to 789KB per clip); `more_time_delivered_mobile` is 1186x2560, 1.53MB — [M](https://www.zipline.com/)
- The 3D drone is not replaced on phones. WebGL canvas at 414x896 CSS px with a 621x1344 backing store, and the same `ZipLineV5.76draco_w5reaj.glb` at 9.15MB plus `draco_decoder.wasm`. It fades out over scroll via `hideCanvasFrom: .296, hideCanvasAt: .36` and loads via IntersectionObserver with a 200px margin — [M](https://www.zipline.com/); [C](https://www.zipline.com/)
- Mobile keyframes for the 3D scene exist: `"mobile" === u && e.mobileKeyframes || "tablet" === u && e.tabletKeyframes || e.keyframes` — [C](https://www.zipline.com/)
- Phone made 117 requests (35 JS); desktop 148 (47 JS), sampled about 5s after load — [M](https://www.zipline.com/)
- Secondary source: Hello Monday's case study lists 3D modelling, animation and development for Zipline, and says assets were built from scratch, initial models or CAD files. It is undated, names no tech and does not mention mobile — [Hello Monday](https://www.hellomonday.com/work/zipline)
- Orbit Media also has a Zipline web design case study, surfaced in search. I did not read it in full and its snippet does not cover the stack — [Orbit Media](https://www.orbitmedia.com/portfolio/zipline/)

### Inferences
- [I] 621/414 = 1.5, so the renderer appears to cap pixel ratio at 1.5 on a DPR 2 screen. This is a common WebGL performance choice, but I did not read the cap in code.
- [I] A 9MB GLB on phones is a real cost that only a brand with a 3D product can justify. A photo-led site like Roundtrip Albania can reuse the structure without it.
- [I] It cannot be confirmed that Hello Monday built the current site. Their page is undated and I found no credit on zipline.com in this review.

### Gaps
- The Cloudinary format was negotiated for Chrome (`hvc1`, JPEG XL posters). Real iOS Safari may get different files and sizes.
- Exact bytes transferred were not totalled. Sizes above are `content-length`, which for ranged video requests may differ from full file size.

## Any visible jank or address-bar related handling you can detect from code?

### Takeaway
Zipline handles the address bar explicitly in three layers: `ignoreMobileResize`, a cached viewport height, and `lvh` units on pinned scenes. Frame timing through the pins was clean in emulation, but that says little about a real phone. The one visible flaw is a brief empty frame between How-to slides.

### Cited Findings
- Global config: `ScrollTrigger.config({ignoreMobileResize: true})` — [C](https://www.zipline.com/)
- Cached viewport height for pin distance: on `resize`, height is updated only if `!(matchMedia("(hover: none)").matches && innerWidth === previousWidth)`. So on touch devices a height-only change, which is what the address bar causes, is ignored — [C](https://www.zipline.com/)
- Simulated bar collapse, shrinking the viewport 844 → 770 → 844 while mid-pin at y=8500: spacers stayed at 3,741 and 5,233 throughout, while heroes and cards changed because emulation makes `lvh` equal innerHeight — [M](https://www.zipline.com/)
- Frame timing under touch gestures with 4× CPU throttle, on a Mac (no GPU throttle): entering the drone pin p50 16.6ms, p95 17.7ms, max 21ms, none over 34ms. Entering How-to p50 16.6ms, p95 21.2ms, with one 183.9ms frame. Leaving the drone pin max 21.8ms — [M](https://www.zipline.com/)
- Pinned element's top stayed constant across all pinned frames (0.5px and 0.3px), and approach frames ran smoothly (64.5, 40.5, 17.5px), so no pin-entry jump was seen — [M](https://www.zipline.com/)
- Screenshots near y=8400 and y=10000 show the How-to card area empty between slides. The scrub sampling confirms this: outgoing slide at -767px at y=8350, incoming at +542px at y=8500 — [M](https://www.zipline.com/)
- After the drone pin, desktop fades and removes the pin, while phone skips this (`if (p) return`) and the pin scrolls off as a block — [C](https://www.zipline.com/)
- `gsap.ticker.lagSmoothing(0)` is set only after the Lenis early return, so phones keep GSAP's default lag smoothing — [C](https://www.zipline.com/)
- The `html` element carries inline `scroll-behavior: smooth; overflow: initial` on both viewports — [M](https://www.zipline.com/)

### Inferences
- [I] This combination is the portable part for Roundtrip Albania: `ignoreMobileResize`, cached height for pin length, and `lvh` for pinned scenes. `svh` is safe on unpinned cards because their height is not tied to a pin.
- [I] The 183.9ms frame sits around How-to pin entry, where its video starts. A decode or layout cost is plausible but unproven.
- [I] `position: fixed` pins under native scrolling are the classic iOS risk, as the main thread can lag the compositor. `anticipatePin: 1` on How-to suggests Zipline saw or expected it. The drone pin not having it may just be an omission.

### Gaps
- Real iOS Safari behaviour is untested: address-bar transitions, rubber-banding, pin jitter on fast flicks, and low-end Android performance. A physical device test is the only way to settle these.
- Emulated frame timing runs on Mac hardware and does not represent phone GPU cost, especially for WebGL and video.

### Raw evidence files
All in the scratchpad, screenshots included.

Contact sheets:
- /private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/zipline/sheets/shots_mobile_00.png (phone y=0 to 5200)
- /private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/zipline/sheets/shots_mobile_01.png (phone y=5600 to 10800)
- /private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/zipline/sheets/shots_mobile_02.png (phone y=11200 to 16400)
- /private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/zipline/sheets/shots_desktop_00.png (desktop y=0 to 26100)

Single frames:
- /private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/zipline/shots_tests/menu_open.png (phone menu)
- /private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/zipline/shots_tests/hdr_4_up150.png (header revealed on scroll up)
- /private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/zipline/shots_mobile (all phone frames, named by scroll position)
- /private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/zipline/shots_desktop (all desktop frames, named by scroll position)

Data:
- /private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/zipline/tests.json (heights, scrub samples, header, swipe, menu, resize, gating)
- /private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/zipline/trace_mobile.json and /private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/zipline/trace_desktop.json (per-step scroll traces)
- /private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/zipline/scan_mobile.json and /private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/zipline/scan_desktop.json (DOM and computed-style scans)
- /private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/zipline/dl (downloaded JS and CSS bundles, grepped only, never executed)
