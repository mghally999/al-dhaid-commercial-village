import { FeatureItem } from '@/components/cards/FeatureItem';
import { Container } from '@/components/layout/Container';
import { features, whyVisit } from '@/content/ar/features';

/** Figma 38:154 / 59:148 — amber band, 48px heading at the start, 2×2 feature grid at the end. */
export function WhyVisit() {
  return (
    <section id="why" aria-labelledby="why-title" className="bg-amber">
      <Container className="py-16">
        <div
          data-reveal
          className="flex flex-col gap-9 lg:flex-row lg:items-start lg:justify-between"
        >
          <h2
            id="why-title"
            className="font-heading text-navy shrink-0 text-[48px] leading-[60px] font-normal"
          >
            <span className="block">{whyVisit.titleLine1}</span>
            <span className="block">{whyVisit.titleLine2}</span>
          </h2>
          <div className="grid gap-x-12 gap-y-7 sm:grid-cols-2 lg:w-[646px]">
            {features.map((feature) => (
              <FeatureItem key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
