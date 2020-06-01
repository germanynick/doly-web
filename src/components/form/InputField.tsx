import { Input } from "antd"
import React from "react"
import { useField } from "react-final-form"

import { FinalField, IFinalFieldProps } from "./FinalField"

export interface IInputFieldProps extends IFinalFieldProps {
  placeholder?: string
  prefix?: React.ReactNode
  type?: string
}

export const InputField: React.FunctionComponent<IInputFieldProps> = ({
  placeholder,
  name,
  children,
  prefix,
  type,
  ...props
}) => {
  const { input } = useField(name)

  return (
    <FinalField name={name} {...props}>
      {children || (
        <Input
          placeholder={placeholder}
          prefix={prefix}
          type={type}
          {...input}
        />
      )}
    </FinalField>
  )
}
