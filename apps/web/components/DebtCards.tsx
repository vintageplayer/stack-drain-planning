import type { DebtItem, DebtStatus } from "@/lib/types";

interface Props {
  title: string;
  status: DebtStatus;
  items: DebtItem[];
}

function styleFor(status: DebtStatus): string {
  if (status === "overdue") {
    return "border-rose-400/40 bg-rose-500/15";
  }
  if (status === "due_soon") {
    return "border-amber-400/40 bg-amber-500/15";
  }
  return "border-emerald-400/40 bg-emerald-500/15";
}

export function DebtCards({ title, status, items }: Props) {
  return (
    <section className="panel-surface p-4 print:hidden">
      <h3 className="text-lg font-semibold">{title}</h3>
      {items.length === 0 ? <p className="mt-2 text-sm text-slate-300">None</p> : null}
      <div className="mt-3 space-y-2">
        {items.map((item, index) => (
          <article
            key={`${item.name}-${item.current_version}-${item.recommended_version}-${index}`}
            className={`rounded-lg border p-3 shadow-sm ${styleFor(status)}`}
          >
            <p className="text-sm font-semibold capitalize">
              {item.name} {item.current_version} {'->'} {item.recommended_version}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-200">{item.why_it_matters}</p>
            <p className="mt-1 text-xs text-slate-300">Days to EOL: {item.days_to_eol}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
