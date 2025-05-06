import { createNewStore, getStoreBySlug, getAllStores } from "../handlers/stores/stores.js";
import { logError } from "../utils/logger.js"

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 * 
 * @returns {Promise<Array<Object>>}
 */
export const createStore = async (request, reply) => {
  try {
    const store = await createNewStore(request);
    return reply.status(200).send({ store })
  }catch(e) {
    logError(request, e);
    return reply.status(500).send(e.message);
  }
}

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 * 
 * @returns {Promise<Array<Object>>}
 */
export const getStore = async (request, reply) => {
  try {
    const store = await getStoreBySlug(request);
    return reply.status(200).send({ store })
  }catch(e) {
    logError(request, e);
    return reply.status(500).send(e.message);
  }
}

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 * 
 * @returns {Promise<Array<Object>>}
 */
export const getStores = async (request, reply) => {
  try {
    const stores = await getAllStores(request);
    return reply.status(200).send({ stores })
  }catch(e) {
    logError(request, e)
    return reply.status(500).send(e.message)
  }
}