import type { DebtItem, DebtSummary, StackComponentInput, UnmappedInput } from "@/lib/types";

interface Props {
  inventory: StackComponentInput[];
  items: DebtItem[];
  summary: DebtSummary;
  unmapped: UnmappedInput[];
}

export function PrintReport({ inventory, items, summary, unmapped }: Props) {
  return (
    <section className="panel-surface p-4 print:p-0">
      <div className="flex items-center justify-between print:hidden">
        <h3 className="text-lg font-semibold">Report</h3>
        <button
          type="button"
          className="btn-shell border-white/30 px-3 py-2 text-xs hover:bg-white/10"
          onClick={() => window.print()}
        >
          Print / Save PDF
        </button>
      </div>

      <div className="mt-3 space-y-5 text-sm print:mt-0 print:space-y-3 print:text-[11px]">
        <article className="print-keep">
          <h4 className="font-semibold">Inventory</h4>
          <table className="mt-2 w-full text-left text-xs print:mt-1 print:text-[10.5px]">
            <thead>
              <tr>
                <th className="border border-white/20 bg-white/5 px-2 py-1 font-semibold print:border-zinc-300 print:bg-zinc-100">
                  Component
                </th>
                <th className="border border-white/20 bg-white/5 px-2 py-1 font-semibold print:border-zinc-300 print:bg-zinc-100">
                  Version
                </th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, index) => (
                <tr key={`${item.name}-${item.version}-${index}`}>
                  <td className="border border-white/20 px-2 py-1 print:border-zinc-300">{item.name}</td>
                  <td className="border border-white/20 px-2 py-1 print:border-zinc-300">{item.version}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className="print-keep">
          <h4 className="font-semibold">Grouped Debt Items</h4>
          <p className="text-xs leading-relaxed">Overdue: {summary.counts.overdue}</p>
          <p className="text-xs leading-relaxed">Due soon: {summary.counts.due_soon}</p>
          <p className="text-xs leading-relaxed">Healthy: {summary.counts.healthy}</p>
        </article>

        <article className="print-keep">
          <h4 className="font-semibold">Top Priorities</h4>
          <ul className="mt-1 list-disc pl-5 text-xs leading-relaxed">
            {summary.top_priorities.map((item, index) => (
              <li key={`${item.name}-${item.priority_rank}-${item.current_version}-${index}`}>
                {item.name} {item.current_version} {'->'} {item.recommended_version} ({item.status})
              </li>
            ))}
          </ul>
        </article>

        <article className="print-keep">
          <h4 className="font-semibold">30/90 Day Plan</h4>
          <p className="text-xs leading-relaxed">Day 0-30: Triage overdue components and freeze new non-essential upgrades.</p>
          <p className="text-xs leading-relaxed">Day 31-90: Execute top three upgrades and re-run debt score after each release.</p>
        </article>

        {unmapped.length > 0 ? (
          <article className="print-keep">
            <h4 className="font-semibold">Unmapped Inputs</h4>
            <ul className="mt-1 list-disc pl-5 text-xs leading-relaxed">
              {unmapped.map((entry, index) => (
                <li key={`${entry.name}-${entry.version}-${index}`}>
                  {entry.name} {entry.version} ({entry.reason})
                </li>
              ))}
            </ul>
          </article>
        ) : null}

        <article className="print-keep">
          <h4 className="font-semibold">Score Snapshot</h4>
          <p className="text-xs">Infra Debt Score: {summary.infra_debt_score}/100</p>
        </article>

        <article>
          <h4 className="font-semibold">Detailed Inventory Analysis</h4>
          <ul className="mt-1 list-disc pl-5 text-xs leading-relaxed">
            {items.map((item, index) => (
              <li key={`${item.name}-${item.current_version}-${item.recommended_version}-${index}`}>
                {item.name} {item.current_version}: {item.status}, {item.days_to_eol} days to EOL
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
