"use client"

import { useState, useEffect, use } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Star, Minus, Plus, ShoppingCart, ArrowLeft, Check, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ProductCard } from '@/components/product-card'
import { fetchProductById } from '@/lib/api'
import { products } from '@/lib/data'
import { useCartStore } from '@/lib/store'
import type { StoreProduct } from '@/lib/types'
import { cn } from '@/lib/utils'

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const addItem = useCartStore((state) => state.addItem)
  
  const [product, setProduct] = useState<StoreProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    setSelectedImage(0)
    setQuantity(1)
  }, [id])

  useEffect(() => {
    let cancelled = false
    async function loadProduct() {
      setLoading(true)
      const data = await fetchProductById(id)
      if (!cancelled) {
        setProduct(data)
        setLoading(false)
      }
    }
    loadProduct()
    return () => {
      cancelled = true
    }
  }, [id])

  const handleAddToCart = () => {
    if (!product) return
    
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-32 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <div className="flex gap-2">
              <Skeleton className="h-20 w-20 rounded-lg" />
              <Skeleton className="h-20 w-20 rounded-lg" />
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button onClick={() => router.push('/products')}>
          Back to Products
        </Button>
      </div>
    )
  }

  const images = product.images || [product.image]
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-8 -ml-2"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary">
            <Image
              src={images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {discount && (
              <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded">
                -{discount}% OFF
              </span>
            )}
          </div>
          
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    'relative h-20 w-20 overflow-hidden rounded-lg border-2 transition-colors',
                    selectedImage === index
                      ? 'border-primary'
                      : 'border-transparent hover:border-border'
                  )}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mt-2 text-balance">
              {product.name}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-5 w-5',
                    i < Math.floor(product.rating)
                      ? 'fill-accent text-accent'
                      : 'text-muted'
                  )}
                />
              ))}
            </div>
            <span className="font-medium">{product.rating}</span>
            <span className="text-muted-foreground">
              ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {product.inStock ? (
              <>
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm text-green-500 font-medium">In Stock</span>
              </>
            ) : (
              <>
                <div className="h-2 w-2 rounded-full bg-destructive" />
                <span className="text-sm text-destructive font-medium">Out of Stock</span>
              </>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center border border-border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <Button
            size="lg"
            className="w-full"
            disabled={!product.inStock}
            onClick={handleAddToCart}
          >
            {addedToCart ? (
              <>
                <Check className="h-5 w-5 mr-2" />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </>
            )}
          </Button>

          {/* Shipping Info */}
          <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
            <Truck className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Free Shipping</p>
              <p className="text-xs text-muted-foreground">On orders over $100</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
