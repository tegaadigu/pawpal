import { Product } from "@/@types/product"
import { useMutation } from "@tanstack/react-query"
import React, { createContext, useContext, ReactNode } from "react"
import { DEFAULT_CURRENCY, getItemsfromLocalStorage, saveItemsInLocalStorage } from "../utils"
import { Checkout, ProductCheckout } from "@/@types/checkout"

interface ProductItems {
  amount: number,
  price_id: string,
  product_id: string,
  quantity: number
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


const useCheckoutMutation = () => {
  return useMutation({
    mutationKey: ['checkout'],
    mutationFn: async () => {
      console.log('hello world..')
      return {}
    } 
  })
}
export const useCheckout = (): Checkout => {
  const [items, setItems] = React.useState<Record<string, Array<ProductCheckout>>>({})
  const [totalItems, setTotalItems] = React.useState(0);
  const { mutateAsync } = useCheckoutMutation();

  console.log('items items -->', {items})

  React.useEffect(() => {
    const hasItems = Object.keys(items).length
    if(!hasItems) {
      const itemsFromLocalstorage = getItemsfromLocalStorage()
      setItems(itemsFromLocalstorage)
      updateTotalItems(itemsFromLocalstorage)
    }
  }, [])

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

  const getCartCurrency = React.useCallback(() => {
    const key = Object.keys(items)[0];
    const item = items[key]?.[0]
    if (item?.priceId) {
      const price = item.prices.find((price) => price.id === item.priceId)
      return price?.currency_code || DEFAULT_CURRENCY
    }
    return DEFAULT_CURRENCY
  }, [items])

  const getProductItems = React.useCallback(() => {
    const itemsToReturn: Array<ProductItems> = [];
    console.log('items -->', items)
    Object.keys(items).forEach(key => {
      const products = items[key]
       products.forEach(product => {
        const price = product?.prices?.find(({ id }) => id === product.priceId)
        console.log('price price --->', price);
        itemsToReturn.push({
          product_id: product.id,
          price_id: product.priceId,
          amount: price?.price || 0,
          quantity: product.quantity,
        })
      })
    })

    console.log('items to return --->',itemsToReturn)

    return itemsToReturn;
    
  }, [items])


  console.log('la lalal items --->', { items })
  const handleCheckout = React.useCallback(async (store_slug: string) => {
    try {
      const data = {
        store_slug,
        currency: getCartCurrency(),
        total_amount: subTotal,
        products: getProductItems(),
      }
      console.log('data --->', data)
      // mutateAsync()
    }catch(e) {
      console.log('error happened -->', e)
      return ""
    }
    return "checkout_id"
  }, [items, getCartCurrency])

  return {
    items,
    addToCart,
    totalItems,
    updateCart,
    subTotal,
    handleCheckout
  }
}

const CheckoutContext = createContext<Checkout | null>(null);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const checkout = useCheckout();
  return (
    <CheckoutContext.Provider value={checkout}>
      {children}
    </CheckoutContext.Provider>
  )
}

export const useCheckoutContext = (): Checkout => {
  const context = useContext(CheckoutContext) as Checkout
  return context;
}