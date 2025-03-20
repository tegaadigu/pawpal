'use client';

import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Badge, IconButton, Input } from "@material-tailwind/react";
import { useCheckoutContext } from "@/store/[storeSlug]/hooks/use-checkout";
import { useRouter, usePathname } from "next/navigation";

export const Header = () => {
  const { totalItems } = useCheckoutContext();
  const router = useRouter();
  const pathname = usePathname();

  const handleRedirectToCart = React.useCallback(() => {
    const segments = pathname.split("/").slice(0, 3).join("/");
    router.push(`${segments}/cart`);
  }, [router, pathname])
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white">
      <h1 className="font-lori text-3xl font-bold text-blue-gray-500">Pawpal</h1>
      <div className="relative flex-1 max-w-lg">
        <div className="w-80">
          <Input
            className="!border !border-gray-300 bg-white text-gray-900 focus:!border-gray-900 focus:!border-t-gray-900 "
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
            placeholder="Search Pawpal" icon={<DocumentMagnifyingGlassIcon className="w-6 h-6" />} />
        </div>
      </div>
      <div className="flex items-center space-x-4">
          <Badge content={totalItems} className="h-2 w-2" withBorder color="blue-gray">
            <IconButton variant="text" onClick={handleRedirectToCart}>
              <ShoppingCartIcon className="w-6 h-6 text-blue-gray-600" />
            </IconButton>
          </Badge>
      </div>
    </header>
  )
}