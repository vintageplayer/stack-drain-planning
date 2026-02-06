import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { InfraDebtApp } from "@/components/InfraDebtApp";

describe("InfraDebtApp UI", () => {
  it("loads sample stack and renders grouped output", () => {
    render(<InfraDebtApp />);

    fireEvent.click(screen.getByRole("button", { name: "Use Sample Stack" }));
    fireEvent.click(screen.getByRole("button", { name: "Analyze Infra Debt" }));

    expect(screen.getByText("Infra Debt Score")).toBeInTheDocument();
    expect(screen.getByText("Top 3 Debt to Pay Next")).toBeInTheDocument();
    expect(screen.getAllByText(/^Overdue$/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/^Due Soon$/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/^Healthy$/i).length).toBeGreaterThan(0);
    expect(screen.getByText("30/90 Day Plan")).toBeInTheDocument();
  });
});
