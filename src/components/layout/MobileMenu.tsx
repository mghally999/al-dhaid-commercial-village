'use client';

import { useEffect, useId, useState } from 'react';
import type { NavLink } from '@/types/content';

/** Hamburger toggle for < md. The only state is open/closed; links are plain anchors. */
export function MobileMenu({ links }: { links: readonly NavLink[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
        onClick={() => setOpen((o) => !o)}
        className="flex size-11 flex-col items-center justify-center gap-1.5 border border-white/35 text-white"
      >
        <span
          aria-hidden="true"
          className={`block h-px w-5 bg-current transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`}
        />
        <span
          aria-hidden="true"
          className={`block h-px w-5 bg-current transition-transform ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`}
        />
      </button>

      <div id={panelId} hidden={!open} className="bg-navy absolute inset-x-0 top-full z-30">
        <nav aria-label="القائمة الرئيسية">
          <ul className="flex flex-col divide-y divide-white/10 border-b border-white/20 px-6 py-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base text-white/90 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
