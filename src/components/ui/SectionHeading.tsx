import type { ReactNode } from 'react';

type Props = {
  eyebrow?: string;
  /** Heading content; use <span className="block"> for Figma line breaks and text-coral for highlights. */
  children: ReactNode;
  /** lg = 58px semibold display (cream sections); md = 48px regular (colour bands). */
  size?: 'lg' | 'md';
  tone?: 'dark' | 'light';
  eyebrowClassName?: string;
  className?: string;
  id?: string;
};

const sizes = {
  lg: 'font-semibold text-[46.4px] leading-[54.75px] md:text-[58.32px] md:leading-[68.8px]',
  md: 'font-normal text-[48px] leading-[60px]',
} as const;

/** Eyebrow + h2 pair used by every section (Figma: 11.52px coral eyebrow, Noto Kufi Arabic heading). */
export function SectionHeading({
  eyebrow,
  children,
  size = 'lg',
  tone = 'dark',
  eyebrowClassName = 'text-coral',
  className = '',
  id,
}: Props) {
  return (
    <div className={className}>
      {eyebrow ? (
        <p className={`text-[11.52px] leading-[17.28px] ${eyebrowClassName}`}>{eyebrow}</p>
      ) : null}
      <h2
        id={id}
        className={`font-heading ${eyebrow ? 'pt-4' : ''} ${sizes[size]} ${tone === 'light' ? 'text-white' : 'text-navy-deep'}`}
      >
        {children}
      </h2>
    </div>
  );
}
