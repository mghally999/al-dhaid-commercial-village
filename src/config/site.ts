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
  // TODO: real domain once purchased (set NEXT_PUBLIC_SITE_URL on Vercel).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  locale: 'ar_AE',
  // TODO: phone number from the client.
  phone: '+971500000000',
  // TODO: WhatsApp number from the client (international format, digits only).
  whatsapp: '971500000000',
  // TODO: contact email from the client.
  email: 'info@example.com',
  address: 'مدينة الذيد – إمارة الشارقة',
  // TODO: Google Maps link from the client.
  mapsUrl: 'https://maps.google.com/?q=Al+Dhaid+Sharjah',
  // TODO: opening hours are NOT confirmed (the content PDF says "يتم إضافة أوقات العمل"); this is the Figma sample.
  hours: 'يوميًا، 10 صباحًا – 11 مساءً',
  // TODO: Instagram profile URL from the client.
  instagram: 'https://www.instagram.com/',
} as const;

export const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}`;
