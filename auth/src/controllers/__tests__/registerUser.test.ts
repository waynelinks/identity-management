import request from 'supertest'

import { IUser } from '../../interfaces'
import { app } from '../../app'

const user: IUser = {
  firstName: 'first',
  lastName: 'last',
  email: 'first.last@test.com',
  password: 'password',
}

describe('User Service', () => {
  describe('Register new user', () => {
    it('POST /users - return 201 when successfull registration', async () => {
      const res = await request(app)
        .post(`${process.env.BASE_API_V1}/register`)
        .send(user)
        .expect(201)

      expect(res.body.success).toBeTruthy()
      expect(res.body.message).toEqual('Register Complete')
      expect(res.text).not.toContain('Something went wrong')
    })

    it('POST /users - return 400 when invalid email', async () => {
      const res = await request(app)
        .post(`${process.env.BASE_API_V1}/register`)
        .send({
          firstName: 'first',
          lastName: 'last',
          email: 'alskdflaskjfd',
          password: 'password',
          isAdmin: false,
        })
        .expect(400)

      expect(res.text).toContain('must be a valid email')
      expect(res.text).not.toContain('Something went wrong')
    })

    it('POST /users - return 400 when invalid password', async () => {
      const res = await request(app)
        .post(`${process.env.BASE_API_V1}/register`)
        .send({
          firstName: 'first',
          lastName: 'last',
          email: 'first.last@test.com',
          password: 'p',
          isAdmin: false,
        })
        .expect(400)

      expect(res.text).toContain('length must be at least 5 characters long')
      expect(res.text).not.toContain('Something went wrong')
    })

    it('POST /users - return 400 when missing email', async () => {
      const res = await request(app)
        .post(`${process.env.BASE_API_V1}/register`)
        .send({
          firstName: 'first',
          lastName: 'last',
          password: 'password',
          isAdmin: false,
        })
        .expect(400)

      expect(res.text).toContain('"\\"email\\" is required')
      expect(res.text).not.toContain('Something went wrong')
    })

    it('POST /users - return 400 when missing password', async () => {
      const res = await request(app)
        .post(`${process.env.BASE_API_V1}/register`)
        .send({
          firstName: 'first',
          lastName: 'last',
          email: 'first.last@test.com',
          isAdmin: false,
        })
        .expect(400)

      expect(res.text).toContain('"\\"password\\" is required')
      expect(res.text).not.toContain('Something went wrong')
    })

    it('POST /users - return 400 when duplicate email', async () => {
      await request(app).post(`${process.env.BASE_API_V1}/register`).send(user).expect(201)

      const res = await request(app)
        .post(`${process.env.BASE_API_V1}/register`)
        .send(user)
        .expect(400)

      expect(res.text).toContain('Invalid Credentials!')
      expect(res.text).not.toContain('Something went wrong')
    })

    it('POST /users - return when Set-Cookie is set', async () => {
      const res = await request(app)
        .post(`${process.env.BASE_API_V1}/register`)
        .send(user)
        .expect(201)

      expect(res.get('Set-Cookie')).toBeDefined()
    })
  })
})
