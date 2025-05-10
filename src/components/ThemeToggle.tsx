"use client";

import { useTheme, Theme } from "@/contexts/ThemeContext";

const themes: { value: Theme; label: string }[] = [
  { value: "light", label: "Classique" },
  { value: "dark", label: "Sombre" },
  { value: "pastel", label: "Pastel" },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex gap-2 items-center">
      {themes.map((t) => (
        <button
          key={t.value}
          className={`px-3 py-1 rounded-md font-semibold border transition text-xs
            ${
              theme === t.value
                ? "bg-blue-600 text-white border-blue-700"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
            }
          `}
          onClick={() => setTheme(t.value)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
