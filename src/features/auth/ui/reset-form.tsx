"use client";
import { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";

import { InputForm } from "@/shared/ui/inputs/input-auth-form";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import Link from "next/link";
import ButtonDefault from "@/shared/ui/buttons/button-default";

import { useAppDispatch } from "@/shared/hooks/redux-hook";
import { RecoverPassData, recoverPassSchema } from "../model/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPassword } from "../model/auth-slice";

const ResetPasswordForm = () => {
  const t = useTranslations("ResetPasswordPage");

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RecoverPassData>({
    resolver: zodResolver(recoverPassSchema),
  });

  const router = useRouter();

  const searchParams = useSearchParams();
  const tokenParams = searchParams.get("token");

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const isFormValid = !!password && !!confirmPassword;

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<RecoverPassData> = async (data) => {
    try {
      setIsLoading(true);

      const token = String(tokenParams);
      const result = await dispatch(resetPassword({ ...data, token }));
      if (result.meta.requestStatus === "fulfilled") {
        router.push("/login");
        toast.success(t("toastMessSuccess"));
      } else {
        router.push("/login");
        toast.error(t("toastMessGlobal"));
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

export default ResetPasswordForm;
