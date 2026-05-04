"use client";

import { useCartHydrated } from "@/lib/use-cart-hydrated";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store";

export default function CartPage() {
  const cartHydrated = useCartHydrated();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotal = useCartStore((state) => state.getTotal);

  if (!cartHydrated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-10 w-40 rounded-lg bg-secondary" />
          <div className="h-64 rounded-lg bg-secondary" />
        </div>
      </div>
    );
  }

  const subtotal = getTotal();
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-md">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="mb-4 text-2xl font-bold">Your Cart is Empty</h1>
          <p className="mb-8 text-muted-foreground">
            Browse the shop and add items to continue.
          </p>
          <Button asChild size="lg">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="-ml-2 mb-8">
        <Link href="/products">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </Link>
      </Button>

      <h1 className="mb-8 text-3xl font-bold">Cart</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
        <Card>
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex flex-wrap gap-4 border-border border-b pb-6 last:border-0 last:pb-0 sm:flex-nowrap sm:items-center"
              >
                <Link
                  href={`/products/${product.id}`}
                  className="relative block h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-secondary"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/products/${product.id}`}
                    className="font-medium hover:text-primary"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-1 text-muted-foreground text-sm">
                    ${product.price.toFixed(2)} each · Qty {quantity}
                  </p>
                </div>
                <div className="flex w-full shrink-0 items-center justify-between sm:w-auto sm:flex-col sm:items-end">
                  <p className="font-semibold">
                    ${(product.price * quantity).toFixed(2)}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-destructive hover:text-destructive"
                    onClick={() => removeItem(product.id)}
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="h-fit lg:sticky lg:top-24">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>
                {shipping === 0 ? (
                  <span className="text-green-500">Free</span>
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button asChild size="lg" className="w-full">
              <Link href="/checkout">Checkout</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
