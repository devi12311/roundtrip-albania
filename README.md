# Roundtrip Albania

One-page site for Roundtrip Albania (tours, transfers and group trips by Eugen).
Visual system: `DESIGN.md`. Scroll/section structure modelled on zipline.com.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # static output in dist/ — deploy anywhere (Netlify, Vercel, GitHub Pages)
```

## Current photos (Unsplash, temporary)

The page currently loads free photos straight from Unsplash (Unsplash License: free for
commercial use, credit appreciated but not required). They are stand-ins: replace them with
Eugen's own photos when available by pointing each `src` in `index.html` at `/media/<slot>.jpg`.

| Slot | Photo by |
|---|---|
| `hero` | [Marie Volkert](https://unsplash.com/photos/GZgsF08zv6w) |
| `services-private` | [Michal Lauko](https://unsplash.com/photos/dT0IQbbDrDM) |
| `services-transfer` | [Kendal Percimoney](https://unsplash.com/photos/TF4xMZdbQ24) |
| `services-group` | [Justin Buisson](https://unsplash.com/photos/vIluu0IH6Ps) |
| `services-fees` | [B](https://unsplash.com/photos/YOM5F7yAzrk) |
| `testimonial` | [David Ramos](https://unsplash.com/photos/MPsXIyIBYoE) |
| `dest-1` | [Konpasu.de](https://unsplash.com/photos/3q-xGdVLcGA) |
| `dest-2` | [Nicolas Meunier](https://unsplash.com/photos/7_17g5Hl-uU) |
| `dest-3` | [Sebastian Kohlhauer](https://unsplash.com/photos/Rl79H9QRwtY) |
| `dest-4` | [Faruk Kaymak](https://unsplash.com/photos/b_e5K7B3MzQ) |
| `dest-5` | [Adventure Albania](https://unsplash.com/photos/JVCWo6OQPvE) |
| `dest-6` | [Daniel J. Schwarz](https://unsplash.com/photos/jd5KhMiQ5qo) |
| `dest-7` | [Adventure Albania](https://unsplash.com/photos/AbsjrzECfaE) |
| `dest-8` | [Adventure Albania](https://unsplash.com/photos/YVSPgQV7bsI) |
| `winter-hero` | [Alexander](https://unsplash.com/photos/YjbngkYFS9Q) |
| `winter-kolasin` | [Naida](https://unsplash.com/photos/zF97ZlexqWc) |
| `winter-brezovica` | [Patrick Robert Doyle](https://unsplash.com/photos/svS24gSgqRs) |
| `winter-mavrovo` | [juve ntus](https://unsplash.com/photos/pem8N1QvMxg) |
| `offer-1` | [K8](https://unsplash.com/photos/uyNnfSXKfic) |
| `offer-2` | [Nicolas Meunier](https://unsplash.com/photos/LFJd2KnfRRA) |
| `offer-3` | [Vitali Adutskevich](https://unsplash.com/photos/rY4XHjhGRww) |
| `offer-4` | [Steve A Johnson](https://unsplash.com/photos/N-MqWXXZvNY) |
| `offer-5` | [Drini Teta](https://unsplash.com/photos/0r67VZp41vw) |
| `about` | [Adventure Albania](https://unsplash.com/photos/B2s-_MbHWf8) |
| `footer` | [Arina Wong](https://unsplash.com/photos/GNE9bfYY1hw) |

## Adding photos & videos

Drop files into `public/media/` with exactly these names. Until a file exists, its
slot shows a labelled grey placeholder.

| File | Where | Suggested size |
|---|---|---|
| `hero.mp4` + `hero.jpg` (poster) | Hero | 1920×1080, 10–15 s, ≤ 8 MB, no audio |
| `services-private.jpg` | Journey token + chapter 1 | 1400×1400 |
| `services-transfer.jpg`, `services-group.jpg`, `services-fees.jpg` | Chapters 2–4 (group also used in stats) | 1400×1400 |
| `testimonial.jpg` | Testimonial (person on the left, calm area on the right) | 1920×1080 |
| `dest-1.jpg` … `dest-8.jpg` | Destinations, in order: Berat, Krujë, Valbona, Ulcinj/Kotor/Budva, Theth, Boga/Pejë, Drilon/Pogradec/Korçë, Përmet/Gjirokastër | portrait 900×1500 |
| `winter-hero.mp4` + `winter-hero.jpg` | Winter banner | 1920×1080 |
| `winter-kolasin.jpg`, `winter-brezovica.jpg`, `winter-mavrovo.jpg` | Winter cards | 1000×1250 |
| `offer-1.jpg` … `offer-5.jpg` | "What we offer" (pick-up, guides, vehicles, water & snack, fees) | 1600×1000 |
| `about.jpg` | Small inline photo in the About statement (e.g. Eugen) | 600×320 |
| `footer.jpg` | Footer (sky + people works best) | 1920×1200 |
| `og.jpg` | Link preview image | 1200×630 |

Export JPGs at ~80% quality (or WebP and update the paths). Keep videos short and muted.

## Editing text

- English copy lives directly in `index.html`.
- Italian and Albanian are in `src/i18n/it.json` and `src/i18n/sq.json`, keyed by the
  `data-i18n` attributes. **These are drafts and need a native-speaker review.**
- WhatsApp pre-filled messages: `src/lib/whatsapp.js` (EN) and the `wa.*` keys in the JSON files.

## Still needed from Eugen

- Real guest review(s) for the testimonial (currently uses the company slogan).
- Logo as SVG (the mountain mark in the header is a stand-in).
- Social media links and an email address, if any.
- Confirmation of the destination descriptions.

## Structure

- `src/main.js`: boots i18n, WhatsApp links, Lenis smooth scroll and the section animations.
- `src/sections/*.js`: one module per animated section (GSAP + ScrollTrigger).
- `src/styles/tokens.css`: tokens copied from `DESIGN.md`.
- Pinned/scrubbed layouts only run on screens ≥ 900px with motion allowed. Phones and
  `prefers-reduced-motion` get a static stacked layout.
