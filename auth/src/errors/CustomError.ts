import { HttpStatusCode } from '../utils'
import { CommonErrors } from '../utils/CommonErrors'

export class CustomError extends Error {
  public readonly errorType: CommonErrors;

  public readonly httpCode: HttpStatusCode;

  public readonly isOperational: boolean;

  constructor(errorType: CommonErrors, httpCode: HttpStatusCode, isOperational = false, description: string) {
    super(description)

    Object.setPrototypeOf(this, new.target.prototype);

    this.errorType = errorType;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}