/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-empty */
import { Request, Response, NextFunction } from 'express'
import { verify, Secret } from 'jsonwebtoken'

interface IUserPayload {
  id: string
  firstname: string
  lastname: string
  email: string
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUserPayload
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.session?.jwt) return next()

  try {
    const payload = verify(
      req.session.jwt,
      process.env.TOKEN_KEY as Secret,
    ) as IUserPayload

    req.currentUser = payload
  } catch (err) {}

  return next()
}
