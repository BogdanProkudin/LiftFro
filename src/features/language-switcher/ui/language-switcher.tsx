"use client";

import { useLocale } from "next-intl";
import { SUPPORTED_LOCALES } from "@/shared/global-consts/supported-locales";
import { setLocaleAction } from "@/shared/server-actions/i18n/actions";
import { useRouter } from "next/navigation";
import { useTransition, useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";

const LOCALE_LABELS: Record<string, string> = {
  en: "English",
  de: "Deutsch",
};

const LOCALE_FLAGS: Record<string, string> = {
  en: "🇺🇸",
  de: "🇩🇪",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: string): void => {
    setIsOpen(false);
    startTransition(async () => {
      await setLocaleAction(newLocale);
      router.refresh();
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={isPending}
        className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-bg-secondary)]/80 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe size={16} className="text-[var(--color-text-secondary)]" />
        <span>{LOCALE_FLAGS[locale]}</span>
        <span className="hidden sm:inline">{LOCALE_LABELS[locale]}</span>
        <ChevronDown
          size={14}
          className={`text-[var(--color-text-secondary)] transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute bottom-full left-0 mb-2 min-w-[160px] overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-[var(--shadow-medium)] z-50"
          role="listbox"
          aria-label="Select language"
        >
          {SUPPORTED_LOCALES.map((loc) => (
            <button
              key={loc}
              type="button"
              role="option"
              aria-selected={locale === loc}
              onClick={() => handleLocaleChange(loc)}
              disabled={isPending}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                locale === loc
                  ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium"
                  : "text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]"
              } disabled:opacity-50`}
            >
              <span className="text-base">{LOCALE_FLAGS[loc]}</span>
              <span className="flex-1 text-left">{LOCALE_LABELS[loc]}</span>
              {locale === loc && (
                <Check size={16} className="text-[var(--color-primary)]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
