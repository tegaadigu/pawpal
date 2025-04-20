import { createHandlerUtil } from "@pawpal-service/shared"
import { StoresDao } from "../../dao/stores.dao.js";

/**
 * @param {import("Fastify").FastifyRequest} request
 * @returns {Promise<Object>}
 */
export const createNewStore = async (request) => {
  try {
    const storeDAO = new StoresDao(request.pgClient);
    let { name, description, slug, is_active, owner_id } = request.body;
    if(!slug) {
      // @todo - this will be an entire service that is used to generate unique slugs and prevent duplications for when we partition dbs 
      slug = await storeDAO.generateSlug(name); 
    }
    const store = await storeDAO.createStore({
      name,
      description,
      slug,
      is_active,
      owner_id
    })
    return store;
  }catch(e) {
    throw e;
  }
}

/**
 * @param {import("Fastify").FastifyRequest} request
 * @returns {Promise<Object>}
 */
export const getStoreBySlug = async (request) => {
  try {
  const storeDAO = new StoresDao(request.pgClient);
  let { slug } = request.params;
  const store = await storeDAO.getStoreBySlug(slug);
  return store;
  }catch (e) {
    throw e
  }
}

/**
 * @param {import("Fastify").FastifyRequest} request
 * @returns {Promise<Object>}
 */
export const getAllStores = async (request) => {
  try {
    const storeDAO = new StoresDao(request.pgClient);
    const stores = await storeDAO.getAllStores();
    return stores;
    }catch (e) {
      throw e
    }
}