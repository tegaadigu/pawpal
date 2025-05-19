import { createHandlerUtil, smsHandler } from "@pawpal-service/shared";
import UserDao from "../../dao/users.dao.js";

const utils = async (request) => {
  const { dbClient } = await createHandlerUtil(request);
  const { body } = request;
  const userDao = new UserDao(dbClient);
  // const sms = smsHandler();

  const generateLoginCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
  }

  const loginWithPhone = async () => {
    const { phoneNumber } = body;
    const user = await userDao.getUserByPhoneNumber(phoneNumber);
    if (!user) {
      throw new Error("user with phone number does not exist");
    }
    const loginCode = await generateLoginCode();
    // console.log('loginCode -->', { loginCode });
    // await sendUserSms();

  }

  const handleLogin = async () => {
    if (body?.phoneNumber && !body?.email) {
      await loginWithPhone()
    }
  }

  return {
    handleLogin
  }
}

export default utils;