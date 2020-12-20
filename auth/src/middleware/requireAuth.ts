import { Request, Response, NextFunction } from 'express';

import { CommonErrors, HttpStatusCode } from '../enums'
import { AppError } from '../errors'

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.currentUser) throw new AppError(CommonErrors.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED, 'Access denied!', true)

  next()
}
