import { getProductsByStoreSlug, getProductCategoriesByStoreSlug, getProductById } from "../handlers/products/product.js";
import { createNewProduct } from "../handlers/products/product.js";
import { logError } from "../utils/logger.js"

export const createProduct = async (request, reply) => {
  try {
    const product = await createNewProduct(request);
    return reply.status(200).send({ product })
  }catch(e) {
    logError(request, e);
    return reply.status(500).send(e.message);
  }
}

export const getProducts = async (request, reply) => {
  try {
    const products = await getProductsByStoreSlug(request);
    return reply.status(200).send({ products })
  }catch(e) {
    logError(request, e);
    return reply.status(500).send(e.message);
  }
}

export const getProductCategories = async (request, reply) => {
  try {
  const productCategories = await getProductCategoriesByStoreSlug(request);
  return reply.status(200).send({ productCategories });
  }catch(e) {
    logError(request, e);
    return reply.status(500).send(e.message);
  }
}


export const getProduct = async (request, reply) => {
  try {
    const product = await getProductById(request);
    return reply.status(200).send({ product })
  }catch(e) {
    logError(request, e);
    return reply.status(500).send(e.message);
  }
}