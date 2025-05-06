import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { queryClient } from "@/store/[storeSlug]/query-client";
import { ProductDetailPageContainer } from "./components/ProductDetailPageContainer";
import { getProductQueryKey, getProduct, getStore, getStoreQueryKey } from "@/store/[storeSlug]/utils";
import { STALE_TIME } from "@/store/constants";

  
  const ProductDetailPage = async ({ params }: { params: { storeSlug: string, productSlug: string }}  ) => {
 const { storeSlug: slug, productSlug: productId } = params;
 if (slug && productId) {
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: getStoreQueryKey(slug),
      queryFn: () => getStore(slug),
      staleTime: STALE_TIME,
    }),
    queryClient.prefetchQuery({
      queryKey: getProductQueryKey(productId),
      queryFn: () => getProduct(productId),
      staleTime: STALE_TIME,
    }),
  ])
}

  return (
    <>
    <HydrationBoundary state={dehydrate(queryClient)}>
     <ProductDetailPageContainer />
    </HydrationBoundary>
    </>
  )
}

export default ProductDetailPage;