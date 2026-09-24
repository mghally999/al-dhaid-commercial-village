'use server';

import { headers } from 'next/headers';
import { activityTypes, join } from '@/content/ar/join';
import { booking, bookingReasons } from '@/content/ar/booking';
import { sendMail } from '@/lib/email';
import type { FormState } from '@/lib/forms';
import { rateLimit } from '@/lib/rate-limit';
import { bookingSchema, joinSchema, validate } from '@/lib/schemas';

const TOO_MANY = 'تم إرسال عدد كبير من الطلبات من هذا الجهاز. يرجى المحاولة بعد قليل.';
const CHECK_FIELDS = 'يرجى مراجعة الحقول المحددة.';

async function clientKey(scope: string): Promise<string> {
  const h = await headers();
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'local';
  return `${scope}:${ip}`;
}

function labelOf(options: readonly { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}

export async function submitJoin(_prev: FormState, formData: FormData): Promise<FormState> {
  // Honeypot: pretend success so bots learn nothing.
  if (formData.get('website')) return { status: 'success', message: join.form.success };
  if (!rateLimit(await clientKey('join'))) return { status: 'error', message: TOO_MANY };

  const parsed = validate(joinSchema, Object.fromEntries(formData));
  if (!parsed.success) return { status: 'error', message: CHECK_FIELDS, errors: parsed.errors };
  const d = parsed.data;
  try {
    await sendMail({
      subject: `طلب انضمام جديد: ${d.projectName}`,
      replyTo: d.email,
      text: [
        `الاسم الكامل: ${d.fullName}`,
        `رقم الهاتف: ${d.phone}`,
        `رقم واتساب: ${d.whatsapp}`,
        `البريد الإلكتروني: ${d.email}`,
        `نوع النشاط: ${labelOf(activityTypes, d.activityType)}`,
        `اسم المشروع: ${d.projectName}`,
        '',
        'نبذة عن المشروع:',
        d.about,
      ].join('\n'),
    });
    return { status: 'success', message: join.form.success };
  } catch (error) {
    console.error('[forms] join submission failed', error);
    return { status: 'error', message: join.form.error };
  }
}

export async function submitBooking(_prev: FormState, formData: FormData): Promise<FormState> {
  if (formData.get('website')) return { status: 'success', message: booking.form.success };
  if (!rateLimit(await clientKey('booking'))) return { status: 'error', message: TOO_MANY };

  const parsed = validate(bookingSchema, Object.fromEntries(formData));
  if (!parsed.success) return { status: 'error', message: CHECK_FIELDS, errors: parsed.errors };
  const d = parsed.data;
  try {
    await sendMail({
      subject: `طلب حجز موعد: ${d.name} – ${d.date} ${d.time}`,
      replyTo: d.email,
      text: [
        `الاسم: ${d.name}`,
        `رقم الهاتف: ${d.phone}`,
        `البريد الإلكتروني: ${d.email}`,
        `سبب الموعد: ${labelOf(bookingReasons, d.reason)}`,
        `التاريخ: ${d.date}`,
        `الوقت: ${d.time}`,
      ].join('\n'),
    });
    return { status: 'success', message: booking.form.success };
  } catch (error) {
    console.error('[forms] booking submission failed', error);
    return { status: 'error', message: booking.form.error };
  }
}
