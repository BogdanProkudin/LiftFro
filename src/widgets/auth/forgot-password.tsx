import ForgotPasswordForm from "@/features/auth/ui/forgot-form";
import Description from "@/shared/ui/text/description";
import Title from "@/shared/ui/text/title";
import { useTranslations } from "next-intl";
import React from "react";

const ForgotPassword = () => {
  const t = useTranslations("ForgotPassPage");
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-10 sm:px-10">
      <Title styles="text-[30px]" title={t("title")} />
      <Description styles="text-center my-2" description={t("description")} />
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPassword;
