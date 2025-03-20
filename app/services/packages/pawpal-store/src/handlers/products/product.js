import { createHandlerUtil } from "@pawpal-service/shared"
import { ProductsDao } from "../../dao/products.dao.js";
import StoresDao from "../../dao/stores.dao.js";

export const createNewProduct = async (request) => {
  try {
    const { pgClient } = request;
    const productDao = new ProductsDao(pgClient);
    const storeDao = new StoresDao(pgClient);
    const { slug } = request.params;
    if (!slug) {
      throw Error('Slug is required');
    }
    const store = await storeDao.getStoreBySlug(slug);
    if (!store) {
      throw Error('Invalid slug - store does not exist.')
    }

    let { name, description, is_active, owner_id, price, store_location_id } = request.body;
    const product = await productDao.createProduct({
      name,
      description,
      is_active,
      owner_id,
      price,
      store,
      store_location_id
    })

    dbClient.release();
    return product;
  } catch (e) {
    throw e;
  }
}


export const getProductsByStoreSlug = async (request) => {
  try {
    const { pgClient } = request;
    const storeDAO = new StoresDao(pgClient);
    const { slug } = request.params;
    const { cursor, limit = 10, sortField, sortOrder } = request.query;
    const store = await storeDAO.getStoreBySlug(slug);
    const productDao = new ProductsDao(pgClient);
    const products = productDao.getProductsByStore(store, {
      cursor,
      limit,
      sortField,
      sortOrder
    });

    return products;
  } catch (e) {
    throw e
  }
}

export const getProductCategoriesByStoreSlug = async (request) => {
  try {
    const { pgClient } = request;
    const storeDAO = new StoresDao(pgClient);
    const { slug } = request.params;
    const { cursor, limit = 10 } = request.query;
    const store = await storeDAO.getStoreBySlug(slug);
    const productDao = new ProductsDao(pgClient);
    const productCategories = productDao.getProductCategories(store, cursor, limit);
    console.log('store found -->', store)
    console.log('productCategories', productCategories);

    return productCategories;
  } catch (e) {
    throw e;
  }
}

export const getProductById = async (request) => {
  try {
    const { pgClient } = request;
    const { productId } = request.params;
    const productDao = new ProductsDao(pgClient);
    const product = productDao.getProduct(productId);

    console.log('product by Id --->', product)
    return product;
  } catch (e) {
    throw e
  }
}