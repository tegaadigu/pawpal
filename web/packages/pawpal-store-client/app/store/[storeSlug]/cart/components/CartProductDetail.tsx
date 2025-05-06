import { Product } from "@/@types/product";
import Image from 'next/image';
import { usePrices } from "../../hooks/use-prices";
import { ProductCheckout } from  "@/@types/checkout";
import { PriceQuantity } from "@/store/[storeSlug]/components/PriceQuantity";
import React from "react";

export const CartProductDetail = ({ product, updateCart }: { product: ProductCheckout, updateCart: (product: Product, updateQuantity: number) => void }) => {
  const { getPriceById } = usePrices(product as Product);
  const price = getPriceById(product?.priceId);
  const [quantity, setQuantity] = React.useState(product.quantity);
  const showDelete = React.useMemo(() => {
    return quantity <= 1;
  }, [quantity])

  const handleOnRemove = React.useCallback(() => {
    const updatedQuantity = quantity - 1;
    updateCart(product, updatedQuantity)
    setQuantity(updatedQuantity)
  }, [product, quantity, updateCart])

  const handleOnAdd = React.useCallback(() => {
    const updatedQuantity = quantity + 1;
    updateCart(product, updatedQuantity);
    setQuantity(updatedQuantity)

  }, [product, quantity, updateCart])

  return (
    <>
      <div className="flex gap-4">
        <div className="rounded-md">
          <Image src={product?.images?.[0]?.path} alt={product?.name} width={200} height={600} className="rounded-lg" />
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <span className="text-md font-bold">
            {product.name}
          </span>
          <span className="text-sm text-blue-gray font-medium" color="blue-gray">
            {price?.meta_data?.size}
          </span>
          <span className="text-xs">
            {product?.description}
          </span>
          <span className="text-lg font-crimson font-bold">
            ${price?.price}
          </span>
        </div>
        <div className="mt-12 ml-4">
          <PriceQuantity
            quantity={quantity}
            onAdd={handleOnAdd}
            onRemove={handleOnRemove}
            onUpdate={(e) => setQuantity(Number(e.target.value))}
            showDelete={showDelete}
          />
        </div>
        <div className="mt-14 ml-8">
          <span className="text-2xl font-crimson">
            ${ (price?.price * quantity).toFixed(2) }
          </span>
        </div>
      </div>
      <div className="w-full border-t border-gray-200 m-4" />
    </>
  )
}