import * as z from 'zod/mini';
import { bookingReasons } from '@/content/ar/booking';
import { activityTypes } from '@/content/ar/join';

// Zod compiles object parsers with `new Function` unless jitless; the production CSP has no 'unsafe-eval'.
z.config({ jitless: true });

const name = z
  .string()
  .check(z.trim(), z.minLength(2, 'يرجى إدخال الاسم'), z.maxLength(100, 'الاسم طويل جدًا'));
const phone = z
  .string()
  .check(z.trim(), z.regex(/^\+?[\d\s()-]{7,20}$/, 'يرجى إدخال رقم هاتف صحيح'));
const email = z.email('يرجى إدخال بريد إلكتروني صحيح').check(z.maxLength(200, 'البريد طويل جدًا'));

const activityValues = activityTypes.map((o) => o.value) as [string, ...string[]];
const reasonValues = bookingReasons.map((o) => o.value) as [string, ...string[]];

export const joinSchema = z.object({
  fullName: name,
  phone,
  whatsapp: phone,
  email,
  activityType: z.enum(activityValues, 'يرجى اختيار نوع النشاط'),
  projectName: z
    .string()
    .check(z.trim(), z.minLength(2, 'يرجى إدخال اسم المشروع'), z.maxLength(150, 'الاسم طويل جدًا')),
  about: z
    .string()
    .check(
      z.trim(),
      z.minLength(10, 'يرجى كتابة نبذة قصيرة عن المشروع'),
      z.maxLength(2000, 'النبذة طويلة جدًا'),
    ),
});
export type JoinInput = z.infer<typeof joinSchema>;

const today = () => new Date().toISOString().slice(0, 10);

export const bookingSchema = z.object({
  name,
  phone,
  email,
  reason: z.enum(reasonValues, 'يرجى اختيار سبب الموعد'),
  date: z.string().check(
    z.regex(/^\d{4}-\d{2}-\d{2}$/, 'يرجى اختيار التاريخ'),
    z.refine((d) => d >= today(), 'يرجى اختيار تاريخ قادم'),
  ),
  time: z.string().check(z.regex(/^\d{2}:\d{2}$/, 'يرجى اختيار الوقت')),
});
export type BookingInput = z.infer<typeof bookingSchema>;

export type ValidationResult<T> =
  { success: true; data: T } | { success: false; errors: Record<string, string> };

/** Runs a schema and maps issues to `field → first message` (same code on client and server). */
export function validate<T extends z.ZodMiniType>(
  schema: T,
  data: unknown,
): ValidationResult<z.output<T>> {
  const result = z.safeParse(schema, data);
  if (result.success) return { success: true, data: result.data };
  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? 'form');
    if (!(key in errors)) errors[key] = issue.message;
  }
  return { success: false, errors };
}
