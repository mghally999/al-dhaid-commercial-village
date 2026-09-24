import Image from 'next/image';
import { categoryLabels } from '@/content/ar/categories';
import { destinations } from '@/content/ar/stores';
import type { Store } from '@/types/content';

/** Figma 38:219: white card, 256px image, unit + category row, name, opening hours. */
export function StoreCard({ store }: { store: Store }) {
  return (
    <article
      dir="rtl"
      className="flex flex-col bg-white shadow-[0_12px_25px_0_rgba(12,49,94,0.06)]"
    >
      <div className="bg-mint-deep relative h-64 overflow-hidden">
        <Image
          src={store.image.src}
          alt={store.image.alt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          quality={70}
          style={{ objectPosition: store.image.position ?? '50% 50%' }}
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="text-coral flex items-start justify-between text-xs leading-4">
          <span>{categoryLabels[store.category]}</span>
          <span dir="ltr">{store.unit}</span>
        </div>
        <h3 className="text-navy-deep pt-4 text-2xl leading-8 font-bold">{store.name}</h3>
        <p className="text-slate pt-3 text-sm leading-5">
          {destinations.hoursPrefix}
          {store.hours}
        </p>
      </div>
    </article>
  );
}
