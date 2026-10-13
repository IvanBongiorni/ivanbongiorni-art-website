import type { APIContext } from 'astro';
import { storiesFeed } from '../lib/rss';

export const GET = (context: APIContext) => storiesFeed(context, 'en');
