import { HttpStatusCode } from '../utils'

export class CustomError extends Error {
  public readonly errorType: string;

  public readonly httpCode: HttpStatusCode;

  public readonly isOperational: boolean;

  constructor(errorType: string, httpCode: HttpStatusCode, isOperational = false, description: string) {
    super(description)

    Object.setPrototypeOf(this, new.target.prototype);

    this.errorType = errorType;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}