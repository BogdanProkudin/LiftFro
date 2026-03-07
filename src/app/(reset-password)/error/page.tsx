"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, LifeBuoy } from "lucide-react";
import Title from "@/shared/ui/text/title";
import Description from "@/shared/ui/text/description";
import ButtonDefault from "@/shared/ui/buttons/button-default";

const ErrorPage = () => {
  const t = useTranslations("ErrorPage");
  const router = useRouter();

  return (
    <div className="relative flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-(--color-border) bg-(--color-bg-secondary) p-8 shadow-2xl backdrop-blur-md transition-all duration-300 md:p-12"></div>
  );
};

export default ErrorPage;
