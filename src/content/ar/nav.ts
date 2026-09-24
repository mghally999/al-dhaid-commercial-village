import { features } from '@/config/site';
import type { NavLink } from '@/types/content';

/** Header navigation, in reading order (first item is at the start / right edge). Figma: 4 links. */
const allNavLinks: readonly NavLink[] = [
  { label: 'خطط لزيارتك', href: '#plan-your-visit' },
  { label: 'الوجهات', href: '#destinations' },
  { label: 'عن القرية', href: '#about' },
  { label: 'انضم إلينا', href: '#join' },
];

/** "الوجهات" is dropped while the destinations section is hidden, so no link points at nothing. */
export const navLinks: readonly NavLink[] = allNavLinks.filter(
  (link) => features.showDestinations || link.href !== '#destinations',
);
