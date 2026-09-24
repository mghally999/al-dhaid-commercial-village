import type { ComponentProps } from 'react';

/** Figma filter chip: 14px text, 0.8px navy/25 border; active = navy fill. */
export const chipClass =
  'inline-flex items-center justify-center border border-navy/25 px-4 py-2 text-sm leading-5 text-navy-deep transition-colors';
export const chipActiveClass = 'border-navy bg-navy text-white';

export function ChipButton({
  active,
  className = '',
  ...rest
}: ComponentProps<'button'> & { active?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`${chipClass} ${active ? chipActiveClass : 'hover:border-navy'} ${className}`}
      {...rest}
    />
  );
}
