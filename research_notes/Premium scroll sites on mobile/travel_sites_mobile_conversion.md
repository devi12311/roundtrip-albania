# Travel and tour sites on phones: what strong sites do, what the evidence supports, and how to make WhatsApp the primary action

Research date: 2026-11-06. Live sites were inspected that day with Playwright driving the installed Google Chrome at 390x844, isMobile, hasTouch, iPhone user agent. Heights are `document.scrollHeight` before lazy content grows the page; where scrolling grew the page, both figures are shown.

Evidence grades used below:
- **[Independent]** independent research (peer-reviewed work, or usability firms such as Baymard and NN/g with no product at stake)
- **[Platform]** data from a company about its own or a commissioned dataset (Google, Meta, Booking, Arival, Contentsquare)
- **[Vendor]** vendor or agency claim with a commercial interest
- **[Anecdote]** single unmeasured example, or opinion
- **[Observed]** my own measurement of a live page on 2026-11-06

All screenshots are in `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/travel/shots/`, and full paths are given where each one is cited. That folder is a session scratchpad, so copy any you want to keep.

## How do strong travel and tour sites present many destinations or tours on phones?

### Takeaway
On the pages where a visitor actually chooses a trip (country or destination hubs), every operator inspected uses a vertical list of compact cards or tiles, not a horizontal carousel. Horizontal rows appear as samplers on home pages (MBA, Black Tomato) and for secondary content such as galleries, reviews, related trips and activity filters. Only marketplaces and tourism boards use them as the main shelf. For 8 destinations, a 2-column static grid is the option best supported by the evidence and the live sites, though no study tests that grid directly.

### Cited Findings

**Site-by-site measurements [Observed]**

| Site and page | Height (screens) | How destinations or trips are shown | Sticky or fixed elements | WhatsApp and phone |
|---|---|---|---|---|
| [Intrepid, Albania hub](https://www.intrepidtravel.com/en/albania) | 16,307px (19.3) | Vertical trip cards from y=1,733 to 9,372 (about 7,640px). Each card leads with a route map, then rating, days, physical grade and "From" price. One horizontal "Featured trips" row at y=1,209 | Fixed header; sticky in-page tabs (Overview, Our trips, At a glance, FAQs, Trip reviews); chat bubble. No bottom booking bar on the hub | None |
| [Intrepid, trip page](https://www.intrepidtravel.com/en/albania/albania-adventure-174335) | 12,311px (14.6) | Photo row with a "1 of 7" counter, scroll-snap | Bottom bar 62px "Dates and prices / From USD $2,495" plus chat bubble, present from y=0 to the end; section tabs from about y=1,400 | None |
| [Exodus, Albania hub](https://www.exodus.co.uk/destinations/europe-holidays/albania-holidays) | 11,748px (13.9) | Vertical cards from y=1,670 to 7,814 (about 6,100px), 10 trip links rendered, plus Filter and Show More | Sticky header with phone number; chat widget | Tap-to-call, no WhatsApp |
| [Exodus, trip page](https://www.exodus.co.uk/trips/albania-holidays/culture/discover-north-albania-kosovo/ati) | 11,606px (13.8) | Peeking highlight cards with dots and arrows | Bottom bar 129px: days, price, phone button, "DATES & PRICES", from y=0 to the end; sticky section tabs | Tap-to-call, no WhatsApp |
| [Much Better Adventures, home](https://www.muchbetteradventures.com/) | 9,647px (11.4) | Horizontal scroll-snap rows: 167px continent tiles, 310px level cards, 268px trip cards | "?" help bubble | Footer only |
| [MBA, Albania hub](https://www.muchbetteradventures.com/explore/albania/) | 9,281px (11.0) | Horizontal activity pills ("Hiking (3)", "Cycling (2)") above a vertical list of trip cards, each with its own 10-image swipe gallery | "?" help bubble | Footer only |
| [MBA, trip page](https://www.muchbetteradventures.com/products/10730-adventures-hike-albania-coastal-trail/) | 21,430px (25.4) | Long page with map-led itinerary | Top bar "Jump to / Dates / heart", from about y=2,000 to 15,750 | Footer only |
| [Black Tomato, home](https://www.blacktomato.com/) | 9,681px (11.5) | Vertical tiles under tabs (By traveller, Most popular, By month, In the spotlight), then a full-width trip slider at y=3,549 | Newsletter sheet 257px across the bottom until dismissed. No booking bar | Phone in footer only |
| [Slovenia.info, home](https://www.slovenia.info/en) | 13,283px (15.7) | Peeking swipe carousel with an arrow, plus a destination search field | Bottom bar 56px: "Ask Alma", Menu, Search, To top, from about y=700 | Phone in footer |
| [Visit Portugal, home](https://www.visitportugal.com/en) | 3,000px reported (unreliable, see Gaps) | Vertical single-column image cards under a "Suggestions" selector | None found | None |
| [Airbnb, Rome things to do](https://www.airbnb.com/rome-italy/things-to-do) | 8,793px (10.4) | Three horizontal rows of 10 cards, 223px wide, so about 1.7 cards visible; no dots or arrows | Bottom bar 80px "Start your search", from about y=700 | None |
| [Airbnb, Experience detail](https://www.airbnb.com/experiences/7343073?adults=1&children=0&infants=0) | 5,282px (6.3) | Photo gallery; "About me" host section at y=3,168 | Bottom bar 82px from y=0 | None |
| [Balkan Trails, home](https://www.balkantrails.com/) (small Balkan operator) | 17,314 to 20,598px (20.5 to 24.4) | Vertical full-width country tiles, about 440px each, y=1,193 to 3,666 | Fixed header; chat widget from about y=2,100 to 3,500 | "Main Office (WhatsApp Available)" as footer text with a `tel:` link |
| [Balkan Trails, tour page](https://www.balkantrails.com/tour/albania-at-a-glance/) | 8,258 to 10,861px (9.8+) | Single tour | Top bar 75px "CHECK AVAILABILITY / BOOK A FREE CONSULTATION" from about y=1,050 | As above |
| [Zbulo, home](https://zbulo.org/) (small Albania operator) | 6,101 to 6,891px (7.2) | "Upcoming departures" list at y=864; 3-item activity row; 16 review cards, 280px wide, in a horizontal row | None | None |
| [Zbulo, trip page](https://zbulo.org/trip/peaks-of-the-balkans-guided/) | 17,955px (21.3) | Long page; per-date "Book now" | Top tab strip from about y=2,800 including DATES | None |
| [Albania Tour Guide, home](https://albaniatourguide.com/) (Albanian couple) | 22,484 to 26,504px (26.6+) | Vertical stack of every tour, with image, blurb and "BOOK NOW" | WhatsApp icon 50px at bottom left from y=0; app promo 207px | `wa.me/message/C5PZ7NR4GSK3K1`, no per-tour text |
| [Elite Travel, home](https://elitetravel.al/) (Albanian-language agency) | 19,672px (23.3) | Long vertical category stacks | Scroll-to-top only; the 60px floating button is not WhatsApp | `wa.me/355692044656?text=` with an empty pre-fill, labelled "Na kontaktoni tani!" |
| [Outdoor Albania, home](https://www.outdooralbania.com/) | 6,291px (7.5) | Vertical | None | None found |
| [Albanian Trip, home](https://www.albaniantrip.com/) | 6,867px (8.1) | Vertical | None | Email link, no phone link found |

Exodus's own home page measured 8,303px [Observed](https://www.exodus.co.uk/).

**Patterns across the sites [Observed]**
- Median home page height among the 10 operator and tourism home pages measured is about 9,660px (6,101 to 22,484). The current Roundtrip page, at 17,250px, sits with the small operators at the long end rather than with the premium group ([Black Tomato](https://www.blacktomato.com/) 9,681px, [MBA](https://www.muchbetteradventures.com/) 9,647px).
- Detail pages run longer than home pages (5,282 to 21,430px), and every long one adds a sticky jump or section nav. Examples: [MBA trip](https://www.muchbetteradventures.com/products/10730-adventures-hike-albania-coastal-trail/), [Intrepid trip](https://www.intrepidtravel.com/en/albania/albania-adventure-174335), [Zbulo trip](https://zbulo.org/trip/peaks-of-the-balkans-guided/).
- Route maps are used as the visual identity of a trip. Intrepid leads each card with one ([Intrepid hub](https://www.intrepidtravel.com/en/albania); screenshot `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/travel/shots/intrepid-y1800.png`), and [MBA](https://www.muchbetteradventures.com/products/10730-adventures-hike-albania-coastal-trail/) opens the itinerary with an interactive map (`/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/travel/shots/mba-trip-y2200.png`).
- Filters appear only where there is a real choice to narrow. [MBA](https://www.muchbetteradventures.com/explore/albania/) uses activity pills with counts for its Albania trips; [Exodus](https://www.exodus.co.uk/destinations/europe-holidays/albania-holidays) offers Filter and Show More. Black Tomato's tabs organise [by traveller and month](https://www.blacktomato.com/) rather than by place (`/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/travel/shots/blacktomato2-1.png`).
- Full-height vertical tiles are the cost-heavy version of the vertical pattern. [Balkan Trails](https://www.balkantrails.com/) spends about 440px per country (`/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/travel/shots/balkantrails-y1190.png`), and [Albania Tour Guide](https://albaniatourguide.com/) repeats a full image, blurb and button per tour (`/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/travel/shots/albaniatourguide-y4050.png`). Both match Roundtrip's current problem.
- Airbnb's card width leaves an obvious peek at 390px wide ([Rome page](https://www.airbnb.com/rome-italy/things-to-do); `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/travel/shots/airbnb-rome-1.png`). Slovenia.info's carousel shows a narrower peek plus an arrow ([Slovenia.info](https://www.slovenia.info/en); `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/travel/shots/slovenia3-y1800.png`).

**Research on the pattern**
- Baymard's testing favours static content sections reached by normal vertical scrolling, especially on mobile, because users scroll naturally — [Baymard, 2019, updated April 2025](https://baymard.com/blog/homepage-carousel) [Independent].
- For in-page content on mobile, Baymard recommends expanded sections on shorter pages and collapsed sections on longer ones, and calls horizontal tabs unsuitable for in-page navigation on mobile, limiting them to about 2 or 3 options for subsections — [Baymard, 2018, updated July 2026](https://baymard.com/blog/avoid-horizontal-tabs) [Independent].
- NN/g calls accordions one of the most useful elements on mobile, acting as a mini table of contents, and warns about disorientation when an opened item jumps to the top, and about expanding the first item by default because it hides the overview. Sticky headings on open items made them much more usable — [NN/g, 2015](https://www.nngroup.com/articles/mobile-accordions/) [Independent, older].

### Inferences
- **Recommended destination pattern: a static 2-column grid of 8 tiles.** At about 170px wide and 200 to 220px tall, 4 rows plus a heading takes roughly 1.1 to 1.3 screens instead of the current 7 or so. This is my arithmetic, not a measurement of a built design.
- Group the 8 tiles geographically if the set allows it, such as north, centre and south. A small route map or strip above the grid would borrow Intrepid's device without adding interaction. The route map should stay an image, not an interactive map, on a single-page site.
- Reserve horizontal swipe rows for testimonials or photos, as Zbulo does with reviews. Nothing that is the only path to a destination or service should sit in one.
- Services (private, shared, transfers, group trips) suit a short accordion or four compact rows, since there are few items and visitors need one of them, not all. Keep all collapsed on load so the overview stays visible, per NN/g.
- Keep the pinned cinematic destinations sequence as desktop only, which `src/sections/destinations.js` already does. On phones, the job of this section is choosing a place and reaching Eugen, not a set piece.

### Gaps
- Black Tomato has no working Albania URL at the path tried, so I inspected its home page only. No phone-specific evidence compares a 2-column grid with a peeking carousel on a travel site; I found no such study.
- [Airbnb Experiences for Tirana](https://www.airbnb.com/s/Tirana--Albania/experiences) returned "No exact matches", so I substituted Rome.
- Visit Portugal reported a fixed document height of exactly 3,000px even after refusing cookies, so its height is not trustworthy. Its layout was visible in screenshots such as `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/travel/shots/visitportugal3-1.png`. Slovenia.info is the better national tourism reference.
- Several sites use transform-based sliders that my overflow detector cannot count, so "horizontal scroller" counts are floors. Intrepid and Slovenia.info both have more slider markup than the counts in the table suggest.
- [Go2Albania](https://www.go2albania.com/) is a parked domain and two other candidate operator domains did not resolve. A small Albanian operator using WhatsApp as its main action on a well-built mobile site was not found.

## Do they use a sticky bottom CTA or floating WhatsApp button, how is it worded, when does it appear, and how do they establish trust on a phone?

### Takeaway
Every premium trip page inspected has a sticky booking bar (bottom at Intrepid, Exodus and Airbnb, top at MBA), and the operators word it as a low-commitment next step ("Dates and prices", "Jump to Dates"), not "Book now". None of the premium sites makes WhatsApp the main action, and none of the sites inspected uses a per-destination pre-filled message. So Roundtrip's approach would be ahead of the field, but there is no strong precedent to copy. Trust on phones comes from per-item ratings with counts, a visible price, a named real person, and specific guarantees.

### Cited Findings

**Sticky elements and wording [Observed]**
- [Intrepid trip page](https://www.intrepidtravel.com/en/albania/albania-adventure-174335): a rounded button with gutters reading "Dates and prices / From USD $2,495", with a separate chat circle beside it, from the first screen (`/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/travel/shots/intrepid-trip-1.png`).
- [Exodus trip page](https://www.exodus.co.uk/trips/albania-holidays/culture/discover-north-albania-kosovo/ati): the closest analogue to a "two channel" bar, showing "8 Days Excluding Flights, £1,748", an outlined phone number button, and a filled "DATES & PRICES" button (`/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/travel/shots/exodus-trip-1.png`). At 129px it takes about 15% of the screen.
- [Airbnb Rome page](https://www.airbnb.com/rome-italy/things-to-do): "Start your search" appears after about 700px of scrolling, once past the hero. The bar on [Experience detail](https://www.airbnb.com/experiences/7343073?adults=1&children=0&infants=0) pages is there from load.
- [Slovenia.info](https://www.slovenia.info/en) appears after about 700px with a four-item bar led by "Ask Alma", so scroll-triggered appearance is not confined to booking sites.
- [MBA](https://www.muchbetteradventures.com/products/10730-adventures-hike-albania-coastal-trail/) and [Balkan Trails](https://www.balkantrails.com/tour/albania-at-a-glance/) put the sticky action at the top rather than the bottom: "Jump to / Dates" and "CHECK AVAILABILITY / BOOK A FREE CONSULTATION".
- [Black Tomato](https://www.blacktomato.com/) uses "PLAN MY TRIP" in the hero at y=470 and "GET IN TOUCH" at y=1,561 and 8,536, with no sticky bar. Its next prompt comes about 1,100px after the hero one, compared with about 10,000px on Roundtrip.
- Hubs and home pages at Intrepid, Exodus and MBA carry only a chat bubble. The sticky booking bar appears once a visitor is on a specific product.
- Exodus shows different phone numbers on different pages: 020 3733 2877 on the [hub](https://www.exodus.co.uk/destinations/europe-holidays/albania-holidays), and 0203 811 5127 and 020 3733 5948 on a [trip page](https://www.exodus.co.uk/trips/albania-holidays/culture/discover-north-albania-kosovo/ati). I read that as call tracking by page, but that is my inference, not something the site states.

**WhatsApp specifically [Observed]**
- [MBA](https://www.muchbetteradventures.com/) is the only premium site with a WhatsApp link: "Chat on WhatsApp" in the footer to `wa.me/447700151502`, with no pre-filled text.
- [Albania Tour Guide](https://albaniatourguide.com/) has a floating WhatsApp icon at bottom left from page load, using a WordPress click-to-chat plugin (`ht-ctc`), and a `wa.me/message/…` short link beside the printed number.
- [Elite Travel](https://elitetravel.al/) links `wa.me/355692044656?text=` with an empty pre-fill.
- [Balkan Trails](https://www.balkantrails.com/) only mentions WhatsApp availability as footer text.
- [Zbulo](https://zbulo.org/), [Outdoor Albania](https://www.outdooralbania.com/) and [Albanian Trip](https://www.albaniantrip.com/) have no WhatsApp link I could find.

**Anti-patterns [Observed]**
- [Albania Tour Guide](https://albaniatourguide.com/): an app-download slide-in overlaps the "BOOK NOW" button and competes with the WhatsApp icon (`/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/travel/shots/albaniatourguide-y4050.png`).
- [Black Tomato](https://www.blacktomato.com/): a newsletter form covers about 30% of the screen until closed.
- [MBA](https://www.muchbetteradventures.com/explore/albania/): a full-screen £100 newsletter pop-up lands mid-scroll (`/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/travel/shots/mba-albania-1.png`).
- [Exodus trip page](https://www.exodus.co.uk/trips/albania-holidays/culture/discover-north-albania-kosovo/ati): three overlapping floating layers (tabs, chat widget, bottom bar).

**Trust signals on phones [Observed]**
- Per-item rating with a count on the card itself: [Exodus](https://www.exodus.co.uk/destinations/europe-holidays/albania-holidays) "4.7 (109 reviews)" (`/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/travel/shots/exodus-albania-y3000.png`), [Intrepid](https://www.intrepidtravel.com/en/albania) "4.8 (60)", [Airbnb](https://www.airbnb.com/rome-italy/things-to-do) "4.89 (2901)".
- Third-party rating strips: Trustpilot on [Intrepid](https://www.intrepidtravel.com/en/albania/albania-adventure-174335) ("Excellent 4.4 out of 5"), Tripadvisor on [Albania Tour Guide](https://albaniatourguide.com/) ("Our TripAdvisor Reviews"), both on [Balkan Trails](https://www.balkantrails.com/albania-tours/).
- Visible prices: "from" prices on cards at [Exodus](https://www.exodus.co.uk/destinations/europe-holidays/albania-holidays), [Intrepid](https://www.intrepidtravel.com/en/albania) and [MBA](https://www.muchbetteradventures.com/explore/albania/). Albania operators [Outdoor Albania](https://www.outdooralbania.com/) and [Albania Tour Guide](https://albaniatourguide.com/) showed no price detected on the home page.
- A real face at the point of contact: Exodus's "Let's talk" box pairs a staff photo with a phone number, next to the call to action (`/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/travel/shots/exodus-trip-1.png`). Airbnb has an "About me" host section. Balkan Trails has a "Who you're talking to" item on its [Albania page](https://www.balkantrails.com/albania-tours/).
- Specific guarantees: MBA's "Trip Swap Guarantee: Cancel or switch most trips up to 65 days before departure" and "Book with Confidence" ([MBA](https://www.muchbetteradventures.com/)); Black Tomato's "No-obligation quotes" and "No planning fees" ([Black Tomato](https://www.blacktomato.com/)).
- Licences: ATOL and ABTA text on [Exodus](https://www.exodus.co.uk/destinations/europe-holidays/albania-holidays), ATOL on [Black Tomato](https://www.blacktomato.com/). I did not measure where these sit on the page.
- Small operator with outsized credibility: [Zbulo](https://zbulo.org/) places a "Featured by" logo wall directly under the hero (Lonely Planet, National Geographic, BBC, FT) (`/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/travel/shots/zbulo-0.png`), then named reviews tied to a specific trip ("Sean, 8-day guided Albanian Coastal Trail"; `/private/tmp/claude-501/-Users-devi-WebstormProjects-roundtrip-albania/d42cb0eb-18dd-465d-acaf-e8a078f60786/scratchpad/travel/shots/zbulo-1.png`).

**Research on trust**
- Live chat raised purchase probability more for sellers with less feedback, in Alibaba tablet data from March to June 2013 ([Tan, Wang and Tan, Information Systems Research, 2019, as reported by Phys.org](https://phys.org/news/2020-01-chats-sales.amp)) [Independent, not tourism]. This suggests a small operator benefits more from direct contact than a big brand does.
- Ipsos research for Tripadvisor (about 23,000 respondents, 12 markets) found 72% always or frequently read reviews before deciding, and one in five travellers read more than 11 reviews for attractions — [Tripadvisor release summaries](https://ir.tripadvisor.com/node/16851) [Platform, commissioned, older; read via search summary, date not confirmed].

### Inferences
- **Wording for the bar:** lead with intent rather than commitment, such as "Plan on WhatsApp" or "Ask Eugen on WhatsApp", matching the low-commitment labels above. Suggested drafts: IT "Scrivi a Eugen su WhatsApp", SQ "Na shkruani në WhatsApp". The Italian and Albanian text needs Eugen's review, in line with the existing project decision. Using his name adds a person to the action, which none of the sites inspected do.
- **Layout:** a bottom bar about 60 to 64px tall with a WhatsApp button taking most of the width and a smaller phone icon button, modelled on Exodus's two-channel bar but about half its height. Inset it with gutters rather than edge to edge, per Baymard's guidance in the next section.
- **Timing:** show it once the hero's own WhatsApp button has scrolled out of view, the pattern used by Airbnb's listing page and CRE's test. Roundtrip's visitor is on a single page, so the 700px threshold is more relevant than the trip-page approach of showing it from load. Hide it when the final contact section is on screen so two identical actions never stack.
- **Keep the bar singular:** no newsletter pop-ups, app promos or chat bubbles alongside it. The anti-patterns above all come from competing bottom-of-screen layers.
- **Trust, in order of cost for a small operator:** rating and count with source (only if real and linkable, such as Google or Tripadvisor); Eugen's photo and name next to the contact block; one indicative "from" price per service if he is willing; a licence or registration line only if one exists. Do not invent or imply any of these. The project has no review count or licence data I could verify.
- A reassurance line under the contact block, such as languages spoken and typical reply window, would address the main worry about messaging a stranger. It must reflect what Eugen actually does.

### Gaps
- I did not click any chat widget, so I do not know whether the Exodus, Intrepid or Balkan Trails widgets offer WhatsApp inside them. Balkan Trails's Bit Assist widget loads in an iframe, which I did not open.
- Whether Albania Tour Guide's floating button pre-fills a message is unknown, because the plugin sets the destination by script and I did not click it.
- Trust signal placement is observed practice. I found no controlled test on faces of guides for tour sites.
- I found no evidence of how Italian travellers specifically respond to these patterns.

## What does usability evidence say about horizontal carousels on phones?

### Takeaway
The evidence consistently says that horizontal content is seen less than vertical content. Peeking cards are the strongest cue that more exists, dots are weak, auto-rotation should be avoided, and about five items is the practical ceiling. Eight destinations exceed that limit, which argues against a carousel as the main path. I found no published numbers on what share of phone users see each position.

### Cited Findings
- The article's three traditional cues are dots or lines, arrows, and the illusion of continuity. It rates cut-off content as a strong cue, and dots as weak because they are small and easy to miss. Zara's carousel, which had no cues, went unnoticed by users who scrolled past it — [NN/g, Budiu, August 2018](https://www.nngroup.com/articles/mobile-carousels/) [Independent, though the article reports no sample or method].
- The last item should be reachable in 3 to 4 swipes or taps, and carousels with many items should switch to a list view with direct access. Multiple items per page extend this limit. Critical content needs another path — [NN/g, 2018](https://www.nngroup.com/articles/mobile-carousels/) [Independent].
- Keep carousels to about five frames, since swiping through many on mobile is tedious. Show how many frames exist and which is current, and do not rely on tiny dots. Avoid auto-forwarding on mobile. Many people scroll past carousels or see only the first frame, so important information should also appear elsewhere — [NN/g, 2013, last reviewed August 2026](https://www.nngroup.com/articles/designing-effective-carousels/) [Independent].
- Autorotation should be avoided on mobile sites because users cannot pause, and slides can change as they tap. Support swipe. Slide indicators are not noticed by some users. At Staples, three dots were the only way to advance, so users missed promotions — [Baymard, 2019, updated 2025](https://baymard.com/blog/homepage-carousel) [Independent].
- 46% of desktop and mobile sites with a homepage carousel have usability issues — [Baymard](https://baymard.com/blog/homepage-carousel) [Independent]. A staging mirror of the same article gives a different figure ([41% largely free of issues](https://marketing-site-f2tmuig6e-baymard.vercel.app/blog/homepage-carousel)), so use the live page.
- Assume only the first slide gets seen, as testers usually left or scrolled past before the carousel cycled — [Baymard authors in Smashing Magazine, 2016](https://smashingmagazine.com/2016/07/ten-requirements-for-making-home-page-carousels-work-for-end-users) [Independent, older; via search summary].
- Inline scroll areas should be "approached cautiously on mobile sites, or avoided altogether", because of scroll hijacking and sensitive scrollbars, although mobile issues were less serious than on desktop. A short horizontal swatch row performed well for mobile users — [Baymard, August 2023](https://baymard.com/blog/mobile-interactive-color-swatches) [Independent]. So horizontal rows are not banned outright: short, low-stakes rows work.
- Live practice on indicators [Observed]: [Intrepid](https://www.intrepidtravel.com/en/albania/albania-adventure-174335) uses a "1 of 7" counter, [Exodus](https://www.exodus.co.uk/trips/albania-holidays/culture/discover-north-albania-kosovo/ati) uses dots, arrows and peek together, [MBA](https://www.muchbetteradventures.com/explore/albania/) uses a dots pill with an arrow, and [Airbnb](https://www.airbnb.com/rome-italy/things-to-do) uses peek alone. Peek is the common element.

### Inferences
- With 8 destinations, a 1-card-per-view carousel needs 7 swipes, about twice NN/g's 3-to-4 goal. Airbnb-style cards at about 1.7 per view still need around 4 viewport-widths of swiping, and 6 or more swipes if snapping card by card.
- If a carousel is kept for the desktop-to-mobile visual idea anyway: peek at least 15 to 25% of the next card, no auto-rotation, a numeric "3 / 8" counter rather than dots, a side gutter so the swipe does not collide with Safari's edge-swipe Back (which NN/g mentions), and a visible "See all 8" route to a list.
- The peek percentage is taken from what Airbnb and Slovenia.info do, not from a published threshold.
- A testimonial row of 3 to 5 items is a reasonable use of a swipe row, since a missed testimonial costs little.

### Gaps
- No current NN/g or Baymard figure for the percentage of phone users who see item 2, 3 or later, or for horizontal tile rows specifically. Their published material is qualitative here, and part of Baymard's research is paywalled.
- No head-to-head test of dots against counters found. The advice for counters is inferred from NN/g's "indicate how many frames" guidance.
- An often-repeated Baymard figure, 27% of users overlooking horizontal tab content against 8% for collapsed sections, appeared in a [staging mirror](https://marketing-site-f2tmuig6e-baymard.vercel.app/blog/avoid-horizontal-tabs) snippet but is not in the [current live article](https://baymard.com/blog/avoid-horizontal-tabs). Do not cite it. That study was also about product detail tabs, not carousels.

## What evidence exists on sticky mobile CTAs and click-to-chat or WhatsApp buttons affecting enquiries?

### Takeaway
Sticky mobile CTAs have consistently positive but low-grade evidence: vendor case studies, mostly e-commerce, with small to moderate lifts and at least one revenue warning. For WhatsApp buttons, I found no controlled test at all. The best adjacent evidence is peer-reviewed work on live chat in e-commerce, which suggests direct contact helps purchases, especially for sellers with less reputation. Treat all WhatsApp uplift numbers as unproven, and measure directly.

### Cited Findings

**Sticky CTAs**
- A bottom-of-screen sticky button tested on a long-copy e-commerce product page, appearing after the user scrolled past the sales form: every variation beat control by at least 8%, and "Start Your Risk-Free Trial" won with +25% sales and +22% revenue per visitor. "Choose Size & Color" got the most clicks but fewer sales. No sample size, duration or significance is reported — [Conversion Rate Experts win report](https://conversion-rate-experts.com/sticky-cta-win-report/) [Vendor, one client].
- Sticky footer on mobile sales page against no sticky: +10% add-to-cart clicks and +9% order conversion at a stated 95% confidence, no sample size or duration — [Zipify, founder's own store](https://zipify.com/mobile-sticky-button-split-test-results/) [Vendor, selling this feature].
- Moving a sticky CTA to the bottom of the screen gave mobile conversion +8% but mobile revenue per visitor -18%, and the device-level results were not significant — [Blend Commerce](https://blendcommerce.com/blogs/ab-tests-shopify/better-placed-sticky-add-to-cart-product-page-conversion) [Vendor]. This is the useful counter-example, and it was bundled with desktop swatch changes.
- [Convertica](https://convertica.org/ecommerce-case-study-sticky-cta/) reports +252.9% order completion from a mobile sticky CTA at 98% confidence [Vendor, via search summary]. That is implausibly large and should be ignored as an effect size.
- Baymard says that if a sticky Add to Cart is used, it should be surrounded by white space and should not span the full screen width, and warns that competing calls to action distract users — [Baymard best practices, 2021, updated June 2026](https://baymard.com/blog/ecommerce-ux-best-practices) [Independent, one guideline].
- I found no Baymard or NN/g study testing sticky bars on mobile directly, and no travel or tour-specific sticky test.

**Click-to-chat and live chat**
- Live chat raised purchase probability by 15.9% for Apple and Samsung tablets on Alibaba (March to June 2013), with larger gains for sellers with less feedback — [Tan, Wang and Tan, Information Systems Research, 2019, reported by Phys.org](https://phys.org/news/2020-01-chats-sales.amp) [Independent, observational, not tourism]. I read only the summary, which does not describe how causality was established.
- Live chat has a positive effect on conversion, dependent on seller and product characteristics — [Sun, Chen and Fan, Production and Operations Management, 2021](https://econpapers.repec.org/RePEc:bla:popmgt:v:30:y:2021:i:5:p:1201-1219) [Independent, marketplace data]. Two search summaries described the moderators differently, so I do not repeat them here.
- A web agency claims WhatsApp click-to-chat produced 4 to 6 times more enquiries than a contact form across 18 Indian client sites, with no method published — [Prateeksha](https://prateeksha.com/blog/whatsapp-vs-contact-forms-enquiries-indian-business) [Vendor, unverifiable].
- Searches on this topic were dominated by vendor blogs such as [Wati](https://www.wati.io/blog/whatsapp-lead-generation) and [Infobip](https://www.infobip.com/blog/whatsapp-lead-generation). Uplift figures surfaced in those results (cost per lead, appointment completion) disclosed no sample or method, so I have not repeated them as evidence [Vendor].
- A Kantar study for Meta reported 66% of adults globally message a business at least weekly, with India at 86% — [Business Standard, 2022](https://business-standard.com/article/technology/over-7-in-10-indians-now-prefer-to-chat-with-businesses-meta-report-122100700432_1.html) [Platform, commissioned, via search summary].
- A search specifically for floating WhatsApp button A/B tests returned only plugin pages and marketing copy, such as [Webfactory](https://www.webfactory.co.uk/updates-articles/new-feature-floating-whatsapp-contact-button) [Vendor, no data].

### Inferences
- The case for a sticky bar is logical as much as statistical. Roundtrip's visitors currently scroll about 10,000px with no way to act, and the sticky bar removes this gap. CRE's control had the same problem (no CTA once scrolled), which is the closest match in structure.
- The most transferable finding from these tests may be that clicks and outcomes diverge, as with "Choose Size & Color" and Blend's revenue drop. A flood of low-intent WhatsApp taps would cost Eugen time, so track real conversations, not just taps.
- The Tan et al. moderator suggests a small, low-profile seller benefits most from direct conversation. It is only suggestive, because it concerns tablets on a marketplace.
- **Simple measurement plan needing no backend:** a click event for each WhatsApp and phone link by location and destination, if analytics is present, plus Eugen keeping a weekly tally of new chats by the destination named in the pre-filled text and which became bookings. Compare 4 weeks before and after, and treat it as a rough comparison given small numbers and seasonality.

### Gaps
- No independent or platform A/B test of a WhatsApp button on a website, in any sector, was found. No tour-operator test of any kind was found.
- Full texts of Tan et al. and Sun et al. were not read, so identification strategy and effect sizes other than the 15.9% were not checked.
- No Italy-specific data on preferring to message businesses over calling was found. A [Digitec Galaxus survey](https://galaxus.ch/en/page/everybody-hates-voice-messages--right-29999) about personal contacts is not a substitute.

## What is known about mobile share of travel browsing and about speed or page length effects?

### Takeaway
Phones are the majority of travel browsing and, at Booking Holdings, the majority of room nights. Desktop still tends to convert better, and the latest public tour figure (2022) put mobile at two in five online bookings. Tour buyers commit late, often within a week, so phone-first enquiry fits how they behave. Speed has a real but imprecisely measured effect. There is no evidence for an ideal page length, though attention drops sharply as pages get longer.

### Cited Findings

**Mobile share**
- Booking Holdings: "The mix of our room nights booked on our mobile apps in 2025 was a mid-fifties percentage", up from low fifties in 2024 — [Form 10-K FY2025](https://www.sec.gov/Archives/edgar/data/1075531/000107553126000009/bkng-20251231.htm) [Platform, audited filing]. This counts apps only and hotels mainly, so mobile web would be additional.
- Two in five tour and activity online bookings were on mobile, and over half for attractions — [Arival operator surveys, November 2022](https://arival.travel/tag/tour-sales/) [Platform, older]. This is the most relevant direct figure I found for tours, and it is four years old.
- Mobile booking is "accelerating" for experiences, with no share given — [Arival and Civitatis 2026 European Outlook press release, May 2026](https://travelprofessionalnews.com/fewer-trips-higher-expectations-new-arival-research-reveals-shift-in-european-traveler-behavior/amp/) [Platform].
- Desktop still leads conversion in travel and hospitality while mobile traffic grows, and year-on-year conversion fell 4.1% on mobile against 8.0% on desktop, with frustration affecting nearly half of visits — [Contentsquare 2026 benchmarks, via its guide, updated February 2026](https://contentsquare.com/guides/travel-hospitality-digital-experience/conversions/) [Platform]. The guide gives no absolute rates or mobile traffic share. [Statista's related chart](https://statista.com/statistics/1350599/conversion-rate-travel-tourism-websites-by-device-worldwide) says mobile had the highest traffic share in 2024, but the values are paywalled.
- Across 23 large travel sites in March to May 2018, average mobile traffic share was 54%, with mobile bookings lagging. eDreams.es had 67% of visits but 36% of bookings on mobile in Q4 2017 — [Similarweb-based analysis](https://traveltechessentialist.substack.com/p/online-travel-metrics-traffic-marketing-channels-mobile-12ae78a84029) [Platform, older, via search summary].
- Phocuswright projected mobile at 47% of European online gross bookings by 2025 — [Phocuswright Europe, 2022](https://www.phocuswrighteurope.com/News/2022/europe-by-the-numbers) [Platform, a projection, read only as a search snippet because the page blocked direct fetch].

**Tour buyer behaviour**
- 70% of Americans and 61% of Europeans booked tours less than seven days ahead, 72% of US travellers booked before arriving, half of tour takers booked at least one private tour in 2024, and tours of six or fewer were the most popular format — [Arival 2025 Tour Taker via TravelPress, July 2025](https://www.travelpress.com/?p=199797) [Platform]. The [full report](https://arival.travel/research/the-2025-tour-taker/) is paywalled ($399), based on 2,400 travellers.
- Arival's later 2026 release says 78% reserve in advance ([May 2026](https://travelprofessionalnews.com/fewer-trips-higher-expectations-new-arival-research-reveals-shift-in-european-traveler-behavior/amp/)). This is compatible with the above, since "in advance" and "within a week" are not exclusive.
- Mobile bookers spent almost 50% more on tours than desktop bookers among US travellers — [Arival, January 2020](https://arival.travel/?p=50921) [Platform, older, no method given, selection likely].

**Speed**
- Google-commissioned study by 55 and Deloitte: 37 brands, over 30 million sessions, 30 days in late 2019. A 0.1s improvement across four metrics on every page went with a 10% improvement in travel booking rates and 2.2% in check-out completion — [web.dev](https://web.dev/case-studies/milliseconds-make-millions) [Platform, commissioned]. Observational, the method is not described, and the metrics used are partly deprecated. Secondary coverage gives [10.1% mobile conversion on 7.4 million travel sessions](https://www.mediapost.com/publications/article/352986/speed-turns-into-a-performance-metric-per-google.html), which I could read only as a snippet. The [original PDF](https://www2.deloitte.com/content/dam/Deloitte/ie/Documents/Consulting/Milliseconds_Make_Millions_report.pdf) has moved.
- redBus cut Interaction to Next Paint by 72% on its search page, with about a 7% overall sales increase — [web.dev case study](https://web.dev/case-studies/redbus-inp) [Platform, undated, a before and after comparison]. This is the one travel booking example verified on web.dev.
- As load time goes from 1s to 3s, the probability of bounce increases 32%, and 53% of mobile visits leave pages taking over 3s — [Think with Google data page](https://thinkwithgoogle.com/data/page-load-time-statistics) and [AMP blog excerpt](https://blog.amp.dev/2017/02/28/new-industry-benchmarks-for-mobile-page-speed/) [Platform, 2017, old]. Useful for direction only.
- 48% of origins pass Core Web Vitals on mobile in July 2025 CrUX data, up from 44% in 2024 and 36% in 2023, against 56% on desktop — [Web Almanac 2025](https://almanac.httparchive.org/en/2025/performance) [Platform, via search summary]. LCP is the weakest metric, reportedly about 62% good on mobile, and home pages do worse than secondary pages (45% against 56%). I read those two figures only in secondary write-ups.

**Page length**
- In a 2018 eyetracking study, 57% of viewing time was above the fold, 74% in the first two screenfuls and 81% in the first three. The top 20% of a page got over 42%. No ideal length is stated, and NN/g recommends testing while warning that very long pages risk losing attention — [NN/g, April 2018](https://www.nngroup.com/articles/scrolling-and-attention/) [Independent]. It used 120 participants on 1920x1080 monitors, so this is desktop data.

### Inferences
- If phone visitors are the majority and desktop still converts better, a likely reason is friction on phone. WhatsApp could remove more of this than a form would, which is why it suits this business, though that is a hypothesis, not a finding.
- Late booking is the strongest behavioural argument for WhatsApp: a traveller already in Albania or arriving soon wants a fast answer, and availability has to be confirmed by a person. It raises the bar on reply speed, since Eugen is the channel.
- At 57%, 17%, and a long tail, even with desktop caveats, a page of 22 screens leaves most content seen by few. A plausible target is 10 to 12 screens, about 8,500 to 10,000px, in line with the premium home pages measured. That target is benchmark-based, not evidence of an optimum.
- Length is not the main issue so much as distance to action. MBA's 25-screen trip page still keeps a route to dates in view for most of its length.
- Roundtrip's stack (GSAP, Lenis, and hotlinked Unsplash images) should be tested with a real phone profile and CrUX or PageSpeed Insights once deployed. I did not measure it. The pinned effects are already desktop only. On phones, keeping the hero image small and preloaded matters more than animation tuning, given LCP's weakness in the Almanac data.

### Gaps
- No primary, current figure for mobile share of traffic or bookings at small tour operators. Booking software companies (FareHarbor, Peek, Rezdy, Bokun) publish no such numbers that I could find.
- The Think with Google data URL now redirects to Google's business site, so I could not retrieve the original sample description. The 2017 figures above come from a Think with Google excerpt reposted by AMP and a search snippet.
- No primary Skift figure from 2023 or later was found; Skift results were from 2015 and 2016 and are not used here.
- No page length study on mobile was found. Every page length conclusion rests on desktop attention data and benchmarks.

## What WhatsApp deep-link practice is recommended?

### Takeaway
Use the official `https://wa.me/<number>?text=<urlencoded>` form with the full international number, and build a distinct pre-filled message per destination and language. The project already has this mechanism in `src/lib/whatsapp.js`, so this is an extension rather than new work. Keep messages short, make them sound like the visitor, and set up the WhatsApp Business greeting and away replies so a one-person channel still responds.

### Cited Findings
- Official format: `https://wa.me/<number>`, with the full international number and no zeroes, brackets, dashes or plus sign. Pre-filled form: `https://wa.me/whatsappphonenumber?text=urlencodedtext` — [WhatsApp Help Center, Click to Chat](https://faq.whatsapp.com/5913398998672934) [Platform, primary].
- The number is `355683392743` for +355 68 339 2743, which is what the project already uses in [`src/lib/whatsapp.js`](/Users/devi/WebstormProjects/roundtrip_albania/src/lib/whatsapp.js) [Observed].
- The same file already generates links for two message keys (`general`, `winter`) by language through `t('wa.<key>', …)` and `encodeURIComponent`, on every `[data-wa]` element [Observed](/Users/devi/WebstormProjects/roundtrip_albania/src/lib/whatsapp.js).
- Use `encodeURIComponent` rather than hand-encoding. The text lands in the input field and is editable, and the link does not send anything — [Unipile guide](https://www.unipile.com/it/?p=275019) [Vendor, consistent with the official format]. It also states `api.whatsapp.com/send?phone=` is not on any current official page, so prefer `wa.me`.
- WhatsApp Business short links: generated automatically, found under Tools > More > Short link, with an optional default message. If the customer has the app, a chat opens; otherwise they see a web page with business details and **Continue to chat** — [WhatsApp Help Center](https://faq.whatsapp.com/502291734918768/?cms_platform=android) [Platform, primary]. Profile pictures show on that page only if shared with everyone.
- Default messages for the QR code have a 140-character limit — [WhatsApp Help Center, QR code default message](https://faq.whatsapp.com/626715729240313/?cms_platform=android) [Platform]. The limit stated is for that feature. I found no documented limit for `?text=` on `wa.me` links.
- WhatsApp Business offers quick replies (up to 50, triggered by typing "/") — [WhatsApp Help Center](https://faq.whatsapp.com/1791149784551042/?cms_platform=android) [Platform, via search summary], and greeting and away messages — [WhatsApp blog](https://blog.whatsapp.com/introducing-the-whats-app-business-app) [Platform].
- WhatsApp reach varies sharply by audience. US: 32% of adults, February to June 2025, n=5,022 — [Pew, November 2025](https://www.pewresearch.org/internet/2025/11/20/americans-social-media-use-2025/) [Independent]. Italy: 89.8% of internet users in Q3 2024 — [Statista](https://statista.com/statistics/1005178/share-population-using-whatsapp-europe) [Platform, via search summary]. UK figures conflict, between about [65% of the population](https://infobip.com/blog/whatsapp-statistics) and [71.3%](https://www.oberlo.com/statistics/who-uses-whatsapp-the-most), because of different bases [Vendor].
- Live examples at their weakest: `wa.me/355692044656?text=` with an empty text on [Elite Travel](https://elitetravel.al/), and a `wa.me/message/…` short link on [Albania Tour Guide](https://albaniatourguide.com/) [Observed]. Neither identifies what the visitor was looking at.

### Inferences
- **Extend `EN` in `whatsapp.js` with one key per destination and service**, with translations under `wa.*` in `src/i18n/it.json` and `src/i18n/sq.json`, then mark each tile or row `data-wa="berat"` and so on. No backend is needed and nothing changes structurally.
- **`wa.me/message/…` short links cannot do this.** They carry one default message set in the app, so per-destination text needs the number form. This is my reading of the Help Center pages.
- **Message template:** a short greeting to Eugen, the place, then the two facts he will ask for anyway. For example:
  - EN: `Hi Eugen! I'm interested in Berat. Dates: … People: …`
  - IT: `Ciao Eugen! Mi interessa Berat. Date: … Persone: …`
  - SQ: `Përshëndetje Eugen! Më intereson Berati. Datat: … Persona: …`
  - Service variants: `I need a transfer from … to … on …` and `We are a group of … people looking for …`
  - The Italian and Albanian drafts need Eugen's review, and the destination name must be inflected properly in Albanian (Berat becomes Berati here), so per-destination strings are safer than a single template with the name dropped in.
- The dates and people prompts should reduce back-and-forth, since group size (6 to 26) drives pricing. This is reasoning from the business, with no test behind it, and placeholder dots may look odd. A sentence-style version is a reasonable alternative.
- `encodeURIComponent` already handles `ë` and `ç` as UTF-8, so Albanian text needs no special handling. An emoji is unnecessary and adds risk for no benefit.
- **The pre-filled text doubles as free attribution.** Eugen can see which destination prompted each chat without any tracking system, which works like Exodus's per-page phone numbers.
- **Keep phone tappable next to WhatsApp**, using `tel:+355683392743`. With only about a third of US adults using WhatsApp, English speakers from the US need it. Note the international call cost in the visitor's mind, which is one more reason WhatsApp is the lead.
- **WhatsApp Business setup:** a trilingual greeting message, an away message that says when he will reply, and quick replies for prices, group sizes and pickup points. This is the "backend" of the conversion flow and needs no code. The project's phone number may need to be a WhatsApp Business account for this; that should be confirmed with Eugen.
- **Desktop:** the action should still work, and showing the phone number or a QR code next to the button there is a sensible fallback. The behaviour of a plain `wa.me` link without the app was not tested, because of the instruction not to open WhatsApp links.

### Gaps
- I did not open any WhatsApp link, per the research constraints, so these were inspected by `href` only, and how each one behaves across iOS, Android and desktop was not tested.
- The maximum `?text=` length is undocumented in the official pages I read.
- No evidence was found on whether pre-filled messages raise send rates compared with a blank chat. It seems likely they lower effort, but this is unmeasured.
- No current figure was found for WhatsApp use in Albania, or among Albanian diaspora travellers.
- Whether the +355 68 339 2743 line is already on WhatsApp Business is not known from the project files.
