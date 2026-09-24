import { siteConfig } from '@/config/site';

/** schema.org ShoppingCenter for the home page. Opening hours are omitted until the client confirms them. */
export function shoppingCenterJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ShoppingCenter',
    name: siteConfig.name,
    alternateName: siteConfig.nameEn,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}/og.jpg`,
    logo: `${siteConfig.url}/logo/logo.png`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'الذيد',
      addressRegion: 'الشارقة',
      addressCountry: 'AE',
    },
    hasMap: siteConfig.mapsUrl,
    sameAs: [siteConfig.instagram],
  };
}
