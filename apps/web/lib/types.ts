export type ComponentName =
  | "ubuntu"
  | "postgres"
  | "redis"
  | "kubernetes"
  | "node"
  | "python"
  | "elasticsearch"
  | "nginx";

export type Effort = "S" | "M" | "L";
export type DebtStatus = "overdue" | "due_soon" | "healthy";

export interface StackComponentInput {
  name: string;
  version: string;
}

export interface LifecycleRule {
  name: ComponentName;
  version: string;
  eol_date: string;
  recommended_version: string;
  effort: Effort;
  why_it_matters: string;
}

export interface DebtItem {
  name: string;
  current_version: string;
  recommended_version: string;
  days_to_eol: number;
  status: DebtStatus;
  effort: Effort;
  why_it_matters: string;
  priority_rank: number;
}

export interface DebtSummary {
  infra_debt_score: number;
  counts: {
    overdue: number;
    due_soon: number;
    healthy: number;
  };
  top_priorities: DebtItem[];
}

export interface UnmappedInput {
  name: string;
  version: string;
  reason: "unknown_component" | "unknown_version";
}

export interface AnalysisResult {
  items: DebtItem[];
  summary: DebtSummary;
  unmapped: UnmappedInput[];
}
