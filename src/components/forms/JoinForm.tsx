'use client';

import { useActionState } from 'react';
import { submitJoin } from '@/app/actions/forms';
import { buttonClass } from '@/components/ui/ButtonLink';
import { activityTypes, join } from '@/content/ar/join';
import { initialFormState } from '@/lib/forms';
import { joinSchema } from '@/lib/schemas';
import {
  FormMessage,
  HoneypotField,
  SelectField,
  SuccessPanel,
  TextField,
  TextareaField,
} from './fields';
import { useClientValidation } from './useClientValidation';

const f = join.form.fields;

/** Figma 38:360 / 59:354 plus the agreed "رقم واتساب" field. */
export function JoinForm() {
  const [state, formAction, pending] = useActionState(submitJoin, initialFormState);
  const { errors: clientErrors, onSubmit } = useClientValidation(joinSchema);
  const errors = { ...state.errors, ...clientErrors };

  if (state.status === 'success')
    return <SuccessPanel message={state.message ?? join.form.success} />;

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="relative">
      <HoneypotField />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextField
          name="fullName"
          label={f.fullName}
          autoComplete="name"
          required
          error={errors.fullName}
        />
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
          name="whatsapp"
          label={f.whatsapp}
          type="tel"
          inputMode="tel"
          dir="ltr"
          className="[&>input]:text-right"
          required
          error={errors.whatsapp}
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
          className="lg:col-span-2 xl:col-span-1"
          name="activityType"
          label={f.activityType}
          options={activityTypes}
          required
          error={errors.activityType}
        />
        <TextField
          className="lg:col-span-2 xl:col-span-1"
          name="projectName"
          label={f.projectName}
          autoComplete="organization"
          required
          error={errors.projectName}
        />
        <TextareaField
          name="about"
          label={f.about}
          required
          className="md:col-span-2"
          error={errors.about}
        />
      </div>
      <FormMessage
        status={state.status}
        message={state.status === 'error' ? state.message : undefined}
      />
      <button
        type="submit"
        disabled={pending}
        className={`${buttonClass('navy')} mt-4 h-14 w-full disabled:opacity-70`}
      >
        {pending ? join.form.submitting : join.form.submit}
      </button>
    </form>
  );
}
