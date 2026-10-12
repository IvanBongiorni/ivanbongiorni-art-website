// Site-wide settings. Edit this file to change your name, links and newsletter.

export const SITE = {
  title: 'Ivan Bongiorni',
  description: 'Comics, illustrations, paintings and photography by Ivan Bongiorni.',
  author: 'Ivan Bongiorni',
  // Public contact address shown on the About page. Leave empty to hide it.
  email: '',
};

// Links to your profiles elsewhere. Entries with an empty url are not shown.
export const SOCIALS: { name: string; url: string }[] = [
  { name: 'Instagram', url: '' },
  { name: 'Reddit', url: '' },
  { name: 'Flickr', url: '' },
];

// Kit (kit.com) newsletter form. Paste the numeric form ID from the form's
// embed code (https://app.kit.com/forms/<ID>/subscriptions). While it is empty,
// the signup box is hidden.
export const NEWSLETTER = {
  kitFormId: '',
  pitch: 'One email when a new story is out. Nothing else.',
};

export const ART_CATEGORIES = {
  illustration: 'Illustrations',
  painting: 'Paintings',
  photography: 'Photography',
} as const;

export type ArtCategory = keyof typeof ART_CATEGORIES;
