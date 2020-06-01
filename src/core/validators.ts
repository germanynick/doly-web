import { FieldValidator } from "final-form"
import validator from "validator"

import { ErrorCode } from "./enums"

export const required: FieldValidator<any> = (value: any) =>
  !value && ErrorCode.IsRequired

export const email: FieldValidator<string> = (value: string) =>
  value && !validator.isEmail(value) && ErrorCode.IsEmail

export const phone: FieldValidator<string> = (value: string) =>
  value &&
  !validator.isMobilePhone(value, "any", { strictMode: true }) &&
  ErrorCode.IsPhone

export const minValue = (limit: number): FieldValidator<number> => (
  value: number
) => value && value < limit && ErrorCode.minValue

export const maxValue = (limit: number): FieldValidator<number> => (
  value: number
) => value && value > limit && ErrorCode.maxValue

export const maxLength = (limit: number): FieldValidator<string> => (
  value: string
) => value && value.trim().length > limit && ErrorCode.maxLength

export const minLength = (limit: number): FieldValidator<string> => (
  value: string
) => value && value.trim().length < limit && ErrorCode.minLength

export const multiple = <T>(funcs: FieldValidator<T>[]): FieldValidator<T> => (
  ...args
) => {
  for (let index = 0; index < funcs.length; index++) {
    const func = funcs[index]
    const error = func(...args)

    if (error) {
      return error
    }
  }

  return null
}
