import type { DebtItem, DebtStatus } from "@/lib/types";

const DAY_MS = 24 * 60 * 60 * 1000;

function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function parseEolDate(eolDateIso: string): Date {
  const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(eolDateIso);
  if (!dateOnlyMatch) {
    return new Date(eolDateIso);
  }

  const [, year, month, day] = dateOnlyMatch;
  return new Date(Number(year), Number(month) - 1, Number(day));
}

export function calculateDaysToEol(eolDateIso: string, today: Date = new Date()): number {
  const eol = startOfLocalDay(parseEolDate(eolDateIso));
  const base = startOfLocalDay(today);
  return Math.floor((eol.getTime() - base.getTime()) / DAY_MS);
}

export function classifyStatus(daysToEol: number): DebtStatus {
  if (daysToEol < 0) {
    return "overdue";
  }
  if (daysToEol <= 180) {
    return "due_soon";
  }
  return "healthy";
}

export function computeInfraDebtScore(overdueCount: number, dueSoonCount: number): number {
  const score = 100 - overdueCount * 25 - dueSoonCount * 10;
  return Math.max(0, score);
}

function severityRank(status: DebtStatus): number {
  if (status === "overdue") {
    return 0;
  }
  if (status === "due_soon") {
    return 1;
  }
  return 2;
}

export function rankDebtItems(items: DebtItem[]): DebtItem[] {
  const ranked = [...items].sort((a, b) => {
    const severity = severityRank(a.status) - severityRank(b.status);
    if (severity !== 0) {
      return severity;
    }
    return a.days_to_eol - b.days_to_eol;
  });

  return ranked.map((item, index) => ({
    ...item,
    priority_rank: index + 1
  }));
}
