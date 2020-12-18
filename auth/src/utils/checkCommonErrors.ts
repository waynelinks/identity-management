/* eslint-disable security/detect-object-injection */
import { CommonErrors, HttpStatusCode } from '../enums'

function getEnumKeyByEnumValue<T extends { [index: string]: string }>(
  myEnum: T,
  enumValue: string,
): keyof T | null {
  const keys = Object.keys(myEnum).filter((x) => myEnum[x] === enumValue)
  return keys.length > 0 ? keys[0] : null
}

export const checkCommonErrors = (StatusCode: HttpStatusCode): string | null => {
  let errorKey: string | null = null

  Object.getOwnPropertyNames(HttpStatusCode).map((name) => {
    // TODO: Refactor getEnumKeyByEnumValue function to fix Argument of type 'string' is not assignable to parameter of type '{ [index: string]: string; }'.ts(2345)
    const value = getEnumKeyByEnumValue(name, StatusCode)
    const commonError = getEnumKeyByEnumValue(CommonErrors, value as string)

    if (value === commonError) {
      errorKey = commonError
    }

    return null
  })

  return errorKey
}
