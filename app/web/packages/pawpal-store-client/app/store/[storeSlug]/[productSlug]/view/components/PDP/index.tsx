import React from "react";
import { Alert, Avatar, Button, Carousel, IconButton, Input, Option, Select, Typography } from "@material-tailwind/react";
import { useParams } from "next/navigation";
import { useStore } from "@/store/[storeSlug]/hooks/use-store";
import { useProduct } from "@/store/[storeSlug]/hooks/use-products";
import { Product, ProductPrice } from "@/@types/product";
import { useCheckoutContext } from "@/store/[storeSlug]/hooks/use-checkout";
import { PDPCarousel } from "./PDPCarousel";
import { BuyBox } from "./BuyBox";
import { Reviews } from "./Reviews";


export const PDP = () => {
  const { storeSlug, productSlug } = useParams();
  const { store = {} } = useStore(storeSlug as string)?.data || {};
  const { product = {} as Product } = useProduct(productSlug as string)?.data || {};
  return (
    <>
      <div className="flex flex-col gap-space-16 md:mt-space-24 md:flex-row md:gap-space-40">
        <PDPCarousel product={product} />
        <BuyBox product={product} store={store} />
        {/* Buy Box */}
      </div>
      <Reviews product={product} />
      <div className="mt-14">
        <Typography color="blue-gray" className="font-sans font-bold text-lg">
          More from {store?.name}
        </Typography>
      </div>
    </>
  )
}