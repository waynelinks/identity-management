import { Request, Response, NextFunction } from 'express'

import { AppError } from '../errors'

export const errorDeligator = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<unknown> => {
  if (err instanceof AppError) {
    return res.status(err.httpCode).send({ errors: err.serializeErrors() })
  }

  return res.status(400).send({
    errors: { message: 'Something went wrong' },
  })
}
