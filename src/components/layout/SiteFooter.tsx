import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { siteConfig } from '@/config/site';
import { footer } from '@/content/ar/footer';

/** Figma 38:447 / 59:523 — deep navy bar: logo + name at the start, copyright, social links at the end. */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-footer text-white/65">
      <Container className="py-9">
        <div className="flex flex-wrap items-center justify-between gap-y-5">
          <a
            href="#top"
            className="flex items-center gap-3 text-sm leading-5"
            aria-label={`${siteConfig.name} – أعلى الصفحة`}
          >
            <Image
              src="/logo/logo-footer.png"
              alt=""
              width={40}
              height={40}
              className="size-10 object-contain"
            />
            <span>{siteConfig.name}</span>
          </a>
          <p className="text-xs leading-4">{footer.copyright(year)}</p>
          <ul className="flex basis-full gap-4 text-sm leading-5 md:basis-auto" dir="ltr">
            {footer.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
