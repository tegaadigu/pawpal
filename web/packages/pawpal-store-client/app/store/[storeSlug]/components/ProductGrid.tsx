'use client';

import { useProducts } from "@/store/[storeSlug]/hooks/use-products";
import { useParams } from "next/navigation";
import { Input } from "@material-tailwind/react";
import { useStore } from "@/store/[storeSlug]/hooks/use-store"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ProductFilters } from "./ProductFilters";
import { ProductCard } from "./ProductCard";
import { useSortByContext } from "./ProductFilters/hooks/use-sortby";
export const ProductGrid = () => {
  const { storeSlug: slug = '' } = useParams() as unknown as string
  const { sortField, sortOrder } = useSortByContext();
  const { data } = useProducts(slug, { sortField, sortOrder });
  const  { products = [] } = data || {};
  const { data: storeData } = useStore(slug)
  const { store = {} } = storeData || {};
  return (
    <>
      <div className="flex flex-row justify-between mt-8 mb-8">
        <span className="text-2xl font-semibold font-inter">
          Products
        </span>
        <div>
          <Input placeholder={`Search ${store?.name}`} variant="outlined" label="Search" icon={<MagnifyingGlassIcon />} />
        </div>
      </div>
      <div>
        <ProductFilters />
      </div>
      <div className="flex gap-6 mt-8">
        { products?.map((product) => {
          return (<ProductCard product={product} key={product.id}/>)
        })}
      </div>
    </>
  )
}