import type { StackComponentInput } from "@/lib/types";

interface Props {
  rows: StackComponentInput[];
  pastedText: string;
  parseError?: string;
  onChangeRow: (index: number, field: "name" | "version", value: string) => void;
  onAddRow: () => void;
  onRemoveRow: (index: number) => void;
  onPastedTextChange: (value: string) => void;
  onUseSample: () => void;
  onAnalyze: () => void;
}

export function StackInputPanel({
  rows,
  pastedText,
  parseError,
  onChangeRow,
  onAddRow,
  onRemoveRow,
  onPastedTextChange,
  onUseSample,
  onAnalyze
}: Props) {
  return (
    <section className="panel-surface p-5 print:hidden">
      <h2 className="text-lg font-semibold">Input Stack</h2>
      <p className="mt-1 text-sm text-slate-200/95">Add components manually and/or paste JSON/YAML.</p>

      <div className="mt-4 space-y-3">
        {rows.map((row, index) => (
          <div className="grid grid-cols-[1fr_1fr_auto] gap-2 sm:gap-3" key={`${index}-${row.name}-${row.version}`}>
            <input
              aria-label={`component-name-${index}`}
              className="input-shell px-3 py-2 text-sm"
              placeholder="component (e.g. postgres)"
              value={row.name}
              onChange={(event) => onChangeRow(index, "name", event.target.value)}
            />
            <input
              aria-label={`component-version-${index}`}
              className="input-shell px-3 py-2 text-sm"
              placeholder="version (e.g. 14)"
              value={row.version}
              onChange={(event) => onChangeRow(index, "version", event.target.value)}
            />
            <button
              type="button"
              className="btn-shell px-3 py-2 text-sm hover:bg-white/10"
              onClick={() => onRemoveRow(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="btn-shell px-3 py-2 text-sm hover:bg-white/10"
          onClick={onAddRow}
        >
          Add Component
        </button>
        <button
          type="button"
          className="btn-shell border-sky-400/70 bg-sky-500/20 px-3 py-2 text-sm hover:bg-sky-500/30"
          onClick={onUseSample}
        >
          Use Sample Stack
        </button>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-medium" htmlFor="stack-textarea">
          Paste JSON or YAML
        </label>
        <textarea
          id="stack-textarea"
          className="input-shell h-40 w-full p-3 text-xs"
          placeholder={'[{"name":"postgres","version":"13"}]'}
          value={pastedText}
          onChange={(event) => onPastedTextChange(event.target.value)}
        />
        {parseError ? <p className="mt-2 text-sm text-rose-300">{parseError}</p> : null}
      </div>

      <button
        type="button"
        className="btn-shell mt-4 w-full border-orange-500 bg-orange-500 px-3 py-3 text-sm font-semibold text-black hover:bg-orange-400"
        onClick={onAnalyze}
      >
        Analyze Infra Debt
      </button>
    </section>
  );
}
