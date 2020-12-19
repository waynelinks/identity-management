import { CommonErrors, HttpStatusCode } from '../enums'

export const checkCommonErrors = (statusCode: number): string | null => {
  let errorKey = null

  Object.values(HttpStatusCode).map((value): null => {
    if (value === statusCode.toString()) {
      Object.keys(HttpStatusCode).map((key) => {
        if (HttpStatusCode[key] === statusCode.toString()) {
          if (key in CommonErrors) {
            errorKey = key
          }
        }

        return null
      })
    }
    return null
  })

  return errorKey
}