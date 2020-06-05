import { FieldValidator } from 'final-form'
import validator from 'validator'

import { ErrorCode } from './enums'

export const required: FieldValidator<any> = (value: any) => {
  if (typeof value === 'string' && value.trim().length === 0) {
    return ErrorCode.IsRequired
  }

  if (value === null || value === undefined) {
    return ErrorCode.IsRequired
  }

  return false
}

export const email: FieldValidator<any> = (value: any) =>
  typeof value === 'string' && validator.isEmail(value) ? false : ErrorCode.IsEmail

export const phone: FieldValidator<string> = (value: string) =>
  value && !validator.isMobilePhone(value, 'any', { strictMode: true }) ? ErrorCode.IsPhone : false

export const minValue = (limit: number): FieldValidator<number> => (value: number) =>
  value && value < limit ? ErrorCode.minValue : false

export const maxValue = (limit: number): FieldValidator<number> => (value: number) =>
  value && value > limit ? ErrorCode.maxValue : false

export const maxLength = (limit: number): FieldValidator<string> => (value: string) =>
  value && value.trim().length > limit ? ErrorCode.maxLength : false

export const minLength = (limit: number): FieldValidator<string> => (value: string) =>
  value && value.trim().length < limit ? ErrorCode.minLength : false

export const multiple = <T>(funcs: FieldValidator<T>[]): FieldValidator<T> => (...args) => {
  for (let index = 0; index < funcs.length; index++) {
    const func = funcs[index]
    const error = func(...args)

    if (error) {
      return error
    }
  }

  return false
}
