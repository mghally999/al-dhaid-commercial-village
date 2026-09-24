import { JoinForm } from '@/components/forms/JoinForm';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { join } from '@/content/ar/join';

/** Figma 38:345 / 59:339 — coral band with an amber ring; heading at the start, form card at the end. */
export function Join() {
  return (
    <section
      id="join"
      aria-labelledby="join-title"
      className="relative isolate overflow-hidden bg-[#ee4b2f] text-white"
    >
      <div
        aria-hidden="true"
        className="border-amber pointer-events-none absolute -end-20 -top-20 -z-10 size-72 rounded-full border-[45px] opacity-40"
      />
      <Container className="py-24">
        <div
          data-reveal
          className="grid gap-12 lg:grid-cols-[472fr_566fr] lg:items-start lg:gap-x-12"
        >
          <div>
            <SectionHeading
              id="join-title"
              eyebrow={join.eyebrow}
              size="md"
              tone="light"
              eyebrowClassName="text-white/75 tracking-[0.17em]"
            >
              <span className="block">{join.titleLine1}</span>
              <span className="block">{join.titleLine2}</span>
            </SectionHeading>
            <p className="max-w-[448px] pt-6 text-lg leading-8 text-white/85">{join.text}</p>
          </div>
          <div className="bg-cream text-navy-deep p-6 md:p-9">
            <h3 className="text-navy text-2xl leading-8 font-bold">{join.form.title}</h3>
            <p className="text-slate pt-2 text-sm leading-5">{join.form.text}</p>
            <div className="pt-7">
              <JoinForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
