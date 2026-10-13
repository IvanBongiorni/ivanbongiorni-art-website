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

## Languages

The site is in English and Italian. English is the default, at the root (`/comics/...`);
Italian is the same path under `/it/` (`/it/comics/...`). The flag at the top right of every page
switches to the same page in the other language.

- All interface text (menus, buttons, labels, page descriptions) is in [`src/i18n.ts`](src/i18n.ts), both languages side by side.
- The About page bio is in [`src/views/About.astro`](src/views/About.astro), one paragraph per language.
- Each page's layout lives once in `src/views/`; the files in `src/pages/` and `src/pages/it/` only pick the language.

## Adding a comic story

Create a folder under `src/content/comics/`. The folder name becomes the URL
(`/comics/<folder>/` in English, `/it/comics/<folder>/` in Italian), so use the same folder for both languages.

```
src/content/comics/my-story/
├── en.md          English title, description + optional author's note
├── it.md          Italian title, description + optional author's note
├── cover.jpg
└── pages/
    ├── en/
    │   ├── 01.jpg
    │   ├── 02.jpg
    │   └── ...
    └── it/
        ├── 01.jpg
        ├── 02.jpg
        └── ...
```

`en.md` (and `it.md`, in Italian):

```md
---
title: My Story
date: 2026-11-01
description: One or two sentences that make people want to read it.
cover: ./cover.jpg   # can differ per language, e.g. ./cover-it.jpg if the title is lettered on it
draft: true          # visible in `npm run dev` only; set to false to publish
---

Optional author's note, shown after the last page.
```

- A story appears in a language only if it has that language's `.md` file. A story with only `en.md`
  is English-only; on its page the language switch leads to the Italian home page instead.
- Pages for a wordless story can go directly in `pages/` (no `en/` or `it/`); every language then uses them.
- Pages are read in filename order, so use zero-padded numbers (`01.jpg`, `02.jpg`, ..., `10.jpg`).
- The newest story (by `date`) is featured on the home page.

On wide screens the reader shows one page at a time (arrow keys, buttons, or click the page).
On phones the pages are stacked for vertical scrolling.

## Adding work in progress

Unfinished pages, thumbnails, pencils and inks go on `/comics/process/` (the **Work in progress** tab under Comics).
They are grouped by story, and every image shows the date it was drawn, as a public record of how the work was made.

Put the image and a Markdown file with the same name in `src/content/process/` (subfolders are fine):

```
src/content/process/lighthouse-02-pencils.jpg
src/content/process/lighthouse-02-pencils.md
```

```md
---
title: The Lighthouse, page 2
date: 2026-08-14             # the day you drew it
image: ./lighthouse-02-pencils.jpg
story: the-lighthouse        # story folder name, or a working title for an unpublished story
stage: Pencils               # optional: Thumbnails, Pencils, Inks, ...
it:                          # optional Italian text; the English is shown where it's missing
  title: Il faro, pagina 2
  stage: Matite
---
```

When `story` matches a published story, its heading links to the story, and the story page links back
with "See how this story was drawn". The tab only appears once there is at least one entry.

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
it:                         # optional Italian text; the English is shown where it's missing
  title: Porto al tramonto
  medium: Olio su tela
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

The newsletter wording is in [`src/i18n.ts`](src/i18n.ts). There is one Kit form for both languages.
The RSS feeds are `/rss.xml` (English) and `/it/rss.xml` (Italian).

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
