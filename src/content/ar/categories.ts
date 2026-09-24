import type { Category, CategoryCard } from '@/types/content';

/** Chip / badge labels. Figma uses the singular form (مطعم، مقهى، تسوق). */
export const categoryLabels: Record<Category, string> = {
  shop: 'تسوق',
  cafe: 'مقهى',
  restaurant: 'مطعم',
  service: 'خدمات',
  event: 'فعاليات',
};

/** Chip display order, matching Figma 38:202 read right-to-left (الكل، تسوق، مقهى، مطعم). */
export const categoryOrder: readonly Category[] = [
  'shop',
  'cafe',
  'restaurant',
  'service',
  'event',
];

/** Section "للزوار" (Figma 38:60 / 59:54). Wording from the content PDF, page 1–2. */
export const visitors = {
  eyebrow: 'للزوار',
  titleLine1: 'كل ما تحتاجه',
  titleLine2: 'في ',
  titleHighlight: 'وجهة واحدة',
  paragraphs: [
    'استمتع بتجربة متنوعة داخل قرية الذيد التجارية، حيث تجد مجموعة من المتاجر، المطاعم، المقاهي والخدمات ضمن مكان مريح وسهل الوصول.',
    'سواء كنت تبحث عن تجربة تسوق، وجبة مميزة، مقهى لقضاء وقت ممتع أو خدمة تحتاجها، ستجد خيارات متعددة في مكان واحد.',
  ],
  linkLabel: 'اعرف المزيد',
} as const;

export const categoryCards: readonly CategoryCard[] = [
  {
    number: '01',
    title: 'تسوق',
    text: 'اكتشف مجموعة من المتاجر والأنشطة التجارية المختلفة.',
    category: 'shop',
  },
  {
    number: '02',
    title: 'مطاعم ومقاهي',
    text: 'استمتع بتجارب متنوعة من الأطعمة والمشروبات.',
    category: 'restaurant',
  },
  {
    number: '03',
    title: 'خدمات',
    text: 'مجموعة من الأنشطة والخدمات التي تلبي احتياجات الزوار.',
    category: 'service',
  },
  {
    number: '04',
    title: 'فعاليات وتجارب',
    text: 'فعاليات وأنشطة تضيف تجربة مختلفة للزيارة.',
    category: 'event',
  },
];
