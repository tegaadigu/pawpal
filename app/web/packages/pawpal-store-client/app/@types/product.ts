export type ProductImage = {
  id: string;
  path: string;
  product_id: string;
}

export type ProductCategory = {
  id: string,
  name: string,
  description: string,
  meta_data: object,
}


export type ProductIngredients = {
  id: string,
  name: string,
  description: string,
  meta_data: object
}

export type ProductPriceMetaData = {
  is_default: boolean,
  size: string
}

export type ProductPrice = {
  id: string,
  price: number,
  meta_data: ProductPriceMetaData,
  currency_code: string,
}

export type Product = {
  id: string,
  name: string,
  price: number,
  description: string,
  category: ProductCategory,
  images: Array<ProductImage>
  ingredients: Array<ProductIngredients>
  meta_data: object,
  prices: Array<ProductPrice>
}

export type GetProductsQueryParam =  { 
  sortField?: string, 
  sortOrder?: string,
  cursor?: string 
} 
