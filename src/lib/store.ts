import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { StoreProduct } from "@/types/types";

export type CartLine = {
  product: StoreProduct;
  quantity: number;
};

type CartState = {
  items: CartLine[];
  addItem: (product: StoreProduct) => void;
  removeItem: (productId: string) => void;
  getItemCount: () => number;
  getTotal: () => number;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const idx = state.items.findIndex((i) => i.product.id === product.id);
          if (idx >= 0) {
            const next = [...state.items];
            next[idx] = {
              ...next[idx],
              quantity: next[idx].quantity + 1,
            };
            return { items: next };
          }
          return { items: [...state.items, { product, quantity: 1 }] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        })),
      getItemCount: () =>
        get().items.reduce((n, line) => n + line.quantity, 0),
      getTotal: () =>
        get().items.reduce(
          (sum, line) => sum + line.product.price * line.quantity,
          0,
        ),
      clearCart: () => set({ items: [] }),
    }),
    { name: "sportspro-cart" },
  ),
);
