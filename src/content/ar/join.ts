import type { SelectOption } from '@/types/content';

/** Section "لأصحاب المشاريع" + join form (Figma 38:345 / 59:339). Wording from the PDF, pages 5–7. */
export const join = {
  eyebrow: 'لأصحاب المشاريع',
  titleLine1: 'مساحة جديدة',
  titleLine2: 'لنمو مشروعك',
  text: 'سواء كان مشروعك متجرًا، مطعمًا، مقهى، خدمة أو مفهومًا تجاريًا جديدًا، فريقنا جاهز لمساعدتك في التعرف على الفرص المتاحة.',
  form: {
    title: 'هل أنت مستعد لفتح فرعك القادم؟',
    text: 'أرسل لنا معلومات مشروعك وسيقوم فريقنا بمراجعتها والتواصل معك لمناقشة الفرص والمساحات المناسبة.',
    fields: {
      fullName: 'الاسم الكامل',
      phone: 'رقم الهاتف',
      whatsapp: 'رقم واتساب',
      email: 'البريد الإلكتروني',
      activityType: 'نوع النشاط',
      projectName: 'اسم المشروع / العلامة التجارية',
      about: 'نبذة عن المشروع',
    },
    submit: 'إرسال طلب الانضمام',
    submitting: 'جارٍ الإرسال…',
    success: 'تم استلام طلبك بنجاح. سيقوم فريقنا بمراجعته والتواصل معك قريبًا.',
    error: 'تعذر إرسال الطلب. يرجى المحاولة مرة أخرى أو التواصل معنا عبر واتساب.',
  },
} as const;

/** Options derived from the PDF sentence "متجرًا، مطعمًا، مقهى، خدمة أو مفهومًا تجاريًا جديدًا". */
export const activityTypes: readonly SelectOption[] = [
  { value: 'shop', label: 'متجر' },
  { value: 'restaurant', label: 'مطعم' },
  { value: 'cafe', label: 'مقهى' },
  { value: 'service', label: 'خدمة' },
  { value: 'concept', label: 'مفهوم تجاري جديد' },
  { value: 'other', label: 'أخرى' },
];
