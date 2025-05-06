import { getUserByEmailOrPhoneNumber } from "../handlers/user/user.js";
import { logError } from "../utils/logger.js"

export const getUser = async (request, reply) => {
  try {
    const user = await getUserByEmailOrPhoneNumber(request);
    return reply.status(200).send({ user })
  }catch(e) {
    logError(request, e);
    return reply.status(500).send({ message: e.message })
  }
}