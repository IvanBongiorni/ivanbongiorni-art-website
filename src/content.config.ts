import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Each story is a folder: src/content/comics/<story-id>/
//   en.md, it.md  metadata (below) + optional author's note as the body,
//                 one file per language the story is published in
//   cover.jpg     cover image (each language file can point to its own)
//   pages/en/, pages/it/
//                 page images for each language, read in filename order
//                 (01.jpg, 02.jpg, ...). Images directly in pages/ are used by
//                 any language without its own folder (e.g. wordless stories).
// Entry ids are '<story-id>/<lang>'; see storyId() and storyLang() in src/lib/content.ts.
const comics = defineCollection({
  loader: glob({
    base: './src/content/comics',
    pattern: '*/{en,it}.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Publication date, shown on the cards and the story page.
      date: z.coerce.date(),
      // One or two sentences, shown on the cards, the story page and link previews.
      description: z.string().max(280, 'Keep the description to one or two sentences'),
      cover: image(),
      // Only one-shots for now. A serial will add a chapters layer later
      // without changing the /comics/<story-id> URL.
      type: z.enum(['oneshot', 'serial']).default('oneshot'),
      draft: z.boolean().default(false),
    }),
});

// Each artwork is a Markdown file next to its image: src/content/art/<id>.md
const art = defineCollection({
  loader: glob({ base: './src/content/art', pattern: '*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      category: z.enum(['illustration', 'painting', 'photography']),
      image: image(),
      medium: z.string().optional(),
      size: z.string().optional(),
      // Italian title and medium. The English ones are shown when missing.
      it: z.object({ title: z.string().optional(), medium: z.string().optional() }).optional(),
      draft: z.boolean().default(false),
    }),
});

// Work in progress: thumbnails, pencils, inks, unfinished pages. Shown on
// /comics/process/. Each one is a Markdown file next to its image, in
// src/content/process/ (subfolders are fine, e.g. one per story).
const process = defineCollection({
  loader: glob({ base: './src/content/process', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // The day the work was done, so the page keeps a dated record of it.
      date: z.coerce.date(),
      image: image(),
      // Folder name of the story it belongs to (links to the story once it is
      // published), or a working title for a story that isn't on the site yet.
      story: z.string().optional(),
      // Free text, e.g. Thumbnails, Pencils, Inks, Colours.
      stage: z.string().optional(),
      // Italian title and stage. The English ones are shown when missing.
      it: z.object({ title: z.string().optional(), stage: z.string().optional() }).optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { comics, art, process };
