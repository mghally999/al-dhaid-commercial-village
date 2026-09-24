import { siteConfig, whatsappUrl } from '@/config/site';
import type { InfoRow } from '@/types/content';

/** Section "خطط لزيارتك" (Figma 38:283 / 59:277). Wording from the PDF, page 3–4. */
export const planVisit = {
  eyebrow: 'زيارتك',
  titleLine1: 'خطط لزيارتك إلى',
  titleLine2: 'قرية الذيد',
  text: 'تعرف على الموقع، ساعات العمل والخدمات المتاحة قبل زيارتك.',
  directions: { label: 'احصل على الاتجاهات', href: siteConfig.mapsUrl },
  contact: { label: 'تواصل معنا', href: whatsappUrl },
} as const;

export const visitInfo: readonly InfoRow[] = [
  { label: 'الموقع', value: siteConfig.address },
  { label: 'الساعات', value: siteConfig.hours },
  { label: 'المواقف', value: 'مواقف متاحة لزوار القرية.' },
];
