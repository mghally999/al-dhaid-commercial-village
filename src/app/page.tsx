import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { RevealObserver } from '@/components/motion/RevealObserver';
import { About } from '@/components/sections/About';
import { Booking } from '@/components/sections/Booking';
import { Destinations } from '@/components/sections/Destinations';
import { Gallery } from '@/components/sections/Gallery';
import { Hero } from '@/components/sections/Hero';
import { Join } from '@/components/sections/Join';
import { PlanVisit } from '@/components/sections/PlanVisit';
import { VisitorCategories } from '@/components/sections/VisitorCategories';
import { WhyVisit } from '@/components/sections/WhyVisit';
import { shoppingCenterJsonLd } from '@/lib/jsonld';

export default function HomePage() {
  return (
    <>
      <main id="main" className="flex-1">
        <Hero />
        <VisitorCategories />
        <WhyVisit />
        <Destinations />
        <PlanVisit />
        <About />
        <Join />
        <Booking />
        <Gallery />
      </main>
      <SiteFooter />
      <FloatingWhatsApp reveal />
      <RevealObserver />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shoppingCenterJsonLd()) }}
      />
    </>
  );
}
