import type { ReactNode } from 'react';

/** Figma frame is 1280px with 40px gutters (24px on mobile). */
export function Container({
  className = '',
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-6 md:px-10 ${className}`}>{children}</div>
  );
}
