/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HttpStatusCode } from '../enums'

export class AppError extends Error {
  public readonly success: boolean = false

  public readonly httpCode: HttpStatusCode;

  public readonly isOperational: boolean;

  constructor(name: string, httpCode: HttpStatusCode, description: string, isOperational: boolean) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }

  serializeErrors() {
    return {
      success: this.success,
      errorCode: this.httpCode,
      type: this.name,
      message: this.message,
    }
  }
}