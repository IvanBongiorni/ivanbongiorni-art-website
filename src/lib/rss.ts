// RSS feed of new stories, one per language (/rss.xml, /it/rss.xml). Kit can
// turn new items into newsletter emails automatically (Automations → RSS).
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getStories, storyId } from './content';
import { SITE } from '../site.config';
import { STRINGS, localize, type Lang } from '../i18n';

export async function storiesFeed(context: APIContext, lang: Lang) {
  const stories = await getStories(lang);
  return rss({
    title: SITE.title,
    description: STRINGS[lang].siteDescription,
    site: context.site!,
    customData: `<language>${lang}</language>`,
    items: stories.map((story) => ({
      title: story.data.title,
      description: story.data.description,
      pubDate: story.data.date,
      link: localize(`/comics/${storyId(story)}/`, lang),
    })),
  });
}
