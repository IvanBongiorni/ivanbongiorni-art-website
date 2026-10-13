# ivanbongiorni.art

Static Astro 7 + TypeScript site for Ivan's comics and art. See README.md for the content workflow.

## Decisions (from the "Sito Arte" planning chats)

- Hosting: Cloudflare Pages, built from this repo. No backend, no CMS, no comments, no accounts.
- Domain: ivanbongiorni.art (registered at Porkbun, DNS on Cloudflare); ivanbongiorni.com 301-redirects to it via a Cloudflare Redirect Rule.
- Languages: English (default, at the root) and Italian (under `/it/`, same paths). Astro `i18n` config with `prefixDefaultLocale: false`; UI strings in `src/i18n.ts`; page layouts in `src/views/`, with thin per-language files in `src/pages/` and `src/pages/it/`. A globe switch at the top right links to the same page in the other language. Stories have one `.md` per language (`en.md`, `it.md`) and page images in `pages/<lang>/` (or `pages/` for wordless ones); art and process entries are shared, with optional Italian text under `it:`.
- Comics are the core: home page = latest story + grid of covers. Stories are one-shots for now; the schema has `type: oneshot | serial` so chapters can be added later without changing `/comics/<id>/`.
- Reader: one page at a time on wide screens (≥768px), vertical scroll on phones. Vanilla JS in `src/components/Reader.astro`, no framework.
- Work in progress: `/comics/process/` (a `process` collection) shows dated unfinished pages grouped by story, to show the process and document authorship. A story folder can't be named `process`.
- Art: illustration / painting / photography under `/art/` with category tabs and a PhotoSwipe lightbox.
- Newsletter: Kit (free plan) embedded form, shown at the end of each story and in the footer. RSS at `/rss.xml` can feed Kit's RSS-to-email.
- Blog: deferred. When added, make it a `blog` collection in `src/content.config.ts` plus `/blog` pages and include posts in RSS.
- Only web-sized images (~2000px) in the repo; no print masters. Code is MIT, artwork all rights reserved.

## Development

- Node is installed at `C:\Program Files\nodejs` (may not be on PATH in Git Bash).
- `npm run build` runs `astro check` first; keep it at 0 errors/warnings.
- Docs: https://docs.astro.build (content collections live in `src/content.config.ts`, loaders from `astro/loaders`, `z` from `astro/zod`).
