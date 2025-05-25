import { CustomError } from "./custom-error.js";

/**
 * @extends CustomError
 */
export class UserNotFoundError extends CustomError {
  constructor(message = "User not found") {
    super(message, 404)
  }
}

export class InvalidCredentialError extends CustomError {
  constructor(message = "Invalid Credentials") {
    super(message, 401)
  }
}