import UserDao from "../../dao/users.dao.js";

export const getUserByEmailOrPhoneNumber = async (request) => {
  try {
    const { pgClient } = request;
    const { phone_number, email } = request.body;
    console.log('phone number and email --->', { phone_number, email })
    const userDao = new UserDao(pgClient)
    if (phone_number) {
      return await userDao.getUserByPhoneNumber(phone_number)
    }
    return await userDao.getUserByEmail(email);
  } catch (e) {
    throw e;
  }
}