'use client';

import { useParams } from "next/navigation";
import Layout from "./Layout/Layout";
import { useProducts } from "@/store/[storeSlug]/hooks/use-products";
import ProductCard from "./ProductCard";

export const ShopContainer = () => {
  const { slug = '' } = useParams();
  const { data } = useProducts(slug as string);
  const  { products = [] } = data || {};
  return (
    <Layout>
      <div className="">
        <span className="font-crimson text-2xl">Best Sellers</span>
        <span className="text-xs text-gray-700 block">{products.length} products</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-16">
        {
          products.map(product => {
            return (<ProductCard key={product.id} product={product} />)
          })
        }
      </div>
    </Layout>
  )
}