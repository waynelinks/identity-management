import { Request, Response } from 'express'
import { CommonErrors, HttpStatusCode } from '../enums'
import { AppError } from '../errors'

import { User } from '../services'

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const payload = req.body

  const token: string | null = await User.create(payload)
  if (!token) throw new AppError(CommonErrors.BAD_REQUEST, HttpStatusCode.BAD_REQUEST, 'Invalid Credentials!', true)

  req.session = {
    token,
  }

  res.status(201).json({
    success: true,
    message: 'Register Complete',
  })
}
