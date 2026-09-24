export type NavLink = {
  label: string;
  href: `#${string}` | `/${string}`;
};

export type HeroSlide = {
  src: string;
  alt: string;
  /** CSS object-position, defaults to centre. */
  position?: string;
};
