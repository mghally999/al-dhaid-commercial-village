/** Shared shape returned by the form Server Actions and consumed by `useActionState`. */
export type FormState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  /** Field name → first error message. */
  errors?: Record<string, string>;
};

export const initialFormState: FormState = { status: 'idle' };
