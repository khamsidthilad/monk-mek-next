import { configureStore } from "@reduxjs/toolkit";

import { authAPI } from "@/services/api/auth.api";
import { productAPI } from "@/services/api/product.api";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authAPI.middleware, 
      productAPI.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

