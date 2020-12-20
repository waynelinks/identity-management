import { sign, Secret } from 'jsonwebtoken'

import { IUser } from '../interfaces'

export const createToken = (user: IUser): string => sign(user, process.env.TOKEN_SECRET as Secret, {
  algorithm: 'HS256',
  issuer: process.env.TOKEN_ISSUER,
  expiresIn: process.env.TOKEN_EXPIRATION,
  audience: process.env.TOKEN_AUDIENCE,
  subject: user.id,
})
