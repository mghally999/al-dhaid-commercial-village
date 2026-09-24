import type { ComponentProps } from 'react';

const variants = {
  /** Amber fill, navy text (hero primary CTA, plan-visit directions). */
  primary: 'bg-amber text-navy font-bold hover:bg-[#e69e00]',
  /** Thin light border on dark backgrounds, semibold (hero). */
  outlineLight:
    'border border-white/50 text-white font-semibold hover:border-white hover:bg-white/5',
  /** Thin light border, regular weight (plan-visit "تواصل معنا"). */
  outlineLightSoft:
    'border border-white/35 text-white font-normal hover:border-white hover:bg-white/5',
  /** Navy fill (join form submit). */
  navy: 'bg-navy text-white font-bold hover:bg-navy-deep',
  /** Coral fill (booking submit). */
  coral: 'bg-coral text-white font-bold hover:bg-[#d9432a]',
} as const;

const sizes = {
  lg: 'px-6 py-4',
  md: 'px-5 py-3',
} as const;

export type ButtonVariant = keyof typeof variants;

export function buttonClass(variant: ButtonVariant = 'primary', size: keyof typeof sizes = 'lg') {
  return `inline-flex items-center justify-center gap-4 text-base leading-6 transition-colors ${sizes[size]} ${variants[variant]}`;
}

type ButtonLinkProps = ComponentProps<'a'> & {
  href: string;
  variant?: ButtonVariant;
  size?: keyof typeof sizes;
};

/** Square-cornered link styled as a button (Figma buttons have no radius). */
export function ButtonLink({
  variant = 'primary',
  size = 'lg',
  className = '',
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a className={`${buttonClass(variant, size)} ${className}`} {...rest}>
      {children}
    </a>
  );
}
