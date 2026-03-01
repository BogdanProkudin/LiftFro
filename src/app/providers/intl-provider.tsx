import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";

export const IntlProvider = ({ children }: { children: ReactNode }) => {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
};
