export interface IAuthToken {
  aud: string
  sub: string
  iss: string
  iat: number
  exp: number
  fullName: string
  lastName: string
  email: string
}
