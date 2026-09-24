import { ArrowIcon } from '@/components/icons/ArrowIcon';
import { Container } from '@/components/layout/Container';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { hero, heroSlides } from '@/content/ar/hero';
import { HeroSlideshow } from './HeroSlideshow';

/** Figma 38:7 (desktop) / 59:11 (mobile): 760px navy hero with slideshow, gold ring and header. */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="bg-navy relative isolate overflow-hidden text-white"
    >
      <HeroSlideshow slides={heroSlides} />

      {/* Gold ring, bleeding off the end edge (Figma: 480px ring, 70px stroke, 90% opacity). */}
      <div
        aria-hidden="true"
        className="border-amber pointer-events-none absolute -end-32 top-[572px] size-[368px] rounded-full border-[69px] opacity-90 md:top-[460px] md:size-[480px] md:border-[70px]"
      />
      {/* Small gold dot next to the eyebrow, mobile frame only. */}
      <div
        aria-hidden="true"
        className="bg-amber pointer-events-none absolute end-[88px] top-[182px] size-3 rounded-full md:hidden"
      />

      <Container className="relative z-10 flex min-h-[760px] flex-col pt-6 pb-12">
        <SiteHeader />

        <div className="flex flex-1 flex-col items-start justify-center gap-7 py-10">
          <p className="text-amber text-xs leading-4 tracking-[0.2em]" dir="ltr">
            {hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="font-heading text-[60px] leading-[71px] font-normal md:text-[96px] md:leading-[114px]"
          >
            <span className="block">{hero.titleLine1}</span>
            <span className="text-amber block">{hero.titleLine2}</span>
          </h1>
          <p className="max-w-[576px] text-xl leading-9 text-white/80">{hero.text}</p>
          <div className="flex flex-col items-start gap-3 pt-3 sm:flex-row sm:items-stretch">
            <ButtonLink
              href={hero.primaryCta.href}
              variant="primary"
              className="order-1 sm:order-2"
            >
              {hero.primaryCta.label}
              <ArrowIcon className="size-7" />
            </ButtonLink>
            <ButtonLink
              href={hero.secondaryCta.href}
              variant="outlineLight"
              className="order-2 sm:order-1"
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="flex items-end justify-between text-sm leading-5">
          <a
            href={hero.partnersLink.href}
            className="hover:text-amber font-semibold text-white transition-colors"
          >
            {hero.partnersLink.label}
          </a>
          <p className="text-white/65">{hero.scrollHint}</p>
        </div>
      </Container>
    </section>
  );
}
