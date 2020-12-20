import request from 'supertest'

import { IUser } from '../../interfaces'
import { app } from '../../app'

const register: IUser = {
  firstName: 'first',
  lastName: 'last',
  email: 'first.last@test.com',
  password: 'password',
}

describe('User Service', () => {
  describe('User Information', () => {
    it('GET /currentuser - return 200 when user details availible', async () => {
      const signup = await request(app)
        .post(`${process.env.BASE_API_V1}/register`)
        .send(register)
        .expect(201)
      const cookie = signup.get('Set-Cookie')

      const res = await request(app)
        .get(`${process.env.BASE_API_V1}/currentuser`)
        .set('Cookie', cookie)
        .send()
        .expect(200)

      expect(res.body.currentUser.email).toEqual(register.email)
      expect(res.text).not.toContain('Something went wrong')
    })
  })
})
