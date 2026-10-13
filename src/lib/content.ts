import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { ART_CATEGORIES, type ArtCategory } from '../site.config';
import { DEFAULT_LANG, STRINGS, type Lang } from '../i18n';

export type Story = CollectionEntry<'comics'>;
export type Artwork = CollectionEntry<'art'>;
export type ProcessItem = CollectionEntry<'process'>;

// Drafts show up in `npm run dev` but are left out of the published site.
const published = ({ data }: { data: { draft: boolean } }) => import.meta.env.DEV || !data.draft;

const newestFirst = <T extends { data: { date: Date } }>(a: T, b: T) =>
  b.data.date.getTime() - a.data.date.getTime();

// Story entry ids are '<story-id>/<lang>': the folder name, used in the URL, and the language.
export const storyId = (story: Story) => story.id.split('/')[0];
export const storyLang = (story: Story) => story.id.split('/')[1] as Lang;

// Stories in one language, or in every language when lang is left out.
export async function getStories(lang?: Lang): Promise<Story[]> {
  const all = await getCollection('comics', published);
  return all.filter((s) => !lang || storyLang(s) === lang).sort(newestFirst);
}

export async function storyPaths(lang: Lang) {
  const stories = await getStories(lang);
  if (stories.some((s) => storyId(s) === 'process')) {
    throw new Error('A story folder can\'t be named "process": /comics/process/ is the work-in-progress page.');
  }
  return stories.map((story) => ({ params: { id: storyId(story) }, props: { story, stories } }));
}

export async function getArtworks(category?: ArtCategory): Promise<Artwork[]> {
  const all = await getCollection('art', published);
  return all.filter((a) => !category || a.data.category === category).sort(newestFirst);
}

// /art/ shows everything, /art/<category>/ one category.
export function artPaths() {
  return [undefined, ...ART_CATEGORIES].map((category) => ({ params: { category } }));
}

export async function getProcess(storyId?: string): Promise<ProcessItem[]> {
  const all = await getCollection('process', published);
  return all.filter((p) => !storyId || p.data.story === storyId).sort(newestFirst);
}

// Art and work-in-progress entries are shared by both languages, with optional
// Italian text under `it:`. Returns the entry's data with that text swapped in.
export function translated<T extends { it?: Record<string, string | undefined> }>(data: T, lang: Lang): T {
  if (lang === DEFAULT_LANG || !data.it) return data;
  const overrides = Object.entries(data.it).filter(([, value]) => value);
  return { ...data, ...Object.fromEntries(overrides) };
}

const pageFiles = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/comics/*/pages/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

const byFilename = new Intl.Collator(undefined, { numeric: true }).compare;

// Images directly inside a folder (not in its subfolders).
const imagesIn = (folder: string) =>
  Object.keys(pageFiles).filter((path) => path.startsWith(folder) && !path.slice(folder.length).includes('/'));

// The pages of a story in one language: pages/<lang>/ if it exists, else pages/.
export function getPages(storyId: string, lang: Lang): ImageMetadata[] {
  const base = `/src/content/comics/${storyId}/pages/`;
  const own = imagesIn(`${base}${lang}/`);
  return (own.length > 0 ? own : imagesIn(base)).sort(byFilename).map((path) => pageFiles[path].default);
}

export function formatDate(date: Date, lang: Lang): string {
  return date.toLocaleDateString(STRINGS[lang].dateLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
