import { OrdersDao } from "../../dao/orders.dao.js"
import { getOrCreateUser, getStore } from "./utils.js";

/**
 * @param {*} request 
 */
export const createNewOrder = async (request) => {
  try {
    const { pgClient } = request;
    const { email, phone_number, store_slug } = request.body
    const hasUserData = email || phone_number;
    console.log('hasUserData and them --->', { hasUserData })
    const user = hasUserData ? await getOrCreateUser({email, phone_number}) : null
    const store = await getStore(store_slug);
    const orderDao = new OrdersDao(pgClient)
    const order = await orderDao.createOrder(user, store, request.body);

    console.log('order to return from createNewOrder -->', { order })
    if(order) {
      const orderProduct = await orderDao.createOrderProduct(order, request.body)
      console.log('order product to return --->', orderProduct)
      return orderProduct;
    }
    return order;
  }catch(e) {
    throw e;
  }
}