'use client';

import { Alert, Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react"
import { useCheckoutContext } from "../../hooks/use-checkout";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useStore } from "@/store/[storeSlug]/hooks/use-store";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CartProductDetail } from "./CartProductDetail";
import React from "react";
import { ProductCheckout } from "@/@types/checkout";

export const CartContainer = () => {
  const { items, totalItems, updateCart, subTotal, handleCheckout } = useCheckoutContext();
  const { storeSlug } = useParams();
  const { store } = useStore(storeSlug as string)?.data || {};
  const router = useRouter()

  const onCheckout = React.useCallback(async () => {
    const checkoutId = await handleCheckout(storeSlug as string)
    // router.push(`/checkout/${checkoutId}`)
  }, [])

  return (
    <>
      <div className="flex flex-row gap-10 w-full">
        <div className="w-[60%]">
          <div className="flex justify-between">
            <div>
              <Typography variant="h2" className="text-2xl font-medium font-crimson" color="blue-gray">
                Cart
              </Typography>
              <Typography className="text-sm text-gray-600 font-medium ">
                {totalItems} items in your cart
              </Typography>
            </div>
            <div>
              {
                !!totalItems && (
                  <Link href={`/store/${store.slug}`} className="mt-8">
                    <Button variant="text" className="flex items-center gap-2">
                      Continue Shopping {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </Button>
                  </Link>
                )
              }

            </div>
          </div>
          {
            !totalItems && (
              <div className="mt-8">
                <Alert icon={<InformationCircleIcon className="w-6 h-6" />}>Your cart is empty lets fill it up</Alert>

                <Link href={`/store/${store.slug}`} className="mt-8">
                  <Button variant="text" className="flex items-center gap-2 mt-8">
                    Start Shopping {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </Button>
                </Link>
              </div>
            )
          }
          {
            !!totalItems && (
              <Card className="mt-6 w-full">
                <CardBody>
                  {Object.keys(items).map((key: string) => {
                    const item = items[key] as Array<ProductCheckout>
                    return item.map((product) => {
                      return (
                        <CartProductDetail product={product} updateCart={updateCart} />
                      )
                    })

                  })}
                </CardBody>
              </Card>
            )
          }
        </div>
        {
          !!totalItems && (
            <div className="w-[25%]">
              <Card className="mt-6 w-full relative">
                <CardBody>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold font-crimson">Order Summary</span>
                    <div className="mt-8 mb-8 border-md flex justify-between">
                      <Typography className="text-lg">
                        Sub Total
                      </Typography>
                      <Typography>
                        ${subTotal.toFixed(2)}
                      </Typography>
                    </div>
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="w-full justify-self-end">
                    <Button className="w-full" onClick={onCheckout}>Checkout</Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          )
        }
      </div>
    </>
  )
}