import React from "react";
import { Product } from "@/@types/product";
import StarRating from "@/store/[storeSlug]/components/StarRating";
import Link from "next/link";
import { Avatar, Button, Option, Select, Typography } from "@material-tailwind/react";
import { Store } from "@/@types/store";
import { useParams } from "next/navigation";
import { useCheckoutContext } from "@/store/[storeSlug]/hooks/use-checkout";
import { usePrices } from "@/store/[storeSlug]/hooks/use-prices";
import { PriceQuantity } from "@/store/[storeSlug]/components/PriceQuantity";

export const BuyBox = ({ product, store }: { product: Product, store: Store }) => {
  const [quantity, setQuantity] = React.useState(1)
  const { storeSlug } = useParams();
  const { prices, selectedPrice, updateSelectedPrice } = usePrices(product);
  const [isAddingToCart, setIsAddingToCart] = React.useState(false)
  const { addToCart, items } = useCheckoutContext()

  console.log('items in cart -->', items)

  const handleAddToCart = React.useCallback(async () => {
    setIsAddingToCart(true);
    await addToCart(product, selectedPrice?.id, quantity);
    setIsAddingToCart(false);
  }, [quantity, selectedPrice, product])

  return (
    <div className="flex flex-col gap-space-16 px-space-16 md:w-[21.5em] md:px-space-0">
      <div className="flex flex-col gap-space-16">
        <div>
          <div>
            <Avatar src={store?.logo_url + "#1"} alt={store?.name} size="sm" />
            <Link href={`/store/${storeSlug}`} className="text-sm font-semibold ml-2 font-lori">{store?.name}</Link>
          </div>
          <div className="flex mt-2">
            <div className="flex flex-col">
              <span className="font-bold text-xl ml-1">{product?.name}</span>
              <div className="mt-1 flex flex-row gap-2">
                <StarRating rating={product?.meta_data?.rating} />
                <Typography color="blue-gray" className="text-sm mt-1 font-medium text-blue-gray-500" >
                  {product?.meta_data?.total_reviews || 0} Reviews
                </Typography>
              </div>
            </div>
          </div>
          <div className="mt-4 border-b-gray-400 border-b-2 pb-2">
            <Typography className="font-bold text-lg" color="blue-gray">
              CA ${selectedPrice?.price}
            </Typography>
          </div>
          <div className="flex justify-between mt-3 border-b-2 pb-2">
            <div>
              <Typography color="blue-gray" className="text-lg font-medium ">
                Size
              </Typography>
            </div>
            <div className="w-40">
              <div className="relative w-full !min-w-0 w-40">
                <Select
                  onChange={updateSelectedPrice}
                  label={selectedPrice?.meta_data?.size}
                  defaultValue={selectedPrice?.id}
                  size="md"
                  className="!min-w-0 max-w-40"
                  containerProps={{ className: "!min-w-0 max-w-40" }}
                >
                  {prices?.map(({ id, meta_data = {} }) => {
                    const { size } = meta_data;
                    return (<Option key={id} value={id}>{size}</Option>);
                  })}
                </Select>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-3  border-b-2 pb-4 mb-2">
            <div>
              <Typography color="blue-gray" className="text-lg font-medium">
                Quantity
              </Typography>
            </div>
            <PriceQuantity
              quantity={quantity}
              onAdd={() => setQuantity(quantity + 1)}
              onRemove={() => setQuantity(quantity - 1)}
              onUpdate={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <div className="mt-6">
            <Typography className="font-semibold">
              Description
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="font-lori text-sm mt-2">
              {product?.description}
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="font-lori text-sm mt-2">
              Category: <span className="font-semibold">{product?.category?.name}</span>

              <span className="block mt-4">
                {product?.category?.description}
              </span>
            </Typography>
          </div>
          <div className="mt-8 w-full flex">
            <Button loading={isAddingToCart} className="w-full justify-center" onClick={handleAddToCart}>Add To Cart</Button>
          </div>
        </div>
      </div>
    </div>
  )
}