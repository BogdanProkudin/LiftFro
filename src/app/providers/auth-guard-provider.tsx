"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearUser } from "@/entities/user/model/user-slice";
import { useAppDispatch } from "@/shared/hooks/redux-hook";
import { onAuthRefreshFailed } from "@/shared/config/axios-config";

export function AuthGuardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthRefreshFailed(() => {
      dispatch(clearUser());
      router.replace("/login");
    });

    return unsubscribe;
  }, [dispatch, router]);

  return <>{children}</>;
}
