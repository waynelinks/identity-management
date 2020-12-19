import { Request, Response, NextFunction } from 'express';

import { errorHandler } from '../errors'

export const errorDeligator = async (err: Error, req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!errorHandler.determineIfOperationalError(err)) next(err)

  await errorHandler.handleError(err)
};
