import { Request, Response } from 'express'
import { CommonErrors, HttpStatusCode } from '../enums'
import { AppError } from '../errors'

import { User } from '../services'

export const signinUser = async (req: Request, res: Response): Promise<void> => {
  const payload = req.body

  const token: string | null = await User.signin(payload)
  if (!token) throw new AppError(CommonErrors.BAD_REQUEST, HttpStatusCode.BAD_REQUEST, 'Invalid Credentials!', true)

  req.session = {
    jwt: token,
  }

  res.status(200).json({
    success: true,
    message: 'Signin Complete',
  })
}
