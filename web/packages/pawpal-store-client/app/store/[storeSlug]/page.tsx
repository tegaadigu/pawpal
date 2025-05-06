import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { StoreContainer } from "@/store/[storeSlug]/components/StoreContainer";
import { queryClient } from "@/store/[storeSlug]/query-client";
import { getProductCategories, getProductCategoriesKey, getProductQueryKey, getProducts, getStore, getStoreQueryKey } from "@/store/[storeSlug]/utils";
import { STALE_TIME } from "@/store/constants";

const storePage = async ({ params }: { params: { storeSlug: string }}) => {
  const { storeSlug: slug } = params;
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
    queryClient.prefetchQuery({
      queryKey: getProductCategoriesKey(slug),
      queryFn: () => getProductCategories(slug),
      staleTime: STALE_TIME,
    }),
  ])

  return (
  <HydrationBoundary state={dehydrate(queryClient)}>
    <StoreContainer />
  </HydrationBoundary>
  )
}

export default storePage;