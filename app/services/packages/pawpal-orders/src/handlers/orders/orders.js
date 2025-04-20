import { OrdersDao } from "../../dao/orders.dao.js"
import { getOrCreateUser, getStore } from "./utils.js";

/**
 * @param {*} request 
 */
export const createNewOrder = async (request) => {
  try {
    const { pgClient } = request;
    const { email, phone_number, store_slug } = request.body
    const user = await getOrCreateUser({email, phone_number})
    const store = await getStore(store_slug);
    const orderDao = new OrdersDao(pgClient)
    const order = await orderDao.createOrder(user, store, request.body);
    if(order) {
      orderDao.createOrderProduct(order, store, request.body)
    }
    return order;
  }catch(e) {
    throw e;
  }
}