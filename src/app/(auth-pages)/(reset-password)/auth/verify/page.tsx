"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/shared/hooks/redux-hook";
import { verifyRegistration } from "@/features/auth/model/auth-slice";

const CallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      dispatch(verifyRegistration({ token }));
      router.replace("/");
    } else {
      router.replace("/registration");
    }
  }, []);

  return <div>Loading...</div>;
};

export default CallbackPage;
