'use client';

import { useState, type FormEvent } from 'react';
import type { ZodMiniType } from 'zod/mini';
import { validate } from '@/lib/schemas';

/** Runs the shared zod schema in the browser before the Server Action is called. */
export function useClientValidation(schema: ZodMiniType) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const result = validate(schema, Object.fromEntries(new FormData(form)));
    if (result.success) {
      setErrors({});
      return;
    }
    event.preventDefault();
    setErrors(result.errors);
    const first = Object.keys(result.errors)[0];
    const el = form.elements.namedItem(first);
    if (el instanceof HTMLElement) el.focus();
  }

  return { errors, onSubmit };
}
