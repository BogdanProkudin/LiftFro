import React from "react";

import { useTranslations } from "next-intl";
import Link from "next/link";
const OnBoardingHeader = () => {
  const t = useTranslations("OnBoardingPage");
  return (
    <header className="w-full bg-[var(--color-bg)] border-b border-[var(--color-border)] shadow-[var(--shadow-soft)] transition-colors duration-300 ease-in-out">
      <div className="mx-auto grid max-w-[1880px] grid-cols-[auto_1fr_auto] items-center px-8 py-6">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-[1.875rem] font-[550] text-[var(--color-text-primary)]"
          >
            FitTrack
          </Link>
        </div>

        <nav className="justify-self-center text-[22px] font-[550] text-[var(--color-text-primary)]">
          {t("headerTitle")}
        </nav>

        <div className="w-[120px]"></div>
      </div>
    </header>
  );
};

export default OnBoardingHeader;
