import { analyzeStack } from "@/lib/debt-rules";

describe("analyzeStack", () => {
  it("surfaces unmapped components and versions", () => {
    const result = analyzeStack(
      [
        { name: "unknown", version: "1" },
        { name: "postgres", version: "999" },
        { name: "postgres", version: "13" }
      ],
      new Date("2026-02-05T00:00:00")
    );

    expect(result.unmapped).toHaveLength(2);
    expect(result.items.length).toBe(1);
  });
});
