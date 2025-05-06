'use client';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getStore, getStoreQueryKey } from '@/store/[storeSlug]/utils';
import { REACT_QUERY_DEFAULT_PROPS } from '@/store/constants';
import { Store } from '@/@types/store';


type StoreResponse = {
  store: Store
}
export const useStore = (slug: string): UseQueryResult<StoreResponse> => {
  return useQuery<StoreResponse, Error>({
    queryKey: getStoreQueryKey(slug),
    queryFn: () => getStore(slug),
    ...REACT_QUERY_DEFAULT_PROPS
  })
}