'use client';
import { useQuery } from '@tanstack/react-query';
import { getStore, getStoreQueryKey } from '@/store/[storeSlug]/utils';
import { REACT_QUERY_DEFAULT_PROPS } from '@/store/constants';

export const useStore = (slug: string) => {
  return useQuery({
    queryKey: getStoreQueryKey(slug),
    queryFn: () => getStore(slug),
    ...REACT_QUERY_DEFAULT_PROPS
  })
}