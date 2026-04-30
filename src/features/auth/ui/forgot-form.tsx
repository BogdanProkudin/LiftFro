"use client";
import React, { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";

import { InputForm } from "@/shared/ui/inputs/input-auth-form";

import toast from "react-hot-toast";
import Link from "next/link";
import ButtonDefault from "@/shared/ui/buttons/button-default";
import { Status } from "@/shared/types/status";
import { useAppDispatch } from "@/shared/hooks/redux-hook";
import { ForgotPassData, forgotPassSchema } from "../model/validation";
import { forgotPassword } from "../model/auth-slice";
import { zodResolver } from "@hookform/resolvers/zod";

const ForgotPasswordForm = () => {
  const t = useTranslations("ForgotPassPage");

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ForgotPassData>({
    resolver: zodResolver(forgotPassSchema),
  });

  const email = watch("email");
  const isFormValid = !!email;

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<ForgotPassData> = async (data) => {
    try {
      setIsLoading(true);
      const result = await dispatch(forgotPassword(data));

      if (result.meta.requestStatus === "fulfilled") {
        toast.success(t("successMessage"));
      } else {
        toast.error(t("errorMessage"));
      }
    } catch (err: unknown) {
      const error = err as string;

      setError(error || t("ErrorGlobalMess"));
    } finally {
      setIsLoading(false);
    }
  };

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

      {error && (
        <p className="mt-2 text-[14px] font-medium text-[var(--color-error)]">
          {error}
        </p>
      )}

      <ButtonDefault
        styles="mt-4 w-full p-3"
        text={t("submit")}
        type="submit"
        loading={isLoading}
        onClick={handleSubmit(onSubmit)}
        disabled={!isFormValid}
      />

      <div className="mt-4 flex flex-wrap items-center justify-end gap-[6px]">
        <Link
          href="/login"
          className="cursor-pointer text-[15px] text-[var(--color-primary)] underline opacity-90 transition-all duration-300 ease-in-out hover:text-[var(--color-primary-hover)] hover:opacity-100"
        >
          {t("link")}
        </Link>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
