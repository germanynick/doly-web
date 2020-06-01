import { InputNumber } from "antd"
import React from "react"
import { useField } from "react-final-form"

import { FinalField, IFinalFieldProps } from "./FinalField"

export interface IInputNumberFieldProps extends IFinalFieldProps {
  placeholder?: string
}

export const InputNumberField: React.FunctionComponent<IInputNumberFieldProps> = ({
  placeholder,
  name,
  children,
  ...props
}) => {
  const { input } = useField(name)

  return (
    <FinalField name={name} {...props}>
      {children || <InputNumber placeholder={placeholder} {...input} />}
    </FinalField>
  )
}
