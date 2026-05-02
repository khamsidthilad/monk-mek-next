import type { Customer, Order, Product } from "@/lib/types";

export const mockProducts: Product[] = [
  {
    product_id: 1,
    name: "Sample Trainer",
    description: "Demo product for the admin products table.",
    price: 129.99,
    quantity: 42,
    category: "shoes",
    image: "/products/placeholder.jpg",
  },
];

export const mockOrders: Order[] = [
  {
    order_id: 1001,
    customer_name: "Jane Doe",
    customer_email: "jane@example.com",
    created_at: "2026-05-01",
    total: 149.5,
    status: "pending",
    items: [{ product_name: "Sample Trainer", quantity: 1, price: 129.99 }],
  },
  {
    order_id: 1002,
    customer_name: "Alex Smith",
    customer_email: "alex@example.com",
    created_at: "2026-05-02",
    total: 89.0,
    status: "shipped",
    items: [{ product_name: "Demo Jersey", quantity: 2, price: 44.5 }],
  },
];

export const mockCustomers: Customer[] = [
  {
    customer_id: 1,
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+856 20 5555 0101",
    total_orders: 3,
    total_spent: 450,
    is_active: true,
  },
  {
    customer_id: 2,
    name: "Alex Smith",
    email: "alex@example.com",
    phone: "+856 20 5555 0202",
    total_orders: 1,
    total_spent: 89,
    is_active: false,
  },
];
