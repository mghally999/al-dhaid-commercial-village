import Image from 'next/image';
import { siteConfig } from '@/config/site';

/** Emblem + wordmark as in the Figma header (48px logo, 12px text). */
export function Logo() {
  return (
    <a
      href="#top"
      className="flex items-center gap-2"
      aria-label={`${siteConfig.name} – الصفحة الرئيسية`}
    >
      <Image
        src="/logo/logo-header.png"
        alt=""
        width={48}
        height={48}
        className="size-12 object-contain"
      />
      <span className="w-[102px] text-end text-xs leading-[15px] text-white">
        {siteConfig.name}
      </span>
    </a>
  );
}
