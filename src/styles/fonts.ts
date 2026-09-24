import { Alexandria, Noto_Kufi_Arabic } from 'next/font/google';

// Body / UI text (Figma: "Alexandria"). Variable font, one file per subset.
export const alexandria = Alexandria({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-alexandria',
});

// Display headings only (Figma: "Noto Kufi Arabic" for H1/H2). Arabic subset only.
export const kufi = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-kufi',
});
