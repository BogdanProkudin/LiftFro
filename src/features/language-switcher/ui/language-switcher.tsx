"use client";

import { useLocale } from "next-intl";
import { SUPPORTED_LOCALES } from "@/shared/global-consts/supported-locales";
import { setLocaleAction } from "@/shared/server-actions/i18n/actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    startTransition(async () => {
      await setLocaleAction(newLocale);
      router.refresh();
    });
  };

  return (
    <div className="flex gap-2">
      {SUPPORTED_LOCALES.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLocaleChange(loc)}
          disabled={isPending}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            locale === loc
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
