/**
 * Public site URL, in this order:
 * 1. NEXT_PUBLIC_SITE_URL when set to a non-empty valid URL (the real domain once purchased),
 * 2. Vercel's stable production URL (https://<project>.vercel.app) during Vercel builds,
 * 3. localhost for local development.
 * An empty or malformed variable must not break the build (it did once: `new URL('')`).
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    try {
      return new URL(explicit).origin;
    } catch {
      console.warn(`[siteConfig] Ignoring invalid NEXT_PUBLIC_SITE_URL: "${explicit}"`);
    }
  }
  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercelHost) return `https://${vercelHost}`;
  return 'http://localhost:3000';
}

/**
 * Feature flags. Flip a value here and everything that depends on it follows: navigation links,
 * call-to-action targets, the rendered sections and the structured data.
 */
export const features = {
  /**
   * "اكتشف وجهاتنا" (the store cards) is hidden while the tenants in `src/content/ar/stores.ts`
   * are still the Figma samples. Set to `true` once real brands are in that file; nothing else
   * needs editing. Kept as a literal so the bundler drops the filter's client JavaScript too.
   */
  showDestinations: false,
} as const;

/**
 * Single source of truth for site identity and contact details.
 * Every value marked TODO is a placeholder the client has not provided yet.
 */
export const siteConfig = {
  name: 'قرية الذيد التجارية',
  nameEn: 'Al Dhaid Commercial Village',
  tagline: 'وجهتك للتسوق، المطاعم وفرص الأعمال',
  description:
    'اكتشف وجهة تجارية متكاملة في قلب مدينة الذيد، تجمع بين المتاجر، المطاعم، المقاهي والخدمات، وتوفر في الوقت نفسه فرصًا مميزة لأصحاب المشاريع والعلامات التجارية.',
  // TODO: real domain once purchased (set NEXT_PUBLIC_SITE_URL on Vercel). Until then the Vercel URL is used.
  url: resolveSiteUrl(),
  locale: 'ar_AE',
  phone: '+971563775188',
  // International format, digits only (used to build the wa.me link).
  whatsapp: '971563775188',
  email: 'Aldhaidvillage.ae@gmail.com',
  address: 'مدينة الذيد – إمارة الشارقة',
  mapsUrl: 'https://maps.app.goo.gl/mJn3cftBefdqjc3E9',
  // TODO: opening hours are NOT confirmed (the content PDF says "يتم إضافة أوقات العمل"); this is the Figma sample.
  hours: 'يوميًا، 10 صباحًا – 11 مساءً',
  // TODO: Instagram profile URL from the client. While this is null the footer link stays hidden
  // and the profile is left out of the structured data; paste the URL here to bring both back.
  instagram: null as string | null,
} as const;

export const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}`;
export const telUrl = `tel:${siteConfig.phone}`;
export const mailtoUrl = `mailto:${siteConfig.email}`;
