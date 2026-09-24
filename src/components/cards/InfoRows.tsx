import type { InfoRow } from '@/types/content';

/** Figma 38:305: amber label, white value, hairline rules (plan-your-visit band). */
export function InfoRows({ rows }: { rows: readonly InfoRow[] }) {
  return (
    <dl className="border-t border-white/20">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-[auto_1fr] items-center gap-x-[50px] border-b border-white/20 py-6 text-base leading-6 lg:px-[47px]"
        >
          <dt className="text-amber">{row.label}</dt>
          <dd className="text-white">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
