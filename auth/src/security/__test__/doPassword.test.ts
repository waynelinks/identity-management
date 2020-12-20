import { doPassword } from '../doPassword'

const password = 'password'

describe('Hash Service', () => {
  describe('Hash user password', () => {
    it('When user [register, login], then hash user password', async () => {
      const hash: string = await doPassword.hash(password)
      const isValid: boolean = await doPassword.check(password, hash)

      expect(isValid).toBeTruthy()
    })
  })
})
