"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { StoreProduct } from '@/types/types'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/lib/store'

interface ProductCardProps {
  product: StoreProduct
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  return (
    <Card
      className={cn(
        'group overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-300',
        className
      )}
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {discount && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-muted-foreground">({product.reviews})</span>
        </div>

        <Link href={`/products/${product.id}`} className="block group/title">
          <h3 className="font-semibold text-foreground group-hover/title:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <Button
            size="sm"
            variant="secondary"
            disabled={!product.inStock}
            onClick={(e) => {
              e.preventDefault()
              addItem(product)
            }}
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
