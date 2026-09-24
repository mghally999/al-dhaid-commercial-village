import type { Feature } from '@/types/content';

/** Figma 38:160: top rule, 18px bold title, 14px text at 80% navy. */
export function FeatureItem({ feature }: { feature: Feature }) {
  return (
    <div className="border-navy/35 border-t pt-4">
      <h3 className="text-navy text-lg leading-7 font-bold">{feature.title}</h3>
      <p className="text-navy/80 pt-2 text-sm leading-5">{feature.text}</p>
    </div>
  );
}
