import { createHandlerUtil } from "@pawpal-service/shared"
import { StoresDao } from "../../dao/stores.dao.js";

export const createNewStore = async (request) => {
  try {
    const { dbClient } = await createHandlerUtil(request);
    const storeDAO = new StoresDao(dbClient);
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


export const getStoreBySlug = async (request) => {
  try {
  const { dbClient } = await createHandlerUtil(request);
  const storeDAO = new StoresDao(dbClient);
  let { slug } = request.params;
  const store = await storeDAO.getStoreBySlug(slug);
  return store;
  }catch (e) {
    throw e
  }
}