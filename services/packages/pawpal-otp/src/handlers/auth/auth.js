import UserDao from "../../dao/users.dao.js";
import { logError } from "../../utils/logger.js";
import utils from "./util.js"
import { UserNotFoundError } from "@pawpal-service/shared"

const loginWithPhone = async (phoneNumber, userDao) => {
  const user = await userDao.getUserByPhoneNumber(phoneNumber);
  if (!user) {
    throw new Error("user with phone number does not exist");
  }
  const loginCode = await generateLoginCode();
  // console.log('loginCode -->', { loginCode });
  // await sendUserSms();

}

/**
 * @param {string} email 
 * @param {UserDao} userDao 
 */
const loginWithEmail = async (email, userDao, pubSubProducer) => {
  const user = await userDao.getUserByEmail(email);

  if(!user) {
    throw new UserNotFoundError()
  }

  if(user) {
    await pubSubProducer.send({
      topic: "send-otp-email",
      messages: [{
        value: JSON.stringify({ email: user.email, id: user.id, name: user?.account?.first_name || ''  })
      }]
    })
  }
  console.log('user derived -->', user, pubSubProducer)
}

export const performLogin = async (request) => {
  const { body, pgClient, pubSubProducer } = request

  const userDao = new UserDao(pgClient);
  try {
    if (body?.phoneNumber && !body?.email) {
      return loginWithPhone(body.phoneNumber, userDao)
    }
    else if(body?.email && !body?.phoneNumber) {
      return loginWithEmail(body.email, userDao, pubSubProducer)
    }
    throw new Error('Invalid login type.')
  }catch (e) {
    logError(request, e);
    throw e;
  }
}