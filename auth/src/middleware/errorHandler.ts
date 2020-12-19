import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../errors'
import { logger } from '../utils'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.httpCode).send({ errors: err.serializeErrors() });
  }

  logger.error(err);
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
