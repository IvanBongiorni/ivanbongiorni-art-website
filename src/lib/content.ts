import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import type { ArtCategory } from '../site.config';

export type Story = CollectionEntry<'comics'>;
export type Artwork = CollectionEntry<'art'>;
export type ProcessItem = CollectionEntry<'process'>;

// Drafts show up in `npm run dev` but are left out of the published site.
const published = ({ data }: { data: { draft: boolean } }) => import.meta.env.DEV || !data.draft;

const newestFirst = <T extends { data: { date: Date } }>(a: T, b: T) =>
  b.data.date.getTime() - a.data.date.getTime();

export async function getStories(): Promise<Story[]> {
  return (await getCollection('comics', published)).sort(newestFirst);
}

export async function getArtworks(category?: ArtCategory): Promise<Artwork[]> {
  const all = await getCollection('art', published);
  return all.filter((a) => !category || a.data.category === category).sort(newestFirst);
}

export async function getProcess(storyId?: string): Promise<ProcessItem[]> {
  const all = await getCollection('process', published);
  return all.filter((p) => !storyId || p.data.story === storyId).sort(newestFirst);
}

const pageFiles = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/comics/*/pages/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

const byFilename = new Intl.Collator(undefined, { numeric: true }).compare;

export function getPages(storyId: string): ImageMetadata[] {
  const prefix = `/src/content/comics/${storyId}/pages/`;
  return Object.keys(pageFiles)
    .filter((path) => path.startsWith(prefix))
    .sort(byFilename)
    .map((path) => pageFiles[path].default);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
