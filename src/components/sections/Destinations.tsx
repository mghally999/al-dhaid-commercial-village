import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { categoryLabels, categoryOrder } from '@/content/ar/categories';
import { destinations, stores } from '@/content/ar/stores';
import { DestinationsFilter, type StoreGroups } from './DestinationsFilter';

/** Figma 38:192 / 59:186 — "اكتشف وجهاتنا" with filter chips and store cards. */
export function Destinations() {
  // Grouped once at build time (the page is static), so a chip switch is an O(1) lookup.
  const groups: StoreGroups = { all: [...stores] };
  for (const store of stores) (groups[store.category] ??= []).push(store);

  const chips = [
    { value: 'all', label: destinations.allLabel },
    ...categoryOrder
      .filter((c) => c in groups)
      .map((c) => ({ value: c, label: categoryLabels[c] })),
  ];

  return (
    <section id="destinations" aria-labelledby="destinations-title" className="bg-cream">
      <Container className="py-24">
        <div data-reveal>
          <DestinationsFilter
            groups={groups}
            chips={chips}
            heading={
              <SectionHeading id="destinations-title" eyebrow={destinations.eyebrow}>
                {destinations.title}
                <span className="text-coral">{destinations.titleHighlight}</span>
              </SectionHeading>
            }
          />
        </div>
      </Container>
    </section>
  );
}
