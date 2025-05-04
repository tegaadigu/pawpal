import { createNewOrder } from "../handlers/orders/orders.js";
import { logError } from "../utils/logger.js"

export const createOrder = async (request, reply) => {
  try {
    const order = await createNewOrder(request);
    console.log('order being returned main main.... --->', { order })
    return reply.status(200).send({ order })
  }catch(e) {
    console.log('error happening ----->', e)
    logError(request, e);
    return reply.status(500).send(e.message);
  }
}

export const getOrders = async (request, reply) => {
  try {
    const products = [] //await getProductsByStoreSlug(request);
    return reply.status(200).send({ products })
  }catch(e) {
    logError(request, e);
    return reply.status(500).send(e.message);
  }
}