// RSS feed of new stories. Kit can turn new items into newsletter emails
// automatically (Automations → RSS).
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getStories } from '../lib/content';
import { SITE } from '../site.config';

export async function GET(context: APIContext) {
  const stories = await getStories();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site!,
    items: stories.map((story) => ({
      title: story.data.title,
      description: story.data.description,
      pubDate: story.data.date,
      link: `/comics/${story.id}/`,
    })),
  });
}
