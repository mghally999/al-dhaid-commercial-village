'use client';

import { useEffect } from 'react';

/**
 * One shared IntersectionObserver for every `[data-reveal]` element (CLAUDE.md: no scroll listeners).
 * Elements already in view are marked visible before the hiding CSS is enabled, so nothing flashes,
 * and JavaScript-less or reduced-motion visitors always see the content.
 */
export function RevealObserver() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (elements.length === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const viewportHeight = window.innerHeight;
    for (const el of elements) {
      if (el.getBoundingClientRect().top < viewportHeight) el.dataset.visible = '';
    }
    document.documentElement.dataset.reveal = 'ready';

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.visible = '';
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    for (const el of elements) if (el.dataset.visible === undefined) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return null;
}
