import { Request, Response, Express } from 'express'
import { CommonErrors, HttpStatusCode } from '../enums'

import { AppError } from '../errors'

export const notFound = (app: Express): void => {
  app.all('*', async (req: Request, res: Response) => {
    throw new AppError(CommonErrors.NOT_FOUND, HttpStatusCode.NOT_FOUND, `Can't find ${req.originalUrl} on this server!`, true)
  })
}
