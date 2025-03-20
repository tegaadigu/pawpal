'use client';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getProductCategoriesKey, getProductCategories } from '@/store/[storeSlug]/utils';
import { REACT_QUERY_DEFAULT_PROPS } from '@/store/constants';
import { ProductCategory } from '@/@types/product';

export const useCategories = (slug: string) : UseQueryResult<{ productCategories: Array<ProductCategory>}> => {
  return useQuery({
    queryKey: getProductCategoriesKey(slug),
    queryFn: () => getProductCategories(slug),
    ...REACT_QUERY_DEFAULT_PROPS
  })
}