import { ReactNode } from "react";

import { useTranslations } from "next-intl";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const t = useTranslations("AuthLayout");
  return (
    <div className="flex bg-[var(--color-bg)] text-[var(--color-text-primary)] min-h-screen">
      <div className="hidden sm:flex relative z-10 flex-col justify-center items-start p-16 w-[45%] lg:w-[55%] shrink-0 text-[var(--default-text-color)]">
        <h1 className="text-3xl lg:text-5xl font-black leading-tight tracking-[-0.033em]">
          {t("title")}
        </h1>
        <p className="mt-4 text-base lg:text-lg font-normal leading-normal">
          {t("description")}
        </p>
      </div>

      <div className="flex-1 bg-[var(--color-bg-secondary)]">{children}</div>
    </div>
  );
}
