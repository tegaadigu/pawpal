import { logError } from "../../utils/logger.js";
const utils = (request) => {
  const { body, db} = request;

  const isPhoneNumberOnly = () => {
    return (body?.phoneNumber && !body?.email)
  }

  const isEmailAndPassword = (params) => {
    return true;
  }

  const getUserWithPhoneNumber = async (phoneNumber) => {
    const query = {
      text: "Select phone_number from public.users where phone_number = $1",
      values: [phoneNumber]
    }
    const client = await db.connect();
    const resp = await client.query(query);
    return resp?.rows || [];
  }

  const generateRandomPassword = async () => {

  };

  const saveUser = async (params) => {
    const { phoneNumber } = body;

  }

  const registerUserWithPhoneNumber = async () => {
    try{
    const existingUser = getUserWithPhoneNumber(body?.phoneNumber);
    if(!existingUser.length) {
      const password = await generateRandomPassword();
      const user = await saveUser();
      return user;
    }
    return null;
  }catch(e) {
    logError(request, e)
  }
  }

  const registerEmailAndPassword = async (params) => {
    return {
      name: "Tega"
    }
  }

  return {
    isPhoneNumberOnly,
    isEmailAndPassword,
    getUserWithPhoneNumber,
    registerEmailAndPassword,
    registerUserWithPhoneNumber
  }
}

export default utils;