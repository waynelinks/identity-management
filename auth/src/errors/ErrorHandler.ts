import { logger } from '../utils'
import { CustomError } from './CustomError'

class ErrorHandler {
  static async handleError(err: Error): Promise<void> {
    await logger.error(
      'Error message from the centralized error-handling component',
      err,
    )
    // await sendMailToAdminIfCritical();
    // await saveInOpsQueueIfCritical();
  }

  static determineIfOperationalError(error: Error): boolean {
    if (error instanceof CustomError) {
      return error.isOperational;
    }
    return false;
  }
}

export const errorHandler = ErrorHandler
