# Shorten the road to WhatsApp on phones

Premium scroll sites do not strip motion from phones. They keep the scenes that read as one vertical picture or a sequence the reader must follow, restack anything side by side, and compress long sets; Zipline keeps 2 of its 5 pins, and about 42% of its phone page is still held scroll. Roundtrip's phone page is the same length as Zipline's (about 20.6 screens at 844px against 20.7) but holds nothing, shows 18 near-identical photo cards, and leaves 9,531px and then 6,533px between booking buttons. So the redesign has three parts. Build two `position: sticky` scenes (Journey reveal with van, Offer with mountain) and use no `pin: true`. Replace the 8 stacked destinations with a 2-column tile grid where each tile leads to a destination-specific WhatsApp message. Add a slim inset WhatsApp pill that runs from the end of the hero to the footer. Those changes, plus deleting content that repeats, take the page from 17,250px to roughly 12,000px, or about 15 screens. That target is a budget drawn from benchmarks, not a proven optimum. None of this has been tested on a real iPhone, the evidence for sticky bars is vendor-only, and no controlled test of a WhatsApp button exists, so the plan ends with device checks and a simple way for Eugen to count results.

Throughout, **measured** means read from a live page or this repo on 2026-11-06 in Chrome emulating a phone. **Estimate** and **judgement** mean my own reasoning. Measurements of Roundtrip itself were added for this report, because the notes gave only the page total: Chrome at 390x790 and 390x844, iPhone user agent, one run after a full scroll pass.

## Premium sites keep sequences, restack the rest and avoid a few things

The dividing line on phones is the shape of a scene, not how heavy it is. On each brand's most scene-heavy page, 6 of 8 keep at least 70% of their desktop pinned distance, while the two that fall well below it, [Forge](https://forgeautomotive.co.uk/) and [Lando](https://landonorris.com), had split-screen or horizontal scenes. [Scout](https://www.scoutmotors.com) keeps all of its pinned distance. Home pages behave differently from product stories: [Rivian's home](https://rivian.com) drops its pinned gallery entirely, while [Rivian R2](https://rivian.com/r2) keeps 75%. That matters here because Roundtrip's one page has to do both jobs.

| Treatment | What it applies to | Measured evidence |
|---|---|---|
| **Kept** | Full-bleed, single-subject scenes and step sequences | Scout 11.8 of 11.8 screens, with frames remade for portrait (720x1280). [Apple](https://www.apple.com/iphone-18-pro/) 1.2 of 1.2. [Zipline](https://www.zipline.com/) How-to stays at 6.2 screens on both, its only long section that loses no scroll time |
| **Changed** | Side-by-side and horizontal scenes | Single-column restack on 4 of 8 brands. [Spyker](https://www.spykercars.com/c8-preliator) turns a split pin into numbered full-screen cards. Zipline turns its pinned "Why" into three stacked masked images, and its unpinned sections keep scrubbed reveals or parallax, so nothing goes static |
| **Dropped** | Hover states, split-screen sticky layouts, inset-to-full-bleed growth, dash progress | No split layout survives on the sites that had one. Zipline's testimonial and secondary hero start full-bleed on phones |
| **Avoided** | Vertical scroll snap, long horizontal pins, scroll locks | Vertical snap on 0 of 20 pages. Only [White Desert](https://white-desert.com/) keeps a horizontal pin, with 3 items. Only Spyker locks scrolling, and it was released only by tapping SKIP in testing |

Techniques cluster tightly. Seven of 8 brands hold scenes with tall `position: sticky` runways, while `.pin-spacer` pinning on phones appears only at White Desert and Zipline. No site swaps scrub for autoplay at phone width. Peeking swipes are the one recurring replacement (5 of 8), led by Apple's 260px cards on a 390px screen, while CSS snap itself appears on only 1 of 8. Media is remade rather than cropped: Zipline serves a 720x1554 portrait hero video and Scout re-shot its image sequences. Zipline also handles the address bar in three layers (`ignoreMobileResize`, a cached viewport height, `lvh` on pinned scenes) and runs Lenis only on hover-capable devices.

Travel sites add what premium sites leave out, which is the path to booking. Operators list trips as vertical compact cards on hub pages ([Intrepid](https://www.intrepidtravel.com/en/albania), [Exodus](https://www.exodus.co.uk/destinations/europe-holidays/albania-holidays)) and use horizontal rows as home-page samplers ([Much Better Adventures](https://www.muchbetteradventures.com/)). Every premium trip page inspected keeps a booking action in view, worded as a low-commitment next step such as "Dates and prices" ([Intrepid trip](https://www.intrepidtravel.com/en/albania/albania-adventure-174335)). None of the sites inspected uses a per-destination WhatsApp message, so Roundtrip would be ahead of the field but has no strong precedent to copy.

Zipline's rule, as I read it (it is not a stated policy), is to keep pins that carry a sequence and unpin scenes that only add atmosphere or repeat a swap.

## Roundtrip has Zipline's length but none of its held scenes

Length alone does not explain why the page feels flat. At 844px tall Roundtrip measures 17,423px, or 20.6 screens, against Zipline's 17,446 to 17,780px. The 22 screens figure comes from dividing by a 790px viewport, while every benchmark in the notes uses 844, so pixels are the safer comparison. The real difference is that Zipline spends 7,286px on pinned scroll and has about 10,200px of plain scroll ([measured](https://www.zipline.com/)). Roundtrip has zero pins, so all of its height is plain scroll, about 70% more than Zipline's.

Four things in the code explain the "boring" feeling (all measured or read from this repo). Destinations alone is 5,447px, 32% of the page, at about 640px per item. The same photo-over-text card repeats 18 times in chapters, destinations, Winter and stats, while Apple and Scout keep rhythm by changing format between neighbouring sections. Content repeats too: Offer's 5 items match the Included list in Good to know one for one, and tolls and fees appear four times. Finally, `initJourney`, `initDestinations` and `initOffer` run only at 900px and up, so the phone gets a static headline and van and a 205px mountain image.

Booking access has its own problems, and they go beyond the gap already known.

| Position at 390x790 (measured) | Booking action |
|---|---|
| y=649 | Hero button, labelled "Book your trip", with no sign it opens WhatsApp |
| 9,531px gap | No booking action. The 8 `.dest-item` entries contain no links |
| y=10,180 | "Ask about winter dates" |
| 6,533px gap | No booking action. Step 1 of How to book says "Send a WhatsApp message" but is not a link |
| y=16,713 to 16,957 | Footer button, number, and the page's only `tel:` link |

The second gap was not in the notes. The header is also weaker than Zipline's: `sections.css` lines 147-148 hide its WhatsApp button under 700px, so scrolling up reveals only the logo and burger, where Zipline shows a CTA ([measured](https://www.zipline.com/)). The testimonial is a placeholder quote from Eugen himself, flagged with a TODO in `index.html`, and real reviews are the main trust signal on phones ([Exodus](https://www.exodus.co.uk/destinations/europe-holidays/albania-holidays), [Zbulo](https://zbulo.org/)). That matters because Booking Holdings' app room nights are in the mid-fifties percent ([10-K](https://www.sec.gov/Archives/edgar/data/1075531/000107553126000009/bkng-20251231.htm)), though hotels are its main business, and the latest tour figure is two in five online bookings on mobile, from 2022 ([Arival](https://arival.travel/tag/tour-sales/)). Tour buyers also book late: 70% of Americans and 61% of Europeans booked tours under seven days ahead ([Arival via TravelPress](https://www.travelpress.com/?p=199797)).

## Four decisions where the notes pull apart

### Pinning: keep the held moment, drop `pin: true`

**Use no `pin: true` and no `normalizeScroll()` on phones. Build two sticky runways, with ScrollTrigger only scrubbing inside them.** Each input was partly right. Disabling all pins correctly avoided the mechanism but wrongly removed the effect with it, which is the main cause of the flatness. "Avoid pins" is right about `pin` and wrong if read as "avoid holding anything". Zipline proves `pin` can work, with clean frame timing in emulation, but it leans on three layers of address-bar handling, and emulation says little about a real phone. It also logged one 183.9ms frame entering How-to.

Sticky wins on mechanism and prevalence. GSAP's source says pin glitches exist because browsers scroll on a separate thread, and its docs warn that a pin may "appear to jump" and call `normalizeScroll` experimental ([GSAP](https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.normalizeScroll()/)). A sticky element is held by the browser during its own scrolling, so there is no late switch to `fixed`. Seven of 8 premium brands use it. In the viewport-resize test, the scroll position of White Desert, the one brand there using `.pin-spacer`, shifted by 651px, but Lando shifted 302px without one, so two sites cannot show a cause. The honest limit is that I found no GSAP statement comparing the two on phones, and scrubbed content inside a sticky stage still runs on the main thread. Sticky is the lower-risk choice, not a proven one.

Zipline's rule picks most of the scenes. Journey gets a runway because Zipline keeps the same reveal pinned, and it is a sequence. Testimonial and Winter hero stay normal-flow with a scrub, as Zipline's equivalents do. I diverge from Zipline twice, both times for length. Its "Why" section, the equivalent of Offer, is unpinned on phones as stacked masked images, but at its 542px per item, five would take about 2,700px, so a single sticky mask above the list is shorter and keeps the mountain as the page's signature image. If that scene disappoints, Zipline's stack is the fallback. Zipline also pins its How-to, but four short text steps do not justify a long hold, and a visitor there should be one tap from WhatsApp.

Implementation (from the technique notes): `.stage { position: sticky; top: 0; height: 100svh; overflow: clip }` inside a taller `.track`, with the trigger always on the track. Use `scrub: 0.5`, put track heights inside the motion media query, and use `overflow: clip` wherever an ancestor would otherwise capture sticky. Use `svh` for stages holding text, `lvh` on full-bleed image layers, and avoid `dvh` on anything visible during scroll ([web.dev](https://web.dev/blog/viewport-units)). Keep Lenis on phones with `syncTouch` off; touch stays native ([Lenis](https://github.com/darkroomengineering/lenis)), and it still provides anchor scrolling and the menu lock, which is a mild difference from Zipline. Adding a third runway is safe only if the first two pass on a real iPhone.

### Destinations: a 2-column grid, not a carousel

**Use a tile grid: one wide lead tile, six tiles in 2 columns, and one wide closing tile, at about 1,400px against today's 5,447px** (estimate, not built). A plain 4-row grid would be about 1,200px, but eight identical tiles would repeat the problem at a smaller size, so the two wide tiles buy variety for one extra row.

The carousel's 5 of 8 is real but mostly describes feature galleries, not the only path to a purchase. The closest business, White Desert, uses no carousel for trips. Hub pages, which is what this section is, use vertical lists. NN/g advises about five frames, the last item reachable in 3 to 4 swipes, and another path for critical content ([frames](https://www.nngroup.com/articles/designing-effective-carousels/), [swipes](https://www.nngroup.com/articles/mobile-carousels/)). Eight one-per-view cards need 7 swipes. Baymard also favours static sections reached by normal scrolling on mobile ([Baymard](https://baymard.com/blog/homepage-carousel)). The deciding argument is structural: MBA can sample with carousels because a full list exists elsewhere, while Roundtrip's section is the full list. No study compares a grid and a carousel on a travel site, so this rests on adjacent evidence and observed practice.

Tiles need three additions to work (all judgement). First, add short names (`dest.d5.short`: "Theth"), because "Parco Nazionale di Theth e Occhio Blu" will not fit a tile about 170px wide. Second, have each tile open a single shared `<dialog>` bottom sheet with the photo, full name, the existing one-sentence blurb and an "Ask Eugen about Theth" button. On hub sites a tile leads to a trip page, and this sheet stands in for that page. It keeps the 8 blurbs and avoids a photo tap throwing someone into another app. The pill still gives anyone already decided a one-tap route. Third, give each tile a scrubbed transform on its image, so the grid moves as Zipline's unpinned sections do.

**What would change this choice:** cutting to 5 or fewer destinations removes the NN/g objection; adding a page for each destination makes a home-page sampler carousel legitimate, as at MBA; Eugen's tally showing that chats for destinations in lower rows are rare would argue for reordering, and only a real test against a carousel would argue for switching; a published test showing later carousel items are seen about as often as grid items would undercut the main argument. If real photos do not read at tile size, the fallback is larger stacked cards, at a cost in length.

### Booking bar: yes, as an inset pill

**Ship a pill. Treat its uplift as unproven, and keep it because of the page's structure, not the numbers.** Zipline and the 8 brands can route visitors on to deeper pages, and home pages and hubs at Intrepid, Exodus and MBA carry only a chat bubble, because the bar appears once a visitor reaches a product. Roundtrip has no deeper page: it is the hub and the product page at once, and the product-page convention applies. Every premium trip page inspected has a sticky action, and [Aman](https://www.aman.com), the only hospitality brand found with one among the premium pages, keeps a fixed 80px "Reserve" bar. The closest structural match is Conversion Rate Experts' test, where the control also had no CTA once scrolled ([CRE](https://conversion-rate-experts.com/sticky-cta-win-report/)).

The uplift evidence is weak and should not be quoted as a forecast. CRE (+25% sales, no sample size) and [Zipify](https://zipify.com/mobile-sticky-button-split-test-results/) (+9% orders, selling this feature) are vendors and e-commerce. [Blend Commerce](https://blendcommerce.com/blogs/ab-tests-shopify/better-placed-sticky-add-to-cart-product-page-conversion) saw mobile conversion +8% but revenue per visitor -18%, not significant at device level. No travel test exists. The steelman for no bar is that the new layout adds inline actions, and [Black Tomato](https://www.blacktomato.com/) manages without one at about 1,100px between prompts. I still recommend it, because inline actions only exist where a section has one, and a tile sheet is two taps away.

The notes also disagree on form. The technique notes propose a solid bar flush to the edge, while the travel notes follow Baymard's advice that sticky buttons get white space and do not span the screen ([Baymard](https://baymard.com/blog/ecommerce-ux-best-practices)). An inset pill satisfies Baymard and matches [Intrepid](https://www.intrepidtravel.com/en/albania/albania-adventure-174335) and Apple's contextual pills, and it should also sidestep the bottom-gap reports on iOS 26 and Chrome 135+, because nothing has to meet the screen edge (inference; verify on a device).

| Property | Specification |
|---|---|
| Shape | About 56px tall, 16px gutters, `bottom: calc(12px + env(safe-area-inset-bottom, 0px))`, direct child of `<body>` |
| Contents | Main button "Ask Eugen on WhatsApp", plus a small round `tel:` button. Only 32% of US adults use WhatsApp ([Pew](https://www.pewresearch.org/internet/2025/11/20/americans-social-media-use-2025/)) against 89.8% of Italian internet users ([Statista, search summary](https://statista.com/statistics/1005178/share-population-using-whatsapp-europe)) |
| Timing | `IntersectionObserver`: appears when the hero button leaves view, hides when footer contact enters it, and hides while the menu or sheet is open. Slide with `transform`; no slide under reduced motion |
| Message | `general` by default, switching to the `winter` key while Winter is in view |
| Page setup | Add `viewport-fit=cover`. Keep scene text about 90px clear of the bottom |
| Keep it alone | No pop-ups, app promos or chat bubbles, the main anti-pattern on [Exodus's trip page](https://www.exodus.co.uk/trips/albania-holidays/culture/discover-north-albania-kosovo/ati) and others |

Italian and Albanian labels ("Scrivi a Eugen su WhatsApp", "Na shkruani në WhatsApp") need Eugen's review. If he reports more chats but no more bookings, and reply speed suffers, fall back to the header CTA alone, since clicks and outcomes diverged in both CRE's and Blend's tests.

### Page length: aim for about 12,000px, loosely

**A target is justified as a budget, but it is soft. Use about 12,000 to 13,000px, or roughly 15 screens.** Two benchmarks conflict. The travel notes suggest 10 to 12 screens (8,500 to 10,000px) from home pages, whose median is about 9,660px, while the premium notes suggest 15 to 20, with a median of about 15 across 12 pages running from [Arc'teryx's home](https://arcteryx.com/us/en) at 7.3 screens to [Spyker C8](https://www.spykercars.com/c8-preliator) at 54.9. I side with the longer figure because those short home pages route visitors to other pages and Roundtrip cannot, and because scenes add length on purpose. The two reconcile neatly: the plan below totals about 12,100px with about 9,700px of it plain scroll, matching both Zipline's plain scroll and the travel median (estimate).

Firmness differs by claim. NN/g's attention data (57% of viewing time above the fold, 81% in the first three screens) is desktop eyetracking and names no ideal length ([NN/g](https://www.nngroup.com/articles/scrolling-and-attention/)). No phone page-length study turned up. MBA's 25-screen trip page shows length is tolerable when a route to dates stays in view ([MBA](https://www.muchbetteradventures.com/products/10730-adventures-hike-albania-coastal-trail/)). So the firm rules are about structure: past the hero, a booking action is always on screen, plain scroll falls by about 7,500px, and repeated content goes. If the build lands at 14,000px with those rules met, do not cut good scenes to hit a number.

## The redesign, section by section, ranked

Heights below are measured at 390x790 and targets are my estimates, not built layouts.

| Section | Now | What changes on phones | Target | Booking action |
|---|---|---|---|---|
| Hero | 790 | Keep full-bleed. Portrait `<picture>` crop. Drop the scrubbed clip-path, keep translate and fade. Fill the button and label it "Plan on WhatsApp" | 790 | Hero button |
| Journey | 2,548 | **Sticky scene 1:** 220svh track, words fill by scrub, van drives on `x` with wheel rotation. Then 3 service cards in a CSS sticky stack; the fees chapter goes to Offer | 3,200 | One link per service: `private`, `transfer`, `group` |
| Testimonial | 790 | Full-bleed from the start. Replace clip-path with `scale` on a wrapper. Keep the mark and quote fade. Use a real guest quote with name and country | 790 | Pill |
| Destinations | 5,447 | Tile grid, short names, shared bottom sheet, image parallax on `transform`. Group north to south if the order allows | 1,400 | Sheet button with per-destination message |
| Winter hero and 3 cards | 2,123 | Hero uses a scrubbed scale from 1.2, as Zipline does. Cards become a native-snap peeking swipe with a `1 / 3` counter | 1,250 | Existing button; pill switches message |
| Offer | 1,465 | **Sticky scene 2:** mountain mask stuck above the 5 items, image crossfades on a timed toggle per item. Images capped at `w=828` | 2,000 | Inline button at the end |
| Good to know | 747 | Remove the duplicate Included card on phones. Keep "Not covered" as a compact list straight after Offer | 300 | Pill |
| About, stats, How to book | 2,425 | Keep the statement, add Eugen's real photo, name and languages. Stats become a one-row strip with the count-up. Steps become 4 compact rows along a scroll-drawn line, ending with the van at a WhatsApp button | 1,450 | Step 1 link and final button |
| Footer | 913 | Keep. Add a true line on languages and typical reply time. Pill hides here | 913 | Book, phone, call |
| **Total** | **17,249** | | **about 12,100** | |

Two choices in that table resolve smaller conflicts. For services, the notes offer a sticky stack (zero JS), an accordion, and Zipline's full-screen cards, and premium sites show no stacked cards at all (0 of 8). I chose the stack because it is the cheapest way to add a held feel, and because accordions hide the photos that sell the service. It has no precedent in this sample, so if it reads badly on a phone, plain cards at the same height are the fallback, not the accordion. For Winter, a peeking swipe is justified by its size: 3 cards sit inside NN/g's limit, the section's main action sits above it, and although Baymard is cautious about inline scroll areas, a short low-stakes swatch row performed well in its testing ([Baymard](https://baymard.com/blog/mobile-interactive-color-swatches)). So the carousel survives where the evidence allows it. Native `scroll-snap` needs no library, and on iOS it moves one card per swipe ([WebKit bug](https://bugs.webkit.org/show_bug.cgi?id=243582)), which suits 3 cards.

Ranking uses my judgement of impact on booking and on the boring feeling. Effort is S for hours, M for about a day, and L for several days.

| Rank | Change | Impact | Effort | Why here |
|---|---|---|---|---|
| 1 | Show the header WhatsApp button under 700px, link Step 1, relabel the hero button | High | S | Fixes real dead ends with almost no code |
| 2 | WhatsApp pill with `tel:` button and `viewport-fit=cover` | High | S-M | Closes both gaps at once |
| 3 | Destination grid with short names and per-destination messages | High | M | Removes 4,000px and adds 8 booking paths. Add keys to `EN` in `whatsapp.js`, because unknown keys silently fall back to `general`. IT and SQ strings need writing and review |
| 4 | Remove duplicates: fees chapter, Included card, stats cards | Medium-high | S | About 1,600px gone with no new motion needed |
| 5 | Portrait `<picture>` crops and capped widths | High for speed | S | Hero 379KB to 214KB, and about 69% of today's hero pixels are cropped away. Page images fall from 6.87MB to 3.51MB with widths capped, before portrait crops ([LCP guidance](https://web.dev/articles/optimize-lcp)) |
| 6 | Replace scrubbed clip-path in `hero.js`, `testimonial.js`, `winter.js` with transforms | Medium | S | Most likely existing cause of jank; profile on a real Android first |
| 7 | Real review, Eugen's photo, WhatsApp Business greeting and away replies | High | Owner time | No code, but the Tan et al. live-chat study suggests lesser-known sellers gain most from contact ([summary](https://phys.org/news/2020-01-chats-sales.amp)). It covers tablets on Alibaba, so treat this as suggestive. Do not invent ratings or licences |
| 8 | Sticky scene 1: Journey | High | M | The biggest change to how the page feels. Test copy in 3 languages at 360x640 |
| 9 | Destination bottom sheet and tile motion | Medium | M | Until it ships, tiles can link straight to WhatsApp |
| 10 | Sticky scene 2: Offer | Medium-high | M-L | Loads 4 more images, so do rank 5 first |
| 11 | Service sticky stack and Winter swipe | Medium | S-M | Format variety, low risk |
| 12 | How to book line with van | Medium | M | A good payoff, but later in the page |
| 13 | Housekeeping: add `(hover: hover) and (pointer: fine)` to the desktop query in both CSS and JS, upgrade to gsap 3.15.1, replace `elementsFromPoint` in `header.js` | Low-medium | S | Touch tablets 900px wide currently get the long desktop pins. Regression-test desktop after the upgrade |

Ranks 1 to 6 fix booking, length and speed before any new scene exists, and the code can ship in a few days, while rank 7 runs in parallel on Eugen's time. They also make the page feel less repetitive by themselves. Ranks 8 onward are where the motion returns.

## What is measured, what is inferred, and what is still unknown

| Status | Claims | Limit |
|---|---|---|
| **Measured** | Roundtrip heights, button positions, and all pin, sticky, page-height and payload figures for other sites | Chromium with an iPhone user agent, not iOS Safari. No real collapsing address bar. Mostly one run per page. A WebKit run of Roundtrip failed on a browser version mismatch, so its heights are Chrome only |
| **Read from code** | Zipline's config, GSAP and Lenis internals, Roundtrip's files | Zipline's bundles are minified, and GSAP 3.15.1 has no release notes |
| **Independent, adjacent** | NN/g and Baymard on carousels, accordions and attention | Not travel-specific, some is older, and the attention study is desktop. None tests grid against carousel |
| **Vendor or platform** | Every sticky-bar uplift figure, WhatsApp usage shares, travel mobile shares | Vendors have a commercial interest, and samples are usually undisclosed. Treat [Convertica's](https://convertica.org/ecommerce-case-study-sticky-cta/) +252.9% as implausible. Mobile share for small tour operators is unknown |
| **Snippet only** | iOS 26 community reports, the Statista WhatsApp figure, Chrome's guidance on animating `clip-path` | Read as search summaries, so check before relying on them |
| **Judgement** | Target heights, impact and effort ranks, the bottom sheet, the service stack, inset-pill behaviour on iOS | Nothing here has been built. The sheet and stack have no direct precedent in the sample |
| **Unknown** | Whether pre-filled text raises send rates, whether a WhatsApp button lifts enquiries at all, how `wa.me` links behave across devices (none were opened), whether the number is on WhatsApp Business, iOS 26/27 toolbar behaviour (no Apple documentation found) | No controlled test found in any sector |

Before calling any of this done, run `vite --host` on a real iPhone and a mid-range Android and check four things: sticky stages with the toolbar both expanded and collapsed, the pill's clearance from the bottom edge, the last Winter card reaching its snap position on iOS, and that `prefers-reduced-motion` shows every end state with no empty tall tracks. The site has no analytics (none found in `index.html`), and that is workable. Each pre-filled message names its source, so Eugen can tally new chats by destination and bookings weekly for 4 weeks before and after. Numbers will be small and seasonal, so read the result as a direction, not a test. Reply speed is part of the funnel too, since late bookers want a quick answer and Eugen is the channel.

## Conclusion

The useful shift is from asking how much motion a phone can take to asking what each section's job is. Premium sites spend motion on sequences, and travel sites keep the next step in reach. The sites in these notes mostly do one or the other, and a one-page booking site has to do both. That is why the answer here borrows Zipline's editing rather than its pins, and a trip page's bar rather than a brand's restraint.

The most useful finding may be the cheapest. The largest single improvements are deleting repeated content and un-hiding a button that already exists, and neither needs animation. If the site later gains a page per destination, the two biggest decisions here reverse in part: carousels become reasonable samplers on the home page, and the bar can move to where the product lives.
