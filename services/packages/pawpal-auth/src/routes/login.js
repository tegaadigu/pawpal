import { UserNotFoundError } from "@pawpal-service/shared";
import { performLogin } from "../handlers/auth/auth.js";
import { logError } from "../utils/logger.js"

export const getLogin = async (request, reply) => {
  return reply.status(200).send({ message: "hello Welcome to pawpal!"})
}

export const login = async (request, reply) => {
  try {
      const response = await performLogin(request);
      return reply.status(200).send({ message: 'success', ...response });
  }catch(e) {
    logError(request, e);
    if(e instanceof UserNotFoundError) {
      reply.status(e.statusCode).send({message: e.message })
    }
    reply.status(500).send({ message: e.message })
  }
}
