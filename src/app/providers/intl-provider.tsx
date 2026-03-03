import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";

export const IntlProvider = ({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: string;
  messages: Record<string, string>;
}) => {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};
