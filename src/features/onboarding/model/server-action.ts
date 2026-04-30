"use server";

import { cookies } from "next/headers";

export async function setOnboardingComplete(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set("isOnboarding", "true", {
    path: "/",
    maxAge: 31536000,
    sameSite: "lax",
    httpOnly: true,
  });
}
