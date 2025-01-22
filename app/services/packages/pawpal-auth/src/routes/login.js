import { performLogin } from "../handlers/auth/auth.js";
import { logError } from "../utils/logger.js"

export const getLogin = async (request, reply) => {
  return reply.status(200).send({ message: "hello Welcome to pawpal!"})
}

export const login = async (request, reply) => {
  try {
      const response = performLogin(request);
      return reply.status(200).send({ message: 'success', ...response });
  }catch(e) {
    logError(request, e);
    reply.status(500).send({ message: e.message })
  }
}
