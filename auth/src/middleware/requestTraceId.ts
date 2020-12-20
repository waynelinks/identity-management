/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response, NextFunction } from 'express'
import uuid from 'uuid'

interface ITrace {
  traceId: string
}

declare global {
  namespace Express {
    interface Request {
      ctx: ITrace
    }
  }
}

export const requestTraceId = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  req.ctx = {
    traceId: uuid.v4(),
  }

  return next()
}
