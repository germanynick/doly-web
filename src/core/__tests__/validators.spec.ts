import { ErrorCode } from '@core/enums'

import * as validators from '../validators'

describe('Validators', () => {
  test('Should return required error.', () => {
    expect(ErrorCode.IsRequired).toBe('is_required')
    expect(validators.required(undefined, {})).toBe(ErrorCode.IsRequired)
    expect(validators.required(null, {})).toBe(ErrorCode.IsRequired)
    expect(validators.required('', {})).toBe(ErrorCode.IsRequired)
    expect(validators.required(' ', {})).toBe(ErrorCode.IsRequired)
    expect(validators.required('   ', {})).toBe(ErrorCode.IsRequired)
  })

  test('Should not return required error.', () => {
    expect(validators.required('a', {})).toBe(false)
    expect(validators.required('  a  ', {})).toBe(false)
    expect(validators.required(0, {})).toBe(false)
    expect(validators.required(1, {})).toBe(false)
    expect(validators.required({}, {})).toBe(false)
    expect(validators.required(true, {})).toBe(false)
    expect(validators.required(false, {})).toBe(false)
    expect(validators.required(() => false, {})).toBe(false)
    expect(validators.required(Symbol('TEST'), {})).toBe(false)
  })

  test('Should return is_email error.', () => {
    expect(ErrorCode.IsEmail).toBe('is_email')
    expect(validators.email(undefined, {})).toBe(ErrorCode.IsEmail)
    expect(validators.email(null, {})).toBe(ErrorCode.IsEmail)
    expect(validators.email('', {})).toBe(ErrorCode.IsEmail)
    expect(validators.email(' ', {})).toBe(ErrorCode.IsEmail)
    expect(validators.email('   ', {})).toBe(ErrorCode.IsEmail)
    expect(validators.email('a', {})).toBe(ErrorCode.IsEmail)
    expect(validators.email('  a  ', {})).toBe(ErrorCode.IsEmail)
    expect(validators.email(0, {})).toBe(ErrorCode.IsEmail)
    expect(validators.email(1, {})).toBe(ErrorCode.IsEmail)
    expect(validators.email({}, {})).toBe(ErrorCode.IsEmail)
    expect(validators.email(true, {})).toBe(ErrorCode.IsEmail)
    expect(validators.email(false, {})).toBe(ErrorCode.IsEmail)
    expect(validators.email(() => false, {})).toBe(ErrorCode.IsEmail)
    expect(validators.email(Symbol('TEST'), {})).toBe(ErrorCode.IsEmail)
    expect(validators.email('email', {})).toBe(ErrorCode.IsEmail)
    expect(validators.email('email@', {})).toBe(ErrorCode.IsEmail)
    expect(validators.email('email@gmail', {})).toBe(ErrorCode.IsEmail)
    expect(validators.email('email@gmail.c', {})).toBe(ErrorCode.IsEmail)
  })

  test('Should not return is_email error.', () => {
    expect(validators.email('email@gmail.com', {})).toBe(false)
    expect(validators.email('email.com.vn@gmail.com', {})).toBe(false)
  })
})
