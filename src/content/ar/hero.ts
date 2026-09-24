import { features } from '@/config/site';
import type { HeroSlide } from '@/types/content';

/** Wording from materials/content/site-content-final.pdf (page 1); structure from Figma 38:7 / 59:11. */
export const hero = {
  eyebrow: 'AL DHAID · SHARJAH · UAE',
  titleLine1: 'قرية الذيد',
  titleLine2: 'التجارية',
  text: 'وجهتك للتسوق، المطاعم وفرص الأعمال. اكتشف وجهة تجارية متكاملة في قلب مدينة الذيد، تجمع بين المتاجر، المطاعم، المقاهي والخدمات، وتوفر في الوقت نفسه فرصًا مميزة لأصحاب المشاريع والعلامات التجارية.',
  primaryCta: {
    label: 'اكتشف القرية',
    // Leads to the store list when it exists, otherwise to the visitor categories above it.
    href: features.showDestinations ? '#destinations' : '#visitors',
  },
  secondaryCta: { label: 'خطط لزيارتك', href: '#plan-your-visit' },
  partnersLink: { label: 'لأصحاب المشاريع ←', href: '#join' },
  scrollHint: 'مرّر لاكتشاف المزيد ↓',
} as const;

/** Background slides in Figma order (component set 38:513, Default → Variant7). */
export const heroSlides: readonly HeroSlide[] = [
  { src: '/images/village-facade-sunset.jpg', alt: 'واجهة قرية الذيد التجارية عند الغروب' },
  { src: '/images/shoppers-arcade.jpg', alt: 'زائرات يتسوقن أمام أروقة القرية' },
  { src: '/images/cafe-interior-family.jpg', alt: 'عائلة في أحد مقاهي القرية' },
  { src: '/images/arrival-car-entrance.jpg', alt: 'زائر يصل إلى مدخل قرية الذيد التجارية' },
  {
    src: '/images/egypt-pavilion.jpg',
    alt: 'جناح مصر في قرية الذيد التجارية',
    position: '50% 45%',
  },
  { src: '/images/friends-selfie.jpg', alt: 'أصدقاء يلتقطون صورة أمام لافتة القرية' },
  {
    src: '/images/toy-shop-family.jpg',
    alt: 'عائلة أمام متجر ألعاب في القرية',
    position: '50% 65%',
  },
];
