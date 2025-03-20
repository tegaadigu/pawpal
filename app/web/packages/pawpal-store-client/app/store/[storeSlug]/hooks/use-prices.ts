import { Product, ProductPrice } from "@/@types/product"
import React from "react";

export const usePrices = (product: Product) => {
  const [selectedPrice, setSelectedPrice] = React.useState<ProductPrice | null>(null);
  const defaultPrice = {
    id: "", price: product.price, meta_data: {
      size: "-"
    } } as ProductPrice

    const productPrice = React.useMemo(() => {
      if(product.prices && product.prices.length) {
        const defaultPrice = product.prices.find(({ meta_data: { is_default }}) => {
          return is_default;
        })
        return defaultPrice || product.prices[0];
      }
      return defaultPrice;
    }, [product])

  React.useEffect(() => {
    if (!selectedPrice) {
      setSelectedPrice(productPrice)
    }
  }, [productPrice])

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

  const getPriceById = React.useCallback((priceId: string) => {
    console.log('get Price by id..', priceId)
    return prices?.find(price => price.id === priceId);
  }, [product, prices])

  console.log('prices and everything else --->', prices)

  const updateSelectedPrice = React.useCallback((priceId: string) => {
      const priceToAdd = product?.prices?.find(({ id }) => id === priceId);
      if(priceToAdd) {
        setSelectedPrice(priceToAdd);
      }
  }, [product])
  
  return {
    prices,
    selectedPrice,
    updateSelectedPrice,
    getPriceById
  }
}