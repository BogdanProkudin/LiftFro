"use server";

import { cookies } from "next/headers";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
} from "@/shared/global-consts/supported-locales";

export async function setLocaleAction(locale: string) {
  const cookieStore = await cookies();

  const newLocale = SUPPORTED_LOCALES.includes(locale)
    ? locale
    : DEFAULT_LOCALE;

  cookieStore.set("locale", newLocale, {
    path: "/",
    maxAge: 31536000,
    sameSite: "lax",
    httpOnly: true,
  });
}
