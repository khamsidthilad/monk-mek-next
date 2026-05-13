'use client'

import { useMemo, useState } from 'react'
import { Edit, Trash2, Plus, Search, Filter, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetAllProductsQuery } from '@/services/api/product.api'
import type { Product as ApiProduct } from '@/types/getAllproduct.type'
import type { Product, ProductCategory } from '@/types/types'
import { ProductForm } from './create-product/page'

function coerceApiNumber(value: unknown, fallback = 0): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim() !== '') {
    const n = Number(value)
    if (Number.isFinite(n)) return n
  }
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

function productImageSrc(pro_image: ApiProduct['pro_image']): string {
  if (typeof pro_image === 'string' && pro_image.trim()) return pro_image
  if (pro_image && typeof pro_image === 'object' && 'url' in pro_image && typeof pro_image.url === 'string') {
    return pro_image.url
  }
  return '/products/placeholder.jpg'
}

function apiToFormProduct(p: ApiProduct): Product {
  const cateName = (p.category?.cate_name ?? '').toLowerCase()
  let category: ProductCategory = 'equipment'
  if (cateName.includes('shoe')) category = 'shoes'
  else if (cateName.includes('jersey')) category = 'jersey'

  return {
    product_id: p.pro_id,
    name: p.pro_name,
    description: p.pro_detail ?? '',
    price: coerceApiNumber(p.pro_price),
    quantity: Math.trunc(coerceApiNumber(p.pro_qty)),
    category,
    image: productImageSrc(p.pro_image),
    created_at: p.createdAt?.split('T')[0],
  }
}

function formToApiProduct(
  data: Omit<Product, 'product_id' | 'created_at'> & { product_id?: number },
  existing: ApiProduct | null
): ApiProduct {
  const pro_id = data.product_id ?? -Date.now()
  const label =
    data.category === 'jersey' ? 'Jersey' : data.category === 'shoes' ? 'Shoes' : 'Equipment'

  return {
    pro_id,
    pro_name: data.name,
    pro_detail: data.description,
    pro_price: data.price,
    pro_image: data.image,
    pro_qty: data.quantity,
    cate_id: existing?.category?.cate_id ?? existing?.cate_id ?? 0,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category:
      existing?.category ?? {
        cate_id: existing?.cate_id ?? 0,
        cate_name: label,
        createdAt: '',
        updatedAt: '',
      },
  }
}

function getCategoryBadgeVariant(cateName: string): 'default' | 'outline' | 'brand' {
  const lower = cateName.toLowerCase()
  if (lower.includes('shoe')) return 'default'
  if (lower.includes('jersey')) return 'brand'
  return 'outline'
}

export function ProductsTable() {
  const { data, isLoading, isError, error, refetch, isFetching } = useGetAllProductsQuery()

  const serverList = useMemo(() => {
    if (!data?.success || !data.data) return []
    return Array.isArray(data.data) ? data.data : []
  }, [data])

  const [extraLocal, setExtraLocal] = useState<ApiProduct[]>([])
  const [removedIds, setRemovedIds] = useState<Set<number>>(new Set())
  const [replacements, setReplacements] = useState<Map<number, ApiProduct>>(new Map())

  const products = useMemo(() => {
    const patched = serverList
      .filter((p) => !removedIds.has(p.pro_id))
      .map((p) => replacements.get(p.pro_id) ?? p)
    return [...patched, ...extraLocal]
  }, [serverList, extraLocal, removedIds, replacements])

  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [formOpen, setFormOpen] = useState(false)
  const [editingApiProduct, setEditingApiProduct] = useState<ApiProduct | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<ApiProduct | null>(null)

  const categoryOptions = useMemo(() => {
    const names = new Set<string>()
    products.forEach((p) => {
      if (p.category?.cate_name) names.add(p.category.cate_name)
    })
    return Array.from(names).sort()
  }, [products])

  const filteredProducts = products.filter((product) => {
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      product.pro_name.toLowerCase().includes(q) ||
      (product.pro_detail?.toLowerCase().includes(q) ?? false)
    const cateName = product.category?.cate_name ?? ''
    const matchesCategory = categoryFilter === 'all' || cateName === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleAddProduct = (productData: Omit<Product, 'product_id' | 'created_at'> & { product_id?: number }) => {
    const apiRow = formToApiProduct(productData, null)
    setExtraLocal((prev) => [...prev, apiRow])
  }

  const handleEditProduct = (productData: Omit<Product, 'product_id' | 'created_at'> & { product_id?: number }) => {
    if (productData.product_id == null) return
    const id = productData.product_id
    const base =
      editingApiProduct ??
      serverList.find((p) => p.pro_id === id) ??
      extraLocal.find((p) => p.pro_id === id) ??
      null
    const next = formToApiProduct(productData, base)

    if (id < 0 || extraLocal.some((p) => p.pro_id === id)) {
      setExtraLocal((prev) => prev.map((p) => (p.pro_id === id ? next : p)))
    } else {
      setReplacements((prev) => new Map(prev).set(id, next))
    }
    setEditingApiProduct(null)
  }

  const handleDeleteProduct = () => {
    if (!productToDelete) return
    const id = productToDelete.pro_id
    if (id < 0 || extraLocal.some((p) => p.pro_id === id)) {
      setExtraLocal((prev) => prev.filter((p) => p.pro_id !== id))
    } else {
      setRemovedIds((prev) => new Set(prev).add(id))
      setReplacements((prev) => {
        const next = new Map(prev)
        next.delete(id)
        return next
      })
    }
    setDeleteDialogOpen(false)
    setProductToDelete(null)
  }

  const editingProduct = editingApiProduct ? apiToFormProduct(editingApiProduct) : null

  return (
    <>
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <CardTitle>Products</CardTitle>
            {isFetching && !isLoading && (
              <Loader2 className="size-4 animate-spin text-muted-foreground" aria-hidden />
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => void refetch()}>
              Refresh
            </Button>
            <Button
              type="button"
              onClick={() => {
                setEditingApiProduct(null)
                setFormOpen(true)
              }}
            >
              <Plus className="mr-2 size-4" />
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isError && (
            <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm">
              <p className="font-medium text-destructive">Could not load products</p>
              <p className="mt-1 text-muted-foreground">
                {error && 'data' in error && error.data != null && typeof error.data === 'object' && 'message' in error.data
                  ? String((error.data as { message?: string }).message)
                  : 'Check your API URL, auth token, and network.'}
              </p>
              <Button type="button" variant="outline" size="sm" className="mt-3" onClick={() => void refetch()}>
                Try again
              </Button>
            </div>
          )}

          {/* Filters */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter} disabled={isLoading}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 size-4" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categoryOptions.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="hidden sm:table-cell">Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="size-4 animate-spin" />
                        Loading products…
                      </span>
                    </TableCell>
                  </TableRow>
                ) : filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      No products found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.pro_id}>
                      <TableCell className="font-mono text-muted-foreground">#{product.pro_id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{product.pro_name}</div>
                          <div className="line-clamp-1 text-sm text-muted-foreground md:hidden">
                            {product.category?.cate_name ?? '—'}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          variant={getCategoryBadgeVariant(product.category?.cate_name ?? '')}
                          className="capitalize"
                        >
                          {product.category?.cate_name ?? '—'}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        ${coerceApiNumber(product.pro_price).toFixed(2)}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <span
                          className={
                            coerceApiNumber(product.pro_qty) < 20
                              ? 'text-destructive'
                              : 'text-foreground'
                          }
                        >
                          {Math.trunc(coerceApiNumber(product.pro_qty))}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            type="button"
                            onClick={() => {
                              setEditingApiProduct(product)
                              setFormOpen(true)
                            }}
                          >
                            <Edit className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            type="button"
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              setProductToDelete(product)
                              setDeleteDialogOpen(true)
                            }}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </CardContent>
      </Card>

      <ProductForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open)
          if (!open) setEditingApiProduct(null)
        }}
        product={editingProduct}
        onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{productToDelete?.pro_name}&quot;? This removes it from the
              list locally until you refresh; connect a delete API to persist changes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProduct}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default function ProductsPage() {
  return <ProductsTable />
}
