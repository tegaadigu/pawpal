import config from "../../utils/configs.js";
import { fetch, fetchJSON } from "@pawpal-service/shared"

/**
 * 
 * @param {Object} params 
 * @returns {Promise<Object>}
 */
export const getOrCreateUser = async (params) => {
  const { email, phone_number } = params;   
  let { user } = await getUserByEmailOrPhoneNumber({ email, phone_number });
  // if (!user) {
  //   user = await createUser(params);
  // }

  console.log('user user to be created...', user);
  return user;
}

/**
 * 
 * @param {Object} params 
 */
const createUser = async (params) => {
  const { email, phone_number, first_name, last_name, address, city, state, postal_code } = params;
  const { user } = await fetchJSON(`${config.AUTH_ENDPOINT}/api/v1/register`, {
    method: "POST",
    body: { email, phone_number, password: ''}
  });
  if(!user) {
    return null;
  }
  const userAccount = await fetch(`${config.AUTH_ENDPOINT}/api/v1/account`, {
     
  })
}

/**
 * 
 * @param {Object} params
 * @params {string} [params.email]
 * @params {string} [params.phone_number] 
 * @returns {Promise<Object>}
 * @throws {Error}
 */
const getUserByEmailOrPhoneNumber = async ({ email, phone_number }) => {
  try {
    const path = `${config.AUTH_ENDPOINT}/api/v1/user`;
    console.log('path and everything in between -->', { path, body: JSON.stringify({ email, phone_number }) })
    // @todo introduce cache layer to reduce api call
    const response = await fetchJSON(path, {
      method: "POST",
      body: { email, phone_number }
    })
    return response;
  } catch (e) {
    console.log('error happend -->', e);
    throw e;
  }
}

/**
 * 
 * @param {string} store_slug 
 * @returns {Promise<Object>}
 */
export const getStore = async (store_slug) => {
  try {
    if (!store_slug) {
      throw Error('Store slug is required.');
    }
    const { store } = await fetchJSON(`${config.STORE_ENDPOINT}/api/v1/store/${store_slug}`);
    return store;
  } catch (e) {
    throw e;
  }
}