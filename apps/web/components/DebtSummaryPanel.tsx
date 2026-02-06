interface Props {
  score: number;
  overdue: number;
  dueSoon: number;
  healthy: number;
}

function scoreTone(score: number): string {
  if (score >= 80) {
    return "text-emerald-300";
  }
  if (score >= 50) {
    return "text-amber-300";
  }
  return "text-rose-300";
}

export function DebtSummaryPanel({ score, overdue, dueSoon, healthy }: Props) {
  return (
    <section className="panel-surface p-5 print:hidden">
      <p className="text-sm uppercase tracking-wide text-slate-200">Infra Debt Score</p>
      <p className={`mt-2 text-5xl font-bold leading-none ${scoreTone(score)}`}>{score}/100</p>
      <div className="mt-4 grid grid-cols-3 gap-2 text-sm sm:gap-3">
        <div className="rounded-md border border-rose-400/35 bg-rose-500/20 p-2 text-center">
          <p className="text-rose-200">Overdue</p>
          <p className="text-xl font-semibold">{overdue}</p>
        </div>
        <div className="rounded-md border border-amber-400/35 bg-amber-500/20 p-2 text-center">
          <p className="text-amber-200">Due soon</p>
          <p className="text-xl font-semibold">{dueSoon}</p>
        </div>
        <div className="rounded-md border border-emerald-400/35 bg-emerald-500/20 p-2 text-center">
          <p className="text-emerald-200">Healthy</p>
          <p className="text-xl font-semibold">{healthy}</p>
        </div>
      </div>
    </section>
  );
}
