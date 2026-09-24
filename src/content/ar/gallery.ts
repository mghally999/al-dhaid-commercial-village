import type { GalleryCategory, GalleryItem } from '@/types/content';

/** Section "اكتشف أجواء قرية الذيد" (Figma 38:426 / 59:420). Four chips by decision. */
export const gallery = {
  eyebrow: 'المعرض',
  title: 'اكتشف أجواء ',
  titleHighlight: 'قرية الذيد',
  /** Mobile frame replaces the chips with this single line. */
  mobileCaption: 'القرية · التسوق · المطاعم والمقاهي',
} as const;

export const galleryCategories: readonly { value: GalleryCategory; label: string }[] = [
  { value: 'village', label: 'القرية' },
  { value: 'shop', label: 'تسوق' },
  { value: 'cafe', label: 'مقهى' },
  { value: 'restaurant', label: 'مطعم' },
];

/** Layer names in Figma: مساحة تجارية عصرية، أجواء مقهى، جلسات المقهى، تجربة تسوق. */
export const galleryItems: readonly GalleryItem[] = [
  {
    src: '/images/village-facade-sunset.jpg',
    alt: 'واجهة قرية الذيد التجارية عند الغروب',
    category: 'village',
    slot: 'wide',
    position: '50% 55%',
  },
  {
    src: '/images/couple-walkway.jpg',
    alt: 'زائران يتجولان في ممرات القرية',
    category: 'cafe',
    slot: 'smallTop',
    position: '50% 45%',
  },
  {
    src: '/images/cafe-interior-family.jpg',
    alt: 'جلسات داخل أحد مقاهي القرية',
    category: 'cafe',
    slot: 'smallBottom',
    position: '50% 70%',
  },
  {
    src: '/images/arrival-car-entrance.jpg',
    alt: 'زائر يصل إلى مدخل قرية الذيد التجارية',
    category: 'shop',
    slot: 'tall',
  },
];
