"use client";
import { Provider } from "react-redux";
import { ReactNode, useState } from "react";
import { makeStore, AppStore } from "@/shared/config/store/store";
import { User } from "@/entities/user";

export const ReduxProvider = ({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: User | null;
}) => {
  const [store] = useState(() => makeStore(initialUser));

  return <Provider store={store}>{children}</Provider>;
};
