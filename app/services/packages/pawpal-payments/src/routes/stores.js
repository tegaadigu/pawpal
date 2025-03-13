import { createNewStore, getStoreBySlug } from "../handlers/stores/stores.js";
import { logError } from "../utils/logger.js"

export const createStore = async (request, reply) => {
  try {
    const store = await createNewStore(request);
    return reply.status(200).send({ store })
  }catch(e) {
    logError(request, e);
    return reply.status(500).send(e.message);
  }
}

export const getStore = async (request, reply) => {
  try {
    const store = await getStoreBySlug(request);
    console.log('store to return -->0', store)
    return reply.status(200).send({ store })
  }catch(e) {
    logError(request, e);
    return reply.status(500).send(e.message);
  }
}