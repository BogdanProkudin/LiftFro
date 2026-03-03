import { Status } from "@/shared/types/status";
import {
  LoginData,
  LoginResponse,
  RegistrationData,
  RegistrationResponse,
} from "./types";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { User } from "@/shared/types/user";
import { authApi } from "./auth-api";

type initialStateProps = {
  user: User | null;

  status: Status;
  error: string | null;
};

const initialState: initialStateProps = {
  user: null,
  status: Status.IDLE,
  error: null,
};

export const registration = createAsyncThunk<
  RegistrationResponse,
  RegistrationData,
  { rejectValue: string }
>(
  "auth/register",
  async ({ email, password, username }: RegistrationData, thunkAPI) => {
    try {
      const { data } = await authApi.registration({
        email,
        password,
        username,
      });

      return data;
    } catch (err) {
      const error = err as AxiosError<{ message: string; status: number }>;
      const message = error.response?.data?.message || "Registration failed";
      return thunkAPI.rejectWithValue(message);
    }
  },
);
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
      .addCase(registration.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(registration.fulfilled, (state) => {
        state.status = Status.SUCCEEDED;
      })
      .addCase(
        registration.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = Status.FAILED;

          state.error = action.payload || "Something went wrong";
        },
      )
      .addCase(login.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.status = Status.SUCCEEDED;
        state.error = null;
      })
      .addCase(
        login.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = Status.FAILED;

          state.error = action.payload || "Something went wrong";
        },
      );
  },
});
export const { setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
