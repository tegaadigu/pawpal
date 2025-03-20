'use client';

import { useCallback } from "react";
import { Product } from "@/@types/product";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";

import Image from 'next/image';
import StarRating from "./StarRating";
import { useRouter, usePathname } from "next/navigation";
import { useCheckoutContext } from "@/store/[storeSlug]/hooks/use-checkout";
import React from "react";
import { usePrices } from "@/store/[storeSlug]/hooks/use-prices";

export function ProductCard({ product }: { product: Product }) {
  const rating = product?.meta_data?.rating || 0;
  const totalReviews = product?.meta_data?.total_reviews || 0;
  const router = useRouter();
  const pathname = usePathname();
  const { addToCart } = useCheckoutContext();
  const { selectedPrice : productPrice } = usePrices(product)

  const handleProductClick = useCallback(() => {
    router.push(`${pathname}/${product.id}/view`);
  }, [product])

  return (
    <Card className="w-full max-w-[17rem] shadow-lg">
      <CardHeader floated={false} color="blue-gray" onClick={handleProductClick} className="cursor-pointer">
        <Image src={product?.images?.[0]?.path} width={384} height={256} />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {product?.name}
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            ${ productPrice?.price || product?.price}
          </Typography>
        </div>
        <div className="5 flex items-center justify-between">
          <div className="flex flex-row">
            <StarRating rating={rating} />
            <Typography className="ml-2 text-sm">
              ({totalReviews})
            </Typography>
          </div>
          <div>
            <IconButton variant="text" size="sm" className="rounded-full border border-gray-200" onClick={() => addToCart(product, productPrice?.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
              </svg>
            </IconButton>
          </div>
        </div>
      </CardBody>

    </Card>
  );
}