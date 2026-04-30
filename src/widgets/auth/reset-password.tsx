"use client";
import { useTranslations } from "next-intl";
import Description from "@/shared/ui/text/description";
import Title from "@/shared/ui/text/title";
import ResetPasswordForm from "@/features/auth/ui/reset-form";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/shared/hooks/redux-hook";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import { verifyToken } from "@/features/auth/model/auth-slice";

const ResetPassword = () => {
  const t = useTranslations("ResetPasswordPage");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenParams = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!tokenParams) {
      router.replace("/login");
      return;
    }

    const verify = async () => {
      try {
        const res = await dispatch(
          verifyToken({ token: tokenParams }),
        ).unwrap();

        if (!res.valid) {
          throw new Error();
        }
      } catch {
        router.replace("/error");
      } finally {
        setIsLoading(false);
      }
    };

    verify();
  }, [dispatch, router, tokenParams, t]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoaderCircle size={40} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center bg-[var(--color-bg-secondary)] border-2 border-[var(--color-border)] rounded-xl p-4 ">
      <Title styles="text-[30px]" title={t("title")} />

      <Description styles="text-center my-2" description={t("description")} />
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPassword;
