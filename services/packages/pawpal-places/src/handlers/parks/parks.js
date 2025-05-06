import { logError } from "../../utils/logger.js";
import { util } from "./utils.js";

export const createPark = async(request) => {
  try {
  const parkUtil = await util(request);
  if(await parkUtil.parkExists()) {
    throw new Error('There is a park already registered with this name and location')
  }
  const park = await parkUtil.storePark();
  return park;
  }catch(e) {
    logError(request, e);
    throw e;
  }
}