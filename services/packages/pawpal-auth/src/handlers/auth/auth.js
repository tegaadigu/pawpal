import UserDao from "../../dao/users.dao.js";
import { logError } from "../../utils/logger.js";
import utils from "./util.js"
import { PUB_SUB_TOPICS } from "@pawpal-service/shared"

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

  console.log('user login with email --->', user)

  if(!user) {
    throw new UserNotFoundError()
  }

  if(user) {
    // Push otp job to pub sub
    await pubSubProducer.send({
      topic: PUB_SUB_TOPICS.OTP_EVENTS.topic,
      type: PUB_SUB_TOPICS.OTP_EVENTS.TYPES.LOGIN,
      messages: [{
        value: JSON.stringify({ 
          data: {
            user: {
              email: user.email, 
              id: user.id, 
              name: user?.account?.first_name || '',
            }
          },
          type: PUB_SUB_TOPICS.OTP_EVENTS.TYPES.LOGIN,
         })
      }]
    })
  }
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