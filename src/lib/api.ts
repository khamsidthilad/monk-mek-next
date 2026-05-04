import { products as catalog } from "@/lib/data";
import type { CartLine } from "@/lib/store";
import type { CustomerInfo, StoreProduct } from "@/lib/types";

export type FetchProductsParams = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page: number;
  limit: number;
};

export type FetchProductsResult = {
  products: StoreProduct[];
  page: number;
  totalPages: number;
  total: number;
};

function matchesPrice(price: number, min?: number, max?: number) {
  if (min !== undefined && max !== undefined) {
    return price >= min && price <= max;
  }
  if (min !== undefined && max === undefined) {
    return price >= min;
  }
  if (min === undefined && max !== undefined) {
    return price <= max;
  }
  return true;
}

export async function fetchProducts(
  filters: FetchProductsParams,
): Promise<FetchProductsResult> {
  await new Promise((r) => setTimeout(r, 120));

  let list = [...catalog];
  const { category, minPrice, maxPrice, search, limit } = filters;
  let page = Math.max(1, filters.page);

  if (category) {
    list = list.filter((p) => p.category === category);
  }

  list = list.filter((p) => matchesPrice(p.price, minPrice, maxPrice));

  if (search?.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }

  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / limit) || 1);
  page = Math.min(page, totalPages);
  const start = (page - 1) * limit;
  const slice = list.slice(start, start + limit);

  return {
    products: slice,
    page,
    totalPages,
    total,
  };
}

export async function fetchProductById(
  id: string,
): Promise<StoreProduct | null> {
  await new Promise((r) => setTimeout(r, 80));
  return catalog.find((p) => p.id === id) ?? null;
}

export type CreateOrderPayload = {
  items: CartLine[];
  customer: CustomerInfo;
};

export async function createOrder(
  payload: CreateOrderPayload,
): Promise<{ success: true; orderId: string }> {
  await new Promise((r) => setTimeout(r, 450));
  const orderId = `SP-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`.toUpperCase();
  if (typeof globalThis.console !== "undefined") {
    globalThis.console.debug("[checkout] mock order", {
      lines: payload.items.map((l) => ({
        id: l.product.id,
        qty: l.quantity,
        name: l.product.name,
      })),
      customer: payload.customer,
    });
  }
  return { success: true, orderId };
}
