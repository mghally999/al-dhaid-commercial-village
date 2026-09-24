import { BookingForm } from '@/components/forms/BookingForm';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { booking } from '@/content/ar/booking';

/** Figma 38:391 / 59:385 — heading at the start, bordered form card at the end. */
export function Booking() {
  return (
    <section id="book" aria-labelledby="booking-title" className="bg-cream">
      <Container className="py-24">
        <div
          data-reveal
          className="grid gap-10 lg:grid-cols-[444fr_602fr] lg:items-start lg:gap-x-10"
        >
          <div>
            <SectionHeading id="booking-title" eyebrow={booking.eyebrow}>
              <span className="block">{booking.titleLine1}</span>
              <span className="text-coral block">{booking.titleHighlight}</span>
            </SectionHeading>
            <p className="text-slate max-w-[384px] pt-6 text-base leading-8">{booking.text}</p>
          </div>
          <div className="border-navy/15 border p-6 md:p-8">
            <BookingForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
