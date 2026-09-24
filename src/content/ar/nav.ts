import type { NavLink } from '@/types/content';

/** Header navigation, in reading order (first item is at the start / right edge). Figma: 4 links only. */
export const navLinks: readonly NavLink[] = [
  { label: 'خطط لزيارتك', href: '#plan-your-visit' },
  { label: 'الوجهات', href: '#destinations' },
  { label: 'عن القرية', href: '#about' },
  { label: 'انضم إلينا', href: '#join' },
];
