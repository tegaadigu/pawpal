'use client';
import { useStore } from "@/store/[storeSlug]/hooks/use-store"
import { useParams, notFound } from 'next/navigation';
import { StoreHeader } from "./StoreHeader";
import { ProductGrid } from "./ProductGrid";
import { SortByProvider } from "@/store/[storeSlug]/components/ProductFilters/hooks/use-sortby";

export const StoreContainer = (): React.ReactElement => {
  const { storeSlug: slug = '' } = useParams();
  const { store } = useStore(slug as string)?.data || {};

  if (!store) {
    notFound();
  }
  return (
    <SortByProvider>
      <div className="container mx-auto">
        <main className="flex mx-auto max-w-pageWidth">
          <StoreHeader />
        </main>
        <ProductGrid />
      </div>
    </SortByProvider>
  )
}