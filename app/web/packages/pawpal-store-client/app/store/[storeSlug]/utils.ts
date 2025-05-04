import { GetProductsQueryParam } from "@/@types/product";

export const DEFAULT_CURRENCY = "CAD";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchData = async (path: string, params: any = {}) => {
  const url = process.env.NEXT_PUBLIC_STORES_API_URL;
  const res = await fetch(`${url}/${path}`, params);
  const response = await res.json();
  return response;
}

export const getStore = async (slug: string) => {
  return fetchData(`store/${slug}`);
}

export const getStoreQueryKey = (slug: string): Array<string> => {
  return ['store', slug]
}

export const getProducts = async (slug: string, queryParams: GetProductsQueryParam = {}) => {
  const queryString = new URLSearchParams(queryParams).toString();

  console.log('queryString for getProducts --->', { queryString })
  return fetchData(`store/${slug}/products?${queryString}`);
}

export const getProductQueryKey = (slug: string, extraKeys?: Array<string>): Array<string> => {
  return ['product', slug, ...(extraKeys || [])]
}

export const getProductCategories = async (slug: string) => {
  return fetchData(`store/${slug}/products/categories`);
}

export const getProductCategoriesKey = (slug: string): Array<string> => {
  return ['productCategory', slug]
}

export const getProduct = async (productId: string) => {
  return fetchData(`product/${productId}`)
}

export const createOrder = async (orderData: OrderData) => {
  const params = {
    method: 'POST',
    body: JSON.stringify(orderData)
  }
  return fetchData('/order', params)
}


/**
 * @param items 
 */
export const saveItemsInLocalStorage = (items: Record<string, Array<ProductCheckout>>) => {
  localStorage.setItem("cart", JSON.stringify(items));
}

export const getItemsfromLocalStorage = () => {
  const items = localStorage.getItem('cart');
  if(items) {
    return JSON.parse(items)
  }
  return []
}

