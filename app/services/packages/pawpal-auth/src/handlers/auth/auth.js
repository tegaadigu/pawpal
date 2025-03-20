import { logError } from "../../utils/logger.js";
import utils from "./util.js"

export const performLogin = async (request) => {
  const { handleLogin } = await utils(request);
  try {
    const resp = await handleLogin();
    return resp;
  }catch (e) {
    logError(request, e);
    throw e;
  }
}