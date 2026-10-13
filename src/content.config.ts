import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Each story is a folder: src/content/comics/<story-id>/
//   index.md      metadata (below) + optional author's note as the body
//   cover.jpg     cover image
//   pages/        page images, read in filename order (01.jpg, 02.jpg, ...)
const comics = defineCollection({
  loader: glob({
    base: './src/content/comics',
    pattern: '*/index.md',
    generateId: ({ entry }) => entry.split('/')[0],
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
      draft: z.boolean().default(false),
    }),
});

export const collections = { comics, art };
