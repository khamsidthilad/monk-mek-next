export type ProductCategory = "shoes" | "jersey" | "equipment";

/** Storefront catalog (public shop). */
export type StoreCategoryId = "shoes" | "jerseys" | "equipment";

export type StoreProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  category: StoreCategoryId;
  inStock: boolean;
};

export type StoreCategory = {
  id: StoreCategoryId;
  name: string;
  count: number;
};

export type Product = {
  product_id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: ProductCategory;
  image: string;
  created_at?: string;
};

export type Customer = {
  customer_id: number;
  name: string;
  email: string;
  phone: string;
  total_orders: number;
  total_spent: number;
  is_active: boolean;
};

export type OrderStatus = "pending" | "shipped" | "completed";

export type OrderLineItem = {
  product_name: string;
  quantity: number;
  price: number;
};

export type Order = {
  order_id: number;
  customer_name: string;
  customer_email: string;
  created_at: string;
  total: number;
  status: OrderStatus;
  items: OrderLineItem[];
};

export type DashboardStats = {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  revenue: number;
};

/** Storefront checkout / shipping form */
export type CustomerInfo = {
  name: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
};
