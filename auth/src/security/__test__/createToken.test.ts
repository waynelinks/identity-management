import { verify, Secret } from 'jsonwebtoken'

import { IUser, IAuthToken } from '../../interfaces'
import { createToken } from '../createToken'

const user: IUser = {
  id: '123',
  firstName: 'first',
  lastName: 'last',
  password: 'password',
  email: 'name.you@test.com',
}

describe('JWT Service', () => {
  describe('Create new token', () => {
    it('When user [register, login], then new jwt token is created', async () => {
      const token = createToken(user)
      const decoded = verify(
        token,
        process.env.TOKEN_SECRET as Secret,
      ) as IAuthToken

      expect(decoded.email).toEqual(user.email)
      expect(decoded).not.toHaveProperty('password')
    })
  })
})
