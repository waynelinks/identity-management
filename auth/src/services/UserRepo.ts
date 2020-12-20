import { db } from '../db'
import { IUser } from '../interfaces'
import { createToken, doPassword } from '../security'

export class User {
  private static async findByEmail(email: string): Promise<any[]> {
    const rows = await db('users')
      .where({ email })
      .returning('id, email, firstName, lastName, isAdmin')
    return rows
  }

  static async create(payload: IUser): Promise<string | null> {
    const { email, password, firstName, lastName } = payload

    const userExist = await this.findByEmail(email)
    if (userExist.length) return null

    payload.password = await doPassword.hash(password as string)

    const serializedPayload = {
      first_name: firstName,
      last_name: lastName,
      password,
      email,
    }

    const result = await db('users').insert(serializedPayload, '*')
    delete result[0].password

    return createToken(result[0])
  }
}
