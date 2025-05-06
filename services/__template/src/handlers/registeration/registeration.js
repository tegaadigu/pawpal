import { logError } from "../../utils/logger.js";
import utils from "./util.js";


export const createUser = async (request) => {
  const { body } = request;
  const {isPhoneNumberOnly, registerEmailAndPassword, registerUserWithPhoneNumber } = utils(request)
  let user = null;
  try {
    if (isPhoneNumberOnly(body)) {
      user = await registerUserWithPhoneNumber(request);
    }
    else if (isEmailAndPassword(body)) {
      user = await registerEmailAndPassword(request)
    }
    return {
      user
    }
  } catch (e) {
    logError(request, e);
    throw e;
  }
}