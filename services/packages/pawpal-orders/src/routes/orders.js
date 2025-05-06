import { createNewOrder } from "../handlers/orders/orders.js";
import { logError } from "../utils/logger.js"

/**
 * @param {*} request 
 * @param {*} reply 
 * @returns 
 */
export const createOrder = async (request, reply) => {
  try {
    const order = await createNewOrder(request);
    return reply.status(200).send({ order })
  }catch(e) {
    logError(request, e);
    return reply.status(500).send(e.message);
  }
}

/**
 * @param {*} request 
 * @param {*} reply 
 * @returns 
 */
export const getOrder = async (request, reply) => {
  try {
    const products = [] //await getProductsByStoreSlug(request);
    return reply.status(200).send({ products })
  }catch(e) {
    logError(request, e);
    return reply.status(500).send(e.message);
  }
}