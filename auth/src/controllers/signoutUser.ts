import { Request, Response } from 'express'

export const signoutUser = (req: Request, res: Response): void => {
  req.session = null

  res.send({})
}
