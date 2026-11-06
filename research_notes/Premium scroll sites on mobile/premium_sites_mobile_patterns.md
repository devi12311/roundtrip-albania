# Premium scroll-driven marketing sites on phones: pattern catalogue

All live findings were measured on 2026-11-06. "Measured" means read from the DOM or network by script, or seen in a screenshot of that run. Items under Inferences are my interpretation. Screenshots are in `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium`.

## For each site at phone width: are scenes pinned, scrubbed, simplified or dropped, and how much desktop motion survives?

### Takeaway
On each brand's most scene-heavy page, 6 of 8 keep at least 70% of their desktop pinned distance on a phone, and Scout, Apple, Arc'teryx and Spyker keep about 100% or more. Only Lando and Forge fall well below that. Sites do not drop scenes as a rule. They keep the scenes that work as one full-bleed vertical picture, and they restack the side-by-side or horizontal ones. Homepages are the opposite: Rivian's, Arc'teryx's and Spyker's have no pinned scene on a phone.

### Cited Findings

#### Method (measured)
- Playwright with installed Google Chrome, 390x844, deviceScaleFactor 2, isMobile, hasTouch and an iPhone Safari user agent. Desktop baseline was 1440x900. Scrolling used real synthesized touch gestures of 420px (450px on desktop), with screenshots every second step. Harness: `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/measure.mjs`.
- **Pinned distance** is the sum of (parent height minus element height) for `position: sticky` elements at least 45% of viewport height. `.pin-spacer` scenes use steps where a large element held still while the page moved. That second detector gives false positives on sites with a fixed wrapper (Lando, Forge, On, Aman), so those figures are not used.
- **Library detection** searches downloaded JS and CSS for signature strings, because `window.gsap` was false on every site (all bundle it). A string match means the code shipped, not that it runs on that page.
- **No site blocked automation**, so no substitution was needed. One URL changed: `apple.com/iphone-17-pro/` redirected to `/iphone/`, so I used `/iphone-18-pro/`.
- **Cookies:** declined where a reject option existed (Rivian, Scout, White Desert, Spyker, Forge, Tengile, Polestar, Slate, Oura). Apple and Lando showed no banner. Arc'teryx offers only "Continue", so I closed it with the X. I also clicked Spyker's on-page SKIP once to test a scroll lock. Nothing was submitted or signed into.

#### Sites and why each was picked
| Site, pages | Why picked |
|---|---|
| [Rivian](https://rivian.com), [R2](https://rivian.com/r2) | Named in `DESIGN.md`. The homepage and a flagship product page behave differently. |
| [Arc'teryx](https://arcteryx.com/us/en), [ePE](https://arcteryx.com/us/en/shop/epe-fabric), [Walk Gently](https://arcteryx.com/us/en/explore/walk-gently) | Named in `DESIGN.md`. The two sub-pages are its editorial formats. |
| [Apple iPhone 18 Pro](https://www.apple.com/iphone-18-pro/) | Required; current flagship page. |
| [Scout Motors](https://www.scoutmotors.com) | Rugged outdoor automotive brand, Locomotive build. [Awwwards Site of the Day, Jan 16 2025, 7.6](https://www.awwwards.com/sites/scout-motors), plus [E-Commerce of the Year per Locomotive](https://locomotive.ca/fr/projets/scout-motors). Closest in stack (GSAP and Lenis strings present). |
| [White Desert](https://white-desert.com/) | Antarctic luxury operator and the closest business model. [SOTD Sep 11 2026, tagged GSAP and Next.js](https://www.awwwards.com/sites/white-desert). Borderline overlap with the travel researcher; kept for its scene mechanics. |
| [Lando Norris](https://landonorris.com) | [Awwwards Site of the Year 2025](https://www.awwwards.com/websites/sites_of_the_year/), [SOTD Nov 17 2025, 8.18, GSAP and Webflow](https://www.awwwards.com/sites/lando-norris). A personal brand with real sponsors, and the weakest fit to "real business". Huge condensed type like ours. |
| [Spyker](https://www.spykercars.com), [C8 Preliator](https://www.spykercars.com/c8-preliator) | Real carmaker. [SOTD Oct 30 2026, GSAP and WebGL](https://www.awwwards.com/sites/spyker-cars). The extreme case of keeping everything on a phone. |
| [Forge Automotive](https://forgeautomotive.co.uk/) | Small real business, the closest in size to Roundtrip. [SOTD Oct 25 2026, GSAP and Next.js](https://www.awwwards.com/sites/forge-automotive). |

Eight more pages were screened on phone only, for context: Polestar 3, On, Aman, Oura, Lucid, Slate, Opal and Tengile MalaMala ([SOTD Oct 3 2026](https://www.awwwards.com/sites/tengile-malamala-collection)). They get no desktop comparison.

#### Scene survival (measured; survival % is phone screens divided by desktop screens)
| Page | Stack strings found | `.pin-spacer` phone/desktop | Pinned distance, screens, phone/desktop | Survival | What happens on a phone | Judged share of motion kept (inference) |
|---|---|---|---|---|---|---|
| [Rivian home](https://rivian.com) | GSAP, ScrollTrigger, Framer | 0 / 1 | 0 / about 4.5 | **0%** | Pinned horizontal R1S/R2/R1T gallery is dropped and becomes three stacked product blocks | 30-40% |
| [Rivian R2](https://rivian.com/r2) | Framer, Three, Lottie (no GSAP) | 0 / 0 | 3.0 / 4.0 | **75%** | Pinned and scrubbed oval-mask "Haptic Halo" scene is kept in `h-svh`. A second 1-screen sticky is dropped | about 75% |
| [Arc'teryx home](https://arcteryx.com/us/en) | Swiper, Flickity | 0 / 0 | 0 / 0 | n/a | No scenes at either width; hero stack and a carousel | n/a |
| [Arc'teryx ePE](https://arcteryx.com/us/en/shop/epe-fabric) | Swiper, Flickity | 0 / 0 | longest run 9,110px / 9,283px | **about 100%** | Same sticky image backdrops with panels scrolling over them; plain CSS at both widths | about 100% |
| [Apple 18 Pro](https://www.apple.com/iphone-18-pro/) | Own stack, Three | 0 / 0 | 1.2 / 1.2 | **100%** | Sticky camera scene kept. Paused-video scrub seen on 7 of 92 steps (7 of 71 on desktop) | 90-100% |
| [Scout](https://www.scoutmotors.com) | GSAP, ScrollTrigger, Lenis, Swiper | 0 / 0 | 11.8 / 11.8 | **100%** | Both canvas image sequences kept, pinned and scrubbed, with portrait frames | about 100% |
| [White Desert](https://white-desert.com/) | GSAP, ScrollTrigger, Lenis | 2 / 2 | about 9.3 / 13.5 | **about 70%** | Pinned horizontal camps and "CPT WFR" scenes kept with shorter runways | about 70% |
| [Lando Norris](https://landonorris.com) | GSAP, ScrollTrigger, Lenis, Three, Rive | 0 / 0 | 1.6 / 4.5 | **36%** | 2,243px horizontal "On Track" scroll is dropped and becomes a vertical scatter. Big canvases fall from 4 to 2 | 40-50% |
| [Spyker home](https://www.spykercars.com) | GSAP, ScrollTrigger, Lenis | 0 / 0 | 0 / 0 | n/a | No pins at either width; in-view image reveals | n/a |
| [Spyker C8](https://www.spykercars.com/c8-preliator) | GSAP, ScrollTrigger, Lenis, Three | 0 / 0 | 45.3 / 38.2 | **119%** | Everything kept and longer. Landscape film is letterboxed. Desktop's split panel becomes full-screen cards | about 100% |
| [Forge](https://forgeautomotive.co.uk/) | GSAP, ScrollTrigger, Lenis | 0 / 0 | 2.7 / about 9.0 | **about 30%** | 1,800px and 4,500px split-screen sticky scenes become a single-column flow | 30-40% |

Forge's parallel 1,800px stickies are counted once. Scrub activity (at least 2 inline-style changes between steps) stayed high on phones, for example Scout 33/38, Forge 31/34, Spyker C8 63/63. Treat that as a rough proxy, since headers and tickers also write styles.

#### How the strongest scenes were adapted (measured)
- **Scout re-shot its sequences for portrait.** The first frame is 720x1280 on a phone and 1280x720 on desktop. There are 707 numbered WebP frames, averaging 34KB across a sample of 21 frames. It also serves a separate `hp1017_mobile.webm`, and the sticky stage shows a CSS loader stripe (`.c-sequence_sticky:after`). Text sits low over the picture as a single short block. [Live](https://www.scoutmotors.com); `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/scout/phone/sheet_0.png`
- **White Desert keeps horizontal pinning with only three items.** Camp cards are about two-thirds of the viewport wide (judged from the screenshot), so the next card is visible as the first leaves, and the same "Our Camps" title transition is kept. [Live](https://white-desert.com/); `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/whitedesert/phone/sheet_0.png` and `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/whitedesert/fling_1_t0.jpg`, desktop `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/whitedesert/desktop/sheet_0.png`
- **Spyker turns a split pin into a card deck.** On desktop the film holds the left half while a white panel slides in beside it. On a phone the panel takes the whole screen as cards numbered I to V, one image and one heading each. [Live](https://www.spykercars.com/c8-preliator); `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/spykerc8/phone/sheet_0.png`, desktop `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/spykerc8/desktop/sheet_0.png`
- **Rivian restacks its gallery.** Compare `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/rivian/desktop/sheet_0.png` with `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/rivian/phone/sheet_0.png`.
- **Lando keeps the personality.** The helmet tiles stay as a 2-column grid, the type marquee stays, and hover-driven hero behaviour gets a touch prompt ("tap to lock" text in the DOM, plus a hand icon). [Live](https://landonorris.com); `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/lando/phone/sheet_0.png`, desktop `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/lando/desktop/sheet_0.png`
- **Forge** uses `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/forge/phone/sheet_0.png`; **Apple** `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/applepro/phone/sheet_0.png`; **Rivian R2** `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/rivr2/phone/sheet_0.png`; **Arc'teryx ePE** `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/arcpdp/phone/sheet_0.png`.

#### Mechanics (measured)
- **`position: sticky` is the main pin mechanism.** 7 of 8 brands rely on tall sticky runways on their scene pages, and only White Desert uses `.pin-spacer` on a phone. Rivian's one pin-spacer exists on desktop only.
- **Stable-viewport units appear in the sticky elements themselves:** Rivian R2 `sticky top-0 h-svh ... md:h-dvh`, Spyker `sticky top-0 h-svh md:h-lvh`. Scout uses a custom `height: var(--fold-height)`.
- **Touch stays native on some Lenis sites.** During touch gestures Scout and Spyker showed `lenis-scrolling` but never `lenis-smooth`. White Desert and Lando did show `lenis-smooth`. Lenis [defaults `syncTouch` to false](https://github.com/darkroomengineering/lenis).
- **Phone payloads are often cut hard** (MB transferred, phone/desktop): Spyker C8 19.3/65.4, Rivian R2 28.3/55.4, Scout 35.3/47.1, Apple 24.5/29.1. Rivian home 14.5/16.4 and White Desert 8/9 barely change. Forge's desktop figure (0.7MB) is suspect: blurred frames suggest images did not finish in headless.

#### Published statements
- I found no case study covering mobile decisions for any of the 8 sites. [Locomotive's Scout page](https://locomotive.ca/fr/projets/scout-motors) has credits only, and a search for an OFF+BRAND write-up found none.
- General practice, from search excerpts only because Codrops returned HTTP 403 to my fetch: the [Exat microsite article](https://tympanus.net/codrops/2026/04/10/the-exat-microsite-pushing-a-typography-showcase-to-new-creative-extremes/) says "On mobile devices, interactions are simplified rather than replicated". The [Trionn article](https://tympanus.net/codrops/2026/07/15/the-architecture-behind-trionn-coordinating-gsap-three-js-lenis-and-web-audio/) reportedly relies on `gsap.matchMedia()` for separate desktop and mobile animation logic. The [Bodak write-up](https://tympanus.net/codrops/2025/07/29/built-to-move-a-closer-look-at-the-animations-behind-eduard-bodaks-portfolio/) reportedly branches on `hover: none` and `pointer: coarse`. None of these are in my sample.

### Inferences
- The dividing line is the shape of the scene, not how heavy it is. Full-bleed, single-subject, vertically legible scenes survive at about 100%. Side-by-side and horizontal scenes get restacked (Rivian, Lando, Forge) or become full-screen cards (Spyker). White Desert is the one exception, and it has only three items.
- Rivian shows one brand doing both: homepage scenes dropped, flagship scenes kept. The likely logic is that a homepage routes people, while a product page sells a story.
- `position: sticky` is probably favoured because the browser handles it, which sidesteps the pin jump GSAP warns about (see the last section). This is my reasoning; no site states it.
- Scout's lesson is that scene survival is an art-direction cost. Portrait frames had to be produced, not cropped by code.

### Gaps
- The sample is biased towards scroll scenes: five sites were picked from awards for scroll work. The screened pages (Polestar 3, On, Aman, Oura, Lucid, Slate, Opal, Tengile) had 0 or 1 sticky scenes on a phone, but with no desktop run I cannot say whether they dropped anything.
- Chromium emulation is not iOS Safari. The iPhone user agent made sites apply `is-safari` or `is-iphone` classes, but rendering was Blink. Real scrub smoothness and toolbar behaviour are unverified.
- Survival uses pinned distance as a proxy for motion. The "judged share" column is my estimate, not a measurement.

## Which replacements recur?

### Takeaway
Swipe carousels with a peeking card are the one replacement that clearly recurs (5 of 8). Everything else on the list is rare. Stacked sticky cards were not seen, and no site swapped scrub for autoplay at phone width. Autoplay sites simply use autoplay at both widths.

### Cited Findings
Counts are out of the 8 brands, measured unless marked "seen", which means visible in screenshots but not picked up by script.

| Technique | Count | Evidence |
|---|---|---|
| Single-column restack of side-by-side or horizontal scenes | **4/8** | Rivian, Lando, Forge, Spyker |
| Horizontal swipe with peeking next card | **5/8** | [Apple](https://www.apple.com/iphone-18-pro/): 9 native galleries, cards 260px wide (first gallery 321px) on a 390px screen, 20px gap. [Rivian R2](https://rivian.com/r2): 4 of 5 JS carousels peek, cards 315-359px, arrows and dots. [Arc'teryx Walk Gently](https://arcteryx.com/us/en/explore/walk-gently): Flickity, 7 items, 214px. Arc'teryx ePE also peeks (seen). [Scout](https://www.scoutmotors.com): Swiper strip of 14 142px thumbnails. [Spyker home](https://www.spykercars.com): news strip (seen) |
| Full-width carousel with dots, no peek | 2/8 | [Rivian home](https://rivian.com): 3 carousels of 4, 3 and 10 items. [Arc'teryx home](https://arcteryx.com/us/en): 3 dots (seen) |
| CSS scroll snap | **1/8** | Apple only, `x mandatory`. Rivian uses JS transforms and `overflow-x-clip`. Oura also snaps (screened) |
| Vertical scroll snap | **0/8** | None, and none on the 8 screened pages |
| Stacked sticky cards (cards piling up) | **0/8** | Not seen. Nearest are Spyker's numbered full-screen cards and Arc'teryx's panels over sticky backdrops |
| Autoplay video as a phone-only replacement for scrub | **0/8** | Autoplay counts match at both widths: Rivian home 6/6, R2 4/4 with 15/15 looped, Arc'teryx ePE 7/7, Walk 5/5, White Desert 1/1 |
| Scroll-driven frames or video kept | 4/8 | Scout and Spyker use canvas. Apple and Rivian R2 use paused-video scrub (R2: 4 steps on phone, 1 on desktop) |
| Sticky mini-CTA at the top | 2/8 | [Rivian R2](https://rivian.com/r2) "Reserve" and "Design yours". [Apple](https://www.apple.com/iphone-18-pro/) "Explore" and "Buy" |
| Full-width sticky bottom CTA bar | **0/8** | Apple has contextual 56px pills that come and go ("Compare all iPhone models", colour and size controls). [Aman](https://www.aman.com) has an 80px fixed "Reserve" bar on all 23 steps (screened; the only hospitality brand with one) |
| Floating chat or menu button | 2/8 | Rivian chat circle at bottom right. Arc'teryx ePE round list button at bottom centre (seen; appears to be a section menu, not opened) |
| Progress or wayfinding indicator | **2/8** | [Forge](https://forgeautomotive.co.uk/): thin line at the bottom. [Spyker C8](https://www.spykercars.com/c8-preliator): time-of-day dial, "Change time", SKIP and a "Chapter overview" jump screen. Both are long scene sites |
| Tap-to-expand in page content | 1/8 at most | Accordions were mostly footers (Arc'teryx HELP, MY ACCOUNT, SHOP MORE). R2 has one `<details>`. Apple has 31 `aria-expanded` nodes on a phone and 21 on desktop, but those I sampled were mostly navigation |
| Tabs or pills instead of stacking variants | 2/8 | R2 trim selector (Standard, Premium, Performance). Apple "Colors" and "Two sizes" pills |
| Hover replaced by tap prompt | 1/8 | [Lando](https://landonorris.com) "tap to lock" |

Chapter jump screen: `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/spykerc8/fling_1_t0.jpg`. Dial and SKIP: `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/spykerc8/gate_1.jpg`.

White Desert's fixed orange "Enquire" tab at the right edge appears on desktop but was not seen on a phone scroll; the phone's Enquire button shows at load and then in the footer (seen). `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/whitedesert/desktop/sheet_0.png`

### Inferences
- The default phone toolkit is smaller than the question's list suggests: one column, sticky scenes where the picture earns it, and peeking swipes for sets.
- Peek width sits at about two-thirds to nine-tenths of the screen. Apple's 260px on 390px (67%) is the clearest benchmark for a swipe set, and it shows both that more exists and what the next item is.
- Progress indicators are a minority choice even on long pages. They appear only on scene-led sites, and Apple and Rivian R2 run 38-44 screens without one.

### Gaps
- Carousel detection missed some JS sliders (Arc'teryx home and ePE), so these are lower bounds. I did not exercise swipe behaviour or measure conversion, and no site publishes data on it.

## How long are pages on mobile vs desktop, in screens?

### Takeaway
The median page is about 15 screens on a phone against 19 on desktop, and 7 of 12 pages are shorter on a phone in screens. Long pages get longer. Pages with no pinned scene rarely pass 15 screens, and the 38-55 screen pages are flagship product stories.

### Cited Findings
Measured: document height divided by 844 (phone) or 900 (desktop).

| Page | Phone px | Phone screens | Desktop screens |
|---|---|---|---|
| [Arc'teryx home](https://arcteryx.com/us/en) | 6,131 | 7.3 | 5.7 |
| [Spyker home](https://www.spykercars.com) | 8,812 | 10.4 | 10.6 |
| [Lando](https://landonorris.com) | 10,077 | 11.9 | 15.1 |
| [Arc'teryx ePE](https://arcteryx.com/us/en/shop/epe-fabric) | 11,428 | 13.5 | 12.7 |
| [Arc'teryx Walk Gently](https://arcteryx.com/us/en/explore/walk-gently) | 11,795 | 14.0 | 14.9 |
| [Rivian home](https://rivian.com) | 12,694 | 15.0 | 18.8 |
| [Forge](https://forgeautomotive.co.uk/) | 13,269 | 15.7 | 19.4 |
| [Scout](https://www.scoutmotors.com) | 15,226 | 18.0 | 19.9 |
| [White Desert](https://white-desert.com/) | 19,265 | 22.8 | 23.1 |
| [Rivian R2](https://rivian.com/r2) | 32,064 | 38.0 | 36.9 |
| [Apple 18 Pro](https://www.apple.com/iphone-18-pro/) | 36,877 | 43.7 | 35.0 |
| [Spyker C8](https://www.spykercars.com/c8-preliator) | 46,353 | 54.9 | 46.9 |

- Screened pages, phone only: Opal 3.8, On 7.0, Oura 7.7, Lucid 10.2, Aman 10.8, Slate 13.0, Tengile 15.0, Polestar 3 16.5.
- A large share of scene-page length is pinned runway: Scout 11.8 of 18 screens, Spyker C8 45.3 of 54.9.
- Non-pinned length is the useful number. Scout has only about 6 screens of normal scroll, for example.

### Inferences
- A roughly 15-20 screen target is well supported for a marketing page with a few scenes. Much past 20 needs a flagship reason plus wayfinding.
- A phone page being as long as desktop is normal, so length alone is not the problem. Repetition within that length is.

### Gaps
- Heights vary between runs on sites with late-mounted sections. Spyker C8 measured 46,353px in one run and 53,068px in another (about 63 screens), Apple 36,877px and 34,475px. Figures are from the main run.
- Forge and Spyker use nested or lazily built layouts, so the scroll wrapper needed special handling; Forge has no document-level scroll at all.

## How are density and repetition handled?

### Takeaway
Three moves recur: move sets sideways (Apple avoids about 24 screens this way), give each list a different treatment from its neighbour, and edit hard. White Desert, the closest business, uses about 0.8 of a screen per trip as stacked image cards and saves its pinned scene for only three camps.

### Cited Findings
- **[Apple](https://www.apple.com/iphone-18-pro/) (measured):** 53 cards in 9 swipe galleries of 3 to 8 cards. Stacked they would total about 24,300px; as galleries they take about 3,960px. That difference, about 24 screens, is calculated from measured card heights. The page would otherwise be around 68 screens.
- **[Rivian R2](https://rivian.com/r2) (measured):** 24 items in 5 carousels, which avoids about 5,900px or 7 screens on the same calculation.
- **[White Desert](https://white-desert.com/) (measured and seen):** the footer lists 6 itineraries, and the home list runs as full-width stacked image cards from about y=3,477 to y=7,500. Each carries a large italic title, a price line and a short paragraph. Only 3 camps get the pinned horizontal scene. No carousel is used at all. `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/whitedesert/phone/sheet_0.png`
- **[Forge](https://forgeautomotive.co.uk/) (seen):** 6 services (Bodystyling, Interior, Wheels, Lighting, Exhaust, Protection) sit over dark full-bleed imagery at about half a screen each, starting near y=5,781. Titles and text fade in, and overlapping images keep the list from reading as a grid. `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/forge/phone/sheet_0.png`
- **[Lando](https://landonorris.com) (seen):** long tile sets go into a dense 2-column grid rather than a carousel. `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/lando/phone/sheet_0.png`
- **[Scout](https://www.scoutmotors.com) (seen):** two models fit into about one screen as compact stacked cards with a shared CTA style. `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/scout/phone/sheet_1.png`
- **[Arc'teryx home](https://arcteryx.com/us/en) (measured and seen):** 7.3 screens, only 5 H2-level sections plus a carousel. It reads as editing rather than motion. `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/arcteryx/phone/sheet_0.png`
- **[Rivian R2](https://rivian.com/r2) (seen):** a trim tab replaces three stacked trim sections. `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/rivr2/phone/sheet_0.png`

### Inferences
- The closest fit for a tour list is White Desert's: a small number of big, non-identical image cards with the scene budget spent elsewhere. Peeking swipes suit sets of 5 or more peers, such as Apple's feature lists.
- Rhythm comes from changing the format between sections, as Apple and Scout do. A long stack of identical cards reads as repetitive however good each card is.
- Three is a safe size for a pinned horizontal scene: no site pinned a longer horizontal set on a phone. Spyker's vertical deck of five full-screen cards shows that sets can run longer when they stay vertical.

### Gaps
- Whether stacked cards or carousels lead to more itinerary views is unknown. No site publishes this.
- I did not measure how many users swipe beyond the first card. Hidden cards have a real discoverability cost that the 24-screen saving does not show.

## Which things are widely avoided on phones, and what visibly breaks where sites try them?

### Takeaway
Vertical snap, full-width bottom CTA bars on these brands, and long horizontal pins are all avoided, and only one site in eight locks scrolling. The clearest failures all come from Spyker, which keeps everything: a landscape film letterboxed in black, a single film scrub lasting about 10 screens, and a scroll lock released only by SKIP in my test.

### Cited Findings

#### Avoided (measured)
- **Vertical scroll snap:** 0 of 20 pages (12 measured, 8 screened).
- **Long horizontal pins:** of the 5 brands with a horizontal or split scene on desktop, only White Desert kept that form, with 3 items. Rivian, Lando, Forge and Spyker all changed it.
- **Split-screen sticky layouts:** none survive. Forge and Spyker both convert them.
- **Scroll locking:** 1 of 8 (Spyker).
- **GSAP pin-spacer pinning on a phone:** 1 of 8 (White Desert).

#### Seen failing or straining
- **Scroll lock ([Spyker C8](https://www.spykercars.com/c8-preliator)):** at y=24,871 Lenis entered `lenis-stopped` on both phone and desktop. In the phone test, scrolling stayed locked after a 9-second wait and three more gestures. Tapping SKIP released it (y moved to 25,853). The film may finish on a real device, so the length of the lock is unconfirmed. `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/spykerc8/gate_1.jpg`
- **Letterboxing ([Spyker C8](https://www.spykercars.com/c8-preliator)):** the film keeps its landscape shape in a band of roughly 58% of screen height, between black bars. Compare Scout's portrait frames. `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/spykerc8/phone/sheet_0.png`
- **Slow runways ([Spyker C8](https://www.spykercars.com/c8-preliator)):** the car-turning film alone runs from about y=846 to y=9,249, or about 10 screens, before the first content card appears. Two of the three long sticky runs are longer on a phone than on desktop (13,477px against 12,600px, and 16,659px against 13,050px).
- **Gesture conflict ([Spyker C8](https://www.spykercars.com/c8-preliator)):** a fast swipe starting at bottom centre, on the dial, opened "Chapter overview" instead of scrolling. One observation only. `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/spykerc8/fling_1_t0.jpg`
- **Empty media ([Spyker home](https://www.spykercars.com)):** a black rectangle at y=2,534 before media appeared. Possibly a lazy-load timing effect of emulation. `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/spyker/phone/sheet_0.png`
- **Layout shift (CLS, phone):** Rivian R2 0.142, Arc'teryx Walk Gently 0.127, against 0 to 0.06 elsewhere. Desktop has its own outliers: Spyker C8 0.799, Rivian R2 0.327, White Desert 0.225.
- **Payload:** Scout's frames come to about 24MB of its 35.3MB phone transfer, calculated as 707 frames at a sampled 34KB. Sequences load progressively: only 1 frame had loaded after 9 seconds without scrolling.
- **Awwwards Responsive Design scores** loosely agree: Spyker is lowest at [7.00](https://www.awwwards.com/sites/spyker-cars), then [Scout 7.40](https://www.awwwards.com/sites/scout-motors), [Lando 7.40](https://www.awwwards.com/sites/lando-norris), [Forge 7.40](https://www.awwwards.com/sites/forge-automotive) and [White Desert 7.60](https://www.awwwards.com/sites/white-desert). The spread is small and these are jury scores, not tests.

#### Stress tests (measured in emulation, indicative only)
| Page | Frames sampled | Frames over 33ms | Scroll position shift when viewport height changes 844 to 760 | Document height change |
|---|---|---|---|---|
| [Scout](https://www.scoutmotors.com) | 463 | 2.4% | none | 15,226 to 14,191 |
| [White Desert](https://white-desert.com/) | 468 | 2.8% | **651px** | 19,244 to 18,425 |
| [Lando](https://landonorris.com) | 486 | 2.3% | **302px** | 10,077 to 9,775 |
| [Spyker C8](https://www.spykercars.com/c8-preliator) | 465 | 1.1% | none | 53,068 to 49,328 |
| [Arc'teryx home](https://arcteryx.com/us/en) | 234 | 2.6% | none | unchanged |
| [Apple 18 Pro](https://www.apple.com/iphone-18-pro/) | 289 | 14.2% | none | 34,475 to 34,283 |
| [Rivian R2](https://rivian.com/r2) | 51 | 27.5% | none | 31,596 to 31,092 |

Frame figures used 4x CPU throttling with software rendering on a Mac, so read them only as a relative ordering. A fast fling left no blank frames on Scout, White Desert, Lando, Apple, Rivian R2 or Arc'teryx, but the capture came just after the gesture ended, so it does not rule out blanks mid-fling. Forge was not stress-tested. Montage: `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/premium/fling_sheet.png`

#### Documented platform causes
- [GSAP's `normalizeScroll` docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.normalizeScroll()) name "Address bar showing/hiding on mobile browsers, resizing the viewport" as a problem. They warn "you may see a pinned ScrollTrigger appear to jump when it initially pins/unpins" because "modern browsers handle scrolling on a different thread", and that "iOS Safari provides the wrong value quite frequently". They also call `normalizeScroll` "an experimental feature".
- [Lenis's README](https://github.com/darkroomengineering/lenis) says `syncTouch` "can be unstable on iOS<16" and that Lenis is capped at 60fps on Safari and 30fps in low power mode.

### Inferences
- The two scroll-position shifts occur on the sites where `lenis-smooth` appeared during touch and, for White Desert, where `.pin-spacer` is used. That is suggestive, but two sites cannot show a cause.
- For Roundtrip's stack, the lower-risk route on a phone looks like CSS sticky stages at `svh` height, native touch (Lenis `syncTouch` off) and `gsap.matchMedia()` for phone-specific scenes, rather than ScrollTrigger pins on touch. Scout is the working model for this combination, though I could not confirm how it wires GSAP.
- Failures cluster around keeping desktop content unchanged, not around motion on a phone as such. Scout keeps as much motion as Spyker and shows none of its problems because its assets were remade for portrait.
- Applied to Roundtrip's cream, black and violet design with huge condensed type: 2 to 3 sticky portrait scenes, runways of about 2 to 5 screens each, tour sets as non-identical stacked cards or a peeking swipe, and short type blocks low on the image. These numbers are judgement, drawn from Scout's two scenes at about 5.4 screens each and Rivian's at 3.

### Gaps
- There was no real-device test. iOS toolbar behaviour, Safari scrub smoothness, thermal throttling and low-power mode are all unmeasured, and `setViewportSize` only approximates a toolbar change.
- There is no first-party data on phone drop-off for pinned scenes from any of these sites, and no reliable study turned up in my searches.
- I could not read the full Codrops articles (HTTP 403), so those citations rest on search excerpts.
- I did not test `prefers-reduced-motion` behaviour. Stylesheets mention it on Scout (16), Forge (6) and Spyker (4), with none found in White Desert's or Lando's CSS, though JS handling was not checked.
