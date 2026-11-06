# Mobile scroll and swipe techniques for a Vite + GSAP ScrollTrigger + Lenis site

Researched 2026-11-06. Installed versions from package-lock.json: gsap 3.15.0, lenis 1.3.27, vite ^6.4.5. Latest on npm today: gsap 3.15.1 (published 2026-11-04), lenis 1.3.27 (2026-10-15).

Evidence labels used in these notes:
- **[>2y]** means the source is older than two years (before 2024-11-06). It is relied on only where nothing newer exists.
- **[source read]** means I read the installed package code directly.
- **[measured]** means I measured it from this machine on 2026-11-06 with `curl` and `gzip`. These are not device tests.
- Nothing here was tested on a real phone. No LCP was measured.

## Which technique should each candidate feature use on phones?

### Takeaway
Do not use `pin: true` on phones. Use native CSS for the structure (`position: sticky`, CSS scroll snap, `position: fixed`), and keep ScrollTrigger only to scrub transforms and toggle state inside that structure. No new runtime dependency is needed. The only optional add-on is GSAP MotionPathPlugin, and only if the route line is curved.

### Cited Findings
- The current phone build pins nothing: Journey, Destinations and Offer run only under `(min-width: 900px) and (prefers-reduced-motion: no-preference)` — [src/main.js](src/main.js). Testimonial also pins only on desktop — [src/sections/testimonial.js](src/sections/testimonial.js).
- ScrollTrigger 18.0 KB gzip and gsap core 28.4 KB gzip are already in the bundle. Adding MotionPathPlugin costs 9.7 KB gzip, InertiaPlugin 3.3 KB, Draggable 13.5 KB, Observer 4.3 KB — [measured, default gzip of each `dist/*.min.js` in node_modules].

### Inferences
Recommended technique per feature (reasoning is in the sections below):

| Feature | Technique on phones | JS added | Main failure mode | How to avoid it |
|---|---|---|---|---|
| Destinations carousel | Native `overflow-x: auto` + `scroll-snap-type: x mandatory` + `scroll-snap-stop: always`; `IntersectionObserver` drives `01 / 08` | About 20 lines, no library | iOS has no free momentum across slides (WebKit bug 243582, unfixed) | Treat one-slide-per-swipe as the intended design. Add real prev/next buttons |
| Journey word-fill + van | Sticky `100svh` stage inside a tall parent, one scrubbed ScrollTrigger; words tween `color`, van tweens `x` and wheels `rotation` | None | Italian/Albanian copy overflowing the stage | Test all three languages at about 360×640. Use a fluid type size |
| Service cards stack | Pure CSS `position: sticky` on sibling cards inside one parent. Scale-down of covered cards is an optional extra | None | An `overflow: hidden` ancestor silently disables sticky | Use `overflow: clip` where clipping is needed. Cap card height below the viewport height |
| Offer mountain swap | Sticky masked visual above the list, swap triggered per item by `toggleClass` or `onToggle` with a timed opacity crossfade, static mask or short timed morph. Not scrubbed | None | Scrubbing `d` repaints every frame; all 5 images must now load | Use timed tweens. Cap images at about `w=828` |
| Fixed WhatsApp bar | `position: fixed` as a direct child of `<body>`, solid background, `viewport-fit=cover`, safe-area padding, plus page bottom padding | Small | Bottom gaps on iOS 26 and Chrome 135+ | See the address-bar section. Test in both toolbar states |
| Route line + van | Viewport-sized inline SVG, `pathLength="1"` plus scrubbed `strokeDashoffset`. Van is a `<g>` inside the SVG, moved by MotionPathPlugin if curved or plain `x` if straight | 0–9.7 KB gzip | A page-tall SVG repaints a large area. Alignment is not responsive | Keep the SVG about one viewport tall. Put the van inside the SVG so `viewBox` handles scaling |

Sticky stage pattern (`.track` and `.stage` are illustrative names):

```css
.track { height: 260svh; }                         /* length sets the scrub distance */
.stage { position: sticky; top: 0; height: 100svh; overflow: clip; }
```
```js
ScrollTrigger.create({ trigger: '.track', start: 'top top', end: 'bottom bottom', scrub: 0.5, animation: tl });
```

Always trigger on the tall parent, never on the sticky element. ScrollTrigger measures trigger positions, and a sticky element's on-screen position depends on the current scroll. A forum thread reports this exact breakage after resize — see the sticky section.

Three project issues found while reading the code:
1. `min-width: 900px` is not the same as "desktop". Any touch device 900+ CSS px wide, including tablets and possibly the largest phones in landscape, gets pinned 650%-long sections. Consider adding `and (hover: hover) and (pointer: fine)` to `MOTION_DESKTOP` and to the matching queries in sections.css. Those queries must change together, as the comment in main.js says.
2. Hero, Testimonial and Winter already scrub `clip-path` on full-bleed photos on phones, because `initHero`, `initTestimonial` and `initWinter` are not gated to desktop. This is the most likely existing cause of phone jank. See the performance section.
3. Upgrade to gsap 3.15.1. Its ScrollTrigger diff touches `matchMedia` revert/recreate, which this project uses and which rotation can trigger. See the first Gaps entry below.

### Gaps
- GSAP publishes no 3.15.1 release notes. The GitHub Releases page is empty, and a search found none. What I know comes from diffing the npm tarball against the installed package. In ScrollTrigger the changes are scroll-position recording across `matchMedia` revert/recreate and a stale-cache fix. None of the changed lines mention `ignoreMobileResize`, `normalizeScroll`, `anticipatePin` or `_100vh` — [gsap 3.15.1 on npm](https://www.npmjs.com/package/gsap?activeTab=versions) [source read]. Core also has changes I did not analyse, for example timeline insertion of from-tweens, so regression-test the desktop timelines after upgrading.
- Which real devices meet the 900px rule was not checked against a device list.

## ScrollTrigger pinning on touch: why it jumps, what the options do, and when sticky is better

### Takeaway
Pinning jitters because the browser scrolls on a separate thread while ScrollTrigger flips the element to `position: fixed` from JavaScript, so the switch lands late. GSAP's own fixes are `normalizeScroll()` (which takes over scrolling) and `ignoreMobileResize` (already on by default for phones, per the source). For this project `position: sticky` plus a scrubbed tween avoids the handoff entirely. I found no GSAP staff statement recommending that, so it is my inference, not their guidance.

### Cited Findings
**Cause**
- The source says `anticipatePin` exists "to avoid a visual glitch due to the fact that most browsers do scrolling on a separate thread (not synced with requestAnimationFrame)" — [node_modules/gsap/src/ScrollTrigger.js line ~1084](node_modules/gsap/src/ScrollTrigger.js) [source read].
- GSAP staff (Rodrigo, Oct 2024 [>2y, by weeks]) attribute address-bar jumps to a refresh: "when the browser's address bar shows/hides it triggers a refresh method", which can throw off calculations because the document height changed — [GSAP forum 40393](https://gsap.com/community/forums/topic/40393-gsap-scrolltrigger-pin-position-is-jumping-on-ios-due-to-its-address-bar/). See the conflict under `ignoreMobileResize` below.
- `normalizeScroll` docs describe Safari bugs that misreport scroll position and `clientX/Y`, causing jitter, some dating to January 2018 and still unfixed — [normalizeScroll docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.normalizeScroll()/). The installed source has the matching workaround: on iOS it skips alternate touchmove events — [ScrollTrigger.js line 1357](node_modules/gsap/src/ScrollTrigger.js) [source read].

**`ignoreMobileResize`**
- Docs: stops vertical resizes on touch-only devices from triggering a refresh, described as "vertical resizes (of 25% of the viewport height)", and warns "if you skip the refresh(), the start/end trigger positions may be inaccurate." The docs page does not state the default — [ScrollTrigger.config() docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.config()/).
- The installed default is effectively on for phones: `_ignoreMobileResize = Observer.isTouch === 1` [source read, line 1358]. `isTouch` is 1 when `(hover: none), (pointer: coarse)` matches — [Observer.js line 135](node_modules/gsap/src/Observer.js) [source read].
- Even when on, a resize still refreshes if the width changes or the height moves by more than 25% of `innerHeight` — [ScrollTrigger.js line 211](node_modules/gsap/src/ScrollTrigger.js) [source read].
- GSAP Helper said the same in April 2024 ([>2y], "newer versions default to ignoring mobile resizes") — [GSAP forum 40393](https://gsap.com/community/forums/topic/40393-gsap-scrolltrigger-pin-position-is-jumping-on-ios-due-to-its-address-bar/).
- **Conflict:** the Oct 2024 staff reply and the [3.10 blog](https://gsap.com/blog/3-10/) [>2y] present it as something you opt into. The 3.15.0 source shows it already applies on phones. Calling `ScrollTrigger.config({ ignoreMobileResize: true })` is therefore redundant on touch-only devices.
- ScrollTrigger measures viewport height from a hidden `100vh` div rather than `innerHeight`, unless `normalizeScroll` is active — [ScrollTrigger.js lines 258–261, 1349](node_modules/gsap/src/ScrollTrigger.js) [source read]. Percent-based start/end values therefore use the large viewport on phones.

**`normalizeScroll()`**
- Forces scrolling onto the JavaScript thread. It is opt-in because the authors prefer native scrolling. The docs call it experimental and, in substance, a hybrid form of scroll-jacking: it cancels native scroll events, though it adds no fake scrollbars or altered acceleration — [normalizeScroll docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.normalizeScroll()/).
- It prevents address-bar show/hide on most devices. The exception is "the most recent iOS version" on phones in portrait, which the docs say seems impossible to work around — [normalizeScroll docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.normalizeScroll()/). The ScrollSmoother docs repeat the iOS limit, per a search summary I did not read in full — [ScrollSmoother docs](https://gsap.com/docs/v3/Plugins/ScrollSmoother/).
- It relinquishes control on multi-touch or when the page is zoomed — [normalizeScroll docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.normalizeScroll()/).
- It is global, not per trigger: it is a static method, and the source keeps one module-level normalizer for the viewport — [ScrollTrigger.js line 1754](node_modules/gsap/src/ScrollTrigger.js) [source read].
- Staff call it "not a silver bullet", and in July 2025 suggested gating it with `ScrollTrigger.isTouch` — [GSAP forum 40393](https://gsap.com/community/forums/topic/40393-gsap-scrolltrigger-pin-position-is-jumping-on-ios-due-to-its-address-bar/).
- Staff also defend it: "There are many sites using normalizeScroll in production without any issues" (Rodrigo, Jul 2024 [>2y]), and in the same thread Cassie suggested `ignoreMobileResize` and said "I'm not actually sure how nicely Scrolltrigger and dvh play" — [forum 41217](https://gsap.com/community/forums/topic/41217-scrolltrigger-end-not-working-as-expected-on-mobile/). The original poster there raised performance concerns about it.
- Mixed real-world results: it fixed one user's pin glitches ([forum 35277](https://gsap.com/community/forums/topic/35277-scrolltrigger-pinning-and-mobile/), Jan 2023 [>2y]). For another it did not stop iPhone scrub jitter even with `allowNestedScroll` and `will-change: transform`, and staff never confirmed a cause ([forum 42535](https://gsap.com/community/forums/topic/42535-animation-jittering-when-using-scrolltrigger-with-scrub-on-iphone/), Sep 2024 [>2y]).
- With Lenis, staff said: "If you're using Lenis, try not enabling the normalizeScroll() option" and suggested disabling Lenis on touch via `if (!ScrollTrigger.isTouch)` — [forum 38517](https://gsap.com/community/forums/topic/38517-scrolltrigger-and-lenis/), Oct 2023 [>2y], offered without a demo to diagnose.

**`anticipatePin` and `pinType`**
- `anticipatePin` defaults to 0. "A value of `anticipatePin: 1` is typically fine." It applies the pin slightly early based on velocity, so a fast scroll does not briefly show unpinned content — [ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/). The source multiplies the value by 45 and projects scroll velocity forward [source read, lines 639, 1085].
- `pinType` is `"fixed"` or `"transform"`. `position: fixed` is the default only when the scroller is the body, otherwise transforms are used. Forcing it is usually unnecessary — [ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/). The docs also warn that `will-change: transform` on an ancestor acts like a transform and breaks `position: fixed` — [ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).
- Staff also warn: "Is never a good idea to animate the trigger element of a ScrollTrigger instance", though not as a confirmed cause in that thread — [forum 42535](https://gsap.com/community/forums/topic/42535-animation-jittering-when-using-scrolltrigger-with-scrub-on-iphone/) [>2y].

**Sticky**
- Staff advice against sticky is narrow. Where sticky elements sat inside a pinned parent, Rodrigo said "There is no need for position sticky in this particular scenario IMHO" and "Just use ScrollTrigger for the whole thing", noting that "nested pinning is not supported". That is specific to that demo and is not a general rule against sticky — [forum 39949](https://gsap.com/community/forums/topic/39949-css-postion-sticky-elements-broken-when-scrolltrigger-in-use/), Feb 2024 [>2y]. It does not address phones or sticky without pin.
- One thread found sticky elements distort ScrollTrigger's measurements after resize — [forum 28919](https://gsap.com/community/forums/topic/28919-scrolltrigger-on-sticky-positioned-elements-breaks-after-resize/) [>2y, search summary only].

### Inferences
- Use sticky plus scrub whenever the effect is "hold this block while the timeline plays" and the phone layout allows it. The browser performs sticky as part of its own scrolling, so there is no late JS switch to `fixed`, no pin-spacer and no `normalizeScroll` dependency. The scrubbed content inside can still lag by a frame, but it stays inside a stable frame, which is far less visible than the frame itself jumping.
- Do not mix approaches inside one subtree: a sticky stage must not also be pinned.
- `pin: true` remains right on desktop with a mouse or trackpad. The existing pins should stay. Adding `anticipatePin: 1` to them is low-cost and matches the docs.
- For phones do not enable `normalizeScroll()`. It is a global scroll takeover labelled experimental, it would not stop the iOS portrait address bar according to its own docs, and staff advise against pairing it with Lenis. If no phone pins exist, it solves nothing here.
- Scrub end on a sticky stage: because ScrollTrigger's viewport is `100vh` (large viewport) and the stage is `100svh`, `end: 'bottom bottom'` fires slightly before the stage unsticks, by roughly the height of the browser bar. The result is a short dwell on the final frame, not a defect.
- Keep `scrub` numeric (for example `0.3`–`0.8`) for type and van motion. The easing-out catch-up hides per-frame lag, which matters because those tweens run on the main thread.

### Gaps
- I found no GSAP staff or docs statement that directly compares sticky and `pin` on phones.
- The phrase "most recent iOS version" in the docs dates from the 3.10 era, so I could not confirm how `normalizeScroll` behaves with the iOS 26/27 Safari toolbar.

## Lenis on touch: what it does, whether it should run on phones, horizontal conflicts

### Takeaway
With the defaults, Lenis does not smooth touch at all: touch scrolling stays fully native. Keep `syncTouch` off. Lenis can stay on phones at near-zero risk, and it needs no special handling for a native horizontal scroller on touch.

### Cited Findings
- Defaults: `syncTouch: false`, `syncTouchLerp: 0.075`, `touchMultiplier: 1`, `touchInertiaExponent: 1.7`, `smoothWheel: true`, `gestureOrientation: 'vertical'` — [lenis 1.3.27 README](node_modules/lenis/README.md).
- In `onVirtualScroll`, when `syncTouch` is false and the event is touch, Lenis sets `isScrolling = "native"`, stops its animation and returns, without calling `preventDefault` — [node_modules/lenis/dist/lenis.mjs lines 621–626](node_modules/lenis/dist/lenis.mjs) [source read]. `touchMultiplier` only feeds this path, so it has no effect on real scrolling with `syncTouch` off.
- `syncTouch: true` means Lenis calls `preventDefault` and drives touch scrolling itself ([lenis.mjs line ~631](node_modules/lenis/dist/lenis.mjs) [source read]). The README says it "mimics touch device scroll while allowing scroll sync" and "can be unstable on iOS<16" — [README](node_modules/lenis/README.md). The README lists `syncTouch: true` as required only for `infinite` on touch devices. A third-party source claiming it is required for touch generally is wrong for this version.
- When stopped (`lenis.stop()`), Lenis does call `preventDefault` on cancellable touch events — [lenis.mjs lines ~615–618](node_modules/lenis/dist/lenis.mjs) [source read]. The project's mobile menu relies on this via `lenis.stop()` — [src/sections/header.js](src/sections/header.js).
- Prevent attributes in the installed version: `data-lenis-prevent`, `-wheel`, `-touch`, `-vertical`, `-horizontal`. `allowNestedScroll: true` is the simplest option but checks the DOM tree on every scroll event — [README](node_modules/lenis/README.md). A search result claimed the horizontal attribute exists only in a fork. That is wrong: it is in the official 1.3.27 README and source.
- With `gestureOrientation: 'vertical'`, gestures with `deltaY === 0` are ignored and stay native — [lenis.mjs line 607](node_modules/lenis/dist/lenis.mjs) [source read].
- Limitations listed in the README: "no support for CSS scroll-snap, you must use lenis/snap"; "capped to 60fps on Safari ... and 30fps on low power mode" — [README](node_modules/lenis/README.md).
- **Recent change:** `respectReducedMotion` (default `true`) forces `lerp` to 1 and makes programmatic scrolls instant. It first appears in lenis 1.3.26 (published 2026-08-05) and is absent from 1.3.25 — [README](node_modules/lenis/README.md); [measured against jsDelivr copies of each version].
- GSAP staff suggested disabling Lenis on touch as a first troubleshooting step, not as a general rule — [forum 38517](https://gsap.com/community/forums/topic/38517-scrolltrigger-and-lenis/) [>2y].

### Inferences
- Should Lenis run on phones? Keep it, with `syncTouch` left off. Its only phone jobs are smooth anchor scrolling and the menu scroll lock, and header.js already uses both. Removing it would make anchors jump instantly and fall back to `body { overflow: hidden }` for the menu, a lock that is historically weaker on iOS. Dropping it on touch (`if (!ScrollTrigger.isTouch)`) is a reasonable alternative if a real device shows trouble. The fallbacks already exist in header.js.
- On phones, Lenis's per-frame cost is one extra callback on the GSAP ticker. I did not measure this.
- Lenis's "no CSS scroll-snap" limit concerns the root scroller it controls. A nested horizontal snap carousel is a separate scroller on a native touch path, so `data-lenis-prevent` is not needed on phones. Add `data-lenis-prevent-horizontal` to the carousel anyway as cheap protection for mouse/trackpad users who see the mobile layout in a narrow window, since diagonal wheel input there would otherwise be hijacked. Do not use `allowNestedScroll`, because of its per-event DOM cost.
- Set `overscroll-behavior-x: contain` on the carousel so a swipe at the ends cannot chain into a browser back-swipe or page scroll. MDN's own snap demo uses this pairing — [MDN scroll snap guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap). The `normalizeScroll` docs say iOS Safari forced overscroll bounce even with `overscroll-behavior` set, so treat it as an improvement, not a guarantee — [normalizeScroll docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.normalizeScroll()/).

### Gaps
- I did not find open Lenis GitHub issues specific to 1.3.27 and iOS 26/27.
- I did not verify that `body { overflow: hidden }` still fails on current iOS. "Historically weaker" is background knowledge.

## Mobile address bar, viewport units and fixed bottom bars

### Takeaway
Use `svh` for stages holding text and controls, `lvh` for full-bleed imagery that must always cover the screen, and avoid `dvh` on anything visible during scroll. `viewport-fit=cover` plus a solid, flush bottom bar with safe-area padding is the right base for the WhatsApp bar. Adding `viewport-fit=cover` to index.html changes layout everywhere, so full-bleed sections must be rechecked in landscape.

### Cited Findings
- `svh` assumes the expandable UI is expanded, `lvh` assumes it is retracted, and `dvh` changes with it, clamped between the two. Support: Chrome/Edge 108, Firefox 101, Safari 15.4 — [web.dev viewport units](https://web.dev/blog/viewport-units).
- Dynamic values "do not update at 60fps": browsers throttle updates, and some debounce them entirely depending on the gesture. The on-screen keyboard is not treated as browser UI by default — [web.dev viewport units](https://web.dev/blog/viewport-units).
- Chrome on Android: `vh` does not resize with the URL bar and is sized to the largest viewport, so `100vh` can exceed the visible area. The initial containing block keeps the smallest height, while `position: fixed` elements with `height: 100%` track the visible height — [Chrome URL bar post](https://developer.chrome.com/blog/url-bar-resizing) [>2y, Chrome 56 era].
- GSAP describes `ignoreMobileResize` as preventing `refresh()` "when a mobile browser shows/hides its address bar", which implies resize events fire on that change — [GSAP 3.10 blog](https://gsap.com/blog/3-10/) [>2y, search summary]. The GSAP source also notes an iOS case where the bar appears but `resize` does not fire until the animation is done — [ScrollTrigger.js line 1693](node_modules/gsap/src/ScrollTrigger.js) [source read].
- `viewport-fit` defaults to `auto`, which applies automatic insetting. `cover` makes the page lay out to the full screen. Use `max()` to combine a default margin with the inset, because insets resolve to 0px in some orientations — [WebKit, Designing Websites for iPhone X](https://webkit.org/blog/7929/designing-websites-for-iphone-x/) [>2y, 2017].
- Chrome 135 introduced edge-to-edge on small-screen Android. The viewport can extend into the gesture bar, and a dynamic "chin" covers that area and slides away on scroll. A `position: fixed; bottom: 0` element can end up partly hidden behind the navigation bar once the chin retracts. With `viewport-fit=cover`, the viewport extends to the bottom edge on load and the chin is never shown — [Chrome edge-to-edge guide](https://developer.chrome.com/docs/css-ui/edge-to-edge), Feb 2025.
- `safe-area-inset-bottom` updates dynamically as the chin moves. Chrome discourages putting it in `padding-bottom` because of layout thrashing, and recommends `padding-bottom: var(--safe-area-max-inset-bottom)` with `bottom: calc(env(safe-area-inset-bottom, 0px) - var(--safe-area-max-inset-bottom))`. Its example uses a 36px fallback where the max variable is unsupported — [Chrome edge-to-edge guide](https://developer.chrome.com/docs/css-ui/edge-to-edge).
- iOS 26 community reports, not Apple documentation:
  - Without `viewport-fit=cover`, content stops at the safe area and Safari paints a solid bar in the gap. Safari tints the bottom bar by sampling page content and ignores `theme-color` for Liquid Glass tinting — [1ar.io write-up](https://1ar.io/updates/safari-26-liquid-glass-web/), seen as a search summary only.
  - A 20px gap below a fixed bottom nav appeared after the keyboard closed, reported fixed in iOS 26.1 — [Mastodon issue 36144](https://github.com/mastodon/mastodon/issues/36144), seen as a search summary only.
  - `position: fixed; inset: 0` with a fully opaque background may fail to cover the screen, leaving gaps at the bottom. `rgba(0,0,0,.99)` or `opacity: 0.99` worked in the author's test — [Edoardo Lunardi](https://www.edoardolunardi.dev/blog/safari-26-and-the-strange-case-of-fixed-overlays), Sep 2025. That report is against Safari 26.0 and I found no later status.
- `safe-area-inset-bottom` can read 0 when the toolbar is hidden — [Apple developer forum 716552](https://developer.apple.com/forums/thread/716552), seen as a search summary only. Its age is unverified, though the thread number suggests [>2y].

### Inferences
Current state of the repo:
- `.hero`, `.testimonial__frame` and `.footer` already use `100svh`, which is correct.
- The `100vh` stages exist only in the desktop query, so they matter only if touch devices keep entering that query.
- index.html has no `viewport-fit`, so `env(safe-area-inset-bottom)` will be 0 on iOS until it is added, and Chrome will show its chin.

Sizing rule:

| Use | Unit | Why |
|---|---|---|
| Sticky stage with text | `100svh` | Never hidden under browser UI and never resizes mid-scroll |
| Full-bleed photo stage | `100lvh` on the image layer, text inside a `100svh` box | No background strip shows when the bar retracts |
| Anything visible during scroll | Avoid `dvh` | It resizes during the gesture, and throttled updates show as steps |

- With a `100svh` sticky stage, retracting the bar exposes a strip below the stage, so give the tall parent the same background colour.
- A community suggestion to prefer `100dvh` over `100vh` is fine for app-like shells that do not scroll, but it is the wrong choice for scrubbed scroll stages. GSAP staff were also unsure how ScrollTrigger and `dvh` interact (forum 41217 above).

WhatsApp bar, using the fact that `viewport-fit=cover` removes the Chrome chin, so the inset should no longer animate there (my reading of the guide; verify on a device):

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
```
```css
.wa-bar {
  position: fixed; inset-inline: 0; bottom: 0; z-index: 40;
  padding: 10px max(16px, env(safe-area-inset-right)) calc(10px + env(safe-area-inset-bottom, 0px)) max(16px, env(safe-area-inset-left));
  background: var(--color-hillside-ink);            /* solid, flush to the edge */
}
body { padding-bottom: calc(68px + env(safe-area-inset-bottom, 0px)); } /* illustrative height */
```

Bar rules:
- Make it a direct child of `<body>`. A transformed or `will-change` ancestor would break `fixed`, per the ScrollTrigger docs warning above.
- Hide it while the mobile menu is open. The menu is `position: fixed; inset: 0` with an opaque cream background, so it is a candidate for the Lunardi bug too.
- If you animate it in and out, use `transform`, not `bottom`.
- Scope the `body` padding to phone widths.

`viewport-fit=cover` side effects:
- In landscape, full-bleed content runs under the notch, so `--gutter` should become `max(var(--gutter), env(safe-area-inset-left))`.
- Check `.site-header` in standalone and landscape modes.

### Gaps
- No official Apple documentation was found for iOS 26/27 toolbar behaviour, tinting or how `safe-area-inset-bottom` behaves there. All iOS 26 claims above are community reports. The visible part of the Safari 27.0 notes had no toolbar, viewport or safe-area entries, and I read only about two-thirds of that page.
- Exact `resize` timing on current iOS and Android Chrome was not confirmed from an official source.
- Whether `safe-area-max-inset-bottom` exists outside Chrome was not checked.

## CSS scroll snap for the carousel: counter, accessibility, and library comparison

### Takeaway
Use native CSS scroll snap, with `IntersectionObserver` for the counter and real prev/next buttons. It costs no bundle size, is an Interop 2026 focus area, and gives each platform its native physics. Choose Embla only if a future requirement needs looping or JS-controlled physics. Swiper is not justified at about 3x to 6x Embla's size (core versus full bundle).

### Cited Findings
**Snap behaviour**
- `mandatory`: the viewport "must snap to a snap position if it isn't currently scrolled". `proximity`: "may snap", the user agent decides, and it is the default strictness. Animations and physics are "left up to the user agent" — [MDN scroll-snap-type](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-snap-type).
- `scroll-snap-stop: always` forces scrolling to stop at each item rather than skip past it, and the default is `normal` — [MDN scroll snap guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap).
- Momentum differs by platform: in Chrome and Firefox on Android a fast swipe keeps scrolling until speed drops, then snaps. In iOS Safari the page snaps as soon as the finger lifts, so fast scrolling across items is not possible. Simon Fraser (WebKit) says swipes move item to item rather than momentum-scrolling and retargeting near the end, which he calls the ideal. The bug was reported 2022-08-05, is still NEW, and was last modified 2026-04-16 — [WebKit bug 243582](https://bugs.webkit.org/show_bug.cgi?id=243582).
- Scroll Snap is an Interop 2026 focus area, listed by Mozilla under reliability improvements for existing features — [WebKit Interop 2026](https://webkit.org/blog/17818/announcing-interop-2026/), [Mozilla Interop 2026](https://hacks.mozilla.org/2026/02/launching-interop-2026/) (both via search summary).
- Safari 27.0 (notes dated 2026-09-17) includes a fix preferring the `:target` snap area when re-snapping — [WebKit Safari 27.0](https://webkit.org/blog/18325/webkit-features-for-safari-27-0/).

**Counter options**

| Option | Support | Source |
|---|---|---|
| `scrollend` | Chrome 114, Firefox 109, Samsung 23, Safari/iOS 26.2 | [Can I Use scrollend](https://caniuse.com/mdn-api_element_scrollend_event) |
| `scrollsnapchange` | Chrome 129+, Samsung 28+, not in Safari or iOS through listed releases (27.x), not in Firefox through 162 | [Can I Use scrollsnapchange](https://caniuse.com/mdn-api_element_scrollsnapchange_event) |
| `::scroll-marker` | Chrome 135+ only | [Can I Use ::scroll-marker](https://caniuse.com/mdn-css_selectors_scroll-marker) |

The Chrome announcement confirms 129 for snap events — [Chrome scroll snap events](https://developer.chrome.com/blog/scroll-snap-events?hl=en).

**Accessibility**
- APG for a non-rotating carousel:
  - The container has role `region` or `group`, `aria-roledescription="carousel"` and a label without the word "carousel".
  - Each slide has role `group` and `aria-roledescription="slide"`. "3 of 10" is allowed as a fallback name.
  - Previous/next controls should be native buttons, and activating them must not move focus.
  - An optional `aria-live="polite"` wrapper is allowed around the slides, since nothing rotates — [WAI-ARIA APG carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/).
- Chrome 132 makes scrollers keyboard-focusable by default only if they have no tabindex and no focusable children. The page says 130, with a note that it was pushed back to 132 — [Chrome keyboard-focusable scrollers](https://developer.chrome.com/blog/keyboard-focusable-scrollers). That page does not cover Safari or Firefox.
- The eight `.dest-item` entries in the current markup contain no links or buttons — [index.html lines 226–262](index.html).

**Bundle sizes** [measured, gzip of published files, not tree-shaken; latest versions]

| Option | gzip | Notes |
|---|---|---|
| CSS scroll snap | 0 KB | About 20 lines of JS for counter and buttons |
| Embla 8.6.0 | 7.2 KB (UMD build) | Latest release is 2025-04-04, about 19 months old |
| GSAP Observer | 4.3 KB | Gesture input only; you would build the carousel yourself |
| GSAP Draggable + InertiaPlugin | 13.5 + 3.3 = 16.8 KB | Re-implements momentum in JS |
| Swiper 14.4.0 core | 20.7 KB + 3.0 KB bundle CSS | Latest release 2026-10-30 |
| Swiper 14.4.0 full bundle | 44.5 KB + 3.0 KB CSS | |

The full Swiper bundle is about 2.5x the size of ScrollTrigger itself.

### Inferences
Recommended CSS (below 900px, inside the non-pinned branch):

```css
.dest__list {
  display: flex; gap: var(--element-gap);
  overflow-x: auto; overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: var(--gutter);
  padding-inline: var(--gutter); margin-inline: calc(var(--gutter) * -1);
}
.dest-item { flex: 0 0 min(82vw, 340px); scroll-snap-align: start; scroll-snap-stop: always; }
```

Counter recommendation: `IntersectionObserver`.

```js
const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) setCurrent(items.indexOf(e.target));
}, { root: list, threshold: 0.6 });
items.forEach((it) => io.observe(it));
```

- It works on every target browser, needs no scroll listener, and updates as a card crosses 60%, slightly before settle, which feels responsive.
- Do not rely on `scrollend` alone: anything below iOS 26.2 never fires it.
- Do not use `scrollsnapchange`: neither Safari nor Firefox has it.
- Choose a threshold that fits the card width. At 390px wide with `82vw` cards, only one card can pass 60% at a time. This breaks on wider screens: the `340px` cap means tablets under 900px show several whole cards at once. Either keep the existing grid from about 600px up, or compute the index there from `Math.round(list.scrollLeft / step)` in a rAF-throttled scroll listener.
- Do not depend on `::scroll-button`/`::scroll-marker`. They are Chrome-only.

Why `scroll-snap-stop: always`: it gives Android the same one-at-a-time rhythm iOS already has, so the counter behaves consistently across platforms, and no destination is skipped. Trade-off: on Android a flick through 8 cards takes 7 swipes. If that feels slow, use `normal` and accept the platform difference.

Accessibility steps:
- Add `tabindex="0"` plus the APG roles and a label on the list. There are no focusable children, and an explicit `tabindex` covers browsers that do not make scrollers focusable by default.
- Add visible prev/next `<button>`s using `list.scrollBy({ left: step, behavior })`, with `behavior: 'auto'` under reduced motion.
- Keep the `01 / 08` counter as visible text. If it updates live, avoid announcing on every swipe; rely on the slide labels.
- Keep a hint that more content exists, such as the 82% card width peeking the next card, especially if scrollbars are hidden.

Why not JS gesture libraries here: they replace native physics with a JS imitation (Draggable, Observer, Embla, Swiper), which is the same trade-off this project is avoiding by not using `syncTouch`. Native snap also needs no resize handling and works if JS fails. Embla is the right fallback if looping or synced thumbnails become required.

### Gaps
- The rest of MDN's "Using scroll snap events" was not read, and I did not check for a `scrollsnapchange` polyfill.
- Interop 2026 live pass rates for scroll snap were not retrieved.
- I did not verify Safari or Firefox behaviour for keyboard focus on scrollers without focusable children. The explicit `tabindex` avoids depending on it.
- Trailing `padding-inline` inside snap scrollers can behave differently across browsers. Check that the last card can reach its snap position on iOS.

## CSS scroll-driven animations: support and role

### Takeaway
`animation-timeline` reached Baseline only last month (October 2026), so use it only as a decorative layer behind `@supports`, for transform and opacity effects. ScrollTrigger stays the engine for anything sequenced or functional. Do not port timelines to CSS.

### Cited Findings
- MDN marks `animation-timeline` "Baseline 2026: Newly available", working across latest browsers "since October 2026", and "might not work in older devices or browsers" — [MDN animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline).
- `animation-timeline: scroll()` support: Chrome 115+, Safari and iOS Safari 26.0+, Firefox 159+ — [Can I Use](https://caniuse.com/mdn-css_properties_animation-timeline_scroll).
- Firefox 159.0.1 is the current stable release today ([Mozilla product details](https://product-details.mozilla.org/1.0/firefox_versions.json)), and Chrome for Android stable is 158 ([Chrome version history API](https://versionhistory.googleapis.com/v1/chrome/platforms/android/channels/stable/versions?pageSize=1)). The Can I Use range therefore does cover shipping browsers, not just future ones.
- **Recent changes in Safari:**
  - Scroll-driven animations (SDA) arrived in 26.0 — [WebKit Safari 26.0](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/) (search summary), consistent with [Can I Use](https://caniuse.com/mdn-css_properties_animation-timeline_scroll).
  - 26.4 "adds support for threaded Scroll-driven Animations" — [WebKit Safari 26.4](https://webkit.org/blog/17862/webkit-features-for-safari-26-4/), 2026-03-24.
  - 26.5 reliability fixes cover `animation-play-state`, view-timeline progress near 0% and 100%, and restoring timelines after back-forward navigation — [WebKit Safari 26.5](https://webkit.org/blog/17938/webkit-features-for-safari-26-5/), from a search summary.
  - 27.0 has a `view-timeline-inset` serialization fix — [WebKit Safari 27.0](https://webkit.org/blog/18325/webkit-features-for-safari-27-0/).
- Scroll-driven animations can "run off the main thread", and Chrome's example animates `transform` rather than `width` "to leverage composited animations" — [Chrome scroll-driven animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations) [>2y, May 2023].
- WebKit says Interop 2026 will help ensure SDA works consistently across browsers — [WebKit Interop 2026](https://webkit.org/blog/17818/announcing-interop-2026/) (search summary).
- For `scroll()`, `overflow: hidden` can accidentally create the nearest scroll container, while `overflow: clip` is skipped. MDN recommends `clip` when no interactive content is clipped — [MDN overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow).

### Inferences
- **Use alongside ScrollTrigger, not instead of it.** Rules:
  - ScrollTrigger owns anything with state or sequence: word-fill, the van's stops, counters, Offer swaps, route line, and everything users would notice as broken if missing.
  - SDA may own optional polish: covered-card scale in the service stack, simple image parallax, reveal fades.
  - Never let both drive the same property on the same element.
- Why CSS is worth it for those few effects: on Safari 26.4+ and Chrome they can run on the compositor, which makes them the only animation option here that can stay in sync with touch scrolling while the main thread is busy.
- Why not more: Safari below 26 gets nothing. Fallback must be the plain static state, which suits decorative effects only. Safari 26.0–26.3 lacks threading, and Firefox's implementation is one release old.
- Gate with both queries:

```css
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .parallax img { animation: drift linear both; animation-timeline: view(); }
  }
}
```

- Mind sticky and `view()`: a `view()` timeline tracks an element's position in its scroller, so a stuck element's progress may not mean what you expect. For the covered-card scale, drive it from a non-sticky wrapper or a named `view-timeline`. Test this, as I found no source covering it.
- Lenis on phones keeps native scrolling, so SDA timelines read real scroll positions with no extra integration.

### Gaps
- I checked Can I Use for `scroll()` only, not a separate `view()` entry. WebKit's posts cover `view()` for Safari, and MDN's Baseline covers `animation-timeline`, but Firefox `view()` specifics were not confirmed.
- I found no data on current share of iOS below 26 among mobile visitors, or for this site's audience.
- Which animated properties each engine actually composites under SDA is not stated in the sources read.

## Performance on mid-range phones

### Takeaway
Animate only `transform` and `opacity` while scrolling. The biggest performance risks are already live on phones: scrubbed `clip-path` on full-bleed photos, and images sized for desktop. `w=2000` does matter, but the real problem is that a landscape image cropped for a portrait screen wastes about 70% of its pixels. A portrait crop is smaller and sharper than the current image.

### Cited Findings
**Properties**
- Restricting animation to `transform` and `opacity` keeps it on the compositing stage. Avoid properties that trigger layout or paint unless absolutely necessary — [web.dev animations guide](https://web.dev/articles/animations-guide).
- `will-change` forces layer creation. Do not apply it early, since layers cause their own problems. Use it only when you see graphics issues, ideally adding it just before a change and removing it after — [web.dev animations guide](https://web.dev/articles/animations-guide).
- Chrome's guidance says animating `clip-path` triggers paint and recommends transform-based scaling instead, per a search summary — [Chrome expand & collapse](https://developer.chrome.com/blog/performant-expand-and-collapse). An undated Chrome post said clip-path acceleration was planned, without confirming it shipped — [Chrome hardware-accelerated animations](https://developer.chrome.com/blog/hardware-accelerated-animations) [>2y, approximately 2021 per the search tool]. A current Chrome guide still recommends compositor properties such as `transform` and `opacity` for carousel effects, per a search summary — [Chrome carousel slide effects](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-atoms/carousel-slide-effects).
- Safari 27.0 fixed `clip-path: inset()` border-radius rendering at certain sizes — [WebKit Safari 27.0](https://webkit.org/blog/18325/webkit-features-for-safari-27-0/). This is the exact form `testimonial.js` and `winter.js` animate, so earlier Safari may show artefacts.
- MotionPathPlugin applies path coordinates to x/y transforms. Alignment is calculated once and is not responsive; the docs suggest rebuilding on resize — [MotionPathPlugin docs](https://gsap.com/docs/v3/Plugins/MotionPathPlugin/).

**LCP and images**
- Good LCP is 2.5 s or less for at least 75% of visits, and above 4.0 s is poor. Never lazy-load the LCP image. Use `fetchpriority="high"` on it, and keep `src`/`srcset` in the initial HTML so the preload scanner finds it. Use high priority on no more than one or two images, and `fetchpriority="low"` for off-screen carousel slides — [web.dev optimize LCP](https://web.dev/articles/optimize-lcp).
- Current markup: the hero has `fetchpriority="high"`, no `loading="lazy"`, and no `srcset` at any size — [index.html line 110](index.html). The rest of the images are lazy except a `w=1400` journey photo that is eager at lines 133 and 155 (same URL).
- Hero source is 2000×1331 (landscape) — [measured]. Hero variant sizes [measured, single request, AVIF negotiated via Accept unless noted]:

| URL params | Result size | Format |
|---|---|---|
| `w=2000&q=80` (current) | 379 KB | AVIF |
| `w=2000&q=80` | 563 KB | JPEG (no AVIF/WebP in Accept) |
| `w=1200&q=70` | 161 KB | AVIF |
| `w=828&q=70` | 86 KB | AVIF, only 828×551 |
| `w=828&h=1800&q=70` | 214 KB | AVIF, portrait crop |

- Total for a phone scrolling the whole page: 21 distinct images, 6.87 MB AVIF today, versus 3.51 MB with widths capped at 828 and `q=70` — [measured; excludes 4 Offer images that are `display: none` and lazy on phones, and the og:image]. Cropped portrait variants of the full-bleed sections would change that figure. I did not model them.
- Unsplash officially supports `w`, `h`, `crop`, `fm`, `auto=format`, `q`, `fit`, `dpr`. Other Imgix params work but may be removed. Resized API URLs must keep `ixid`. Unsplash requires API-returned image URLs to be directly embedded — [Unsplash API docs](https://unsplash.com/documentation).

### Inferences
**Does `w=2000` matter? Yes, but width alone is the wrong fix.**
- On a 390×844 CSS px phone, `object-fit: cover` scales the 2000×1331 image to about 1268×844 CSS px, and only 390px of that width is visible. That is about 31% of the image, so about 69% of the downloaded pixels are cropped away (ignoring the hero's extra 1.08 scale and the slightly shorter `svh`).
- Meanwhile 1331px of image height is stretched to 1688 device pixels at DPR 2, so it is upscaled, not oversized.
- `w=828` alone makes this worse: 551px of height stretched across the screen would look visibly soft.
- A `sizes="100vw"` `srcset` picks by viewport *width* and has the same problem.
- Use `<picture>` with a portrait source instead:

```html
<picture>
  <source media="(max-width: 699px)" srcset="…?auto=format&fit=crop&w=828&h=1800&q=70" />
  <img src="…?auto=format&fit=crop&w=2000&q=80" alt="" fetchpriority="high" />
</picture>
```

- This saves 44% (379 KB to 214 KB) and shows more real pixels. At an assumed 1.6 Mbps link, that is roughly 1.9 s versus 1.1 s of transfer time alone, excluding latency. Check that the centre crop still suits the subject; `fit=crop` may need a `crop` param.
- The same applies to the other three `w=2000` images (lines 206, 273, 434), which are also full-bleed on phones.
- **`w=1600` Offer images** become a problem as soon as the phone swap is enabled, since 4 more images will load. Their frame is a 16:10 box at about screen width, so `w=828` is ample.
- **Eager `w=1400` journey photo** (line 133): below the fold on phones, so it competes with the hero. Make it lazy and smaller.
- **Prefer static over scrubbed `clip-path` on phones.** Current cost, from reading the code: `hero.js`, `testimonial.js` and `winter.js` animate `inset()` clip-path over full-screen photos with `scrub: true`, so each scroll frame repaints a large image area. Fix in order of value:
  1. Replace with a `transform: scale()` on a wrapper with `overflow: clip` for Testimonial and Winter.
  2. If the rounded-corner reveal is essential, apply it only at the end of the section or use a static radius.
  3. Keep hero's translate/scale and opacity, but drop or shorten its clip-path on phones.
  Measure on a real mid-range Android first with Chrome's Performance panel and paint flashing, since the size of the cost is unverified.
- **SVG `<clipPath>` morph on `<path>`:** tweening `attr: { d }` changes geometry each frame, so everything clipped by it repaints. Run it as a short timed tween (about 0.5 s) at each swap, not on scrub. It is acceptable on the small Offer box and not needed at all if a static mountain looks good enough. Do not apply `will-change` to the clip, since it would not avoid repaint.
- **Do not port the Journey photo grow to phones.** It animates `left`, `top`, `width`, `height` with `will-change` on all four, which is layout on every frame. Rebuild it with `transform` or drop it for the phone design.
- **Word-fill:** `color` on `inline-block` word spans repaints only the changing words, and word boxes do not move. It is fine as is. Do not give each word `will-change`: that would make dozens of layers.
- **Long-tail costs:** `header.js` calls `elementsFromPoint` every scroll frame (rAF-throttled), which forces hit testing during scroll. Consider replacing it with ScrollTrigger `onToggle` on each `[data-header]` section.
- **Layout stability:** keep `aspect-ratio` boxes on all lazy images, as `.dest-item__card` does. Lazy images without reserved height would shift start/end positions after the last `refresh()`.
- **Route line:** dashoffset on a page-tall SVG repaints a tall area. A viewport-sized SVG bounds the cost.

### Gaps
- Current compositor status of `clip-path` animation in Chrome and Safari could not be verified. The Chrome sources are old, and I did not locate the tracking bug.
- Real LCP for this site on a phone was not measured. Hero text is also a possible LCP candidate, since `initI18n()` is awaited and the headline animates in. Only a field or Lighthouse run can confirm that.
- Which Chrome/Safari cost actually applies to `clipPath` `d` morphing was not found in any source. The repaint statement is reasoning from how clipping works, not a benchmark.
- The Unsplash `ixid` requirement applies to API-returned URLs, and the project's URLs lack it. I did not read the hotlinking help-centre page.

## Reduced motion and iOS Safari bugs affecting sticky, overflow and fixed elements

### Takeaway
The existing reduced-motion structure is sound and should simply be extended: every new phone effect must have a static state under `prefers-reduced-motion: reduce`. The main sticky failure is not a Safari bug but CSS behaviour: any `overflow: hidden/auto/scroll` ancestor captures it, so use `overflow: clip`. I found no currently open sticky bug that blocks any of the planned features.

### Cited Findings
- Sticky "sticks" to its nearest ancestor with a "scrolling mechanism" (created when `overflow` is `hidden`, `scroll`, `auto` or `overlay`), even if that ancestor is not the nearest actually scrolling ancestor. At least one inset must be non-`auto`, or it behaves as `relative`. It also creates a stacking context — [MDN position](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position).
- `overflow: clip`: "The element box is not a scroll container", and no formatting context is created. `hidden` is a scroll container. Clipped focusable content still receives focus but will not scroll into view — [MDN overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow).
- The project already uses `overflow-x: clip` on `body` — [src/styles/base.css line 23](src/styles/base.css). Phone-relevant `overflow: hidden` rules include `.hero`, `.footer` and `.dest-item__card`, which would hold no sticky elements in the proposed design; the `.journey__stage`, `.dest__stage` and `.offer__stage` rules are desktop-only — [src/styles/sections.css](src/styles/sections.css).
- Recent WebKit changes:
  - Safari 26.4: "Fixed an issue where overconstrained sticky elements were not properly adjusting their insets" — [WebKit Safari 26.4](https://webkit.org/blog/17862/webkit-features-for-safari-26-4/).
  - Safari 27.0: anchor-positioned elements attached to children of sticky boxes did not stick correctly; `-webkit-perspective` not establishing a containing block for fixed descendants; page scrolling on its own while adjusting text selection inside a fixed element — [WebKit Safari 27.0](https://webkit.org/blog/18325/webkit-features-for-safari-27-0/).
- The Safari 26 full-screen fixed overlay bug is covered in the address-bar section — [Edoardo Lunardi](https://www.edoardolunardi.dev/blog/safari-26-and-the-strange-case-of-fixed-overlays).
- Lenis honours reduced motion by default from 1.3.26 — [README](node_modules/lenis/README.md). The project also skips Lenis under reduced motion at boot, and `gsap.matchMedia` returns early unless `motion` matches — [src/main.js](src/main.js).
- `will-change: transform` on an ancestor breaks `position: fixed` — [ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).

### Inferences
Reduced-motion state per feature:

| Feature | Under `prefers-reduced-motion: reduce` |
|---|---|
| Carousel | Keep it: user-driven scrolling is not animation. Buttons use `behavior: 'auto'` |
| Journey word-fill | All words in full ink, van static in place, no tall track |
| Service cards | Plain stacked list or static sticky. No scale effect |
| Offer | First image static, all text visible. No swap crossfade or morph |
| WhatsApp bar | Unchanged, no slide-in |
| Route line | Finished route drawn, van at end |

- Put the tall `.track` heights inside the motion media query, so reduced-motion users do not scroll past empty space. This mirrors how the desktop layouts are already scoped.
- The `conditions.motion` early return means none of the JS runs, so CSS must provide the end states. Tweens that start hidden must be set from JS (as `reveals.js` does), so that nothing is stuck invisible if JS is skipped.
- Sticky safety checklist:
  - Search phone ancestors of any sticky element for `overflow`.
  - Replace with `clip` where needed.
  - Keep sticky items as siblings in one tall containing block, because the containing block's end releases them.
  - Keep sticky cards shorter than the viewport, or their bottoms are unreachable while stuck.
  - Account for the header, which hides on scroll down and reappears on scroll up: stick below it or allow for overlap.
- `scroll-padding-top` on the root helps keyboard users whose focused link lands under a stuck card or the header.

### Gaps
- I searched for current Safari sticky bugs via release notes rather than the WebKit bug tracker, and read only about two-thirds of the Safari 27.0 notes, so older open sticky bugs may exist.
- I did not fetch a primary source for `prefers-reduced-motion` behaviour itself. The table above is a design recommendation, not a standard.
- `overflow: clip` browser support was not checked on Can I Use. I recall Safari 16+ from background knowledge, unverified.
