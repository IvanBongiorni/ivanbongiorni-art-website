// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ivanbongiorni.art',
  // English at the root, Italian under /it/. Keep in sync with LANGS in src/i18n.ts.
  i18n: {
    locales: ['en', 'it'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', it: 'it' } },
    }),
  ],
});
