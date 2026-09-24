import { siteConfig, whatsappUrl } from '@/config/site';

/** Footer (Figma 38:447 / 59:523). */
export const footer = {
  copyright: (year: number) => `© ${year} ${siteConfig.name}`,
  links: [
    // Instagram appears as soon as siteConfig.instagram holds a URL.
    ...(siteConfig.instagram ? [{ label: 'Instagram', href: siteConfig.instagram }] : []),
    { label: 'WhatsApp', href: whatsappUrl },
  ],
} as const;
