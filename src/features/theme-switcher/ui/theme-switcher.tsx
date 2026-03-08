"use client";

import { useTheme } from "next-themes";
import { setThemeAction } from "@/shared/server-actions/theme/actions";
import { useEffect, useState, useTransition } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const themes = [
    { name: "light", icon: Sun },
    { name: "dark", icon: Moon },
    { name: "system", icon: Monitor },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {themes.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => {}}
            disabled={isPending}
            className={`p-2 rounded-md transition-all ${"text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"} `}
            title={name.charAt(0).toUpperCase() + name.slice(1)}
          >
            <Icon size={18} />
          </button>
        ))}
      </div>
    );
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    startTransition(async () => {
      await setThemeAction(newTheme);
    });
  };

  return (
    <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
      {themes.map(({ name, icon: Icon }) => (
        <button
          key={name}
          onClick={() => handleThemeChange(name)}
          disabled={isPending}
          className={`p-2 rounded-md transition-all ${
            theme === name
              ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
              : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
          title={name.charAt(0).toUpperCase() + name.slice(1)}
        >
          <Icon size={18} />
        </button>
      ))}
    </div>
  );
};
