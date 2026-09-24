'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { HeroSlide } from '@/types/content';

const INTERVAL_MS = 6000;

/**
 * Background crossfade for the hero. Only the first slide is in the initial HTML (it is the LCP
 * image); each next slide is mounted one interval ahead so it has loaded before it fades in.
 * Pauses while the tab is hidden and stays on the first slide when the user prefers reduced motion.
 */
export function HeroSlideshow({ slides }: { slides: readonly HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState<number[]>([0]);
  const indexRef = useRef(0);

  useEffect(() => {
    const count = slides.length;
    if (count < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mount = (i: number) => setMounted((m) => (m.includes(i) ? m : [...m, i]));
    // Fetch the second slide half an interval in, so it never competes with the LCP image.
    const warmup = window.setTimeout(() => mount(1), INTERVAL_MS / 2);

    let timer: number | undefined;
    const stop = () => {
      if (timer !== undefined) window.clearInterval(timer);
      timer = undefined;
    };
    const start = () => {
      stop();
      timer = window.setInterval(() => {
        const next = (indexRef.current + 1) % count;
        indexRef.current = next;
        setIndex(next);
        mount((next + 1) % count);
      }, INTERVAL_MS);
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.clearTimeout(warmup);
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [slides.length]);

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-30">
      {slides.map((slide, i) =>
        mounted.includes(i) ? (
          <Image
            key={slide.src}
            src={slide.src}
            alt=""
            fill
            sizes="100vw"
            quality={65}
            priority={i === 0}
            fetchPriority={i === 0 ? 'high' : 'auto'}
            style={{ objectPosition: slide.position ?? '50% 50%' }}
            className={`object-cover transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : null,
      )}
      <div className="absolute inset-0 bg-[linear-gradient(128deg,rgba(11,53,101,0.5)_20.94%,rgba(11,53,101,0)_54.15%)]" />
    </div>
  );
}
