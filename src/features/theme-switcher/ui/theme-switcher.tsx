"use client";

import { useTheme } from "next-themes";
import { setThemeAction } from "@/shared/server-actions/theme/actions";
import { useEffect, useState, useTransition } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

const THEMES = [
  { name: "light", icon: Sun },
  { name: "dark", icon: Moon },
  { name: "system", icon: Monitor },
] as const;

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (newTheme: string): void => {
    setTheme(newTheme);
    startTransition(async () => {
      await setThemeAction(newTheme);
    });
  };

  return (
    <div className="flex gap-0.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-1">
      {THEMES.map(({ name, icon: Icon }) => {
        const isActive = mounted && theme === name;
        return (
          <button
            key={name}
            type="button"
            onClick={() => handleThemeChange(name)}
            disabled={isPending}
            className={`relative rounded-lg p-2 transition-all duration-200 ${
              isActive
                ? "bg-[var(--color-bg)] text-[var(--color-primary)] shadow-sm"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
            title={name.charAt(0).toUpperCase() + name.slice(1)}
            aria-label={`Switch to ${name} theme`}
          >
            <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
          </button>
        );
      })}
    </div>
  );
}
