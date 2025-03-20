'use client';
import { Select, Option, Button, Typography} from "@material-tailwind/react";
import { useParams } from "next/navigation";
import { getProductParams, useProducts } from "@/store/[storeSlug]/hooks/use-products";
import { useCategories} from "@/store/[storeSlug]/hooks/use-categories";
import { ProductCategory } from "@/@types/product";
import { useSortByContext } from "@/store/[storeSlug]/components/ProductFilters/hooks/use-sortby";
import { SortFilter } from "./SortFilter";
import { PriceFilter } from "./PriceFilter";


export const ProductFilters = () => {
  const { storeSlug: slug = '' } = useParams() as unknown as string;
  const { productCategories: categories = []} = useCategories(slug)?.data || {}
  const { products = [] } = useProducts(slug)?.data || {};
  return (
    <div className="flex gap-2">
      <div className="">
        <SortFilter />
      </div>
        <PriceFilter/>
      <div>
        <Select variant="outlined" label="Category" size="md">
          {
            categories?.map((category: ProductCategory) => {
              return (
                <Option key={category.id}>{category?.name}</Option>
              )
            })
          }
        </Select>
      </div>
        <Button size="sm" variant="outlined">On-Sale</Button>
        <Button size="sm" variant="outlined">In-Stock</Button>
      <div className="mt-3">
        <Typography className="text-gray-500 text-sm font-bold">{products.length} Products</Typography>
      </div>
    </div>
  );
}