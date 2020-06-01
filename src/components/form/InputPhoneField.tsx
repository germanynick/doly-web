import { phone } from "~/core/validators"
import { Input } from "antd"
import React from "react"
import { useField } from "react-final-form"

import { FinalField, IFinalFieldProps } from "./FinalField"

export interface IInputPhoneFieldProps extends IFinalFieldProps {
  placeholder?: string
}

export const InputPhoneField: React.FunctionComponent<IInputPhoneFieldProps> = ({
  placeholder,
  name,
  children,
  ...props
}) => {
  const { input } = useField(name, { validate: phone })

  return (
    <FinalField name={name} {...props}>
      {children || <Input placeholder={placeholder} {...input} />}
    </FinalField>
  )
}
