"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";

import { useRouter } from "next/navigation";

import { LoginFormData, loginSchema } from "../model/validation";
import { login } from "../model/auth-slice";
import { useAppDispatch } from "@/shared/hooks/redux-hook";
import { InputForm } from "@/shared/ui/input-auth-form";
import { Devider } from "@/shared/ui/devider";

import Title from "@/shared/ui/title";
import Description from "@/shared/ui/description";
import Link from "next/link";

const LoginForm = () => {
  const t = useTranslations("LoginPage");
  const errorT = useTranslations("Errors");
  const dispatch = useAppDispatch();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const result = await dispatch(login(data)).unwrap();
      if (result.message === "User login successfully") {
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
      <Title size={30} title={t("title")} />
      <Description styles="text-center my-2" description={t("description")} />
      <form className="w-full mt-4" onSubmit={handleSubmit(onSubmit)}>
        <InputForm
          label="Email"
          type="email"
          placeholder={t("emailPlaceholder")}
          register={register("email")}
          errorType="email"
          errors={errors}
          style="login"
        />
        <InputForm
          label="Password"
          type="password"
          placeholder={t("passwordPlaceholder")}
          register={register("password")}
          errorType="password"
          errors={errors}
          style="login"
        />
        <div className="flex w-full justify-end">
          <Link
            href="/forgot-password"
            className="cursor-pointer text-sm text-[var(--color-text-secondary)] opacity-80 transition-all duration-300 ease-in-out hover:underline hover:opacity-100"
          >
            {t("forgotPassword")}
          </Link>
        </div>

        {error && (
          <p className="mt-2 text-[14px] font-medium text-[var(--color-error)]">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-4 cursor-pointer flex w-full items-center justify-center rounded-[6px] bg-[var(--color-primary)] p-3 font-semibold text-white transition-[background-color,transform] duration-300 ease-in-out hover:-translate-y-[1px] hover:bg-[var(--color-primary-hover)]"
        >
          {t("submit")}
        </button>
        <Devider />

        <div className="mt-4 flex flex-wrap items-center justify-end gap-[6px]">
          <span className="text-[15px] text-[var(--color-text-secondary)] opacity-80">
            {t("needAccount")}
          </span>
          <Link
            href="/registration"
            className="cursor-pointer text-[15px] text-[var(--color-primary)] underline opacity-90 transition-all duration-300 ease-in-out hover:text-[var(--color-primary-hover)] hover:opacity-100"
          >
            {t("register")}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
