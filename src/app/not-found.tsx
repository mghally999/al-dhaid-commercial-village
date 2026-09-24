import type { Metadata } from 'next';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'الصفحة غير موجودة',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <main id="main" className="bg-navy flex flex-1 items-center text-white">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-24 text-center md:px-10">
          <p className="text-amber text-xs leading-4 tracking-[0.2em]" dir="ltr">
            404
          </p>
          <h1 className="font-heading pt-4 text-[48px] leading-[60px] md:text-[64px] md:leading-[76px]">
            الصفحة غير موجودة
          </h1>
          <p className="mx-auto max-w-[480px] pt-6 text-lg leading-8 text-white/80">
            يبدو أن الرابط الذي وصلت إليه غير صحيح أو أن الصفحة لم تعد متاحة. عد إلى الصفحة الرئيسية
            لاكتشاف {siteConfig.name}.
          </p>
          <div className="pt-10">
            <ButtonLink href="/" variant="primary">
              العودة إلى الرئيسية
            </ButtonLink>
          </div>
        </div>
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
