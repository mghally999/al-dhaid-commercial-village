import { InfoRows } from '@/components/cards/InfoRows';
import { Container } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { planVisit, visitInfo } from '@/content/ar/plan-visit';

/** Figma 38:283 / 59:277 — navy band: heading, text and two buttons at the start; info rows at the end. */
export function PlanVisit() {
  return (
    <section id="plan-your-visit" aria-labelledby="plan-title" className="bg-navy-deep text-white">
      <Container className="py-24">
        <div data-reveal className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading id="plan-title" eyebrow={planVisit.eyebrow} size="md" tone="light">
              <span className="block">{planVisit.titleLine1}</span>
              <span className="block">{planVisit.titleLine2}</span>
            </SectionHeading>
            <p className="max-w-[512px] pt-6 text-lg leading-8 text-white/70">{planVisit.text}</p>
            <div className="flex flex-wrap gap-3 pt-9">
              <ButtonLink
                href={planVisit.directions.href}
                variant="primary"
                size="md"
                target="_blank"
                rel="noopener noreferrer"
              >
                {planVisit.directions.label}
              </ButtonLink>
              <ButtonLink
                href={planVisit.contact.href}
                variant="outlineLightSoft"
                size="md"
                target="_blank"
                rel="noopener noreferrer"
              >
                {planVisit.contact.label}
              </ButtonLink>
            </div>
          </div>
          <InfoRows rows={visitInfo} />
        </div>
      </Container>
    </section>
  );
}
