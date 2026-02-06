import { parseStackText } from "@/lib/parser";

describe("parseStackText", () => {
  it("parses valid json arrays", () => {
    const parsed = parseStackText('[{"name":"postgres","version":"13"}]');
    expect(parsed.error).toBeUndefined();
    expect(parsed.components).toHaveLength(1);
    expect(parsed.components[0].name).toBe("postgres");
  });

  it("parses valid yaml", () => {
    const parsed = parseStackText(`components:\n  - name: redis\n    version: \"6\"`);
    expect(parsed.error).toBeUndefined();
    expect(parsed.components).toHaveLength(1);
    expect(parsed.components[0].version).toBe("6");
  });

  it("returns parse error for invalid input", () => {
    const parsed = parseStackText("{not-valid");
    expect(parsed.components).toHaveLength(0);
    expect(parsed.error).toContain("Could not parse pasted input");
  });
});
