import { Product, ProductPrice } from "@/@types/product"
import React from "react";

export const usePrices = (product: Product) => {
  const [selectedPrice, setSelectedPrice] = React.useState<ProductPrice | null>(null);
  const defaultPrice = {
    id: "", price: product.price, meta_data: {
      size: "-"
    } } as ProductPrice

  React.useEffect(() => {
    if (!selectedPrice) {
      const prices = product?.prices?.length > 0 ? product.prices[0] : defaultPrice;
      setSelectedPrice(prices)
    }
  }, [product])

  const prices = React.useMemo(() => {
    const prices = product?.prices || [];
    if(!prices.length) {
      if(selectedPrice) {
        prices.push(selectedPrice)
      }
      if(!prices.length) {
        prices.push(defaultPrice)
      }
    }
    
    return prices;
  }, [selectedPrice, product])

  const updateSelectedPrice = React.useCallback((priceId: string) => {
      const priceToAdd = product?.prices?.find(({ id }) => id === priceId);
      if(priceToAdd) {
        setSelectedPrice(priceToAdd);
      }
  }, [product])
  
  return {
    prices,
    selectedPrice,
    updateSelectedPrice
  }
}