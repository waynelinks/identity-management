import { checkCommonErrors } from '../utils'

export class CustomError extends Error {
  public readonly errorType: string | null;

  public readonly httpCode: number;

  public readonly isOperational: boolean;

  constructor(httpCode: number, public description: string) {
    super(description)

    Object.setPrototypeOf(this, new.target.prototype);

    this.errorType = checkCommonErrors(httpCode);
    this.httpCode = httpCode;
    this.isOperational = true;

    Error.captureStackTrace(this);
  }

  serializeErrors(): Record<string, unknown>[] {
    return [{
      success: false,
      error_code: this.httpCode,
      type: this.errorType,
      message: this.description,
    }]
  }
}