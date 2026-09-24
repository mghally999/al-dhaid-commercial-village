'use client';

import { useSyncExternalStore, type ReactNode } from 'react';
import { StoreCard } from '@/components/cards/StoreCard';
import { ChipButton } from '@/components/ui/Chip';
import { destinations } from '@/content/ar/stores';
import type { Store } from '@/types/content';

export type StoreGroups = Record<string, Store[]>;

type Props = {
  /** Server-rendered eyebrow + heading, laid out beside the chips on desktop (Figma 38:193). */
  heading: ReactNode;
  /** Pre-grouped at build time: `all` plus one key per category present. */
  groups: StoreGroups;
  chips: readonly { value: string; label: string }[];
};

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener('popstate', callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('popstate', callback);
  };
}

function readType() {
  return new URLSearchParams(window.location.search).get('type') ?? 'all';
}

function writeType(type: string) {
  const url = new URL(window.location.href);
  if (type === 'all') url.searchParams.delete('type');
  else url.searchParams.set('type', type);
  window.history.replaceState(window.history.state, '', url);
  listeners.forEach((l) => l());
}

/** The active filter lives in the URL (`?type=cafe`) so it is shareable; switching is a map lookup. */
export function DestinationsFilter({ heading, groups, chips }: Props) {
  const requested = useSyncExternalStore(subscribe, readType, () => 'all');
  const active = requested in groups ? requested : 'all';
  const visible = groups[active] ?? [];

  return (
    <>
      <div className="flex flex-col gap-y-6 lg:flex-row lg:items-end lg:justify-between">
        {heading}
        <ul className="flex flex-wrap gap-2" aria-label="تصفية الوجهات">
          {chips.map((chip) => (
            <li key={chip.value}>
              <ChipButton active={active === chip.value} onClick={() => writeType(chip.value)}>
                {chip.label}
              </ChipButton>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-slate pt-5 text-base leading-6">{destinations.intro}</p>

      {/* Figma orders the cards left-to-right on desktop; dir="ltr" reproduces that. */}
      <ul
        dir="ltr"
        className="grid gap-5 pt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4"
        aria-live="polite"
      >
        {visible.map((store) => (
          <li key={store.slug}>
            <StoreCard store={store} />
          </li>
        ))}
      </ul>

      <div className="flex justify-center pt-10">
        <button
          type="button"
          onClick={() => writeType('all')}
          className="border-coral text-navy-deep hover:text-coral border-b-[1.6px] pb-2 text-base leading-6 font-bold transition-colors"
        >
          {destinations.viewAllLabel}
        </button>
      </div>
    </>
  );
}
