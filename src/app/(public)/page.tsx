import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Truck, Shield, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/public/components/product-cart'
import { products, categories } from '@/lib/data'

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.rating >= 4.6).slice(0, 4)
  const saleProducts = products.filter((p) => p.originalPrice).slice(0, 4)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1920&auto=format&fit=crop&q=80"
            alt="Athletes running"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6">
              New Season Collection
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-balance">
              Gear Up For{' '}
              <span className="text-primary">Greatness</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
              Premium sports gear designed for athletes who demand the best. Elevate your performance with our curated collection.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-foreground/20 hover:bg-foreground/5">
                <Link href="/products?category=shoes">
                  Explore Shoes
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Find the perfect gear for your sport
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-secondary"
              >
                <Image
                  src={
                    category.id === 'shoes'
                      ? 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80'
                      : category.id === 'jerseys'
                      ? 'https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?w=800&auto=format&fit=crop&q=80'
                      : 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&auto=format&fit=crop&q=80'
                  }
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-foreground mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} Products</p>
                </div>
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Top-rated gear loved by athletes</p>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link href="/products">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button asChild variant="outline">
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Summer Sale - Up to 30% Off
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            Don&apos;t miss out on our biggest sale of the season. Limited time only.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/products">
              Shop the Sale
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Sale Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-2">
                Limited Time
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">On Sale</h2>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link href="/products">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Truck className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">
                Free shipping on all orders over $100
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
              <p className="text-sm text-muted-foreground">
                100% secure payment processing
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <RefreshCw className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
              <p className="text-sm text-muted-foreground">
                30-day hassle-free return policy
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
