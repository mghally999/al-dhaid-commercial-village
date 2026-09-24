import type { SVGProps } from 'react';

/** Figma dropdown chevron (10×6, 1.5px stroke). */
export function ChevronIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 10 6"
      width={10}
      height={6}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M1 1L5 5L9 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
