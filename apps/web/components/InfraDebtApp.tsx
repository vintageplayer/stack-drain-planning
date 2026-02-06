"use client";

import { useMemo, useState } from "react";

import { DebtCards } from "@/components/DebtCards";
import { DebtSummaryPanel } from "@/components/DebtSummaryPanel";
import { PrintReport } from "@/components/PrintReport";
import { StackInputPanel } from "@/components/StackInputPanel";
import { TopPriorities } from "@/components/TopPriorities";
import { analyzeStack, getSampleStack } from "@/lib/debt-rules";
import { parseStackText } from "@/lib/parser";
import type { AnalysisResult, StackComponentInput } from "@/lib/types";

const INITIAL_ROWS: StackComponentInput[] = [
  { name: "", version: "" },
  { name: "", version: "" }
];

const EMPTY_RESULT: AnalysisResult = {
  items: [],
  summary: {
    infra_debt_score: 100,
    counts: { overdue: 0, due_soon: 0, healthy: 0 },
    top_priorities: []
  },
  unmapped: []
};

export function InfraDebtApp() {
  const [rows, setRows] = useState<StackComponentInput[]>(INITIAL_ROWS);
  const [pastedText, setPastedText] = useState("");
  const [parseError, setParseError] = useState<string | undefined>();
  const [result, setResult] = useState<AnalysisResult>(EMPTY_RESULT);
  const [inventory, setInventory] = useState<StackComponentInput[]>([]);

  const grouped = useMemo(
    () => ({
      overdue: result.items.filter((item) => item.status === "overdue"),
      dueSoon: result.items.filter((item) => item.status === "due_soon"),
      healthy: result.items.filter((item) => item.status === "healthy")
    }),
    [result.items]
  );

  function handleChangeRow(index: number, field: "name" | "version", value: string): void {
    setRows((current) =>
      current.map((row, rowIndex) => (rowIndex === index ? { ...row, [field]: value } : row))
    );
  }

  function handleAddRow(): void {
    setRows((current) => [...current, { name: "", version: "" }]);
  }

  function handleRemoveRow(index: number): void {
    setRows((current) => {
      if (current.length <= 1) {
        return current;
      }
      return current.filter((_, rowIndex) => rowIndex !== index);
    });
  }

  function handleUseSample(): void {
    const sample = getSampleStack();
    setRows(sample);
    setPastedText(JSON.stringify(sample, null, 2));
    setParseError(undefined);
  }

  function handleAnalyze(): void {
    const rowComponents = rows.filter((row) => row.name.trim() && row.version.trim());
    const parsed = parseStackText(pastedText);
    setParseError(parsed.error);

    const merged = [...rowComponents, ...parsed.components];
    setInventory(merged);
    setResult(analyzeStack(merged));
  }

  return (
    <main className="min-h-screen p-6 lg:p-10">
      <header className="mx-auto mb-6 max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight lg:text-5xl">Stack Drain: Infra Debt Analyzer</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-200/95 lg:text-base">
          Evaluate lifecycle risk across your stack and prioritize upgrade work with a deterministic Infra Debt score.
        </p>
      </header>

      <section className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_1.2fr]">
        <StackInputPanel
          rows={rows}
          pastedText={pastedText}
          parseError={parseError}
          onChangeRow={handleChangeRow}
          onAddRow={handleAddRow}
          onRemoveRow={handleRemoveRow}
          onPastedTextChange={setPastedText}
          onUseSample={handleUseSample}
          onAnalyze={handleAnalyze}
        />

        <div className="space-y-4">
          <DebtSummaryPanel
            score={result.summary.infra_debt_score}
            overdue={result.summary.counts.overdue}
            dueSoon={result.summary.counts.due_soon}
            healthy={result.summary.counts.healthy}
          />

          {result.unmapped.length > 0 ? (
            <section className="panel-surface rounded-2xl border-rose-300/40 bg-rose-500/15 p-4 print:hidden">
              <h3 className="text-lg font-semibold">Unmapped Inputs</h3>
              <ul className="mt-2 list-disc pl-5 text-sm leading-relaxed">
                {result.unmapped.map((entry, index) => (
                  <li key={`${entry.name}-${entry.version}-${index}`}>
                    {entry.name} {entry.version}: {entry.reason === "unknown_component" ? "unknown component" : "version not in dataset"}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <TopPriorities items={result.summary.top_priorities} />
          <DebtCards title="Overdue" status="overdue" items={grouped.overdue} />
          <DebtCards title="Due Soon" status="due_soon" items={grouped.dueSoon} />
          <DebtCards title="Healthy" status="healthy" items={grouped.healthy} />
          <PrintReport inventory={inventory} items={result.items} summary={result.summary} unmapped={result.unmapped} />
        </div>
      </section>
    </main>
  );
}
