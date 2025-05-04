import { Product } from "./product"
import { Store } from "./store"

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
