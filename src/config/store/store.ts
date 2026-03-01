import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
  return configureStore({
    // tODO: add reducers here
    reducer: (state = {}) => state,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
