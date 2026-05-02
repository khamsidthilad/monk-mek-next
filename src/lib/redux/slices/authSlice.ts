import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { fetchMe } from "@/services/api/me";
import type { AdminMe } from "@/types/auth";

export type AuthStatus = "idle" | "loading" | "succeeded" | "failed";

export type AuthState = {
  user: AdminMe | null;
  status: AuthStatus;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

export const loadAdminMe = createAsyncThunk<AdminMe, void, { rejectValue: string }>(
  "auth/loadAdminMe",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchMe();
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to load session";
      return rejectWithValue(message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AdminMe | null>) {
      state.user = action.payload;
      state.error = null;
      if (action.payload) state.status = "succeeded";
    },
    clearAuth(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadAdminMe.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadAdminMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loadAdminMe.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      });
  },
});

export const { setUser, clearAuth } = authSlice.actions;

export function selectAuthUser(state: { auth: AuthState }) {
  return state.auth.user;
}

export function selectAuthStatus(state: { auth: AuthState }) {
  return state.auth.status;
}

export function selectAuthError(state: { auth: AuthState }) {
  return state.auth.error;
}

export default authSlice.reducer;
