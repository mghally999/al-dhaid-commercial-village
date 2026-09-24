import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { about } from '@/content/ar/about';

/** Figma 38:327 / 59:321 — mint arch with the heading at the start, two paragraphs at the end. */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-cream">
      <Container className="py-24">
        <div
          data-reveal
          className="grid gap-14 lg:grid-cols-[566fr_464fr] lg:items-center lg:gap-x-24"
        >
          <div className="bg-mint rounded-t-[144px] px-10 pt-28 pb-10 lg:p-8 xl:p-16">
            <SectionHeading
              id="about-title"
              eyebrow={about.eyebrow}
              className="[&_h2]:text-[40.4px] [&_h2]:leading-[54.75px] md:[&_h2]:text-[58.32px] md:[&_h2]:leading-[68.8px]"
            >
              <span className="block">{about.titleLine1}</span>
              <span className="text-coral block">{about.titleHighlight}</span>
            </SectionHeading>
          </div>
          <div className="text-slate-deep text-lg leading-9">
            {about.paragraphs.map((p, i) => (
              <p key={p} className={i > 0 ? 'pt-5' : ''}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
