import { useTranslations } from "next-intl";

export default function ProgramsPage() {
  const t = useTranslations("ProgramsPage");

  return (
    <div className="mx-auto max-w-[1750px] px-4 py-8 lg:px-8">
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
        {t("title")}
      </h1>
      <p className="mt-2 text-[var(--color-text-secondary)]">{t("subtitle")}</p>
    </div>
  );
}
