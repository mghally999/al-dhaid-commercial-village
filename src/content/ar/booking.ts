import type { SelectOption } from '@/types/content';

/** Section "تحدث مع فريقنا" + booking form (Figma 38:391 / 59:385). Wording from the PDF, pages 7–8. */
export const booking = {
  eyebrow: 'موعدك',
  titleLine1: 'تحدث مع',
  titleHighlight: 'فريقنا',
  text: 'هل ترغب في زيارة القرية أو مناقشة فرصة تجارية؟ احجز موعدًا وسيتواصل معك فريقنا لتأكيد الموعد.',
  form: {
    fields: {
      name: 'الاسم',
      phone: 'رقم الهاتف',
      email: 'البريد الإلكتروني',
      reason: 'سبب الموعد',
      date: 'التاريخ',
      time: 'الوقت',
    },
    submit: 'احجز موعدك',
    submitting: 'جارٍ الحجز…',
    success: 'تم استلام طلب الحجز. سيتواصل معك فريقنا لتأكيد الموعد.',
    error: 'تعذر إرسال طلب الحجز. يرجى المحاولة مرة أخرى أو التواصل معنا عبر واتساب.',
  },
} as const;

/** "سبب الموعد" options from the PDF (page 7). */
export const bookingReasons: readonly SelectOption[] = [
  { value: 'visit', label: 'زيارة القرية' },
  { value: 'project', label: 'الاستفسار عن مشروع' },
  { value: 'leasing', label: 'التأجير' },
  { value: 'other', label: 'أخرى' },
];
