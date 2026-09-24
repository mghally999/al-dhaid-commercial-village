import type { ComponentProps } from 'react';

const variants = {
  /** Amber fill, navy text (Figma hero primary CTA). */
  primary: 'bg-amber text-navy font-bold hover:bg-[#e69e00]',
  /** Thin light border on dark backgrounds. */
  outlineLight:
    'border border-white/50 text-white font-semibold hover:border-white hover:bg-white/5',
  /** Navy fill (form submits, chips). */
  navy: 'bg-navy text-white font-semibold hover:bg-navy-deep',
  /** Thin navy border on light backgrounds. */
  outlineNavy: 'border border-navy/25 text-navy-deep font-semibold hover:border-navy',
} as const;

type ButtonLinkProps = ComponentProps<'a'> & {
  href: string;
  variant?: keyof typeof variants;
};

/** Square-cornered link styled as a button (Figma buttons have no radius). */
export function ButtonLink({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-4 px-6 py-4 text-base leading-6 transition-colors ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
