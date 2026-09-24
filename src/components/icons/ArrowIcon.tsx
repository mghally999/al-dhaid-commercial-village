import type { SVGProps } from 'react';

/** Figma "Arrow": 28px ring with a forward (←) arrow, colour from `currentColor`. */
export function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 28" width={28} height={28} aria-hidden="true" focusable="false" {...props}>
      <circle cx="14" cy="14" r="13.6" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <path
        fill="currentColor"
        d="M12.584 10.328h2.432l-2.192 3.68 2.192 3.664h-2.432l-2.416-3.664 2.416-3.68Zm-.112 2.72h5.36v1.92h-5.36v-1.92Z"
      />
    </svg>
  );
}
