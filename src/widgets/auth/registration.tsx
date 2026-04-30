"use client";
import { useTranslations } from "next-intl";
import RegistrationForm from "@/features/auth/ui/registration-form";
import Description from "@/shared/ui/text/description";
import Title from "@/shared/ui/text/title";
import { GoogleAuth } from "@/features/auth/ui/google-auth";
import { AppleAuth } from "@/features/auth/ui/apple-auth";

const Registration = () => {
  const t = useTranslations("RegistrationPage");
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-10 sm:px-10">
      <Title styles="text-[30px]" title={t("title")} />
      <Description styles="text-center my-2" description={t("description")} />
      <RegistrationForm />
      <div className="flex items-center gap-2 w-full">
        <GoogleAuth />
        <AppleAuth />
      </div>
    </div>
  );
};

export default Registration;
