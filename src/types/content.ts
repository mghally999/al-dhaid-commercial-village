export type NavLink = {
  label: string;
  href: `#${string}` | `/${string}`;
};

export type ImageRef = {
  src: string;
  alt: string;
  /** CSS object-position, defaults to centre. */
  position?: string;
};

export type HeroSlide = ImageRef;

export type Category = 'shop' | 'cafe' | 'restaurant' | 'service' | 'event';

export type CategoryCard = {
  number: string;
  title: string;
  text: string;
  category: Category;
};

export type Feature = {
  title: string;
  text: string;
};

export type Store = {
  slug: string;
  name: string;
  category: Category;
  /** Unit / location code shown on the card, e.g. "A-12". */
  unit: string;
  hours: string;
  image: ImageRef;
};

export type GalleryCategory = 'village' | 'shop' | 'cafe' | 'restaurant';

export type GalleryItem = ImageRef & {
  category: GalleryCategory;
  /** Desktop mosaic slot (Figma 38:440): one wide, one tall, two small stacked. */
  slot: 'wide' | 'tall' | 'smallTop' | 'smallBottom';
};

export type InfoRow = {
  label: string;
  value: string;
};

export type SelectOption = {
  value: string;
  label: string;
};
