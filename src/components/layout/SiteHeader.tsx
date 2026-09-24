import { navLinks } from '@/content/ar/nav';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';

/** Figma 38:13 / 59:17: logo at the start, links (or hamburger) at the end, thin divider below. */
export function SiteHeader() {
  return (
    <header className="relative z-20">
      <div className="flex items-center justify-between border-b border-white/20 pb-5">
        <Logo />
        <nav aria-label="القائمة الرئيسية" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm leading-5 text-white/85 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <MobileMenu links={navLinks} />
      </div>
    </header>
  );
}
