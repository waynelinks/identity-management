import { logger } from '../utils'

class ErrorHandler {
  static async handleError(err: string): Promise<void> {
    await logger.error(err)
    // await sendMailToAdminIfCritical();
    // await saveInOpsQueueIfCritical();
    // await determineIfOperationalError();
  }
}

export const handler = ErrorHandler
