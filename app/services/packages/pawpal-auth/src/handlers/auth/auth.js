import { logError } from "../../utils/logger.js";
import utils from "./util.js"

export const performLogin = async (request) => {
  try {
    const { handleLogin } = await utils(request);
    const resp = handleLogin();
    return resp;
  }catch (e) {
    logError(request, e);
    throw e;
  }
}