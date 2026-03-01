import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
} from "@/shared/global-consts/supported-locales";
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeFromCookie = cookieStore.get("locale")?.value;

  const locale: string = SUPPORTED_LOCALES.includes(localeFromCookie || "")
    ? localeFromCookie!
    : DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`../../../messages/${locale}.json`)).default,
  };
});
