"use client"

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProductCard } from '@/components/product-card'
import { fetchProducts } from '@/lib/api'
import { categories } from '@/lib/data'
import type { StoreProduct } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

const priceRanges = [
  { label: 'All Prices', min: undefined, max: undefined },
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: 'Over $200', min: 200, max: undefined },
]

function ProductsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [products, setProducts] = useState<StoreProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  })

  const category = searchParams.get('category') || 'all'
  const priceRange = searchParams.get('price') || '0'
  const page = parseInt(searchParams.get('page') || '1', 10)

  const loadProducts = useCallback(async () => {
    setLoading(true)
    const rangeIndex = Number.parseInt(priceRange, 10)
    const range = priceRanges[Number.isFinite(rangeIndex) ? rangeIndex : 0]

    const result = await fetchProducts({
      category: category === 'all' ? undefined : category,
      minPrice: range?.min,
      maxPrice: range?.max,
      search: searchQuery || undefined,
      page,
      limit: 9,
    })

    setProducts(result.products)
    setPagination({
      page: result.page,
      totalPages: result.totalPages,
      total: result.total,
    })
    setLoading(false)
  }, [category, priceRange, searchQuery, page])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all' || value === '0') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    params.delete('page')
    router.push(`/products?${params.toString()}`)
  }

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (newPage === 1) {
      params.delete('page')
    } else {
      params.set('page', newPage.toString())
    }
    router.push(`/products?${params.toString()}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    loadProducts()
  }

  const clearFilters = () => {
    setSearchQuery('')
    router.push('/products')
  }

  const hasActiveFilters = category !== 'all' || priceRange !== '0' || searchQuery

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Shop All Products</h1>
        <p className="text-muted-foreground">
          {pagination.total} products available
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Search */}
            <div>
              <h3 className="font-semibold mb-3">Search</h3>
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-secondary border-border"
                  />
                </div>
              </form>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-1">
                <button
                  onClick={() => updateFilter('category', 'all')}
                  className={cn(
                    'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    category === 'all'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                  )}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => updateFilter('category', cat.id)}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                      category === cat.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="space-y-1">
                {priceRanges.map((range, index) => (
                  <button
                    key={index}
                    onClick={() => updateFilter('price', index.toString())}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                      priceRange === index.toString()
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Filter Bar */}
          <div className="lg:hidden mb-6">
            <div className="flex gap-2">
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-secondary border-border"
                  />
                </div>
              </form>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={cn(showFilters && 'bg-primary text-primary-foreground')}
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Filters Panel */}
            {showFilters && (
              <div className="mt-4 p-4 bg-card rounded-lg border border-border space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Category</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant={category === 'all' ? 'default' : 'outline'}
                      onClick={() => updateFilter('category', 'all')}
                    >
                      All
                    </Button>
                    {categories.map((cat) => (
                      <Button
                        key={cat.id}
                        size="sm"
                        variant={category === cat.id ? 'default' : 'outline'}
                        onClick={() => updateFilter('category', cat.id)}
                      >
                        {cat.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Price</h4>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map((range, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant={priceRange === index.toString() ? 'default' : 'outline'}
                        onClick={() => updateFilter('price', index.toString())}
                      >
                        {range.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, index) => (
                <Skeleton key={index} className="h-[350px] w-full" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">No products found</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={pagination.page === 1}
                    onClick={() => goToPage(pagination.page - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                      (pageNum) => (
                        <Button
                          key={pageNum}
                          variant={pageNum === pagination.page ? 'default' : 'outline'}
                          size="icon"
                          onClick={() => goToPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      )
                    )}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={pagination.page === pagination.totalPages}
                    onClick={() => goToPage(pagination.page + 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8"><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, index) => (
        <Skeleton key={index} className="h-[350px] w-full" />
      ))}
    </div></div>}>
      <ProductsContent />
    </Suspense>
  )
}
