import { createHandlerUtil } from "@pawpal-service/shared";
import UserDao from "../../dao/users.dao.js";

const utils = async (request) => {
  const { dbClient } = await createHandlerUtil(request);
  const { body } = request;
  const userDao = new UserDao(dbClient);

  const loginWithPhone = async () => {
    const { phoneNumber } = body;
    const user = await userDao.getUserByPhoneNumber(phoneNumber);
    if (!user) {
      throw new Error("user with phone number does not exist")
    }

    console.log('user returned!!!', { user: user })

  }

  const handleLogin = async () => {
    if (body?.phoneNumber && !body?.email) {
      loginWithPhone()
    }
  }

  return {
    handleLogin
  }
}

export default utils;