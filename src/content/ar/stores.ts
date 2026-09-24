import type { Store } from '@/types/content';

/** Section "اكتشف وجهاتنا" (Figma 38:192 / 59:186). Wording from the PDF, page 3. */
export const destinations = {
  eyebrow: 'استكشف',
  title: 'اكتشف ',
  titleHighlight: 'وجهاتنا',
  intro: 'تعرف على المتاجر، المطاعم، المقاهي والخدمات الموجودة داخل قرية الذيد التجارية.',
  allLabel: 'الكل',
  viewAllLabel: 'عرض جميع الوجهات',
  hoursPrefix: 'ساعات العمل: ',
} as const;

/**
 * SAMPLE DATA from the Figma frame. Replace with real tenants: add an entry per store and
 * the filter chips update automatically (chips are derived from the categories present here).
 */
export const stores: readonly Store[] = [
  {
    slug: 'rosto',
    name: 'روستو',
    category: 'restaurant',
    unit: 'A-12',
    hours: '10 ص – 11 م',
    image: { src: '/images/storefront-boutique.jpg', alt: 'واجهة محل روستو', position: '50% 60%' },
  },
  {
    slug: 'bait-alqahwa',
    name: 'بيت القهوة',
    category: 'cafe',
    unit: 'B-04',
    hours: '7 ص – 12 ص',
    image: {
      src: '/images/cafe-corner-night.jpg',
      alt: 'واجهة بيت القهوة ليلًا',
      position: '50% 65%',
    },
  },
  {
    slug: 'maraya',
    name: 'مَرايا',
    category: 'shop',
    unit: 'C-08',
    hours: '10 ص – 10 م',
    image: {
      src: '/images/cafe-interior-family.jpg',
      alt: 'زوار داخل متجر مَرايا',
      position: '50% 70%',
    },
  },
];
