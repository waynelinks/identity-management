import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'

import { AppError } from '../errors'
import { CommonErrors, HttpStatusCode } from '../enums'

function validateRegistration(req: Request) {
  return Joi.object({
    firstName: Joi.string().required().trim(),
    lastName: Joi.string().required().trim(),
    email: Joi.string().required().email().trim(),
    password: Joi.string().required().min(5),
    isAdmin: Joi.boolean().optional(),
  }).validate(req)
}

function validateSignin(req: Request) {
  return Joi.object({
    email: Joi.string().required().email().trim(),
    password: Joi.string().required().min(5),
  }).validate(req)
}

export const validate = (validator: string) => (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  switch (validator) {
    case 'register': {
      const { error } = validateRegistration(req.body)
      if (error) throw new AppError(CommonErrors.BAD_REQUEST, HttpStatusCode.BAD_REQUEST, error.details[0].message, true)

      break
    }

    case 'signin': {
      const { error } = validateSignin(req.body)
      if (error) throw new AppError(CommonErrors.BAD_REQUEST, HttpStatusCode.BAD_REQUEST, error.details[0].message, true)

      break
    }

    default:
      break
  }
  next()
}
