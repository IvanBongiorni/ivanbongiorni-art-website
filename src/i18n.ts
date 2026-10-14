// Languages and interface text. English is the default and lives at the root
// (/comics/...); Italian lives under /it/ (/it/comics/...). Every piece of
// text shown by the site's templates is here, in both languages.

export const LANGS = ['en', 'it'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'en';

export function getLang(locale: string | undefined): Lang {
  return LANGS.find((l) => l === locale) ?? DEFAULT_LANG;
}

// '/comics/ash/' → '/it/comics/ash/' for Italian, unchanged for English.
export function localize(path: string, lang: Lang): string {
  return lang === DEFAULT_LANG ? path : `/${lang}${path}`;
}

// '/it/comics/ash/' → '/comics/ash/'
export function unlocalize(path: string): string {
  return path.replace(/^\/it(?=\/|$)/, '') || '/';
}

const en = {
  name: 'English',
  dateLocale: 'en-GB',
  ogLocale: 'en_GB',
  siteDescription: 'Comics, illustrations, paintings and photography by Ivan Bongiorni.',
  rssTitle: 'new stories',

  nav: { label: 'Main', comics: 'Comics', art: 'Art', about: 'About', updateMe: 'Update me' },
  switchTo: 'Read in English',
  darkMode: 'Dark mode',

  footer: {
    rights: 'All rights reserved.',
    reproduction: 'Artwork may not be reproduced without permission.',
    elsewhere: 'Elsewhere',
  },

  newsletter: {
    heading: 'Get notified of new stories',
    pitch: 'One email when a new story is out. Nothing else.',
    email: 'Email address',
    placeholder: 'you@example.com',
    button: 'Notify me',
    storyEnd: 'Want to read the next one?',
    processHeading: 'Follow along',
    processPitch: 'Get an email when the stories you see taking shape here are finished.',
  },

  comics: {
    title: 'Comics',
    description: 'All comic stories by Ivan Bongiorni.',
    stories: 'Stories',
    comingSoon: 'The first story is coming soon.',
    latest: 'Latest story',
    cover: (title: string) => `Cover of ${title}`,
    pages: (n: number) => `${n} ${n === 1 ? 'page' : 'pages'}`,
    published: 'Published',
    end: 'End',
    howDrawn: 'See how this story was drawn',
    more: 'More stories',
  },

  reader: {
    page: (title: string, i: number, n: number) => `${title}, page ${i} of ${n}`,
    prev: 'Previous page',
    next: 'Next page',
  },

  process: {
    title: 'Work in progress',
    description: "Unfinished pages, sketches and pencils from Ivan Bongiorni's comics.",
    intro: 'Pages before they are finished: thumbnails, pencils, inks. Each one is dated the day it was drawn.',
    sketches: 'Sketches',
  },

  art: {
    title: 'Art',
    all: 'All',
    tabsLabel: 'Art categories',
    description: (title: string) => `${title} by Ivan Bongiorni.`,
    categories: { illustration: 'Illustrations', painting: 'Paintings', photography: 'Photography' },
  },

  about: {
    title: 'About',
    description: 'About Ivan Bongiorni: comics, illustration, painting and photography.',
    contact: 'Contact',
  },

  notFound: {
    title: 'Page not found',
    text: "This page doesn't exist, or it has moved.",
    back: 'Back to the comics',
  },

  nothingYet: 'Nothing here yet.',
};

const it: typeof en = {
  name: 'Italiano',
  dateLocale: 'it-IT',
  ogLocale: 'it_IT',
  siteDescription: 'Fumetti, illustrazioni, dipinti e fotografie di Ivan Bongiorni.',
  rssTitle: 'nuove storie',

  nav: { label: 'Principale', comics: 'Fumetti', art: 'Arte', about: 'Chi sono', updateMe: 'Aggiornami' },
  switchTo: 'Leggi in italiano',
  darkMode: 'Modalità scura',

  footer: {
    rights: 'Tutti i diritti riservati.',
    reproduction: 'Le opere non possono essere riprodotte senza autorizzazione.',
    elsewhere: 'Altrove',
  },

  newsletter: {
    heading: 'Ricevi un avviso per le nuove storie',
    pitch: "Una email quando esce una nuova storia. Nient'altro.",
    email: 'Indirizzo email',
    placeholder: 'tu@esempio.it',
    button: 'Avvisami',
    storyEnd: 'Vuoi leggere la prossima?',
    processHeading: 'Segui il lavoro',
    processPitch: 'Ricevi una email quando le storie che vedi prendere forma qui saranno finite.',
  },

  comics: {
    title: 'Fumetti',
    description: 'Tutte le storie a fumetti di Ivan Bongiorni.',
    stories: 'Storie',
    comingSoon: 'La prima storia arriverà presto.',
    latest: 'Ultima storia',
    cover: (title) => `Copertina di ${title}`,
    pages: (n) => `${n} ${n === 1 ? 'pagina' : 'pagine'}`,
    published: 'Pubblicata il',
    end: 'Fine',
    howDrawn: 'Guarda come è stata disegnata questa storia',
    more: 'Altre storie',
  },

  reader: {
    page: (title, i, n) => `${title}, pagina ${i} di ${n}`,
    prev: 'Pagina precedente',
    next: 'Pagina successiva',
  },

  process: {
    title: 'Lavori in corso',
    description: 'Pagine non finite, schizzi e matite dai fumetti di Ivan Bongiorni.',
    intro: 'Le pagine prima di essere finite: thumbnail, matite, chine. Ognuna porta la data del giorno in cui è stata disegnata.',
    sketches: 'Schizzi',
  },

  art: {
    title: 'Arte',
    all: 'Tutto',
    tabsLabel: 'Categorie',
    description: (title) => `${title} di Ivan Bongiorni.`,
    categories: { illustration: 'Illustrazioni', painting: 'Dipinti', photography: 'Fotografia' },
  },

  about: {
    title: 'Chi sono',
    description: 'Ivan Bongiorni: fumetti, illustrazione, pittura e fotografia.',
    contact: 'Contatti',
  },

  notFound: {
    title: 'Pagina non trovata',
    text: 'Questa pagina non esiste, o è stata spostata.',
    back: 'Torna ai fumetti',
  },

  nothingYet: 'Ancora niente qui.',
};

export const STRINGS: Record<Lang, typeof en> = { en, it };
