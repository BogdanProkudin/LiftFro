"use client";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import { makeStore } from "@/config/store/store";

export const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={makeStore()}>{children}</Provider>;
};
