import YAML from "yaml";

import type { StackComponentInput } from "@/lib/types";

interface ParseResult {
  components: StackComponentInput[];
  error?: string;
}

function normalizeParsedData(data: unknown): StackComponentInput[] {
  const source = Array.isArray(data)
    ? data
    : typeof data === "object" && data !== null && Array.isArray((data as { components?: unknown }).components)
      ? ((data as { components: unknown[] }).components ?? [])
      : [];

  return source
    .filter((entry) => typeof entry === "object" && entry !== null)
    .map((entry) => {
      const item = entry as { name?: unknown; version?: unknown };
      return {
        name: typeof item.name === "string" ? item.name.trim() : "",
        version: typeof item.version === "string" ? item.version.trim() : ""
      };
    })
    .filter((item) => item.name.length > 0 && item.version.length > 0);
}

export function parseStackText(raw: string): ParseResult {
  const text = raw.trim();
  if (!text) {
    return { components: [] };
  }

  try {
    const parsed = JSON.parse(text) as unknown;
    return { components: normalizeParsedData(parsed) };
  } catch {
    // Fallback to YAML parsing.
  }

  try {
    const parsed = YAML.parse(text) as unknown;
    return { components: normalizeParsedData(parsed) };
  } catch {
    return {
      components: [],
      error: "Could not parse pasted input. Provide valid JSON or YAML."
    };
  }
}
