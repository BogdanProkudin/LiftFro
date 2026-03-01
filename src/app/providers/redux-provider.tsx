"use client";
import { Provider } from "react-redux";
import { ReactNode, useState } from "react";
import { makeStore, AppStore } from "@/config/store/store";

export const ReduxProvider = ({ children }: { children: ReactNode }) => {
  const [store] = useState(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
};
