"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm, SubmitHandler } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { MailCheck, ArrowRight } from "lucide-react";
import { RegistrationFormData, registrationSchema } from "../model/validation";
import { registration } from "../model/auth-slice";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux-hook";
import { InputForm } from "@/shared/ui/inputs/input-auth-form";
import { Devider } from "@/shared/ui/devider";

import Link from "next/link";
import { Status } from "@/shared/types/status";
import ButtonDefault from "@/shared/ui/buttons/button-default";

const RegistrationForm = () => {
  const { status, error } = useAppSelector((state) => state.auth);

  const t = useTranslations("RegistrationPage");

  const locale = useLocale();
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const [emailSent, setEmailSent] = useState(false);

  const isFormValid = !!(email && password && confirmPassword);

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    const res = await dispatch(
      registration({ ...data, locale, theme: theme || "system" }),
    );

    if (res.meta.requestStatus === "fulfilled") {
      setEmailSent(true);
    }
  };
  if (emailSent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="mt-8 flex w-full flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md shadow-2xl"
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 ring-8 ring-emerald-500/5">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 400,
              damping: 15,
            }}
          >
            <MailCheck size={40} />
          </motion.div>
        </div>
        <h3 className="mb-2 text-xl font-bold tracking-tight text-white">
          {t("successTitle")}
        </h3>
        <p className="max-w-[260px] text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {t("checkEmail")}
        </p>
        <Link
          href="/login"
          className="group mt-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:shadow-lg active:scale-95"
        >
          {t("goToLogin")}
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </motion.div>
    );
  }
  return (
    <form className="w-full mt-4" onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        label={t("emailLabel")}
        type="email"
        placeholder={t("emailPlaceholder")}
        register={register("email")}
        errorType="email"
        errors={errors}
        style="login"
      />
      <InputForm
        label={t("passwordLabel")}
        type="password"
        placeholder={t("passwordPlaceholder")}
        register={register("password")}
        errorType="password"
        errors={errors}
        style="login"
      />
      <InputForm
        label={t("confirmPasswordLabel")}
        type="password"
        placeholder={t("confirmPasswordPlaceholder")}
        register={register("confirmPassword")}
        errorType="confirmPassword"
        errors={errors}
        style="login"
      />

      {error && (
        <p className="mt-2 text-[14px] font-medium text-[var(--color-error)]">
          {error}
        </p>
      )}

      <ButtonDefault
        styles="mt-4 w-full p-3"
        text={t("submit")}
        type="submit"
        loading={status === Status.LOADING}
        onClick={handleSubmit(onSubmit)}
        disabled={!isFormValid}
      />

      <Devider />

      <div className="mt-4 flex flex-wrap items-center justify-end gap-[6px]">
        <span className="text-[15px] text-[var(--color-text-secondary)] opacity-80">
          {t("haveAccount")}
        </span>
        <Link
          href="/login"
          className="cursor-pointer text-[15px] text-[var(--color-primary)] underline opacity-90 transition-all duration-300 ease-in-out hover:text-[var(--color-primary-hover)] hover:opacity-100"
        >
          {t("login")}
        </Link>
      </div>
    </form>
  );
};

export default RegistrationForm;
