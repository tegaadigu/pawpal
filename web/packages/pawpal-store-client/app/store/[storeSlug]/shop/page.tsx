import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { queryClient } from "@/store/[storeSlug]/query-client";
import { getProductQueryKey, getProducts, getStore, getStoreQueryKey } from "@/store/[storeSlug]/utils";
import { STALE_TIME } from "@/store/constants";
import { ShopContainer } from "@/store/[storeSlug]/shop/components/ShopContainer"
const ShopPage = async ({ params }: { params: { slug: string }}) => {
  const { slug } = params;
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: getStoreQueryKey(slug),
      queryFn: () => getStore(slug),
      staleTime: STALE_TIME,
    }),
    queryClient.prefetchQuery({
      queryKey: getProductQueryKey(slug),
      queryFn: () => getProducts(slug),
      staleTime: STALE_TIME,
    }),
  ])
 

  return (
  <HydrationBoundary state={dehydrate(queryClient)}>
    <ShopContainer />
  </HydrationBoundary>
  )
}

export default ShopPage;