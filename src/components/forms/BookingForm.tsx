'use client';

import { useActionState } from 'react';
import { submitBooking } from '@/app/actions/forms';
import { buttonClass } from '@/components/ui/ButtonLink';
import { booking, bookingReasons } from '@/content/ar/booking';
import { initialFormState } from '@/lib/forms';
import { bookingSchema } from '@/lib/schemas';
import {
  DateTimeField,
  FormMessage,
  HoneypotField,
  SelectField,
  SuccessPanel,
  TextField,
} from './fields';
import { useClientValidation } from './useClientValidation';

const f = booking.form.fields;

/** Figma 38:405 / 59:399: name, phone, email, reason, date, time, coral submit at the start edge. */
export function BookingForm() {
  const [state, formAction, pending] = useActionState(submitBooking, initialFormState);
  const { errors: clientErrors, onSubmit } = useClientValidation(bookingSchema);
  const errors = { ...state.errors, ...clientErrors };
  const today = new Date().toISOString().slice(0, 10);

  if (state.status === 'success')
    return <SuccessPanel message={state.message ?? booking.form.success} />;

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="relative">
      <HoneypotField />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextField name="name" label={f.name} autoComplete="name" required error={errors.name} />
        <TextField
          name="phone"
          label={f.phone}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          className="[&>input]:text-right"
          required
          error={errors.phone}
        />
        <TextField
          name="email"
          label={f.email}
          type="email"
          inputMode="email"
          autoComplete="email"
          dir="ltr"
          className="[&>input]:text-right"
          required
          error={errors.email}
        />
        <SelectField
          name="reason"
          label={f.reason}
          options={bookingReasons}
          required
          error={errors.reason}
        />
        <DateTimeField
          name="date"
          label={f.date}
          kind="date"
          min={today}
          required
          error={errors.date}
        />
        <DateTimeField name="time" label={f.time} kind="time" required error={errors.time} />
      </div>
      <FormMessage
        status={state.status}
        message={state.status === 'error' ? state.message : undefined}
      />
      <div className="flex justify-start pt-5">
        <button
          type="submit"
          disabled={pending}
          className={`${buttonClass('coral')} h-12 min-w-[152px] px-7 py-3 disabled:opacity-70`}
        >
          {pending ? booking.form.submitting : booking.form.submit}
        </button>
      </div>
    </form>
  );
}
