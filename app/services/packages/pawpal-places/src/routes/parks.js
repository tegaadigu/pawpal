import { createPark } from "../handlers/parks/parks.js"
import { logError } from "../utils/logger.js"

export const getParks = async (request, reply) => {
  return reply.status(200).send({ message: "hello Welcome to pawpal!"})
}


export const createParks = async (request, reply) => {
  try {
  const park = await createPark(request)
  return reply.status(200).send({ message: "Success!", park })
  }catch(e) {
    logError(request, e);
    return reply.status(500).send({ message: e.message})
  }
}