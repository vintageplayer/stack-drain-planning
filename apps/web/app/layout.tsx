import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stack Drain Infra Debt POC",
  description: "Single-page infra debt analyzer for lifecycle risk and upgrade priorities."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
