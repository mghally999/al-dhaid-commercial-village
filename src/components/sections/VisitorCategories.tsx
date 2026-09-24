import { CategoryCard } from '@/components/cards/CategoryCard';
import { features } from '@/config/site';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { categoryCards, visitors } from '@/content/ar/categories';
import { stores } from '@/content/ar/stores';
import type { Category } from '@/types/content';

/** Figma 38:60 / 59:54 — "للزوار": heading + two paragraphs, then four numbered category cards. */
export function VisitorCategories() {
  const present = new Set(stores.map((s) => s.category));

  /**
   * Each card's "اعرف المزيد" opens the store list filtered to that category. While the list is
   * hidden the link keeps its place in the design and points at "خطط لزيارتك", the next useful step.
   */
  function cardHref(category: Category): string {
    if (!features.showDestinations) return '#plan-your-visit';
    return present.has(category) ? `/?type=${category}#destinations` : '#destinations';
  }
  return (
    <section id="visitors" aria-labelledby="visitors-title" className="bg-cream">
      <Container className="py-24">
        <div data-reveal className="grid gap-12 lg:grid-cols-2 lg:gap-x-12">
          <SectionHeading id="visitors-title" eyebrow={visitors.eyebrow}>
            <span className="block">{visitors.titleLine1}</span>
            <span className="block">
              {visitors.titleLine2}
              <span className="text-coral">{visitors.titleHighlight}</span>
            </span>
          </SectionHeading>
          <div className="text-slate-deep max-w-[576px] text-lg leading-8 lg:pt-3">
            {visitors.paragraphs.map((p, i) => (
              <p key={p} className={i > 0 ? 'pt-5' : ''}>
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Figma orders the cards 01→04 left-to-right on desktop; dir="ltr" reproduces that. */}
        <ul
          dir="ltr"
          data-reveal
          className="border-navy-deep/15 mt-12 grid border-t border-r sm:grid-cols-2 lg:grid-cols-4"
          aria-label="أقسام القرية"
        >
          {categoryCards.map((card) => (
            <li key={card.number} dir="rtl" className="border-navy-deep/15 border-b border-l">
              <CategoryCard
                card={card}
                linkLabel={visitors.linkLabel}
                href={cardHref(card.category)}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
