import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { chipActiveClass, chipClass } from '@/components/ui/Chip';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { gallery, galleryCategories, galleryItems } from '@/content/ar/gallery';
import type { GalleryItem } from '@/types/content';

const slotClass: Record<GalleryItem['slot'], string> = {
  wide: 'h-[237px] sm:col-span-2 sm:h-[360px] lg:h-[430px]',
  tall: 'h-[237px] sm:h-[430px]',
  smallTop: 'h-[237px] sm:h-[207px]',
  smallBottom: 'hidden sm:block sm:h-[207px]',
};

function Tile({ item, className }: { item: GalleryItem; className: string }) {
  return (
    <figure className={`relative overflow-hidden ${className}`}>
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        quality={70}
        style={{ objectPosition: item.position ?? '50% 50%' }}
        className="object-cover"
      />
    </figure>
  );
}

/** Figma 38:426 / 59:420 — mint band; chips (desktop) or caption (mobile); 4-image mosaic. */
export function Gallery() {
  const wide = galleryItems.find((i) => i.slot === 'wide');
  const tall = galleryItems.find((i) => i.slot === 'tall');
  const smallTop = galleryItems.find((i) => i.slot === 'smallTop');
  const smallBottom = galleryItems.find((i) => i.slot === 'smallBottom');

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-mint-deep">
      <Container className="py-24">
        <div data-reveal>
          <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between">
            <SectionHeading id="gallery-title" eyebrow={gallery.eyebrow}>
              {gallery.title}
              <span className="text-coral">{gallery.titleHighlight}</span>
            </SectionHeading>
            <ul className="hidden gap-2 lg:flex" aria-label="أقسام المعرض">
              {galleryCategories.map((c, i) => (
                <li key={c.value} className={`${chipClass} ${i === 0 ? chipActiveClass : ''}`}>
                  {c.label}
                </li>
              ))}
            </ul>
            <p className="text-slate pt-5 text-sm leading-5 lg:hidden">{gallery.mobileCaption}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {wide ? <Tile item={wide} className={slotClass.wide} /> : null}
            <div className="grid gap-4">
              {smallTop ? <Tile item={smallTop} className={slotClass.smallTop} /> : null}
              {smallBottom ? <Tile item={smallBottom} className={slotClass.smallBottom} /> : null}
            </div>
            {tall ? <Tile item={tall} className={slotClass.tall} /> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
