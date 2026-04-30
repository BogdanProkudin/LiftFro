import { User } from "@/entities/user/model/types";
import { userReducer } from "@/entities/user/model/user-slice";
import { authReducer } from "@/features/auth/model/auth-slice";
import { configureStore } from "@reduxjs/toolkit";

export const makeStore = (initialUser?: User | null) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
    },
    preloadedState: {
      user: { user: initialUser ?? null },
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
