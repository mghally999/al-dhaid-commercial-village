import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { whatsappUrl } from '@/config/site';

/** Figma component 38:567 (Default): green pill, fixed at the bottom start edge on every page. */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="reveal-on-scroll bg-whatsapp fixed start-6 bottom-6 z-40 flex items-center gap-4 rounded-lg px-6 py-2 text-base leading-6 font-bold text-white shadow-lg transition-colors hover:bg-[#3db84b] focus-visible:outline-white md:start-10"
    >
      <span>تواصل الآن</span>
      <WhatsAppIcon className="size-8" />
    </a>
  );
}
