/* eslint-disable security/detect-object-injection */
import { CommonErrors, HttpStatusCode } from '../enums'

function getEnumKeyByEnumValue(
  myEnum: string | CommonErrors,
  enumValue: string | null | HttpStatusCode,
): string | null {
  const keys = Object.getOwnPropertyNames(myEnum).filter((x) => myEnum[x] === enumValue)
  return keys.length > 0 ? keys[0] : null
}

export const checkCommonErrors = (
  StatusCode: HttpStatusCode,
): string | null => {
  let errorKey: string | null = null

  Object.getOwnPropertyNames(HttpStatusCode).map((name) => {
    // TODO: Refactor this function to fix Argument of type 'string' is not assignable to parameter of type '{ [index: string]: string; }'.ts(2345)
    const value = getEnumKeyByEnumValue(name, StatusCode)
    const commonError = getEnumKeyByEnumValue(CommonErrors as unknown as string, value)

    if (value === commonError) {
      errorKey = commonError
    }

    return null
  })

  return errorKey
}
