import { ReactNode } from "react";

import { IntlProvider } from "./intl-provider";
import { ModeProvider } from "./theme-provider";
import { ReduxProvider } from "./redux-provider";
import { ToastProvider } from "./toast-provider";

export const MainProvider = ({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: string;
  messages: Record<string, string>;
}) => {
  return (
    <ModeProvider>
      <ReduxProvider>
        <IntlProvider locale={locale} messages={messages}>
          {children}
        </IntlProvider>
      </ReduxProvider>
      <ToastProvider></ToastProvider>
    </ModeProvider>
  );
};
