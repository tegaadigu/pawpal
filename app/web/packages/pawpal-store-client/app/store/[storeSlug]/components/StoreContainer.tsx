'use client';
import { useStore } from "@/store/[storeSlug]/hooks/use-store"
import { useParams, notFound } from 'next/navigation';
import { Header } from "../../../Header";
import { StoreHeader } from "./StoreHeader";
import { ProductGrid } from "./ProductGrid";
import { SortByProvider } from "@/store/[storeSlug]/components/ProductFilters/hooks/use-sortby";
import { CheckoutProvider } from "@/store/[storeSlug]/hooks/use-checkout";

export const StoreContainer = (): React.ReactElement => {
  const { storeSlug: slug = '' } = useParams();
  const { data = {} } = useStore(slug as string);
  const { store, isLoading, error, isError } = data;

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