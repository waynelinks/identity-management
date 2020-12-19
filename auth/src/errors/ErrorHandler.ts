/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import { logger } from '../utils'
import { AppError } from './AppError'

class ErrorHandler {
  public async handleError(err: Error): Promise<void> {
    logger.error(
      'Something went wrong. Error message from the centralized error-handling component',
      err,
    );
    // await sendMailToAdminIfCritical();
    // await sendEventsToSentry();
  }

  public determineIfOperationalError(error: Error) {
    if (error instanceof AppError) {
      return error;
    }
  }
}
export const errorHandler = new ErrorHandler();
