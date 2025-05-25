/**
 * @extends Error
 */
export class CustomError extends Error {
  /**
   * @param {string} message 
   * @param {number} statusCode 
   */
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name
    this.statusCode = statusCode || 500
    Error.captureStackTrace(this, this.constructor)
  }
}