export interface IUser {
  id?: string
  firstName: string
  lastName: string
  email: string
  password: string | undefined
  isAdmin?: boolean
}
