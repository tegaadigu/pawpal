'use client';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getProducts, getProductQueryKey } from '@/store/[storeSlug]/utils';
import { REACT_QUERY_DEFAULT_PROPS } from '@/store/constants';
import { GetProductsQueryParam, Product } from '@/@types/product';
import { apiClient } from '../api-client';

export const getProductParams = (options: GetProductsQueryParam = {}): GetProductsQueryParam => {
  const constructedOptions: GetProductsQueryParam = {};
  Object.keys(options).forEach(key => {
    if(options[key as keyof GetProductsQueryParam]) {
      constructedOptions[key as keyof GetProductsQueryParam] = options[key as keyof GetProductsQueryParam];
    }
  })
  return constructedOptions;
}

export const useProducts = (slug: string, queryParam: GetProductsQueryParam = {}) : UseQueryResult<{ products: Array<Product>}> => {
  const queryParams = getProductParams(queryParam);
  return useQuery({
    queryKey: getProductQueryKey(slug, Object.values(queryParams || {})),
    queryFn: () => getProducts(slug, queryParam),
    ...REACT_QUERY_DEFAULT_PROPS
  })
}

export const useProduct = (productId: string) : UseQueryResult<{ product: Product}> => {
  return useQuery({
    queryKey: getProductQueryKey(productId),
    queryFn: () => apiClient.store.getProduct(productId, {}),
    ...REACT_QUERY_DEFAULT_PROPS
  })
}