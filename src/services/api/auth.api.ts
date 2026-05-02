import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "@/config/api";
import { getAccessTokenFromCookie } from "@/lib/auth-cookie";
import { normalizeLoginResponse, type NormalizedLoginResult } from "@/lib/login-response";
import type { LoginBody } from "@/types/auth";

/** Same base as `@/config/api` — must be your real API (e.g. `http://127.0.0.1:8080/api`), not this Next dev server. */
const API_BASE = API_BASE_URL.replace(/\/+$/, "") || "/api";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    prepareHeaders: (headers) => {
      const token = getAccessTokenFromCookie();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<NormalizedLoginResult, LoginBody>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        /** Many backends expect `username`; JWT uses `username` — send both. */
        body: { ...body, username: body.email },
      }),
      transformResponse: (raw: unknown) => normalizeLoginResponse(raw),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation } = authAPI;
