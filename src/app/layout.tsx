import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo List Next.js",
  description: "Projet simple pour apprendre Next.js",
};

import { ThemeProvider } from "@/contexts/ThemeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
