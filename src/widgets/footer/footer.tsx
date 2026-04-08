"use client";

import { LanguageSwitcher } from "@/features/language-switcher/ui/language-switcher";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6 sm:flex-row sm:justify-between lg:px-8">
        {/* Copyright */}
        <p className="text-sm text-[var(--color-text-secondary)]">
          {t("copyright", { year: new Date().getFullYear() })}
        </p>

        {/* Language Switcher */}
        <LanguageSwitcher />
      </div>
    </footer>
  );
}
