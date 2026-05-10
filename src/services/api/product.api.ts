import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "@/config/api";
import { getAccessTokenFromCookie } from "@/lib/auth-cookie";
import type { getAllproduct } from "@/types/getAllproduct.type";
import type { CreateProductType } from "@/types/createProduct.type";

/** Same base as `@/config/api` — must be your real API (e.g. `http://127.0.0.1:8080/api`), not this Next dev server. */
const API_BASE = API_BASE_URL.replace(/\/+$/, "") || "/api";

/** Payload for POST `/products/create` as multipart `FormData`. */
export type CreateProductFormFields = {
  pro_name: string;
  pro_detail: string;
  pro_price: number;
  pro_qty: number;
  cate_id: number;
  /** Passed as plain text field (URL). Omit if unused. Many backends instead expect `File` via a file input. */
  pro_image_url?: string;
};

export function buildCreateProductFormData(fields: CreateProductFormFields): FormData {
  const fd = new FormData();
  fd.append("pro_name", fields.pro_name);
  fd.append("pro_detail", fields.pro_detail);
  fd.append("pro_price", String(fields.pro_price));
  fd.append("pro_qty", String(fields.pro_qty));
  fd.append("cate_id", String(fields.cate_id));
  const img = fields.pro_image_url?.trim();
  if (img) fd.append("pro_image", img);
  return fd;
}

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    prepareHeaders: (headers) => {
      const token = getAccessTokenFromCookie();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<getAllproduct, void>({
      query: () => ({
        url: "/products/all",
        method: "GET",
      }),
      providesTags: () => [{ type: "Product", id: "LIST" }],
    }),
    createProduct: builder.mutation<CreateProductType, FormData>({
      query: (body) => ({
        url: "/products/create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
  }),
});

export const { useGetAllProductsQuery, useCreateProductMutation } = productAPI;
