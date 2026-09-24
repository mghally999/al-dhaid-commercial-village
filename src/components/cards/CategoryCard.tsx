import { ArrowIcon } from '@/components/icons/ArrowIcon';
import type { CategoryCard as CategoryCardData } from '@/types/content';

type Props = {
  card: CategoryCardData;
  href: string;
  linkLabel: string;
};

/** Figma 38:78 / 59:72: numbered card with title, text and an "اعرف المزيد" arrow link. */
export function CategoryCard({ card, href, linkLabel }: Props) {
  return (
    <article className="flex h-full flex-col px-5 py-9">
      <p
        className="text-coral h-6 pt-1 text-end text-xs leading-4 tabular-nums md:text-start"
        aria-hidden="true"
      >
        {card.number}
      </p>
      <h3 className="text-navy-deep pt-9 text-2xl leading-8 font-bold">{card.title}</h3>
      <p className="text-slate pt-3 text-sm leading-6">{card.text}</p>
      <a
        href={href}
        className="group text-navy-deep mt-auto flex items-center justify-between pt-7 text-sm leading-5 font-bold"
      >
        <span>{linkLabel}</span>
        <ArrowIcon className="size-7 transition-transform group-hover:-translate-x-0.5" />
      </a>
    </article>
  );
}
