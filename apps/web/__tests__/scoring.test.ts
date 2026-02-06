import { calculateDaysToEol, classifyStatus, computeInfraDebtScore, rankDebtItems } from "@/lib/scoring";
import type { DebtItem } from "@/lib/types";

describe("scoring", () => {
  it("classifies boundary statuses", () => {
    expect(classifyStatus(-1)).toBe("overdue");
    expect(classifyStatus(0)).toBe("due_soon");
    expect(classifyStatus(180)).toBe("due_soon");
    expect(classifyStatus(181)).toBe("healthy");
  });

  it("calculates score with floor at 0", () => {
    expect(computeInfraDebtScore(1, 2)).toBe(55);
    expect(computeInfraDebtScore(10, 10)).toBe(0);
  });

  it("ranks by severity then nearest EOL", () => {
    const sample: DebtItem[] = [
      {
        name: "node",
        current_version: "18",
        recommended_version: "20",
        days_to_eol: 30,
        status: "due_soon",
        effort: "S",
        why_it_matters: "sample",
        priority_rank: 0
      },
      {
        name: "postgres",
        current_version: "12",
        recommended_version: "16",
        days_to_eol: -10,
        status: "overdue",
        effort: "M",
        why_it_matters: "sample",
        priority_rank: 0
      },
      {
        name: "redis",
        current_version: "6",
        recommended_version: "7",
        days_to_eol: 10,
        status: "due_soon",
        effort: "S",
        why_it_matters: "sample",
        priority_rank: 0
      }
    ];

    const ranked = rankDebtItems(sample);
    expect(ranked[0].name).toBe("postgres");
    expect(ranked[1].name).toBe("redis");
    expect(ranked[2].name).toBe("node");
    expect(ranked[0].priority_rank).toBe(1);
  });

  it("computes days to eol against local day", () => {
    const days = calculateDaysToEol("2026-02-06", new Date("2026-02-05T12:00:00"));
    expect(days).toBe(1);
  });
});
