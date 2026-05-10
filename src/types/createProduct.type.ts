import type { ProductCategory } from "@/types/types";

/** Must match your API’s `category.cate_id` values (check DB or GET categories). */
export const PRODUCT_CATEGORY_TO_CATE_ID: Record<ProductCategory, number> = {
  shoes: 1,
  jersey: 2,
  equipment: 3,
};

export interface CreateProductType {
  success: boolean;
  data: CreateProductData;
}

export interface CreateProductData {
  pro_id: number;
  pro_name: string;
  pro_detail: string;
  pro_price: number | string;
  pro_qty: number | string;
  pro_image: string | Record<string, unknown> | null;
  cate_id: number;
  updatedAt: string;
  createdAt: string;
}

