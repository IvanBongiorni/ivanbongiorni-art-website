# ivanbongiorni.art

Personal website for Ivan Bongiorni's comics, illustrations, paintings and photography.

Built with [Astro](https://astro.build) as a fully static site, hosted on Cloudflare Pages.

## Running locally

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev      # http://localhost:4321, reloads on save, shows drafts
npm run build    # type-check and build the site into dist/
npm run preview  # serve dist/ locally
```

## Adding a comic story

Create a folder under `src/content/comics/`. The folder name becomes the URL (`/comics/<folder>/`).

```
src/content/comics/my-story/
├── index.md       metadata + optional author's note
├── cover.jpg
└── pages/
    ├── 01.jpg
    ├── 02.jpg
    └── ...
```

`index.md`:

```md
---
title: My Story
date: 2026-11-01
description: One or two sentences that make people want to read it.
cover: ./cover.jpg
draft: true        # visible in `npm run dev` only; set to false to publish
---

Optional author's note, shown after the last page.
```

Pages are read in filename order, so use zero-padded numbers (`01.jpg`, `02.jpg`, ..., `10.jpg`).
The newest story (by `date`) is featured on the home page.

On wide screens the reader shows one page at a time (arrow keys, buttons, or click the page).
On phones the pages are stacked for vertical scrolling.

## Adding art

Put the image and a Markdown file with the same name in `src/content/art/`:

```
src/content/art/harbour-at-dusk.jpg
src/content/art/harbour-at-dusk.md
```

```md
---
title: Harbour at Dusk
date: 2026-07-15
category: painting          # illustration | painting | photography
image: ./harbour-at-dusk.jpg
medium: Oil on canvas       # optional
size: 50 × 40 cm            # optional
---
```

## Images

- **Commit web-sized exports only**, about 2000–2500 px on the long edge, as JPEG.
  Never commit print masters or full-resolution scans: anything in a public repo can be downloaded.
- Astro generates the smaller sizes and modern formats (AVIF, WebP) at build time.
- If the image collection ever grows past roughly 1 GB, move it to Cloudflare R2.

## Settings

Edit [`src/site.config.ts`](src/site.config.ts) to set:

- your social links (Instagram, Reddit, Flickr, ...); empty links are hidden
- the contact email on the About page
- the Kit newsletter form ID; the signup box stays hidden until it's set

## Deployment (Cloudflare Pages)

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick this repo.
2. Framework preset **Astro**, build command `npm run build`, output directory `dist`.
3. Every push to `main` deploys the site. Pull requests get preview URLs.

### Domains

- `ivanbongiorni.art` is registered at Porkbun, with its nameservers pointed to Cloudflare.
  Add it to the Pages project under Custom domains.
- `ivanbongiorni.com` redirects to `.art` with a Cloudflare **Redirect Rule** on the `.com` zone:
  a 301 to `https://ivanbongiorni.art${path}` that preserves the path and query string.
  The `.com` needs a proxied DNS record (for example `A @ 192.0.2.1`, orange cloud) so the rule can run.

## License

The source code is MIT-licensed. The artwork (everything under `src/content/`) is
© Ivan Bongiorni, all rights reserved. See [LICENSE](LICENSE).
