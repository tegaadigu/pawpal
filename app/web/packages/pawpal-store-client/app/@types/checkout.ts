import { Product } from "./product"

export type Checkout = {
  items?: Record<string, Array<Product>>
  totalItems: number,
  subTotal: number,
  addToCart(product: Product, priceId?: string, quantity?: number): void,
  updateCart(product: ProductCheckout, quantity: number): void,
  handleCheckout(store_slug: string): Promise<string>
}

export interface ProductCheckout extends Product {
  quantity: number,
  priceId: string
}
