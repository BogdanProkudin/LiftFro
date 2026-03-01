import { useTranslations } from "next-intl";
import React from "react";

export const Devider = () => {
  const t = useTranslations("Devider");
  return (
    <div className="flex items-center w-full my-4">
      <div className="h-px flex-1 bg-gray-300"></div>
      <span className="px-4 text-sm text-gray-500">{t("or")}</span>
      <div className="h-px flex-1 bg-gray-300"></div>
    </div>
  );
};
