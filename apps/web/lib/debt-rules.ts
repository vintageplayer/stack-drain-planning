import rulesJson from "@/data/lifecycle-rules.json";
import { calculateDaysToEol, classifyStatus, computeInfraDebtScore, rankDebtItems } from "@/lib/scoring";
import type {
  AnalysisResult,
  DebtItem,
  LifecycleRule,
  StackComponentInput,
  UnmappedInput
} from "@/lib/types";

const lifecycleRules = rulesJson as LifecycleRule[];

export const SUPPORTED_COMPONENTS = [
  "ubuntu",
  "postgres",
  "redis",
  "kubernetes",
  "node",
  "python",
  "elasticsearch",
  "nginx"
] as const;

const SAMPLE_STACK: StackComponentInput[] = [
  { name: "ubuntu", version: "20.04" },
  { name: "postgres", version: "13" },
  { name: "redis", version: "6" },
  { name: "kubernetes", version: "1.24" },
  { name: "node", version: "18" },
  { name: "python", version: "3.9" },
  { name: "elasticsearch", version: "7" },
  { name: "nginx", version: "1.24" }
];

const ruleMap = new Map<string, LifecycleRule>(
  lifecycleRules.map((rule) => [`${normalizeName(rule.name)}@${normalizeVersion(rule.version)}`, rule])
);

export function getSampleStack(): StackComponentInput[] {
  return SAMPLE_STACK;
}

export function normalizeName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, "");
}

export function normalizeVersion(version: string): string {
  return version.trim().toLowerCase().replace(/^v/, "");
}

function isSupportedComponent(name: string): boolean {
  return (SUPPORTED_COMPONENTS as readonly string[]).includes(name);
}

export function analyzeStack(inputs: StackComponentInput[], today: Date = new Date()): AnalysisResult {
  const debtItems: DebtItem[] = [];
  const unmapped: UnmappedInput[] = [];

  for (const input of inputs) {
    const normalizedName = normalizeName(input.name);
    const normalizedVersion = normalizeVersion(input.version);

    if (!normalizedName || !normalizedVersion) {
      continue;
    }

    if (!isSupportedComponent(normalizedName)) {
      unmapped.push({
        name: input.name,
        version: input.version,
        reason: "unknown_component"
      });
      continue;
    }

    const rule = ruleMap.get(`${normalizedName}@${normalizedVersion}`);
    if (!rule) {
      unmapped.push({
        name: input.name,
        version: input.version,
        reason: "unknown_version"
      });
      continue;
    }

    const daysToEol = calculateDaysToEol(rule.eol_date, today);
    debtItems.push({
      name: normalizedName,
      current_version: normalizedVersion,
      recommended_version: rule.recommended_version,
      days_to_eol: daysToEol,
      status: classifyStatus(daysToEol),
      effort: rule.effort,
      why_it_matters: rule.why_it_matters,
      priority_rank: 0
    });
  }

  const ranked = rankDebtItems(debtItems);
  const counts = {
    overdue: ranked.filter((item) => item.status === "overdue").length,
    due_soon: ranked.filter((item) => item.status === "due_soon").length,
    healthy: ranked.filter((item) => item.status === "healthy").length
  };

  return {
    items: ranked,
    summary: {
      infra_debt_score: computeInfraDebtScore(counts.overdue, counts.due_soon),
      counts,
      top_priorities: ranked.slice(0, 3)
    },
    unmapped
  };
}
