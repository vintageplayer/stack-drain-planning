import type { DebtItem } from "@/lib/types";

interface Props {
  items: DebtItem[];
}

export function TopPriorities({ items }: Props) {
  return (
    <section className="panel-surface p-4 print:hidden">
      <h3 className="text-lg font-semibold">Top 3 Debt to Pay Next</h3>
      <ol className="mt-3 space-y-2">
        {items.map((item, index) => (
          <li
            key={`${item.name}-${item.current_version}-${item.priority_rank}-${index}`}
            className="rounded-lg border border-white/25 bg-black/20 p-3 text-sm shadow-sm"
          >
            <p className="font-semibold">
              #{item.priority_rank} {item.name} {item.current_version} {'->'} {item.recommended_version}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-300">
              Status: {item.status} | Days to EOL: {item.days_to_eol} | Effort: {item.effort}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
