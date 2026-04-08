import { ReactNode } from "react";

import { IntlProvider } from "./intl-provider";
import { ModeProvider } from "./theme-provider";
import { ReduxProvider } from "./redux-provider";
import { ToastProvider } from "./toast-provider";
import { User } from "@/entities/user";

export const MainProvider = ({
  initialUser,
  children,
  locale,
  messages,
}: {
  initialUser: User | null;
  children: ReactNode;
  locale: string;
  messages: Record<string, string>;
}) => {
  return (
    <ModeProvider>
      <ReduxProvider initialUser={initialUser}>
        <IntlProvider locale={locale} messages={messages}>
          {children}
        </IntlProvider>
      </ReduxProvider>
      <ToastProvider></ToastProvider>
    </ModeProvider>
  );
};
