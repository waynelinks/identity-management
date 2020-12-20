import { Request, Response } from 'express'
import { BadRequestError } from '@bigoncloud/errors'

import { User } from '../services'

export const signin = async (req: Request, res: Response): Promise<void> => {
  const token: string | boolean = await User.signin(req.body)
  if (!token) throw new BadRequestError('Invalid Credentials!')

  req.session = {
    jwt: token,
  }

  res.status(200).json({
    status: 'success',
    message: 'Signin successful',
  })
}
