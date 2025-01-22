import { createHandlerUtil } from "@pawpal-service/shared";
import UserDao from "../../dao/users.dao.js";

const REGISTRATION_TYPE = {
  EMAIL:'email',
  PHONE:'phone'
}

const utils = async (request) => {
  const { dbClient } = await createHandlerUtil(request);
  const { body } = request;
  const userDao = new UserDao(dbClient);

  const registerUserWithPhoneNumber = async () => {
    const existingUser = await userDao.getUserByPhoneNumber(body?.phoneNumber);
    if (!existingUser.length) {
      const user = await userDao.saveUser({
        phone_number: body?.phoneNumber
      });
      return user;
    }
    throw new Error('Phone number already registered! try logging in with it.')
  }

  const registerEmailAndPassword = async () => {
    const existingUser = await userDao.getUerByEmail(body?.email);
    if (!existingUser.length) {
      const user = await userDao.saveUser({
        email: body?.email,
        phone_number: body?.phoneNumber,
        password: body?.password
      });
      return user;
    }
    throw new Error('Email address has already been registered!')
  }

  const validateRegistrationType = () => {
    if (!body) {
      throw new Error("Error body not found in request..")
    }

    if(body?.phoneNumber && !body?.email) {
      return REGISTRATION_TYPE.PHONE
    }

    if(body?.email && body?.password) {
      return REGISTRATION_TYPE.EMAIL
    }

    throw new Error("Invalid registration data.")
  }

  const handleRegistrationByType = async (type) => {
    switch(type) {
      case REGISTRATION_TYPE.PHONE:
        return await registerUserWithPhoneNumber();
      case REGISTRATION_TYPE.EMAIL:
        return await registerEmailAndPassword();
      default: 
        throw new Error('Unsupported registration.')
    }
  }

  const handleRegisterUser = async () => {
    const registrationType = validateRegistrationType()
    const user = await handleRegistrationByType(registrationType);
    return user;
  }

  return {
    handleRegisterUser
  }
}

export default utils;