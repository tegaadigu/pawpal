import { Product } from "@/@types/product"
import React, { createContext, useContext, ReactNode } from "react"


interface CheckoutInterface {
  items?: Record<string, Array<Product>>
  totalItems: number,
  subTotal: number,
  addToCart(product: Product, priceId?: string, quantity?: number): void,
  updateCart(product: ProductCheckout, quantity: number): void,
}

export interface ProductCheckout extends Product {
  quantity: number,
  priceId: string
}

const handleExistingItemInCart = (items: Record<string, Array<ProductCheckout>>, product: Product, priceId: string, quantity: number): Array<ProductCheckout> => {
  const itemWithPrice = items[product.id].find((prod) => {
    return prod.priceId === priceId;
  })
  if (itemWithPrice) {
    return items[product.id].map((item) => {
      if (item.priceId === priceId) {
        return { ...item, quantity: quantity ? quantity : item.quantity + 1 }
      }
      return item
    })
  } else {
    return [
      ...(items?.[product.id] || []),
      {
        ...product,
        priceId,
        quantity
      }
    ]
  }
}

const updateCartItem = (items: Record<string, Array<ProductCheckout>>, product: ProductCheckout, quantity: number): Record<string, Array<ProductCheckout>> => {
  let itemsClone = JSON.parse(JSON.stringify(items));
  if(itemsClone[product.id]) {
    const productToUpdate = itemsClone[product.id];
    if(!quantity) {
      if(productToUpdate.length == 1) {
        delete itemsClone[product.id]
      }else {
        itemsClone = {
          ...itemsClone,
          [product.id]: itemsClone[product.id].filter((prod: ProductCheckout) => prod.priceId !== product.priceId)
        }
      }
    }
    else {
        itemsClone = {
          ...itemsClone,
          [product.id]: itemsClone[product.id].map((prod: ProductCheckout) => {
            console.log('prod and price Id -->', { priceId: prod.priceId, product})
            return prod.priceId === product.priceId ? { ...prod, quantity} : prod
          })
        }
    }
  }

  return itemsClone;
}


const saveItemsInLocalStorage = (items: Record<string, Array<ProductCheckout>>) => {
  localStorage.setItem("cart", JSON.stringify(items));
}

export const useCheckout = (): CheckoutInterface => {
  const [items, setItems] = React.useState<Record<string, Array<ProductCheckout>>>({})
  const [totalItems, setTotalItems] = React.useState(0);

  const updateTotalItems = React.useCallback((updatedItems: Record<string, Array<ProductCheckout>>) => {
    const newTotal = Object.values(updatedItems).flat().reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(newTotal);
  }, [])

  const addToCart = React.useCallback(async (product: Product, priceId: string, quantity: number) => {
    const updatedItems = JSON.parse(JSON.stringify(items));
    if (items && items[product.id]) {
      updatedItems[product.id] = handleExistingItemInCart(items, product, priceId, quantity)
    } else {
      updatedItems[product.id] = [{
        ...product,
        quantity: quantity || 1,
        priceId: priceId,
      }]
    }

    setItems(updatedItems);
    await saveItemsInLocalStorage(updatedItems);
    updateTotalItems(updatedItems);

  }, [items])


  const updateCart = React.useCallback(async (product: ProductCheckout, quantity: number) => {
    const updatedItems = updateCartItem(items, product, quantity);
    setItems(updatedItems)
    await saveItemsInLocalStorage(updatedItems)
    updateTotalItems(updatedItems)
  }, [items])

  const subTotal = React.useMemo(() => {
    return Object.values(items).flat().reduce((sum, item) => {
      const selectedPrice = item.prices.find(price => item.priceId === price.id) || { price: item.price };
      return sum + (item.quantity * selectedPrice.price)
    }, 0);
  }, [items])

  return {
    items,
    addToCart,
    totalItems,
    updateCart,
    subTotal
  }
}

const CheckoutContext = createContext<CheckoutInterface | null>(null);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const checkout = useCheckout();
  return (
    <CheckoutContext.Provider value={checkout}>
      {children}
    </CheckoutContext.Provider>
  )
}

export const useCheckoutContext = (): CheckoutInterface => {
  const context = useContext(CheckoutContext) as CheckoutInterface;
  return context;
}