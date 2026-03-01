import { Status } from "@/shared/types/status";
import { LoginData, LoginResponse } from "./types";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { User } from "@/shared/types/user";
import { authApi } from "./auth-api";

type initialStateProps = {
  user: User | null;
  data: {
    user: {
      email: string;
      name: string;
    };
  } | null;
  status: Status;
  error: string | null;
};

const initialState: initialStateProps = {
  user: null,
  data: null,
  status: Status.IDLE,
  error: null,
};

export const login = createAsyncThunk<
  LoginResponse,
  LoginData,
  { rejectValue: string }
>("auth/login", async ({ email, password }: LoginData, thunkAPI) => {
  try {
    const { data } = await authApi.login({ email, password });

    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string; status: number }>;
    const message = error.response?.data?.message || "Login failed";
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
        state.data = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.status = Status.SUCCEEDED;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.data = null;
        state.error = action.error.message || "Something went wrong";
      });
  },
});
export const { setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
