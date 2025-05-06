import { logError } from "../../utils/logger.js";
import utils from "./util.js";


export const createUser = async (request) => {
  const { handleRegisterUser } = await utils(request)
  const user = await handleRegisterUser();
  return user;
}