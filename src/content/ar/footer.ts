import { siteConfig, whatsappUrl } from '@/config/site';

/** Footer (Figma 38:447 / 59:523). */
export const footer = {
  copyright: (year: number) => `© ${year} ${siteConfig.name}`,
  links: [
    { label: 'Instagram', href: siteConfig.instagram },
    { label: 'WhatsApp', href: whatsappUrl },
  ],
} as const;
