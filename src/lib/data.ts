import type {
  Customer,
  Order,
  Product,
  StoreCategoryId,
  StoreProduct,
} from "@/types/types";

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

const SHOE_IMG =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80";
const SHOE_IMG2 =
  "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&auto=format&fit=crop&q=80";
const JERSEY_IMG =
  "https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?w=800&auto=format&fit=crop&q=80";
const EQUIP_IMG =
  "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&auto=format&fit=crop&q=80";

const categoryOrder: StoreCategoryId[] = ["shoes", "jerseys", "equipment"];
const categoryImage: Record<StoreCategoryId, string> = {
  shoes: SHOE_IMG,
  jerseys: JERSEY_IMG,
  equipment: EQUIP_IMG,
};

export const products: StoreProduct[] = (() => {
  const list: StoreProduct[] = [];
  let id = 1;
  for (const cat of categoryOrder) {
    for (let i = 0; i < 8; i++) {
      const base =
        cat === "shoes" ? 95 + i * 18 : cat === "jerseys" ? 39 + i * 15 : 22 + i * 9;
      const ratingRaw =
        id % 4 === 0 ? 4.65 + (i % 3) * 0.05 : 4.0 + (i % 6) * 0.08;
      const row: StoreProduct = {
        id: String(id),
        name:
          cat === "jerseys"
            ? `Pro Jersey ${i + 1}`
            : cat === "shoes"
              ? `Apex Trainer ${i + 1}`
              : `Train Kit ${i + 1}`,
        description: `High-performance ${cat} built for serious athletes. Breathable materials and durable construction with a sharp fit.`,
        price: Math.round(base * 100) / 100,
        originalPrice:
          id % 3 === 0 ? Math.round((base + 35) * 100) / 100 : undefined,
        rating: Math.min(5, Math.round(ratingRaw * 10) / 10),
        reviews: 40 + id * 17 + i * 23,
        image: categoryImage[cat],
        category: cat,
        inStock: id !== 14,
      };
      if (id === 1) {
        row.images = [SHOE_IMG, SHOE_IMG2, JERSEY_IMG];
      }
      list.push(row);
      id++;
    }
  }
  return list;
})();

export const categories = categoryOrder.map((id) => ({
  id,
  name:
    id === "shoes" ? "Shoes" : id === "jerseys" ? "Jerseys" : "Equipment",
  count: products.filter((p) => p.category === id).length,
}));
