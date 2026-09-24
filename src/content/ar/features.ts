import type { Feature } from '@/types/content';

/** Section "لماذا تزور قرية الذيد؟" (Figma 38:154 / 59:148). Four items by decision; PDF wording. */
export const whyVisit = {
  titleLine1: 'لماذا تزور',
  titleLine2: 'قرية الذيد؟',
} as const;

export const features: readonly Feature[] = [
  { title: 'تجربة متنوعة', text: 'مجموعة من الأنشطة والتجارب في وجهة واحدة.' },
  { title: 'سهولة الوصول', text: 'موقع مميز في مدينة الذيد يسهل الوصول إليه.' },
  { title: 'مواقف واسعة', text: 'مواقف مخصصة لراحة الزوار.' },
  { title: 'بيئة مريحة', text: 'مساحات منظمة ومرافق مصممة لتوفير تجربة مريحة.' },
];
