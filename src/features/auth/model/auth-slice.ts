import { Status } from "@/shared/types/status";
import {
  ForgotPasswordData,
  ForgotPasswordResponse,
  LoginData,
  LoginResponse,
  RegistrationData,
  RegistrationResponse,
  ResetPasswordData,
  ResetPasswordResponse,
  VerifyData,
  VerifyResponse,
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
  async (
    { email, password, username, locale, theme }: RegistrationData,
    thunkAPI,
  ) => {
    try {
      const { data } = await authApi.registration({
        email,
        password,
        username,
        locale,
        theme: theme.toUpperCase(),
      });

      return data;
    } catch (err) {
      const error = err as AxiosError<{ message: string; status: number }>;
      const message = error.response?.data?.message || "Registration failed";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const verifyRegistration = createAsyncThunk<
  VerifyResponse,
  VerifyData,
  { rejectValue: string }
>("auth/verifyRegistration", async ({ token }: { token: string }, thunkAPI) => {
  try {
    const { data } = await authApi.verifyRegistration({ token });

    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string; status: number }>;
    const message = error.response?.data?.message || "Token is not valid";
    return thunkAPI.rejectWithValue(message);
  }
});
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

export const forgotPassword = createAsyncThunk<
  ForgotPasswordResponse,
  ForgotPasswordData,
  { rejectValue: string }
>("auth/forgotPassword", async ({ email }: { email: string }, thunkAPI) => {
  try {
    const { data } = await authApi.forgotPassword({ email });

    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string; status: number }>;
    const message = error.response?.data?.message || "Send Email failed";
    return thunkAPI.rejectWithValue(message);
  }
});
export const resetPassword = createAsyncThunk<
  ResetPasswordResponse,
  ResetPasswordData,
  { rejectValue: string }
>(
  "auth/resetPassword",
  async (
    { token, password }: { token: string; password: string },
    thunkAPI,
  ) => {
    try {
      const { data } = await authApi.resetPassword({
        token,
        password,
      });

      return data;
    } catch (err) {
      const error = err as AxiosError<{ message: string; status: number }>;
      const message =
        error.response?.data?.message || "Recover password failed";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const verifyToken = createAsyncThunk<
  VerifyResponse,
  VerifyData,
  { rejectValue: string }
>("auth/verifyToken", async ({ token }: { token: string }, thunkAPI) => {
  try {
    const { data } = await authApi.validateToken({ token });

    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string; status: number }>;
    const message = error.response?.data?.message || "Token is not valid";
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
      )
      .addCase(forgotPassword.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.status = Status.SUCCEEDED;
      })
      .addCase(
        forgotPassword.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = Status.FAILED;

          state.error = action.payload || "Something went wrong";
        },
      )
      .addCase(resetPassword.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = Status.SUCCEEDED;
      })
      .addCase(
        resetPassword.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = Status.FAILED;

          state.error = action.payload || "Something went wrong";
        },
      )
      .addCase(verifyToken.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(verifyToken.fulfilled, (state) => {
        state.status = Status.SUCCEEDED;
      })
      .addCase(
        verifyToken.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = Status.FAILED;

          state.error = action.payload || "Something went wrong";
        },
      );
  },
});
export const { setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
