import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { siteConfig } from '@/config/site';
import { alexandria, kufi } from '@/styles/fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0b3565',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${alexandria.variable} ${kufi.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="focus:bg-amber focus:text-navy sr-only focus:not-sr-only focus:fixed focus:start-2 focus:top-2 focus:z-50 focus:px-4 focus:py-2"
        >
          تخطي إلى المحتوى
        </a>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
