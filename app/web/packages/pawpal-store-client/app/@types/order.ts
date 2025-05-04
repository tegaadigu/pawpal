import { ProductCheckout } from "./checkout"

export type OrderData = {
  store_slug: string
  phone_number: string,
  currency: string,
  total_amount: number
  products: Array<ProductCheckout>
}