import { createUser } from "../handlers/registeration/registeration.js";
import { logError } from "../utils/logger.js";

export const registerUser = async (request, reply) => {
  try {
    const response = await createUser(request)
    return reply.status(200).send({ message: "Success", ...response})
  }catch(e) {
    logError(request, e);
    return reply.status(500).send({ message: "Error!"})
  }

}
