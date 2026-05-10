"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import type { Product, ProductCategory } from '@/types/types'
import { PRODUCT_CATEGORY_TO_CATE_ID } from '@/types/createProduct.type'
import { buildCreateProductFormData, useCreateProductMutation } from '@/services/api/product.api'

interface ProductFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product | null
  onSubmit: (product: Omit<Product, 'product_id' | 'created_at'> & { product_id?: number }) => void
  /**
   * Create route: POST `/products/create` with FormData instead of parent-local state only.
   * Ignored when `product` is set (edit flows still use `onSubmit`).
   */
  submitViaCreateApi?: boolean
}

const emptyForm = {
  name: '',
  description: '',
  price: '',
  quantity: '',
  category: 'shoes' as ProductCategory,
  image: '',
}

export function ProductForm({
  open,
  onOpenChange,
  product,
  onSubmit,
  submitViaCreateApi = false,
}: ProductFormProps) {
  const [formData, setFormData] = useState(emptyForm)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation()

  useEffect(() => {
    if (!open) return;
    queueMicrotask(() => {
      setFormData({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price != null ? String(product.price) : '',
        quantity: product?.quantity != null ? String(product.quantity) : '',
        category: (product?.category ?? 'shoes') as ProductCategory,
        image: product?.image || '',
      });
      setSubmitError(null);
    });
  }, [open, product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (submitViaCreateApi && !product) {
      try {
        const fd = buildCreateProductFormData({
          pro_name: formData.name,
          pro_detail: formData.description,
          pro_price: Number.parseFloat(formData.price),
          pro_qty: Number.parseInt(formData.quantity, 10),
          cate_id: PRODUCT_CATEGORY_TO_CATE_ID[formData.category],
          pro_image_url: formData.image || undefined,
        })
        const result = await createProduct(fd).unwrap()
        if (!result.success) {
          setSubmitError('Server did not confirm product creation.')
          return
        }
        onOpenChange(false)
        setFormData(emptyForm)
      } catch (err) {
        const msg =
          typeof err === 'object' &&
          err !== null &&
          'data' in err &&
          typeof (err as { data?: unknown }).data === 'object' &&
          (err as { data?: { message?: string } }).data?.message != null
            ? String((err as { data: { message?: string } }).data.message)
            : err instanceof Error
              ? err.message
              : 'Request failed.'
        setSubmitError(msg)
      }
      return
    }

    onSubmit({
      ...(product?.product_id && { product_id: product.product_id }),
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      quantity: Number.parseInt(formData.quantity, 10),
      category: formData.category as ProductCategory,
      image: formData.image || `/products/placeholder.jpg`,
    })
    onOpenChange(false)
    setFormData(emptyForm)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          <DialogDescription>
            {product ? 'Update the product details below.' : 'Fill in the details to add a new product.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup className="gap-4 py-4">
            {submitError ? (
              <p className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
                {submitError}
              </p>
            ) : null}
            <Field>
              <FieldLabel htmlFor="name">Product Name</FieldLabel>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nike Air Max 270"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product description..."
                rows={3}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="price">Price ($)</FieldLabel>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="99.99"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="50"
                  required
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="category">Category</FieldLabel>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value as ProductCategory })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shoes">Shoes</SelectItem>
                  <SelectItem value="jersey">Jersey</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="image">Image URL</FieldLabel>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/products/product-image.jpg"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isCreating}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating}>
              {product ? 'Update Product' : isCreating ? 'Creating…' : 'Add Product'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function CreateProductPage() {
  const router = useRouter();
  return (
    <div className="p-4 md:p-6">
      <ProductForm
        open={true}
        submitViaCreateApi
        onOpenChange={(open) => {
          if (!open) router.push("/admin/products");
        }}
        product={null}
        onSubmit={() => {
          router.push("/admin/products");
        }}
      />
    </div>
  );
}
