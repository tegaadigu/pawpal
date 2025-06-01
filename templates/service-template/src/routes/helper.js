import { sayHello } from "../handlers/helper/helper.js";
import { logError } from "../utils/logger.js"

/**
 * @param {*} request 
 * @param {*} reply 
 * @returns 
 */
export const hello = async (request, reply) => {
  try {
    const response = await sayHello(request);
    return reply.status(200).send({ response })
  }catch(e) {
    logError(request, e);
    return reply.status(500).send(e.message);
  }
}