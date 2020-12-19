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

  static determineIfOperationalError(error: Error) {
    if (error instanceof CustomError) {
      return res.status(error.httpCode).send({ errors: error.serializeErrors() })
    }
  }
}

export const errorHandler = ErrorHandler
