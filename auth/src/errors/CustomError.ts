export abstract class CustomError extends Error {
  abstract errorType: string

  abstract httpCode: number

  abstract success: boolean

  abstract isOperational: boolean

  constructor(message: string) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)

    Error.captureStackTrace(this)
  }

  abstract serializeErrors(): {
    success: boolean
    errorCode: number
    type: string
    message: string
  }
}
