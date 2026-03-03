"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";

import { useRouter } from "next/navigation";

import { RegistrationFormData, registrationSchema } from "../model/validation";
import { registration } from "../model/auth-slice";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux-hook";
import { InputForm } from "@/shared/ui/inputs/input-auth-form";
import { Devider } from "@/shared/ui/devider";

import Title from "@/shared/ui/text/title";
import Description from "@/shared/ui/text/description";
import Link from "next/link";
import { Status } from "@/shared/types/status";
import ButtonDefault from "@/shared/ui/buttons/button-default";

const RegistrationForm = () => {
  const { status } = useAppSelector((state) => state.auth);
  const t = useTranslations("RegistrationPage");
  const errorT = useTranslations("Errors");
  const dispatch = useAppDispatch();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const username = watch("username");
  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const isFormValid = username && email && password && confirmPassword;

  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    try {
      await dispatch(registration(data));

      if (status === Status.SUCCEEDED) {
        router.push("/");
      } else {
        throw new Error(errorT("SomeThingWentWrong"));
      }
    } catch (err: unknown) {
      const error = err as string;
      setError(error || errorT("SomeThingWentWrong"));
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-10 sm:px-10">
      <Title styles="text-[30px]" title={t("title")} />
      <Description styles="text-center my-2" description={t("description")} />
      <form className="w-full mt-4" onSubmit={handleSubmit(onSubmit)}>
        <InputForm
          label={t("usernameLabel")}
          type="text"
          placeholder={t("usernamePlaceholder")}
          register={register("username")}
          errorType="username"
          errors={errors}
          style="login"
        />
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
    </div>
  );
};

export default RegistrationForm;
