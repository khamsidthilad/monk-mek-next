"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Check, Loader2, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { useCartHydrated } from '@/lib/use-cart-hydrated'
import { useCartStore } from '@/lib/store'
import { createOrder } from '@/lib/api'
import type { CustomerInfo } from '@/types/types'

export default function CheckoutPage() {
  const cartHydrated = useCartHydrated()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)

  const items = useCartStore((state) => state.items)
  const getTotal = useCartStore((state) => state.getTotal)
  const clearCart = useCartStore((state) => state.clearCart)

  const [formData, setFormData] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  })

  const validateForm = () => {
    const newErrors: Partial<CustomerInfo> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setSubmitError(null)
    setIsSubmitting(true)

    try {
      const result = await createOrder({
        items,
        customer: formData,
      })

      if (result.success && result.orderId) {
        setOrderId(result.orderId)
        setOrderComplete(true)
        clearCart()
      } else {
        setSubmitError('Could not complete your order. Please try again.')
      }
    } catch (error) {
      console.error('Order submission failed:', error)
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (!cartHydrated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="animate-pulse space-y-4">
          <div className="h-64 bg-secondary rounded-lg" />
        </div>
      </div>
    )
  }

  // Order Complete State
  if (orderComplete && orderId) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <Check className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mb-2">
            Thank you for your purchase.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Order ID: <span className="font-mono">{orderId}</span>
          </p>
          <Button asChild size="lg">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Empty Cart State
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Add some items to your cart before checking out.
          </p>
          <Button asChild size="lg">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  const subtotal = getTotal()
  const shipping = subtotal >= 100 ? 0 : 9.99
  const total = subtotal + shipping

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-8 -ml-2">
        <Link href="/cart">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Link>
      </Button>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customer Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={errors.name ? 'border-destructive' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">{errors.name}</p>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={errors.phone ? 'border-destructive' : ''}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="address">Street Address</FieldLabel>
                    <Input
                      id="address"
                      placeholder="123 Main St, Apt 4"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className={errors.address ? 'border-destructive' : ''}
                    />
                    {errors.address && (
                      <p className="text-sm text-destructive mt-1">{errors.address}</p>
                    )}
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="city">City</FieldLabel>
                      <Input
                        id="city"
                        placeholder="New York"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={errors.city ? 'border-destructive' : ''}
                      />
                      {errors.city && (
                        <p className="text-sm text-destructive mt-1">{errors.city}</p>
                      )}
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="zipCode">ZIP Code</FieldLabel>
                      <Input
                        id="zipCode"
                        placeholder="10001"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className={errors.zipCode ? 'border-destructive' : ''}
                      />
                      {errors.zipCode && (
                        <p className="text-sm text-destructive mt-1">{errors.zipCode}</p>
                      )}
                    </Field>
                  </div>
                </FieldGroup>

                {submitError && (
                  <p className="mt-4 text-sm text-destructive" role="alert">
                    {submitError}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
                      Processing...
                    </>
                  ) : (
                    `Place Order - $${total.toFixed(2)}`
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${item.product.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2">
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
              </div>

              <Separator />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
