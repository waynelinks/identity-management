export abstract class CustomError extends Error {
  abstract errorType: string

  abstract httpCode: number

  isOperational = true

  constructor(message: string) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)

    Error.captureStackTrace(this)
  }

  abstract serializeErrors(): {
    success: boolean
    errorCode: string
    type: string
    message: string
  }
}
