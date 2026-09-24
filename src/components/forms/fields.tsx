'use client';

import { useId, useState, type ComponentProps } from 'react';
import { CalendarIcon } from '@/components/icons/CalendarIcon';
import { ChevronIcon } from '@/components/icons/ChevronIcon';
import { ClockIcon } from '@/components/icons/ClockIcon';
import type { SelectOption } from '@/types/content';

/** Figma text input: 0.8px navy/24 border, 13.44px text, placeholder in slate-light. */
export const fieldClass =
  'block w-full border border-navy-deep/25 bg-transparent px-4 py-[13.6px] text-[13.44px] leading-normal text-navy-deep placeholder:text-slate-light focus:border-navy focus:outline-none aria-invalid:border-coral';

type BaseProps = {
  name: string;
  label: string;
  error?: string;
  className?: string;
};

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="text-coral pt-1 text-xs leading-4">
      {error}
    </p>
  );
}

export function TextField({
  name,
  label,
  error,
  className = '',
  ...rest
}: BaseProps & Omit<ComponentProps<'input'>, 'name' | 'className'>) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={name}
        placeholder={label}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={fieldClass}
        {...rest}
      />
      <FieldError id={errorId} error={error} />
    </div>
  );
}

export function TextareaField({
  name,
  label,
  error,
  className = '',
  ...rest
}: BaseProps & Omit<ComponentProps<'textarea'>, 'name' | 'className'>) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        placeholder={label}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`${fieldClass} h-24 resize-none leading-[20.16px]`}
        {...rest}
      />
      <FieldError id={errorId} error={error} />
    </div>
  );
}

/** Native select with the Figma chevron at the end edge; the label is the empty first option. */
export function SelectField({
  name,
  label,
  error,
  options,
  className = '',
  ...rest
}: BaseProps & { options: readonly SelectOption[] } & Omit<
    ComponentProps<'select'>,
    'name' | 'className'
  >) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          defaultValue=""
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`${fieldClass} appearance-none pe-12`}
          {...rest}
        >
          <option value="">{label}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronIcon className="text-navy-deep pointer-events-none absolute end-5 top-1/2 -translate-y-1/2" />
      </div>
      <FieldError id={errorId} error={error} />
    </div>
  );
}

/**
 * Native date / time input. Browsers ignore `placeholder` on these, so the Arabic label is drawn
 * as an overlay while the field is empty and unfocused (decision: "التاريخ" / "الوقت").
 * Figma places the value at the physical left and the icon at the right.
 */
export function DateTimeField({
  name,
  label,
  error,
  kind,
  className = '',
  ...rest
}: BaseProps & { kind: 'date' | 'time' } & Omit<
    ComponentProps<'input'>,
    'name' | 'className' | 'type'
  >) {
  const id = useId();
  const errorId = `${id}-error`;
  const [filled, setFilled] = useState(false);
  const [focused, setFocused] = useState(false);
  const showLabel = !filled && !focused;
  const Icon = kind === 'date' ? CalendarIcon : ClockIcon;
  return (
    <div className={className}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={kind}
          dir="ltr"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(e) => setFilled(e.currentTarget.value !== '')}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${fieldClass} pr-10 text-left [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:size-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 ${showLabel ? 'text-transparent' : ''}`}
          {...rest}
        />
        {showLabel ? (
          <span
            aria-hidden="true"
            className="text-slate-light pointer-events-none absolute inset-y-0 left-4 flex items-center text-[13.44px]"
          >
            {label}
          </span>
        ) : null}
        <Icon className="text-navy-deep pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" />
      </div>
      <FieldError id={errorId} error={error} />
    </div>
  );
}

/** Hidden anti-spam field. Bots fill it, humans never see it. */
export function HoneypotField() {
  return (
    <div className="absolute -start-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
      <label htmlFor="website">Website</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function FormMessage({
  status,
  message,
}: {
  status: 'idle' | 'success' | 'error';
  message?: string;
}) {
  return (
    <p
      role="status"
      aria-live="polite"
      className={`text-sm leading-5 ${status === 'error' ? 'text-coral' : 'text-navy-deep'} ${message ? '' : 'sr-only'}`}
    >
      {message ?? ''}
    </p>
  );
}

export function SuccessPanel({ message }: { message: string }) {
  return (
    <div role="status" className="border-navy/25 border bg-white px-6 py-10 text-center">
      <svg
        viewBox="0 0 48 48"
        width={48}
        height={48}
        aria-hidden="true"
        className="text-whatsapp mx-auto"
      >
        <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="2" />
        <path
          d="M15 24.5l6 6 12-13"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="text-navy-deep pt-4 text-base leading-7 font-semibold">{message}</p>
    </div>
  );
}
