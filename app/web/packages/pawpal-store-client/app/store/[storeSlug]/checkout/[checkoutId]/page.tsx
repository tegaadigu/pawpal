import { queryClient } from "@/store/[storeSlug]/query-client";
import { getStore, getStoreQueryKey } from "@/store/[storeSlug]/utils";
import { STALE_TIME } from "@/store/constants";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { CheckoutContainer } from "./components/checkout-container";

const CheckoutPage = async ({ params }: { params: { storeSlug: string, checkoutId: string } }) => {
  const { storeSlug } = params;
  await queryClient.prefetchQuery({
    queryKey: getStoreQueryKey(storeSlug),
    queryFn: () => getStore(storeSlug),
    staleTime: STALE_TIME,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CheckoutContainer />
    </HydrationBoundary>
  )
}

export default CheckoutPage;