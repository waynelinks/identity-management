/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CommonErrors, HttpStatusCode } from '../enums'
import { CustomError } from './CustomError'

export class UnAuthorized extends CustomError {
  isOperational = true

  errorType = CommonErrors.UNAUTHORIZED

  httpCode = HttpStatusCode.UNAUTHORIZED

  success = false

  constructor(message: string) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)

    Error.captureStackTrace(this)
  }

  serializeErrors() {
    return {
      success: this.success,
      errorCode: this.httpCode,
      type: this.errorType,
      message: this.message,
    }
  }
}