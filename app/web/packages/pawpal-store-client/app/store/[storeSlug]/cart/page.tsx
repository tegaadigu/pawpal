import { CartContainer } from "./components/CartContainer"
import { queryClient } from "@/store/[storeSlug]/query-client";
import { getProductCategories, getProductCategoriesKey, getProductQueryKey, getProducts, getStore, getStoreQueryKey } from "@/store/[storeSlug]/utils";
import { STALE_TIME } from "@/store/constants";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const CartPage = async ({ params }: { params: { storeSlug: string } }) => {
  const { storeSlug } = params;
  await queryClient.prefetchQuery({
    queryKey: getStoreQueryKey(storeSlug),
    queryFn: () => getStore(storeSlug),
    staleTime: STALE_TIME,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CartContainer />
    </HydrationBoundary>
  )
}

export default CartPage;